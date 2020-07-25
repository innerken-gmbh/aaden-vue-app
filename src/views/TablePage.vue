<template>
    <v-app class="transparent">
        <main class="main" style="margin-top: 0">
            <div class="center-panel" id="mainTableContainer" v-cloak>
                <transition name="fade">
                    <div class="panel" v-if="!loading">
                        <dish-card-list
                                :default-expand="true"
                                :orders="orderListModel.list"
                                :click-callback="addToSplit"
                                :title="findInString('haveOrderedDish')"
                        />
                    </div>
                </transition>
            </div>
            <v-card :elevation="0" color="transparent" v-cloak class="dishListContainer" id="dishListContainer">
                <v-toolbar rounded dense>
                    <v-tabs
                            background-color="black"
                            dark
                            grow
                            center-active
                            show-arrows
                            v-model="activeDCT"
                    >
                        <v-tab style="font-size: 16px">
                            Alle
                        </v-tab>
                        <template v-for="ct of dct">
                            <v-tab v-bind:key="ct.id+'categorytypes'"
                                   style="font-size: 16px"
                            >
                                <div class="font-weight-bold">{{ct.name}}</div>
                            </v-tab>
                        </template>
                    </v-tabs>
                </v-toolbar>
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
                            <v-tab v-bind:key="category.id+'categorytypes'"
                                   style="font-size: 16px"
                            >
                                <div class="font-weight-bold">{{category.name}}</div>
                            </v-tab>
                        </template>
                    </v-tabs>
                </v-toolbar>
                <div v-dragscroll class="dragscroll dishCardListContainer">
                    <div class="dishCardList">
                        <template v-for="dish of filteredDish">
                            <v-card :key="'dish'+dish.code" class="dishBlock" @click="orderOneDish(dish.code)">
                                <div class="spaceBetween" style="align-items: center">
                                    <div class="code">{{dish.code}}<span class="red--text"
                                                                         v-if="dish.haveMod>0">*</span>
                                    </div>
                                    <div class="price">{{dish.isFree==='1'?'Frei':dish.price}}</div>
                                </div>
                                <div class="name">{{dish.dishName}}</div>
                            </v-card>
                        </template>
                    </div>
                </div>
            </v-card>

            <div :style="{width:Config.isPMCVersion?'340px':'280px'}" class="panelF">
                <v-card style="z-index: 1" class="infoPanel shadowForInsPanel">
                    <v-toolbar tile dense :color="'#367aeb'" style="color: white">
                        <div class="bigTableName z-depth-2">{{tableName}}</div>
                        <v-spacer></v-spacer>
                        <div class="d-flex">
                            <span v-hide-quick-buy class="icon-line">
                                <v-icon color="white">mdi-account-outline</v-icon>
                                <span class="ml-1 S_personCount"></span>
                            </span>
                            <span class="icon-line ml-2">
                                <v-icon color="white">mdi-calendar-text</v-icon>
                                <span class="ml-1 S_orderNumber"></span>
                            </span>
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
                                                {{ rawAddressInfo.firstName }} {{ rawAddressInfo.lastName }}
                                            </v-list-item-title>
                                        </v-list-item>
                                        <v-list-item>
                                            <v-list-item-content>
                                                <div> {{ rawAddressInfo.addressLine1 }}</div>
                                                <div> {{ rawAddressInfo.addressline2 }}</div>
                                                <div> {{ rawAddressInfo.city }} {{ rawAddressInfo.plz }}</div>
                                                <div><span class="font-weight-bold">Email: </span>{{
                                                    rawAddressInfo.email }}
                                                </div>
                                                <div><span class="font-weight-bold">Phone: </span>{{ rawAddressInfo.tel
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
                                        <v-btn color="primary" text @click="menu = false">Save</v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-menu>

                        </div>
                    </v-toolbar>
                    <div class="pa-3">
                        <div v-hide-quick-buy class="spaceBetween">
                            <div class="verticalInfoRowLabel S_tableInfoLabelTime"></div>
                            <div class="verticalInfoRowText">{{tableDetailInfo.createTimestamp}}</div>
                        </div>
                        <div v-hide-quick-buy class="mt-1 spaceBetween">
                            <div class="verticalInfoRowLabel S_tableInfoLabelSeat"></div>
                            <div class="verticalInfoRowText">{{tableDetailInfo.satCount}}</div>
                        </div>
                        <div v-hide-quick-buy class="mt-1 typeLabel">
                            <span class="S_type"> </span>/<span class="S_servantName"> </span>
                        </div>

                        <div class="d-flex justify-space-between align-center">
                            <div>
                                <v-icon color="black" x-large>mdi-currency-usd</v-icon>
                            </div>
                            <div class="verticalInfoRow">
                                <div v-cloak class="verticalInfoRowBigText">
                                    {{calculateOrderTableTotal()}}
                                </div>
                            </div>
                        </div>

                    </div>

                </v-card>
                <div v-cloak class="collapse areaC dragscroll flex-grow-1" v-dragscroll id="areaC">
                    <div v-cloak v-bind:key="'area'+area.areaName" v-for="area in areas" class="area">
                        <div class="areaTitle">{{area.areaName}}</div>
                        <div class="areaTableContainer">
                            <template v-for="(table,index) in area.tables">
                                <div :key="'table'+table.tableName+'i'+index">
                                    <div v-if="table.usageStatus==='1'" class="tableCard"
                                         v-bind:class="{onCall:parseInt(table.callService)===1}"
                                         v-on:click='jumpToTable(table.tableId,table.tableName)'>
                                        <div class="tableCardName tableBold">{{table.tableName}}</div>
                                    </div>
                                    <div v-else @click="createTable(table.tableName)" class="tableCard notUsed">
                                        <div class="tableCardName">
                                            {{table.tableName}}
                                        </div>
                                    </div>
                                </div>
                            </template>
                            <div @click="
requestOutTable" class="tableCard" style="border: 1px dotted #367aeb;background: transparent">
                                <div class="tableCardName">
                                    <v-icon color="#367aeb">mdi-plus</v-icon>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="z-index: 1;" class="insPanel surface">
                    <div class="hintPanel">
                        <div class="left-panel">
                            <div class="floatMenuPanel" id="listOfFunction">
                                <div v-show-quick-buy class="floatMenuPanelItem valign-wrapper"
                                     @click="toManage()">
                                    <div class="innerItem">
                                        <div class="icon"><i class="material-icons">arrow_back</i></div>
                                        <div class="text">CHEF</div>
                                    </div>
                                </div>
                                <div v-hide-quick-buy class="floatMenuPanelItem valign-wrapper"
                                     @click="insDecodeButtonList(1)">
                                    <div class="innerItem">
                                        <div class="icon"><i class="material-icons">arrow_back</i></div>
                                        <div class="text S_backToHome"></div>
                                    </div>
                                </div>
                                <div v-hide-quick-buy class="floatMenuPanelItem valign-wrapper"
                                     @click="insDecodeButtonList(2)">
                                    <div class="innerItem">
                                        <div class="icon"><i class="material-icons">restaurant</i></div>
                                        <div class="text S_dishOrder"></div>
                                    </div>
                                </div>
                                <div class="floatMenuPanelItem valign-wrapper" @click="insDecodeButtonList(3)">
                                    <div class="innerItem" style="">
                                        <div class="icon"><i class="material-icons">local_offer</i></div>
                                        <div class="text S_discount"></div>
                                    </div>
                                </div>

                                <div v-hide-quick-buy class="floatMenuPanelItem valign-wrapper"
                                     @click="insDecodeButtonList(4)">
                                    <div class="innerItem">
                                        <div class="icon"><i class="material-icons">swap_horiz</i></div>
                                        <div class="text S_tableChange"></div>
                                    </div>
                                </div>
                                <div v-hide-quick-buy class="floatMenuPanelItem valign-wrapper"
                                     @click="insDecodeButtonList(5)">
                                    <div class="innerItem">
                                        <div class="icon"><i class="material-icons">merge_type</i></div>
                                        <div class="text S_tableMerge"></div>
                                    </div>
                                </div>

                                <div class="floatMenuPanelItem valign-wrapper" @click="insDecodeButtonList(6)">
                                    <div class="innerItem">
                                        <div class="icon"><i class="material-icons">account_balance_wallet</i></div>
                                        <div class="text S_payBill"></div>
                                    </div>

                                </div>
                                <div v-hide-quick-buy class="floatMenuPanelItem valign-wrapper"
                                     @click="insDecodeButtonList(7)">
                                    <div class="innerItem">
                                        <div class="icon"><i class="material-icons">assignment_turned_in</i></div>
                                        <div class="text S_QuickBill"></div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                    <div v-hide-quick-buy class="inputArea">
                        <div class="input-field ">
                            <v-text-field ref="ins" color="black" v-model="buffer"
                                          placeholder="instruction.." id="instruction"
                                          autofocus=autofocus></v-text-field>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <transition name="fade" appear>
            <v-card style="box-shadow: -5px 0px 8px #bfbfbf" v-dragscroll v-if="cartListModel.list.length>0"
                    class="white bottomCart surface"
                    :style="{top:Config.FMCVersion?'0':'unset',
                    bottom:!Config.FMCVersion?'unset':'0'}"
                    id="newDishContainer">
                <dish-card-list
                        :extra-height="'64px'"
                        :color="'#707070'"
                        :show-edit="true" :click-callback="removeDish"
                        :orders="cartListModel.list"
                        :default-expand="Config.defaultExpand">
                    <template v-slot:after-title="af">
                        <div v-if="af" class="lastDish">
                                  <span class="lastDishName"
                                  >{{lastDish.name}}</span>
                            &times;{{lastCount}}
                        </div>
                    </template>
                </dish-card-list>
                <v-toolbar dense>
                    <v-btn @click="cartListModel.clear()" dark color="error">取消</v-btn>
                    <v-btn class="flex-grow-1" @click="orderDish" dark color="#367aeb">确认</v-btn>
                </v-toolbar>

            </v-card>
        </transition>
        <transition appear name="fade">
            <div v-show="splitOrderListModel.list.length>0" class="bottomCart surface" style="background: #f5f6fa;"
                 v-cloak
                 id="splitOrderContainer">
                <dish-card-list :default-expand="true" :orders="splitOrderListModel.list"
                                :click-callback="removeFromSplitOrder"
                                :title="findInString('operation')"/>
                <div class="spaceBetween pa-2">
                    <div></div>
                    <div style="display: flex;align-items: center">
                        <a class="ikButton ml-1 red white--text waves-effect waves-light S_cancel"
                           v-on:click="removeAllFromSplitOrder()">取消</a>
                        <a class="ikButton ml-1 waves-effect waves-light S_billSplit"
                           v-on:click="needSplitOrder()">分单</a>
                        <a class="ikButton ml-1 waves-effect waves-light S_dishCancel"
                           v-on:click="deleteDishes()">退菜</a>
                        <a class="ikButton ml-1 waves-effect waves-light S_tableChange"
                           v-on:click="dishesChangeTable()">换桌</a>
                    </div>

                </div>
            </div>
        </transition>
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
                :visible="checkoutShow"/>
    </v-app>
</template>

<script>

import {
  AssginToStringClass,
  blocking,
  blockReady,
  createOrEnterTable,
  fastSweetAlertRequest,
  findConsumeTypeById,
  findElement,
  findInString,
  getConfig,
  getConsumeTypeList,
  getData,
  goodRequest,
  isBlocking,
  jumpToTable,
  logError,
  logErrorAndPop,
  oldJumpTo,
  popAuthorize,
  remove,
  requestOutTable,
  resolveBestIP,
  setGlobalTableId,
  showConfirm,
  showLoading,
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
  popChangeTablePanel,
  popDiscountPanel,
  popMergeTablePanel
} from '../oldjs/api'
import { dragscroll } from 'vue-dragscroll'
import DishCardList from '../components/DishCardList'
import ModificationDrawer from '../components/ModificationDrawer'
import { StandardDishesListFactory } from 'aaden-base-model/lib/Models/AadenBase'
import CheckOutDrawer from '../components/CheckOutDrawer'
import { getAllDishesWithCache, goHome } from '../oldjs/StaticModel'
import { addToTimerList, clearAllTimer } from '../oldjs/Timer'
import CategoryType from 'aaden-base-model/lib/Models/CategoryType'
import GlobalConfig from '../oldjs/LocalGlobalSettings'

const UIState = {
  Init: 0,
  commandShow: 5,
  OnList: 3
}
let UIStatus = UIState.Init

const DefaultAddressInfo = {
  reason: ''
}
let listIndex = -1
let OrderId = -1

// endregion
export default {
  name: 'TablePage',
  directives: {
    dragscroll
  },
  components: { CheckOutDrawer, ModificationDrawer, DishCardList },
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
      menu: false,
      loading: true,
      breakCount: 0,
      checkOutType: 'checkOut',
      checkOutModel: StandardDishesListFactory(),
      version: version,
      /**/
      checkoutShow: false,
      discountStr: null,
      expand: getConfig().defaultExpand,
      lastDish: { name: '' },
      lastCount: 0,
      focusTimer: null,
      options: [],
      dishName: '',
      dish: {},
      count: 1,
      modificationShow: false,
      /**/
      dishes: [],
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
      payment: [],
      //* */
      splitOrderListModel: StandardDishesListFactory(),
      orderListModel: StandardDishesListFactory(),
      cartListModel: StandardDishesListFactory(),
      cartOrder: [],
      tableDetailInfo: {},
      dct: []
    }
  },
  beforeDestroy () {
    this.goHomeCallBack()
  },
  methods: {
    toManage () {
      popAuthorize('', oldJumpTo('admin/index.html', GlobalConfig))
    },
    goHome () {
      this.goHomeCallBack()
      goHome()
    },
    goHomeCallBack () {
      clearAllTimer()
      this.loading = true
    },
    changeModification: function (val) {
      this.modificationShow = val
    },
    changeCheckOut: function (val) {
      console.log(val)
      this.checkoutShow = val
      this.initialUI()
    },
    findInString,
    async getOrderedDish () {
      try {
        let discountRatio = 1
        if (this.splitOrderListModel.count() === 0) {
          const result = await getOrderInfo(this.id)
          const discountInfo = result.filter(r => r.code === '-1')
          this.orderListModel.loadTTDishList(result)
          if (discountInfo.length > 0) {
            const [discount] = discountInfo
            discountRatio = Math.abs(parseFloat(discount.price)) / (
              this.orderListModel.total() + Math.abs(parseFloat(discount.price))
            )
          }
        }
        console.log(discountRatio)
        this.loading = false
      } catch (e) {
        this.breakCount++
        if (this.breakCount > 1) {
          showTimedAlert(e)
          this.goHome()
        }
      }
    },
    dishQuery (code, count = 1) {
      const dish = this.dishes.find(d => d.code.toLowerCase() === code.toLowerCase())
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
        showTimedAlert('warning', findInString('JSTableCodeNotFound'), 500)
      }
      blockReady()
    },
    showModification (dish, count) {
      this.options = dish.modInfo
      this.dishName = dish.name
      this.dish = dish
      this.count = count
      UIStatus = UIState.commandShow
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
        this.categories = res.content
        this.dishes = await getAllDishesWithCache()
      }
    },
    orderOneDish: function (code) {
      this.dishQuery(code)
    },
    readBuffer: function (clear = true) {
      const ins = this.buffer
      if (clear) {
        this.buffer = ''
      }
      return ins
    },

    requestOutTable,
    removeFromSplitOrder: function (index) {
      const realItem = this.splitOrderListModel.list[index]
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
    dishesChangeTable: function () {
      dishesChangeTable(this.tableName, this.splitOrderListModel.list, this.initialUI)
    },
    calculateOrderTableTotal: function () {
      let totalPrice = 0
      for (const a of this.orderListModel.list) {
        a.totalPrice = parseFloat(a.totalPrice).toFixed(2)
        totalPrice += parseFloat(a.totalPrice)
      }
      return totalPrice.toFixed(2)
    },
    addToSplit: function (index) {
      const item = this.orderListModel.list[index]
      if (item.code === '-1') {
        logErrorAndPop('折扣菜品不能被加入到分单里')
        return
      }
      this.orderListModel.add(item, -1)
      this.splitOrderListModel.add(item, 1)
    },
    addDish: function (dish, count = 1) {
      dish.count = count
      this.cartListModel.add(dish, count)
      this.lastDish = dish
      this.lastCount = count
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
      remove(this.cartListModel.list, index)
    },
    removeDishWithCode: function (code) {
      remove(this.cartListModel.list, this.findDishByCode(code))
    },
    submitModification: function (mod, dish) {
      const apply = []
      for (const i of dish.modInfo) {
        const item = {}
        item.groupId = i.id
        item.selectId = i.selectValue.filter((s, index) => {
          return [(mod[i.id] ?? [])].flat().includes(index)
        })
        if (i.required === '1' && item.selectId === '') {
          item.selectId = i.selectValue[0]
        }
        apply.push(item)
      }
      dish.apply = apply
      mod = {}
      this.addDish(dish, parseInt(this.count))
      UIStatus = UIState.Init
      blockReady()
    },
    cancel: function () {
      this.modificationShow = false
      UIStatus = UIState.Init
      blockReady()
    },
    initialUI () {
      this.resetList()
      UIStatus = UIState.Init
      listIndex = -1
      this.cartListModel.clear()
      this.removeAllFromSplitOrder()
      this.getTableDetail()
      // getOrderedDish();
      blockReady()
    },
    back () {
      if (listIndex > -1) {
        this.resetList()
        listIndex = -1
        UIStatus = UIState.Init
        if (!GlobalConfig.FMCVersion) {
          this.$refs.ins.focus()
        }
      } else if (this.modificationShow) {
        this.cancel()
      } else if (this.splitOrderListModel.list.length > 0) {
        this.removeAllFromSplitOrder()
      } else if (this.cartListModel.list.length > 0) {
        this.cartListModel.clear()
      } else if (UIStatus === UIState.Init) {
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
            this.orderDish()
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
      if (UIStatus !== UIState.Init) {
        return
      }
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
    getTableDetail () {
      getData(GlobalConfig.PHPROOT + 'Tables.php', {
        op: 'currentInfo',
        id: this.id
      }).then(res => {
        if (goodRequest(res)) {
          const infos = res.content
          this.tableDetailInfo = infos
          AssginToStringClass('seatTimes', infos.satCount)
          AssginToStringClass('servantName', infos.order.counsumeTypeStatusName)
          OrderId = infos.order.id
          AssginToStringClass('orderNumber', infos.order.id)
          AssginToStringClass('type', findConsumeTypeById(infos.consumeTypeId).name)
          AssginToStringClass('startTime', infos.createTimestamp)
          AssginToStringClass('personCount', infos.personCount)
          let addressInfo = null
          if (infos.order.rawAddressInfo) {
            addressInfo = Object.assign(DefaultAddressInfo, JSON.parse(infos.order.rawAddressInfo))
            if (addressInfo) {
              this.rawAddressInfo = addressInfo
            }
          }
          if (infos.order.discountStr) {
            this.discountStr = infos.order.discountStr
          }
          if (!Swal.isVisible() && parseInt(infos.order.consumeTypeStatusId) < 2) {
            // 'renderAddress(addressInfo)'
            const confirmHtml = ''
            showConfirm(confirmHtml, () => {
              fastSweetAlertRequest('请输入可以完成的时间，该时间会被客户收到', 'text',
                'Orders.php?op=acceptTakeawayOrder', 'reason',
                { tableId: this.id })
            },
            () => {
              fastSweetAlertRequest('请输入拒绝接单的理由', 'text',
                'Orders.php?op=rejectTakeAwayOrder', 'reason',
                { tableId: this.id })
            }, '是否接下此单？'
            )
          }
          this.getOrderedDish()
        } else {
          this.breakCount++
          console.log(this.breakCount)
          if (this.breakCount > 2) {
            if (!Swal.isVisible()) {
              showTimedAlert('info',
                findInString('JSTableGetTableDetailFailed') + res.info,
                1000, this.goHome)
            }
          }
        }
      })
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
          if (listIndex > -1) {
            this.insDecodeButtonList(listIndex)
            break
          }
          this.insDecode(this.readBuffer())
          break
        case 'ArrowUp':
          if (UIStatus === UIState.OnList) {
            this.moveIndex(-1)
          }
          break
        // eslint-disable-next-line no-lone-blocks
        case 'ArrowDown':
          if (UIStatus === UIState.OnList) {
            this.moveIndex(1)
          }
          break
      }
    },
    moveIndex (i) {
      if (listIndex === 0 && i === -1) {
        this.highLight(this.getButtonList().length - 1)
        return
      }
      if ((listIndex === this.getButtonList().length - 1) && i === 1) {
        this.highLight(0)
        return
      }
      if (listIndex !== -1) {
        this.highLight(listIndex + i)
      }
    },
    highLight (index) {
      UIStatus = UIState.OnList
      listIndex = index
      this.resetList()
      this.$refs.ins.blur()
      this.getButtonList()[index].classList.add('focus')
      this.getButtonList()[index].classList.remove('normal')
      this.getButtonList()[index].focus()
    },
    insDecode (t) {
      if (isBlocking()) {
        return
      }
      if (t !== '') {
        console.log('inputting time', t)
        if (t.startsWith('-') && t.length >= 2) {
          this.removeDishWithCode(t.substring(1))
          blockReady()
          return
        } else if (t.indexOf('*') !== -1) {
          this.dishQuery(t.split('*')[0], t.split('*')[1])
          return
        } else if (t === '/rp') {
          hillo.post('Printer.php?op=questReprintOrder', {
            orderId: OrderId
          }).then(res => {
            toast()
            blockReady()
          })
        } else if (t === '/ps') {
          hillo.post('BackendData.php?op=reprintOrder', {
            id: OrderId,
            withTitle: 0,
            printCount: 1
          }).then(res => {
            toast()
            blockReady()
          })
        } else {
          this.dishQuery(t)
          return
        }
      } else {
        if (UIStatus === UIState.Init) {
          if (this.cartListModel.list.length > 0) {
            UIStatus = UIState.OnList
            this.highLight(2)
            blockReady()
            return
          } else {
            this.highLight(7)
            UIStatus = UIState.OnList
            blockReady()
            return
            // checkOut();
          }
        }
      }
      blocking()
    },
    orderDish () {
      showLoading()
      hillo.post('Complex.php?op=addDishesToTable', {
        params: JSON.stringify(this.cartListModel.list),
        tableId: this.id
      }).then(() => {
        this.cartListModel.clear()
        this.initialUI()
        toast(findInString('orderSuccess'), () => {
          if (GlobalConfig.jumpToHomeWhenOrder) {
            this.goHome()
          }
        })
      }).catch(res => {
        logError(findInString('JSTableOrderFailed') + res.info)
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
    getButtonList () {
      const l = []
      for (const a of findElement('listOfFunction').childNodes) {
        if (a.tagName === 'DIV' && !a.className.includes('spl') && !a.className.includes('disabled')) {
          l.push(a)
        }
      }
      return l
    },
    createTable: createOrEnterTable,
    resetList () {
      for (const l of this.getButtonList()) {
        l.classList.remove('focus')
        l.classList.add('normal')
      }
    },
    realInitial () {
      this.version = version
      this.breakCount = 0
      AssginToStringClass('version', version)
      resolveBestIP(() => {
        this.Config = GlobalConfig
        for (const i in this.Strings[GlobalConfig.lang]) {
          AssginToStringClass(i, this.Strings[GlobalConfig.lang][i])
        }
        getConsumeTypeList(() => {
          [setInterval(this.refreshTables, 5000),
            setInterval(this.getTableDetail, 3000)].map(addToTimerList)
          if (!GlobalConfig.FMCVersion) {
            addToTimerList(setInterval(this.autoGetFocus, 1000))
            document.getElementById('instruction').focus()
          }
          window.onkeydown = this.listenKeyDown
          UIStatus = UIState.Init
          this.getCategory()
          this.getDCT()
          setGlobalTableId(this.id)
          AssginToStringClass('tableNumber', this.tableName)
          blockReady()
          this.initialUI()
          this.refreshTables()
          this.getTableDetail()
        })
      })
    }
  },
  computed: {
    filteredC: function () {
      if (this.activeDCT) {
        const dct = this.dct[this.activeDCT - 1]
        return this.categories.filter((item) => {
          return parseInt(item.dishesCategoryTypeId) === parseInt(dct.id)
        })
      }
      return this.categories
    },
    filteredDish: function () {
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

      if (this.buffer !== '' && !this.buffer.includes('/')) {
        const [buffer] = this.buffer.split('*')
        list = list.filter((item) => {
          return item.dishName.includes(buffer) ||
            item.code.includes(buffer.toLowerCase()) ||
            item.code.includes(buffer.toUpperCase())
        })
      }
      return list
    }
  },
  watch: {
    activeDCT: function () {
      this.activeCategory = 0
    },
    refresh: function () {
      this.realInitial()
    }
  },
  beforeUpdate: function () {
    if (this.cartListModel.list.length === 0) {
      this.lastDish = { name: '' }
      this.lastCount = 0
    }
  },
  mounted: function () {
    this.realInitial()
  }
}
</script>

<style scoped>
    .main {
        display: flex;
        width: 100vw;
        justify-content: space-between;
    }

    .collapse .areaC {
        flex-grow: 1;
        width: 100%;
        height: 100%;
        padding: 12px 0;
    }

    .center-panel {
        display: flex;
        align-items: flex-end;
        width: 340px;
    }

    .spaceBetween {
        display: flex;
        justify-content: space-between;
    }

    .tableContainer {
        overflow-x: hidden;
        max-height: calc(100vh - 200px);
        padding: 4px 8px;
        overflow-y: scroll;
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

    .infoContainer {
        padding: 5.5px 0;
    }

    .infoRow {
        padding: 5.5px 12px;
        margin: 0;
    }

    .focus .innerItem {
        color: white;
    }

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

    .totalDisplayBlock {
        padding-top: 8px;
        display: flex;
        font-size: 20px;
        font-weight: bold;
        justify-content: flex-end;

    }

    .totalDisplayInnerBlock > .S_totalPrice {
        margin-top: -6px;
        margin-left: 12px;
    }

    .totalDisplayInnerBlock {
        padding: 0 5px;
        height: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #367aeb;
        border-bottom: 1px solid #367aeb;

    }

    .dot {
        background: #367aeb;
        width: 10px;
        height: 10px;
        border-radius: 5px;
    }

    .pop2Container {
        z-index: 1500;
        left: 123px;
        width: 700px;
        height: 802px;
        padding: 57px 53px;
        position: fixed;
        top: 107px;
        border-radius: 14px;
        -webkit-box-shadow: 0 3px 8px 0 rgba(0, 86, 255, 0.08);
        box-shadow: 0 3px 8px 0 rgba(0, 86, 255, 0.08);
    }

    .tableTitle {
        width: fit-content;
        color: #367aeb;
        border-radius: 5px;
        font-size: 18px;
        font-weight: 900;
        padding: 8px;
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

    .smallTableContainer {
        padding: 8px;
        overflow-y: scroll;
        overflow-x: hidden;
    }

    .pointer {
        cursor: pointer;
    }

    .dishListContainer {
        margin-left: 4px;
        max-height: calc(100vh);
        width: calc(100vw - 340px - 352px);
        flex-grow: 1;
        flex-shrink: 1;
    }

    .dishList {
        width: 331px;
    }

    .code3Row {
        font-weight: bolder;
        text-align: center;
    }

    .name3Row {
        text-align: center;
        cursor: pointer;
    }

    .sizeOfDisCount {
        width: 625px;
        height: 285px;

        padding: 0;
    }

    .inputWithDesc {
        display: flex;
        justify-content: space-between;
    }

    .discountContent {
        margin-top: 28px;
        width: 206px;
    }

    .midLine {
        width: 1px;
        height: 216px;
        border: 1px solid rgba(54, 122, 235, 1);
        opacity: 0.46;

        position: absolute;
        top: 53px;
        left: 313px;

    }

    .leftHalf {
        margin-top: 64px;
        margin-left: 60px;
    }

    .discountInput {
        width: 188px !important;
    }

    .hints {
        width: 206px;
        height: 101px;
        border: 1px solid rgba(54, 122, 235, 1);
        border-radius: 5px;
        padding: 10px;
        font-size: 12px;
        font-weight: 600;
        line-height: 16px;
        color: rgba(54, 122, 235, 0.36);
        margin-top: 131px;
        margin-right: 61px;
    }

    .modification {
        margin-top: 12px;
    }

    .popRow {
        width: 100%;
        display: flex;
        justify-content: space-between;
    }

    .input-field > label {
        font-size: 14px;
    }

    .rightLittlePopContainer.sizeOfCheckOut {
        width: 625px;
        height: 351px;
        padding-right: 91px;
        padding-left: 91px;
    }

    .popRow.sec {
        margin-top: 24px;
    }

    .popRow > .confirmContainer {
        margin-top: 0;
    }

    .cartTotal {
        padding: 8px;
        font-size: 18px;
        font-weight: bold;
    }

    .botLine {
        padding-right: 60px;
    }

    .categoryBlock {
        width: max-content;
        cursor: pointer;
        background: white;
        padding: 8px 8px;
        font-size: 16px;
        border-radius: 5px;
        font-weight: 600;
        -webkit-box-shadow: 0 3px 8px 0 #d0d2d9;
        box-shadow: 0 3px 8px 0 #d0d2d9;
        margin-right: 7px;
    }

    .categoryBlock.active {
        background: #367aeb;
        color: white;
        -webkit-box-shadow: 0 3px 8px 0 #d0d2d9;
        box-shadow: 0 3px 8px 0 #d0d2d9;

    }

    .dishCardList {
        padding-top: 12px;
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        margin-bottom: 120px;
        width: 100%;
        grid-gap: 6px;
    }

    .dishBlock {
        height: 112px;
        cursor: pointer;
        padding: 5px 12px;
        background: white;
    }

    @media screen and (max-width: 1600px ) {
        .dishCardList {
            grid-template-columns: repeat(5, 1fr);
        }
    }

    @media screen and (max-width: 1200px ) {
        .dishCardList {
            grid-template-columns: repeat(4, 1fr);
        }
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
        display: flex;
        width: 100%;
        font-size: 18px;
        font-weight: 600;
        word-break: break-all;
        justify-content: left;
        align-items: center;
    }

    .dragscroll {
        overflow-x: hidden;
    }

    .popMenu {
        background: white;
        -webkit-box-shadow: 0 3px 8px 0 rgba(0, 86, 255, 0.08);
        box-shadow: 0 3px 8px 0 rgba(0, 86, 255, 0.08);
        border-radius: 5px;
        margin-left: 12px;
        height: 100%;
        width: 100%;
    }

    .dishCardListContainer {
        width: 100%;
        height: calc(100vh - 96px);
    }

    .ikTitle {
        color: white;
        background: #367aeb;
        font-size: 18px;
        font-weight: bold;
        border-radius: 5px;
        padding: 6px 12px;
        width: fit-content;
    }

    .ikTitle .strong {
        font-weight: bold;
    }

    .bottomCart {
        position: fixed;
        width: 100%;
        max-width: 335px;
    }

    .normalPos {
        right: 352px;
        bottom: 116px;
        padding: 12px;
    }

    #newDishContainer {
        max-height: calc(100vh - 4px);
        overflow: hidden;
        bottom: 0;
        left: 4px;
    }

    #splitOrderContainer {
        max-width: 512px;
        top: 0;
        right: 352px;
        z-index: 5;
    }

    #dishModification {
        padding: 12px;
        right: 352px;
        top: 60px;
    }

    .panel {
        width: 100%;
        box-shadow: 0 3px 6px rgba(0, 25, 244, 0.1);
        border-radius: 5px;
        background: #f2f4f7;
    }

    .generalPanel {
        padding: 12px;
    }

    .takeawayFloat {
        position: fixed;
        right: 0;
        top: 48px;
        background: white;
        width: 300px;
        padding: 12px;
    }

    .panelF {
        height: calc(100vh - 4px);
        margin-left: 4px;
        display: flex;
        flex-shrink: 0;
        flex-direction: column;
        justify-content: space-between;
        width: 300px;
    }

    .verticalInfoRow {
        padding: 0 8px;
    }

    .verticalInfoRowLabel {
        font-size: 14px;
    }

    .verticalInfoRowText {
        font-size: 16px;
        font-weight: 600;
    }

    .verticalSpaceBetween {
        display: flex;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between
    }

    .rightAlign {
        width: 100%;
        text-align: right;
    }

    .typeLabel {
        font-size: 18px;
        font-weight: 600;
    }

    .verticalInfoRowBigText {
        font-weight: 900;
        font-size: 48px;
        text-align: right;
        width: 100%;
        padding-right: 4px;
        color: #367aeb;
    }

    .iconButton {
        width: 36px;
        height: 36px;
        background: #58be8b;
        color: white;
        cursor: pointer;
        border-radius: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 3px 6px rgba(0, 25, 244, 0.1);
    }

    .lastDishName {
        display: inline-block;
        overflow: hidden;
        max-width: 110px;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .lastDish {
        font-size: 18px;
        font-weight: 600;
        display: flex;
        align-items: center;
    }

    .totalRed {
        color: #fd7f41;
    }

    .ikButton {
        background: white;
        padding: 8px 24px;
        cursor: pointer;
        box-shadow: 0 3px 6px rgba(0, 25, 244, 0.1);
        color: black;
        font-size: 18px;
        font-weight: bold;
        border-radius: 5px;
    }

    .ikButton:hover {
        background: #367aeb;
        color: white;
    }

    .ikButton:focus {
        background: #367aeb;
        color: white;
    }

    .ikButton:active {
        background: #367aeb;
        color: white;
    }

    .button {
        margin-left: 12px;
    }

    .inputAreaCheckOut {
        width: 100%;
        margin-top: 12px;
    }

    .swal2-input[type=number] {
        max-width: unset !important;
    }

    .topRow {
        padding: 12px 24px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background: #367aeb;
        color: white;
    }

    .bigTableName {
        font-size: 36px;
        font-weight: bold;
    }

    .icon-line {
        display: flex;
        align-items: center;
        font-size: 18px;
    }

</style>
