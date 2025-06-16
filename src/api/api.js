import hillo from 'hillo'
import IKUtils from 'innerken-js-utils'
import { DefaultBuffetSetting, getCurrentLang } from '@/oldjs/StaticModel'
import { fastSweetAlertRequest, resetTableStatus } from '@/oldjs/common'
import i18n from '@/i18n'
import { getCurrentDeviceId } from '@/api/VIPCard/VIPCloudApi'
import { groupBy, sumBy } from 'lodash'
import dayjs from 'dayjs'

export async function previewZBon (startDate, endDate) {
  return (await hillo.get('ZBon.php?op=previewBySpan', {
    startDate,
    endDate
  })).content
}

export async function printXBon (startDate, endDate) {
  return (await hillo.post('Complex.php?op=printSummary', {
    timespan: startDate + ' - ' + endDate
  })).content
}

export async function printZBonUseDate (startDate, endDate, printByDay = 1, resetTable = 0) {
  return (await hillo.post('ZBon.php?op=printZbonBySpan', {
    startDate,
    endDate,
    printByDay,
    resetTable
  }))
}

// 还缺上传category id
export async function printSaleBon (startDate, endDate) {
  return (await hillo.post('Dishes.php?op=printSalesBon', {
    start: startDate,
    end: endDate
  }))
}

export async function printSaleBonByCode (startDate, endDate) {
  return (await hillo.post('Dishes.php?op=printSalesBonByDishCode', {
    start: startDate,
    end: endDate
  }))
}

export async function loadAllConsumeType () {
  return (await hillo.get('Complex.php', {
    op: 'showAllConsumeTypeInfo'
  })).content
}

export async function loadCategory () {
  return (await hillo.get('Category.php', {
    lang: getCurrentLang()
  })).content
}

export async function loadCategoryType () {
  return (await hillo.get('CategoryType.php', {
    lang: getCurrentLang()
  })).content
}

export async function returnOrder (id) {
  return (await hillo.post('Complex.php?op=returnOrder', {
    orderId: id
  }))
}

export async function sendBillDetailToEmail (content, email) {
  const realContent = 'Download your digital receipt:' + content
  await hillo.post('Complex.php?op=sendCustomEmail', {
    subject: 'Your digital receipt from Innerken GmbH',
    content: realContent,
    mailTo: email
  })
}

export async function getUUidByOrderId (orderId) {
  return (await hillo.get('Orders.php?op=showOne', {
    id: orderId
  })).content[0]?.electronicUuid ?? ''
}

export async function getPointCode (id) {
  let res = null
  let counter = 0
  while (!res && counter < 3) {
    res = (await hillo.get('Orders.php?op=getPointCodeByOrderId', {
      orderId: id
    })).content?.pointCode
    await new Promise(resolve => setTimeout(resolve, 2000))
    counter++
    console.log(res, counter)
  }

  return res
}

export async function acceptOrder (reason, tableId) {
  await resetTableStatus(tableId)
  IKUtils.showLoading(true)

  await hillo.post('Orders.php?op=acceptTakeawayOrder', {
    tableId: tableId,
    reason: reason
  })

  IKUtils.toast('ok')
}

export async function rejectOrder (id) {
  await resetTableStatus(id)
  await fastSweetAlertRequest(i18n.t('EnterReasonForRejection'), 'text',
    'Orders.php?op=rejectTakeAwayOrder', 'reason', { tableId: id })
}

export async function readyToPick (id) {
  IKUtils.showLoading(true)
  await hillo.post('Orders.php?op=changeOrderPickUpStatus', {
    orderId: id,
    status: 1
  })
  IKUtils.toast('ok')
}

