<template>
  <div
      class="gradient"
  >
    <v-navigation-drawer
        app
        dark
        color="transparent"
        mini-variant
        mini-variant-width="72"
        permanent
        stateless
        style="z-index: 100;"
    >
      <div
          class="d-flex flex-column py-2 pt-3"
          style="height: 100vh"
      >
        <div style="display: grid;grid-auto-flow: row;;grid-gap: 24px;align-content: center">
          <logo-display/>
          <nav-button
              v-for="m in currentMenu"
              :key="m.icon"
              @click="m.action"
              :loading="isSendingRequest"
              :text="m.title"
              :icon="m.icon"
              :color="m.color"
              :is-active="false"
          >
          </nav-button>
        </div>
        <v-spacer/>
      </div>
    </v-navigation-drawer>
    <template v-if="!globalLoading">
      <v-main app>
        <div
            style="
            display: grid;
            grid-template-columns:  1fr 330px;
          "
        >
          <v-card
              tile
              v-cloak
              class="flex-grow-1 flex-column"
              color="grey lighten-4"
              elevation="0"
              style="height: 100vh"
          >

            <v-card
                class="d-flex pa-3 px-4 align-center"
                color="grey lighten-2"
                elevation="0"
                tile
            >

              <div style="display: grid;grid-gap: 8px;grid-auto-flow: column">
                <v-card
                    flat
                    :disabled="haveOrder&&consumeTypeStatusId<1"
                    v-for="m in menu"
                    :key="m.name"
                    :class="currentView===m.name?' active':''"
                    class="navigationPillItem"
                    @click="currentView=m.name"
                >
                  <v-icon left>{{ m.icon }}</v-icon>
                  {{ $t(m.name) }}
                </v-card>
              </div>

              <v-spacer></v-spacer>
              <div class="text-body-2 d-flex align-center">
                <v-icon class="mr-2">mdi-map-marker-radius</v-icon>
                <div class=" text-capitalize mr-6">
                  {{ currentTableName }}
                </div>
                <template v-if="haveOrder">
                  <v-icon>mdi-office-building-marker</v-icon>
                  <div class="ml-2  text-truncate">
                    {{ findConsumeTypeById(consumeTypeId) }}
                  </div>

                  <v-icon class="mr-2 ml-6">mdi-account-circle</v-icon>
                  <div>
                    {{ tableDetailInfo.servant }}
                  </div>
                </template>
              </div>

            </v-card>
            <template v-if="currentView===menu[0].name">
              <menu-fragement
                  @dish-add="findAndOrderDish"
                  @dish-detail="(dish,override)=>showModification(dish,1,null,override)"
              />
            </template>
            <template v-else-if="currentView===menu[1].name">
              <address-page
                  v-if="consumeTypeId===2"
                  :consume-type-status-id="consumeTypeStatusId"
                  :raw-address-info="realAddressInfo"
                  class="mr-2"
                  @accept="acceptOrderWithTime"
                  @reject="rejectOrder"
                  @address-change="submitRawAddressInfo"
              />
            </template>
          </v-card>
          <v-card
              class="d-flex justify-space-between flex-shrink-0 flex-column fill-height"
              color="grey lighten-5"
              style="height: 100vh"
              tile
          >
            <keep-alive>
              <dish-card-list
                  v-if="cartListModel.list.length === 0"
                  :click-callback="addToSplit"
                  :default-expand="cartListModel.list.length === 0"
                  :discount-ratio="discountRatio"
                  :dish-list-model="orderListModel"
                  :source-marks="sourceMarks"
                  :title="$t('DishesOrdered')"
                  @discount-clear="discountClear"
              >
                <template
                    v-if="canOperate"
                    #action
                >
                  <v-btn
                      :loading="isSendingRequest"
                      class="grey lighten-4 mr-2"
                      elevation="0"
                      icon
                      @click="zwitchenBon"
                  >
                    <v-icon>mdi-receipt-text-clock</v-icon>
                  </v-btn>
                  <v-btn
                      :loading="isSendingRequest"
                      class="grey lighten-4 mr-2"
                      elevation="0"
                      icon
                      @click="discountShow"
                  >
                    <v-icon>mdi-sale</v-icon>
                  </v-btn>
                </template>
                <template v-slot:default="{ total }">
                  <div class="pa-2">
                    <v-btn
                        :disabled="consumeTypeStatusId <= 1"
                        block
                        color="green lighten-4 black--text"
                        elevation="0"
                        height="64"
                        rounded
                        @click="jumpToPayment()"
                    >
                      <v-icon
                          class="mr-6"
                          left
                          size="28"
                      >mdi-wallet
                      </v-icon>
                      <span class="text-h5">{{ total | priceDisplay }}</span>
                    </v-btn>
                  </div>
                </template>
              </dish-card-list>
            </keep-alive>
            <dish-card-list
                v-if="cartListModel.list.length > 0"
                ref="cartList"
                :click-callback="removeDish"
                :default-expand="true"
                :dish-list-model="cartListModel"
                :reset-current-expand-index="true"
                :reverse="true"
                :show-edit="true"
                :show-number="true"
                :title="$t('New')"
                color="primary"
            >
              <template #action>
                <v-btn
                    class="error lighten-4 mr-2"
                    elevation="0"
                    icon
                    @click="orderDish(cartListModel.list,false)"
                >
                  <v-icon> mdi-printer-off</v-icon>
                </v-btn>
                <v-btn
                    class="error lighten-4 mr-2"
                    elevation="0"
                    icon
                    @click="cartListModelClear"
                >
                  <v-icon> mdi-trash-can</v-icon>
                </v-btn>
              </template>
              <template v-slot:default="{ total }">
                <div class="pa-2">
                  <v-btn
                      :loading="isSendingRequest"
                      block
                      color="amber lighten-4 black--text"
                      elevation="0"
                      height="64"
                      rounded
                      @click="orderDish(cartListModel.list)"
                  >
                    <v-icon
                        class="mr-6"
                        left
                        size="28"
                    >mdi-printer
                    </v-icon>
                    <span class="text-h5">{{ total | priceDisplay }}</span>
                  </v-btn>
                </div>
              </template>
            </dish-card-list>
          </v-card>
        </div>
      </v-main>
      <!--      right panel-->
      <template v-if="splitOrderListModel.list.length > 0">
        <div
            v-cloak
            id="splitOrderContainer"
            class="d-flex justify-end"
            style="
            position: fixed;
            background: rgba(0, 0, 0, 0.4);
            top: 0;
            z-index: 50;
            left: 0;
            width: calc(100vw - 330px);
          "
            @click="removeAllFromSplitOrder"
        >
          <div
              class="d-flex "
              style="max-width: 400px; width: 50vw"
              @click.stop
          >
            <div
                class="pa-2 pt-4 gradient"
                style="display: grid;grid-auto-flow: row;grid-auto-rows: min-content;
                grid-gap: 24px"
            >
              <nav-button
                  color="grey"
                  text="Cancel"
                  icon="mdi-close"
                  @click="removeAllFromSplitOrder()"
              ></nav-button>
              <nav-button
                  color="pink"
                  text="DishCancel"
                  icon="mdi-minus"
                  @click="showDeleteDishDialog()"
              ></nav-button>
              <nav-button
                  color="orange darken-3"
                  text="GiveDishADiscount"
                  icon="mdi-sale"
                  @click="dishesSetDiscount()"
              ></nav-button>
              <nav-button
                  color="indigo"
                  text="tableChange"
                  icon="mdi-inbox-arrow-up"
                  @click="dishesChangeTable()"
              ></nav-button>
              <nav-button
                  color="blue"
                  text="TemporaryBill"
                  icon="mdi-receipt-text-arrow-left"
                  @click="printZwichenBon()"
              ></nav-button>
            </div>
            <v-card
                tile
                width="100%"
            >
              <dish-card-list
                  :click-callback="removeFromSplitOrder"
                  :default-expand="true"
                  :discount-ratio="discountRatio"
                  :dish-list-model="splitOrderListModel"
                  :title="$t('operation')"
                  class="flex-grow-1"
                  extra-height="48px"
              >
                <template v-slot:default="{ total }">
                  <div class="pa-2">
                    <v-btn
                        :disabled="consumeTypeStatusId <= 1"
                        block
                        color="warning lighten-4 black--text"
                        elevation="0"
                        height="64"
                        rounded
                        @click="needSplitOrder()"
                    >
                      <v-icon
                          class="mr-6"
                          left
                          size="28"
                      >mdi-receipt-text-plus
                      </v-icon>
                      <span class="text-h5">{{ total | priceDisplay }}</span>
                    </v-btn>
                  </div>
                </template>
              </dish-card-list>
            </v-card>
          </div>
        </div>
      </template>

      <v-dialog
          v-model="extraDishShow"
          max-width="400"
      >
        <v-card>
          <v-card-title class="font-weight-bold">
            {{ currentDish.name }}
          </v-card-title>
          <v-card-text class="mt-4">
            <v-text-field
                v-model="currentDish.currentPrice"
                :label="$t('Price')"
                autofocus
                outlined
            />
            <v-text-field
                v-model="currentDish.currentName"
                :label="$t('name')"
                outlined
            />
            <v-btn
                block
                class="amber lighten-4 black--text"
                elevation="0"
                large
                @click="addExtraDish"
            >{{ $t('submit') }}
            </v-btn>
          </v-card-text>

        </v-card>
      </v-dialog>

      <discount-dialog
          :id="id"
          ref="discount"
          :discount-model-show="discountModelShow"
          :dishesItems="splitOrderListModel.list"
          :initial-u-i="initialUI"
          :orderId="currentOrderId"
          :total-price="totalPrice"
          :useDishesDiscount="useDishesDiscount"
          @visibility-changed="(val) => (this.discountModelShow = val)"
      />

      <modification-drawer
          ref="modification"
          :dish="dish"
          :mod="submitModification"
          :modification-show="modificationShow"
          :old-mod="oldMod"
          :password="password"
          @visibility-changed="changeModification"
      />

      <check-out-drawer
          :id="currentOrderId"
          :check-out-type="checkOutType"
          :current-member-id="currentMemberId"
          :discount-ratio="discountRatio"
          :discount-str="discountStr"
          :order="checkOutModel"
          :password="password"
          :table-id="id"
          :visible="checkoutShow"
          @visibility-changed="changeCheckOut"
      />

      <buffet-start-dialog
          :id="currentOrderId"
          :buffet-dialog-show="buffetDialogShow"
          :initial-u-i="initialUI"
          @visibility-changed="(val) => (this.buffetDialogShow = val)"
      ></buffet-start-dialog>

      <v-dialog
          v-model="deleteDishReasonDialog"
          max-width="600px"
      >
        <v-card class="pa-4">
          <div class="text-body-1 font-weight-bold">
            {{ $t('RevocationDishReason') }}
          </div>
          <v-text-field
              v-model="deleteDishReason"
              :placeholder="
              reasons.length > 0 ? reasons[0] : $t('RevocationDishReason')
            "
              autofocus
              class="mt-4"
              hide-details
              outlined
          />
          <div
              class="mt-2"
              style="
              display: grid;
              grid-template-columns: repeat(4, minmax(0, 1fr));
              grid-gap: 4px;
            "
          >
            <v-card
                v-for="r in reasons"
                :key="r"
                class="d-flex align-center justify-center"
                color="#f6f6f6"
                elevation="0"
                style="height: 48px"
                @click="submitReason(r)"
            >
              {{ r }}
            </v-card>
          </div>
          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn
                block
                class="primary mt-4 lighten-4 black--text"
                elevation="0"
                large
                rounded
                @click="submitReason()"
            >
              {{ $t('Confirm') }}
            </v-btn>
          </div>
        </v-card>
      </v-dialog>

      <member-selection-dialog
          v-model="showMemberSelectionDialog"
          :current-member-id="currentMemberId"
          @update="e=>currentMemberId=e"
      />
    </template>
    <template v-else>
      <div style="height: 100vh;width: 100vw;background: #f6f6f6">
        <div style="width: 300px;height: 100vh;background: #000"></div>
      </div>
    </template>
  </div>
