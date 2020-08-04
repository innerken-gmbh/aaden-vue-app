<template>
    <v-dialog fullscreen v-model="realShow"
              >
        <v-card color="white" class="d-flex justify-space-between fill-height">
            <div v-show="order.count()>0" style="width: 340px">
                <dish-card-list
                        :discount-ratio="discountRatio"
                        :title="'结账菜品'"
                        :default-expand="true" :orders="order.list"/>
            </div>
            <div class="flex-grow-1 px-2">
                <check-out-calculator
                        @payment-cancel="realShow=false"
                        @payment-submit="checkOut"
                        :total="order.total()*(1-discountRatio)"/>
            </div>
        </v-card>
    </v-dialog>
</template>

<script>
import DishCardList from './DishCardList'
import CheckOutCalculator from './CheckOutCalculator'
import { hillo } from 'innerken-utils'
import { toast } from '../oldjs/common'
import { goHome } from '../oldjs/StaticModel'
import GlobalConfig from '../oldjs/LocalGlobalSettings'
import { setDiscountToTable } from '../oldjs/api'

export default {
  name: 'CheckOutDrawer',
  components: { CheckOutCalculator, DishCardList },
  props: {
    order: {
      type: Object,
      default: () => ({ total: () => 0, count: () => 0 })
    },
    visible: {
      type: Boolean,
      default: true
    },
    checkOutType: {
      type: String,
      default: 'checkOut'
    },
    discountRatio: {
      type: Number,
      default: 1
    },
    tableId: {
      type: [String, Number]
    },
    discountStr: {
      type: String,
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
    async checkOut (paymentLog, billType) {
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
        paymentLog: JSON.stringify(paymentLog),
        discountStr: ''
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
            console.log(remainDiscount)
            setDiscountToTable(this.tableId, remainDiscount)
          }
        }
        toast(this.$t('JSTableCheckOutSuccess'))
        this.cancel()
        if (this.checkOutType === 'checkOut') {
          goHome()
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
