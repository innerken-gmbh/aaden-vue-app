<template>
    <div class="d-flex">
        <div style="width: 480px;height: 700px" class="calculator pa-2 d-flex flex-column fill-height">
            <v-card style="width: 100%" class="display pa-4 d-flex
                 justify-space-between align-end">
                <div>
                    <div class="totalBlock">
                        <div>
                            <v-chip dark label color="primary" small>
                                {{$t("应付总额")}}
                            </v-chip>
                        </div>
                        <span class="totalNumber">
                           {{total|priceDisplay}}
                        </span>
                    </div>
                    <div class="totalBlock">
                        <div>
                            <v-chip dark label class="font-weight-bold" color="error" small>
                                {{$t("剩余总额")}}
                            </v-chip>
                        </div>
                        <span class="totalNumber">
                           {{remainTotal|priceDisplay}}
                        </span>
                    </div>
                </div>
                <div class="totalBlock">
                    <div>
                        <v-chip dark label color="success">
                            {{$t("将要支付")}}
                        </v-chip>
                    </div>
                    <div style="width:240px;height: 64px">
                        <v-text-field height="64px" reverse solo
                                      class="payingNumber py-1 text-right"
                                      v-model="inputBuffer"
                                      :placeholder="''+remainTotal.toFixed(2)"/>
                    </div>
                </div>
            </v-card>
            <v-sheet elevation="2" class="keyboard flex-grow-1 pa-4">
<!--                keyBoard-->
                <template v-for="i in keyArr.flat()">
                    <v-btn :ripple="false" v-if="i!=='mdi-dots-horizontal'" @click="input(i)" block x-large
                           class="key"
                           style="height: 100%"
                           :elevation="2"
                           :key="'key'+i">
                        <v-icon v-if="!isNaN(i)" x-large>mdi-numeric-{{i}}</v-icon>
                        <v-icon x-large v-else>{{i}}</v-icon>
                    </v-btn>
                    <v-menu offset-x :key="'key'+i" v-else>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn @click="input(i)" block x-large class="key"
                                   style="height: 100%"
                                   :elevation="2"
                                   v-bind="attrs"
                                   v-on="on"
                                   :key="'key'+i">
                                <v-icon x-large>{{i}}</v-icon>
                            </v-btn>
                        </template>
                        <v-list>
                            <v-list-item
                                    @click="input(item)"
                                    v-for="(item, index) in extraPaymentMethod"
                                    :key="index"
                            >
                                <v-list-item-icon>
                                    <v-icon>{{ item }}</v-icon>
                                </v-list-item-icon>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        {{extraPaymentMethodName[index]}}
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </v-list>
                    </v-menu>
                </template>
            </v-sheet>
        </div>
        <div style="width: calc(100vw - 200px - 480px)" class="paymentLog pa-2">
            <div class="my-3">
                <h3>{{$t("结账记录")}}</h3>
            </div>
            <div class="my-3" v-dragscroll style="max-height: 460px;overflow:hidden">
                <template v-for="(paymentInfo,index) in paymentLog">
                    <v-sheet :key="'price'+paymentInfo.hash" :elevation="0"
                             style="width: 100%" class="d-flex justify-space-between pa-2 my-1">
                        <h2 class="font-weight-bold"
                            style="font-size: 24px">
                            {{ paymentInfo.price|priceDisplay }}
                        </h2>
                        <div>
                            <v-btn text color="success">
                                <v-icon large>{{paymentInfo.icon}}</v-icon>
                            </v-btn>
                            <v-btn @click="withdrawPayment(index)" icon color="error">
                                <v-icon>mdi-close</v-icon>
                            </v-btn>
                        </div>
                    </v-sheet>
                    <v-divider :key="'d'+paymentInfo.hash"></v-divider>
                </template>
            </div>
            <div style="height: 300px">
                <v-sheet class="my-6">
                    <h4>
                        {{$t('tableCheckOutBillTypeLabel')}}
                    </h4>
                    <v-sheet class="my-2" style="background: transparent">
                        <v-chip-group
                                v-model="billType"
                                mandatory column
                                active-class="primary--text">
                            <v-chip x-large label>
                                {{$t('tableCheckOutBillTypeOptionNormal')}}
                            </v-chip>
                            <v-chip x-large label>
                                {{$t('tableCheckOutBillTypeOptionCompany')}}
                            </v-chip>
                            <v-chip x-large label>
                                {{$t('tableCheckOutBillTypeOption3')}}
                            </v-chip>
                        </v-chip-group>
                    </v-sheet>
                </v-sheet>
                <v-divider class="my-3"></v-divider>
                <div style="height: 120px;display: grid;grid-template-columns: 1fr 1fr">
                    <div class="pa-2">
                        <v-btn tile fab
                               outlined
                               @click="cancel"
                               color="error" block x-large>
                            {{$t('cancel')}}
                        </v-btn>
                    </div>
                    <div class="pa-2">
                        <v-btn color="success"
                               @click="checkOut"
                               elevation="0"
                               :disabled="!equals(remainTotal,0)||paymentLog.length===0"
                               tile fab block x-large> {{$t('tableCheckOutConfirm')}}
                        </v-btn>
                    </div>
                </div>
                <div style="height: 120px">
                  <h4>{{$t('或者使用0小费,现金,普通账单进行')}}</h4>
                  <div class="pa-2">
                    <v-btn color="primary"
                           @click="checkOut"
                           elevation="0"
                           :disabled="paymentLog.length!==0"
                           tile fab block x-large> {{$t('QuickBill')}}
                    </v-btn>
                  </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import { dragscroll } from 'vue-dragscroll'
