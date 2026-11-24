import hillo from 'hillo'
import i18n from '@/i18n'
import { showConfirmAsyn } from '@/oldjs/common'

/**
 * 堂食客人线上付款（POS-1067）。标记只存在门店，只有云端写：客人打开付款页时写 paying，钱到了、云端正在结时是 paid，
 * 云端结不了（金额对不上等）转人工时是 review，结好、取消、过期、Portal 上处理完时云端清掉。收银机只读：桌子列表（showAllTableWithCells）
 * 和 currentInfo 每一行带 onlinePayment（{ state, amount, payMethodId, tip, used, available, expiresAt }，没有时是 null）。
 * POS-1096：payMethodId 是云端这一笔结账用的门店付款方式，转人工时结账键盘按它出「线上付款」；tip 客人线上付的小费；
 * used 收银机已经用「线上付款」记掉的（含小费），available 还能记多少。账只在门店记，收银机每次结账都现读，不自己扣减。
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
 * 待人工处理（review）、云端带了付款方式时，结账键盘上出「线上付款」（POS-1096）：记成和云端自动结账同一个付款方式。
 * available 是门店说还能记多少（客人线上付的含小费，减去已经记掉的）；tip 只在一次都没记过时预填（记过就已经带走了）。
 * 别的状态、老门店 / 老云端没带付款方式、已经记完时是 null，键盘照常
 * @return {{ id: string, available: number, tip: number } | null}
 */
export function onlinePayKeyOf (mark) {
  if (mark?.state !== 'review' || !mark.payMethodId) return null
  const available = parseFloat(mark.available ?? mark.amount)
  if (!(available > 0)) return null
  const used = parseFloat(mark.used ?? 0) || 0
  const tip = used > 0 ? 0 : Math.min(parseFloat(mark.tip ?? 0) || 0, available)
  return { id: String(mark.payMethodId), available, tip }
}

/**
 * 结账前现读门店：客人正在付、已经付了就先问服务员；待人工处理时写明怎么结。读不到门店时不挡结账（门店结账时云端还会核对金额）。
 * @return {Promise<{ proceed: boolean, onlinePay: ({ id: string, amount: number } | null) }>}
 *   proceed = 继续结账；onlinePay = 结账键盘上要出的「线上付款」，见 onlinePayKeyOf
 */
export async function confirmCheckoutDuringOnlinePayment (tableId, tableName) {
  let mark = null
  try {
    mark = onlinePaymentOf((await hillo.silentGet('Tables.php', { op: 'currentInfo', id: tableId }, { noDebug: true })).content)
  } catch (e) {
    return { proceed: true, onlinePay: null }
  }
  if (!mark) {
    return { proceed: true, onlinePay: null }
  }
  const text = TEXT[mark.state]
  const onlinePay = onlinePayKeyOf(mark)
  // 待处理时写还能记多少：分单、换一台收银机再结时就是剩下的
  const amount = onlinePay ? onlinePay.available.toFixed(2) : mark.amount
  const answer = await showConfirmAsyn(
    i18n.t(text.hint, { table: tableName ?? '', amount }),
    i18n.t(text.title)
  )
  return { proceed: !!answer?.value, onlinePay }
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
