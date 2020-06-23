<template>
    <div v-if="orders.length>0">
        <div class="d-flex justify-space-between" style="   background: #e3e6ea;">
            <div class="d-flex flex-grow-1 justify-space-between dishListTitle">
                <div class="d-flex"><span class="mr-1">{{title}}</span><slot name="after-title" :expand="expand"></slot></div>
                <div class="d-flex">
                    <div class="d-flex align-center">
                        <v-icon>mdi-cash-usd</v-icon>
                        <span class="ml-1">{{total | priceDisplay}}</span>
                        <v-icon class="ml-2">mdi-food</v-icon>
                        <span class="ml-1">{{orders.length}}</span>
                    </div>
                </div>
            </div>
            <div class="pr-1 d-flex align-center">
                <v-btn @click="expand=!expand" fab x-small dark>
                    <v-icon v-if="!expand">mdi-unfold-more-horizontal</v-icon>
                    <v-icon v-else>mdi-unfold-less-horizontal</v-icon>
                </v-btn>
            </div>
        </div>
        <transition name="fade">
            <div v-if="expand" class="orderDishList" style="max-height: calc(100vh - 200px);overflow-y: scroll">
                <template v-for="(order,index) in orders">
                    <div :key="'order'+title+order.tid+'code'+index" @click="clickCallback(index)">
                        <dish-card
                                :dish="order"
                                :hide-free-dish="hideFreeDish"/>
                    </div>
                </template>
            </div>
        </transition>
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
    },
    defaultExpand: {
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
