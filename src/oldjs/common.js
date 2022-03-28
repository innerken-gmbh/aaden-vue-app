import Swal from 'sweetalert2'
import router from '../router'
import hillo from 'hillo'
import i18n from '../i18n'
import GlobalConfig from './LocalGlobalSettings'
import store from './../store'
import { clearAllTimer } from '@/oldjs/Timer'
import dayjs from 'dayjs'
import { capitalize } from 'lodash-es/string'

const Config = GlobalConfig

export let TableId = null
let blocked = false
const TOASTTIME = 700

let Dishes = []
export const consumeTypeList = []

export async function getAllDishes () {
  const res = await hillo.get('Dishes.php', { lang: i18n.locale.toUpperCase() })
  if (res.content.length > 0) {
    Dishes = res.content
  }
  return Dishes
}

// const ipcRenderer = require('electron').ipcRenderer

export function tryToReport () {
  getData(Config.Protocol + Config.Base + '/PHP/AccessLog.php?op=reportStatus')
    .then(res => {
      if (res.status === 'good') {
        // console.info('reportGood', res)
      } else {
        console.error('reportBad', res)
      }
    }).catch(err => {
      console.error('reportBad', err)
    })
}

export async function getConsumeTypeList () {
  if (consumeTypeList.length === 0) {
    const res = await hillo.get('Complex.php', {
      op: 'showAllConsumeTypeInfo',
      chaos: timeStampNow()
    })
    res.content.forEach(ct => {
      ct.name = getCurrentLangObj(ct.langs).name
      consumeTypeList.push(ct)
    })
  }
}

function getCurrentLangObj (langs) {
  return findNameByLang(Object.values(langs), GlobalConfig.lang)
}

function findNameByLang (langs, lang) {
  return langs?.find(l => l.lang === lang) ?? { name: '' }
}

export function findConsumeTypeById (id) {
  for (const i of consumeTypeList) {
    if (parseInt(i.id) === parseInt(id)) {
      return i
    }
  }
  return { name: '' }
}

export async function resetTableStatus (tableId) {
  return await hillo.get('Complex.php', {
    op: 'resetTableCallStatus',
    tableId: tableId,
    chaos: timeStampNow()
  })
}

export async function jumpToTable (tableId, tableName) {
  await resetTableStatus(tableId)
  const params = Object.assign({
    id: tableId,
    tableId,
    tableName
  })
  jumpTo('table', params)
}

export function blockReady () {
  // console.warn('released')
  blocked = false
}

export function blocking () {
  // console.warn('blocked!')
  blocked = true
}

export function isBlocking () {
  return blocked
}

export function setGlobalTableId (id) {
  TableId = id
}

// return password
export async function popAuthorize (type = '', successCallback = null, force = false, failedCallback = null, tableId = null) {
  const ok = (password) => {
    if (successCallback) {
      successCallback(password)
    }
  }
  const typeIsBoss = type === 'boss'
  if (!force && ((typeIsBoss && !GlobalConfig.UseBossPassword) || (!typeIsBoss && !GlobalConfig.usePassword))) {
    ok(GlobalConfig.defaultPassword)
    return GlobalConfig.defaultPassword
  }
  return new Promise(resolve => {
    store.commit('START_AUTHORIZE', {
      typeIsBoss,
      successCallback,
      force,
      failedCallback,
      tableId,
      resolve
    })
  })
}

export async function showTableSelector (filter = null, requiredTableKey = 'tableName') {
  return new Promise(resolve => {
    store.commit('START_TABLE_PICK', {
      tableFilter: filter,
      resolve,
      requiredTableKey
    })
  })
}

export async function openOrEnterTable (number, password, onlyOpenTable = false) {
  try {
    const table = (await hillo.silentGet('Tables.php', { name: number })).content[0]
    if (table.usageStatus === '0') {
      if (number.toLowerCase().startsWith('w')) {
        logErrorAndPop('Bitte benutzen sie blaue button zu Lieferung.')
        return
      }
      if (GlobalConfig.useOpenTableConfirm && !GlobalConfig.usePassword) {
        const result = await showConfirmAsyn(capitalize(number) + i18n.t(' Öffnen?'), i18n.t('Neue Tisch'))
        if (!result.isConfirmed) {
          return
        }
      }
      if (password) {
        shouldOpenTable(table.id, password)
      } else {
        popAuthorize('', (pw) => shouldOpenTable(table.id, pw), false, false, table.id)
      }
    } else if (table.usageStatus === '1' && !onlyOpenTable) {
      const enterTable = () => {
        jumpToTable(table.id, table.name)
      }
      if (GlobalConfig.useEnterTablePermissionCheck) {
        popAuthorize('', () => {
          enterTable()
        }, false, false, table.id)
      } else {
        enterTable()
      }
    }
  } catch (e) {
    if (number.includes('.')) {
      popAuthorize('', async (pw) => {
        const res = (await forceOpenTable(number, pw)).content
        jumpToTable('' + res.tableId, res.tableName)
      }, false)
    } else {
      logErrorAndPop(e)
    }
  }
}

