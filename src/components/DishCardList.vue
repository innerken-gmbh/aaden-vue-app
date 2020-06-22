<template>
    <div v-show="orders.length>0">
        <div class="d-flex justify-space-between dishListTitle">
            <div class="">{{title}}</div>
            <div class="d-flex">
                <v-icon>mdi-cash-usd</v-icon>
                <span class="ml-1">{{total | priceDisplay}}</span>
                <v-icon class="ml-2">mdi-food</v-icon>
                <span class="ml-1">{{orders.length}}</span>
            </div>
        </div>
        <div class="orderDishList">
            <template v-for="(order,index) in orders">
                <div :key="'order'+index" @click="clickCallback(index)">
                    <dish-card
                            :dish="order"
                            :hide-free-dish="hideFreeDish"
                    />
                </div>
            </template>
        </div>
    </div>

</template>

<script>
import DishCard from './DishCard'

export default {
  name: 'DishCardList',
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
    }
  },
  computed: {
    total: function () {
      let totalPrice = 0
      for (const a of this.orders) {
        if (this.hideFreeDish && parseInt(a.categoryTypeId) === 11) {
          continue
        }
        a.totalPrice = parseFloat(a.totalPrice).toFixed(2)
        totalPrice += parseFloat(a.totalPrice)
      }
      return totalPrice
    }
  }
}
</script>

<style scoped>

</style>
