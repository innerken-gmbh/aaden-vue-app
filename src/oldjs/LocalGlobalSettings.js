import { AadenBaseConfig } from 'aaden-base-model/lib/AadenSettingManager'

const defaultConfig = require('@/assets/AadenConfig.json')
let GlobalConfig = Object.assign({}, defaultConfig)
const sumupInfo = require('@/assets/aaden.web.app.json')
GlobalConfig.sumupInfo = sumupInfo
export let NeededKeys = []

export async function loadConfig () {
  GlobalConfig = await AadenBaseConfig(defaultConfig)
  NeededKeys = GlobalConfig.neededKeys
  window.Config = GlobalConfig
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
  GlobalConfig.useCurrentConfig()
}
export function hardReload () {
  GlobalConfig.hardReload()
}
export function setDeviceId (id) {
  GlobalConfig.updateSetting('DeviceId', id)
  reload()
}
export function changeLanguage (l) {
  GlobalConfig.updateSetting('lang', l)
  reload()
}

export default GlobalConfig
