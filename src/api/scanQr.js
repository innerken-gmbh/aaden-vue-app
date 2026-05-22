import { collection, deleteDoc, getDocs } from 'firebase/firestore'
import { db } from '@/firebase'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import hillo from 'hillo'

const cartFireStoreName = 'qr-cart'

export function getCollectionRef (tableName) {
  return collection(db, cartFireStoreName, GlobalConfig.DeviceId.toString(), tableName)
}

export async function clearGlobalCart (tableName) {
  try {
    (await getDocs(getCollectionRef(tableName))).docs.forEach(it => deleteDoc(it.ref))
  } catch (e) {
    console.log(e)
  }
}

export async function getActiveCodes () {
  let codes = []
  codes = await hillo.get('https://cloud-v2.aaden.io/subscriptions/activeProductCodes/' + GlobalConfig.DeviceId)
  return codes
}
