import { doc, updateDoc } from 'firebase/firestore'

import { db } from '@/api/fireStore'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

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

export async function setCheckOutStatusInFirebase (showBetrag, deviceIdPath) {
  if (!GlobalConfig.useCustomerDisplay) {
    return
  }
  const data = { showBetrag: showBetrag }
  try {
    await updateDoc(doc(FirestorageDB, firebasePath, deviceIdPath.toString()), data)
  } catch (e) {
    console.log(e)
  }
}
