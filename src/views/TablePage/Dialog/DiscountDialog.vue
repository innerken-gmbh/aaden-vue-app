<template>
  <v-dialog
      max-width="400px"
      v-model="realShow"
  >
    <v-card>
      <v-toolbar
          tile
          color="primary"
          dark
          elevation="0"
      >
        <v-toolbar-title> {{ $t('PleaseEnterDiscount2') }}</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-text-field
            :label="$t('AmountOrPercentage')"
            :messages="$t('CashDiscountUseTips')"
            v-model="localDiscountStr"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <div class="d-flex flex-wrap">
          <template v-for="d in predefinedDiscount">
            <v-btn
                @click="submitDiscount(d)"
                :key="d"
            >-{{ d.replace('p', '%') }}
            </v-btn>
          </template>
        </div>
        <v-spacer></v-spacer>
      </v-card-actions>
      <keyboard-layout
          :keys="keyboardLayout"
          @input="numberInput"
      />
    </v-card>
  </v-dialog>
</template>

<script>
import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { loadingComplete } from '@/oldjs/common'
import KeyboardLayout from '@/components/Base/Keyboard/KeyboardLayout'
import { sum } from 'lodash-es'
import DishDocker from 'aaden-base-model/lib/Models/DishDocker'
import IKUtils from 'innerken-js-utils'
import { optionalAuthorizeAsync } from '@/oldjs/api'

const keyboardLayout =
    [

      '7', '8', '9', 'C',
      '4', '5', '6', '',
      '1', '2', '3', '$',
      'mdi-close-box', '0', '.', '%'
    ]

export default {
  name: 'discountDialog',
  components: { KeyboardLayout },
  props: {
    discountModelShow: {
      default: false
    },
    id: {},
    initialUI: {
      default: () => () => {
      }
    },
    totalPriceWithoutAnyDiscount: {},
    totalPrice: {},
    orderId: {},
    dishesItems: {},
    useDishesDiscount: {
      style: Boolean,
      default: false
    },
    discountRatio: {
      default: 0
    }
  },
  data: function () {
    return {
      localDiscountStr: '',
      localDiscountType: '',
      predefinedDiscount: [],
      keyboardLayout
    }
  },
  methods: {
    numberInput (key) {
      if (this.localDiscountStr == null) {
        this.localDiscountStr = ''
      }
      switch (key) {
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
        case '0':
        case '.':
          this.localDiscountStr += key
          break
        case 'mdi-close-box':
          this.realShow = false
          break
        case '%':
          this.localDiscountType = 1
          this.submitDiscount()
          break
        case '$':
          this.localDiscountType = 0
          this.submitDiscount()
          break
        case 'C':
          this.localDiscountStr = ''
          break
      }
    },
    async getAllPredefinedDiscount () {
      this.predefinedDiscount = (await GlobalConfig.getSettings('predefinedDiscount') ?? '').split(',').filter(t => t !== '')
      // console.log(this.predefinedDiscount, 'Discount')
    },
    async addNewPredefinedDiscount (str) {
      await this.getAllPredefinedDiscount()
      if (!this.predefinedDiscount.includes(str)) {
        this.predefinedDiscount.push(str)
        if (this.predefinedDiscount.length > 10) {
          this.predefinedDiscount.shift()
        }
        // console.log(this.predefinedDiscount.join(','))
        GlobalConfig.updateSettings('predefinedDiscount', this.predefinedDiscount.join(','))
        this.getAllPredefinedDiscount()
      }
    },
    async submitDiscount (discountStr = null) {
      if (discountStr == null) {
        discountStr = this.localDiscountStr + (this.localDiscountType === 1 ? 'p' : '')
      }
      const discountPattern = /^([0-9]+(\.[0-9]+)?)?((p)+([kg])?)?$/
      const priceBefore = this.dishesItems.length === 0 ? this.totalPriceWithSingle : this.totalPriceWithDiscount
      let priceAfter = priceBefore
      if (this.dishesItems.length > 0) {
        const subPrice = sum(this.dishesItems.map(it => DishDocker.calculateDiscountPrice(it.count *
            parseFloat(it.price), discountStr)))
        priceAfter = priceBefore - subPrice
      } else {
        priceAfter = DishDocker.calculatePriceWithDiscount(priceBefore, discountStr)
      }
      if (!discountPattern.test(discountStr)) {
        IKUtils.toast(this.$t('Error'), this.$t('error'))
        return
      }
      const realSubmitDiscount = async () => {
        await this.addNewPredefinedDiscount(discountStr)
        await this.sendDiscount(discountStr)
        this.localDiscountStr = ''
        this.localDiscountType = 0
      }
      const ratio = (priceBefore - priceAfter) / priceBefore
      if (ratio > 1) {
        IKUtils.showError(this.$t('DiscountShouldNotGreaterThanOriginalPrice'))
        return
      }
      await optionalAuthorizeAsync('boss',
        GlobalConfig.bigDiscountRatio > 0 &&
          ratio > GlobalConfig.bigDiscountRatio,
        '',
        true, this.id)

      await realSubmitDiscount()
    },
    async sendDiscount (discountStr) {
      if (this.useDishesDiscount) {
        const res = await hillo.post('Dishes.php?op=setDiscountToDishes', {
          discountStr: discountStr,
          orderId: this.orderId,
          dishes: JSON.stringify(this.dishesItems)
        })
        if (res) {
          loadingComplete()
          this.initialUI()
        }
      } else {
        const res = await hillo.post('Complex.php?op=setDiscount', {
          tableId: this.id,
          discountStr
        })
        if (res) {
          // Wait for the discount to be applied on the server before updating the table information
          await this.initialUI()
        }
      }
    }
  },

  watch: {
    realShow (val) {
      if (val) {
        this.getAllPredefinedDiscount()
      }
      this.localDiscountStr = ''
      this.localDiscountType = 0
    }
  },
  computed: {
    realShow: {
      get: function () {
        return this.discountModelShow
      },
      set: function (val) {
        this.$emit('visibility-changed', val)
      }
    },
    totalPriceNoDiscount () {
      return sum([...this.totalPriceWithoutAnyDiscount, ...this.dishesItems].map(it => parseFloat(it.price) * it.count))
    },
    totalPriceWithDiscount () {
      return sum([...this.dishesItems].map(it => parseFloat(it.price) * it.count * (1 - this.discountRatio))).toFixed(2)
    },
    totalPriceWithSingle () {
      return sum([...this.totalPriceWithoutAnyDiscount, ...this.dishesItems]
        .map(it => parseFloat(it.realPrice) * it.count))
    }
  }
}
</script>

<style scoped>

</style>
