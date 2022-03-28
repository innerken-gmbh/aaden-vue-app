<template>
  <v-dialog v-model="realShow" max-width="70vw">
    <v-card style="display: grid;grid-template-columns: repeat(2,1fr)">
      <addresses-card :raw-address-info="currentAddress">
        <slot></slot>
      </addresses-card>
      <v-card>
        <v-subheader>
          <span>{{ currentTitle }}</span>
          <v-spacer/>
          <v-btn icon @click="realShow=false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-subheader>
        <v-window v-model="step">
          <v-window-item :value="0">
            <v-card-text>
              <template v-if="createUser">
                <v-text-field
                    hide-details
                    autocomlete="off"
                    type="search"
                    :label="$t('电话')"
                    v-model="searchTel"
                    autofocus
                />
                <v-row>
                  <v-col cols="6">
                    <v-text-field hide-details autocomlete="off"
                                  type="search" :label="$t('名')" v-model="rawAddressInfo.firstName"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field hide-details autocomlete="off"
                                  type="search" :label="$t('姓')" v-model="rawAddressInfo.lastName"></v-text-field>
                  </v-col>
                </v-row>
                <vuetify-google-autocomplete
                    browser-autocomplete="off"
                    type="search"
                    autocomlete="off"
                    id="map"
                    country="DE"
                    :placeholder="$t('地址搜索')"
                    clearable
                    :component-restrictions="
                          Config.autoCompletePLZ.split(',').length>0?Config.autoCompletePLZ.split(','):
                           false"
                    v-on:placechanged="getAddressData"
                />
                <v-row dense>
                  <v-col cols="6">
                    <v-text-field hide-details :label="$t('地址行1')" autocomlete="off"
                                  type="search" v-model="rawAddressInfo.addressLine1"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field hide-details :label="$t('地址行2')" autocomlete="off"
                                  type="search" v-model="rawAddressInfo.addressline2"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field hide-details :label="$t('城市')" autocomlete="off"
                                  type="search" v-model="rawAddressInfo.city"></v-text-field>
                  </v-col>
                  <v-col cols="6">
                    <v-text-field hide-details :label="$t('邮编')" autocomlete="off"
                                  type="search" v-model="rawAddressInfo.plz"></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field hide-details :label="$t('邮箱')" autocomlete="off"
                              type="search" v-model="rawAddressInfo.email"></v-text-field>
                <v-row dense>
                  <v-col cols="3">
                    <v-btn color="error" block @click="createUser=false">{{ $t('return') }}</v-btn>
                  </v-col>
                  <v-col cols="9">
                    <v-btn v-if="userIsNew" color="primary" @click="submitNewUserInfo" block>{{ $t('新增用户') }}</v-btn>
                    <v-btn v-else @click="updateUserInfo" color="warning" block>{{ $t('更新用户') }}</v-btn>
                  </v-col>
                </v-row>
              </template>
              <template v-else>
                <v-text-field
                    clearable
                    v-model="searchTel"
                    :label="$t('电话查找')"
                    autocomplete="off"
                    hide-details
                    type="search"
                />
                <v-divider></v-divider>
                <div v-if="telHint.length===0">
                  <v-btn color="primary" block @click="startCreateUser">{{ $t('新增用户') }}</v-btn>
                </div>
                <div style="max-height: 400px;overflow-y: scroll">
                  <v-card :key="user.id" v-for="user in telHint"
                          @click="useThisAddress(user)"
                          class="
                       d-flex
                       justify-space-between
                        align-center"
                  >
                    <span style="color: black;font-size: 18px">{{ user.rawInfo.tel }}</span>
                    <div>
                      <span>{{ user.rawInfo.firstName }} {{ user.rawInfo.lastName }}</span>
                      <v-btn text @click.stop="editUser(user)">
                        <v-icon left>mdi-pencil-box</v-icon>
                        {{ $t('变更') }}
                      </v-btn>
                      <v-btn text>
                        <v-icon left>mdi-check</v-icon>
                        {{ $t('确定') }}
                      </v-btn>
                    </div>

                  </v-card>
                </div>
              </template>
            </v-card-text>
          </v-window-item>
          <v-window-item :value="1">
            <div class="pa-4 d-flex flex-column">
              <filter-empty-string-displayer
                  :data="rawAddressInfo.firstName+rawAddressInfo.lastName">
                <b>{{ rawAddressInfo.firstName }}</b> <b>{{ rawAddressInfo.lastName }}</b>
              </filter-empty-string-displayer>
              <filter-empty-string-displayer :data="rawAddressInfo.addressLine1">
                <b>{{ rawAddressInfo.addressLine1 }}</b>
              </filter-empty-string-displayer>
              <filter-empty-string-displayer :data="rawAddressInfo.addressLine2">
                {{ rawAddressInfo.addressLine2 }}
              </filter-empty-string-displayer>
              <filter-empty-string-displayer :data="rawAddressInfo.city+rawAddressInfo.plz">
                {{ rawAddressInfo.city }} {{ rawAddressInfo.plz }}
              </filter-empty-string-displayer>
              <filter-empty-string-displayer :data="rawAddressInfo.email">
                {{ rawAddressInfo.email }}<br>
              </filter-empty-string-displayer>
              <filter-empty-string-displayer :data="rawAddressInfo.tel">
                {{ rawAddressInfo.tel }}
              </filter-empty-string-displayer>
              <v-spacer></v-spacer>
              <div class="d-flex mt-8">
                <v-btn elevation="0" large class="flex-grow-0" color="warning" @click="clearAddressInfo">{{
                    $t('变更')
                  }}
                </v-btn>
                <v-btn elevation="0" large class="flex-grow-1 ml-4" color="primary" @click="step=2">{{
                    $t('确定')
                  }}
                </v-btn>
              </div>

            </div>
          </v-window-item>
          <v-window-item :value="2">
            <v-card-text>
              <div class="d-flex flex-column" style="height: 100%">
                <div class="flex-grow-0">
                  <v-row dense class="flex-grow-0 flex-shrink-1">
                    <v-col cols="6">
                      <v-menu
                          ref="menu1"
                          v-model="menu1"
                          :close-on-content-click="false"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                              v-model="rawAddressInfo.date"
                              :label="$t('日期')"
                              prepend-icon="mdi-calendar"
                              v-bind="attrs"
                              @blur="date=rawAddressInfo.date"
                              v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                            v-model="date"
                            no-title
                            @input="rawAddressInfo.date=date;menu1=false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field :label="$t('时间')" v-model="rawAddressInfo.time"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field :label="$t('备注')" v-model="rawAddressInfo.note"></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select :items="deliveryMethods"
                                :label="$t('配送方式')"
                                return-object
                                hide-details
                                v-model="rawAddressInfo.deliveryMethod"
                      />
                    </v-col>
                  </v-row>
                </div>
                <v-spacer></v-spacer>
                <v-btn v-if="haveAddress" @click="submitRawAddressInfo" block class="flex-grow-0 primary">{{
                    $t('confirm')
                  }}
                </v-btn>
              </div>
            </v-card-text>
          </v-window-item>
        </v-window>
      </v-card>
    </v-card>

  </v-dialog>
