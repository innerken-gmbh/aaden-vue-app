import hillo from 'hillo'

export async function loadAllReservable () {
  return (await hillo.get('Tables.php?op=getAllReservable'))
}

export async function addToReservable (tableId) {
  return (await hillo.post('Tables.php?op=addToReservable', { tableId }))
}

export async function removeFromReservable (tableId) {
  return (await hillo.post('Tables.php?op=removeFromReservable', { tableId }))
}

export async function getReservation (date) {
  return (await loadAllReservation(date + ' 00:00:00', date + ' 23:59:59'))
}

export async function loadAllReservation (fromDateTime, toDateTime) {
  return (await hillo.get('Tables.php?op=getReservationByTimeSpan', {
    fromDateTime,
    toDateTime
  })).content
}

const defaultReservationInfo = {
  tableId: '553',
  fromDateTime: '2022-01-18 17:00:00',
  toDateTime: '2022-01-18 19:00:00',
  personCount: '4',
  title: '',
  firstName: 'fn',
  lastName: 'ln',
  email: 'em',
  tel: '0123',
  company: 'com',
  note: '',
  childCount: '0',
  useStroller: '0'
}

export async function addReservation (reservationInfo = defaultReservationInfo) {
  return (await hillo.post('Tables.php?op=addReservation', {
    reservationInfo: JSON.stringify(reservationInfo)
  }))
}

export async function moveReservation (reservationId, newTableId) {
  return (await hillo.post('Tables.php?op=moveReservation', {
    reservationId, newTableId
  }))
}

export async function cancelReservation (reservationId) {
  return (await hillo.post('Tables.php?op=cancelReservation', {
    reservationId
  }))
}
