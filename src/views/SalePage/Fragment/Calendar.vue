<template>
    <v-card color="#f6f6f6" elevation="0" style="position: relative">

        <div class="flex-grow-1">
            <bill-table :is-boss="isBoss" :orders="displayOrder" :show-operation="true" @need-refresh="loadData"/>
        </div>

        <div style="position: fixed;bottom: 0;left: 64px;width: calc(100vw - 364px)">
            <v-card class="d-flex px-4 py-2 pb-4" color="white" elevation="0" tile>
                <div style="display: grid;grid-auto-flow: column;grid-gap: 8px;">
                    <v-text-field
                            hide-details
                            v-model="search"
                            :placeholder="$t('SearchOrderTable')"
                            prepend-inner-icon="mdi-magnify">
                    </v-text-field>
                    <v-select
                            hide-details
                            v-model="appliedFilter.payment"
                            :item-text="item => item.langPayMethodName"
                            :items="payMethodList"
                            :label="$t('PaymentMethod')"
                            multiple
                            @change="updateFilter"
                    >
                    </v-select>
                    <v-select
                            hide-details
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

    </v-card>
</template>

<script>
import { getBillListForServant, loadAllServants, loadPaymentMethods, previewZBon } from '@/api/api'
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
