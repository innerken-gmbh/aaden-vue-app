<template>
  <v-navigation-drawer
      v-model="show"
      app
      width="400"
      :stateless="lock"
      right
      temporary
  >
    <div
        @click.stop
        class="d-flex flex-column"
        style="height: 100vh"
    >
      <div
          v-if="loading"
          class="d-flex flex-column justify-center align-center grey lighten-2"
          style="height: 100vh;width: 100%"
      >
        <v-progress-circular
            indeterminate
            size="48"
        />
      </div>
      <template v-else>
        <v-card
            dark
            class="pa-3"
            color="black"
            elevation="0"
            style="width: 100%"
            tile
        >
          <div class="d-flex align-center mb-1">
            <div class="d-flex align-center">
              <div class="mr-2">
                <v-icon>mdi-wallet</v-icon>
              </div>
              <div class="font-weight-black text-body-1">
                {{ checkoutTotal | priceDisplay }}
              </div>
            </div>
            <v-spacer></v-spacer>
            <v-btn
                icon
                @click="cancel"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
          <div
              class="mt-4"
              v-if="Math.abs(remainTotal - checkoutTotal) > 0.001 && remainTotal !== 0"
          >
            <div
                @click="paymentLog=[]"

                class="d-flex align-center text-body-1"
            >
              <div>
                {{ $t('PaymentStillRequired') }}
              </div>
              <v-spacer></v-spacer>
              <span class="font-weight-black">{{ remainTotal | priceDisplay }}</span>
            </div>
          </div>

        </v-card>
        <div
            class="flex-grow-1 d-flex flex-column"
            style="width: 400px"
        >
          <div
              v-if="readyToCheckOut"
              class="paymentLog flex-grow-1"
          >
            <div
                class="pa-2 px-3 d-flex flex-column"
                style="height: 100%"
            >
              <div class="text-body-2">{{ $t('Payingmethod') }}</div>
              <template v-for="paymentInfo in paymentLog">
                <div
                    :key="'price' + paymentInfo.hash"
                    class="d-flex py-2 mb-1"
                    style="width: 100%"
                >
                  <v-card
                      class="pa-1 px-2 text-capitalize text-body-1"
                      color="grey lighten-4 black--text"
                      elevation="0"
                  >
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
              <div class="d-flex align-center">
                <div class="text-body-2">{{ $t('CheckoutReturn') }}</div>
                <v-spacer></v-spacer>
                <v-switch v-model="returnHome"></v-switch>
              </div>
              <div>
                <div class="text-body-2">{{ $t('PrintType') }}</div>
                <div
                    class="my-2"
                    style="background: transparent"
                >
                  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr))">
                    <v-card
                        :color="printType === 0 ? 'amber lighten-4 black--text' : 'grey lighten-4'"
                        class="pa-3 justify-center d-flex align-center"
                        elevation="0"
                        tile
                        @click="printType = 0"
                    >
                      <v-icon class="mr-2">mdi-printer</v-icon>
                      {{ $t('print') }}
                    </v-card>
                    <v-card
                        :color="printType === 1 ? 'amber lighten-4 black--text' : 'grey lighten-4'"
                        :disabled="!electronicBillStatus"
                        class="pa-3 justify-center d-flex align-center"
                        elevation="0"
                        tile
                        @click="printType = 1;billType=0"
                    >
                      <v-icon
                          v-if="electronicBillStatus"
                          class="mr-2"
                      >mdi-form-select
                      </v-icon>
                      <v-icon
                          v-else
                          class="mr-2"
                      >mdi-checkbox-blank-off-outline
                      </v-icon>
                      {{ $t('ElectronicBill') }}
                    </v-card>
                  </div>
                </div>
              </div>

              <div v-if="printType === 0">
                <div class="text-body-2">{{ $t('BillType') }}</div>
                <div
                    class="my-2"
                    style="background: transparent"
                >
                  <div style="display: grid; grid-template-columns: repeat(2, minmax(0, 1fr))">
                    <v-card
                        :color="billType === 0 ? 'amber lighten-4 black--text' : 'grey lighten-4'"
                        class="pa-3 justify-center d-flex align-center"
                        elevation="0"
                        tile
                        @click="billType = 0"
                    >
                      <v-icon class="mr-2">mdi-receipt-text-outline</v-icon>
                      {{ $t('tableCheckOutBillTypeOptionNormal') }}
                    </v-card>
                    <v-card
                        :color="billType === 1 ? 'amber lighten-4 black--text' : 'grey lighten-4'"
                        class="pa-3 justify-center d-flex align-center"
                        elevation="0"
                        tile
                        @click="billType = 1"
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
                  <v-text-field
                      v-model="companyOrPersonName"
                      :label="$t('companyName')"
                      filled
                      required
                  />
                  <v-text-field
                      v-model="reasonOfVisit"
                      :label="$t('reason')"
                      filled
                      required
                  />
                  <v-text-field
                      v-model="locationAndDate"
                      :label="$t('Date')"
                      filled
                      required
                  />
                </div>
              </template>
              <v-spacer></v-spacer>
              <div>
                <v-btn
                    class="mb-2"
                    elevation="0"
                    rounded
                    @click="paymentLog = []"
                >
                  <v-icon left>mdi-arrow-left</v-icon>
                  {{ $t('Previous') }}
                </v-btn>

              </div>
              <div>
                <v-btn
                    :disabled="!readyToCheckOut"
                    block
                    class="flex-grow-1"
                    color="success lighten-4 black--text"
                    elevation="0"
                    height="56"
                    rounded
                    x-large
                    @click="checkOut()"
                >
                  {{ $t('ConfirmTheOrder') }}
                  <v-icon right>mdi-check</v-icon>
                </v-btn>
              </div>
            </div>
          </div>
          <v-card
              v-else
              class="pa-2 px-3 d-flex flex-column"
              elevation="1"
              style="width: 100%; height: 100%"
              tile
          >
            <v-card
                v-if="remainTotal !== 0"
                class="pa-4 mt-1 d-flex align-center"
                color="grey lighten-4"
                elevation="0"
                rounded="lg"
            >
              <div class="text-body-1 font-weight-black">
                {{ $t('PayWillHaveTo') }}
              </div>
              <v-spacer></v-spacer>
              <span
                  :class="inputBuffer ? ' ' : 'grey--text'"
                  class="totalNumber font-weight-black"
              >{{
                  inputBuffer || remainTotal | priceDisplay
                }}</span>
            </v-card>

            <div class="mt-3">
              <keyboard-layout
                  :keys="keyArr"
                  @input="input"
              />
            </div>
          </v-card>
        </div>
      </template>
    </div>
  </v-navigation-drawer>

