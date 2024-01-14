<template>
  <div>

    <v-app-bar
        class="pt-1"
        color="transparent"
        dark
        elevation="0"
        height="56"
    >
      <restaurant-logo-display></restaurant-logo-display>
      <v-spacer></v-spacer>
      <v-item-group
          v-model="currentView"
          class="align-self-center"
          mandatory
          style="width: max-content"
      >
        <div style="display: grid;grid-gap: 8px;grid-auto-flow: column">
          <v-item #default="{active,toggle}">
            <div
                :class="active?' active':''"
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
                :class="active?' active':''"
                class="navigationPillItem"
                @click="toggle"
            >
              <v-icon left>mdi-truck-fast</v-icon>
              {{ $t('PickUpAndDeliveryService') }}
              <trailing-number>
                {{ takeawayList.length }}
              </trailing-number>
            </div>
          </v-item>
          <v-item #default="{active,toggle}">
            <div
                :class="active?' active':''"
                class="navigationPillItem"
                @click="toggle"
            >
              <v-icon left>mdi-account</v-icon>
              <span style="padding: 2px 4px">{{ $t('Employees') }}</span>
            </div>
          </v-item>
        </div>
      </v-item-group>
      <v-spacer></v-spacer>
      <div
          class="d-flex align-center justify-end"
          style="min-width: 200px"
      >
        <div>
          <time-display></time-display>
        </div>
        <v-btn
            icon
            @click="checkStaffStatus"
        >
          <v-icon>mdi-cards</v-icon>
        </v-btn>
        <v-btn
            icon
            @click="openDrawer"
        >
          <v-icon>mdi-lock-open</v-icon>
        </v-btn>
        <language-switcher
            :active="changeLanguage"
            :current-locale-code="currentLocaleCode"
            :locales="$i18n.messages"
            @language-change="changeLanguage"
        />
      </div>
    </v-app-bar>

    <v-card
        color="transparent"
        elevation="0"
        class="mt-2"
        height="calc(100vh - 64px)"
        rounded
    >
      <v-card style="border-radius: 12px 12px 0px 0px !important;overflow: hidden">
        <v-tabs-items
            v-model="currentView"
            touchless
        >

          <!--        堂食-->
          <v-tab-item style="position: relative">
            <div
                style="
        background: #e8e8e8;
          height: calc(100vh - 64px);
          width: 100%;
          overflow: scroll
