import { AadenBaseConfig } from 'aaden-base-model/lib/AadenSettingManager'
import i18n from '@/i18n'

import dayjs from 'dayjs'
import { goHome } from '@/oldjs/StaticModel'
import {
  getAdminSettingConfig
} from '@/api/api'
import IKUtils from 'innerken-js-utils'
import hillo from 'hillo'
import { getBlId } from '@/api/SuperVipApi/SuperVip'

const fix = require('@/assets/FixedConfig.json')
const defaultConfig = require('@/assets/AadenConfig.json')
let GlobalConfig = Object.assign({}, defaultConfig, fix)

export let NeededKeys = []

export async function loadConfig () {
  try {
    GlobalConfig = Object.assign(GlobalConfig, await AadenBaseConfig(defaultConfig), fix)
    NeededKeys = GlobalConfig.neededKeys
    GlobalConfig.getBaseUrl = function () {
      return (location.protocol === 'https' ? 'https' : 'http') + '://' + GlobalConfig.Base + '/'
    }
    hillo.initial(GlobalConfig.getBaseUrl() + 'PHP/')
    GlobalConfig.startUpTimestamp = dayjs().utcOffset()
    refreshGetter()
    window.Config = GlobalConfig
    GlobalConfig.blId = await getBlId()
    console.log(GlobalConfig.lang)
  } catch (e) {
    console.log(e)
  }
}

export async function getAdminSetting () {
  const settingsConfig = [
    { key: 'searchIncludesCode', defaultValue: '0', value: '0', type: 'boolean', options: '', tagList: 'basic,FrontApp' },
    { key: 'openCashBoxByPw', defaultValue: '0', value: '0', type: 'boolean', options: '', tagList: 'basic,FrontApp' },
    { key: 'deleteOneKeys', defaultValue: '0', value: '0', type: 'boolean', options: '', tagList: 'basic,FrontApp' },
    { key: 'activeReservation', defaultValue: '0', value: '0', type: 'boolean', options: '', tagList: 'basic,FrontApp,Reservation' },
    { key: 'closePlaySound', defaultValue: '0', value: '0', type: 'boolean', options: '', tagList: 'basic,FrontApp' },
    { key: 'useTableColorSetting', defaultValue: '0', value: '0', type: 'boolean', options: '', tagList: 'basic,FrontApp', configKey: 'userTableColor' },
    { key: 'usefulKey', defaultValue: 'E,F,B,R', value: 'E,F,B,R', type: 'string', options: '', tagList: 'basic,FrontApp' },
    { key: 'discountWithPassword', defaultValue: '0', value: '0', type: 'boolean', options: '', tagList: 'basic,FrontApp' },
    { key: 'bigDiscountRatio', defaultValue: '0.7', value: '0.7', type: 'string', options: '', tagList: 'basic,FrontApp' },
    { key: 'googleMapCountry', defaultValue: 'DE', value: 'DE', type: 'string', options: '', tagList: 'basic,FrontApp' },
    { key: 'escBackToHome', defaultValue: '0', value: '0', type: 'boolean', options: '', tagList: 'basic,FrontApp' },
    { key: 'enterToOrder', defaultValue: '0', value: '0', type: 'boolean', options: '', tagList: 'basic,FrontApp' },
    { key: 'defaultPassword', defaultValue: '111', value: '111', type: 'string', options: '', tagList: 'basic,FrontApp' },
    { key: 'numberFirst', defaultValue: '0', value: '0', type: 'boolean', options: '', tagList: 'basic,FrontApp' },
    { key: 'language', defaultValue: 'de', value: 'de', type: 'string', options: '', tagList: 'basic,FrontApp', configKey: 'lang' },
    { key: 'printZwichenBonWithTakeawayOrder', defaultValue: '0', value: '0', type: 'boolean', options: '', tagList: 'basic,FrontApp' },
    { key: 'jumpToHomeWhenOrder', defaultValue: '1', value: '1', type: 'boolean', options: '', tagList: 'basic,FrontApp' },
    { key: 'returnDishWithoutPassword', defaultValue: '0', value: '0', type: 'boolean', options: '', tagList: 'basic,FrontApp' },
    { key: 'hideOrderWithoutPrintBtn', defaultValue: '0', value: '0', type: 'boolean', options: '', tagList: 'basic,FrontApp' },
    { key: 'tableDisplayKeys', defaultValue: 'createTimestamp|servantName', value: 'createTimestamp|servantName', type: 'string', options: '', tagList: 'basic,FrontApp' }
  ]

  const results = await Promise.all(
    settingsConfig.map(setting =>
      getAdminSettingConfig(
        setting.key,
        setting.value,
        setting.defaultValue,
        setting.type,
        setting.options,
        setting.tagList
      )
    )
  )
  results.forEach((result, index) => {
    const setting = settingsConfig[index]
    const configKey = setting.configKey || setting.key

    if (setting.key === 'activeReservation') {
      GlobalConfig[configKey] = result === '1'
    } else if (setting.key === 'tableDisplayKeys') {
      GlobalConfig[configKey] = result.split('|')
    } else {
      GlobalConfig[configKey] = result
    }
  })
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
