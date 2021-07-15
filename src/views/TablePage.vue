<template>
  <div>
    <template v-cloak>
      <v-main>
        <div style="display: flex; background: #f6f6f6;">
          <div style="height: 100vh;width: 300px"
               class=" d-flex justify-space-between flex-shrink-0 flex-column fill-height mr-1">
            <div>
              <v-card tile color="grey darken-3" dark class="d-flex justify-space-between"
                      style="height: 48px;width: 100%;">
                <div v-dragscroll style="overflow-x: scroll" class="flex-shrink-1">
                  <v-item-group dark v-model="overrideConsumeTypeIndex"
                                style="background: white;" class="d-flex">
                    <template v-for="ct of consumeTypeList">
                      <v-item v-bind:key="ct.id+'consumeType'" v-slot="{active,toggle}">
                        <div class="consumeTypeItem"
                             style="background: #000"
                             :class="active?'active':''"
                             @click="toggle">{{ ct.name }}
                        </div>
                      </v-item>
                    </template>
                  </v-item-group>
                </div>

                <div class="d-flex align-center px-1">
                  <v-icon>mdi-format-list-bulleted-type</v-icon>
                  <span class="ml-1" style="white-space: nowrap">{{ findConsumeTypeById(consumeTypeId) }}</span>
                </div>
              </v-card>
              <v-card v-dragscroll
                      class="white">
                <keep-alive>
                  <dish-card-list
                    :dish-list-model="orderListModel"
                    :discount-ratio="discountRatio"
                    :default-expand="cartListModel.list.length===0"
                    :click-callback="addToSplit"
                    extra-height="96px"
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
                  @current-dish-change="cartCurrentDish=$event"
                  :reset-current-expand-index="true"
                  :show-number="true"
                  :extra-height="'196px'"
                  :color="'#707070'"
                  :reverse="true"
                  :dish-list-model="cartListModel"
                  :show-edit="true"
                  :click-callback="removeDish"
                  :title="$t('新增菜品')"
                  :default-expand="true"/>
                <v-toolbar dense>
                  <v-toolbar-items class="flex-grow-1 mx-n3">
                    <v-btn @click="cartListModel.clear()" class="mr-1" color="error">
                      <v-icon>
                        mdi-trash-can
                      </v-icon>
                    </v-btn>
                    <v-btn :loading="isSendingRequest"
                           @click="orderDish(cartListModel.list,false)" class="mr-1" dark>
                      <v-icon>mdi-printer-off</v-icon>
                    </v-btn>
                    <v-btn :loading="isSendingRequest" color="primary" class="flex-grow-1"
                           @click="orderDish(cartListModel.list)" dark>
                      <v-icon left>mdi-printer</v-icon>
                      {{ $t('confirm') }}
                    </v-btn>
                  </v-toolbar-items>
                </v-toolbar>
              </v-card>
            </div>
            <v-card>
              <v-toolbar dense v-if="this.tableDetailInfo.order.consumeTypeStatusId>1">
                <v-toolbar-items class="flex-grow-1 mx-n3">
                  <v-btn :disabled="cartListModel.count()!==0"
                         @click="discountShow">
                    <v-icon>mdi-sale</v-icon>
                    {{ $t('discount') }}
                  </v-btn>
                  <v-btn :disabled="cartListModel.count()!==0"
                         color="primary" class="flex-grow-1 ml-1"
                         @click="jumpToPayment()">
                    <v-icon left>mdi-calculator-variant</v-icon>
                    {{ $t('payBill') }}
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>
            </v-card>
          </div>
          <v-card elevation="0" color="transparent" v-cloak
                  class="flex-grow-1 d-flex"
                  style="height: 100vh;max-width: calc(100vw - 600px)">
            <v-card v-dragscroll color="transparent" elevation="0"
                    style="max-width: 100%;"
                    class="dragscroll dishCardListContainer ml-1 flex-grow-1">
              <v-item-group v-model="activeDCT" mandatory class="d-flex flex-wrap align-start elevation-1"
                            style="position: fixed;z-index: 2;background: white;width: calc(100vw - 600px)">
                <template v-for="ct of dct">
                  <v-item v-bind:key="ct.id+'categorytypes'" v-slot="{active,toggle}">
                    <div class="categoryTypeItem"
                         :class="active?'active':''"
                         @click="toggle">{{ ct.name }}
                    </div>
                  </v-item>
                </template>
              </v-item-group>
              <div class="mt-13"></div>
              <v-sheet v-if="Config.alwaysShowDishesBellow||!activeCategoryId&&(!input||input.length===0)"
                       class="px-0" color="transparent">
                <v-item-group class="d-flex flex-wrap align-start">
                  <template v-for="category of filteredC">
                    <v-item v-bind:key="'categorytypes'+category.id" v-slot="{active,toggle}">
                      <div @click="changeCategory(category.id,toggle)"
                           :class="(active?'active elevation-4':'')+
                           (Config.alwaysShowDishesBellow?' menu-always':' menu-item')"
                           :style="{backgroundColor:category.color, color:getColorLightness(category.color)>128?'#000':'#fff'}">
                        {{ category.name }}
                      </div>
                    </v-item>
                  </template>
                </v-item-group>
              </v-sheet>
              <div class="dishCardList" v-if="activeCategoryId||input||Config.alwaysShowDishesBellow">
                <div v-if="activeCategoryId&&!Config.alwaysShowDishesBellow"
                     style="width: 100%;height: 112px;
                        border: 2px solid #ff8c50;
                        color: #ff8c50;
                        border-radius: 4px"
                     @click="activeCategoryId=null" class="d-flex align-center"
                >
                  <div style="width: 100%" class="d-flex flex-column justify-center align-center flex-wrap">
                    <v-icon large color="#ff8c50">mdi-menu-open</v-icon>
                    <div>Zurück</div>
                  </div>
                </div>
                <template v-for="dish of filteredDish">
                  <dish-block
                    v-ripple
                    :key="'dish'+dish.code"
                    :code="dish.code"
                    :count="dish.count"
                    :display-color="dish.displayColor"
                    :dish-name="dish.dishName"
                    :foreground="dish.foreground"
                    :font-size="Config.dishBlockFontSize"
                    :have-mod="dish.haveMod"
                    :is-free="dish.isFree"
                    :price="dish.price"
                    @click-tune="showModification(dish,1)"
                    @click="orderOneDish(dish.code)"/>
                </template>
              </div>
            </v-card>
          </v-card>
        </div>
      </v-main>
      <v-navigation-drawer app stateless permanent right width="300px">
        <v-toolbar dense dark>
          <div class="d-flex align-center justify-space-between" style="width: 100%">
            <span class="bigTableName">
              {{ tableDetailInfo.tableBasicInfo.name }}
            </span>
            <div class="d-flex">
              <span class="icon-line ml-2">
                <v-icon color="white">mdi-account-outline</v-icon>
                <span class="ml-1">    {{ tableDetailInfo.servant }}</span>
              </span>
              <span class="icon-line ml-2">
                <v-icon color="white">mdi-calendar-text</v-icon>
                <span class="ml-1">
                  {{ tableDetailInfo.order.id }}
                </span>
              </span>
            </div>
          </div>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card width="300px" height="calc(100vh - 48px)"
                class="d-flex flex-shrink-0 flex-column pa-2">
          <div v-if="cartListModel.count()===0"
          >
            <div style="display: grid;grid-template-columns: repeat(3,1fr);grid-gap: 4px">
              <grid-button
                :loading="isSendingRequest"
                icon="mdi-arrow-left"
                :text="$t('Home')"
                @click="back"
              />
              <grid-button
                :loading="isSendingRequest"
                icon="mdi-printer"
                color="#fec945"
                :text="$t('重新打印')"
                @click="reprintOrder"
              />
              <grid-button
                :loading="isSendingRequest"
                icon="mdi-printer-pos"
                text="Zwischen"
                color="#24b646"
                @click="zwitchenBon"
              />
              <grid-button
                :loading="isSendingRequest"
                icon="mdi-swap-horizontal"
                color="#ff8c50"
                :text=" $t('tableChange') "
                @click="popAuthorize('',
                () => popChangeTablePanel(tableDetailInfo.tableBasicInfo.name ))"
              />
              <grid-button
                :loading="isSendingRequest"
                color="#272727"
                icon="mdi-merge"
                :text="$t('tableMerge')"
                @click="popAuthorize('',
                () => popMergeTablePanel(tableDetailInfo.tableBasicInfo.name ))"
              />
              <grid-button
                :loading="isSendingRequest"
                icon="mdi-account"
                :text="$t('Übergabe')"
                color="#3f49dd"
                @click="changeServant"
              />
              <grid-button
                :loading="isSendingRequest"
                v-if="consumeTypeId===2"
                icon="mdi-map"
                :text="$t('customerAddress')"
                color="indigo"
                @click="addressFormOpen=true"
              />
              <template v-else-if="consumeTypeStatusId<2">
                <grid-button
                  :loading="isSendingRequest"
                  icon="mdi-check"
                  text="Akzept."
                  color="success"
                  @click="acceptOrder"
                />
                <grid-button
                  :loading="isSendingRequest"
                  icon="mdi-close"
                  text="Ablehnen"
                  color="error"
                  @click="rejectOrder"
                />
              </template>
              <grid-button
                :loading="isSendingRequest"
                v-if="consumeTypeId===1"
                icon="mdi-silverware"
                :text="$t('Buffet')"
                color="#ff7961"
                @click="buffetDialogShow=true"
              />
            </div>

            <address-display
              :should-open-menu.sync="addressFormOpen"
              @address-change="submitRawAddressInfo"
              v-if="consumeTypeId===2"
              @accept="acceptOrderWithTime"
              @reject="rejectOrder"
              :consume-type-status-id="consumeTypeStatusId"
              :raw-address-info="realAddressInfo"/>
          </div>

          <div v-else style="display: grid;grid-template-columns: repeat(3,1fr);grid-gap: 4px" class="pa-2">
            <grid-button
              @click="cartListModel.clear()"
              icon="mdi-delete-sweep"
              text="Leeren"
              color="error"
            ></grid-button>
            <grid-button
              @click="orderDish(cartListModel.list,false)"
              :loading="isSendingRequest"
              icon="mdi-printer-off"
              text="Bestellen"
              color="#000"
            ></grid-button>
            <grid-button
              :loading="isSendingRequest"
              icon="mdi-printer"
              text="Drucken"
              @click="orderDish(cartListModel.list)"
            ></grid-button>
            <template v-if="cartCurrentDish">
              <grid-button
                @click="cartCurrentDish.change(-1)"
                icon="mdi-minus"
                color="error"
              ></grid-button>
              <grid-button
                :disabled="cartCurrentDish.haveMod<1"
                @click="cartCurrentDish.edit();cartCurrentDish.change(-1)"
                icon="mdi-tune"
                color="warning"
                text="ohne/mit"
              ></grid-button>
              <grid-button
                @click="cartCurrentDish.change(1)"
                icon="mdi-plus"
                color="success"
              ></grid-button>
              <grid-button
                @click="editNote"
                icon="mdi-notebook-edit"
                color="#666666"
                text="Notiz"
              ></grid-button>
            </template>

          </div>
          <v-spacer></v-spacer>
          <div>
            <v-text-field
              class="ma-2"
              hide-details
              clearable
              style="font-size: 36px"
              ref="ins"
              @input="input=displayInput"
              v-model="displayInput"
            />
            <keyboard @input="numberInput"
                      :keys="keyboardLayout"></keyboard>
          </div>

        </v-card>
      </v-navigation-drawer>
      <template v-if="splitOrderListModel.list.length>0">
        <div class="bottomCart surface d-flex justify-end"
             style="background: rgba(0,0,0,0.4);  top: 0;
