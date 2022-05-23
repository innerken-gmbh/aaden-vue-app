import { LocalSettingManager } from 'biewangle'
import i18n from '@/i18n'

export const Remember = LocalSettingManager.config({
  keyboardMode: true,
  currentView: 0,
  uuid: '',
  showOtherOrder: false,
  tableBluePrintScale: 1,
  tableDisplayKeys: [i18n.t('createTimestamp'), i18n.t('servantName')]
})
