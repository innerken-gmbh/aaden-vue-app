'use strict'
import { app, BrowserWindow, ipcMain, powerMonitor, protocol } from 'electron'
import { autoUpdater } from 'electron-updater'
import fs from 'fs'
import path from 'path'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Windows 自动更新（POS-129 / POS-130）
// 以前只在启动时检查一次、只在正常退出时安装；收银机全屏、一直开着（1914 连开了两周），没人正常退出，
// 所以大部分 Windows 机器装不上新版。
// 现在：每 4 小时检查一次；下载好之后：
//   - 页面右下角提示「新版本已准备好」，店员点「立即更新」就装（约半分钟后自动重新打开）
//   - 任何时间，电脑 10 分钟没人操作就自动装（和设备命令 DESKTOP_UPDATE 同一个门槛）
//   - 下次打开收银程序时，如果上次已经下载好了，先装好再打开（每天关电脑的店靠这一条）
// Linux 走 snap 自动刷新，不用 electron-updater。
//
// 更新源（POS-36）：先读 S3（desktop/win，发版 workflow 上传）；S3 上没有 latest.yml（404/403）才退回 GitHub Releases。
// 全部 Windows 机器都换到这一版以后，GitHub Releases 停发，aaden-vue-app 改成私有仓库。
const S3_FEED = { provider: 'generic', url: 'https://aaden-backend.s3.eu-central-1.amazonaws.com/desktop/win' }
const GITHUB_FEED = { provider: 'github', owner: 'innerken-gmbh', repo: 'aaden-vue-app' }
let usingGithubFeed = false

function useS3Feed () {
  autoUpdater.setFeedURL(S3_FEED)
}

/** S3 上还没有这个文件时，这次运行改用 GitHub Releases；只退一次 */
function fallBackToGithubFeed (message) {
  if (usingGithubFeed || !/latest\.yml/.test(message) || !/\b40[34]\b/.test(message)) {
    return false
  }
  usingGithubFeed = true
  autoUpdater.setFeedURL(GITHUB_FEED)
  return true
}
const UPDATE_CHECK_INTERVAL_MS = 4 * 60 * 60 * 1000
const IDLE_INSTALL_POLL_MS = 60 * 1000
const IDLE_INSTALL_MIN_IDLE_SECONDS = 10 * 60
/** 启动时发现已下载好的更新：最多等这么久让 electron-updater 校验缓存，等不到就照常打开 */
const STARTUP_INSTALL_WAIT_MS = 30 * 1000

let downloadedVersion = null
let installingUpdate = false
let lastUpdateError = null
let updateEventsReady = false
const pendingUpdateEvents = []

// 更新状态交给页面上报到云端（页面才知道设备号）
function emitUpdateEvent (content) {
  if (updateEventsReady && win) {
    win.webContents.send('update-event', content)
  } else {
    pendingUpdateEvents.push(content)
  }
}

ipcMain.on('update-event-ready', () => {
  updateEventsReady = true
  pendingUpdateEvents.splice(0).forEach(emitUpdateEvent)
})

// 页面上的「新版本已准备好」提示
function notifyUpdateReady () {
  if (downloadedVersion && win) {
    win.webContents.send('update-ready', downloadedVersion)
  }
}

ipcMain.on('update-ui-ready', notifyUpdateReady)

ipcMain.on('install-update', () => {
  if (downloadedVersion) {
    installDownloadedUpdate('user')
  }
})

function installDownloadedUpdate (reason) {
  if (installingUpdate) {
    return
  }
  installingUpdate = true
  emitUpdateEvent(`DESKTOP_UPDATE_INSTALL ${app.getVersion()} -> ${downloadedVersion} ${reason}`)
  // 留几秒给页面把事件发出去
  setTimeout(() => autoUpdater.quitAndInstall(true, true), 3000)
}

function setupAutoUpdate () {
  if (process.platform !== 'win32' || isDevelopment) {
    return
  }
  autoUpdater.autoInstallOnAppQuit = true
  autoUpdater.on('update-downloaded', (info) => {
    if (downloadedVersion === info.version) {
      return
    }
    downloadedVersion = info.version
    emitUpdateEvent(`DESKTOP_UPDATE_DOWNLOADED ${app.getVersion()} -> ${info.version}`)
    notifyUpdateReady()
  })
  autoUpdater.on('error', (e) => {
    const message = String((e && e.message) || e).slice(0, 300)
    if (fallBackToGithubFeed(message)) {
      emitUpdateEvent(`DESKTOP_UPDATE_FEED_FALLBACK ${app.getVersion()} S3 -> GitHub: ${message}`)
      autoUpdater.checkForUpdates().catch(() => {})
      return
    }
    if (message === lastUpdateError) {
      return
    }
    lastUpdateError = message
    emitUpdateEvent(`DESKTOP_UPDATE_ERROR ${app.getVersion()} ${message}`)
  })
  // 错误统一走上面的 error 事件，这里只防止未处理的 rejection
  const check = () => autoUpdater.checkForUpdates().catch(() => {})
  check()
  setInterval(check, UPDATE_CHECK_INTERVAL_MS)
  setInterval(() => {
    if (!downloadedVersion || powerMonitor.getSystemIdleTime() < IDLE_INSTALL_MIN_IDLE_SECONDS) {
      return
    }
    installDownloadedUpdate('idle')
  }, IDLE_INSTALL_POLL_MS)
}

