import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export async function loadBillList (dateStart, dateEnd) {
  return (await hillo.get('Orders.php?op=withSortAndFilter', {
    lang: GlobalConfig.lang,
    timespan: `${dateStart} - ${dateEnd}`
  })).content.map(o => {
    o.returnDishCount = Math.abs(o.returnDishCount ?? 0)
    o.discountDishCount = Math.abs(o.discountDishCount ?? 0)
    return o
  })
}
