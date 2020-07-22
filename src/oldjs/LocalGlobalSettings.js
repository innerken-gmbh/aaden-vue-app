const defaultConfig = require('@/assets/AadenConfig.json')
let GlobalConfig = Object.assign({}, defaultConfig)

if (!GlobalConfig.isFMCVersion) {
  GlobalConfig.Protocol = 'http://'
}

import('electron-settings').then(settings => {
  settings = settings.default
  const localConfig = settings.get('config')
  GlobalConfig = Object.assign(GlobalConfig, localConfig)
  GlobalConfig.settings = settings
  window.localConfig = localConfig
}).catch(e => {
  console.error(e)
  console.error('no local Config Available')
})

window.Config = GlobalConfig
window.useCurrentConfig = useCurrentConfig
window.hardReload = hardReload
window.setDeviceId = setDeviceId

export function reload () {
  if (!GlobalConfig.isOnlineVersion) {
    const { ipcRenderer } = require('electron')
    ipcRenderer.send('reload')
  } else {
    window.location.reload(true)
  }
}

function useCurrentConfig () {
  GlobalConfig.settings.set('config', GlobalConfig)
  reload()
}

function hardReload () {
  GlobalConfig.settings.deleteAll()
}

function setDeviceId (id) {
  GlobalConfig.settings.set('config.DeviceId', id)
  reload()
}

export function changeLanguage (l) {
  GlobalConfig.settings.set('config.lang', l)
  reload()
}

let debugCounter = 0

export function toggleDebug () {
  debugCounter++
  if (debugCounter > 10) {
    GlobalConfig.settings.set('config.Debug', !GlobalConfig.settings.get('config.Debug'))
    reload()
    debugCounter = 0
  }
}

export default GlobalConfig
