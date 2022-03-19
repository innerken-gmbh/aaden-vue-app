<template>
  <div>
    <template v-cloak>
      <v-main>
        <div style="display: grid;
        grid-template-columns: 350px calc(100vw - 350px);
        background: #f6f6f6;">
          <v-card rounded elevation="4" style="height: 100vh"
                  class=" d-flex justify-space-between flex-shrink-0 flex-column fill-height">
            <v-card @click="back" elevation="0" color="primary"
                    class="d-flex align-center pa-2">
              <v-btn :loading="isSendingRequest" x-large
                     height="48px"
                     color="primary"
                     elevation="0">
                <v-icon>mdi-arrow-left</v-icon>
                {{ $t('Home') }}
              </v-btn>
              <v-spacer></v-spacer>
              <div class="text-h4 text-capitalize white--text mr-4">
                {{ tableDetailInfo.tableBasicInfo.name }}
              </div>

            </v-card>

            <keep-alive>
              <dish-card-list
                  @discount-clear="discountClear"
                  v-if="cartListModel.list.length===0"
                  :dish-list-model="orderListModel"
                  :discount-ratio="discountRatio"
                  :default-expand="cartListModel.list.length===0"
                  :click-callback="addToSplit"
                  :title="$t('haveOrderedDish')"
              >
                <template #action>
                  <v-btn color="warning" elevation="0" :loading="isSendingRequest" @click="discountShow">
                    <v-icon>mdi-sale</v-icon>
                    {{ $t('discount') }}
                  </v-btn>
                </template>
                <v-card class="d-flex align-center">
                  <v-btn height="60px" block :disabled="this.tableDetailInfo.order.consumeTypeStatusId<=1"
                         color="success"
                         elevation="0"
                         x-large
                         @click="jumpToPayment()">
                    <v-icon size="28" left>mdi-calculator-variant</v-icon>
                    <span class="text-h6">{{ $t('payBill') }}</span>
                  </v-btn>
                </v-card>

              </dish-card-list>
            </keep-alive>
            <dish-card-list
                v-if="cartListModel.list.length>0"
                ref="cartList"
                @current-dish-change="cartCurrentDish=$event"
                :reset-current-expand-index="true"
                :show-number="true"
                :reverse="true"
                color="primary"
                :dish-list-model="cartListModel"
                :show-edit="true"
                :click-callback="removeDish"
                :title="$t('新增菜品')"
                :default-expand="true">
              <template #action>
                <v-btn @click="cartListModel.clear()" elevation="0" color="error">
                  <v-icon left>
                    mdi-trash-can
                  </v-icon>
                  清空购物车
                </v-btn>
              </template>
              <template>
                <v-card class="d-flex align-center" color="primary">
                  <v-btn large icon :loading="isSendingRequest"
                         elevation="0"
                         dark
                         @click="orderDish(cartListModel.list,false)" class="mr-1 ml-2">
                    <v-icon>mdi-printer-off</v-icon>
                  </v-btn>
                  <v-btn class="flex-grow-1"
                         elevation="0"
                         x-large
                         height="60px"
                         style="border-radius: 12px"
                         large :loading="isSendingRequest"
                         color="primary"
                         @click="orderDish(cartListModel.list)" dark>
                    <v-icon size="28" left>mdi-printer</v-icon>
                    <span class="text-h6">  {{ $t('下单') }}</span>
                  </v-btn>
                </v-card>
              </template>
            </dish-card-list>
          </v-card>
          <v-card elevation="0" color="transparent" v-cloak
                  class="flex-grow-1 pa-2 px-4 flex-column"
                  style="height: 100vh;">
            <div class="d-flex pl-2 align-baseline" style="height: 52px">
              <template v-if="$vuetify.breakpoint.lgAndUp">
                <v-icon size="20">mdi-office-building-marker</v-icon>
                <h3 class="ml-2 font-weight-regular text-truncate">{{ findConsumeTypeById(consumeTypeId) }}</h3>

              </template>
              <v-icon size="20" class="ml-8">mdi-account-box</v-icon>
              <h3 class="ml-2 font-weight-regular text-truncate">{{ tableDetailInfo.servant }}</h3>
              <address-display
                  class="ml-8"
                  :should-open-menu.sync="addressFormOpen"
                  @address-change="submitRawAddressInfo"
                  v-if="consumeTypeId===2"
                  @accept="acceptOrderWithTime"
                  @reject="rejectOrder"
                  :consume-type-status-id="consumeTypeStatusId"
                  :raw-address-info="realAddressInfo"/>
              <v-spacer></v-spacer>
              <div class="d-flex align-center flex-grow-0 mr-n2" style="max-width: 40%">
                <v-btn icon elevation="0" class="mr-4" disabled>
                  <v-icon>mdi-swap-horizontal</v-icon>
                </v-btn>

                <v-item-group dark v-model="overrideConsumeTypeIndex"
                              style="overflow-x: scroll"
                              class="d-flex">
                  <template v-for="ct of consumeTypeList">
                    <v-item v-bind:key="ct.id+'consumeType'" v-slot="{active,toggle}">
                      <div class="consumeTypeItem mr-1"
                           :class="active?'active':''"
                           @click="toggle">{{ ct.name }}
                      </div>
                    </v-item>
                  </template>
                </v-item-group>
              </div>

            </div>
            <v-divider class="mb-2"></v-divider>
            <v-card v-if="!keyboardMode"
                    class="d-flex"
                    elevation="0"
                    color="transparent"
            >
              <template>
                <v-item-group v-dragscroll v-model="activeDCT"
                              mandatory
                              style="display: grid;
                          grid-gap: 8px;
                          grid-auto-columns: 120px;
                          grid-auto-flow: column;
                          overflow-x: scroll">

                  <v-item v-for="ct of dct" v-bind:key="ct.id+'categorytypes'" v-slot="{active,toggle}">
                    <v-card :elevation="active?4:0"
                            height="48"
                            style="border-radius: 12px;font-size: 18px"
                            class="d-flex justify-center align-center"
                            :color="active?'primary':''"
                            @click="toggle"
                            :dark="active">{{ ct.name }}
                    </v-card>
                  </v-item>
                </v-item-group>
                <v-spacer></v-spacer>
              </template>

              <v-card height="48"
                      @click="keyboardMode=true"
                      elevation="0"
                      style="border-radius: 12px;font-size: 18px"
                      class="d-flex justify-center align-center px-4">

                <v-icon left>mdi-keyboard</v-icon>
                键盘和菜号

              </v-card>

            </v-card>
            <v-divider class="my-2"></v-divider>
            <v-card v-if="!keyboardMode" v-dragscroll color="transparent" elevation="0"
                    class="dragscroll dishCardListContainer flex-grow-1" style=";position: relative">
              <div v-if="!activeCategoryId">
                <v-item-group
                    class="dishCardList">
                  <template v-for="category of filteredC">
                    <v-item v-bind:key="'categorytypes'+category.id" v-slot="{active,toggle}">
                      <v-card elevation="0" style="
                      position: relative;
                      width: 100%;
                      height: 112px;
                      font-size: 18px;
                      font-weight: 500;
                        display: -webkit-box;
                        word-break: break-all;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  border-radius: 12px;
  overflow: hidden;
  text-overflow: ellipsis;"
                              class="d-flex align-center justify-center text-center pa-2"
                              @click="changeCategory(category.id,toggle)">
                        {{ category.name }}
                        <div style="position: absolute;width: 40%;top: 12px;
