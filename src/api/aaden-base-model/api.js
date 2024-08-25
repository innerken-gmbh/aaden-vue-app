import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

const noDebug = { noDebug: true }

export async function getCategoryTypeList () {
  return (await hillo.get('CategoryType.php', {
    lang: GlobalConfig.getLang()
  }))
    .content
}

export async function getOrderInfo (tableId, usePrintModAsName = false) {
  return (await hillo.silentGet('Complex.php', {
    op: 'dishesInTable',
    tableId,
    lang: GlobalConfig.getLang(),
    usePrintModAsName: usePrintModAsName | 0
  }, noDebug))?.content ?? []
}
