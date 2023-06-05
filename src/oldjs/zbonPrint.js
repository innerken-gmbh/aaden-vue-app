import hillo from 'hillo'

// 新ZBon
export const newPrintZBon = async function (item, sendToMail, blockPrint) {
  return (await hillo.post('ZBon.php?op=printCombined', {
    zbonNumber: item,
    sendToMail: sendToMail,
    blockPrint: blockPrint
  }))
}

export const newSetZBon = async function (item, sendToMail) {
  return (await hillo.post('ZBon.php?op=generateAndPrintCombined', {
    ...item,
    sendToMail: sendToMail
  }))
}

export const newGetZBon = async function (timeSpan) {
  const [timeStart, timeEnd] = timeSpan
  return (await hillo.get('ZBon.php?op=searchZbonCombinedRecord', {
    fromDateTime: timeStart,
    toDateTime: timeEnd
  })).content
}

// 销售统计
export const printSalesBon = async function (timeSpan) {
  const [timeStart, timeEnd] = timeSpan
  return (await hillo.post('Dishes.php?op=printSalesBon', {
    start: timeStart,
    end: timeEnd,
    categoryIds: '',
    hideAttributeIds: ''
  }))
}

export const sendSalesBon = async function (timeSpan) {
  const [timeStart, timeEnd] = timeSpan
  return (await hillo.post('Dishes.php?op=sendSalesBonEmail', {
    start: timeStart,
    end: timeEnd,
    categoryIds: '',
    hideAttributeIds: ''
  }))
}

// 配送列表
export const printDeliveryBon = async function (timeSpan) {
  const [timeStart, timeEnd] = timeSpan
  return await hillo.post('Orders.php?op=printDeliveryBon', {
    fromTime: timeStart,
    toTime: timeEnd
  })
}

// 时间统计
export const printRealTimeSalesBon = function (timeSpan, dishCategoryIds) {
  if (!timeSpan) {
    return []
  }
  if (!timeSpan.length || timeSpan.length < 2) {
    return []
  }
  const [timeStart, timeEnd] = timeSpan
  return hillo.post('BackendData.php?op=printRealTimeSalesBon', {
    timeStart: timeStart,
    timeEnd: timeEnd,
    dishCategoryIds: dishCategoryIds
  })
}

export const sendRealTimeSalesBon = function (timeSpan, dishCategoryIds) {
  if (!timeSpan) {
    return []
  }
  if (!timeSpan.length || timeSpan.length < 2) {
    return []
  }
  const [timeStart, timeEnd] = timeSpan
  return hillo.post('BackendData.php?op=sendRealTimeSalesBonEmail', {
    timeStart: timeStart,
    timeEnd: timeEnd,
    dishCategoryIds: dishCategoryIds
  })
}

export const getTableList = async function () {
  return (await hillo.get('Tables.php', {
    op: 'currentInfos'
  })).content.filter(it => parseInt(it.sectionId) !== 6)
}

export async function getNiceRestaurantInfo () {
  return (await hillo.get('Restaurant.php?op=view')).content[0]
}

export const printSummaryBon = function (filter) {
  return hillo.post('Complex.php?op=printSummary', { ...filter })
}
