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
let cached = false

export async function getCurrentDeviceId () {
  try {
    if (!cached) {
      GlobalConfig.DeviceId = (await hillo.get('AccessLog.php?op=deviceId')).content
      cached = true
    }
  } catch (e) {

  }
  return GlobalConfig.DeviceId
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
    deviceId: await getCurrentDeviceId(),
    createdAt: dayjs().format('YYYY-MM-dd HH:mm:ss')
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
    const myDeviceId = await getCurrentDeviceId()
    const myGroupId = (await getDocContent(doc(db, selfGroupInfo, myDeviceId)))?.groupId ?? myDeviceId
    if (!myGroupId) {
      await setDoc(
        doc(db, selfGroupInfo, myDeviceId),
        { groupId: myDeviceId }
      )
      await setDoc(
        doc(db, groupInfo, myDeviceId),
        doc(db, groupInfo, myDeviceId),
        { devices: [myDeviceId] }
      )
    }
    return (await getDocContent(doc(db, groupInfo, myGroupId))).devices
  })
}
