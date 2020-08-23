<template>
    <v-app>
        <template v-cloak>
            <navgation>
                <template slot="left">
                    <v-app-bar-nav-icon class="primary v-btn--tile" @click="back">
                        <v-icon>mdi-home</v-icon>
                    </v-app-bar-nav-icon>
                    <v-tabs show-arrows
                            class="flex-shrink-1"
                            style="width: calc(100% - 500px)"
                            v-model="activeDCT"
                    >
                        <v-tab style="font-size: 16px">
                            Alle
                        </v-tab>
                        <template v-for="ct of dct">
                            <v-tab v-bind:key="ct.id+'categorytypes'"
                                   style="font-size: 16px"
                            >
                                <div class="font-weight-bold">{{ ct.name }}</div>
                            </v-tab>
                        </template>
                    </v-tabs>
                    <v-autocomplete
                            hide-details
                            auto-select-first
                            hide-no-data
                            class="mr-5"
                            :search-input.sync="input"
                            :items="autoHints"
                            prepend-inner-icon="mdi-magnify"
                            ref="ins"
                            v-model="buffer"
                    />
                </template>
                <template slot="right-slot">
                    <div class="d-flex align-center justify-space-between" style="min-width: 236px">
                        <span class="bigTableName">
                            {{ tableDetailInfo.tableBasicInfo.name }}
                        </span>

                        <div class="d-flex">

                            <span class="icon-line">
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
                    </div>

                </template>
                <template slot="after-menu">
                    <v-menu v-model="showTableList">
                        <template #activator="{on,attrs}">
                            <v-app-bar-nav-icon v-on="on" v-bind="attrs"/>
                        </template>
                        <v-card color="#f6f6f6" max-width="50vw">
                            <v-toolbar dense dark color="primary">
                                <div class="bigTableName mr-4">
                                    {{ tableDetailInfo.tableBasicInfo.name }}
                                </div>
                                <v-spacer/>
                                <v-toolbar-items>
                                    <v-btn @click="requestOutTable">
                                        <v-icon left>mdi-calendar-plus</v-icon>
                                        {{$t('开新单')}}
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
                                <v-menu
                                        v-model="menu"
                                        :close-on-content-click="false"
                                        :nudge-width="200"
                                        offset-x
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn
                                                icon
                                                color="white"
                                                v-bind="attrs"
                                                v-on="on"
                                        >
                                            <v-icon>mdi-map</v-icon>
                                        </v-btn>
                                    </template>

                                    <v-card>
                                        <v-list>
                                            <v-list-item>
                                            </v-list-item>
                                        </v-list>
                                        <v-divider></v-divider>
                                        <v-list>
                                            <v-list-item>
                                                <v-list-item-title>
                                                    {{ rawAddressInfo.firstName }} {{
                                                    rawAddressInfo.lastName
                                                    }}
                                                </v-list-item-title>
                                            </v-list-item>
                                            <v-list-item>
                                                <v-list-item-content>
                                                    <div> {{ rawAddressInfo.addressLine1 }}</div>
                                                    <div> {{ rawAddressInfo.addressline2 }}</div>
                                                    <div> {{ rawAddressInfo.city }} {{
                                                        rawAddressInfo.plz
                                                        }}
                                                    </div>
                                                    <div><span class="font-weight-bold">Email: </span>{{
                                                        rawAddressInfo.email
                                                        }}
                                                    </div>
                                                    <div><span class="font-weight-bold">Phone: </span>{{
                                                        rawAddressInfo.tel
                                                        }}
                                                    </div>
                                                    <span class="font-weight-bold">Lieferzeit: </span>
                                                    {{ rawAddressInfo.date }}
                                                    {{ rawAddressInfo.time }}
                                                    {{ rawAddressInfo.note }}
                                                    <div class="chip" v-show="rawAddressInfo.reason">
                                                        {{ rawAddressInfo.deliveryMethod }}
                                                    </div>
                                                    <div class="chip" v-show="rawAddressInfo.reason">
                                                        {{ rawAddressInfo.reason }}
                                                    </div>
                                                </v-list-item-content>
                                            </v-list-item>
                                        </v-list>

                                        <v-card-actions>
                                            <v-spacer></v-spacer>

                                            <v-btn text @click="menu = false">Cancel</v-btn>
                                            <v-btn color="primary" text @click="menu = false">Save
                                            </v-btn>
                                        </v-card-actions>
                                    </v-card>
                                </v-menu>
                                <v-icon>mdi-close</v-icon>
                            </v-toolbar>
                            <v-card-text>
                                <v-row>
                                    <v-col cols="6">
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
                                                        >/<span>{{ tableDetailInfo.order.counsumeTypeStatusName }}</span>
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
                                    <v-col cols="6">
                                        <div style="max-height:calc(100vh - 124px); overflow: hidden"
                                             class="collapse pa-2" v-dragscroll>
                                            <div v-cloak v-bind:key="'area'+area.areaName" v-for="area in areas"
                                                 class="area">
                                                <div class="areaTitle">{{ area.areaName }}</div>
                                                <div class="areaTableContainer">
                                                    <template v-for="(table) in area.tables">
                                                        <div :key="'table'+table.tableName">
                                                            <div v-if="table.usageStatus==='1'" class="tableCard"
                                                                 v-bind:class="{onCall:parseInt(table.callService)===1}"
                                                                 v-on:click='jumpToTable(table.tableId,table.tableName)'>
                                                                <div class="tableCardName tableBold">{{ table.tableName
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
                    </v-menu>
                </template>
            </navgation>
            <v-main>
                <div style="display: grid;
grid-template-columns: calc(100vw - 300px) 300px">
                    <v-card elevation="0" color="transparent" v-cloak
                            class="dishListContainer" id="dishListContainer">
                        <v-toolbar rounded dense>
                            <v-tabs
                                    center-active
                                    show-arrows
                                    v-model="activeCategory"
                            >
                                <v-tab style="font-size: 16px">
                                    Alle
                                </v-tab>
                                <template v-for="category of filteredC">
                                    <v-tab style="text-transform: capitalize" v-bind:key="'categorytypes'+category.id"
                                           :class="category.color" :style="{fontSize: '16px'}"
                                    >
                                        <div class="font-weight-bold">{{ category.name }}</div>
                                    </v-tab>
                                </template>
                            </v-tabs>
                        </v-toolbar>
                        <div v-dragscroll class="dragscroll dishCardListContainer">
                            <div class="dishCardList">
                                <template v-for="dish of filteredDish">
                                    <v-lazy :options="{threshold: .5}"
                                            min-height="108px"
                                            height="100%"
                                            :key="'dish'+dish.code">
                                        <div :class="dish.displayColor"
                                             class="dishBlock d-flex flex-column fill-height justify-space-between"
                                             @click.stop="orderOneDish(dish.code)">
                                            <div class="name">{{ dish.dishName }}</div>
                                            <div class="spaceBetween"
                                                 style="align-items: center;flex-wrap: wrap">
                                                <div class="code">
                                                    <span v-code-hide>{{ dish.code }}</span>
                                                    <span style="font-size: 16px;border-radius: 4px "
                                                          class=" px-2 mr-1 white--text red"
                                                          v-show="dish.count>0">{{ dish.count }}
                          </span>
                                                    <span class="red--text" v-if="dish.haveMod>0">*</span>
                                                </div>
                                                <div class="price d-flex align-center">
                                                    {{ dish.isFree === '1' ? 'Frei' : dish.price }}
                                                </div>
                                            </div>
                                        </div>
                                    </v-lazy>
                                </template>
                            </div>
                        </div>
                    </v-card>
                    <div class="ml-1 d-flex justify-space-between
                    flex-column fill-height">
                        <!--          菜品列表容器-->
                        <div>
                            <!--          菜品列表-->
                            <v-card v-dragscroll
                                    class="white">
                                <keep-alive>
                                    <dish-card-list
                                            :dish-list-model="orderListModel"
                                            :discount-ratio="discountRatio"
                                            :default-expand="cartListModel.list.length===0"
                                            :click-callback="addToSplit"
                                            :extra-height="'96px'"
                                            :title="$t('haveOrderedDish')"
                                    />
                                </keep-alive>
                            </v-card>
                            <!--          购物车-->
                            <v-card v-dragscroll
                                    v-show="cartListModel.list.length>0"
                                    class="white">
                                <dish-card-list
                                        ref="cartList"
                                        :show-number="true"
                                        :extra-height="'196px'"
                                        :color="'#707070'"
                                        :dish-list-model="cartListModel"
                                        :show-edit="true" :click-callback="removeDish"
                                        :title="$t('新增菜品')"
                                        :default-expand="Config.defaultExpand">
                                </dish-card-list>
                                <v-toolbar dense>
                                    <v-toolbar-items class="flex-grow-1 mx-n3">
                                        <v-btn @click="cartListModel.clear()" class="mr-1" color="error">
                                            <v-icon>
                                                mdi-trash-can
                                            </v-icon>
                                        </v-btn>
                                        <v-btn @click="orderDish(cartListModel.list,false)" class="mr-1" dark>
                                            <v-icon>mdi-printer-off</v-icon>
                                        </v-btn>
                                        <v-btn color="primary" class="flex-grow-1"
                                               @click="orderDish(cartListModel.list)" dark>
                                            <v-icon left>mdi-printer</v-icon>
                                            {{ $t('confirm') }}
                                        </v-btn>
                                    </v-toolbar-items>
                                </v-toolbar>
                            </v-card>
                        </div>
                        <v-card>
                            <v-toolbar dense>
                                <v-toolbar-items class="flex-grow-1 mx-n3">
                                    <template v-if="this.tableDetailInfo.order.consumeTypeStatusId<2">
                                        <v-btn @click="acceptOrder" dark color="error" class="flex-grow-1">{{$t('接受')}}
                                        </v-btn>
                                        <v-btn @click="rejectOrder">{{$t('拒绝')}}</v-btn>
                                    </template>
                                    <template v-else>
                                        <v-btn @click="insDecodeButtonList(3)">
                                            <v-icon>mdi-sale</v-icon>
                                            {{ $t('discount') }}
                                        </v-btn>
                                        <v-btn color="primary" dark class="flex-grow-1 ml-1"
                                               @click="insDecodeButtonList(6)">
                                            <v-icon left>mdi-calculator-variant</v-icon>
                                            {{ $t('payBill') }}
                                        </v-btn>
                                    </template>

                                </v-toolbar-items>
                            </v-toolbar>
                        </v-card>
                    </div>
                </div>
            </v-main>
            <template v-if="splitOrderListModel.list.length>0">
                <div class="bottomCart surface d-flex justify-end"
                     style="background: rgba(0,0,0,0.4);"
                     v-cloak
                     @click="removeAllFromSplitOrder"
                     id="splitOrderContainer">
                    <div @click.stop class="d-flex" style="max-width: 600px;width: 50vw">
                        <div class="pa-1 d-flex flex-column">
                            <v-btn x-large color="error" class=" mt-1 " @click="removeAllFromSplitOrder()">
                                <v-icon left>mdi-close-circle</v-icon>
                                {{ $t('cancel') }}
                            </v-btn>
                            <v-btn x-large class=" mt-1 " @click="needSplitOrder()">
                                <v-icon left>mdi-set-split</v-icon>
                                {{ $t('billSplit') }}
                            </v-btn>
                            <v-btn x-large class=" mt-1 "
                                   v-on:click="deleteDishes()">
                                <v-icon left>mdi-calendar-remove</v-icon>
                                {{ $t('dishCancel') }}
                            </v-btn>
                            <v-btn x-large class=" mt-1 "
                                   v-on:click="dishesSetDiscount()">
                                <v-icon left>mdi-sale</v-icon>
                                {{ $t('给菜品打折') }}
                            </v-btn>
                            <v-btn x-large class="  mt-1"
                                   v-on:click="dishesChangeTable()">
                                <v-icon left>mdi-inbox-arrow-up</v-icon>
                                {{ $t('tableChange') }}
                            </v-btn>
                        </div>
                        <dish-card-list
                                class="flex-grow-1"
                                extra-height="64px"
                                :discount-ratio="discountRatio"
                                :default-expand="true"
                                :dish-list-model="splitOrderListModel"
                                :click-callback="removeFromSplitOrder"
                                :title="$t('operation')"/>
                    </div>
                </div>
            </template>

            <ModificationDrawer
                    @visibility-changed="changeModification"
                    :modification-show="modificationShow"
                    :dish="dish"
                    :mod="submitModification"
            />
            <check-out-drawer
                    @visibility-changed="changeCheckOut"
                    :order="checkOutModel"
                    :check-out-type="checkOutType"
                    :table-id="id"
                    :discount-str="discountStr"
                    :discount-ratio="discountRatio"
                    :visible="checkoutShow"/>
        </template>
    </v-app>
</template>

<script>

import {
  blocking,
  blockReady,
  createOrEnterTable,
  fastSweetAlertRequest,
  findConsumeTypeById,
  getConsumeTypeList,
  isBlocking,
  jumpToTable,
  logError,
  logErrorAndPop,
  oldJumpTo,
  popAuthorize,
  requestOutTable,
  setGlobalTableId,
  showConfirmAsyn,
  showTimedAlert,
  Strings,
  toast
} from '../oldjs/common'
import { version } from './../../package.json'
import { getActiveTables, getOrderInfo } from 'aaden-base-model/lib/Models/AadenApi'
import Swal from 'sweetalert2'
import hillo from 'innerken-utils/Utlis/request'
import {
  checkOut,
  deleteDishes,
  dishesChangeTable,
  dishesSetDiscount,
  popChangeTablePanel,
  popDiscountPanel,
  popMergeTablePanel
} from '../oldjs/api'
import { dragscroll } from 'vue-dragscroll'
import DishCardList from '../components/DishCardList'
import ModificationDrawer from '../components/ModificationDrawer'
import { StandardDishesListFactory } from 'aaden-base-model/lib/Models/AadenBase'
import CheckOutDrawer from '../components/CheckOutDrawer'
import { findDish, getAllDishesWithCache, goHome } from '../oldjs/StaticModel'
import { addToTimerList, clearAllTimer } from '../oldjs/Timer'
import CategoryType from 'aaden-base-model/lib/Models/CategoryType'
import GlobalConfig from '../oldjs/LocalGlobalSettings'
import { IKUtils } from 'innerken-utils'
import Navgation from '../components/Navgation'
import CategoryColor from '../oldjs/CategoryColor'
import { debounce } from 'lodash-es'

const DefaultAddressInfo = {
  reason: ''
}

// endregion
export default {
  name: 'TablePage',
  directives: {
    dragscroll
  },
  components: { Navgation, CheckOutDrawer, ModificationDrawer, DishCardList },
  props: {
    id: {
      type: String
    },
    tableName: {
      type: String
    },
    refresh: {
      type: Number
    }
  },
  data: function () {
    return {
      loading: true,
      showTableList: null,
      leftDrawer: null,
      rightDrawer: null,
      menu: false,
      breakCount: 0,
      checkOutType: 'checkOut',
      checkOutModel: StandardDishesListFactory(),
      version: version,
      /**/
      discountRatio: 1,
      checkoutShow: false,
      discountStr: null,
      expand: GlobalConfig.defaultExpand,
      focusTimer: null,
      options: [],
      dishName: '',
      dish: {},
      count: 1,
      modificationShow: false,
      /**/
      dishes: [],
      staticDishes: [],
      categories: [],
      activeCategory: null,
      activeDCT: null,
      /**/
      takeawayInfoShow: false,
      rawAddressInfo: { reason: '' },
      /**/
      areas: [],
      Strings: Strings,
      Config: GlobalConfig,
      buffer: '',
      input: '',
      payment: [],
      //* */
      splitOrderListModel: StandardDishesListFactory(),
      orderListModel: StandardDishesListFactory(),
      cartListModel: StandardDishesListFactory(),
      cartOrder: [],
      tableDetailInfo: {
        order: { id: -1 },
        tableBasicInfo: { name: '' }
      },
      dct: [],
      filteredDish: [{ name: '', code: '', price: '', count: '' }]
    }
  },
  beforeDestroy () {
    this.goHomeCallBack()
  },
  methods: {
    popAuthorize,
    toManage () {
      oldJumpTo('admin/index.html', { DeviceId: GlobalConfig.DeviceId, lang: GlobalConfig.lang })
    },
    goHome () {
      this.goHomeCallBack()
      goHome()
    },
    goHomeCallBack () {
      clearAllTimer()
    },
    changeModification: function (val) {
      this.modificationShow = val
    },
    changeCheckOut: function (val) {
      this.checkoutShow = val
      this.initialUI()
    },
    async getOrderedDish () {
      try {
        if (this.splitOrderListModel.count() === 0 && this.cartListModel.count() === 0) {
          let discountRatio = 0
          const result = await getOrderInfo(this.id)
          const discountInfo = result.filter(r => r.code === '-1')
          const noDiscount = result.filter(r => r.code !== '-1')
          this.orderListModel.loadTTDishList(noDiscount)
          if (discountInfo.length > 0) {
            const [discount] = discountInfo
            discountRatio = Math.abs(parseFloat(discount.price)) / this.orderListModel.total()
          }
          this.discountRatio = discountRatio
        }
      } catch (e) {
        this.breakCount++
        if (this.breakCount > 1) {
          showTimedAlert(e)
          this.goHome()
        }
      }
    },
    async dishQuery (code, count = 1) {
      if (count < 1) {
        showTimedAlert('warning', this.$t('JSTableCodeNotFound'), 500)
        return
      }
      const dish = findDish(code)
      if (dish) {
        dish.name = dish.dishName
        dish.name = dish.name.length > 28
          ? dish.name.substr(0, 28) + '...' : dish.name
        if (dish.haveMod > 0) {
          this.showModification(dish, count)
          return
        }

        this.addDish(dish, parseInt(count))
      } else {
        showTimedAlert('warning', this.$t('JSTableCodeNotFound'), 500)
      }
      blockReady()
    },
    showModification (dish, count) {
      this.options = dish.modInfo
      this.dishName = dish.name
      this.dish = dish
      this.count = count
      if (!GlobalConfig.FMCVersion) {
        this.$refs.ins.blur()
      }
      this.modificationShow = true
    },
    async getDCT () {
      if (this.dct.length === 0) {
        this.dct = (await CategoryType.getList()).map(i => {
          if (!i.isActive) {
            i.isActive = false
          }
          return i
        })
      }
    },
    async getCategory () {
      if (this.categories.length === 0) {
        const res = await hillo.get('Category.php?op=withTableType', {
          tableId: this.id, lang: GlobalConfig.lang
        })
        for (const i of res.content) {
          if (!i.isActive) {
            i.isActive = false
          }
        }
        this.dishes = await getAllDishesWithCache()
        this.staticDishes = IKUtils.deepCopy(this.dishes)
        this.categories = res.content.filter(c => {
          return c.dishes.length > 0
        }).map((c, i) => {
          if (GlobalConfig.useColor) {
            c.color = CategoryColor[i % (CategoryColor.length - 1)]
          }
          return c
        })
        this.dishes = this.categories.reduce((arr, i) => {
          this.dishes.forEach(d => {
            if (parseInt(d.categoryId) === parseInt(i.id)) {
              d.displayColor = i.color
              arr.push(d)
            }
          })
          return arr
        }, [])
        this.cartListModel.setDishList(this.dishes)
      }
    },
    orderOneDish: function (code) {
      this.dishQuery(code)
    },
    readBuffer: function (clear = true) {
      const ins = this.buffer === '' ? this.input : this.buffer
      if (clear) {
        this.buffer = ''
        this.input = ''
      }
      return ins
    },
    requestOutTable,
    removeFromSplitOrder: function (index) {
      const realItem = IKUtils.deepCopy(this.splitOrderListModel.list[index])
      this.splitOrderListModel.add(realItem, -1)
      this.orderListModel.add(realItem, 1)
    },
    removeAllFromSplitOrder: function () {
      while (this.splitOrderListModel.list.length > 0) {
        this.removeFromSplitOrder(0)
      }
    },
    deleteDishes: function () {
      deleteDishes(this.id, this.splitOrderListModel.list, this.initialUI)
    },
    dishesSetDiscount: function () {
      dishesSetDiscount(this.tableDetailInfo.order.id, this.splitOrderListModel.list, this.initialUI)
    },
    dishesChangeTable: function () {
      dishesChangeTable(this.tableDetailInfo.tableBasicInfo.name, this.splitOrderListModel.list, this.initialUI)
    },
    addToSplit: function (index) {
      const item = IKUtils.deepCopy(this.orderListModel.list[index])
      if (item.code === '-1') {
        logErrorAndPop('折扣菜品不能被加入到分单里')
        return
      }
      this.orderListModel.add(item, -1)
      this.splitOrderListModel.add(item, 1)
    },
    addDish: async function (dish, count = 1) {
      if (dish.code.toLowerCase().includes('ea')) {
        dish.originPrice = (await Swal.fire({
          title: 'Bitte Preis Eingabe',
          input: 'number',
          inputAttributes: {
            min: 0,
            step: 0.01
          }
        })).value

        dish.price = dish.originPrice
        dish.forceFormat = true
      }
      if (!GlobalConfig.useCart) {
        this.orderDish([dish])
        return
      }
      setTimeout(() => {
        this.cartListModel.add(dish, count)
      }, 1)
    },
    clear: function () {
      this.cartListModel.clear()
    },
    findDishByCode: function (code) {
      for (const d of this.cartListModel.list) {
        if (d.code === code) {
          return this.cartListModel.list.indexOf(d)
        }
      }
      return -1
    },
    removeDish: function (index) {
      this.cartListModel.add(this.cartListModel.list[index], -1)
    },
    removeDishWithCode: function (code) {
      this.removeDish(this.findDishByCode(code))
    },
    submitModification: function (mod, dish, count) {
      const apply = []
      for (const i of dish.modInfo) {
        const item = { groupId: i.id }
        item.selectId = i.selectValue.filter((s, index) => {
          return [(mod[i.id] ?? [])].flat().includes(index)
        })
        if (i.required === '1' && item.selectId === '') {
          item.selectId = i.selectValue[0]
        }
        apply.push(item)
      }
      dish.apply = apply// here we add a apply
      dish.forceFormat = true
      mod = {}
      this.addDish(dish, count ?? parseInt(this.count))
      blockReady()
    },
    cancel: function () {
      this.modificationShow = false
      blockReady()
    },
    initialUI () {
      this.getTableDetail()
      this.cartListModel.clear()
      this.removeAllFromSplitOrder()
      blockReady()
    },
    back () {
      if (this.modificationShow) {
        this.cancel()
      } else if (this.checkoutShow) {
        this.checkoutShow = false
        this.initialUI()
      } else if (this.splitOrderListModel.list.length > 0) {
        this.removeAllFromSplitOrder()
      } else if (this.cartListModel.list.length > 0) {
        this.cartListModel.clear()
      } else {
        this.goHome()
      }
      blockReady()
    },
    insDecodeButtonList (i) {
      if (isBlocking()) {
        return
      }
      switch (i) {
        case 1: // 打单
          this.back()
          blockReady()
          break
        case 2: // 打单
          if (this.cartListModel.list.length > 0) {
            this.orderDish(this.cartListModel.list)
            blocking()
          } else {
            blockReady()
          }
          break
        case 3:
          popAuthorize('', () => popDiscountPanel(this.id, this.initialUI))
          break
        case 4:
          popAuthorize('', () => popChangeTablePanel(this.tableName, this.initialUI))
          break
        case 5:
          // 转台
          popAuthorize('', () => popMergeTablePanel(this.tableName, this.initialUI))
          break
        case 6:
          this.jumpToPayment()
          break
        case 7:
          if (GlobalConfig.checkOutUsePassword) {
            popAuthorize('', () => {
              this.checkOut()
            }, true)
          } else {
            this.checkOut()
          }
          break
        default:
      }
    },
    checkOut (print = 1, payMethod = 1, tipIncome = 0, memberCardId) {
      if (!memberCardId) {
        memberCardId = null
      }
      checkOut(this.id, print, payMethod, tipIncome, memberCardId)
    },
    jumpToTable: function (tableId, tableName) {
      this.goHomeCallBack()
      jumpToTable(tableId, tableName)
      this.initialUI()
    },
    needSplitOrder: async function () {
      const realEnd = async () => {
        this.checkoutShow = true
        this.checkOutModel.clear()
        this.checkOutModel.loadTTDishList(this.splitOrderListModel.list)
        this.checkOutType = 'splitOrder'
      }
      if (GlobalConfig.checkOutUsePassword) {
        popAuthorize('', async () => {
          await realEnd()
        }, true)
      } else {
        await realEnd()
      }
    },
    autoGetFocus () {
      if (this.modificationShow || this.checkoutShow) {
        return
      }
      if (Swal.isVisible()) {
        return
      }
      this.$nextTick(() => {
        this.$refs.ins.focus()
      })
    },
    async refreshTables () {
      this.areas = await getActiveTables()
    },
    async getTableDetail () {
      try {
        const res = await hillo.silentGet('Tables.php', {
          op: 'currentInfo',
          id: this.id
        }, { noDebug: true })
        this.tableDetailInfo = res.content
        this.tableDetailInfo.consumeTypeName = findConsumeTypeById(this.tableDetailInfo.consumeTypeId).name
        if (this.tableDetailInfo.order.rawAddressInfo) {
          const addressInfo = Object.assign(DefaultAddressInfo, JSON.parse(this.tableDetailInfo.order.rawAddressInfo))
          if (addressInfo) {
            this.rawAddressInfo = addressInfo
          }
        }
        if (this.tableDetailInfo.order.discountStr) {
          this.discountStr = this.tableDetailInfo.order.discountStr
        }
        this.getOrderedDish()
      } catch (e) {
        this.breakCount++
        if (this.breakCount > 2) {
          if (this.$route.name !== 'index') {
            showTimedAlert('info',
              this.$t('JSTableGetTableDetailFailed') + e.data?.info,
              1000, this.goHome)
          }
        } else {
          setTimeout(this.getTableDetail, 5000)
        }
      }
    },
    async acceptOrder () {
      await hillo.post('Orders.php?op=acceptTakeawayOrder', { tableId: this.id, reason: 'ok' })
      this.initialUI()
    },
    async rejectOrder () {
      const res = await fastSweetAlertRequest('Bitte ein Ground Eingabe', 'text',
        'Orders.php?op=rejectTakeAwayOrder', 'reason',
        { tableId: this.id })
      if (res) {
        this.goHome()
      }
    },
    listenKeyDown (e) {
      if (Swal.isVisible()) {
        return
      }
      switch (e.key) {
        case 'Escape':
          this.back()
          break
        case 'Enter':
          this.insDecode(this.readBuffer())
          break
      }
    },
    //* findInsDecode*/
    async insDecode (t) {
      if (isBlocking()) {
        return
      }
      if (t !== '' && t !== null) {
        if (t.startsWith('-') && t.length >= 2) {
          this.removeDishWithCode(t.substring(1))
          blockReady()
          return
        } else if (t.indexOf('*') !== -1) {
          const [code, count] = t.split('*')
          this.dishQuery(code, count)
          return
        } else if (t === '/rp') {
          hillo.post('Printer.php?op=questReprintOrder', {
            orderId: this.tableDetailInfo.order.id
          }).then(() => {
            toast()
            blockReady()
          })
        } else if (t === '/ps') {
          hillo.post('BackendData.php?op=reprintOrder', {
            id: this.tableDetailInfo.order.id,
            withTitle: 0,
            printCount: 1
          }).then(() => {
            toast()
            blockReady()
          })
        } else {
          this.dishQuery(t)
          return
        }
      } else {
        if (!this.checkoutShow && !this.modificationShow) {
          if (this.cartListModel.list.length > 0) {
            setTimeout(async () => {
              const res = await showConfirmAsyn('将购物车中的菜品加入订单?')
              if (res.value) {
                this.orderDish(this.cartListModel.list)
              }
              blockReady()
            }, 10)
            return
          } else {
            setTimeout(async () => {
              const res = await showConfirmAsyn('是否使用现金,0小费,普通账单结账?')
              if (res.value) {
                if (GlobalConfig.checkOutUsePassword) {
                  popAuthorize('', () => {
                    this.checkOut()
                  }, true)
                } else {
                  this.checkOut()
                }
              }
              blockReady()
            }, 10)
            return
            // checkOut();
          }
        }
      }
      blocking()
    },
    orderDish (order = this.cartListModel.list, print = true) {
      hillo.post('Complex.php?op=addDishesToTable', {
        params: JSON.stringify(order),
        tableId: this.id,
        printingKitchenBon: print ? 1 : 0
      }).then(() => {
        this.cartListModel.clear()
        this.initialUI()
        if (GlobalConfig.jumpToHomeWhenOrder) {
          this.goHome()
        }
      }).catch(res => {
        logError(this.$t('JSTableOrderFailed') + res.info)
      }).finally(() => {
        blockReady()
      })
    },
    jumpToPayment () {
      const realCheckOut = async () => {
        this.checkoutShow = true
        this.checkOutModel.loadTTDishList(this.orderListModel.list)
        this.checkOutType = 'checkOut'
        this.discountStr = ''
      }
      setTimeout(async () => {
        if (GlobalConfig.checkOutUsePassword) {
          popAuthorize('', async () => {
            await realCheckOut()
          }, true)
        } else {
          await realCheckOut()
        }
      }, 20)
    },
    createTable: createOrEnterTable,
    async realInitial () {
      await getConsumeTypeList()
      this.showTableList = false
      this.breakCount = 0
      window.onkeydown = this.listenKeyDown
      if (GlobalConfig.getFocus) {
        addToTimerList(setInterval(this.autoGetFocus, 1000))
      }
      this.getCategory()
      this.getDCT()
      setGlobalTableId(this.id)
      blockReady()
      this.initialUI()
    },
    updateFilteredDish () {
      this.debounce(() => {
        this.filteredDish = this.filterDish()
      })
    },
    debounce: debounce((f) => {
      f()
    }, 300),
    filterDish () {
      if (!(this.activeDCT || this.activeCategory || this.input)) {
        return this.dishes
      }
      let list = this.dishes
      if (this.activeDCT) {
        const dct = this.dct[this.activeDCT - 1]
        list = list.filter((item) => {
          return parseInt(item.dishesCategoryTypeId) === parseInt(dct.id)
        })
      }
      if (this.activeCategory) {
        const c = this.filteredC[this.activeCategory - 1]
        list = list.filter((item) => {
          return parseInt(item.categoryId) === parseInt(c.id)
        })
      }
      if (this.Config.dishLookUp) {
        if (this.input) {
          if (this.input !== '' && !this.input.includes('/')) {
            const [buffer] = this.input.split('*')
            return list.filter((item) => {
              return item.dishName.includes(buffer) ||
                  item.code.includes(buffer.toLowerCase()) ||
                  item.code.includes(buffer.toUpperCase())
            })
          }
        }
      }

      return list
    }
  },
  computed: {
    autoHints: function () {
      let availableIns = []
      if (this.input) {
        availableIns = availableIns.concat([
          { value: '/', text: '/ Advanced instruction' },
          { value: '/rp', text: '/rp ReprintOrder' },
          { value: '/ps', text: '/ps PrintZwichenBon' }
        ])
        availableIns = availableIns.concat(this.dishesHint.normal.filter(f => f.value.startsWith(this.input)))
        if (this.input.startsWith('-')) {
          availableIns = availableIns.concat(this.dishesHint.remove)
        }
        if (this.input.includes('*')) {
          const [code, count] = this.input.split('*')
          const findDish = this.staticDishes.filter(f => {
            return f.code.startsWith(code)
          })
          if (findDish) {
            availableIns = availableIns.concat(findDish.map(d => ({
              value: this.input,
              text: this.input + ' ' + d.code + ' ' +
                d.dishName + ' x ' + (count || '[1-99]')
            })))
          }
        }
      }

      return availableIns
    },
    dishesHint: function () {
      const dishesHint = {}
      dishesHint.normal = this.staticDishes.map(i => ({
        value: i.code,
        text: i.code + ' ' + i.dishName
      }))
      dishesHint.remove = this.staticDishes.map(i => ({
        value: '-' + i.code,
        text: '-' + i.code + ' remove: ' + i.dishName
      }))
      return dishesHint
    },
    filteredC: function () {
      if (this.activeDCT) {
        const dct = this.dct[this.activeDCT - 1]
        return this.categories.filter((item) => {
          return parseInt(item.dishesCategoryTypeId) === parseInt(dct.id)
        })
      }
      return this.categories
    }
  },
  watch: {
    showTableList: function () {
      this.refreshTables()
    },
    activeDCT: function () {
      this.activeCategory = 0
      this.updateFilteredDish()
    },
    dishes: function () {
      this.updateFilteredDish()
    },
    activeCategory: function () {
      this.updateFilteredDish()
    },
    input: function () {
      this.updateFilteredDish()
    },
    refresh: function (val) {
      this.realInitial()
    }
  },
  async created () {
    this.Config = GlobalConfig
    this.realInitial()
  }
}
</script>

<style scoped>

    ::-webkit-scrollbar {
        height: 80%;
        margin-top: 20%;
        width: 6px;
    }

    ::-webkit-scrollbar-thumb {
        background: url("/Resources/点餐/菜菜单窗口的拖拽键@2x.png") top / contain no-repeat;
        width: 6px;
        cursor: pointer;
        height: 56px;

    }

    ::-webkit-scrollbar-track {
        width: 10px;
    }

    .collapse .areaC {
        flex-grow: 1;
        width: 100%;
        height: 100%;
        padding: 12px 0;
    }

    .spaceBetween {
        display: flex;
        justify-content: space-between;
    }

    th {
        font-weight: 600;
        font-size: 16px;
    }

    td {
        color: #4b4b4b;
        font-size: 18px;
    }

    td, th {
        padding: 8px 4px;
    }

    tr:hover {
        background: #f8f8f8;
    }

    .smallTableBody > tr {
        border-bottom-width: 0.2px;
    }

    .smallTableBody > tr > td {
        padding: 0 6px;
    }

    .dishListContainer {
        margin-left: 4px;
        max-height: calc(100vh);
    }

    .input-field > label {
        font-size: 14px;
    }

    .dishCardList {
        padding-top: 12px;
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-auto-rows: 108px;
        margin-bottom: 120px;
        width: 100%;
        grid-gap: 6px;
    }

    @media screen and (max-width: 1600px ) {
        .dishCardList {
            grid-template-columns: repeat(6, 1fr);
        }
    }

    @media screen and (max-width: 1200px ) {
        .dishCardList {
            grid-template-columns: repeat(5, 1fr);
        }
    }

    @media screen and (max-width: 1000px ) {
        .dishCardList {
            grid-template-columns: repeat(4, 1fr);
        }
    }

    @media screen and (max-width: 700px ) {
        .dishCardList {
            grid-template-columns: repeat(3, 1fr);
        }
    }

    .dishBlock {
        cursor: pointer;
        padding: 5px 12px;
        background: white;
    }

    .dishBlock .code {
        font-size: 18px;
        font-weight: bold;
    }

    .dishBlock .price {
        font-size: 18px;
    }

    .dishBlock .name {
        margin-top: 8px;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        width: 100%;
        font-size: 18px;
        font-weight: 600;
        overflow: hidden;
        word-break: break-word;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;

    }

    .dragscroll {
        overflow-x: hidden;
    }

    .dishCardListContainer {
        background: #f6f6f6;
        width: 100%;
        height: calc(100vh - 96px);
    }

    .bottomCart {
        position: fixed;
        width: calc(100vw - 304px);
        height: 100vh;
    }

    #splitOrderContainer {
        top: 0;
        right: 304px;
        z-index: 5;
    }

    .ikButton {
        background: white;
        padding: 8px 12px;
        cursor: pointer;
        box-shadow: 0 3px 6px rgba(0, 25, 244, 0.1);
        color: black;
        font-size: 18px;
        width: 100%;
        font-weight: bold;
        border-radius: 5px;
    }

    .ikButton:focus {
        background: #367aeb;
        color: white;
    }

    .ikButton:active {
        background: #367aeb;
        color: white;
    }

    .bigTableName {
        white-space: nowrap;
        font-size: 36px;
        font-weight: bold;
    }

    .icon-line {
        display: flex;
        align-items: center;
        font-size: 18px;
    }

</style>
