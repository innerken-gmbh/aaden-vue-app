<template>
  <v-card
      class="d-flex flex-column flex-grow-1"
      color="transparent"
      elevation="0"
      style="height: calc(100vh - 64px)"
  >
    <div class="pa-4 pb-3 text-h5 d-flex align-center font-weight-black grey lighten-4">
      {{ title }}
      <div>({{ dishLength }})</div>
      <v-spacer></v-spacer>
      <slot name="action"></slot>
      <v-btn
          :class="onlyPaid === '1' ? 'grey lighten-4' : ''"
          icon
          @click="editFreeDishDisplay"
      >
        <v-icon>{{ onlyPaid === '1' ? 'mdi-filter-check' : 'mdi-filter-off' }}</v-icon>
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
          <div
              v-if="promoLayout.headers[index]"
              :key="'promo' + title + promoLayout.headers[index].key"
              :class="promoLayout.headers[index].plain ? 'grey lighten-3' : 'orange lighten-5'"
              class="mt-2 px-2 py-1 rounded text-body-2 d-flex align-center"
          >
            <v-icon
                v-if="!promoLayout.headers[index].plain"
                class="mr-1"
                small
            >mdi-tag
            </v-icon>
            <span class="flex-grow-1 font-weight-bold text-truncate">{{ promoLayout.headers[index].label }}</span>
            <span
                v-if="promoLayout.headers[index].saved > 0"
                class="text-no-wrap"
            >{{ $t('PosPromoSaved') }} {{ promoLayout.headers[index].saved | priceDisplay }}</span>
          </div>
          <dish-card
              :key="'order' + title + (order.promoRowKey || order.identity)"
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
import i18n from '@/i18n'
import IKUtils from 'innerken-js-utils'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { sumBy } from 'lodash'
import { groupSaved, originallyFree, promoGroupOf } from '@/views/TablePage/posPromo'

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
      currentSourceMark: null
    }
  },
  watch: {
    currentSourceMark (val) {
      this.$emit('removeAllFromSplit')
      const currentSliceDish = IKUtils.deepCopy(this.sliceDishBySourceMarks)
      if (val > -1) {
        for (const item of currentSliceDish) {
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
    defaultExpand: function (val) {
      this.expand = val
    }
  },
  methods: {
    /**
     * 「隐藏免费菜」藏不藏这一行：原来实收为 0 的照旧藏；收银台活动的行（带 promotionKey 的赠品、被活动减到 0 元的行，
     * 离线补交的赠品 / 换购）只要原价不是 0 就照常显示，这是客人拿到的优惠（POS-1106）
     */
    paidOrPromo (it) {
      return it.realPrice !== 0 || (!!(it.promotionKey || it.promotionRowKind) && !originallyFree(it))
    },
    editFreeDishDisplay () {
      GlobalConfig.showFreeDish = this.onlyPaid === '0' ? '1' : '0'
    },
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
    onlyPaid () {
      return GlobalConfig.showFreeDish
    },
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
            (this.onlyPaid === '1' || this.paidOrPromo(it))
        )
      })
      if (this.reverse) {
        list.reverse()
      }
      return list
    },
    /**
     * 收银台活动（POS-1106）：同一个活动的行排在一起，第一行前面显示活动名和省了多少（购物车的算好价的行、已下的单都认）。
     * 没有活动的行位置不变，没有活动时整个列表不变
     */
    promoLayout: function () {
      const list = [...this.dishListModel.list].filter((it) => {
        return (
          (this.activeSourceMark === '' || it.sourceMark !== this.activeSourceMark) &&
            (this.onlyPaid === '1' || this.paidOrPromo(it))
        )
      })
      if (this.reverse) {
        list.reverse()
      }
      const groups = {}
      const slots = []
      list.forEach(it => {
        const g = promoGroupOf(it)
        if (!g) {
          slots.push({ row: it })
        } else if (groups[g.key]) {
          groups[g.key].rows.push(it)
        } else {
          groups[g.key] = { key: g.key, label: g.label, rows: [it] }
          slots.push({ group: groups[g.key] })
        }
      })
      const out = []
      const headers = {}
      slots.forEach((slot, i) => {
        if (slot.row) {
          // 没活动的行紧跟在活动组后面：加一条同级的小标题隔开，不然看起来像同一组（POS-1133）
          if (slots[i - 1]?.group) {
            headers[out.length] = { key: 'plain' + out.length, label: i18n.t('PosPromoNoPromotion'), saved: 0, plain: true }
          }
          out.push(slot.row)
        } else {
          headers[out.length] = { key: slot.group.key, label: slot.group.label, saved: groupSaved(slot.group.rows) }
          out.push(...slot.group.rows)
        }
      })
      return { list: out, headers }
    },
    dishList: function () {
      return this.promoLayout.list
    },
    dishLength () {
      return sumBy(this.dishList, 'count')
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
