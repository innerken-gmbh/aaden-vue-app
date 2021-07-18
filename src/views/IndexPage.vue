<template>
  <div>
    <Navgation>
      <template slot="left">
        <v-toolbar-items>
          <v-menu
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
          </v-menu>
        </v-toolbar-items>
        <div class="d-flex ml-2 align-center caption">
          <time-display/>
        </div>
      </template>
      <template slot="right-slot">

        <v-toolbar-items class="mx-2">

          <v-btn :color="tseStatus?'':'error'">TSE STATUS:{{ tseInfo }}</v-btn>

          <v-btn
            :color="useBluePrintView?'primary':'transparent'"
            @click="useBluePrintView=!useBluePrintView">
            <v-icon v-if="useBluePrintView">mdi-map</v-icon>
            <v-icon v-else>mdi-dots-grid</v-icon>
          </v-btn>
        </v-toolbar-items>

      </template>
    </Navgation>
    <v-main app>

      <v-card v-if="useBluePrintView" class="flex-grow-1 d-flex">
        <v-card style="width: 100%">
          <v-toolbar dense>
            <v-tabs show-arrows v-model="currentSectionIndex">
              <template v-for="area of sectionList.filter(a=>a.id!=='6')">
                <v-tab :key="area.id">
                  {{ area.name }}
                </v-tab>
              </template>
            </v-tabs>
            <v-spacer></v-spacer>
            <v-toolbar-items class="mr-2">
              <v-btn @click="isEditing=!isEditing" :dark="isEditing">
                <v-icon>mdi-pencil-box</v-icon>
              </v-btn>
              <v-btn @click="saveCurrentSection()" color="primary" v-if="isEditing">
                <v-icon left>mdi-check</v-icon>
                Speichen
              </v-btn>
            </v-toolbar-items>
          </v-toolbar>
          <table-blue-print
            @table-clicked="openOrEnterTable"
            @need-refresh="refreshTables"
            :out-side-table-list="tableInCurrentSection"
            :show-coordinate="false"
            :editing.sync="isEditing"
            :current-table.sync="currentTable"
            :current-section="currentSection"/>
        </v-card>
        <v-card style="overflow-y: scroll;width: 280px">
          <div :key="t.id"
               @click="openOrEnterTable(t.tableName)"
               v-for="t in orderList" class="pa-2 d-flex justify-space-between align-center"
               style="border-bottom: 1px dotted black">
            <span class="title">{{ t.tableName }}</span>
            <div class="caption">
              <div class="d-flex justify-space-between align-center" style="width: 56px">
                <v-icon small>mdi-account</v-icon>
                <span>{{ t.servantName }}</span>
              </div>
              <div class="d-flex justify-space-between align-center" style="width: 56px">
                <v-icon small>mdi-alarm</v-icon>
                {{ t.createTimestamp }}
              </div>
            </div>
          </div>
        </v-card>
      </v-card>
      <v-card v-else-if="useOrderView"
              class="flex-grow-1"
              max-height="calc(100vh - 48px)"
              style="
        overflow: scroll;
        display: flex;
 ">
        <v-card height="calc(100vh - 48px)" tile color="transparent"
                style="width: 190px; flex-shrink: 0;overflow-y: scroll">

          <v-list subheader two-line>

            <v-subheader>
              <v-chip dark label>
                {{ $t('Neue Tisch mit.') }}
                <v-icon class="ml-2">mdi-arrow-down-box</v-icon>
              </v-chip>
            </v-subheader>
            <v-divider></v-divider>
            <template v-for="servant in tableGroupByServant">
              <v-list-item color="primary" @click="tryOpenTableUsePassword(servant.password)" :key="servant.id"
                           class="d-flex justify-space-between">
                <v-list-item-content>
                  <v-list-item-title>{{ servant.name }}</v-list-item-title>
                </v-list-item-content>
                <v-list-item-action>
                  <v-list-item-action-text>
                    <v-chip small label color="primary" v-text="servant.tables.length"></v-chip>
                  </v-list-item-action-text>
                </v-list-item-action>
              </v-list-item>
            </template>
            <template v-for="servant in servantWithoutTable">
              <v-list-item @click="tryOpenTableUsePassword(servant.password)" :key="servant.id"
                           class="d-flex justify-space-between">
                <v-list-item-content>
                  <v-list-item-title>{{ servant.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
          </v-list>

        </v-card>
        <template v-for="servant in tableGroupByServant">
          <v-card height="calc(100vh - 48px)" color="transparent"
                  style="width: 190px; flex-shrink: 0;overflow-y: scroll" :key="servant.id">
            <v-toolbar dense tile>
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
            <template v-for="table in servant.tables">
              <v-card
                :dark="tableColorIsDark(table)"
                :style="{backgroundColor:tableBackgroundColor(table)}"
                @click='openOrEnterTable(table.tableName)'
                class="ma-1 pa-1 px-2" style="height: fit-content;" :key="table.id">
                <div class="d-flex align-center">
                  <span style="font-size: 24px;font-weight: bold">{{ table.tableName }}</span>
                  <v-spacer/>
                  <div>
                    <div class="caption">
                      {{ table.buffetCount }}/{{ table.drinkCount }}/€{{ table.totalPrice }}
                    </div>
                    <div class="caption text-right">
                      {{ table.createTimestamp }}/<span
                      class="pa-1"
                      style="border-radius: 4px"
                      :style="{
                      background:findConsumeTypeColorById(table.consumeType),
                      color:colorIsDark(findConsumeTypeColorById(table.consumeType))?'#fff':'#000'}"
                    >{{ findConsumeTypeById(table.consumeType) }}</span>
                    </div>
                  </div>
                </div>

              </v-card>
            </template>
          </v-card>

        </template>
      </v-card>
      <div v-dragscroll v-else class="tableDisplay flex-grow-1">
        <div v-cloak class="areaC" id="areaC">
          <div :key="area.name" v-cloak v-for="area in realArea" class="area">
            <div class="areaTitle">{{ area.areaName }}</div>
            <div class="areaTableContainer"
                 :style="{
                   gridTemplateRows:'repeat(auto-fill,'+Config.gridSize+'px)',
                   gridAutoColumns:Config.gridSizeX+'px' }">
              <template v-for="table in area.tables">
                <div v-bind:key="table.name">
                  <v-card
                    tile
                    style="position: relative"
                    v-if="table.usageStatus==='1'"
                    class="tableCard"
                    :dark="tableColorIsDark(table)"
                    :color="tableBackgroundColor(table)"
                    @click='openOrEnterTable(table.tableName)'>
                    <div
                      class="pa-1"
                      :style="{
                      background:findConsumeTypeColorById(table.consumeType),
                      color:colorIsDark(findConsumeTypeColorById(table.consumeType))?'#fff':'#000'}"
                      style="position: absolute;top:8px;
                        right:4px;z-index: 2;font-size: 14px;
                        border-radius: 4px;
                        line-height: 12px;
                        font-weight: bold;
                           text-align: center">
                      <div>{{ findConsumeTypeById(table.consumeType) }}</div>
                    </div>
                    <v-card
                      tile
                      elevation="0"
                      :style="{fontSize:Config.tableCardFontSize+'px'}"
                      class="tableCardName">{{ table.tableName }}
                    </v-card>
                    <v-card :dark="tableColorIsDark(table,false)"
                            :color="tableForegroundColor(table)" style="font-size: 14px"
                            v-if="table.callService!=='1'">
                      <div v-if="Config.gridSize>=72" class="d-flex justify-space-between px-1">
                        <div class="text">{{ table.servantName }}</div>
                        <div class="text"> {{ table.createTimestamp }}</div>
                      </div>
                      <div class="d-flex justify-space-between px-1">
                        <template v-if="['1','2','3','5'].includes(table.consumeType)">
                          <div v-if="Config.gridSizeX>=64" class="d-flex align-center"
                               :class="!parseInt(table.dishCount)?' alert':''">
                            <v-icon x-small>mdi-silverware-fork-knife</v-icon>
                            <span class="ml-1">{{ table.dishCount === null ? 0 : table.dishCount }}</span>
                          </div>
                          <div v-if="Config.showTotalPriceOnCard" class="d-flex align-center">
                            <v-icon x-small>mdi-currency-eur</v-icon>
                            <span>{{ table.totalPrice }}</span>
                          </div>
                        </template>
                        <template v-else>
                          <div class="d-flex align-center">
                            <v-icon x-small>mdi-account-outline</v-icon>
                            <div class="text">{{ table.seatCount }}</div>
                          </div>
                          <div class="d-flex align-center">
                            <v-icon x-small>mdi-human-child</v-icon>
                            <div class="text">{{ table.childCount }}</div>
                          </div>
                        </template>
                      </div>
                    </v-card>
                    <div v-else>
                      <v-btn @click.stop="resetTableStatus(table.tableId)" block color="transparent" tile>
                        <v-icon>mdi-bell</v-icon>
                      </v-btn>
                    </div>
                  </v-card>
                  <div v-else @click="openOrEnterTable(table.tableName)"
                       class="tableCard notUsed">
                    <div :style="{fontSize:Config.tableCardFontSize+'px'}"
                         class="tableCardName">
                      {{ table.tableName }}
                    </div>
                  </div>
                </div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <!--        下面是侧边栏的逻辑-->
    </v-main>
    <v-navigation-drawer permanent stateless app right width="300px">
      <v-toolbar dense dark>
        <v-toolbar-items class="ml-n2">
          <v-btn v-if="!useBluePrintView"
                 :color="useOrderView?'primary':'transparent'"
                 @click="useOrderView=!useOrderView">
            {{ $t('只看活跃') }}
          </v-btn>
        </v-toolbar-items>

        <v-spacer></v-spacer>
        <div style="width: 72px" class="ml-2">
          <v-img :src="require('@/assets/aadenLogo.png')"></v-img>
        </div>

        <div class="text-right ml-2 text-caption">
          V {{ version }}
        </div>
      </v-toolbar>
      <v-card class="flex-shrink-0 d-flex flex-column" style="width: 300px;height: calc(100vh - 48px)">
        <div>
          <update-fragment></update-fragment>
        </div>
        <template v-if="useBluePrintView">
          <template v-if="isEditing">
            <div class="flex-grow-0">
              <v-slider hide-details label="Size-X" v-model="currentSection.sizeX" min="8" max="32">
                <template v-slot:append>
                  <v-text-field
                    hide-details
                    v-model="currentSection.sizeX"
                    class="mt-0 pt-0"
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider>
              <v-slider hide-details label="Size-Y" v-model="currentSection.sizeY" min="8" max="24">
                <template v-slot:append>
                  <v-text-field
                    hide-details
                    v-model="currentSection.sizeY"
                    class="mt-0 pt-0"
                    type="number"
                    style="width: 60px"
                  ></v-text-field>
                </template>
              </v-slider>
            </div>
            <div v-if="currentTable" class="currentTablePanel">
              <v-text-field v-model="currentTable.tableName" label="当前桌名"></v-text-field>
              <v-slider v-model="currentTable.radius" label="桌子圆角"></v-slider>
              <v-btn @click="()=>{currentTable.cells=[];currentTable=null}">清空</v-btn>
            </div>
          </template>
        </template>

        <div style="display: grid;grid-template-columns: repeat(3,1fr);grid-gap: 4px" class="pa-2">
          <grid-button
            @click="popAuthorize('boss',toManage)"
            icon="mdi-home-analytics"
            :text="$t('CHEF')"
            color="#147afc"
            :loading="loading"
          />
          <grid-button
            @click="openSalesDialog"
            icon="mdi-cash"
            :text="$t('销售额')"
            color="#24b646"
            :loading="loading"
          />
          <grid-button
            @click="takeawayClicked"
            icon=" mdi-truck-fast"
            :text="$t('takeaway')"
            :loading="loading"
            color="#ff8c50"
          />
          <grid-button
            v-hide-simple
            color="#272727"
            @click="memberCardCLicked"
            icon=" mdi-smart-card"
            :text="  $t('VIP') "
            :loading="loading"
          />
          <grid-button
            v-hide-simple
            color="#fec945"
            @click="openDrawer"
            icon="mdi-cash-lock-open"
            :text="$t('Kasse Ein')"
            :loading="loading"
          />
          <grid-button
            v-if="hasBadPrint"
            v-hide-simple
            color="error"
            @click="reprintAll"
            icon=" mdi-printer-off"
            :text=" $t('Erneut Drücken') +falsePrinterList.length"
            :loading="loading"
          />
        </div>

        <v-spacer></v-spacer>
        <template v-if="useBluePrintView">
          <div v-if="isEditing"
               style="display: grid;grid-template-columns: repeat(4,1fr);grid-gap: 4px"
               class="pa-2">
            <v-card color="warning" style="width: 100%;height: 60px;" class="d-flex justify-center align-center"
                    @click="setCurrentTable(t)" :key="t.id"
                    v-for="t in tableInCurrentSectionWithNoCell"
            >{{ t.tableName }}
            </v-card>
          </div>
        </template>
        <div v-if="!isEditing">
          <v-card class="mt-2">
            <div class="pa-2">{{ currentServant.name }}:{{ $t(currentKeyboardFunction) }}</div>
            <v-text-field
              class="ma-2"
              hide-details
              style="font-size: 36px"
              ref="ins"
              v-model="buffer"
              :autofocus="Config.getFocus"
            />
            <keyboard @input="numberInput" :keys="keyboardLayout"/>
          </v-card>
        </div>
      </v-card>
    </v-navigation-drawer>
    <open-table-form :servant-password="servantPassword" :menu-show.sync="showOpenTableDialog"></open-table-form>
    <sales-dialog
      @visibility-changed="(e)=>salesDialogShow=e"
      :sales-dialog-show="salesDialogShow"
      :is-boss="salesDialogServantIsBoss"
      :password="salesDialogServantPassword"
    />
    <member-card-dialog
      :member-card-dialog-show="memberCardDialogShow"
      @visibility-changed="(e)=>memberCardDialogShow=e"
      :member-card-info="memberCardInfo"
    ></member-card-dialog>
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
  oldJumpTo,
  openOrEnterTable,
  popAuthorize,
  requestOutTable,
  resetTableStatus,
  toast,
  toastError
} from '@/oldjs/common'
import Swal from 'sweetalert2'
import Navgation from '../components/Navgation'
import { dragscroll } from 'vue-dragscroll'
import GlobalConfig, { hardReload, NeededKeys, setDeviceId, useCurrentConfig } from '../oldjs/LocalGlobalSettings'
import { addToTimerList, clearAllTimer } from '@/oldjs/Timer'
import { getActiveTables } from 'aaden-base-model/lib/Models/AadenApi'
import PrinterList from 'aaden-base-model/lib/Models/PrinterList'
import TimeDisplay from '@/components/TimeDisplay'
import {
  fetchOrder,
  getColorLightness,
  getRestaurantInfo,
  getSectionList,
  getServantList,
  getTableListWithCells,
  openDrawer,
  updateSection
} from '@/oldjs/api'
import IKUtils from 'innerken-js-utils'
import Keyboard from '@/components/Keyboard'
import TableBluePrint from '@/components/TableBluePrint'
import { defaultSection } from '@/oldjs/defaultConst'
import debounce from 'lodash-es/debounce'
import SalesDialog from '@/components/fragments/SalesDialog'
import GridButton from '@/components/GridButton'
import MemberCardDialog from '@/components/fragments/MemberCardDialog'
import OpenTableForm from '@/components/OpenTableForm'
import { mapMutations, mapState } from 'vuex'
import UpdateFragment from '@/components/fragments/UpdateFragment'

