import { loadBaseConfig } from 'aaden-base-model/lib/Models/GlobalSettings'

const defaultConfig = require('@/assets/AadenConfig.json')
let GlobalConfig = Object.assign({}, defaultConfig)
const sumupInfo = require('@/assets/aaden.web.app.json')

GlobalConfig.sumupInfo = sumupInfo
export let NeededKeys = []

export async function loadConfig () {
  try {
    GlobalConfig = Object.assign(GlobalConfig, await loadBaseConfig(defaultConfig))
    NeededKeys = GlobalConfig.neededKeys
    window.Config = GlobalConfig
  } catch (e) {

  }
}

window.useCurrentConfig = useCurrentConfig
window.hardReload = hardReload
window.setDeviceId = setDeviceId

export function isWeb () {
  return !process.env.IS_WEB
}

export function reload () {
  if (!isWeb()) {
    const { ipcRenderer } = require('electron')
    ipcRenderer.send('reload')
  } else {
    window.location.reload(true)
  }
}

export function useCurrentConfig () {
  GlobalConfig.useCurrentConfig(GlobalConfig)
}

export function hardReload () {
  GlobalConfig.hardReload()
}

export function setDeviceId (id) {
  GlobalConfig.updateSettings('DeviceId', id)
  reload()
}

export function changeLanguage (l) {
  GlobalConfig.updateSettings('lang', l)
  reload()
}

export default GlobalConfig
