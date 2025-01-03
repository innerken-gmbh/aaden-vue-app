import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let resolve = () => {
}

let tablePickResolve = () => {
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
      state.tableFilter = payload.tableFilter
      state.requiredTableKey = payload.requiredTableKey
      state.tableSelectDialogShow = true
      tablePickResolve = payload.resolve
    },

    TABLE_PICKED (state, payload) {
      if (tablePickResolve) {
        tablePickResolve(payload)
      }
      state.tableSelectDialogShow = false
    },

    HIDE_TABLE_PICK_DIALOG (state) {
      state.tableSelectDialogShow = false
    },

    START_AUTHORIZE (state, payload) {
      const args = Object.assign({}, basePayloadParam, payload)
      state.tableId = args.tableId
      state.isAuthorizeTypeSuper = args.typeIsBoss
      state.pinDialogShow = true

      resolve = args.resolve
    },
    AUTHORIZE_OK (state, payload) {
      if (resolve) {
        resolve(payload)
      }

      state.pinDialogShow = false
    },
    HIDE_AUTHORIZE_DIALOG (state) {
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
