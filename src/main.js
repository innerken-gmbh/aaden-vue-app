import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import vuetify from './plugins/vuetify'
import GlobalConfig, { loadConfig } from './oldjs/LocalGlobalSettings'
import './registerServiceWorker'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete-extend'
import { reportDeviceInfo } from '@/api/api'
import { addToQueue } from '@/oldjs/poolJobs'
import { getActiveTables } from 'aaden-base-model/lib/Models/AadenApi'
import IKUtils from 'innerken-js-utils'

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

function uuidv4 () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
    (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  )
}

addToQueue('tablePool', async () => {
  const res = await getActiveTables()
  const playSound = (count = 3) => {
    count -= 1
    if (count >= 0) {
      setTimeout(() => {
        IKUtils.play('/Resource/ding.m4a')
        playSound(count)
      }, 100)
    }
  }
  for (const a of res) {
    if (a.tables.some(t => t.callService === '1' && t.usageStatus === '1')) {
      playSound()
      break
    }
  }
})

async function initial () {
  await loadConfig()
  if (!GlobalConfig.uuId) {
    GlobalConfig.updateSettings('uuId', uuidv4())
  }

  i18n.locale = GlobalConfig.lang.toLowerCase()
  try {
    reportDeviceInfo().then(r => console.log(r))
  } catch (e) {

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