left: 0;right: 0;margin: auto;height: 6px;border-radius: 3px"
                             :style="{background:category.color}"></div>
                      </v-card>
                    </v-item>
                  </template>
                </v-item-group>
              </div>
              <template v-if="activeCategoryId">
                <div style="display: grid;grid-template-columns: 1fr 108px;grid-gap: 24px">

                  <div class="dishCardList">
                    <v-card elevation="0" v-if="activeCategoryId"
                            style="width: 100%;height: 112px;
                        color: #ff8c50;
                        border-radius: 12px"
                            @click="activeCategoryId=null" class="d-flex align-center"
                    >
                      <div style="width: 100%" class="d-flex flex-column justify-center align-center flex-wrap">
                        <v-icon large color="#ff8c50">mdi-menu-open</v-icon>
                        <div>{{ $t('return') }}</div>
                      </div>
                    </v-card>
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
                  <div></div>

                </div>
                <div v-dragscroll style="width: 108px;height: calc(100vh - 192px);overflow: hidden;position: fixed;right: 12px;top: 132px">
                  <v-item-group

                      style="display: grid;grid-auto-columns: 108px;grid-auto-rows: 48px;grid-auto-flow: row;grid-gap: 4px">
                    <template v-for="category of filteredC">
                      <v-item v-bind:key="'categorytypes'+category.id" v-slot="{active,toggle}">
                        <v-card elevation="0"
                                :dark="activeCategoryId===category.id"
                                :color="activeCategoryId===category.id?'primary':'white'"
                                style="
                      position: relative;
                      width: 100%;
                      height: 48px;
                      font-size: 16px;
                        white-space: nowrap;
  border-radius: 12px;
  overflow: hidden;
  text-overflow: ellipsis;"
                                class="d-flex align-center justify-center text-center pa-2"
                                @click="changeCategory(category.id,toggle)">
                          <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis">
                            {{ category.name }}
                          </div>

                          <div style="position: absolute;width: 40%;bottom: 0;
