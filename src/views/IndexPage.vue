<template>
  <div>
    <v-navigation-drawer
        dark color="orange darken-2"

        expand-on-hover
        permanent stateless
        style="z-index: 100" app>
      <v-card color="transparent" elevation="0" class="d-flex flex-column" style="height: 100vh">
        <v-list nav dense>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar class="ml-n3" @click="drawer=!drawer">
                <v-icon>mdi-menu</v-icon>
              </v-avatar>
            </v-list-item-avatar>
          </v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list
            nav
        >
          <v-list-item link @click="goHome">
            <v-list-item-icon>
              <v-icon>mdi-silverware</v-icon>
            </v-list-item-icon>
            <v-list-item-title> {{ $t('点餐') }}</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="jumpToSales">
            <v-list-item-icon>
              <v-icon>mdi-cash</v-icon>
            </v-list-item-icon>
            <v-list-item-title> {{ $t('销售额') }}</v-list-item-title>
          </v-list-item>
          <v-list-item link @click="jumpToBoss">
            <v-list-item-icon>
              <v-icon>mdi-home-analytics</v-icon>
            </v-list-item-icon>
            <v-list-item-title> {{ $t('CHEF') }}</v-list-item-title>
          </v-list-item>
          <v-list-item link>
            <v-list-item-icon @click="jumpToVip">
              <v-icon>mdi-smart-card</v-icon>
            </v-list-item-icon>
            <v-list-item-title>{{ $t('VIP') }}</v-list-item-title>
          </v-list-item>
        </v-list>
        <v-spacer>

        </v-spacer>
        <div class="d-flex  flex-shrink-0 align-center pa-2">
          <div style="width: 70px">
            <v-img width="100%"
                   :src="require('@/assets/aadenLogo.png')"/>
          </div>
          <span class="text-no-wrap ml-2">v {{ version }}</span>
        </div>
      </v-card>

    </v-navigation-drawer>
    <v-main app>
      <router-view></router-view>
      <!--        下面是侧边栏的逻辑-->
    </v-main>
  </div>
</template>
<script>
import { jumpTo, popAuthorize } from '@/oldjs/common'
import { goHome } from '@/oldjs/StaticModel'
import { getServantList } from '@/oldjs/api'

const version = require('../../package.json').version

export default {
  name: 'IndexPage',
  data: function () {
    return {
      version,
      drawer: false,
      servantList: []
    }
  },
  methods: {
    findServant (pw) {
      if (this.servantList.length > 0) {
        return this.servantList.find(s => s.password === pw)
      }
    },
    popAuthorize,
    jumpToBoss () {
      popAuthorize('boss', () => {
        jumpTo('boss')
      })
    },
    jumpToSales () {
      popAuthorize('',
        (pw) => {
          const servant = this.findServant(pw)
          jumpTo('sales', {
            isBoss: parseInt(servant.permission) === 1,
            password: pw
          })
        }, true)
    },
    jumpToVip () {
    },
    goHome () {
      goHome()
    }
  },
  async mounted () {
    this.servantList = await getServantList()
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
</style>
