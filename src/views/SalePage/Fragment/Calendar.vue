<template>
  <v-card elevation="0">
    <div class="d-flex">
      <div class="pa-2 flex-grow-1">
        <v-app-bar class="mt-1" dense elevation="0" color="white">
          <v-text-field
            class=""
            style="max-width: 320px"
            solo
            prepend-inner-icon="mdi-magnify"
            :placeholder="$t('Search order/table')"
            v-model="search">
          </v-text-field>
          <v-select
            chips
            deletable-chips
            :label="'Servant'"
            :items="servantList"
            v-model="appliedFilter.servant"
            @change="updateFilter"
            :item-text="item => item.name"
            solo
            class="mx-3"
            style="max-width: 160px"
          >
          </v-select>
          <v-select
            chips
            deletable-chips
            :label="'Pay Method'"
            :items="payMethodList"
            v-model="appliedFilter.payment"
            @change="updateFilter"
            :item-text="item => item.langPayMethodName"
            solo
            multiple
            class="mx-3"
            style="max-width: 320px"
          >
          </v-select>
          <v-btn icon class="mb-6" @click="clearFilter"><v-icon>mdi-close-circle</v-icon></v-btn>
          <v-spacer></v-spacer>
        </v-app-bar>
        <bill-table @need-refresh="loadData" :orders="displayOrder" :show-operation="true"/>
      </div>
      <v-navigation-drawer permanent right width="272">
        <v-card elevation="0" class="pa-2" width="272">

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
            <template v-for="pay in paidInfoList">
              <div class="pa-1 mx-1" :key="pay.id">
                <div class="d-flex justify-space-between">
                  <h4>{{ pay.paidName }}</h4>
                  <div>{{ pay.paidTotal | priceDisplay }}</div>
                </div>
              </div>
            </template>
          </v-card>
          <v-card elevation="0">
            <v-card color="error lighten-2" dark @click="returnDishDialog=true"
                    elevation="0"
                    class="d-flex align-center pa-2">
              <h3>{{ $t('退菜') }}</h3>
              <v-spacer></v-spacer>
              <h3>{{ totalReturn | priceDisplay }}({{ returnList.length }})
                <v-icon class="mt-n1" size="18px">mdi-chevron-right</v-icon>
              </h3>
            </v-card>
            <v-card color="warning lighten-2" elevation="0" dark @click="discountDialog=true"
                    class="d-flex align-center pa-2 mt-2">
              <h3>{{ $t('折扣') }}</h3>
              <v-spacer></v-spacer>
              <h3>{{ totalDiscount | priceDisplay }}({{ discountList.length }})
                <v-icon class="mt-n1" size="18px">mdi-chevron-right</v-icon>
              </h3>
            </v-card>
            <v-btn
              class="mt-4"
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
              {{ $t('ZBon Drücken') }}
            </v-btn>
          </v-card>

        </v-card>
      </v-navigation-drawer>
    </div>

    <v-dialog v-model="returnDishDialog" width="fit-content">
      <v-simple-table v-if="returnDishDialog" height="calc(100vh - 144px)"
                      style="width: 650px"
                      fixed-header>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ $t('Tisch Nr.') }} / {{ $t('R. Nr.') }}</th>
            <th class="text-left">{{ $t('time') }}</th>
            <th class="text-left">{{ $t('跑堂') }}</th>
            <th class="text-left">{{ $t('退菜内容') }}</th>
            <th class="text-left">{{ $t('退菜理由') }}</th>
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
    <v-dialog v-model="discountDialog" width="fit-content">
      <v-simple-table v-if="discountDialog" height="calc(100vh - 144px)" style="width: 650px" fixed-header>
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ $t('Tisch Nr.') }} / {{ $t('R. Nr.') }}</th>
            <th class="text-left">{{ $t('time') }}</th>
            <th class="text-left">{{ $t('跑堂') }}</th>
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
import dayjs from 'dayjs'
import {
  getBillListForServant,
  loadAllServants,
  loadPaymentMethods,
  previewZBon,
  printXBon,
  printZBonUseDate
} from '@/api/api'
import IKUtils from 'innerken-js-utils'
import BillTable from '@/views/SalePage/BillTable'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

const defaultRealFilter = {
  servant: '',
  payment: [],
  status: []
}

export default {
  name: 'Calendar',
  components: { BillTable },
  data: function () {
    return {
      appliedFilter: defaultRealFilter,
      servantList: [],
      payMethodList: [],
      search: '',
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
      returnDishDialog: null,
      discountDialog: null
    }
  },
  props: {
    tabIndex: {},
    singleZBonDate: {}
  },
  watch: {
    async singleZBonDate () {
      await this.loadData()
    },
    async tabIndex () {
      await this.loadData()
    }
  },
  computed: {
    displayOrder () {
      return this.bills.filter(i => {
        if (i.tableName.toLowerCase().includes(this.search.toLowerCase()) || i.orderId.includes(this.search) || i.totalPrice.includes(this.search)) {
          return i
        }
      })
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
    clearFilter () {
      this.search = ''
      this.appliedFilter = {
        servant: '',
        payment: [],
        status: []
      }
      this.updateFilter()
    },
    async updateFilter () {
      this.search = ''
      const selectedServantPw = this.appliedFilter.servant
      const selectedPayMethod = this.appliedFilter.payment
      this.bills = ((await getBillListForServant(selectedServantPw, ...this.singleZBonDate)).orders)
      this.bills = this.bills.filter(b => {
        if (selectedPayMethod?.length > 0 && selectedPayMethod.some(s => b.payMethodId === s)) {
          return b
        } else if (selectedPayMethod?.length === 0) {
          return b
        }
      })
    },
    async printXBon () {
      IKUtils.showLoading()
      await printXBon(...this.singleZBonDate)
      IKUtils.toast('OK')
    },
    async printZBon () {
      IKUtils.showConfirm(this.$t('Möchten Sie alle Datensätze drucken?'), this.$t('Bist du sicher?'), async () => {
        IKUtils.showLoading(false)
        await printZBonUseDate(...this.singleZBonDate)
        IKUtils.toast('OK')
        await this.loadData()
      })
    },

    async loadData () {
      this.clearFilter()
      if (this.singleZBonDate != null) {
        this.billData = await previewZBon(...this.singleZBonDate)
        this.bills = (await getBillListForServant(null, ...this.singleZBonDate)).orders
      }
    }
  },
  async mounted () {
    await this.loadData()
    this.servantList = await loadAllServants()
    this.servantList.forEach(i => {
      i.value = i.password
    })
    this.payMethodList = await loadPaymentMethods()
    this.payMethodList.forEach(i => {
      i.value = i.id
      i.langPayMethodName = i.langs.filter(l => l.lang.toLowerCase() === GlobalConfig.lang.toLowerCase())[0].name
    })
  }
}
</script>

<style scoped>

</style>
