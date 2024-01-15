import { DefaultAddressInfo } from '@/oldjs/StaticModel'
import dayjs from 'dayjs'
import { loadRestaurantInfo } from '@/api/api'
import hillo from 'hillo'

const defaultRestaurantInfo = {
  tableColor: '#ffffff',
  callColor: '#f57f17'
}
let restaurantInfo = null

export async function getRestaurantInfo () {
  if (!restaurantInfo) {
    restaurantInfo = Object.assign(await loadRestaurantInfo(), defaultRestaurantInfo)
  }
  return restaurantInfo ?? defaultRestaurantInfo
}

export function beautifulTable (table) {
  const res = Object.assign({}, defaultTable, table)
  res.inUse = res.usageStatus === '1'
  res.inCall = res.callService === '1'
  let addressInfo = null
  if (table?.rawAddressInfo?.length > 0) {
    try {
      addressInfo = JSON.parse(table?.rawAddressInfo)
    } catch (e) {
      addressInfo = null
    }
  }
  res.addressInfo = Object.assign({}, DefaultAddressInfo, addressInfo)
  res.addressInfo.toNow = 999
  if (res.addressInfo.time !== 'ASAP') {
    const [hour, minute] = res.addressInfo.time.split(':')
    const time = dayjs().set('h', hour).set('m', minute)
    res.addressInfo.toNow = time.diff(dayjs(), 'm')
  }

  return res
}

export const defaultTable = {
  tableName: '1',
  usageStatus: '1',
  callService: '0',
  dishCount: 0,
  drinkCount: 0
}

export const cloudUrl = 'https://cloud5.api.aaden.io'

export async function getBaseAndUrlForDeviceId (deviceId) {
  const url = (await findDeviceByDeviceId(deviceId))
    ?.baseUrl ?? getNgrokUrl(deviceId)

  return {
    deviceId,
    url
  }
}

export function getNgrokUrl (deviceId) {
  return `${location.protocol}//ik${deviceId.padStart(4, '0')}.ngrok.aaden.io`
}

export async function findDeviceByDeviceId (deviceId) {
  try {
    return (await hillo.jsonPost(cloudUrl + '/virtualDevice/search', { deviceId: deviceId })).data?.[0]
  } catch (e) {
    console.log(e)
    return null
  }
}
