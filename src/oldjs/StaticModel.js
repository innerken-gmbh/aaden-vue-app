import hillo from 'innerken-utils/Utlis/request'

import i18n from '../i18n'
import GlobalConfig from './LocalGlobalSettings'
import { getActiveTables, jumpTo, jumpToTable, requestOutTable } from './common'
import { StandardDishesListFactory } from 'aaden-base-model/lib/Models/AadenBase'

let dishesList = []
const dishesDictionary = {}

export function findDish (code) {
  return dishesDictionary[code.toLowerCase()]
}

export async function getAllDishesWithCache (force = false) {
  if (force || dishesList.length === 0) {
    const res = await hillo.get('Dishes.php',
      { lang: i18n.locale.toUpperCase(), usePrintModAsName: GlobalConfig.usePrintModAsName | 0 })
    dishesList.length = 0
    if (res.content.length > 0) {
      dishesList = StandardDishesListFactory().formatList(res.content)
      dishesList.forEach(d => {
        dishesDictionary[d.code.toLowerCase()] = d
      })
    }
  }
  return dishesList
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
