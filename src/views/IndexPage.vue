<template>
  <div>
    <navgation>
      <v-tabs grow v-model="currentView">
        <v-tabs-slider color="transparent"></v-tabs-slider>
        <v-tab active-class="primary white--text">
          <v-badge overlap color="error" :content="activeList.length">
            <div class="px-3">
              <v-icon class="mr-2">mdi-silverware</v-icon>
              堂食
            </div>
          </v-badge>
        </v-tab>
        <v-tab active-class="warning  white--text">
          <v-badge color="warning" overlap :content="takeawayList.length">
            <div class="px-3">
              <v-icon class="mr-2">mdi-truck-fast</v-icon>
              外卖
            </div>
          </v-badge>
        </v-tab>
        <v-tab active-class="purple  white--text">
          <v-icon class="mr-2">mdi-account</v-icon>
          跑堂订单
        </v-tab>
        <v-tab active-class="info  white--text">
          <v-icon class="mr-2">mdi-calendar</v-icon>
          预定
        </v-tab>
        <v-tab @click.stop="openSalesDialog" active-class="success  white--text">
          <v-icon class="mr-2">mdi-cash</v-icon>
          {{ $t('销售额') }}
        </v-tab>
        <v-tab @click.stop="  popAuthorize('boss',toManage)" active-class="pink  white--text">
          <v-icon class="mr-2">mdi-home-analytics</v-icon>
          {{ $t('CHEF') }}
        </v-tab>

      </v-tabs>
      <v-btn elevation="0" :loading="loading" @click="reprintAll" v-hide-simple v-if="hasBadPrint" color="error">
        <v-icon left>mdi-printer-off</v-icon>
        {{ $t('Erneut Drücken') + " " + falsePrinterList.length }}
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

    </navgation>
    <v-main style=" width: 100vw;">
      <v-tabs-items touchless v-model="currentView">
        <!--        堂食-->
        <v-tab-item style="position: relative">
          <div style="height: calc(100vh - 48px);width: 100%;overflow: scroll">
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
          <div style="
           position: fixed;
           bottom: 0;
           max-width:100vw;
           z-index: 10">
            <v-item-group style="width: max-content" v-model="bottomTabIndex">
              <v-card class="d-flex">
                <v-item #default="{active,toggle}">
                  <v-card :color="active?'':'transparent'" class="pa-2" :dark="active" elevation="0"
                          @click="shouldHideBottomBar(0,toggle)">
                    <v-badge overlap :dot="showOtherOrder&&bottomTabIndex===0" color="error"
                             :content="takeawayList.length">
                      <div class="pa-1">
                        <v-icon left>mdi-truck-fast</v-icon>
                        {{ $t('Togo') }}
                      </div>
                    </v-badge>
                  </v-card>

                </v-item>
                <v-item @click="shouldHideBottomBar(1)" #default="{active,toggle}">
                  <v-card :color="active?'':'transparent'" class="pa-2" :dark="active" elevation="0"
                          @click="shouldHideBottomBar(1,toggle)">

                    <div class="pa-1">
                      <v-icon left>mdi-view-grid</v-icon>
                      分区
                    </div>

                  </v-card>

                </v-item>
                <v-item @click="shouldHideBottomBar(2)" #default="{active,toggle}">
                  <v-card :color="active?'':'transparent'" class="pa-2" :dark="active" elevation="0"
                          @click="shouldHideBottomBar(2,toggle)">
                    <v-badge overlap :dot="showOtherOrder&&bottomTabIndex===2" color="error"
                             :content="takeawayList.length">
                      <div class="pa-1">
                        <v-icon left>mdi-calendar</v-icon>
                        预定
                      </div>
                    </v-badge>
                  </v-card>
                </v-item>
              </v-card>
            </v-item-group>
            <v-tabs-items touchless v-model="bottomTabIndex" v-if="showOtherOrder">
              <v-tab-item>
                <v-card
                    v-dragscroll
                    elevation="2"
                    class="flex-shrink-0 pa-2"
                    style="
             display: grid;
             grid-template-rows: auto;
              overflow-x: scroll;
            grid-auto-columns: min-content;
            grid-gap: 8px;z-index: 2;grid-auto-flow: column">
                  <table-gird-item
                      style="width: 136px"
                      v-for="table in takeawayList"
                      @click="openOrEnterTable(table.tableName)"
                      :key="table.id" :table-info="table"
                  >
                  </table-gird-item>
                </v-card>
              </v-tab-item>
              <v-tab-item>
                <v-card
                    v-dragscroll
                    elevation="2"
                    class="flex-shrink-0 pa-2"
                >
                  <v-item-group mandatory v-model="currentSectionIndex" style="
             display: grid;
             grid-template-rows: auto;
              overflow-x: scroll;
            grid-auto-columns: min-content;
            grid-gap: 8px;z-index: 2;grid-auto-flow: column">
                    <v-item :key="area.id" v-for="area in notTakeawaySection" #default="{active,toggle}">
                      <v-card @click="toggle"
                              :width="64" elevation="0"
                              outlined
                              :dark="active"
                              :color="active?'primary':''"
                              rounded class="pa-2">
                        <v-responsive :aspect-ratio="1">
                          <div class="d-flex align-center justify-center text-center" style="height: 100%">
                            {{ area.name }}
                          </div>

                        </v-responsive>
                      </v-card>
                    </v-item>
                  </v-item-group>

                </v-card>
              </v-tab-item>
            </v-tabs-items>
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
                  height="calc(100vh - 48px)">
            <template v-for="servant in servantWithTable">
              <v-card elevation="0" height="calc(100vh - 48px);" color="transparent"
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
                     style="height: calc(100vh - 120px);overflow: scroll;display: grid;grid-auto-rows: 48px;
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
          <iframe width="100%" :src="'/admin/index.html?Base='+Config.Base+'&lang='+Config.lang"
                  style="height: calc(100vh - 48px)"></iframe>
        </v-tab-item>

      </v-tabs-items>
      <!--        下面是侧边栏的逻辑-->
    </v-main>

    <v-card class="pa-2" style="position: fixed;right: 0;bottom:0;width: 320px">

      <v-text-field
          :placeholder=" $t('请输入桌号')"
          @click:append="showKeyboard=!showKeyboard"
          append-icon="mdi-keyboard"
          class="ma-2 pt-1"
          hide-details
          style="font-size: 24px"
          ref="ins"
          v-model="buffer"
          :autofocus="Config.getFocus"
      />

      <keyboard v-if="showKeyboard" @input="numberInput" :keys="keyboardLayout"/>
    </v-card>

    <open-table-form :servant-password="servantPassword" :menu-show.sync="showOpenTableDialog"></open-table-form>
    <sales-dialog
        @visibility-changed="(e)=>salesDialogShow=e"
        :sales-dialog-show="salesDialogShow"
        :is-boss="salesDialogServantIsBoss"
        :password="salesDialogServantPassword"
    />
    <template v-if="false">
      <div class="d-flex pa-2  pt-4 align-center caption">
        <time-display/>
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
      <v-btn @click="isEditing=!isEditing" :dark="isEditing">
        <v-icon>mdi-pencil-box</v-icon>
      </v-btn>
      <v-btn @click="saveCurrentSection()" color="primary" v-if="isEditing">
        <v-icon left>mdi-check</v-icon>
        {{ $t('Save') }}
      </v-btn>
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
import OpenTableForm from '@/components/OpenTableForm'
import { mapMutations, mapState } from 'vuex'
import TableListItem from '@/components/Table/TableListItem'
import draggable from 'vuedraggable'
import TableGirdItem from '@/components/Table/TableGridItem'
import { TableFixedSectionId } from '@/api/tableService'
import Navgation from '@/components/Navgation'

const keyboardLayout =
    [
      '7', '8', '9', 'C',
      '4', '5', '6', 'mdi-cash-lock-open',
      '1', '2', '3', '',
      'W', '0', '.', 'OK'
    ]

export default {
  name: 'IndexPage',
  directives: {
    dragscroll
  },
  components: {
    Navgation,
    TableGirdItem,
    TableListItem,
    OpenTableForm,
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
      tableInfoDisplayOrder: GlobalConfig.getTableInfoKeys(),
      bottomTabIndex: 0
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
    shouldHideBottomBar (index, toggle) {
      if (this.bottomTabIndex === index) {
        this.showOtherOrder = !this.showOtherOrder
      } else {
        this.showOtherOrder = true
      }
      toggle()
    },
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
