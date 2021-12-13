import hillo from 'hillo'

const defaultRestaurantInfo = {
  tableColor: '#ffffff',
  callColor: '#f57f17'
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

export const defaultTable = {
  tableName: '1',
  usageStatus: '1',
  callService: '0'
}
