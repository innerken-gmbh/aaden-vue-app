import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { getReservationStatus, getMultipleSystemSettings, commonSettingConfig } from '@/api/api'

/**
 * Fetches all admin settings concurrently and assigns them to GlobalConfig
 * @returns {Promise<void>}
 */
export async function getAdminSetting () {
  try {
    // Define all the settings to fetch with the common format used by getMultipleSystemSettings
    const settingsToFetch = [
      { ...commonSettingConfig, sKey: 'searchIncludesCode', sValue: '0', defaultValue: '0', sType: 'boolean', tagList: 'basic,FrontApp' },
      { ...commonSettingConfig, sKey: 'activeReservation', sValue: '0', defaultValue: '0', sType: 'boolean', tagList: 'basic,FrontApp,Reservation' },
      { ...commonSettingConfig, sKey: 'openCashBoxByPw', sValue: '0', defaultValue: '0', sType: 'boolean', tagList: 'basic,FrontApp' },
      { ...commonSettingConfig, sKey: 'deleteOneKeys', sValue: '0', defaultValue: '0', sType: 'boolean', tagList: 'basic,FrontApp' },
      { ...commonSettingConfig, sKey: 'closePlaySound', sValue: '0', defaultValue: '0', sType: 'boolean', tagList: 'basic,FrontApp' },
      { ...commonSettingConfig, sKey: 'useTableColorSetting', sValue: '0', defaultValue: '0', sType: 'boolean', tagList: 'basic,FrontApp' },
      { ...commonSettingConfig, sKey: 'usefulKey', sValue: 'E,F,B,R', defaultValue: 'E,F,B,R', sType: 'string', tagList: 'basic,FrontApp' },
      { ...commonSettingConfig, sKey: 'discountWithPassword', sValue: '0', defaultValue: '0', sType: 'boolean', tagList: 'basic,FrontApp' },
      { ...commonSettingConfig, sKey: 'bigDiscountRatio', sValue: '0.7', defaultValue: '0.7', sType: 'string', tagList: 'basic,FrontApp' },
      { ...commonSettingConfig, sKey: 'googleMapCountry', sValue: 'DE', defaultValue: 'DE', sType: 'string', tagList: 'basic,FrontApp' },
      { ...commonSettingConfig, sKey: 'escBackToHome', sValue: '0', defaultValue: '0', sType: 'boolean', tagList: 'basic,FrontApp' },
      { ...commonSettingConfig, sKey: 'enterToOrder', sValue: '0', defaultValue: '0', sType: 'boolean', tagList: 'basic,FrontApp' },
      { ...commonSettingConfig, sKey: 'defaultPassword', sValue: '111', defaultValue: '111', sType: 'string', tagList: 'basic,FrontApp' },
      { ...commonSettingConfig, sKey: 'numberFirst', sValue: '0', defaultValue: '0', sType: 'boolean', tagList: 'basic,FrontApp' },
      { ...commonSettingConfig, sKey: 'language', sValue: 'de', defaultValue: 'de', sType: 'string', tagList: 'basic,FrontApp,language' }
    ]

    // Get all settings concurrently using getMultipleSystemSettings
    const results = await getMultipleSystemSettings(settingsToFetch)

    // Assign results to GlobalConfig properties
    GlobalConfig.searchIncludesCode = results[0]
    GlobalConfig.activeReservation = results[1] === '1'
    GlobalConfig.openCashBoxByPw = results[2]
    GlobalConfig.deleteOneKeys = results[3]
    GlobalConfig.closePlaySound = results[4]
    GlobalConfig.userTableColor = results[5]
    GlobalConfig.usefulKey = results[6]
    GlobalConfig.discountWithPassword = results[7]
    GlobalConfig.bigDiscountRatio = results[8]
    GlobalConfig.googleMapCountry = results[9]
    GlobalConfig.escBackToHome = results[10]
    GlobalConfig.enterToOrder = results[11]
    GlobalConfig.defaultPassword = results[12]
    GlobalConfig.numberFirst = results[13]
    GlobalConfig.lang = results[14]

    // Handle the special case for activeReservation
    setTimeout(async () => {
      try {
        GlobalConfig.activeReservation = await getReservationStatus()
      } catch (e) {
        console.error('Error updating reservation status:', e)
      }
    }, 20)
  } catch (e) {
    console.error('Error getting admin settings:', e)
  }
}
