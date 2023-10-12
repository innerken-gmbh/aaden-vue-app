import Vue from 'vue'
import VueI18n from 'vue-i18n'

import de from 'vuetify/lib/locale/de'
import en from 'vuetify/lib/locale/en'
import zhHans from 'vuetify/es5/locale/zh-Hans'
import nl from 'vuetify/lib/locale/nl'
import vi from 'vuetify/lib/locale/vi'
import cs from 'vuetify/lib/locale/cs'
import ar from 'vuetify/lib/locale/ar'
import fa from 'vuetify/lib/locale/fa'
import fr from 'vuetify/lib/locale/fr'
import es from 'vuetify/lib/locale/es'
import it from 'vuetify/lib/locale/it'
import pl from 'vuetify/lib/locale/pl'
import pt from 'vuetify/lib/locale/pt'
import ru from 'vuetify/lib/locale/ru'
import tr from 'vuetify/lib/locale/tr'
import uk from 'vuetify/lib/locale/uk'

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
    langLabel: 'EN',
    ...require('@/locales/en.json'),
    $vuetify: en
  },
  de: {
    langCode: 'de',
    flag: 'de',
    langLabel: 'DE',
    ...require('@/locales/de.json'),
    $vuetify: de
  },
  zh: {
    langCode: 'zh',
    flag: 'cn',
    langLabel: 'ZH',
    ...require('@/locales/zh.json'),
    $vuetify: zhHans
  },
  nl: {
    langCode: 'nl',
    flag: 'nl',
    langLabel: 'NL',
    ...require('@/locales/nl.json'),
    $vuetify: nl
  },
  vi: {
    langCode: 'vi',
    flag: 'vi',
    langLabel: 'VI',
    ...require('@/locales/vi.json'),
    $vuetify: vi
  },
  cs: {
    langCode: 'cs',
    flag: 'cz',
    langLabel: 'CS',
    ...require('@/locales/cs.json'),
    $vuetify: cs
  },
  ar: {
    langCode: 'ar',
    flag: 'ar',
    langLabel: 'AR',
    ...require('@/locales/ar.json'),
    $vuetify: ar
  },
  es: {
    langCode: 'es',
    flag: 'es',
    langLabel: 'ES',
    ...require('@/locales/es.json'),
    $vuetify: es
  },
  fa: {
    langCode: 'fa',
    flag: 'ir',
    langLabel: 'FA',
    ...require('@/locales/fa.json'),
    $vuetify: fa
  },
  fr: {
    langCode: 'fr',
    flag: 'fr',
    langLabel: 'FR',
    ...require('@/locales/fr.json'),
    $vuetify: fr
  },
  it: {
    langCode: 'it',
    flag: 'it',
    langLabel: 'IT',
    ...require('@/locales/it.json'),
    $vuetify: it
  },
  pl: {
    langCode: 'pl',
    flag: 'pl',
    langLabel: 'PL',
    ...require('@/locales/pl.json'),
    $vuetify: pl
  },
  pt: {
    langCode: 'pt',
    flag: 'pt',
    langLabel: 'PT',
    ...require('@/locales/pt.json'),
    $vuetify: pt
  },
  ru: {
    langCode: 'ru',
    flag: 'ru',
    langLabel: 'RU',
    ...require('@/locales/ru.json'),
    $vuetify: ru
  },
  tr: {
    langCode: 'tr',
    flag: 'tr',
    langLabel: 'TR',
    ...require('@/locales/tr.json'),
    $vuetify: tr
  },
  uk: {
    langCode: 'uk',
    flag: 'ua',
    langLabel: 'UK',
    ...require('@/locales/uk.json'),
    $vuetify: uk
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

require('dayjs/locale/ar')
require('dayjs/locale/cs')
require('dayjs/locale/de')
require('dayjs/locale/en')
require('dayjs/locale/es')
require('dayjs/locale/fa')
require('dayjs/locale/fr')
require('dayjs/locale/it')
require('dayjs/locale/nl')
require('dayjs/locale/pl')
require('dayjs/locale/pt')
require('dayjs/locale/ru')
require('dayjs/locale/tr')
require('dayjs/locale/vi')
require('dayjs/locale/zh')
require('dayjs/locale/uk')

dayjs.locale(localStorage.getItem('frontEndLang')?.toLowerCase())

export default new VueI18n({
  locale: localStorage.getItem('frontEndLang')?.toLowerCase() || 'zh',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh',
  messages,
  numberFormats
  // silentTranslationWarn: true,
})
