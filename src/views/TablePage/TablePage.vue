<template>
  <div @click="keyboardInput=''">
    <template v-cloak>
      <v-main>
        <div style="display: grid;
        grid-template-columns: 350px calc(100vw - 350px);
        background: #f6f6f6;">
          <v-card class=" d-flex justify-space-between flex-shrink-0 flex-column fill-height" elevation="4" rounded
                  style="height: 100vh">
            <v-card class="d-flex align-center pa-2" color="primary" elevation="0"
                    @click="back">
              <v-btn :loading="isSendingRequest" color="primary"
                     elevation="0"
                     height="48px"
                     x-large>
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
                v-if="cartListModel.list.length===0"
                :click-callback="addToSplit"
                :default-expand="cartListModel.list.length===0"
                :discount-ratio="discountRatio"
                :dish-list-model="orderListModel"
                :source-marks="sourceMarks"
                :title="$t('DishesOrdered')"
                @discount-clear="discountClear"
              >
                <template #action>
                  <v-btn :loading="isSendingRequest" color="warning" elevation="0" @click="discountShow">
                    <v-icon>mdi-sale</v-icon>
                    {{ $t('Discount') }}
                  </v-btn>
                </template>
                <v-card class="d-flex align-center">
                  <v-btn :disabled="this.tableDetailInfo.order.consumeTypeStatusId<=1" block color="success"
                         elevation="0"
                         height="60px"
                         x-large
                         @click="jumpToPayment()">
                    <v-icon left size="28">mdi-calculator-variant</v-icon>
                    <span class="text-h6">{{ $t('payBill') }}</span>
                  </v-btn>
                </v-card>

              </dish-card-list>
            </keep-alive>
            <dish-card-list
              v-if="cartListModel.list.length>0"
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
              @current-dish-change="cartCurrentDish=$event">
              <template #action>
                <v-btn color="error" elevation="0" @click="cartListModel.clear()">
                  <v-icon left>
                    mdi-trash-can
                  </v-icon>
                  {{ $t('EmptyShoppingCart') }}
                </v-btn>
              </template>
              <template>
                <v-card class="d-flex align-center" color="primary">
                  <v-btn :loading="isSendingRequest" class="mr-1 ml-2"
                         color="primary"
                         elevation="0"
                         large @click="orderDish(cartListModel.list,false)">
                    <v-icon>mdi-printer-off</v-icon>
                  </v-btn>
                  <v-btn :loading="isSendingRequest"
                         class="flex-grow-1"
                         color="primary"
                         dark
                         elevation="0"
                         height="60px" large
                         style="border-radius: 12px"
                         x-large @click="orderDish(cartListModel.list)">
                    <v-icon left size="28">mdi-printer</v-icon>
                    <span class="text-h6">  {{ $t('PlaceAnOrder') }}</span>
                  </v-btn>
                </v-card>
              </template>
            </dish-card-list>
          </v-card>
          <v-card v-cloak class="flex-grow-1 pa-2 px-4 flex-column" color="transparent"
                  elevation="0"
                  style="height: 100vh;">
            <div class="d-flex pl-2 align-baseline" style="height: 52px">
              <template v-if="$vuetify.breakpoint.lgAndUp">
                <v-icon size="20">mdi-office-building-marker</v-icon>
                <h3 class="ml-2 font-weight-regular text-truncate">{{ findConsumeTypeById(consumeTypeId) }}</h3>

              </template>
              <v-icon class="ml-8" size="20">mdi-account-box</v-icon>
              <h3 class="ml-2 font-weight-regular text-truncate">{{ tableDetailInfo.servant }}</h3>
              <address-display
                :consume-type-status-id="consumeTypeStatusId"
                :raw-address-info="realAddressInfo"
                :should-open-menu.sync="addressFormOpen"
                class="ml-8"
                @accept="acceptOrderWithTime"
                @reject="rejectOrder"
                @address-change="submitRawAddressInfo"/>
              <v-spacer></v-spacer>
              <div class="d-flex align-center flex-grow-0 mr-n2" style="max-width: 40%">
                <v-btn class="mr-4" disabled elevation="0" icon>
                  <v-icon>mdi-swap-horizontal</v-icon>
                </v-btn>

                <v-item-group v-model="overrideConsumeTypeIndex" class="d-flex"
                              dark
                              style="overflow-x: scroll">
                  <template v-for="ct of consumeTypeList">
                    <v-item v-bind:key="ct.id+'consumeType'" v-slot="{active,toggle}">
                      <div :class="active?'active':''"
                           class="consumeTypeItem mr-1"
                           @click="toggle">{{ ct.name }}
                      </div>
                    </v-item>
                  </template>
                </v-item-group>
              </div>

            </div>
            <v-divider class="mb-2"></v-divider>
            <template v-if="!keyboardMode">
              <v-card
                class="d-flex"
                color="transparent"
                elevation="0"
              >
                <template>
                  <v-item-group v-model="activeDCT" v-dragscroll
                                mandatory
                                style="display: grid;
                          grid-gap: 8px;
                          grid-auto-columns: 120px;
                          grid-auto-flow: column;
                          overflow-x: scroll">

                    <v-item v-for="ct of dct" v-bind:key="ct.id+'categorytypes'" v-slot="{active,toggle}">
                      <v-card :color="active?'primary':''"
                              :dark="active"
                              :elevation="active?4:0"
                              class="d-flex justify-center align-center"
                              height="48"
                              style="border-radius: 12px;font-size: 18px"
                              @click="toggle">{{ ct.name }}
                      </v-card>
                    </v-item>
                  </v-item-group>
                  <v-spacer></v-spacer>
                </template>

                <v-card class="d-flex justify-center align-center px-4"
                        elevation="0"
                        height="48"
                        style="border-radius: 12px;font-size: 18px"
                        @click="keyboardMode=true">

                  <v-icon left>mdi-keyboard</v-icon>
                  {{ $t('KeyboardAndDishNumber') }}

                </v-card>

              </v-card>
              <v-divider class="my-2"></v-divider>
              <v-card v-dragscroll class="dragscroll dishCardListContainer flex-grow-1" color="transparent"
                      elevation="0" style=";position: relative">
                <div v-if="!activeCategoryId">
                  <v-item-group
                    class="dishCardList">
                    <template v-for="category of filteredC">
                      <v-item v-bind:key="'categorytypes'+category.id" v-slot="{active,toggle}">
                        <v-card class="d-flex align-center justify-center text-center pa-2" elevation="0"
                                style="
                      position: relative;
                      width: 100%;
                      height: 124px;
                      font-size: 18px;
                      font-weight: 500;
                        display: -webkit-box;
                        word-break: break-all;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  border-radius: 12px;
  overflow: hidden;
  text-overflow: ellipsis;"
                                @click="changeCategory(category.id,toggle)">
                          {{ category.name }}
                          <div :style="{background:category.color}"
                               style="position: absolute;width: 40%;top: 12px;
