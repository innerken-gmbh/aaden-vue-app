<template>
  <div>
    <v-card
        class="d-flex py-2 px-4"
        color="grey lighten-3"
        elevation="0"
    >
      <template>
        <v-item-group
            v-if="favoriteList"
            v-model="activeDCT"
            v-dragscroll
            mandatory
            style="
                      display: grid;
                      grid-gap: 8px;
                      grid-auto-columns: max-content;
                      grid-auto-flow: column;
                      overflow-x: scroll;
                    "
        >

          <v-item
              v-if="haveFavoriteItem"
              v-slot="{active,toggle}"
          >
            <v-card
                :color="active?'primary':'grey lighten-4'"
                :dark="active"
                :elevation="active?4:0"
                class="d-flex justify-center align-center px-6"
                height="48"
                style="border-radius: 12px;font-size: 18px"
                @click="toggle"
            >
              <v-icon
                  :color="active?'white':'primary'"
                  left
              >mdi-heart-circle
              </v-icon>
              Favorite
            </v-card>
          </v-item>
          <v-item
              v-for="ct of dct"
              v-bind:key="ct.id + 'categorytypes'"
              v-slot="{ active, toggle }"
          >
            <v-card
                :color="active ? 'primary' : 'grey lighten-4'"
                :dark="active"
                :elevation="active ? 4 : 0"
                class="d-flex justify-center align-center px-6"
                height="48"
                style="border-radius: 12px; font-size: 18px"
                @click="toggle"
            >{{ ct.name }}
            </v-card>
          </v-item>
        </v-item-group>
        <v-spacer></v-spacer>
      </template>
    </v-card>
    <v-card
        v-dragscroll
        class="dragscroll dishCardListContainer flex-grow-1 px-4"
        color="transparent"
        elevation="0"
        style="position: relative"
    >
      <div
          v-if="!activeCategoryId"
          class="mt-2"
      >
        <v-item-group class="dishCardList">
          <template v-for="category of filteredC">
            <v-item
                v-bind:key="'categorytypes' + category.id"
                v-slot="{ toggle }"
            >
              <v-card
                  :color="category.color ? category.color : 'white'"
                  class="d-flex text-h6 align-center justify-center text-center pa-2"
                  elevation="0"
                  style="
                            position: relative;
                            width: 100%;
                            height: 124px;

                            display: -webkit-box;
                            word-break: break-all;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            border-radius: 12px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                          "
                  @click="changeCategory(category.id, toggle)"
              >
                {{ category.name }}
              </v-card>
            </v-item>
          </template>
        </v-item-group>
      </div>
      <template v-if="activeCategoryId">
        <div
            style="
                      display: grid;
                      grid-template-columns: 1fr 108px;
                      grid-gap: 24px;
                    "
        >
          <div class="dishCardList mt-2">
            <v-card
                v-if="!haveFavoriteItem||activeDCT!==0"
                class="d-flex align-center"
                elevation="0"
                style="
                          width: 100%;
                          color: var(--v-primary-base);
                          height: 124px;
                          border-radius: 12px;
                        "
                @click="activeCategoryId = null"
            >
              <div
                  class="d-flex flex-column justify-center align-center"
                  style="width: 100%"
              >
                <v-icon
                    color="primary"
                    large
                >mdi-arrow-left
                </v-icon>
                <div class="mt-1 text-body-2">{{ $t('return') }}</div>
              </div>
            </v-card>
            <template v-for="dish of filteredDish">
              <dish-block
                  :key="'dish' + dish.code"
                  v-ripple
                  :code="dish.code"
                  :count="dish.count"
                  :dish-name="dish.dishName"
                  :display-color="dish.displayColor"
                  :foreground="dish.foreground"
                  :have-mod="dish.haveMod"
                  :is-free="dish.isFree"
                  :price="dish.price"
                  @click="orderOneDish(dish.code)"
                  @click-tune="tuneDish(dish)"
              />
            </template>
          </div>
        </div>
        <div
            v-dragscroll
            style="
                      width: 108px;
                      height: calc(100vh - 192px);
                      overflow: hidden;
                      position: fixed;
                      right: 12px;
                      top: 132px;
                    "
        >
          <v-item-group
              style="
                        display: grid;
                        grid-auto-columns: 108px;
                        grid-auto-rows: 48px;
                        grid-auto-flow: row;
                        grid-gap: 4px;
                      "
          >
            <template v-for="category of filteredC">
              <v-item
                  v-bind:key="'categorytypes' + category.id"
                  v-slot="{ active, toggle }"
              >
                <v-card
                    :color="
                              activeCategoryId === category.id
                                ? 'primary'
                                : 'white'
                            "
                    :dark="activeCategoryId === category.id"
                    class="d-flex align-center justify-center text-center pa-2"
                    elevation="0"
                    style="
                              position: relative;
                              width: 100%;
                              height: 48px;
                              font-size: 16px;
                              white-space: nowrap;
                              border-radius: 12px;
                              overflow: hidden;
                              text-overflow: ellipsis;
                            "
                    @click="changeCategory(category.id, toggle)"
                >
                  <div
                      style="
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                              "
                  >
                    {{ category.name }}
                  </div>

                  <div
                      :style="{ background: category.color }"
                      style="
                                position: absolute;
                                width: 40%;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                margin: auto;
                                height: 6px;
                                border-radius: 3px;
                              "
                  ></div>
                </v-card>
              </v-item>
            </template>
          </v-item-group>
        </div>
      </template>
      <div style="width: 100%; height: 160px"></div>
    </v-card>
  </div>

