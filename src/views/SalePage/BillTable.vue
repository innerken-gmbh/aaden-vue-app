<template>
  <div>
    <v-simple-table height="calc(100vh - 144px)" fixed-header>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">{{ $t('Tisch Nr.') }} / {{ $t('R. Nr.') }}</th>
          <th class="text-left">{{ $t('time') }}</th>
          <th class="text-left">{{ $t('Summe') }}</th>
          <th class="text-left">{{ $t('operation') }}</th>
          <th class="text-left"></th>
        </tr>
        </thead>
        <tbody>
        <template v-for="order in orders">
          <tr v-bind:key="order.orderId">
            <td>
              <span class="font-weight-bold">{{ order.tableName }}</span> / {{ order.orderId }}
            </td>
            <td>
              {{ order.updatedAt }}
            </td>
            <td :style="{background:order.backGroundColor,color:order.foreGroundColor}">
              {{ order.totalPrice }}<span v-if="order.tipIncome>0">({{order.tipIncome }})</span>/
              {{ order.paymentMethodStrings }}<b v-if="order.discountStr">/
              {{ '-' + order.discountStr.replace('p', '%') }}</b>
            </td>
            <td>

              <v-btn :disabled="order.isReturned==='1'" elevation="0" @click="reprintOrder(order.orderId)" small
                     color="primary">
                <v-icon left>
                  mdi-printer-settings
                </v-icon>
                补打
              </v-btn>
              <template v-if="showOperation">
                <v-btn small
                       :disabled="order.isReturned==='1'"
                       elevation="0"
                       color="warning"
                       class="ml-2"
                       @click="startChangePaymentMethodForOrder(order)">
                  <v-icon left>mdi-cash-refund</v-icon>
                  更换
                </v-btn>
                <v-btn small
                       :disabled="order.isReturned==='1'"
                       elevation="0"
                       color="error"
                       class="ml-2"
                       @click="returnOrder(order.orderId)">
                  <v-icon>mdi-file-cancel-outline</v-icon>
                    退单
                </v-btn>
              </template>
            </td>
            <td>
              <v-btn small
                     icon
                     elevation="0"
                     class="mx-2"
                     @click="checkOrderDetail(order)">
                <v-icon>mdi-arrow-right-drop-circle-outline</v-icon>
              </v-btn>
            </td>
          </tr>
        </template>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="checkOutDialog" fullscreen>
      <v-card width="100%">
        <check-out-calculator
            style="height: 564px"
            @payment-cancel="checkOutDialog=false"
            @payment-submit="changePaymentMethod"
            :total="changeOrderTotal"
        ></check-out-calculator>
      </v-card>
    </v-dialog>
    <v-dialog max-width="600px" v-model="orderDetailDialog">
      <v-card width="100%" style="">
        <order-detail-dialog :order="selectedOrder" @closeDetail="orderDetailDialog = false"></order-detail-dialog>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import IKUtils from 'innerken-js-utils'
import { changePayMethodForOrder, loadDetailOrder, reprintOrder, returnOrder } from '@/api/api'
import CheckOutCalculator from '@/components/GlobalDialog/CheckOutCalculator'
import OrderDetailDialog from '@/components/GlobalDialog/OrderDetailDialog'

export default {
  name: 'BillTable',
  components: { OrderDetailDialog, CheckOutCalculator },
  data: function () {
    return {
      orderDetailDialog: false,
      checkOutDialog: null,
      changeOrderTotal: 0,
      changeOrderId: null,
      selectedOrder: null
    }
  },
  props: {
    orders: {},
    showOperation: { default: false }
  },
  methods: {
    async changePaymentMethod (paymentLog = []) {
      if (paymentLog?.length === 0) {
        paymentLog = [{
          id: 1,
          price: this.changeOrderTotal
        }]
      }
      IKUtils.showLoading()
      const res = await changePayMethodForOrder(this.changeOrderId, paymentLog)
      console.log(res)
      IKUtils.toast('OK')
      this.checkOutDialog = false
      this.$emit('need-refresh')
    },
    async returnOrder (orderId) {
      IKUtils.showConfirm('Bist du sicher?', 'Möchten Sie Umsatz Bon stoniren?', () => {
        IKUtils.showLoading()
        returnOrder(orderId).then(() => {
          IKUtils.toast()
        })
      })
    },
    async reprintOrder (orderId) {
      IKUtils.showLoading()
      const needPrintCompany = await IKUtils.showConfirmAsyn(this.$t('是否需要打印公司账单'), this.$t('重新打印'))
      await reprintOrder(orderId, needPrintCompany.isConfirmed ? 1 : 0)
      IKUtils.toast()
    },
    startChangePaymentMethodForOrder (order) {
      this.changeOrderId = order.orderId
      this.changeOrderTotal = order.totalPrice
      this.checkOutDialog = true
    },
    async checkOrderDetail (order) {
      console.log(order.orderId)
      this.selectedOrder = await loadDetailOrder(order.orderId)
      console.log(this.selectedOrder)
      this.orderDetailDialog = true
    }
  }
}
</script>

<style scoped>

</style>
