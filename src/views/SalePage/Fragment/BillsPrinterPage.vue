<template>
  <div v-if="!isPrint">
    <v-card
        class="pa-4 d-flex flex-column"
        color="white"
        elevation="0"
        min-height="550px"
    >
      <div class="d-flex align-center justify-center">
        <div class="pa-4 font-weight-bold">{{ headerDateDisplay }}</div>
        <v-spacer></v-spacer>
        <div>
          <v-btn icon @click="$emit('closeDialog')">
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </div>
      </div>
      <v-card
          class="mt-2 px-4 d-flex flex-column"
          color="#f6f5f6"
          elevation="0"
      >
        <div
            v-if="realDate[0] !== realDate[1]"
            class="d-flex align-center justify-center"
        >
          <div>{{ $t('CombinedDocuments') }}</div>
          <v-spacer/>
          <v-switch
              v-model="mergeBills"
              dense
              style="margin-right: -10px"
          />
        </div>
      </v-card>
      <v-card
          class="mt-2 px-4 d-flex flex-column"
          color="#f6f5f6"
          elevation="0"
      >
        <div class="d-flex align-center justify-center">
          <div>{{ $t('PasswordResetToEmail') }}</div>
          <v-spacer/>
          <v-switch
              v-model="sendEmail"
              dense
              style="margin-right: -10px"
              @click="checkZBonEmail"
          />
        </div>
      </v-card>
      <div
          class="text-body-1 px-4 mt-2"
          v-html="showDetailPrintMessage"
      />
      <div class="d-flex text-body-1 px-4">
        <v-spacer/>
        <div>{{ $t('TotalOf') }} <span class="font-weight-bold">{{ totalBillsCount }}</span> {{ $t('Pice') }}</div>
      </div>
      <v-spacer/>
      <div style="display: grid;grid-template-columns: repeat(6,minmax(0,1fr));grid-gap: 12px">
        <tab-button
            :active="totalSales"
            :color="totalSales ? '#F48FE2' : '#ffffff'"
            :name="$t('SalesStatistics')"
            icon="mdi-chart-line"
            @click="totalSales = !totalSales"
        />
        <tab-button
            :active="totalTime"
            :color="totalTime ? '#F48FE2' : '#ffffff'"
            :name="$t('TotalPeriod')"
            icon="mdi-clock-time-eight-outline"
            @click="totalTime = !totalTime"
        />
        <tab-button
            :active="deliveryList"
            :color="deliveryList ? '#F48FE2' : '#ffffff'"
            :name="$t('DeliveryList')"
            icon="mdi-truck"
            @click="deliveryList = !deliveryList"
        />
        <tab-button
            :active="activeXBon"
            :color="activeXBon ? '#F48FE2' : '#ffffff'"
            icon="mdi-receipt-outline"
            name="XBon"
            @click="selectXBon"
        />
        <tab-button
            :active="activeZBon"
            :color="activeZBon ? '#F48FE2' : '#ffffff'"
            icon="mdi-calendar-text-outline"
            name="ZBon"
            @click="selectZBon"
        />
      </div>
      <div>
        <v-btn
            v-if="sendEmail"
            :disabled="!disableSendEmail"
            block
            class="mt-2"
            color="blue lighten-4 black--text"
            elevation="0"
            large
            @click="selectSendEmail"
        >
          <div>{{ $t('OnlySentToMail') }}</div>
          <v-icon right>
            mdi-send
          </v-icon>
        </v-btn>
        <v-btn
            :disabled="!disablePrint"
            block
            class="mt-2"
            color="amber lighten-4 black--text"
            elevation="0"
            large
            @click="selectPrintType"
        >
          <div>{{ $t('IncomingPrint') }}</div>
          <v-icon right>
            mdi-send
          </v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
  <div v-else>
    <template v-if="!printEnd">
      <template v-if="showPrintWarn">
        <v-card
            class="d-flex align-center justify-center flex-column text-center pa-8"
            color="white"
            elevation="0"
            min-height="550px"
        >
          <v-icon
              color="red"
              size="64"
          >
            mdi-alert-circle
          </v-icon>
          <div class="text-h5 font-weight-bold mt-4">
            {{ $t('SureTablesCleared') }}
          </div>
          <div class="text-h5 font-weight-bold">
            {{ $t('CurrentlyOpenTables') }}：{{ unCheckTableName }}
          </div>
          <div class="text-body-1">
            {{ $t('DailyPrintTableHint') }}
          </div>
          <div class="mt-4 d-flex align-center justify-center">
            <v-btn
                color="grey lighten-2"
                elevation="0"
                width="80%"
                @click="isPrint = false;showPrintWarn = false"
            >
              {{ $t('Cancel') }}
            </v-btn>
            <v-btn
                class="ml-4"
                color="amber lighten-4 black--text"
                elevation="0"
                width="80%"
                @click="realPrintZbon"
            >
              {{ $t('print') }}
            </v-btn>
          </div>
        </v-card>
      </template>
      <template v-else>
        <v-card
            class="d-flex align-center justify-center flex-column"
            color="white"
            elevation="0"
            min-height="550px"
        >
          <div class="mb-10 text-h4 font-weight-bold">
            {{ $t('print') }}
          </div>
          <v-progress-circular
              indeterminate
              size="64"
          />
        </v-card>
      </template>
    </template>
    <template v-else>
      <v-card
          class="pa-4 d-flex align-center justify-center flex-column"
          color="white"
          elevation="0"
          min-height="550px"
      >
        <div
            class="d-flex align-center justify-center flex-column"
        >
          <v-icon
              color="green"
              x-large
          >
            mdi-check-circle-outline
          </v-icon>
          <div class="mt-10 text-h4">
            {{ $t('print_success') }}
          </div>
          <div class="text-body-2 text--secondary text-center mt-2">
            {{ $t('need30secondcheckJunk') }}
          </div>
          <v-btn
              :loading="isLoading"
              class="mt-6"
              color="amber lighten-4 black--text"
              elevation="0"
              width="100%"
              @click="backToSelectPrint"
          >
            {{ $t('Zurück') }}
          </v-btn>
        </div>
      </v-card>
    </template>
  </div>
