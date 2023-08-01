import hillo from 'hillo'

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
  return await hillo.post('NfcCard.php?op=edit', {
    id,
    uid,
    birthday,
    name,
    email
  })
}

export async function register (uid, birthday, name, email) {
  return await hillo.post('NfcCard.php?op=add', {
    uid,
    birthday,
    name,
    email
  })
}

export async function addBonusPoint (uid, bonusPoint) {
  return await hillo.post('NfcCard.php?op=addBonusPoint', {
    uid,
    bonusPoint
  })
}

export async function deposit (uid, amount, pw, paymentLog) {
  return await hillo.post('Complex.php?op=fullDepositIntoNfcCard', {
    uid,
    amount,
    pw,
    paymentLog: JSON.stringify(paymentLog)
  })
}

export async function searchNfcCard (uid = '', birthday = '', nameOrEmail = '') {
  return (await hillo.get('NfcCard.php?op=search', {
    uid,
    birthday,
    nameOrEmail
  })).content
}

export async function getBonusRecord (uid) {
  return (await hillo.get('NfcCard.php?op=getBonusPointRecord',
    {
      uid
    })).content
}
