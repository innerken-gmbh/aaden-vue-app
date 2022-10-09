import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import vuetify from './plugins/vuetify'
import GlobalConfig, { loadConfig } from './oldjs/LocalGlobalSettings'
import './registerServiceWorker'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete-extend'

import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import VueDraggableResizable from 'vue-draggable-resizable-gorkys'

import { reportDeviceInfo } from '@/api/api'
import { addToQueue } from '@/oldjs/poolJobs'
import { getActiveTables } from 'aaden-base-model/lib/Models/AadenApi'
import IKUtils from 'innerken-js-utils'
import dayjs from 'dayjs'
import { onlyTimeFormat } from '@/api/dateUtils'
import { Remember } from '@/api/remember'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyB5lIPQQUJjjY6M-BoqUaZhF21oBbYkd9E',
  language: 'de'
})

Vue.config.productionTip = false

Vue.filter('priceDisplay', function (price) {
  price = price ?? 0
  let d = price
  if (price.includes && price.includes(',') && price?.includes('.')) {
    d = price.replace('.', '').replace(',', '.')
  }
  return parseFloat(d).toFixed(2).replace('.', ',') + ' €'
})

Vue.filter('shorterName', function (longName) {
  return longName.replace('Japanisches', 'JP')
})

Vue.filter('onlyTime', function (str) {
  return onlyTimeFormat(str)
})

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)
const isoWeek = require('dayjs/plugin/isoWeek')
dayjs.extend(isoWeek)

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

export function uuidv4 () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
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
  if (!Remember.uuid) {
    Remember.uuid = uuidv4()
  }
  i18n.locale = GlobalConfig.frontEndLang.toLowerCase()
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