const keyboardLayout =
  [
    '7', '8', '9', 'C',
    '4', '5', '6', 'mdi-account-box',
    '1', '2', '3', '',
    'W', '0', '.', 'OK'
  ]

const keyboardFunctions = {
  OpenTable: 'Bitte TischNr. Eingabe',
  ChangeServant: 'Neue password eingabe'
}

export default {
  name: 'IndexPage',
  directives: {
    dragscroll
  },
  components: {
    UpdateFragment,
    OpenTableForm,
    MemberCardDialog,
    GridButton,
    SalesDialog,
    TableBluePrint,
    Keyboard,
    TimeDisplay,
    Navgation
  },
  props: {
    refresh: {
      type: Number
    }
  },
  data: function () {
    return {
      tseStatus: true,
      tseInfo: '',
      servantPassword: '',
      showOpenTableDialog: null,
      salesDialogServantIsBoss: false,
      salesDialogServantPassword: null,
      isEditing: false,
      showRightMenu: GlobalConfig.showRightMenu,
      keyboardLayout: keyboardLayout,
      keyboardFunctions,
      currentKeyboardFunction: keyboardFunctions.OpenTable,
      NeededKeys,
      currentServant: { name: '' },
      menu: null,
      menu1: null,
      servantList: [],
      version: version,
      areas: [],
      buffer: '',
      restaurantInfo: {
        tableColor: '#fff',
        callColor: '#f06800'
      },
      ins: {},
      time: '',
      dishes: [],
      Config: GlobalConfig,
      falsePrinterList: [],
      tableList: [],
      sectionList: [],
      currentTable: null,
      currentSectionIndex: 0,
      salesDialogShow: false,
      memberCardDialogShow: false,
      memberCardInfo: {
        createdAt: '',
        leftAmount: 0,
        longId: '',
        id: ''
      },
      useBluePrintView: GlobalConfig.useTableBluePrint,
      useOrderView: GlobalConfig.orderView,
      loading: false
    }
  },
  watch: {
    useBluePrintView: function (val) {
      GlobalConfig.updateSettings('useTableBluePrint', val)
      this.refreshTables()
    },
    useOrderView: function (val) {
      GlobalConfig.updateSettings('orderView', val)
      this.refreshTables()
    },
    showRightMenu: function (val) {
      GlobalConfig.updateSettings('showRightMenu', val)
    },
    refresh: function () {
      this.initPage()
    }
  },
  computed: {
    ...mapState(['pinDialogShow']),
    activeTables () {
      return this.realArea.reduce((arr, a) => {
        arr.push(...a.tables)
        return arr
      }, []).filter(t => t.usageStatus === '1')
    },
    servantWithTable () {
      return this.servantList.map(s => {
        s.tables = this.activeTables.filter(t => t.servantId === s.id)
        return s
      })
    },
    tableGroupByServant () {
      return this.servantWithTable.filter(s => s.tables.length > 0)
    },
    servantWithoutTable () {
      return this.servantWithTable.filter(s => s.tables?.length === 0 ?? true)
    },

    tableInCurrentSection () {
      return this.tableList.filter(t => t.sectionId === this.currentSection.id)
    },
    realArea: function () {
      return this.areas.filter(a => a.tables.length > 0)
    },

    tableInCurrentSectionWithNoCell () {
      return this.tableInCurrentSection.filter(t => t.cells.length === 0)
    },

    orderList: function () {
      return [this.tableList.filter(t => t.sectionId !== this.currentSection.id),
        this.tableInCurrentSectionWithNoCell].flat().filter(t => t.usageStatus === '1')
    },

    hasBadPrint () {
      return this.falsePrinterList ? this.falsePrinterList.length > 0 : false
    },

    currentSection () {
      return this.sectionList[this.currentSectionIndex] ?? defaultSection
    }

  },
  methods: {

    tableForegroundColor (table) {
      return table.callService === '1' ? this.restaurantInfo.callColor : this.restaurantInfo.tableColor
    },
    tableBackgroundColor (table) {
      return table.callService === '1' ? this.restaurantInfo.callColor : GlobalConfig.activeCardBackground
    },
    tableColorIsDark (table, background = true) {
      return this.colorIsDark((background ? this.tableBackgroundColor(table) : this.tableForegroundColor(table)))
    },
    colorIsDark (color) {
      return getColorLightness(color) < 128
    },
    setLoading () {
      this.loading = true
      setTimeout(this.releaseLoading, 5000)
    },
    releaseLoading () {
      this.loading = false
    },
    openSalesDialog () {
      popAuthorize('',
        (pw) => {
          console.log(pw, 'password')
          const servant = this.findServant(pw)
          console.log(servant)
          this.salesDialogShow = true
          this.salesDialogServantIsBoss = parseInt(servant.permission) === 1
          this.salesDialogServantPassword = pw
        }, true)
    },
    async tryOpenTableUsePassword (password) {
      if (GlobalConfig.usePassword) {
        const res = await popAuthorize('')
        if (res !== password) {
          IKUtils.toast('Passwort Falsch', 'error')
          return
        }
      }
      this.showOpenTableDialog = true
      this.servantPassword = password
    },
    async memberCardCLicked () {
      popAuthorize('boss', () => {
        this.memberCardDialogShow = true
      })
    },
    setCurrentTable (table) {
      this.currentTable = table
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
        case 'mdi-account-box':
          this.currentKeyboardFunction = keyboardFunctions.ChangeServant
          break
        case 'OK':
          this.insDecode(this.readBuffer())
          this.buffer = ''
          break
      }
      this.input = this.displayInput
    },
    async takeawayClicked () {
      this.setLoading()
      const res = await popAuthorize() ?? GlobalConfig.defaultPassword
      try {
        if (res) {
          await requestOutTable(res)
        }
      } catch (e) {
      } finally {
        this.releaseLoading()
      }
    },
    findConsumeTypeColorById (id) {
      return findConsumeTypeById(id)?.color ?? '#367aeb'
    },
    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },
    getColorLightness,
    useCurrentConfig,
    hardReload,
    popAuthorize,
    fetchOrder,
    openDrawer,
    openOrEnterTable: openOrEnterTable,
    requestOutTable,
    resetTableStatus,
    ...mapMutations(['HIDE_DIALOG']),
    initialUI () {
      this.$refs.ins.focus()
      this.HIDE_DIALOG()
      this.currentKeyboardFunction = keyboardFunctions.OpenTable
      blockReady()
    },
    playSound (count = 3) {
      count -= 1
      if (count >= 0) {
        setTimeout(() => {
          IKUtils.play('/Resource/ding.m4a')
          this.playSound(count)
        }, 100)
      }
    },
    async refreshTables () {
      if (this.useBluePrintView) {
        this.tableList = await getTableListWithCells()
      } else {
        this.areas = await getActiveTables()
        for (const a of this.areas) {
          if (a.tables.some(t => t.callService === '1' && t.usageStatus === '1')) {
            this.playSound()
            break
          }
        }
      }
    },
    async refreshPrinterList () {
      const res = (await getFalsePrinterList()) ?? []
      this.falsePrinterList = res.filter(item => {
        return item.printStatus !== '4'
      })
    },
    async reprintAll () {
      this.loading = true
      try {
        await Promise.all(this.falsePrinterList.map(async (i) => {
          await this.reprintBon(i)
        }))
      } catch (e) {

      } finally {
        this.loading = false
      }
    },
    async reprintBon (item) {
      await PrinterList.reprint(item)
    },
    listenKeyDown (e) {
      if (Swal.isVisible()) {
        Swal.clickConfirm()
        return
      }

      switch (e.key) {
        case 'Escape':
          this.back()
          break
        case 'Enter': {
          this.insDecode(this.readBuffer())
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
    findServant (pw) {
      if (this.servantList.length > 0) {
        return this.servantList.find(s => s.password === pw)
      }
    },
    async insDecode (t) {
      if (this.currentKeyboardFunction === keyboardFunctions.OpenTable) {
        if (this.anyMenuOpen()) {
          return
        }
        if (t !== '') {
          const escapeStr = '--//'
          if (t.startsWith(escapeStr)) {
            t = t.substr(escapeStr.length)
            if (t.startsWith('d')) {
              t = t.substr(1)
              setDeviceId(t)
            }
            if (t === 'c') {
              GlobalConfig.Protocol = 'http://'
              useCurrentConfig()
            } else if (t === 'h') {
              GlobalConfig.Protocol = 'https://'
              useCurrentConfig()
            }
            if (t.startsWith('f/')) {
              t = t.substr(2)
              // eslint-disable-next-line no-eval
              eval(t)
            }
          } else if (t.toLowerCase() === 'w') {
            popAuthorize('', requestOutTable)
          } else if (t === 'l') {
            popAuthorize('', this.toManage)
          } else {
            this.openOrEnterTable(t)
          }
        }
      } else {
        if (t !== '') {
          const servant = this.findServant(t)
          this.readBuffer(true)
          if (!servant) {
            toastError('Passwort ist nicht gült')
            return
          }
          GlobalConfig.updateSettings('defaultPassword', t)
          GlobalConfig.defaultPassword = t
          console.log(GlobalConfig.defaultPassword)
          this.currentServant = servant
          this.currentKeyboardFunction = keyboardFunctions.OpenTable
        }
      }
    },
    async saveCurrentSection () {
      await updateSection(this.currentSection)
      toast()
      await getSectionList()
      this.isEditing = false
    },
    toManage () {
      oldJumpTo('admin/index.html', {
        DeviceId: GlobalConfig.DeviceId,
        lang: GlobalConfig.lang,
        Base: GlobalConfig.Base
      })
    },
    anyMenuOpen () {
      return Swal.isVisible() || this.menu || this.memberCardDialogShow || this.pinDialogShow
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
      this.sectionList = await getSectionList()
    },
    async checkTse () {
      this.tseStatus = true
      this.tseInfo = 'OK'
    },
    async initPage () {
      window.onkeydown = this.listenKeyDown
      this.refreshTables()
      this.refreshPrinterList()
      getAllDishes()
      this.checkTse()
      await getConsumeTypeList()
      const list = [
        setInterval(this.refreshTables, 5000),
        setInterval(this.refreshPrinterList, 5000)
      ]
      if (GlobalConfig.getFocus) {
        list.push(setInterval(this.autoGetFocus, 1000))
      }
      list.map(addToTimerList)
    }
  },
  mounted: async function () {
    this.initPage()

    this.restaurantInfo = Object.assign(this.restaurantInfo, (await getRestaurantInfo()).content[0])
    this.servantList = await getServantList()
    await this.refreshSectionList()
    if (GlobalConfig.defaultPassword) {
      this.currentServant = this.findServant(GlobalConfig.defaultPassword)
    }
  },
  created () {
    this.debounceUpdateSection = debounce(updateSection, 500)
  },
  beforeDestroy () {
    clearAllTimer()
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

.tableCard {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 6px 8px #d0d2d9;
}

.tableCard.notUsed {
  background: transparent;
  color: #6b6b6b;
  border: 3px solid #e2e3e5;
  box-shadow: none;
}

.tableBold {
  font-weight: 600;
}

.tableCardName {
  font-size: 28px;
  padding: 0 4px;
  text-align: left;
  font-family: Roboto, "Axure Handwriting", sans-serif;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tableCard.notUsed .tableCardName {
  font-weight: 400;
}

.tableIconRow {
  width: 42px;
  height: 25px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
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
