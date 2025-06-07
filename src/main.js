import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import vuetify from './plugins/vuetify'
import GlobalConfig, { changeLanguage, loadConfig } from './oldjs/LocalGlobalSettings'
import { getAdminSetting } from './api/adminSettings'
import VuetifyGoogleAutocomplete from 'vuetify-google-autocomplete-extend'
import 'vue-draggable-resizable-gorkys/dist/VueDraggableResizable.css'
import VueDraggableResizable from 'vue-draggable-resizable-gorkys'
import IKUtils from 'innerken-js-utils'
import dayjs from 'dayjs'
import { onlyTimeFormat, timeDisplay } from '@/api/dateUtils'
import { Remember } from '@/api/remember'
import _ from 'lodash'
import { getBaseAndUrlForDeviceId } from '@/api/restaurantInfoService'
import hillo from 'hillo'
import ParseInt from 'lodash-es/parseInt'
import { getCurrentLanguage } from '@/api/api'
import { reportToCloud } from '@/oldjs/common'
import { getNiceRestaurantInfo } from '@/oldjs/zbonPrint'
import { getCurrentDeviceId } from '@/api/VIPCard/VIPCloudApi'
import { getCurrentBLID } from '@/api/MemberCloud/MemberCloudApi'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.use(VuetifyGoogleAutocomplete, {
  apiKey: 'AIzaSyB5lIPQQUJjjY6M-BoqUaZhF21oBbYkd9E',
  language: 'de'
})

Vue.config.productionTip = false

Vue.filter('priceDisplay', function (price) {
  price = price ?? 0
  let d = price
  if (price.includes && price.includes(',')) {
    d = price.replace('.', '').replace(',', '.')
  }
  return _.round(parseFloat(d), 2).toFixed(2).replace('.', ',') + ' €'
})

Vue.filter('shorterName', function (longName) {
  return longName?.replace('Japanisches', 'JP') ?? longName
})

Vue.filter('onlyTime', function (str) {
  return onlyTimeFormat(str)
})

Vue.filter('timeDisplay', function (str) {
  return timeDisplay(str)
})
Vue.filter('beautifulTimeByStampTime', function (timeStamp) {
  return dayjs.unix(timeStamp).format('DD.MM.YYYY/HH:mm')
})

const relativeTime = require('dayjs/plugin/relativeTime')
dayjs.extend(relativeTime)
const duration = require('dayjs/plugin/duration')
dayjs.extend(duration)
const isoWeek = require('dayjs/plugin/isoWeek')
dayjs.extend(isoWeek)

Vue.filter('age', function (birthday) {
  try {
    return dayjs(birthday).toNow(true)
  } catch (e) {
    return ' - '
  }
})

export function uuidv4 () {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g,
    c => (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16))
}

export const realDeviceId = IKUtils.getQueryString('BaseId') || '-1'

async function initial () {
  await loadConfig()
  if (realDeviceId !== '-1') {
    const realUrl = (await getBaseAndUrlForDeviceId(realDeviceId)).url
    GlobalConfig.DeviceId = ParseInt(realDeviceId)
    GlobalConfig.Base = realUrl.split('//')[1]
    hillo.initial(realUrl + '/PHP/')
  }

  // Ensure UUID is set before any parallel operations
  if (!Remember.uuid) {
    Remember.uuid = uuidv4()
  }

  // Run independent operations concurrently
  const [, , languageResult] = await Promise.allSettled([
    // Get admin settings
    getAdminSetting().catch(e => console.error('Error getting admin settings:', e)),

    // Ensure business layer exists and cache the BLID at startup
    getCurrentBLID().catch(e => {
      console.error('Error ensuring business layer at startup:', e)
      // Non-blocking error - continue with initialization
    }),

    // Get current language
    getCurrentLanguage()
  ])

  // Process language result
  if (languageResult.status === 'fulfilled') {
    changeLanguage(languageResult.value)
  }

  // Handle cloud reporting separately as it has internal async operations
  try {
    setTimeout(async () => {
      const [restaurantInfo, deviceId] = await Promise.all([
        getNiceRestaurantInfo(),
        getCurrentDeviceId()
      ])

      await reportToCloud({
        name: restaurantInfo.name,
        ip: '',
        uuid: Remember.uuid,
        version: require('../package.json').version,
        frontendType: 'aaden-desktop',
        deviceId: deviceId
      })
    }, 50)
  } catch (e) {
    console.error('Error in cloud reporting:', e)
  }
  // i18n.locale = GlobalConfig.frontEndLang.toLowerCase()
  new Vue({
    router,
    store,
    i18n,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
}

window.dayjs = dayjs
initial()