export async function forceOpenTable (tableName, pw) {
  return await hillo.post('Complex.php?op=forceOpenTable', {
    tableName,
    pw
  })
}

export async function getFalsePrinterList () {
  return (await hillo.get('PrintRecord.php', {
    op: 'showAbnormalRecords'
  })).content
}

async function shouldOpenTable (openingTable, pw) {
  if (!Config.useOpenTablePrompt) {
    openTableCallback(openingTable, pw, 1, 0, 1)
    return
  }
  const result = await openTablePrompt()
  openTableCallback(openingTable, pw, ...result)
}

async function informOpenTable (password = '', number, personCount, childCount) {
  try {
    const res = await hillo.post('Complex.php?op=openTable', {
      tableId: number,
      pw: password,
      personCount: personCount,
      childCount: childCount
    })
    jumpToTable(res.content.tableId, res.content.tableName)
  } catch (e) {
    console.log(e)
    logErrorAndPop(i18n.t('JSIndexRequestOutTableFailed') + e?.data?.info)
  }
}

export async function openTablePrompt () {
  const res = await Swal.mixin({
    confirmButtonText: i18n.t('nextStep') + ' &rarr;',
    showCancelButton: true,
    progressSteps: ['1', '2', '3']
  }).queue([{
    title: i18n.t('popLabelGuestCount'),
    input: 'text'
  }, {
    title: i18n.t('popLabelChildCount'),
    input: 'text'
  }, {
    title: i18n.t('popTypeLabel'),
    input: 'select',
    inputOptions: {
      ...consumeTypeList.reduce((cry, i) => {
        cry[i.id] = i.name
        return cry
      }, {})
    }
  }])
  if (res.value) {
    if ([4, 6].includes(parseInt(res.value[2]))) {
      const adultDishId = await Swal.fire({
        title: i18n.t('key'),
        input: 'select',
        inputOptions: {
          ...Dishes
            .filter(i => i.dishesCategoryTypeId === '8')
            .reduce((cry, i) => {
              cry[i.dishId] = i.dishName
              return cry
            }, {})
        }
      })
      res.value.push(adultDishId.value)
    }
    return res.value
  }
}

export function parseIntAndSetDefault (val, de = 0) {
  let number = parseInt(val)
  if (isNaN(number)) {
    number = de
  }
  return number
}

export function openTableCallback (openingTable, pw = null, guestCount, childCount, consumeType, adultDishId) {
  [guestCount, childCount] = [guestCount, childCount].map(parseIntAndSetDefault)
  pw = pw ?? Config.defaultPassword
  const openTableType = parseInt(consumeType)
  switch (openTableType) {
    case 1:
      informOpenTable(pw, openingTable, guestCount, childCount)// todo 添加开桌类型
      break
    case 2:
      requestOutTable(pw)
      break
    case 4:
    case 6:
      informOpenJpTable(pw, openingTable, guestCount, childCount, adultDishId)
      break
    default:
      logErrorAndPop(i18n.t('选择了错误的开桌类型'))
  }
}

export function informOpenJpTable (password, number, personCount, childCount, adultDishId) {
  hillo.post('Complex.php?op=openJapanBuffetTable', {
    tableId: number,
    pw: password,
    adultCount: personCount,
    childCount: childCount,
    adultDishId: adultDishId
  }).then(res => jumpToTable(res.content.tableId, res.content.tableName))
    .catch(err => {
      logErrorAndPop(i18n.t('JSIndexRequestOutTableFailed') + err.info)
    })
}

export async function requestOutTable (pw = null) {
  const res = await hillo.post('Complex.php?op=openTakeawayTable', {
    pw: pw ?? Config.defaultPassword,
    personCount: 0
  })
  if (goodRequest(res)) {
    jumpToTable(res.content.tableId, res.content.tableName)
  } else {
    logErrorAndPop(i18n.t('JSIndexRequestOutTableFailed') + res.info)
  }
}

export function showConfirmAsyn (str, title = i18n.t('areYouSure')) {
  return Swal.fire({
    title: title,
    html: str,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: i18n.t('yesIAm'),
    cancelButtonText: i18n.t('cancel')
  })
}

export function toast (str = 'Ok', callback, type) {
  const Toast = Swal.mixin({
    toast: true,
    position: 'top',
    showConfirmButton: false,
    timer: TOASTTIME,
    timerProgressBar: true,
    onOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    onAfterClose () {
      if (callback) {
        callback()
      }
    }
  })
  Toast.fire({
    title: str,
    icon: type
  })
}

export function loadingComplete () {
  toast(i18n.t('Loading SuccessFully'))
}

