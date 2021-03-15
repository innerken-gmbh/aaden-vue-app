<template>
  <v-bottom-sheet
      :retain-focus="false"
      :disable-keys="true"
      :close-on-content-click="false"
      offset-y
      v-model="realShow">
    <v-card v-cloak color="#f6f6f6">
      <template v-show="!loading">
        <v-toolbar dense dark color="primary">
          <v-toolbar-title class="bigTableName mr-4">
            {{ tableDetailInfo.tableBasicInfo.name }}
          </v-toolbar-title>
          <v-toolbar-items>
            <v-btn v-if="userIsNew" @click="submitNewUserInfo" color="success">{{ $t('新增用户') }}</v-btn>
            <v-btn v-else @click="updateUserInfo" color="warning">{{ $t('更新用户') }}</v-btn>
            <v-btn @click="clearAddressInfo" color="error">{{ $t('清空') }}</v-btn>
            <v-btn @click="submitRawAddressInfo" dark>{{ $t('提交') }}</v-btn>
          </v-toolbar-items>
          <v-spacer/>
          <div class="d-flex ml-1">
                                             <span v-hide-quick-buy class="icon-line">
                                                <v-icon color="white">mdi-account-outline</v-icon>
                                                <span class="ml-1">{{ tableDetailInfo.personCount }}</span>
                                            </span>
            <span class="icon-line ml-2">
                                                <v-icon color="white">mdi-calendar-text</v-icon>
                                                <span class="ml-1">
                                                     {{ tableDetailInfo.order.id }}
                                                </span>
                                             </span>
          </div>
          <v-toolbar-items>
            <v-btn @click="realShow=false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="3">
              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
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
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
            <v-col cols="3">
              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-content>
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
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
                <v-card-actions>

                </v-card-actions>
              </v-card>
            </v-col>

            <v-col cols="3">
              <v-card>
                <v-list subheader>
                  <v-subheader>Information</v-subheader>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-timer</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ $t('tableInfoLabelTime') }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ tableDetailInfo.createTimestamp }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-seat</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ $t('tableInfoLabelSeat') }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ tableDetailInfo.satCount }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-food</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        <span>{{ tableDetailInfo.consumeTypeName }}</span>/<span>{{
                          tableDetailInfo.order.counsumeTypeStatusName
                        }}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>
                  <v-list-item @click="popAuthorize('boss',toManage)">
                    <v-list-item-icon>
                      <v-icon>mdi-home-analytics</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ $t('Chef') }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="popAuthorize('',
                () => popChangeTablePanel(tableDetailInfo.tableBasicInfo.name))">
                    <v-list-item-icon>
                      <v-icon>mdi-swap-horizontal</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ $t('tableChange') }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="popAuthorize('',
                () => popMergeTablePanel(tableDetailInfo.tableBasicInfo.name))">
                    <v-list-item-icon>
                      <v-icon>mdi-merge</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>{{ $t('tableMerge') }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item @click="changeServant">
                    <v-list-item-icon>
                      <v-icon>mdi-account</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title> {{ $t('Übergabe') }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>

                </v-list>
              </v-card>

            </v-col>
            <v-col cols="3">
              <div style="max-height:calc(100vh - 124px); overflow: hidden"
                   class="collapse pa-2" v-dragscroll>
                <div v-bind:key="'area'+area.areaName" v-for="area in areas"
                     class="area">
                  <div class="areaTitle">{{ area.areaName }}</div>
                  <div class="areaTableContainer">
                    <template v-for="(table) in area.tables">
                      <div :key="'table'+table.tableName">
                        <div v-if="table.usageStatus==='1'" class="tableCard"
                             v-bind:class="{onCall:parseInt(table.callService)===1}"
                             v-on:click='jumpToTable(table.tableId,table.tableName)'>
                          <div class="tableCardName tableBold">{{
                              table.tableName
                            }}
                          </div>
                        </div>
                        <div v-else @click="openOrEnterTable(table.tableName)"
                             class="tableCard notUsed">
                          <div class="tableCardName">
                            {{ table.tableName }}
                          </div>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-card-text>
      </template>
      <template v-show="loading">
        <v-progress-linear
            indeterminate
            color="green"
        ></v-progress-linear>
      </template>

    </v-card>

  </v-bottom-sheet>
</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import hillo from 'hillo'
import {
  fastSweetAlertRequest,
  jumpToTable,
  openOrEnterTable,
  popAuthorize,
  requestOutTable,
  toast,
  toManage
} from '@/oldjs/common'
import { dragscroll } from 'vue-dragscroll'
import { getActiveTables } from 'aaden-base-model/lib/Models/AadenApi'
import { popChangeTablePanel, popMergeTablePanel } from '@/oldjs/api'
import { goHome } from '@/oldjs/StaticModel'

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
  name: 'TablePageMenu',
  directives: {
    dragscroll
  },
  props: {
    menuShow: {
      type: Boolean,
      default: false
    },
    tableId: {
      type: [Number, String],
      default: -1
    }
  },
  data: function () {
    return {
      rawAddressInfo: DefaultAddressInfo,
      Config: GlobalConfig,
      selectUser: null,
      userInfo: [],
      areas: [],
      realShow: null,
      tableDetailInfo: {
        order: { id: -1, rawAddressInfo: '' },
        tableBasicInfo: { name: '' }
      },
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
      this.areas = await getActiveTables()
      await this.getUserInfo()
      this.selectUser = null
      this.clearAddressInfo()
      await this.getTableDetail()
      this.loading = false
    },
    async changeServant () {
      const res = await fastSweetAlertRequest('Zu andere Kneller übergabe', 'text',
        'Orders.php?op=changeServantForTable', 'pw',
        { tableId: this.tableId }, 'POST')
      if (res) {
        goHome()
      }
    },
    requestOutTable,
    popAuthorize,
    jumpToTable,
    toManage,
    openOrEnterTable,
    popChangeTablePanel,
    popMergeTablePanel,
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
    async getTableDetail () {
      const res = await hillo.silentGet('Tables.php', {
        op: 'currentInfo',
        id: this.tableId
      }, { noDebug: true })
      this.tableDetailInfo = Object.assign(this.tableDetailInfo, res.content)
      if (this.tableDetailInfo.order.rawAddressInfo) {
        const addressInfo = Object.assign({}, DefaultAddressInfo, JSON.parse(this.tableDetailInfo.order.rawAddressInfo))
        console.log(addressInfo)
        if (addressInfo) {
          this.rawAddressInfo = addressInfo
          if (addressInfo.tel) {
            this.selectUser = addressInfo.tel
          }
        }
      }
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
