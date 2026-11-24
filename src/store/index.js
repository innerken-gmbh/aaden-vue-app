import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let resolve = null

let tablePickResolve = null

/** 首页桌台列表多久以内算新的：只有新的才拿来判断桌开没开（进了单页首页不刷新，旧的会把刚开的桌当成没开） */
const POS_TABLES_FRESH_MS = 10 * 1000

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
    /** 结账键盘上的「线上付款」（POS-1096）：{ id, amount }，只有堂食线上付款转人工时有 */
    checkoutOnlinePay: null,
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
    // 每秒走一次，等了几分钟、还剩几分钟按它算（只用来显示）
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
      // 记下收到的时间：云端的 expiresInSeconds 从这一刻算，不用对收银机的时钟
      const receivedAt = Date.now()
      state.dineOpenRequests = list.map(r => ({ ...r, receivedAt }))
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
      state.checkoutOnlinePay = null
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
     * 去掉：服务员拒绝过的、刚拒绝或确认过的、收银机上已经结账的（云端还没跟上时按首页桌台列表判断）。
     * 过期不在这里判断，以云端列表为准：收银机的时区、时钟不一定对，自己算会把还在的请求全藏掉
     */
    dineOpenVisible (state) {
      const now = state.dineOpenNow
      const pos = now - state.dinePosTables.at < POS_TABLES_FRESH_MS ? state.dinePosTables.inUse : {}
      return state.dineOpenRequests
        .filter(r => !r.rejectedAt && !(state.dineOpenHidden[r.sessionId] > now))
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
    /** amount 可以直接是金额，也可以是 { amount, onlinePay }（POS-1096，见 checkoutOnlinePay） */
    async doCheckout ({ state }, amount) {
      const { amount: total, onlinePay = null } = typeof amount === 'object' && amount !== null ? amount : { amount }
      state.checkoutOnlinePay = onlinePay
      state.showCheckoutDialog = true
      state.checkoutTotal = total
      return await new Promise(resolve => {
        state.checkoutResolve = resolve
      })
    }
  },
  modules: {}
})
