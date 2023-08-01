import hillo from 'hillo'
import {
  addBonusForUser,
  createCloudUser,
  editUser,
  generateUserInfo,
  listBonusForUser,
  listCloudUser
} from '@/api/VIPCard/VIPCloudApi'
import { keyBy } from 'lodash-es'

export function defaultVipCard () {
  return {
    id: '',
    uid: '',
    birthday: '',
    name: '',
    email: ''
  }
}

export async function editNfcCard (id, uid, birthday, name, email) {
  const userOnline = await getUserById(id)
  if (userOnline.cloudId) {
    await editUser(userOnline.cloudId, {
      uid,
      birthday,
      name,
      email
    })
  }
  return await hillo.post('NfcCard.php?op=edit', {
    id,
    uid,
    birthday,
    name,
    email
  })
}

export async function register (uid, birthday, name, email) {
  const currentList = keyBy(await searchNfcCard(), 'uid')
  if (currentList[uid]) {
    throw Error('Uid is used')
  }
  const userInfo = await generateUserInfo(uid, name, email, birthday)
  await createCloudUser(userInfo)
  return await hillo.post('NfcCard.php?op=add', {
    uid,
    birthday,
    name,
    email
  })
}

export async function addBonusPoint (uid, bonusPoint) {
  const user = await getUserByUid(uid)
  if (user.cloudId) {
    await addBonusForUser(bonusPoint, user.cloudId)
  } else {
    return await hillo.post('NfcCard.php?op=addBonusPoint', {
      uid,
      bonusPoint
    })
  }
}

export async function deposit (uid, amount, pw, paymentLog) {
  return await hillo.post('Complex.php?op=fullDepositIntoNfcCard', {
    uid,
    amount,
    pw,
    paymentLog: JSON.stringify(paymentLog)
  })
}

export async function searchNfcCard () {
  const localInfo = (await hillo.get('NfcCard.php?op=search', {
    uid: '',
    birthday: '',
    nameOrEmail: ''
  })).content
  const cloudInfo = await listCloudUser()
  localInfo.forEach(it => {
    it.local = true
  })
  const localDict = keyBy(localInfo, 'uid')
  cloudInfo.forEach(it => {
    if (localDict[it.uid]) {
      localDict[it.uid].cloudId = it.id
    } else {
      localDict[it.uid] = it
      localDict[it.uid].cloudId = it.id
      localDict[it.uid].local = false
    }
  })
  return Object.values(localDict)
}

export async function getUserByUid (uid) {
  const dict = keyBy(await searchNfcCard(), 'uid')
  return dict[uid]
}

export async function getUserById (id) {
  const dict = keyBy(await searchNfcCard(), 'id')
  return dict[id]
}

export async function getBonusRecord (uid) {
  const user = await getUserByUid(uid)
  if (user.cloudId) {
    return await listBonusForUser(user.cloudId)
  } else {
    return (await hillo.get('NfcCard.php?op=getBonusPointRecord', {
      uid
    })).content
  }
}