export function getData (url, data) {
//  console.log(url, data)
  url = new URL(url)
  const defaultData = {
    chaos: timeStampNow()
  }
  data = Object.assign(defaultData, data)
  url.search = url.search + '&' + new URLSearchParams(data).toString()
  return fetch(url).then(res => {
    blockReady()
    return res.json().catch(err => {
      console.log(err, res, url)
    })
  })
}

export async function showInput (title, body = '', input = 'text', inputValue = '', allowEmpty = false) {
  const result = await Swal.fire({
    title: title,
    html: body,
    input: input,
    inputAttributes: {
      autocapitalize: 'off'
    },
    inputValue: inputValue,
    showCancelButton: true,
    confirmButtonText: i18n.t('confirm'),
    showLoaderOnConfirm: true,
    preConfirm: (data) => {
      return !(!data && !allowEmpty)
    },
    allowOutsideClick: () => !Swal.isLoading()
  })
  if (result.value || allowEmpty) {
    return result.value
  } else {
    return false
  }
}

/**
 * @param {string} title
 * @param {string} input
 * @param {*} url
 * @param {string|number} dataName
 * @param {*} dataObj
 * @param {string} method
 * @param {boolean} allowEmpty
 * @param body
 * @param inputValue
 */
export async function fastSweetAlertRequest (title, input, url, dataName, dataObj, method = 'POST', allowEmpty = false, body = null, inputValue = '') {
  dataObj[dataName] = ''
  const callBack = function (method, data) {
    const request = method === 'POST' ? hillo.post : hillo.silentGet
    dataObj[dataName] = data
    return request(url, dataObj, { silent: true })
      .then(response => {
        return response
      })
      .catch(error => {
        Swal.showValidationMessage(`Request failed: ${error?.data?.info ?? 'Error'}`)
      })
  }

  const result = await Swal.fire({
    title: title,
    html: body,
    input: input,
    inputAttributes: {
      autocapitalize: 'off'
    },
    inputValue: inputValue,
    showCancelButton: true,
    confirmButtonText: i18n.t('confirm'),
    cancelButtonText: i18n.t('cancel'),
    showLoaderOnConfirm: true,
    preConfirm: (data) => {
      if (!data && !allowEmpty) {
        return false
      }
      return callBack(method, data)
    },
    allowOutsideClick: () => !Swal.isLoading()
  })
  if (result.value || allowEmpty) {
    result.value.originalData = dataObj[dataName]
    return result.value
  } else {
    return false
  }
}

export function toastError (str) {
  Swal.fire({
    icon: 'error',
    title: str,
    showConfirmButton: true

  })
}

export function toManage () {
  oldJumpTo('admin/index.html', {
    DeviceId: GlobalConfig.DeviceId,
    lang: GlobalConfig.lang,
    Base: GlobalConfig.Base
  })
}

export function goodRequest (res) { // Return Res.status==good
  return res.status !== undefined && res.status === 'good'
}

function timeStampNow () {
  return new Date().getTime()
}

export function AssginToStringClass (StringName, Value) {
  // console.log(StringName);
  for (const a of document.getElementsByClassName('S_' + StringName)) {
    a.innerHTML = Value
  }
  for (const a of document.getElementsByClassName('String-' + StringName)) {
    // console.log(a);
    a.innerHTML = Value
  }
}

export function remove (arr, index) {
  arr.splice(index, 1)
}

export function jumpTo (url, params) {
  clearAllTimer()
  router.replace({
    name: url,
    params
  })
}

export function oldJumpTo (url, params) {
  let nUrl = url
  console.log(params)
  if (params) {
    nUrl += '?'
    const paramArray = []
    for (const i of Object.keys(params)) {
      const param = i + '=' + params[i]
      paramArray.push(param)
    }
    nUrl += paramArray.join('&')
  }

  window.location.href = nUrl
}

export function showTime () {
  const date = dayjs()

  return date.format('HH:mm')
}

export function findElement (id) {
  return document.getElementById(id)
}

export function logError (t) {
  //   M.toast({html: t, classes:'rounded', displayLength:3000});
  toastError(t)
  console.error(t)
}

export function logErrorAndPop (t) {
  const info = t?.data?.info
  toastError(info ?? t)
  console.error(t)
  if (blockReady) {
    blockReady()
  }
}

export function showTimedAlert (type, title, time = 1000, callback = null) {
  let timerInterval
  Swal.fire({
    title: title,
    allowOutsideClick: false,
    html: 'This window will close in <strong></strong> milliseconds.',
    timer: time,
    icon: type,
    onBeforeOpen: () => {
      Swal.showLoading()
      timerInterval = setInterval(() => {
        Swal.getContent().querySelector('strong').textContent = Swal.getTimerLeft()
      }, 100)
    },
    onDestroy () {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (/* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.timer) {
      if (callback) {
        callback()
      }
    }
  })
}
