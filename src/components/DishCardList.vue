<template>
  <v-card>
    <v-toolbar
       @click="expand=!expand"
        dense
        tile
        class="font-weight-bold"
        :color="color" dark>
      <v-app-bar-nav-icon><v-icon>{{ title }}</v-icon></v-app-bar-nav-icon>
      <v-spacer/>
      <div class="d-flex align-center">
        <v-icon color="white">mdi-cash-usd</v-icon>
        <span class="ml-1">{{ total | priceDisplay }}</span>
        <v-icon color="white" class="ml-3">mdi-food</v-icon>
        <span class="ml-1">{{ count }}</span>
      </div>
    </v-toolbar>

    <div v-dragscroll v-show="expand" class="orderDishList"
         :style="{maxHeight: `calc(100vh - 48px - ${extraHeight})`}"
         style="overflow-y: scroll"
    >

      <template v-for="(order,index) in dishListModel.list">
        <dish-card :key="'order'+title+order.identity"
                   :color="color"
                   :show-number="showNumber"
                   :click-callback="()=>clickCallback(index)"
                   :show-edit="showEdit"
                   :dish="order"/>
      </template>
      <template v-if="discountDish!=null">
        <dish-card
            :color="color"
            :show-number="showNumber"
            :show-edit="showEdit"
            :dish="discountDish"/>
      </template>

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
    clickCallback: {},
    showNumber: {},
    discountRatio: {
      default: 0
    },
    defaultExpand: {},
    showEdit: {},
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
      return null
    },
    realOrder: function () {
      if (this.discountDish) {
        return this.dishListModel.list.concat([this.discountDish])
      }
      return this.dishListModel.list
    }
  }
}
</script>

<style scoped>
  ::-webkit-scrollbar {
    height: 80%;
    margin-top: 20%;
    width: 6px;
  }

  ::-webkit-scrollbar-thumb {
    background: url("/Resources/点餐/菜菜单窗口的拖拽键@2x.png") top / contain no-repeat;
    width: 6px;
    cursor: pointer;
    height: 56px;

  }

  ::-webkit-scrollbar-track {
    width: 10px;
  }
</style>
