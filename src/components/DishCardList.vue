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
    dishListModel: {
      default: () => ({
        list: [],
        total: () => 0,
        count: () => 0
      })
    },
    title: {
      default: ''
    },
    extraHeight: {
      default: '0px'
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
      return this.dishListModel.list.length > 0 ? this.dishListModel.total() : 0
    },
    total: function () {
      return this.originTotal + (this.discountDish?.realPrice ?? 0)
    },
    count: function () {
      return this.dishListModel.list.length > 0 ? this.dishListModel.count() : 0
    },
    discountDish: function () {
      if (this.discountRatio !== 0) {
        return {
          name: 'Rabbat:' + this.discountRatio.toFixed(2),
          code: '-1',
          realPrice: -(this.originTotal * this.discountRatio),
          count: 1,
          displayApply: []
        }
      }
      return undefined
    },
    realOrder: function () {
      const realOrder = [].concat(this.dishListModel.list)
      if (this.discountDish) {
        realOrder.push(this.discountDish)
      }
      return realOrder
    }
  }
}
</script>

<style scoped>

</style>
