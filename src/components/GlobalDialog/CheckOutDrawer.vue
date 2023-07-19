<template>
  <v-navigation-drawer
      v-model="realShow"
      fixed
      temporary
      right
      touchless
      width="fit-content"
  >
    <v-card class="fill-height" tile>
      <check-out-calculator
          :id="id"
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
import { changeFireBaseOrderToFinished } from '@/api/fireStore'
import IKUtils from 'innerken-js-utils'
import { payWithCard } from '@/api/cardTerminal'

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
    }
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
    cancel () {
      this.realShow = false
    },
    async checkOut (paymentLog = [], billType) {
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
        pw: this.password
      }
      let ecAmount = 0
      console.log(paymentLog)
      if (paymentLog.length > 0) {
        checkOutData.paymentLog = JSON.stringify(paymentLog)
        ecAmount = paymentLog.filter(it => parseInt(it.id) === 2).reduce((sum, i) => sum + parseFloat(i.price), 0).toFixed(2)
      }
      if (ecAmount > 0 && GlobalConfig.cardTerminalIp) {
        IKUtils.showLoading(false)
        console.log(ecAmount, 'payAmount')
        const paymentResult = await payWithCard(GlobalConfig.cardTerminalIp, ecAmount)
        if (paymentResult) {
          IKUtils.toast('👌')
        } else {
          IKUtils.showError('Payment is failed')
          return
        }
      }

      if (this.discountRatio !== 0) {
        checkOutData.discountStr =
            (this.discountStr ?? '').indexOf('p') !== -1
              ? this.discountStr
              : (this.order.total * this.discountRatio).toFixed(2)
      }

      delete checkOutData.discountStr
      const res = await hillo.post(
        'Complex.php?op=' + this.checkOutType,
        checkOutData
      )
      if (res) {
        const externalId = await hillo.post(
          'Orders.php?op=getExternalIdByCheckOut',
          {
            tableId: checkOutData.tableId
          }
        )
        if (parseInt(externalId) !== 0) {
          await changeFireBaseOrderToFinished(externalId)
        }
        toast(this.$t('JSTableCheckOutSuccess'))
        this.cancel()
        if (this.checkOutType === 'checkOut') {
          await goHome()
        }
      }
      printNow()
    }
  }
}
</script>

<style scoped></style>
