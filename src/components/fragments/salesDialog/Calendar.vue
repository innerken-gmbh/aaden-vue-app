<template>
  <v-card>
    <div class="d-flex">
      <div v-if="realShow" class="pa-2 flex-grow-1">
        <h2>{{ $t('订单列表') }}</h2>
        <v-simple-table height="calc(100vh - 144px)" fixed-header>
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
                  {{ order.totalPrice }}<span v-if="order.tipIncome>0">({{
                    order.tipIncome
                  }})</span>/
                  {{ order.paymentMethodStrings }}<b v-if="order.discountStr">/
                  {{ '-' + order.discountStr.replace('p', '%') }}</b>
                </td>
              </tr>
            </template>
            </tbody>
          </template>
        </v-simple-table>
      </div>
      <v-card class="pa-2" style="width: 272px">
        <v-card elevation="0" class="mt-1">
          <div class="pa-2">
            <div class="d-flex justify-space-between align-center">
              <h2 style="font-size: 24px">{{ $t('All') }}{{ $t('Umsatz') }}</h2>
              <h2 style="font-size: 24px">{{ billContent.fTotal }}</h2>
            </div>
            <div class="d-flex justify-space-between mt-1">
              <div>{{ $t('Netto') }}/ {{ $t('Steuer') }}</div>
              <div>{{ billContent.fTotalTe }}/{{ billContent.fTotalTax }}</div>
            </div>
          </div>
          <template v-for="(total,index) in taxGroupInfo">
            <div class="pa-2" :key="total.taxRatePercentage+'-'+index">
              <div class="d-flex justify-space-between">
                <h3> {{ $t('Umsatz') }} {{ total.taxRatePercentage }}% </h3>
                <h3>{{ total.groupTotal }}</h3>
              </div>
              <div class="d-flex justify-space-between">
                <div>{{ $t('Netto') }}/ {{ $t('Steuer') }}</div>
                <div>{{ total.nettoumsatz }}/{{ total.umsatzsteuer }}</div>
              </div>
            </div>
          </template>
        </v-card>
        <v-card elevation="0">
          <v-card color="error lighten-2" dark @click="returnDishDialog=true" class="d-flex align-center pa-2">
            <h3>{{ $t('dishCancel') }}</h3>
            <v-spacer></v-spacer>
            <h3>{{ totalReturn | priceDisplay }}({{ returnList.length }})
              <v-icon class="mt-n1" size="18px">mdi-chevron-right</v-icon>
            </h3>
          </v-card>
          <v-card color="warning lighten-2" dark @click="discountDialog=true" class="d-flex align-center pa-2">
            <h3>{{ $t('折扣') }}</h3>
            <v-spacer></v-spacer>
            <h3>{{ totalDiscount | priceDisplay }}({{ discountList.length }})
              <v-icon class="mt-n1" size="18px">mdi-chevron-right</v-icon>
            </h3>
          </v-card>
          <v-btn
              class="mt-1"
              x-large
              block
              @click="printXBon"
              color="warning">
            {{ $t('XBon Drücken') }}
          </v-btn>
          <v-btn
              class="mt-1"
              block
              v-if="shouldShowZBon"
              x-large
              @click="printZBon"
              color="primary">
            {{ $t('ZBon_print') }}
          </v-btn>
        </v-card>
      </v-card>
    </div>
    <v-dialog v-model="checkOutDialog">
      <v-card width="100%">
        <v-card-title>{{ $t('请输入新的结账方式') }}</v-card-title>
        <check-out-calculator
            style="height: 564px"
            @payment-cancel="checkOutDialog=false"
            @payment-submit="changePaymentMethod"
            :total="changeOrderTotal"
        ></check-out-calculator>
      </v-card>
    </v-dialog>
    <v-dialog v-model="returnDishDialog">
      <v-simple-table v-if="realShow" height="calc(100vh - 144px)" style="width: 650px" fixed-header>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ $t('Tisch Nr.') }} / {{ $t('R. Nr.') }}</th>
            <th class="text-left">{{ $t('time') }}</th>
            <th class="text-left">{{ $t('Kellner') }}</th>
            <th class="text-left">{{ $t('退菜内容') }}</th>
            <th class="text-left">{{ $t('退菜理由') }}</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="order in returnList">
            <tr v-bind:key="order.orderId+order.Dname">
              <td>
                <span class="font-weight-bold">{{ order.name }}</span>/{{ order.orderId }}
              </td>
              <td>
                {{ order.time }}
              </td>
              <td>
                {{ order.servantName }}
              </td>
              <td>
                <b>{{ order.Dname }}</b> &times; {{ order.count }} = {{ order.fPrice }}
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
    <v-dialog v-model="discountDialog">
      <v-simple-table v-if="realShow" height="calc(100vh - 144px)" style="width: 650px" fixed-header>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ $t('Tisch Nr.') }} / {{ $t('R. Nr.') }}</th>
            <th class="text-left">{{ $t('time') }}</th>
            <th class="text-left">{{ $t('Kellner') }}</th>
            <th class="text-left">{{ $t('折扣内容') }}</th>
          </tr>
          </thead>
          <tbody>
          <template v-for="order in discountList">
            <tr v-bind:key="order.orderInfo.id+order.orderInfo.name">
              <td>
                <span class="font-weight-bold">{{ order.orderInfo.name }}</span>/{{ order.orderInfo.id }}
              </td>
              <td>{{ order.orderInfo.time }}</td>
              <td>{{ order.orderInfo.servantName }}</td>
              <td>
                <b>{{ order.orderInfo.discountStr }}</b> /- {{ order.orderInfo.value }}
              </td>
            </tr>
          </template>
          </tbody>
        </template>
      </v-simple-table>
    </v-dialog>
  </v-card>
