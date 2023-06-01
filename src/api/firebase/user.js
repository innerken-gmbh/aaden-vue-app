/*
 * Copyright (c) 2023. Haodong JU
 */

import { FireBaseAuth, FireBaseStore, StripePayment } from '@/api/firebase/google-fire-base'
import { docContentOf, resultOf, resultOfId } from '@/api/firebase/queryUtils'
import { collection, doc, getDoc, query, setDoc, where } from 'firebase/firestore'
import router from '@/router'
import { resetBaseUrl } from '@/api/firebase/baseUrlSetting'
import { getCurrentUserSubscriptions } from '@stripe/firestore-stripe-payments'
import { keyBy } from 'lodash'

const userDBPath = 'userInfo'
const userPrimaryStorePath = 'userPrimaryStore'
const userAndStoreRelation = 'userStore'
const userStoreLoginPath = 'userStoreLoginPath'
const userLastLoginStore = 'userLastLoginStore'
const orderPath = 'order'

export const usefulStoreId = []

export async function login (id, displayName) {
  await setDoc(doc(FireBaseStore, userDBPath, id), {
    id,
    displayName
  }, { merge: true })
  const allUserStoreId = await getAllStoreIdForUser()
  const userId = await getCurrentUserId()
  for (const storeId of allUserStoreId) {
    const getStoreSub = (await getSubscriptionsByStore(storeId)).map(it => it.order.productList).flat().map(x => x.metadata.code)
    if (getStoreSub.includes('restaurant')) {
      usefulStoreId.push(storeId)
    }
  }
  const lastTimeLoginStore = localStorage.getItem('lastTimeLoginStore')
  if (lastTimeLoginStore) {
    await resetBaseUrl(lastTimeLoginStore.deviceId)
  } else {
    if (usefulStoreId.length === 1) {
      await setUserLastTimeLoginStore(usefulStoreId[0])
      await setUserStoreLoginStatus(userId, usefulStoreId[0])
      await resetBaseUrl(usefulStoreId[0])
    } else if (usefulStoreId.length === 0) {
      await router.push({ name: 'ErrorPage' })
    } else if (usefulStoreId.length > 1) {
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

export async function getSubscriptionsByStore (storeId) {
  const result = []
  const orders = await getStoreOrders(storeId)
  const subscriptions = keyBy(await getCurrentUserSubscriptions(StripePayment), 'metadata.orderId')
  for (const order of orders) {
    if (!order.subscriptionId) {
      const subId = subscriptions?.[order.id]?.id
      if (subId) {
        await updateOrderStatus(order.id, 2, subId)
        order.subscriptionId = subId
      } else {
        console.log('没有支付')
        continue
      }
    }
    const sub = await getUserSubscriptionDetail(order.userId, order.subscriptionId)
    result.push({
      order,
      sub
    })
  }
  return result
}

export async function getStoreOrders (id) {
  const collectionRef = collection(FireBaseStore, orderPath)
  const res = query(collectionRef, where('storeId', '==', id))
  return await resultOfId(res)
}

export async function updateOrderStatus (id, orderStatus, subscriptionId) {
  return await setDoc(doc(FireBaseStore, orderPath, id), {
    orderStatus,
    subscriptionId
  }, { merge: true })
}

export async function getUserSubscriptionDetail (userId, subId) {
  return (await getDoc(doc(FireBaseStore, 'customers', userId, 'subscriptions', subId))).data()
}
