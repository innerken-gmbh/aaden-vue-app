import hillo from 'hillo'
import IKUtils from 'innerken-js-utils'
import { showTableSelector } from '@/oldjs/common'
import i18n from '@/i18n'
import { timestampTemplate } from '@/api/dateUtils'
import dayjs from 'dayjs'
import { getCurrentDeviceId } from '@/api/VIPCard/VIPCloudApi'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export async function moveReservation (reservationId, tableId) {
  const newTableId = await showTableSelector(null, 'tableId')
  const reservation = (await getCurrentReservation()).find(it => it.id === parseInt(reservationId))
  reservation.seatPlan.find(it => it.tableId === parseInt(tableId)).tableId = newTableId
  const deviceId = parseInt(await getCurrentDeviceId())
  if (deviceId === 1750 || deviceId === 1) {
    return (await hillo.jsonPost(newHost + 'changeSeatPlan/' + reservationId, reservation.seatPlan))
  } else {
    return (await hillo.jsonPost(host + 'changeSeatPlan/' + reservationId, reservation.seatPlan))
  }
}

export async function getReservationsByTableId (tableId) {
  return (await getCurrentReservation())
    .filter(it => it.seatPlan.find(s => s.tableId === parseInt(tableId)))
}

const host = 'https://reservation-api.aaden.io/reservation/'
const newHost = 'https://cloud-v2.aaden.io/reservation/'
const todayEnd = dayjs().startOf('d')
  .add(1, 'd').add('3', 'h')
  .add(59, 'm').format(timestampTemplate)

export async function getCurrentReservation () {
  const nowMinus30 = dayjs().subtract(60, 'm').format(timestampTemplate)
  return (await loadAllReservation(nowMinus30, todayEnd)).filter(it => it.status !== 'Cancelled')
}

export async function getNewReservationSetting (deviceId) {
  return (await hillo.post('https://cloud-v2.aaden.io/cloudUser/reservationUser/getList')).data.find(it => it.deviceId === deviceId)
}

export async function loadAllReservation (fromDateTime, toDateTime) {
  if (!GlobalConfig.activeReservation) {
    return []
  }
  try {
    const deviceId = parseInt(await getCurrentDeviceId())
    if (deviceId === 1750 || deviceId === 1) {
      const settings = await getNewReservationSetting(deviceId)
      const currentDate = dayjs(fromDateTime).subtract(settings.businessHourOffset, 'hour')
      return (await hillo.get(newHost + 'getList/' + deviceId,
        {
          fromDateTime: currentDate.startOf('day').format('YYYY-MM-DD HH:mm:ss'),
          toDateTime: currentDate.endOf('day').format('YYYY-MM-DD HH:mm:ss')
        })).data.map(it => {
        it.fromDateTime = dayjs(it.fromDateTime).add(it.currentBusinessHourOffset, 'hour').format('YYYY-MM-DDTHH:mm:ss')
        it.toDateTime = dayjs(it.toDateTime).add(it.currentBusinessHourOffset, 'hour').format('YYYY-MM-DDTHH:mm:ss')
        return it
      })
    } else {
      return (await hillo.get(host + 'getList/' + deviceId,
        {
          fromDateTime,
          toDateTime
        })).data
    }
  } catch (e) {
    return []
  }
}

export async function cancelReservation (reservationId) {
  const res = await IKUtils.showConfirmAsyn(
    i18n.t('EmailWillBeSentIfReservationIsCancelled'),
    i18n.t('AreYouSureToCancelTheReservation')
  )
  if (res.isConfirmed) {
    ReservationCache.lastCacheAt = null
    ReservationCache.reservationCache = null
    const deviceId = parseInt(await getCurrentDeviceId())
    if (deviceId === 1750 || deviceId === 1) {
      return (await hillo.jsonPost(newHost + 'cancelInternal/' + reservationId))
    } else {
      return (await hillo.jsonPost(host + 'cancelInternal/' + reservationId))
    }
  }
}

export async function checkIn (id) {
  ReservationCache.lastCacheAt = null
  ReservationCache.reservationCache = null
  const deviceId = parseInt(await getCurrentDeviceId())
  if (deviceId === 1750 || deviceId === 1) {
    return (await hillo.jsonPost(newHost + 'checkIn/' + id,
      {}))
  } else {
    return (await hillo.jsonPost(host + 'checkIn/' + id,
      {}))
  }
}

export const ReservationCache = {
  lastCacheAt: null,
  reservationCache: null
}

export async function confirmReservation (id) {
  const deviceId = parseInt(await getCurrentDeviceId())
  ReservationCache.lastCacheAt = null
  ReservationCache.reservationCache = null
  if (deviceId === 1750 || deviceId === 1) {
    return (await hillo.jsonPost(newHost + 'confirmByMerchant/' + id,
      {}))
  } else {
    return (await hillo.jsonPost(host + 'confirmByMerchant/' + id,
      {}))
  }
}
