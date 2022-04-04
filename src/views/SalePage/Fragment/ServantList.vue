<template>
  <v-card elevation="0" class="servantCardStyle" width="100%">
    <v-card-title>跑堂日结单</v-card-title>
    <div style="display: grid; grid-template-columns: repeat(4,1fr); grid-gap: 40px; overflow:scroll;">
      <v-card width="400" v-for="servant in loadAllServant" :key="servant.servant.id">
        <v-subheader dark class="grey lighten-2" style="height: 60px">
<!--          <v-spacer></v-spacer>-->
<!--          <v-btn>日结单</v-btn>-->
        </v-subheader>
        <div class="text-center">
          <v-avatar
            style="margin-top: -20px"
            color="indigo"
            size="56"
          >
            <span class="white--text text-h4">{{ servant.servant.name[0] }}</span>
          </v-avatar>
        </div>
        <div class="servantName text--h6 text-center mb-4"> {{ servant.servant.name }}</div>
        <div class="d-flex justify-center text-center mb-4">
          <div class="mx-4 lighten-1 grey--text " style="font-weight: 600">
            {{ servant.servant.isPartTime === '1' ? '兼职' : '长期' }}
          </div>
        </div>
        <div class="d-flex justify-center mb-5">
          <v-card class="servantSaleCard mx-4">
            <div class="text-caption">收入总计</div>
            <div class="text-h5 orange--text mt-1"> {{ servant.todayTotal }}</div>
          </v-card>
          <v-card class="servantSaleCard mx-4">
            <div class="text-caption">小费总计</div>
            <div class="text-h5 green--text mt-1"> {{ servant.tipIncome }}</div>
          </v-card>
        </div>
        <div class="mx-8" v-for="pay in fillPayMethodTotal(servant.payMethodTotal,activeId!==servant.servant.id)" :key="pay.id">
          <v-list-item >
            {{ pay.name }}
            <v-spacer/>
            {{ pay.amount }}
          </v-list-item>
          <v-divider></v-divider>
        </div>
        <div class="mx-8 mb-4">
          <v-btn dark color="orange" block @click="printServantSummaryForToday(servant.servant.password)">打印日结单</v-btn>
        </div>
      </v-card>
    </div>
    <div class="d-flex">
    </div>
  </v-card>
</template>

<script>
import { loadPaymentMethods, loadServantList, printServantSummaryForToday } from '@/api/api'
import i18n from '@/i18n'

export default {
  name: 'ServantList',
  data: () => {
    return {
      items: [
        { text: 'asad' },
        { text: 'asad' },
        { text: 'asad' }
      ],
      activeId: null,
      loadAllServant: null,
      expandPayMethodDetail: false,
      paymentMethodList: []
    }
  },
  props: {
    singleZBonDate: {}
  },
  methods: {
    printServantSummaryForToday,
    async reloadServantPage () {
      this.loadAllServant = await loadServantList()
    },
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
          const r = payMethod.find(t => parseInt(t.payMethodId) === parseInt(p.id))
          return {
            name: p._langsname,
            amount: r?.sumTotal ?? 0,
            id: p.id
          }
        })
      }
    }
  },
  watch: {
    async singleZBonDate () {
      await this.reloadServantPage()
    }
  },
  async mounted () {
    this.paymentMethodList = await loadPaymentMethods()
    await this.reloadServantPage()
  }
}
</script>

<style scoped>
.servantCardStyle {
  box-shadow: 0 12px 50px 2px #13507c24;
  border-radius: 8px;
  background-color: #fff;
  padding: 1.25rem;
  overflow: hidden;
}

.servantName {
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2rem;
  letter-spacing: .0125em;
  text-transform: none;
}

.servantSaleCard {
  width: 150px;
  padding: 1.25rem;
  overflow: hidden;
}

.servantDesc {

}

.manual-v-layout {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -ms-flex: 1 1 auto;
  flex: 1 1 auto;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -webkit-box-orient: horizontal;
  -webkit-box-direction: normal;
  -ms-flex-direction: row;
  flex-direction: row;
  padding-bottom: 8px !important;
  padding-top: 8px !important;
}
</style>
