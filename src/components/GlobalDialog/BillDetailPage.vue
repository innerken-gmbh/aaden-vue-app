<template>
  <div>
    <v-card class="pa-4">
      <div id="billDetail">
        <div>
          Order Detail · #{{ orderId }}
        </div>
        <v-divider style="margin-top: 10px;margin-bottom: 10px"/>
        <div>
          <div>
            <div style="font-size: 14px; font-weight: bold">
              <span>{{ InnerkenInfo.name }}</span>
              <span style="float: right">Bill To</span>
            </div>
            <div style="font-size: 10px">
              <span>{{ InnerkenInfo.address }}</span>
              <span style="float: right">{{ restaurantInfo?.name }}</span>
            </div>
            <div style="font-size: 10px">
              <span>{{ InnerkenInfo.city }}</span>
              <span style="float: right">{{ restaurantInfo?.adress1 }}</span>
            </div>
            <div style="font-size: 10px">
              <span>{{ InnerkenInfo.country }}</span>
              <span style="float: right">{{ restaurantInfo?.city }} {{ restaurantInfo?.postCode }}</span>
            </div>
            <div style="font-size: 10px">
              <span>{{ InnerkenInfo.phone }}</span>
              <span style="float: right">{{ restaurantInfo?.emailAddress }}</span>
            </div>
            <div style="font-size: 10px">
              <span>{{ InnerkenInfo.email }}</span>
            </div>
          </div>
        </div>
        <v-divider style="margin-top: 10px;margin-bottom: 10px"/>
        <div>
          <div>
            <span>Order details</span>
            <div
              style="float: right"
            >
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
          <div>
            <span>Start of Ordering</span>
            <div style="float: right">
              {{ basicInfo.startTime | beautifulTime }}
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
                  <div>
                    <span>Order</span>
                    <div style="float: right">
                      {{ t | beautifulTime }}
                    </div>
                  </div>
                  <v-divider style="margin-top: 10px;margin-bottom: 10px"/>
                  <div class="mt-4">
                    <div
                      v-for="d in displayDetailInfo[t][op]"
                      :key="d.id"
                    >
                      <div>
                        <div>
                          <b>{{ Math.abs(d.count) }}&times; </b>
                          <span> #{{ d.currentCode }} </span>
                          <template v-if="parseFloat(d.tempDiscountMod)!==0">
                            <div style="float: right">
                                <span
                                  class="text-decoration-line-through warning--text text--darken-1"
                                  style="font-size: 10px"
                                >{{ d.price | priceDisplay }}</span>
                              <span class="text-no-wrap">
                                  {{ parseFloat(d.price) + parseFloat(d.tempDiscountMod) | priceDisplay }}</span>
                            </div>
                          </template>
                          <span
                            v-else
                            class="text-no-wrap"
                            style="float: right"
                          >{{ d.price | priceDisplay }}</span>
                        </div>
                        <div>
                          <span class="maxLine2">{{ d.name }}</span>
                        </div>
                      </div>
                      <template v-if="d.aName">
                        <div class="text-caption">
                          {{ d.aName }}
                        </div>
                      </template>
                      <v-divider style="margin-top: 2px;margin-bottom: 2px"/>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </template>
          <div style="margin-top: 8px">
            <span>End of Ordering</span>
            <div style="float: right">
              {{ basicInfo.endTime | beautifulTime }}
            </div>
          </div>
          <v-divider style="margin-top: 10px;margin-bottom: 10px"/>
        </div>

        <div>
          <div>
              <span>
                Table Number:
              </span>
            <div style="float: right">
              {{ billData.billInfo.tableName }}
            </div>
          </div>
          <div>
              <span>
                No. Person:
              </span>
            <div style="float: right">
              {{ billData.billInfo.personCount }}
            </div>
          </div>
          <div>
              <span>
                Order Type:
              </span>
            <div style="float: right">
              {{ consumeType }}
            </div>
          </div>
          <v-divider style="margin-top: 10px;margin-bottom: 10px"/>
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
            <tr v-if="billData.billInfo.tipIncome>0">
              <td style="width: 140px">
                Tips
              </td>
              <td style="width: 140px"/>
              <td style="text-align: right">
                {{ billData.billInfo.tipIncome | priceDisplay }}
              </td>
            </tr>
            <tr v-if="billData.billInfo.discountStr">
              <td style="width: 140px">
                Discount
              </td>
              <td style="width: 140px">
                Total Price
              </td>
              <td style="text-align: right">
                {{ billData.billInfo.discountStr }}
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
          <div class="text-subtitle-2 font-weight-regular">
            Customer Payment
          </div>
          <div
            v-for="item in paymentRecordList"
            :key="item.id"
          >
              <span>
                {{ item.enPaymentMethodName }}
              </span>
            <div style="float: right">
              {{ item.amount | priceDisplay }}
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-center align-center flex-column">
        <v-btn
          v-if="checkoutType === 2"
          v-print="'#billDetail'"
          class="ml-2 mt-10"
          color="primary lighten-4 black--text"
          elevation="0"
          width="100%"
        >
          下载PDF账单
        </v-btn>
        <v-btn
          v-if="checkoutType === 3"
          class="ml-2 mt-10"
          color="primary lighten-4 black--text"
          elevation="0"
          width="100%"
          @click="showEmailDialog = true"
        >
          发送至邮箱
        </v-btn>
        <v-btn
          class="ml-2 mt-2"
          color="blue lighten-4 black--text"
          elevation="0"
          width="100%"
          @click="backToOrder"
        >
          返回
        </v-btn>
      </div>
    </v-card>
    <v-dialog v-model="showEmailDialog" max-width="600px">
      <v-card class="pa-4">
        <div class="d-flex">
          <div class="text-body-1 font-weight-bold">发送账单到邮箱！📧</div>
          <v-spacer/>
          <div>
            <v-btn
              icon
              @click="showEmailDialog = false"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </div>
        </div>
        <div class="text-body-2 mt-1">如果需要，请在下方添加一个邮箱地址，账单可以自动发送</div>
        <div class="mt-4">
          <v-text-field v-model="email" hide-details outlined placeholder="需要发送的邮件地址"/>
        </div>
        <div class="mt-4">
          <v-btn class="mr-2" color="primary" elevation="0" @click="sendEmail">
            <v-icon left>mdi-arrow-right</v-icon>
            确定发送
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { getNiceRestaurantInfo } from '@/oldjs/zbonPrint'
import { loadDetailOrder } from '@/api/api'
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
      email: '',
      showEmailDialog: false,
      consumeTypeStatusList: [],
      payMethods: [],
      consumeType: '',
      paymentRecordList: [],
      enPaymentStatus: '',
      billData: [],
      restaurantInfo: [],
      InnerkenInfo: { name: 'Innerken GmbH', address: 'Jülicher Str. 236', country: 'Germany', city: 'Aachen 52070', phone: '+49 17645762773', email: 'info@innerken.com' }
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
      console.log(groupedInfo, 'groupInfo')
      return groupedInfo
    },
    dishTotalPrice () {
      return this.orders.reduce((sum, i) => sum + parseFloat(i.totalPrice), 0)
    },
    basicInfo () {
      return this.billData?.billInfo
    },
    totalPrice () {
      return parseFloat(this.billData.billInfo.totalPrice ?? 0)
    }
  },
  async mounted () {
    if (this.orderId) {
      await this.reload()
    }
  },
  methods: {
    async backToOrder () {
      this.closeOrderDetail()
      await goHome()
    },
    ...mapMutations(['showOrderDetail', 'closeOrderDetail']),
    async sendEmail () {
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
      await sendBillDetailToEmail(this.email, file, this.orderId)
      this.showEmailDialog = false
      await this.backToOrder()
    },
    async reload () {
      this.restaurantInfo = await getNiceRestaurantInfo()
      console.log(this.restaurantInfo, 'info')
      this.payMethods = (await getAllPaymentList())
      this.billData = await loadDetailOrder(this.orderId)
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
      console.log(this.paymentRecordList, 'paymentList')
    }
  }
}
</script>

<style scoped>

</style>
