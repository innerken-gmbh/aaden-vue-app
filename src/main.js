import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import vuetify from './plugins/vuetify'
import 'material-design-icons/iconfont/material-icons.css'
import Settings, { initialAadenBase } from 'aaden-base-model/lib/Models/GlobalSettings'

import { GlobalConfig } from './oldjs/LocalGlobalSettings'

Vue.config.productionTip = false
Vue.filter('priceDisplay',
  function (price) {
    return parseFloat(price).toFixed(2).replace('.', ',')
  }
)
Vue.directive('show-local', {
  bind: function (el) {
    if (GlobalConfig.isOnlineVersion) {
      el.style.display = 'none'
    }
  }
})
Vue.directive('hide-quick-buy', {
  bind: function (el) {
    if (GlobalConfig.isQuickBuyVersion) {
      el.style.display = 'none'
    }
  }
})

async function initial () {
  await initialAadenBase(GlobalConfig)
  console.log(Settings, 'Main')
  Settings.lang = function () {
    return i18n.locale.toUpperCase()
  }
  new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}

initial()
