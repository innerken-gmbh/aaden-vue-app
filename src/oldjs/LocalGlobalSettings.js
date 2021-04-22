import { loadBaseConfig } from 'aaden-base-model/lib/Models/GlobalSettings'
import i18n from '@/i18n'

const defaultConfig = require('@/assets/AadenConfig.json')
let GlobalConfig = Object.assign({}, defaultConfig)

export let NeededKeys = []

export async function loadConfig () {
  try {
    GlobalConfig = Object.assign(GlobalConfig, await loadBaseConfig(defaultConfig))
    changeLanguage(GlobalConfig.lang)
    NeededKeys = GlobalConfig.neededKeys
    window.Config = GlobalConfig
  } catch (e) {
    console.log(e)
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
  i18n.locale = l.toLowerCase()
  // reload()
}

export default GlobalConfig
