const TableInfoMetaDataSetting = {
  createTimestamp: {},
  servantName: {},
  dishCount: { icon: 'mdi-silverware-fork-knife', classFunc: (v) => parseInt(v) === 0 ? 'red' : '' },
  totalPrice: { icon: 'mdi-currency-eur' },
  buffetCount: {},
  buffetRound: {},
  childCount: { icon: 'mdi-human-child' },
  drinkCount: {},
  seatCount: { icon: 'mdi-account-outline' }
}

const defaultMetaData = {
  icon: null,
  classFunc: null
}

export const TableInfoMetaData = Object.entries(TableInfoMetaDataSetting).map(entry => {
  entry[1] = Object.assign({}, defaultMetaData, entry[1])
  return entry
}).reduce((obj, entry) => {
  obj[entry[0]] = entry[1]
  return obj
}, {})
