import IKUtils from 'innerken-js-utils'
import { getCurrentDeviceId } from '@/api/VIPCard/VIPCloudApi'

/**
 * 直接调云端 JSON 接口（扫码开桌请求 POS-275、收银台活动报价 POS-1106 共用）。
 * 云端地址默认 cloud-v2.aaden.io，本机联调时可以用地址栏 ?CloudBase=http://localhost:8096 覆盖。
 * 回包 {code:200, data}；失败时抛出带 code / info / params 的 Error：code 是云端的错误码（data.errorCode），
 * 没有错误码时是 HTTP_<状态>，连不上、超时是 CLOUD_UNREACHABLE
 */
export const CLOUD_BASE = (IKUtils.getQueryString('CloudBase') || 'https://cloud-v2.aaden.io').replace(/\/$/, '')

export function cloudFail (code, info, params = {}) {
  return Object.assign(new Error(info || code), { code, info, params })
}

/** 这台收银机的设备号；拿不到抛 NO_DEVICE_ID */
export async function cloudDeviceId () {
  const deviceId = await getCurrentDeviceId()
  if (!deviceId || deviceId === '-1') throw cloudFail('NO_DEVICE_ID', 'no device id')
  return deviceId
}

/**
 * 发一次请求：有 body 就 POST JSON，没有就 GET。[timeoutMs] 到了就当连不上，读正文也算在里面
 * （只有响应头到了、正文一直不结束时，界面不能一直转圈，POS-991）
 */
export async function cloudRequest (url, body = null, { timeoutMs = 40 * 1000 } = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), timeoutMs)
  let res
  let json
  try {
    res = await fetch(url, body
      ? { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: controller.signal }
      : { method: 'GET', signal: controller.signal })
    json = await res.json().catch(e => {
      if (controller.signal.aborted) throw e
      return null
    })
  } catch (e) {
    throw cloudFail('CLOUD_UNREACHABLE', e?.message ?? '')
  } finally {
    clearTimeout(timer)
  }
  if (res.ok && json?.code === 200) return json.data
  throw cloudFail(json?.data?.errorCode ?? (res.ok ? 'CLOUD_ERROR' : `HTTP_${res.status}`), json?.message ?? '', json?.data?.params ?? {})
}
