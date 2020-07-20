import hillo from 'innerken-utils/Utlis/request'

import i18n from '../i18n'
import { findConsumeTypeById, getData } from './common'
import Settings from 'aaden-base-model/lib/Models/GlobalSettings'

let dishesList = []

export async function getAllDishesWithCache (force = false) {
  if (force || dishesList.length === 0) {
    const res = await hillo.get('Dishes.php', { lang: i18n.locale.toUpperCase() })
    dishesList.length = 0
    if (res.content.length > 0) {
      dishesList = res.content
    }
  }
  return dishesList
}

let tableList = null

export async function getActiveTables () {
  const res = await getData(Settings.PHPROOT + 'Tables.php', {
    op: 'showAllTableWithSection'
  })
  return reloadTables(res.content)
}

export async function getTableList () {
  if (tableList != null) {
    return tableList
  }
  return await getActiveTables()
}

function reloadTables (arrOfT) {
  tableList = []
  for (const k in arrOfT) {
    const area = {}
    area.areaName = k
    area.tables = arrOfT[k]
    for (const i of area.tables) {
      if (i.consumeType) {
        i.consumeTypeName = findConsumeTypeById(i.consumeType).name
      } else {
        i.consumeTypeName = 'AVL'
      }
    }
    tableList.push(area)
  }
  return tableList
}
