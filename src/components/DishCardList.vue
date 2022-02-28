<template>
  <v-card shaped elevation="0" class="d-flex flex-column flex-grow-1 " style="max-height:calc(100% - 60px)">
    <div class="d-flex align-center pt-2 px-2">
      <h2 class="pa-2"> {{ title }}</h2>
      <v-spacer></v-spacer>
      <slot name="action">
        <v-btn v-if="discountDish" @click="$emit('discount-clear')"
               elevation="0" color="warning">
          <v-icon left>
            mdi-sale
          </v-icon>
          {{ discountDish.realPrice | priceDisplay }}
        </v-btn>
      </slot>
    </div>
    <v-divider></v-divider>
    <div v-dragscroll v-show="expand"
         class="px-2"
         style="overflow-y: scroll"
    >
      <template v-for="(order,index) in dishList">
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
    <v-spacer></v-spacer>
    <v-card elevation="0">
      <v-divider></v-divider>
      <div class="d-flex pa-2 px-4 align-baseline">

        <v-icon>mdi-food</v-icon>
        <span class="ml-1">{{ count }}</span>
        <v-spacer></v-spacer>
        <v-icon class="mr-2" size="28">mdi-cash-usd</v-icon>
        <span class="ml-1 text-h4 grey--text text--darken-2">{{ total | priceDisplay }}</span>
      </div>
      <div class="pa-2">
        <slot></slot>
      </div>

    </v-card>

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
    reverse: {
      default: false
    },
    defaultExpand: {},
    showEdit: {},
    color: {
      default: 'white'
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
    expandIndex: {
      handler: function (val) {
        if (val == null) {
          if (this.dishList.length > 0) {
            if (this.resetCurrentExpandIndex) {
              this.resetExpandIndex()
            }
          }
        }
      },
      immediate: true
    },
    defaultExpand: function (val) {
      this.expand = val
    }
  },
  methods: {
    resetExpandIndex () {
      this.expandIndex = this.resetCurrentExpandIndex ? (this.reverse ? 0 : this.dishList.length - 1) : null
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
      const list = [...this.dishListModel.list]
      if (this.reverse) {
        list.reverse()
      }

      return list
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
    },
    currentDish: function () {
      const currentDish = this.dishList[this.expandIndex] ?? null
      this.$emit('current-dish-change', currentDish)
      return currentDish
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
