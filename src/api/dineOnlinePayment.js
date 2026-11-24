import hillo from 'hillo'
import i18n from '@/i18n'
import { showConfirmAsyn } from '@/oldjs/common'

/**
 * 堂食客人线上付款（POS-1067）。标记只存在门店，只有云端写：客人打开付款页时写 paying，钱到了、云端正在结时是 paid，
 * 云端结不了（金额对不上等）转人工时是 review，结好、取消、过期、Portal 上处理完时云端清掉。收银机只读：桌子列表（showAllTableWithCells）
 * 和 currentInfo 每一行带 onlinePayment（{ state, amount, expiresAt }，没有时是 null）。
 */
export function onlinePaymentOf (info) {
  const mark = info?.onlinePayment
  return mark && TEXT[mark.state] ? mark : null
}

/** 每种状态的文案键：桌卡小条、结账前确认框的标题和说明 */
const TEXT = {
  paying: { badge: 'DineOnlinePayingBadge', title: 'DineOnlinePayingConfirmTitle', hint: 'DineOnlinePayingConfirmHint' },
  paid: { badge: 'DineOnlinePaidBadge', title: 'DineOnlinePaidConfirmTitle', hint: 'DineOnlinePaidConfirmHint' },
  review: { badge: 'DineOnlineReviewBadge', title: 'DineOnlineReviewConfirmTitle', hint: 'DineOnlineReviewConfirmHint' }
}

/** 桌卡上的小条文字 */
export function onlinePaymentBadge (mark) {
  return i18n.t(TEXT[mark.state].badge, { amount: mark.amount })
}

/**
 * 结账前现读门店：客人正在付、已经付了就先问服务员；待人工处理时写明怎么结。读不到门店时不挡结账（门店结账时云端还会核对金额）。
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
  const text = TEXT[mark.state]
  const answer = await showConfirmAsyn(
    i18n.t(text.hint, { table: tableName ?? '', amount: mark.amount }),
    i18n.t(text.title)
  )
  return !!answer?.value
}

/**
 * 加菜被门店拒绝时给服务员看的话（POS-1067）。线上付款结账和加菜同时到时，门店会拒绝加菜：
 * 单已经结了回 Diese Bestellung ist beendet，正在结账、等锁超时回 TABLE_BUSY。别的原因照门店原文显示
 */
export function addDishesRefusedText (info) {
  const key = ADD_DISHES_REFUSED[(info ?? '').trim()]
  return key ? i18n.t(key) : info
}

const ADD_DISHES_REFUSED = {
  'Diese Bestellung ist beendet': 'DineAddDishesOrderClosed',
  TABLE_BUSY: 'DineAddDishesTableBusy'
}