export async function printServantSummary (pw, start, end) {
  return (await hillo.get('Servant.php?op=printSummaryBonByPassword', {
    pw,
    start,
    end
  })).content
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

export async function getBillListForServant (pw = null, date, endDate = null) {
  if (!endDate) {
    endDate = date
  }
  return (await hillo.get('BackendData.php?op=mobileV3StatWithLang', {
    pw,
    date,
    endDate,
    lang: getCurrentLang()
  })).content
}

export async function loadDishStatistic (startDate, endDate) {
  return (await hillo.get('BackendData.php', {
    op: 'dishStatistic',
    lang: getCurrentLang(),
    start: startDate,
    end: endDate
  })).content
}

export async function loadDetailOrder (id) {
  return hillo.get('BackendData.php', {
    // params: {
    op: 'billDetail',
    lang: getCurrentLang().toUpperCase(),
    id: id
    // },
  })
}

export async function getOrderDetailInfo (dateRange) {
  const timespan = dateRange.join(' - ')
  return (await hillo.get('Orders.php', {
    op: 'withSortAndFilter',
    timespan
  })).content ?? []
}

export async function getBuffetPriceDishes () {
  return (await hillo.get('ConsumeType.php?op=showBuffetPriceDishToConsumeType', { lang: getCurrentLang() })).content
}

export async function changeOrderToBuffet (orderId, buffetDishes, buffetSetting) {
  return (await hillo.post('Complex.php?op=changeOrderToBuffet', {
    orderId,
    buffetPriceDishes: JSON.stringify(buffetDishes),
    extraJson: JSON.stringify(Object.assign({}, DefaultBuffetSetting, buffetSetting))
  }))
}

export async function changePayMethodForOrder (orderId, paymentLogs) {
  return (await hillo.post('Complex.php?op=changePayMethodForOrder', {
    orderId: orderId,
    paymentLog: JSON.stringify(paymentLogs)
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
      id: orderId,
      withTitle: type,
      printCount: 1
    })
  })
}

export async function deleteDish (id, items, reason, pw) {
  return (await hillo.post('Complex.php?op=deleteDishes&_servantPw=' + pw, {
    tableId: id,
    dishes: JSON.stringify(items),
    reason: reason
  }))
}

export function showSuccessMessage (title) {
  IKUtils.toast(title, 'success')
}

export async function sureTo (action, content = '', title = i18n.t('AreYouSure')) {
  const res = await IKUtils.showConfirmAsyn(i18n.t(content), i18n.t(title))
  if (res.isConfirmed) {
    await action()
  } else {
    IKUtils.toast(i18n.t('AbortSuccessfully'), 'info')
  }
}

export async function writeCompanyInfo (item) {
  return (await hillo.post('Orders.php?op=writeCompanyInfo', { ...item }))
}

export const printDeliveryBon = async function (timeSpan) {
  const [timeStart, timeEnd] = timeSpan
  return await hillo.post('Orders.php?op=printDeliveryBon', {
    fromTime: timeStart,
    toTime: timeEnd
  })
}

export async function restoreOrder (orderId) {
  return await hillo.post('Complex.php?op=makeOrderAgain', { orderId })
}

export async function sendMailTo (mailTo, uuid) {
  try {
    await hillo.jsonPost('https://sendinvoicemail-evhwqutgjq-ey.a.run.app', {
      mailTo,
      uuid,
      templateId: 'z3m5jgr8xpoldpyo'
    })
  } catch (e) {
    IKUtils.showError(e?.message)
  }
}

export async function getCashBookInfo (date) {
  const [fromDate, toDate] = date
  return (await hillo.get('Complex.php?op=getCashInOutDetail', {
    fromDate,
    toDate
  })).content.map(it => {
    if (it.cashAccountNote.toLowerCase() === 'umsatz' || it.cashAccountNote.toLowerCase() === 'trinkgeld') {
      it.cashInCome = '营业收入'
    } else {
      it.cashInCome = '非营业收入'
    }
    if (!it.name) {
      if (it.payLogAmount >= 0) {
        it.name = '收入'
      } else {
        it.name = '支出'
      }
    }
    return it
  })
}

export const manageCashAccount = function (amount, note = '', isDatevAccountRef = null) {
  return hillo.post('Complex.php?op=manageCashAccount', {
    datevAccountRef: isDatevAccountRef,
    amount: amount,
    note: note
  })
}

