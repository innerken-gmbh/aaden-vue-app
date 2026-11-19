'use strict'
import { app, BrowserWindow, ipcMain, powerMonitor, protocol, session } from 'electron'
import { autoUpdater } from 'electron-updater'
import { spawn } from 'child_process'
import fs from 'fs'
import path from 'path'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import {
  INSTALL_HELPER_SCRIPT,
  canAutoInstall,
  canInstallOnRequest,
  canInstallOnRestart,
  canPrompt,
  formatOutcome,
  gaveUp,
  newerVersion,
  parseInstallResult,
  quoteArg,
  recordAttempt,
  resolveAttempt
} from './desktopUpdatePolicy'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Windows 自动更新（POS-129 / POS-130 / POS-798）
// 以前只在启动时检查一次、只在正常退出时安装；收银机全屏、一直开着（1914 连开了两周），没人正常退出，
// 所以大部分 Windows 机器装不上新版。POS-130 改成每 4 小时检查、下载好就提示、10 分钟没人操作就装。
// POS-798：1920 在营业时间里「装 → 没装上 → 重开 → 再提示 → 再装」循环了 12 次，每次都关一次收银，云端也看不到为什么失败。现在：
//   - 白天不弹提示、不自动装、不关收银。下载照常在后台进行
//   - 夜里 03:00–06:00、电脑 10 分钟没人操作就自动装，每晚最多试一次；右下角提示条也只在这个时段出现
//   - 下次打开收银程序时，如果上次已经下载好了，先装好再打开（每天关电脑的店靠这一条）；这个版本失败过就不再这样装
//   - 同一个版本失败 2 次就不再提示，只在夜里再自动试一次；失败 3 次就不装这个版本了，等下一个版本
//   - 安装器交给一个安装助手启动：先等收银程序完全退出（20 秒不退就强制结束），装完记下退出码；
//     没装上就把原来的程序重新打开，不让收银一直关着
//   - 下次启动时对一下版本，把「装上了 / 没装上 + 原因」报到云端设备事件
// 规则本身在 desktopUpdatePolicy.js。Linux 走 snap 自动刷新，不用 electron-updater。
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
/** 安装助手的结果最多等这么久：装成功时新版本是安装器打开的，可能比结果文件先起来 */
const INSTALL_RESULT_WAIT_MS = 60 * 1000

let downloadedVersion = null
let installingUpdate = false
/** 下一次启动安装器的原因；没经过 installDownloadedUpdate 的，是关程序时 electron-updater 自己装的 */
let installReason = 'quit'
/** 页面提示条现在显示的版本（null = 不显示） */
let promptedVersion = null
/** 安装记录：哪个版本、失败过几次、上次失败时间、正在进行的安装（desktop-update-state.json） */
let updateState = null
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

// 页面上的「新版本已准备好」提示：只在夜里、这个版本失败不到 2 次时显示；version 为 null 时页面收起提示条
function notifyUpdateReady (force = false) {
  const version = canPrompt(updateState, downloadedVersion, new Date()) ? downloadedVersion : null
  if (!force && version === promptedVersion) {
    return
  }
  promptedVersion = version
  if (win) {
    win.webContents.send('update-ready', version)
  }
}

ipcMain.on('update-ui-ready', () => notifyUpdateReady(true))

ipcMain.on('install-update', () => {
  if (canInstallOnRequest(updateState, downloadedVersion)) {
    installDownloadedUpdate('user')
  }
})

function installDownloadedUpdate (reason) {
  if (installingUpdate) {
    return
  }
  installingUpdate = true
  installReason = reason
  emitUpdateEvent(`DESKTOP_UPDATE_INSTALL ${app.getVersion()} -> ${downloadedVersion} ${reason}`)
  // 留几秒给页面把事件发出去
  setTimeout(() => autoUpdater.quitAndInstall(true, true), 3000)
}

// ---------- 安装记录和安装助手（POS-798） ----------

function updateStatePath () {
  return path.join(app.getPath('userData'), 'desktop-update-state.json')
}

function installResultPath () {
  return path.join(app.getPath('userData'), 'desktop-update-result.txt')
}

function readUpdateState () {
  try {
    return JSON.parse(fs.readFileSync(updateStatePath(), 'utf8'))
  } catch (e) {
    return null
  }
}

function writeUpdateState (state) {
  try {
    if (state) {
      fs.writeFileSync(updateStatePath(), JSON.stringify(state))
    } else if (fs.existsSync(updateStatePath())) {
      fs.unlinkSync(updateStatePath())
    }
  } catch (e) { /* 写不了就算了：最多多试几次 */ }
}

/** 程序装在哪：user = %LOCALAPPDATA%（正常），machine = Program Files，other = 别处。装了两份时能看出来 */
function installLocation () {
  const exe = process.execPath.toLowerCase()
  const local = (process.env.LOCALAPPDATA || '').toLowerCase()
  if (local && exe.startsWith(local)) return 'user'
  const programFiles = [process.env.ProgramFiles, process.env['ProgramFiles(x86)']]
    .filter(Boolean)
    .map(p => p.toLowerCase())
  return programFiles.some(p => exe.startsWith(p)) ? 'machine' : 'other'
}

/** 安装助手的结果文件：等它出现（最多 INSTALL_RESULT_WAIT_MS），读完删掉 */
function readInstallResult (callback) {
  const started = Date.now()
  const poll = () => {
    let text = null
    try {
      text = fs.readFileSync(installResultPath(), 'utf8')
    } catch (e) { /* 还没写 */ }
    if (text || Date.now() - started >= INSTALL_RESULT_WAIT_MS) {
      try {
        fs.unlinkSync(installResultPath())
      } catch (e) { /* 本来就没有 */ }
      callback(text)
      return
    }
    setTimeout(poll, 2000)
  }
  poll()
}

