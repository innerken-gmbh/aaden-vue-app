<template>
    <v-navigation-drawer color="#f5f6fa" width="100%" right fixed hide-overlay
                         temporary v-model="realShow">
        <div style="margin-top: 64px">
            <div class="d-flex justify-space-between px-2" style="">
                <div style="width: 400px">
                    <dish-card-list
                            :title="'结账菜品'"
                            :default-expand="true" :orders="order.list"/>
                </div>
                <div class="flex-grow-1 px-2">
                    <check-out-calculator :total="order.total()"/>
                </div>
            </div>
        </div>
    </v-navigation-drawer>
</template>

<script>
import Payment from 'aaden-base-model/lib/Models/Payment'
import { hillo } from 'innerken-utils'
import DishCardList from './DishCardList'
import CheckOutCalculator from './CheckOutCalculator'

export default {
  name: 'CheckOutDrawer',
  components: { CheckOutCalculator, DishCardList },
  props: {
    order: {
      type: Object
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  data: function () {
    return {
      error: false,
      errorMessage: '',
      billType: 0,
      paymentId: 0,
      payment: [],
      tip: '',
      cardId: '',
      loadingMemberCard: false
    }
  },
  computed: {
    realShow: {
      get: function () {
        return this.visible
      },
      set: function (val) {
        console.log(val)
        this.$emit('visibility-changed', val)
      }
    },
    disableButton: function () {
      return this.paymentId === 3 && (this.error || this.cardId === '')
    }
  },
  watch: {
    cardId: async function (val) {
      this.loadingMemberCard = true
      try {
        const res = (await hillo.silentGet('MemberCard.php', {
          op: 'getOne',
          id: val
        })).content
        if (parseFloat(this.order.total()) > parseFloat(res.leftAmount)) {
          throw new Error('您的余额为' + res.leftAmount + '，不够支付' + this.order.total() + '。请更换支付方式。')
        }
        this.error = false
        this.errorMessage = ''
      } catch (error) {
        console.log(error)
        this.error = true
        this.errorMessage = `ERROR: ${error?.data?.info ?? error}`
      }
      this.loadingMemberCard = false
    }
  },
  methods: {
    cancel () {
      this.realShow = false
    },
    checkoutParams () {
      this.$emit('checkout')
    }
  },
  async mounted () {
    console.log(this.order)
    this.payment = (await Payment.getList()).filter(i => i.id !== 0 && i.isOnline === 0)
  }
}
</script>

<style scoped>

</style>
