<template>
  <div style="height: 100vh" class="d-flex flex-column">
    <div v-if="loading" class="d-flex flex-column justify-center align-center grey lighten-2"
         style="height: 100vh;width: 400px">
      <v-progress-circular size="48" indeterminate/>
    </div>
    <template v-else>
      <v-card tile color="grey lighten-3" elevation="0" class="pa-3 d-flex align-center" style="width: 100%">
        <div class="text-h6">{{ $t('BillPlease') }}</div>
        <v-spacer></v-spacer>
        <v-btn @click="cancel" icon>
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card>
      <div class="flex-grow-1 d-flex flex-column" style="width: 400px">
        <div class="d-flex grey lighten-4 text-body-1 pa-2 px-3">
          <div>{{ $t('TotalPrice') }}</div>
          <v-spacer></v-spacer>
          <div class="mt-1 font-weight-regular">
            {{ total | priceDisplay }}
          </div>
        </div>
        <div v-if="readyToCheckOut" class="paymentLog flex-grow-1">
          <div style="height: 100%" class="pa-2 px-3 d-flex flex-column">
            <div class="text-body-2">{{ $t('Payingmethod') }}</div>
            <template v-for="paymentInfo in paymentLog">
              <div :key="'price' + paymentInfo.hash" class="d-flex py-2 mb-1" style="width: 100%">
                <v-card color="grey lighten-4 black--text" class="pa-1 px-2 text-capitalize text-body-1"
                        elevation="0">
                  <template v-if="paymentInfo.icon.startsWith('mdi')">
                    <v-icon large>{{ paymentInfo.icon }}</v-icon>
                  </template>
                  <template v-else>
                    {{ paymentInfo.icon }}
                  </template>
                </v-card>
                <v-spacer></v-spacer>
                <div class="font-weight-bold text-body-1">
                  {{ paymentInfo.price | priceDisplay }}
                </div>
              </div>
            </template>
            <div class="my-4" v-if="GlobalConfig.activeVip&&currentMemberId">
              <div class="text-body-2">{{ $t('CurrentVipMemberId') }}: {{currentMemberId}}</div>
              <div class="text-body-1 mt-2 font-weight-black">
                {{ $t('MaxVipCollectAblePoints') }}: <span class="success--text">{{parseInt(total)}}</span>
              </div>
            </div>
            <div>
              <div class="text-body-2">{{ $t('BillType') }}</div>
              <div class="my-2" style="background: transparent">
                <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr))">
                  <v-card
                      @click="billType = 0"
                      :color="billType === 0 ? 'primary lighten-4 black--text' : 'grey lighten-4'"
                      tile
                      elevation="0"
                      class="pa-3 justify-center d-flex align-center"
                  >
                    <v-icon class="mr-2">mdi-receipt-text-outline</v-icon>
                    {{ $t('tableCheckOutBillTypeOptionNormal') }}
                  </v-card>
                  <v-card
                      @click="billType = 1"
                      :color="billType === 1 ? 'primary lighten-4 black--text' : 'grey lighten-4'"
                      tile
                      elevation="0"
                      class="pa-3 justify-center d-flex align-center"
                  >
                    <v-icon class="mr-2">mdi-script-text-outline</v-icon>
                    {{ $t('tableCheckOutBillTypeOptionCompany') }}
                  </v-card>
                </div>
              </div>
            </div>
            <template v-if="billType === 1">
              <div class="mt-2">
                <div class="d-flex">
                  <span class="font-weight-bold text-body-2">{{ $t('OwnerBillData') }}</span>
                </div>
                <v-form ref="form" v-model="valid" class="mt-2" lazy-validation>
                  <v-text-field :label="$t('companyName')" v-model="companyOrPersonName" filled required/>
                  <v-text-field :label="$t('reason')" v-model="reasonOfVisit" filled required/>
                  <v-text-field :label="$t('Date')" v-model="locationAndDate" filled required/>
                </v-form>
              </div>
            </template>
            <v-spacer></v-spacer>
            <div>
              <v-btn
                  rounded
                  class="mb-2"
                  elevation="0"
                  @click="paymentLog = []"
              >
                <v-icon left>mdi-arrow-left</v-icon>
                {{ $t('Previous') }}
              </v-btn>

            </div>
            <div>
              <v-btn
                  height="56"
                  block
                  x-large
                  rounded
                  class="flex-grow-1"
                  :disabled="!readyToCheckOut"
                  color="success lighten-4 black--text"
                  elevation="0"
                  @click="checkOut()"
              >
                {{ $t('ConfirmTheOrder') }}
                <v-icon right>mdi-check</v-icon>
              </v-btn>
            </div>

          </div>
        </div>
        <v-card v-else tile class="calculator pa-2 px-3 d-flex flex-column" elevation="1"
                style="width: 100%; height: 100%">
          <v-card
              v-if="Math.abs(remainTotal - total) > 0.001 && remainTotal !== 0"
              class="pa-4 mt-1 d-flex align-center"
              color="#f6f6f6"
              elevation="0"
          >
            <div class="text-body-1">
              {{ $t('PaymentStillRequired') }}
            </div>
            <v-spacer></v-spacer>
            <span class="totalNumber">{{ remainTotal | priceDisplay }}</span>
          </v-card>
          <v-card v-if="remainTotal !== 0" class="pa-4 mt-1 d-flex align-center" color="primary lighten-4"
                  elevation="0">
            <div class="text-body-1">
              {{ $t('PayWillHaveTo') }}
            </div>
            <v-spacer></v-spacer>
            <span :class="inputBuffer ? ' ' : 'grey--text'" class="totalNumber font-weight-black">{{
                inputBuffer || remainTotal | priceDisplay
              }}</span>
          </v-card>

          <div class="mt-3">
            <keyboard-layout :keys="keyArr" @input="input"/>
          </div>
          <v-divider class="my-4"/>
          <div>
            <div class="pa-1"
                 style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); grid-gap: 8px">
              <v-card
                  v-for="(item, index) in realExtraPaymentMethodName"
                  :key="index"
                  class="pa-2 text-body-2"
                  color="grey lighten-4"
                  elevation="0"
                  style="height: 48px"
                  @click="input(item)"
              >
                {{ item === 'coupon' ? $t('Coupon') : item }}
              </v-card>
            </div>
          </div>
        </v-card>
      </div>
    </template>

  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import { fastSweetAlertRequest } from '@/oldjs/common'
