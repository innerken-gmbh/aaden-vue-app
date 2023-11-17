import hillo from 'hillo'
import i18n from '../i18n'
import GlobalConfig from './LocalGlobalSettings'
import { jumpTo } from './common'
import IKUtils from 'innerken-js-utils'
import { getColorLightness } from '@/oldjs/api'
import { DishDocker } from 'aaden-base-model/lib'

const dishesDictionary = {}
let categoryCache = {}

export function resetCache () {
  categoryCache = {}
}

export async function getCategoryListWithCache (consumeTypeId) {
  if (!categoryCache[consumeTypeId]) {
    const res = await hillo.get('Category.php?op=withConsumeType', {
      consumeTypeId: consumeTypeId,
      lang: GlobalConfig.lang
    })
    for (const i of res.content) {
      if (!i.isActive) {
        i.isActive = false
      }
    }
    categoryCache[consumeTypeId] = res.content.filter(c => {
      return c.dishes.length > 0
    }).map((c) => {
      c.color = c.color === '' ? '#FFFFFF' : c.color
      return c
    })
  }
  return categoryCache[consumeTypeId]
}

export function findDish (code) {
  return dishesDictionary[code.toLowerCase()]
}

export function processDishList (dishList) {
  if (dishList.length > 0) {
    dishList = DishDocker.StandardDishesListFactory().formatList(dishList).map(d => {
      d.options = getComputedOption(d)
      d.displayColor = d.color === '' ? '#FFFFFF' : d.color
      d.foreground = getColorLightness(d.displayColor) > 128 ? '#000' : '#fff'
      return IKUtils.deepCopy(d)
    })
    dishList.forEach(d => {
      dishesDictionary[d.code.toLowerCase()] = d
    })
  }
  return dishList
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
  jumpTo('order')
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
  note: '',
  time: 'ASAP',
  deliveryMethod: 'inShop',
  edit: false
}

export const DeliveryMethods = [
  i18n.t('Pickup'), i18n.t('Delivery')
]
