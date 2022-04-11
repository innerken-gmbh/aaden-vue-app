<template>
  <div class="px-4" style="max-height: 100vh; overflow-y: scroll">
    <v-subheader>
      <v-btn color="primary" @click="allZBon(...singleZBonDate)">打印全部跑堂日结单</v-btn>
    </v-subheader>
    <div style="display: grid; grid-template-columns: repeat(3,1fr); grid-gap: 20px;">
      <v-card width="400" elevation="0" color="#f6f6f6" v-for="servant in displayServantInfo" :key="servant.servant.id">
        <div class="servantName text--h6 text-center mb-1"> {{ servant.servant.name }}</div>
        <div class="d-flex justify-center text-center mb-1">
          <div class="mx-4 lighten-1 grey--text " style="font-weight: 600">
            {{ servant.servant.isPartTime === '1' ? '兼职' : '长期' }}
          </div>
        </div>
        <div class="d-flex justify-center mb-4">
          <div class="servantSaleCard ml-4 mx-1" style="width: 210px">
            <div class="text-caption">收入总计</div>
            <div class="text-h5 green--text mt-1"> {{ servant.todayTotal | priceDisplay1 }}</div>
          </div>
          <div class="servantSaleCard mx-1">
            <div class="text-caption">小费总计</div>
            <div class="text-h5 orange--text mt-1"> {{ servant.tipIncome | priceDisplay1 }}</div>
          </div>
          <div class="servantSaleCard mx-1">
            <div class="text-caption">未结账</div>
            <div class="text-h5 red--text mt-1"> {{ servant.tipIncome | priceDisplay1 }}</div>
          </div>
        </div>
        <div class="mx-8" v-for="pay in fillPayMethodTotal(servant.payMethodTotal,activeId!==servant.servant.id)"
             :key="pay.id">
          <v-list-item>
            {{ pay.name }}
            <v-spacer/>
            {{ pay.amount | priceDisplay }}
          </v-list-item>
          <v-divider></v-divider>
        </div>
        <div class="mx-8 mb-4">
          <v-btn dark color="orange" block @click="singleZBon(servant.servant.password, ...singleZBonDate)">打印日结单
          </v-btn>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import {
  loadPaymentMethods,
  printServantSummaryForToday,
  printAllServantSummaryForToday, getBillListForServant, loadAllServants
} from '@/api/api'
import i18n from '@/i18n'

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
  name: 'ServantList',
  data: () => {
    return {
      activeId: null,
      loadAllServant: null,
      expandPayMethodDetail: false,
      paymentMethodList: [],
      servantInfo: [],
      servantList: []
    }
  },
  props: {
    singleZBonDate: {}
  },
  computed: {
    displayServantInfo () {
      return this.servantInfo.filter(s => s.todayTotal > 0)
    }
  },
  methods: {
    async loadServantsInfo () {
      this.servantInfo = []
      for (const s of this.servantList) {
        this.servantInfo.push(Object.assign({}, defaultDisplayData,
          await getBillListForServant(s.password,
            ...this.singleZBonDate)))
      }
    },
    async singleZBon (pw, startDate, endDate) {
      await printServantSummaryForToday(pw, startDate, endDate)
    },
    async allZBon (startDate, endDate) {
      await printAllServantSummaryForToday(startDate, endDate)
    },
    // 可以考虑把这个函数放到Utils中
    fillPayMethodTotal (payMethod, withFilter = true) {
      if (withFilter) {
        const filter = (p) => p.id >= 1 && p.id <= 5
        const included = this.paymentMethodList.filter(filter)
        const res = included.map(p => {
          const r = payMethod.find(t => parseInt(t.payMethodId) === parseInt(p.id))
          return {
            name: p.name,
            amount: r?.sumTotal ?? 0,
            id: p.id
          }
        })

        const otherAmount = payMethod.filter(p => parseInt(p.payMethodId) > 5).reduce((amount, i) => {
          amount += parseFloat(i.sumTotal)
          return amount
        }, 0)

        return [...res, {
          name: i18n.t('Others'),
          amount: otherAmount,
          id: '-1'
        }]
      } else {
        return this.paymentMethodList.filter(p => p.id > 0 && p.id !== 9).map(p => {
          console.log(p)
          const r = payMethod.find(t => parseInt(t.payMethodId) === parseInt(p.id))
          return {
            name: p.langs[0].name,
            amount: r?.sumTotal ?? 0,
            id: p.id
          }
        })
      }
    }
  },
  watch: {
    async singleZBonDate (val) {
      await this.loadServantsInfo()
    }
  },
  async mounted () {
    this.paymentMethodList = await loadPaymentMethods()
    this.servantList = await loadAllServants()
    await this.loadServantsInfo()
  }
}
</script>

<style scoped>

.servantName {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: .0125em;
  text-transform: none;
}

.servantSaleCard {
  width: 180px;
  padding: 1rem;
  overflow: hidden;
}
</style>
