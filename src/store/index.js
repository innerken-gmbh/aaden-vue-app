import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let successCallbackFunction = () => {
}
let resolve = () => {
}
let failedCallback = () => {
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
    tableId: null
  },
  mutations: {
    START_AUTHORIZE (state, payload) {
      const args = Object.assign({}, basePayloadParam, payload)
      state.tableId = args.tableId
      state.isAuthorizeTypeSuper = args.typeIsBoss
      state.pinDialogShow = true
      successCallbackFunction = args.successCallback
      resolve = args.resolve
      failedCallback = args.failedCallback
    },
    AUTHORIZE_OK (state, payload) {
      if (successCallbackFunction) {
        successCallbackFunction(payload)
      }
      if (resolve) {
        resolve(payload)
      }

      state.pinDialogShow = false
    },
    HIDE_DIALOG (state) {
      if (failedCallback) {
        failedCallback()
      }

      state.pinDialogShow = false
    }
  },
  actions: {},
  modules: {}
})
