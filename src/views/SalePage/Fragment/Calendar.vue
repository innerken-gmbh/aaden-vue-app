<template>
  <v-card color="#f6f6f6" elevation="0" style="position: relative">
    <div class="d-flex">
      <div class="flex-grow-1">
        <bill-table :is-boss="isBoss" :orders="displayOrder" :show-operation="true" @need-refresh="loadData"/>
      </div>
      <v-card v-dragscroll height="calc(100vh - 64px)" class="pa-4" elevation="0" style="overflow-y: scroll"
              width="300">
        <v-sheet class="text-body-1">
          <h4>{{ $t('Statistic') }}</h4>
          <div class="mt-4">
            <div class="d-flex justify-space-between align-center">
              <div class="hideMore"
                   style="max-width: 150px">
                <div style="font-size: 24px">{{ $t('All') }} {{ $t('Sales') }}</div>
              </div>
              <div class="font-weight-bold" style="font-size: 24px">{{ billContent.total | priceDisplay }}</div>
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
          <v-sheet>
            <div v-for="p in paidInfoList" :key="p.id" class="d-flex">
              <div>
                {{ p.paidName }}
              </div>
              <v-spacer></v-spacer>
              <div class="font-weight-bold">
                {{ p.paidTotal | priceDisplay }}
              </div>
            </div>
          </v-sheet>
          <v-divider class="my-4"></v-divider>
          <v-card class="d-flex align-center pa-2" color="error lighten-2" dark
                  elevation="0"
                  @click="returnDishDialog=true">
            <div
              class="hideMore"
              style="max-width: 90px"
            >
              <h3>{{ $t('CancelOrder') }}</h3>
            </div>
            <v-spacer></v-spacer>
            <h3>{{ totalReturn | priceDisplay }}({{ returnList.length }})
              <v-icon class="mt-n1" size="18px">mdi-chevron-right</v-icon>
            </h3>
          </v-card>
          <v-card class="d-flex align-center pa-2 mt-2" color="warning lighten-2" dark elevation="0"
                  @click="discountDialog=true">
            <h3>{{ $t('Discount') }}</h3>
            <v-spacer></v-spacer>
            <h3>{{ totalDiscount | priceDisplay }}({{ discountList.length }})
              <v-icon class="mt-n1" size="18px">mdi-chevron-right</v-icon>
            </h3>
          </v-card>
        </v-sheet>
        <v-divider></v-divider>

        <v-card elevation="0">

          <v-btn
            block
            class="mt-4"
            color="warning"
            elevation="0"
            x-large
            @click="printXBon">
            {{ $t('PrintXBon') }}
          </v-btn>
          <v-btn
            v-if="shouldShowZBon"
            block
            class="mt-2"
            color="primary"
            elevation="0"
            x-large
            @click="printZBon">
            {{ $t('PrintZBon') }}
          </v-btn>
        </v-card>

      </v-card>

    </div>
    <div style="position: fixed;bottom: 0;left: 56px;width: calc(100vw - 356px)">
      <v-card class="d-flex px-4 pt-2" color="white" elevation="1" tile>
        <div style="display: grid;grid-auto-flow: column;grid-gap: 8px;">
          <v-text-field
            v-model="search"
            :placeholder="$t('SearchOrderTable')"
            prepend-inner-icon="mdi-magnify">
          </v-text-field>
          <v-select
            v-model="appliedFilter.payment"
            :item-text="item => item.langPayMethodName"
            :items="payMethodList"
            :label="$t('PaymentMethod')"
            multiple
            @change="updateFilter"
          >
          </v-select>
          <v-select
            v-model="appliedFilter.servant"
            :item-text="item => item.name"
            :items="servantList"
            :label="$t('WaiterInfo')"
            @change="updateFilter"
          >
          </v-select>
          <v-btn v-if="showClearButton" class="mt-2" @click="clearFilter">
            <v-icon>mdi-close-circle</v-icon>
            {{ $t('Clear') }}
          </v-btn>
        </div>

        <v-spacer></v-spacer>
      </v-card>
    </div>
    <v-dialog v-model="returnDishDialog" width="fit-content">
      <v-simple-table v-if="returnDishDialog" fixed-header
                      height="calc(100vh - 144px)"
                      style="width: 650px">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ $t('TableNumber') }} / {{ $t('SerialNumber') }}</th>
            <th class="text-left">{{ $t('time') }}</th>
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
      <v-simple-table v-if="discountDialog" fixed-header height="calc(100vh - 144px)" style="width: 650px">
        <template v-slot:default>
          <thead>
          <tr>
            <th class="text-left">{{ $t('TableNumber') }} / {{ $t('SerialNumber') }}</th>
            <th class="text-left">{{ $t('time') }}</th>
            <th class="text-left">{{ $t('WaiterInfo') }}</th>
            <th class="text-left">{{ $t('DiscountContent') }}</th>
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
import { dragscroll } from 'vue-dragscroll/src/main'

const defaultRealFilter = {
  servant: '',
  payment: []
}

export default {
  name: 'Calendar',
  components: { BillTable },
  directives: {
    dragscroll
  },
  data: function () {
    return {
      showAllPayment: false,
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
          paidInfo: [],
          fTotalTe: 0
        }
      },
      bills: [],
      returnDishDialog: null,
      discountDialog: null
    }
  },
  props: {
    isBoss: {},
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
    showClearButton () {
      return this.search || this.appliedFilter.servant !== '' || this.appliedFilter.payment?.length !== 0
    },
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
        payment: []
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
      IKUtils.showConfirm(this.$t('PrintAllRecords'), this.$t('AreYouSure'), async () => {
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
.hideMore {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

</style>
