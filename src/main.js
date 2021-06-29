import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import vuetify from './plugins/vuetify'
import GlobalConfig, { loadConfig } from './oldjs/LocalGlobalSettings'
import './registerServiceWorker'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete-extend'
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'
import { checkCurrentVersionAndUpdate } from '@/api/nightwatch'
import VueDraggableResizable from 'vue-draggable-resizable'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyB5lIPQQUJjjY6M-BoqUaZhF21oBbYkd9E',
  language: 'de'
})

Vue.config.productionTip = false

Vue.filter('priceDisplay',
  function (price) {
    return parseFloat(price).toFixed(2).replace('.', ',')
  }
)

Vue.directive('hide-simple', {
  bind: function (el) {
    if (GlobalConfig.simpleVersion) {
      el.style.display = 'none'
    }
  }
})

Vue.directive('code-hide', {
  bind: function (el) {
    if (GlobalConfig.hideCode) {
      el.style.display = 'none'
    }
  }
})

async function initial () {
  await loadConfig()

  i18n.locale = GlobalConfig.lang.toLowerCase()
  await checkCurrentVersionAndUpdate()
  new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}

initial()