/** 启动时对一下上次的安装：装上了还是没装上，报到云端设备事件 */
function checkLastInstall () {
  updateState = readUpdateState()
  const { state, outcome } = resolveAttempt(updateState, app.getVersion(), new Date())
  if (!outcome) {
    return
  }
  updateState = state
  writeUpdateState(state)
  const extra = outcome.ok ? '' : ` loc=${installLocation()}`
  readInstallResult(text => {
    emitUpdateEvent(formatOutcome(outcome, parseInstallResult(text), extra))
    if (!outcome.ok && gaveUp(state, outcome.to)) {
      emitUpdateEvent(`DESKTOP_UPDATE_GIVE_UP ${app.getVersion()} -> ${outcome.to} failed ${outcome.failures} times, wait for next version`)
    }
  })
}

/**
 * electron-updater 启动安装器时，改由安装助手（desktopUpdatePolicy.js 里的 cmd 脚本）来启动：
 * 先等收银程序完全退出再装（以前安装器和正在退出的程序同时起来，程序还没退干净，安装器就直接放弃了），
 * 装完记下退出码，没装上就把原来的程序重新打开。助手起不来就退回 electron-updater 原来的做法。
 */
function routeInstallerThroughHelper () {
  const originalSpawnLog = autoUpdater.spawnLog.bind(autoUpdater)
  autoUpdater.spawnLog = (cmd, args = [], env, stdio) => {
    if (!Array.isArray(args) || !args.includes('--updated')) {
      return originalSpawnLog(cmd, args, env, stdio)
    }
    const installer = path.basename(String(cmd)).toLowerCase() === 'elevate.exe' ? args[0] : cmd
    const match = /(\d+\.\d+\.\d+)/.exec(path.basename(String(installer)))
    const to = downloadedVersion || (match && match[1]) || 'unknown'
    updateState = recordAttempt(updateState, { from: app.getVersion(), to, reason: installReason, at: Date.now() })
    writeUpdateState(updateState)
    try {
      const script = path.join(app.getPath('userData'), 'desktop-update-helper.cmd')
      fs.writeFileSync(script, INSTALL_HELPER_SCRIPT)
      try {
        fs.unlinkSync(installResultPath())
      } catch (e) { /* 没有旧结果 */ }
      const child = spawn(process.env.ComSpec || 'cmd.exe', ['/d', '/s', '/c', `""${script}""`], {
        detached: true,
        stdio: 'ignore',
        windowsHide: true,
        windowsVerbatimArguments: true,
        env: {
          ...process.env,
          ...(env || {}),
          AADEN_EXE: path.basename(process.execPath),
          AADEN_APP: process.execPath,
          AADEN_CMD: String(cmd),
          AADEN_ARGS: args.map(quoteArg).join(' '),
          AADEN_FORCE_RUN: args.includes('--force-run') ? '1' : '0',
          AADEN_RESULT: installResultPath()
        }
      })
      return new Promise((resolve, reject) => {
        child.on('error', () => originalSpawnLog(cmd, args, env, stdio).then(resolve, reject))
        child.unref()
        if (child.pid !== undefined) {
          resolve(true)
        }
      })
    } catch (e) {
      return originalSpawnLog(cmd, args, env, stdio)
    }
  }
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
    // 这个版本已经放弃了：关程序时也不装，也不再报「下载好了」
    autoUpdater.autoInstallOnAppQuit = !gaveUp(updateState, info.version)
    if (gaveUp(updateState, info.version)) {
      return
    }
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
  // 每分钟：到点了显示 / 收起提示条；夜里没人操作就装
  setInterval(() => {
    notifyUpdateReady()
    if (!canAutoInstall(updateState, downloadedVersion, new Date()) ||
      powerMonitor.getSystemIdleTime() < IDLE_INSTALL_MIN_IDLE_SECONDS) {
      return
    }
    installDownloadedUpdate('night')
  }, IDLE_INSTALL_POLL_MS)
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
  // 这个版本失败过就不在开机时装了（只在夜里试），免得每次开机都多等
  if (!version || !canInstallOnRestart(updateState, version) || startupInstallAttempted(version)) {
    return Promise.resolve(false)
  }
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
      installReason = 'startup'
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
  // 改设备号时程序本来就要重开，顺便装；这个版本失败过就不顺便装了
  if (downloadedVersion && canInstallOnRestart(updateState, downloadedVersion)) {
    installDownloadedUpdate('reload')
    return
  }
  // 不装就别让 electron-updater 在退出时顺便装：程序马上会重开，安装助手会等不到程序退出
  autoUpdater.autoInstallOnAppQuit = false
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
    // POS-182：「行政」页嵌的门店后台（http://<Base>/AppCenter/Admin）会被内嵌浏览器缓存住，
    // 后台换了新构建以后整页空白，重启无效、卸载重装才好（1948、1466）。收银页面本身从安装包加载、不走这些缓存，
    // 所以每次启动清掉 HTTP 缓存、Service Worker 和 Cache Storage；后台的登录状态（localStorage）不动
    try {
      await session.defaultSession.clearCache()
      await session.defaultSession.clearStorageData({ storages: ['serviceworkers', 'cachestorage'] })
    } catch (e) {
      console.error('clear cache failed', e)
    }
    if (process.platform === 'win32' && !isDevelopment) {
      useS3Feed()
      routeInstallerThroughHelper()
      checkLastInstall()
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
