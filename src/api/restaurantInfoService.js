import hillo from 'hillo'
import { DefaultAddressInfo } from '@/oldjs/StaticModel'

const defaultRestaurantInfo = {
  tableColor: '#ffffff', callColor: '#f57f17'
}
let restaurantInfo = null
let loading = false

export function getRestaurantInfo () {
  if (!restaurantInfo && !loading) {
    loading = true
    hillo.get('Restaurant.php?op=view').then(res => {
      restaurantInfo = Object.assign({}, defaultRestaurantInfo, (res).content[0])
    }).finally(() => {
      loading = false
    })
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
  return res
}

export const defaultTable = {
  tableName: '1', usageStatus: '1', callService: '0', dishCount: 0, drinkCount: 0
}