left: 0;right: 0;margin: auto;height: 6px;border-radius: 3px"></div>
                        </v-card>
                      </v-item>
                    </template>
                  </v-item-group>
                </div>
                <template v-if="activeCategoryId">
                  <div style="display: grid;grid-template-columns: 1fr 108px;grid-gap: 24px">

                    <div class="dishCardList">
                      <v-card v-if="activeCategoryId" class="d-flex align-center"
                              elevation="0"
                              style="width: 100%;height: 124px;
                        color: #ff8c50;
                        border-radius: 12px" @click="activeCategoryId=null"
                      >
                        <div class="d-flex flex-column justify-center align-center flex-wrap" style="width: 100%">
                          <v-icon color="#ff8c50" large>mdi-menu-open</v-icon>
                          <div>{{ $t('return') }}</div>
                        </div>
                      </v-card>
                      <template v-for="dish of filteredDish">
                        <dish-block
                          :key="'dish'+dish.code"
                          v-ripple
                          :code="dish.code"
                          :count="dish.count"
                          :dish-name="dish.dishName"
                          :display-color="dish.displayColor"
                          :font-size="Config.dishBlockFontSize"
                          :foreground="dish.foreground"
                          :have-mod="dish.haveMod"
                          :is-free="dish.isFree"
                          :price="dish.price"
                          @click="orderOneDish(dish.code)"
                          @click-tune="showModification(dish,1)"/>
                      </template>
                    </div>
                  </div>
                  <div v-dragscroll
                       style="width: 108px;height: calc(100vh - 192px);overflow: hidden;position: fixed;right: 12px;top: 132px">
                    <v-item-group

                      style="display: grid;grid-auto-columns: 108px;grid-auto-rows: 48px;grid-auto-flow: row;grid-gap: 4px">
                      <template v-for="category of filteredC">
                        <v-item v-bind:key="'categorytypes'+category.id" v-slot="{active,toggle}">
                          <v-card :color="activeCategoryId===category.id?'primary':'white'"
                                  :dark="activeCategoryId===category.id"
                                  class="d-flex align-center justify-center text-center pa-2"
                                  elevation="0"
                                  style="
                      position: relative;
                      width: 100%;
                      height: 48px;
                      font-size: 16px;
                        white-space: nowrap;
  border-radius: 12px;
  overflow: hidden;
  text-overflow: ellipsis;"
                                  @click="changeCategory(category.id,toggle)">
                            <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis">
                              {{ category.name }}
                            </div>

                            <div :style="{background:category.color}"
                                 style="position: absolute;width: 40%;bottom: 0;
