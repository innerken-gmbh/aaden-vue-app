import { getTableListWithCells } from '@/oldjs/api'
import { loadAllReservable } from '@/api/ReservationService'
import { timeFromNowInMinute } from '@/api/dateUtils'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

const TableInfoMetaDataSetting = {
  createTimestamp: {
    icon: 'mdi-clock-outline',
    classFunc: (v) => {
      const [hour, minute] = v.split(':')
      const diff = timeFromNowInMinute(hour, minute)
      return diff > GlobalConfig.maxEatMinute ? 'error font-weight-bold' : ''
    }
  },
  servantName: { icon: 'mdi-account' },
  dishCount: {
    icon: 'mdi-silverware-fork-knife',
    classFunc: (v) => parseInt(v) === 0 ? 'error' : ''
  },
  totalPrice: { icon: 'mdi-currency-eur' },
  buffetCount: { icon: 'mdi-account-multiple' },
  buffetRound: { icon: 'mdi-animation-outline' },
  childCount: { icon: 'mdi-human-child' },
  drinkCount: { icon: 'mdi-beer' },
  seatCount: { icon: 'mdi-account-outline' }
}

const defaultMetaData = {
  icon: null, classFunc: null
}
export const TableFilter = {
  activeFilter (t) {
    return t.usageStatus === '1'
  },
  notActiveFilter (t) {
    return t.usageStatus !== '1'
  }
}
export const TableFixedSectionId = {
  Togo: 6,
  togoFilter (t) {
    return parseInt(t.sectionId) === TableFixedSectionId.Togo
  },
  notTogoFilter (t) {
    return parseInt(t.sectionId) !== TableFixedSectionId.Togo
  }
}

export const TableInfoMetaData = Object.entries(TableInfoMetaDataSetting).map(entry => {
  entry[1] = Object.assign({}, defaultMetaData, entry[1])
  return entry
}).reduce((obj, entry) => {
  obj[entry[0]] = entry[1]
  return obj
}, {})

export async function loadReservationTableInfo () {
  const reservableTableSet = new Set((await loadAllReservable()).map(it => it.id))
  return (await getTableListWithCells())
    .filter(TableFixedSectionId.notTogoFilter).map(it => {
      it.reservable = reservableTableSet.has(it.tableId)
      return it
    })
}