export async function getAllCashAccount () {
  return (await hillo.get('/Datev.php?op=getAllDatevCashAccount', {})).content.filter(it => !it.deletedAt)
}

export async function addNewCashBookInfo (item) {
  return await manageCashAccount(item.cashUseType !== '1' ? -item.payLogAmount : item.payLogAmount, item.cashAccountNote,
    item.cashType)
}

export async function checkElectronicBillingStatus () {
  return (await hillo.get('Complex.php?op=checkAadenPoint', {})).content.enabled
}

export async function printDailyCardTerminal (info) {
  return (await hillo.post('Complex.php?op=printPaymentBon', {
    ...info
  }))
}

export async function forceGetSystemSetting (item) {
  try {
    return (await hillo.post('Restaurant.php?op=forceGetSystemSetting', {
      systemSetting: JSON.stringify(item)
    })).content
  } catch (e) {
    return item.defaultValue
  }
}

export async function getCurrentLanguage () {
  return await forceGetSystemSetting({
    section: 'FrontApp',
    sKey: 'language',
    sValue: 'de',
    defaultValue: 'de',
    sType: 'string',
    minimumVersion: '1.7.825',
    sOptions: '',
    tagList: 'basic,FrontApp,language'
  })
}

export async function getCurrentReservationStatus () {
  return await forceGetSystemSetting({
    section: 'FrontApp',
    sKey: 'activeReservation',
    sValue: '0',
    defaultValue: '0',
    sType: 'boolean',
    minimumVersion: '1.7.825',
    sOptions: '',
    tagList: 'basic,FrontApp,Reservation'
  })
}

export async function getCurrentSearchStatus () {
  return await forceGetSystemSetting({
    section: 'FrontApp',
    sKey: 'searchIncludesCode',
    sValue: '0',
    defaultValue: '0',
    sType: 'boolean',
    minimumVersion: '1.7.825',
    sOptions: '',
    tagList: 'basic,FrontApp'
  })
}

export async function openCashBoxByPw () {
  return await forceGetSystemSetting({
    section: 'FrontApp',
    sKey: 'openCashBoxByPw',
    sValue: '0',
    defaultValue: '0',
    sType: 'boolean',
    minimumVersion: '1.7.825',
    sOptions: '',
    tagList: 'basic,FrontApp'
  })
}

export async function deleteAllInput () {
  return await forceGetSystemSetting({
    section: 'FrontApp',
    sKey: 'deleteOneKeys',
    sValue: '0',
    defaultValue: '0',
    sType: 'boolean',
    minimumVersion: '1.7.825',
    sOptions: '',
    tagList: 'basic,FrontApp'
  })
}

export async function closePlaySound () {
  return await forceGetSystemSetting({
    section: 'FrontApp',
    sKey: 'closePlaySound',
    sValue: '0',
    defaultValue: '0',
    sType: 'boolean',
    minimumVersion: '1.7.825',
    sOptions: '',
    tagList: 'basic,FrontApp'
  })
}

export async function useTableColorSetting () {
  return await forceGetSystemSetting({
    section: 'FrontApp',
    sKey: 'useTableColorSetting',
    sValue: '0',
    defaultValue: '0',
    sType: 'boolean',
    minimumVersion: '1.7.825',
    sOptions: '',
    tagList: 'basic,FrontApp'
  })
}

export async function usefulKeyInKeyboard () {
  return await forceGetSystemSetting({
    section: 'FrontApp',
    sKey: 'usefulKey',
    sValue: 'E,F,B,R',
    defaultValue: 'E,F,B,R',
    sType: 'string',
    minimumVersion: '1.7.825',
    sOptions: '',
    tagList: 'basic,FrontApp'
  })
}

export async function getAdminSettingConfig (sKey, sValue, defaultValue, sType, sOptions, tagList) {
  return await forceGetSystemSetting({
    section: 'FrontApp',
    sKey: sKey,
    sValue: sValue,
    defaultValue: defaultValue,
    sType: sType,
    minimumVersion: '1.7.825',
    sOptions: sOptions,
    tagList: tagList
  })
}

