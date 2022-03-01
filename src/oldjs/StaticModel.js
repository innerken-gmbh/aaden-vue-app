import hillo from 'hillo'
import i18n from '../i18n'
import GlobalConfig from './LocalGlobalSettings'
import { getActiveTables, jumpTo, jumpToTable, requestOutTable } from './common'
import { StandardDishesListFactory } from 'aaden-base-model/lib/Models/AadenBase'
import IKUtils from 'innerken-js-utils'

let dishesList = []
const dishesDictionary = {}

export function findDish (code) {
  return dishesDictionary[code.toLowerCase()]
}

export function processDishList (dishList) {
  if (dishList.length > 0) {
    dishList = StandardDishesListFactory().formatList(dishList).map(d => {
      d.options = getComputedOption(d)
      return d
    })
    dishList.forEach(d => {
      dishesDictionary[d.code.toLowerCase()] = d
    })
  }
  return dishList
}

export async function getAllDishesWithCache (force = false) {
  if (force || dishesList.length === 0) {
    const res = await hillo.get('Dishes.php',
      { lang: i18n.locale.toUpperCase(), usePrintModAsName: GlobalConfig.usePrintModAsName | 0 })
    dishesList.length = 0
    dishesList = processDishList(res.content)
  }
  return dishesList
}

function getComputedOption (dish) {
  const realModInfo = []
  if (dish.modInfo?.length > 0) {
    dish.modInfo.forEach(item => {
      item.select = []
      if (item.selectName) {
        if (!Array.isArray(item.selectName)) {
          item.selectName = (item.selectName?.split(',')) ?? []
          item.selectValue = (item.selectValue?.split(',')) ?? []
          item.priceInfo = (item.priceInfo?.split(',')) ?? []
        }
        item.selectName.forEach((name, index) => {
          const select = {
            text: `${name}`,
            value: item.selectValue[index],
            priceInfo: parseFloat(item.priceInfo[index]) === 0 ? '' : ` €${parseFloat(item.priceInfo[index]).toFixed(2)}`,
            count: 0,
            price: parseFloat(item.priceInfo[index] ?? 0)
          }
          item.select.push(select)
        })
        realModInfo.push(item)
      }
    })
    if (GlobalConfig.useAttributeSort) {
      realModInfo.sort((a, b) => {
        if (a.required === '1') {
          return -1
        } else if (a.select.length === 1) {
          return -1
        } else {
          return 1
        }
      })
    }
  }
  return realModInfo
}

export function setDefaultValueForApply (modOptions, _mod) {
  const mod = IKUtils.deepCopy(_mod)
  const groupDict = IKUtils.deepCopy(modOptions.reduce((obj, m) => {
    obj[m.id] = m
    return obj
  }, {}))
  for (let i of mod) {
    const group = groupDict[i.groupId]
    group.hasValue = true
    i = Object.assign(i, group)
    i.groupId = group.id
    i.selectId = [group.selectValue[i.selectIndex]]
  }
  for (const key in groupDict) {
    const item = groupDict[key]
    if (item.required === '1' && !item.hasValue) {
      item.groupId = item.id
      item.selectId = [item.selectValue[0]]
      mod.push(item)
    }
  }
  return mod
}

export async function goHome () {
  if (GlobalConfig.FMCVersion) {
    const t = (await getActiveTables()).reduce((arr, i) => {
      return arr.concat(i.tables)
    }, []).find(f => parseInt(f.usageStatus) !== 0)
    if (!t) {
      requestOutTable()
    } else {
      jumpToTable(t.tableId, t.tableName)
    }
  } else {
    jumpTo('index.html')
  }
}

export const DefaultBuffetSetting = {
  roundTime: 10 * 60,
  roundTimeMin: 10,
  roundDishCount: 5,
  totalRound: 10,
  maxDineTime: 120 * 60,
  maxDineTimeMin: 120,
  childRoundDishCount: 3
}
export const DefaultAddressInfo = {
  firstName: '',
  lastName: '',
  reason: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  plz: '',
  tel: '',
  email: '',
  oldTime: '',
  date: '',
  time: '',
  deliveryMethod: '',
  edit: false
}

export const DeliveryMethods = [
  i18n.t('Abholung'), i18n.t('Lieferung')
]
