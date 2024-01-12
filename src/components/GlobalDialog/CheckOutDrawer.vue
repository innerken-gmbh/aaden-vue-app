<template>
  <v-navigation-drawer
      v-model="realShow"
      fixed
      right
      touchless
      width="fit-content"
  >
    <v-card
        class="fill-height"
        tile
    >
      <check-out-calculator
          :id="id"
          :current-member-id="currentMemberId"
          :total="totalPrice"
          @payment-cancel="realShow = false"
          @payment-submit="checkOut"
      />
    </v-card>
  </v-navigation-drawer>
</template>

<script>
import CheckOutCalculator from './CheckOutCalculator'
import hillo from 'hillo'
import { toast } from '@/oldjs/common'
import { goHome } from '@/oldjs/StaticModel'
import { printNow } from '@/oldjs/Timer'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { round } from 'lodash-es'
import { addBonusPoint, getUserById } from '@/api/VIPCard/VIPApi'
import IKUtils from 'innerken-js-utils'
import { getUUidByOrderId } from '@/api/api'
import { mapMutations } from 'vuex'
import { getCurrentOrderInfo } from '@/api/Repository/OrderInfo'
import { setUuidInFirebase } from '@/api/customerDiaplay'

export default {
  name: 'CheckOutDrawer',
  components: { CheckOutCalculator },
  props: {
    id: {
      default: null
    },
    order: {
      default: () => ({
        total: 0,
        count: 0,
        list: []
      })
    },
    visible: {
      default: true
    },
    checkOutType: {
      default: 'checkOut'
    },
    discountRatio: {
      default: 1
    },
    tableId: {},
    discountStr: {
      default: ''
    },
    password: {
      default: ''
    },
    currentMemberId: {}
  },
  data: function () {
    return {
      GlobalConfig: GlobalConfig
    }
  },
  computed: {
    totalPrice () {
      return round(this.order.total * (1 - this.discountRatio), 2)
    },
    realShow: {
      get: function () {
        return this.visible
      },
      set: function (val) {
        this.$emit('visibility-changed', val)
      }
    }
  },
  methods: {
    ...mapMutations(['showBillDetailQRDialog']),
    cancel () {
      this.realShow = false
    },
    async checkOut (paymentLog = [], billType, printType) {
      const print = parseInt(billType)
      let withTitle = 0
      let printCount = 1
      if (print > 0) {
        withTitle = 1
      }
      if (print > 1) {
        printCount = 2
      }
      const checkOutData = {
        tableId: this.tableId,
        dishes: JSON.stringify(this.order.list),
        withTitle,
        printCount,
        payMethod: 1,
        discountStr: '',
        pw: this.password,
        notPrintingCheckOutBon: printType === 1 ? 1 : 0
      }
      if (paymentLog.length > 0) {
        checkOutData.paymentLog = JSON.stringify(paymentLog)
      }
      IKUtils.showLoading(false)
      if (this.discountRatio !== 0) {
        checkOutData.discountStr =
            (this.discountStr ?? '').indexOf('p') !== -1
              ? this.discountStr
              : (this.order.total * this.discountRatio).toFixed(2)
      }

      delete checkOutData.discountStr
      let res
      try {
        res = await hillo.post(
          'Complex.php?op=' + this.checkOutType,
          checkOutData, { timeout: 300 * 1000 }
        )
        IKUtils.toast('👌')
      } catch (e) {
        setTimeout(async () => {
          const res = await getCurrentOrderInfo(this.tableId)
          if (res.usageStatus === '0') {
            await goHome()
          }
        }, 3 * 1000)
        IKUtils.showError(this.$t('PaymentFailed'))
      }
      if (res) {
        toast(this.$t('JSTableCheckOutSuccess'))
        if (this.currentMemberId) {
          const user = await getUserById(this.currentMemberId)
          await addBonusPoint(user.uid, this.totalPrice)
        }
        this.cancel()
        if (this.checkOutType === 'checkOut') {
          IKUtils.showLoading()
          const uuid = await getUUidByOrderId(this.id)
          IKUtils.toast()
          await goHome()
          if (printType === 1) {
            await setUuidInFirebase(uuid)
            this.showBillDetailQRDialog({ code: uuid })
          }
        } else if (this.checkOutType === 'splitOrder') {
          IKUtils.showLoading()
          const uuid = await getUUidByOrderId(res.content.toString())
          console.log(uuid, 'uuid')
          IKUtils.toast()
          if (printType === 1) {
            await setUuidInFirebase(uuid)
            this.showBillDetailQRDialog({ code: uuid })
          }
        }
      }
      printNow()
    }
  }
}
</script>

<style scoped></style>
