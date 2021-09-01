<template>
  <v-dialog v-model="realShow" max-width="960px">
    <v-card>
      <v-toolbar>
        <v-tabs v-model="tabIndex">
          <template v-if="isBoss">
            <v-tab v-if="Config.UseDailyZbon">{{ $t('Tag-Sicht') }}</v-tab>
            <v-tab v-else>Letzte-Sicht</v-tab>
            <v-tab>{{ $t('详细账务') }}</v-tab>
          </template>
          <v-tab>{{ $t('Meine Umsatz') }}</v-tab>
        </v-tabs>
        <v-spacer></v-spacer>
        <v-icon @click="realShow=!realShow">mdi-close</v-icon>
      </v-toolbar>
      <v-card-text class="mt-1">
        <v-tabs-items v-model="tabIndex">
          <template v-if="isBoss">
            <template v-if="Config.UseDailyZbon">
              <v-tab-item>
                <v-card>
                  <div class="d-flex pa-1">
                    <v-date-picker elevation="2"
                                   v-model="singleZBonDate"
                                   :allowed-dates="allowedDates"
                                   class="mt-4"
                                   :max="todayDate"
                    />
                    <div v-if="realShow" class="pa-2">
                      <v-simple-table height="400px" fixed-header>
                        <template v-slot:default>
                          <thead>
                          <tr>
                            <th class="text-left">{{ $t('Tisch Nr.') }} / {{ $t('R. Nr.') }}</th>
                            <th class="text-left">{{ $t('time') }}</th>
                            <th class="text-left">{{ $t('Summe') }}</th>
                          </tr>
                          </thead>
                          <tbody>
                          <template v-for="order in bills.orders">
                            <tr v-bind:key="order.orderId" @click="startChangePaymentMethodForOrder(order)">
                              <td>
                                <span class="font-weight-bold">{{ order.tableName }}</span> / {{ order.orderId }}
                              </td>
                              <td>
                                {{ order.updatedAt }}
                              </td>
                              <td :style="{background:order.backGroundColor,color:order.foreGroundColor}">
                                {{ order.totalPrice }}<span v-if="order.tipIncome>0">({{ order.tipIncome }})</span>/
                                {{ order.paymentMethodStrings }}<b v-if="order.discountStr">/
                                {{ '-' + order.discountStr.replace('p', '%') }}</b>
                              </td>
                            </tr>
                          </template>
                          </tbody>
                        </template>
                      </v-simple-table>
                    </div>
                    <div class="pa-2" style="width: 272px">
                      <v-list subheader two-line>
                        <v-subheader>{{ $t('Umsatz') }}</v-subheader>
                        <template v-for="(total,index) in taxGroupInfo">
                          <v-list-item :key="total.taxRatePercentage+'-'+index">
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ total.taxRatePercentage }}%
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                Umsatz: {{ total.groupTotal }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle>
                                Netto/Steuer: {{ total.nettoumsatz }}/{{ total.umsatzsteuer }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>Alle</v-list-item-title>
                            <v-list-item-subtitle>Umsatz: {{ billContent.fTotal }}</v-list-item-subtitle>
                            <v-list-item-subtitle>Netto/Steuer: {{ billContent.fTotalTe }}/{{ billContent.fTotalTax }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>
                        <v-btn
                          x-large
                          block
                          @click="printXBon"
                          color="warning">
                          {{ $t('XBon Drücken') }}
                        </v-btn>
                        <v-btn
                          v-if="shouldShowZBon"
                          x-large
                          block
                          @click="printZBon"
                          color="primary">
                          {{ $t('ZBon Drücken') }}
                        </v-btn>
                      </v-list>
                    </div>
                  </div>
                </v-card>
              </v-tab-item>
            </template>
            <template v-else>
              <v-tab-item>
                <v-card>
                  <div class="d-flex pa-1 align-center">
                    <div class="pa-2 " style="height: 100%">
                      <h1>Letzte ZBon drucken：</h1>
                      <h1 class="mt-4">{{ lastZBonPrintTimeDisplayString }}</h1>
                    </div>
                    <div class="pa-4" style="min-width: 464px">
                      <v-list subheader two-line-line>
                        <v-subheader>{{ $t('Umsatz') }}</v-subheader>
                        <template v-for="(total,index) in taxGroupInfo">
                          <v-list-item :key="total.taxRatePercentage+'-'+index">
                            <v-list-item-content>
                              <v-list-item-title>
                                {{ total.taxRatePercentage }}%
                              </v-list-item-title>
                              <v-list-item-subtitle>
                                {{ $t('Umsatz') }}: {{ total.groupTotal }}
                              </v-list-item-subtitle>
                              <v-list-item-subtitle>
                                Netto/Steuer: {{ total.nettoumsatz }}/{{ total.umsatzsteuer }}
                              </v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                        <v-list-item>
                          <v-list-item-content>
                            <v-list-item-title>Alle</v-list-item-title>
                            <v-list-item-subtitle>Umsatz: {{ billContent.fTotal }}</v-list-item-subtitle>
                            <v-list-item-subtitle>Netto/Steuer: {{ billContent.fTotalTe }}/{{ billContent.fTotalTax }}
                            </v-list-item-subtitle>
                          </v-list-item-content>
                        </v-list-item>

                      </v-list>
                    </div>
                  </div>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      x-large
                      @click="printXBon"
                      color="warning">
                      {{ $t('XBon Drücken') }}
                    </v-btn>
                    <v-btn
                      v-if="shouldShowZBon"
                      x-large
                      @click="printZBon"
                      color="primary">
                      {{ $t('ZBon Drücken') }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-tab-item>
            </template>
            <v-tab-item>
              <v-card>
                <v-card-title>{{ $t('单菜品折扣') }}
                  <v-spacer></v-spacer>
                  {{ totalDiscountValue }}
                </v-card-title>
                <v-simple-table height="400px" fixed-header>
                  <template v-slot:default>
                    <thead>
                    <tr>
                      <th class="text-left">{{ $t('Tisch Nr.') }} / {{ $t('R. Nr.') }}</th>
                      <th class="text-left">{{ $t('time') }}/Keneller</th>
                      <th class="text-left">{{ $t('Discount') }}</th>
                    </tr>
                    </thead>
                    <tbody>
                    <template v-for="(dish,index) in discountedDishes">
                      <tr v-bind:key="dish.dishesId+index">
                        <td>
                          <span class="font-weight-bold">{{ dish.tableName }}</span> / {{ dish.dishesOrdersId }}
                        </td>
                        <td>
                          {{ dish.time }}/{{ dish.servantName }}
                        </td>
                        <td>
                          {{ dish.code }}.{{ dish.dishName }} /
                          {{ '-' + dish.tempDiscountStr.replace('p', '%') }}({{ dish.tempDiscountMod }})
                        </td>
                      </tr>
                    </template>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-card>
            </v-tab-item>
          </template>
          <v-tab-item>
            <v-card>
              <div class="d-flex pa-1">
                <v-date-picker elevation="2"
                               v-if="!Config.servantDataOnlyToday"
                               v-model="singleZBonDate"
                               :allowed-dates="allowedDates"
                               class="mt-4"
                               :max="todayDate"
                />
                <div v-if="realShow" class="pa-2 flex-grow-1">
                  <v-simple-table height="400px" fixed-header>
                    <template v-slot:default>
                      <thead>
                      <tr>
                        <th class="text-left">{{ $t('Tisch Nr.') }} / {{ $t('R. Nr.') }}</th>
                        <th class="text-left">{{ $t('time') }}</th>
                        <th class="text-left">{{ $t('Summe') }}</th>
                      </tr>
                      </thead>
                      <tbody>
                      <template v-for="order in displayData.orders">
                        <tr v-bind:key="order.orderId">
                          <td>
                            <span class="font-weight-bold">{{ order.tableName }}</span> / {{ order.orderId }}
                          </td>
                          <td>
                            {{ order.updatedAt }}
                          </td>
                          <td :style="{background:order.backGroundColor,color:order.foreGroundColor}">
                            {{ order.totalPrice }}<span v-if="order.tipIncome>0">({{ order.tipIncome }})</span>/
                            {{ order.paymentMethodStrings }}<b v-if="order.discountStr">/
                            {{ '-' + order.discountStr.replace('p', '%') }}</b>
                          </td>
                        </tr>
                      </template>
                      </tbody>
                    </template>
                  </v-simple-table>
                </div>
                <div class="pa-2" style="width: 240px">

                  <v-list subheader dense>
                    <v-subheader>{{ $t('Kellner') }} : {{ displayData.servant.name }} ({{
                        $t('ohne tip')
                      }})
                    </v-subheader>
                    <v-list-item>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ $t('Umsatz') }}
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
                    <template v-for="payment in displayData.payMethodTotal">
                      <v-list-item v-bind:key="payment.payMethodId">
                        <v-list-item-content>
                          <v-list-item-title>
                            {{ payment.paymentMethodStrings }}
                          </v-list-item-title>
                        </v-list-item-content>
                        <v-list-item-action>
                          <v-list-item-action-text>
                            {{ payment.sumTotal }}
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
                          {{ displayData.tipIncome|priceDisplay }}
                        </v-list-item-action-text>
                      </v-list-item-action>
                    </v-list-item>
                    <v-divider></v-divider>
                  </v-list>
                  <v-btn block @click="printSummaryBon" color="primary" class="mt-4">
                    {{ $t('KellnerBon') }}
                  </v-btn>
                </div>
              </div>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
    </v-card>
    <v-dialog v-model="checkOutDialog">
      <v-card width="100%">
        <v-card-title>请输入新的结账方式</v-card-title>
        <check-out-calculator
          style="height: 564px"
          @payment-cancel="checkOutDialog=false"
          @payment-submit="changePaymentMethod"
          :total="changeOrderTotal"
        ></check-out-calculator>

      </v-card>

    </v-dialog>
  </v-dialog>
</template>

<script>

import dayjs from 'dayjs'
import {
  changePayMethodForOrder,
  getBillListForServant,
  previewZBon,
  previewZBonByTimeSpan,
  printServantSummary,
  printXBon,
  printZBon,
  printZBonUseDate, showTodayTempDiscountedDishes,
  ZBonList
} from '@/api/api'
import IKUtils from 'innerken-js-utils'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import CheckOutCalculator from '@/components/CheckOutCalculator'

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
  name: 'SalesDialog',
  components: { CheckOutCalculator },
  props: {
    salesDialogShow: {
      default: false
    },
    isBoss: {
      default: false
    },
    password: {},
    initialUI: {}
  },
  data: function () {
    return {
      billData: {
        content: {
          taxInfos: [],
          fTotal: 0,
          fTotalTax: 0,
          fTotalTe: 0
        }
      },
      discountedDishes: [],
      Config: GlobalConfig,
      lastZBonPrintDate: null,
      tabIndex: 0,

      bills: [],
      displayData: defaultDisplayData,
      todayDate: dayjs().format('YYYY-MM-DD'),
      singleZBonDate: null,
      checkOutDialog: null,
      changeOrderTotal: 0,
      changeOrderId: null
    }
  },
  computed: {
    shouldShowZBon () {
      if (GlobalConfig.UseDailyZbon) {
        if (!this.singleZBonDate) {
          return false
        }
        return dayjs().isAfter(dayjs(this.singleZBonDate, 'YYYY-MM-DD').add(1, 'd').hour(4).minute(0))
      } else {
        return true
      }
    },

    billContent () {
      return this.billData.content
    },

    taxGroupInfo () {
      return this.billContent.taxInfos?.filter(t => t.consumeTypeName === 'Total')
    },

    realShow: {
      get: function () {
        return this.salesDialogShow
      },
      set: function (val) {
        this.$emit('visibility-changed', val)
      }
    },

    totalDiscountValue () {
      return this.discountedDishes.reduce((sum, a) => {
        sum += parseFloat(a.tempDiscountMod) * a.sumCount
        return sum
      }, 0)
    },
    lastZBonPrintTimeDisplayString () {
      return this.lastZBonPrintDate?.format('DD.MM, YYYY HH:mm:ss')
    }

  },

  methods: {
    async changePaymentMethod (paymentLog = []) {
      // console.log(paymentLog)
      const res = await changePayMethodForOrder(this.changeOrderId, paymentLog)
      console.log(res)
      IKUtils.toast('修改成功')
      this.checkOutDialog = false
    },
    startChangePaymentMethodForOrder (order) {
      this.changeOrderId = order.orderId
      this.changeOrderTotal = order.totalPrice
      this.checkOutDialog = true
    },
    async printSummaryBon () {
      IKUtils.showLoading()
      await printServantSummary(this.password, this.singleZBonDate, this.singleZBonDate)
      IKUtils.toast('OK')
    },

    async printXBon () {
      IKUtils.showLoading()
      await printXBon(this.singleZBonDate, this.singleZBonDate)
      IKUtils.toast('OK')
    },

    async printZBon () {
      IKUtils.showConfirm(this.$t('Möchten Sie alle Datensätze drucken?'), this.$t('Bist du sicher?'), async () => {
        IKUtils.showLoading()
        if (GlobalConfig.UseDailyZbon) {
          await printZBonUseDate(this.singleZBonDate, this.singleZBonDate)
        } else {
          if (this.lastZBonPrintDate.isAfter(dayjs().subtract(5, 'm'))) {
            IKUtils.showError(this.$t('Die letzte Druckanforderung wurde innerhalb von 5 Minuten ausgegeben.') +
              this.$t(' Warten Sie mindestens 5 Minuten, bevor Sie erneut drucken'))
            return
          }
          await printZBon()
        }
        IKUtils.toast('OK')
        await this.loadData()
      })
    },

    allowedDates (val) {
      return dayjs(val, 'YYYY-MM-DD').isBefore(dayjs())
    },

    initial () {
      this.singleZBonDate = this.todayDate
      this.tabIndex = 0
    },

    async loadData () {
      if (!GlobalConfig.UseDailyZbon) {
        try {
          this.lastZBonPrintDate = dayjs((await ZBonList())?.[0]?.createTimeStamp ?? '1970-01-01 00:00:00')
        } catch (e) {
          console.log(e)
        }

        const hoursBefore = dayjs().subtract(32, 'hour')

        if (this.lastZBonPrintDate.isBefore(hoursBefore) && GlobalConfig.printZBonAlert) {
          IKUtils.showConfirm(this.$t('Bitte beachten Sie, dass Sie ZBon seit 36 Stunden nicht mehr gedruckt haben'),
            this.$t('Jetzt drucken?'), () => {
              this.printZBon()
            })
        }

        this.billData = await previewZBonByTimeSpan(this.lastZBonPrintDate.format('YYYY-MM-DD HH:mm:ss'),
          dayjs().format('YYYY-MM-DD HH:mm:ss'))
      } else {
        if (this.singleZBonDate != null) {
          this.billData = await previewZBon(this.singleZBonDate, this.singleZBonDate)
        }
      }
      this.bills = await getBillListForServant(null, this.singleZBonDate)

      this.displayData = Object.assign({}, defaultDisplayData, await getBillListForServant(this.password ?? GlobalConfig.defaultPassword, this.singleZBonDate))

      try {
        this.discountedDishes = await showTodayTempDiscountedDishes(this.singleZBonDate, this.singleZBonDate)
      } catch (e) {

      }
    }
  },

  watch: {
    async tabIndex (val) {
      console.log(val)
      await this.loadData()
    },
    async singleZBonDate () {
      await this.loadData()
    },
    async realShow (val) {
      if (val) {
        this.tabIndex = 0
        await this.loadData()
      }
    }
  },

  mounted () {
    this.initial()
  }

}
</script>

<style scoped>

</style>