</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import dayjs from 'dayjs'
import {
  changePayMethodForOrder,
  getBillListForServant,
  previewZBon,
  printXBon,
  printZBon,
  printZBonUseDate
} from '@/api/api'
import IKUtils from 'innerken-js-utils'
import CheckOutCalculator from '@/components/CheckOutCalculator'

export default {
  components: {
    CheckOutCalculator
  },
  name: 'Calendar',
  data: function () {
    return {
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
      bills: [],
      checkOutDialog: null,
      changeOrderTotal: 0,
      changeOrderId: null,
      returnDishDialog: null,
      discountDialog: null
    }
  },
  props: {
    tabIndex: {},
    realShow: {},
    singleZBonDate: {}
  },
  watch: {
    async singleZBonDate () {
      console.log('change')
      await this.loadData()
    },
    async realShow (val) {
      console.log(val)
      if (val) {
        await this.loadData()
      }
    },
    async tabIndex () {
      await this.loadData()
    }
  },
  computed: {
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
      if (GlobalConfig.UseDailyZbon) {
        if (!this.singleZBonDate) {
          return false
        }
        return dayjs().isAfter(dayjs(this.singleZBonDate, 'YYYY-MM-DD')
          .add(1, 'd').hour(4).minute(0))
      } else {
        return true
      }
    }
  },
  methods: {
    async changePaymentMethod (paymentLog = []) {
      if (paymentLog?.length > 0) {
        const res = await changePayMethodForOrder(this.changeOrderId, paymentLog)
        console.log(res)
        IKUtils.toast('OK')
        this.checkOutDialog = false
      } else {
        IKUtils.showError('Bitte Eine Paymethod zu wahlen.')
      }
      await this.loadData()
    },

    startChangePaymentMethodForOrder (order) {
      this.changeOrderId = order.orderId
      this.changeOrderTotal = order.totalPrice
      this.checkOutDialog = true
    },
    async printXBon () {
      IKUtils.showLoading()
      await printXBon(this.singleZBonDate, this.singleZBonDate)
      IKUtils.toast('OK')
    },
    async printZBon () {
      IKUtils.showConfirm(this.$t('Möchten Sie alle Datensätze drucken?'), this.$t('Bist du sicher?'), async () => {
        IKUtils.showLoading(false)
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

    async loadData () {
      if (this.singleZBonDate != null) {
        this.billData = await previewZBon(this.singleZBonDate, this.singleZBonDate)
      }
      this.bills = await getBillListForServant(null, this.singleZBonDate)
    }
  },
  mounted () {
    this.loadData()
  }
}
</script>

<style scoped>

</style>
