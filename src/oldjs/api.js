import {
  blockReady,
  fastSweetAlertRequest,
  findInString,
  loadingComplete,
  popAuthorize,
  requestApi,
  RequestMethod,
  toast
} from './common'
import { goHome } from './StaticModel'

export function splitOrder (discountStr = '', id, items,
  initialUI, print,
  payMethod, tipIncome, memberCardId) {
  console.log(arguments)
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
  requestApi('Complex.php?op=splitOrder', {
    payMethod,
    tipIncome: tipIncome || 0,
    tableId: id,
    discountStr: discountStr,
    dishes: JSON.stringify(items),
    withTitle,
    printCount,
    memberCardId: memberCardId ?? null
  }, RequestMethod.POST, () => {
    initialUI()
  })
}

/**
 * @param {string} tableId
 * @param {number|string} print
 * @param {number} payMethod
 * @param {number} tipIncome
 * @param {null} memberCardId
 */
export function checkOut (tableId, print = 1,
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
  requestApi(
    'Complex.php?op=checkOut',
    {
      withTitle: withTitle,
      printCount: printCount,
      tableId: tableId,
      payMethod: payMethod,
      tipIncome: tipIncome || 0,
      memberCardId: memberCardId ?? null
    },
    RequestMethod.POST,
    (res) => {
      toast(findInString('JSTableCheckOutSuccess'))
      blockReady()
      goHome()
    },
    false, false
  )
}

export function deleteDishes (id, items, initialUI) {
  popAuthorize('boss', async () => {
    const res = await fastSweetAlertRequest(findInString('JSTableAdditionPopReturnDishInfo'),
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
  })
}

export function dishesChangeTable (tableName, items, initialUI) {
  popAuthorize('boss', async () => {
    const res = await fastSweetAlertRequest(findInString('JSTableAdditionPopChangeTableInfo'),
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
  const res = await fastSweetAlertRequest(findInString('JSTableAdditionPopDiscountInfo'), 'text',
    'Complex.php?op=setDiscount', 'discountStr', {
      tableId: id
    }, 'POST')
  if (res) {
    initialUI()
  }
}

export async function popChangeTablePanel (tableName, initialUI) {
  const res = await fastSweetAlertRequest(findInString('JSTableAdditionPopChangeTableInfo'), 'text',
    'Tables.php?op=change', 'newTableName', {
      oldTableName: tableName
    }, 'POST')
  if (res) {
    initialUI()
  }
}

export async function popMergeTablePanel (tableName, initialUI) {
  const res = await fastSweetAlertRequest(findInString('JSTableAdditionPopMergeTableInfo'), 'text',
    'Tables.php?op=mergeTables', 'newTableName', {
      oldTableName: tableName
    }, 'POST')
  if (res) {
    initialUI()
  }
}
