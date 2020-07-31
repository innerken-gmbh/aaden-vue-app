<template>
    <v-card>
        <v-toolbar
                tile
                dense class="font-weight-bold"
                :color="color" dark>

            <slot name="after-title" :expand="expand">
                <span class="mr-1">{{title}}</span>
            </slot>
            <v-spacer/>
            <div class="d-flex align-center">
                <v-icon color="white">mdi-cash-usd</v-icon>
                <span class="ml-1">{{total | priceDisplay}}</span>
                <v-icon color="white" class="ml-6">mdi-food</v-icon>
                <span class="ml-1">{{count}}</span>
            </div>
            <v-btn icon dark @click="expand=!expand">
                <v-icon v-if="!expand">mdi-unfold-more-horizontal</v-icon>
                <v-icon v-else>mdi-unfold-less-horizontal</v-icon>
            </v-btn>
        </v-toolbar>

        <div v-dragscroll v-if="expand" class="orderDishList"
             :style="{maxHeight: `calc(100vh - 48px - ${extraHeight})`,overflow:'hidden'}"
        >
            <div>
                <template v-for="(order,index) in orders">
                    <div :key="'order'+title+order.tid+
                        'code'+index+'hash'+order.hash">
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
      type: String,
      default: ''
    },
    extraHeight: {
      type: String,
      default: '0px'
    },
    orders: {
      type: Array,
      default: () => []
    },
    clickCallback: {
      type: Function,
      default: () => {
      }
    },
    showNumber: {
      type: Boolean,
      default: false
    },
    defaultExpand: {
      type: Boolean,
      default: false
    },
    showEdit: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: '#367aeb'
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
    total: function () {
      let totalPrice = 0
      for (const a of this.orders) {
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
    }
  }
}
</script>

<style scoped>

</style>
