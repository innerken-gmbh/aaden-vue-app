<template>
  <v-dialog :disable-keys="true" :close-on-content-click="false" offset-y v-model="menuShow">
    <v-card color="#f6f6f6" min-width="400px" max-width="100vw">
      <v-toolbar dense dark color="primary">
        <div class="bigTableName mr-4">
          {{ tableDetailInfo.tableBasicInfo.name }}
        </div>
        <v-spacer/>
        <v-toolbar-items>
          <v-btn @click="requestOutTable">
            <v-icon left>mdi-calendar-plus</v-icon>
            {{ $t('开新单') }}
          </v-btn>
        </v-toolbar-items>
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
          <v-btn @click="menuShow=false">
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
                    <v-text-field readonly disabled label="电话" autocomlete="off"
                                  type="search" v-model="rawAddressInfo.tel"></v-text-field>
                    <v-text-field hide-details autocomlete="off"
                                  type="search" label="名" v-model="rawAddressInfo.firstName"></v-text-field>
                    <v-text-field hide-details autocomlete="off"
                                  type="search" label="姓" v-model="rawAddressInfo.lastName"></v-text-field>
                    <v-text-field label="地址行1" autocomlete="off"
                                  type="search" v-model="rawAddressInfo.addressLine1"></v-text-field>
                    <v-text-field label="地址行2" autocomlete="off"
                                  type="search" v-model="rawAddressInfo.addressline2"></v-text-field>
                    <v-text-field label="城市" autocomlete="off"
                                  type="search" v-model="rawAddressInfo.city"></v-text-field>
                    <v-text-field label="邮编" autocomlete="off"
                                  type="search" v-model="rawAddressInfo.plz"></v-text-field>
                    <v-text-field label="邮箱" autocomlete="off"
                                  type="search" v-model="rawAddressInfo.email"></v-text-field>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-card-actions>
                <v-btn v-if="userIsNew" @click="submitNewUserInfo" color="success">新增用户</v-btn>
                <v-btn v-else @click="updateUserInfo" color="warning">更新用户</v-btn>
              </v-card-actions>
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
                        label="电话查找"
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
                        placeholder="地址搜索"
                        clearable
                        :component-restrictions="
                                Config.autoCompletePLZ.split(',').length>0?
                                {
                              postalCode:
                                Config.autoCompletePLZ.split(',')
                            }
                            :
                            {postalCode: false}"
                        v-on:placechanged="getAddressData"
                    />
                    <v-text-field label="日期" v-model="rawAddressInfo.date"></v-text-field>
                    <v-text-field label="时间" v-model="rawAddressInfo.time"></v-text-field>
                    <v-text-field label="备注" v-model="rawAddressInfo.note"></v-text-field>
                    <v-text-field label="配送方式" v-model="rawAddressInfo.deliveryMethod"></v-text-field>
                    <div class="chip" v-show="rawAddressInfo.reason">
                      {{ rawAddressInfo.reason }}
                    </div>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
              <v-card-actions>
                <v-btn @click="clearAddressInfo" color="error">取消</v-btn>
                <v-btn @click="submitRawAddressInfo" color="primary">提交</v-btn>
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
                                                        <span>{{ tableDetailInfo.consumeTypeName }}</span
                                                        >/<span>{{
                        tableDetailInfo.order.counsumeTypeStatusName
                      }}</span>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>

                <v-list-item @click="insDecodeButtonList(1)">
                  <v-list-item-icon>
                    <v-icon>mdi-arrow-left</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ $t('backToHome') }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="popAuthorize('boss',toManage)">
                  <v-list-item-icon>
                    <v-icon>mdi-home-analytics</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ $t('Chef') }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="insDecodeButtonList(4)">
                  <v-list-item-icon>
                    <v-icon>mdi-swap-horizontal</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ $t('tableChange') }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item @click="insDecodeButtonList(5)">
                  <v-list-item-icon>
                    <v-icon>mdi-merge</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content>
                    <v-list-item-title>{{ $t('tableMerge') }}</v-list-item-title>
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
                      <div v-else @click="createTable(table.tableName)"
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
    </v-card>
  </v-dialog>
</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import hillo from 'innerken-utils/Utlis/request'
import { requestOutTable, toast } from '@/oldjs/common'

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
  props: {
    menuShow: {
      type: Boolean,
      default: false
    },
    tableDetailInfo: {
      type: Object,
      default: () => ({
        order: { id: -1 },
        tableBasicInfo: { name: '' }
      })
    },
    rawAddressInfo: {
      type: Object,
      default: () => DefaultAddressInfo
    },
    areas: {
      type: Array,
      default: () => []
    }
  },
  data: function () {
    return {
      Config: GlobalConfig,
      selectUser: null,
      userInfo: []
    }
  },
  methods: {
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
      this.menuShow = false
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
