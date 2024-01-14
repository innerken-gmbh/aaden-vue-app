<template>
  <div style="height: calc(100vh - 64px)" >
    <template v-if="!keyboardMode">
      <menu-order-fragment
          @dish-click="openDish"
          @dish-tune="openDishDetail"
          :categories="categories"
          :dishes="dishes"
          @toggle="keyboardMode=true"
      ></menu-order-fragment>
    </template>
    <template v-else>
      <keyboard-order-fragment
          @toggle="keyboardMode=false"
          @dish-add="openDish"
          :dishes="dishes"
      ></keyboard-order-fragment>
    </template>

  </div>
</template>

<script>
import MenuOrderFragment from '@/views/TablePage/OrderFragment/MenuOrderFragment.vue'
import { Remember } from '@/api/remember'
import { dragscroll } from 'vue-dragscroll/src/main'
import KeyboardOrderFragment from '@/views/TablePage/OrderFragment/KeyboardOrderFragment.vue'
import { getCategoryListWithCache, processDishList } from '@/oldjs/StaticModel'
import { cartListFactory } from '@/views/TablePage/cart'

export default {
  name: 'MenuFragement',
  components: {
    KeyboardOrderFragment,
    MenuOrderFragment
  },
  props: {
    consumeTypeId: {},
    overrideConsumeTypeId: {}
  },
  directives: {
    dragscroll
  },
  data: function () {
    return {
      keyboardMode: Remember.keyboardMode === 'true',
      dishes: [],
      categories: []
    }
  },
  watch: {
    keyboardMode: function (val) {
      Remember.keyboardMode = val
    },
    realConsumeTypeId (val) {
      this.getCategory(val, true)
    }
  },
  mounted () {
    this.initial()
  },
  computed: {
    realConsumeTypeId () {
      return this.overrideConsumeTypeId ?? this.consumeTypeId ?? '1'
    }
  },
  methods: {
    openDish (code, count = 1) {
      this.$emit('dish-add', code, count)
    },
    openDishDetail (dish) {
      this.$emit('dish-detail', dish)
    },
    async getCategory (consumeTypeId = 1, force = false) {
      if (this.categories.length === 0 || force) {
        this.categories = await getCategoryListWithCache(consumeTypeId)
        this.dishes = processDishList(this.categories.reduce((arr, i) => {
          arr.push(...i.dishes)
          return arr
        }, []))
        cartListFactory.setDishList(this.dishes)
      }
    },
    async initial () {
      await this.getCategory(this.realConsumeTypeId)
    }
  }
}
</script>

<style scoped>
.navigationPillItem {
  background: rgba(0, 0, 0, 0.01);
  border-radius: 12px;
  display: flex;
  color: black;
  align-items: center;
  padding: 8px 16px;
}

.navigationPillItem.active {
  background: rgba(0, 0, 0, 0.08);
  font-weight: bold;
}

</style>
