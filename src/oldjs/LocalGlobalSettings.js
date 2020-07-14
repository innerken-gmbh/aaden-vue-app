
const StaticSetting = require('@/assets/AadenConfig.json')

let Config = {}
Config.IP = 'localhost'
Config.Dir = ''
Config.REALROOT = `https://${Config.IP}${(Config.Dir.length > 0 ? '/' + Config.Dir : '')}`
Config = Object.assign(Config, StaticSetting)
Config.PHPROOT = `${Config.REALROOT}/PHP/`
Config.lang = StaticSetting.lang
window.Config = Config

export const _Config = Config

StaticSetting.fetch = false
export default StaticSetting
