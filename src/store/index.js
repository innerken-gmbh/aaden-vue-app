import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let resolve = null

let tablePickResolve = null

/** 开桌请求从客人提交起多久没人确认就过期（云端 dine-in.request-ttl-minutes，默认 30，POS-897）。列表不带到期时间，按这个算 */
export const DINE_REQUEST_TTL_MINUTES = 30
/** 首页桌台列表多久以内算新的：只有新的才拿来判断桌开没开（进了单页首页不刷新，旧的会把刚开的桌当成没开） */
const POS_TABLES_FRESH_MS = 10 * 1000

export function dineRequestMinutesLeft (r, now = Date.now()) {
  if (!r?.requestedAt) return DINE_REQUEST_TTL_MINUTES
  return Math.ceil((new Date(r.requestedAt).getTime() + DINE_REQUEST_TTL_MINUTES * 60000 - now) / 60000)
}

const basePayloadParam = {
  typeIsBoss: false,
  force: false,
  tableId: null,
  successCallback: null,
  resolve: null,
  failedCallback: null
}

export default new Vuex.Store({
  state: {
    pinDialogShow: false,
    isAuthorizeTypeSuper: false,
    tableId: null,
    tableSelectDialogShow: false,
    tableFilter: false,
    requiredTableKey: 'tableName',

    showErrorDialog: false,
    showOrderAcceptDialog: false,
    orderResolve: null,

    errorDialogTitle: '',
    errorDialogMessage: '',
    billDetailQr: '',
    billDetailUrlHead: '',
    showBillDetailQRDialog: false,

    showCheckoutDialog: false,
    checkoutTotal: 0,
    checkoutResolve: null,
    tableColor: '',

    // 堂食扫码的待开桌（POS-275）：DineOpenRequestDialog 轮询写入；dineOpenTarget 是正在确认的那一桌
    dineOpenRequests: [],
    dineOpenTarget: null,
    dineOpenListShow: false,
    // POS-883：门店还在处理、或要人工核对的改单（云端列表顶层 adjustments）
    dineOpenAdjustments: [],
    // 刚拒绝、确认过的请求：云端下一轮列表可能还带着，先藏一会儿（sessionId → 藏到什么时候）
    dineOpenHidden: {},
    // 首页桌台列表里哪些桌开着（tableName → inUse）和读到的时间：结账后马上把已开桌上的请求去掉，刚开的桌马上归到「已开桌」
    dinePosTables: { at: 0, inUse: {} },
    // 每秒走一次，过期和剩余分钟按它算
    dineOpenNow: Date.now(),
    // 点了没开、挂着请求的桌：弹三选一（确认并开桌 / 只开桌 / 拒绝）
    dineOpenChoice: null,
    // 要拒绝的请求：列表、三选一、单页顶条上点「拒绝」都交给 DineOpenRequestDialog 处理
    dineOpenRejectTarget: null,
    // 每确认成一次加一：单页上看到了就重新读这一桌
    dineOpenDoneSeq: 0
  },
  mutations: {
    SET_DINE_OPEN_REQUESTS (state, list) {
      state.dineOpenRequests = list
    },
    SET_DINE_OPEN_ADJUSTMENTS (state, list) {
      state.dineOpenAdjustments = list
    },
    HIDE_DINE_REQUEST (state, sessionId) {
      // 云端最多一分钟内跟上（拒绝、确认当场生效，过期每分钟扫一次）
      const now = Date.now()
      const hidden = {}
      Object.entries(state.dineOpenHidden).forEach(([k, until]) => {
        if (until > now) hidden[k] = until
      })
      hidden[sessionId] = now + 60 * 1000
      state.dineOpenHidden = hidden
    },
    SET_DINE_POS_TABLES (state, tables) {
      const inUse = {}
      tables.forEach(t => {
        inUse[t.tableName] = t.usageStatus === '1'
      })
      state.dinePosTables = { at: Date.now(), inUse }
    },
    TICK_DINE_OPEN (state) {
      state.dineOpenNow = Date.now()
    },
    OPEN_DINE_REQUEST (state, request) {
      state.dineOpenListShow = false
      state.dineOpenChoice = null
      state.dineOpenTarget = request
    },
    SHOW_DINE_OPEN_CHOICE (state, request) {
      state.dineOpenChoice = request
    },
    REJECT_DINE_REQUEST (state, request) {
      state.dineOpenChoice = null
      state.dineOpenRejectTarget = request
    },
    DINE_REJECT_DONE (state) {
      state.dineOpenRejectTarget = null
    },
    DINE_OPEN_CONFIRMED (state) {
      state.dineOpenDoneSeq++
    },
    CLOSE_DINE_REQUEST (state) {
      state.dineOpenTarget = null
    },
    SHOW_DINE_OPEN_LIST (state, show) {
      state.dineOpenListShow = show
    },
    editTableColor (state, payload) {
      state.tableColor = payload
    },
    hideCheckoutDialog (state) {
      state.showCheckoutDialog = false
      state.checkoutResolve = null
    },
    hideOrderAcceptDialog (state) {
      state.showOrderAcceptDialog = false
      state.orderResolve = null
    },
    showBillDetailQRDialog (state, payload) {
      state.showBillDetailQRDialog = true
      state.billDetailQr = payload.code
      state.billDetailUrlHead = 'https://baobao.aaden.io/%23/?uuid='
    },
    closeBillDetailQRDialog (state) {
      state.billDetailQr = ''
      state.billDetailUrlHead = ''
      state.showBillDetailQRDialog = false
    },
    showErrorDialog (state, title, message = '') {
      state.showErrorDialog = true
      state.errorDialogMessage = message
      state.errorDialogTitle = title
    },
    closeErrorDialog (state) {
      state.errorDialogTitle = ''
      state.showErrorDialog = false
    },
    START_TABLE_PICK (state, payload) {
      // 若上一次选桌还没结束，先以 null 结算，避免调用方 await 永远挂住
      if (tablePickResolve) {
        tablePickResolve(null)
        tablePickResolve = null
      }
      state.tableFilter = payload.tableFilter
      state.requiredTableKey = payload.requiredTableKey
      state.tableSelectDialogShow = true
      tablePickResolve = payload.resolve
    },

    TABLE_PICKED (state, payload) {
      if (tablePickResolve) {
        tablePickResolve(payload)
        tablePickResolve = null
      }
      state.tableSelectDialogShow = false
    },

    HIDE_TABLE_PICK_DIALOG (state) {
      // 取消选桌时必须 resolve，否则调用方 await 永远不返回
      if (tablePickResolve) {
        tablePickResolve(null)
        tablePickResolve = null
      }
      state.tableSelectDialogShow = false
    },

    START_AUTHORIZE (state, payload) {
      const args = Object.assign({}, basePayloadParam, payload)
      // 若上一次授权还没结束，先以 null 结算，避免调用方 await 永远挂住
      if (resolve) {
        resolve(null)
        resolve = null
      }
      state.tableId = args.tableId
      state.isAuthorizeTypeSuper = args.typeIsBoss
      state.pinDialogShow = true

      resolve = args.resolve
    },
    AUTHORIZE_OK (state, payload) {
      if (resolve) {
        resolve(payload)
        resolve = null
      }

      state.pinDialogShow = false
    },
    HIDE_AUTHORIZE_DIALOG (state) {
      // 用户取消（X / 点击遮罩 / ESC）时必须 resolve，否则 await 永不返回
      if (resolve) {
        resolve(null)
        resolve = null
      }
      state.pinDialogShow = false
    }

  },
  getters: {
    systemDialogShow (state) {
      return state.tableSelectDialogShow || state.pinDialogShow
    },
    /**
     * 要提醒服务员的开桌请求（POS-883），两组都在里面，open 为 true 的是「已开桌 · 待确认」。
     * 去掉：服务员拒绝过的、刚拒绝或确认过的、到时间过期的、收银机上已经结账的（云端还没跟上时按首页桌台列表判断）
     */
    dineOpenVisible (state) {
      const now = state.dineOpenNow
      const pos = now - state.dinePosTables.at < POS_TABLES_FRESH_MS ? state.dinePosTables.inUse : {}
      return state.dineOpenRequests
        .filter(r => !r.rejectedAt && !(state.dineOpenHidden[r.sessionId] > now) && dineRequestMinutesLeft(r, now) > 0)
        .filter(r => !(r.tableOpen && pos[r.tableName] === false))
        .map(r => ({ ...r, open: !!r.tableOpen || pos[r.tableName] === true }))
    }
  },
  actions: {
    async showOrderAcceptDialog ({ state }) {
      state.showOrderAcceptDialog = true
      return await new Promise(resolve => {
        state.orderResolve = resolve
      })
    },
    async doCheckout ({ state }, amount) {
      state.showCheckoutDialog = true
      state.checkoutTotal = amount
      return await new Promise(resolve => {
        state.checkoutResolve = resolve
      })
    }
  },
  modules: {}
})
