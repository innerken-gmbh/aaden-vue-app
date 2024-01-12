import { LocalSettingManager } from 'biewangle'

export const Remember = LocalSettingManager.config({
  keyboardMode: false,
  currentView: 0,
  uuid: '',
  showOtherOrder: false,
  tableBluePrintScale: 1,
  tableDisplayKeys: ['createTimestamp', 'servantName'],
  showFreeDish: false
})