left: 0;right: 0;margin: auto;height: 6px;border-radius: 3px"
                               :style="{background:category.color}"></div>
                        </v-card>
                      </v-item>
                    </template>
                  </v-item-group>
                </div>

              </template>

              <div style="width: 100%;height: 160px"></div>
            </v-card>
            <div style="display: grid;grid-template-columns: 1fr 360px;height: calc(100vh - 130px);grid-gap: 16px"
                 class="flex-grow-1"
                 v-else>
              <v-card elevation="0" class="l-result-display">

                <div v-if="searchDish.length>0" style="overflow: hidden"
                     class="flex-shrink-1 blue lighten-5">
                  <v-card elevation="0" class="pa-1 py-3">
                    搜索结果
                  </v-card>
                  <template v-for="(dish,index) in searchDish">
                    <v-card @click="searchDishClick(dish.code)" elevation="0"
                            :style="{backgroundColor:''+dish.displayColor,color:''+dish.foreground}" tile
                            :class="index===0?'first':''"
                            :key="dish.id" style="width: 100%;  border-bottom: 2px dashed #e2e3e5; font-size: x-large"
                            class="d-flex  px-1 py-1 align-start">
                      <div class="name mr-2"><span v-code-hide>{{ dish.code }}.</span>{{ dish.dishName }}
                      </div>
                      <v-spacer></v-spacer>
                      <div v-if="dish.isFree==='1'"
                           style="padding:2px 4px;border-radius: 4px;"
                           class="price d-flex align-center green lighten-3 white--text">
                        {{ $t('Frei') }}
                      </div>
                      <div v-else class="price d-flex align-center text-no-wrap text-truncate">
                        {{ dish.price | priceDisplay }}
                      </div>
                    </v-card>
                  </template>
                </div>
                <div class="d-flex align-center justify-center" style="height: 100%;width: 100%" v-else>
                  <div class="d-flex flex-column align-center">
                    <div>
                      <v-icon color="grey lighten-1" x-large>mdi-keyboard</v-icon>
                    </div>
                    <div class="text--disabled">请使用键盘或直接在右侧输入</div>
                  </div>
                </div>

              </v-card>
              <v-card elevation="0" class="d-flex flex-column">
                <v-card height="48"
                        @click="keyboardMode=false"
                        elevation="0"
                        color="grey lighten-2"
                        style="font-size: 18px"
                        class="d-flex align-center px-4">

                  <v-icon left>mdi-menu</v-icon>
                  查看分类菜单
                </v-card>
                <div class="pa-2 text-h6">
                  <template v-if="displayInput">
                    {{ Config.numberFirst ? '数量 * 菜号' : '菜号 * 数量' }}<br>
                    正在输入...
                  </template>
                  <template v-else>
                    {{ feedback }}
                  </template>
                </div>
                <v-spacer></v-spacer>
                <div class="pa-2 flex-shrink-0">
                  <v-text-field
                      hide-details
                      solo-inverted
                      class="my-2"
                      :placeholder="Config.numberFirst?'数量 * 菜号':'菜号 * 数量'"
                      height="96px"
                      style="font-size: 36px"
                      ref="ins"
                      @input="input=displayInput"
                      v-model="displayInput"
                  />
                  <keyboard @input="numberInput"
                            :keys="keyboardLayout"></keyboard>
                </div>
              </v-card>

            </div>
          </v-card>
          <template v-if="false">

            <keep-alive>
              <template>
                <buffet-status-card
                    class="mt-1 mx-2"
                    v-if="consumeTypeId!==1&&consumeTypeId!==2&&consumeTypeId!==5"
                    :buffet-setting-info="realAddressInfo"
                    :current-round="tableDetailInfo.tableBasicInfo.buffetRound"></buffet-status-card>
              </template>
            </keep-alive>

            <v-spacer></v-spacer>

          </template>
          <v-card
              elevation="4"
              height="60px"
              style="position: fixed;
                  z-index:3;
                  bottom: 0;
                  right: 0;
                  overflow-x: scroll;
                  width: calc(100vw - 350px);
               "
              class="d-flex align-center">
            <div class="ml-2" style="display: grid;
            grid-auto-columns: min-content;
            grid-gap: 6px;grid-auto-flow: column">
              <grid-button
                  :loading="isSendingRequest"
                  icon="mdi-printer"
                  color="warning"
                  :text="$t('重新打印')"
                  @click="reprintOrder"
              />
              <grid-button
                  :loading="isSendingRequest"
                  icon="mdi-printer-pos"
                  :text="$t('临时账单')"
                  color="#24b646"
                  @click="zwitchenBon"
              />
              <grid-button
                  :loading="isSendingRequest"
                  icon="mdi-swap-horizontal"
                  color="#ff8c50"
                  v-if="consumeTypeId!==2"
                  :text=" $t('tableChange') "
                  @click="changeTable"
              />
              <grid-button
                  :loading="isSendingRequest"
                  color="#ff4141"
                  icon="mdi-merge"
                  :text="$t('tableMerge')"
                  v-if="consumeTypeId!==2"
                  @click="mergeTable"
              />
              <grid-button
                  :loading="isSendingRequest"
                  icon="mdi-account"
                  :text="$t('Übergabe')"
                  color="#ffb13b"
                  @click="changeServant"
              />
              <template v-if="consumeTypeId===2">
                <grid-button
                    :loading="isSendingRequest"
                    icon="mdi-map"
                    :text="$t('customerAddress')"
                    color="indigo"
                    @click="addressFormOpen=true"
                />
                <template v-if="consumeTypeStatusId<2">
                  <template
                      v-for="(time) in [0,15,20,30,60]"
                  >
                    <grid-button
                        :key="time"
                        color="success"

                        @click="acceptOrderWithTime(time)"
                        icon="mdi-plus"
                        :text="time"/>

                  </template>
                  <grid-button color="error" @click="rejectOrder" icon="mdi-minus" :text="$t('拒绝')"/>
                </template>
              </template>
              <template v-else-if="consumeTypeStatusId<2">
                <grid-button
                    :loading="isSendingRequest"
                    icon="mdi-check"
                    :text="$t('Akzept.')"
                    color="success"
                    @click="acceptOrder"
                />
                <grid-button
                    :loading="isSendingRequest"
                    icon="mdi-close"
                    :text="$t('Ablehnen')"
                    color="error"
                    @click="rejectOrder"
                />
              </template>
              <grid-button
                  :loading="isSendingRequest"
                  v-if="consumeTypeId===1||consumeTypeId===5"
                  icon="mdi-silverware"
                  :text="$t('ChangeToBuffet')"
                  color="#ff7961"
                  @click="buffetDialogShow=true"
              />

            </div>

          </v-card>

        </div>

      </v-main>
      <!--      right panel-->
      <template v-if="splitOrderListModel.list.length>0">
        <div class="bottomCart surface d-flex justify-end"
             style="background: rgba(0,0,0,0.4);  top: 0;
