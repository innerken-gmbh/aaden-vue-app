import { loadBaseConfig } from 'aaden-base-model/lib/Models/GlobalSettings'
import i18n from '@/i18n'

const fix = require('@/assets/FixedConfig.json')
const defaultConfig = require('@/assets/AadenConfig.json')
let GlobalConfig = Object.assign({}, defaultConfig, fix)

export let NeededKeys = []

export async function loadConfig () {
  try {
    GlobalConfig = Object.assign(GlobalConfig, await loadBaseConfig(defaultConfig), fix)
    changeLanguage(GlobalConfig.lang)
    NeededKeys = GlobalConfig.neededKeys
    GlobalConfig.getMilepayUrl = function () {
      return GlobalConfig.Protocol + GlobalConfig.Base + ':' + GlobalConfig.milePayPort + '/milePay/'
    }
    GlobalConfig.getReservationUrl = function () {
      return GlobalConfig.Protocol + GlobalConfig.reservationCloudServerBase + '/'
    }
    refreshGetter()
    window.Config = GlobalConfig
  } catch (e) {
    console.log(e)
  }
}

export function refreshGetter () {
  GlobalConfig.getTableInfoKeys = () => {
    return GlobalConfig.tableInfoDisplayOrder
      ? GlobalConfig.tableInfoDisplayOrder.split(',')
      : GlobalConfig.tableInfoKeys
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
