<template>
    <v-app class="transparent">
        <Navgation>
            <template v-slot:right-slot>
                <div v-cloak>
                    <div class="indexTabs flex-Container">
                        <a @click="takeawayInfoShow=!takeawayInfoShow" class="indexTab S_takeawayAddress">外卖地址</a>
                    </div>
                    <div v-show="takeawayInfoShow" class=" takeawayFloat surface">
                        {{ rawAddressInfo.firstName }} {{ rawAddressInfo.lastName }}
                        <div> {{ rawAddressInfo.addressLine1 }}</div>
                        <div> {{ rawAddressInfo.addressline2 }}</div>
                        <div> {{ rawAddressInfo.city }} {{ rawAddressInfo.plz }}</div>
                        <div><span class="font-weight-bold">Email: </span>{{ rawAddressInfo.email }}</div>
                        <div><span class="font-weight-bold">Phone: </span>{{ rawAddressInfo.tel }}</div>
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
                    </div>
                </div>
            </template>
        </Navgation>
        <main class="main" style="margin-top:48px ">
            <div class="center-panel" id="mainTableContainer" v-cloak>
                <transition name="fade">
                    <div class="panel">
                        <dish-card-list
                                :orders="orders"
                                :click-callback="addToSplit"
                                :title="findInString('haveOrderedDish')"
                                :hide-free-dish="hideFreeDish"
                        />
                    </div>

                </transition>
            </div>
            <div v-cloak class="dishListContainer" id="dishListContainer">
                <div class="tableTitle S_tableDishListTitle">
                </div>
                <div style="padding: 8px">
                    <div class="ikTitle"><span class="S_classification">分类</span><span
                            class="strong S_information">信息</span>
                    </div>
                    <div v-dragscroll class="dragscroll">
                        <div class="categoryList">
                            <template v-for="category of categories">
                                <div v-bind:key="category.name+'categorys'" class="categoryBlock"
                                     @click="setActiveCategories(category)"
                                     v-bind:class="{'active  z-depth-2':category.isActive}">
                                    <div class="name">{{category.name}}</div>
                                </div>
                            </template>
                        </div>
                    </div>
                    <div class="ikTitle"><span class="S_isShowing">正在显示</span> <span
                            class="strong S_allDish">{{activeCategory?activeCategory.name:'所有菜品'}}</span>
                    </div>
                    <div v-dragscroll class="dragscroll dishCardListContainer">
                        <div class="dishCardList">
                            <template v-for="dish of filteredDish">
                                <div :key="'dish'+dish.code" class="dishBlock" @click="orderOneDish(dish.code)">
                                    <div class="spaceBetween" style="align-items: center">
                                        <div class="code">{{dish.code}}<span class="red--text"
                                                                             v-if="dish.haveMod>0">*</span>
                                        </div>
                                        <div class="price">{{dish.price}}</div>
                                    </div>
                                    <div class="name">{{dish.dishName}}</div>
                                </div>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
            <div id="newDishContainerTP">
                <transition name="fade" appear>
                    <div v-if="cartOrder.length>0" class="white bottomCart surface" id="newDishContainer">
                        <template v-if="expand">
                            <div class="spaceBetween">
                                <div class="tableTitle S_tableNewDishTitle">
                                    {{newDish}}
                                </div>
                                <div style="display: flex">
                                    <div class="cartTotal">
                                        <span class="label S_tableDishListTHPrice">
                                            {{tableDishListTHPrice}}:</span><span
                                            class="S_cartTotal totalRed">{{cartTotal}}</span>
                                    </div>
                                    <div @click="expand=false" style="margin-top: 4px" class="iconButton">
                                        <i class="material-icons">expand_more</i>
                                    </div>
                                </div>
                            </div>
                            <div class="orderDishList">
                                <template v-for="(order,index) in cartOrder">
                                    <div :key="'newCart'+index" @click="removeDish(index)">
                                        <dish-card
                                                :dish="order"
                                                :hide-free-dish="hideFreeDish"
                                        />
                                    </div>
                                </template>
                            </div>
                        </template>
                        <template v-else>
                            <div class="spaceBetween">
                                <div style="display: flex">
                                    <div class="tableTitle S_tableNewDishTitle">
                                        {{tableDishListTHPrice}}
                                    </div>
                                    <div class="lastDish">
                                  <span class="lastDishName"
                                  >{{lastDish.name}}</span>
                                        &times;
                                        {{lastCount}}
                                    </div>

                                </div>
                                <div style="display: flex">
                                    <div class="cartTotal">
                                        <span class="label S_tableDishListTHPrice">{{tableDishListTHPrice}}:</span><span
                                            class="S_cartTotal totalRed">{{cartTotal}}</span>
                                    </div>
                                    <div @click="expand=true" style="margin-top: 4px" class="iconButton">
                                        <i class="material-icons">expand_less</i>
                                    </div>
                                </div>

                            </div>
                        </template>
                    </div>
                </transition>
            </div>
            <div class="panelF">
                <div class="infoPanel surface shadowForInsPanel">
                    <div class="spaceBetween">
                        <div style="padding-top: 8px;">
                            <div class="spaceBetween">
                                <div>
                                    <div class="verticalInfoRow">
                                        <div class="verticalInfoRowLabel S_orderNumberLabel">订单号</div>
                                        <div class="verticalInfoRowText S_orderNumber"></div>
                                    </div>
                                    <div class="verticalInfoRow" style="margin-top: 8px">
                                        <div class="verticalInfoRowLabel S_tableInfoLabelPerson"></div>
                                        <div class="verticalInfoRowText S_personCount"></div>
                                    </div>
                                </div>
                                <div>
                                    <div class="verticalInfoRow">
                                        <div class="verticalInfoRowLabel S_tableInfoLabelTime"></div>
                                        <div class="verticalInfoRowText S_startTime"></div>
                                    </div>
                                    <div class="verticalInfoRow" style="margin-top: 8px">
                                        <div class="verticalInfoRowLabel S_tableInfoLabelSeat"></div>
                                        <div class="verticalInfoRowText S_seatTimes"></div>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div class="bigTableNumberContainer z-depth-2">{{tableName}}</div>
                    </div>
                    <div class="rightAlign typeLabel">
                        <span class="S_type"> </span>/<span class="S_servantName"> </span>
                    </div>

                    <div class="verticalInfoRow">
                        <div class="verticalInfoRowLabel S_infoLabelTotal"></div>
                        <div v-cloak class="verticalInfoRowBigText totalRed">
                            {{calculateOrderTableTotal()}}
                        </div>
                    </div>

                </div>
                <div v-cloak class="collapse areaC dragscroll" v-dragscroll id="areaC">
                    <div v-cloak v-bind:key="'area'+area.areaName" v-for="area in areas" class="area">
                        <div class="areaTitle">{{area.areaName}}</div>
                        <div class="areaTableContainer">
                            <template v-for="table in area.tables">
                                <div :key="'table'+table.tableName">
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

                        </div>
                    </div>
                </div>
                <div class="insPanel surface">
                    <div class="hintPanel">
                        <div class="left-panel">
                            <div class="floatMenuPanel" id="listOfFunction">
                                <div class="floatMenuPanelItem valign-wrapper" @click="insDecodeButtonList(0)">
                                    <div class="innerItem">
                                        <div class="icon"><i class="material-icons">arrow_back</i></div>
                                        <div class="text S_backToHome"></div>
                                    </div>

                                </div>
                                <div class="floatMenuPanelItem valign-wrapper" @click="insDecodeButtonList(1)">
                                    <div class="innerItem">
                                        <div class="icon"><i class="material-icons">restaurant</i></div>
                                        <div class="text S_dishOrder"></div>
                                    </div>

                                </div>
                                <div class="floatMenuPanelItem valign-wrapper" @click="insDecodeButtonList(2)">
                                    <div class="innerItem" style="">
                                        <div class="icon"><i class="material-icons">local_offer</i></div>
                                        <div class="text S_discount"></div>
                                    </div>
                                </div>
                                <div class="floatMenuPanelItem valign-wrapper" @click="insDecodeButtonList(3)">
                                    <div class="innerItem">
                                        <div class="icon"><i class="material-icons">swap_horiz</i></div>
                                        <div class="text S_tableChange"></div>
                                    </div>

                                </div>
                                <div class="floatMenuPanelItem valign-wrapper" @click="insDecodeButtonList(4)">
                                    <div class="innerItem">
                                        <div class="icon"><i class="material-icons">merge_type</i></div>
                                        <div class="text S_tableMerge"></div>
                                    </div>

                                </div>
                                <div class="floatMenuPanelItem valign-wrapper" @click="insDecodeButtonList(5)">
                                    <div class="innerItem">
                                        <div class="icon"><i class="material-icons">account_balance_wallet</i></div>
                                        <div class="text S_payBill"></div>
                                    </div>

                                </div>
                                <div class="floatMenuPanelItem valign-wrapper" @click="insDecodeButtonList(6)">
                                    <div class="innerItem">
                                        <div class="icon"><i class="material-icons">assignment_turned_in</i></div>
                                        <div class="text S_QuickBill"></div>
                                    </div>

                                </div>

                            </div>
                        </div>

                    </div>
                    <div class="inputArea">
                        <div class="input-field ">
                            <v-text-field ref="ins" v-model="buffer"
                                          placeholder="instruction.." id="instruction"
                                          autofocus=autofocus></v-text-field>
                        </div>
                    </div>
                </div>
            </div>
        </main>
        <transition appear name="fade">
            <div v-show="items.length>0" class="bottomCart surface" style="background: #f5f6fa;" v-cloak
                 id="splitOrderContainer">
                <dish-card-list :orders="items"
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
        <v-navigation-drawer width="30%" fixed temporary v-model="modificationShow">
            <div style="margin-top: 64px">
                <v-container>
                    <v-row>
                        <v-col cols="12" class="elevation-3">
                            <div class="popTitle">
                                {{dishName}}
                            </div>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="12">
                            <template v-for="item in computedOption">
                                <div class="elevation-2 pa-2 my-2" style="width: 100%" :key="'mod2'+item.id">
                                    <span class="subtitle-2">{{`${item.name}${item.required==='1'?`:${item.select[0].text}`:``}`}}</span>
                                    <v-chip-group
                                            v-model="mod['mod'+item.id]"
                                            :mandatory="item.required==='1'" column
                                            :multiple="item.multiSelect==='1'" active-class="primary--text">
                                        <v-chip :key="'mod111'+index" v-for="(s,index) in item.select">
                                            {{s.text}}
                                        </v-chip>
                                    </v-chip-group>
                                </div>

                                <!--                                                                <v-select v-bind:key="'mod2'+item.id"-->
                                <!--                                                                          v-model="mod['mod'+item.id]"-->
                                <!--                                                                          :multiple="item.multiSelect==='1'"-->
                                <!--                                                                          :label="`${item.name}-->
                                <!--                                                                       ${item.required==='1'?`:${item.select[0].text}`:``}`"-->
                                <!--                                                                          v-bind:id="'mod'+item.id" :items="item.select">-->
                                <!--                                                                </v-select>-->
                            </template>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-navigation-drawer>
        <transition appear name="fade">

            <div v-show="modificationShow" v-cloak class="bottomCart surface" id="dishModification">
                <div>
                    <div class="popTitle">
                        {{dishName}}
                    </div>
                    <div class="modification">
                        <form @submit.prevent="submitModification">
                            <template v-for="item in computedOption">
                                <v-select v-bind:key="'mod2'+item.id"
                                          v-model="mod['mod'+item.id]"
                                          :multiple="item.multiSelect==='1'"
                                          :label="`${item.name}
                                       ${item.required==='1'?`:${item.select[0].text}`:``}`"
                                          v-bind:id="'mod'+item.id" :items="item.select">
                                </v-select>
                            </template>
                            <div class="spaceBetween">
                                <div>
                                    <button class="confirmContainer waves-light waves-effect red white--text S_cancel"
                                            @click="cancel"
                                            type="button">取消
                                    </button>
                                </div>
                                <div>
                                    <button class="confirmContainer  waves-light waves-effect S_tableCheckOutConfirm"
                                            name="confirm"
                                            type="submit">确认
                                    </button>
                                </div>
                            </div>

                        </form>

                    </div>
                </div>
            </div>
        </transition>
    </v-app>
</template>

<script>

import {
  AssginToStringClass,
  blocking,
  blockReady,
  copyObject,
  createOrEnterTable,
  fastSweetAlertRequest,
  findConsumeTypeById,
  findElement,
  findInString,
  getActiveTables,
  getAllDishes,
  getConfig,
  getConsumeTypeList,
  getData,
  goodRequest,
  isBlocking,
  jumpTo,
  jumpToTable,
  logError,
  logErrorAndPop,
  popAuthorize,
  postData,
  remove,
  resolveBestIP,
  setGlobalTableId,
  showConfirm,
  showLoading,
  showTimedAlert,
  Strings,
  toast
} from '../oldjs/common'
import { version } from './../../package.json'

import Swal from 'sweetalert2'
import hillo from 'innerken-utils/Utlis/request'
import {
  checkOut,
  deleteDishes,
  dishesChangeTable,
  popChangeTablePanel,
  popDiscountPanel,
  popMergeTablePanel,
  splitOrder
} from '../oldjs/api'
import Navgation from '../components/Navgation'
import DishCard from '../components/DishCard'
import { dragscroll } from 'vue-dragscroll'
import DishCardList from '../components/DishCardList'

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
let CurrentConsumeType = 0
let OrderId = -1

function goHome () {
  jumpTo('index')
}

async function checkOutPrompt () {
  const res = await Swal.mixin({
    input: 'text',
    confirmButtonText: findInString('nextStep') + ' &rarr;',
    showCancelButton: true,
    progressSteps: ['1', '2', '3']
  }).queue([
    {
      title: findInString('tableCheckOutBillTypeLabel'),
      input: 'select',
      inputOptions: {
        1: findInString('tableCheckOutBillTypeOptionNormal'),
        2: findInString('tableCheckOutBillTypeOptionCompany'),
        3: findInString('tableCheckOutBillTypeOption3')
      }
    },
    {
      title: findInString('tableCheckOutPaymentLabel'),
      input: 'select',
      inputOptions: {
        1: findInString('tableCheckOutPaymentOptionBar'),
        2: findInString('tableCheckOutPaymentOptionCard'),
        3: findInString('tableCheckOutPaymentOptionCredit')
      }
    },
    {
      title: findInString('tableCheckOutTipLabel'),
      input: 'number',
      inputAttributes: {
        min: 0,
        step: 0.1
      }
    }
  ])
  if (res.value !== undefined) {
    return res.value
  }
}

// endregion
export default {
  name: 'TablePage',
  directives: {
    dragscroll
  },
  components: { DishCardList, DishCard, Navgation },
  props: {
    id: {
      type: String,
      default: '7'
    },
    tableName: {
      type: String,
      default: '1'
    }
  },
  data: function () {
    return {
      version: version,
      /**/
      items: [],
      discountStr: null,
      /**/
      orders: [],
      /**/
      cartOrder: [],
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
      /**/
      takeawayInfoShow: false,
      rawAddressInfo: { reason: '' },
      /**/
      areas: [],
      Strings: Strings,
      Config: getConfig(),
      buffer: '',
      mod: {}
    }
  },
  beforeDestroy () {
    if (this.focusTimer != null) {
      this.focusTimer.map(clearInterval)
    }
  },
  methods: {
    findInString,
    getOrderedDish () {
      getData(this.Config.PHPROOT + 'Complex.php', {
        op: 'dishesInTable',
        tableId: this.id,
        lang: this.Config.lang
      }).then(res => {
        if (res.status === 'good') {
          this.orders = res.content
        } else {
          showTimedAlert('warning', findInString('JSTableGetOrderedDishFailed') + res.info, 1000, goHome)
        }
      })
    },
    dishQuery (code, count = 1) {
      getData(this.Config.PHPROOT + 'Dishes.php?op=simpleInfo', {
        op: 'simpleInfo',
        code: code,
        lang: this.Config.lang
      }).then(res => {
        if (goodRequest(res)) {
          if (res.content.length > 0) {
            // todo: add modification
            const dishInfo = res.content[0]
            dishInfo.name = dishInfo.name.length > 28
              ? dishInfo.name.substr(0, 28) + '...' : dishInfo.name
            if (dishInfo.haveMod > 0) {
              this.showModification(dishInfo, count)
              return
            }
            this.addDish(dishInfo, parseInt(count))
          } else {
            logError(findInString('JSTableCodeNotFound'))
          }
        } else {
          logError(findInString('JSTableGetDishFailed') + res.info)
        }
      })
    },
    showModification (dish, count) {
      this.options = dish.modInfo
      this.dishName = dish.name
      this.dish = dish
      this.count = count
      UIStatus = UIState.commandShow
      this.$refs.ins.blur()
      this.modificationShow = true
    },
    async getCategory () {
      const res = await hillo.get('Category.php?op=withTableType', {
        tableId: this.id, lang: this.$i18n.locale.toUpperCase()
      })
      for (const i of res.content) {
        if (!i.isActive) {
          i.isActive = false
        }
      }
      this.categories = res.content
      this.dishes = await getAllDishes()
    },
    getTableCurrentStatus () {
      getData(this.Config.PHPROOT + 'Tables.php', {
        name: this.tableName
      }).then(res => {
        if (goodRequest(res)) {
          if (this.items.length === 0) {
            this.getOrderedDish()
          }
          if (res.content[0].usageStatus === '0') {
            showTimedAlert('warning', findInString('alreadyOrdered'), 2000, goHome)
          }
        } else {
          showTimedAlert('warning', findInString('alreadyOrdered'), 2000, goHome)
        }
      })
    },
    orderOneDish: function (code) {
      this.dishQuery(code)
    },
    addToSplitOrder: function (item) {
      const raw = copyObject(item)
      raw.sumCount = 1
      const realItem = this.findByCodeInSplitOrder(raw.code)
      if (realItem == null) {
        this.items.push(raw)
      } else {
        realItem.sumCount += 1
      }
    },
    readBuffer: function (clear = true) {
      const ins = this.buffer
      if (clear) {
        this.buffer = ''
      }
      return ins
    },
    setActiveCategories: function (category) {
      if (!category.isActive) {
        this.activeCategory = category
        for (const i of this.categories) {
          i.isActive = false
        }
        category.isActive = true
      } else {
        for (const i of this.categories) {
          i.isActive = false
        }
        this.activeCategory = null
      }
    },
    findByCodeInOrder: function (code) {
      for (const i of this.orders) {
        if (i.code === code) {
          return i
        }
      }
      return null
    },
    findByCodeInSplitOrder: function (code) {
      for (const i of this.items) {
        if (i.code === code) {
          return i
        }
      }
      return null
    },
    removeFromSplitOrder: function (index) {
      const realItem = this.items[index]
      const orderItem = this.findByCodeInOrder(realItem.code)
      if (orderItem == null) {
        const item = copyObject(realItem)
        item.sumCount = 1
        this.orders.push(item)
      } else {
        orderItem.sumCount = parseInt(orderItem.sumCount) + 1
      }
      if (realItem.sumCount > 1) {
        realItem.sumCount--
      } else {
        remove(this.items, index)
      }
    },
    removeAllFromSplitOrder: function () {
      while (this.items.length > 0) {
        this.removeFromSplitOrder(0)
      }
    },
    needSplitOrder: async function () {
      if (this.Config.checkOutUsePassword) {
        popAuthorize('', async () => {
          const arr = await checkOutPrompt()
          splitOrder(this.discountStr, this.id, this.items, this.initialUI, ...arr)
        }, true)
      } else {
        const arr = await checkOutPrompt()
        splitOrder(this.discountStr, this.id, this.items, this.initialUI, ...arr)
      }
    },
    deleteDishes: function () {
      deleteDishes(this.id, this.items, this.initialUI)
    },
    dishesChangeTable: function () {
      dishesChangeTable(this.tableName, this.items, this.initialUI)
    },
    calculateOrderTableTotal: function () {
      let totalPrice = 0
      for (const a of this.orders) {
        if (this.hideFreeDish && parseInt(a.categoryTypeId) === 11) {
          continue
        }
        a.totalPrice = parseFloat(a.totalPrice).toFixed(2)
        totalPrice += parseFloat(a.totalPrice)
      }
      return totalPrice.toFixed(2)
    },
    addToSplit: function (index) {
      const item = this.orders[index]
      // if (item.hasMod) {
      //     logErrorAndPop('高级菜品暂不支持分单')
      //     return
      // }
      if (item.code === '-1') {
        logErrorAndPop('折扣菜品不能被加入到分单里')
        return
      }
      item.sumCount = parseInt(item.sumCount)
      if (item.sumCount > 1) {
        item.sumCount--
      } else {
        remove(this.orders, index)
      }
      this.addToSplitOrder(item)
    },
    addNote: function (item) {
      Swal.fire({
        title: 'Add Note',
        input: 'text',
        showCancelButton: true,
        preConfirm: (note) => {
          this.$set(item, 'note', note)
          item.note = note
        }
      })
    },
    calculateTotal: function () {
      let totalPrice = 0
      for (const item of this.cartOrder) {
        if (this.hideFreeDish && parseInt(item.categoryTypeId) === 11) {
          continue
        }
        item.totalPrice = parseFloat(item.price) * item.count
        totalPrice += parseFloat(item.totalPrice)
      }
      return totalPrice.toFixed(2)
    },

    addDish: function (dish, count = 1) {
      dish.count = count
      dish.price = parseFloat(dish.price)
      const dishIndex = this.findDishByCode(dish.code)
      if (dishIndex !== -1) {
        const dishItem = this.cartOrder[dishIndex]
        if (dishItem.haveMod > 0) {
          dish.total = dish.count * dish.price
          this.cartOrder.push(dish)
        } else {
          dishItem.count += count
          dishItem.total = dishItem.count * dish.price
          const newDish = copyObject(dishItem)
          remove(this.cartOrder, dishIndex)
          this.cartOrder.push(newDish)
        }
      } else {
        dish.total = dish.count * dish.price
        this.cartOrder.push(dish)
      }
      this.cartOrder.reverse()
      this.lastDish = dish
      this.lastCount = count
    },
    clear: function () {
      this.cartOrder = []
    },
    findDishByCode: function (code) {
      for (const d of this.cartOrder) {
        if (d.code === code) {
          return this.cartOrder.indexOf(d)
        }
      }
      return -1
    },
    removeDish: function (index) {
      remove(this.cartOrder, index)
    },
    submitModification: function () {
      const apply = []
      for (const i of this.dish.modInfo) {
        const item = {}
        item.groupId = i.id
        item.selectId = this.mod['mod' + i.id] ? this.mod['mod' + i.id] : ''
        if (i.required === '1' && item.selectId === '') {
          item.selectId = i.selectValue[0]
        }
        apply.push(item)
      }
      this.dish.apply = apply
      this.addDish(this.dish, parseInt(this.count))
      this.mod = []
      UIStatus = UIState.Init
      blockReady()
      this.modificationShow = false
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
      this.cartOrder = []
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
        this.$refs.ins.focus()
      } else if (this.modificationShow) {
        this.cancel()
      } else if (this.items.length > 0) {
        this.removeAllFromSplitOrder()
      } else if (this.cartOrder.length > 0) {
        this.cartOrder = []
      } else if (UIStatus === UIState.Init) {
        goHome()
      }
      blockReady()
    },
    insDecodeButtonList (i) {
      if (isBlocking()) {
        return
      }
      switch (i) {
        case 0: // 打单
          this.back()
          blockReady()
          break
        case 1: // 打单
          if (this.cartOrder.length > 0) {
            this.orderDish()
            blocking()
          } else {
            blockReady()
          }
          break
        case 2:
          popAuthorize('', () => popDiscountPanel(this.id, this.initialUI))
          break
        case 3:
          popAuthorize('', () => popChangeTablePanel(this.tableName, this.initialUI))
          break
        case 4:
          // 转台
          popAuthorize('', () => popMergeTablePanel(this.tableName, this.initialUI))
          break
        case 5:
          this.jumpToPayment()
          break
        case 6:
          if (this.Config.checkOutUsePassword) {
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
    checkOut (print = 1, payMethod = 1, tipIncome = 0) {
      checkOut(this.id, this.cartOrder, print = 1, payMethod = 1, tipIncome = 0)
    },
    jumpToTable: function (tableId, tableName) {
      jumpToTable(tableId, tableName)
      this.initialUI()
    },
    findConsumeType: (id) => findConsumeTypeById(id),
    openTable: (name) => createOrEnterTable(name),
    autoGetFocus () {
      if (UIStatus !== UIState.Init) {
        return
      }
      if (Swal.isVisible()) {
        return
      }
      this.$refs.ins.focus()
    },
    async refreshTables () {
      this.areas = await getActiveTables()
    },
    getTableDetail () {
      getData(this.Config.PHPROOT + 'Tables.php', {
        op: 'currentInfo',
        id: this.id
      }).then(res => {
        if (goodRequest(res)) {
          const infos = res.content
          AssginToStringClass('seatTimes', infos.satCount)
          AssginToStringClass('servantName', infos.order.counsumeTypeStatusName)
          CurrentConsumeType = parseInt(infos.consumeTypeId)
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
          showTimedAlert('info', findInString('JSTableGetTableDetailFailed') + res.info, 1000, goHome)
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
        case 'Enter': {
          const instruction = this.readBuffer()
          if (listIndex > -1) {
            this.insDecodeButtonList(listIndex)
            break
          }
          this.insDecode(instruction)
        }
          break
        // eslint-disable-next-line no-lone-blocks
        case 'ArrowUp': {
          if (UIStatus === UIState.OnList) {
            this.moveIndex(-1)
          }
        }
          break
        // eslint-disable-next-line no-lone-blocks
        case 'ArrowDown': {
          if (UIStatus === UIState.OnList) {
            this.moveIndex(1)
          }
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
        if (t.startsWith('-') && t.length >= 2) {
          this.removeDish(t.substring(1))
          blockReady()
          return
        } else if (t.indexOf('*') !== -1) {
          this.dishQuery(t.split('*')[1], t.split('*')[0])
        } else if (t === 'rp') {
          hillo.post('Printer.php?op=questReprintOrder', {
            orderId: OrderId
          }).then(res => {
            toast()
            blockReady()
          })
        } else {
          this.dishQuery(t)
        }
      } else {
        if (UIStatus === UIState.Init) {
          if (this.cartOrder.length > 0) {
            UIStatus = UIState.OnList
            this.highLight(1)
            blockReady()
            return
          } else {
            this.highLight(6)
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
      postData(this.Config.PHPROOT + 'Complex.php?op=addDishesToTable', {
        params: JSON.stringify(this.cartOrder),
        tableId: this.id
      }).then(res => {
        if (goodRequest(res)) {
          this.cartOrder = []
          this.initialUI()
          toast(findInString('orderSuccess'), () => {
            if (this.Config.jumpToHomeWhenOrder) {
              goHome()
            }
          })
        } else {
          logError(findInString('JSTableOrderFailed') + res.info)
        }
        blockReady()
      })
    },
    jumpToPayment () {
      setTimeout(async () => {
        if (this.Config.checkOutUsePassword) {
          popAuthorize('', async () => {
            const res = await checkOutPrompt()
            this.checkOut(...res)
          }, true)
        } else {
          const res = await checkOutPrompt()
          this.checkOut(...res)
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
    }
  },
  computed: {
    computedOption: function () {
      const realModInfo = []
      this.options.forEach(item => {
        item.select = []
        item.selectName = item.selectName.split(',')
        item.selectValue = item.selectValue.split(',')
        item.priceInfo = item.priceInfo.split(',')
        item.selectName.forEach((name, index) => {
          item.select.push({
            text: `${name}${parseFloat(item.priceInfo[index]) === 0 ? ''
              : `(€${parseFloat(item.priceInfo[index]).toFixed(2)})`}`,
            value: item.selectValue[index]
          })
        })
        realModInfo.push(item)
      })
      console.log(realModInfo)
      return realModInfo
    },
    splitOrderTotal: function () {
      let cartTotalAmount = 0
      for (const a of this.items) {
        cartTotalAmount += parseFloat(a.price) * parseFloat(a.sumCount)
      }
      return cartTotalAmount.toFixed(2)
    },
    cartTotal: function () {
      let cartTotalAmount = 0
      for (const a of this.cartOrder) {
        cartTotalAmount += parseFloat(a.price) * parseFloat(a.count)
      }
      return cartTotalAmount.toFixed(2)
    },
    newDish: function () {
      return findInString('tableNewDishTitle')
    },
    tableDishListTHPrice: function () {
      return findInString('tableDishListTHPrice')
    },
    tableNewDishTHCode: function () {
      return findInString('tableNewDishTHCode')
    },
    tableNewDishTHName: function () {
      return findInString('tableNewDishTHName')
    },
    tableNewDishTHAmount: function () {
      return findInString('tableNewDishTHAmount')
    },
    tableNewDishTHDelete: function () {
      return findInString('tableNewDishTHDelete')
    },
    hideFreeDish: function () {
      return [4, 6].includes(CurrentConsumeType)
    },
    filteredDish: function () {
      if (this.activeCategory) {
        return this.dishes.filter((item) => {
          return item.categoryId === this.activeCategory.id
        })
      }
      return this.dishes
    }
  },
  beforeUpdate: function () {
    for (const arrElement of this.orders) {
      if (arrElement.hasMod > 0) {
        arrElement.agNameArr = arrElement.agName.split(',')
        arrElement.aNameArr = arrElement.aName.split(',')
      } else {
        arrElement.agNameArr = []
        arrElement.aNameArr = []
      }
    }
    if (this.cartOrder.length === 0) {
      this.lastDish = { name: '' }
      this.lastCount = 0
    }
  },
  created: function () {
    this.version = version
    AssginToStringClass('version', version)
    resolveBestIP(() => {
      this.Config = getConfig()
      for (const i in this.Strings[this.Config.lang]) {
        AssginToStringClass(i, this.Strings[this.Config.lang][i])
      }
      getConsumeTypeList(() => {
        this.focusTimer = [setInterval(this.autoGetFocus, 1000),
          setInterval(this.getTableCurrentStatus, 5000),
          setInterval(this.refreshTables, 5000)]
        window.onkeydown = this.listenKeyDown
        UIStatus = UIState.Init
        document.getElementById('instruction').focus()
        this.getCategory()
        setGlobalTableId(this.id)
        AssginToStringClass('tableNumber', this.tableName)
        blockReady()
        this.initialUI()
        this.refreshTables()
        setTimeout(this.getTableDetail, 1000)
      })
    })
  }
}
</script>

<style scoped>
    .center-panel {
        margin-left: 12px;
        margin-top: 12px;
        height: 100%;
        max-height: calc(100vh - 60px);
        border-radius: 5px;
        width: 100%;
        max-width: 400px;
        overflow-y: scroll;
        box-shadow: 4px 10px 20px 0 rgba(220, 224, 239, 0.59);
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

    .nameRow {
        font-weight: 600;
        max-width: 144px;
    }

    .priceRow {
        font-weight: lighter;
    }

    .countRow {
        font-weight: bold;
    }

    .sumRow {
        opacity: 1;
        color: #367aeb;
        font-size: 16px;
        font-weight: lighter;
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
        background: #367aeb;
        color: white;
        border-radius: 5px;
        font-size: 18px;
        font-weight: bold;
        padding: 8px;
        -webkit-box-shadow: 0 3px 8px 0 rgba(0, 86, 255, 0.24);
        box-shadow: 0 3px 8px 0 rgba(0, 86, 255, 0.24);
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
        margin-top: 12px;
        width: 100%;
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
        margin-top: 5px;
        width: max-content;
        cursor: pointer;
        background: white;
        padding: 8px 12px;
        font-size: 16px;
        border-radius: 5px;
        font-weight: 600;
        margin-right: 7px;
        -webkit-box-shadow: 0 3px 8px 0 rgba(0, 86, 255, 0.12);
        box-shadow: 0 3px 8px 0 rgba(0, 86, 255, 0.12);
    }

    .categoryBlock.active {
        background: #367aeb;
        color: white;

    }

    .categoryBlock:hover {
        background: #357aeb;
        color: white;
        -webkit-box-shadow: 0 3px 8px 0 rgba(0, 86, 255, 0.08);
        box-shadow: 0 3px 8px 0 rgba(0, 86, 255, 0.08);

    }

    .dishBlock {
        height: 120px;
        width: calc(16.6% - 12px);
        margin-top: 12px;
        cursor: pointer;
        padding: 5px 12px;
        background: white;
        -webkit-box-shadow: 0 3px 3px rgba(0, 86, 255, 0.13);
        box-shadow: 0 3px 3px rgba(0, 86, 255, 0.13);
        border-radius: 5px;
        margin-right: 12px;
    }

    @media screen and (max-width: 1600px ) {
        .dishBlock {

            width: calc(25% - 12px);
            margin-top: 12px;
            margin-right: 12px;
        }
    }

    @media screen and (max-width: 1200px ) {
        .dishBlock {

            width: calc(33% - 12px);
            margin-top: 12px;
            margin-right: 12px;
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
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        height: 70px;
        display: flex;
        width: 100%;
        font-size: 18px;
        font-weight: 600;
        word-break: break-all;
        justify-content: center;
        align-items: center;
    }

    .dishBlock.active {
        background: #367aeb;
        color: white;

    }

    .dishBlock:hover {
        background: #357aeb;
        color: white;
        -webkit-box-shadow: 0 3px 10px 0 rgba(0, 86, 255, 0.54);
        box-shadow: 0 3px 10px 0 rgba(0, 86, 255, 0.54);

    }

    .dragscroll {
        overflow-x: hidden;
    }

    .categoryList {
        padding: 12px 0;
        width: fit-content;
        flex-wrap: wrap;
        display: flex;
    }

    .dishCardList {
        margin-bottom: 60px;
        width: 100%;
        flex-wrap: wrap;
        display: flex;
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
        height: 800px;
    }

    .ikTitle {
        color: #367aeb;
        font-size: 18px;
        font-weight: lighter;
        padding: 7px 4px;
        width: fit-content;
    }

    .ikTitle .strong {
        font-weight: bold;
    }

    .bottomCart {
        z-index: 1002;
        position: fixed;
        width: 100%;
        max-width: 400px;
    }

    .normalPos {
        right: 352px;
        bottom: 116px;
        padding: 12px;
    }

    #checkOutPopContainer {

    }

    #newDishContainer {
        max-height: calc(100vh - 60px);
        overflow-x: hidden;
        overflow-y: scroll;
        bottom: 0;
        left: 12px;
    }

    #splitOrderContainer {
        max-width: 700px;
        top: 60px;
        right: 352px;
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
        height: calc(100vh - 48px);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        max-width: 340px;
        padding-left: 10px;
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

    .bigTableNumberContainer {
        background: #367aeb;
        color: white;
        padding: 4px 28px;
        font-size: 64px;
        min-width: 144px;
        text-align: center;
        border-radius: 5px;
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
        padding: 8px 12px;
        font-size: 18px;

        font-weight: 900;
    }

    .verticalInfoRowBigText {
        font-weight: 900;
        font-size: 56px;
        text-align: right;
        width: 100%;
        padding-right: 4px;
        color: black;
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
</style>
