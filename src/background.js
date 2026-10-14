'use strict'
import { app, BrowserWindow, ipcMain, powerMonitor, protocol } from 'electron'
import { autoUpdater } from 'electron-updater'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'

const isDevelopment = process.env.NODE_ENV !== 'production'

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win

// Windows 自动更新（POS-129 / POS-130）
// 以前只在启动时检查一次、只在正常退出时安装；收银机全屏没人正常退出，
// 「重新加载」又是 relaunch + quit，会和安装器抢跑，所以大部分 Windows 机器装不上新版。
// 现在：每 4 小时检查一次；下载好之后，「重新加载」或夜里 4 点空闲时静默安装并重启。
// Linux 走 snap 自动刷新，不用 electron-updater。
const UPDATE_CHECK_INTERVAL_MS = 4 * 60 * 60 * 1000
const NIGHT_INSTALL_POLL_MS = 10 * 60 * 1000
const NIGHT_INSTALL_HOUR = 4
const NIGHT_INSTALL_MIN_IDLE_SECONDS = 30 * 60

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
  })
  autoUpdater.on('error', (e) => {
    const message = String((e && e.message) || e).slice(0, 300)
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
    if (!downloadedVersion || new Date().getHours() !== NIGHT_INSTALL_HOUR) {
      return
    }
    if (powerMonitor.getSystemIdleTime() < NIGHT_INSTALL_MIN_IDLE_SECONDS) {
      return
    }
    installDownloadedUpdate('night')
  }, NIGHT_INSTALL_POLL_MS)
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
