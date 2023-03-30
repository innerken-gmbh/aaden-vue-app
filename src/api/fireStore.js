import { sendFireStoreOrder } from '@/api/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { initializeApp } from 'firebase/app'
import { collection, getFirestore, onSnapshot, query, updateDoc, where } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDwY4rJNrLXdrLI-ukxzCAGan97lOx84cM',
  authDomain: 'aaden-online-order.firebaseapp.com',
  projectId: 'aaden-online-order'
}
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export function listenFireStoreOrders () {
  const q = query(collection(db, 'order'), where('confirmed', '==', false), where('deviceId', '==', GlobalConfig.DeviceId.toString()))
  const doSend = async (orderList) => {
    const res = await sendFireStoreOrder(orderList)
    console.log(res, 'result')
    for (const e of orderList) {
      if (res[e.cloudId]) {
        await confirmFireBaseOrder(e.cloudId, res[e.cloudId].tableName)
      }
    }


  }
  const unsub = onSnapshot(q, (querySnapshot) => {
    const toSend = []
    querySnapshot.forEach(doc => {
      const order = doc.data()
      order.cloudId = doc.id
      toSend.push(order)
    })
    doSend(toSend).then(r => {

    })

  })
  return unsub
}

export async function confirmFireBaseOrder (cloudId, tableName) {
  return await updateDoc(db.doc('order', cloudId), {
    confirmed: true, tableName,
  })
}

export async function acceptFireBaseOrder (cloudId, accepted = true) {
  return await updateDoc(db.doc('order', cloudId), {
    accepted: accepted
  })
}

export async function changeFireBaseOrderToReadyToPick (cloudId) {
  return await updateDoc(db.doc('order', cloudId), {
    canPickUp: true
  })
}

export async function changeFireBaseOrderToPaid (cloudId) {
  return await updateDoc(db.doc('order', cloudId), {
    paid: true
  })
}

export async function changeFireBaseOrderDeliveryTime (cloudId, deliveryTime) {
  return await updateDoc(db.doc('order', cloudId), {
    deliveryTime
  })
}


export function updateFirebaseOrder (cloudId, canPickUp, confirmed, finished, paid, accepted, deliveryTime, tableName) {

  db.collection('order', cloudId)
      .where('cloudId', '==', cloudId)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          const updateArr = []

          const addToUpdateIf = function (key, value, predicate, destination) {
            if (predicate(key, value)) {
              destination.push(key)
              destination.push(value)
            }
          }

          const valueNotNull = (_, value) => value !== undefined && value !== null

          addToUpdateIf('canPickUp', canPickUp, valueNotNull, updateArr)
          addToUpdateIf('confirmed', confirmed, valueNotNull, updateArr)
          addToUpdateIf('finished', finished, valueNotNull, updateArr)
          addToUpdateIf('paid', paid, valueNotNull, updateArr)
          addToUpdateIf('accepted', accepted, valueNotNull, updateArr)
          addToUpdateIf('deliveryTime', deliveryTime, valueNotNull, updateArr)
          addToUpdateIf('tableName', tableName, valueNotNull, updateArr)

          // doc.data() is never undefined for query doc snapshots
          db.collection('order').doc(doc.id)
              .update(...updateArr)
              .then(() => {
                console.log('Document successfully updated!')
              })
        })
      })
  return 1
}
