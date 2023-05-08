/*
 * Copyright (c) 2023. Haodong JU
 */

import { FireBaseAuth, FireBaseStore } from '@/api/firebase/google-fire-base'
import { docContentOf, resultOf } from '@/api/firebase/queryUtils'
import { collection, doc, query, setDoc, where } from 'firebase/firestore'
import router from '@/router'

const userDBPath = 'userInfo'
const userPrimaryStorePath = 'userPrimaryStore'
const userAndStoreRelation = 'userStore'
const userStoreLoginPath = 'userStoreLoginPath'

export async function login (id, displayName) {
  await setDoc(doc(FireBaseStore, userDBPath, id), {
    id,
    displayName
  }, { merge: true })
  const res = await getAllStoreIdForUser()
  const userId = await getCurrentUserId()
  if (res.length === 1) {
    await setUserStoreLoginStatus(userId, res[0])
    await router.push({ name: 'order' })
  } else if (res.length === 0) {
    await router.push({ name: 'ErrorPage' })
  } else if (res.length > 1) {
    await router.push({ name: 'StorePage' })
  }
  console.log(res, 'res')
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

export async function getAllStoreIdForUser () {
  const res = query(collection(FireBaseStore, userAndStoreRelation),
    where('userId', '==', getCurrentUserId()))
  return (await resultOf(res)).map(it => it.deviceId)
}
