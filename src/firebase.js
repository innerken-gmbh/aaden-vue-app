import { doc, setDoc } from 'firebase/firestore'

import { db } from '@/api/fireStore'

const firebasePath = 'customerDisplay'

export const FirestorageDB = db

export async function setOrderListInFirebase (orderList, deviceIdPath) {
  const data = { order: orderList }
  try {
    await setDoc(doc(FirestorageDB, firebasePath, deviceIdPath), data)
  } catch (e) {
    console.log(e)
  }
}

export async function setCartListInFirebase (cartList, deviceIdPath) {
  const data = { cart: cartList }
  try {
    await setDoc(doc(FirestorageDB, firebasePath, deviceIdPath), data)
  } catch (e) {
    console.log(e)
  }
}

export async function setCheckOutStatusInFirebase (showBetrag, deviceIdPath) {
  const data = { showBetrag: showBetrag }
  try {
    await setDoc(doc(FirestorageDB, firebasePath, deviceIdPath), data)
  } catch (e) {
    console.log(e)
  }
}
