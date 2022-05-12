<template>
  <div>
    <v-navigation-drawer
      mini-variant
      permanent stateless
      style="z-index: 100" app>
      <v-card color="transparent" elevation="0"
              class="d-flex flex-column"
              style="height: 100vh">
        <div class="flex-shrink-0 pa-4 py-4">
          <div style="width: 100%">
            <v-img
              :src="require('@/assets/logo.png')"/>
          </div>
        </div>
        <div style="display: grid;grid-auto-flow: row;;grid-gap: 12px">
          <v-card
            style="width: 100%"
            v-for="m in menuList"
            :key="m.icon"
            elevation="0"
            @click="goto(m)"
            class="d-flex flex-column align-center py-2">
            <div>
              <v-icon :color="color(m.path)">{{ m.icon }}</v-icon>
            </div>
            <div :class="color(m.path)+'--text'" class="mt-1 text-caption text-no-wrap
             text-truncate overflow-hidden"
                 style="font-size: small">
              {{ $t(m.text) }}
            </div>
          </v-card>
        </div>
        <v-spacer/>
        <div class="text-center"><b>A</b>aden</div>
        <div class="text-no-wrap text-caption text-center2 ml-2">
          {{ version }}
        </div>

      </v-card>

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
import { printZBon, ZBonList } from '@/api/api'
import dayjs from 'dayjs'
import IKUtils from 'innerken-js-utils'

const version = require('../../package.json').version

export default {
  name: 'IndexPage',
  data: function () {
    return {
      version,
      drawer: false,
      servantList: [],
      menuList: [
        {
          icon: 'mdi-silverware',
          text: '点餐',
          beforeEnter () {
            return true
          },
          path: 'order'
        },
        {
          icon: 'mdi-cash',
          text: '销售额',
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
          icon: 'mdi-home-analytics',
          text: 'CHEF',
          async beforeEnter () {
            return await popAuthorize('boss')
          },
          path: 'boss'
        }
      ]
    }
  },
  methods: {
    async goto (menuItem) {
      const res = await menuItem.beforeEnter()
      console.log(res)
      if (res) {
        jumpTo(menuItem.path, res)
      }
    },
    color (myName) {
      return this.isActive(myName) ? 'primary' : ''
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
    this.servantList = await getServantList()
    if (this.servantList.find(s => s.password !== GlobalConfig.defaultPassword)) {
      GlobalConfig.updateSettings('defaultPassword', this.servantList[0].password)
      GlobalConfig.defaultPassword = this.servantList[0].password
    }
    if (GlobalConfig.usePrintZBonAlert) {
      const lastZBonPrintDate = dayjs((await ZBonList())?.[0]?.createTimeStamp ?? '1970-01-01 00:00:00')
      const hoursBefore = dayjs().subtract(32, 'hour')
      if (lastZBonPrintDate.isBefore(hoursBefore) && GlobalConfig.printZBonAlert) {
        const res = await IKUtils.showConfirmAsyn(this.$t('Bitte beachten Sie, dass Sie ZBon seit 36 Stunden nicht mehr gedruckt haben'),
          this.$t('Jetzt drucken?'))
        console.log(res)
        if (res.isConfirmed) {
          await printZBon()
        }
      }
    }
  }
}
</script>

<style scoped>
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
</style>
