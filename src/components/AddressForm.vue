<template>
  <v-dialog v-model="realShow">
    <v-card>
      <v-toolbar dense dark color="primary">
        <v-toolbar-title class="bigTableName mr-4">
          Neue Lieferung
        </v-toolbar-title>
        <v-toolbar-items>
          <v-btn v-if="userIsNew" @click="submitNewUserInfo" color="success">{{ $t('新增用户') }}</v-btn>
          <v-btn v-else @click="updateUserInfo" color="warning">{{ $t('更新用户') }}</v-btn>
          <v-btn @click="clearAddressInfo" color="error">{{ $t('清空') }}</v-btn>
          <v-btn @click="submitRawAddressInfo" dark>{{ $t('提交') }}</v-btn>
        </v-toolbar-items>
        <v-spacer/>
        <v-toolbar-items>
          <v-btn @click="realShow=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-text-field readonly disabled :label="$t('电话')" autocomlete="off"
                          type="search" v-model="rawAddressInfo.tel"></v-text-field>
            <v-text-field hide-details autocomlete="off"
                          type="search" :label="$t('名')" v-model="rawAddressInfo.firstName"></v-text-field>
            <v-text-field hide-details autocomlete="off"
                          type="search" :label="$t('姓')" v-model="rawAddressInfo.lastName"></v-text-field>
            <v-text-field :label="$t('地址行1')" autocomlete="off"
                          type="search" v-model="rawAddressInfo.addressLine1"></v-text-field>
            <v-text-field :label="$t('地址行2')" autocomlete="off"
                          type="search" v-model="rawAddressInfo.addressline2"></v-text-field>
            <v-text-field :label="$t('城市')" autocomlete="off"
                          type="search" v-model="rawAddressInfo.city"></v-text-field>
            <v-text-field :label="$t('邮编')" autocomlete="off"
                          type="search" v-model="rawAddressInfo.plz"></v-text-field>
            <v-text-field :label="$t('邮箱')" autocomlete="off"
                          type="search" v-model="rawAddressInfo.email"></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-autocomplete
                v-model="selectUser"
                clearable
                :label="$t('电话查找')"
                autocomplete="off"
                type="search"
                @update:search-input="saveLastTel"
                auto-select-first
                hide-no-data
                cache-items
                :items="telHint"
            />
            <vuetify-google-autocomplete
                browser-autocomplete="off"
                type="search"
                id="map"
                country="DE"
                :placeholder="$t('地址搜索')"
                clearable
                :component-restrictions="
                          Config.autoCompletePLZ.split(',').length>0?Config.autoCompletePLZ.split(','):
                           false"
                v-on:placechanged="getAddressData"
            />
            <v-text-field :label="$t('日期')" v-model="rawAddressInfo.date"></v-text-field>
            <v-text-field :label="$t('时间')" v-model="rawAddressInfo.time"></v-text-field>
            <v-text-field :label="$t('备注')" v-model="rawAddressInfo.note"></v-text-field>
            <v-text-field :label="$t('配送方式')" v-model="rawAddressInfo.deliveryMethod"></v-text-field>
            <div class="chip" v-show="rawAddressInfo.reason">
              {{ rawAddressInfo.reason }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>

    </v-card>
  </v-dialog>

</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { requestOutTable, toast } from '@/oldjs/common'
import hillo from 'hillo'
import { dragscroll } from 'vue-dragscroll/src/main'

const DefaultAddressInfo = {
  reason: '',
  addressLine1: '',
  addressLine2: '',
  city: '',
  plz: '',
  tel: '',
  email: ''
}
export default {
  name: 'AddressForm',
  directives: {
    dragscroll
  },
  props: {
    menuShow: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      rawAddressInfo: DefaultAddressInfo,
      Config: GlobalConfig,
      selectUser: null,
      userInfo: [],
      realShow: null,
      loading: false
    }
  },
  watch: {
    realShow: function (val) {
      this.$emit('update:menuShow', val)
    },
    menuShow: async function (val) {
      this.realShow = val
      if (val) {
        this.initialMenu()
      }
    },
    selectUser: function (val) {
      const searchUser = this.userInfo.find(d => d.email === val)
      if (searchUser) {
        this.rawAddressInfo = Object.assign(this.rawAddressInfo, JSON.parse(searchUser.rawInfo))
      }
    }
  },
  methods: {
    async initialMenu () {
      this.loading = true
      await this.getUserInfo()
      this.selectUser = null
      this.clearAddressInfo()
      this.loading = false
    },
    requestOutTable,
    saveLastTel (e) {
      if (e != null) {
        this.rawAddressInfo.tel = e
      }
    },
    async getUserInfo () {
      this.userInfo = (await hillo.get('Takeaway.php?op=showAllUsers')).content
    },
    async updateUserInfo () {
      const info = this.rawAddressInfo
      await hillo.post('Takeaway.php?op=updateUsers', {
        email: info.tel,
        password: '',
        rawInfo: JSON.stringify(info)
      })
      this.getUserInfo()
      toast()
    },
    async submitNewUserInfo () {
      const info = this.rawAddressInfo
      await hillo.post('Takeaway.php?op=addUsers', {
        email: info.tel,
        password: '',
        rawInfo: JSON.stringify(info)
      })
      this.getUserInfo()
      toast()
    },
    clearAddressInfo () {
      this.rawAddressInfo = Object.assign({}, DefaultAddressInfo)
    },
    getAddressData (e) {
      this.rawAddressInfo.addressLine1 = e.route + ' ' + e.street_number
      this.rawAddressInfo.city = e.locality
      this.rawAddressInfo.plz = e.postal_code
    },
    async submitRawAddressInfo () {
      await hillo.post('Orders.php?op=updateRawAddressInfo', {
        orderId: this.tableDetailInfo.order.id,
        rawAddressInfo: JSON.stringify(this.rawAddressInfo)
      })
      const res = await hillo.get('Orders.php?op=getRawAddressInfo', {
        orderId: this.tableDetailInfo.order.id
      })
      this.rawAddressInfo = JSON.parse(res.content)
      this.realShow = false
      toast()
    }
  },
  computed: {
    userIsNew: function () {
      return !this.userInfo.some(d => d.email === this.rawAddressInfo.tel)
    },
    telHint: function () {
      const info = this.userInfo
      return info.reduce((arr, i) => {
        arr.push(i.email)
        return arr
      }, [])
    }
  }
}
</script>

<style scoped>

</style>
