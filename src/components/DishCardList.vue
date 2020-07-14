<template>
    <div v-if="count>0">
        <v-card class="d-flex py-2 justify-space-between"
                :color="color" style="color: white">
            <div class="d-flex flex-grow-1 justify-space-between dishListTitle">
                <div class="d-flex">
                    <slot name="after-title" :expand="expand"><span class="mr-1">{{title}}</span></slot>
                </div>
                <div class="d-flex">
                    <div class="d-flex align-center">
                        <v-icon color="white">mdi-cash-usd</v-icon>
                        <span class="ml-1">{{total | priceDisplay}}</span>
                        <v-icon color="white" class="ml-6">mdi-food</v-icon>
                        <span class="ml-1">{{count}}</span>
                    </div>
                </div>
            </div>
            <div class="pr-1 d-flex align-center">
                <v-btn color="white" @click="expand=!expand" text x-small>
                    <v-icon v-if="!expand">mdi-unfold-more-horizontal</v-icon>
                    <v-icon v-else>mdi-unfold-less-horizontal</v-icon>
                </v-btn>
            </div>
        </v-card>
        <transition name="fade">
            <div v-dragscroll v-if="expand" class="orderDishList"
                 style="max-height: calc(100vh - 88px);overflow: hidden">
                <div>
                    <template v-for="(order,index) in orders">
                        <div :key="'order'+title+order.tid+
                        'code'+index+'hash'+order.hash">
                            <dish-card
                                    :color="color"
                                    :click-callback="()=>clickCallback(index)"
                                    :show-edit="showEdit"
                                    :dish="order"/>
                        </div>
                    </template>
                </div>
            </div>
        </transition>
    </div>

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
    orders: {
      type: Array,
      default: () => []
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
    .dishListTitle {
        font-weight: bold;
        padding: 12px 12px;
    }
</style>
