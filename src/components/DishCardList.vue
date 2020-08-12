<template>
    <v-card>
        <v-toolbar
                dense
                tile
                class="font-weight-bold"
                :color="color" dark>

            <v-toolbar-title>{{title}}</v-toolbar-title>

            <v-spacer/>
            <div class="d-flex align-center">
                <v-icon color="white">mdi-cash-usd</v-icon>
                <span class="ml-1">{{total | priceDisplay}}</span>
                <v-icon color="white" class="ml-3">mdi-food</v-icon>
                <span class="ml-1">{{count}}</span>
            </div>
            <v-btn icon small @click="expand=!expand">
                <v-icon v-if="!expand">mdi-unfold-more-horizontal</v-icon>
                <v-icon v-else>mdi-unfold-less-horizontal</v-icon>
            </v-btn>
        </v-toolbar>

        <div v-dragscroll v-show="expand" class="orderDishList"
             :style="{maxHeight: `calc(100vh - 48px - ${extraHeight})`,overflow:'hidden'}"
        >
            <div>
                <template v-for="(order,index) in realOrder">
                    <div :key="'order'+title+order.identity+order.hash">
                        <dish-card
                                :color="color"
                                :show-number="showNumber"
                                :click-callback="()=>clickCallback(index)"
                                :show-edit="showEdit"
                                :dish="order"/>
                    </div>
                </template>
            </div>
        </div>

    </v-card>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import DishCard from './DishCard'

export default {
  name: 'DishCardList',
  components: { DishCard },
  directives: {
    dragscroll
  },
  props: {
    title: {
      default: ''
    },
    extraHeight: {
      default: '0px'
    },
    orders: {
      default: () => []
    },
    clickCallback: {
      default: () => {
      }
    },
    showNumber: {
      default: false
    },
    discountRatio: {
      default: 0
    },
    defaultExpand: {
      default: false
    },
    showEdit: {
      default: false
    },
    color: {
      default: 'grey darken-3'
    }
  },
  data: function () {
    return {
      expand: this.defaultExpand
    }
  },
  watch: {
    defaultExpand: function (val) {
      this.expand = val
    }
  },
  computed: {
    originTotal: function () {
      let totalPrice = 0
      for (const a of this.orders) {
        totalPrice += parseFloat(parseInt(a.count) * parseFloat(a.realPrice))
      }
      return totalPrice
    },
    total: function () {
      let totalPrice = 0
      for (const a of this.realOrder) {
        totalPrice += parseFloat(parseInt(a.count) * parseFloat(a.realPrice))
      }
      return totalPrice
    },
    count: function () {
      let count = 0
      for (const a of this.orders) {
        count += parseInt(a.count)
      }
      return count
    },
    realOrder: function () {
      const realOrder = [].concat(this.orders)
      if (this.discountRatio !== 0) {
        const discountDish = {
          name: 'Rabbat:' + this.discountRatio.toFixed(2),
          code: '-1',
          realPrice: -(this.originTotal * this.discountRatio),
          count: 1,
          displayApply: []
        }
        realOrder.push(discountDish)
      }
      return realOrder
    }
  }
}
</script>

<style scoped>

</style>
