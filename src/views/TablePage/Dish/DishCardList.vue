<template>
  <v-card
      class="d-flex flex-column flex-grow-1"
      color="transparent"
      elevation="0"
      style="height: calc(100vh - 64px)"
  >
    <div class="pa-4 pb-3 text-h5 d-flex align-center font-weight-black grey lighten-4">
      {{ title }}
      <v-spacer></v-spacer>
      <slot name="action"></slot>
      <v-btn
          :class="onlyPaid ? 'grey lighten-4' : ''"
          icon
          @click="onlyPaid = !onlyPaid"
      >
        <v-icon>{{ onlyPaid ? 'mdi-filter-check' : 'mdi-filter-off' }}</v-icon>
      </v-btn>
    </div>

    <div v-if="shouldDisplaySourceMarks">
      <div
          class="pa-2 d-flex"
          style="max-width: 100%"
      >
        <v-chip-group
            v-model="currentSourceMark"
            active-class="primary--text"
        >
          <v-chip
            v-for="mark in sourceMarks"
              :key="mark"
              filter
          >
            {{ mark == null ? $t('Other') : mark }}
          </v-chip>
        </v-chip-group>
      </div>
      <v-divider></v-divider>
    </div>

    <template v-if="dishList.length > 0">
      <div
          v-show="expand"
          v-dragscroll
          class="px-3"
          style="overflow-y: scroll"
      >

        <template v-for="(order, index) in dishList">
          <dish-card
              :key="'order' + title + order.identity"
              :click-callback="() => _clickCallBack(index, order)"
              :dish="order"
              :expand="index === expandIndex"
              :show-edit="showEdit"
              :show-number="showNumber"
              style="font-size: larger"
              @click="checkIfOpen(index)"
          />
        </template>
        <template v-if="discountDish != null">
          <dish-card
              :dish="discountDish"
              :show-edit="showEdit"
              :show-number="showNumber"
          />
        </template>

      </div>
      <v-spacer></v-spacer>
    </template>
    <template v-else>
      <div class="flex-grow-1 d-flex flex-column justify-center align-center text-center pa-8">
        <v-icon large>mdi-format-list-bulleted</v-icon>
        <div class="mt-4">{{ $t('NoProductsInList') }}</div>
      </div>
    </template>

    <div>
      <slot v-bind:total="total"></slot>
    </div>
  </v-card>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import DishCard from './DishCard'
import { Remember } from '@/api/remember'
import i18n from '@/i18n'

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
    sourceMarks: {
      default: () => []
    }
  },
  data: function () {
    return {
      expand: this.defaultExpand,
      expandIndex: null,
      currentSourceMark: null,
      onlyPaid: !Remember.showFreeDish
    }
  },
  watch: {
    currentSourceMark (val) {
      this.$emit('removeAllFromSplit')
      if (val > -1) {
        for (const item of this.sliceDishBySourceMarks) {
          for (let i = 0; i < item.count; i++) {
            this.clickCallback(item)
          }
        }
      }
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
    onlyPaid (val) {
      Remember.showFreeDish = val
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
      this.clickCallback(dish)
    },
    checkIfOpen (index) {
      const dish = this.dishList[index]
      if (this.showEdit || dish.count > 1) {
        if (this.expandIndex === index) {
          this.expandIndex = null
        } else {
          this.expandIndex = index
        }
      } else {
        this.clickCallback(dish)
        this.expandIndex = null
      }
    }
  },
  computed: {
    activeSourceMark () {
      return this.currentSourceMark === null || typeof this.currentSourceMark === 'undefined'
        ? ''
        : this.sourceMarks[this.currentSourceMark]
    },
    shouldDisplaySourceMarks: function () {
      return this.sourceMarks.length > 1
    },
    sliceDishBySourceMarks () {
      const list = [...this.dishListModel.list].filter((it) => {
        return (
          (this.activeSourceMark === '' || it.sourceMark === this.activeSourceMark) &&
          (!this.onlyPaid || it.realPrice !== 0)
        )
      })
      if (this.reverse) {
        list.reverse()
      }
      return list
    },
    dishList: function () {
      const list = [...this.dishListModel.list].filter((it) => {
        return (
          (this.activeSourceMark === '' || it.sourceMark !== this.activeSourceMark) &&
            (!this.onlyPaid || it.realPrice !== 0)
        )
      })
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
          name: i18n.t('Discount') + ': ' + this.discountRatio.toFixed(2),
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
  },
  activated () {
    this.currentSourceMark = null
    this.resetExpandIndex()
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
