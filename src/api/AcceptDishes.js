import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export async function getWaitAcceptDishes (id) {
  return (await hillo.get('Complex.php', {
    op: 'showDODInOrder',
    orderId: id,
    lang: GlobalConfig.lang
  })).content.filter(it => it.dishStatus === '-110')
}

export async function acceptPendingDishes (orderId, ids) {
  return (await hillo.post('Complex.php?op=acceptPending', {
    orderId: orderId,
    dodIds: ids
  }))
}

export async function denyPendingDishes (orderId, ids) {
  return (await hillo.post('Complex.php?op=denyPending', {
    orderId: orderId,
    dodIds: ids
  }))
}
