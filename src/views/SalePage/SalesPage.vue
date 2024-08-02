<template>
  <div style="width: 100%">

    <div class="pa-1 d-flex">
      <v-card
          v-if="isBoss"
          v-dragscroll
          class="d-flex flex-column"
          color="grey darken-2"
          dark
          height="100vh"
          style="border-radius: 16px 0 0 16px !important;overflow-y: scroll"
          width="300"
      >
        <div>
          <div class="pa-6 py-4">
            <v-icon size="24">mdi-cash-register</v-icon>
            <div>
              <div class="d-flex justify-space-between align-center mt-8">
                <div
                  class="hideMore"
                  style="max-width: 150px"
                >
                  <div>{{ $t('Sales') }}</div>
                </div>
                <div
                  class="font-weight-bold"
                >{{
                    billContent.total | priceDisplay
                  }}
                </div>
              </div>
              <div class="d-flex justify-space-between mt-1">
                <div>{{ $t('NetWorth') }}/ {{ $t('Taxes') }}</div>
                <div>{{ billContent.fTotalTe }}/{{ billContent.fTotalTax }}</div>
              </div>
              <v-divider class="my-2"></v-divider>
            </div>
            <template v-for="(total,index) in taxGroupInfo">
              <div :key="total.taxRatePercentage+'-'+index">
                <div class="d-flex justify-space-between">
                  <div> {{ $t('Sales') }} {{ total.taxRatePercentage }}%</div>
                  <div class="font-weight-bold">{{ total.groupTotal | priceDisplay }}</div>
                </div>
                <div class="d-flex justify-space-between">
                  <div>{{ $t('NetWorth') }}/ {{ $t('Taxes') }}</div>
                  <div>{{ total.nettoumsatz }}/{{ total.umsatzsteuer }}</div>
                </div>
                <v-divider class="my-2"></v-divider>
              </div>
            </template>

            <div
              v-for="p in paidInfoList"
              :key="p.id"
              class="d-flex"
            >
              <div>
                {{ p.paidName }}
              </div>
              <v-spacer></v-spacer>
              <div class="font-weight-bold">
                {{ p.paidTotal | priceDisplay }}
              </div>
            </div>

            <v-divider class="my-4"></v-divider>
            <div
              class="d-flex align-center"
              @click="returnDishDialog=true"
            >
              <div
                class="hideMore"
                style="max-width: 90px"
              >
                <div>{{ $t('CancelOrder') }}</div>
              </div>
              <v-spacer></v-spacer>
              <v-card
                class="pa-2"
                color="error lighten-4 black--text"
                elevation="0"
              >{{
                  totalReturn | priceDisplay
                }} ({{ returnList.length }})
                <v-icon
                  class="mt-n1"
                  color="black"
                  size="18px"
                >mdi-chevron-right
                </v-icon>
              </v-card>
            </div>
            <div
              class="d-flex align-center  mt-2"
              @click="discountDialog=true"
            >
              <div>{{ $t('Discount') }}</div>
              <v-spacer></v-spacer>
              <v-card
                class="pa-2"
                color="orange lighten-4 black--text"
                elevation="0"
              >{{
                  totalDiscount | priceDisplay
                }} ({{ discountList.length }})
                <v-icon
                  class="mt-n1"
                  color="black"
                  size="18px"
                >mdi-chevron-right
                </v-icon>
              </v-card>
            </div>
            <v-divider class="my-4"></v-divider>
          </div>
        </div>
        <v-spacer></v-spacer>
        <div class="pa-2 py-4">
          <v-btn class="amber lighten-4 black--text" elevation="0" width="100%" x-large
                 @click="billsPrintDialog = true">
            <v-icon class="mr-2" color="black">
              mdi-printer
            </v-icon>
            {{
              $t('PrintDailySummaryBon')
            }}
          </v-btn>
          <v-btn class="amber lighten-4 black--text mt-2" elevation="0" width="100%" x-large
                 @click="cardTerminalDialog = true">
            <v-icon class="mr-2" color="black">
              mdi-printer
            </v-icon>
            打印刷卡机日结单
          </v-btn>
        </div>

      </v-card>
      <div class="flex-grow-1" style="height: calc(100vh - 8px)">
        <v-app-bar
            color="transparent"
            dark
            flat
            height="56"
        >
          <v-tabs v-model="tabIndex" color="white">
            <template v-if="isBoss">
              <v-tab>{{ $t('Bill') }}</v-tab>
              <v-tab>{{ $t('Employees') }}</v-tab>
              <v-tab>{{ $t('CashBook') }}</v-tab>
            </template>
            <template v-else>
              <v-tab>{{ $t('SalesDetails') }}</v-tab>
            </template>
          </v-tabs>
          <v-spacer></v-spacer>
          <v-card
              v-if="isBoss||Config.servantShowHistoryBill"
              class="flex-shrink-0 text-no-wrap pa-2 px-4"
              color="rgba(255,255,255,0.2)"
              elevation="0"
              style="border-radius: 8px !important;"
              @click="showDatePicker=true"
          >
            <v-icon left>mdi-calendar</v-icon>
            {{ getNiceLabel(singleZBonDate) }}
            <v-spacer/>
          </v-card>
        </v-app-bar>
        <v-tabs-items v-model="tabIndex">
          <template v-if="isBoss">
            <template>
              <v-tab-item>
                <calendar
                    :is-boss="isBoss"
                    :single-z-bon-date="singleZBonDate"
                />
              </v-tab-item>
            </template>
            <v-tab-item>
              <v-card elevation="0">
                <servant-list :single-z-bon-date="singleZBonDate"></servant-list>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <CashBookPage :date="singleZBonDate"/>
            </v-tab-item>
          </template>
          <v-tab-item>
            <v-card>
              <div class="d-flex pa-1">
                <div class="pa-2 flex-grow-1">
                  <bill-table
                      :is-boss="isBoss"
                      :orders="displayData.orders"
                      :orders-meta="displayData.orderMeta"
                  ></bill-table>
                </div>
                <div
                    class="pa-2"
                    style="width: 240px"
                >
                  <v-list
                      dense
                      subheader
                  >
                    <v-subheader>{{ $t('Employees') }} : {{ displayData.servant.name }}
                      ({{ $t('WithoutTip') }})
                    </v-subheader>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ $t('Sales') }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text>
                          {{ displayData.todayTotal | priceDisplay }}
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-subheader>{{ $t('payMethod') }}</v-subheader>
                    <template
                        v-for="payment in displayData.payMethodTotal.filter(p=>p.payMethodId!=='9')"
                    >
                      <v-list-item v-bind:key="payment.payMethodId">
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ payment.paymentMethodStrings }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-list-item-action-text>
                            {{
                              payment.sumTotal | priceDisplay
                            }}({{ payment.sumCount }})
                          </v-list-item-action-text>
                        </v-list-item-action>
                      </v-list-item>
                    </template>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ $t('Tip') }}
                        </v-list-item-title>
                      </v-list-item-content>
                      <v-list-item-action>
                        <v-list-item-action-text>
                          {{
                            displayData.tipIncome ? displayData.tipIncome : 0 | priceDisplay
                          }}
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                  </v-list>
                  <v-btn
                      block
                      class="mt-4"
                      color="primary"
                      @click="printSummaryBon"
                  >
                    {{ $t('WaiterBon') }}
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-tab-item>
        </v-tabs-items>

      </div>
    </div>

    <v-dialog
        v-model="returnDishDialog"
        width="fit-content"
    >
      <v-simple-table
          v-if="returnDishDialog"
          fixed-header
          height="calc(100vh - 144px)"
          style="width: 650px"
      >
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ $t('DishOrOrderNumber') }}</th>
            <th class="text-left">{{ $t('Timestamp') }}</th>
            <th class="text-left">{{ $t('WaiterInfo') }}</th>
            <th class="text-left">{{ $t('ReturnDishContent') }}</th>
            <th class="text-left">{{ $t('ReturnDishReason') }}</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="order in returnList">
            <tr v-bind:key="order.orderId+order.Dname">
              <td style="width: 200px">
                <span class="font-weight-bold">{{ order.name }}</span>/{{ order.orderId }}
              </td>
              <td>
                {{ order.time }}
              </td>
              <td>
                {{ order.servantName }}
              </td>
              <td>
                <b>{{ order.Dname }}</b> &times; {{ order.count }} = {{ order.fPrice  | priceDisplay }}
              </td>
              <td>
                {{ order.returnReason }}
              </td>
            </tr>
          </template>
          </tbody>
        </template>
      </v-simple-table>
    </v-dialog>
    <v-dialog
        v-model="discountDialog"
        width="fit-content"
    >
      <v-simple-table
          v-if="discountDialog"
          fixed-header
          height="calc(100vh - 144px)"
          style="width: 650px"
      >
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ $t('DishOrOrderNumber') }}</th>
            <th class="text-left">{{ $t('Timestamp') }}</th>
            <th class="text-left">{{ $t('WaiterInfo') }}</th>
            <th class="text-left">{{ $t('Discount') }}</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="order in discountList">
            <tr v-bind:key="order.orderInfo.id+order.orderInfo.name">
              <td>
                <span class="font-weight-bold">{{ order.orderInfo.name }}</span>/{{
                  order.orderInfo.id
                }}
              </td>
              <td>{{ order.orderInfo.time }}</td>
              <td>{{ order.orderInfo.servantName }}</td>
              <td>
                <b>{{ order.orderInfo.discountStr.replace('p', '%') }}</b> / -{{ order.orderInfo.value | priceDisplay }}
              </td>
            </tr>
          </template>
          </tbody>
        </template>
      </v-simple-table>
    </v-dialog>
    <v-dialog
        v-model="showDatePicker"
        max-width="400px"
    >
      <v-card
          class="pa-1 pb-4"
          color="#f6f6f6"
          elevation="0"
          tile
      >
        <date-range-picker v-model="dateInput"></date-range-picker>
        <div class="px-2 mt-2">
          <v-btn
              block
              color="primary"
              elevation="0"
              large
              @click="dateSubmit"
          >{{ $t('submit') }}
          </v-btn>
          <v-btn
              block
              class="mt-2"
              color="error"
              large
              outlined
              @click="showDatePicker=false"
          >{{
              $t('Cancel')
            }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog v-model="billsPrintDialog" max-width="600px">
      <bills-printer-page
          :dialog-status="billsPrintDialog"
          :real-date="dateInput"
          @closeDialog="billsPrintDialog = false"
      />
    </v-dialog>
    <v-dialog v-model="cardTerminalDialog" max-width="600px">
      <base-form
        :schema="schemas"
        @close="cardTerminalDialog=false"
        @submit="savePrintInfo"
      >
        <div>刷卡机日结单</div>
        <template #subtitle>
          打印您当前刷卡机的日结单
        </template>
      </base-form>
    </v-dialog>
  </div>

</template>

<script>

import dayjs from 'dayjs'
import {
  getBillListForServant,
  getOrderDetailInfo,
  previewZBon,
  printDailyCardTerminal,
  printDeliveryBon,
  printServantSummary,
  printXBon,
  printZBonUseDate
} from '@/api/api'
import IKUtils from 'innerken-js-utils'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import Calendar from '@/views/SalePage/Fragment/Calendar'
import BillTable from '@/views/SalePage/BillTable'
import { getNiceLabel, getToday, today } from '@/api/Repository/DateRepository'
import DateRangePicker from '@/components/GlobalDialog/DateRangePicker'
import ServantList from '@/views/SalePage/Fragment/ServantList'
import BillsPrinterPage from '@/views/SalePage/Fragment/BillsPrinterPage'
import CashBookPage from '@/views/SalePage/CashBookPage'
import BaseForm from '@/components/Base/Form/BaseForm'
import { Remember } from '@/api/remember'
import { dragscroll } from 'vue-dragscroll'

const defaultDisplayData = {
  orders: [],
  payMethodTotal: [],
  servant: {
    id: -1,
    name: 'Servant 1'
  },
  todayTotal: 0
}

export default {
  name: 'SalePage',
  components: {
    BaseForm,
    CashBookPage,
    BillsPrinterPage,
    ServantList,
    DateRangePicker,
    BillTable,
    Calendar
  },
  props: {
    isBoss: {
      default: false
    },
    password: {}
  },
  directives: {
    dragscroll
  },
  data: function () {
    return {
      cardTerminalDialog: false,
      billsPrintDialog: false,
      showDatePicker: false,
      Config: GlobalConfig,
      tabIndex: 0,
      displayData: defaultDisplayData,
      today,
      dateInput: [today, today],
      singleZBonDate: [today, today],
      loaded: false,

      billData: {
        content: {
          taxInfos: [],
          fTotal: 0,
          fTotalTax: 0,
          storno: [],
          discount: [],
          paidInfo: [],
          fTotalTe: 0
        }
      },
      returnDishDialog: null,
      discountDialog: null

    }
  },
  computed: {
    schemas () {
      return [
        {
          key: 'overrideCardTerminalIp',
          name: '刷卡机IP',
          required: false,
          default: Remember.cardTerminalIP
        },
        {
          key: 'overrideCardTerminalPort',
          name: '刷卡机Port',
          required: false,
          default: Remember.cardTerminalPort
        }
      ]
    },
    totalDiscount () {
      return this.discountList.reduce((arr, i) => {
        arr += parseFloat(i?.orderInfo?.value ?? 0)
        return arr
      }, 0)
    },
    totalReturn () {
      return this.returnList.reduce((arr, i) => {
        arr += parseFloat(i.fPrice.replace(',', '.'))
        return arr
      }, 0)
    },
    billContent () {
      return this.billData.content
    },
    paidInfoList () {
      return this.billContent.paidInfo
    },
    returnList () {
      return this.billContent.storno
    },
    discountList () {
      return this.billContent.discount
    },
    taxGroupInfo () {
      return this.billContent.taxInfos?.filter(t => t.consumeTypeName === 'Total')
    },
    shouldShowZBon () {
      if (!this.singleZBonDate) {
        return false
      }
      return dayjs().isAfter(dayjs(this.singleZBonDate[0], 'YYYY-MM-DD')
        .add(1, 'd').hour(4).minute(0))
    }

  },
  methods: {
    async savePrintInfo (info) {
      Remember.cardTerminalIP = info.overrideCardTerminalIp
      Remember.cardTerminalPort = info.overrideCardTerminalPort
      await printDailyCardTerminal(info)
      this.cardTerminalDialog = false
    },
    async dateSubmit () {
      this.showDatePicker = false
      this.singleZBonDate = this.dateInput
      console.log(this.singleZBonDate, 'date')
      await this.loadData()
    },
    getNiceLabel,
    async printXBon () {
      IKUtils.showLoading()
      await printXBon(...this.singleZBonDate)
      IKUtils.toast('OK')
    },
    async printZBon () {
      IKUtils.showConfirm(this.$t('PrintAllRecords'), this.$t('AreYouSure'), async () => {
        IKUtils.showLoading(false)
        await printZBonUseDate(...this.singleZBonDate)
        IKUtils.toast('OK')
        await this.loadData()
      })
    },
    async printSummaryBon () {
      IKUtils.showLoading(true)
      await printServantSummary(this.password, ...this.singleZBonDate)
      IKUtils.toast('OK')
    },
    async printDelivery () {
      IKUtils.showLoading()
      const fromTime = this.singleZBonDate[0] + ' 04:00:00'
      const toTime = dayjs(this.singleZBonDate[1]).add(1, 'day').format('YYYY-MM-DD') + ' 03:59:59'
      const detailTime = [fromTime, toTime]
      await printDeliveryBon(detailTime)
      IKUtils.toast('OK')
    },

    async loadData () {
      if (!this.loaded) {
        return
      }
      this.billData = await previewZBon(...this.singleZBonDate)
      this.displayData = Object.assign({}, defaultDisplayData,
        await getBillListForServant(this.password ?? GlobalConfig.defaultPassword,
          ...this.singleZBonDate), { orderMeta: await getOrderDetailInfo(this.singleZBonDate) })
    },
    initial () {
      this.singleZBonDate = [getToday(), getToday()]
      this.tabIndex = 0
    }
  },

  watch: {
    async tabIndex () {
      await this.loadData()
    }
  },

  async mounted () {
    this.initial()
    this.loaded = true
    await this.loadData()
  }

}
</script>

<style scoped>

</style>
