/*
 * Copyright (c) 2025. Haodong JU
 */

import { hillo } from 'hillo'
import { cloudUrl } from '@/api/SuperVipApi/SuperVip'

export async function getUserOrdersByDeviceId (customerId, deviceId) {
  return (await hillo.get(cloudUrl + 'cloudOrders/getUserOrdersByDevice/' + customerId + '/' + deviceId))
}