z-index: 50;
left: 350px"
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
                     v-on:click="dishesChangeTable">
                <!--                     v-on:click="dishesChangeTable()">-->
                <v-icon left>mdi-inbox-arrow-up</v-icon>
                {{ $t('tableChange') }}
              </v-btn>
              <v-btn x-large class="  mt-1"
                     v-on:click="printZwichenBon()">
                <v-icon left>mdi-bandcamp</v-icon>
                {{ $t('临时账单') }}
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

      <template v-if="!keyboardMode">
        <keep-alive>
          <v-fade-transition>
            <v-card v-if="input"
                    style="position:fixed;top: 0;right: 0;
            margin: auto;
            box-shadow: 0 3px 16px var(--v-primary-lighten4);
            left: 0;bottom: 0;
            min-width: 300px;
            max-width:calc(100vw - 200px);
            z-index: 15;width: fit-content;height: fit-content"
                    class="pa-4">
              <div>
                <h1>{{ input }}</h1>
              </div>
              <div v-if="searchDish.length>0" style="overflow: hidden"
                   class="flex-shrink-1 blue lighten-5">
                <template v-for="(dish,index) in searchDish">
                  <v-card @click="searchDishClick(dish.code)" elevation="0"
                          :style="{backgroundColor:''+dish.displayColor,color:''+dish.foreground}" tile
                          :class="index===0?'first':''"
                          :key="dish.id" style="width: 100%;  border-bottom: 2px dashed #e2e3e5; font-size: x-large"
                          class="d-flex  px-1 py-1 align-start">
                    <div class="name mr-2"><span v-code-hide>{{ dish.code }}.</span>{{ dish.dishName }}
                    </div>
                    <v-spacer></v-spacer>
                    <div v-if="dish.isFree==='1'"
                         style="padding:2px 4px;border-radius: 4px;"
                         class="price d-flex align-center green lighten-3 white--text">
                      {{ $t('Frei') }}
                    </div>
                    <div v-else class="price d-flex align-center text-no-wrap text-truncate">
                      {{ dish.price | priceDisplay }}
                    </div>
                  </v-card>
                </template>
              </div>
              <div class="text-caption text--secondary" style="font-size: 14px !important;">
                按Enter(回车键)确定<br>
                按ESC键或者退格键关闭此窗口
              </div>
            </v-card>
          </v-fade-transition>
        </keep-alive>
      </template>

      <v-dialog max-width="300" v-model="extraDishShow">
        <v-card width="550">
          <v-card-title class="font-weight-bold"> {{ currentDish.name }}</v-card-title>
          <v-card-text>
            <v-text-field :label="$t('金额')" autofocus v-model="currentDish.currentPrice"/>
            <v-text-field :label="$t('name')" v-model="currentDish.currentName"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="primary" @click="addExtraDish">{{ $t('确定') }}</v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>

      <discount-dialog
          :discount-model-show="discountModelShow"
          :id="id"
          :total-price="tableDetailInfo.order.totalPrice"
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
          :id="tableDetailInfo.order.id"
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
import { getOrderInfo } from 'aaden-base-model/lib/Models/AadenApi'
import Swal from 'sweetalert2'
import hillo from 'hillo'
import {
  checkOut,
  deleteDishes,
  dishesSetDiscount,
  getColorLightness,
  optionalAuthorize,
  printZwichenBon
} from '@/oldjs/api'
import { dragscroll } from 'vue-dragscroll'
import DishCardList from '../components/DishCardList'
import ModificationDrawer from '../components/ModificationDrawer'
import { StandardDishesListFactory } from 'aaden-base-model/lib/Models/AadenBase'
import CheckOutDrawer from '../components/CheckOutDrawer'
import { findDish, getCategoryListWithCache, goHome, processDishList } from '@/oldjs/StaticModel'
import { printNow } from '@/oldjs/Timer'
import CategoryType from 'aaden-base-model/lib/Models/CategoryType'
import GlobalConfig from '../oldjs/LocalGlobalSettings'

