import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import vuetify from './plugins/vuetify'
import 'material-design-icons/iconfont/material-icons.css'
import { initialAadenBase } from 'aaden-base-model/lib/Models/GlobalSettings'

import settings from 'electron-settings'

const StaticSetting = settings.get('config')
Vue.config.productionTip = false
Vue.filter('priceDisplay',
  function (price) {
    return parseFloat(price).toFixed(2).replace('.', ',')
  }
)
StaticSetting.lang = function () {
  return i18n.locale
}
initialAadenBase(StaticSetting)
new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
