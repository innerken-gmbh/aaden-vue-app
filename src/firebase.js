import { doc, updateDoc } from 'firebase/firestore'

import { db } from '@/api/fireStore'

const firebasePath = 'customerDisplay'

export const FirestorageDB = db

export async function setOrderListInFirebase (orderList, deviceIdPath) {
  const data = { order: orderList }
  await updateDoc(doc(FirestorageDB, firebasePath, deviceIdPath), data)
}

export async function setCartListInFirebase (cartList, deviceIdPath) {
  const data = { cart: cartList }
  await updateDoc(doc(FirestorageDB, firebasePath, deviceIdPath), data)
}

export async function setCheckOutStatusInFirebase (showBetrag, deviceIdPath) {
  const data = { showBetrag: showBetrag }
  await updateDoc(doc(FirestorageDB, firebasePath, deviceIdPath), data)
}
