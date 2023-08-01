import { db, executeQuery, firebaseAction, getDocContent } from '@/firebase'
import { addDoc, collection, doc, query, setDoc, where } from 'firebase/firestore'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import hillo from 'hillo'
import dayjs from 'dayjs'

const path = 'app-temp-user'
const ref = collection(db, path)

const bonusPath = 'bonus'

const groupInfo = 'app-bonus-group'
const selfGroupInfo = 'app-self-group'

export async function getCurrentDeviceId () {
  try {
    return (await hillo.get('AccessLog.php?op=deviceId')).content
  } catch (e) {
    return GlobalConfig.DeviceId
  }
}

export async function createCloudUser (userInfo) {
  return await firebaseAction(async () => {
    return await addDoc(ref, userInfo)
  })
}

export async function generateUserInfo (uid = '', name = '', email = '', birthday = '') {
  return {
    uid,
    name,
    email,
    birthday,
    deviceId: await getCurrentDeviceId()
  }
}

export async function addBonusForUser (amount, id) {
  return await firebaseAction(async () => {
    return await addDoc(collection(doc(ref, id), bonusPath), {
      bonusPointChange: amount,
      createdAt: dayjs().valueOf(),
      note: '',
      operateDeviceId: await getCurrentDeviceId()
    })
  })
}

export async function listBonusForUser (id) {
  return await firebaseAction(async () => {
    return await executeQuery(collection(doc(ref, id), bonusPath))
  }, [])
}

export async function listCloudUser () {
  return await firebaseAction(async () => {
    const deviceIds = await getMyGroup()
    return await executeQuery(query(ref, where('deviceId', 'in', deviceIds)))
  }, [])
}

export async function editUser (id, userInfo) {
  return await firebaseAction(async () => {
    return await setDoc(doc(ref, id), userInfo, { merge: true })
  })
}

export async function getMyGroup () {
  return await firebaseAction(async () => {
    const myGroupId = (await getDocContent(doc(db, selfGroupInfo, await getCurrentDeviceId()))).groupId
    return (await getDocContent(doc(db, groupInfo, myGroupId))).devices
  })
}