export async function updateNewSetting (items) {
  return (await hillo.post('Restaurant.php?op=updateSystemSettings', {
    systemSettings: JSON.stringify(items)
  })).content
}

export async function getReservationStatus () {
  const userId = parseInt(await getCurrentDeviceId())
  try {
    return (await hillo.get('https://reservation-api.aaden.io/user/getDetail/' + userId)).code === 200
  } catch (e) {
    return false
  }
}

export async function getCashAccount () {
  return (await hillo.post('Complex.php?op=getCashAccountUsage', {})).content.map(it => {
    it.lrMarkDisplay = it.lrMark.toString() === '1' ? i18n.t('deposit') : i18n.t('withdraw')
    it.typeCodeDisplay = i18n.t(it.typeCode)
    return it
  })
}

export async function getCashBoxList () {
  return (await hillo.get('CashBoxController.php?op=getCashBoxList', {}))
    .content
}

export async function addNewCshBook (item) {
  await hillo.postWithUploadFile('Complex.php?op=manageCashAccount', { ...item })
}

export async function getLatestTaxRateNames () {
  return (await hillo.get('Complex.php?op=getLatestTaxRateNames', {})).content
}

export async function getCashBookList (date) {
  const [fromDate, toDate] = date
  const res = (await hillo.get('Complex.php?op=getCashInOutDetailV3', {
    fromDate,
    toDate
  })).content.map(it => {
    if (!it.name) {
      if (it.payLogAmount >= 0) {
        it.name = i18n.t('Revenue')
      } else {
        it.name = i18n.t('Expenditure')
      }
    }
    it.displayDay = dayjs(it.updateTimestamp).format('YYYY-MM-DD')
    return it
  })
  const arrUmsatz = (res.filter(it => it.cashAccountNote.toLowerCase() === 'umsatz'))
  const arrTrinkgeld = (res.filter(it => it.cashAccountNote.toLowerCase() === 'trinkgeld'))
  const groupUmsatz = groupBy(arrUmsatz, 'displayDay')
  const groupTrinkgeld = groupBy(arrTrinkgeld, 'displayDay')
  const arrOther = res.filter(it => it.cashAccountNote.toLowerCase() !== 'umsatz' && it.cashAccountNote.toLowerCase() !== 'trinkgeld')
  const umsatzTotalList = groupUmsatz
    ? Object.entries(groupUmsatz).map(it => {
      return {
        updateTimestamp: it[0],
        displayDay: it[0],
        payLogAmount: sumBy(it[1], (o) => {
          return parseFloat(o.payLogAmount)
        }),
        name: 'umsatz',
        cashAccountNote: '',
        usageName: 'umsatz',
        typeCode: '',
        amountA: sumBy(it[1], (o) => {
          if (o.amountA) {
            return parseFloat(o.amountA)
          } else {
            return 0
          }
        }),
        amountB: sumBy(it[1], (o) => {
          if (o.amountB) {
            return parseFloat(o.amountB)
          } else {
            return 0
          }
        }),
        amountC: sumBy(it[1], (o) => {
          if (o.amountC) {
            return parseFloat(o.amountC)
          } else {
            return 0
          }
        })
      }
    })
    : []
  const trinkgeldTotalList = groupTrinkgeld
    ? Object.entries(groupTrinkgeld).map(it => {
      return {
        updateTimestamp: it[0],
        displayDay: it[0],
        payLogAmount: sumBy(it[1], (o) => {
          return parseFloat(o.payLogAmount)
        }),
        name: 'Trinkgeld',
        cashAccountNote: '',
        usageName: 'Trinkgeld',
        typeCode: ''
      }
    })
    : []
  const currentList = umsatzTotalList.concat(trinkgeldTotalList.concat(arrOther)).sort((a, b) => new Date(b.displayDay) - new Date(a.displayDay))
  console.log(currentList, 'list')
  return currentList
}