import { debounce } from 'lodash-es'
import DishBlock from '@/components/DishBlock'
import IKUtils from 'innerken-js-utils'
import Keyboard from '@/components/Keyboard'
import DiscountDialog from '@/components/fragments/DiscountDialog'
import AddressDisplay from '@/components/AddressDisplay'
import { acceptOrder, safeRequest } from '@/api/api'
import GridButton from '@/components/GridButton'
import { mapGetters } from 'vuex'
import BuffetStartDialog from '@/components/fragments/BuffetStartDialog'
import BuffetStatusCard from '@/components/fragments/BuffetStatusCard'
import i18n from '../i18n'
import dayjs from 'dayjs'
import { TableFilter } from '@/api/tableService'
import { Remember } from '@/api/remember'

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
    BuffetStatusCard,
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
      keyboardMode: Remember.keyboardMode,
      tab: null,
      addressFormOpen: false,
      consumeTypeList: [],

      keyboardLayout: GlobalConfig.topKeyboardKey.split(',').concat(keyboardLayout),
      displayInput: '',
      feedback: '',
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
      searchDish: [],

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

  methods: {
    getColorLightness,
    async mergeTable () {
      const password = await popAuthorize(GlobalConfig.mergeTableUseBossPassword ? 'boss' : '')
      if (password) {
        const tableName = await showTableSelector(TableFilter.activeFilter)
        await safeRequest(async () => {
          const res = await hillo.post('Tables.php?op=mergeTables', {
            oldTableName: this.tableDetailInfo.tableBasicInfo.name,
            newTableName: tableName
          })

          if (res) {
            this.goHome()
          }
        })
      }
    },
    async changeTable () {
      const password = await popAuthorize(GlobalConfig.changeTableUseBossPassword ? 'boss' : '')
      if (password) {
        const tableName = await showTableSelector(TableFilter.notActiveFilter)
        const res = await hillo.post('Tables.php?op=change', {
          oldTableName: this.tableDetailInfo.tableBasicInfo.name,
          newTableName: tableName
        })
        if (res) {
          this.goHome()
        }
      }
    },
    dishesChangeTable: async function () {
      const password = await popAuthorize(GlobalConfig.changeTableUseBossPassword ? 'boss' : '')
      if (password) {
        const tableName = await showTableSelector()
        const res = await hillo.post('Complex.php?op=dishesChangeTable',
          {
            oldTableName: this.tableDetailInfo.tableBasicInfo.name,
            newTableName: tableName,
            dishes: JSON.stringify(this.splitOrderListModel.list)
          })
        if (res) {
          loadingComplete()
          this.initialUI()
        }
      }
    },

    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },
    async editNote () {
      const note = await Swal.fire({
        title: '备注',
        input: 'text',
        inputValue: this.cartCurrentDish.note
      })
      this.$set(this.cartCurrentDish, 'note', note.value)
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

    async changeServant () {
      const res = await fastSweetAlertRequest(this.$t('Zu andere Kellner übergebe'),
        'password',
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

      }
    },
    discountShow () {
      optionalAuthorize(() => {
        this.discountModelShow = true
      }, '', !GlobalConfig.discountWithoutPassword)
    },
    async findAndOrderDish (code, count = 1) {
      if (count < 1) {
        this.feedback = '❌不能加入负数菜品'
        showTimedAlert('warning', this.$t('JSTableCodeNotFound'), 500)
        return
      }

      const dish = findDish(code)

      if (dish) {
        if (parseInt(GlobalConfig.oneStepOrderNumber) !== -1 && count > GlobalConfig.oneStepOrderNumber) {
          const res = await showConfirmAsyn(this.$t('wirklich?'), count)
          if (!res?.value) {
            showTimedAlert('warning', 'abrechen')
          }
        }
        dish.name = dish.dishName
        dish.name = dish.name.length > 28
          ? dish.name.substring(0, 28) + '...' : dish.name
        if (dish.haveMod > 0) {
          this.showModification(dish, count)
          blockReady()
          return
        }
        if (dish.code.toLowerCase().includes('ea')) {
          this.showExtraDish(dish)
          blockReady()
          return
        }
        this.feedback = '✅' + dish.code + '.' + dish.dishName + '*' + count + '已经加入购物车'
        this.addDish(dish, parseInt(count))
      } else {
        this.feedback = '❌没有找到菜号为: ' + code + '的菜品'
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
      if (this.$refs.ins) {
        this.$refs.ins.blur()
      }
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
            const index = rank.indexOf(id.toString())
            return 10 - (index === -1 ? 10 : index)
          }
          const [ra, rb] = [a.id, b.id].map(idToRank)
          return ra > rb ? -1 : 1
        }).filter(i => typeof i.childCount === 'undefined' || i.childCount > 0)
      }
    },
    async getCategory (consumeTypeId = 1, force = false) {
      if (this.categories.length === 0 || force) {
        console.log('reloadDishUseConsumeTypeId', consumeTypeId)

        this.categories = await getCategoryListWithCache(consumeTypeId)
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
    orderOneDish: async function (code) {
      this.displayInput = ''
      await this.findAndOrderDish(code)
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
    // requestOutTable,
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
    removeDish: function (index) {
      this.cartListModel.add(this.cartListModel.list[index], -1)
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
      this.feedback = ''
      this.displayInput = ''
      this.discountModelShow = false
      this.buffetDialogShow = false
      this.overrideConsumeTypeIndex = null
      this.activeCategoryId = null
      this.cartListModel.clear()
      this.removeAllFromSplitOrder()
      this.getTableDetail()
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
      if (this.displayInput !== '') {
        this.displayInput = ''
      } else if (this.discountModelShow) {
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
    async searchDishClick (code) {
      this.input = code
      await this.findAndOrderDish(code)
      this.displayInput = ''
    },
    discountClear () {
      this.submitDiscount('')
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
          this.systemDialogShow || Swal.isVisible()
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
        await this.getOrderedDish()
      } catch (e) {
        console.log(e)
      }
    },
    async acceptOrder (reason = 'ok') {
      await acceptOrder(reason, this.id)
      this.initialUI()
    },
    async acceptOrderWithTime (time) {
      const addressInfo = JSON.parse(this.tableDetailInfo.order.rawAddressInfo)
      let timeReal = dayjs()
      if (addressInfo) {
        if (addressInfo.date && addressInfo.time) {
          timeReal = dayjs(addressInfo.date + ' ' + addressInfo.time, 'YYYY-MM-DD HH:mm')
        }
      }
      timeReal = timeReal.add(time, 'm')
      await this.acceptOrder(timeReal.format('DD.MM.YYYY HH:mm'))
    },
    async rejectOrder () {
      const res = await fastSweetAlertRequest(i18n.t('Ablehnen, ein Ground Eingeben'), 'text',
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
      if (this.displayInput === null) {
        this.displayInput = ''
      }
      switch (e.key) {
        case 'Backspace':
          this.displayInput = ''
          this.input = this.displayInput
          break
        case 'Escape':
          this.back()
          break
        case 'Enter':
          this.insDecode(this.readBuffer())
          break
        default:
          if (e.target.nodeName !== 'INPUT') {
            this.displayInput += e.key
            this.input = this.displayInput
          }
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
        if (t.indexOf('*') !== -1) {
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
                const res = await showConfirmAsyn(this.$t('Zahlung ohne tip mit bar?'))
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
      window.onkeydown = this.listenKeyDown
      await this.initialUI(true)
    },
    updateActiveDCT (index) {
      this.activeDCT = null
      this.activeDCT = index
    },
    updateFilteredDish () {
      if (this.activeCategoryId) {
        console.log('should update Filtered Dish')
        this.filteredDish = this.filterDish()
      }
    },
    debounce: debounce((f) => {
      f()
    }, 200, { trailing: true }),
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
    updateSearchDish () {
      if (this.input) {
        this.searchDish = this.searchDishes()
      } else {
        this.searchDish = []
      }
    },
    searchDishes () {
      const list = this.dishes
      if (this.input) {
        if (this.input !== '' && !this.input.includes('/')) {
          const [buffer] = this.getCodeAndCountFromInput(this.input)
          const result = []
          for (const d of list) {
            if (d.code.toLowerCase().startsWith(buffer.toLowerCase())) {
              d.rank = 999 + d.code.length
              result.push(d)
            } else if (d.dishName.toLowerCase().startsWith(buffer.toLowerCase())) {
              d.rank = d.dishName.length
              result.push(d)
            }
            if (result.length > 5) {
              break
            }
          }
          return result.sort((a, b) => {
            if (a.rank > b.rank) {
              return 1
            } else if (a.rank === b.rank) {
              return 0
            } else {
              return -1
            }
          })
        }
      }
      return []
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

      return list
    }
  },
  computed: {
    ...mapGetters(['systemDialogShow']),
    totalPrice: function () {
      return this.tableDetailInfo.order?.totalPrice ?? 0
    },
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
          const res = JSON.parse(this.tableDetailInfo.order.rawAddressInfo)

          console.log('realAddressInfo res', res)
          return res
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
    activeDCT: function (val) {
      console.log(val)
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
        this.updateSearchDish
      )
    },
    refresh: function () {
      this.realInitial()
    },
    keyboardMode: function (val) {
      Remember.keyboardMode = val
    },
    realConsumeTypeId (val) {
      console.log('I change')
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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  grid-gap: 12px;
  margin-bottom: 120px;
  width: 100%;
}

.dragscroll {
  overflow-x: hidden;
}

.dishCardListContainer {
  width: 100%;
  height: 100%;
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
  text-align: center;
  width: calc(25% - 4px);
  height: 72px;
  padding: 8px;
  margin: 2px;
  text-transform: capitalize;
  font-size: 20px;
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

.consumeTypeItem {
  border-radius: 8px;
  width: max-content;
  padding: 8px 12px;
  background: white;
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

.first {
  padding: 8px !important;
  font-size: large;
  color: black;
  background: #BBDEFB !important;
  border-bottom: 2px solid #367aeb !important;
}

</style>
