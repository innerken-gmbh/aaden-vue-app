<template>
  <v-card
      color="transparent"
      flat
  >
    <div style="max-height: calc(100vh - 64px);overflow-y: scroll">
      <div
          class="pa-4"
      >
        <div class="d-flex">
          <span class="text-h4 font-weight-black">{{ currentTitle }}</span>
          <v-spacer/>
          <v-btn
              class="black lighten-3"
              icon
              @click="saveAddClose"
          >
            <v-icon color="white">mdi-content-save</v-icon>
          </v-btn>
        </div>
        <div class="mt-4">
          <v-row dense>
            <v-col cols="6">
              <v-autocomplete
                  v-if="!createNewUser"
                  clearable
                  outlined
                  :items="userInfo"
                  v-model="searchTel"
                  :label="$t('SearchByTelefon')"
                  autocomplete="off"
                  @change="change"
                  auto-select-first
                  item-value="rawInfo.tel"
                  item-text="rawInfo.tel"
                  autofocus
                  @update:search-input="inputUpdate"
                  type="search"
              >
                <template #no-data>
                  <v-btn
                      elevation="0"
                      text
                      color="primary"
                      block
                      @click="startCreateUser"
                  >{{ $t('NewUser') }}
                  </v-btn>
                </template>
                <template #item="{item}">
                  <div
                      @click="applyAddress(item)"
                      class="d-flex align-center"
                      style="width: 100%"
                  >
                    <div class="text-body-1">{{ item.rawInfo.tel }}</div>
                    <v-spacer></v-spacer>
                    <div class="text-body-2 text--secondary">{{ item.rawInfo.firstName }} {{
                        item.rawInfo.lastName
                      }}
                    </div>
                  </div>
                </template>
              </v-autocomplete>
              <v-text-field
                  v-else
                  outlined
                  autocomlete="off"
                  type="search"
                  :label="$t('telefon')"
                  v-model="telInput"
              />
            </v-col>
            <v-col cols="6">
              <vuetify-google-autocomplete
                  browser-autocomplete="off"
                  type="search"
                  outlined
                  autocomlete="off"
                  id="map"
                  country="DE"
                  :placeholder="$t('SearchAddress')"
                  clearable
                  :component-restrictions="
                          Config.autoCompletePLZ.split(',').length>0?Config.autoCompletePLZ.split(','):
                           false"
                  v-on:placechanged="getAddressData"
              />
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="6">
              <v-text-field
                  outlined
                  autocomlete="off"
                  type="search"
                  :label="$t('FirstName')"
                  v-model="rawAddressInfo.firstName"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  outlined
                  autocomlete="off"
                  type="search"
                  :label="$t('last_name')"
                  v-model="rawAddressInfo.lastName"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="6">
              <v-text-field
                  outlined
                  :label="$t('AddressLine01')"
                  autocomlete="off"
                  type="search"
                  v-model="rawAddressInfo.addressLine1"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  outlined
                  :label="$t('AddressLine02')"
                  autocomlete="off"
                  type="search"
                  v-model="rawAddressInfo.addressline2"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  outlined
                  :label="$t('City')"
                  autocomlete="off"
                  type="search"
                  v-model="rawAddressInfo.city"
              ></v-text-field>
            </v-col>
            <v-col cols="6">
              <v-text-field
                  outlined
                  :label="$t('postcode')"
                  autocomlete="off"
                  type="search"
                  v-model="rawAddressInfo.plz"
              ></v-text-field>
            </v-col>
          </v-row>

          <v-row dense>
            <v-col cols="4">
              <v-text-field
                  outlined
                  :label="$t('Email')"
                  autocomlete="off"
                  type="search"
                  v-model="rawAddressInfo.email"
              ></v-text-field>
            </v-col>
            <v-col cols="4">
              <v-select
                  :items="deliveryMethods"
                  outlined
                  :menu-props="{offsetY:true}"
                  v-model="rawAddressInfo.deliveryMethod"
                  :label="$t('DeliveryMethod')"
              ></v-select>
            </v-col>
            <v-col cols="4">
              <v-select
                  v-model="rawAddressInfo.time"
                  outlined
                  :menu-props="{offsetY:true}"
                  :items="timeOption"
                  :label="$t('time')"
              ></v-select>
            </v-col>
          </v-row>
          <v-textarea
              height="90"
              v-model="rawAddressInfo.note"
              outlined
              :label="$t('OrderHint')"
          ></v-textarea>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { toast } from '@/oldjs/common'