z-index: 50;
left: 304px"
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
              <v-btn x-large class="  mt-1"
                     v-on:click="printZwichenBon()">
                <v-icon left>mdi-bandcamp</v-icon>
                {{ $t('Zwichen') }}
              </v-btn>
            </div>
            <dish-card-list
              class="flex-grow-1"
              extra-height="48px"
              :discount-ratio="discountRatio"
              :default-expand="true"
              :dish-list-model="splitOrderListModel"
              :click-callback="removeFromSplitOrder"
              :title="$t('operation')"/>
          </div>
        </div>
      </template>
      <v-dialog max-width="300px" v-model="extraDishShow">
        <v-card>
          <v-card-title> {{ currentDish.name }}</v-card-title>
          <v-card-text>
            <v-text-field label="Preis" autofocus v-model="currentDish.currentPrice"/>
            <v-text-field label="Name" v-model="currentDish.currentName"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn @click="addExtraDish">OK</v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>
      <discount-dialog
        :discount-model-show="discountModelShow"
        :id="id"
        :initial-u-i="initialUI"
        ref="discount"
        @visibility-changed="(val)=>this.discountModelShow=val"
      />
      <ModificationDrawer
        ref="modification"
        @visibility-changed="changeModification"
        :modification-show="modificationShow"
        :dish="dish"
        :old-mod="oldMod"
        :mod="submitModification"
        :password="password"
      />
      <check-out-drawer
        @visibility-changed="changeCheckOut"
        :order="checkOutModel"
        :check-out-type="checkOutType"
        :table-id="id"
        :password="password"
        :discount-str="discountStr"
        :discount-ratio="discountRatio"
        :visible="checkoutShow"/>
      <buffet-start-dialog
        :initial-u-i="initialUI"
        :id="tableDetailInfo.order.id"
        @visibility-changed="(val)=>this.buffetDialogShow=val"
        :buffet-dialog-show="buffetDialogShow"></buffet-start-dialog>
    </template>
  </div>
