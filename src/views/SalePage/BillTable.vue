<template>
  <div>
    <v-simple-table class="transparent" fixed-header height="calc(100vh - 136px)">
      <template v-slot:default>
        <thead class="transparent">
        <tr>
          <th class="text-left">{{ $t('TableNumber') }}</th>
          <th>{{ $t('SerialNumber') }}</th>
          <th class="text-left">{{ $t('time') }}</th>
          <th class="text-left">{{ $t('AmountOfConsumption') }}</th>
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
              {{ order.paymentLabel}}<b v-if="order.discountStr">/
              {{ '-' + order.discountStr.replace('p', '%') }}</b>
            </td>
            <td>
              <v-btn
                  :disabled="order.isReturned==='1'"
                  color="primary"
                  small
                  text
                  @click="reprintOrder(order.orderId)">
                <v-icon left>
                  mdi-printer-settings
                </v-icon>
                {{ $tc('reprint',1) }}
              </v-btn>
              <template v-if="showOperation">
                <v-btn :disabled="order.isReturned==='1'"
                       class="ml-2"
                       color="warning"
                       small
                       text
                       @click="startChangePaymentMethodForOrder(order)">
                  <v-icon left>mdi-cash-refund</v-icon>
                  {{ $t('replace') }}
                </v-btn>
              </template>
              <v-btn class="ml-2"
                     small
                     text
                     @click="checkOrderDetail(order)">
                <v-icon left>mdi-arrow-right-drop-circle-outline</v-icon>
                {{ $t('Details') }}
              </v-btn>
            </td>
          </tr>
        </template>
        </tbody>
      </template>
    </v-simple-table>
    <v-dialog v-model="reprintDialog" max-width="300px">
      <v-card>
        <v-card-title>{{ $t('tableCheckOutBillTypeLabel') }}</v-card-title>
        <v-card-text>
          <v-btn block elevation="0" large @click="realReprintOrder">{{
              $t('tableCheckOutBillTypeOptionCompany')
            }}
          </v-btn>
          <v-btn block class="mt-4" elevation="0" large @click="realReprintOrder(0)">
            {{ $t('tableCheckOutBillTypeOptionNormal') }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="checkOutDialog" fullscreen>
      <v-card width="100%">
        <check-out-calculator
            :total="changeOrderTotal"
            style="height: 564px"
            @payment-cancel="checkOutDialog=false"
            @payment-submit="changePaymentMethod"
        ></check-out-calculator>
      </v-card>
    </v-dialog>
    <v-dialog v-model="orderDetailDialog" max-width="600px">
      <v-card style="" width="100%">
        <order-detail-dialog :is-boss="isBoss" :order="selectedOrder" @close-detail="orderDetailDialog = false"
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
      reprintOrderId: null,
      reprintDialog: null,
      selectedOrder: null
    }
  },
  props: {
    orders: {},
    isBoss: {},
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
      IKUtils.showConfirm(this.$t('AreYouSure'), this.$t('Möchten Sie Umsatz Bon stoniren?'), () => {
        IKUtils.showLoading()
        returnOrder(orderId).then(() => {
          IKUtils.toast()
          this.$emit('need-refresh')
        })
      })
    },
    async reprintOrder (orderId) {
      this.reprintOrderId = orderId
      this.reprintDialog = true
    },
    async realReprintOrder (type = 1) {
      IKUtils.showLoading()
      await reprintOrder(this.reprintOrderId, type)
      this.reprintDialog = false
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
