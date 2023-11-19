import { initializeApp } from 'firebase/app'
import { doc, getFirestore, setDoc, updateDoc } from 'firebase/firestore'
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