</template>

<script>
import {
  fastSweetAlertRequest,
  findConsumeTypeById,
  informOpenTable,
  loadingComplete,
  logError,
  logErrorAndPop,
  popAuthorize,
  setGlobalTableId,
  showConfirmAsyn,
  showTableSelector,
  showTimedAlert,
  toast
} from '@/oldjs/common'
import hillo from 'hillo'
import { checkOut, optionalAuthorizeAsync, printZwichenBon } from '@/oldjs/api'
import { dragscroll } from 'vue-dragscroll'

import { findDish, goHome, setDefaultValueForApply } from '@/oldjs/StaticModel'
import { printNow } from '@/oldjs/Timer'
import GlobalConfig from '../../oldjs/LocalGlobalSettings'

import IKUtils from 'innerken-js-utils'

import { acceptOrder, deleteDish, reprintOrder, safeRequest, showSuccessMessage } from '@/api/api'

import i18n from '../../i18n'
import dayjs from 'dayjs'
import { TableFilter } from '@/api/tableService'
import BuffetStartDialog from '@/views/TablePage/Dialog/BuffetStartDialog'
import AddressPage from '@/views/TablePage/Address/AddressFragment.vue'
import DiscountDialog from '@/views/TablePage/Dialog/DiscountDialog'
import CheckOutDrawer from '@/components/GlobalDialog/CheckOutDrawer'
import ModificationDrawer from '@/views/TablePage/Dialog/ModificationDrawer'
import DishCardList from '@/views/TablePage/Dish/DishCardList'
import uniqBy from 'lodash-es/uniqBy'
import MemberSelectionDialog from '@/views/TablePage/Dialog/MemberSelectionDialog.vue'
import { getCurrentOrderInfo } from '@/api/Repository/OrderInfo'
import { DishDocker } from 'aaden-base-model/lib'
import { getOrderInfo } from '@/api/aaden-base-model/api'
import LogoDisplay from '@/components/LogoDisplay.vue'
import { cartListFactory } from '@/views/TablePage/cart'
import MenuFragement from '@/views/TablePage/OrderFragment/MenuFragement.vue'
import NavButton from '@/components/navigation/NavButton.vue'

