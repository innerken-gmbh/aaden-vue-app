/*
 * Copyright (c) 2025. Haodong JU
 */

import { hillo } from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { cloudUrl } from '@/api/SuperVipApi/SuperVip'

export async function getUserBusinessLayerDetail (userId, blId = GlobalConfig.blId) {
  return await hillo.get(cloudUrl + 'membership/user/users/' + userId + '/business-layers/' + blId + '/details')
}
