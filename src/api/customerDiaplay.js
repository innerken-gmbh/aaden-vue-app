import { db } from '@/api/fireStore'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { collectionGroup, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'

const firebasePath = 'customerDisplay'

export const FirestorageDB = db

export async function setOrderListInFirebase (orderList, deviceIdPath) {
  if (!GlobalConfig.useCustomerDisplay) {
    return
  }
  const data = { order: orderList }
  try {
    await updateDoc(doc(FirestorageDB, firebasePath, deviceIdPath.toString()), data)
  } catch (e) {
    console.log(e)
  }
}

export async function setCartListInFirebase (cartList, deviceIdPath) {
  if (!GlobalConfig.useCustomerDisplay) {
    return
  }
  const data = { cart: cartList }
  try {
    await updateDoc(doc(FirestorageDB, firebasePath, deviceIdPath.toString()), data)
  } catch (e) {
    console.log(e)
  }
}

export async function setCheckOutStatusInFirebase (showBetrag, deviceIdPath, code) {
  if (!GlobalConfig.useCustomerDisplay) {
    return
  }
  const data = { showBetrag: showBetrag, checkoutCode: code }
  try {
    await updateDoc(doc(FirestorageDB, firebasePath, deviceIdPath.toString()), data)
  } catch (e) {
    console.log(e)
  }
}
//
const pointCode = 'point-code'

export async function findPointCodeByOrderId (orderId) {
  const orderInfo = query(collectionGroup(db, pointCode),
    where('orderId', '==', orderId))
  return await firstResultOf(orderInfo)
}

export async function firstResultOf (query, logLabel = '') {
  const res = (await getDocs(query)).docs
    .map(it => {
      return { id: it.id, ...it.data() }
    })
  if (logLabel) {
    console.log(res, logLabel)
  }
  return res[0]
}

export async function setPointCodeInFirebase (code, deviceIdPath) {
  if (!GlobalConfig.useCustomerDisplay) {
    return
  }
  const data = { pointCode: code }
  try {
    await updateDoc(doc(FirestorageDB, firebasePath, deviceIdPath.toString()), data)
  } catch (e) {
    console.log(e)
  }
}

export async function setUuidInFirebase (uuid) {
  if (!GlobalConfig.useCustomerDisplay) {
    return
  }
  const data = { uuid: uuid }
  try {
    await updateDoc(doc(FirestorageDB, firebasePath, GlobalConfig.DeviceId.toString()), data)
  } catch (e) {
    console.log(e)
  }
}
