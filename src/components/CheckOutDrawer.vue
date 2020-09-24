<template>
    <v-navigation-drawer width="fit-content" left fixed temporary v-model="realShow">
        <v-card class="fill-height">
            <check-out-calculator
                    @payment-cancel="realShow=false"
                    @payment-submit="checkOut"
                    :total="order.total()*(1-discountRatio)"/>
        </v-card>
    </v-navigation-drawer>
</template>

<script>
import CheckOutCalculator from './CheckOutCalculator'
import { hillo } from 'innerken-utils'
import { toast } from '../oldjs/common'
import { goHome } from '../oldjs/StaticModel'
import GlobalConfig from '../oldjs/LocalGlobalSettings'
import { setDiscountToTable } from '../oldjs/api'
import { printNow } from '../oldjs/Timer'

export default {
  name: 'CheckOutDrawer',
  components: { CheckOutCalculator },
  props: {
    order: {
      default: () => ({ total: () => 0, count: () => 0 })
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
    }
  },
  data: function () {
    return {
      GlobalConfig: GlobalConfig
    }
  },
  computed: {
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
        paymentLog: JSON.stringify(paymentLog),
        discountStr: ''
      }

      if (paymentLog.length === 0) {
        delete checkOutData.paymentLog
      }
      if (this.discountRatio !== 0) {
        checkOutData.discountStr = (this.discountStr ?? '')
          .indexOf('p') !== -1 ? this.discountStr : (this.order.total() * this.discountRatio).toFixed(2)
      }

      const res = await hillo.post('Complex.php?op=' + this.checkOutType, checkOutData)
      if (res) {
        if (this.checkOutType !== 'checkOut') {
          if (!checkOutData.discountStr.includes('p') && this.discountStr) {
            const remainDiscount = parseFloat(this.discountStr) - parseFloat(checkOutData.discountStr)
            // console.log(remainDiscount)
            setDiscountToTable(this.tableId, remainDiscount)
          }
        }
        toast(this.$t('JSTableCheckOutSuccess'))
        this.cancel()
        if (this.checkOutType === 'checkOut') {
          goHome()
        }
      }
      printNow()
    }
  }
}
</script>

<style scoped>

</style>
