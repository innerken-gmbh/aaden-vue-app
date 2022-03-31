import hillo from 'hillo'
import IKUtils from 'innerken-js-utils'
import { version } from '../../package.json'
import { deviceType } from '../assets/FixedConfig.json'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { DefaultBuffetSetting } from '@/oldjs/StaticModel'
import { resetTableStatus } from '@/oldjs/common'

export async function previewZBon (startDate, endDate) {
  return (await hillo.get('ZBon.php?op=previewBySpan', { startDate, endDate })).content
}

export async function printXBon (startDate, endDate) {
  return (await hillo.post('Complex.php?op=printSummary', {
    timespan: startDate + ' - ' + endDate
  })).content
}

export async function printZBon () {
  return (await hillo.post('ZBon.php?op=printZbon')).content
}

export async function printZBonUseDate (startDate, endDate, printByDay = 1, resetTable = 0) {
  return (await hillo.post('ZBon.php?op=printZbonBySpan', { startDate, endDate, printByDay, resetTable }))
}

export async function ZBonList () {
  return (await hillo.get('ZBon.php')).content
}

export async function acceptOrder (reason, id) {
  resetTableStatus(id)
  IKUtils.showLoading(true)
  await hillo.post('Orders.php?op=acceptTakeawayOrder', {
    tableId: id, reason: reason
  })
  IKUtils.toast('ok')
}

export async function previewServantSummary (pw, start, end) {
  return (await hillo.get('Servant.php?op=previewSummary', { pw, start, end })).content
}

export async function printServantSummary (pw, start, end) {
  return (await hillo.get('Servant.php?op=printSummaryBonByPassword', { pw, start, end })).content
}

export async function loadMemberCard () {
  return (await hillo.get('MemberCard.php?op=showAllMemberCardSaleRecord')).content
}

export async function checkOneMemberCard (longId) {
  return (await hillo.get('MemberCard.php?op=check', { id: longId, amount: 0 })).content
}

export async function renameMemberCard (oldName, newName) {
  return (await hillo.get('MemberCard.php?op=renameMemberCard', { old: oldName, new: newName }))
}

export async function getBillListForServant (pw = null, date, endDate = null) {
  if (!endDate) {
    endDate = date
  }
  return (await hillo.get('BackendData.php?op=mobileV3StatWithLang', {
    pw,
    date,
    endDate,
    lang: GlobalConfig.lang
  })).content
}

export async function loadBillList (lang, dateStart, dateEnd) {
  return (await hillo.get('Orders.php?op=withSortAndFilter', {
    lang,
    timespan: `${dateStart} - ${dateEnd}`
  })).content.map(o => {
    o.returnDishCount = Math.abs(o.returnDishCount ?? 0)
    o.discountDishCount = Math.abs(o.discountDishCount ?? 0)
    return o
  })
}

export async function loadDishStatistic (startDate, endDate) {
  return (await hillo.get('BackendData.php', {
    op: 'dishStatistic',
    lang: 'ZH',
    start: startDate,
    end: endDate
  })).content
}

export async function getBuffetPriceDishes () {
  return (await hillo.get('ConsumeType.php?op=showBuffetPriceDishToConsumeType', { lang: GlobalConfig.lang })).content
}

export async function changeOrderToBuffet (orderId, buffetDishes, buffetSetting) {
  return (await hillo.post('Complex.php?op=changeOrderToBuffet', {
    orderId,
    buffetPriceDishes: JSON.stringify(buffetDishes),
    extraJson: JSON.stringify(Object.assign({}, DefaultBuffetSetting, buffetSetting))
  }))
}

export async function reportDeviceInfo () {
  return (await hillo.post('Route.php?op=deviceLog', {
    MACAddress: GlobalConfig.uuId, deviceType: deviceType, version: version, note: ''
  }))
}

export async function checkTse () {
  try {
    return (await hillo.get('AccessLog.php?op=checkTSE'))
  } catch (e) {
    console.log(e)
  }
}

export async function previewZBonByTimeSpan (startTime, endTime) {
  return (await hillo.get('ZBon.php?op=previewByTimeSpan', { startTime, endTime })).content
}

export async function showTodayTempDiscountedDishes (startTime, endTime) {
  return (await hillo.get('Complex.php?op=showTempDiscountedDishes', {
    fromDateTime: startTime, toDateTime: endTime, lang: GlobalConfig.lang
  })).content
}

export async function showReturnedDishes (startTime, endTime) {
  return (await hillo.get('Complex.php?op=showReturnedDishes', {
    fromDateTime: startTime, toDateTime: endTime, lang: GlobalConfig.lang
  })).content
}

export async function getCashInOutDetail (startDate, endDate) {
  return (await hillo.get('Complex.php?op=getCashInOutDetail', {
    fromDate: startDate, toDate: endDate
  })).content
}

export async function todayCashStand () {
  return (await hillo.get('Complex.php?op=getCurrentCashAmount'))?.content?.currentCashAmount ?? 0
}

export async function manageCashAccount (amount, note = '') {
  return (await hillo.post('Complex.php?op=manageCashAccount', { amount, note }))
}

export async function billDetailInfo (id) {
  return (await hillo.get('BackendData.php?op=billDetail', { id, lang: GlobalConfig.lang })).content
}

export async function changePayMethodForOrder (orderId, paymentLogs) {
  console.log(orderId, paymentLogs)
  return (await hillo.post('Complex.php?op=changePayMethodForOrder', {
    orderId: orderId, paymentLog: JSON.stringify(paymentLogs)
  }))
}

export const updateRestaurantInfo = function (item) {
  return hillo.post('Restaurant.php?op=update', {
    ...item
  })
}

export async function syncTakeawaySettingToCloud (newRestaurantInfo) {
  if (newRestaurantInfo) {
    await updateRestaurantInfo(newRestaurantInfo)
  }
}

export async function loadRestaurantInfo () {
  return (await hillo.get('Restaurant.php?op=view')).content[0]
}

export async function safeRequest (func) {
  try {
    await func()
  } catch (e) {
    IKUtils.showError(e.data.info)
  }
}

export async function reprintOrder (orderId, type = 0) {
  await safeRequest(async () => {
    await hillo.post('BackendData.php?op=reprintOrder', {
      id: orderId, withTitle: type, printCount: 1
    })
  })
}