</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { toast } from '@/oldjs/common'
import hillo from 'hillo'
import { dragscroll } from 'vue-dragscroll/src/main'
import { DefaultAddressInfo } from '@/oldjs/StaticModel'
import FilterEmptyStringDisplayer from '@/views/TablePage/Address/filterEmptyStringDisplayer'
import AddressesCard from '@/views/TablePage/Address/AddressesCard'

export default {
  name: 'AddressForm',
  components: { FilterEmptyStringDisplayer, AddressesCard },
  directives: {
    dragscroll
  },
  props: {
    menuShow: {
      type: Boolean,
      default: false
    },
    currentAddress: {}
  },
  data: function () {
    return {
      step: null,
      rawAddressInfo: DefaultAddressInfo,
      Config: GlobalConfig,
      userInfo: [],
      searchTel: null,
      realShow: null,
      createUser: false,
      deliveryMethods: [
        this.$t('Abholung'), this.$t('Lieferung')
      ],
      date: new Date().toISOString().substring(0, 10),
      menu1: null,
      steps: [this.$t('customerAddress'), this.$t('address'), this.$t('deliveryInfo')]
    }
  },
  watch: {
    realShow: function (val) {
      this.$emit('update:menuShow', val)
    },
    menuShow: async function (val) {
      console.log(val)
      this.realShow = val
      if (val) {
        this.initialMenu()
        this.step = 0
      }
    }
  },
  methods: {
    useThisAddress (user) {
      this.applyAddress(user.rawInfo)
    },
    applyAddress (addressInfo) {
      addressInfo.edit = false
      this.rawAddressInfo = Object.assign({}, DefaultAddressInfo, addressInfo)
      this.rawAddressInfo.date = new Date().toISOString().substr(0, 10) + ' '
      this.step = 1
    },
    startCreateUser () {
      this.createUser = true
      this.clearAddressInfo()
      this.rawAddressInfo.edit = true
    },
    editUser (user) {
      this.rawAddressInfo = Object.assign({}, DefaultAddressInfo, user.rawInfo)
      this.rawAddressInfo.edit = true
      this.searchTel = this.rawAddressInfo.tel
      this.createUser = true
    },
    async initialMenu () {
      await this.getUserInfo()
      this.createUser = false
      this.clearAddressInfo()
      this.searchTel = ''
    },
    async getUserInfo () {
      this.userInfo = (await hillo.get('Takeaway.php?op=showAllUsers')).content.map(u => {
        u.rawInfo = JSON.parse(u.rawInfo)
        return u
      })
    },
    async updateUserInfo () {
      const info = this.rawAddressInfo
      await hillo.post('Takeaway.php?op=updateUsers', {
        email: info.tel,
        password: '',
        rawInfo: JSON.stringify(info)
      })
      await this.initialMenu()
      toast()
      this.applyAddress(info)
    },
    async submitNewUserInfo () {
      this.rawAddressInfo.tel = this.searchTel
      const info = this.rawAddressInfo
      await hillo.post('Takeaway.php?op=addUsers', {
        email: info.tel,
        password: '',
        rawInfo: JSON.stringify(info)
      })
      await this.initialMenu()
      toast()
      this.applyAddress(info)
    },
    clearAddressInfo () {
      this.step = 0
      this.rawAddressInfo = Object.assign({}, DefaultAddressInfo)
      this.rawAddressInfo.date = new Date().toISOString().substr(0, 10) + ' '
    },
    getAddressData (e) {
      this.rawAddressInfo.addressLine1 = e.route + ' ' + e.street_number
      this.rawAddressInfo.city = e.locality
      this.rawAddressInfo.plz = e.postal_code
    },
    async submitRawAddressInfo () {
      this.$emit('address-submit', this.rawAddressInfo)
      this.realShow = false
      toast()
    }
  },
  computed: {
    currentTitle: function () {
      return this.steps[this.step]
      // return i18n.t('customerAddress')
    },
    userIsNew: function () {
      return !this.userInfo.some(d => d.email === this.searchTel)
    },
    telHint: function () {
      return this.searchTel ? (this.userInfo.filter(u => u.rawInfo.tel?.startsWith(this.searchTel))).slice(0, 9) : this.userInfo.slice(0, 9)
    },
    haveAddress: function () {
      return this.rawAddressInfo.addressLine1.length > 0 && !this.rawAddressInfo.edit
    }
  }
}
</script>

<style scoped>

</style>
