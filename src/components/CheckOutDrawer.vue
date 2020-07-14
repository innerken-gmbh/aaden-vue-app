<template>
    <v-navigation-drawer color="#f5f6fa" width="fit-content" left fixed
                         temporary v-model="realShow">

        <div class="d-flex justify-space-between pa-2 fill-height" style="">
            <div v-if="order.count()>0" style="width: 340px">
                <dish-card-list
                        :title="'结账菜品'"
                        :default-expand="true" :orders="order.list"/>
            </div>
            <div class="flex-grow-1 px-2">
                <check-out-calculator
                        @payment-cancel="realShow=false"
                        @payment-submit="checkOut"
                        :total="order.total()"/>
            </div>
        </div>

    </v-navigation-drawer>
</template>

<script>
import DishCardList from './DishCardList'
import CheckOutCalculator from './CheckOutCalculator'
import { hillo } from 'innerken-utils'
import { findInString, jumpTo, toast } from '../oldjs/common'

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
    tableId: {
      type: String
    },
    discountStr: {
      type: String,
      default: ''
    }
  },
  data: function () {
    return {}
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
      console.log(paymentLog, billType)
      const print = parseInt(billType)
      let withTitle = 0
      let printCount = 1
      if (print > 0) {
        withTitle = 1
      }
      if (print > 1) {
        printCount = 2
      }
      const discountStr = (this.discountStr ?? '')
        .indexOf('p') !== -1 ? this.discountStr : ''
      const checkOutData = {
        tableId: this.tableId,
        dishes: JSON.stringify(this.order.list),
        withTitle,
        printCount,
        paymentLog: JSON.stringify(paymentLog),
        discountStr
      }

      const res = await hillo.post('Complex.php?op=' + this.checkOutType, checkOutData)
      console.log(res)
      if (res) {
        toast(findInString('JSTableCheckOutSuccess'))
        this.cancel()
        if (this.checkOutType === 'checkOut') {
          jumpTo('index.html')
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
