import hillo from 'hillo'
import IKUtils from 'innerken-js-utils'
import { goHome } from '@/oldjs/StaticModel'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { getCurrentDeviceId, useAsset } from '@/api/MemberCloud/MemberCloudApi'

/**
 * Gets the current order information for a table.
 * This function retrieves information about the current order for a table,
 * including any associated member information.
 *
 * @param {string} tableId - The ID of the table.
 * @returns {Promise<Object>} An object containing table and order information.
 * @property {string} tableName - The name of the table.
 * @property {string} tableId - The ID of the table.
 * @property {number} isActive - Whether the table is active (has an order).
 * @property {Object|null} order - The order information, or null if no order.
 * @property {Object|null} member - The member information, or null if no member is associated.
 * @throws {Error} If there is an error getting the order information.
 */
export async function getCurrentOrderInfo (tableId) {
  const tableInfo = (await hillo.silentGet('Tables.php')).content.find(it => it.id === tableId)
  const result = {
    tableName: tableInfo?.name,
    tableId: tableInfo?.id,
    isActive: parseInt(tableInfo?.usageStatus),
    order: null,
    member: null // Add member property
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

    // Add member information if available
    if (info.customerId) {
      result.member = {
        id: info.customerId
        // Other member properties will be loaded separately if needed
      }
    }
  }
  return result
}

/**
 * Sets the order auto claim customer ID.
 * This function associates a customer (member) with an order.
 *
 * @param {string} orderId - The ID of the order.
 * @param {string|null} customerId - The ID of the customer, or null to clear the association.
 * @returns {Promise<any>} The response content.
 * @throws {Error} If there is an error setting the order auto claim customer ID.
 */
export async function setOrderAutoClaimCustomerId (orderId, customerId) {
  try {
    const response = await hillo.post('Complex.php?op=setOrderAutoClaimCustomerId', {
      orderId,
      autoClaimCustomerId: customerId
    })
    return response.content
  } catch (error) {
    console.error('Error setting order auto claim customer ID:', error)
    throw error
  }
}

/**
 * Tracks the usage of an asset for an order.
 * This function records that a member's asset (e.g., membership card) was used for an order.
 *
 * @param {string} recordId - The ID of the asset record (usually the member ID).
 * @param {string} orderId - The ID of the order.
 * @returns {Promise<any>} The response content.
 * @throws {Error} If there is an error tracking the asset usage.
 */
export async function trackAssetUsage (recordId, orderId) {
  try {
    const deviceId = await getCurrentDeviceId()
    return await useAsset(recordId, 'user', orderId, deviceId, 'Used for order')
  } catch (error) {
    console.error('Error tracking asset usage:', error)
    throw error
  }
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
      checkOutType,
      autoClaimCustomerId
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
      notPrintingCheckOutBon: printType === 1 ? 1 : 0,
      autoClaimCustomerId: autoClaimCustomerId
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
