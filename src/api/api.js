import hillo from 'hillo'
import IKUtils from 'innerken-js-utils'
import { version } from '../../package.json'
import { deviceType } from '../assets/FixedConfig.json'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { DefaultBuffetSetting } from '@/oldjs/StaticModel'
import { fastSweetAlertRequest, resetTableStatus } from '@/oldjs/common'
import { Remember } from '@/api/remember'
import i18n from '@/i18n'
import { acceptFireBaseOrder, changeFireBaseOrderToReadyToPick } from '@/api/fireStore'

export async function previewZBon (startDate, endDate) {
  return (await hillo.get('ZBon.php?op=previewBySpan', {
    startDate, endDate
  })).content
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
  return (await hillo.post('ZBon.php?op=printZbonBySpan', {
    startDate, endDate, printByDay, resetTable
  }))
}

// 还缺上传category id
export async function printSaleBon (startDate, endDate) {
  return (await hillo.post('Dishes.php?op=printSalesBon', {
    start: startDate, end: endDate
  }))
}

export async function printSaleBonByCode (startDate, endDate) {
  return (await hillo.post('Dishes.php?op=printSalesBonByDishCode', {
    start: startDate, end: endDate
  }))
}

export async function loadAllConsumeType () {
  return (await hillo.get('Complex.php', {
    op: 'showAllConsumeTypeInfo'
  })).content
}

export async function loadCategory () {
  return (await hillo.get('Category.php', {
    lang: GlobalConfig.lang
  })).content
}

export async function loadCategoryType () {
  return (await hillo.get('CategoryType.php', {
    lang: GlobalConfig.lang
  })).content
}

export async function returnOrder (id) {
  return (await hillo.post('Complex.php?op=returnOrder', {
    orderId: id
  }))
}

export async function ZBonList () {
  return (await hillo.get('ZBon.php')).content
}

export async function acceptOrder (reason, tableId) {
  await resetTableStatus(tableId)
  IKUtils.showLoading(true)

  const externalId = await hillo.post('Orders.php?op=getExternalIdByAcceptOrder', {
    tableId: tableId
  })
  await hillo.post('Orders.php?op=acceptTakeawayOrder', {
    tableId: tableId, reason: reason
  })
  if (parseInt(externalId) !== 0) {
    await acceptFireBaseOrder(externalId, true)
  }

  IKUtils.toast('ok')
}

export async function rejectOrder (id) {
  await resetTableStatus(id)
  const externalId = await getExternalIdByRejectOrder(id)
  const res = await fastSweetAlertRequest(i18n.t('RevocationDishReason'), 'text', 'Orders.php?op=rejectTakeAwayOrder', 'reason', { tableId: id })
  if (res) {
    await acceptFireBaseOrder(externalId, false)
  }
  IKUtils.toast('ok')
}

export async function readyToPick (id) {
  IKUtils.showLoading(true)
  await hillo.post('Orders.php?op=changeOrderPickUpStatus', {
    orderId: id, status: 1
  })
  const externalId = await hillo.post('Orders.php?op=getExternalId', {
    orderId: id
  })
  if (parseInt(externalId) !== 0) {
    await changeFireBaseOrderToReadyToPick(externalId)
  }
  IKUtils.toast('ok')
}

export async function getExternalIdByRejectOrder (tableId) {
  return await hillo.post('Orders.php?op=getExternalIdByRejectOrder', {
    tableId: tableId
  })
}

export async function previewServantSummary (pw, start, end) {
  return (await hillo.get('Servant.php?op=previewSummary', {
    pw, start, end
  })).content
}

export async function printServantSummary (pw, start, end) {
  return (await hillo.get('Servant.php?op=printSummaryBonByPassword', {
    pw, start, end
  })).content
}

export async function loadMemberCard () {
  return (await hillo.get('MemberCard.php?op=showAllMemberCardSaleRecord')).content
}

export async function checkOneMemberCard (longId) {
  return (await hillo.get('MemberCard.php?op=check', {
    id: longId, amount: 0
  })).content
}

export async function renameMemberCard (oldName, newName) {
  return (await hillo.get('MemberCard.php?op=renameMemberCard', {
    old: oldName, new: newName
  }))
}

export async function loadPaymentMethods () {
  return (await hillo.get('PayMethod.php')).content
}

export async function loadAllServants () {
  return (await hillo.get('Servant.php')).content
}

export async function printServantSummaryByDate (pw, startDate, endDate) {
  window.event.cancelBubble = true // 取消事件的冒泡机制
  return printServantSummary(pw, startDate, endDate)
}

export async function printAllServantSummaryByDate (servantList, startDate, endDate) {
  servantList.forEach(s => printServantSummaryByDate(s.servant.password, startDate, endDate))
}

export async function loadZbonRecordList (fromDateTime, toDateTime) {
  return (await hillo.get('ZBon.php?op=searchZbonCombinedRecord')).content
}

export async function loadLastZBonInfo () {
  const list = await loadZbonRecordList()
  return list[0]
}

export async function getBillListForServant (pw = null, date, endDate = null) {
  if (!endDate) {
    endDate = date
  }
  return (await hillo.get('BackendData.php?op=mobileV3StatWithLang', {
    pw, date, endDate, lang: GlobalConfig.lang
  })).content
}

export async function loadDishStatistic (startDate, endDate) {
  return (await hillo.get('BackendData.php', {
    op: 'dishStatistic', lang: GlobalConfig.lang, start: startDate, end: endDate
  })).content
}

export async function loadDetailOrder (id) {
  return hillo.get('BackendData.php', {
    // params: {
    op: 'billDetail', lang: GlobalConfig.lang.toUpperCase(), id: id
    // },
  })
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
    MACAddress: Remember.uuid, deviceType: deviceType, version: version, note: ''
  }))
}

export async function checkTse () {
  try {
    return (await hillo.get('AccessLog.php?op=checkTSE'))
  } catch (e) {
    console.log(e)
  }
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
  return (await hillo.post('Complex.php?op=manageCashAccount', {
    amount, note
  }))
}

export async function billDetailInfo (id) {
  return (await hillo.get('BackendData.php?op=billDetail', {
    id, lang: GlobalConfig.lang
  })).content
}

export async function changePayMethodForOrder (orderId, paymentLogs) {
  console.log(orderId, paymentLogs)
  return (await hillo.post('Complex.php?op=changePayMethodForOrder', {
    orderId: orderId, paymentLog: JSON.stringify(paymentLogs)
  }))
}

export async function sendFireStoreOrder (orders) {
  return (await hillo.post('AccessLog.php?op=getFireStoreOrders', {
    orders: JSON.stringify(orders)
  })).content.response
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

export async function deleteDish (id, items, reason) {
  return (await hillo.post('Complex.php?op=deleteDishes', {
    tableId: id, dishes: JSON.stringify(items), reason: reason
  }))
}

export function showSuccessMessage (title) {
  IKUtils.toast(title, 'success')
}

export async function sureTo (action, content = '', title = i18n.t('are_you_sure')) {
  const res = await IKUtils.showConfirmAsyn(i18n.t(content), i18n.t(title))
  if (res.isConfirmed) {
    await action()
  } else {
    IKUtils.toast(i18n.t('cancelSuccess'), 'info')
  }
}

export async function writeCompanyInfo (item) {
  return (await hillo.post('Orders.php?op=writeCompanyInfo', { ...item }))
}

export const printDeliveryBon = async function (timeSpan) {
  const [timeStart, timeEnd] = timeSpan
  return await hillo.post('Orders.php?op=printDeliveryBon', {
    fromTime: timeStart, toTime: timeEnd
  })
}
