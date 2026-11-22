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

// 语言切换器只用到 langCode / flag / langLabel 三个字段（见 LanguageSwitcher.vue）。
// 不要在模板里写 :locales="$i18n.messages"：vue-i18n 的 messages getter 是
// 「读一次深拷一次全部语言包」（16 个语言包 ≈ 600 KB，实测单次约 30ms），
// 而 FirstPage 因为桌台轮询每秒都会重渲染，等于每秒白烧 30ms + 600KB 垃圾。
// 这里在模块加载时抽一次，引用固定，行为与原来给的东西等价。
export const localeMetaList = Object.keys(messages).map(code => ({
  langCode: messages[code].langCode,
  flag: messages[code].flag,
  langLabel: messages[code].langLabel
}))

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
  locale: 'de',
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh',
  messages,
  numberFormats
  // silentTranslationWarn: true,
})