</template>

<script>

import i18n from '@/i18n'
import dayjs from 'dayjs'
import {
  getAllTableList,
  getNiceRestaurantInfo,
  newGetZBon, newPrintZBon,
  newSetZBon,
  printRealTimeSalesBon,
  printSalesBon,
  printSummaryBon,
  sendRealTimeSalesBon,
  sendSalesBon
} from '@/oldjs/zbonPrint'
import { printDeliveryBon, showSuccessMessage } from '@/api/api'
import TabButton from '@/components/Base/TabButton'
import { today } from '@/api/Repository/DateRepository'
import { Remember } from '@/api/remember'
import { mapMutations } from 'vuex'

export default {
  name: 'BillsPrinterPage',
  components: {
    TabButton
  },
  props: {
    realDate: {},
    dialogStatus: {}
  },
  data: function () {
    return {
      isLoading: false,
      detailTime: [],
      unCheckTable: [],
      showPrintWarn: false,
      printEnd: false,
      isPrint: false,
      ZBonList: [],
      billsCount: '',
      activeZBon: Remember.activeZBon,
      activeXBon: Remember.activeXBon,
      deliveryList: Remember.deliveryList,
      sendEmail: Remember.sendEmail,
      mergeBills: Remember.mergeBills,
      totalTime: Remember.totalTime,
      totalSales: Remember.totalSales
    }
  },
  watch: {
    dialogStatus (val) {
      if (val) {
        this.loadData()
      } else {
        this.isPrint = false
        this.printEnd = false
        this.showPrintWarn = false
        this.isLoading = false
      }
    }
  },
  computed: {
    unCheckTableName () {
      return this.unCheckTable.join()
    },
    headerDateDisplay () {
      const [startDate, endDate] = this.realDate
      if (startDate === endDate) {
        return startDate
      } else {
        return startDate + ' ~ ' + endDate
      }
    },
    showDetailPrintMessage () {
      let printMessage = ''
      const ZBonLength = this.ZBonList.length > 0 ? this.ZBonList.length : 1
      if (!this.mergeBills) {
        if (this.activeZBon) {
          printMessage += i18n.t('DailyStatement') + '(ZBon)' + ' ' + ZBonLength + ' ' + i18n.t('Pice') + '<br>'
        }
        if (this.activeXBon) {
          printMessage += i18n.t('PreviewSheet') + '(XBon)' + ' ' + this.billsCount + ' ' + i18n.t('Pice') + '<br>'
        }
        if (this.deliveryList) {
          printMessage += i18n.t('DeliveryList') + ' ' + this.billsCount + ' ' + i18n.t('Pice') + '<br>'
        }
        if (this.totalTime) {
          printMessage += i18n.t('TotalPeriod') + ' ' + this.billsCount + ' ' + i18n.t('Pice') + '<br>'
        }
        if (this.totalSales) {
          printMessage += i18n.t('SalesStatistics') + ' ' + this.billsCount + ' ' + i18n.t('Pice') + '<br>'
        }
      } else {
        if (this.activeXBon) {
          printMessage += i18n.t('PreviewSheet') + '(XBon)' + ' ' + 1 + ' ' + i18n.t('Pice') + '<br>'
        }
        if (this.deliveryList) {
          printMessage += i18n.t('DeliveryList') + ' ' + '1' + ' ' + i18n.t('Pice') + '<br>'
        }
        if (this.totalTime) {
          printMessage += i18n.t('TotalPeriod') + ' ' + '1' + ' ' + i18n.t('Pice') + '<br>'
        }
        if (this.totalSales) {
          printMessage += i18n.t('SalesStatistics') + ' ' + '1' + ' ' + i18n.t('Pice') + '<br>'
        }
      }
      return printMessage
    },
    totalBillsCount () {
      let totalBills = 0
      const ZBonLength = this.ZBonList.length > 0 ? this.ZBonList.length : 1
      if (!this.mergeBills) {
        if (this.activeZBon) {
          totalBills += ZBonLength
        }
        if (this.activeXBon) {
          totalBills += this.billsCount
        }
        if (this.deliveryList) {
          totalBills += this.billsCount
        }
        if (this.totalTime) {
          totalBills += this.billsCount
        }
        if (this.totalSales) {
          totalBills += this.billsCount
        }
      } else {
        if (this.activeXBon) {
          totalBills += 1
        }
        if (this.deliveryList) {
          totalBills += 1
        }
        if (this.totalTime) {
          totalBills += 1
        }
        if (this.totalSales) {
          totalBills += 1
        }
      }
      return totalBills
    },
    disableSendEmail () {
      return !(!this.totalTime && !this.totalSales)
    },
    disablePrint () {
      return !(!this.activeXBon && !this.totalTime && !this.totalSales && !this.deliveryList && !this.activeZBon)
    }

  },
  methods: {
    ...mapMutations(['showErrorDialog']),
    async backToSelectPrint () {
      this.isLoading = true
      await this.loadData()
      this.isLoading = false
      this.showPrintWarn = false
      this.printEnd = false
      this.isPrint = false
      this.isLoading = false
    },
    async realPrintZbon () {
      try {
        if (this.sendEmail) {
          if (this.ZBonList.length > 0) {
            for (const ZBonNumber of this.ZBonList) {
              await newPrintZBon(ZBonNumber, 1, 1)
            }
          } else {
            await newSetZBon({ allowSameDay: 0 }, 1)
          }
        } else {
          if (this.ZBonList.length > 0) {
            for (const ZBonNumber of this.ZBonList) {
              await newPrintZBon(ZBonNumber, 0, 1)
            }
          } else {
            await newSetZBon({ allowSameDay: 0 }, 0)
          }
        }
        await this.ZbonPrintSelectedOptions(this.detailTime)
        showSuccessMessage(i18n.t('print_success'))
        this.printEnd = true
      } catch (e) {
        this.isPrint = false
        this.showErrorDialog(this.$t('PrintFailed'), e?.message)
      }
    },
    async ZbonPrintSelectedOptions (timeArray) {
      if (this.totalSales) {
        await this.selectSales(timeArray)
      }
      if (this.totalTime) {
        await this.selectTime(timeArray)
      }
      if (this.deliveryList) {
        await printDeliveryBon(timeArray)
      }
    },
    async printSelectedOptions (timeArray) {
      if (this.activeXBon) {
        const printFromTime = dayjs(timeArray[0]).format('YYYY-MM-DD')
        const printToTime = dayjs(timeArray[1]).subtract(1, 'day').format('YYYY-MM-DD')
        const printTime = [printFromTime, printToTime]
        const timeSpan = { timespan: printTime.join(' - ') }
        await printSummaryBon(timeSpan)
      }
      if (this.totalSales) {
        await this.selectSales(timeArray)
      }
      if (this.totalTime) {
        await this.selectTime(timeArray)
      }
      if (this.deliveryList) {
        await printDeliveryBon(timeArray)
      }
    },
    async printBills () {
      Remember.sendZmail = this.sendZmail
      Remember.sendXmail = this.sendXmail
      Remember.sendEmail = this.sendEmail
      Remember.totalSales = this.totalSales
      Remember.totalTime = this.totalTime
      Remember.deliveryList = this.deliveryList
      Remember.mergeBills = this.mergeBills
      this.isPrint = true
      if (this.mergeBills) {
        await this.printSelectedOptions(this.detailTime)
      } else {
        const timeArr = []
        const [startDate, endDate] = this.realDate
        let currentDate = startDate
        while (dayjs(currentDate).isBefore(dayjs(endDate).add(1, 'day'))) {
          timeArr.push([currentDate + ' 04:00:00', dayjs(currentDate).add(1, 'day').format('YYYY-MM-DD') + ' 03:59:59'])
          currentDate = dayjs(currentDate).add(1, 'day').format('YYYY-MM-DD')
        }
        console.log(timeArr)
        try {
          for (const it of timeArr) {
            await this.printSelectedOptions(it)
          }
        } catch (e) {
          this.isPrint = false
          this.printEnd = false
          this.showErrorDialog(this.$t('PrintFailed'), e?.message)
        }
      }
      showSuccessMessage(i18n.t('print_success'))
      this.printEnd = true
    },
    async printZBonWarn () {
      if (this.ZBonList.length > 0) {
        this.isPrint = true
        await this.realPrintZbon()
      } else {
        this.unCheckTable = (await getAllTableList()).filter(x => x.usageStatus === '1').map(it => it.name)
        Remember.sendZmail = this.sendZmail
        Remember.sendXmail = this.sendXmail
        Remember.sendEmail = this.sendEmail
        Remember.totalSales = this.totalSales
        Remember.totalTime = this.totalTime
        Remember.deliveryList = this.deliveryList
        Remember.mergeBills = this.mergeBills
        this.isPrint = true
        if (this.unCheckTable.length !== 0) {
          this.showPrintWarn = true
        } else {
          await this.realPrintZbon()
        }
      }
    },
    selectPrintType () {
      if (this.activeZBon) {
        this.printZBonWarn()
      } else {
        this.printBills()
      }
    },
    async selectSendEmail () {
      this.isPrint = true
      if (this.mergeBills) {
        try {
          if (this.totalTime) {
            await sendRealTimeSalesBon(this.detailTime)
          }
          if (this.totalSales) {
            await sendSalesBon(this.detailTime)
          }
          this.printEnd = true
        } catch (e) {
          this.showErrorDialog(this.$t('SentFailed'), e?.message)
          this.isPrint = false
          this.printEnd = false
        }
      } else {
        const timeArr = []
        const [startDate, endDate] = this.realDate
        let currentDate = startDate
        while (dayjs(currentDate).isBefore(dayjs(endDate).add(1, 'day'))) {
          timeArr.push([currentDate + ' 04:00:00', dayjs(currentDate).add(1, 'day').format('YYYY-MM-DD') + ' 03:59:59'])
          currentDate = dayjs(currentDate).add(1, 'day').format('YYYY-MM-DD')
        }
        try {
          for (const it of timeArr) {
            await sendRealTimeSalesBon(it)
            await sendSalesBon(it)
          }
          this.printEnd = true
        } catch (e) {
          this.showErrorDialog(this.$t('SentFailed'), e?.message)
          this.isPrint = false
          this.printEnd = false
        }
      }
    },
    async selectTime (timeArray) {
      if (this.sendEmail) {
        await printRealTimeSalesBon(timeArray)
        await sendRealTimeSalesBon(timeArray)
      } else {
        await printRealTimeSalesBon(timeArray)
      }
    },
    async selectSales (timeArray) {
      if (this.sendEmail) {
        await printSalesBon(timeArray)
        await sendSalesBon(timeArray)
      } else {
        await printSalesBon(timeArray)
      }
    },
    selectXBon () {
      this.activeXBon = !this.activeXBon
      if (this.activeXBon) {
        this.activeZBon = false
      }
    },
    selectZBon () {
      this.activeZBon = !this.activeZBon
      if (this.activeZBon) {
        if (this.ZBonList.length > 0) {
          this.showErrorDialog('所选时段已经打印过ZBon,是否重新打印' + this.ZBonList.join())
        }
        this.activeXBon = false
      }
    },
    checkZBonEmail () {
      setTimeout(() => {
        if (!this.emailOk) {
          this.showErrorDialog(this.$t('PleaseSetupZbonEmail') + '！')
          this.sendEmail = false
        }
      }, 300)
    },
    async loadData () {
      this.emailOk = (await getNiceRestaurantInfo()).ZBonEmail
      if (this.sendEmail) {
        if (!this.emailOk) {
          this.sendEmail = false
        }
      }
      const fromTime = this.realDate[0] + ' 04:00:00'
      const ZbonFromTime = dayjs(this.realDate[0]).subtract(1, 'day').format('YYYY-MM-DD') + ' 04:00:01'
      const toTime = dayjs(this.realDate[1]).add(1, 'day').format('YYYY-MM-DD') + ' 03:59:59'
      this.detailTime = [fromTime, toTime]
      const ZbonPrintTime = [ZbonFromTime, toTime]
      if (this.realDate[0] === today()) {
        this.mergeBills = false
      }
      this.ZBonList = (await newGetZBon(ZbonPrintTime)).map(it => it.zbonNumber)
      if (this.ZBonList.length !== 0) {
        this.activeZBon = false
      }
      this.billsCount = dayjs(this.realDate[1]).add(1, 'day').diff(dayjs(this.realDate[0]), 'day')
      console.log(this.billsCount, 'bills')
    }
  },

  async mounted () {
    await this.loadData()
  }
}
</script>

<style scoped>

</style>
