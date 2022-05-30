<template>
  <div>
    <v-simple-table height="calc(100vh - 64px)" fixed-header class="transparent">
      <template v-slot:default>
        <thead class="transparent">
        <tr>
          <th class="text-left">{{ $t('Tisch Nr.') }}</th>
          <th>{{ $t('R. Nr.') }}</th>
          <th class="text-left">{{ $t('time') }}</th>
          <th class="text-left">{{ $t('Summe') }}</th>
          <th class="text-left" style="width: 300px">{{ $t('operation') }}</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="order in orders">
          <tr v-bind:key="order.orderId">
            <td>
              <span class="font-weight-bold">{{ order.tableName }}</span>
            </td>
            <td>{{ order.orderId }}</td>
            <td>
              {{ order.updatedAt }}
            </td>
            <td :style="{background:order.backGroundColor,color:order.foreGroundColor}">
              {{ order.totalPrice }}<span v-if="order.tipIncome>0">({{ order.tipIncome }})</span>/
              {{ order.paymentMethodStrings }}<b v-if="order.discountStr">/
              {{ '-' + order.discountStr.replace('p', '%') }}</b>
            </td>
            <td>
              <v-btn
                text
                :disabled="order.isReturned==='1'"
                @click="reprintOrder(order.orderId)"
                small
                color="primary">
                <v-icon left>
                  mdi-printer-settings
                </v-icon>
                {{ $t('补打') }}
              </v-btn>
              <template v-if="showOperation">
                <v-btn small
                       text
                       :disabled="order.isReturned==='1'"
                       color="warning"
                       class="ml-2"
                       @click="startChangePaymentMethodForOrder(order)">
                  <v-icon left>mdi-cash-refund</v-icon>
                  {{ $t('更换') }}
                </v-btn>
              </template>
              <v-btn small
                     class="ml-2"
                     text
                     @click="checkOrderDetail(order)">
                <v-icon left>mdi-arrow-right-drop-circle-outline</v-icon>
                {{ $t('详情') }}
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
        <order-detail-dialog :order="selectedOrder" @close-detail="orderDetailDialog = false"
                             @return-order="returnOrder"></order-detail-dialog>
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
  components: {
    OrderDetailDialog,
    CheckOutCalculator
  },
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
      IKUtils.showConfirm(this.$t('Bist du sicher?'), this.$t('Möchten Sie die Rechnung stornieren?'), () => {
        IKUtils.showLoading()
        returnOrder(orderId).then(() => {
          IKUtils.toast()
          this.$emit('need-refresh')
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
      this.selectedOrder = await loadDetailOrder(order.orderId)
      this.selectedOrder.isReturned = order.isReturned
      this.orderDetailDialog = true
    }
  }
}
</script>

<style scoped>

</style>
