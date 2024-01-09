import '@mdi/font/css/materialdesignicons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import LottieAnimation from 'lottie-web-vue'

Vue.use(LottieAnimation) // add lottie-animation to your global scope
Vue.use(Vuetify)
export default new Vuetify({
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  theme: {
    themes: {
      light: {
        primary: '#0e0b0c'
      }

    },
    options: { customProperties: true }
  }
})
