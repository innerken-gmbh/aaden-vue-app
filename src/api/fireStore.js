import { sendFireStoreOrder } from '@/api/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { initializeApp } from 'firebase/app'
import { collection, doc, getFirestore, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore'
import { getCurrentDeviceId } from '@/api/VIPCard/VIPCloudApi'
import { getCurrentBackendVersion } from '@/api/nightwatch'
import dayjs from 'dayjs'
import { getNiceRestaurantInfo } from '@/oldjs/zbonPrint'

const firebaseConfig = {
  apiKey: 'AIzaSyCtvQ3d-HAtHTUg_-505c-qXRnlz8RlZeg',
  authDomain: 'aaden-saas.firebaseapp.com',
  projectId: 'aaden-saas',
  storageBucket: 'aaden-saas.appspot.com',
  messagingSenderId: '169167876904',
  appId: '1:169167876904:web:b83934e5a34d1cbfcc161d',
  measurementId: 'G-QRPH7NLDZS'
}
export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)

export function listenFireStoreOrders () {
  console.log(GlobalConfig.DeviceId.toString())
  const q = query(collection(db, 'orderDisplay'), where('confirmed', '==', false),
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
  return await updateDoc(doc(db, 'orderDisplay', cloudId), {
    confirmed: true,
    tableName
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

const deviceEchoPath = 'DeviceEcho'
const { version } = require('../../package.json')
const echoLogPath = 'echoLog'

export async function deviceEcho () {
  try {
    const myDeviceId = await getCurrentDeviceId()
    if (parseInt(myDeviceId) === -1) {
      return
    }
    await setDoc(doc(db, deviceEchoPath, myDeviceId, echoLogPath, dayjs().valueOf().toString()), {
      frontendVersion: version,
      backendVersion: await getCurrentBackendVersion(),
      timestamp: dayjs().valueOf(),
      restaurantInfo: await getNiceRestaurantInfo(),
      deviceId: myDeviceId,
      accessFrom: location.toString()
    })
    console.log('report to remote server complete')
  } catch (e) {
    console.log(e)
  }
}