</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import { fastSweetAlertRequest } from '@/oldjs/common'
import hillo from 'hillo'
import KeyboardLayout from '@/components/Base/Keyboard/KeyboardLayout'
import { round } from 'lodash-es'
import { checkElectronicBillingStatus } from '@/api/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import IKUtils from 'innerken-js-utils'
import { getUserByUid } from '@/api/VIPCard/VIPApi'
import { mapMutations, mapState } from 'vuex'
import { Remember } from '@/api/remember'

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
  name: 'CheckoutDialog',
  components: { KeyboardLayout },
  directives: {
    dragscroll
  },
  data: function () {
    return {
      electronicBillStatus: null,
      reasonOfVisit: '',
      companyOrPersonName: '',
      locationAndDate: '',
      billType: 0,
      returnHome: Remember.returnHomeCheckout,
      printType: 0,
      show: false,
      paymentMethods: [],
      realName: defaultRealName,
      inputBuffer: '',
      paymentLog: [],
      loading: false,
      GlobalConfig,
      lock: false
    }
  },
  watch: {
    show (val) {
      if (!val) {
        this.hideCheckoutDialog()
      }
    },
    returnHome (val) {
      Remember.returnHomeCheckout = val
    },
    showCheckoutDialog (val) {
      this.show = val
    }
  },
  computed: {
    ...mapState(['showCheckoutDialog', 'checkoutTotal', 'checkoutResolve']),
    keyArr: function () {
      if (this.remainTotal >= 0) {
        return [
          '1',
          '2',
          '3',
          {
            name: 'mdi-backspace',
            color: 'pink lighten-4'
          },
          '4',
          '5',
          '6',
          '',
          '7',
          '8',
          '9',
          {
            name: fixedNames.card,
            color: 'green lighten-4'
          },
          {
            name: 'AC',
            color: 'red lighten-4'
          },
          '0',
          'mdi-circle-small',
          {
            name: fixedNames.cash,
            color: 'amber lighten-4'
          },
          ...this.realExtraPaymentMethodName.map(it => ({
            name: it,
            color: 'grey lighten-2'
          }))
        ]
      } else {
        return ['1',
          '2',
          '3',
          {
            name: 'mdi-backspace',
            color: 'pink lighten-4'
          },
          '4',
          '5',
          '6',
          '',
          '7',
          '8',
          '9',
          {
            name: fixedNames.tip,
            color: 'green lighten-4'
          },
          {
            name: 'AC',
            color: 'red lighten-4'
          },
          '0', '',
          {
            name: fixedNames.return,
            color: 'amber lighten-4'
          }
        ]
      }
    },
    realExtraPaymentMethodName: function () {
      return [fixedNames.vip, ...this.paymentMethods.map((p) => p.name)]
    },
    remainTotal: function () {
      const logTotal = this.paymentLog.reduce((cry, i) => {
        cry += parseFloat(i.price)
        return cry
      }, 0)
      return this.checkoutTotal - logTotal
    },
    readyToCheckOut: function () {
      return this.equals(this.remainTotal, 0) && this.paymentLog.length !== 0
    }
  },
  mounted () {
    this.loadPaymentMethods()
  },
  methods: {
    ...mapMutations(['hideCheckoutDialog']),
    async loadPaymentMethods () {
      this.electronicBillStatus = await checkElectronicBillingStatus()
      this.paymentMethods = (await hillo.get('PayMethod.php')).content
        .filter((p) => !includedPaymentMethods.includes(parseInt(p.id)))
        .map((p) => {
          p.name = p.langs[0].name
          return p
        })
      this.paymentMethods.unshift({
        name: 'VIP',
        id: -2,
        icon: ''
      })
      this.realName = Object.assign({}, defaultRealName)
      this.paymentMethods.forEach((p) => {
        this.$set(this.realName, p.name, p.id)
      })
    },
    equals (a, b) {
      return Math.abs(a - b) < 0.001
    },
    async checkOut () {
      this.loading = true
      try {
        this.checkoutResolve({
          paymentLog: this.paymentLog,
          billType: this.billType,
          printType: this.printType,
          returnHome: this.returnHome,
          companyBillInfo: {
            reasonOfVisit: this.reasonOfVisit,
            companyOrPersonName: this.companyOrPersonName,
            locationAndDate: this.locationAndDate
          }
        })
        this.paymentLog = []
        this.clearBuffer()
        this.emptyCompanyInfoDialog()
      } catch (e) {
        console.log(e)
      }

      this.loading = false
      this.hideCheckoutDialog()
    },
    emptyCompanyInfoDialog () {
      this.reasonOfVisit = ''
      this.companyOrPersonName = ''
      this.locationAndDate = ''
    },
    cancel () {
      this.clearBuffer()
      this.paymentLog = []
      this.hideCheckoutDialog()
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
    addPaymentLogToList (id, price, icon, hash, name, memberCardId = null, uid = null) {
      if (this.remainTotal < 0 && !this.equals(price, this.remainTotal)) {
        price = -price
        this.paymentLog.push({
          id,
          price,
          icon,
          hash,
          memberCardId,
          uid,
          name
        })

        this.paymentLog.push({
          id: parseInt(id) === 1 ? 9 : 1,
          price: this.remainTotal,
          icon: parseInt(id) === 1 ? 'TIP' : 'RC',
          hash: '' + this.paymentLog.length + 'p' + price + 'icon' + icon
        })
      } else {
        this.paymentLog.push({
          id,
          price,
          icon,
          hash,
          memberCardId,
          uid,
          name
        })

        if (parseInt(id) !== 1 && (!this.equals(this.remainTotal, 0))) {
          if (this.remainTotal < 0) {
            this.paymentLog.push({
              id: 9,
              price: this.remainTotal,
              icon: 'TIP',
              hash: '' + this.paymentLog.length + 'p' + price + 'icon' + icon
            })
          }
        }
      }
    },
    async logPayment (type) {
      const price = this.readBuffer()
      if (price === 0 && this.paymentLog.length !== 0) {
        return
      }
      const icon = Object.entries(this.realName).find(([k, v]) => v === type)[0]
      const name = this.paymentMethods.find(it => it.id === type)?.name ?? icon
      const hash = this.paymentLog.length + 'p' + price + 'icon' + icon
      const obj = {
        id: type,
        price,
        icon,
        hash
      }
      if (parseInt(type) === -2) {
        const uid = await IKUtils.showInput(this.$t('ScanNfcCard'))
        const card = await getUserByUid(uid)
        if (card?.local) {
          const leftAmount = parseFloat(card.voucherTotal)
          if (parseFloat(leftAmount) === 0) {
            IKUtils.showError(this.$t('NoCreditOnCard'))
            return
          }
          obj.price = leftAmount > price ? price : leftAmount
          obj.uid = uid
        } else {
          IKUtils.showError(this.$t('UserNotExist'))
          return
        }
      }
      if (parseInt(type) === 4) {
        this.lock = true
        const res = await fastSweetAlertRequest(
          this.$t('EnterVoucherId'),
          'text',
          'MemberCard.php?op=check',
          'id',
          { amount: 0 },
          'GET'
        )
        this.lock = false
        if (res.content) {
          const leftAmount = parseFloat(res.content.leftAmount)
          obj.price = leftAmount > price ? price : leftAmount
          obj.memberCardId = res.content.id
        } else {
          return
        }
      }
      this.addPaymentLogToList(obj.id, obj.price, obj.icon, obj.hash, name, obj.memberCardId, obj.uid)
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
