<template>
  <v-dialog v-model="realShow" max-width="800px">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>{{ $t('销售额') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon @click="realShow=!realShow">mdi-close</v-icon>
      </v-toolbar>
      <v-tabs v-model="tabIndex">
        <template v-if="isBoss">
          <v-tab>Tag-Sicht</v-tab>
          <v-tab>Latzt-Sicht</v-tab>
        </template>

        <v-tab>Meine Umsatz</v-tab>
      </v-tabs>
      <v-card-text>
        <v-tabs-items v-model="tabIndex">
          <template v-if="isBoss">
            <v-tab-item>
              <v-card>
                <div class="d-flex pa-1">
                  <v-date-picker elevation="2"
                                 v-model="singleZBonDate"
                                 :allowed-dates="allowedDates"
                                 class="mt-4"
                                 :max="todayDate"
                  />
                  <div class="pa-4" style="min-width: 464px">
                    <v-list subheader two-line>
                      <v-subheader>{{ $t('Umsatz') }}</v-subheader>
                      <template v-for="total in taxGroupInfo">
                        <v-list-item :key="total.taxRatePercentage">
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
                    </v-list>
                  </div>
                </div>
              </v-card>
            </v-tab-item>
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
                      <template v-for="total in taxGroupInfo">
                        <v-list-item :key="total.taxRatePercentage">
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

                    </v-list>
                  </div>
                </div>
              </v-card>
            </v-tab-item>
          </template>
          <v-tab-item>
            <v-card>
              <div class="d-flex pa-1">
                <v-date-picker elevation="2"
                               v-model="singleZBonDate"
                               :allowed-dates="allowedDates"
                               class="mt-4"
                               :max="todayDate"
                />
                <div class="pa-4" style="width: 360px">
                  <v-list subheader>

                    <v-list-item>
                      <v-list-item-icon><v-icon>mdi-cash-usd</v-icon></v-list-item-icon>
                      <v-list-item-content>
                        <v-list-item-title>
                          {{ displayData.content.bar | priceDisplay}}
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon><v-icon>mdi-credit-card-outline</v-icon></v-list-item-icon>
                      <v-list-item-title>
                        {{ displayData.content.EC | priceDisplay}}
                      </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-icon><v-icon>mdi-bell</v-icon></v-list-item-icon>
                      <v-list-item-title>
                        {{ displayData.content.tip | priceDisplay}}
                      </v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                    <v-subheader>{{ $t('Umsatz') }} für {{ displayData.servant.name }}</v-subheader>
                    <v-list-item>
                      <v-list-item-icon><v-icon>mdi-calendar-today</v-icon></v-list-item-icon>
                      <v-list-item-title>
                        {{ displayData.content.total | priceDisplay}}
                      </v-list-item-title>
                    </v-list-item>
                    <v-divider></v-divider>
                  </v-list>
                  <v-btn block x-large @click="printSummaryBon" color="primary" class="mt-4">Summary Ausdrucken</v-btn>
                </div>
              </div>
            </v-card>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>
      <v-card-actions v-if="isBoss">
        <v-spacer></v-spacer>
        <v-btn
            v-if="tabIndex<=1"
            x-large
            @click="printXBon"
            color="warning">
          XBon Drücken
        </v-btn>
        <v-btn
            v-if="shouldShowZBon"
            x-large
            @click="printZBon"
            color="primary">
          ZBon Drücken
        </v-btn>
      </v-card-actions>

    </v-card>
  </v-dialog>
</template>

<script>

import dayjs from 'dayjs'
import {
  previewServantSummary,
  previewZBon,
  printServantSummary,
  printXBon,
  printZBon,
  printZBonUseDate,
  ZBonList
} from '@/api/api'
import IKUtils from 'innerken-js-utils'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

const defaultDisplayData = {
  content: {
    total: 0,
    bar: 0,
    EC: 0,
    notPayed: 0,
    tip: 0
  },
  servant: {
    id: -1,
    name: 'Servant 1'
  },
  paymentDetail: []
}

export default {
  name: 'SalesDialog',
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
      lastZBonPrintDate: null,
      tabIndex: GlobalConfig.UseDailyZbon ? 0 : 1,
      displayData: defaultDisplayData,
      todayDate: dayjs().format('YYYY-MM-DD'),
      singleZBonDate: null
    }
  },
  computed: {
    shouldShowZBon () {
      if (GlobalConfig.UseDailyZbon) {
        if (!this.singleZBonDate) {
          return false
        }
        return dayjs()
          .isAfter(dayjs(this.singleZBonDate, 'YYYY-MM-DD').add(1, 'd').hour(4).minute(0))
      } else {
        return this.tabIndex === 1
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
      IKUtils.showConfirm('Möchten Sie alle Datensätze drucken?', 'Bist du sicher?', async () => {
        IKUtils.showLoading()
        if (GlobalConfig.UseDailyZbon) {
          await printZBonUseDate(this.singleZBonDate, this.singleZBonDate)
        } else {
          if (this.lastZBonPrintDate.isAfter(dayjs().subtract(5, 'm'))) {
            IKUtils.showError('Die letzte Druckanforderung wurde innerhalb von 5 Minuten ausgegeben.' +
                ' Warten Sie mindestens 5 Minuten, bevor Sie erneut drucken')
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
    async loadData () {
      // 抑制老版本，以后一定要删掉
      try {
        this.lastZBonPrintDate = dayjs((await ZBonList())[0].createTimeStamp)
        if (this.tabIndex === 1) {
          this.billData = await previewZBon(this.lastZBonPrintDate.format('YYYY-MM-DD'),
            dayjs().format('YYYY-MM-DD'))
        } else {
          this.billData = await previewZBon(this.singleZBonDate, this.singleZBonDate)
        }
        this.displayData = Object.assign({}, defaultDisplayData, await previewServantSummary(this.password, this.singleZBonDate, this.singleZBonDate))
      } catch (e) {

      }
    }
  },

  watch: {
    async tabIndex () {
      await this.loadData()
    },
    async singleZBonDate () {
      await this.loadData()
    },
    realShow (val) {
      if (val) {
        this.loadData()
      }
    }
  },
  mounted () {
    this.loadData()
    this.singleZBonDate = this.todayDate
  }

}
</script>

<style scoped>

</style>
