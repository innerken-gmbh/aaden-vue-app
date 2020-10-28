import { blockReady, fastSweetAlertRequest, loadingComplete, popAuthorize, toast } from './common'
import { goHome } from './StaticModel'
import { hillo } from 'innerken-utils'
import i18n from '../i18n'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export function splitOrder (discountStr = '', id, items,
  initialUI, print,
  payMethod, tipIncome, memberCardId) {
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

/**
 * @param pw
 * @param {string} tableId
 * @param {number|string} print
 * @param {number} payMethod
 * @param {number} tipIncome
 * @param {null} memberCardId
 */
export function checkOut (pw = '', tableId, print = 1,
  payMethod = 1, tipIncome = 0,
  memberCardId) {
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

export function deleteDishes (id, items, initialUI) {
  popAuthorize('boss', async () => {
    if (GlobalConfig.useDeleteDishReason) {
      const res = await fastSweetAlertRequest(i18n.t('JSTableAdditionPopReturnDishInfo'),
        'text',
        'Complex.php?op=deleteDishes', 'reason', {
          tableId: id,
          dishes: JSON.stringify(items)
        }, 'POST',
        true
      )
      if (res) {
        loadingComplete()
        initialUI()
      }
    } else {
      await hillo.post('Complex.php?op=deleteDishes', {
        tableId: id,
        dishes: JSON.stringify(items),
        reason: 'falsch eingaben'
      })
      loadingComplete()
      initialUI()
    }
  })
}

export function dishesSetDiscount (orderId, items, initialUI) {
  popAuthorize('', async () => {
    const res = await fastSweetAlertRequest(i18n.t('给菜品打折'),
      'text',
      'Dishes.php?op=setDiscountToDishes', 'discountStr', {
        orderId: orderId,
        dishes: JSON.stringify(items)
      }, 'POST')
    if (res) {
      loadingComplete()
      initialUI()
    }
  })
}

export function printZwichenBon (tableId, items) {
  return hillo.get('Orders.php?op=printZwichenBonUseDishesList', {
    tableId, dishes: JSON.stringify(items)
  })
}

export function dishesChangeTable (tableName, items, initialUI) {
  popAuthorize('boss', async () => {
    const res = await fastSweetAlertRequest(i18n.t('JSTableAdditionPopChangeTableInfo'),
      'text',
      'Complex.php?op=dishesChangeTable', 'newTableName', {
        oldTableName: tableName,
        dishes: JSON.stringify(items)
      }, 'POST')
    if (res) {
      loadingComplete()
      initialUI()
    }
  })
}

export async function popDiscountPanel (id, initialUI) {
  const res = await fastSweetAlertRequest(i18n.t('JSTableAdditionPopDiscountInfo'), 'text',
    'Complex.php?op=setDiscount', 'discountStr', {
      tableId: id
    }, 'POST', false)
  if (res) {
    initialUI()
  }
}

export async function setDiscountToTable (tableId, discountStr) {
  return hillo.post('Complex.php?op=setDiscount', {
    tableId, discountStr
  })
}

export async function popChangeTablePanel (tableName, initialUI) {
  const res = await fastSweetAlertRequest(i18n.t('JSTableAdditionPopChangeTableInfo'), 'text',
    'Tables.php?op=change', 'newTableName', {
      oldTableName: tableName
    }, 'POST')
  if (res) {
    initialUI()
    goHome()
  }
}

export async function popMergeTablePanel (tableName, initialUI) {
  const res = await fastSweetAlertRequest(i18n.t('JSTableAdditionPopMergeTableInfo'), 'text',
    'Tables.php?op=mergeTables', 'newTableName', {
      oldTableName: tableName
    }, 'POST')
  if (res) {
    initialUI()
    goHome()
  }
}

export async function getRestaurantInfo () {
  return hillo.get('Restaurant.php?op=view')
}

export function getColorLightness (c) {
  if (c?.startsWith('#')) {
    const rgb = parseInt(c.substring(1), 16) // convert rrggbb to decimal
    const r = (rgb >> 16) & 0xff // extract red
    const g = (rgb >> 8) & 0xff // extract green
    const b = (rgb >> 0) & 0xff // extract blue
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  } else {
    return 0
  }
}
