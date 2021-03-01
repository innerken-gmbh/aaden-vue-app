<template>
  <v-dialog max-width="600px" v-model="realShow">
    <v-card>
      <v-toolbar>
        <v-toolbar-title>{{ $t('折扣') }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-icon @click="realShow=!realShow">mdi-close</v-icon>
      </v-toolbar>
      <v-tabs v-model="localDiscountType" vertical>
        <v-tab>{{ $t('现金') }}</v-tab>
        <v-tab>{{ $t('百分比') }}</v-tab>
        <v-tab-item>
          <v-card-text>
            <v-text-field :label="$t('金额')"
                          messages="zB.: 12.34" v-model="localDiscountStr"></v-text-field>
          </v-card-text>
        </v-tab-item>
        <v-tab-item>
          <v-card-text>
            <v-text-field :label="$t('百分比')"
                          messages="1-99" v-model="localDiscountStr"></v-text-field>
          </v-card-text>
        </v-tab-item>
      </v-tabs>
      <v-card-actions>
        <div class="d-flex flex-wrap">
          <template v-for="d in predefinedDiscount">
            <v-btn @click="sendDiscount(d)" :key="d">-{{ d.replace('p', '%') }}</v-btn>
          </template>
        </div>
        <v-spacer></v-spacer>
        <v-btn @click="submitDiscount">{{ $t('确定') }}</v-btn>
      </v-card-actions>
      <keyboard :keys="keyboardLayout" @input="numberInput"/>
    </v-card>
  </v-dialog>
</template>

<script>
import hillo from 'hillo'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import IKUtils from 'innerken-js-utils'
import Keyboard from '@/components/Keyboard'
import { popAuthorize } from '@/oldjs/common'

const keyboardLayout =
    [

      '7', '8', '9', 'mdi-autorenew',
      '4', '5', '6', '%',
      '1', '2', '3', '$',
      '.', '0', '', 'OK'
    ]

export default {
  name: 'discountDialog',
  components: { Keyboard },
  props: {
    discountModelShow: {
      default: false
    },
    id: {},
    initialUI: {
      default: () => () => {
      }
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
      console.log(key, 'keyInput')
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
        case '%':
          this.localDiscountType = 1
          break
        case '$':
          this.localDiscountType = 0
          break
        case 'OK':
          this.submitDiscount()
          break
        case 'mdi-autorenew':
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
    async submitDiscount () {
      const discountStr = this.localDiscountStr + (this.localDiscountType === 1 ? 'p' : '')
      const discountPattern = /^([0-9]+(\.[0-9]+)?)?((p)+([kg])?)?$/
      if (!discountPattern.test(discountStr)) {
        IKUtils.toast('Error', 'error')
        return
      }
      const realSubmitDiscount = async () => {
        this.addNewPredefinedDiscount(discountStr)
        await this.sendDiscount(discountStr)
        this.localDiscountStr = ''
        this.localDiscountType = 0
      }
      if (GlobalConfig.bigDiscountRatio > 0 &&
          this.localDiscountType === 1 &&
          (parseFloat(this.localDiscountStr) / 100) >=
          GlobalConfig.bigDiscountRatio) {
        this.realShow = false
        popAuthorize('boss', () => {
          realSubmitDiscount()
        }, true, () => {
          this.realShow = true
        })
      } else {
        realSubmitDiscount()
      }
    },
    async sendDiscount (discountStr) {
      await hillo.post('Complex.php?op=setDiscount', {
        tableId: this.id,
        discountStr
      })
      this.initialUI()
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
    }
  }
}
</script>

<style scoped>

</style>
