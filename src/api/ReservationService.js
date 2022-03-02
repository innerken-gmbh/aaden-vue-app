import hillo from 'hillo'
import dayjs from 'dayjs'
import { sliceTime, standardDateTemplate } from '@/api/dateUtils'

export async function loadAllReservable () {
  return (await hillo.get('Tables.php?op=getAllReservable')).content
}

export async function setReservable (tableId, newState) {
  console.log(tableId, newState)
  if (newState) {
    await addToReservable(tableId)
  } else {
    await removeFromReservable(tableId)
  }
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
    fromDateTime, toDateTime
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

export async function loadReserveSettings () {
  return (await hillo.get('Tables.php?op=getReserveSettings')).content
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

export async function getTimeSlotForDate (date) {
  const setting = await loadReserveSettings()
  const targetDayOfWeek = dayjs(date, standardDateTemplate).isoWeekday()
  const duration = setting.gap
  console.log((setting.weeklySettings
    .find(it => parseInt(it.dayOfWeek) === targetDayOfWeek)?.openingTimespan ?? []))
  return (setting.weeklySettings
    .find(it => parseInt(it.dayOfWeek) === targetDayOfWeek)?.openingTimespan ?? [])
    .map(it => sliceTime(date + ' ' + it.from, date + ' ' + it.to, duration))
    .flat()
}
