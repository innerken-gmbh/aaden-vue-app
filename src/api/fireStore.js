import { sendFireStoreOrder } from '@/api/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { initializeApp } from 'firebase/app'
import { collection, doc, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDwY4rJNrLXdrLI-ukxzCAGan97lOx84cM',
  authDomain: 'aaden-online-order.firebaseapp.com',
  projectId: 'aaden-online-order'
}
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export function listenFireStoreOrders () {
  console.log(GlobalConfig.DeviceId.toString())
  const q = query(collection(db, 'order'), where('confirmed', '==', false),
    where('deviceId', '==', GlobalConfig.DeviceId.toString()))
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
    console.log(querySnapshot)
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
  return await updateDoc(doc(db, 'order', cloudId), {
    confirmed: true, tableName
  })
}

export async function acceptFireBaseOrder (cloudId, accepted = true) {
  return await updateDoc(doc(db, 'order', cloudId), {
    accepted: accepted
  })
}

export async function changeFireBaseOrderToReadyToPick (cloudId) {
  console.log(cloudId, 'ready to pick')
  return await updateDoc(doc(db, 'order', cloudId), {
    canPickUp: true
  })
}

export async function changeFireBaseOrderToFinished (cloudId) {
  return await updateDoc(doc(db, 'order', cloudId), {
    finished: true
  })
}

export async function changeFireBaseOrderDeliveryTime (cloudId, deliveryTime) {
  return await updateDoc(doc(db, 'order', cloudId), {
    deliveryTime
  })
}
