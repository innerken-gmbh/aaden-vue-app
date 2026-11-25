import { CLOUD_BASE, cloudDeviceId, cloudRequest } from '@/api/cloudJson'
import { getCurrentDeviceId } from '@/api/VIPCard/VIPCloudApi'

/**
 * 扫码点餐 / 堂食版的「待开桌」（POS-275）：客人扫桌码后请服务员开桌，这里在收银机上确认或拒绝。
 * 直接调云端 /dine-in/device/{deviceId}/open-requests，开桌逻辑和服务员确认网页是同一套，服务员密码由云端拿门店核对。
 * 云端调用（地址、超时、错误码）在 cloudJson.js，和收银台活动报价共用。
 * 失败时抛出带 code / info 的 Error：code 是云端的错误码（data.errorCode），比如 DINE_WAITER_PW_WRONG。
 */
async function request (path, body) {
  // 开桌要等云端写门店，最多等 40 秒；超时当连不上，不让确认框一直转圈挡住收银界面
  return cloudRequest(`${CLOUD_BASE}/dine-in/device/${await cloudDeviceId()}/open-requests${path}`, body)
}

/**
 * openTables=1：收银机已经开了的桌上还挂着的请求也要（POS-897，带 tableOpen / tablePeople / tableConsumeTypeId）。
 * adjustments：确认时按服务员改门店单、门店还在处理的，和要在收银机上人工核对的（POS-901）
 * @returns {Promise<{requests: Array, nextPollSeconds: number, adjustments: Array}>}
 */
export function loadDineOpenRequests () {
  return request('?openTables=1')
}

/**
 * 打开确认框：占住这一桌，返回人数、自助类型候选（candidates / alternatives）和等待的轮次。
 * adjust=true（POS-901）：已开的桌上云端现读门店，回 canAdjust、tableAdults / tableChildren / tableMode / tableHasDishes / tablePaying / tableType
 */
export function claimDineOpenRequest (sessionId, pw, lang) {
  return request(`/${sessionId}/claim`, { pw, lang, adjust: true })
}

/**
 * 确认。没开的桌传全部人数和类型；已开的桌由调用方决定：门店能改时带 adjust: true、只传服务员动过的项，
 * 不能改时什么都不传（人数和类型以收银机为准）。没传的项不放进请求
 */
export function confirmDineOpenRequest (sessionId, pw, fields = {}) {
  const body = { pw }
  for (const k of ['mode', 'consumeTypeId', 'adults', 'children', 'adjust']) {
    if (fields[k] !== undefined) body[k] = fields[k]
  }
  return request(`/${sessionId}/open`, body)
}

export function rejectDineOpenRequest (sessionId, pw, lang) {
  return request(`/${sessionId}/reject`, { pw, lang })
}

/**
 * 关掉确认框时放开打开时的占用（POS-1064），取消、确认完、拒绝完都调：客人页不再写「X 正在确认」，客人又能改人数。
 * claimId 是 claim 回的这一次占码的凭据，云端只放这一次的（同名的另一台不受影响）；不要密码。失败不要紧，占用 10 分钟后自己过期
 */
export function releaseDineOpenRequest (sessionId, claimId) {
  return request(`/${sessionId}/release`, { claimId })
}

/**
 * 确认请求的结果未知（POS-1064）：连不上、等超时，或者网关回了 5xx 却没有云端的错误码（502/503/504 这类）。
 * 云端自己回的 503（门店连不上、正忙）带错误码，不算在这里
 */
export function dineOpenOutcomeUnknown (code) {
  return code === 'CLOUD_UNREACHABLE' || /^HTTP_5\d\d$/.test(code ?? '')
}

/** 连续失败几次才报：偶尔一次超时不报 */
const POLL_REPORT_AFTER = 2

function clock (ms) {
  return new Date(ms).toTimeString().slice(0, 5)
}

/** 写一条云端的设备事件（ERP 设备页的事件列表，桌面版自动更新也报在这里）。报不出去就算了，不影响收银 */
async function postDeviceEvent (content) {
  try {
    const deviceId = await getCurrentDeviceId()
    if (!deviceId || deviceId === '-1') return
    await fetch(`${CLOUD_BASE}/deviceLog/createEvent`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId: String(deviceId), content, type: '系统生成', operator: 'aaden-pos' })
    })
  } catch (e) {
  }
}

