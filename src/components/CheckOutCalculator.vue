<template>
    <v-sheet rounded :elevation="2" class="fill-height pa-2">
        <div class="rootContainer fill-height">
            <div class="calculator pa-2 d-flex flex-column fill-height">
                <v-sheet :elevation="2" class="display pa-4 d-flex
                 justify-space-between align-end">
                    <div>
                        <div class="totalBlock">
                            <div>
                                <v-chip dark label color="primary" small>
                                    应付总额
                                </v-chip>
                            </div>
                            <span class="totalNumber">
                           {{total|priceDisplay}}
                        </span>
                        </div>
                        <div class="totalBlock">
                            <div>
                                <v-chip dark label class="font-weight-bold" color="error" small>
                                    剩余总额
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
                                将要支付
                            </v-chip>
                        </div>
                        <div style="width:240px;height: 64px">
                            <v-text-field height="64px" reverse solo
                                          class="payingNumber py-1 text-right"
                                          v-model="inputBuffer"
                                          :placeholder="''+remainTotal"/>
                        </div>
                    </div>
                </v-sheet>
                <v-sheet :elevation="2" class="keyboard flex-grow-1 pa-4">
                    <v-btn @click="input(i)" fab block x-large class="key" :elevation="2" v-for="i in keyArr.flat()"
                           :key="'key'+i">
                        <v-icon v-if="!isNaN(i)" x-large>mdi-numeric-{{i}}</v-icon>
                        <v-icon x-large v-else>{{i}}</v-icon>
                    </v-btn>
                </v-sheet>
            </div>
            <div class="paymentLog pa-2">
                <div class="my-3">
                    <h3>结账记录</h3>
                </div>
                <div class="my-3" style="height: 400px;overflow-y: scroll">
                    <template v-for="(paymentInfo,index) in paymentLog">
                        <v-sheet :key="'price'+paymentInfo.hash" :elevation="2"
                                 class="d-flex justify-space-between pa-2 my-1">
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
                    </template>
                </div>
                <div style="height: 300px">
                    <template v-if="remainTotal===0">
                        <v-divider class="my-3"></v-divider>
                        <v-sheet>
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
                                <v-btn tile fab outlined color="error" block x-large>{{$t('cancel')}}</v-btn>
                            </div>
                            <div class="pa-2">
                                <v-btn color="success" tile fab block x-large> {{$t('tableCheckOutConfirm')}}</v-btn>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </v-sheet>
</template>

<script>

export default {
  name: 'CheckOutCalculator',
  props: {
    total: {
      type: [String, Number],
      default: 0
    }
  },
  data: function () {
    return {
      remainTotal: 931,
      keyArr: [
        [1, 2, 3, 'mdi-backspace'],
        [4, 5, 6, 'mdi-restart'],
        [7, 8, 9, 'mdi-credit-card-outline'],
        ['mdi-dots-horizontal', 0, 'mdi-circle-small', 'mdi-cash-usd']],
      realName: {
        'mdi-backspace': 'back',
        'mdi-restart': 'clear',
        'mdi-circle-small': '.',
        'mdi-cash-usd': 'bar',
        'mdi-credit-card-outline': 'ec',
        'mdi-dots-horizontal': 'more'
      },
      inputBuffer: '',
      paymentLog: []
    }
  },
  methods: {
    parseInput (input) {
      if (!isNaN(parseInt(input))) {
        return input
      } else {
        return this.realName[input]
      }
    },
    clearBuffer () {
      this.inputBuffer = ''
    },
    readBuffer () {
      if (this.inputBuffer === '') {
        return this.remainTotal
      }
      const read = parseFloat(this.inputBuffer.trim())
      this.clearBuffer()
      if (isNaN(read)) {
        return 0
      }
      return read
    },
    logPayment (type) {
      const price = this.readBuffer()
      const icon = Object.entries(this.realName).find(([k, v]) => v === type)[0]
      console.log(icon)
      this.remainTotal -= price
      const hash = this.paymentLog.length + 'p' + price + 'icon' + icon
      this.paymentLog.push({
        price,
        icon,
        hash
      })
    },
    withdrawPayment (index) {
      const paymentLog = this.paymentLog[index]
      this.paymentLog.splice(index, 1)
      this.remainTotal += parseFloat(paymentLog.price)
    },
    input (input) {
      input = this.parseInput(input)
      if (!isNaN(parseInt(input))) {
        this.inputBuffer += input
      } else {
        switch (input) {
          case '.':
            this.inputBuffer += input
            break
          case 'back':
            this.inputBuffer = this.inputBuffer.substr(0, this.inputBuffer.length - 1)
            break
          case 'clear':
            this.clearBuffer()
            break
          case 'more':
            break
          default:
            this.logPayment(input)
        }
      }
    }
  },
  mounted () {
    this.remainTotal = this.total
  }
}
</script>

<style scoped>
    .display {
    }

    .rootContainer {
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

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
