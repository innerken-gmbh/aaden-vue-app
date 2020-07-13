<template>
    <v-sheet v-if="orders.length>0">
        <div class="orderDishList">
            <template v-for="(order,index) in orders">
                <div :key="'order'+title+'hash'+order.hash" @click="clickCallback(index)">
                    <dish-card
                            :show-edit="showEdit"
                            :dish="order"
                            :hide-free-dish="hideFreeDish"/>
                </div>
            </template>
        </div>
        <v-divider class="mx-2 my-2"></v-divider>
        <div class="py-3 px-3">
            <div class="d-flex justify-space-between font-weight-black">
                <div class="font-weight-black">{{'Total:'}}</div>
                <div>{{total | priceDisplay}}</div>
            </div>
        </div>
        <v-divider class="mx-2 my-2"></v-divider>
    </v-sheet>
</template>

<script>
import DishCard from './DishCard'

export default {
  name: 'CartDishCardList',
  components: { DishCard },
  props: {
    title: {
      type: String,
      default: ''
    },
    orders: {
      type: Array,
      default: () => []
    },
    hideFreeDish: {
      type: Boolean,
      default: false
    },
    clickCallback: {
      type: Function,
      default: () => {
      }
    },
    defaultExpand: {
      type: Boolean,
      default: false
    },
    showEdit: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      expand: this.defaultExpand
    }
  },
  computed: {
    total: function () {
      let totalPrice = 0
      for (const a of this.orders) {
        if (this.hideFreeDish && parseInt(a.categoryTypeId) === 11) {
          continue
        }
        totalPrice += parseFloat(parseInt(a.sumCount ?? a.count) * parseFloat(a.price))
      }
      return totalPrice
    }
  }
}
</script>

<style scoped>

</style>
