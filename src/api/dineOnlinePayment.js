import hillo from 'hillo'
import i18n from '@/i18n'
import { showConfirmAsyn } from '@/oldjs/common'

/**
 * 堂食客人正在手机上线上付款（POS-1067）。标记只存在门店，只有云端写：客人打开付款页时写 paying，
 * 钱到了、门店还没结时是 paid，付完结账、取消、过期时云端清掉。收银机只读：桌子列表（showAllTableWithCells）
 * 和 currentInfo 每一行带 onlinePayment（{ state, amount, expiresAt }，没有时是 null）。
 */
export function onlinePaymentOf (info) {
  const mark = info?.onlinePayment
  return mark && (mark.state === 'paying' || mark.state === 'paid') ? mark : null
}

/** 桌卡上的小条文字 */
export function onlinePaymentBadge (mark) {
  return i18n.t(mark.state === 'paid' ? 'DineOnlinePaidBadge' : 'DineOnlinePayingBadge', { amount: mark.amount })
}

/**
 * 结账前现读门店：客人正在付或已经付了就先问服务员。读不到门店时不挡结账（门店结账时云端还会核对金额）。
 * @return {Promise<boolean>} true = 继续结账
 */
export async function confirmCheckoutDuringOnlinePayment (tableId, tableName) {
  let mark = null
  try {
    mark = onlinePaymentOf((await hillo.silentGet('Tables.php', { op: 'currentInfo', id: tableId }, { noDebug: true })).content)
  } catch (e) {
    return true
  }
  if (!mark) {
    return true
  }
  const paid = mark.state === 'paid'
  const answer = await showConfirmAsyn(
    i18n.t(paid ? 'DineOnlinePaidConfirmHint' : 'DineOnlinePayingConfirmHint', { table: tableName ?? '', amount: mark.amount }),
    i18n.t(paid ? 'DineOnlinePaidConfirmTitle' : 'DineOnlinePayingConfirmTitle')
  )
  return !!answer?.value
}