"
            >
              <table-blue-print
                  :out-side-table-list="tableList"
                  @need-refresh="refreshTables"
                  @table-clicked="openOrEnterTable"
              />
            </div>
          </v-tab-item>
          <!--      外卖-->
          <v-tab-item>
            <div
                class="pa-4 grey lighten-4"
                style="display: grid;grid-template-columns: repeat(4,calc(25% - 12px));
        height: 100%;grid-gap: 16px;"
            >
              <v-card
                  class="pa-4 d-flex flex-column"
                  color="grey lighten-3"
                  elevation="0"
                  height="calc(100vh - 96px)"
                  style="border-radius: 12px"
                  width="100%"
              >
                <div class="text-subtitle-2">{{ $t('NotReceivedOrders') }}
                  <trailing-number>
                    {{ notAccepted.length }}
                  </trailing-number>
                </div>
                <div
                    class="mt-4"
                    style="display: grid;grid-gap: 12px;overflow-y: scroll;
                    max-height:calc(100vh - 150px) ;"
                >
                  <takeaway-order-item
                      v-for="t in notAccepted"
                      :key="t.tableName"
                      :big-card="true"
                      :table-info="t"
                      @accept="acceptOrder"
                      @click="openOrEnterTable(t.tableName)"
                      @reject="rejectOrder"
                  />
                </div>

              </v-card>
              <v-card
                  class="pa-4 d-flex flex-column"
                  color="grey lighten-3"
                  elevation="0"
                  height="calc(100vh - 96px)"
                  style="border-radius: 12px"
                  width="100%"
              >
                <div class="text-subtitle-2">{{ $t('ReceivedOrders') }}
                  <trailing-number>
                    {{ accepted.length }}
                  </trailing-number>
                </div>
                <div
                    class="mt-4"
                    style="display: grid;grid-gap: 12px;overflow-y: scroll;
                    max-height:calc(100vh - 150px) ;"
                >
                  <takeaway-order-item
                      v-for="t in accepted"
                      :key="t.tableName"
                      :big-card="true"
                      :table-info="t"
                      @checkout="checkoutForTable(t.tableId,t.totalPrice)"
                      @click-ok="updateStatus(t.id)"
                      @click="openOrEnterTable(t.tableName)"
                  />
                </div>

              </v-card>
              <v-card
                  class="pa-4"
                  color="grey lighten-3"
                  elevation="0"
                  height="calc(100vh - 96px)"
                  style="border-radius: 12px"
              >
                <div class="text-subtitle-2">{{ $t('CanBePickedUp') }}
                  <trailing-number>{{ picked.length }}</trailing-number>
                </div>
                <div
                    class="mt-4"
                    style="display: grid;grid-gap: 12px;overflow-y: scroll;
                    max-height:calc(100vh - 150px) ;"
                >
                  <takeaway-order-item
                      v-for="t in picked"
                      :key="t.tableName"
                      :big-card="true"
                      :table-info="t"
                      @checkout="checkoutForTable(t.tableId,t.totalPrice)"
                      @click="openOrEnterTable(t.tableName)"
                  />
                </div>

              </v-card>
              <div
                  class="d-flex flex-column"
                  style="height: calc(100vh - 96px)"
              >
                <v-card
                    class="pa-4"
                    color="success"
                    dark
                    elevation="0"
                    style="border-radius: 12px"
                    @click="takeawayClicked"
                >
                  <div class="text-subtitle-2 d-flex align-center">
                    <v-icon class="mr-2">mdi-truck-fast</v-icon>
                    {{ $t('AddTakeawayOrders') }}
                    <v-spacer></v-spacer>
                    <v-icon>mdi-plus</v-icon>
                  </div>

                </v-card>

                <v-card
                    class="pa-4 mt-4"
                    color="white"
                    elevation="0"
                    style="border-radius: 12px"
                >
                  <div class="text-subtitle-2 d-flex">{{ $t('TakeawayWebsiteSetting') }}
                    <v-spacer></v-spacer>
                    <template v-if="loading">
                      <v-progress-circular indeterminate></v-progress-circular>
                    </template>
                    <template v-else>
                      <v-chip
                          class="ml-2 d-flex align-center"
                          color="white"
                          label
                          small
                      >
                        <v-icon
                            color="success"
                            left
                        >mdi-checkbox-marked-circle
                        </v-icon>
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
                      <v-switch
                          v-model="takeawayEnabled"
                          class="mt-0"
                          hide-details
                      ></v-switch>
                    </div>
                  </div>

                </v-card>

                <v-card
                    class="pa-4 flex-grow-1 mt-4"
                    color="grey lighten-3"
                    elevation="0"
                    style="border-radius: 12px"
                >
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
            <v-card
                v-dragscroll
                class="flex-grow-1 d-flex"
                color="#f5f6fa"
                height="calc(100vh - 64px)"
                style="overflow: scroll"
            >
              <template v-for="servant in servantWithTable">
                <v-card
                    :key="servant.id"
                    color="transparent"
                    elevation="0"
                    height="calc(100vh - 64px);"
                >
                  <v-toolbar
                      class="flex-grow-0 ml-1 mb-1 mt-1"
                      color="blue lighten--4"
                      dark
                      dense
                      elevation="0"
                      style="width: 196px;"
                  >
                    <v-toolbar-title
                        class="d-flex align-center"
                        style="width: 100%"
                    >
                      <div>{{ servant.name }}</div>
                      <v-spacer></v-spacer>
                      <div
                          class="d-flex align-center"
                          style="font-size: small"
                      >
                        <v-icon small>mdi-food</v-icon>
                        /
                        <v-icon small>mdi-cup-water</v-icon>
                        /
                        <v-icon small>mdi-cash-multiple</v-icon>
                      </div>
                    </v-toolbar-title>
                  </v-toolbar>
                  <div
                      v-dragscroll
                      style="height: calc(100vh - 120px);overflow: scroll;display: grid;grid-auto-rows: 64px;
                 grid-template-columns: 100%;grid-gap: 4px"
                  >
                    <template v-for="table in servant.tables">
                      <table-list-item
                          :key="table.id"
                          :table-info="table"
                          @click="openOrEnterTable(table.tableName)"
                      >
                      </table-list-item>
                    </template>
                  </div>

                </v-card>

              </template>
            </v-card>
            <v-card
                class="pa-2"
                style="position: fixed;right: 0;bottom:0;width: 320px;z-index: 15"
            >
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
              <keyboard-layout
                  v-if="showKeyboard"
                  :keys="keyboardLayout"
                  @input="numberInput"
              />
            </v-card>
          </v-tab-item>
          <!--        预定-->

        </v-tabs-items>
        <v-card
            v-if="buffer"
            class="pa-4"
            style="position:fixed;top: 0;right: 0;
            margin: auto;
            left: 0;bottom: 0;
            min-width: 300px;
            max-width:calc(100vw - 200px);
            text-align: center;
            border-radius: 12px;
            z-index: 15;width: fit-content;height: fit-content"
        >
          <div>
            <h1>{{ buffer }}</h1>
          </div>
          <div
              class="text-caption text--secondary"
              style="font-size: 14px !important;"
          >
            {{ $t('PressESCToEnterWindow') }}<br>
            {{ $t('PressESCToCloseWindow') }}
          </div>

        </v-card>
        <v-dialog
            v-model="noNetwork"
            fullscreen
        >
          <v-card tile>
            <v-card
                class="pa-4"
                height="100vh"
                width="100vw"
            >
              <no-content-display
                  :desc="$t('CheckNetworkOrCallCustomerService')"
                  :title="$t('NoConnectionLocalOrRemote')"
                  icon="mdi-wifi-sync"
              >
                <v-btn
                    class="mt-4"
                    elevation="0"
                    @click="reload"
                >
                  <v-icon left>mdi-refresh</v-icon>
                  {{ $t('reload') }}
                </v-btn>
              </no-content-display>
            </v-card>
          </v-card>
        </v-dialog>
      </v-card>

    </v-card>
    <v-dialog
        v-model="showServantStatus"
        max-width="400px"
    >
      <v-card
          class="text-body-1 pa-6"
          elevation="0"
          style="overflow: visible;"
      >
        <div class="d-flex  align-center mb-8">
          <restaurant-logo-display/>
          <v-spacer/>
          <div>
            <v-btn
                small
                icon
                @click="showServantStatus = false"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </div>
        </div>
        <template v-if="clockStatus">
          <div
              v-for="item in servantWorkInfo"
              :key="item.id"
          >
            <div class="d-flex mt-2">
              <div class="text-body-2">{{ item.display }}:</div>
              <v-spacer></v-spacer>
              <div class="text-body-1 text-right">{{ item.value }}</div>
            </div>
          </div>
          <div class="d-flex mt-4 justify-center align-center">
            <div class="text-body-2">{{ $t('note') }}:</div>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="note"
                dense
                hide-details
                outlined
            />
          </div>
          <div class="d-flex align-center justify-center mt-8">
            <v-btn
                x-large
                color="primary"
                elevation="0"
                width="100%"
                @click="endWorks"
            >
              {{ $t('ShiftStampOut') }}
            </v-btn>
          </div>
        </template>
        <template v-else>
          <v-btn
              x-large
              color="primary"
              elevation="0"
              width="100%"
              @click="gotoWork"
          >
            {{ $t('ShiftStampIn') }}
          </v-btn>
        </template>
      </v-card>
    </v-dialog>

  </div>