const checkoutFactory = DishDocker.StandardDishesListFactory()
const splitOrderFactory = DishDocker.StandardDishesListFactory()
const orderListFactory = DishDocker.StandardDishesListFactory()

const defaultCurrentDish = {
  currentName: '',
  currentPrice: ''
}

const key = 'reason'

function saveReason (reason) {
  let currentReasonList = getReason()
  currentReasonList.unshift(reason)

  if (currentReasonList.includes(reason)) {
    currentReasonList = uniqBy(currentReasonList)
  }
  if (currentReasonList.length > 12) {
    currentReasonList.pop()
  }
  localStorage.setItem(key, JSON.stringify(currentReasonList))
  return getReason()
}

function getReason () {
  const str = localStorage.getItem(key) ?? '[]'
  return JSON.parse(str) ?? []
}

// endregion
export default {
  name: 'TablePage',
  directives: {
    dragscroll
  },
  components: {
    NavButton,
    MenuFragement,
    LogoDisplay,
    MemberSelectionDialog,
    BuffetStartDialog,
    AddressPage,
    DiscountDialog,
    CheckOutDrawer,
    ModificationDrawer,
    DishCardList
  },
  props: {
    id: {
      type: String
    }
  },
  data: function () {
    return {
      globalLoading: true,
      reasons: getReason(),
      deleteDishReason: '',
      deleteDishReasonDialog: false,
      useDishesDiscount: false,
      checkoutShow: false,
      extraDishShow: false,
      modificationShow: false,
      discountModelShow: null,
      buffetDialogShow: false,
      isSendingRequest: false,
      oldMod: null,
      checkOutType: 'checkOut',
      checkOutModel: {
        total: 0,
        count: 0,
        list: []
      },

      currentView: 'Menu',
      discountRatio: 1,
      discountStr: null,
      overrideConsumeTypeId: null,
      dish: {},
      count: 1,

      Config: GlobalConfig,
      //* */
      splitOrderListModel: splitOrderFactory,
      orderListModel: orderListFactory,
      cartListModel: cartListFactory,
      tableDetailInfo: null,
      currentDish: defaultCurrentDish,
      password: '',
      /* new input */
      currentMemberId: null,
      showMemberSelectionDialog: null,
      menu: [
        {
          icon: 'mdi-book-open',
          name: 'Menu'
        },
        {
          icon: 'mdi-map-clock',
          name: 'Delivery'
        },
        {
          icon: 'mdi-calendar-blank-outline',
          name: 'Reservation'
        }
      ]
    }
  },
  methods: {
    async deleteAndSaveReason (note) {
      if (note) {
        saveReason(note)
      }
      await deleteDish(this.id, this.splitOrderListModel.list, note)
    },
    async showDeleteDishDialog () {
      await optionalAuthorizeAsync(
        'boss',
        !GlobalConfig.returnDishWithoutPassword
      )
      this.reasons = getReason()
      this.deleteDishReason = ''
      this.deleteDishReasonDialog = true
    },
    async submitReason (item) {
      const note = item ?? (this.deleteDishReason || this.reasons[0])
      if (!note) {
        IKUtils.showError('')
        return
      }
      await this.deleteAndSaveReason(note)
      showSuccessMessage()
      this.deleteDishReasonDialog = false
      await this.initialUI()
    },

    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },

    async submitRawAddressInfo (addressInfo) {
      await hillo.post('Orders.php?op=updateRawAddressInfo', {
        orderId: this.currentOrderId,
        rawAddressInfo: JSON.stringify(addressInfo)
      })
      await this.getTableDetail()
      toast()
    },
    async changeServant () {
      const res = await fastSweetAlertRequest(
        this.$t('WaiterPagePasswordPrompt'),
        'password',
        'Orders.php?op=changeServantForTable',
        'pw',
        { tableId: this.id },
        'POST'
      )
      if (res) {
        await goHome()
      }
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
        if (
          this.splitOrderListModel.count() === 0 &&
            this.cartListModel.count() === 0
        ) {
          let discountRatio = 0
          const result = await getOrderInfo(
            this.id,
            false
          )
          const lkDish = result
            .find((d) => d.code === 'lk')
          if (lkDish) {
            lkDish.originPrice = lkDish.price
          }

          //* mark by ju
          const discountInfo = result.filter((r) => r.code === '-1')
          const noDiscount = result.filter((r) => r.code !== '-1')
          this.orderListModel.loadTTDishList(noDiscount)
          if (discountInfo.length > 0) {
            const [discount] = discountInfo
            discountRatio =
                Math.abs(parseFloat(discount.price)) /
                this.orderListModel.total()
          }
          this.discountRatio = discountRatio
        }
      } catch (e) {
        this.orderListModel.loadTTDishList([])
        this.discountRatio = 0
        console.log(e)
      }
    },
    async discountShow () {
      await optionalAuthorizeAsync('', !GlobalConfig.discountWithoutPassword)
      this.discountModelShow = true
      this.useDishesDiscount = false
    },
    async findAndOrderDish (code, count = 1, overrideConsumeTypeId) {
      if (count < 1) {
        return
      }
      this.overrideConsumeTypeId = overrideConsumeTypeId
      const dish = findDish(code)
      if (dish) {
        if (
          parseInt(GlobalConfig.oneStepOrderNumber) !== -1 &&
            count > GlobalConfig.oneStepOrderNumber
        ) {
          const res = await showConfirmAsyn(
            this.$t('AreYouSure'),
            this.$tc('AreYouSureToOrderDish', 1, { n: count })
          )
          if (!res?.value) {
            showTimedAlert('warning', i18n.t('Cancel'))
          }
        }
        dish.name = dish.dishName
        dish.name =
            dish.name.length > 28
              ? dish.name.substring(0, 28) + '...'
              : dish.name
        if (dish.haveMod > 0) {
          const apply = setDefaultValueForApply(dish.modInfo, [])
          this.submitModification(apply, dish, count)
          return
        }
        if (dish.code.toLowerCase().includes('ea')) {
          if (dish.name.includes('-')) {
            try {
              const [name, priceInfo] = dish.name.split('-')
              const [unitPrice, unit] = priceInfo.split('/')
              const [unitBase, unitName] = unit.split(' ')
              const unitCount = await IKUtils.showInput(
                i18n.t('PleaseEnter') + ' ' + unitName + ' ' + i18n.t('AmountOfProductMeasured')
              )
              if (!unitCount) {
                return
              }
              dish.currentPrice = (unitCount / unitBase) * unitPrice
              dish.currentName = `${name} ${unitPrice}/${unit} | ${unitCount}${unitName}`

              dish.originPrice = dish.currentPrice.toString().replace(',', '.')
              dish.price = dish.originPrice
              dish.forceFormat = true
              dish.name = dish.currentName
            } catch (e) {
              console.warn(e)
              this.showExtraDish(dish)

              return
            }
          } else {
            this.showExtraDish(dish)

            return
          }
        }
        this.addDish(dish, parseInt(count))
      }
    },
    showExtraDish (dish) {
      this.currentDish = Object.assign({}, defaultCurrentDish, dish)
      this.extraDishShow = true
    },
    showModification (dish, count, mod = null, overrideConsumeTypeId = null) {
      this.dish = dish
      this.count = count
      if (mod) {
        this.oldMod = mod
      } else {
        this.oldMod = null
      }
      this.overrideConsumeTypeId = overrideConsumeTypeId
      this.modificationShow = true
    },
    removeFromSplitOrder: function (dish) {
      const realItem = IKUtils.deepCopy(dish)
      this.splitOrderListModel.add(realItem, -1)
      this.orderListModel.add(realItem, 1)
    },
    removeAllFromSplitOrder: function () {
      while (this.splitOrderListModel.list.length > 0) {
        this.removeFromSplitOrder(this.splitOrderListModel.list[0])
      }
    },
    dishesSetDiscount: async function () {
      await optionalAuthorizeAsync('', !GlobalConfig.discountWithoutPassword)
      this.discountModelShow = true
      this.useDishesDiscount = true
    },
    addToSplit: function (dish) {
      console.log(dish)
      const item = IKUtils.deepCopy(dish)
      if (item.code === '-1') {
        logErrorAndPop(this.$t('DiscountDishCanNotBeAddedIntoSplitBill'))
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
      dish.originPrice = dish.currentPrice.toString().replace(',', '.')
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
      if (parseInt(this.realConsumeTypeId) !== parseInt(this.consumeTypeId)) {
        dish.overrideConsumeTypeId = this.realConsumeTypeId
        dish.forceFormat = true
      }
      setTimeout(() => {
        this.cartListModel.add(dish, count)
      }, 1)
    },
    removeDish: function (dish) {
      this.cartListModel.add(dish, -1)
    },
    submitModification: function (_mod, dish, count, saveInfo) {
      if (this.count !== 1) {
        count = this.count
      }
      dish.apply = _mod
      dish.forceFormat = true

      this.addDish(dish, count ?? parseInt(this.count))
      dish.edit = () => {
        this.showModification(dish, 1, saveInfo)
      }
    },
    cancel: function () {
      this.modificationShow = false
    },
    async initialUI (forceReload = false) {
      this.discountModelShow = false
      this.buffetDialogShow = false
      this.overrideConsumeTypeId = null
      this.cartListModel.clear()
      this.removeAllFromSplitOrder()
      await this.getTableDetail()
      if (this.consumeTypeStatusId < 2) {
        console.log('here', this.consumeTypeStatusId)
        this.currentView = this.menu[1].name
        console.log(this.currentView)
      } else {
        this.currentView = this.menu[0].name
      }
      setGlobalTableId(this.id)
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
        goHome()
      }
    },
    discountClear () {
      this.submitDiscount('')
    },

    async getTableDetail () {
      try {
        this.tableDetailInfo = await getCurrentOrderInfo(this.id)
        if (!this.tableDetailInfo.tableName) {
          await goHome()
          return
        }
        if (this.tableDetailInfo.isActive) {
          this.tableDetailInfo.consumeTypeName = findConsumeTypeById(this.tableDetailInfo.consumeTypeId).name
          if (this.tableDetailInfo?.order?.discountStr) {
            this.discountStr = this.tableDetailInfo.order.discountStr
          }
        }
        await this.getOrderedDish()
      } catch (e) {
        console.log(e, 'error on table')
      }
    },

    async orderDish (order, print = true) {
      try {
        this.isSendingRequest = true
        if (!this.haveOrder) {
          const password = await optionalAuthorizeAsync('', GlobalConfig.usePassword, null, false, this.id)
          await informOpenTable(password, this.id)
        }
        await hillo.post(
          'Complex.php?op=addDishesToTable&_servantPw=' + GlobalConfig.defaultPassword,
          {
            params: JSON.stringify(order),
            tableId: this.id,
            printingKitchenBon: print ? 1 : 0
          }
        )
        this.cartListModel.clear()
        await this.initialUI()
        printNow()
        if (GlobalConfig.jumpToHomeWhenOrder) {
          this.$nextTick(async () => {
            await goHome()
          })
        }
      } catch (res) {
        logError(this.$t('JSTableOrderFailed') + res.data.info)
      } finally {
        this.isSendingRequest = false
      }
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
        this.checkoutShow = true
        this.checkOutType = 'checkOut'
        this.discountStr = ''
        this.password = pw
      }
      setTimeout(async () => {
        const pw = await optionalAuthorizeAsync(
          '',
          GlobalConfig.checkOutUsePassword,
          '',
          true,
          this.id
        )

        await realCheckOut(pw)
      }, 20)
    },
    async cartListModelClear () {
      this.cartListModel.clear()
    },
    async mergeTable () {
      const password = await popAuthorize(
        GlobalConfig.mergeTableUseBossPassword ? 'boss' : ''
      )
      if (password) {
        const tableName = await showTableSelector(TableFilter.activeFilter)
        await safeRequest(async () => {
          const res = await hillo.post('Tables.php?op=mergeTables', {
            oldTableName: this.tableDetailInfo.tableBasicInfo.name,
            newTableName: tableName
          })

          if (res) {
            goHome()
          }
        })
      }
    },
    async changeTable () {
      const password = await popAuthorize(
        GlobalConfig.changeTableUseBossPassword ? 'boss' : ''
      )
      if (password) {
        const tableName = await showTableSelector(TableFilter.notActiveFilter)
        const res = await hillo.post('Tables.php?op=change', {
          oldTableName: this.tableDetailInfo.tableBasicInfo.name,
          newTableName: tableName
        })
        if (res) {
          goHome()
        }
      }
    },
    dishesChangeTable: async function () {
      const password = await popAuthorize(
        GlobalConfig.changeTableUseBossPassword ? 'boss' : ''
      )
      if (password) {
        const tableName = await showTableSelector()
        const res = await hillo.post('Complex.php?op=dishesChangeTable', {
          oldTableName: this.tableDetailInfo.tableBasicInfo.name,
          newTableName: tableName,
          dishes: JSON.stringify(this.splitOrderListModel.list)
        })
        if (res) {
          loadingComplete()
          await this.initialUI()
        }
      }
    },
    async acceptOrder (reason = 'ok') {
      await acceptOrder(reason, this.id)
      await this.initialUI()
    },
    async acceptOrderWithTime (time) {
      const addressInfo = JSON.parse(this.realAddressInfo)
      let timeReal = dayjs()
      if (addressInfo) {
        if (addressInfo.date && addressInfo.time) {
          timeReal = dayjs(
            addressInfo.date + ' ' + addressInfo.time,
            'YYYY-MM-DD HH:mm'
          )
        }
      }
      timeReal = timeReal.add(time, 'm')
      await this.acceptOrder(timeReal.format('DD.MM.YYYY HH:mm'))
    },
    async rejectOrder () {
      const res = await fastSweetAlertRequest(
        i18n.t('RevocationDishReason'),
        'text',
        'Orders.php?op=rejectTakeAwayOrder',
        'reason',
        { tableId: this.id }
      )
      if (res) {
        await goHome()
      }
    },
    async reprintOrder () {
      this.isSendingRequest = true
      try {
        const res = await IKUtils.showConfirmAsyn(this.$t('AreYouSureToContinue'), this.$t('ReprintAllDishes'))
        if (res.isConfirmed) {
          await hillo.post('Printer.php?op=questReprintOrder', {
            orderId: this.currentOrderId
          })
        }
        toast()
      } catch (e) {
      } finally {
        this.isSendingRequest = false
      }
    },
    async zwitchenBon () {
      this.isSendingRequest = true
      try {
        await reprintOrder(this.currentOrderId, 0)
        toast()
      } catch (e) {
      } finally {
        this.isSendingRequest = false
      }
    },
    printZwichenBon: function () {
      printZwichenBon(this.id, this.splitOrderListModel.list)
    },
    async submitDiscount (discountStr = null) {
      if (this.$refs.discount) {
        await this.$refs.discount.submitDiscount(discountStr)
      }
    },
    checkOut (pw, print = 1, payMethod = 1, tipIncome = 0, memberCardId) {
      if (!memberCardId) {
        memberCardId = null
      }
      checkOut(pw, this.id, print, payMethod, tipIncome, memberCardId)
    },
    needSplitOrder: async function () {
      if (this.orderListModel.count() === 0) {
        this.orderListModel.loadTTDishList(this.splitOrderListModel.list)
        this.splitOrderListModel.clear()
        this.jumpToPayment()
      } else {
        this.password = await optionalAuthorizeAsync('',
          GlobalConfig.checkOutUsePassword, '',
          true, this.id)

        checkoutFactory.clear()
        checkoutFactory.loadTTDishList(this.splitOrderListModel.list)
        this.checkOutModel = {
          total: checkoutFactory.total(),
          count: checkoutFactory.count(),
          list: checkoutFactory.list
        }
        this.checkoutShow = true
        this.checkOutType = 'splitOrder'
      }
    }
  },
  computed: {
    currentOrderId () {
      return this.tableDetailInfo
        ?.order?.id
    },
    currentTableName () {
      return this.tableDetailInfo
        ?.tableName
    },
    canOperate () {
      return this.haveOrder && this.consumeTypeStatusId > 1
    },
    haveOrder () {
      return !!this.currentOrderId
    },
    sourceMarks: function () {
      return this.tableDetailInfo?.sourceMarks ?? []
    },
    totalPrice: function () {
      return this.tableDetailInfo?.order?.totalPrice ?? 0
    },
    realAddressInfo () {
      if (this.tableDetailInfo?.order.rawAddressInfo?.length > 0) {
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
      return parseInt(this.tableDetailInfo?.order?.consumeTypeId ?? 1)
    },
    realConsumeTypeId () {
      return this.overrideConsumeTypeId &&
      this.overrideConsumeTypeId !== this.consumeTypeId
        ? this.overrideConsumeTypeId
        : this.consumeTypeId ?? 1
    },
    consumeTypeStatusId () {
      return parseInt(this.tableDetailInfo?.order?.consumeTypeStatusId ?? 2)
    },
    currentMenu () {
      const normalActions = []
      if (this.canOperate) {
        normalActions.push({
          title: 'reprint',
          icon: 'mdi-printer',
          color: 'red',
          action: () => {
            this.reprintOrder()
          }
        })
        if (this.consumeTypeId !== 2) {
          normalActions.push({
            title: 'tableChange',
            icon: 'mdi-swap-horizontal',
            color: 'indigo',
            action: () => {
              this.changeTable()
            }
          })
          normalActions.push({
            title: 'tableMerge',
            icon: 'mdi-merge',
            color: 'green',
            action: () => {
              this.mergeTable()
            }
          })
        }
        normalActions.push({
          title: 'WaiterTransfer',
          icon: 'mdi-account',
          color: 'deep-orange',
          action: () => {
            this.changeServant()
          }
        })
        if (this.consumeTypeId === 1 || this.consumeTypeId === 5) {
          normalActions.push({
            title: 'ChangeToBuffet',
            icon: 'mdi-silverware',
            color: 'deep-orange',
            action: () => {
              this.changeServant()
            }
          })
        }
      } else if (this.consumeTypeId === 2) {
        normalActions.push(...[0, 15, 20, 30, 60].map(it => ({
          icon: it,
          color: 'green',
          action: () => {
            this.acceptOrderWithTime(it)
          }
        })))
        normalActions.push({
          icon: 'mdi-close',
          color: 'red',
          action: () => {
            this.rejectOrder()
          }
        })
      } else {
        normalActions.push({
          icon: 'mdi-check',
          color: 'success',
          title: 'Accept',
          action: () => {
            this.acceptOrder()
          }
        })
        normalActions.push({
          icon: 'mdi-close',
          color: 'error',
          title: 'Reject',
          action: () => {
            this.rejectOrder()
          }
        })
      }
      return [
        {
          title: 'Return',
          icon: 'mdi-arrow-left',
          color: 'grey',
          action: () => {
            this.back()
          }
        },
        ...normalActions
      ]
    }
  },
  async activated () {
    this.globalLoading = true
    await this.initialUI(true)
    this.globalLoading = false
    this.currentMemberId = null
  },
  async mounted () {
    this.globalLoading = true
    await this.initialUI(true)
    this.globalLoading = false
  }
}
</script>

<style scoped>

.gradient {
  background: #3a7bd5; /* fallback for old browsers */
  background: linear-gradient(to bottom, #3e3e3e, #341d33); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}

.navigationPillItem {
  background: rgba(0, 0, 0, 0.02);
  border-radius: 12px;
  display: flex;
  color: black;
  align-items: center;
  padding: 8px 16px;
}

.navigationPillItem.active {
  background: rgba(0, 0, 0, 0.12);
  font-weight: bold;
}
</style>
