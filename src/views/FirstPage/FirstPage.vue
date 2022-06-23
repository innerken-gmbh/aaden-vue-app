<template>
  <div>
    <navgation>
      <div style="min-width: 200px" class="d-flex">
        <div v-if="restaurantInfo" class="text-h6 font-weight-bold">{{ restaurantInfo.displayName }}</div>
      </div>
      <v-spacer></v-spacer>
      <v-item-group mandatory v-model="currentView" style="width: max-content" class="align-self-center">
        <div style="display: grid;grid-gap: 8px;grid-auto-flow: column">
          <v-item #default="{active,toggle}">
            <div
                @click="toggle"
                class="navigationPillItem"
                :class="active?' active':' text--disabled'"
            >
              <v-icon left>mdi-silverware</v-icon>
              {{ $t('堂食') }}
              <trailing-number>
                {{ activeList.length }}
              </trailing-number>
            </div>
          </v-item>
          <v-item #default="{active,toggle}">
            <div
                @click="toggle"
                class="navigationPillItem"
                :class="active?' active':' text--disabled'"
            >
              <v-icon left>mdi-truck-fast</v-icon>
              {{ $t('外卖') }}
              <trailing-number>
                {{ takeawayList.length }}
              </trailing-number>
            </div>
          </v-item>
          <v-item #default="{active,toggle}">
            <div
                @click="toggle"
                class="navigationPillItem"
                :class="active?' active':' text--disabled'"
            >
              <v-icon left>mdi-account</v-icon>
              <span style="padding: 2px 4px">{{ $t('跑堂订单') }}</span>
            </div>
          </v-item>
          <v-item v-if="Config.activeReservation" #default="{active,toggle}">
            <div
                @click="toggle"
                class="navigationPillItem"
                :class="active?' active':' text--disabled'"
            >
              <v-icon left>mdi-calendar</v-icon>
              {{ $t('预定') }}
            </div>
          </v-item>
        </div>
      </v-item-group>

      <template #right>

        <div style="min-width: 200px" class="d-flex align-center justify-end">
          <div>
            <time-display></time-display>
          </div>
          <v-btn @click="showConfig" icon>
            <v-icon>
              mdi-cog-outline
            </v-icon>
          </v-btn>
          <v-dialog
              max-width="400"
              v-model="menu"
              :close-on-content-click="false"
              :nudge-width="300"
              :max-height="600"
          >
            <v-card color="white">
              <v-list>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>Aaden App</v-list-item-title>
                    <v-list-item-subtitle>
                      {{ $t('Version') }} {{ version }}
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-icon>mdi-heart</v-icon>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
              <v-divider></v-divider>
              <v-list dense>
                <template v-for="key in NeededKeys">
                  <v-list-item dense :key="'config'+key">
                    <v-list-item-title>{{ $t(key) }}</v-list-item-title>
                    <template v-if="typeof Config[key]==='boolean'">
                      <v-list-item-action>
                        <v-switch v-model="Config[key]" color="purple"></v-switch>
                      </v-list-item-action>
                    </template>
                    <template v-else>
                      <v-list-item-action>
                        <v-text-field v-model="Config[key]" color="purple"></v-text-field>
                      </v-list-item-action>
                    </template>
                  </v-list-item>
                </template>
              </v-list>
              <v-card-actions>
                <v-btn text @click="hardReload">{{ $t('清除') }}</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="menu = false">{{ $t('取消') }}</v-btn>
                <v-btn color="primary" text @click="useCurrentConfig">{{ $t('保存') }}</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-menu
              left
              bottom
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn tile
                     icon
                     v-bind="attrs"
                     v-on="on"
              >
                <v-icon>mdi-web</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="changeLanguage('ZH')"
              >
                <v-list-item-title>{{ $t('langZH') }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="changeLanguage('EN')">
                <v-list-item-title>{{ $t('langEN') }}</v-list-item-title>
              </v-list-item>
              <v-list-item @click="changeLanguage('DE')">
                <v-list-item-title>{{ $t('langDE') }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>

      </template>

    </navgation>
    <v-tabs-items touchless v-model="currentView">

      <!--        堂食-->
      <v-tab-item style="position: relative">
        <div style="
        background: #e8e8e8;
          height: calc(100vh - 64px);
          width: 100%;
          overflow: scroll
">
          <table-blue-print
              @need-refresh="refreshTables"
              :out-side-table-list="tableList"
              @edit-table-clicked="showEditTableDialog"
              @table-clicked="openOrEnterTable"
          />
        </div>
        <div style="position: absolute;right: 0;top: 8px;max-height: calc(100%);z-index: 3;">
          <div
              style="display: grid;grid-template-rows: auto;grid-gap: 4px;overflow-y: hidden;max-height: calc(100vh - 72px)"
              v-dragscroll>
            <v-card style="writing-mode: vertical-lr;text-align: center" elevation="0"
                    @click="togoClick"
                    class="head pa-2 d-flex align-center">

              <v-icon style="transform: rotate(90deg)">mdi-truck-fast</v-icon>
              <span class="mt-4">{{ $t('Togo') }}</span>
              <span class="white--text primary mt-4"
                    style="font-size: small;border-radius: 24px;padding: 8px 1px">{{ takeawayList.length }}</span>

            </v-card>
            <v-card style="writing-mode: vertical-lr;text-align: center" elevation="0"
                    @click="takeawayClicked"
                    class="head pa-2 py-4 d-flex align-center">
              <v-icon>mdi-plus-circle</v-icon>
              <span class="mt-4">{{ $t('新增') }}</span>
            </v-card>
            <v-card v-for="table in takeawayList"
                    color="primary" dark
                    :key="table.id" style="writing-mode: vertical-lr;text-align: center" elevation="0"
                    @click="openOrEnterTable(table.tableName)"
                    class="head pa-2 py-4 d-flex align-center">
              <span>   {{ table.tableName }}</span>
            </v-card>

          </div>

        </div>
        <div v-if="false" class="d-flex flex-column" style="
           position: absolute;
           right: 8px;
           top:8px;
           width: 240px;
           max-height: calc(100% - 16px);
           z-index: 3">
          <template>
            <div class="d-flex flex-column" style="height: 100%">
              <v-card elevation="0"
                      @click="togoClick"
                      class="head d-flex align-center pa-2">
                <h4>
                  <v-icon left>mdi-truck-fast</v-icon>
                  {{ $t('Togo') }}
                </h4>
                <v-spacer/>
                <template v-if="takeawayList.length>0">
                  <trailing-number>{{ takeawayList.length }}</trailing-number>
                  <toggle-up-down-button :expand="showOtherOrder"/>
                </template>
                <template v-else>
                  <v-btn @click.stop="takeawayClicked" elevation="0" color="success">
                    <v-icon left>mdi-plus</v-icon>
                    {{ $t('新增') }}
                  </v-btn>
                </template>
              </v-card>
              <div
                  v-if="showOtherOrder"
                  v-dragscroll
                  class="flex-shrink-0 mt-2 pb-2"
                  style="
                     display: grid;
                     max-height: calc(100vh - 120px);
                     grid-auto-columns: auto;
                     overflow-y: scroll;
                     grid-gap: 8px;
                     width: 100%;
                ">
                <v-card v-if="takeawayList.length>0" @click="takeawayClicked" height="72px" elevation="0"
                        color="grey lighten-4"
                        class="pa-2 d-flex align-center">
                  <v-icon left>mdi-plus</v-icon>
                  <h4>{{ $t('新增') }}</h4>
                </v-card>
                <table-grid-item
                    v-for="table in takeawayList"
                    @click="openOrEnterTable(table.tableName)"
                    :key="table.id" :table-info="table"
                >
                </table-grid-item>
              </div>
            </div>

          </template>

        </div>
      </v-tab-item>
      <!--      外卖-->
      <v-tab-item>
        <div style="display: grid;grid-template-columns: repeat(4,calc(25% - 12px));
        height: 100%;grid-gap: 16px;" class="pa-4 grey lighten-4">
          <v-card color="grey lighten-3"
                  elevation="0"
                  class="pa-4 d-flex flex-column"
                  style="border-radius: 12px"
                  width="100%"
                  height="calc(100vh - 96px)">
            <div class="text-subtitle-2">{{ $t('未接单') }}
              <trailing-number>
                {{ notAccepted.length }}
              </trailing-number>
            </div>
            <div style="display: grid;grid-gap: 12px;overflow-y: scroll;max-height:calc(100vh - 150px) ;"
                 class="mt-4">
              <takeaway-order-item
                  @accept="acceptOrder"
                  :big-card="true"
                  v-for="t in notAccepted"
                  :key="t.tableName"
                  @click="openOrEnterTable(t.tableName)"
                  :table-info="t"/>
            </div>

          </v-card>
          <v-card color="grey lighten-3"
                  elevation="0"
                  class="pa-4 d-flex flex-column"
                  style="border-radius: 12px"
                  height="calc(100vh - 96px)">
            <div class="text-subtitle-2">{{ $t('已接单') }}
              <trailing-number>
                {{ accepted.length }}
              </trailing-number>
            </div>
            <div style="display: grid;grid-gap: 12px;overflow-y: scroll;" class="mt-4">
              <table-grid-item
                  :big-card="true"
                  v-for="t in accepted"
                  :key="t.tableName"
                  @click="openOrEnterTable(t.tableName)"
                  :table-info="t"/>
            </div>

          </v-card>
          <v-card color="grey lighten-3"
                  elevation="0"
                  class="pa-4"
                  style="border-radius: 12px"
                  height="calc(100vh - 96px)">
            <div class="text-subtitle-2">{{ $t('可取走') }}
              <trailing-number>0</trailing-number>
            </div>

          </v-card>
          <div style="height: calc(100vh - 96px)" class="d-flex flex-column">
            <v-card color="success" dark
                    @click="takeawayClicked"
                    elevation="0"
                    style="border-radius: 12px"
                    class="pa-4">
              <div class="text-subtitle-2 d-flex align-center">
                <v-icon class="mr-2">mdi-truck-fast</v-icon>
                {{ $t('新增外卖订单') }}
                <v-spacer></v-spacer>
                <v-icon>mdi-plus</v-icon>
              </div>

            </v-card>

            <v-card color="white"
                    elevation="0"
                    style="border-radius: 12px"
                    class="pa-4 mt-4">
              <div class="text-subtitle-2 d-flex">{{ $t('外卖网站设置') }}
                <v-spacer></v-spacer>
                <template v-if="loading">
                  <v-progress-circular indeterminate></v-progress-circular>
                </template>
                <template v-else>
                  <v-chip label color="white" small class="ml-2 d-flex align-center">
                    <v-icon left color="success">mdi-checkbox-marked-circle</v-icon>
                    <span>
                  {{ $t('已经同步') }}
                             </span>
                  </v-chip>
                </template>
              </div>
              <div class="text-body-1">
                <div class="py-2 mt-4 d-flex align-center">
                  <div>
                    {{ $t('接受外部订单') }}
                    <div class="caption">
                      {{ $t('关闭此选项的话，外卖网站会暂时关闭') }}
                    </div>
                  </div>

                  <v-spacer></v-spacer>
                  <v-switch hide-details v-model="takeawayEnabled" class="mt-0"></v-switch>
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

            <v-card color="grey lighten-3"
                    elevation="0"
                    style="border-radius: 12px"
                    class="pa-4 flex-grow-1 mt-4">
              <div class="text-subtitle-2">{{ $t('非今日订单') }}
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
                color="#f5f6fa"
                class="flex-grow-1 d-flex"
                style="overflow: scroll"
                height="calc(100vh - 64px)">
          <template v-for="servant in servantWithTable">
            <v-card elevation="0" height="calc(100vh - 64px);" color="transparent"
                    :key="servant.id">
              <v-toolbar elevation="0" color="blue lighten--4" dark
                         dense class="flex-grow-0 ml-1 mb-1 mt-1" style="width: 196px;">
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
              :placeholder=" $t('请输入桌号')"
              @click:append="showKeyboard=!showKeyboard"
              :append-icon="showKeyboard?'mdi-keyboard-close':'mdi-keyboard'"
              class="ma-2 pt-1"
              hide-details
              style="font-size: 24px"
              v-model="buffer"
              :autofocus="Config.getFocus"
          />

          <keyboard-layout v-if="showKeyboard" @input="numberInput" :keys="keyboardLayout"/>
        </v-card>
      </v-tab-item>
      <!--        预定-->
      <v-tab-item>
        <reservation/>
      </v-tab-item>

    </v-tabs-items>
    <v-card v-if="buffer"
            style="position:fixed;top: 0;right: 0;
            margin: auto;
            left: 0;bottom: 0;
            min-width: 300px;
            max-width:calc(100vw - 200px);
            text-align: center;
            border-radius: 12px;
            z-index: 15;width: fit-content;height: fit-content"
            class="pa-4">
      <div>
        <h1>{{ buffer }}</h1>
      </div>
      <div class="text-caption text--secondary" style="font-size: 14px !important;">
        {{ $t('按Enter(回车键)确定') }}<br>
        {{ $t('按ESC键或者退格键关闭此窗口') }}
      </div>

    </v-card>
    <template v-if="false">
      <div style="position: fixed;right: 0;top:64px">
        <div class="d-flex pa-2  pt-4 align-center caption">
          <time-display/>
        </div>
      </div>

    </template>

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
import GlobalConfig, {
  forceChangeLanguage,
  hardReload,
  NeededKeys,
  useCurrentConfig
} from '../../oldjs/LocalGlobalSettings'
import { addToTimerList, clearAllTimer } from '@/oldjs/Timer'

import { getServantList, getTableListWithCells, openDrawer } from '@/oldjs/api'

import { mapGetters, mapMutations } from 'vuex'
import { TableFixedSectionId } from '@/api/tableService'

import { getRestaurantInfo } from '@/api/restaurantInfoService'

import { acceptOrder, loadRestaurantInfo, syncTakeawaySettingToCloud } from '@/api/api'
import { Remember } from '@/api/remember'
import Reservation from '@/views/FirstPage/ReservationFragment'
import KeyboardLayout from '@/components/Base/Keyboard/KeyboardLayout'
import TrailingNumber from '@/views/FirstPage/widget/TrailingNumber'
import ToggleUpDownButton from '@/views/FirstPage/widget/ToggleUpDownButton'
import Navgation from '@/views/FirstPage/Navgation'
import TableBluePrint from '@/views/FirstPage/Table/Table/TableBluePrint'
import TimeDisplay from '@/components/Base/TimeDisplay'
import TakeawayOrderItem from '@/views/FirstPage/Table/Table/Item/TakeawayOrderItem'
import TableGridItem from '@/views/FirstPage/Table/Table/Item/TableGridItem'
import TableListItem from '@/views/FirstPage/Table/Table/Item/TableListItem'

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
    KeyboardLayout,
    TakeawayOrderItem,
    Reservation,
    TrailingNumber,
    ToggleUpDownButton,
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
      showKeyboard: false,
      keyboardLayout: keyboardLayout,
      NeededKeys,
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
      })
    },

    activeList: function () {
      return this.tableList.filter(TableFixedSectionId.notTogoFilter)
        .filter(t => t.usageStatus === '1')
    },

    takeawayList: function () {
      return this.tableList.filter(TableFixedSectionId.togoFilter)
    },
    accepted: function () {
      return this.takeawayList.filter(it => it.consumeTypeStatusId >= 2)
    },
    notAccepted: function () {
      return this.takeawayList.filter(it => it.consumeTypeStatusId < 2)
    }

  },
  methods: {
    async showConfig () {
      await popAuthorize('boss', true)
      this.menu = true
    },
    async acceptOrder (reason = 'ok', id) {
      await acceptOrder(reason, id)
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

    useCurrentConfig,
    hardReload,
    openDrawer,
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

      getAllDishes()
      await getConsumeTypeList()
      await this.refreshTables()

      const list = [
        setInterval(this.refreshTables, 5000)
      ]
      list.map(addToTimerList)
    }
  },
  mounted: async function () {
    this.initPage()
    this.servantList = await getServantList()

    getRestaurantInfo()

    this.loadRestaurantInfo()
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
  box-shadow: 0px 3px 6px rgba(0, 86, 255, 0.08);
  background: white;
  font-weight: bold;
}

</style>