</template>

<script>
import { version } from '../../../package.json'
import {
  findConsumeTypeById,
  getConsumeTypeList,
  openOrEnterTable,
  popAuthorize,
  requestOutTable
} from '@/oldjs/common'
import Swal from 'sweetalert2'
import { dragscroll } from 'vue-dragscroll'

import GlobalConfig, { changeLanguage } from '../../oldjs/LocalGlobalSettings'
import LanguageSwitcher from '@/views/Widget/LanguageSwitcher'

import { getServantList, getTableListWithCells, openDrawer } from '@/oldjs/api'

import { mapActions, mapMutations } from 'vuex'
import { TableFixedSectionId } from '@/api/tableService'

import { acceptOrder, loadRestaurantInfo, readyToPick, rejectOrder, syncTakeawaySettingToCloud } from '@/api/api'
import { Remember } from '@/api/remember'
import KeyboardLayout from '@/components/Base/Keyboard/KeyboardLayout'
import TrailingNumber from '@/views/FirstPage/widget/TrailingNumber'
import TableBluePrint from '@/views/FirstPage/Table/Table/TableBluePrint'
import TimeDisplay from '@/components/Base/TimeDisplay'
import TakeawayOrderItem from '@/views/FirstPage/Table/Table/Item/TakeawayOrderItem'
import TableListItem from '@/views/FirstPage/Table/Table/Item/TableListItem'
import NoContentDisplay from '@/views/FirstPage/widget/NoContentDisplay.vue'
import { addToQueue } from '@/oldjs/poolJobs'
import { endWork, servantWorkStatus, startWork } from '@/api/servantRecords'
import dayjs from 'dayjs'
import IKUtils from 'innerken-js-utils'
import RestaurantLogoDisplay from '@/components/RestaurantLogoDisplay.vue'
import { checkout } from '@/api/Repository/OrderInfo'

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
    RestaurantLogoDisplay,
    NoContentDisplay,
    KeyboardLayout,
    TakeawayOrderItem,
    TrailingNumber,
    TableListItem,
    TableBluePrint,
    TimeDisplay,
    LanguageSwitcher
  },
  props: {
    refresh: {
      type: Number
    }
  },
  data: function () {
    return {
      clockStatus: false,
      note: '',
      servantWorkStatus: null,
      servant: {},
      showServantStatus: false,
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
      loading: false,
      lock: false

    }
  },
  watch: {
    showServantStatus (val) {
      if (!val) {
        this.note = ''
      }
    },
    currentView (val) {
      Remember.currentView = val
    },
    showOtherOrder: function (val) {
      Remember.showOtherOrder = val
      this.refreshTables()
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
    servantWorkMinutes () {
      return dayjs(dayjs().format('YYYY-MM-DD HH:mm:ss')).diff(dayjs(this.servantWorkStatus?.fromDateTime), 'minute') ?? 0
    },
    servantWorkInfo () {
      return [{
        value: this.servant?.name,
        display: this.$t('Employees'),
        id: 1
      },
      {
        value: this.servantWorkStatus?.fromDateTime,
        display: this.$t('StartsWorkingAt'),
        id: 2
      },
      {
        value: this.servantWorkMinutes,
        display: this.$t('WorkTimeInMinutes'),
        id: 3
      },
      {
        value: this.servantWorkStatus?.currentHourlyWage,
        display: this.$t('HourlyWage'),
        id: 4
      },
      {
        value: this.servantWorkStatus?.correctionDisplay,
        display: this.$t('IsThisReplacementCard'),
        id: 5
      }]
    },
    activeTables () {
      return this.tableList.filter(t => t.usageStatus === '1')
    },
    servantWithTable () {
      return this.servantList.map(s => {
        s.tables = this.activeTables.filter(t => t.servantId === s.id)
        return s
      }).filter(s => s.tables.length > 0)
    },
    currentLocaleCode () {
      return this.$i18n.locale
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
    }
  },
  methods: {
    async gotoWork () {
      this.servantWorkStatus = await startWork(this.servant.id, '')
      if (this.servantWorkStatus.correction === 0) {
        this.servantWorkStatus.correctionDisplay = this.$t('ReplacementCard')
      } else {
        this.servantWorkStatus.correctionDisplay = this.$t('YouCanStampInNormal')
      }
      IKUtils.toast(this.$t('SuccessfullyCommitted'))
      this.clockStatus = true
    },
    async endWorks () {
      await endWork(this.servant.id, this.note)
      this.showServantStatus = false
      IKUtils.toast(this.$t('SuccessfullyStampedOutShiftIsOver'))
    },
    async checkStaffStatus () {
      const pw = await popAuthorize('', true)
      this.servant = await this.findServant(pw)
      const res = await servantWorkStatus(this.servant.id)
      this.clockStatus = res.clockedIn
      if (this.clockStatus === true) {
        this.servantWorkStatus = res.lastRecord
        if (this.servantWorkStatus.correction === 0) {
          this.servantWorkStatus.correctionDisplay = this.$t('ReplacementCard')
        } else {
          this.servantWorkStatus.correctionDisplay = this.$t('YouCanStampInNormal')
        }
      }
      this.showServantStatus = true
    },
    async findServant (pw) {
      if (this.servantList.length > 0) {
        return this.servantList.find(s => s.password === pw)
      }
    },
    async updateStatus (orderId) {
      await readyToPick(orderId)
      await this.refreshTables()
    },
    openDrawer,
    async acceptOrder (reason = 'ok', id) {
      await acceptOrder(reason, id)
      await this.refreshTables()
    },
    async rejectOrder (id) {
      await rejectOrder(id)
      await this.refreshTables()
    },

    async changeLanguage (locale) {
      Remember.locale = locale
      this.$i18n.locale = Remember.locale
      changeLanguage(locale)
      location.reload()
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
    },
    async refreshTables () {
      this.tableList = await getTableListWithCells()
    },

    listenKeyDown (e) {
      if (this.$route.path === '/') {
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
            if (e.target.nodeName === 'BODY' && e.key?.length < 3) {
              this.buffer += e.key
            }
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
      return Swal.isVisible() || this.menu
    },
    ...mapActions(['doCheckout']),
    async checkoutForTable (tableId, totalPrice) {
      const info = await this.doCheckout(totalPrice)
      const res = await checkout(Object.assign({
        tableId,
        dishes: [],
        password: GlobalConfig.defaultPassword,
        checkOutType: 'checkOut'

      }, info))
      if (res.success) {
        await this.refreshTables()
      }
    },

    async loadRestaurantInfo () {
      this.restaurantInfo = await loadRestaurantInfo()
      this.takeawayEnabled = this.restaurantInfo.currentlyOpening === '1'
    },
    async initPage () {
      window.onkeydown = this.listenKeyDown
      if (!this.lock) {
        this.lock = true
        try {
          await this.loadRestaurantInfo()
          this.servantList = await getServantList()
          await getConsumeTypeList()
          await this.refreshTables()
          addToQueue('firstPageTables', this.refreshTables)
        } catch (e) {
          this.noNetwork = true
        } finally {
          this.lock = false
        }
      }
    },
    reload () {
      location.reload()
    }

  },
  activated () {
    this.initPage()
  },
  mounted: async function () {
    await this.initPage()
  }
}
</script>

<style scoped>
.navigationPillItem {
  border-radius: 12px;
  display: flex;
  color: white;
  align-items: center;
  padding: 4px 16px;
}

.navigationPillItem.active {
  background: rgba(255, 255, 255, 0.2);
  font-weight: bold;
}

</style>
