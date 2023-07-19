<template>
  <div>
    <navgation>
      <div class="d-flex" style="min-width: 200px">
        <div v-if="restaurantInfo" class="text-h6 font-weight-bold">{{ restaurantInfo.displayName }}</div>
      </div>
      <v-spacer></v-spacer>
      <v-item-group v-model="currentView" class="align-self-center" mandatory style="width: max-content">
        <div style="display: grid;grid-gap: 8px;grid-auto-flow: column">
          <v-item #default="{active,toggle}">
            <div
                :class="active?' active':' text--disabled'"
                class="navigationPillItem"
                @click="toggle"
            >
              <v-icon left>mdi-silverware</v-icon>
              {{ $t('DineIn') }}
              <trailing-number>
                {{ activeList.length }}
              </trailing-number>
            </div>
          </v-item>
          <v-item #default="{active,toggle}">
            <div
                :class="active?' active':' text--disabled'"
                class="navigationPillItem"
                @click="toggle"
            >
              <v-icon left>mdi-truck-fast</v-icon>
              {{ $t('togo') }}
              <trailing-number>
                {{ takeawayList.length }}
              </trailing-number>
            </div>
          </v-item>
          <v-item #default="{active,toggle}">
            <div
                :class="active?' active':' text--disabled'"
                class="navigationPillItem"
                @click="toggle"
            >
              <v-icon left>mdi-account</v-icon>
              <span style="padding: 2px 4px">{{ $t('ServerOrder') }}</span>
            </div>
          </v-item>
        </div>
      </v-item-group>

      <template #right>

        <div class="d-flex align-center justify-end" style="min-width: 200px">
          <div>
            <time-display></time-display>
          </div>
          <v-btn icon @click="openDrawer">
            <v-icon>mdi-lock-open</v-icon>
          </v-btn>
          <v-menu
              bottom
              left
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn icon
                     tile
                     v-bind="attrs"
                     v-on="on"
              >
                <v-icon>mdi-web</v-icon>
              </v-btn>
            </template>
            <v-list>

              <v-list-item v-for="(lang,index) in transLangs"
                           :key="'translang'+index"
                           @click="changeLanguage(lang)">
                <v-list-item-title>{{ $t(lang) }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

      </template>

    </navgation>
    <v-tabs-items v-model="currentView" touchless>

      <!--        堂食-->
      <v-tab-item style="position: relative">
        <div style="
        background: #e8e8e8;
          height: calc(100vh - 64px);
          width: 100%;
          overflow: scroll
">
          <table-blue-print
              :out-side-table-list="tableList"
              @need-refresh="refreshTables"
              @edit-table-clicked="showEditTableDialog"
              @table-clicked="openOrEnterTable"
          />
        </div>
      </v-tab-item>
      <!--      外卖-->
      <v-tab-item>
        <div class="pa-4 grey lighten-4" style="display: grid;grid-template-columns: repeat(4,calc(25% - 12px));
        height: 100%;grid-gap: 16px;">
          <v-card class="pa-4 d-flex flex-column"
                  color="grey lighten-3"
                  elevation="0"
                  height="calc(100vh - 96px)"
                  style="border-radius: 12px"
                  width="100%">
            <div class="text-subtitle-2">{{ $t('NotReceivedOrders') }}
              <trailing-number>
                {{ notAccepted.length }}
              </trailing-number>
            </div>
            <div class="mt-4"
                 style="display: grid;grid-gap: 12px;overflow-y: scroll;max-height:calc(100vh - 150px) ;">
              <takeaway-order-item
                  v-for="t in notAccepted"
                  :key="t.tableName"
                  :big-card="true"
                  :table-info="t"
                  @accept="acceptOrder"
                  @click="openOrEnterTable(t.tableName)"
                  @reject="rejectOrder"/>
            </div>

          </v-card>
          <v-card class="pa-4 d-flex flex-column"
                  color="grey lighten-3"
                  elevation="0"
                  height="calc(100vh - 96px)"
                  style="border-radius: 12px">
            <div class="text-subtitle-2">{{ $t('ReceivedOrders') }}
              <trailing-number>
                {{ accepted.length }}
              </trailing-number>
            </div>
            <div class="mt-4" style="display: grid;grid-gap: 12px;overflow-y: scroll;">
              <table-grid-item
                  v-for="t in accepted"
                  :key="t.tableName"
                  :big-card="true"
                  :table-info="t"
                  @click="openOrEnterTable(t.tableName)"
                  @click-ok="updateStatus(t.id)"/>
            </div>

          </v-card>
          <v-card class="pa-4"
                  color="grey lighten-3"
                  elevation="0"
                  height="calc(100vh - 96px)"
                  style="border-radius: 12px">
            <div class="text-subtitle-2">{{ $t('CanBePickedUp') }}
              <trailing-number>{{ picked.length }}</trailing-number>
            </div>
            <div class="mt-4" style="display: grid;grid-gap: 12px;overflow-y: scroll;">
              <pick-up-item
                  v-for="t in picked"
                  :key="t.tableName"
                  :big-card="true"
                  :table-info="t"
                  @click="openOrEnterTable(t.tableName)"

              />
            </div>

          </v-card>
          <div class="d-flex flex-column" style="height: calc(100vh - 96px)">
            <v-card class="pa-4" color="success"
                    dark
                    elevation="0"
                    style="border-radius: 12px"
                    @click="takeawayClicked">
              <div class="text-subtitle-2 d-flex align-center">
                <v-icon class="mr-2">mdi-truck-fast</v-icon>
                {{ $t('AddTakeawayOrders') }}
                <v-spacer></v-spacer>
                <v-icon>mdi-plus</v-icon>
              </div>

            </v-card>

            <v-card class="pa-4 mt-4"
                    color="white"
                    elevation="0"
                    style="border-radius: 12px">
              <div class="text-subtitle-2 d-flex">{{ $t('TakeawayWebsiteSetting') }}
                <v-spacer></v-spacer>
                <template v-if="loading">
                  <v-progress-circular indeterminate></v-progress-circular>
                </template>
                <template v-else>
                  <v-chip class="ml-2 d-flex align-center" color="white" label small>
                    <v-icon color="success" left>mdi-checkbox-marked-circle</v-icon>
                    <span>
                  {{ $t('Synchronized') }}
                             </span>
                  </v-chip>
                </template>
              </div>
              <div class="text-body-1">
                <div class="py-2 mt-4 d-flex align-center">
                  <div>
                    {{ $t('AcceptExternalOrders') }}
                    <div class="caption">
                      {{ $t('IfThisOptionIsTurnedOffTheTakeawaySiteWillBeTemporarilyClosed') }}
                    </div>
                  </div>

                  <v-spacer></v-spacer>
                  <v-switch v-model="takeawayEnabled" class="mt-0" hide-details></v-switch>
                </div>
                <!--                <div class="py-2 d-flex align-center">-->
                <!--                  自动接单-->
                <!--                  <v-spacer></v-spacer>-->
                <!--                  <v-switch hide-details class="mt-0" color="warning"></v-switch>-->
                <!--                </div>-->
                <!--                <div class="py-2 d-flex align-center">-->
                <!--                  接受配送订单-->
                <!--                  <v-spacer></v-spacer>-->
                <!--                  <v-switch hide-details class="mt-0" color="warning"></v-switch>-->
                <!--                </div>-->
              </div>

            </v-card>

            <v-card class="pa-4 flex-grow-1 mt-4"
                    color="grey lighten-3"
                    elevation="0"
                    style="border-radius: 12px">
              <div class="text-subtitle-2">{{ $t('NonTodayOrders') }}
                <trailing-number>
                  0
                </trailing-number>
              </div>

            </v-card>
          </div>

        </div>

      </v-tab-item>
      <!--      跑堂-->
      <v-tab-item>
        <v-card v-dragscroll
                class="flex-grow-1 d-flex"
                color="#f5f6fa"
                height="calc(100vh - 64px)"
                style="overflow: scroll">
          <template v-for="servant in servantWithTable">
            <v-card :key="servant.id" color="transparent" elevation="0"
                    height="calc(100vh - 64px);">
              <v-toolbar class="flex-grow-0 ml-1 mb-1 mt-1" color="blue lighten--4" dark
                         dense elevation="0" style="width: 196px;">
                <v-toolbar-title class="d-flex align-center" style="width: 100%">
                  <div>{{ servant.name }}</div>
                  <v-spacer></v-spacer>
                  <div class="d-flex align-center" style="font-size: small">
                    <v-icon small>mdi-food</v-icon>
                    /
                    <v-icon small>mdi-cup-water</v-icon>
                    /
                    <v-icon small>mdi-cash-multiple</v-icon>
                  </div>
                </v-toolbar-title>
              </v-toolbar>
              <div v-dragscroll
                   style="height: calc(100vh - 120px);overflow: scroll;display: grid;grid-auto-rows: 64px;
                 grid-template-columns: 100%;grid-gap: 4px">
                <template v-for="table in servant.tables">
                  <table-list-item :key="table.id" :table-info="table"
                                   @click="openOrEnterTable(table.tableName)">
                  </table-list-item>
                </template>
              </div>

            </v-card>

          </template>
        </v-card>
        <v-card class="pa-2"
                style="position: fixed;right: 0;bottom:0;width: 320px;z-index: 15">
          <v-text-field
              v-model="buffer"
              :append-icon="showKeyboard?'mdi-keyboard-close':'mdi-keyboard'"
              :autofocus="Config.getFocus"
              :placeholder=" $t('EnterTableNumber')"
              class="ma-2 pt-1"
              hide-details
              style="font-size: 24px"
              @click:append="showKeyboard=!showKeyboard"
          />
          <keyboard-layout v-if="showKeyboard" :keys="keyboardLayout" @input="numberInput"/>
        </v-card>
      </v-tab-item>
      <!--        预定-->

    </v-tabs-items>
    <v-card v-if="buffer"
            class="pa-4"
            style="position:fixed;top: 0;right: 0;
            margin: auto;
            left: 0;bottom: 0;
            min-width: 300px;
            max-width:calc(100vw - 200px);
            text-align: center;
            border-radius: 12px;
            z-index: 15;width: fit-content;height: fit-content">
      <div>
        <h1>{{ buffer }}</h1>
      </div>
      <div class="text-caption text--secondary" style="font-size: 14px !important;">
        {{ $t('PressESCToEnterWindow') }}<br>
        {{ $t('PressESCToCloseWindow') }}
      </div>

    </v-card>
    <v-dialog v-model="noNetwork" fullscreen>
      <v-card tile>
        <v-card class="pa-4" height="100vh" width="100vw">
          <no-content-display
              icon="mdi-wifi-sync"
              title="无法连接到本地或远程服务器"
              desc="请检查网络连接或联系我们的客服团队来帮您解决网络问题"
          >
            <v-btn @click="location.reload()" elevation="0" class="mt-4">
              <v-icon left>mdi-refresh</v-icon>
              {{ $t('reload') }}
            </v-btn>
          </no-content-display>
        </v-card>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import { version } from '../../../package.json'
import {
  blockReady,
  findConsumeTypeById,
  getAllDishes,
  getConsumeTypeList,
  openOrEnterTable,
  popAuthorize,
  requestOutTable
} from '@/oldjs/common'
import Swal from 'sweetalert2'
import { dragscroll } from 'vue-dragscroll'
import GlobalConfig, { forceChangeLanguage } from '../../oldjs/LocalGlobalSettings'
import { addToTimerList, clearAllTimer } from '@/oldjs/Timer'

import { getServantList, getTableListWithCells, openDrawer } from '@/oldjs/api'

import { mapGetters, mapMutations } from 'vuex'
import { TableFixedSectionId } from '@/api/tableService'

import { getRestaurantInfo } from '@/api/restaurantInfoService'

import { acceptOrder, loadRestaurantInfo, readyToPick, rejectOrder, syncTakeawaySettingToCloud } from '@/api/api'
import { Remember } from '@/api/remember'
import KeyboardLayout from '@/components/Base/Keyboard/KeyboardLayout'
import TrailingNumber from '@/views/FirstPage/widget/TrailingNumber'
import Navgation from '@/views/FirstPage/Navgation'
import TableBluePrint from '@/views/FirstPage/Table/Table/TableBluePrint'
import TimeDisplay from '@/components/Base/TimeDisplay'
import TakeawayOrderItem from '@/views/FirstPage/Table/Table/Item/TakeawayOrderItem'
import TableGridItem from '@/views/FirstPage/Table/Table/Item/TableGridItem'
import TableListItem from '@/views/FirstPage/Table/Table/Item/TableListItem'
import { loadTransLangs } from '@/i18n'
import PickUpItem from '@/views/FirstPage/Table/Table/Item/PickUpItem.vue'
import NoContentDisplay from '@/views/FirstPage/widget/NoContentDisplay.vue'

const keyboardLayout =
    [
      '7', '8', '9', 'C',
      '4', '5', '6', 'mdi-cash-lock-open',
      '1', '2', '3', '',
      'W', '0', '.', 'OK'
    ]

export default {
  name: 'FirstPage',
  directives: {
    dragscroll
  },
  components: {
    NoContentDisplay,
    PickUpItem,
    KeyboardLayout,
    TakeawayOrderItem,
    TrailingNumber,
    Navgation,
    TableGridItem,
    TableListItem,
    TableBluePrint,
    TimeDisplay
  },
  props: {
    refresh: {
      type: Number
    }
  },
  data: function () {
    return {
      noNetwork: false,
      storeListOfId: [],
      showKeyboard: false,
      keyboardLayout: keyboardLayout,

      restaurantInfo: null,
      takeawayEnabled: null,

      menu: null,
      menu1: null,

      servantList: [],
      version: version,

      buffer: '',
      ins: {},

      Config: GlobalConfig,
      tableList: [],
      currentView: parseInt(Remember.currentView),
      showOtherOrder: Remember.showOtherOrder,
      loading: false

    }
  },
  watch: {
    currentView (val) {
      Remember.currentView = val
    },

    showOtherOrder: function (val) {
      Remember.showOtherOrder = val
      this.refreshTables()
    },
    refresh: function () {
      this.initPage()
    },
    takeawayEnabled: async function (val) {
      const info = Object.assign({}, this.restaurantInfo)
      info.currentlyOpening = val ? 1 : 0
      this.loading = true
      await syncTakeawaySettingToCloud(info)
      await this.loadRestaurantInfo()
      this.loading = false
    }
  },
  computed: {
    ...mapGetters(['systemDialogShow']),
    activeTables () {
      return this.tableList.filter(t => t.usageStatus === '1')
    },
    servantWithTable () {
      return this.servantList.map(s => {
        s.tables = this.activeTables.filter(t => t.servantId === s.id)
        return s
      }).filter(s => s.tables.length > 0)
    },

    activeList: function () {
      return this.tableList.filter(TableFixedSectionId.notTogoFilter)
        .filter(t => t.usageStatus === '1')
    },

    takeawayList: function () {
      return this.tableList.filter(TableFixedSectionId.togoFilter)
    },
    picked: function () {
      return this.takeawayList.filter(it => it.consumeTypeStatusId >= 2 &&
          it.pickStatus !== '0')
    },
    accepted: function () {
      return this.takeawayList.filter(it => it.consumeTypeStatusId >= 2 &&
          it.pickStatus === '0')
    },
    notAccepted: function () {
      return this.takeawayList.filter(it => it.consumeTypeStatusId < 2)
    },
    transLangs () {
      return this.loadTransLangs()
    }

  },
  methods: {
    async updateStatus (orderId) {
      await readyToPick(orderId)
      await this.refreshTables()
    },
    loadTransLangs,
    openDrawer,
    async acceptOrder (reason = 'ok', id) {
      await acceptOrder(reason, id)
      await this.refreshTables()
    },
    async rejectOrder (id) {
      await rejectOrder(id)
      await this.refreshTables()
    },
    togoClick () {
      if (this.takeawayList.length > 0) {
        this.showOtherOrder = !this.showOtherOrder
      } else {
        this.takeawayClicked()
      }
    },

    changeLanguage: forceChangeLanguage,

    showEditTableDialog (tableInfo) {
      console.log(tableInfo)
    },

    numberInput (key) {
      if (!this.buffer) {
        this.buffer = ''
      }
      switch (key) {
        default:
          this.buffer += key
          break
        case 'C':
          this.buffer = ''
          break
        case 'mdi-cash-lock-open':
          this.openDrawer()
          break
        case 'OK':
          this.insDecode(this.readBuffer())
          this.buffer = ''
          break
      }
      this.input = this.buffer
    },

    async takeawayClicked () {
      const res = await popAuthorize() ?? GlobalConfig.defaultPassword
      try {
        if (res) {
          await requestOutTable(res)
        }
      } catch (e) {
      }
    },
    findConsumeTypeColorById (id) {
      return findConsumeTypeById(id)?.color ?? this.$vuetify.theme.currentTheme.primary
    },
    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },

    openOrEnterTable: openOrEnterTable,
    ...mapMutations(['HIDE_AUTHORIZE_DIALOG']),
    initialUI () {
      if (this.$refs.ins) {
        this.$refs.ins.focus()
      }
      this.buffer = ''

      this.HIDE_AUTHORIZE_DIALOG()
      blockReady()
    },
    async refreshTables () {
      this.tableList = await getTableListWithCells()
    },

    listenKeyDown (e) {
      if (Swal.isVisible()) {
        Swal.clickConfirm()
        return
      }
      switch (e.key) {
        case 'Backspace':
          this.buffer = ''
          break
        case 'Escape':
          this.back()
          break
        case 'Enter':
          this.insDecode(this.readBuffer())
          break
        default:
          if (e.target.nodeName === 'BODY') {
            this.buffer += e.key
            console.log(this.buffer)
          }
      }
    },
    back () {
      this.initialUI()
    },
    readBuffer: function (clear = true) {
      const ins = this.buffer
      if (clear) {
        this.buffer = ''
      }
      return ins
    },
    async insDecode (t) {
      if (this.anyMenuOpen()) {
        return
      }
      if (t !== '') {
        if (t.toLowerCase() === 'w') {
          const pw = await popAuthorize('')
          await requestOutTable(pw)
        } else {
          await this.openOrEnterTable(t)
        }
      }
    },
    anyMenuOpen () {
      return Swal.isVisible() || this.menu || this.systemDialogShow
    },

    async loadRestaurantInfo () {
      this.restaurantInfo = await loadRestaurantInfo()
      this.restaurantInfo.displayName = (this.restaurantInfo?.name ?? '').replace('<BR>', '')
      this.takeawayEnabled = this.restaurantInfo.currentlyOpening === '1'
    },
    async initPage () {
      window.onkeydown = this.listenKeyDown
      try {
        await this.loadRestaurantInfo()
        this.servantList = await getServantList()

        getRestaurantInfo()

        await getAllDishes()
        await getConsumeTypeList()
        await this.refreshTables()

        const list = [
          setInterval(this.refreshTables, 5000)
        ]
        list.map(addToTimerList)
      } catch (e) {
        this.noNetwork = true
        console.log(e)
      }
    }

  },
  mounted: async function () {
    await this.initPage()
  },
  beforeDestroy () {
    clearAllTimer()
  }

}
</script>

<style scoped>
.navigationPillItem {
  border-radius: 12px;
  display: flex;
  align-items: center;
  padding: 8px;
}

.navigationPillItem.active {
  background: #f0f0f0;
  font-weight: bold;
}

</style>
