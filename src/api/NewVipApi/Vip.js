import hillo from 'hillo'
import { getCurrentDeviceId } from '@/api/VIPCard/VIPCloudApi'
import { collectionGroup, getDocs, query, where } from 'firebase/firestore'
import { sortBy } from 'lodash'
import { db } from '@/firebase'

export async function getAllVipList () {
  return (await hillo.get('https://getmemberlist-evhwqutgjq-ey.a.run.app', {
    deviceId: await getCurrentDeviceId()
  })).data
}

export async function getMemberDetailInfo (item) {
  item.deviceId = await getCurrentDeviceId()
  return (await hillo.get('https://getmemberdetail-evhwqutgjq-ey.a.run.app', {
    ...item
  })).data
}

export async function getPayMethodList () {
  return (await hillo.get('PayMethod.php', {
    showHidden: 1
  })).content
}

export async function getNfcMenuList () {
  return (await hillo.get('NfcCard.php?op=getNfcDepositMenuList', {
  })).content
}

export async function getCashBoxList () {
  return (await hillo.get('CashBoxController.php?op=getCashBoxList', {}))
    .content
}

export async function memberRechargeFunc (item) {
  return (await hillo.post('Complex.php?op=fullDepositForCloudMember', {
    ...item
  })).content
}

export async function updateMemberDetailPoint (item) {
  await hillo.jsonPost('https://usepoint-evhwqutgjq-ey.a.run.app', {
    ...item
  })
}

export async function getAllPointLog (customerId) {
  const res = query(collectionGroup(db,
    'usePointLog'),
  where('pointSourceId', '==', await getCurrentDeviceId()), where('customerId', '==', customerId), where('pointType', '==', 'Merchant'))
  return sortBy((await resultOfId(res)), (o) => {
    return -o.electronic_meta_createdAt.seconds
  })
}

export async function resultOfId (query, logLabel = '') {
  const res = (await getDocs(query)).docs
    .map(contentOfId)
  if (logLabel) {
    console.log(res, logLabel)
  }
  return res
}

export function contentOfId (doc) {
  return {
    ...doc.data(),
    id: doc.id
  }
}
