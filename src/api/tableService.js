import { getTableListWithCells } from '@/oldjs/api'
import { loadAllReservable } from '@/api/ReservationService'

const TableInfoMetaDataSetting = {
  createTimestamp: { icon: 'mdi-clock-outline' },
  servantName: { icon: 'mdi-account' },
  dishCount: { icon: 'mdi-silverware-fork-knife', classFunc: (v) => parseInt(v) === 0 ? 'red' : '' },
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
  return (await getTableListWithCells()).filter(TableFixedSectionId.notTogoFilter).map(it => {
    it.reservable = reservableTableSet.has(it.tableId)
    return it
  })
}