</template>

<script>

import {
  blocking,
  blockReady,
  consumeTypeList,
  fastSweetAlertRequest,
  findConsumeTypeById,
  getConsumeTypeList,
  isBlocking,
  jumpToTable,
  logError,
  logErrorAndPop,
  popAuthorize,
  requestOutTable,
  setGlobalTableId,
  showConfirmAsyn,
  showTimedAlert,
  toast,
  toManage
} from '@/oldjs/common'
import { getOrderInfo } from 'aaden-base-model/lib/Models/AadenApi'
import Swal from 'sweetalert2'
import hillo from 'hillo'
import {
  checkOut,
  deleteDishes,
  dishesChangeTable,
  dishesSetDiscount,
  getColorLightness,
  popChangeTablePanel,
  popMergeTablePanel,
  printZwichenBon
} from '@/oldjs/api'
import { dragscroll } from 'vue-dragscroll'
import DishCardList from '../components/DishCardList'
import ModificationDrawer from '../components/ModificationDrawer'
import { StandardDishesListFactory } from 'aaden-base-model/lib/Models/AadenBase'
import CheckOutDrawer from '../components/CheckOutDrawer'
import { findDish, goHome, processDishList, setDefaultValueForApply } from '@/oldjs/StaticModel'
import { addToTimerList, clearAllTimer, printNow } from '@/oldjs/Timer'
import CategoryType from 'aaden-base-model/lib/Models/CategoryType'
import GlobalConfig from '../oldjs/LocalGlobalSettings'

