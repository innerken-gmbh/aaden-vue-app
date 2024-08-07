<template>
  <div class="gradient">
    <v-navigation-drawer
        app
        color="transparent"
        dark
        mini-variant
        mini-variant-width="72"
        permanent
        stateless
        style="z-index: 100;"
    >
      <div
          class="d-flex flex-column py-2 pt-3"
          style="height: 100vh"
      >
        <div style="display: grid;grid-auto-flow: row;;grid-gap: 24px;align-content: center">
          <logo-display/>
          <nav-button
              v-for="m in menuList"
              :key="m.icon"
              :color="color(m.path)"
              :icon="m.icon"
              :is-active="isActive(m.path)"
              :text="m.text"
              @click="goto(m)"
          >
          </nav-button>
        </div>
        <v-spacer/>
        <div class="d-flex align-center flex-column justify-center white--text">
          <div class="text-no-wrap text-caption text-center mt-n1">
            v{{ version }}
          </div>
        </div>
      </div>
    </v-navigation-drawer>
    <v-main app>
      <router-view></router-view>
    </v-main>
  </div>
</template>
<script>
import { jumpTo, popAuthorize } from '@/oldjs/common'
import { getServantList } from '@/oldjs/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { resetCache } from '@/oldjs/StaticModel'
import LogoDisplay from '@/components/LogoDisplay.vue'
import NavButton from '@/components/navigation/NavButton.vue'
import { mapMutations } from 'vuex'
import IKUtils from 'innerken-js-utils'

const version = require('../../package.json').version

export default {
  name: 'IndexPage',
  components: {
    NavButton,
    LogoDisplay
  },
  data: function () {
    return {
      version,
      drawer: false,
      servantList: [],
      menuList: [
        {
          icon: 'mdi-silverware',
          text: ('order'),
          beforeEnter () {
            return true
          },
          path: 'order'
        },

        {
          icon: 'mdi-cash',
          text: ('Bill'),
          beforeEnter: async () => {
            const pw = await popAuthorize('', true)
            const servant = this.findServant(pw)
            return {
              isBoss: parseInt(servant.permission) === 1,
              password: pw
            }
          },
          path: 'sales'
        },
        {
          icon: 'mdi-calendar',
          text: ('Reservation'),
          beforeEnter: async () => {
            return true
          },
          path: 'reservation'
        },
        {
          icon: 'mdi-wallet-membership',
          text: 'VIP',
          beforeEnter () {
            return true
          },
          path: 'member'
        },
        {
          icon: 'mdi-view-dashboard',
          text: 'Admin',
          beforeEnter: async () => {
            const pw = await popAuthorize('', true)
            const servant = this.findServant(pw)
            return {
              isBoss: parseInt(servant.permission) === 1,
              password: pw
            }
          },
          path: 'boss'
        },
        {
          icon: 'mdi-cog',
          text: 'setting',
          beforeEnter () {
            return true
          },
          path: 'setting'
        }

      ]
    }
  },
  methods: {
    ...mapMutations(['showErrorDialog']),
    async goto (menuItem) {
      const res = await menuItem.beforeEnter()
      if (res) {
        if (menuItem.path === 'order') {
          resetCache()
        }
        if (menuItem.path === 'boss' && !res.isBoss) {
          this.showErrorDialog(this.$t('userNoPower'))
          return
        }
        if (menuItem.path === 'sales' && this.$route.name === 'sales') {
          jumpTo('order')
          await IKUtils.wait(50)
        }
        jumpTo(menuItem.path, res)
      }
    },
    color (myName) {
      return this.isActive(myName) ? 'rgba(255,255,255,0.2)' : 'transparent'
    },
    isActive (myName) {
      return this.$route.name === myName
    },
    findServant (pw) {
      if (this.servantList.length > 0) {
        return this.servantList.find(s => s.password === pw)
      }
    }
  },
  async mounted () {
    try {
      this.servantList = await getServantList()
      if (!this.servantList.find(s => s.password === GlobalConfig.defaultPassword)) {
        GlobalConfig.updateSettings('defaultPassword', this.servantList[0].password)
        GlobalConfig.defaultPassword = this.servantList[0].password
      }
    } catch (e) {

    }
  }
}
</script>

<style scoped>
.gradient {
  background: #3a7bd5; /* fallback for old browsers */
  background: linear-gradient(to bottom, #3e3e3e, #341d33); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.tableDisplay {
  height: calc(100vh - 48px);
  overflow: scroll;
}

.tableDisplay::-webkit-scrollbar {
  width: 0 !important
}

.areaTableContainer {
  max-height: calc(100vh - 112px);
  margin-top: 18px;
  display: grid;
  grid-auto-flow: column;
  grid-gap: 10px;
  margin-bottom: 12px;

}

.areaTitle {
  font-size: 16px;
  font-weight: 600;
}

.select-wrapper > ul {
  z-index: 0;
  top: -48px;
  width: 152px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 86, 255, 0.08);
  opacity: 1;
  border-radius: 0px 0px 5px 5px;
}

.select-wrapper > ul > li {
  border-bottom: 0.3px solid rgba(112, 112, 112, 0.38);;
}

.select-dropdown.dropdown-content li.selected {
  background: rgba(255, 255, 255, 1);
}

.dropdown-content li > a, .dropdown-content li > span {
  padding: 13px 16px;
  color: #4b4b4b;
  font-weight: 200;
  font-size: inherit;
  line-height: inherit;
}

.dropdown-content li {
  height: 45px;
  min-height: unset;
}

.areaC {
  margin-left: 12px;
  display: flex;
  width: max-content;
}

.area {
  max-height: calc(100vh - 72px);
  margin-right: 14px;
}

.alert {
  background: red;
}

.navItem {

}

.v-navigation-drawer >>> .v-navigation-drawer__border {
  display: none
}

.hideMore {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
