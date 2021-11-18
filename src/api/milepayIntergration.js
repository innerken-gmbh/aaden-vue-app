import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import IKUtils from 'innerken-js-utils'

export const defaultCreatePaymentRequestDTO = {
  orderId: -1,
  amount: 0,
  localContext: '',
  currency: 'EUR',
  channel: 'WECHAT',
  method: 'QRCODE'
}

export const defaultMilepayPayment = {
  id: -1,
  orderId: -1,
  paymentRequestId: -1,
  amount: 0,
  status: 'SUCCESSFUL',
  channel: '',
  method: '',
  createdAt: ''
}

export const PaymentStatus = {
  PENDING: 'PENDING',
  SUCCESSFUL: 'SUCCESSFUL',
  CLOSE: 'CLOSE',
  FAILED: 'FAILED',
  REFUND_PENDING: 'REFUND_PENDING',
  REFUND_FAILED: 'REFUND_FAILED',
  PARTIALLY_REFUND: 'PARTIALLY_REFUND',
  REFUNDED: 'REFUNDED'
}

export async function createMilePayOrder (orderId, amount, detail, localContext) {
  return await useMilePay(async () => await milepayCreatePayment(orderId, amount, detail, localContext))
}

export async function replayMilePayOrder (id) {
  return await useMilePay(async () => await replayMilePay(id))
}

export async function useMilePay (paymentSupplier) {
  return new Promise((resolve, reject) => {
    tryUntilSettleDown(paymentSupplier, resolve, reject)
  })
}

async function tryUntilSettleDown (paymentSupplier, resolve, reject) {
  IKUtils.showLoading(true)
  try {
    const res = await paymentSupplier()
    let totalTime = 0
    const id = res.id
    const poolingUntilEnd = async () => {
      const data = await getPaymentById(id)
      console.log(data, totalTime)
      if (data.status === PaymentStatus.PENDING && totalTime < 60) {
        totalTime += 0.5
        setTimeout(poolingUntilEnd, 500)
      } else {
        IKUtils.toast('Ok')
        if (data.status === PaymentStatus.SUCCESSFUL) {
          resolve(data)
        } else {
          reject(data)
        }
      }
    }
    poolingUntilEnd()
  } catch (e) {
    console.log(e, 'Error')
    reject(e)
  }
}

export async function milepayCreatePayment (orderId, amount, detail, localContext) {
  console.log(GlobalConfig.getMilepayUrl())

  return (await hillo.jsonPost(GlobalConfig.getMilepayUrl() + 'payment/create', Object.assign({},
    defaultCreatePaymentRequestDTO, {
      orderId,
      amount: amount.toFixed(2) * 100,
      localContext
    }, detail
  ))).data
}

export async function replayMilePay (id) {
  return (await hillo.jsonPost(GlobalConfig.getMilepayUrl() + 'payment/replay/id/' + id)).data
}

async function getPaymentById (id) {
  return (await hillo.get(GlobalConfig.getMilepayUrl() + 'payment/id/' + id)).data
}

export async function getPaymentByOrderId (orderId) {
  return (await hillo.get(GlobalConfig.getMilepayUrl() + 'payment/orderId/' + orderId)).data
}
