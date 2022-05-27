<template>
  <v-dialog v-model="realShow" fullscreen>
    <v-card>
      <v-card-text class="d-flex pa-0">
        <div>
          <v-toolbar dark>
            <v-toolbar-title>{{ $t('Tag-Sicht') }}</v-toolbar-title>
          </v-toolbar>
          <div class="pa-2">
            <v-date-picker
                v-if="!Config.servantDataOnlyToday||isBoss"
                elevation="2"
                v-model="singleZBonDate"
                :max="todayDate"
                :locale="Config.lang"
            />
          </div>
        </div>
        <div class="flex-grow-1">
          <v-toolbar dark>
            <v-spacer></v-spacer>
            <v-icon @click="realShow=!realShow">mdi-close</v-icon>
          </v-toolbar>
          <v-card-text class="mt-1 d-flex pa-0">
            <div class="pa-2 flex-grow-1">
              <v-tabs-items v-model="tabIndex">
                <template v-if="isBoss">
                  <template v-if="Config.UseDailyZbon">
                    <v-tab-item>
                      <calendar :single-z-bon-date="singleZBonDate" :real-show="realShow"/>
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
                                      {{ $t('Netto') }}: {{ total.nettoumsatz }}
                                    </v-list-item-subtitle>
                                    <v-list-item-subtitle>
                                      {{ $t('Steuer') }}:{{ total.umsatzsteuer }}
                                    </v-list-item-subtitle>
                                  </v-list-item-content>
                                </v-list-item>
                              </template>
                              <v-list-item>
                                <v-list-item-content>
                                  <v-list-item-title>{{ $t('All') }}</v-list-item-title>
                                  <v-list-item-subtitle>{{ $t('Umsatz') }}: {{
                                      billContent.fTotal
                                    }}
                                  </v-list-item-subtitle>
                                  <v-list-item-subtitle>
                                    {{ $t('Netto') }}: {{ billContent.fTotalTe }}
                                  </v-list-item-subtitle>
                                  <v-list-item-subtitle>
                                    {{ $t('Steuer') }}:{{ billContent.fTotalTax }}
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
                              class="mt-1"
                              v-if="shouldShowZBon"
                              x-large
                              @click="printZBon"
                              color="primary">
                            {{ $t('ZBon_print') }}
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-tab-item>
                  </template>
                  <v-tab-item>
                    <discount-and-storno
                        :discounted-dishes="discountedDishes"/>
                  </v-tab-item>
                  <v-tab-item>
                    <v-card>
                      <div class="d-flex pa-1">
                        <div v-if="realShow" class="pa-2 flex-grow-1">
                          <v-simple-table height="calc(100vh - 108px)" fixed-header>
                            <template v-slot:default>
                              <thead>
                              <tr>
                                <th class="text-left">{{ $t('R. Nr.') }}/{{ $t('time') }}</th>
                                <th class="text-left">{{ $t('备注') }}</th>
                                <th class="text-left">{{ $t('Summe') }}</th>
                              </tr>
                              </thead>
                              <tbody>
                              <template v-for="record in cashChangeRecords">
                                <tr v-bind:key="record.orderId">
                                  <td>
                                    {{ record.orderId }}/ {{ record.updateTimestamp.split(' ')[1] }}
                                  </td>
                                  <td>
                                    {{ record.cashAccountNote }}
                                  </td>
                                  <td :style="{color:record.payLogAmount>0?'green':'red'}">
                                    {{ record.payLogAmount }}
                                  </td>
                                </tr>
                              </template>
                              </tbody>
                            </template>
                          </v-simple-table>
                        </div>
                        <div class="pa-2" style="width: 272px">
                          <v-list subheader two-line>
                            <v-subheader>{{ $t('Kassen Stand') }}</v-subheader>
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title>
                            <span style="font-size: larger">
                                   {{ todayCashStand }}
                            </span>
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-subheader>{{ $t('Änderung des Tages') }}</v-subheader>
                            <v-list-item>
                              <v-list-item-content>
                                <v-list-item-title>
                            <span style="font-size: larger">
                                   {{ todayChange | priceDisplay }}
                            </span>
                                </v-list-item-title>
                              </v-list-item-content>
                            </v-list-item>
                            <v-btn
                                x-large
                                block
                                @click="showNumberKeyboard=true"
                                color="warning">
                              {{ $t('新增记录') }}
                            </v-btn>
                          </v-list>
                        </div>
                      </div>
                    </v-card>
                  </v-tab-item>
                </template>
                <v-tab-item>
                  <v-card>
                    <div class="d-flex pa-1">
                      <div v-if="realShow" class="pa-2 flex-grow-1">
                        <v-simple-table height="calc(100vh - 108px)" fixed-header>
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
                                  <template v-if="!order.paymentLabel">
                                    {{ order.totalPrice }}<span v-if="order.tipIncome>0">({{
                                      order.tipIncome
                                    }})</span>/
                                    {{ order.paymentMethodStrings }}
                                  </template>
                                  <template v-else>{{ order.paymentLabel }}</template>
                                  <b v-if="order.discountStr">/
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
                          <v-subheader>{{ $t('Kellner') }} : {{ displayData.servant.name }} ({{ $t('ohne tip') }})
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
                          <template v-for="payment in displayData.payMethodTotal.filter(p=>p.payMethodId!=='9')">
                            <v-list-item v-bind:key="payment.payMethodId">
                              <v-list-item-content>
                                <v-list-item-title>
                                  {{ payment.paymentMethodStrings }}
                                </v-list-item-title>
                              </v-list-item-content>
                              <v-list-item-action>
                                <v-list-item-action-text>
                                  {{ payment.sumTotal | priceDisplay }}({{ payment.sumCount }})
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
                                {{ displayData.tipIncome ? displayData.tipIncome : 0 | priceDisplay }}
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
            </div>

            <v-card style="width: 144px">
              <v-tabs vertical v-model="tabIndex">
                <template v-if="isBoss">
                  <v-tab v-if="Config.UseDailyZbon">{{ $t('Tag-Sicht') }}</v-tab>
                  <v-tab v-else>Letzte-Sicht</v-tab>
                  <v-tab>{{ $t('详细账务') }}</v-tab>
                  <v-tab>{{ $t('Kassenbuch') }}</v-tab>
                </template>
                <v-tab>{{ $t('Meine Umsatz') }}</v-tab>
              </v-tabs>
            </v-card>

          </v-card-text>
        </div>
      </v-card-text>

    </v-card>
    <dialog-with-keyboard @close="showNumberKeyboard=false" :show="showNumberKeyboard"
                          @submit="addCashRecord" title='请输入支出金额，如果是收入就输入负数'
                          :keys="keyboardNumber">
      <v-text-field placeholder="如果需要，请点击这里用键盘输入备注" v-model="cashNote"></v-text-field>
    </dialog-with-keyboard>
  </v-dialog>
