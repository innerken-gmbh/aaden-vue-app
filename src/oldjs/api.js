import { blockReady, fastSweetAlertRequest, loadingComplete, popAuthorize, toast } from './common'
import { goHome } from './StaticModel'
import hillo from 'hillo'
import i18n from '../i18n'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export function splitOrder (discountStr = '', id, items, initialUI, print, payMethod, tipIncome, memberCardId) {
  print = parseInt(print)
  let withTitle = 0
  let printCount = 1
  if (print === 2) {
    withTitle = 1
  }
  if (print === 3) {
    withTitle = 1
    printCount = 2
  }
  discountStr = (discountStr ?? '').indexOf('p') !== -1 ? discountStr : ''
  hillo.post('Complex.php?op=splitOrder', {
    payMethod,
    tipIncome: tipIncome || 0,
    tableId: id,
    discountStr: discountStr,
    dishes: JSON.stringify(items),
    withTitle,
    printCount,
    memberCardId: memberCardId ?? null
  }).then(res => {
    initialUI()
  })
}

export function openDrawer () {
  hillo.get('Printer.php?op=openDrawer')
}

/**
 * @param pw
 * @param {string} tableId
 * @param {number|string} print
 * @param {number} payMethod
 * @param {number} tipIncome
 * @param {null} memberCardId
 */
export function checkOut (pw = '', tableId, print = 1, payMethod = 1, tipIncome = 0, memberCardId) {
  let withTitle = 0
  let printCount = 1
  if (parseInt(print) === 2) {
    withTitle = 1
  }
  if (parseInt(print) === 3) {
    withTitle = 1
    printCount = 2
  }
  hillo.post('Complex.php?op=checkOut', {
    withTitle: withTitle,
    printCount: printCount,
    tableId: tableId,
    payMethod: payMethod,
    tipIncome: tipIncome || 0,
    memberCardId: memberCardId ?? null,
    pw
  }).then(res => {
    toast(i18n.t('JSTableCheckOutSuccess'))
    blockReady()
    goHome()
  })
}

export async function deleteDishes (id, items) {
  await optionalAuthorizeAsync('boss', !GlobalConfig.returnDishWithoutPassword)
  if (GlobalConfig.useDeleteDishReason) {
    const res = await fastSweetAlertRequest(i18n.t('JSTableAdditionPopReturnDishInfo'), 'text', 'Complex.php?op=deleteDishes', 'reason', {
      tableId: id, dishes: JSON.stringify(items)
    }, 'POST', true, null, GlobalConfig.defaultCancelReason)
    if (res) {
      GlobalConfig.updateSettings('defaultCancelReason', res.originalData)
      loadingComplete()
    }
  } else {
    await hillo.post('Complex.php?op=deleteDishes', {
      tableId: id, dishes: JSON.stringify(items), reason: i18n.t('InputError')
    })
    loadingComplete()
  }
}

export async function getTableListWithCells () {
  return (await hillo.get('Tables.php?op=showAllTableWithCells')).content.map(t => {
    t.cells = t.cells.map(p => {
      p.x = parseInt(p.x)
      p.y = parseInt(p.y)
      return p
    }) ?? []

    return t
  })
}

export async function setTableLocation (table) {
  table.cellsJson = JSON.stringify(table.cells)
  return (await hillo.post('Tables.php?op=setTableLocation', table))
}

export async function optionalAuthorizeAsync (authType = '', shouldAuthorize = true, defaultPassword = null, force = false, tableId = null) {
  return shouldAuthorize ? await popAuthorize(authType, force, tableId) : (defaultPassword ?? GlobalConfig.defaultPassword)
}

export function printZwichenBon (tableId, items) {
  return hillo.get('Orders.php?op=printZwichenBonUseDishesList', {
    tableId, dishes: JSON.stringify(items)
  })
}

export async function getServantList () {
  return (await hillo.get('Servant.php')).content
}

export async function getSectionList () {
  return (await hillo.get('Section.php?op=view')).content
}

export function getColorLightness (c) {
  if (c?.startsWith('#')) {
    if (c.length < 5) {
      c += 'fff'
    }
    const rgb = parseInt(c.substring(1), 16) // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff // extract red
    const g = (rgb >> 8) & 0xff // extract green
    const b = (rgb >> 0) & 0xff // extract blue
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  } else {
    return 0
  }
}

export async function checkServant (boss, password, tableId = null) {
  return (await hillo.silentGet('Servant.php?op=' + (boss ? 'checkBoss' : 'checkServant'), {
    tableId: tableId ?? null, pw: password
  }))
}
