import Swal from 'sweetalert2'
import router from '../router'
import { ego, hillo } from 'innerken-utils'
import i18n from '../i18n'
const settings = window.electron.remote.require('electron-settings')
const ipcRenderer = window.electron.ipcRenderer
const StaticConfig = settings.get('config')

export const version = '1.1.0'
console.log('Config', StaticConfig)

let Config = {}
Config.IP = 'localhost'
Config.Dir = ''
Config.REALROOT = `http://${Config.IP}${(Config.Dir.length > 0 ? '/' + Config.Dir : '')}`
Config = Object.assign(Config, StaticConfig)
Config.PHPROOT = `${Config.REALROOT}/PHP/`
window.Config = Config
export const _Config = Config
export function getConfig () {
  return Config
}
export const RequestMethod = {
  GET: 'GET',
  POST: 'POST'
}
export let TableId = null
let blocked = false
const TOASTTIME = 700

let consumeTypeList = []
let Dishes = []

function useCurrentConfig () {
  settings.set('config', Config)
  reload()
}

function hardReload () {
  settings.deleteAll()
}

function setDeviceId (id) {
  settings.set('config.DeviceId', id)
  reload()
}

window.useCurrentConfig = useCurrentConfig
window.hardReload = hardReload
window.setDeviceId = setDeviceId

export function changeLanguage (l) {
  settings.set('config.lang', l)
  reload()
}

export function postData (url, data) {
  // Default options are marked with *
  const formData = new FormData()
  for (const i in data) {
    formData.append(i, data[i])
  }
  return fetch(url, {
    body: formData, // must match 'Content-Type' header
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, same-origin, *omit
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, cors, *same-origin
    redirect: 'follow', // manual, *follow, error
    referrer: 'no-referrer' // *client, no-referrer
  }).then(response => {
    blockReady()
    return response.json()
  }) // parses response to JSON
}

export async function getAllDishes () {
  const res = await hillo.get('Dishes.php', { lang: i18n.locale.toUpperCase() })
  if (res.content.length > 0) {
    Dishes = res.content
  }
  return Dishes
}

// const ipcRenderer = require('electron').ipcRenderer

export function reload () {
  ipcRenderer.send('reload')
}

let debugCounter = 0

export function toggleDebug () {
  debugCounter++
  if (debugCounter > 10) {
    settings.set('config.Debug', !settings.get('config.Debug'))
    reload()
    debugCounter = 0
  }
}

