<template>
  <div>
    <v-simple-table class="transparent" fixed-header height="calc(100vh - 148px)">
      <template v-slot:default>
        <thead class="transparent">
        <tr>
          <th class="text-left">{{ $t('TableNumber') }}</th>
          <th>{{ $t('OrderNumber') }}</th>
          <th class="text-left">{{ $t('time') }}</th>
          <th class="text-left">{{ $t('MoneyAmount') }}</th>
          <th class="text-left" style="width: max-content">{{ $t('operation') }}</th>
        </tr>
        </thead>
        <tbody>
        <template v-for="order in orders">
          <tr v-bind:key="order.orderId" @click="checkOrderDetail(order)">
            <td>
              <span class="font-weight-bold">{{ order.tableName }}</span>
            </td>
            <td>{{ order.orderId }}</td>
            <td>
              {{ order.updatedAt }}
            </td>
            <td :style="{background:order.backGroundColor,color:order.foreGroundColor}">
              {{ order.paymentLabel }}<b v-if="order.discountStr">/
              {{ '-' + order.discountStr.replace('p', '%') }}</b>
            </td>
            <td>
              <template v-if="order.paymentLabel">
                <v-btn
                    :disabled="shouldDisable(order)"
                    color="amber lighten-4 black--text"
                    elevation="0"
                    small
                    @click.stop="reprintOrder(order.orderId)">
                  <v-icon>
                    mdi-printer-settings
                  </v-icon>
                </v-btn>
                <v-btn
                    :disabled="shouldDisable(order)"
                  class="ml-2"
                  color="green lighten-4 black--text"
                  elevation="0"
                  small
                  @click.stop="checkBillDetail(order.orderId)">
                  <v-icon>
                    mdi-qrcode-scan
                  </v-icon>
                </v-btn>
                <template v-if="showOperation">
                  <v-btn :disabled="shouldDisable(order)"
                         class="ml-2"
                         color="grey lighten-3 black--text"
                         elevation="0"
                         small
                         @click.stop="startChangePaymentMethodForOrder(order)">
                    <v-icon>mdi-cash-refund</v-icon>
                  </v-btn>
                  <v-btn :disabled="shouldDisable(order)"
                         class="ml-2"
                         color="indigo lighten-4 black--text"
                         elevation="0"
                         small
                         @click.stop="restoreOrder(order.orderId)">
                    <v-icon>mdi-history</v-icon>
                  </v-btn>
                </template>
              </template>

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
          <v-btn block elevation="0" large @click="reprintDialog = false, checkCompanyInfo = true">{{
              $t('tableCheckOutBillTypeOptionCompany')
            }}
          </v-btn>
          <v-btn block class="mt-4" elevation="0" large @click="realReprintOrder(0)">
            {{ $t('tableCheckOutBillTypeOptionNormal') }}
          </v-btn>
        </v-card-text>
      </v-card>
    </v-dialog>
    <v-dialog v-model="checkCompanyInfo" max-width="600px">
      <v-card class="pa-4">
        <div class="d-flex">
          <div class="text-h5 font-weight-bold">
            {{ $t('reprintCompanyBill') }}
          </div>
          <v-spacer/>
          <div>
            <v-btn
                icon
                @click="checkCompanyInfo = false"
            >
              <v-icon large>
                mdi-close
              </v-icon>
            </v-btn>
          </div>
        </div>
        <v-form
            ref="form"
            v-model="valid"
            class="mt-2"
            lazy-validation>
          <div>{{ $t('companyName') }}:</div>
          <v-text-field
              v-model="companyOrPersonName"
              dense
              outlined
              required
          />
          <div>{{ $t('reason') }}:</div>
          <v-text-field
              v-model="reasonOfVisit"
              dense
              outlined
              required
          />
          <div>{{ $t('Date') }}:</div>
          <v-text-field
              v-model="locationAndDate"
              dense
              outlined
              required
          />
        </v-form>
        <div class="d-flex">
          <v-spacer></v-spacer>
          <v-btn
              class="mt-4"
              color="#25A18E"
              dark
              elevation="0"
              large
              style="border-radius: 35px"
              width="100%"
              @click="submitCompanyInfo"
          >
            {{ $t('Confirm') }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-navigation-drawer v-model="checkOutDialog" app right temporary width="400">
      <v-card width="100%">
        <check-out-calculator
            :total="changeOrderTotal"
            style="height: 564px"
            @payment-cancel="checkOutDialog=false"
            @payment-submit="changePaymentMethod"
        ></check-out-calculator>
      </v-card>
    </v-navigation-drawer>
    <v-dialog v-model="orderDetailDialog" max-width="600px">
      <v-card style="" width="100%">
        <order-detail-dialog
            :is-boss="isBoss"
            :order="selectedOrder"
            @close-detail="orderDetailDialog = false"
            @return-order="returnOrder"
        ></order-detail-dialog>
      </v-card>
    </v-dialog>
  </div>

</template>

<script>
import IKUtils from 'innerken-js-utils'
import {
  changePayMethodForOrder,
  getUUidByOrderId,
  loadDetailOrder,
  reprintOrder,
  restoreOrder,
  returnOrder,
  showSuccessMessage,
  sureTo,
  writeCompanyInfo
} from '@/api/api'
import CheckOutCalculator from '@/components/GlobalDialog/CheckOutCalculator'
import OrderDetailDialog from '@/components/GlobalDialog/OrderDetailDialog'
import { mapMutations } from 'vuex'

export default {
  name: 'BillTable',
  components: {
    OrderDetailDialog,
    CheckOutCalculator
  },
  data: function () {
    return {
      valid: true,
      reasonOfVisit: '',
      companyOrPersonName: '',
      locationAndDate: '',
      checkCompanyInfo: false,
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
  watch: {
    checkCompanyInfo (val) {
      if (!val) {
        this.reasonOfVisit = ''
        this.companyOrPersonName = ''
        this.locationAndDate = ''
      }
    }
  },
  methods: {
    shouldDisable (order) {
      console.log(order)
      return order.isReturned === '1' || order.totalPrice < 0
    },
    ...mapMutations(['showBillDetailQRDialog', 'showErrorDialog']),
    async checkBillDetail (id) {
      const res = await getUUidByOrderId(id)
      if (!res) {
        this.showErrorDialog(this.$t('ThisOrderHasNoElectronicBill'))
        return
      }
      // type: 2 指通过uuid查看
      this.showBillDetailQRDialog({ code: res, type: 2 })
    },
    async submitCompanyInfo () {
      await sureTo(
        async () => {
          await writeCompanyInfo({
            orderId: this.reprintOrderId,
            reasonOfVisit: this.reasonOfVisit,
            companyOrPersonName: this.companyOrPersonName,
            locationAndDate: this.locationAndDate
          })
          await this.realReprintOrder()
          this.checkCompanyInfo = false
          showSuccessMessage(this.$t('print_success'))
        })
    },
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
      IKUtils.showConfirm(this.$t('AreYouSure'), this.$t('CancelPrintSalesBon'), () => {
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
    },
    async restoreOrder (orderId) {
      IKUtils.showConfirm(this.$t('AreYouSure'), this.$t('CancelPrintSalesBon'), async () => {
        IKUtils.showLoading()
        await restoreOrder(orderId)
        IKUtils.toast()
        this.$emit('need-refresh')
      })
    }
  }
}
</script>

<style scoped>

</style>
