<template>
  <div>
    <v-simple-table height="calc(100vh - 144px)" fixed-header>
      <template v-slot:default>
        <thead>
        <tr>
          <th class="text-left">{{ $t('Tisch Nr.') }} / {{ $t('R. Nr.') }}</th>
          <th class="text-left">{{ $t('time') }}</th>
          <th class="text-left">{{ $t('Summe') }}</th>
          <th v-if="showOperation" class="text-left">{{ $t('operation') }}</th>
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
              {{ order.totalPrice }}<span v-if="order.tipIncome>0">({{
                order.tipIncome
              }})</span>/
              {{ order.paymentMethodStrings }}<b v-if="order.discountStr">/
              {{ '-' + order.discountStr.replace('p', '%') }}</b>
            </td>
            <td v-if="showOperation">
              <v-btn elevation="0" @click="reprintOrder(order.orderId)" small color="primary">
                <v-icon left>
                  mdi-printer-settings
                </v-icon>
                补打
              </v-btn>
              <v-btn small
                     elevation="0"
                     color="warning"
                     class="ml-2"
                     @click="startChangePaymentMethodForOrder(order)">
                <v-icon left>mdi-cash-refund</v-icon>
                更换
              </v-btn>
              <v-btn small
                     elevation="0"
                     color="error"
                     class="ml-2"
                     @click="startChangePaymentMethodForOrder(order)">
                <v-icon>mdi-file-cancel-outline</v-icon>

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
  </div>

</template>

<script>
import IKUtils from 'innerken-js-utils'
import { changePayMethodForOrder, reprintOrder } from '@/api/api'

export default {
  name: 'BillTable',
  data: function () {
    return {
      checkOutDialog: null,
      changeOrderTotal: 0,
      changeOrderId: null
    }
  },
  props: { orders: {}, showOperation: { default: false } },
  methods: {
    async changePaymentMethod (paymentLog = []) {
      if (paymentLog?.length > 0) {
        IKUtils.showLoading()
        const res = await changePayMethodForOrder(this.changeOrderId, paymentLog)
        console.log(res)
        IKUtils.toast('OK')
        this.checkOutDialog = false
      } else {
        IKUtils.showError('Bitte Eine Paymethod zu wahlen.')
      }
      await this.loadData()
    },
    async reprintOrder (orderId) {
      IKUtils.showLoading()
      await reprintOrder(orderId)
      IKUtils.toast()
    },
    startChangePaymentMethodForOrder (order) {
      this.changeOrderId = order.orderId
      this.changeOrderTotal = order.totalPrice
      this.checkOutDialog = true
    }
  }
}
</script>

<style scoped>

</style>
