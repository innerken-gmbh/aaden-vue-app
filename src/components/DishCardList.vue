<template>
  <v-card>
    <v-toolbar
        dense
        tile
        class="font-weight-bold"
        :color="color" dark>
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
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
        <div @click="checkIfOpen(index)" :key="'order'+title+order.identity">
          <dish-card
              :expand="index===expandIndex"
              :color="color"
              :show-number="showNumber"
              :click-callback="()=>_clickCallBack(index,order)"
              :show-edit="showEdit"
              :dish="order"/>
        </div>
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
    resetCurrentExpandIndex: {
      default: false
    },
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
      expand: this.defaultExpand,
      expandIndex: null
    }
  },
  watch: {
    dishList: function () {
      this.resetExpandIndex()
    },
    expandIndex: function (val) {
      if (val == null) {
        if (this.dishList.length > 0) {
          if (this.resetCurrentExpandIndex) {
            this.resetExpandIndex()
          }
        }
      } else {
        const currentDish = this.dishList[val] ?? null
        this.$emit('current-dish-change', currentDish)
      }
    },
    defaultExpand: function (val) {
      this.expand = val
    }
  },
  methods: {
    resetExpandIndex () {
      this.expandIndex = this.resetCurrentExpandIndex ? this.dishList.length - 1 : null
    },
    _clickCallBack (index, dish) {
      if (dish.count === 0) {
        this.expandIndex = null
      }
      this.clickCallback(index)
    },
    checkIfOpen (index) {
      const dish = this.dishListModel.list[index]
      if (this.showEdit || dish.count > 1) {
        if (this.expandIndex === index) {
          this.expandIndex = null
        } else {
          this.expandIndex = index
        }
      } else {
        this.clickCallback(index)
        this.expandIndex = null
      }
    }
  },
  computed: {
    dishList: function () {
      return this.dishListModel.list
    },
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
  background: url("/Resource/点餐/菜菜单窗口的拖拽键@2x.png") top / contain no-repeat;
  width: 6px;
  cursor: pointer;
  height: 56px;

}

::-webkit-scrollbar-track {
  width: 10px;
}
</style>