import hillo from 'hillo'
import KeyboardLayout from '@/components/Base/Keyboard/KeyboardLayout'
import { round } from 'lodash-es'
import { writeCompanyInfo } from '@/api/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

const includedPaymentMethods = [0, 1, 2, 9, 4, 10]
const fixedNames = {
  cash: 'cash',
  card: 'card',
  return: 'returnMoney',
  tip: 'tip',
  vip: 'coupon'
}
const defaultRealName = {
  'mdi-minus': 'reverse',
  'mdi-backspace': 'back',
  'mdi-restart': 'clear',
  'mdi-circle-small': '.',
  'mdi-dots-horizontal': 'more'
}

defaultRealName[fixedNames.cash] = '1'
defaultRealName[fixedNames.card] = '2'
defaultRealName[fixedNames.tip] = '9'
defaultRealName[fixedNames.return] = '1'
defaultRealName[fixedNames.vip] = '4'

export default {
  name: 'CheckOutCalculator',
  components: { KeyboardLayout },
  props: {
    id: {},
    total: {
      default: 0
    },
    currentMemberId: {}
  },
  directives: {
    dragscroll
  },
  data: function () {
    return {
      valid: true,
      reasonOfVisit: '',
      companyOrPersonName: '',
      locationAndDate: '',
      billType: 0,
      paymentMethods: [],
      realName: defaultRealName,
      inputBuffer: '',
      extraPaymentMethod: ['mdi-card-account-details', 'mdi-cards'],
      extraPaymentMethodName: [fixedNames.vip],
      paymentLog: [],
      loading: false,
      GlobalConfig
    }
  },
  computed: {
    keyArr: function () {
      if (this.remainTotal >= 0) {
        return [
          '1',
          '2',
          '3',
          'mdi-backspace',
          '4',
          '5',
          '6',
          '',
          '7',
          '8',
          '9',
          fixedNames.card,
          'C',
          '0',
          'mdi-circle-small',
          fixedNames.cash
        ]
      } else {
        return ['', '', '', '', '', '', '', '', '', '', '', fixedNames.tip, '', '', '', fixedNames.return]
      }
    },
    realExtraPaymentMethodName: function () {
      const res = this.extraPaymentMethodName
      res.push(...this.paymentMethods.map((p) => p.name))
      return res
    },
    remainTotal: function () {
      const logTotal = this.paymentLog.reduce((cry, i) => {
        cry += parseFloat(i.price)
        return cry
      }, 0)
      return this.total - logTotal
    },
    readyToCheckOut: function () {
      return this.equals(this.remainTotal, 0) && this.paymentLog.length !== 0
    }
  },
  created () {
    this.loadPaymentMethods()
  },
  methods: {
    async loadPaymentMethods () {
      this.paymentMethods = (await hillo.get('PayMethod.php')).content
        .filter((p) => !includedPaymentMethods.includes(parseInt(p.id)))
        .map((p) => {
          p.name = p.langs[0].name
          return p
        })
      this.realName = Object.assign({}, defaultRealName)
      this.paymentMethods.forEach((p) => {
        this.$set(this.realName, p.name, p.id)
      })
    },
    equals (a, b) {
      return Math.abs(a - b) < 0.001
    },
    async checkOut (fastCheckout = false) {
      if (fastCheckout) {
        this.billType = 0
      }
      this.loading = true
      try {
        try {
          if (this.id) {
            await writeCompanyInfo({
              orderId: this.id,
              reasonOfVisit: this.reasonOfVisit,
              companyOrPersonName: this.companyOrPersonName,
              locationAndDate: this.locationAndDate
            })
          }
        } catch (y) {
          console.log(y)
        }
        this.$emit('payment-submit', this.paymentLog, this.billType)
        this.paymentLog = []
        this.clearBuffer()
        this.emptyCompanyInfoDialog()
      } catch (e) {
        console.log(e)
      }
      setTimeout(() => {
        this.loading = false
      }, 1000)
    },
    emptyCompanyInfoDialog () {
      this.reasonOfVisit = ''
      this.companyOrPersonName = ''
      this.locationAndDate = ''
    },
    cancel () {
      this.clearBuffer()
      this.paymentLog = []
      this.$emit('payment-cancel')
    },
    clearBuffer () {
      this.inputBuffer = ''
    },
    readBuffer (clear = true) {
      if (this.inputBuffer === '') {
        return round(this.remainTotal, 2)
      }
      const read = round(parseFloat(this.inputBuffer.trim()), 2)
      if (clear) {
        this.clearBuffer()
      }
      if (isNaN(read)) {
        return 0
      }
      return read
    },
    addPaymentLogToList (id, price, icon, hash, name, memberCardId = null) {
      this.paymentLog.push({
        id,
        price,
        icon,
        hash,
        memberCardId,
        name
      })
      if (parseInt(id) !== 1 && !this.equals(this.remainTotal, 0)) {
        if (this.remainTotal < 0) {
          this.paymentLog.push({
            id: 9,
            price: this.remainTotal,
            icon: 'TIP',
            hash: '' + this.paymentLog.length + 'p' + price + 'icon' + icon
          })
        }
      }
    },
    async logPayment (type) {
      const price = this.readBuffer()
      if (price === 0) {
        return
      }
      console.log(this.realName, type)
      const icon = Object.entries(this.realName).find(([k, v]) => v === type)[0]
      const hash = this.paymentLog.length + 'p' + price + 'icon' + icon
      const obj = {
        id: type,
        price,
        icon,
        hash
      }

      if (parseInt(type) === 4) {
        const res = await fastSweetAlertRequest(
          this.$t('EnterVoucherId'),
          'text',
          'MemberCard.php?op=check',
          'id',
          { amount: 0 },
          'GET'
        )

        if (res.content) {
          const leftAmount = parseFloat(res.content.leftAmount)
          obj.price = leftAmount > price ? price : leftAmount
          obj.memberCardId = res.content.id
        } else {
          return
        }
      }
      this.addPaymentLogToList(obj.id, obj.price, obj.icon, obj.hash, obj.memberCardId)
    },
    async input (input) {
      console.log(input)
      if (!isNaN(parseInt(input))) {
        this.inputBuffer += input
      } else {
        const c = this.realName[input]
        switch (c) {
          case '.':
            this.inputBuffer += c
            break
          case 'back':
            this.inputBuffer = this.inputBuffer.substr(0, this.inputBuffer.length - 1)
            break
          case 'clear':
            this.clearBuffer()
            break
          case 'reverse':
            this.inputBuffer = this.inputBuffer.startsWith('-') ? this.inputBuffer.substr(1) : '-' + this.inputBuffer
            break
          case 'more':
            break
          case '10':
            this.logPayment(c)
            break
          default:
            this.logPayment(c)
        }
      }
    }
  }
}
</script>

<style scoped>
.totalNumber {
  width: fit-content;
  font-size: 24px;
}

.payingNumber {
  width: fit-content;
  font-size: 42px;
}

.keyboard {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 4px;
}

.key {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 48px;
  height: auto;
  border-radius: 5px;
}
</style>
