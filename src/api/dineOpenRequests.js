import IKUtils from 'innerken-js-utils'
import { getCurrentDeviceId } from '@/api/VIPCard/VIPCloudApi'

/**
 * 扫码点餐 / 堂食版的「待开桌」（POS-275）：客人扫桌码后请服务员开桌，这里在收银机上确认或拒绝。
 * 直接调云端 /dine-in/device/{deviceId}/open-requests，开桌逻辑和服务员确认网页是同一套，服务员密码由云端拿门店核对。
 * 云端地址默认 cloud-v2.aaden.io，本机联调时可以用地址栏 ?CloudBase=http://localhost:8096 覆盖。
 * 失败时抛出带 code / info 的 Error：code 是云端的错误码（data.errorCode），比如 DINE_WAITER_PW_WRONG。
 */
const CLOUD_BASE = (IKUtils.getQueryString('CloudBase') || 'https://cloud-v2.aaden.io').replace(/\/$/, '')

function fail (code, info, params = {}) {
  return Object.assign(new Error(info || code), { code, info, params })
}

async function base () {
  const deviceId = await getCurrentDeviceId()
  if (!deviceId || deviceId === '-1') throw fail('NO_DEVICE_ID', 'no device id')
  return `${CLOUD_BASE}/dine-in/device/${deviceId}/open-requests`
}

async function request (path, body) {
  const url = (await base()) + path
  // 开桌要等云端写门店，最多等 40 秒；超时当连不上，不让确认框一直转圈挡住收银界面
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), 40 * 1000)
  let res
  let json
  try {
    res = await fetch(url, body
      ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: controller.signal }
      : { method: 'GET', signal: controller.signal })
    // 读正文也算在 40 秒里：只有响应头到了、正文一直不结束时，确认框会永远转圈，自动更新也一直被挡（POS-991）
    json = await res.json().catch(e => {
      if (controller.signal.aborted) throw e
      return null
    })
  } catch (e) {
    throw fail('CLOUD_UNREACHABLE', e?.message ?? '')
  } finally {
    clearTimeout(timer)
  }
  if (res.ok && json?.code === 200) return json.data
  throw fail(json?.data?.errorCode ?? (res.ok ? 'CLOUD_ERROR' : `HTTP_${res.status}`), json?.message ?? '', json?.data?.params ?? {})
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
