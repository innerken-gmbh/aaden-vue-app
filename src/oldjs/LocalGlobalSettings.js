import { AadenBaseConfig } from 'aaden-base-model/lib/AadenSettingManager'
import i18n from '@/i18n'

import dayjs from 'dayjs'
import { goHome } from '@/oldjs/StaticModel'
import {
  getAdminSettingConfig,
  getReservationStatus
} from '@/api/api'
import IKUtils from 'innerken-js-utils'

const fix = require('@/assets/FixedConfig.json')
const defaultConfig = require('@/assets/AadenConfig.json')
let GlobalConfig = Object.assign({}, defaultConfig, fix)

export let NeededKeys = []

export async function loadConfig () {
  try {
    GlobalConfig = Object.assign(GlobalConfig, await AadenBaseConfig(defaultConfig), fix)
    NeededKeys = GlobalConfig.neededKeys
    GlobalConfig.getBaseUrl = function () {
      return location.protocol + '//' + GlobalConfig.Base + '/'
    }
    GlobalConfig.startUpTimestamp = dayjs().utcOffset()
    refreshGetter()
    window.Config = GlobalConfig
    console.log(GlobalConfig.lang)
  } catch (e) {
    console.log(e)
  }
}

export async function getAdminSetting () {
  GlobalConfig.searchIncludesCode = await getAdminSettingConfig('searchIncludesCode', '0', '0', 'boolean', '', 'basic,FrontApp')
  GlobalConfig.activeReservation = (await getAdminSettingConfig('activeReservation', '0', '0', 'boolean', '', 'basic,FrontApp,Reservation')) === '1'
  setTimeout(async () => {
    GlobalConfig.activeReservation = await getReservationStatus()
  }, 20)
  GlobalConfig.openCashBoxByPw = await getAdminSettingConfig('openCashBoxByPw', '0', '0', 'boolean', '', 'basic,FrontApp')
  GlobalConfig.deleteOneKeys = await getAdminSettingConfig('deleteOneKeys', '0', '0', 'boolean', '', 'basic,FrontApp')
  GlobalConfig.closePlaySound = await getAdminSettingConfig('closePlaySound', '0', '0', 'boolean', '', 'basic,FrontApp')
  GlobalConfig.userTableColor = await getAdminSettingConfig('useTableColorSetting', '0', '0', 'boolean', '', 'basic,FrontApp')
  GlobalConfig.usefulKey = await getAdminSettingConfig('usefulKey', 'E,F,B,R', 'E,F,B,R', 'string', '', 'basic,FrontApp')
  GlobalConfig.discountWithPassword = await getAdminSettingConfig('discountWithPassword', '0', '0', 'boolean', '', 'basic,FrontApp')
  GlobalConfig.bigDiscountRatio = await getAdminSettingConfig('bigDiscountRatio', '0.7', '0.7', 'string', '', 'basic,FrontApp')
  GlobalConfig.googleMapCountry = await getAdminSettingConfig('googleMapCountry', 'DE', 'DE', 'string', '', 'basic,FrontApp')
  GlobalConfig.escBackToHome = await getAdminSettingConfig('escBackToHome', '0', '0', 'boolean', '', 'basic,FrontApp')
  GlobalConfig.enterToOrder = await getAdminSettingConfig('enterToOrder', '0', '0', 'boolean', '', 'basic,FrontApp')
  GlobalConfig.defaultPassword = await getAdminSettingConfig('defaultPassword', '111', '111', 'string', '', 'basic,FrontApp')
  GlobalConfig.numberFirst = await getAdminSettingConfig('numberFirst', '0', '0', 'boolean', '', 'basic,FrontApp')
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

export async function useCurrentConfig () {
  await goHome()
  setTimeout(() => {
    GlobalConfig.useCurrentConfig(GlobalConfig)
  }, 400)
}

export function hardReload () {
  GlobalConfig.hardReload()
}

export function setDeviceId (id) {
  GlobalConfig.updateSettings('DeviceId', id)
  reload()
}

export async function changeLanguage (lang) {
  const l = lang.toLowerCase()
  const backServerLang = ['de', 'zh', 'en']
  if (backServerLang.includes(l)) {
    GlobalConfig.updateSettings('lang', l)
  } else {
    GlobalConfig.updateSettings('lang', 'de')
  }
  i18n.locale = l
  await IKUtils.wait(50)
}

export default GlobalConfig
