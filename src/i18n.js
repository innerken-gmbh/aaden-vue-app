import Vue from 'vue'
import VueI18n from 'vue-i18n'

import de from 'vuetify/lib/locale/de'
import en from 'vuetify/lib/locale/en'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import nl from 'vuetify/lib/locale/nl'
import vi from 'vuetify/lib/locale/vi'
import dayjs from 'dayjs'

Vue.use(VueI18n)

export function loadTransLangs () {
  return require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    .keys()
    .map(item => item.match(/([A-Za-z0-9-_]+)\./i)[1].toLowerCase())
    .filter(lang => lang && lang.length > 1)
}

const messages = {
  en: {
    langCode: 'en',
    flag: 'us',
    label: 'English',
    ...require('@/locales/en.json'),
    $vuetify: en
  },
  de: {
    langCode: 'de',
    flag: 'de',
    label: 'Deutsch',
    ...require('@/locales/de.json'),
    $vuetify: de
  },
  zh: {
    langCode: 'zh',
    flag: 'cn',
    label: '中文',
    ...require('@/locales/zh.json'),
    $vuetify: zhHans
  },
  nl: {
    langCode: 'nl',
    flag: 'nl',
    label: 'Netherlands',
    ...require('@/locales/nl.json'),
    $vuetify: nl
  },
  vi: {
    langCode: 'vi',
    flag: 'vi',
    label: 'Tiếng Việt',
    ...require('@/locales/vi.json'),
    $vuetify: vi
  }
}

function loadNumberFormats () {
  const numberFormats = {}
  return loadTransLangs().forEach(lang => {
    numberFormats[lang] = {
      currency: {
        style: 'currency',
        currency: 'EUR'
      }
    }
  })
}

const numberFormats = loadNumberFormats()

require('dayjs/locale/de')
require('dayjs/locale/zh')
require('dayjs/locale/en')
require('dayjs/locale/nl')

dayjs.locale(localStorage.getItem('frontEndLang')?.toLowerCase())

export default new VueI18n({
  locale: localStorage.getItem('frontEndLang')?.toLowerCase() || 'zh',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh',
  messages,
  numberFormats
  // silentTranslationWarn: true,
})
