<template>
  <div>
    <navgation>
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
              <span class="error white--text ml-2"
                    style="padding:2px 8px;font-size: small;border-radius: 24px">{{ activeList.length }}</span>
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
              <span class="error white--text ml-2"
                    style="font-size: small;border-radius: 24px;padding: 2px 8px">{{ takeawayList.length }}</span>
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
        <v-btn elevation="0" :loading="loading" @click="reprintAll" v-hide-simple v-if="hasBadPrint" color="error">
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
      </template>

    </navgation>
    <v-tabs-items touchless v-model="currentView">
      <!--        堂食-->
      <v-tab-item style="position: relative">
        <div style="
          height: calc(100vh - 64px);
          width: 100%;
          overflow: scroll
">
          <template>
            <table-blue-print
                @edit-table-clicked="showEditTableDialog"
                @table-clicked="openOrEnterTable"
                @need-refresh="refreshTables"
                :out-side-table-list="tableInCurrentSection"
                :editing.sync="isEditing"
                :current-table.sync="currentTable"
                :current-section="currentSection"/>
          </template>
        </div>
        <v-card
            color="white"
            class="d-flex"
            style="position: fixed;bottom: 48px;
              box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.08);
                right: 0;
                margin: auto;
                width: min-content;
                border-radius: 8px;
                          left: 0;max-width: calc(100vw - 684px);
                          z-index: 15;">
          <v-btn @click="isEditing=!isEditing" :dark="isEditing">
            <v-icon>mdi-pencil-box</v-icon>
          </v-btn>
          <v-btn @click="saveCurrentSection()" color="primary" v-if="isEditing">
            <v-icon left>mdi-check</v-icon>
            {{ $t('Save') }}
          </v-btn>
          <v-item-group v-dragscroll v-model="currentSectionIndex"
                        mandatory
                        style="display: grid;
                          grid-auto-columns: max-content;
                          grid-gap: 8px;
                          grid-auto-flow: column;overflow-x: scroll">

            <v-item v-for="section of notTakeawaySection" v-bind:key="section.id+'categorytypes'" v-slot="{active,toggle}">
              <v-card :elevation="active?4:0"
                      style="border-radius: 8px"
                      class="px-6 py-2 text-body-1" @click="toggle"
                      :dark="active">{{ section.name }}
              </v-card>
            </v-item>
          </v-item-group>
        </v-card>

        <div style="
           position: absolute;
           right: 8px;
           top:8px;
           width: 240px;
           z-index: 10">
          <v-card elevation="0"
                  @click="showOtherOrder=!showOtherOrder"
                  class="head d-flex align-center pa-2">
            <h4>
              <v-icon left>mdi-truck-fast</v-icon>
              {{ $t('Togo') }}
            </h4>
            <v-spacer>
            </v-spacer>
            <span class="error white--text ml-2"
                  style="padding:2px 8px;font-size: small;border-radius: 24px">{{ takeawayList.length }}</span>
            <toggle-up-down-button :expand="showOtherOrder"/>
          </v-card>
          <div
              v-if="showOtherOrder"
              v-dragscroll
              class="flex-shrink-0 mt-2"
              style="
             display: grid;
              overflow-y: scroll;
            grid-auto-columns: auto;
            max-height: 400px;
            grid-gap: 8px;
                ">
            <table-gird-item
                v-for="table in takeawayList"
                @click="openOrEnterTable(table.tableName)"
                :key="table.id" :table-info="table"
            >
            </table-gird-item>
          </div>
        </div>
      </v-tab-item>
      <!--        外卖-->
      <v-tab-item></v-tab-item>
      <!--        跑堂-->
      <v-tab-item>
        <v-card v-dragscroll
                color="#f5f6fa"
                class="flex-grow-1 d-flex"
                style="overflow: scroll"
                height="calc(100vh - 64px)">
          <template v-for="servant in servantWithTable">
            <v-card elevation="0" height="calc(100vh - 64px);" color="transparent"
                    :key="servant.id">
              <v-toolbar @click="tryOpenTableUsePassword(servant.password)" elevation="0" color="blue lighten--4" dark
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
      </v-tab-item>
      <!--        预定-->
      <v-tab-item></v-tab-item>
      <!--        销售额-->
      <v-tab-item></v-tab-item>
      <!--        老板后台-->
      <v-tab-item>

      </v-tab-item>

    </v-tabs-items>
    <v-card class="pa-2 py-6"
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
    <sales-dialog
        @visibility-changed="(e)=>salesDialogShow=e"
        :sales-dialog-show="salesDialogShow"
        :is-boss="salesDialogServantIsBoss"
        :password="salesDialogServantPassword"
    />

    <template v-if="false">
      <div style="position: fixed;right: 0;top:64px">
        <div class="d-flex pa-2  pt-4 align-center caption">
          <time-display/>
        </div>
      </div>

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

      <grid-button
          @click="takeawayClicked"
          icon=" mdi-truck-fast"
          :text="$t('takeaway')"
          :loading="loading"
          color="#ff8c50"
      />
    </template>

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
import {
  fetchOrder,
  getColorLightness,
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
import SalesDialog from '@/components/fragments/salesDialog/SalesDialog'
import GridButton from '@/components/GridButton'
import MemberCardDialog from '@/components/fragments/MemberCardDialog'
import { mapMutations, mapState } from 'vuex'
import TableListItem from '@/components/Table/TableListItem'
import draggable from 'vuedraggable'
import TableGirdItem from '@/components/Table/TableGridItem'
import { TableFixedSectionId } from '@/api/tableService'
import Navgation from '@/components/Navgation'
import ToggleUpDownButton from '@/components/widget/ToggleUpDownButton'

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
    ToggleUpDownButton,
    Navgation,
    TableGirdItem,
    TableListItem,
    MemberCardDialog,
    GridButton,
    SalesDialog,
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
      servantPassword: '',
      showOpenTableDialog: null,
      salesDialogServantIsBoss: false,
      salesDialogServantPassword: null,
      isEditing: false,
      showRightMenu: GlobalConfig.showRightMenu,
      keyboardLayout: keyboardLayout,

      NeededKeys,
      currentServant: { name: '' },
      menu: null,
      menu1: null,
      servantList: [],
      version: version,

      buffer: '',
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
      currentView: 0,
      useOrderView: GlobalConfig.orderView,
      showOtherOrder: GlobalConfig.showOtherOrder,
      loading: false,
      tableInfoDisplayOrder: GlobalConfig.getTableInfoKeys()

    }
  },
  watch: {
    useOrderView: function (val) {
      GlobalConfig.updateSettings('orderView', val)
      this.refreshTables()
    },
    tableInfoDisplayOrder: function (val) {
      GlobalConfig.updateSettings('tableInfoDisplayOrder', val)
      refreshGetter()
      this.refreshTables()
    },
    showRightMenu: function (val) {
      GlobalConfig.updateSettings('showRightMenu', val)
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
    tableGroupByServant () {
      return this.servantWithTable.filter(s => s.tables.length > 0)
    },
    servantWithoutTable () {
      return this.servantWithTable.filter(s => s.tables?.length === 0 ?? true)
    },

    tableInCurrentSection () {
      return this.tableList.filter(t => t.sectionId === this.currentSection.id)
    },

    activeList: function () {
      return this.tableList.filter(TableFixedSectionId.notTogoFilter).filter(t => t.usageStatus === '1')
    },

    takeawayList: function () {
      return this.tableList.filter(TableFixedSectionId.togoFilter)
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
    changeLanguage: forceChangeLanguage,
    showEditTableDialog (tableInfo) {
      console.log(tableInfo)
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
          const servant = this.findServant(pw)
          this.salesDialogShow = true
          this.salesDialogServantIsBoss = parseInt(servant.permission) === 1
          this.salesDialogServantPassword = pw
        }, true)
    },
    async tryOpenTableUsePassword (password) {
      if (GlobalConfig.usePassword) {
        const res = await popAuthorize('')
        if (res !== password) {
          IKUtils.toast(this.$t('Passwort Falsch'), 'error')
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
        case 'mdi-cash-lock-open':
          this.openDrawer()
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
      blockReady()
    },
    async refreshTables () {
      this.tableList = await getTableListWithCells()
      console.log(this.tableList)
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
      if (this.anyMenuOpen()) {
        return
      }
      if (t !== '') {
        if (t.toLowerCase() === 'w') {
          popAuthorize('', requestOutTable)
        } else if (t === 'l') {
          popAuthorize('', this.toManage)
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
    toManage () {
      oldJumpTo('admin/index.html', {
        DeviceId: GlobalConfig.DeviceId,
        lang: GlobalConfig.lang,
        Base: GlobalConfig.Base
      })
    },
    anyMenuOpen () {
      return Swal.isVisible() || this.menu || this.memberCardDialogShow || this.pinDialogShow || this.salesDialogShow
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
      await getAllDishes()
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
    if (GlobalConfig.defaultPassword) {
      this.currentServant = this.findServant(GlobalConfig.defaultPassword)
    }
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
