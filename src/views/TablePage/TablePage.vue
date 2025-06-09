<template>
  <div
    class="gradient"
  >
    <v-navigation-drawer
      app
      color="transparent"
      dark
      mini-variant
      mini-variant-width="72"
      permanent
      stateless
    >
      <div
        class="d-flex flex-column py-4 pt-3"
        style="height: 100vh"
      >
        <div style="display: grid;grid-auto-flow: row;;grid-gap: 24px;align-content: center">
          <logo-display />
          <nav-button
            v-for="m in currentMenu"
            :key="m.icon"
            :color="m.color"
            :icon="m.icon"
            :is-active="false"
            :loading="isSendingRequest"
            :text="m.title"
            @click="m.action"
          >
          </nav-button>
        </div>
        <v-spacer />
      </div>
    </v-navigation-drawer>

    <v-main app>
      <v-app-bar
        color="transparent"
        dark
        elevation="0"
        tile
      >
        <restaurant-logo-display></restaurant-logo-display>
        <v-spacer />

        <template v-if="!globalLoading">
          <div style="display: grid;grid-gap: 8px;grid-auto-flow: column">
            <v-card
              v-for="m in menu"
              :key="m.name"
              :class="currentView===m.name?' active':''"
              :disabled="m.disable()"
              class="navigationPillItem"
              color="transparent"
              flat
              @click="currentView=m.name"
            >
              <v-icon left>{{ m.icon }}</v-icon>
              {{ $t(m.name) }}
            </v-card>
          </div>
          <v-spacer></v-spacer>
          <v-icon class="mr-2">mdi-map-marker-radius</v-icon>
          <div class=" text-capitalize mr-6">
            {{ currentTableName }}
          </div>
          <div class="text-body-2 d-flex align-center">

            <template v-if="haveOrder">
              <v-icon>mdi-office-building-marker</v-icon>
              <div
                class="ml-2  text-truncate"
                @click="consumeTypeDialogShow=true"
              >
                {{ findConsumeTypeById(realConsumeTypeId) }}
              </div>

              <v-icon class="mr-2 ml-6">mdi-account-circle</v-icon>
              <div>
                {{ tableDetailInfo?.order?.servant }}
              </div>

              <!-- Member status indicator and selection button -->
              <div
                class="d-flex align-center ml-6"
                @click="showMemberSelectionDialog = true"
              >
                <span
                  v-if="currentMemberId"
                  class="font-weight-bold d-flex align-center"
                  style="color: #1565C0; background-color: #BBDEFB; padding: 4px 12px; border-radius: 20px;"
                >
                  <v-icon
                    left
                    size="18"
                    class="mr-1"
                    color="#1565C0"
                  >mdi-account-card</v-icon>
                  {{ currentMemberName || $t("MemberSelected") }}
                </span>
                <span
                  v-else
                  class="d-flex align-center"
                >
                  <v-icon
                    left
                    size="18"
                    class="mr-1"
                    color="grey darken-1"
                  >mdi-account-card</v-icon>
                  {{ $t("SelectMember") }}
                </span>
                <v-btn
                  class="ml-2"
                  icon
                  small
                  @click.stop="showMemberSelectionDialog = true"
                >
                  <v-icon :color="currentMemberId ? '#1565C0' : 'grey darken-1'">
                    {{ currentMemberId ? "mdi-account-edit" : "mdi-account-plus" }}
                  </v-icon>
                </v-btn>
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <div style="width: 200px"></div>
        </template>

      </v-app-bar>
      <div>
        <v-card
          v-cloak
          class="flex-grow-1 flex-column"
          color="grey lighten-4"
          elevation="0"
          rounded="lg"
          style="height: calc(100vh - 64px);grid-template-columns: 1fr 330px;display: grid"
        >
          <div>
            <template v-if="currentView==='Menu'">
              <menu-fragement
                :consume-type-id="consumeTypeId"
                :override-consume-type-id="overrideConsumeTypeId"
                @dish-add="findAndOrderDish"
                @order-add="orderAdd"
                @dish-detail="(dish)=>showModification(dish,1,null)"
              />
            </template>
            <template v-else-if="currentView==='Delivery'">
              <address-page
                v-if="consumeTypeId===2"
                :consume-type-status-id="consumeTypeStatusId"
                :raw-address-info="realAddressInfo"
                class="mr-2"
                @address-change="submitRawAddressInfo"
              />
            </template>
            <template v-else-if="currentView==='Reservation'">
              <reservation-list-page
                :id="id"
                :reservation-list="reservations"
                @need-refresh="refreshReservation"
              />
            </template>
          </div>
          <v-card
            class="d-flex justify-space-between flex-shrink-0 flex-column fill-height"
            color="grey lighten-5"
            rounded="lg"
            style="height: calc(100vh - 64px)"
          >
            <template v-if="!globalLoading">
              <keep-alive>
                <dish-card-list
                  v-if="cartListModel.list.length === 0"
                  :click-callback="addToSplit"
                  :default-expand="cartListModel.list.length === 0"
                  :discount-ratio="discountRatio"
                  :dish-list-model="orderListModel"
                  :source-marks="sourceMarks"
                  :title="$t('DishesInBasket')"
                  @removeAllFromSplit="removeAllFromSplitOrder"
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
                        :disabled="!canOperate || splitOrderListModel.list.length > 0"
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
                    class="primary mr-2"
                    dark
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
            </template>

          </v-card>
        </v-card>
      </div>
    </v-main>
    <template v-if="splitOrderListModel.list.length > 0">
      <div
        v-cloak
        id="splitOrderContainer"
        class="d-flex justify-end align-end"
        style="
            position: fixed;
            background: rgba(0, 0, 0, 0.4);
            top: 0;
            height: 100vh;
            z-index: 1;
            left: 0;
            width: calc(100vw - 330px);
          "
        @click="removeAllFromSplitOrder"
      >
        <div
          class="d-flex "
          style="width: 400px;height: calc(100vh - 64px)"
          @click.stop
        >
          <div
            class="pa-2 pt-4 gradient"
            style="display: grid;grid-auto-flow: row;grid-auto-rows: min-content;
                grid-gap: 24px"
          >
            <nav-button
              color="grey"
              icon="mdi-close"
              text="Cancel"
              @click="removeAllFromSplitOrder()"
            ></nav-button>
            <nav-button
              color="pink"
              icon="mdi-minus"
              text="DishCancel"
              @click="showDeleteDishDialog()"
            ></nav-button>
            <nav-button
              color="orange darken-3"
              icon="mdi-sale"
              text="GiveDishADiscount"
              @click="dishesSetDiscount()"
            ></nav-button>
            <nav-button
              color="indigo"
              icon="mdi-inbox-arrow-up"
              text="tableChange"
              @click="dishesChangeTable()"
            ></nav-button>
            <nav-button
              color="blue"
              icon="mdi-receipt-text-arrow-left"
              text="TemporaryBill"
              @click="printZwichenBon()"
            ></nav-button>
          </div>
          <v-card
            height="calc(100vh - 64px)"
            tile
            width="330"
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

    <!--      right panel-->

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
          >{{ $t("submit") }}
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
      :discount-ratio="discountRatio"
      :orderId="currentOrderId"
      :total-price="totalPrice"
      :total-price-without-any-discount="orderListModel.list"
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
          {{ $t("RevocationDishReason") }}
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
            {{ $t("Confirm") }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
    <v-dialog
      v-model="consumeTypeDialogShow"
      max-width="600"
    >
      <v-card class="pa-4">
        <div class="text-h5 font-weight-black">
          {{ $t("SelectConsumeType") }}
        </div>
        <v-card
          v-for="ct of consumeTypeList"
          :key="ct.id + 'consumeType'"
          :class="realConsumeTypeId===ct.id?'active':''"
          class="mt-2 pa-4 text-body-1"
          color="grey lighten-4"
          flat
          rounded="lg"
          @click="overrideConsumeTypeId = ct.id;consumeTypeDialogShow=false"
        >
          {{ ct.name }}
        </v-card>
      </v-card>
    </v-dialog>

    <member-selection-dialog
      v-model="showMemberSelectionDialog"
      :current-member-id="currentMemberId"
      @update="handleMemberUpdate"
    />

    <!-- Asset Selection Dialog -->
    <asset-selection-dialog
      v-model="showAssetSelectionDialog"
      :initial-assets="selectedAssets"
      @save="handleAssetSelection"
    />
  </div>
</template>

<script>
import {
  consumeTypeList,
  fastSweetAlertRequest,
  findConsumeTypeById,
  getConsumeTypeList,
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
import { optionalAuthorizeAsync, printZwichenBonPost } from '@/oldjs/api'
import { dragscroll } from 'vue-dragscroll'

import { findDish, goHome, setDefaultValueForApply } from '@/oldjs/StaticModel'
import { printNow } from '@/oldjs/Timer'
import GlobalConfig from '../../oldjs/LocalGlobalSettings'

import IKUtils from 'innerken-js-utils'

import {
  acceptOrder,
  deleteDish,
  getUUidByOrderId,
  reprintOrder,
  safeRequest,
  showSuccessMessage,
  writeCompanyInfo
} from '@/api/api'

import i18n from '../../i18n'
import dayjs from 'dayjs'
import { TableFilter } from '@/api/tableService'
import BuffetStartDialog from '@/views/TablePage/Dialog/BuffetStartDialog'
import AddressPage from '@/views/TablePage/Address/AddressFragment.vue'
import DiscountDialog from '@/views/TablePage/Dialog/DiscountDialog'
import ModificationDrawer from '@/views/TablePage/Dialog/ModificationDrawer'
import DishCardList from '@/views/TablePage/Dish/DishCardList'
import uniqBy from 'lodash-es/uniqBy'
import MemberSelectionDialog from '@/views/TablePage/Dialog/MemberSelectionDialog.vue'
import AssetSelectionDialog from '@/views/TablePage/Dialog/AssetSelectionDialog.vue'
import { checkout, getCurrentOrderInfo, setOrderAutoClaimCustomerId, trackAssetUsage } from '@/api/Repository/OrderInfo'
import { getUserBusinessLayerDetails, getCurrentBLID, getMemberDisplayName } from '@/api/MemberCloud/MemberCloudApi'
import { DishDocker } from 'aaden-base-model/lib'
import { getOrderInfo } from '@/api/aaden-base-model/api'
import LogoDisplay from '@/components/LogoDisplay.vue'
import { cartListFactory } from '@/views/TablePage/cart'
import MenuFragement from '@/views/TablePage/OrderFragment/MenuFragement.vue'
import NavButton from '@/components/navigation/NavButton.vue'
import RestaurantLogoDisplay from '@/components/RestaurantLogoDisplay.vue'
import { mapActions, mapMutations } from 'vuex'
import { getReservationsByTableId } from '@/api/ReservationService'
import ReservationListPage from '@/views/TablePage/ReservationList/ReservationListPage.vue'
import {
  setCartListInFirebase,
  setCheckOutStatusInFirebase,
  setOrderListInFirebase,
  setUuidInFirebase
} from '@/api/customerDiaplay'
import { round } from 'lodash-es'
import router from '@/router'

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
    ReservationListPage,
    RestaurantLogoDisplay,
    NavButton,
    MenuFragement,
    LogoDisplay,
    MemberSelectionDialog,
    AssetSelectionDialog,
    BuffetStartDialog,
    AddressPage,
    DiscountDialog,
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
      extraDishShow: false,
      modificationShow: false,
      discountModelShow: null,
      buffetDialogShow: false,
      consumeTypeDialogShow: false,
      isSendingRequest: false,
      oldMod: null,
      currentView: 'Menu',
      discountRatio: 1,
      discountStr: null,
      overrideConsumeTypeId: null,
      dish: {},
      consumeTypeList: [],
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
      // currentMemberId is now a computed property based on tableDetailInfo
      // currentMemberName is now a computed property based on currentMemberInfo
      showMemberSelectionDialog: false,
      showAssetSelectionDialog: false,
      selectedAssets: [],
      assetDiscount: 0,
      currentMemberInfo: null, // Stores the current member's detailed information
      deviceId: -1,
      checkoutId: [],
      reservations: [],
      servantPw: ''
    }
  },
  created () {
    this.deviceId = GlobalConfig.DeviceId
  },
  methods: {
    /**
     * Handles the update event from the MemberSelectionDialog component.
     * Updates the member ID in the backend and refreshes the table details.
     *
     * @param {Object} memberData - The member data object containing id and name
     */
    async handleMemberUpdate (memberData) {
      try {
        const id = memberData?.id ?? ''

        // Explicitly update the Vuex store with the selected member ID
        this.updateCurrentMemberId(id)

        await setOrderAutoClaimCustomerId(this.currentOrderId, id)
        await this.getTableDetail()
      } catch (error) {
        console.error('Error updating member selection:', error)
        IKUtils.showError(this.$t('ErrorUpdatingMemberSelection'))
      }
    },

    /**
     * Handles the save event from the AssetSelectionDialog component.
     * Updates the selected assets and discount in the component's data and saves them to rawAddressInfo.
     * Only saves asset IDs instead of entire asset objects to simplify the data structure.
     *
     * @param {Object} data - The data object containing selectedAssets and discount
     */
    async handleAssetSelection (data) {
      try {
        // Update the selected assets and discount in the component's data
        this.selectedAssets = data.selectedAssets
        this.assetDiscount = data.discount

        // Get current rawAddressInfo or initialize empty object
        const currentAddressInfo = this.realAddressInfo || {}

        // Extract only the asset IDs from the selected assets
        const selectedAssetIds = this.selectedAssets.map(asset => asset.id)

        // Add selected asset IDs to rawAddressInfo
        const updatedAddressInfo = {
          ...currentAddressInfo,
          selectedAssetIds: selectedAssetIds,
          assetDiscount: this.assetDiscount
        }

        // Save updated rawAddressInfo
        await this.submitRawAddressInfo(updatedAddressInfo)

        // Show success message
        IKUtils.toast(this.$t('AssetSelectionSaved'))
      } catch (error) {
        console.error('Error saving asset selection:', error)
        IKUtils.showError(this.$t('ErrorSavingAssetSelection'))
      }
    },

    orderAdd () {
      if (this.cartListModel.list.length > 0 && GlobalConfig.enterToOrder === '1') {
        this.orderDish(this.cartListModel.list)
      }
    },
    handleKeydown (event) {
      if (event.key === 'Escape') {
        if (location.hash.includes('table')) {
          router.push({ path: '/' })
        }
      }
    },
    async deleteAndSaveReason (note) {
      if (note) {
        saveReason(note)
      }
      await deleteDish(this.id, this.splitOrderListModel.list, note, this.servantPw)
    },
    async showDeleteDishDialog () {
      const res = await optionalAuthorizeAsync(
        'boss',
        !GlobalConfig.returnDishWithoutPassword
      )
      this.servantPw = res
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
      showSuccessMessage(i18n.t('Success'))
      await this.initialUI()
      this.deleteDishReasonDialog = false
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
          await this.setOrderListByTableNameInFirebase(
            this.orderListModel.list
          )
        }
      } catch (e) {
        this.orderListModel.loadTTDishList([])
        this.discountRatio = 0
        console.log(e)
      }
    },
    async discountShow () {
      if (GlobalConfig?.discountWithPassword === '1') {
        await optionalAuthorizeAsync('boss', true)
      } else {
        await optionalAuthorizeAsync('', false)
      }
      this.discountModelShow = true
      this.useDishesDiscount = false
    },
    async findAndOrderDish (code, count = 1) {
      if (count < 1) {
        return
      }
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
      // this.overrideConsumeTypeId = overrideConsumeTypeId
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
    async initialUI () {
      this.discountModelShow = false
      this.buffetDialogShow = false
      this.overrideConsumeTypeId = null
      this.cartListModel.clear()
      this.removeAllFromSplitOrder()
      await this.getTableDetail()
      try {
        if (this.consumeTypeStatusId < 2 && this.consumeTypeId === 2) {
          this.currentView = this.menu[1].name
        } else {
          this.currentView = this.menu[0].name
        }
      } catch (e) {

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
      } else if (this.splitOrderListModel.list.length > 0) {
        this.removeAllFromSplitOrder()
      } else if (this.cartListModel.list.length > 0) {
        setCartListInFirebase({}, this.deviceId)
        this.cartListModel.clear()
      } else {
        setCartListInFirebase({}, this.deviceId)
        setOrderListInFirebase({}, this.deviceId)
        goHome()
      }
    },
    discountClear () {
      this.submitDiscount('')
    },

    /**
     * Gets the table details including order information and associated member.
     * This method retrieves information about the current table and its order,
     * and sets the currentMemberId if a member is associated with the order.
     * It also loads any previously selected assets from rawAddressInfo.
     *
     * @returns {Promise<void>}
     */
    async getTableDetail () {
      try {
        this.tableDetailInfo = await getCurrentOrderInfo(this.id)
        if (!this.tableDetailInfo.tableName && !this.tableDetailInfo.tableId) {
          await goHome()
          return
        }
        if (this.tableDetailInfo.isActive) {
          this.tableDetailInfo.consumeTypeName = findConsumeTypeById(this.tableDetailInfo.consumeTypeId).name
          if (this.tableDetailInfo?.order?.discountStr) {
            this.discountStr = this.tableDetailInfo.order.discountStr
          }

          // currentMemberId is now a computed property based on tableDetailInfo.order.autoClaimCustomerId
          // Explicitly update the Vuex store with the current member ID
          this.updateCurrentMemberId(this.tableDetailInfo?.order?.autoClaimCustomerId || null)

          // Load previously selected assets from rawAddressInfo
          if (this.realAddressInfo) {
            // Check if we have selectedAssetIds (new format) or selectedAssets (old format)
            if (this.realAddressInfo.selectedAssetIds) {
              // New format: only IDs are stored
              this.selectedAssets = this.realAddressInfo.selectedAssetIds.map(id => ({ id }))
            } else {
              // Old format: full assets are stored
              this.selectedAssets = this.realAddressInfo.selectedAssets || []
            }
            this.assetDiscount = this.realAddressInfo.assetDiscount || 0
          } else {
            this.selectedAssets = []
            this.assetDiscount = 0
          }
        }
        this.refreshReservation()
        await this.getOrderedDish()
      } catch (e) {
        console.log(e, 'error on table')
      }
    },
    async refreshReservation () {
      this.reservations = await getReservationsByTableId(this.id)
    },
    async orderDish (order, print = true) {
      try {
        if (!this.haveOrder) {
          const password = await optionalAuthorizeAsync('', GlobalConfig.usePassword, null, false, this.id)
          IKUtils.showLoading()
          await informOpenTable(password, this.id)
        } else {
          IKUtils.showLoading()
        }
        await hillo.post(
          'Complex.php?op=addDishesToTable&_servantPw=' + GlobalConfig.defaultPassword,
          {
            params: JSON.stringify(order),
            tableId: this.id,
            printingKitchenBon: print ? 1 : 0
          }
        )
        showSuccessMessage(i18n.t('Success'))
        printNow()
        this.isSendingRequest = false
        if (!GlobalConfig.jumpToHomeWhenOrder) {
          await this.initialUI()
        } else {
          await goHome()
          await this.initialUI()
        }
      } catch (e) {
        logError(this.$t('JSTableOrderFailed') + e.data.info)
      } finally {
        this.isSendingRequest = false
      }
      if (GlobalConfig.useCustomerDisplay) {
        await setOrderListInFirebase({}, this.deviceId)
        await setCartListInFirebase({}, this.deviceId)
      }
    },
    jumpToPayment (paymentType = 'checkOut') {
      const realCheckOut = async (pw) => {
        checkoutFactory.clear()
        checkoutFactory.loadTTDishList(
          paymentType === 'checkOut'
            ? this.orderListModel.list
            : this.splitOrderListModel.list)
        this.checkOutModel = {
          total: checkoutFactory.total(),
          count: checkoutFactory.count(),
          list: checkoutFactory.list
        }
        this.checkoutId = this.checkOutModel.list.map(it => it.code)

        // Apply both regular discount and asset discount if available
        let currentPrice = round(this.checkOutModel.total * (1 - this.discountRatio), 2)

        // Apply asset discount if any
        if (this.assetDiscount > 0) {
          currentPrice = round(currentPrice * (1 - this.assetDiscount), 2)
        }

        const checkoutInfo = await this.doCheckout(currentPrice)

        const shouldGoHome = paymentType === 'checkOut' && checkoutInfo.returnHome
        IKUtils.showLoading()
        if (checkoutInfo.billType === 1) {
          await writeCompanyInfo({
            orderId: this.currentOrderId,
            reasonOfVisit: checkoutInfo.companyBillInfo.reasonOfVisit,
            companyOrPersonName: checkoutInfo.companyBillInfo.companyOrPersonName,
            locationAndDate: checkoutInfo.companyBillInfo.locationAndDate,
            companyLocation: checkoutInfo.companyBillInfo.companyLocation
          })
        }
        const res = await checkout(Object.assign({
          tableId: this.id,
          dishes: checkoutFactory.list,
          password: pw,
          checkOutType: paymentType
        }, checkoutInfo))
        if (res.success) {
          showSuccessMessage(i18n.t('Success'))

          // Use selected assets if any
          if (this.selectedAssets && this.selectedAssets.length > 0) {
            try {
              // Get the order ID from the response or use the current order ID
              const orderId = res.id || this.currentOrderId

              // Call useAsset API for each selected asset
              for (const asset of this.selectedAssets) {
                await trackAssetUsage(asset.id, orderId)
              }

              console.log('Assets used successfully')

              // Clear selected assets after successful checkout
              this.selectedAssets = []
              this.assetDiscount = 0

              // Update rawAddressInfo to remove used assets
              const currentAddressInfo = this.realAddressInfo || {}
              const updatedAddressInfo = {
                ...currentAddressInfo,
                selectedAssetIds: [],
                assetDiscount: 0
              }
              await this.submitRawAddressInfo(updatedAddressInfo)
            } catch (error) {
              console.error('Error using assets:', error)
            }
          }
        }
        if (shouldGoHome) {
          await goHome()
        }
        if (checkoutInfo.printType === 1) {
          const uuid = await getUUidByOrderId(paymentType === 'checkOut'
            ? this.currentOrderId : res.id)
          await setUuidInFirebase(uuid)
          this.showBillDetailQRDialog({ code: uuid })
        }
        if (paymentType !== 'checkOut' || !checkoutInfo.returnHome) {
          await this.initialUI()
          if (this.orderListModel.count() === 0) {
            if (checkoutInfo.returnHome) {
              await goHome()
            }
          }
        }
        printNow()
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
    ...mapActions(['doCheckout']),
    ...mapMutations(['showBillDetailQRDialog', 'updateCurrentMemberId']),
    async cartListModelClear () {
      this.cartListModel.clear()
    },
    async mergeTable () {
      const password = await popAuthorize(
        GlobalConfig.mergeTableUseBossPassword ? 'boss' : ''
      )
      if (password) {
        const tableName = await showTableSelector((t) => TableFilter.activeFilter(t, this.tableDetailInfo.tableName))
        await safeRequest(async () => {
          const res = await hillo.post('Tables.php?op=mergeTables', {
            oldTableName: this.tableDetailInfo.tableName,
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
        console.log(this.tableDetailInfo.tableName)
        const res = await hillo.post('Tables.php?op=change', {
          oldTableName: this.tableDetailInfo.tableName,
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
          oldTableName: this.tableDetailInfo.tableName,
          newTableName: tableName,
          dishes: JSON.stringify(this.splitOrderListModel.list)
        })
        if (res) {
          loadingComplete()
          await this.initialUI()
        }
      }
    },
    ...mapActions(['showOrderAcceptDialog']),
    async acceptOrder (reason = 'ok') {
      let time = null
      if (this.consumeTypeId === 2) {
        const t = await this.showOrderAcceptDialog()
        const addressInfo = this.realAddressInfo
        let timeReal = dayjs()
        if (addressInfo) {
          if (addressInfo.date && addressInfo.time) {
            timeReal = dayjs(
              addressInfo.date + ' ' + addressInfo.time,
              'YYYY-MM-DD HH:mm'
            )
          }
        }
        timeReal = timeReal.add(t, 'm')
        time = timeReal.format('DD.MM.YYYY HH:mm')
      }
      await acceptOrder(time ?? reason, this.id)
      await this.initialUI()
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
      printZwichenBonPost(this.id, this.splitOrderListModel.list)
    },
    async submitDiscount (discountStr = null) {
      if (this.$refs.discount) {
        await this.$refs.discount.submitDiscount(discountStr)
      }
    },
    needSplitOrder: async function () {
      if (this.orderListModel.count() === 0) {
        this.orderListModel.loadTTDishList(this.splitOrderListModel.list)
        this.splitOrderListModel.clear()
        this.jumpToPayment()
      } else {
        this.jumpToPayment('splitOrder')
      }
    },

    async setOrderListByTableNameInFirebase (orderListModelList) {
      // upload orderList to Firebase
      const constData = {}
      let number = 1
      if (orderListModelList.length > 0) {
        orderListModelList.forEach(orderItem => {
          const result = {}
          Object.keys(orderItem).filter(key => {
            return key !== 'change' && key !== 'displayApply'
          }).forEach(key => {
            result[key] = orderItem[key]
          })
          const dishKey = 'dish_' + orderItem.dishesId + number
          number++
          constData[dishKey] = result
        })
      }
      await setOrderListInFirebase(constData, this.deviceId)
    },
    async setCartListByTableNameInFirebase (dishList) {
      const constData = {}
      let number = 1
      if (dishList.length > 0) {
        dishList.forEach(dish => {
          const result = {}
          Object.keys(dish).filter(key => {
            return (key !== 'change' && key !== 'edit' &&
              key !== 'apply' &&
              key !== 'langs' && key !== 'langsDesc' &&
              key !== 'modInfo' && key !== 'options')
          }).forEach(key => {
            result[key] = dish[key]
          })

          result.hasAppend = false

          if (result.displayApply.length > 0) {
            const aNameArr = []
            const priceInfoArr = []
            result.displayApply.forEach(i => {
              aNameArr.push((i.groupName + ':' + i.value))
              priceInfoArr.push(i.priceInfo)
            })

            result.aNameArr = aNameArr
            result.priceInfoArr = priceInfoArr
            result.hasAppend = true
          }

          const dishKey = 'cart_' + dish.code + number
          number++

          constData[dishKey] = result
        })
      }

      await setCartListInFirebase(constData, this.deviceId)
    }

  },
  computed: {
    /**
     * Gets the current member ID from the tableDetailInfo.
     * This computed property ensures that currentMemberId is always in sync with the backend.
     *
     * @returns {string|null} The current member ID or null if no member is selected
     */
    currentMemberId () {
      return this.tableDetailInfo?.order?.autoClaimCustomerId || null
    },

    /**
     * Gets the current member name from currentMemberInfo.
     * This computed property ensures that currentMemberName is always in sync with the currentMemberId.
     *
     * @returns {string|null} The current member name or null if no member is selected
     */
    currentMemberName () {
      if (!this.currentMemberId) return null

      // If we have currentMemberInfo, use it to get the name
      if (this.currentMemberInfo) {
        return getMemberDisplayName(this.currentMemberInfo, this.$t('MemberSelected'))
      }

      // Fallback if currentMemberInfo is not available yet
      return this.$t('MemberSelected')
    },
    menu () {
      const menu = [{
        icon: 'mdi-book-open',
        name: 'Menu',
        disable: () => this.haveOrder && this.consumeTypeStatusId < 1
      }]
      if (this.consumeTypeId === 2) {
        menu.push({
          icon: 'mdi-map-clock',
          name: 'Delivery',
          disable: () => this.haveOrder && this.consumeTypeStatusId < 1
        })
      }
      menu.push(
        {
          icon: 'mdi-calendar-blank-outline',
          name: 'Reservation',
          disable: () => (this.haveOrder && this.consumeTypeStatusId < 1) || this.reservations.length === 0
        }
      )
      return menu
    },
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
      return this.tableDetailInfo?.order?.sourceMarks ?? []
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
      return this.overrideConsumeTypeId && this.overrideConsumeTypeId !== this.consumeTypeId
        ? this.overrideConsumeTypeId
        : this.consumeTypeId ?? 1
    },
    consumeTypeStatusId () {
      return parseInt(this.tableDetailInfo?.order?.consumeTypeStatusId ?? 2)
    },
    currentMenu () {
      const normalActions = []
      if (this.canOperate) {
        // Add asset selection button
        normalActions.push({
          title: 'SelectAssets',
          icon: 'mdi-package-variant-closed',
          color: 'blue',
          action: () => {
            this.showAssetSelectionDialog = true
          }
        })

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
              this.buffetDialogShow = true
            }
          })
        }
      } else if (this.consumeTypeStatusId < 2) {
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
    },
    cartListModelHash () {
      return this.cartListModel.list.map(it => {
        return {
          name: it.name,
          count: it.count,
          allInfo: it
        }
      })
    },
    checkoutShow () {
      return this.$store.state.showCheckoutDialog
    },
    orderListModelList () {
      return this.orderListModel.list
    }
  },
  watch: {
    /**
     * Watches for changes to the currentMemberId and updates currentMemberInfo.
     * When currentMemberId changes, it fetches the member's details using getUserBusinessLayerDetails.
     *
     * @param {string|null} newVal - The new member ID
     * @param {string|null} oldVal - The previous member ID
     * @returns {Promise<void>}
     */
    async currentMemberId (newVal, oldVal) {
      if (newVal === oldVal) return

      try {
        // Update the Vuex store with the new member ID
        this.updateCurrentMemberId(newVal)

        if (newVal) {
          // Get the business layer ID
          const blId = await getCurrentBLID()

          // Get the user's business layer details
          this.currentMemberInfo = await getUserBusinessLayerDetails(newVal, blId)
        } else {
          // Clear currentMemberInfo when no member is selected
          this.currentMemberInfo = null
        }
      } catch (error) {
        console.error('Error updating member info:', error)
        this.currentMemberInfo = null
      }
    },

    async checkoutShow (val) {
      if (!val) {
        this.checkoutId = []
      }
      await setCheckOutStatusInFirebase(val, this.deviceId, this.checkoutId)
    },
    cartListModelHash (val) {
      const res = val.map(it => it.allInfo)
      this.setCartListByTableNameInFirebase(res)
    },
    orderListModelList (val) {
      this.setOrderListByTableNameInFirebase(val)
    }
  },
  async activated () {
    this.globalLoading = true
    try {
      await this.initialUI()
    } catch (e) {
      IKUtils.showError(e.message)
      console.log(e)
    }

    this.globalLoading = false
    // No need to reset currentMemberId as it's now a computed property based on tableDetailInfo
  },
  beforeDestroy () {
    // 移除事件监听器
    window.removeEventListener('keydown', this.handleKeydown)
  },
  async mounted () {
    this.globalLoading = true
    try {
      await getConsumeTypeList()
      this.consumeTypeList = consumeTypeList
      await this.initialUI()
      if (GlobalConfig.escBackToHome === '1') {
        window.addEventListener('keydown', this.handleKeydown)
      }
    } catch (e) {
      IKUtils.showError(e.message)
      console.log(e)
    }

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
  border-radius: 12px;
  display: flex;
  color: white;
  align-items: center;
  padding: 8px 16px;
}

.navigationPillItem.active {
  background: rgba(255, 255, 255, 0.2) !important;
  font-weight: bold;
}

.v-navigation-drawer >>> .v-navigation-drawer__border {
  display: none
}

</style>
