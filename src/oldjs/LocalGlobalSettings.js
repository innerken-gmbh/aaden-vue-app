const defaultConfig = require('@/assets/AadenConfig.json')
let Config = Object.assign({}, defaultConfig)

import('electron-settings').then(settings => {
  const localConfig = settings.get('config')
  Config = Object.assign(Config, localConfig)
  Config.settings = settings
}).catch(e => {
  console.error('no local Config Available')
})

window.Config = Config
window.useCurrentConfig = useCurrentConfig
window.hardReload = hardReload
window.setDeviceId = setDeviceId

// console.log(StaticSetting.lang)

export function reload () {
  if (!Config.isOnlineVersion) {
    const { ipcRenderer } = require('electron')
    ipcRenderer.send('reload')
  } else {
    window.location.reload(true)
  }
}

function useCurrentConfig () {
  Config.settings.set('config', Config)
  reload()
}

function hardReload () {
  Config.settings.deleteAll()
}

function setDeviceId (id) {
  Config.settings.set('config.DeviceId', id)
  reload()
}

export function changeLanguage (l) {
  Config.settings.set('config.lang', l)
  reload()
}

let debugCounter = 0

export function toggleDebug () {
  debugCounter++
  if (debugCounter > 10) {
    Config.settings.set('config.Debug', !Config.settings.get('config.Debug'))
    reload()
    debugCounter = 0
  }
}

export const GlobalConfig = Config
