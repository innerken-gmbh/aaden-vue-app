import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

const noDebug = { noDebug: true }
let tableList = null
export async function getActiveTables () {
  const res = await hillo.get('Tables.php', {
    op: 'showAllTableWithSection'
  }, noDebug)
  tableList = reloadTables(res.content)
  return tableList
}

export async function getCategoryList () {
  return (await hillo.get('CategoryType.php', {
    lang: GlobalConfig.getLang()
  }))
    .content
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

let consumeTypeList = []
export async function findConsumeTypeById (id) {
  if (consumeTypeList.length === 0) {
    consumeTypeList = (await hillo.get('Complex.php', {
      op: 'showAllConsumeTypeInfo'
    }))
      .content
  }
  for (const i of consumeTypeList) {
    if (parseInt(i.id) === parseInt(id)) {
      return i
    }
  }
  return null
}

export async function getOrderInfo (tableId, usePrintModAsName = false) {
  return (await hillo.get('Complex.php', {
    op: 'dishesInTable',
    tableId,
    lang: GlobalConfig.getLang(),
    usePrintModAsName: usePrintModAsName | 0
  }, noDebug)).content
}
