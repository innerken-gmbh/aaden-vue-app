import { IKUtils } from 'innerken-utils'
import settings from 'electron-settings'
import { reload } from './common'

const localConfig = require('@/assets/AadenConfig.json')
const StaticSetting = Object.assign(localConfig, settings.get('config'))
const urlLang = IKUtils.getQueryString('lang')
// console.log(StaticSetting.lang)
StaticSetting.lang = urlLang || StaticSetting.lang
// console.log(StaticSetting.lang)
let Config = {}
Config.IP = 'localhost'
Config.Dir = ''
Config.REALROOT = `https://${Config.IP}${(Config.Dir.length > 0 ? '/' + Config.Dir : '')}`
Config = Object.assign(Config, StaticSetting)
Config.PHPROOT = `${Config.REALROOT}/PHP/`
Config.lang = StaticSetting.lang
window.Config = Config
window.useCurrentConfig = useCurrentConfig
window.hardReload = hardReload
window.setDeviceId = setDeviceId

function useCurrentConfig () {
  settings.set('config', Config)
  reload()
}

function hardReload () {
  settings.deleteAll()
}

function setDeviceId (id) {
  settings.set('config.DeviceId', id)
  reload()
}

export function changeLanguage (l) {
  settings.set('config.lang', l)
  reload()
}

let debugCounter = 0

export function toggleDebug () {
  debugCounter++
  if (debugCounter > 10) {
    settings.set('config.Debug', !settings.get('config.Debug'))
    reload()
    debugCounter = 0
  }
}

export const _Config = Config

StaticSetting.fetch = false
export default StaticSetting