import { debounce } from 'lodash-es'
import DishBlock from '@/components/DishBlock'
import moment from 'moment'
import IKUtils from 'innerken-js-utils'
import Keyboard from '@/components/Keyboard'
import DiscountDialog from '@/components/fragments/DiscountDialog'
import AddressDisplay from '@/components/AddressDisplay'
import { acceptOrder } from '@/api/api'
import GridButton from '@/components/GridButton'
import { mapState } from 'vuex'
import BuffetStartDialog from '@/components/fragments/BuffetStartDialog'

const checkoutFactory = StandardDishesListFactory()
const splitOrderFactory = StandardDishesListFactory()
const orderListFactory = StandardDishesListFactory()
const cartListFactory = StandardDishesListFactory()
const defaultCurrentDish = {
  currentName: '',
  currentPrice: ''
}
const keyboardLayout =

  [
    '7', '8', '9', 'C',
    '4', '5', '6', 'A',
    '1', '2', '3', 'M',
    '.', '0', 'mdi-close', 'OK'
  ]

// endregion
export default {
  name: 'TablePage',
  directives: {
    dragscroll
  },
  components: {
    BuffetStartDialog,
    GridButton,
    AddressDisplay,
    DiscountDialog,
    Keyboard,
    DishBlock,
    CheckOutDrawer,
    ModificationDrawer,
    DishCardList
  },
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
      addressFormOpen: null,
      consumeTypeList: [],
      keyboardLayout: GlobalConfig.topKeyboardKey.split(',').concat(keyboardLayout),
      displayInput: '',
      checkoutShow: false,
      extraDishShow: false,
      modificationShow: false,
      discountModelShow: null,
      buffetDialogShow: false,
      isSendingRequest: false,
      oldMod: null,
      breakCount: 0,
      checkOutType: 'checkOut',
      checkOutModel: {
        total: 0,
        count: 0,
        list: []
      },
      /**/
      discountRatio: 1,
      discountStr: null,
      overrideConsumeTypeIndex: null,

      dish: {},
      count: 1,
      activeCategoryId: null,
      /* 存储菜品和过滤的信息 */
      dct: [],
      dishes: [],
      categories: [],
      activeDCT: 0,
      filteredDish: [],

      Config: GlobalConfig,
      /* input**/
      buffer: '',
      input: '',
      //* */
      splitOrderListModel: splitOrderFactory,
      orderListModel: orderListFactory,
      cartListModel: cartListFactory,
      defaultCurrentDish,
      tableDetailInfo: {
        order: {
          id: -1,
          rawAddressInfo: ''
        },
        tableBasicInfo: { name: '' }
      },
      currentDish: defaultCurrentDish,
      cartCurrentDish: null,
      password: ''

    }
  },
  beforeDestroy () {
    clearAllTimer()
  },
  methods: {
    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },
    async editNote () {
      const note = await Swal.fire({
        title: 'Note',
        input: 'text',
        inputValue: this.cartCurrentDish.note
      })
      this.$set(this.cartCurrentDish, 'note', note.value)
      // dish.note = note.value
    },
    async submitRawAddressInfo (addressInfo) {
      await hillo.post('Orders.php?op=updateRawAddressInfo', {
        orderId: this.tableDetailInfo.order.id,
        rawAddressInfo: JSON.stringify(addressInfo)
      })
      await this.getTableDetail()
      toast()
    },
    numberInput (key) {
      if (this.displayInput == null) {
        this.displayInput = ''
      }
      switch (key) {
        case 'mdi-close':
          this.displayInput += '*'
          break
        case 'C':
          this.displayInput = ''
          break
        case 'OK':
          this.insDecode(this.displayInput)
          this.displayInput = ''
          break
        default:
          this.displayInput += key
          break
      }
      this.input = this.displayInput
    },

    changeCategory (id, toggle) {
      this.activeCategoryId = id
      if (toggle) {
        toggle()
      }
    },
    popAuthorize,
    getColorLightness,
    toManage,
    popChangeTablePanel,
    popMergeTablePanel,
    async changeServant () {
      const res = await fastSweetAlertRequest('Zu andere Kneller übergabe', 'text',
        'Orders.php?op=changeServantForTable', 'pw',
        { tableId: this.id }, 'POST')
      if (res) {
        goHome()
      }
    },
    goHome () {
      goHome()
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
          const result = await getOrderInfo(this.id, GlobalConfig.usePrintModAsName)
          result.filter(d => d.code === 'lk').map(d => {
            d.originPrice = d.price
            return d
          })
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
    discountShow () {
      popAuthorize('', () => {
        this.discountModelShow = true
      })
    },
    async findAndOrderDish (code, count = 1) {
      if (count < 1) {
        showTimedAlert('warning', this.$t('JSTableCodeNotFound'), 500)
        return
      }
      const dish = findDish(code)
      if (dish) {
        if (parseInt(GlobalConfig.oneStepOrderNumber) !== -1 && count > GlobalConfig.oneStepOrderNumber) {
          const res = await showConfirmAsyn('wirklich?', count)
          if (!res?.value) {
            showTimedAlert('warning', 'abrechen')
          }
        }
        dish.name = dish.dishName
        dish.name = dish.name.length > 28
          ? dish.name.substr(0, 28) + '...' : dish.name
        if (dish.haveMod > 0) {
          if (GlobalConfig.useConfigButton) {
            const apply = setDefaultValueForApply(dish.options, [])
            this.submitModification(apply, dish, count, apply)
          } else {
            this.showModification(dish, count)
          }
          blockReady()
          return
        }
        if (dish.code.toLowerCase().includes('ea')) {
          this.showExtraDish(dish)
          blockReady()
          return
        }
        await this.addDish(dish, parseInt(count))
      } else {
        showTimedAlert('warning', this.$t('JSTableCodeNotFound'), 500)
      }
      blockReady()
    },
    showExtraDish (dish) {
      this.currentDish = Object.assign({}, defaultCurrentDish, dish)
      this.extraDishShow = true
    },
    showModification (dish, count, mod = null) {
      this.dish = dish
      this.count = count
      this.$refs.ins.blur()
      if (mod) {
        this.oldMod = mod
      } else {
        this.oldMod = null
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
        }).sort((a, b) => {
          const rank = GlobalConfig.defaultSort.split(',')
          const idToRank = (id) => {
            return 10 - rank.indexOf(id.toString())
          }
          const [ra, rb] = [a.id, b.id].map(idToRank)
          return ra > rb ? -1 : 1
        }).filter(i => typeof i.childCount === 'undefined' || i.childCount > 0)
      }
    },
    async getCategory (consumeTypeId = 1, force = false) {
      if (this.categories.length === 0 || force) {
        console.log('reloadDishUseConsumeTypeId', consumeTypeId)
        const res = await hillo.get('Category.php?op=withConsumeType', {
          consumeTypeId: consumeTypeId,
          lang: GlobalConfig.lang
        })
        for (const i of res.content) {
          if (!i.isActive) {
            i.isActive = false
          }
        }
        this.categories = res.content.filter(c => {
          return c.dishes.length > 0
        }).map((c, i) => {
          c.color = c.color === '' ? '#FFFFFF' : c.color
          return c
        })

        this.dishes = processDishList(this.categories.reduce((arr, i) => {
          arr.push(...i.dishes.map(d => {
            d.displayColor = d.color === '' ? '#FFFFFF' : d.color
            d.foreground = getColorLightness(d.displayColor) > 128 ? '#000' : '#fff'
            return IKUtils.deepCopy(d)
          }))
          return arr
        }, []))

        this.cartListModel.setDishList(this.dishes)
      }
    },
    orderOneDish: function (code) {
      this.displayInput = ''
      this.findAndOrderDish(code)
    },
    readBuffer: function (clear = true) {
      const ins = this.buffer === '' ? this.input : this.buffer
      if (clear) {
        this.displayInput = ''
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
    printZwichenBon: function () {
      printZwichenBon(this.id, this.splitOrderListModel.list)
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
    addExtraDish () {
      const dish = IKUtils.deepCopy(this.currentDish)
      if (dish.currentPrice === '') {
        dish.currentPrice = 0
      }
      if (dish.currentName === '') {
        dish.currentName = dish.name
      }
      dish.originPrice = dish.currentPrice
      dish.price = dish.originPrice
      dish.forceFormat = true
      dish.name = dish.currentName
      this.extraDishShow = false
      this.currentDish = {
        currentName: '',
        originPrice: ''
      }
      this.addDish(dish)
    },
    addDish: async function (dish, count = 1) {
      if (this.realConsumeTypeId !== this.consumeTypeId) {
        dish.overrideConsumeTypeId = this.realConsumeTypeId
        dish.forceFormat = true
      }
      if (!GlobalConfig.useCart) {
        const tmp = IKUtils.deepCopy(dish)
        tmp.count = 1
        await this.orderDish([tmp])
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
    submitModification: function (_mod, dish, count, saveInfo) {
      dish.apply = _mod// here we add a apply
      dish.forceFormat = true

      this.addDish(dish, count ?? parseInt(this.count))
      dish.edit = () => {
        this.showModification(dish, 1, saveInfo)
      }
      blockReady()
    },
    cancel: function () {
      this.modificationShow = false
      blockReady()
    },
    async initialUI (forceReload = false) {
      this.input = ''
      this.discountModelShow = false
      this.buffetDialogShow = false
      this.overrideConsumeTypeIndex = null
      this.activeCategoryId = null
      this.cartListModel.clear()
      this.removeAllFromSplitOrder()
      await this.getTableDetail()
      setGlobalTableId(this.id)
      await this.reloadDish(this.realConsumeTypeId, forceReload)
      blockReady()
    },
    async reloadDish (consumeTypeId, force = false) {
      await this.getCategory(consumeTypeId, force)
      this.activeCategoryId = null
      this.updateActiveDCT(0)
    },
    back () {
      if (this.discountModelShow) {
        this.discountModelShow = false
      } else if (this.buffetDialogShow) {
        this.buffetDialogShow = false
      } else if (this.modificationShow) {
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
    async submitDiscount () {
      if (this.$refs.discount) {
        await this.$refs.discount.submitDiscount()
      }
    },

    checkOut (pw, print = 1, payMethod = 1, tipIncome = 0, memberCardId) {
      if (!memberCardId) {
        memberCardId = null
      }
      checkOut(pw, this.id, print, payMethod, tipIncome, memberCardId)
    },
    jumpToTable: function (tableId, tableName) {
      jumpToTable(tableId, tableName)
      this.initialUI()
    },
    needSplitOrder: async function () {
      const realEnd = async (pw = '') => {
        this.password = pw
        this.checkoutShow = true
        checkoutFactory.clear()
        checkoutFactory.loadTTDishList(this.splitOrderListModel.list)
        this.checkOutModel = {
          total: checkoutFactory.total(),
          count: checkoutFactory.count(),
          list: checkoutFactory.list
        }
        this.checkOutType = 'splitOrder'
      }
      if (GlobalConfig.checkOutUsePassword) {
        popAuthorize('', async (pw) => {
          await realEnd(pw)
        }, true, false, this.id)
      } else {
        await realEnd()
      }
    },
    anyMenuOpen () {
      return this.modificationShow || this.checkoutShow ||
        this.discountModelShow || this.extraDishShow ||
        this.pinDialogShow || Swal.isVisible()
    },
    autoGetFocus (force = false) {
      if (!force) {
        if (this.anyMenuOpen()) {
          return
        }
        if (document.getElementsByClassName('v-overlay').length > 0) {
          return
        }
      }

      this.$nextTick(() => {
        if (this.$refs.ins !== document.activeElement) {
          this.$refs.ins.focus()
        }
      })
    },
    async getTableDetail () {
      try {
        const res = await hillo.silentGet('Tables.php', {
          op: 'currentInfo',
          id: this.id
        }, { noDebug: true })
        this.tableDetailInfo = res.content
        this.tableDetailInfo.consumeTypeName = findConsumeTypeById(this.tableDetailInfo.consumeTypeId).name
        if (this.tableDetailInfo.order.discountStr) {
          this.discountStr = this.tableDetailInfo.order.discountStr
        }
        this.getOrderedDish()
      } catch (e) {
        this.breakCount++
        console.log(e, this.breakCount)
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
    async acceptOrder (reason = 'ok') {
      await acceptOrder(reason, this.id)
      this.initialUI()
    },
    async acceptOrderWithTime (time) {
      const addressInfo = JSON.parse(this.tableDetailInfo.order.rawAddressInfo)
      let timeReal = moment()
      if (addressInfo) {
        if (addressInfo.date && addressInfo.time) {
          timeReal = moment(addressInfo.date + ' ' + addressInfo.time, 'YYYY-MM-DD HH:mm')
        }
      }
      timeReal.add(time, 'm')
      await this.acceptOrder(timeReal.format('DD.MM.YYYY HH:mm'))
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
      if (this.isSendingRequest) {
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

    async reprintOrder () {
      this.isSendingRequest = true
      try {
        await hillo.post('Printer.php?op=questReprintOrder', {
          orderId: this.tableDetailInfo.order.id
        })
        toast()
        blockReady()
      } catch (e) {

      } finally {
        this.isSendingRequest = false
      }
    },
    async zwitchenBon () {
      this.isSendingRequest = true
      try {
        await hillo.post('BackendData.php?op=reprintOrder', {
          id: this.tableDetailInfo.order.id,
          withTitle: 0,
          printCount: 1
        })
        toast()
        blockReady()
      } catch (e) {

      } finally {
        this.isSendingRequest = false
      }
    },
    //* findInsDecode*/
    async insDecode (t) {
      if (isBlocking()) {
        return
      }
      if (t !== '' && t !== null) {
        if (t?.length === 8) {
          const VIPCardDish = findDish(GlobalConfig.VIPCardCode)
          this.showExtraDish(VIPCardDish)
          this.currentDish.currentName = t
          blockReady()
          return
        }
        if (t.startsWith('-') && t.length >= 2) {
          this.removeDishWithCode(t.substring(1))
          blockReady()
          return
        } else if (t.indexOf('*') !== -1) {
          let [code, count] = this.getCodeAndCountFromInput(t)
          count = parseInt(count)
          await this.findAndOrderDish(code, count)
          return
        } else {
          await this.findAndOrderDish(t)
          return
        }
      } else {
        if (this.discountModelShow) {
          this.submitDiscount()
          blockReady()
          return
        } else if (this.extraDishShow) {
          this.addExtraDish()
          blockReady()
          return
        } else if (this.modificationShow) {
          this.$refs.modification.forceSubmit()
          blockReady()
          return
        } else if (!this.checkoutShow && !this.modificationShow) {
          if (this.cartListModel.list.length > 0) {
            setTimeout(async () => {
              let res = { value: 1 }
              if (!GlobalConfig.skipCartConfirm) {
                res = await showConfirmAsyn('Warenkorb ---> Bestellen?')
              }
              if (res.value) {
                this.orderDish(this.cartListModel.list)
              }
              blockReady()
            }, 10)
            return
          } else {
            if (GlobalConfig.useEnterKeyToPay) {
              setTimeout(async () => {
                const res = await showConfirmAsyn('Zahlung ohne tip mit bar?')
                if (res.value) {
                  if (GlobalConfig.checkOutUsePassword) {
                    popAuthorize('', (pw) => {
                      this.checkOut(pw)
                    }, true, false, this.id)
                  } else {
                    this.checkOut()
                  }
                }
                blockReady()
              }, 10)
            } else {
              blockReady()
            }

            return
          }
        }
      }
      blocking()
    },
    async orderDish (order = this.cartListModel.list, print = true) {
      try {
        this.isSendingRequest = true
        order.forEach(o => {
          o.guestNumber = 1
        })
        await hillo.post('Complex.php?op=addDishesToTable', {
          params: JSON.stringify(order),
          tableId: this.id,
          printingKitchenBon: print ? 1 : 0
        })
        this.cartListModel.clear()
        this.initialUI()
        printNow()
        if (GlobalConfig.jumpToHomeWhenOrder) {
          this.goHome()
        }
      } catch (res) {
        logError(this.$t('JSTableOrderFailed') + res.data.info)
      } finally {
        this.isSendingRequest = false
      }
      blockReady()
    },
    jumpToPayment () {
      const realCheckOut = async (pw) => {
        this.checkoutShow = true
        checkoutFactory.clear()
        checkoutFactory.loadTTDishList(this.orderListModel.list)
        this.checkOutModel = {
          total: checkoutFactory.total(),
          count: checkoutFactory.count(),
          list: checkoutFactory.list
        }
        this.checkOutType = 'checkOut'
        this.discountStr = ''
        this.password = pw
      }
      setTimeout(async () => {
        if (GlobalConfig.checkOutUsePassword) {
          popAuthorize('', async (pw) => {
            await realCheckOut(pw)
          }, true, false, this.id)
        } else {
          await realCheckOut()
        }
      }, 20)
    },
    async realInitial () {
      this.breakCount = 0
      window.onkeydown = this.listenKeyDown

      if (GlobalConfig.getFocus) {
        addToTimerList(setInterval(this.autoGetFocus, 1000))
      }
      await this.initialUI(true)
    },
    updateActiveDCT (index) {
      this.activeDCT = null
      this.activeDCT = index
    },
    updateFilteredDish () {
      if (this.activeCategoryId || this.displayInput) {
        console.log('should update Filtered Dish')
        this.filteredDish = this.filterDish()
      }
    },
    debounce: debounce((f) => {
      f()
    }, 90),
    getCodeAndCountFromInput (input = '') {
      let [code, count] = ['', 1]
      if (input.includes('*')) {
        [code, count] = input.split('*')
        if (GlobalConfig.numberFirst) {
          [code, count] = [count, code]
        }
        count = parseInt(count)
      } else {
        code = input
      }
      return [code, count]
    },
    filterDish () {
      let list = this.dishes
      if (!this.displayInput) {
        const dct = this.dct[this.activeDCT]
        list = list.filter((item) => {
          return parseInt(item.dishesCategoryTypeId) === parseInt(dct.id)
        })
        list = list.filter((item) => {
          return parseInt(item.categoryId) === parseInt(this.activeCategoryId)
        })
      }

      if (this.input) {
        if (this.input !== '' && !this.input.includes('/')) {
          const [buffer] = this.getCodeAndCountFromInput(this.input)
          return list.filter((item) => {
            return item.code.toLowerCase().startsWith(buffer.toLowerCase())
          }).sort((a, b) => {
            if (a.code.length > b.code.length) {
              return 1
            } else if (a.code.length === b.code.length) {
              return 0
            } else {
              return -1
            }
          }).concat(list.filter((item) => {
            return item.dishName.toLowerCase().startsWith(buffer.toLowerCase()) && !item.code.toLowerCase().startsWith(buffer.toLowerCase())
          }))
        }
      }

      return list
    }
  },
  computed: {
    ...mapState(['pinDialogShow']),
    telHint: function () {
      const info = this.userInfo
      return info.reduce((arr, i) => {
        arr.push(i.email)
        return arr
      }, [])
    },
    realAddressInfo () {
      if (this.tableDetailInfo.order.rawAddressInfo?.length > 0) {
        try {
          return JSON.parse(this.tableDetailInfo.order.rawAddressInfo)
        } catch (e) {
          return null
        }
      } else {
        return null
      }
    },

    consumeTypeId () {
      return parseInt(this.tableDetailInfo.order.consumeTypeId ?? 1)
    },

    overrideConsumeTypeId () {
      if ((this.overrideConsumeTypeIndex || this.overrideConsumeTypeIndex === 0) && this.consumeTypeList?.length > this.overrideConsumeTypeIndex) {
        return parseInt(this.consumeTypeList[this.overrideConsumeTypeIndex].id)
      } else {
        return null
      }
    },

    realConsumeTypeId () {
      return this.overrideConsumeTypeId && this.overrideConsumeTypeId !== this.consumeTypeId ? this.overrideConsumeTypeId : this.consumeTypeId ?? 1
    },

    consumeTypeStatusId () {
      return parseInt(this.tableDetailInfo.order.consumeTypeStatusId ?? 2)
    },

    filteredC: function () {
      const dct = this.dct[this.activeDCT]
      return this.categories.filter((item) => {
        return parseInt(item.dishesCategoryTypeId) === parseInt(dct.id)
      })
    }
  },
  watch: {
    activeDCT: function () {
      this.input = null
      this.displayInput = null
      this.activeCategoryId = null
      this.updateFilteredDish()
    },
    dishes: function () {
      this.updateFilteredDish()
    },
    activeCategoryId: function (val) {
      this.updateFilteredDish()
    },
    input: function () {
      this.debounce(
        this.updateFilteredDish
      )
    },
    refresh: function () {
      this.autoGetFocus()
      this.realInitial()
    },
    realConsumeTypeId (val) {
      this.reloadDish(val, true)
    }
  },
  async created () {
    await getConsumeTypeList()
    await this.getDCT()
    const selectableId = GlobalConfig.selectableConsumeTypeId?.split(',')
      .map(d => parseInt(d))
    if (selectableId?.length > 0) {
      this.consumeTypeList = consumeTypeList.filter(
        c => selectableId.includes(parseInt(c.id))
      )
    } else {
      this.consumeTypeList = consumeTypeList
    }

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
  background: url("/Resource/点餐/菜菜单窗口的拖拽键@2x.png") top / contain no-repeat;
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

.input-field > label {
  font-size: 14px;
}

.dishCardList {
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-bottom: 120px;
  width: 100%;
  grid-gap: 6px;
}

@media screen and (max-width: 1280px ) {
  .dishCardList {
    grid-template-columns: repeat(4, 1fr);
  }
}

.dragscroll {
  overflow-x: hidden;
}

.dishCardListContainer {
  width: 100%;
  height: 100vh;
}

.bottomCart {
  position: fixed;
  width: calc(100vw - 304px);
  height: 100vh;
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

.v-list-item-group .v-list-item--active {
  color: #367aeb;
  font-weight: bold;
  border-right: 3px solid #367aeb;
}

.menu-item {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: calc(20% - 4px);
  padding: 4px;
  margin: 2px;
  height: 64px;
  text-transform: capitalize;
  font-size: 18px;
}

.menu-item.active {
  border: none;
  background: #367aeb !important;
  color: white !important;
  font-weight: bold;
}

.menu-always {
  width: fit-content;
  margin: 2px;
  font-size: 18px;
  padding: 4px 8px;
}

.menu-always.active {
  border: none;
  background: #367aeb !important;
  color: white !important;
  font-weight: bold;
}

.categoryTypeItem {
  width: fit-content;
  padding: 8px 12px;
  text-transform: capitalize;
  font-size: 20px;
}

.categoryTypeItem.active {
  font-weight: bold;
  text-transform: capitalize;
  color: #367aeb !important;
  border-bottom: 2px solid #367aeb;
}

.consumeTypeItem {
  width: max-content;
  padding: 8px 12px;
  white-space: nowrap;
  text-transform: capitalize;
  font-size: 20px;
}

.consumeTypeItem.active {
  font-weight: bold;
  text-transform: capitalize;
  background: #367aeb !important;
  color: #ffffff;
  border-bottom: 2px solid #367aeb;
}

</style>
