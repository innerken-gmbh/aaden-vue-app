import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import dayjs from 'dayjs'

export const cloudUrl = 'https://cloud-v2.aaden.io/'
export const userUrl = 'membership/user'
export const awardUrl = 'membership/award'
export const cloudOrdersUrl = 'cloudOrders'
export const assetRecordUrl = 'api/asset-records'
export const blUrl = 'common/businessLayer'
const voucherPath = 'membership/voucher/'

export async function getBlId () {
  return (await hillo.get(cloudUrl + blUrl + '/assureShop/' + GlobalConfig.DeviceId)).id
}

export async function getSuperVipList () {
  return (await hillo.get(cloudUrl + userUrl + '/business-layers/' + GlobalConfig.blId + '/members'))
}

export async function getSuperVipInfo (id) {
  return (await hillo.get(cloudUrl + userUrl + '/users/' + id + '/business-layers/' + GlobalConfig.blId + '/details', {}))
}

export function ageDisplay (age) {
  if (!age) {
    return '神秘莫测'
  } else {
    const currentAge = dayjs().diff(dayjs(age), 'year')
    if (currentAge < 10) return 0
    return Math.floor(currentAge / 10) * 10
  }
}

export async function getAllVouchersForUserAndDevice (userId) {
  return (await hillo.get(cloudUrl + voucherPath + 'user/' + userId + '/device/' + GlobalConfig.DeviceId))
}

export async function getAwardProgressByUserId (userId) {
  return (await hillo.get(cloudUrl + awardUrl + '/progress/byUserId/' + userId, {}))
}

export function fromNowTimestamp (timestamp) {
  if (timestamp) {
    return dayjs(timestamp).fromNow()
  } else {
    return '日期有古怪'
  }
}
