<template>
  <div
      class="flex-grow-1"
      style="
                display: grid;
                grid-template-columns: 1fr 360px;
                height: calc(100vh - 130px);
                grid-gap: 0px;
              "
  >
    <v-card
        class="l-result-display"
        color="transparent"
        elevation="0"
    >
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
      <div
          v-else
          class="d-flex align-center justify-center"
          style="height: 100%; width: 100%"
      >
        <div class="d-flex flex-column align-center">
          <div>
            <v-icon
                color="grey lighten-1"
                x-large
            >mdi-keyboard
            </v-icon>
          </div>
          <div class="text--disabled">
            {{ $t('PleaseUseKeyboardOrType') }}
          </div>
        </div>
      </div>
    </v-card>
    <v-card
        class="d-flex flex-column"
        elevation="0"
    >
      <div
          class="pa-2 text-h6"
          style="min-height: 96px"
      >
        <template v-if="keyboardInput">
          {{
            Config.numberFirst
                ? $t('QuantityDishNumber')
                : $t('DishNumberQuantity')
          }}<br/>
          {{ $t('Input') }}
        </template>
        <template v-else>
          {{ feedback }}
        </template>
      </div>
      <v-spacer></v-spacer>
      <div
          class="pa-2 flex-shrink-0"
          @click.stop
      >
        <v-card
            :class="keyboardInput ? '' : 'text--secondary'"
            class="text-h4 pa-3 py-6 mb-2 d-flex align-center"
            color="grey lighten-3"
            elevation="0"
        >
          {{
            keyboardInput
                ? keyboardInput
                : Config.numberFirst
                    ? $t('quantity_x_dishNumber')
                    : $t('DishNumberQuantity')
          }}
        </v-card>
        <keyboard-layout
            :keys="keyboardLayout"
            @input="numberInput"
        ></keyboard-layout>
      </div>
    </v-card>
  </div>
</template>

<script>
import KeyboardLayout from '@/components/Base/Keyboard/KeyboardLayout.vue'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { findDish } from '@/oldjs/StaticModel'
import { debounce } from 'lodash-es'
import { showTimedAlert } from '@/oldjs/common'

const keyboardLayout = [
  '7',
  '8',
  '9',
  'C',
  '4',
  '5',
  '6',
  'A',
  '1',
  '2',
  '3',
  'M',
  '.',
  '0',
  'mdi-close',
  'OK'
]
export default {
  name: 'KeyboardOrderFragment',
  components: { KeyboardLayout },
  data: function () {
    return {
      keyboardLayout: GlobalConfig.topKeyboardKey
        .split(',')
        .concat(keyboardLayout),
      searchDish: [],
      feedback: '',
      keyboardInput: '',
      Config: GlobalConfig,
      currentCodeBuffer: ''
    }
  },
  props: {
    dishes: {}
  },
  computed: {},
  methods: {
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
    searchDishes () {
      const list = this.dishes
      const searchWord = this.currentCodeBuffer || this.keyboardInput
      const codeOnly = !!this.currentCodeBuffer
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
              if (result.length > 10) {
                break
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
    numberInput (key) {
      if (this.keyboardInput == null) {
        this.keyboardInput = ''
      }
      switch (key) {
        case 'mdi-close':
          this.keyboardInput += '*'
          break
        case 'C':
          this.keyboardInput = ''
          break
        case 'OK':
          this.submit()
          this.resetInputAndBuffer()
          break
        default:
          this.keyboardInput += key
          break
      }
    },
    async submit () {
      const t = this.keyboardInput
      const submit = (code, count = 1) => {
        const dish = findDish(code)
        if (!dish) {
          this.feedback = '❌' + this.$t('DishNumberNotFound', { n: code })
        } else {
          this.$emit('dish-add', code, count)
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
    }
  },
  watch: {
    keyboardInput: function () {
      if (this.keyboardInput) {
        this.currentCodeBuffer = ''
        this.indexActive = ''
      }
      this.debounce(this.updateSearchDish)
    }
  }
}
</script>

<style scoped>

</style>
