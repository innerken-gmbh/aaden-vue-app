import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify, { colors } from 'vuetify/lib'

Vue.use(Vuetify)
export default new Vuetify({
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  theme: {
    themes: {
      light: {
        primary: colors.indigo.darken1
      }

    },
    options: { customProperties: true }
  }
})