/**
 * 拉待开桌列表失败时上报（POS-1062）：连续失败 [POLL_REPORT_AFTER] 次报一条，之后恢复时再报一条，带失败次数和时间段，中间不重复报。
 * 断网时第一条也报不出去，恢复那条会带上整段。report 可以换掉，测试用
 */
export function createDinePollReporter (report = postDeviceEvent) {
  let failures = 0
  let since = null
  let lastCode = null
  let reported = false
  return {
    failed (code) {
      failures += 1
      since = since ?? Date.now()
      lastCode = code || 'ERROR'
      if (reported || failures < POLL_REPORT_AFTER) return
      reported = true
      report(`堂食待开桌列表拉取失败：从 ${clock(since)} 起连续 ${failures} 次，${lastCode}`)
    },
    succeeded () {
      if (reported) report(`堂食待开桌列表恢复：${clock(since)}–${clock(Date.now())} 失败 ${failures} 次，最后一次 ${lastCode}`)
      failures = 0
      since = null
      lastCode = null
      reported = false
    }
  }
}

/** 错误码和说明 */
export function dineOpenErrorOf (e) {
  return { code: e?.code ?? null, info: e?.info ?? e?.message ?? '', params: e?.params ?? {} }
}

/** 开桌请求从客人提交起多久没人确认就过期（云端 dine-in.request-ttl-minutes 的默认值，POS-897）。老云端不带到期时间时才用，只用来显示 */
export const DINE_REQUEST_TTL_MINUTES = 30

const BERLIN_PARTS = (() => {
  try {
    return new Intl.DateTimeFormat('en-US', {
      timeZone: 'Europe/Berlin',
      hourCycle: 'h23',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
  } catch (e) {
    return null
  }
})()

/** 某一刻柏林比 UTC 快多少毫秒（夏令时 2 小时，冬令时 1 小时） */
function berlinOffset (ms) {
  const p = {}
  BERLIN_PARTS.formatToParts(new Date(ms)).forEach(({ type, value }) => {
    p[type] = parseInt(value)
  })
  return Date.UTC(p.year, p.month - 1, p.day, p.hour, p.minute, p.second) - Math.floor(ms / 1000) * 1000
}

/**
 * 云端时间转成毫秒。云端的 LocalDateTime 是柏林时间、不带时区（requestedAt 等），按柏林解析，
 * 不按收银机自己的时区；带了时区（Z 或 +01:00）的照原样解析
 */
export function cloudTimeMs (text) {
  if (!text) return null
  if (/(Z|[+-]\d{2}:?\d{2})$/i.test(text)) return new Date(text).getTime()
  const m = String(text).match(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/)
  if (!m) return null
  const wall = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +(m[6] || 0))
  if (!BERLIN_PARTS) return new Date(text).getTime()
  // 先按这一刻的时差猜一次，再按猜出来的那一刻的时差校正（夏令时切换前后差一小时）
  return wall - berlinOffset(wall - berlinOffset(wall))
}

/** 客人等了几分钟（只用来显示） */
export function dineRequestWaitedMinutes (r, now = Date.now()) {
  const at = cloudTimeMs(r?.requestedAt)
  return at == null || isNaN(at) ? null : Math.max(0, Math.floor((now - at) / 60000))
}

/**
 * 还剩几分钟过期（只用来显示，请求还在不在以云端列表为准）。
 * 优先用云端的 expiresInSeconds（从收到列表那一刻算，不用对时），其次 expiresAt，老云端按 requestedAt 加 30 分钟估。
 * 算不出时是 null；已经到点、云端还没扫掉的写 1
 */
export function dineRequestMinutesLeft (r, now = Date.now()) {
  let ms = null
  if (typeof r?.expiresInSeconds === 'number') {
    ms = r.expiresInSeconds * 1000 - (r.receivedAt ? now - r.receivedAt : 0)
  } else if (r?.expiresAt) {
    ms = cloudTimeMs(r.expiresAt) - now
  } else if (r?.requestedAt) {
    ms = Math.min(cloudTimeMs(r.requestedAt) + DINE_REQUEST_TTL_MINUTES * 60000 - now, DINE_REQUEST_TTL_MINUTES * 60000)
  }
  return ms == null || isNaN(ms) ? null : Math.max(1, Math.ceil(ms / 60000))
}
