import { CLOUD_BASE, cloudDeviceId, cloudRequest } from '@/api/cloudJson'

/**
 * 收银台活动（POS-1106，和快消版 antelope、跑堂手机同一组接口）：
 * - 报价 POST /quick-order/device/{设备号}/pos-quote：购物车发上去，云端按「收银台」渠道的活动算好，回门店 PHP 能吃的行；
 * - 菜单角标 GET /quick-order/device/{设备号}/pos-promotions?consumeType=&lang=：挂了活动的菜和折后价（参考价，以报价为准）。
 * 收银机不自己算折扣
 */

/** 报价最多等这么久：超时当连不上，按离线（原价、每行写 0.00） */
export const POS_QUOTE_TIMEOUT_MS = 5 * 1000

export async function posQuote (request) {
  return cloudRequest(`${CLOUD_BASE}/quick-order/device/${await cloudDeviceId()}/pos-quote`, request, { timeoutMs: POS_QUOTE_TIMEOUT_MS })
}

export async function posMenuPromotions (consumeType, lang) {
  const query = `consumeType=${encodeURIComponent(consumeType)}&lang=${encodeURIComponent(lang)}`
  return cloudRequest(`${CLOUD_BASE}/quick-order/device/${await cloudDeviceId()}/pos-promotions?${query}`, null, { timeoutMs: POS_QUOTE_TIMEOUT_MS })
}
