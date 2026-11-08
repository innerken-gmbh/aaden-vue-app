import hillo from 'hillo'

/** 错误不弹全局提示，由确认框自己按错误码显示 */
const SILENT = { silent: true }

/**
 * 堂食扫码的「待开桌」（POS-275）：客人扫桌码后请服务员开桌，这里在收银机上确认或拒绝。
 * 都走门店 PHP（QuickOrder.php），PHP 先核对服务员密码再转给云端，开桌逻辑和服务员确认网页是同一套。
 * 失败时 hillo 抛出 axios 响应，data 是 PHP 回包 { status: 'bad', info, content: { code } }。
 */

/** @returns {Promise<{requests: Array, nextPollSeconds: number}>} */
export async function loadDineOpenRequests () {
  return (await hillo.silentGet('QuickOrder.php?op=dineOpenRequests')).content
}

/** 打开确认框：占住这一桌，返回人数、自助类型候选（candidates / alternatives）和等待的轮次 */
export async function claimDineOpenRequest (sessionId, pw, lang) {
  return (await hillo.post('QuickOrder.php?op=dineClaimOpen', { sessionId, pw, lang }, SILENT)).content
}

export async function confirmDineOpenRequest (sessionId, pw, { mode, consumeTypeId, adults, children }) {
  return (await hillo.post('QuickOrder.php?op=dineConfirmOpen', {
    sessionId,
    pw,
    mode: mode ?? '',
    consumeTypeId: consumeTypeId ?? '',
    adults,
    children
  }, SILENT)).content
}

export async function rejectDineOpenRequest (sessionId, pw, lang) {
  return (await hillo.post('QuickOrder.php?op=dineRejectOpen', { sessionId, pw, lang }, SILENT)).content
}

/** 云端的错误码（PHP 放在 content.code），没有时用 info */
export function dineOpenErrorOf (e) {
  return { code: e?.data?.content?.code ?? null, info: e?.data?.info ?? e?.message ?? '' }
}
