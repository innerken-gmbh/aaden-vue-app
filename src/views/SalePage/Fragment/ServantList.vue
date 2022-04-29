<template>
  <div style="max-height: calc(100vh - 112px); overflow-y: scroll">
    <div class="d-flex">
      <div
        style="min-width: calc(100% - 272px)"
        class="mt-2 mx-4">
        <div style="display: grid; grid-template-columns: repeat(3,1fr); grid-gap: 20px; grid-auto-rows: 305px;min-height: calc(90vh - 120px)">
          <div
            v-for="s in displayServantInfo"
            :key="s.servant.id"
            style="background: #f0f0f0;overflow: visible; border-radius: 16px; "
            :style="activeId===s.servant.id ? {zIndex: 100}:{}"
            @click="changeActiveId(s.servant.id)"
          >
            <div
              style="background: #f0f0f0;"
              class="pa-2"
            >
              <div class="d-flex justify-space-between align-center py-2">
                <div class="display-1">
                  {{ s.servant.name }}
                </div>
                <v-btn
                  class="mr-0"
                  small
                  color="warning"
                  @click="singleZBon(s.servant.password)"
                >
                  {{ $t('打印日结单') }}
                </v-btn>
              </div>

              <v-divider></v-divider>
              <div>
                <div class="py-2">
                  <div
                    v-for="pay in fillPayMethodTotal(s.payMethodTotal,activeId!==s.servant.id)"
                    :key="pay.id"
                    class="d-flex justify-space-between pt-1"
                  >
                    <div class="label">
                      {{ pay.name }}
                    </div>
                    <div class="value font-weight-bold">
                      {{ pay.amount | priceDisplay }}
                    </div>
                  </div>

                  <div
                    class="d-flex justify-start py-1"
                  >
                    <div
                      v-if="activeId!==s.servant.id"
                      style="border-bottom: 1px solid #4D8AED;color: #4D8AED"
                    >
                      {{ $t('展示更多') }}
                    </div>
                    <div
                      v-else
                      style="border-bottom: 1px solid #4D8AED;color: #4D8AED"
                    >
                      {{ $t('收起') }}
                    </div>
                  </div>
                </div>

                <v-divider></v-divider>

                <div
                  class="d-flex justify-space-between pt-1"
                >
                  <div class="label">
                    {{ $t('小费') }}
                  </div>
                  <div class="value font-weight-bold">
                    {{ s.tipIncome ? s.tipIncome : 0 | priceDisplay }}
                  </div>
                </div>

                <div
                  class="d-flex justify-space-between pt-1 "
                >
                  <div class="label">
                    {{ $t('今日总计(含小费)') }}
                  </div>
                  <div class="value font-weight-bold">
                    {{ s.todayTotal ? s.todayTotal : 0 | priceDisplay }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <v-navigation-drawer permanent right width="272">
        <v-card elevation="0" class="pl-6">
          <v-btn right x-large dark class="orange mb-6 mt-2" block @click="allZBon(...singleZBonDate)">{{ $t('打印全部跑堂日结单') }}</v-btn>
        </v-card>
      </v-navigation-drawer>
    </div>
  </div>
</template>

<script>
import {
  loadPaymentMethods,
  printServantSummaryByDate,
  printAllServantSummaryByDate, getBillListForServant, loadAllServants
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
      expandPayMethodDetail: false,
      paymentMethodList: [],
      servantInfo: [],
      servantList: [],
      showTotalPayment: false
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
    changeActiveId (activeId) {
      this.activeId === activeId ? this.activeId = null : this.activeId = activeId
    },
    async loadServantsInfo () {
      this.servantInfo = []
      for (const s of this.servantList) {
        this.servantInfo.push(Object.assign({}, defaultDisplayData,
          await getBillListForServant(s.password,
            ...this.singleZBonDate)))
      }
    },
    async singleZBon (pw, startDate, endDate) {
      await printServantSummaryByDate(pw, startDate, endDate)
    },
    async allZBon (startDate, endDate) {
      await printAllServantSummaryByDate(startDate, endDate)
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
  width: 200px;
  padding: 1rem;
}
</style>
