import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let resolve = () => {
}

let tablePickResolve = () => {
}

const basePayloadParam = {
  typeIsBoss: false, force: false, tableId: null, successCallback: null, resolve: null, failedCallback: null
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
    errorDialogTitle: '',
    errorDialogMessage: '',
    showOrderDetail: false,
    billDetailOrderId: '',
    selectedCheckoutType: null,
    reprintType: null
  },
  mutations: {
    showOrderDetail (state, payload) {
      console.log(payload, 'id')
      state.showOrderDetail = true
      state.reprintType = payload.reprint
      state.billDetailOrderId = payload.id
      state.selectedCheckoutType = payload.type
    },
    closeOrderDetail (state) {
      state.billDetailOrderId = ''
      state.showOrderDetail = false
    },
    showErrorDialog (state, title, message = '') {
      state.showErrorDialog = true
      state.errorDialogMessage = message
      state.errorDialogTitle = title
    },
    closeErrorDialog (state) {
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
  actions: {},
  modules: {}
})
