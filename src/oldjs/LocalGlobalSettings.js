import { loadBaseConfig } from 'aaden-base-model/lib/Models/GlobalSettings'
import i18n from '@/i18n'

const defaultConfig = require('@/assets/AadenConfig.json')
let GlobalConfig = Object.assign({}, defaultConfig)

export let NeededKeys = []

export async function loadConfig () {
  try {
    const fix = require('@/assets/FixedConfig.json')
    GlobalConfig = Object.assign(GlobalConfig, await loadBaseConfig(defaultConfig), fix)
    changeLanguage(GlobalConfig.lang)
    NeededKeys = GlobalConfig.neededKeys
    GlobalConfig.getMilepayUrl = function () {
      // return GlobalConfig.Protocol + '192.168.1.100' + ':' + GlobalConfig.milePayPort + '/milePay/'
      return GlobalConfig.Protocol + GlobalConfig.base + ':' + GlobalConfig.milePayPort + '/milePay/'
    }
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

export function forceChangeLanguage (l) {
  changeLanguage(l)
  reload()
}

export default GlobalConfig