export function tryToReport () {
  getData('http://' + Config.IP + '/PHP/AccessLog.php?op=reportStatus')
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

export function getConsumeTypeList (callback) {
  getData(Config.PHPROOT + 'Complex.php', {
    op: 'showAllConsumeTypeInfo',
    chaos: timeStampNow()
  }).then(res => {
    //  console.log(res, "getConsumeTypeList");
    if (goodRequest(res)) {
      consumeTypeList = res.content
      if (callback) {
        callback()
      }
    }
  })
}

export function findConsumeTypeById (id) {
  for (const i of consumeTypeList) {
    if (i.id === id) {
      return i
    }
  }
  return null
}

export function jumpToTable (tableId, tableName) {
  getData(Config.PHPROOT + 'Complex.php', {
    op: 'resetTableCallStatus',
    tableId: tableId,
    chaos: timeStampNow()
  })
  const params = Object.assign({ id: tableId, tableId, tableName })

  jumpTo('table.html', params)
}

export function blockReady () {
  // console.info('released')
  blocked = false
}

export function blocking () {
  console.info('blocked!')
  blocked = true
}

export function isBlocking () {
  return blocked
}

export function setGlobalTableId (id) {
  TableId = id
}

export function getGlobalTableId () {
  return TableId
}

export function popAuthorize (type, successCallback, force = false, failedCallback) {
  if (!force) {
    if (!Config.UsePassword && type !== 'boss') {
      successCallback()
      return
    }
    if (!Config.UseBossPassword && type === 'boss') {
      successCallback()
      return
    }
  }
  fastSweetAlertRequest(findInString('popAuthTitle'), 'password',
    'Servant.php'
    , 'pw', {
      op: type === 'boss' ? 'checkBoss' : 'checkServant',
      tableId: TableId
    }, 'GET', () => {
      successCallback()
    })
} // Request element password,authorized

/** should provide a model list */

export async function getActiveTables () {
  const res = await getData(Config.PHPROOT + 'Tables.php', {
    op: 'showAllTableWithSection'
  })
  if (goodRequest(res)) {
    return reloadTables(res.content)
  } else {
    logErrorAndPop(Strings[Config.lang].JSIndexGetActiveTableListFailed + res.info)
  }
}

function reloadTables (arrOfT) {
  const areaData = []
  for (const k in arrOfT) {
    const area = {}
    area.areaName = k
    area.tables = arrOfT[k]
    if (area.tables.length > 6 && area.tables.length <= 12) {
      area.width = '470px'
      area.maxHeight = '900px'
      area.flexDirection = 'column'
    } else if (area.tables.length > 12 && area.tables.length <= 18) {
      area.width = '708px'
      area.maxHeight = '900px'
      area.flexDirection = 'column'
    } else if (area.tables.length > 18) {
      area.width = '708px'
      area.maxHeight = 'auto'
      area.flexDirection = 'row'
    } else {
      area.width = 'fit-content'
      area.maxHeight = '900px'
      area.flexDirection = 'column'
    }
    for (const i of area.tables) {
      if (i.consumeType) {
        i.consumeTypeName = findConsumeTypeById(i.consumeType).name
      } else {
        i.consumeTypeName = 'AVL'
      }
    }
    areaData.push(area)
  }
  // console.log(areaData)
  return areaData
}

export function createOrEnterTable (number) {
  hillo.get('Tables.php', { name: number }).then(res => {
    if (res.content[0].usageStatus === '0') {
      popAuthorize('', () => shouldOpenTable(res.content[0].id))
    } else if (res.content[0].usageStatus === '1') {
      toast(findInString('JSIndexCreateTableEnterTable') + number,
        () => {
          jumpToTable(res.content[0].id, res.content[0].name)
        })
    }
  }).catch(err => {
    logErrorAndPop(Strings[Config.lang].JSIndexCreateTableTableNotFound + err)
  })
}

async function shouldOpenTable (openingTable) {
  if (!Config.useOpenTablePrompt) {
    openTableCallback(openingTable, 1, 0, 1)
    return
  }
  const result = await openTablePrompt()
  openTableCallback(openingTable, ...result)
}

function informOpenTable (password, number, personCount, childCount) {
  requestApi(
    'Complex.php?op=openTable',
    {
      tableId: number,
      pw: Config.usePassword ? password : '',
      personCount: personCount,
      childCount: childCount
    },
    'POST',
    (res) => {
      jumpToTable(res.content.tableId, res.content.tableName)
    },
    (res) => {
      logErrorAndPop(Strings[Config.lang].JSIndexRequestOutTableFailed + res.info)
    }
  )
}

export async function openTablePrompt () {
  const res = await Swal.mixin({
    confirmButtonText: findInString('nextStep') + ' &rarr;',
    showCancelButton: true,
    progressSteps: ['1', '2', '3']
  }).queue([
    {
      title: findInString('popLabelGuestCount'),
      input: 'text'
    },
    {
      title: findInString('popLabelChildCount'),
      input: 'text'
    },
    {
      title: findInString('popTypeLabel'),
      input: 'select',
      inputOptions: {
        ...consumeTypeList.reduce((cry, i) => {
          cry[i.id] = i.name
          return cry
        }, {})
      }
    }
  ])
  if (res.value) {
    if ([4, 6].includes(parseInt(res.value[2]))) {
      const adultDishId = await Swal.fire({
        title: '请选择日本餐类型',
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
    // logErrorAndPop(Strings[Config.lang].JSIndexOpenTableCallBackInvalidNumber)
    // return
  }
  return number
}

export function openTableCallback (openingTable, guestCount, childCount, consumeType, adultDishId) {
  [guestCount, childCount] = [guestCount, childCount].map(parseIntAndSetDefault)
  const openTableType = parseInt(consumeType)
  switch (openTableType) {
    case 1:
      informOpenTable(Config.defaultPassword, openingTable, guestCount, childCount)// todo 添加开桌类型
      break
    case 2:
      requestOutTable()
      break
    case 4:
    case 6:
      informOpenJpTable(Config.defaultPassword, openingTable, guestCount, childCount, adultDishId)
      break
    default:
      logErrorAndPop('选择了错误的开桌类型')
  }
}

export function informOpenJpTable (password, number, personCount, childCount, adultDishId) {
  requestApi(
    'Complex.php?op=openJapanBuffetTable',
    {
      tableId: number,
      pw: password,
      adultCount: personCount,
      childCount: childCount,
      adultDishId: adultDishId
    }, 'POST',
    (res) => {
      jumpToTable(res.content.tableId, res.content.tableName)
    },
    (res) => {
      logErrorAndPop(Strings[Config.lang].JSIndexRequestOutTableFailed + res.info)
    }
  )
}

function initialConfig () {
  Config.PHPROOT = `${Config.REALROOT}/PHP/`
  ego.initial(Config.PHPROOT)
}

export function requestOutTable () {
  postData(Config.PHPROOT + 'Complex.php?op=openTakeawayTable', {
    pw: Config.defaultPassword,
    personCount: 0

  }).then(res => {
    if (goodRequest(res)) {
      jumpToTable(res.content.tableId, res.content.tableName)
    } else {
      logErrorAndPop(findInString('JSIndexRequestOutTableFailed') + res.info)
    }
  })
}

export function resolveBestIP (callback) {
  if (!Config.resolveIP) {
    initialConfig()
    if (callback) {
      callback()
    }
    return
  }
  if (Config.DeviceId === -1) {
    console.error('DeviceIdNotSet,Go Offline')
    initialConfig()
    if (callback) {
      callback()
    }
    console.error('You are In Offline Mode')
    return
  }

  getData('https://innerken.com/iplogger/', {
    op: 'findBestIp',
    deviceId: Config.DeviceId
  }).then(res => {
    if (goodRequest(res)) {
      Config.IP = res.content
      Config.REALROOT = `http://${Config.IP}${(Config.Dir.length > 0 ? '/' + Config.Dir : '')}`
      initialConfig()
    } else {
      Config.REALROOT = `http://${Config.IP}${(Config.Dir.length > 0 ? '/' + Config.Dir : '')}`
      initialConfig()
    }
    if (callback) {
      callback()
    }
  })
}

export function findInString (str) {
  if (Strings) {
    return Strings[Config.lang][str]
  } else {
    return str
  }
}

export function showConfirm (str, callback, fCallback, title = findInString('areYouSure')) {
  Swal.fire({
    title: title,
    html: str,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: findInString('yesIAm'),
    cancelButtonText: findInString('cancel')
  }).then((result) => {
    if (result.value) {
      if (callback) {
        callback()
      }
    } else {
      if (fCallback) {
        fCallback()
      }
    }
  })
}

export function toast (str, callback, type) {
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
  Toast.fire(str, type)
}

export function loadingComplete () {
  toast(findInString('Loading SuccessFully'))
}

export function showLoading () {
  Swal.fire({
    title: findInString('loading'),
    allowOutsideClick: () => !Swal.isLoading(),
    allowEscapeKey: false
  })
  Swal.showLoading()
}

export function getData (url, data) {
  // console.log(url, data)
  url = new URL(url)
  const defaultData = {
    chaos: timeStampNow()
  }
  data = Object.assign(defaultData, data)

  url.search = url.search + '&' + new URLSearchParams(data).toString()
  return fetch(url).then(res => {
    blockReady()
    return res.json()
  })
}

/**
 * @param {string} title
 * @param {string} input
 * @param {*} url
 * @param {string|number} dataName
 * @param {*} dataObj
 * @param {string} method
 * @param {(function(...[*]=))|initialUI} callback
 * @param {boolean} allowEmpty
 */
export function fastSweetAlertRequest (title, input, url, dataName, dataObj, method = 'POST',
  callback = false, allowEmpty = false) {
  url = `${Config.PHPROOT + url}`
  dataObj[dataName] = ''
  Swal.fire({
    title: title,
    input: input,
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: findInString('confirm'),
    showLoaderOnConfirm: true,
    preConfirm: (data) => {
      if (!data && !allowEmpty) {
        return false
      }
      dataObj[dataName] = data
      if (method === 'POST') {
        return postData(url, dataObj)
          .then(response => {
            if (goodRequest(response)) {
              return response
            } else {
              throw new Error(response.info)
            }
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      } else {
        return getData(url, dataObj)
          .then(response => {
            if (goodRequest(response)) {
              return response
            } else {
              throw new Error(response.info)
            }
          })
          .catch(error => {
            Swal.showValidationMessage(
              `Request failed: ${error}`
            )
          })
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then(result => {
    if (result.value || allowEmpty) {
      if (callback) {
        callback()
      }
    }
  })
}

export function toastMore (str, content) {
  Swal.fire({
    icon: 'success',
    title: str,
    content: content,
    showConfirmButton: false,
    timer: TOASTTIME
  })
}

export function toastError (str) {
  Swal.fire({
    icon: 'error',
    title: str,
    showConfirmButton: true

  })
}

export function copyObject (item) {
  const d = {}
  for (const i of Object.keys(item)) {
    d[i] = item[i]
  }
  return d
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
  url = url.split('.')[0]
  console.log('jumping to ' + url, params)
  router.push({ name: url, params })
  // let nUrl = url
  // console.log(params)
  // if (params) {
  //   nUrl += '?'
  //   const paramArray = []
  //   for (const i of Object.keys(params)) {
  //     const param = i + '=' + params[i]
  //     paramArray.push(param)
  //   }
  //   nUrl += paramArray.join('&')
  // }

  // window.location.href = nUrl
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
  const date = new Date()
  let hour = '00' + date.getHours()
  hour = hour.substr(hour.length - 2)
  let minute = '00' + date.getMinutes()
  minute = minute.substr(minute.length - 2)
  return hour + ' : ' + minute
}

export function findElement (id) {
  return document.getElementById(id)
}

export function sortAlphaNum (a, b) {
  const reA = /[^a-zA-Z]/g
  const reN = /[^0-9]/g
  const aA = a.code.replace(reA, '')
  const bA = b.code.replace(reA, '')
  if (aA === bA) {
    const aN = parseInt(a.code.replace(reN, ''), 10)
    const bN = parseInt(b.code.replace(reN, ''), 10)
    return aN === bN ? 0 : aN > bN ? 1 : -1
  } else {
    return aA > bA ? 1 : -1
  }
}

export function isNotANumber (inputData) {
  // isNaN(inputData)不能判断空串或一个空格
  // 如果是一个空串或是一个空格，而isNaN是做为数字0进行处理的，而parseInt与parseFloat是返回一个错误消息，这个isNaN检查不严密而导致的。
  return parseFloat(inputData).toString() !== 'NaN'
}

export function logError (t) {
  //   M.toast({html: t, classes:'rounded', displayLength:3000});
  toastError(t)
  console.error(t)
}

export function logErrorAndPop (t) {
  toastError(t)
  console.error(t)
  if (blockReady) {
    blockReady()
  }
}

export function requestApi (url, data, method, onGood, onBad,
  hideLoading = true, goodText,
  fullUrl = false) {
  if (!hideLoading) {
    showLoading()
  }
  if (Config.Debug) {
    // console.log("网络请求：" + url, data)
  }
  data.chaos = timeStampNow()
  data.lang = Config.lang
  url = `${Config.PHPROOT + url}`
  const prom = method === RequestMethod.GET ? getData(url, data) : postData(url, data)
  prom.then(res => {
    if (Config.Debug) {
      // console.log("请求结果:", res)
    }
    if (goodRequest(res)) {
      if (!hideLoading) {
        if (!goodText) {
          loadingComplete()
        } else {
          toast(goodText)
        }
      }
      if (onGood) {
        onGood(res)
      }
    } else {
      logErrorAndPop('加载失败，原因是' + res.info)
      if (onBad) {
        onBad()
      }
    }
    blockReady()
  })
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
        Swal.getContent().querySelector('strong')
          .textContent = Swal.getTimerLeft()
      }, 100)
    },
    onDestroy () {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    if (
      /* Read more about handling dismissals below */
      result.dismiss === Swal.DismissReason.timer
    ) {
      if (callback) {
        callback()
      }
    }
  })
}

export const Strings = {
  DE: {
    areYouSure: 'sind Sie sicher?',
    yesIAm: 'ja',
    cancel: 'Absagen',
    confirm: 'ja',
    loading: 'loading',

    cantRevert: 'kann nicht revert',
    payed: 'bezahlt',
    notpayed: 'unbezahlt',
    person: 'Person anzahl',
    date: 'Datum',
    reservationPerson: 'Name',
    using: 'benutzt',
    notuse: 'benutzt nicht',
    discount: 'Rabatt',
    backTop: 'back to top',
    allrange: 'alle',
    loadComplete: 'load Erfolg！',
    fillInAll: 'fill in all',
    servantDetailTitle: 'Servant',
    todayCount: 'Count',
    todaySumLabel: 'Sum',
    todayTipLabel: 'TIP',
    todayBarLabel: 'BAR',
    todayEcLabel: 'EC',

    orderSuccess: 'Erfolg',
    returnSuccess: 'Erfolg',
    addDiscountSuccess: 'Erfolg',
    transferSuccess: 'Erfolg',
    alreadyOrdered: 'schön bezahlt',
    mergeSuccess: 'Erfolg',

    tableHintOpMulti: '  3.geben sie <span class="important">nr*code</span> to order multiple dishes',
    zbonLock: 'Durch die Zbon-Generierung werden alle aktuellen Rechnungen gesperrt. Möchten Sie Zbon drucken?',
    // <editor-fold desc="old">
    printDailySummary: 'Tages',
    printSummary: 'Zusammenfassung',
    startDate: 'Startdatum',
    printDate: 'Druckdatum',
    printTimes: 'Anzahl der Ausdrucke',
    JSIndexRequestOutTableFailed: 'Öffnen einem Tisches ist fehlgeschlagen，der Grund dafür ist：',
    JSIndexOpenTableCallBackInvalidNumber: 'Bitte geben Sie eine gültige Anzahl von Gästen ein',
    JSIndexCreateTableEnterTable: 'Den Tisch betreten',
    JSIndexCreateTableTableNotFound: 'Von Ihnen gewählten Tisch existiert nicht',
    JSIndexGetTableListFailed: 'ie Tisch-Liste konnte nicht abgerufen werden, der Grund dafür ist:',
    JSIndexGetActiveTableListFailed: 'Das Abrufen der Liste der besetzten Tischen ist fehlgeschlagen, der Grund dafür ist:',
    JSIndexGetAllCategoryFailed: 'Das Abrufen der Kategorienliste ist fehlgeschlagen, der Grund dafür ist:',
    JSIndexAddCategoryFailed: 'Hinzufügen einer neuen Kategorie ist fehlgeschlagen, der Grund dafür ist:',
    JSIndexDeleteCategoryFailed: 'Löschen einer Kategorie ist fehlgeschlagen, der Grund dafür ist:',
    JSIndexUpdateCategoryFailed: 'Aktualisierung der Kategorie ist fehlgeschlagen, der Grund dafür ist:',
    JSTableGetOrderedDishFailed: 'Die Bestellung konnte nicht abgerufen werden, der Grund dafür ist:',
    JSTableGetTableDetailFailed: 'Die Tischendetails konnten nicht abgerufen werden，der Grund dafür ist:',
    JSTableOrderFailed: 'Die Bestellung ist fehlgeschlagen, der Grund dafür ist:',
    JSTableGetDishFailed: 'Die Suche nach Gerichten ist fehlgeschlagen, der Grund dafür ist:',
    JSTableGetAllDishedFailed: 'Die gesamte Liste von Gerichten konnte nicht abgerufen werden. Der Grund dafür ist:',
    JSDishesDeleteFailed: 'Löschen von Gerichten ist fehlgeschlagen, der Grund dafür ist:',
    JSDishesUpdateFailed: 'Das Update von Gerichten ist fehlgeschlagen, der Grund dafür ist:',
    JSPersonGetAllFailed: 'Die vollständige Liste der Mitarbeiter/innen konnte nicht abgerufen werden, der Grund dafür ist:',
    JSPersonAddFailed: 'Hinzufügen eines Mitarbeiters ist fehlgeschlagen, der Grund dafür ist:',
    JSPersonDeleteFailed: 'Löschen eines Mitarbeiters ist fehlgeschlagen, der Grund dafür ist:',
    JSPersonUpdateFailed: 'Mitarbeiterinformationen konnten nicht aktualisiert werden, der Grund dafür ist:',
    JSSATGetServantForFormFailed: 'Die Kellnerinformationen konnten nicht abgerufen werden, der Grund dafür ist:',
    JSMTAUpdateTipFailed: 'Das Trinkgeld-Update ist fehlgeschlagen, der Grund dafür ist:',
    JSMTARecoverBillFailed: 'Neue Rechnungserstellung ist fehlgeschlagen, der Grund dafür ist:',
    JSTplTableNewTimeLabel: 'Zeit',
    JSTplNewDishHeadCode: 'Gerichtsnummer',
    JSTplNewDishHeadName: 'Gerichtname',
    JSTplNewDishHeadCount: 'Menge',
    JSTplNewDishHeadPrice: 'Preis',
    JSTplNewDishHeadDelete: 'Löschen',
    JSTplDishHeadCode: 'Gerichtsnummer',
    JSTplDishHeadName: 'Gerichtname',
    JSTplDishHeadCount: 'Menge',
    JSTplDishHeadPrice: 'Preis',
    JSTplDishHeadTotal: 'Gesamtsumme',
    JSTableCodeNotFound: 'Die Gerichtnummer existiert nicht',
    JSTableCheckOutCallBackGuestCountInvalid: 'Bitte geben Sie die entsprechende Anzahl der zahlenden Kunden ein',
    JSTableCheckOutCallBackGuestCountLessThanEqualZero: 'Die Anzahl der zahlenden Kunden muss mindestens 1 betragen ',
    JSTableCheckOutCallBackTipInvalid: 'Bitte geben Sie den entsprechenden Trinkgeld ein',
    JSTableCheckOutCallBackTipLessThanZero: 'Das Trinkgeld kann nicht weniger als 0 sein',
    JSTableCheckOutSuccess: 'Zahlung erfolgt',
    JSTableAdditionPopDiscountInfo: 'Bitte geben Sie einen Rabattcode ein ....',
    JSTableAdditionPopDiscountText: 'Bitte geben Sie einen Rabattcode ein.',
    JSTableAdditionPopChangeTableInfo: 'Bitte geben Sie die Tischnummer ein, den Sie wechseln möchten …',
    JSTableAdditionPopChangeTableText: 'Tisch wechseln',
    JSTableAdditionPopMergeTableInfo: 'Bitte geben Sie die Tischnummer ein, die zusammengesetzt werden soll …',
    JSTableAdditionPopMergeTableText: 'Tischen zusammensetzen',
    JSTableAdditionPopReturnDishInfo: 'Bitte geben Sie den Grund für die Rücksendung ein ...',
    JSTableAdditionPopReturnDishText: 'Gericht zurückgeben/Bestellung stornieren ',
    JSTableAdditionMergeTableFailed: 'Tischzusammensetzung fehlgeschlagen:',
    JSTableAdditionChangeTableFailed: 'Tischwechseln fehlgeschlagen',
    title: 'Honest Kasse System',
    appName: 'Aaden Kasse',
    indexTabBoss: 'Chef',
    indexTabDineIn: 'Im Restaurant',
    indexTabTakeaway: 'Außer Haus',
    infoLabelServer: 'Server:',
    infoContentServer: 'Normal * (21 ms)',
    infoLabelTable: 'Die Anzahl der verbleibenden Tischen',
    infoContentTable: '213',
    infoLabelTotal: 'Total: ',
    hintOpTable: '1. Geben Sie die <span class = important ""> Tischnummer </span> ein, um in den Tisch einzutreten oder die Tisch zu öffnen.',
    hintOpBoss: '2. Geben Sie <span class ="" important ""> l </span> ein, um die Chef-Seite aufzurufen.',
    hintOpTakeaway: '3. Geben Sie <span class ="" important ""> w </span> ein, um die Seite zum Außer Haus aufzurufen.',
    hintOpBack: '4. Drücken Sie <span class ="" important ""> Esc </span>, um zur vorherigen Seiten zurückzukehren',
    popTitle: 'Liste der besetzten Tischen| ',
    popLabelGuestCount: 'Gästen',
    popLabelChildCount: 'Kinder',
    popTypeOptionDineIn: 'Im Restaurant',
    popTypeOptionBuffet: 'Buffet',
    popTypeOptionTakeaway: 'Außer Haus',
    popTypeLabel: 'Speisetypen',
    popConfirm: 'Bestätigen',
    popAuthTitle: 'Bitte geben Sie Ihr Passwort ein',
    tablePageTitle: 'Tisch',
    tableInfoLabelTable: 'Tischnummer:',
    S_tableNumber: '',
    tableInfoLabelType: 'Typ:',
    S_type: '',
    tableInfoLabelTime: 'Zeit:',
    S_startTime: '',
    tableInfoLabelSeat: 'Setzen:',
    S_seatTimes: '',
    tableInfoLabelPerson: 'Personen:',
    S_personCount: '',
    tableInfoLabelServant: 'Kellner/in:',
    S_servantName: '',
    tableHintOpAddDish: '1.Geben Sie die Gerichtsnummer <span class ="" important ""> ein, um die </span> zu bestellen.',
    tableHintOpDelDish: '2. Geben Sie die <span class ="" important ""> d + code </span> ein, um die Gerichten zu stornieren , die zum Bestellen bereit sind',
    tableHintOpFastPanel: '3. Drücken Sie die <span class ="" important ""> Eingabetaste </span>, um das linke Verknüpfungsfeld aufzurufen.',
    tableHintOpFastCheckOut: '4. Geben Sie die <span class ="" important "">,  Schnell Zahlen mit bar, 0 Trinkgeld </span>',
    tableHintOpShowAllDish: '5. Geben Sie <span class ="" important ""> t </span> ein, um alle Gerichte und Gerichtsnummer im System anzuzeigen.',
    latestNews: 'Neueste Nachrichten',
    tableTHCode: '<span>Gerichtsnummer</span>',
    tableTHName: 'Gerichtsname',
    tableTHPrice: 'Preis',
    tableTHAmount: 'Menge',
    tableTHTotal: 'Gesamtsumme',

    tableNewDishTitle: 'Neue Gerichte',
    tableNewDishTHCode: 'Nr.',
    tableNewDishTHName: 'Name',
    tableNewDishTHPrice: 'Preis',
    tableNewDishTHAmount: 'Menge',
    tableNewDishTHDelete: 'Löschen',

    tableDishListTitle: 'Speisekarte',
    tableDishListTHCode: 'Gerichtsnummer',
    tableDishListTHName: 'Gerichtsname ',
    tableDishListTHPrice: 'Preis',

    tableDiscountPopTitle: 'Bitte geben Sie einen Rabattwert ein',
    tableDiscountPopHint: `<div class="hints">
    15 = -15€
    <br>
    15p = -15%<br>
    15pk = -15% in food<br>
    15pg = -15% in drink
    </div>`,

    tableCheckOutTitle: 'Kasse',

    tableCheckOutBillTypeOptionNormal: 'Normale Rechnung',
    tableCheckOutBillTypeOptionCompany: 'Unternehmensrechnung',
    tableCheckOutBillTypeOptionTemp: 'Vorläufige Rechnung',
    tableCheckOutBillTypeOption3: 'Rechnung',
    tableCheckOutBillTypeLabel: 'Bitte wählen Sie eine Rechnungsart.',

    tableCheckOutPaymentOptionBar: 'Bargeld',
    tableCheckOutPaymentOptionCard: 'Bankkarte',
    tableCheckOutPaymentOptionCredit: 'Kreditkarte',
    tableCheckOutPaymentLabel: 'Bitte wählen Sie eine Zahlungsart',

    tableCheckOutGuestCountLabel: 'Count',
    tableCheckOutTipLabel: 'Trinkgeld ',
    tableCheckOutConfirm: 'Bestätigen',

    langZH: 'CN',
    langEN: 'EN',
    langDE: 'DE',
    backstage: 'Backstage',
    labelManagement: 'Etikette',
    dishManagement: 'Gericht',
    dishStatictics: 'Gerichtstatistik',
    partitionManagement: 'Partitions',
    tableManagement: 'Tabellen',
    staff: 'Personal',
    authorityManagement: 'Berechtigung',
    staffManagement: 'Personal',
    bill: 'Rechnung',
    todaysSummary: 'Tagesabschluss',
    allBill: 'Alle Rechnungen',
    zbonList: 'Zbon Liste',
    exportAll: 'Alles exportieren',
    statistics: 'Statistische Informationen',
    print: 'Drucken',
    printTemplateManagement: 'Druckvorlagen',
    partitionPrintSettings: 'Partitions',
    deviceList: 'Geräteliste',
    deviceManagement: 'Geräte',

    setting: 'Einstel',
    bugReport: 'Frage stellen',
    restaurantInfo: 'Restaurant Identität',
    aboutUs: 'Über uns',
    salesStatistics: 'Verkaufsstatistik',
    drinkAndDish: 'Getränke Gerichte',
    drink: 'Getränke',
    food: 'Lebensmittel',
    dish: 'Gerichte',
    buffet: 'Buffet',
    buffetPrice: 'Buffet Preis',
    dishOnly: 'nur ala carte',
    sum: 'Gesamtbetrag',
    totalTurnoverToday: 'Heutige Gesamtumsatz ',
    totalCustomNoToday: 'Gesamtzahl der Kunden ',
    tableInUse: 'Tisch besetzt ',
    tableFree: 'Tisch frei',
    todaysReservation: 'Heutige Reservierung',
    salesAnalysisThisMonth: 'Umsatzanalyse dieses Monats',
    hotMenuThisWeek: 'Meistbestellte Gerichte dieser Woche',
    menuLabelsManagement: 'Gerichtsetikette-Verwaltung',
    homePage: 'Startseite',
    diningCategory: 'PrintCategory',
    menuLabelName: 'Gerichtsetikette-Name (Chinese)',
    edit: 'Bearbeiten',
    delete: 'Löschen',
    addNewLabel: 'Neuen Etikette hinzufügen',
    menuLabelDetails: 'Gerichtsetikette-Details',
    menuLabelCategory: 'Gerichtsetikette-Katagorie',
    label: 'Etikette',
    description: 'Beschreibung',
    package: 'Menü',
    tableNewPackage: 'Neues Menü hinzufügen',
    dishDetail: 'Gerichtdetails',
    basicInfo: 'Grunddaten ',
    labelBelonged: 'Zugehörige Etikette',
    dishImage: 'Gerichtbild',
    servantListName: 'Servant',
    servantListTotal: 'Total',
    filterLabel: 'Zeit',
    printTodaySummary: 'Heutige Zusammenfassung drucken',
    totalPrice: 'Gesamtpreis',
    todo: 'Druck ZBon',
    accessLog: 'Operation log',
    operationType: 'Operationstype',
    operationName: 'Operationsname',
    operationData: 'Operationsdaten',
    operationTime: 'Operationszeit',
    maxTime: 'Maximale Zeit',
    maxRounds: 'Maximale Runden',
    timeProRound: 'Zeit pro Runde',
    dishesProRound: 'Anzahl der Gerichte pro Runde',
    weeklySale: 'Verkäufe (Woche)',
    month: 'Monat',
    all: 'Gesamt',
    weeklySalesAmount: 'Verkäufe (Wochen)',
    partition: 'Partition',
    numberOfTableServed: 'Anzahl der Tische',
    addNewPartition: 'Neue Partition',
    partitionDetail: 'Partitionsdetails',
    partitionID: 'Partitions-ID',
    partitionName: 'Partitionsname',
    partitionBillType: 'Partition Rechnungstyp',
    partitionPrinterCount: 'Anzahl der partitionierten Drucker',
    seatsNo: 'Anzahl der Sitze',
    status: 'Zustand',
    usedTimesToday: 'Heutige Verwendungszahl',
    detail: 'Detail',
    addNewTable: 'Tisch hinzufügen',
    tableDetail: 'Tischdetails',
    tableNameLabel: 'Tischname',
    name: 'Name',
    authority: 'Berechtigung',
    password: 'Passwort',
    partTime: 'Teilzeit',
    addNewStaff: 'Neue Personal hinzufügen',
    staffDetails: 'Personaldetails',
    authorityBelonged: 'zugehörigen Berechtigungsgruppe',
    partOrFull: 'Teilzeit oder nicht',
    staffImg: 'Mitarbeiterfotos',
    serialNumber: 'Seriennummer',
    dateBelonged: 'Ausstellungsdatum',
    printStatus: 'Druckstatus',
    printTime: 'Druckzeit',
    printAgain: 'Nachdruck',
    printSuccess: 'Druck-Erfolg',
    deviceName: 'Gerätename',
    deviceID: 'Geräte-ID',
    deviceSN: 'Gerät SN',
    partitionBelonged: 'zugehörigen Partition',
    addNewDevice: 'Neues Gerät hinzufügen',
    deviceDetail: 'Gerätedetails',
    infoToday: 'Heutige Informationen',
    totalTurnover: 'Gesamtumsatz',
    totalNoOfBills: 'Gesamte Bestellungszahl',
    drinkTurnover: 'Umsatz für Getränke',
    foodTurnover: 'Umsatz für Gerichten ',
    billsToday: 'Heutige Rechnungen',
    orderNo: 'Bestellnummer',
    time: 'Zeit',
    currentOrder: 'Aktuelle Bestellung',
    dishNoOrName: 'Gerichtsenummer / Gerichtname',
    unitPrice: 'Einzelpreis',
    subTotal: 'Zwischensumme',
    checkOutButton: 'Kasse',
    accounting: 'Buchhaltung',
    number: 'Nummer',
    return: 'Zurück',
    submit: 'Senden',
    unit: 'Stück',
    toastInfoAddSuccess: 'Erfolgreich hinzugefügt ',
    toastInfoDeleteSuccess: 'Erfolgreich gelöscht ',
    toastInfoUpdateSuccess: 'Erfolgreich aktualisiert',
    servantPerformanceRanking: 'Leistungsranking des Kellners',
    ManageOrderDishcount: 'Menge',
    startTime: 'Anfangszeit',
    payTime: 'Abschlusszeit',
    payMethod: 'Zahlungsmethode',
    creditCard: 'Kreditkarte',
    customCount: 'Anzahl der speisenden Personen',
    billType: 'Rechnungstyp',
    dishSum: 'Gesamtpreis für Gerichten',
    drinkSum: 'Gesamtpreis für Getränke',
    totalTax: 'Gesamtsteuerbetrag',
    billRecover: 'Rechnung zurück erstellen',
    dishList: 'Gerichtsliste',
    orderTime: 'Bestellzeit',
    dishType: 'Gerichtstyp',
    printList: 'Druckaufgabe',
    printGroupID: 'ID',
    printListItemTitle: 'Überschrift',
    printListItemContent: 'Inhalt',
    printListItemStatus: 'Druckstatus',
    printListItemTime: 'Druckzeit',
    printListItemTimes: 'Anzahl des Druckens',
    printListItemFeedback: 'Druck-Feedback',
    printListEdit: 'Druckauftragsliste bearbeiten',
    JSSATAddFormRequired: 'Bitte geben Sie alle Daten ein',
    JSPrintAddFormRequired: 'Bitte geben Sie alle Daten ein',
    partitionKitchen: 'Küche',
    partitionBar: 'Bartheke',
    partitionReceiption: 'Rezeption',
    selectionAll: 'Alle',
    toastInfoReprintSuccess: 'Nachdruck erfolgreich',
    toastInfoTipUpdateSuccess: 'Trinkgeld-Update erfolgreich',
    toastInfoBillRecoverSuccess: 'Rechnung neu erstellen erfolgreich ',
    yes: 'Ja',
    no: 'Nein',
    address: 'Adresse',
    supplement: 'Ergänzung',
    zipCode: 'Postleitzahl',
    city: 'Stadt',
    state: 'Bundesland',
    country: 'Staat',
    tel: 'Telefon',
    corporation: 'Juristische Person',
    firstName: 'Vorname',
    lastName: 'Nachname',
    personalTitle: 'Titel',
    taxNo: 'SteuerNr.',
    mail: 'Mailbox',
    aboutUsWhoTitle: 'Was sind wir?',
    aboutUsWhoContent: ` Die Erfolgsgeschichte von InnerKen geht es nicht nur um die neueste Technologie, sondern auch um die humanistische Werte. Das sind die Voraussetzungen aller erfolgreichen Unternehmens.
        Dabei achten wir stets auf die Planung der eigenen Karriere und Entwicklung der Mitarbeiter, damit Unternehmen und Mitarbeiter zusammenwachsen. Wir investieren auch immer 70% unseres Jahresgewinns in die Entwicklung des Unternehmens und verfügen immer über ein Team von Top-Talentierten in allen Branchen.`,
    aboutUsWhereTitle: 'Woher wir kommen?',
    aboutUsWhereContent: 'Die Konzeption des Aaden-Systems basiert auf den Meinungen vieler Mitarbeiter mit langjähriger Erfahrung in der Gastronomie.\n' +
      '                            Wir haben ein tiefes Verständnis für die tatsächlichen Bedürfnisse der Gastronomiefachleute - vom Chef bis zu jedem Mitarbeiter.\n' +
      '                            Dies führte zur Einführung der integrierten Lösung für digitales Catering in der Aaden Smart Cloud. Bestellung von Scannern, Mitnehmen, Buchung von Webseiten und Verwaltung von Tischen vor Ort. \n' +
      '                            Flexibler Einsatz und effizientes Design verändern das Managementmodell der Gastronomie von oben nach unten.\n' +
      '                            Das Aaden-System ist auch das letzte System, das Sie benötigen, da die flexible Bereitstellungsoption [1] die Möglichkeit der Softwareentwicklung bietet.\n' +
      '                            Von einem kleinen Café bis zu einem riesigen Buffetrestaurant mit Tausenden von Sitzplätzen ist das Aaden-System immer an Ihrer Seite wie ein Kamin.',

    aboutUsBusinessTitle: 'Unser Geschäftsfeld',
    aboutUsBusinessContent: `Die Konzeption des Aaden-Systems basiert auf den Meinungen vieler Mitarbeiter mit langjähriger Erfahrung in der Gastronomie.
                            Wir haben ein tiefes Verständnis für die tatsächlichen Bedürfnisse der Gastronomiefachleute - vom Chef bis zu jedem Mitarbeiter.
                            Dies führte zur Einführung der integrierten Lösung für digitales Catering in der Aaden Smart Cloud. Bestellung von Scannern, Mitnehmen, Buchung von Webseiten und Verwaltung von Tischen vor Ort.
                            Flexibler Einsatz und effizientes Design verändern das Managementmodell der Gastronomie von oben nach unten.
                            Das Aaden-System ist auch das letzte System, das Sie benötigen, da die flexible Bereitstellungsoption [1] die Möglichkeit der Softwareentwicklung bietet.
                            Von einem kleinen Café bis zu einem riesigen Buffetrestaurant mit Tausenden von Sitzplätzen ist das Aaden-System immer an Ihrer Seite wie ein Kamin.`,
    aboutUsWhyTitle: 'Warum beschäftigen wir uns leidenschaftlich mit diesem Geschäft?',
    aboutUsWhyContent: ` Die treibende Kraft ist unsere Neugier für neue Technologien, unser Engagement für F & E und Innovation sowie unser Fokus auf unsere Kunden. Wir bemühen uns, Kundenerwartungen zu übertreffen,
        Wir sind bestrebt, die fortschrittlichste Software-Engineering-Technologie der Branche zu entwickeln. Durch Technologie- und Innovationsanstrengungen sind wir zu den Disruptoren der Branche geworden und bieten der Welt die besten Lösungen. Wir arbeiten hart und genießen es.`,
    langEn: 'English ',
    langDe: 'Deutsch',
    // </editor-fold>
    // here added by YD
    booking: 'Buchen',
    takeaway: 'Togo',
    classification: 'Klassifikation',
    information: 'Info',
    isShowing: 'Zeigen',
    allDish: 'Alle Gerichte',
    takeawayAddress: 'Adresse zum Mitnehmen',
    orderNumberLabel: 'BNr.',
    backToHome: 'Startseite',
    dishOrder: 'Bestellen',
    tableChange: 'Wechseln',
    tableMerge: 'Verschmelzen',
    payBill: 'Bezahlen',
    QuickBill: 'SchnellBZ',
    default: '|Default:',
    nextStep: 'Nächstes',
    haveOrderedDish: 'Bestellte Gerichte',
    billSplit: 'Getrennt',
    dishCancel: 'löschen',
    operation: 'Betriebs'
  },
  EN: {
    areYouSure: 'sind Sie sicher?',
    yesIAm: '是的，我确定',
    cancel: '取消',
    confirm: '确定',
    loading: '正在传输',
    // <editor-fold desc="old">
    JSIndexRequestOutTableFailed: '开桌失败，原因是：',
    JSIndexOpenTableCallBackInvalidNumber: '请输入有效的客人数量',
    JSIndexCreateTableEnterTable: '正在进入桌子',
    JSIndexCreateTableTableNotFound: 'No such table',
    JSIndexGetTableListFailed: '获取桌子列表失败，原因是：',
    JSIndexGetActiveTableListFailed: '获取使用中桌子列表失败，原因是：',
    JSIndexGetAllCategoryFailed: '获取类别列表失败，原因是：',
    JSIndexAddCategoryFailed: '添加类别失败，原因是：',
    JSIndexDeleteCategoryFailed: '删除类别失败，原因是：',
    JSIndexUpdateCategoryFailed: '更新类别失败，原因是：',
    JSTableGetOrderedDishFailed: '同步菜品列表中：',
    JSTableGetTableDetailFailed: '桌子已经结账，原因是：',
    JSTableOrderFailed: '点菜失败，原因是：',
    JSTableGetDishFailed: '查菜失败，原因是：',
    JSTableGetAllDishedFailed: '获取所有菜品列表失败，原因是：',
    JSDishesDeleteFailed: '删除菜品失败，原因是',
    JSDishesUpdateFailed: '更新菜品失败，原因是',
    JSPersonGetAllFailed: '获取全部员工列表失败，原因是',
    JSPersonAddFailed: '添加员工失败，原因是',
    JSPersonDeleteFailed: '删除员工失败，原因是',
    JSPersonUpdateFailed: '更新员工信息失败，原因是',
    JSSATGetServantForFormFailed: '获取服务员信息失败，原因是',
    JSMTAUpdateTipFailed: '小费更新失败，原因是',
    JSMTARecoverBillFailed: '账单恢复失败，原因是',

    JSTplTableNewTimeLabel: '用餐时间:',

    JSTplNewDishHeadCode: '菜号',
    JSTplNewDishHeadName: '菜名',
    JSTplNewDishHeadCount: '数量',
    JSTplNewDishHeadPrice: '价格',
    JSTplNewDishHeadDelete: '删除',

    JSTplDishHeadCode: '菜号',
    JSTplDishHeadName: '菜名',
    JSTplDishHeadCount: '数量',
    JSTplDishHeadPrice: '价格',
    JSTplDishHeadTotal: '总计',

    JSTableCodeNotFound: '菜号不存在',
    JSTableCheckOutCallBackGuestCountInvalid: '请输入合适的结账人数',
    JSTableCheckOutCallBackGuestCountLessThanEqualZero: '结账的人数至少为1',
    JSTableCheckOutCallBackTipInvalid: '请输入合适的小费数值',
    JSTableCheckOutCallBackTipLessThanZero: '小费不能小于0',
    JSTableCheckOutSuccess: '结账成功',

    JSTableAdditionPopDiscountInfo: '请输入折扣码.....',
    JSTableAdditionPopDiscountText: '请输入折扣码',
    JSTableAdditionPopChangeTableInfo: '请输入要转往的桌号......',
    JSTableAdditionPopChangeTableText: '转台',
    JSTableAdditionPopMergeTableInfo: '请输入要合并的桌号......',
    JSTableAdditionPopMergeTableText: '合台',
    JSTableAdditionPopReturnDishInfo: '请输入退菜理由',
    JSTableAdditionPopReturnDishText: '退菜',
    JSTableAdditionMergeTableFailed: '和台失败:',
    JSTableAdditionChangeTableFailed: '转台失败',

    title: '热诚Kasse System',
    appName: 'Aaden 智慧收银点餐系统',
    indexTabBoss: '老板',
    indexTabDineIn: '堂食',
    indexTabTakeaway: '外卖',

    infoLabelServer: '服务器:',
    infoContentServer: '正常*（21ms）',
    infoLabelTable: '剩余的桌子数量：',
    infoContentTable: '213',
    infoLabelTotal: '总额：',

    hintOpTable: '1.输入 <span class="important">桌号</span> 进入桌子或开桌子',
    hintOpBoss: '2.输入 <span class="important">l</span> 进入老板页面',
    hintOpTakeaway: '3.输入 <span class="important">w</span> 进入外卖页面',
    hintOpBack: '4.按 <span class="important">Esc</span> 返回到上一层',

    popTitle: '开桌表单 | ',
    popLabelGuestCount: '客人数量',
    popLabelChildCount: '儿童数量',
    popTypeOptionDineIn: '堂食',
    popTypeOptionBuffet: '自助餐',
    popTypeOptionTakeaway: '外卖',
    popTypeLabel: '用餐类型',
    popConfirm: '确认',

    popAuthTitle: '请输入密码',

    tablePageTitle: '桌子',
    tableInfoLabelTable: '桌号:',
    S_tableNumber: '',
    tableInfoLabelType: '类型:',
    S_type: '',
    tableInfoLabelTime: '用餐时间:',
    S_startTime: '',
    tableInfoLabelSeat: '坐客次数:',
    S_seatTimes: '',
    tableInfoLabelPerson: '人数:',
    S_personCount: '',
    tableInfoLabelServant: '服务员:',
    S_servantName: '',

    tableHintOpAddDish: '1.输入 <span class="important">菜号</span> 点菜',
    tableHintOpDelDish: '2.输入 <span class="important">d+菜号</span> 删除本次准备下单的商品',
    tableHintOpFastPanel: '3.按 <span class="important">回车</span> 进入左侧快捷指令面板',
    tableHintOpFastCheckOut: '4.<span class="important">快速结账即为使用现金，0小费</span>',
    tableHintOpShowAllDish: '5.输入 <span class="important">t</span> 查看系统中所有菜品和菜号',

    tableTHCode: '<span>菜号</span>',
    tableTHName: '菜名',
    tableTHPrice: '价格',
    tableTHAmount: '数量',
    tableTHTotal: '总计',

    tableNewDishTitle: '新增菜品',
    tableNewDishTHCode: '菜号',
    tableNewDishTHName: '菜名',
    tableNewDishTHPrice: '价格',
    tableNewDishTHAmount: '数量',
    tableNewDishTHDelete: '删除',

    tableDishListTitle: '菜单',
    tableDishListTHCode: '菜号',
    tableDishListTHName: '菜名',
    tableDishListTHPrice: '价格',

    tableDiscountPopTitle: '请输入折扣值',
    tableDiscountPopHint: `<div class="hints">
    15 = -15€
    <br>
    15p = -15%<br>
    15pk = -15% in food<br>
    15pg = -15% in drink
    </div>`,

    tableCheckOutTitle: '结账',

    tableCheckOutBillTypeOptionNormal: '普通账单',
    tableCheckOutBillTypeOptionCompany: '公司账单',
    tableCheckOutBillTypeOptionTemp: '临时账单',
    tableCheckOutBillTypeOption3: 'Rechnung',
    tableCheckOutBillTypeLabel: '请选择账单类型',

    tableCheckOutPaymentOptionBar: '现金',
    tableCheckOutPaymentOptionCard: '刷卡',
    tableCheckOutPaymentOptionCredit: '信用卡',
    tableCheckOutPaymentLabel: '请选择支付方式',

    tableCheckOutGuestCountLabel: '结账人数',
    tableCheckOutTipLabel: '小费',
    tableCheckOutConfirm: '确认',

    langZH: '中',
    langEN: '英',
    langDE: '德',
    backstage: '后台',
    labelManagement: '标签管理',
    dishManagement: '菜品管理',
    dishStatictics: '菜品统计',
    partitionManagement: '分区管理',
    tableManagement: '桌子管理',
    staff: '人员',
    authorityManagement: '权限管理',
    staffManagement: '人员管理',
    bill: '账单',
    todaysSummary: '本日总汇',
    allBill: '全部账单',
    zbonList: 'Zbon列表',
    exportAll: '全部导出',
    statistics: '统计信息',
    print: '打印',
    printTemplateManagement: '打印模板管理',
    partitionPrintSettings: '分区打印设置',
    deviceList: '设备列表',
    deviceManagement: '设备管理',
    printList: '打印单列表',
    setting: '设置',
    bugReport: '提交问题',
    restaurantInfo: '餐馆身份',
    aboutUs: '关于我们',
    salesStatistics: '销售额统计',
    drinkAndDish: '酒水 菜品',
    drink: '酒水',
    food: '食品',
    dish: '菜品',
    latestNews: '最新消息',
    sum: '总额',
    totalTurnoverToday: '今日营业总额',
    totalCustomNoToday: '今日用餐总人数',
    tableInUse: '使用中的桌子',
    tableFree: '空闲的桌子',
    todaysReservation: '今日预定',
    salesAnalysisThisMonth: '本月销售分析',
    hotMenuThisWeek: '本周热销菜品',
    menuLabelsManagement: '菜品标签管理',
    homePage: '首页',
    diningCategory: '打印类别',
    menuLabelName: '菜品标签名称（中文）',
    edit: '编辑',
    delete: '删除',
    addNewLabel: '添加新的标签',
    menuLabelDetails: '菜品标签详情',
    menuLabelCategory: '菜品标签类别',
    label: '标签',
    description: '描述',
    package: '套餐',
    tableNewPackage: '新增套餐',
    dishDetail: '菜品详情',
    basicInfo: '基本信息',
    labelBelonged: '所属标签',
    dishImage: '菜品图片',
    personManage: '人员管理',
    servantListName: '服务员',
    servantListTotal: '总额',
    filterLabel: '时间',
    printTodaySummary: '打印本日总结',
    totalPrice: '总额',
    todo: '打印ZBon',
    accessLog: '操作记录',
    operationType: '操作类型',
    operationName: '操作名称',
    operationData: '操作数据',
    operationTime: '操作时间',
    maxTime: '最长时间',
    maxRounds: '最大轮数',
    timeProRound: '每轮时间',
    dishesProRound: '每轮菜数',
    weeklySale: '销量(周)',
    month: '月',
    all: '总',
    weeklySalesAmount: '销售额(周)',
    partition: '分区',
    numberOfTableServed: '桌数',
    addNewPartition: '添加新的分区',
    partitionDetail: '分区详情',
    partitionID: '分区ID',
    partitionName: '分区名称',
    partitionBillType: '分区账单类型',
    partitionPrinterCount: '分区打印机数量',
    seatsNo: '座位数',
    status: '状态',
    usedTimesToday: '今日使用次数',
    detail: '详情',
    addNewTable: '新增桌子',
    tableDetail: '桌子详情',
    tableNameLabel: '桌子名称',
    name: '名称',
    authority: '权限',
    password: '密码',
    partTime: '兼职',
    addNewStaff: '添加新的人员',
    staffDetails: '人员详情',
    authorityBelonged: '所属权限组',
    partOrFull: '是否兼职',
    staffImg: '人员图片',
    serialNumber: '序列号',
    dateBelonged: '所属日期',
    printStatus: '打印状态',
    printTime: '打印时间',
    printAgain: '重新打印',
    printSuccess: '打印成功',
    deviceName: '设备名称',
    deviceID: '设备ID',
    deviceSN: '设备SN',
    partitionBelonged: '所属分区',
    addNewDevice: '添加新的设备',
    deviceDetail: '设备详情',
    infoToday: '本日信息',
    totalTurnover: '总营业额',
    totalNoOfBills: '总单数',
    drinkTurnover: '酒水营业额',
    foodTurnover: '食品营业额',
    billsToday: '本日账单',
    orderNo: '订单号',
    time: '时间',
    currentOrder: '当前订单',
    dishNoOrName: '菜号/菜名',
    unitPrice: '单价',
    subTotal: '小计',
    checkOutButton: '结 账',
    accounting: '账务',
    number: '号',
    return: '返回',
    submit: '提交',
    unit: '份',
    toastInfoAddSuccess: '添加成功',
    toastInfoDeleteSuccess: '删除成功',
    toastInfoUpdateSuccess: '更新成功',
    servantPerformanceRanking: '跑堂业绩排行',
    ManageOrderDishcount: '数量',
    startTime: '开始时间',
    payTime: '结账时间',
    payMethod: '支付方式',
    creditCard: '信用卡',
    customCount: '用餐人数',
    billType: '账单类型',
    dishSum: '菜品总价',
    drinkSum: '酒水总价',
    totalTax: '总税额',
    billRecover: '恢复账单',
    dishList: '菜品列表',
    orderTime: '下单时间',
    dishType: '菜品类型',
    printGroupID: 'ID',
    printListItemTitle: '标题',
    printListItemContent: '内容',
    printListItemStatus: '打印状态',
    printListItemTime: '打印时间',
    printListItemTimes: '打印次数',
    printListItemFeedback: '打印反馈',
    printListEdit: '编辑打印单列表',
    JSSATAddFormRequired: '请输入全部信息',
    JSPrintAddFormRequired: '请输入全部信息',
    partitionKitchen: '厨房',
    partitionBar: '吧台',
    partitionReceiption: '前台',
    selectionAll: '全部',
    toastInfoReprintSuccess: '重新打印成功',
    toastInfoTipUpdateSuccess: '小费更新成功',
    toastInfoBillRecoverSuccess: '账单恢复成功',
    yes: '是',
    no: '否',
    address: '地址',
    supplement: '补充',
    zipCode: '邮编',
    city: '城市',
    state: '州',
    country: '国家',
    tel: '电话',
    corporation: '法人',
    firstName: '名',
    lastName: '姓',
    personalTitle: '头衔',
    taxNo: '税号',
    mail: '邮箱',
    aboutUsWhoTitle: '我们是谁',
    aboutUsWhoContent: ` InnerKen的成功故事不仅仅关乎于站在时代最前沿的全新技术更关乎于对于人的关注。每一个伟大的公司都由这两点组成。
        我们永远注重对于人本身职业和生涯发展的规划，让公司和员工共同成长。我们也始终将每年盈利的百分之七十投入到公司的发展，并始终保持团队中有各个领域最好的人才。`,
    aboutUsWhereTitle: '我们从哪来',
    aboutUsWhereContent: 'Aaden系统的设计参考了众多具有多年餐饮业从业经验的实际场内工作人员的意见。\n' +
      '                            我们认真的了解了餐饮业从业人员——从老板到每一个员工的真正需求，\n' +
      '                            从而推出Aaden智能云数字餐饮一体化解决方案。扫码点餐，外卖，网页预定，\n' +
      '                            场内桌子管理，灵活的部署和高效的设计，从上而下变革餐饮业的管理模式。\n' +
      '                            Aaden系统也是您需要的最后一个系统，因为灵活部署选项[1]提供了软件“生长”的可能，\n' +
      '                            从一个小小的咖啡馆到有几千个座位的巨型自助餐厅，Aaden系统都如同壁炉般永远陪在您的身边。',

    aboutUsBusinessTitle: '我们的业务范围',
    aboutUsBusinessContent: `Aaden系统的设计参考了众多具有多年餐饮业从业经验的实际场内工作人员的意见。
                            我们认真的了解了餐饮业从业人员——从老板到每一个员工的真正需求，
                            从而推出Aaden智能云数字餐饮一体化解决方案。扫码点餐，外卖，网页预定，
                            场内桌子管理，灵活的部署和高效的设计，从上而下变革餐饮业的管理模式。
                            Aaden系统也是您需要的最后一个系统，因为灵活部署选项[1]提供了软件“生长”的可能，
                            从一个小小的咖啡馆到有几千个座位的巨型自助餐厅，Aaden系统都如同壁炉般永远陪在您的身边。`,
    aboutUsWhyTitle: '我们为什么热衷于我们的事业',
    aboutUsWhyContent: ` 驱动我们的是对新技术的好奇心，对研发和创新的承诺，以及对顾客的专注。我们力求超出顾客预期，
        致力开拓业界最先进的软件工程技术。通过技术和创新我们努力成为行业的颠覆者，并提供世界最佳的解决方案。我们努力工作并乐在其中。`,
    langEn: 'English',
    langDe: 'Deutsch',
    printDailySummary: 'Print Today\'s Summary',
    printSummary: 'Print Summary',
    startDate: 'Start Date',
    printDate: 'Druckdatum',
    printTimes: 'Print Times'
    // </editor-fold>
  },
  ZH: {
    areYouSure: '你确定吗?',
    yesIAm: '是的，我确定',
    cancel: '取消',
    confirm: '确定',
    loading: '正在传输',
    cantRevert: '删除后无法恢复',
    payed: '已付款',
    notpayed: '未付款',
    person: '用餐人数',
    date: '日期时间',
    reservationPerson: '预定人',
    using: '使用中',
    notuse: '未使用',
    discount: '折扣',
    backTop: '返回上一层',
    allrange: '全部范围',
    loadComplete: '加载成功！',
    fillInAll: '请填写全部选项',
    servantDetailTitle: '跑堂详情',
    todayCount: '今日单数',
    todaySumLabel: '今日总计',
    todayTipLabel: '今日小费',
    todayBarLabel: '今日现金',
    todayEcLabel: '今日EC',
    orderSuccess: '点菜成功！',
    returnSuccess: '退菜成功',
    addDiscountSuccess: '添加折扣成功',
    transferSuccess: '转台成功',
    alreadyOrdered: '本桌已结账',
    mergeSuccess: '和桌成功',
    zbonLock: 'Zbon的生成会锁定当前所有账单，是否要打印Zbon？',
    tableHintOpMulti: '  3.输入 <span class="important">数字*菜号</span>下单多个同样的菜品',
    // <editor-fold desc="old">
    JSIndexRequestOutTableFailed: '开桌失败，原因是：',
    JSIndexOpenTableCallBackInvalidNumber: '请输入有效的客人数量',
    JSIndexCreateTableEnterTable: '正在进入桌子',
    JSIndexCreateTableTableNotFound: '无法找到该桌子',
    JSIndexGetTableListFailed: '获取桌子列表失败，原因是：',
    JSIndexGetActiveTableListFailed: '获取使用中桌子列表失败，原因是：',
    JSIndexGetAllCategoryFailed: '获取类别列表失败，原因是：',
    JSIndexAddCategoryFailed: '添加类别失败，原因是：',
    JSIndexDeleteCategoryFailed: '删除类别失败，原因是：',
    JSIndexUpdateCategoryFailed: '更新类别失败，原因是：',
    JSTableGetOrderedDishFailed: '获取已点菜品失败，原因是：',
    JSTableGetTableDetailFailed: '获取桌子详情失败，原因是：',
    JSTableOrderFailed: '点菜失败，原因是：',
    JSTableGetDishFailed: '查菜失败，原因是：',
    JSTableGetAllDishedFailed: '获取所有菜品列表失败，原因是：',
    JSDishesDeleteFailed: '删除菜品失败，原因是',
    JSDishesUpdateFailed: '更新菜品失败，原因是',
    JSPersonGetAllFailed: '获取全部员工列表失败，原因是',
    JSPersonAddFailed: '添加员工失败，原因是',
    JSPersonDeleteFailed: '删除员工失败，原因是',
    JSPersonUpdateFailed: '更新员工信息失败，原因是',
    JSSATGetServantForFormFailed: '获取服务员信息失败，原因是',
    JSMTAUpdateTipFailed: '小费更新失败，原因是',
    JSMTARecoverBillFailed: '账单恢复失败，原因是',

    JSTplTableNewTimeLabel: '用餐时间:',

    JSTplNewDishHeadCode: '菜号',
    JSTplNewDishHeadName: '菜名',
    JSTplNewDishHeadCount: '数量',
    JSTplNewDishHeadPrice: '价格',
    JSTplNewDishHeadDelete: '删除',

    JSTplDishHeadCode: '菜号',
    JSTplDishHeadName: '菜名',
    JSTplDishHeadCount: '数量',
    JSTplDishHeadPrice: '价格',
    JSTplDishHeadTotal: '总计',

    JSTableCodeNotFound: '菜号不存在',
    JSTableCheckOutCallBackGuestCountInvalid: '请输入合适的结账人数',
    JSTableCheckOutCallBackGuestCountLessThanEqualZero: '结账的人数至少为1',
    JSTableCheckOutCallBackTipInvalid: '请输入合适的小费数值',
    JSTableCheckOutCallBackTipLessThanZero: '小费不能小于0',
    JSTableCheckOutSuccess: '结账成功',

    JSTableAdditionPopDiscountInfo: '请输入折扣码.....',
    JSTableAdditionPopDiscountText: '请输入折扣码',
    JSTableAdditionPopChangeTableInfo: '请输入要转往的桌号......',
    JSTableAdditionPopChangeTableText: '转台',
    JSTableAdditionPopMergeTableInfo: '请输入要合并的桌号......',
    JSTableAdditionPopMergeTableText: '合台',
    JSTableAdditionPopReturnDishInfo: '请输入退菜理由.....',
    JSTableAdditionPopReturnDishText: '退菜',
    JSTableAdditionMergeTableFailed: '和台失败:',
    JSTableAdditionChangeTableFailed: '转台失败',

    title: 'Aaden 智慧收银点餐系统',
    appName: 'Aaden 智慧收银点餐系统',
    indexTabBoss: '老板',
    indexTabDineIn: '堂食',
    indexTabTakeaway: '外卖',

    infoLabelServer: '服务器:',
    infoContentServer: '正常*（21ms）',
    infoLabelTable: '剩余的桌子数量：',
    infoContentTable: '213',
    infoLabelTotal: '总额：',

    hintOpTable: '1.输入 <span class="important">桌号</span> 进入桌子或开桌子',
    hintOpBoss: '2.输入 <span class="important">l</span> 进入老板页面',
    hintOpTakeaway: '3.输入 <span class="important">w</span> 进入外卖页面',
    hintOpBack: '4.按 <span class="important">Esc</span> 返回到上一层',

    popTitle: '开桌表单 | ',
    popLabelGuestCount: '客人数量',
    popLabelChildCount: '儿童数量',
    popTypeOptionDineIn: '堂食',
    popTypeOptionBuffet: '自助餐',
    popTypeOptionTakeaway: '外卖',
    popTypeLabel: '用餐类型',
    popConfirm: '确认',

    popAuthTitle: '请输入密码',

    tablePageTitle: '桌子',
    tableInfoLabelTable: '桌号:',
    S_tableNumber: '',
    tableInfoLabelType: '类型:',
    S_type: '',
    tableInfoLabelTime: '用餐时间:',
    S_startTime: '',
    tableInfoLabelSeat: '坐客次数:',
    S_seatTimes: '',
    tableInfoLabelPerson: '人数:',
    S_personCount: '',
    tableInfoLabelServant: '服务员:',
    S_servantName: '',

    tableHintOpAddDish: '1.输入 <span class="important">菜号</span> 点菜',
    tableHintOpDelDish: '2.输入 <span class="important">d+菜号</span> 删除本次准备下单的商品',
    tableHintOpFastPanel: '3.按 <span class="important">回车</span> 进入左侧快捷指令面板',
    tableHintOpFastCheckOut: '4.<span class="important">快速结账即为使用现金，0小费</span>',
    tableHintOpShowAllDish: '5.输入 <span class="important">t</span> 查看系统中所有菜品和菜号',

    tableTHCode: '<span>菜号</span>',
    tableTHName: '菜名',
    tableTHPrice: '价格',
    tableTHAmount: '数量',
    tableTHTotal: '总计',

    tableNewDishTitle: '新增菜品',
    tableNewDishTHCode: '菜号',
    tableNewDishTHName: '菜名',
    tableNewDishTHPrice: '价格',
    tableNewDishTHAmount: '数量',
    tableNewDishTHDelete: '删除',

    tableDishListTitle: '菜单',
    tableDishListTHCode: '菜号',
    tableDishListTHName: '菜名',
    tableDishListTHPrice: '价格',

    tableDiscountPopTitle: '请输入折扣值',
    tableDiscountPopHint: `<div class="hints">
    15 = -15€
    <br>
    15p = -15%<br>
    15pk = -15% in food<br>
    15pg = -15% in drink
    </div>`,

    tableCheckOutTitle: '结账',

    tableCheckOutBillTypeOptionNormal: '普通账单',
    tableCheckOutBillTypeOptionCompany: '公司账单',
    tableCheckOutBillTypeOptionTemp: '临时账单',
    tableCheckOutBillTypeOption3: 'Rechnung',
    tableCheckOutBillTypeLabel: '请选择账单类型',

    tableCheckOutPaymentOptionBar: '现金',
    tableCheckOutPaymentOptionCard: '刷卡',
    tableCheckOutPaymentOptionCredit: '信用卡',
    tableCheckOutPaymentLabel: '请选择支付方式',

    tableCheckOutGuestCountLabel: '结账人数',
    tableCheckOutTipLabel: '小费',
    tableCheckOutConfirm: '确认',

    langZH: '中',
    langEN: '英',
    langDE: '德',
    backstage: '后台',
    labelManagement: '标签管理',
    dishManagement: '菜品管理',
    dishStatictics: '菜品统计',
    partitionManagement: '分区管理',
    tableManagement: '桌子管理',
    staff: '人员',
    authorityManagement: '权限管理',
    staffManagement: '人员管理',
    bill: '账单',
    todaysSummary: '本日总汇',
    allBill: '全部账单',
    zbonList: 'Zbon列表',
    exportAll: '全部导出',
    statistics: '统计信息',
    print: '打印',
    printTemplateManagement: '打印模板管理',
    partitionPrintSettings: '分区打印设置',
    deviceList: '设备列表',
    deviceManagement: '设备管理',
    printList: '打印单列表',
    setting: '设置',
    bugReport: '提交问题',
    restaurantInfo: '餐馆身份',
    aboutUs: '关于我们',
    salesStatistics: '销售额统计',
    drinkAndDish: '酒水 菜品',
    drink: '酒水',
    food: '食品',
    dish: '菜品',
    latestNews: '最新消息',
    sum: '总额',
    totalTurnoverToday: '今日营业总额',
    totalCustomNoToday: '今日用餐总人数',
    tableInUse: '使用中的桌子',
    tableFree: '空闲的桌子',
    todaysReservation: '今日预定',
    salesAnalysisThisMonth: '本月销售分析',
    hotMenuThisWeek: '本周热销菜品',
    menuLabelsManagement: '菜品标签管理',
    homePage: '首页',
    diningCategory: '打印类别',
    menuLabelName: '菜品标签名称（中文）',
    edit: '编辑',
    delete: '删除',
    addNewLabel: '添加新的标签',
    menuLabelDetails: '菜品标签详情',
    menuLabelCategory: '菜品标签类别',
    label: '标签',
    description: '描述',
    package: '套餐',
    tableNewPackage: '新增套餐',
    dishDetail: '菜品详情',
    basicInfo: '基本信息',
    labelBelonged: '所属标签',
    dishImage: '菜品图片',
    personManage: '人员管理',
    servantListName: '服务员',
    servantListTotal: '总额',
    filterLabel: '时间',
    printTodaySummary: '打印本日总结',
    totalPrice: '总额',
    todo: '打印ZBon',
    accessLog: '操作记录',
    operationType: '操作类型',
    operationName: '操作名称',
    operationData: '操作数据',
    operationTime: '操作时间',
    maxTime: '最长时间',
    maxRounds: '最大轮数',
    timeProRound: '每轮时间',
    dishesProRound: '每轮菜数',
    weeklySale: '销量(周)',
    month: '月',
    all: '总',
    weeklySalesAmount: '销售额(周)',
    partition: '分区',
    numberOfTableServed: '桌数',
    addNewPartition: '添加新的分区',
    partitionDetail: '分区详情',
    partitionID: '分区ID',
    partitionName: '分区名称',
    partitionBillType: '分区账单类型',
    partitionPrinterCount: '分区打印机数量',
    seatsNo: '座位数',
    status: '状态',
    usedTimesToday: '今日使用次数',
    detail: '详情',
    addNewTable: '新增桌子',
    tableDetail: '桌子详情',
    tableNameLabel: '桌子名称',
    name: '名称',
    authority: '权限',
    password: '密码',
    partTime: '兼职',
    addNewStaff: '添加新的人员',
    staffDetails: '人员详情',
    authorityBelonged: '所属权限组',
    partOrFull: '是否兼职',
    staffImg: '人员图片',
    serialNumber: '序列号',
    dateBelonged: '所属日期',
    printStatus: '打印状态',
    printTime: '打印时间',
    printAgain: '重新打印',
    printSuccess: '打印成功',
    deviceName: '设备名称',
    deviceID: '设备ID',
    deviceSN: '设备SN',
    partitionBelonged: '所属分区',
    addNewDevice: '添加新的设备',
    deviceDetail: '设备详情',
    infoToday: '本日信息',
    totalTurnover: '总营业额',
    totalNoOfBills: '总单数',
    drinkTurnover: '酒水营业额',
    foodTurnover: '食品营业额',
    billsToday: '本日账单',
    orderNo: '订单号',
    time: '时间',
    currentOrder: '当前订单',
    dishNoOrName: '菜号/菜名',
    unitPrice: '单价',
    subTotal: '小计',
    checkOutButton: '结 账',
    accounting: '账务',
    number: '号',
    return: '返回',
    submit: '提交',
    unit: '份',
    toastInfoAddSuccess: '添加成功',
    toastInfoDeleteSuccess: '删除成功',
    toastInfoUpdateSuccess: '更新成功',
    servantPerformanceRanking: '跑堂业绩排行',
    ManageOrderDishcount: '数量',
    startTime: '开始时间',
    payTime: '结账时间',
    payMethod: '支付方式',
    creditCard: '信用卡',
    customCount: '用餐人数',
    billType: '账单类型',
    dishSum: '菜品总价',
    drinkSum: '酒水总价',
    totalTax: '总税额',
    billRecover: '恢复账单',
    dishList: '菜品列表',
    orderTime: '下单时间',
    dishType: '菜品类型',
    printGroupID: 'ID',
    printListItemTitle: '标题',
    printListItemContent: '内容',
    printListItemStatus: '打印状态',
    printListItemTime: '打印时间',
    printListItemTimes: '打印次数',
    printListItemFeedback: '打印反馈',
    printListEdit: '编辑打印单列表',
    JSSATAddFormRequired: '请输入全部信息',
    JSPrintAddFormRequired: '请输入全部信息',
    partitionKitchen: '厨房',
    partitionBar: '吧台',
    partitionReceiption: '前台',
    selectionAll: '全部',
    toastInfoReprintSuccess: '重新打印成功',
    toastInfoTipUpdateSuccess: '小费更新成功',
    toastInfoBillRecoverSuccess: '账单恢复成功',
    yes: '是',
    no: '否',
    address: '地址',
    supplement: '补充',
    zipCode: '邮编',
    city: '城市',
    state: '州',
    country: '国家',
    tel: '电话',
    corporation: '法人',
    firstName: '名',
    lastName: '姓',
    personalTitle: '头衔',
    taxNo: '税号',
    mail: '邮箱',
    aboutUsWhoTitle: '我们是谁',
    aboutUsWhoContent: ` InnerKen的成功故事不仅仅关乎于站在时代最前沿的全新技术更关乎于对于人的关注。每一个伟大的公司都由这两点组成。
        我们永远注重对于人本身职业和生涯发展的规划，让公司和员工共同成长。我们也始终将每年盈利的百分之七十投入到公司的发展，并始终保持团队中有各个领域最好的人才。`,
    aboutUsWhereTitle: '我们从哪来',
    aboutUsWhereContent: 'Aaden系统的设计参考了众多具有多年餐饮业从业经验的实际场内工作人员的意见。\n' +
      '                            我们认真的了解了餐饮业从业人员——从老板到每一个员工的真正需求，\n' +
      '                            从而推出Aaden智能云数字餐饮一体化解决方案。扫码点餐，外卖，网页预定，\n' +
      '                            场内桌子管理，灵活的部署和高效的设计，从上而下变革餐饮业的管理模式。\n' +
      '                            Aaden系统也是您需要的最后一个系统，因为灵活部署选项[1]提供了软件“生长”的可能，\n' +
      '                            从一个小小的咖啡馆到有几千个座位的巨型自助餐厅，Aaden系统都如同壁炉般永远陪在您的身边。',

    aboutUsBusinessTitle: '我们的业务范围',
    aboutUsBusinessContent: `Aaden系统的设计参考了众多具有多年餐饮业从业经验的实际场内工作人员的意见。
                            我们认真的了解了餐饮业从业人员——从老板到每一个员工的真正需求，
                            从而推出Aaden智能云数字餐饮一体化解决方案。扫码点餐，外卖，网页预定，
                            场内桌子管理，灵活的部署和高效的设计，从上而下变革餐饮业的管理模式。
                            Aaden系统也是您需要的最后一个系统，因为灵活部署选项[1]提供了软件“生长”的可能，
                            从一个小小的咖啡馆到有几千个座位的巨型自助餐厅，Aaden系统都如同壁炉般永远陪在您的身边。`,
    aboutUsWhyTitle: '我们为什么热衷于我们的事业',
    aboutUsWhyContent: ` 驱动我们的是对新技术的好奇心，对研发和创新的承诺，以及对顾客的专注。我们力求超出顾客预期，
        致力开拓业界最先进的软件工程技术。通过技术和创新我们努力成为行业的颠覆者，并提供世界最佳的解决方案。我们努力工作并乐在其中。`,
    langEn: '英语',
    langDe: '德语',
    printDailySummary: '打印每日总结',
    printSummary: '打印总结单',
    startDate: '开始日期',
    printDate: 'Druckdatum',
    printTimes: '打印次数',
    // </editor-fold>f
    // here added by YD
    booking: '预定',
    takeaway: '外卖',
    classification: '分类',
    information: '信息',
    isShowing: '正在显示',
    allDish: '所有菜品',
    takeawayAddress: '外卖地址',
    orderNumberLabel: '订单号',
    backToHome: '返回',
    dishOrder: '点餐',
    tableChange: '换台',
    tableMerge: '合桌',
    payBill: '结账',
    QuickBill: '快速结账',
    default: '|默认:',
    nextStep: '下一步',
    haveOrderedDish: '已点菜品',
    billSplit: '分单',
    dishCancel: '退菜',
    operation: '操作'
  }
}
