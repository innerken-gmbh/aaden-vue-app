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
  let res
  try {
    res = await fetch(url, body
      ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
      : { method: 'GET' })
  } catch (e) {
    throw fail('CLOUD_UNREACHABLE', e?.message ?? '')
  }
  const json = await res.json().catch(() => null)
  if (res.ok && json?.code === 200) return json.data
  throw fail(json?.data?.errorCode ?? (res.ok ? 'CLOUD_ERROR' : `HTTP_${res.status}`), json?.message ?? '', json?.data?.params ?? {})
}

/** @returns {Promise<{requests: Array, nextPollSeconds: number}>} */
export function loadDineOpenRequests () {
  return request('')
}

/** 打开确认框：占住这一桌，返回人数、自助类型候选（candidates / alternatives）和等待的轮次 */
export function claimDineOpenRequest (sessionId, pw, lang) {
  return request(`/${sessionId}/claim`, { pw, lang })
}

export function confirmDineOpenRequest (sessionId, pw, { mode, consumeTypeId, adults, children }) {
  return request(`/${sessionId}/open`, { pw, mode: mode || null, consumeTypeId: consumeTypeId || null, adults, children })
}

export function rejectDineOpenRequest (sessionId, pw, lang) {
  return request(`/${sessionId}/reject`, { pw, lang })
}

/** 错误码和说明 */
export function dineOpenErrorOf (e) {
  return { code: e?.code ?? null, info: e?.info ?? e?.message ?? '', params: e?.params ?? {} }
}
