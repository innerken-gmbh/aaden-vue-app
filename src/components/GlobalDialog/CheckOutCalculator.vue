<template>
  <div class="d-flex fill-height">
    <v-card elevation="1" style="width: 480px;height: 100vh"
            class="calculator pa-2 d-flex flex-column">
      <v-card elevation="0" style="width: 100%;" class="pa-4 d-flex
                 justify-space-between align-end">
        <div>
          <div class="totalBlock">
            <div>
              <v-chip dark label color="primary" small>
                {{ $t('TotalPayable') }}
              </v-chip>
            </div>
            <span class="totalNumber">
                           {{ total|priceDisplay }}
                        </span>
          </div>
          <div class="totalBlock">
            <div>
              <v-chip dark label class="font-weight-bold" color="error" small>
                {{ $t('PaymentStillRequired') }}
              </v-chip>
            </div>
            <span class="totalNumber">
                           {{ remainTotal|priceDisplay }}
                        </span>
          </div>
        </div>
        <div class="totalBlock">
          <div>
            <v-chip dark label color="success">
              {{ $t('PayWillHaveTo') }}
            </v-chip>
          </div>
          <div style="width:240px;height: 64px">
            <v-text-field height="64px" reverse
                          class="payingNumber py-1 text-right"
                          v-model="inputBuffer"
                          :placeholder="''+remainTotal.toFixed(2)"/>
          </div>
        </div>
      </v-card>
      <div class="pa-4">
        <h4>{{ $t('OtherPaymentMethods') }}</h4>
        <div
            class="pa-1 mt-1"
            style="display: grid;grid-auto-columns: 96px;grid-gap: 8px;
           overflow-x: scroll;grid-auto-flow: column">
          <v-card elevation="0" color="#f6f6f6" class="pa-2" style="height: 96px" @click="input(item)"
                  v-for="(item, index) in realExtraPaymentMethodName"
                  :key="index">
            {{ item === 'coupon' ? $t('Coupon') : item }}
          </v-card>
        </div>
      </div>
      <div class="px-4">
        <keyboard-layout :keys="keyArr" @input="input"/>
      </div>

    </v-card>
    <div style="width: 480px;max-width: calc(100vw - 480px)" class="paymentLog pa-2">
      <div class="my-3 d-flex align-center" style="width: 100%">
        <h3>{{ $t('BillLog') }}</h3>
      </div>
      <v-divider></v-divider>
      <div class="my-3" v-dragscroll style="max-height: calc(100vh - 560px);overflow:hidden">
        <template v-for="(paymentInfo,index) in paymentLog">
          <v-sheet :key="'price'+paymentInfo.hash" :elevation="0"
                   style="width: 100%" class="d-flex justify-space-between pa-2 my-1">
            <h2 class="font-weight-bold"
                style="font-size: 24px">
              {{ paymentInfo.price|priceDisplay }}
            </h2>
            <div>
              <v-btn text color="success">
                <template v-if="paymentInfo.icon.startsWith('mdi')">
                  <v-icon large>{{ paymentInfo.icon }}</v-icon>
                </template>
                <template v-else>
                  {{ paymentInfo.icon }}
                </template>

              </v-btn>
              <v-btn @click="withdrawPayment(index)" icon color="error">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </div>
          </v-sheet>
          <v-divider :key="'d'+paymentInfo.hash"></v-divider>
        </template>
      </div>
      <div v-if="readyToCheckOut">
        <v-sheet class="my-6">
          <h4>
            {{ $t('tableCheckOutBillTypeLabel') }}
          </h4>
          <v-sheet class="my-2" style="background: transparent">
            <v-chip-group
                v-model="billType"
                mandatory column
                active-class="primary--text">
              <v-chip x-large label>
                {{ $t('tableCheckOutBillTypeOptionNormal') }}
              </v-chip>
              <v-chip x-large label>
                {{ $t('tableCheckOutBillTypeOptionCompany') }}
              </v-chip>
              <v-chip x-large label>
                {{ $t('tableCheckOutBillTypeOption3') }}
              </v-chip>
            </v-chip-group>
          </v-sheet>
        </v-sheet>
        <v-divider class="my-3"></v-divider>

        <v-btn color="success"
               @click="checkOut()"
               elevation="0"
               :disabled="!readyToCheckOut"
               block x-large> {{ $t('tableCheckOutConfirm') }}
        </v-btn>

      </div>
      <div v-else>
        <h4>{{ $t('FastCheckoutWithoutTips') }}</h4>

        <v-btn color="primary" class="mt-2"
               x-large
               @click="checkOut(true)"
               elevation="0"
               :disabled="paymentLog.length!==0" block> {{ $t('QuickBill') }}
        </v-btn>

      </div>
      <v-btn outlined
             class="mt-2"
             x-large
             @click="cancel"
             color="error" block>
        {{ $t('Cancel') }}
      </v-btn>

    </div>
  </div>