left: 0;right: 0;margin: auto;height: 6px;border-radius: 3px"></div>
                          </v-card>
                        </v-item>
                      </template>
                    </v-item-group>
                  </div>
                </template>
                <div style="width: 100%;height: 160px"></div>
              </v-card>
            </template>
            <div v-else
                 class="flex-grow-1"
                 style="display: grid;grid-template-columns: 1fr 360px;height: calc(100vh - 130px);grid-gap: 16px">
              <v-card class="l-result-display" elevation="0">

                <div v-if="searchDish.length>0" class="flex-shrink-1 blue lighten-5"
                     style="overflow: hidden">
                  <v-card class="px-2 py-3" elevation="0">
                    {{ $t('SearchResult') }}
                  </v-card>
                  <!--                  需要监听键盘的地方-->
                  <template v-for="(dish,index) in searchDish">
                    <v-card :key="dish.id" :class="index === indexActive ? 'first' : ''"
                            :style="{backgroundColor:''+dish.displayColor,color:''+dish.foreground}"
                            class="d-flex  px-1 py-1 align-start"
                            elevation="0"
                            style="width: 100%;  border-bottom: 2px dashed #e2e3e5; font-size: x-large" tile
                            @click="searchDishClick(dish.code)"
                    >
                      <div class="name mr-2"><span v-code-hide>{{ dish.code }}.</span>{{ dish.dishName }}
                      </div>
                      <v-spacer></v-spacer>
                      <div v-if="dish.isFree==='1'"
                           class="price d-flex align-center green lighten-3 white--text"
                           style="padding:2px 4px;border-radius: 4px;">
                        {{ $t('Frei') }}
                      </div>
                      <div v-else class="price d-flex align-center text-no-wrap text-truncate">
                        {{ dish.price | priceDisplay }}
                      </div>
                    </v-card>
                  </template>
                </div>
                <div v-else class="d-flex align-center justify-center" style="height: 100%;width: 100%">
                  <div class="d-flex flex-column align-center">
                    <div>
                      <v-icon color="grey lighten-1" x-large>mdi-keyboard</v-icon>
                    </div>
                    <div class="text--disabled">{{ $t('PleaseUseKeyboardOrType') }}</div>
                  </div>
                </div>

              </v-card>
              <v-card class="d-flex flex-column" elevation="0">
                <v-card class="d-flex align-center px-4"
                        color="grey lighten-2"
                        elevation="0"
                        height="48"
                        style="font-size: 18px"
                        @click="keyboardMode=false">

                  <v-icon left>mdi-menu</v-icon>
                  {{ $t('ViewCategoryMenu') }}
                </v-card>
                <div class="pa-2 text-h6" style="min-height: 96px">
                  <template v-if="keyboardInput">
                    {{ Config.numberFirst ? $t('QuantityDishNumber') : $t('DishNumberQuantity') }}<br>
                    {{ $t('Input') }}
                  </template>
                  <template v-else>
                    {{ feedback }}
                  </template>
                </div>
                <v-spacer></v-spacer>
                <div class="pa-2 flex-shrink-0" @click.stop>
                  <v-text-field
                    ref="ins"
                    v-model="keyboardInput"
                    :placeholder="Config.numberFirst?$t('quantity_x_dishNumber'):$t('DishNumberQuantity')"
                    class="my-2"
                    height="96px"
                    hide-details
                    readonly
                    solo-inverted
                    style="font-size: 32px"
                  />
                  <keyboard-layout :keys="keyboardLayout"
                                   @input="numberInput"></keyboard-layout>
                </div>
              </v-card>

            </div>
          </v-card>
          <template v-if="false">

            <keep-alive>
              <template>
                <buffet-status-card
                  v-if="consumeTypeId!==1&&consumeTypeId!==2&&consumeTypeId!==5"
                  :buffet-setting-info="realAddressInfo"
                  :current-round="tableDetailInfo.tableBasicInfo.buffetRound"
                  class="mt-1 mx-2"></buffet-status-card>
              </template>
            </keep-alive>

            <v-spacer></v-spacer>

          </template>
          <v-card
            class="d-flex align-center"
            elevation="4"
            height="60px"
            style="position: fixed;
                  z-index:3;
                  bottom: 0;
                  right: 0;
                  overflow-x: scroll;
                  width: calc(100vw - 350px);
               ">
            <div class="ml-2" style="display: grid;
            grid-auto-columns: min-content;
            grid-gap: 6px;grid-auto-flow: column">
              <grid-button
                v-if="!Config.simpleVersion"
                :loading="isSendingRequest"
                :text="$t('reprint')"
                color="warning"
                icon="mdi-printer"
                @click="reprintOrder"
              />
              <grid-button
                :loading="isSendingRequest"
                :text="$t('TemporaryBill')"
                color="#24b646"
                icon="mdi-printer-pos"
                @click="zwitchenBon"
              />
              <grid-button
                v-if="consumeTypeId!==2"
                :loading="isSendingRequest"
                :text=" $t('tableChange') "
                color="#ff8c50"
                icon="mdi-swap-horizontal"
                @click="changeTable"
              />
              <grid-button
                v-if="consumeTypeId!==2"
                :loading="isSendingRequest"
                :text="$t('tableMerge')"
                color="#ff4141"
                icon="mdi-merge"
                @click="mergeTable"
              />
              <grid-button
                :loading="isSendingRequest"
                :text="$t('WaiterTransfer')"
                color="#ffb13b"
                icon="mdi-account"
                @click="changeServant"
              />
              <grid-button
                :loading="isSendingRequest"
                :text="$t('CustomerAddress')"
                color="indigo"
                icon="mdi-map"
                @click="addressFormOpen=true"
              />
              <template v-if="consumeTypeId===2">

                <template v-if="consumeTypeStatusId<2">
                  <template
                    v-for="(time) in [0,15,20,30,60]"
                  >
                    <grid-button
                      :key="time"
                      :text="time"

                      color="success"
                      icon="mdi-plus"
                      @click="acceptOrderWithTime(time)"/>

                  </template>
                  <grid-button :text="$t('Reject')" color="error" icon="mdi-minus" @click="rejectOrder"/>
                </template>
              </template>
              <template v-else-if="consumeTypeStatusId<2">
                <grid-button
                  :loading="isSendingRequest"
                  :text="$t('Accept')"
                  color="success"
                  icon="mdi-check"
                  @click="acceptOrder"
                />
                <grid-button
                  :loading="isSendingRequest"
                  :text="$t('Reject')"
                  color="error"
                  icon="mdi-close"
                  @click="rejectOrder"
                />
              </template>
              <grid-button
                v-if="consumeTypeId===1||consumeTypeId===5"
                :loading="isSendingRequest"
                :text="$t('ChangeToBuffet')"
                color="#ff7961"
                icon="mdi-silverware"
                @click="buffetDialogShow=true"
              />

            </div>

          </v-card>
        </div>
      </v-main>
      <!--      right panel-->
      <template v-if="splitOrderListModel.list.length>0">
        <div v-cloak
             id="splitOrderContainer"
             class="bottomCart surface d-flex justify-end"
             style="background: rgba(0,0,0,0.4);  top: 0;
                    z-index: 50;
                    left: 350px"
             @click="removeAllFromSplitOrder">
          <div class="d-flex" style="max-width: 600px;width: 50vw" @click.stop>
            <div class="pa-1 d-flex flex-column">
              <v-btn class=" mt-1 " color="error" x-large @click="removeAllFromSplitOrder()">
                <v-icon left>mdi-close-circle</v-icon>
                {{ $t('Cancel') }}
              </v-btn>
              <v-btn class=" mt-1 " x-large @click="needSplitOrder()">
                <v-icon left>mdi-set-split</v-icon>
                {{ $t('BillSplit') }}
              </v-btn>
              <v-btn class=" mt-1 " x-large
                     v-on:click="showDeleteDishDialog">
                <v-icon left>mdi-calendar-remove</v-icon>
                {{ $t('DishCancel') }}
              </v-btn>
              <v-btn class=" mt-1 " x-large
                     v-on:click="dishesSetDiscount()">
                <v-icon left>mdi-sale</v-icon>
                {{ $t('GiveDishADiscount') }}
              </v-btn>
              <v-btn class="  mt-1" x-large
                     v-on:click="dishesChangeTable">
                <v-icon left>mdi-inbox-arrow-up</v-icon>
                {{ $t('tableChange') }}
              </v-btn>
              <v-btn class="  mt-1" x-large
                     v-on:click="printZwichenBon()">
                <v-icon left>mdi-bandcamp</v-icon>
                {{ $t('TemporaryBill') }}
              </v-btn>
            </div>
            <dish-card-list
              :click-callback="removeFromSplitOrder"
              :default-expand="true"
              :discount-ratio="discountRatio"
              :dish-list-model="splitOrderListModel"
              :title="$t('operation')"
              class="flex-grow-1"
              extra-height="48px"/>
          </div>
        </div>
      </template>

      <template v-if="!keyboardMode">
        <keep-alive>
          <v-fade-transition>
            <v-card v-if="keyboardInput||currentCodeBuffer"
                    class="pa-4"
                    style="position:fixed;top: 0;right: 0;
            margin: auto;
            box-shadow: 0 3px 16px var(--v-primary-lighten4);
            left: 0;bottom: 0;
            min-width: 300px;
            max-width:calc(100vw - 200px);
            z-index: 15;width: fit-content;height: fit-content">
              <div>
                <h1>{{ keyboardInput }}</h1>
              </div>
              <div v-if="searchDish.length>0" class="flex-shrink-1 blue lighten-5"
                   style="overflow: hidden">
                <template v-for="(dish,index) in searchDish">
                  <v-card :key="dish.id" :class="index===indexActive?'first':''"
                          :style="{backgroundColor:''+dish.displayColor,color:''+dish.foreground}"
                          class="d-flex  px-1 py-1 align-start"
                          elevation="0"
                          style="width: 100%;  border-bottom: 2px dashed #e2e3e5; font-size: x-large" tile
                          @click="searchDishClick(dish.code)">
                    <div class="name mr-2"><span v-code-hide>{{ dish.code }}.</span>{{ dish.dishName }}
                    </div>
                    <v-spacer></v-spacer>
                    <div v-if="dish.isFree==='1'"
                         class="price d-flex align-center green lighten-3 white--text"
                         style="padding:2px 4px;border-radius: 4px;">
                      {{ $t('Frei') }}
                    </div>
                    <div v-else class="price d-flex align-center text-no-wrap text-truncate">
                      {{ dish.price | priceDisplay }}
                    </div>
                  </v-card>
                </template>
              </div>
              <div class="text-caption text--secondary" style="font-size: 14px !important;">
                {{ $t('PressESCToEnterWindow') }}<br>
                {{ $t('PressESCToCloseWindow') }}
              </div>
            </v-card>
          </v-fade-transition>
        </keep-alive>
      </template>

      <v-dialog v-model="extraDishShow" max-width="300">
        <v-card width="550">
          <v-card-title class="font-weight-bold"> {{ currentDish.name }}</v-card-title>
          <v-card-text>
            <v-text-field v-model="currentDish.currentPrice" :label="$t('Amount')" autofocus/>
            <v-text-field v-model="currentDish.currentName" :label="$t('name')"/>
          </v-card-text>
          <v-card-actions>
            <v-spacer/>
            <v-btn class="primary" @click="addExtraDish">{{ $t('submit') }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <discount-dialog
        :id="id"
        ref="discount"
        :discount-model-show="discountModelShow"
        :dishesItems="splitOrderListModel.list"
        :initial-u-i="initialUI"
        :orderId="tableDetailInfo.order.id"
        :total-price="tableDetailInfo.order.totalPrice"
        :useDishesDiscount="useDishesDiscount"
        @visibility-changed="(val)=>this.discountModelShow=val"
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
        :id="tableDetailInfo.order.id"
        :check-out-type="checkOutType"
        :discount-ratio="discountRatio"
        :discount-str="discountStr"
        :order="checkOutModel"
        :password="password"
        :table-id="id"
        :visible="checkoutShow"
        @visibility-changed="changeCheckOut"/>

      <buffet-start-dialog
        :id="tableDetailInfo.order.id"
        :buffet-dialog-show="buffetDialogShow"
        :initial-u-i="initialUI"
        @visibility-changed="(val)=>this.buffetDialogShow=val"></buffet-start-dialog>

      <v-dialog v-model="deleteDishReasonDialog" max-width="600px">
        <v-card class="pa-4">
          <div class="text-h5 font-weight-bold">{{ $t('RevocationDishReason') }}</div>
          <v-text-field
            v-model="deleteDishReason"
            :placeholder="reasons.length > 0 ? reasons[0] :  $t('RevocationDishReason')"
            append-icon="mdi-lead-pencil"
            autofocus
            class="mt-4"
            hide-details
            outlined
          />
          <div class="mt-2"
               style="display: grid;grid-template-columns: repeat(4,minmax(0,1fr));grid-gap: 4px">
            <v-card v-for=" r in reasons" :key="r" class="d-flex align-center justify-center" color="#f6f6f6"
                    elevation="0"
                    style="height: 48px"
                    @click="submitReason(r)">
              {{ r }}
            </v-card>
          </div>
          <div class="d-flex">
            <v-spacer></v-spacer>
            <v-btn
              class="primary  mt-4 lighten-2" elevation="0" style="border-radius: 36px"
              width="100%" @click="submitReason()"
            >
              {{ $t('Confirm') }}
            </v-btn>
          </div>
        </v-card>
      </v-dialog>
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
import { checkOut, optionalAuthorizeAsync, printZwichenBon } from '@/oldjs/api'
import { dragscroll } from 'vue-dragscroll'

import { StandardDishesListFactory } from 'aaden-base-model/lib/Models/AadenBase'

import { findDish, getCategoryListWithCache, goHome, processDishList } from '@/oldjs/StaticModel'
import { printNow } from '@/oldjs/Timer'
import CategoryType from 'aaden-base-model/lib/Models/CategoryType'
import GlobalConfig from '../../oldjs/LocalGlobalSettings'

import { debounce } from 'lodash-es'

import IKUtils from 'innerken-js-utils'

import { acceptOrder, deleteDish, reprintOrder, safeRequest, showSuccessMessage } from '@/api/api'

import { mapGetters } from 'vuex'

import i18n from '../../i18n'
import dayjs from 'dayjs'
import { TableFilter } from '@/api/tableService'
import { Remember } from '@/api/remember'
import BuffetStatusCard from '@/views/TablePage/Dialog/BuffetStatusCard'
import BuffetStartDialog from '@/views/TablePage/Dialog/BuffetStartDialog'
import GridButton from '@/components/Base/GridButton'
import AddressDisplay from '@/views/TablePage/Address/AddressDisplay'
import DiscountDialog from '@/views/TablePage/Dialog/DiscountDialog'
import DishBlock from '@/views/TablePage/Dish/DishBlock'
import CheckOutDrawer from '@/components/GlobalDialog/CheckOutDrawer'
import ModificationDrawer from '@/views/TablePage/Dialog/ModificationDrawer'
import DishCardList from '@/views/TablePage/Dish/DishCardList'
import KeyboardLayout from '@/components/Base/Keyboard/KeyboardLayout'
import uniqBy from 'lodash-es/uniqBy'

const checkoutFactory = StandardDishesListFactory()
const splitOrderFactory = StandardDishesListFactory()
const orderListFactory = StandardDishesListFactory()
const cartListFactory = StandardDishesListFactory()
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
    KeyboardLayout,
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
      reasons: getReason(),
      deleteDishReason: '',
      deleteDishReasonDialog: false,
      useDishesDiscount: false,
      keyboardMode: Remember.keyboardMode,
      tab: null,
      addressFormOpen: false,
      consumeTypeList: [],

      keyboardLayout: GlobalConfig.topKeyboardKey.split(',').concat(keyboardLayout),
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
      indexActive: 0,
      Config: GlobalConfig,
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
      password: '',

      /* new input */
      keyboardInput: '',
      currentCodeBuffer: ''
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
      await optionalAuthorizeAsync('boss', !GlobalConfig.returnDishWithoutPassword)
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
          await this.initialUI()
        }
      }
    },

    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },
    async editNote () {
      const note = await Swal.fire({
        title: this.$t('note'),
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
      if (this.keyboardInput == null) {
        this.keyboardInput = ''
      }
      switch (key) {
        case 'mdi-close':
          this.keyboardInput += '*'
          break
        case 'C':
          this.keyboardInput = ''
          break
        case 'OK':
          this.insDecode(this.keyboardInput)
          this.resetInputAndBuffer()
          break
        default:
          this.keyboardInput += key
          break
      }
    },

    changeCategory (id, toggle) {
      this.activeCategoryId = id
      if (toggle) {
        toggle()
      }
    },

    async changeServant () {
      const res = await fastSweetAlertRequest(this.$t('WaiterPagePasswordPrompt'),
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
          //* mark by ju
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
    async discountShow () {
      await optionalAuthorizeAsync('', !GlobalConfig.discountWithoutPassword)
      this.discountModelShow = true
      this.useDishesDiscount = false
    },
    async findAndOrderDish (code, count = 1) {
      if (count < 1) {
        this.feedback = '❌' + this.$t('CanNotAddNegativeDishes')
        showTimedAlert('warning', this.$t('JSTableCodeNotFound'), 500)
        return
      }

      const dish = findDish(code)

      if (dish) {
        if (parseInt(GlobalConfig.oneStepOrderNumber) !== -1 && count > GlobalConfig.oneStepOrderNumber) {
          const res = await showConfirmAsyn(this.$t('AreYouSure'), this.$tc('AreYouSureToOrderDish', 1, { n: count }))
          if (!res?.value) {
            showTimedAlert('warning', 'abrechen')
          }
        }
        dish.name = dish.dishName
        dish.name = dish.name.length > 28
          ? dish.name.substring(0, 28) + '...' : dish.name
        if (dish.haveMod > 0) {
          this.submitModification(null, dish, count)
          blockReady()
          return
        }
        if (dish.code.toLowerCase().includes('ea')) {
          if (dish.name.includes('-')) {
            try {
              const [name, priceInfo] = dish.name.split('-')
              const [unitPrice, unit] = priceInfo.split('/')
              const [unitBase, unitName] = unit.split(' ')
              const unitCount = await IKUtils.showInput('请输入以' + unitName + '计量的产品数量')
              const realPrice = unitCount / unitBase * unitPrice

              dish.currentPrice = realPrice
              dish.currentName = `${name} ${unitPrice}/${unit} | ${unitCount}${unitName}`

              dish.originPrice = dish.currentPrice.toString().replace(',', '.')
              dish.price = dish.originPrice
              dish.forceFormat = true
              dish.name = dish.currentName
            } catch (e) {

            }
          } else {
            this.showExtraDish(dish)
            blockReady()
            return
          }
        }
        this.feedback = '✅' + dish.code + '.' + dish.dishName + '*' + count + this.$t('AddedToCart')
        this.addDish(dish, parseInt(count))
      } else {
        this.feedback = '❌' + this.$t('DishNumberNotFound', { n: code })
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
          arr.push(...i.dishes)
          return arr
        }, []))
        this.cartListModel.setDishList(this.dishes)
      }
    },
    orderOneDish: async function (code) {
      await this.findAndOrderDish(code)
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

    printZwichenBon: function () {
      printZwichenBon(this.id, this.splitOrderListModel.list)
    },

    addToSplit: function (dish) {
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
      if (this.realConsumeTypeId !== this.consumeTypeId) {
        dish.overrideConsumeTypeId = this.realConsumeTypeId
        dish.forceFormat = true
      }
      setTimeout(() => {
        this.cartListModel.add(dish, count)
      }, 1)
    },
    clear: function () {
      this.cartListModel.clear()
    },
    removeDish: function (dish) {
      this.cartListModel.add(dish, -1)
    },

    submitModification: function (_mod, dish, count, saveInfo) {
      if (this.count !== 1) {
        count = this.count
      }
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
      this.feedback = ''
      this.resetInputAndBuffer()
      this.discountModelShow = false
      this.buffetDialogShow = false
      this.overrideConsumeTypeIndex = null
      this.activeCategoryId = null
      this.cartListModel.clear()
      this.removeAllFromSplitOrder()
      await this.reloadDish(this.realConsumeTypeId, forceReload)
      await this.getTableDetail()
      setGlobalTableId(this.id)
      blockReady()
    },
    async reloadDish (consumeTypeId, force = false) {
      await this.getCategory(consumeTypeId, force)
      this.activeCategoryId = null
      this.updateActiveDCT(0)
    },
    back () {
      if (this.keyboardInput || this.currentCodeBuffer) {
        this.resetInputAndBuffer()
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
      this.currentCodeBuffer = code
      await this.findAndOrderDish(code)
      this.keyboardInput = ''
    },
    resetInputAndBuffer () {
      this.currentCodeBuffer = ''
      this.keyboardInput = ''
      this.indexActive = -1
      this.updateSearchDish()
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
    needSplitOrder: async function () {
      this.password = await optionalAuthorizeAsync('', GlobalConfig.checkOutUsePassword, '', true, this.id)
      this.checkoutShow = true
      checkoutFactory.clear()
      checkoutFactory.loadTTDishList(this.splitOrderListModel.list)
      this.checkOutModel = {
        total: checkoutFactory.total(),
        count: checkoutFactory.count(),
        list: checkoutFactory.list
      }
      this.checkOutType = 'splitOrder'
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
      const res = await fastSweetAlertRequest(i18n.t('RevocationDishReason'), 'text',
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
      if (this.keyboardInput === null) {
        this.keyboardInput = ''
      }
      switch (e.key) {
        case 'Backspace':
          this.keyboardInput = ''
          break
        case 'Escape':
          this.back()
          break
        case 'Enter':
          this.insDecode(this.keyboardInput)
          this.resetInputAndBuffer()
          e.preventDefault()
          break
        default:
          if (e.target.nodeName !== 'INPUT' && e.key.length < 3) {
            this.keyboardInput += e.key
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
        await reprintOrder(this.tableDetailInfo.order.id, 0)
        toast()
        blockReady()
      } catch (e) {

      } finally {
        this.isSendingRequest = false
      }
    },
    //* findInsDecode*/
    async insDecode (t) {
      if (this.deleteDishReasonDialog) {
        await this.submitReason()
      }
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
                const res = await showConfirmAsyn(this.$t('PaidWithoutTip'))
                if (res.value) {
                  const pw = await optionalAuthorizeAsync('',
                    GlobalConfig.checkOutUsePassword,
                    null, true, this.id)
                  this.checkOut(pw)
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
          printingKitchenBon: print ? 1 : 0,
          _servantPw: GlobalConfig.defaultPassword
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
        const pw = await optionalAuthorizeAsync('',
          GlobalConfig.checkOutUsePassword,
          '', true,
          this.id)

        await realCheckOut(pw)
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
    getCodeAndCountFromInput (string = '') {
      let [code, count] = ['', 1]
      if (string.includes('*')) {
        [code, count] = string.split('*')
        if (GlobalConfig.numberFirst) {
          [code, count] = [count, code]
        }
        count = parseInt(count)
      } else {
        code = string
      }
      return [code, count]
    },
    updateSearchDish () {
      if (this.keyboardInput || this.currentCodeBuffer) {
        this.searchDish = this.searchDishes()
      } else {
        this.searchDish = []
      }
      this.indexActive = 0
    },
    searchDishes () {
      const list = this.dishes
      const searchWord = this.currentCodeBuffer || this.keyboardInput
      const codeOnly = !!this.currentCodeBuffer
      if (searchWord) {
        if (searchWord !== '' && !searchWord.includes('/')) {
          const [code] = this.getCodeAndCountFromInput(searchWord)
          const result = []
          const exactMatch = findDish(code)
          if (exactMatch) {
            exactMatch.rank = -999 + exactMatch.code.length
            result.push(exactMatch)
          }
          if (!codeOnly) {
            for (const d of list) {
              if (d.code.toLowerCase().startsWith(code.toLowerCase()) && d.code !== code) {
                d.rank = 999 + d.code.length
                result.push(d)
              } else if (d.dishName.toLowerCase().startsWith(code.toLowerCase())) {
                d.rank = d.dishName.length
                result.push(d)
              }
              if (result.length > 5) {
                break
              }
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
      if (!this.keyboardInput) {
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
    sourceMarks: function () {
      return this.tableDetailInfo?.sourceMarks ?? []
    },

    totalPrice: function () {
      return this.tableDetailInfo.order?.totalPrice ?? 0
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
      this.keyboardInput = ''
      this.activeCategoryId = null
      this.updateFilteredDish()
    },
    dishes: function () {
      this.updateFilteredDish()
    },
    activeCategoryId: function (val) {
      this.updateFilteredDish()
    },
    keyboardInput: function () {
      if (this.keyboardInput) {
        this.currentCodeBuffer = ''
        this.indexActive = ''
      }
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
  async mounted () {
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
    await this.realInitial()
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
  width: calc(100vw - 354px);
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
