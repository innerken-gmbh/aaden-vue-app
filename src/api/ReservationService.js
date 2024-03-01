import hillo from 'hillo'
import IKUtils from 'innerken-js-utils'
import { showTableSelector } from '@/oldjs/common'
import i18n from '@/i18n'
import { timestampTemplate } from '@/api/dateUtils'
import dayjs from 'dayjs'
import { getCurrentDeviceId } from '@/api/VIPCard/VIPCloudApi'

export async function moveReservation (reservationId, tableId) {
  const newTableId = await showTableSelector(null, 'tableId')
  const reservation = (await getCurrentReservation()).find(it => it.id === parseInt(reservationId))
  reservation.seatPlan.find(it => it.tableId === parseInt(tableId)).tableId = newTableId

  return (await hillo.jsonPost(host + 'changeSeatPlan/' + reservationId, reservation.seatPlan))
}

export async function getReservationStatus () {
  const userId = parseInt(await getCurrentDeviceId())
  return (await hillo.get('https://reservation-api.aaden.io/user/getDetail/' + userId)).data
}

export async function getReservationsByTableId (tableId) {
  return (await getCurrentReservation()).filter(it => it.seatPlan.find(s => s.tableId === parseInt(tableId)))
}

const todayEnd = dayjs().startOf('d')
  .add(1, 'd').add('3', 'h')
  .add(59, 'm').format(timestampTemplate)

export async function getCurrentReservation () {
  const nowMinus30 = dayjs().subtract(60, 'm').format(timestampTemplate)

  return (await loadAllReservation(nowMinus30, todayEnd)).filter(it => it.status === 'Confirmed')
}

const host = 'https://reservation-api.aaden.io/reservation/'

export async function loadAllReservation (fromDateTime, toDateTime) {
  const deviceId = parseInt(await getCurrentDeviceId())
  return (await hillo.get(host + 'getList/' + deviceId,
    {
      fromDateTime,
      toDateTime
    })).data
}

export async function cancelReservation (reservationId) {
  const res = await IKUtils.showConfirmAsyn(
    i18n.t('EmailWillBeSentIfReservationIsCancelled'),
    i18n.t('AreYouSureToCancelTheReservation')
  )
  if (res.isConfirmed) {
    return (await hillo.jsonPost(host + 'cancelInternal/' + reservationId))
  }
}

export async function checkIn (id) {
  return (await hillo.jsonPost(host + 'checkIn/' + id,
    {}))
}
