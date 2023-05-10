/*
 * Copyright (c) 2023. Haodong JU
 */

import { FireBaseAuth, FireBaseStore } from '@/api/firebase/google-fire-base'
import { docContentOf, resultOf } from '@/api/firebase/queryUtils'
import { collection, doc, query, setDoc, where } from 'firebase/firestore'
import router from '@/router'
import { resetBaseUrl } from '@/api/firebase/baseUrlSetting'

const userDBPath = 'userInfo'
const userPrimaryStorePath = 'userPrimaryStore'
const userAndStoreRelation = 'userStore'
const userStoreLoginPath = 'userStoreLoginPath'
const userLastLoginStore = 'userLastLoginStore'

export async function login (id, displayName) {
  await setDoc(doc(FireBaseStore, userDBPath, id), {
    id,
    displayName
  }, { merge: true })
  const allUserStoreId = await getAllStoreIdForUser()
  const userId = await getCurrentUserId()
  const lastTimeLoginStore = await getUserLastTimeLoginStore()
  if (lastTimeLoginStore) {
    await resetBaseUrl(lastTimeLoginStore.deviceId)
  } else {
    if (allUserStoreId.length === 1) {
      await setUserLastTimeLoginStore(allUserStoreId[0])
      await setUserStoreLoginStatus(userId, allUserStoreId[0])
      await resetBaseUrl(allUserStoreId[0])
    } else if (allUserStoreId.length === 0) {
      await router.push({ name: 'ErrorPage' })
    } else if (allUserStoreId.length > 1) {
      await router.push({ name: 'StorePage' })
    }
  }
}

/**
 * @param {string} deviceId
 * @return {Promise<*[]|*[]>}
 */

export async function getUserCurrentStoreInfo () {
  try {
    return (await docContentOf(doc(FireBaseStore, userPrimaryStorePath, getCurrentUserId())))
  } catch (e) {
    console.log('Not Login', e)
    return ''
  }
}

export async function getCurrentStoreId () {
  return (await getUserCurrentStoreInfo())?.currentStoreId ?? null
}

/**
 * @returns {string | undefined}
 */
export function getCurrentUserId () {
  return FireBaseAuth.currentUser?.uid
}

export async function setUserStoreLoginStatus (userId, storeId) {
  const data = {}
  data[storeId] = { loggedIn: true }
  return await setDoc(doc(FireBaseStore, userStoreLoginPath, userId), data, { merge: true })
}

export async function setUserLastTimeLoginStore (deviceId) {
  return await setDoc(doc(FireBaseStore, userLastLoginStore, getCurrentUserId()), { deviceId: deviceId })
}

export async function getUserLastTimeLoginStore () {
  return (await docContentOf(doc(FireBaseStore, userLastLoginStore, getCurrentUserId())))
}

export async function getAllStoreIdForUser () {
  const res = query(collection(FireBaseStore, userAndStoreRelation),
    where('userId', '==', getCurrentUserId()))
  return (await resultOf(res)).map(it => it.deviceId)
}
