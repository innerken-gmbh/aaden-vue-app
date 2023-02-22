// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { doc, getFirestore, updateDoc } from 'firebase/firestore'
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyATTtRB1PlOC-At0-ndKqap4RABwwCc6ew',
  authDomain: 'aaden-boss-test.firebaseapp.com',
  projectId: 'aaden-boss-test',
  storageBucket: 'aaden-boss-test.appspot.com',
  messagingSenderId: '604566804841',
  appId: '1:604566804841:web:a82cb7788517358ceb45f8',
  measurementId: 'G-CST41XTVMJ'
}

const firebasePath = 'customerDisplay'
const app = initializeApp(firebaseConfig)
export const FirestorageDB = getFirestore(app)

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
