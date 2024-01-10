<template>
  <div>
    <div class="d-flex pa-3 pt-2 px-4 grey lighten-2">
      <div
          class="flex-grow-1 d-flex flex-shrink-1"
          style="width: 0;overflow-x: scroll"
          v-dragscroll
      >
        <v-card
            flat
            rounded="lg"
            :class="realConsumeTypeId===ct.id?'active':''"
            class="mr-2 pa-2 px-3 text-body-2 navigationPillItem"
            v-for="ct of consumeTypeList"
            :key="ct.id + 'consumeType'"
            @click="overrideConsumeTypeId = ct.id"
        >
          {{ ct.name }}
        </v-card>
      </div>

      <v-btn
          color="grey lighten-3 black--text"
          elevation="0"
          rounded
          @click="keyboardMode = !keyboardMode"
      >
        <template v-if="!keyboardMode">
          <v-icon>mdi-keyboard</v-icon>
        </template>
        <template v-else>
          <v-icon>mdi-menu</v-icon>
        </template>
      </v-btn>
    </div>
    <template v-if="!keyboardMode">
      <menu-order-fragment
          @dish-click="openDish"
          @dish-tune="openDishDetail"
          :categories="categories"
          :dishes="dishes"
      ></menu-order-fragment>
    </template>
    <template v-else>
      <keyboard-order-fragment
          @dish-add="openDish"
          :dishes="dishes"
      ></keyboard-order-fragment>
    </template>

  </div>
</template>

<script>
import MenuOrderFragment from '@/views/TablePage/OrderFragment/MenuOrderFragment.vue'
import { Remember } from '@/api/remember'
import { consumeTypeList, getConsumeTypeList } from '@/oldjs/common'
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
    consumeTypeId: {}
  },
  directives: {
    dragscroll
  },
  data: function () {
    return {
      keyboardMode: Remember.keyboardMode,
      consumeTypeList: [],
      overrideConsumeTypeId: null,
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
      console.log(code, count, 'here')
      this.$emit('dish-add', code, count, this.overrideConsumeTypeId)
    },
    openDishDetail (dish) {
      this.$emit('dish-detail', dish, this.overrideConsumeTypeId)
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
      await getConsumeTypeList()
      this.consumeTypeList = consumeTypeList
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
