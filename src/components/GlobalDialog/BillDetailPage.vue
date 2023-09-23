<template>
  <div>
    <div v-if="checkCustomerInfo" class="pa-4">
      <div class="d-flex">
        <div class="text-body-1 font-weight-bold">{{ $t('writeCustomerInfo') }}</div>
        <v-spacer/>
        <div>
          <v-btn
            icon
            @click="backToOrder"
          >
            <v-icon>
              mdi-close
            </v-icon>
          </v-btn>
        </div>
      </div>
      <div class="text-body-2 mt-1">{{ $t('writeRightBillInfo') }}</div>
      <div class="mt-4">
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-text-field v-model="customerName" :placeholder="$t('customerName')" :rules="rules" hide-details outlined/>
          <v-text-field v-model="customerAddress" :placeholder="$t('CustomerAddress')" :rules="rules" class="mt-2" hide-details outlined/>
          <v-text-field v-model="customerCity" :placeholder="$t('City')" :rules="rules" class="mt-2" hide-details outlined/>
          <v-text-field v-model="customerPostcode" :placeholder="$t('postcode')" :rules="rules" class="mt-2" hide-details outlined/>
          <v-text-field v-model="customerEmail" :placeholder="$t('Email')" :rules="rules" class="mt-2" hide-details outlined/>
        </v-form>
      </div>
      <div class="mt-4">
        <v-btn :disabled="!valid" class="mr-2" color="primary" elevation="0" @click="getCustomerInfo">
          <v-icon left>mdi-arrow-right</v-icon>
          {{ $t('nextStep') }}
        </v-btn>
      </div>
    </div>
    <div v-else>
      <div  id="billDetail" class="pa-4" style="background-color: white">
        <div>
          Order Detail · #{{ orderId }}
        </div>
        <v-divider style="margin-top: 10px;margin-bottom: 10px"/>
        <div>
          <div style="font-size: 14px; font-weight: bold;display: flex;justify-content: space-between;white-space: nowrap">
            <div>{{ restaurantInfo?.name }}</div>
            <div>Bill To</div>
          </div>
          <div style="font-size: 14px;display: flex;justify-content: space-between;white-space: nowrap">
            <div>{{ restaurantInfo?.adress1 }}</div>
            <div>{{ customerName }}</div>
          </div>
          <div style="font-size: 14px;display: flex;justify-content: space-between;white-space: nowrap">
            <div>{{ restaurantInfo?.city }} {{ restaurantInfo?.postCode }}</div>
            <div>{{ customerAddress }}</div>
          </div>
          <div style="font-size: 14px;display: flex;justify-content: space-between;white-space: nowrap">
            <div>{{ restaurantInfo?.emailAddress }}</div>
            <div>{{ customerCity }} {{customerPostcode }}</div>
          </div>
          <div style="font-size: 14px;display: flex;justify-content: space-between;white-space: nowrap">
            <div></div>
            <div>{{ customerEmail }}</div>
          </div>
        </div>
         <v-divider style="margin-top: 10px;margin-bottom: 10px"/>
        <div>
          <div style="display: flex;justify-content: space-between;white-space: nowrap">
            <div>Order details</div>
            <div>
              <v-icon
                v-if="billData?.billInfo?.paymentStatus==='1'"
                class="mr-2"
                color="success"
              >
                mdi-check-decagram
              </v-icon>
              <v-icon
                v-else
                class="mr-2"
                color="error"
              >
                mdi-close-octagon-outline
              </v-icon>
              {{ enPaymentStatus }}
            </div>
          </div>
           <v-divider style="margin-top: 10px;margin-bottom: 10px"/>
          <div style="display: flex;justify-content: space-between;white-space: nowrap">
            <div>Start of Ordering</div>
            <div>
              {{ basicInfo?.startTime | beautifulTime }}
            </div>
          </div>
           <v-divider style="margin-top: 10px;margin-bottom: 10px"/>
          <template v-if="displayDetailInfo">
            <template v-for="t in Object.keys(displayDetailInfo)">
              <div :key="t">
                <div
                  v-for="op in Object.keys(displayDetailInfo[t])"
                  :key="t+'op'+op"
                >
                  <div style="display: flex;justify-content: space-between;white-space: nowrap">
                    <div>Order</div>
                    <div>
                      {{ t | beautifulTime }}
                    </div>
                  </div>
                   <v-divider style="margin-top: 10px;margin-bottom: 10px"/>
                  <div class="mt-4">
                    <div
                      v-for="d in displayDetailInfo[t][op]"
                      :key="d.id"
                    >
                      <div style="display: flex;justify-content: space-between;white-space: nowrap">
                        <div>
                          <div style="display: flex">
                            <b>{{ Math.abs(d.count) }}&times; </b>
                            <div> #{{ d.currentCode }} </div>
                            <div style="margin-left: 20px">{{(d.currentTaxRate * 100).toFixed(2)}}%</div>
                          </div>
                          <div>
                            <div class="maxLine2">{{ d.name }}</div>
                          </div>
                        </div>
                        <div>
                          <template v-if="parseFloat(d.tempDiscountMod)!==0">
                            <div>
                                <div
                                  class="text-decoration-line-through warning--text text--darken-1"
                                  style="font-size: 10px;"
                                >{{ d.price | priceDisplay }}
                                </div>
                              <div class="text-no-wrap">
                                  {{ parseFloat(d.price) + parseFloat(d.tempDiscountMod) | priceDisplay }}
                              </div>
                            </div>
                          </template>
                          <div
                            v-else
                            class="text-no-wrap"
                            style="float: right"
                          >{{ d.price | priceDisplay }}</div>
                        </div>
                      </div>
                      <template v-if="d.aName">
                        <div class="text-caption">
                          {{ d.aName }}
                        </div>
                      </template>
                      <v-divider style="margin-top: 10px;margin-bottom: 10px"/>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </template>
          <div style="display: flex;justify-content: space-between;white-space: nowrap">
            <div>End of Ordering</div>
            <div>
              {{ basicInfo?.endTime | beautifulTime }}
            </div>
          </div>
           <v-divider style="margin-top: 10px;margin-bottom: 10px"/>
        </div>

        <div>
          <div style="display: flex;justify-content: space-between;white-space: nowrap">
              <div>
                Table Number:
              </div>
            <div>
              {{ billData?.billInfo?.tableName }}
            </div>
          </div>
          <div style="display: flex;justify-content: space-between;white-space: nowrap">
              <div>
                No. Person:
              </div>
            <div>
              {{ billData?.billInfo?.personCount }}
            </div>
          </div>
          <div style="display: flex;justify-content: space-between;white-space: nowrap">
              <div>
                Order Type:
              </div>
            <div>
              {{ consumeType }}
            </div>
          </div>
           <v-divider style="margin-top: 10px;margin-bottom: 10px;"/>
          <table
            class="mt-6"
            style="width: 100%"
          >
            <tbody>
            <tr>
              <td style="width: 140px">
                Sub Total
              </td>
              <td style="width: 140px">
                {{ count }} Products
              </td>
              <td style="text-align: right">
                {{ dishTotalPrice | priceDisplay }}
              </td>
            </tr>
            <tr v-if="billData?.billInfo?.tipIncome>0">
              <td style="width: 140px">
                Tips
              </td>
              <td style="width: 140px"/>
              <td style="text-align: right">
                {{ billData?.billInfo?.tipIncome | priceDisplay }}
              </td>
            </tr>
            <tr v-if="billData?.billInfo?.discountStr">
              <td style="width: 140px">
                Discount
              </td>
              <td style="width: 140px">
                Total Price
              </td>
              <td style="text-align: right">
                {{ billData?.billInfo?.discountStr }}
              </td>
            </tr>
            <tr class="font-weight-bold">
              <td style="width: 140px">
                Total excluding tax
              </td>
              <td/>

              <td style="text-align: right">
                {{ totalExcludingTax | priceDisplay }}
              </td>
            </tr>
            <tr class="font-weight-bold">
              <td style="width: 140px">
                VAT
              </td>
              <td/>

              <td style="text-align: right">
                {{ totalTax | priceDisplay }}
              </td>
            </tr>
            <tr class="font-weight-bold">
              <td style="width: 140px">
                Total Price
              </td>
              <td/>

              <td style="text-align: right">
                {{ totalPrice | priceDisplay }}
              </td>
            </tr>
            </tbody>
          </table>
           <v-divider style="margin-top: 10px;margin-bottom: 10px"/>
          <div class="font-weight-regular">
            Customer Payment
          </div>
          <div
            v-for="item in paymentRecordList"
            :key="item.id"
          >
            <div style="display: flex;justify-content: space-between;white-space: nowrap">
              <div>
                {{ item.enPaymentMethodName }}
              </div>
              <div>
                {{ item.amount | priceDisplay }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-center align-center flex-column pa-4">
        <v-btn
          v-if="checkoutType === 2"
          v-print="'#billDetail'"
          class="ml-2 mt-10"
          color="primary lighten-4 black--text"
          elevation="0"
          width="100%"
        >
          {{ $t('downloadPDFBill') }}
        </v-btn>
        <v-btn
          v-if="checkoutType === 3"
          :loading="sendEmailLoading"
          class="ml-2 mt-2"
          color="primary lighten-4 black--text"
          elevation="0"
          width="100%"
          @click="sendEmail"
        >
          {{ $t('sendToEmail') }}
        </v-btn>
        <v-btn
          class="ml-2 mt-2"
          color="blue lighten-4 black--text"
          elevation="0"
          width="100%"
          @click="backToOrder"
        >
          {{ $t('Return') }}
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { getNiceRestaurantInfo } from '@/oldjs/zbonPrint'
import { loadDetailOrderEn } from '@/api/api'
import {
  getAllConsumeTypeList,
  getAllConsumeTypeStatus,
  getAllPaymentList,
  sendBillDetailToEmail
} from '@/api/BillDetail/api'
import { groupBy } from 'lodash'
import print from 'vue-print-nb'
import { mapMutations } from 'vuex'
import { goHome } from '@/oldjs/StaticModel'
import store from '@/store'
import * as htmlToImage from 'html-to-image'

export default {
  name: 'BillDetailPage',
  props: {
    orderId: {},
    checkoutType: {}
  },
  directives: {
    print
  },
  data: function () {
    return {
      sendEmailLoading: false,
      rules: [
        v => !!v || 'This is required'
      ],
      valid: true,
      customerName: '',
      customerAddress: '',
      customerCity: '',
      customerPostcode: '',
      customerEmail: '',
      checkCustomerInfo: true,
      orders: null,
      showEmailDialog: false,
      consumeTypeStatusList: [],
      payMethods: [],
      consumeType: '',
      paymentRecordList: [],
      enPaymentStatus: '',
      billData: [],
      restaurantInfo: []
    }
  },
  computed: {
    count () {
      return this.orders.reduce((sum, i) => sum + parseInt(i.sumCount), 0)
    },
    detailedOrders () {
      return (this.billData?.orderDetailInfo ?? []).map(o => {
        let name
        switch (o.dishStatus) {
          case '-1':
            name = 'returnDish'
            break
          case '-100':
            name = 'dividedOrder'
            break
          case '-101':
            name = 'tableChanged'
            break
          default:
            name = 'orderFood'
        }
        o.dishStatusName = name
        return o
      })
    },
    displayDetailInfo () {
      const groupedInfo = groupBy(this.detailedOrders, 'time')

      for (const time in groupedInfo) {
        groupedInfo[time] = groupBy(groupedInfo[time], 'dishStatusName')
        for (const key in groupedInfo[time]) {
          const timeInfo = groupBy(groupedInfo[time][key], (i) => {
            return i.currentCode + i.name + i.note + i.aName + i.tempDiscountStr
          })
          groupedInfo[time][key] = Object.keys(timeInfo).reduce((arr, i) => {
            arr.push(timeInfo[i].reduce((obj, t) => {
              obj.count = parseInt(obj.count) + parseInt(t.count)
              return obj
            }))
            return arr
          }, [])
        }
      }
      return groupedInfo
    },
    dishTotalPrice () {
      return this.orders.reduce((sum, i) => sum + parseFloat(i.totalPrice), 0)
    },
    basicInfo () {
      return this.billData?.billInfo
    },
    totalTax () {
      return parseFloat(this.billData.billInfo.tax ?? 0)
    },
    totalExcludingTax () {
      return parseFloat(this.billData.billInfo.totalPrice - this.billData.billInfo.tax ?? 0)
    },
    totalPrice () {
      return parseFloat(this.billData.billInfo.totalPrice ?? 0)
    }
  },
  async mounted () {
    await this.reload()
  },
  methods: {
    getCustomerInfo () {
      if (this.$refs.form.validate()) {
        this.checkCustomerInfo = false
      }
    },
    async backToOrder () {
      this.checkCustomerInfo = true
      this.closeOrderDetail()
      if (store.state.reprintType !== 1) {
        await goHome()
      }
    },
    ...mapMutations(['showOrderDetail', 'closeOrderDetail']),
    async sendEmail () {
      this.sendEmailLoading = true
      const node = document.getElementById('billDetail')
      const data = (await htmlToImage.toPng(node)).split(',')
      const type = data[0].match(/:(.*?);/)[1]
      const suffix = type.split('/')[1]
      const bstr = window.atob(data[1])
      let n = bstr.length
      const u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      const file = new File([u8arr], `${this.orderId}.${suffix}`, {
        type: type
      })
      try {
        await sendBillDetailToEmail(this.customerEmail, file, this.orderId)
      } catch (e) {
        console.log('e')
      }
      this.sendEmailLoading = false
      await this.backToOrder()
    },
    async reload () {
      this.restaurantInfo = await getNiceRestaurantInfo()
      this.payMethods = (await getAllPaymentList())
      this.billData = await loadDetailOrderEn(this.orderId)
      this.consumeTypeStatusList = await getAllConsumeTypeStatus()
      const list = await getAllConsumeTypeList()

      if (this.billData.billOrderInfo) {
        this.orders = this.billData.billOrderInfo.map((item, index) => ({
          id: index,
          consumeTypeName:
            item.overrideConsumeTypeId
              ? list.find(i => i.id === parseInt(item.overrideConsumeTypeId))?.name : '',
          ...item
        }))
      } else {
        this.orders = this.billData.orderDetailInfo.map((item) => ({
          id: item.id,
          sumCount: item.count,
          code: item.currentCode,
          name: item.name,
          note: item.note,
          aName: item.aName,
          stamp: item.time,
          consumeTypeName: '',
          totalPrice: item.price
        }))
      }
      this.rawAddressInfo = JSON.parse(this.billData.billInfo.rawAddressInfo)
      this.enPaymentStatus = this.billData.billInfo.paymentStatus === '1' ? 'Paid' : 'Unpaid'
      this.consumeType = list.find(i => parseInt(this.billData.billInfo.consumeTypeId) === parseInt(i.id)).name
      this.paymentRecordList = this.billData?.billPaymentInfo.map(item => {
        item.paymentMethodName = this.payMethods.find(it => parseInt(it.id) === parseInt(item.paymentMethodId))
        item.enPaymentMethodName = item.paymentMethodName.langs.find(x => x.lang === 'EN').name
        item.createdAt = item.createdAt ?? ''
        return item
      }) ?? []
    }
  }
}
</script>

<style scoped>

</style>