</template>

<script>

import dayjs from 'dayjs'
import {
  getBillListForServant,
  getCashInOutDetail,
  manageCashAccount,
  previewZBonByTimeSpan,
  printServantSummary,
  printXBon,
  printZBon,
  printZBonUseDate,
  showTodayTempDiscountedDishes,
  todayCashStand,
  ZBonList
} from '@/api/api'
import IKUtils from 'innerken-js-utils'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import DialogWithKeyboard from '../DialogWithKeyboard'
import { numberKeyLayout } from '../component/Keyboard/keyModel'
import DiscountAndStorno from '@/components/fragments/salesDialog/DiscountAndStorno'
import Calendar from '@/components/fragments/salesDialog/Calendar'

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
  components: { Calendar, DiscountAndStorno, DialogWithKeyboard },
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
      keyboardNumber: numberKeyLayout,
      showNumberKeyboard: false,
      billData: {
        content: {
          taxInfos: [],
          fTotal: 0,
          fTotalTax: 0,
          storno: [],
          discount: [],
          fTotalTe: 0
        }
      },
      cashChangeRecords: [],
      cashNote: '',
      discountedDishes: [],
      Config: GlobalConfig,
      lastZBonPrintDate: null,
      tabIndex: 0,
      todayCashStand: 0,
      bills: [],
      displayData: defaultDisplayData,
      todayDate: dayjs().format('YYYY-MM-DD'),
      singleZBonDate: null

    }
  },
  computed: {
    todayChange () {
      return this.cashChangeRecords.reduce((total, i) => {
        total += parseFloat(i.payLogAmount)
        return total
      }, 0)
    },
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

    lastZBonPrintTimeDisplayString () {
      return this.lastZBonPrintDate?.format('DD.MM, YYYY HH:mm:ss')
    }

  },

  methods: {
    async addCashRecord (amount) {
      console.log(amount, '数额')
      console.log(this.cashNote, '备注')
      const res = await manageCashAccount(-amount, this.cashNote)
      this.cashNote = ''
      console.log(res)
      await this.loadData()
    },

    async printSummaryBon () {
      IKUtils.showLoading(true)
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
        IKUtils.showLoading(true)
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
      }

      this.displayData = Object.assign({}, defaultDisplayData, await getBillListForServant(this.password ?? GlobalConfig.defaultPassword, this.singleZBonDate))

      try {
        this.todayCashStand = await todayCashStand()
        this.discountedDishes = await showTodayTempDiscountedDishes(this.singleZBonDate, this.singleZBonDate)
        this.cashChangeRecords = await getCashInOutDetail(this.singleZBonDate, this.singleZBonDate)
        console.log(this.cashChangeRecords)
      } catch (e) {
        console.log(e)
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
