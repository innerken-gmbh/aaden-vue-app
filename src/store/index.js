import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let resolve = null

let tablePickResolve = null

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
    tableColor: ''
  },
  mutations: {
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