import { fastSweetAlertRequest } from '../oldjs/common'

export default {
  name: 'CheckOutCalculator',
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
      realName: {
        'mdi-minus': 'reverse',
        'mdi-backspace': 'back',
        'mdi-restart': 'clear',
        'mdi-circle-small': '.',
        'mdi-cash-usd': '1',
        'mdi-bell': '9',
        'mdi-cards': '10',
        'mdi-credit-card-outline': '2',
        'mdi-credit-card-wireless': '3',
        'mdi-card-account-details': '4',
        'mdi-dots-horizontal': 'more'
      },
      inputBuffer: '',
      extraPaymentMethod: ['mdi-credit-card-wireless', 'mdi-card-account-details', 'mdi-cards'],
      extraPaymentMethodName: ['KreditCard', 'Gutschein', 'SumUp'],
      paymentLog: []
    }
  },
  computed: {
    keyArr: function () {
      if (this.remainTotal >= 0) {
        return [
          [1, 2, 3, 'mdi-minus'],
          [4, 5, 6, 'mdi-backspace'],
          [7, 8, 9, 'mdi-credit-card-outline'],
          ['mdi-dots-horizontal', 0, 'mdi-circle-small', 'mdi-cash-usd']]
      } else {
        return [
          [1, 2, 3, 'mdi-minus'],
          [4, 5, 6, 'mdi-backspace'],
          [7, 8, 9, 'mdi-bell'],
          ['mdi-dots-horizontal', 0, 'mdi-circle-small', 'mdi-cash-usd']]
      }
    },
    remainTotal: function () {
      const logTotal = this.paymentLog.reduce((cry, i) => {
        cry += parseFloat(i.price)
        return cry
      }, 0)
      return this.total - logTotal
    }
  },
  methods: {
    equals (a, b) {
      return Math.abs(a - b) < 0.001
    },
    checkOut () {
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
        return this.remainTotal
      }
      const read = parseFloat(this.inputBuffer.trim())
      if (clear) {
        this.clearBuffer()
      }
      if (isNaN(read)) {
        return 0
      }
      return read
    },
    async logPayment (type) {
      const price = this.readBuffer()
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
          obj.price = parseFloat(res.content.leftAmount)
          obj.memberCardId = res.content.id
        } else {
          return
        }
      }

      this.paymentLog.push(obj)
    },
    withdrawPayment (index) {
      this.paymentLog.splice(index, 1)
    },
    async input (input) {
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
            window.open('sumupmerchant://pay/1.0?' +
              'affiliate-key=7ca84f17-84a5-4140-8df6-6ebeed8540fc&' +
              'app-id=com.example.myapp&' +
              'total=' + this.readBuffer() + '&currency=EUR' +
              '&title=Taxi Ride' +
              '&receipt-mobilephone=+3531234567890' +
              '&receipt-email=customer@mail.com' +
              '&callback=https://aaden.io')
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
        grid-template-columns: 1fr 1fr 1fr 1fr;
        grid-template-rows: 1fr 1fr 1fr 1fr;
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
