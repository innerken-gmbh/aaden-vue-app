<template>
  <div
      class="d-flex flex-column"
      style="height: calc(100vh - 64px)"
  >
    <v-card
        rounded="lg"
        class="d-flex py-2 px-4 align-center"
        color="grey lighten-3"
        elevation="0"
    >
      <template v-if="!loading">
        <v-card
            v-for="ct of displayDCT"
            :key="ct.id + 'categorytypes'"
            :color="activeDCT===ct.id ? 'primary' : 'grey lighten-4'"
            :dark="activeDCT===ct.id"
            :elevation="activeDCT===ct.id ? 4 : 0"
            :class="activeDCT===ct.id?'font-weight-black':''"
            class="d-flex justify-center align-center px-6 mr-2"
            height="48"
            style="border-radius: 12px; font-size: 18px"
            @click="activeDCT=ct.id"
        >{{ ct.name }}
        </v-card>

        <v-spacer></v-spacer>
        <v-btn
            @click="$emit('toggle')"
            color="grey lighten-4 black--text"
            elevation="0"
            rounded
        >
          <v-icon>mdi-keyboard</v-icon>
        </v-btn>
      </template>
      <template v-else>
        <v-progress-circular indeterminate></v-progress-circular>
      </template>
    </v-card>
    <v-card
        v-dragscroll
        height="0"
        class="dragscroll dishCardListContainer flex-grow-1 px-4"
        color="transparent"
        elevation="0"
        style="position: relative"
    >
      <div
          v-if="!activeCategoryId&&activeDCT!==0"
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
                  class="d-flex text-body-1 text-capitalize pa-4"
                  elevation="0"
                  :style="{fontSize:category.name.length>20?'1rem !important':'1.2rem !important'}"
                  style="
                            position: relative;
                            width: 100%;
                            height: 96px;
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
      <template v-else>
        <div
            style="
                      display: grid;
                      grid-template-columns: 1fr 108px;
                      grid-gap: 24px;
                    "
        >
          <div class="dishCardList mt-2">
            <v-card
                v-if="activeDCT!==0"
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
                      height: calc(100vh - 148px);
                      overflow: hidden;
                      position: fixed;
                      right: 342px;
                      top: 148px;
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
                  v-slot="{ toggle }"
              >
                <v-card
                    :color="category.color"
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
                      class="text-no-wrap text-capitalize text-body-2 text-truncate"
                  >
                    {{ category.name }}
                  </div>

                  <div
                      v-if="activeCategoryId === category.id"
                      :style="{ background: '#000000' }"
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
    <v-overlay
        :retain-focus="false"
        :value="keyboardInput||showFeedBack"

    >
      <v-card
          light
          max-width="500px"
      >

        <template v-if="!keyboardInput&&showFeedBack">
          <div class="pa-4 white--text" style="width: 400px" :class="feedback.startsWith('❌')?'yellow darken-4':'green'">
            {{ feedback }}
          </div>
        </template>
        <template v-else>
          <div class="pa-4 d-flex align-center grey lighten-3">
            <v-icon
                left
                size="36"
                class="mt-1 mr-4"
            >mdi-magnify
            </v-icon>
            <div class="text-h4 font-weight-black">
              {{ keyboardInput }}
            </div>

          </div>
          <div
              v-if="searchDish.length > 0"
              class="flex-shrink-1"
              style="overflow: hidden"
          >
            <v-card
                class="px-4 py-3"
                color="grey lighten-4"
                elevation="0"
                tile
            >
              {{ $t('SearchResult') }}
            </v-card>
            <!--                  需要监听键盘的地方-->
            <div
                v-dragscroll
                style="height: 85vh;overflow-y: scroll"
            >
              <template v-for="(dish, index) in searchDish">
                <v-card
                    :key="dish.id"
                    :class="index === 0 ? 'first' : ''"
                    :style="{
                        backgroundColor: '' + dish.displayColor,
                        color: '' + dish.foreground,
                      }"
                    class="d-flex px-4 py-1 align-start"
                    elevation="0"
                    style="
                        width: 100%;
                        border-bottom: 2px dashed #e2e3e5;
                        font-size: x-large;
                      "
                    tile
                    @click="searchDishClick(dish.code)"
                >
                  <div class="name mr-2">
                        <span>{{ dish.code }}.</span
                        >{{ dish.dishName }}
                  </div>
                  <v-spacer></v-spacer>
                  <div
                      v-if="dish.isFree === '1'"
                      class="price d-flex align-center green lighten-3 white--text"
                      style="padding: 2px 4px; border-radius: 4px"
                  >
                    {{ $t('Free') }}
                  </div>
                  <div
                      v-else
                      class="price d-flex align-center text-no-wrap text-truncate"
                  >
                    {{ dish.price | priceDisplay }}
                  </div>
                </v-card>
              </template>
            </div>

          </div>
          <div
              v-else
              class="d-flex align-center justify-center pa-16"
              style="height: 100%; width: 100%"
          >
            <div class="d-flex flex-column align-center">
              <div>
                <v-icon
                    color="grey lighten-1"
                    size="32"
                >mdi-keyboard
                </v-icon>
              </div>
              <div class="text--disabled text-body-2 mt-4">
                {{ $t('PleaseUseKeyboardOrType') }}
              </div>
            </div>
          </div>
        </template>

      </v-card>

    </v-overlay>
  </div>

