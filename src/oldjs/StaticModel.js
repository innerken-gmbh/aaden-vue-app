import hillo from 'innerken-utils/Utlis/request'

import i18n from '../i18n'
import { GlobalConfig } from './LocalGlobalSettings'
import { getActiveTables, jumpTo, jumpToTable, requestOutTable } from './common'

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

export async function goHome () {
  if (GlobalConfig.FMCVersion) {
    const t = (await getActiveTables()).reduce((arr, i) => {
      return arr.concat(i.tables)
    }, []).find(f => parseInt(f.usageStatus) !== 0)
    console.log(t)
    if (!t) {
      requestOutTable()
    } else {
      jumpToTable(t.tableId, t.tableName)
    }
  } else {
    jumpTo('index.html')
  }
}
