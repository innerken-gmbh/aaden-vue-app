import hillo from 'hillo'
import IKUtils from 'innerken-js-utils'
import { goHome } from '@/oldjs/StaticModel'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export async function getCurrentOrderInfo (tableId) {
  const tableInfo = (await hillo.silentGet('Tables.php')).content.find(it => it.id === tableId)
  const result = {
    tableName: tableInfo?.name,
    tableId: tableInfo?.id,
    isActive: parseInt(tableInfo?.usageStatus),
    order: null
  }
  if (result.isActive) {
    const info = (await hillo.silentGet(
      'Tables.php',
      {
        op: 'currentInfo',
        id: tableId
      },
      { noDebug: true }
    )).content
    result.order = {
      ...info.order,
      ...info
    }
  }
  return result
}

export async function checkout (checkoutInfo) {
  try {
    const {
      billType,
      printType,
      paymentLog,
      tableId,
      dishes,
      password,
      checkOutType
    } = checkoutInfo
    const print = parseInt(billType)
    let withTitle = 0
    let printCount = 1
    if (print > 0) {
      withTitle = 1
    }
    if (print > 1) {
      printCount = 2
    }
    const checkOutData = {
      tableId: tableId,
      dishes: JSON.stringify(dishes),
      withTitle,
      printCount,
      payMethod: 1,
      discountStr: '',
      pw: password,
      overrideCardTerminalIp: GlobalConfig.overrideCardTerminalIp,
      overrideCardTerminalPort: GlobalConfig.overrideCardTerminalPort,
      notPrintingCheckOutBon: printType === 1 ? 1 : 0
    }
    if (paymentLog.length > 0) {
      checkOutData.paymentLog = JSON.stringify(paymentLog)
    }
    if (GlobalConfig.overrideCardTerminalIp && paymentLog.some(it => parseInt(it.id) === 2)) {
      IKUtils.showLoading()
    }

    const res = await hillo.post(
      'Complex.php?op=' + checkOutType,
      checkOutData, { timeout: 15 * 60 * 1000 }
    )
    IKUtils.toast('👌')
    return {
      id: res?.content,
      success: true
    }
  } catch (e) {
    // await new Promise(resolve => setTimeout(resolve, 3 * 1000))
    const res = await getCurrentOrderInfo(checkoutInfo.tableId)
    if (res.usageStatus === '0') {
      await goHome()
    }
    return {
      success: false
    }
  }
}
