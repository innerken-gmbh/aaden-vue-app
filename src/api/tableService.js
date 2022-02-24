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
