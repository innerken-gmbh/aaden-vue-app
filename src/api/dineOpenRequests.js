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
  try {
    res = await fetch(url, body
      ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: controller.signal }
      : { method: 'GET', signal: controller.signal })
  } catch (e) {
    clearTimeout(timer)
    throw fail('CLOUD_UNREACHABLE', e?.message ?? '')
  }
  clearTimeout(timer)
  const json = await res.json().catch(() => null)
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