import hillo from 'hillo'
import { dragscroll } from 'vue-dragscroll/src/main'
import { DefaultAddressInfo } from '@/oldjs/StaticModel'
import dayjs from 'dayjs'

export default {
  name: 'AddressForm',
  directives: {
    dragscroll
  },
  props: {
    currentAddress: {}
  },
  data: function () {
    return {
      rawAddressInfo: DefaultAddressInfo,
      Config: GlobalConfig,
      userInfo: [],
      searchTel: null,
      telInput: null,
      timeOption: [],
      deliveryMethods: [{
        value: 'inShop',
        text: this.$t('inShop')
      }, {
        value: 'Zum Mitnehmen',
        text: this.$t('Pickup')
      }, {
        value: 'Lieferung',
        text: this.$t('Delivery')
      }],
      date: new Date().toISOString().substring(0, 10),
      createNewUser: false,
      menu1: null,
      steps: [this.$t('CustomerAddress'), this.$t('Address'), this.$t('DeliveryInfo')]
    }
  },

  async mounted () {
    await this.initialMenu()
  },
  methods: {
    applyAddress (addressInfo) {
      this.rawAddressInfo = Object.assign({}, DefaultAddressInfo, addressInfo)
      if (!this.rawAddressInfo.date) {
        this.rawAddressInfo.date = dayjs().format('YYYY-MM-dd')
      }
      if (!this.rawAddressInfo.time) {
        this.rawAddressInfo.time = 'ASAP'
      }
      if (!this.rawAddressInfo.deliveryMethod) {
        this.rawAddressInfo.deliveryMethod = DefaultAddressInfo.deliveryMethod
      }
    },

    startCreateUser () {
      this.createNewUser = true
      this.clearAddressInfo()
    },
    async initialMenu () {
      await this.getUserInfo()
      this.clearAddressInfo()
      const now = dayjs()
      const first = dayjs().add(15 - now.minute() % 15, 'm')
      this.timeOption = ['ASAP',
        ...[this.rawAddressInfo?.time].filter(it => it),
        ...Array.from(Array(100).keys()).map(it => {
          return first.add(it * 15, 'm').format('HH:mm')
        })
      ]
      this.searchTel = ''
    },
    async getUserInfo () {
      this.userInfo = (await hillo.get('Takeaway.php?op=showAllUsers')).content.map(u => {
        u.rawInfo = JSON.parse(u.rawInfo)
        return u
      })
    },
    async saveUserInfo () {
      if (this.userIsNew) {
        await this.submitNewUserInfo()
      } else {
        await this.updateUserInfo()
      }
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
      this.rawAddressInfo.tel = this.telInput
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
      this.rawAddressInfo = Object.assign({}, this.currentAddress)
      console.log(this.currentAddress)
    },
    getAddressData (e) {
      this.rawAddressInfo.addressLine1 = e.route + ' ' + e.street_number
      this.rawAddressInfo.city = e.locality
      this.rawAddressInfo.plz = e.postal_code
    },
    async submitRawAddressInfo () {
      this.$emit('address-submit', this.rawAddressInfo)
      toast()
    },
    async saveAddClose () {
      await this.saveUserInfo()
      await this.submitRawAddressInfo()
    },
    change (tel) {
      const user = this.userInfo.find(it => it.rawInfo.tel === tel)
      if (user) {
        this.applyAddress(user.rawInfo)
      } else {
        console.log('Error:No User Found')
      }
    },
    inputUpdate (e) {
      if (e) {
        this.telInput = e
      }
    }
  },
  computed: {
    currentTitle: function () {
      return this.steps[0]
    },
    userIsNew: function () {
      return !this.userInfo.some(d => d.email === this.searchTel)
    }
  }
}
</script>

<style scoped>

</style>