</template>

<script>
import DishBlock from '@/views/TablePage/Dish/DishBlock.vue'
import { dragscroll } from 'vue-dragscroll/src/main'
import { getCategoryTypeList } from '@/api/aaden-base-model/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

const filterCache = {}
export default {
  name: 'MenuOrderFragment',
  components: { DishBlock },
  data: function () {
    return {
      activeCategoryId: null,
      favoriteList: null,
      dct: [],
      filteredDish: [],
      activeDCT: 0
    }
  },
  props: {
    categories: {},
    dishes: {}
  },
  directives: {
    dragscroll
  },
  computed: {
    haveFavoriteItem () {
      return this.favoriteList?.length > 0
    },
    filteredC: function () {
      return this.categories.filter((item) => {
        const dct = this.dct?.[this.haveFavoriteItem ? (this.activeDCT - 1) : this.activeDCT]
        return parseInt(item.dishesCategoryTypeId) === parseInt(dct?.id)
      })
    }
  },
  async mounted () {
    await this.initial()
  },
  watch: {
    activeDCT: function (val) {
      if (val === 0 && this.haveFavoriteItem) {
        this.activeCategoryId = -10
      } else {
        this.keyboardInput = ''
        this.activeCategoryId = null
      }
      this.updateFilteredDish()
    },
    dishes: function () {
      this.reloadDish()
    },
    activeCategoryId: function (val) {
      this.updateFilteredDish()
    }
  },
  methods: {
    async initial () {
      await this.getDCT()
      await this.reloadDish(1, true)
    },
    async getDCT () {
      if (this.dct.length === 0) {
        this.dct = (await getCategoryTypeList())
          .sort((a, b) => {
            const rank = GlobalConfig.defaultSort.split(',')
            const idToRank = (id) => {
              const index = rank.indexOf(id.toString())
              return 10 - (index === -1 ? 10 : index)
            }
            const [ra, rb] = [a.id, b.id].map(idToRank)
            return ra > rb ? -1 : 1
          })
          .filter(
            (i) => typeof i.childCount === 'undefined' || i.childCount > 0
          )
      }
    },
    updateActiveDCT (index) {
      this.activeDCT = null
      this.$nextTick(() => {
        this.activeDCT = index
      })
    },
    async reloadDish (consumeTypeId, force = false) {
      this.favoriteList = this.dishes.filter(item => item.isFavorite === '1')
      this.activeCategoryId = null
      this.updateActiveDCT(0)
    },
    changeCategory (id, toggle) {
      this.activeCategoryId = id
      if (toggle) {
        toggle()
      }
    },
    updateFilteredDish () {
      if (this.activeCategoryId) {
        this.filteredDish = this.filterDish()
      }
    },
    orderOneDish (code) {
      this.$emit('dish-click', code)
    },
    tuneDish (dish) {
      this.$emit('dish-tune', dish)
    },
    filterDish () {
      const list = this.dishes
      if (this.haveFavoriteItem && this.activeDCT === 0) {
        return list.filter(item => item.isFavorite === '1')
      }
      if (!filterCache[this.activeCategoryId]) {
        filterCache[this.activeCategoryId] = list.filter((item) => {
          return parseInt(item.categoryId) === parseInt(this.activeCategoryId)
        })
      }
      return filterCache[this.activeCategoryId]
    }
  }
}
</script>

<style scoped>
.dishCardList {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 12px;
  margin-bottom: 120px;
  width: 100%;
}

.dragscroll {
  overflow-x: hidden;
}

.dishCardListContainer {
  width: 100%;
  height: 100%;
}

</style>
