<template>
  <div>
    <navgation>
      <div style="min-width: 200px" class="d-flex">
        <div v-if="restaurantInfo" class="text-h6 font-weight-bold">{{ restaurantInfo.name }}</div>
        <v-chip label color="white" class="ml-2 d-flex align-center">
          <v-icon left color="success">mdi-checkbox-marked-circle</v-icon>
          <span>
                一切正常
          </span>

        </v-chip>
      </div>
      <v-spacer></v-spacer>

      <v-item-group mandatory v-model="currentView" style="width: max-content">
        <div style="display: grid;grid-gap: 8px;grid-auto-flow: column">
          <v-item #default="{active,toggle}">
            <div
                @click="toggle"
                class="navigationPillItem"
                :class="active?' active':' text--disabled'"
            >
              <v-icon left>mdi-silverware</v-icon>
              堂食
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
              外卖
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
              <span style="padding: 2px 4px">跑堂订单</span>
            </div>
          </v-item>
          <v-item #default="{active,toggle}">
            <div
                @click="toggle"
                class="navigationPillItem"
                :class="active?' active':' text--disabled'"
            >
              <v-icon left>mdi-calendar</v-icon>
              预定
            </div>
          </v-item>
        </div>
      </v-item-group>

      <template #right>
        <div style="min-width: 200px">
          <v-btn elevation="0" @click="reprintAll" v-hide-simple v-if="hasBadPrint" color="error">
            <v-icon left>mdi-printer-off</v-icon>
            {{ $t('Erneut Drücken') + ' ' + falsePrinterList.length }}
          </v-btn>
          <v-dialog
              v-model="menu"
              :close-on-content-click="false"
              :nudge-width="300"
              :max-height="600"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs"
                     v-on="on"
                     icon>
                <v-icon>
                  mdi-cog-outline
                </v-icon>
              </v-btn>
            </template>
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
                    <v-list-item-title>{{ key }}</v-list-item-title>
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
                <v-btn text @click="hardReload">Clear</v-btn>
                <v-spacer></v-spacer>
                <v-btn text @click="menu = false">Cancel</v-btn>
                <v-btn color="primary" text @click="useCurrentConfig">Save</v-btn>
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
              @edit-table-clicked="showEditTableDialog"
              @table-clicked="openOrEnterTable"
              @need-refresh="refreshTables"
              :out-side-table-list="tableInCurrentSection"
              :editing.sync="isEditing"
              :current-section="currentSection"/>
        </div>
        <v-card
            color="white"
            class="d-flex"
            style="position: fixed;bottom: 36px;
              box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.08);
                right: 0;
                margin: auto;
                width: min-content;
                border-radius: 8px;
                          left: 0;max-width: calc(100vw - 684px);
                          z-index: 15;">
          <v-item-group v-dragscroll v-model="currentSectionIndex"
                        mandatory
                        style="display: grid;
                          grid-auto-columns: max-content;
                          grid-gap: 8px;
                          grid-auto-flow: column;overflow-x: scroll">

            <v-item v-for="section of notTakeawaySection" v-bind:key="section.id+'categorytypes'"
                    v-slot="{active,toggle}">
              <v-card :elevation="active?4:0"
                      style="border-radius: 8px"
                      class="px-6 py-2 text-body-1" @click="toggle"
                      :dark="active">{{ section.name }}
              </v-card>
            </v-item>
          </v-item-group>
        </v-card>

        <div class="d-flex flex-column" style="
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
                     <span class="error white--text ml-2"
                           style="padding:2px 8px;font-size: small;border-radius: 24px">{{ takeawayList.length }}</span>
                  <toggle-up-down-button :expand="showOtherOrder"/>
                </template>
                <template v-else>
                  <v-btn @click.stop="takeawayClicked" elevation="0" color="success">
                    <v-icon left>mdi-plus</v-icon>
                    新增
                  </v-btn>
                </template>
              </v-card>
              <div
                  v-if="showOtherOrder"
                  v-dragscroll
                  class="flex-shrink-0 mt-2 pb-2"
                  style="
             display: grid;
             max-height: calc(100vh - 200px);
            grid-auto-columns: auto;
            overflow-y: scroll;
            grid-gap: 8px;
            width: 100%;
                ">
                <v-card @click="takeawayClicked" height="72px" elevation="0" color="grey lighten-4"
                        class="pa-2 d-flex align-center">
                  <v-icon left>mdi-plus</v-icon>
                  <h4>新增</h4>
                </v-card>
                <table-gird-item
                    v-for="table in takeawayList"
                    @click="openOrEnterTable(table.tableName)"
                    :key="table.id" :table-info="table"
                >
                </table-gird-item>
              </div>
            </div>

          </template>
          <template>
            <v-card elevation="0" style="z-index: -1"
                    @click="isEditClick"
                    class="head d-flex align-center pa-2 mt-2">
              <h4>
                <v-icon left>mdi-pencil-box-multiple</v-icon>
                桌子设置
              </h4>
              <v-spacer/>
              <toggle-up-down-button :expand="showOtherOrder"/>
            </v-card>
            <v-card elevation="0" tile color="#f6f6f6" class="pa-2" v-if="isEditing">
              <v-select label="堂食桌子显示标签"></v-select>
              <v-select label="自助桌子显示标签"></v-select>
              <v-card>
                <v-card-title>{{ $t('显示内容排序') }}</v-card-title>
                <v-card-text>
                  <draggable v-model="tableInfoDisplayOrder">
                    <transition-group>
                      <v-card class="pa-2 d-flex"
                              v-for="element in tableInfoDisplayOrder" :key="element">
                        {{ $t(element) }}
                        <v-spacer></v-spacer>
                        <v-icon>mdi-drag-horizontal-variant</v-icon>
                      </v-card>
                    </transition-group>
                  </draggable>
                </v-card-text>
              </v-card>
              <v-btn class="mt-2" elevation="0" @click="saveCurrentSection()" color="primary">
                <v-icon left>mdi-check</v-icon>
                {{ $t('Save') }}
              </v-btn>

            </v-card>

          </template>

        </div>
      </v-tab-item>
      <!--      外卖-->
      <v-tab-item>
        <div style="display: grid;grid-template-columns: repeat(4,1fr);
        height: 100%;grid-gap: 16px" class="pa-4 grey lighten-4">
          <v-card color="grey lighten-3"
                  elevation="0"
                  class="pa-4 d-flex flex-column"
                  style="border-radius: 12px"
                  height="calc(100vh - 96px)">
            <div class="text-subtitle-2">未接单
              <trailing-number>
                {{ notAccepted.length }}
              </trailing-number>
            </div>
            <div style="display: grid;grid-gap: 12px;overflow-y: scroll;" class="mt-4">
              <table-gird-item
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
            <div class="text-subtitle-2">已接单
              <trailing-number>
                {{ accepted.length }}
              </trailing-number>
            </div>
            <div style="display: grid;grid-gap: 12px;overflow-y: scroll;" class="mt-4">
              <table-gird-item
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
            <div class="text-subtitle-2">可取走
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
                新增外卖订单
                <v-spacer></v-spacer>
                <v-icon>mdi-plus</v-icon>
              </div>

            </v-card>

            <v-card color="white"
                    elevation="0"
                    style="border-radius: 12px"
                    class="pa-4 mt-4">
              <div class="text-subtitle-2 d-flex">外卖网站设置
                <v-spacer></v-spacer>
                <v-chip label color="white" small class="ml-2 d-flex align-center">
                  <v-icon left color="success">mdi-checkbox-marked-circle</v-icon>
                  <span>
                  已经同步
          </span>

                </v-chip>
              </div>
              <div class="text-body-1">
                <div class="py-2 mt-4 d-flex align-center">
                  接受外部订单
                  <v-spacer></v-spacer>
                  <v-switch hide-details value="1" class="mt-0" color="warning"></v-switch>
                </div>
                <div class="py-2 d-flex align-center">
                  自动接单
                  <v-spacer></v-spacer>
                  <v-switch hide-details class="mt-0" color="warning"></v-switch>
                </div>
                <div class="py-2 d-flex align-center">
                  接受配送订单
                  <v-spacer></v-spacer>
                  <v-switch hide-details class="mt-0" color="warning"></v-switch>
                </div>
              </div>

            </v-card>

            <v-card color="grey lighten-3"
                    elevation="0"
                    style="border-radius: 12px"
                    class="pa-4 flex-grow-1 mt-4">
              <div class="text-subtitle-2">非今日订单
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
              ref="ins"
              v-model="buffer"
              :autofocus="Config.getFocus"
          />

          <keyboard v-if="showKeyboard" @input="numberInput" :keys="keyboardLayout"/>
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
        按Enter(回车键)确定<br>
        按ESC键或者退格键关闭此窗口
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
import { version } from '../../package.json'
import {
  blockReady,
  findConsumeTypeById,
  getAllDishes,
  getConsumeTypeList,
  getFalsePrinterList,
  openOrEnterTable,
  popAuthorize,
  requestOutTable,
  resetTableStatus,
  toast
} from '@/oldjs/common'
import Swal from 'sweetalert2'
import { dragscroll } from 'vue-dragscroll'
import GlobalConfig, {
  forceChangeLanguage,
  hardReload,
  NeededKeys,
  refreshGetter,
  useCurrentConfig
} from '../oldjs/LocalGlobalSettings'
import { addToTimerList, clearAllTimer } from '@/oldjs/Timer'
import PrinterList from 'aaden-base-model/lib/Models/PrinterList'
import TimeDisplay from '@/components/TimeDisplay'
import { getSectionList, getServantList, getTableListWithCells, openDrawer, updateSection } from '@/oldjs/api'
import Keyboard from '@/components/Keyboard'
import TableBluePrint from '@/components/TableBluePrint'
import { defaultSection } from '@/oldjs/defaultConst'
import { mapMutations, mapState } from 'vuex'
import TableListItem from '@/components/Table/TableListItem'
import draggable from 'vuedraggable'
import TableGirdItem from '@/components/Table/TableGridItem'
import { TableFixedSectionId } from '@/api/tableService'
import Navgation from '@/components/Navgation'
import ToggleUpDownButton from '@/components/widget/ToggleUpDownButton'
import { getRestaurantInfo } from '@/api/restaurantInfoService'
import TrailingNumber from '@/components/widget/TrailingNumber'
import Reservation from '@/components/fragments/ReservationFragment'

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
    Reservation,
    TrailingNumber,
    ToggleUpDownButton,
    Navgation,
    TableGirdItem,
    TableListItem,
    TableBluePrint,
    Keyboard,
    TimeDisplay,
    draggable
  },
  props: {
    refresh: {
      type: Number
    }
  },
  data: function () {
    return {
      showKeyboard: false,
      isEditing: false,

      keyboardLayout: keyboardLayout,
      NeededKeys,
      restaurantInfo: null,
      menu: null,
      menu1: null,

      servantList: [],
      version: version,

      buffer: '',
      ins: {},

      Config: GlobalConfig,
      falsePrinterList: [],
      tableList: [],
      sectionList: [],
      currentSectionIndex: 0,

      currentView: 0,

      showOtherOrder: GlobalConfig.showOtherOrder,
      tableInfoDisplayOrder: GlobalConfig.getTableInfoKeys()

    }
  },
  watch: {

    tableInfoDisplayOrder: function (val) {
      GlobalConfig.updateSettings('tableInfoDisplayOrder', val)
      refreshGetter()
      this.refreshTables()
    },

    showOtherOrder: function (val) {
      GlobalConfig.updateSettings('showOtherOrder', val)
      this.refreshTables()
    },
    refresh: function () {
      this.initPage()
    }
  },
  computed: {
    ...mapState(['pinDialogShow']),
    activeTables () {
      return this.tableList.filter(t => t.usageStatus === '1')
    },
    servantWithTable () {
      return this.servantList.map(s => {
        s.tables = this.activeTables.filter(t => t.servantId === s.id)
        return s
      })
    },
    tableInCurrentSection () {
      return this.tableList.filter(t => t.sectionId === this.currentSection.id)
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
    },

    hasBadPrint () {
      return this.falsePrinterList ? this.falsePrinterList.length > 0 : false
    },
    notTakeawaySection () {
      return this.sectionList.filter(it => it.id !== '6')
    },
    currentSection () {
      return this.sectionList[this.currentSectionIndex] ?? defaultSection
    }

  },
  methods: {
    togoClick () {
      if (this.takeawayList.length > 0) {
        this.showOtherOrder = !this.showOtherOrder
      } else {
        this.takeawayClicked()
      }
      this.isEditing = false
    },

    isEditClick () {
      this.isEditing = !this.isEditing
      this.showOtherOrder = false
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
      return findConsumeTypeById(id)?.color ?? '#367aeb'
    },
    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },

    useCurrentConfig,
    hardReload,
    openDrawer,
    openOrEnterTable: openOrEnterTable,
    requestOutTable,
    resetTableStatus,

    ...mapMutations(['HIDE_DIALOG']),
    initialUI () {
      if (this.$refs.ins) {
        this.$refs.ins.focus()
      }
      this.buffer = ''

      this.HIDE_DIALOG()
      blockReady()
    },
    async refreshTables () {
      this.tableList = await getTableListWithCells()
    },
    async refreshPrinterList () {
      const res = (await getFalsePrinterList()) ?? []
      this.falsePrinterList = res.filter(item => {
        return item.printStatus !== '4'
      })
    },
    async reprintAll () {
      try {
        await Promise.all(this.falsePrinterList.map(async (i) => {
          await PrinterList.reprint(i)
        }))
      } catch (e) {

      }
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
          if (e.target.nodeName !== 'INPUT') {
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
          popAuthorize('', requestOutTable)
        } else {
          this.openOrEnterTable(t)
        }
      }
    },
    async saveCurrentSection () {
      await updateSection(this.currentSection)
      toast()
      await this.refreshSectionList()
      this.isEditing = false
    },
    anyMenuOpen () {
      return Swal.isVisible() || this.menu || this.pinDialogShow
    },
    autoGetFocus () {
      if (this.anyMenuOpen()) {
        return
      }
      if (this.$refs.ins !== document.activeElement) {
        if (this.$refs.ins?.focus) {
          this.$refs.ins.focus()
        }
      }
    },
    async refreshSectionList () {
      this.sectionList = (await getSectionList())
        .filter(it => it.tableCount > 0)
    },

    async initPage () {
      window.onkeydown = this.listenKeyDown
      this.refreshPrinterList()
      getAllDishes()
      await getConsumeTypeList()
      await this.refreshTables()

      const list = [
        setInterval(this.refreshTables, 5000),
        setInterval(this.refreshPrinterList, 20000)
      ]
      if (GlobalConfig.getFocus) {
        list.push(setInterval(this.autoGetFocus, 1000))
      }
      list.map(addToTimerList)
    }
  },
  mounted: async function () {
    this.initPage()
    this.servantList = await getServantList()
    await this.refreshSectionList()
    getRestaurantInfo()
    setTimeout(() => {
      this.restaurantInfo = getRestaurantInfo()
    }, 1000)
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
