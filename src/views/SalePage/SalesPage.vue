<template>
  <div style="width: 100%">
    <v-toolbar elevation="2">
      <v-tabs v-model="tabIndex">
        <template v-if="isBoss">
          <v-tab>{{ $t('Tag-Sicht') }}</v-tab>
          <v-tab>{{ $t('Kassenbuch') }}</v-tab>
        </template>
        <v-tab>{{ $t('Meine Umsatz') }}</v-tab>
      </v-tabs>
      <v-spacer></v-spacer>
      <v-btn>今天/更换日期</v-btn>
    </v-toolbar>
    <div class="d-flex" style="height: calc(100vh - 64px)">
      <div class="pa-2">
        <v-date-picker
            class="mt-6"
            v-if="!Config.servantDataOnlyToday||isBoss"
            elevation="1"
            v-model="singleZBonDate"
            :max="todayDate"
        />
      </div>
      <div class="flex-grow-1">
        <v-card-text class="mt-1 d-flex pa-0">
          <div class="pa-2 flex-grow-1">
            <v-tabs-items v-model="tabIndex">
              <template v-if="isBoss">
                <template>
                  <v-tab-item>
                    <calendar :single-z-bon-date="singleZBonDate"/>
                  </v-tab-item>
                </template>
                <v-tab-item>
                  <v-card>
                    <div class="d-flex pa-1">
                      <div class="pa-2 flex-grow-1">
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
                    <div class="pa-2 flex-grow-1">
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
        </v-card-text>
      </div>
    </div>

    <dialog-with-keyboard @close="showNumberKeyboard=false" :show="showNumberKeyboard"
                          @submit="addCashRecord" :title=" $t('请输入支出金额，如果是收入就输入负数')"
                          :keys="keyboardNumber">
      <v-text-field :placeholder=" $t('如果需要，请点击这里用键盘输入备注')" v-model="cashNote"></v-text-field>
    </dialog-with-keyboard>
  </div>

</template>

<script>

import dayjs from 'dayjs'
import {
  getBillListForServant,
  getCashInOutDetail,
  manageCashAccount,
  printServantSummary,
  printXBon,
  printZBonUseDate,
  showTodayTempDiscountedDishes,
  todayCashStand
} from '@/api/api'
import IKUtils from 'innerken-js-utils'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import DialogWithKeyboard from '@/components/Base/DialogWithKeyboard'
import Calendar from '@/views/SalePage/Fragment/Calendar'
import { numberKeyLayout } from '@/components/Base/Keyboard/keyModel'

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
    DialogWithKeyboard,
    Calendar
  },
  props: {
    isBoss: {
      default: false
    },
    password: {}
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
      tabIndex: 0,
      todayCashStand: 0,
      bills: [],
      displayData: defaultDisplayData,
      todayDate: dayjs().format('YYYY-MM-DD'),
      singleZBonDate: null,
      loaded: false

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
      if (!this.singleZBonDate) {
        return false
      }
      return dayjs().isAfter(dayjs(this.singleZBonDate, 'YYYY-MM-DD').add(1, 'd').hour(4).minute(0))
    },

    billContent () {
      return this.billData.content
    },

    taxGroupInfo () {
      return this.billContent.taxInfos?.filter(t => t.consumeTypeName === 'Total')
    }

  },
  methods: {
    async addCashRecord (amount) {
      await manageCashAccount(-amount, this.cashNote)
      this.cashNote = ''
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
        IKUtils.showLoading(false)

        await printZBonUseDate(this.singleZBonDate, this.singleZBonDate)

        IKUtils.toast('OK')
        await this.loadData()
      })
    },

    initial () {
      this.singleZBonDate = this.todayDate
      this.tabIndex = 0
    },

    async loadData () {
      if (!this.loaded) {
        return
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
    async tabIndex () {
      await this.loadData()
    },
    async singleZBonDate () {
      await this.loadData()
    }
  },

  async mounted () {
    console.log(this.password)
    this.initial()
    this.loaded = true
    await this.loadData()
  }

}
</script>

<style scoped>

</style>
