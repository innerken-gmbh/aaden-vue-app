import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

export function loadTransLangs () {
  const langs = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
    .keys()
    .map(
      function (item) {
        return item.match(/([A-Za-z0-9-_]+)\./i)[1].toUpperCase()
      }
    )
  const res = langs.filter(lang => lang && lang.length > 1)
  return res
}

function loadLocaleMessages () {
  const locales = require.context('./locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i)
    if (matched && matched.length > 1) {
      const locale = matched[1]
      messages[locale] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  locale: localStorage.getItem('frontEndLang')?.toLowerCase() || 'de',
  fallbackLocale: 'de',
  // silentTranslationWarn: true,
  messages: loadLocaleMessages()
})