function newerVersion (a, b) {
  const pa = String(a).split('.').map(n => parseInt(n, 10) || 0)
  const pb = String(b).split('.').map(n => parseInt(n, 10) || 0)
  for (let i = 0; i < 3; i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) > (pb[i] || 0)
  }
  return false
}

// electron-updater 的缓存：%LOCALAPPDATA%\aaden-updater\pending\update-info.json 记着已下载好的安装包
function cachedUpdateVersion () {
  try {
    const dir = path.join(process.env.LOCALAPPDATA || '', 'aaden-updater', 'pending')
    const info = JSON.parse(fs.readFileSync(path.join(dir, 'update-info.json'), 'utf8'))
    const match = /(\d+\.\d+\.\d+)/.exec(info.fileName || '')
    if (!match || !fs.existsSync(path.join(dir, info.fileName))) return null
    return newerVersion(match[1], app.getVersion()) ? match[1] : null
  } catch (e) {
    return null
  }
}

// 同一个版本启动时只试装一次：装失败了不能每次开机都卡 30 秒再失败
function startupInstallAttempted (version) {
  const marker = path.join(app.getPath('userData'), 'startup-install-attempt.json')
  try {
    const last = JSON.parse(fs.readFileSync(marker, 'utf8'))
    if (last.version === version && Date.now() - last.at < 24 * 3600 * 1000) return true
  } catch (e) { /* 没试过 */ }
  try {
    fs.writeFileSync(marker, JSON.stringify({ version, at: Date.now() }))
  } catch (e) { /* 写不了就当没试过 */ }
  return false
}

/** 刚打开、还没人用：上次已经下载好更新的话先装好再开窗口。装了返回 true（程序会退出、装完自动重新打开） */
function installCachedUpdateOnStartup () {
  if (process.platform !== 'win32' || isDevelopment) return Promise.resolve(false)
  const version = cachedUpdateVersion()
  if (!version || startupInstallAttempted(version)) return Promise.resolve(false)
  return new Promise(resolve => {
    let done = false
    const finish = (installed) => {
      if (done) return
      done = true
      autoUpdater.removeListener('update-downloaded', onDownloaded)
      autoUpdater.removeListener('error', onError)
      resolve(installed)
    }
    const onDownloaded = (info) => {
      finish(true)
      downloadedVersion = info.version
      autoUpdater.quitAndInstall(true, true)
    }
    const onError = () => finish(false)
    autoUpdater.once('update-downloaded', onDownloaded)
    autoUpdater.once('error', onError)
    setTimeout(() => finish(false), STARTUP_INSTALL_WAIT_MS)
    autoUpdater.checkForUpdates().then(result => {
      // 没有比当前更新的版本（缓存过期了）就照常打开
      if (!result || !result.downloadPromise) finish(false)
    }).catch(() => finish(false))
  })
}

ipcMain.on('reload', () => {
  console.log('get reload')
  if (downloadedVersion) {
    installDownloadedUpdate('reload')
    return
  }
  app.relaunch()
  app.quit()
})

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([{
  scheme: 'app',
  privileges: {
    secure: true,
    standard: true
  }
}])

function createWindow () {
  // Create the browser window.

  createProtocol('app')

  win = new BrowserWindow({
    width: 1368,
    height: 768,
    show: false,
    titleBarStyle: 'hidden',
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      nodeIntegrationInWorker: true,
      nodeIntegrationInSubFrames: true,
      javascript: true,
      contextIsolation: false
    }
  })
  win.setFullScreen(true)

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
  } else {
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  win.once('ready-to-show', () => {
    win.show()
  })

  win.on('closed', () => {
    win = null
  })
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow()
  }
})
const gotTheLock = app.requestSingleInstanceLock()

if (!gotTheLock) {
  app.quit()
} else {
  app.on('second-instance', (event, commandLine, workingDirectory) => {
    // 当运行第二个实例时,将会聚焦到myWindow这个窗口
    if (win) {
      if (win.isMinimized()) win.restore()
      win.focus()
    }
  })

  // 创建 myWindow, 加载应用的其余部分, etc...
  app.whenReady().then(async () => {
    if (process.platform === 'win32' && !isDevelopment) {
      useS3Feed()
    }
    if (await installCachedUpdateOnStartup()) {
      return
    }
    createWindow()
    setupAutoUpdate()
  })
}

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}
