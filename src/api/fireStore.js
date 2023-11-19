import { sendFireStoreOrder } from '@/api/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { initializeApp } from 'firebase/app'
import { collection, doc, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDnlXhMVxLIIWPAt3zqrC1bdrhP1ZMxwWE',
  authDomain: 'aaden-online-order.firebaseapp.com',
  projectId: 'aaden-online-order',
  storageBucket: 'aaden-online-order.appspot.com',
  messagingSenderId: '35511673943',
  appId: '1:35511673943:web:0a49cc6b61fb4f96f2ef12',
  measurementId: 'G-G2JET1PGPK'
}
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export async function listenFireStoreOrders () {
  const q = query(collection(db, 'order'), where('confirmed', '==', false),
    where('deviceId', '==', GlobalConfig.DeviceId))
  const doSend = async (orderList) => {
    if (orderList.length > 0) {
      const res = await sendFireStoreOrder(orderList)
      await new Promise(resolve => setTimeout(resolve, 1000))
      for (const e of orderList) {
        if (res[e.cloudId]) {
          await confirmFireBaseOrder(e.cloudId, res[e.cloudId].tableName)
        }
      }
    }
  }
  return onSnapshot(q, (querySnapshot) => {
    const toSend = []
    querySnapshot.forEach(doc => {
      const order = doc.data()
      order.cloudId = doc.id
      toSend.push(order)
    })
    doSend(toSend).then(r => {

    })
  })
}

export async function confirmFireBaseOrder (cloudId, tableName) {
  return await updateDoc(doc(db, 'orderDisplay', cloudId), {
    confirmed: true, tableName
  })
}

export async function acceptFireBaseOrder (cloudId, accepted = true) {
  return await updateDoc(doc(db, 'orderDisplay', cloudId), {
    accepted: accepted
  })
}

export async function changeFireBaseOrderToReadyToPick (cloudId) {
  console.log(cloudId, 'ready to pick')
  return await updateDoc(doc(db, 'orderDisplay', cloudId), {
    canPickUp: true
  })
}

export async function changeFireBaseOrderToFinished (cloudId) {
  return await updateDoc(doc(db, 'orderDisplay', cloudId), {
    finished: true
  })
}

export async function changeFireBaseOrderDeliveryTime (cloudId, deliveryTime) {
  return await updateDoc(doc(db, 'orderDisplay', cloudId), {
    deliveryTime
  })
}