</template>

<script>

import { dragscroll } from 'vue-dragscroll'
import { fastSweetAlertRequest } from '@/oldjs/common'
import hillo from 'hillo'
import KeyboardLayout from '@/components/Base/Keyboard/KeyboardLayout'
import { round } from 'lodash-es'

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
    total: {
      default: 0
    }
  },
  directives: {
    dragscroll
  },
  data: function () {
    return {
      billType: 0,
      paymentMethods: [],
      realName: defaultRealName,
      inputBuffer: '',
      extraPaymentMethod: [
        'mdi-card-account-details',
        'mdi-cards'],
      extraPaymentMethodName: [fixedNames.vip],
      paymentLog: []
    }
  },
  computed: {
    keyArr: function () {
      if (this.remainTotal >= 0) {
        return [
          '1', '2', '3', 'mdi-minus',
          '4', '5', '6', 'mdi-backspace',
          '7', '8', '9', fixedNames.card,
          '', '0', 'mdi-circle-small', fixedNames.cash
        ]
      } else {
        return [
          '', '', '', '',
          '', '', '', '',
          '', '', '', fixedNames.tip,
          '', '', '', fixedNames.return
        ]
      }
    },
    realExtraPaymentMethodName: function () {
      const res = this.extraPaymentMethodName
      res.push(...this.paymentMethods.map(p => p.name))
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
      console.log(this.remainTotal)
      return this.equals(this.remainTotal, 0) && this.paymentLog.length !== 0
    }
  },
  created () {
    this.loadPaymentMethods()
  },
  methods: {
    async loadPaymentMethods () {
      this.paymentMethods = (await hillo.get('PayMethod.php'))
        .content.filter(p => !includedPaymentMethods.includes(parseInt(p.id)))
        .map(p => {
          p.name = p.langs[0].name
          return p
        })
      this.realName = Object.assign({}, defaultRealName)
      this.paymentMethods.forEach(p => {
        this.$set(this.realName, p.name, p.id)
      })
    },
    equals (a, b) {
      return Math.abs(a - b) < 0.001
    },
    checkOut (fastCheckout = false) {
      if (fastCheckout) {
        this.billType = 0
      }
      this.$emit('payment-submit', this.paymentLog, this.billType)
      this.clearBuffer()
      this.paymentLog = []
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
    addPaymentLogToList (id, price, icon, hash, memberCardId = null) {
      this.paymentLog.push({
        id,
        price,
        icon,
        hash,
        memberCardId
      })
      if (parseInt(id) !== 1 && !this.equals(this.remainTotal, 0)) {
        if (this.remainTotal < 0) {
          this.paymentLog.push({
            id: 9,
            price: this.remainTotal,
            icon: 'TIP',
            hash: +this.paymentLog.length + 'p' + price + 'icon' + icon
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
          'Bitte Gutschein Id Gaben.',
          'text', 'MemberCard.php?op=check', 'id',
          { amount: 0 }, 'GET')

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
    withdrawPayment (index) {
      this.paymentLog.splice(index, 1)
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
            this.inputBuffer = this.inputBuffer.startsWith('-') ? this.inputBuffer.substr(1) : ('-' + this.inputBuffer)
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
