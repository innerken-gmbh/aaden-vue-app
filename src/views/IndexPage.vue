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
        <div style="display: grid;grid-auto-flow: row;grid-gap: 12px">
          <v-card
              tile
              :dark="isActive('order')"
              :color="color('order')"
              elevation="0"
              @click="goHome"
              class="d-flex flex-column align-center py-1">
            <div>
              <v-icon>mdi-silverware</v-icon>
            </div>
            <div class="mt-2 text-caption">
              {{ $t('点餐') }}
            </div>
          </v-card>
          <v-card
              tile
              :dark="isActive('sales')"
              :color="color('sales')" elevation="0"
              @click="jumpToSales" class="d-flex flex-column align-center py-1">
            <div>
              <v-icon>mdi-cash</v-icon>
            </div>
            <div class="mt-2 text-caption">
              {{ $t('销售额') }}
            </div>
          </v-card>
          <v-card
              tile
              :dark="isActive('boss')"
              :color="color('boss')"
              elevation="0"
              @click="jumpToBoss"
              class="d-flex flex-column align-center py-1">
            <div>
              <v-icon>mdi-home-analytics</v-icon>
            </div>
            <div class="mt-2 text-caption">
              {{ $t('CHEF') }}
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
import { goHome } from '@/oldjs/StaticModel'

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
    color (myName) {
      return this.isActive(myName) ? 'primary' : 'white'
    },
    isActive (myName) {
      return this.$route.name === myName
    },
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

.navItem {

}
</style>
