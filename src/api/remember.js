import { LocalSettingManager } from 'biewangle'

export const Remember = LocalSettingManager.config({
  defaultPrint: true,
  PDFPrint: false,
  sendToEmail: false,
  keyboardMode: true,
  currentView: 0,
  uuid: '',
  showOtherOrder: false,
  tableBluePrintScale: 1,
  tableDisplayKeys: ['createTimestamp', 'servantName'],
  showFreeDish: false
})