</template>

<script>
import DishBlock from '@/views/TablePage/Dish/DishBlock.vue'
import { dragscroll } from 'vue-dragscroll/src/main'
import { getCategoryTypeList } from '@/api/aaden-base-model/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import Swal from 'sweetalert2'
import { debounce } from 'lodash-es'
import { findDish } from '@/oldjs/StaticModel'
import { showTimedAlert } from '@/oldjs/common'

export default {
  name: 'MenuOrderFragment',
  components: { DishBlock },
  data: function () {
    return {
      activeCategoryId: null,
      dct: [],
      activeDCT: 0,
      loading: true,

      searchDish: [],
      showFeedBack: false,
      feedback: '',
      keyboardInput: '',
      Config: GlobalConfig,
      currentCodeBuffer: ''
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
    displayDCT () {
      const res = []
      if (this.haveFavoriteItem) {
        res.push({
          id: 0,
          name: 'Favorite'
        })
      }
      return [...res, ...this.dct]
    },
    haveFavoriteItem () {
      return this.favoriteList?.length > 0
    },
    favoriteList () {
      return this.dishes.filter(item => item.isFavorite === '1')
    },
    filteredC: function () {
      return this.categories.filter((item) => {
        return parseInt(item.dishesCategoryTypeId) === parseInt(this.activeDCT)
      })
    },
    filteredDish () {
      const list = this.dishes
      if (this.activeDCT === 0) {
        return list.filter(item => item.isFavorite === '1')
      }

      return list.filter((item) => {
        return parseInt(item.categoryId) === parseInt(this.activeCategoryId)
      })
    }
  },
  async activated () {
    await this.initial()
  },
  async mounted () {
    await this.initial()
  },
  watch: {
    keyboardInput: function () {
      if (this.keyboardInput) {
        this.currentCodeBuffer = ''
      }
      this.debounce(this.updateSearchDish)
    },
    activeDCT: function () {
      this.keyboardInput = ''
      this.activeCategoryId = null
    },
    dishes: function () {
      this.reloadDish()
    }
  },
  methods: {
    async initial () {
      this.loading = true
      window.onkeydown = this.listenKeyDown
      await this.getDCT()
      await this.reloadDish()
      this.keyboardInput = ''
      this.currentCodeBuffer = ''
      this.searchDish = []
      this.$nextTick(() => {
        this.loading = false
      })
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
    async reloadDish () {
      this.activeCategoryId = null
      this.activeDCT = this.displayDCT[0]?.id ?? -10
    },
    changeCategory (id, toggle) {
      this.activeCategoryId = id
      if (toggle) {
        toggle()
      }
    },
    orderOneDish (code) {
      this.$emit('dish-click', code)
    },
    tuneDish (dish) {
      this.$emit('dish-tune', dish)
    },
    listenKeyDown (e) {
      if (Swal.isVisible()) {
        return
      }
      switch (e.key) {
        case 'Backspace':
          if (GlobalConfig.deleteOneKeys === '1') {
            this.keyboardInput = this.keyboardInput.slice(0, this.keyboardInput.length - 1)
          } else {
            this.keyboardInput = ''
          }
          break
        case 'Escape':
          this.keyboardInput = ''
          break
        case 'Enter':
          this.submit(this.keyboardInput)
          break
        default:
          if (e.target.nodeName === 'BODY') {
            this.keyboardInput += e.key
          }
      }
    },
    resetInputAndBuffer () {
      this.currentCodeBuffer = ''
      this.keyboardInput = ''
      this.updateSearchDish()
    },
    getCodeAndCountFromInput (string = '') {
      let [code, count] = ['', 1]
      if (string.includes('*')) {
        [code, count] = string.split('*')
        if (GlobalConfig.numberFirst) {
          [code, count] = [count, code]
        }
        count = parseInt(count)
      } else {
        code = string
      }
      return [code, count]
    },
    debounce: debounce(
      (f) => {
        f()
      },
      200,
      { trailing: true }
    ),
    async searchDishClick (code) {
      this.currentCodeBuffer = code
      this.$emit('dish-add', code)
      this.keyboardInput = ''
    },
    updateSearchDish () {
      if (this.keyboardInput || this.currentCodeBuffer) {
        this.searchDish = this.searchDishes()
      } else {
        this.searchDish = []
      }
    },
    displayFeedback (second = 3) {
      this.showFeedBack = true
      setTimeout(() => {
        this.showFeedBack = false
      }, second * 1000)
    },
    searchDishes () {
      const list = this.dishes
      const searchWord = this.currentCodeBuffer || this.keyboardInput
      const codeOnly = !!this.currentCodeBuffer
      console.log(searchWord, 'searchWord')
      if (searchWord) {
        if (searchWord !== '' && !searchWord.includes('/')) {
          const [code] = this.getCodeAndCountFromInput(searchWord)
          const result = []
          const exactMatch = findDish(code)
          if (exactMatch) {
            exactMatch.rank = -999 + exactMatch.code.length
            result.push(exactMatch)
          }
          if (!codeOnly) {
            for (const d of list) {
              if (
                d.code.toLowerCase().startsWith(code.toLowerCase()) &&
                  d.code !== code
              ) {
                d.rank = 999 + d.code.length
                result.push(d)
              } else if (
                d.dishName.toLowerCase().startsWith(code.toLowerCase())
              ) {
                d.rank = d.dishName.length
                result.push(d)
              }
              if (result.length > 20) {
                break
              }
            }
            if (GlobalConfig.searchIncludesCode === '1' && result.length < 20) {
              for (const d of list) {
                if (!d.code.toLowerCase().startsWith(code.toLowerCase()) && d.code !== code && d.code.toLowerCase().includes(code.toLowerCase())) {
                  d.rank = 99999 + d.code.length
                  result.push(d)
                } else if (
                  !d.dishName.toLowerCase().startsWith(code.toLowerCase()) && d.dishName.toLowerCase().includes(code.toLowerCase())
                ) {
                  d.rank = 99999 + d.dishName.length
                  result.push(d)
                }
                if (result.length > 20) {
                  break
                }
              }
            }
          }
          return result.sort((a, b) => {
            if (a.rank > b.rank) {
              return 1
            } else if (a.rank === b.rank) {
              return 0
            } else {
              return -1
            }
          })
        }
      }
      return []
    },
    async submit () {
      const t = this.keyboardInput
      const submit = (code, count = 1) => {
        const dish = findDish(code)
        if (code === '') {
          this.$emit('order-add')
        }
        if (!dish) {
          this.feedback = '❌' + this.$t('DishNumberNotFound', { n: code })
        } else {
          this.$emit('dish-add', code, count)
          this.feedback = '✔'
        }
      }
      if (t.indexOf('*') !== -1) {
        let [code, count] = this.getCodeAndCountFromInput(t)
        count = parseInt(count)
        if (count < 1) {
          this.feedback = '❌' + this.$t('CanNotAddNegativeDishes')
          showTimedAlert('warning', this.$t('JSTableCodeNotFound'), 500)
        } else {
          submit(code, count)
        }
      } else {
        submit(t)
      }
      this.displayFeedback()
      this.resetInputAndBuffer()
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
