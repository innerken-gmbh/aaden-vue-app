import { popAuthorize } from './common'
import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { getCurrentReservation } from '@/api/ReservationService'
import IKUtils from 'innerken-js-utils'
import dayjs from 'dayjs'

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

const playSound = (count = 3) => {
  count -= 1
  if (count >= 0) {
    setTimeout(() => {
      IKUtils.play('/Resource/ding.m4a')
      playSound(count)
    }, 100)
  }
}

let reservationCache = null
let lastCacheAt = null

export async function getTableListWithCells () {
  const reservationDict = {}
  if (GlobalConfig.activeReservation) {
    if (!reservationCache || (lastCacheAt === null || dayjs(lastCacheAt).isBefore(dayjs().subtract(10, 's')))) {
      lastCacheAt = dayjs().valueOf()
      reservationCache = await getCurrentReservation()
    }
    const allReservation = reservationCache
    allReservation.forEach(r => {
      r.seatPlan.forEach(s => {
        if (!reservationDict[s.tableId]) {
          reservationDict[s.tableId] = []
        }
        reservationDict[s.tableId].push(r)
      })
    })
  }
  let shouldSound = false
  const tableList = (await hillo.get('Tables.php?op=showAllTableWithCells')).content.map(t => {
    t.cells = t.cells.map(p => {
      p.x = parseInt(p.x)
      p.y = parseInt(p.y)
      return p
    }) ?? []
    if (!shouldSound && t.callService === '1' && t.usageStatus === '1') {
      shouldSound = true
    }
    t.reservations = reservationDict[t.tableId] || []
    return t
  })
  if (shouldSound && GlobalConfig.closePlaySound !== '1') {
    playSound()
  }
  return tableList
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
    tableId,
    dishes: JSON.stringify(items)
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
    tableId: tableId ?? null,
    pw: password
  }))
}
