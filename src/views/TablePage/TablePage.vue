<template>
  <div @click="keyboardInput = ''">
    <template v-if="!globalLoading">
      <v-main>
        <div
            style="
            display: grid;
            grid-template-columns: 348px calc(100vw - 348px);
            background: #f6f6f6;
          "
        >
          <v-card
              class="d-flex justify-space-between flex-shrink-0 flex-column fill-height"
              dark
              elevation="0"
              style="height: 100vh"
              tile
          >
            <v-card
                class="d-flex align-center pa-2 py-3"
                color="transparent"
                elevation="0"
                @click="back"
            >
              <v-icon
                  class="mr-2"
                  large
              >mdi-chevron-left
              </v-icon>
              <div class="text-body-2">{{ $t('Return') }}</div>
              <v-spacer></v-spacer>
            </v-card>
            <div class="pa-2"></div>
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
                <template #action>
                  <v-btn
                      :loading="isSendingRequest"
                      color="info"
                      elevation="0"
                      text
                      @click="checkOut(Config.defaultPassword)"
                  >
                    <v-icon left>mdi-cash-fast</v-icon>
                    {{ $t('QuickBill') }}
                  </v-btn>
                  <v-btn
                      :loading="isSendingRequest"
                      color="warning"
                      elevation="0"
                      text
                      @click="discountShow"
                  >
                    <v-icon left>mdi-sale</v-icon>
                    {{ $t('Discount') }}
                  </v-btn>
                </template>
                <template v-slot:default="{ total }">
                  <div class="pa-2">
                    <v-btn
                        :disabled="tableDetailInfo.order.consumeTypeStatusId <= 1"
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
                      >mdi-calculator-variant
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
                @current-dish-change="cartCurrentDish = $event"
            >
              <template #action>
                <v-btn
                    color="error"
                    elevation="0"
                    text
                    @click="cartListModelClear"
                >
                  <v-icon left> mdi-trash-can</v-icon>
                  {{ $t('EmptyShoppingCart') }}
                </v-btn>
              </template>
              <template v-slot:default="{ total }">
                <div class="pa-2">
                  <v-btn
                      :loading="isSendingRequest"
                      block
                      color="primary lighten-4 black--text"
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
          <v-card
              v-cloak
              class="flex-grow-1 flex-column"
              color="transparent"
              elevation="0"
              style="height: 100vh"
          >
            <v-card
                class="d-flex pa-3 px-4 align-center"
                color="grey lighten-2"
                elevation="0"
                tile
            >
              <v-icon class="mr-2">mdi-map-marker-radius</v-icon>
              <div class="text-h6 text-capitalize mr-6">
                {{ tableDetailInfo.tableBasicInfo.name }}
              </div>
              <template v-if="$vuetify.breakpoint.lgAndUp">
                <v-icon>mdi-office-building-marker</v-icon>
                <div class="ml-2 text-h6 text-truncate">
                  {{ findConsumeTypeById(consumeTypeId) }}
                </div>
              </template>

              <v-icon class="mr-2 ml-6">mdi-account-circle</v-icon>
              <div class="text-h6">
                {{ tableDetailInfo.servant }}
              </div>

              <v-spacer></v-spacer>
              <v-btn
                  v-if="Config.activeVip"
                  class="mr-4"
                  color="grey lighten-3 black--text"
                  elevation="0"
                  rounded
                  @click="showMemberSelectionDialog=true"
              >
                <template v-if="currentMemberId">
                  <v-icon left>mdi-wallet-membership</v-icon>
                  {{ currentMemberId }}
                </template>
                <template v-else>
                  <v-icon>mdi-wallet-membership</v-icon>
                </template>
              </v-btn>
              <address-display
                  v-if="consumeTypeId===2"
                  :consume-type-status-id="consumeTypeStatusId"
                  :raw-address-info="realAddressInfo"
                  :should-open-menu.sync="addressFormOpen"
                  class="mr-2"
                  @accept="acceptOrderWithTime"
                  @reject="rejectOrder"
                  @address-change="submitRawAddressInfo"
              />
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                      class="mr-4"
                      color="grey lighten-3 black--text"
                      elevation="0"
                      rounded
                      v-bind="attrs"
                      v-on="on"
                  >
                    <v-icon>mdi-swap-horizontal</v-icon>
                  </v-btn>
                </template>
                <v-list>
                  <v-list-item
                      v-for="ct of consumeTypeList"
                      :key="ct.id + 'consumeType'"
                      @click="overrideConsumeTypeId = ct.id"
                  >
                    <v-list-item-title>
                      {{ ct.name }}
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
              <v-btn
                  color="grey lighten-3 black--text"
                  elevation="0"
                  rounded
                  @click="keyboardMode = !keyboardMode"
              >
                <template v-if="!keyboardMode">
                  <v-icon>mdi-keyboard</v-icon>
                </template>
                <template v-else>
                  <v-icon>mdi-menu</v-icon>
                </template>
              </v-btn>
            </v-card>

            <template v-if="!keyboardMode">
              <v-card
                  class="d-flex py-2 px-4"
                  color="grey lighten-3"
                  elevation="0"
              >
                <template>
                  <v-item-group
                      v-if="favoriteList"
                      v-model="activeDCT"
                      v-dragscroll
                      mandatory
                      style="
                      display: grid;
                      grid-gap: 8px;
                      grid-auto-columns: max-content;
                      grid-auto-flow: column;
                      overflow-x: scroll;
                    "
                  >

                    <v-item
                        v-if="haveFavoriteItem"
                        v-slot="{active,toggle}"
                    >
                      <v-card
                          :color="active?'primary':'grey lighten-4'"
                          :dark="active"
                          :elevation="active?4:0"
                          class="d-flex justify-center align-center px-6"
                          height="48"
                          style="border-radius: 12px;font-size: 18px"
                          @click="toggle"
                      >
                        <v-icon
                            :color="active?'white':'primary'"
                            left
                        >mdi-heart-circle
                        </v-icon>
                        Favorite
                      </v-card>
                    </v-item>
                    <v-item
                        v-for="ct of dct"
                        v-bind:key="ct.id + 'categorytypes'"
                        v-slot="{ active, toggle }"
                    >
                      <v-card
                          :color="active ? 'primary' : 'grey lighten-4'"
                          :dark="active"
                          :elevation="active ? 4 : 0"
                          class="d-flex justify-center align-center px-6"
                          height="48"
                          style="border-radius: 12px; font-size: 18px"
                          @click="toggle"
                      >{{ ct.name }}
                      </v-card>
                    </v-item>
                  </v-item-group>
                  <v-spacer></v-spacer>
                </template>
              </v-card>
              <v-card
                  v-dragscroll
                  class="dragscroll dishCardListContainer flex-grow-1 px-4"
                  color="transparent"
                  elevation="0"
                  style="position: relative"
              >
                <div
                    v-if="!activeCategoryId"
                    class="mt-2"
                >
                  <v-item-group class="dishCardList">
                    <template v-for="category of filteredC">
                      <v-item
                          v-bind:key="'categorytypes' + category.id"
                          v-slot="{ active, toggle }"
                      >
                        <v-card
                            :color="category.color ? category.color : 'white'"
                            class="d-flex text-h6 align-center justify-center text-center pa-2"
                            elevation="0"
                            style="
                            position: relative;
                            width: 100%;
                            height: 124px;

                            display: -webkit-box;
                            word-break: break-all;
                            -webkit-line-clamp: 3;
                            -webkit-box-orient: vertical;
                            border-radius: 12px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                          "
                            @click="changeCategory(category.id, toggle)"
                        >
                          {{ category.name }}
                        </v-card>
                      </v-item>
                    </template>
                  </v-item-group>
                </div>
                <template v-if="activeCategoryId">
                  <div
                      style="
                      display: grid;
                      grid-template-columns: 1fr 108px;
                      grid-gap: 24px;
                    "
                  >
                    <div class="dishCardList mt-2">
                      <v-card
                          v-if="!haveFavoriteItem||activeDCT!==0"
                          class="d-flex align-center"
                          elevation="0"
                          style="
                          width: 100%;
                          color: var(--v-primary-base);
                          height: 124px;
                          border-radius: 12px;
                        "
                          @click="activeCategoryId = null"
                      >
                        <div
                            class="d-flex flex-column justify-center align-center"
                            style="width: 100%"
                        >
                          <v-icon
                              color="primary"
                              large
                          >mdi-arrow-left
                          </v-icon>
                          <div class="mt-1 text-body-2">{{ $t('return') }}</div>
                        </div>
                      </v-card>
                      <template v-for="dish of filteredDish">
                        <dish-block
                            :key="'dish' + dish.code"
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
                            @click-tune="showModification(dish, 1)"
                        />
                      </template>
                    </div>
                  </div>
                  <div
                      v-dragscroll
                      style="
                      width: 108px;
                      height: calc(100vh - 192px);
                      overflow: hidden;
                      position: fixed;
                      right: 12px;
                      top: 132px;
                    "
                  >
                    <v-item-group
                        style="
                        display: grid;
                        grid-auto-columns: 108px;
                        grid-auto-rows: 48px;
                        grid-auto-flow: row;
                        grid-gap: 4px;
                      "
                    >
                      <template v-for="category of filteredC">
                        <v-item
                            v-bind:key="'categorytypes' + category.id"
                            v-slot="{ active, toggle }"
                        >
                          <v-card
                              :color="
                              activeCategoryId === category.id
                                ? 'primary'
                                : 'white'
                            "
                              :dark="activeCategoryId === category.id"
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
                              text-overflow: ellipsis;
                            "
                              @click="changeCategory(category.id, toggle)"
                          >
                            <div
                                style="
                                white-space: nowrap;
                                overflow: hidden;
                                text-overflow: ellipsis;
                              "
                            >
                              {{ category.name }}
                            </div>

                            <div
                                :style="{ background: category.color }"
                                style="
                                position: absolute;
                                width: 40%;
                                bottom: 0;
                                left: 0;
                                right: 0;
                                margin: auto;
                                height: 6px;
                                border-radius: 3px;
                              "
                            ></div>
                          </v-card>
                        </v-item>
                      </template>
                    </v-item-group>
                  </div>
                </template>
                <div style="width: 100%; height: 160px"></div>
              </v-card>
            </template>
            <div
                v-else
                class="flex-grow-1"
                style="
                display: grid;
                grid-template-columns: 1fr 360px;
                height: calc(100vh - 130px);
                grid-gap: 0px;
              "
            >
              <v-card
                  class="l-result-display"
                  color="transparent"
                  elevation="0"
              >
                <div
                    v-if="searchDish.length > 0"
                    class="flex-shrink-1"
                    style="overflow: hidden"
                >
                  <v-card
                      class="px-4 py-3"
                      color="grey lighten-4"
                      elevation="0"
                      tile
                  >
                    {{ $t('SearchResult') }}
                  </v-card>
                  <!--                  需要监听键盘的地方-->
                  <template v-for="(dish, index) in searchDish">
                    <v-card
                        :key="dish.id"
                        :class="index === indexActive ? 'first' : ''"
                        :style="{
                        backgroundColor: '' + dish.displayColor,
                        color: '' + dish.foreground,
                      }"
                        class="d-flex px-4 py-1 align-start"
                        elevation="0"
                        style="
                        width: 100%;
                        border-bottom: 2px dashed #e2e3e5;
                        font-size: x-large;
                      "
                        tile
                        @click="searchDishClick(dish.code)"
                    >
                      <div class="name mr-2">
                        <span>{{ dish.code }}.</span
                        >{{ dish.dishName }}
                      </div>
                      <v-spacer></v-spacer>
                      <div
                          v-if="dish.isFree === '1'"
                          class="price d-flex align-center green lighten-3 white--text"
                          style="padding: 2px 4px; border-radius: 4px"
                      >
                        {{ $t('Free') }}
                      </div>
                      <div
                          v-else
                          class="price d-flex align-center text-no-wrap text-truncate"
                      >
                        {{ dish.price | priceDisplay }}
                      </div>
                    </v-card>
                  </template>
                </div>
                <div
                    v-else
                    class="d-flex align-center justify-center"
                    style="height: 100%; width: 100%"
                >
                  <div class="d-flex flex-column align-center">
                    <div>
                      <v-icon
                          color="grey lighten-1"
                          x-large
                      >mdi-keyboard
                      </v-icon>
                    </div>
                    <div class="text--disabled">
                      {{ $t('PleaseUseKeyboardOrType') }}
                    </div>
                  </div>
                </div>
              </v-card>
              <v-card
                  class="d-flex flex-column"
                  elevation="0"
              >
                <div
                    class="pa-2 text-h6"
                    style="min-height: 96px"
                >
                  <template v-if="keyboardInput">
                    {{
                      Config.numberFirst
                          ? $t('QuantityDishNumber')
                          : $t('DishNumberQuantity')
                    }}<br/>
                    {{ $t('Input') }}
                  </template>
                  <template v-else>
                    {{ feedback }}
                  </template>
                </div>
                <v-spacer></v-spacer>
                <div
                    class="pa-2 flex-shrink-0"
                    @click.stop
                >
                  <v-card
                      :class="keyboardInput ? '' : 'text--secondary'"
                      class="text-h4 pa-3 py-6 mb-2 d-flex align-center"
                      color="grey lighten-3"
                      elevation="0"
                  >
                    {{
                      keyboardInput
                          ? keyboardInput
                          : Config.numberFirst
                              ? $t('quantity_x_dishNumber')
                              : $t('DishNumberQuantity')
                    }}
                  </v-card>
                  <keyboard-layout
                      :keys="keyboardLayout"
                      @input="numberInput"
                  ></keyboard-layout>
                </div>
              </v-card>
            </div>
          </v-card>
          <v-card
              class="d-flex align-center"
              elevation="0"
              height="60px"
              style="
              position: fixed;
              z-index: 3;
              bottom: 0;
              right: 0;
              overflow-x: scroll;
              width: calc(100vw - 350px);
            "
          >
            <div
                class="ml-2"
                style="
                display: grid;
                grid-auto-columns: min-content;
                grid-gap: 6px;
                grid-auto-flow: column;
              "
            >
              <grid-button
                  :loading="isSendingRequest"
                  :text="$t('reprint')"
                  color="red"
                  icon="mdi-printer"
                  @click="reprintOrder"
              />
              <grid-button
                  :loading="isSendingRequest"
                  :text="$t('TemporaryBill')"
                  color="amber"
                  icon="mdi-printer-pos"
                  @click="zwitchenBon"
              />
              <grid-button
                  v-if="consumeTypeId !== 2"
                  :loading="isSendingRequest"
                  :text="$t('tableChange')"
                  color="indigo"
                  icon="mdi-swap-horizontal"
                  @click="changeTable"
              />
              <grid-button
                  v-if="consumeTypeId !== 2"
                  :loading="isSendingRequest"
                  :text="$t('tableMerge')"
                  color="green"
                  icon="mdi-merge"
                  @click="mergeTable"
              />
              <grid-button
                  :loading="isSendingRequest"
                  :text="$t('WaiterTransfer')"
                  color="deep-orange"
                  icon="mdi-account"
                  @click="changeServant"
              />
              <template v-if="consumeTypeId === 2">
                <template v-if="consumeTypeStatusId < 2">
                  <template v-for="time in [0, 15, 20, 30, 60]">
                    <grid-button
                        :key="time"
                        :text="time"
                        color="success"
                        icon="mdi-plus"
                        @click="acceptOrderWithTime(time)"
                    />
                  </template>
                  <grid-button
                      :text="$t('Reject')"
                      color="error"
                      icon="mdi-minus"
                      @click="rejectOrder"
                  />
                </template>
              </template>
              <template v-else-if="consumeTypeStatusId < 2">
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
                  v-if="consumeTypeId === 1 || consumeTypeId === 5"
                  :loading="isSendingRequest"
                  :text="$t('ChangeToBuffet')"
                  color="pink"
                  icon="mdi-silverware"
                  @click="buffetDialogShow = true"
              />
            </div>
          </v-card>
        </div>
      </v-main>
      <!--      right panel-->
      <template v-if="splitOrderListModel.list.length > 0">
        <div
            v-cloak
            id="splitOrderContainer"
            class="bottomCart surface d-flex justify-end"
            style="
            background: rgba(0, 0, 0, 0.4);
            top: 0;
            z-index: 50;
            left: 348px;
          "
            @click="removeAllFromSplitOrder"
        >
          <div
              class="d-flex"
              style="max-width: 600px; width: 50vw"
              @click.stop
          >
            <div class="pa-1 d-flex flex-column">
              <v-btn
                  class="mt-1"
                  color="error  lighten-4 black--text"
                  x-large
                  @click="removeAllFromSplitOrder()"
              >
                <v-icon left>mdi-close-circle</v-icon>
                {{ $t('Cancel') }}
              </v-btn>
              <v-btn
                  class="mt-1"
                  color="success  lighten-4 black--text"
                  x-large
                  @click="needSplitOrder()"
              >
                <v-icon left>mdi-set-split</v-icon>
                {{ $t('BillSplit') }}
              </v-btn>
              <v-btn
                  class="mt-1"
                  color="warning lighten-4 black--text"
                  x-large
                  v-on:click="showDeleteDishDialog"
              >
                <v-icon left>mdi-calendar-remove</v-icon>
                {{ $t('DishCancel') }}
              </v-btn>
              <v-btn
                  class="mt-1"
                  color="pink lighten-4 black--text"
                  x-large
                  v-on:click="dishesSetDiscount()"
              >
                <v-icon left>mdi-sale</v-icon>
                {{ $t('GiveDishADiscount') }}
              </v-btn>
              <v-btn
                  class="mt-1"
                  color="indigo  lighten-4 black--text"
                  x-large
                  v-on:click="dishesChangeTable"
              >
                <v-icon left>mdi-inbox-arrow-up</v-icon>
                {{ $t('tableChange') }}
              </v-btn>
              <v-btn
                  class="mt-1"
                  color="blue  lighten-4 black--text"
                  x-large
                  v-on:click="printZwichenBon()"
              >
                <v-icon left>mdi-receipt-text-arrow-left</v-icon>
                {{ $t('TemporaryBill') }}
              </v-btn>
            </div>
            <v-card
                dark
                tile
                width="100%"
            >
              <div class="grey darken-3 pa-3 d-flex align-center">
                <div class="text-body-1">{{ $t('SelectedProduct') }}</div>
                <v-spacer/>
                <div>
                  <v-icon class="mr-2">mdi-calculator-variant</v-icon>
                </div>
                <div class="text-body-1 font-weight-black">
                  {{ splitOrderListModel.total() | priceDisplay }} ({{ splitOrderListModel.count() }})
                </div>
              </div>
              <dish-card-list
                  :click-callback="removeFromSplitOrder"
                  :default-expand="true"
                  :discount-ratio="discountRatio"
                  :dish-list-model="splitOrderListModel"
                  :title="$t('operation')"
                  class="flex-grow-1"
                  extra-height="48px"
              />
            </v-card>
          </div>
        </div>
      </template>

      <template v-if="!keyboardMode">
        <keep-alive>
          <v-fade-transition>
            <v-card
                v-if="keyboardInput || currentCodeBuffer"
                class="pa-4"
                style="
                position: fixed;
                top: 0;
                right: 0;
                margin: auto;
                box-shadow: 0 3px 16px var(--v-primary-lighten4);
                left: 0;
                bottom: 0;
                min-width: 300px;
                max-width: calc(100vw - 200px);
                z-index: 15;
                width: fit-content;
                height: fit-content;
              "
            >
              <div>
                <h1>{{ keyboardInput }}</h1>
              </div>
              <div
                  v-if="searchDish.length > 0"
                  class="flex-shrink-1 blue lighten-5"
                  style="overflow: hidden"
              >
                <template v-for="(dish, index) in searchDish">
                  <v-card
                      :key="dish.id"
                      :class="index === indexActive ? 'first' : ''"
                      :style="{
                      backgroundColor: '' + dish.displayColor,
                      color: '' + dish.foreground,
                    }"
                      class="d-flex px-1 py-1 align-start"
                      elevation="0"
                      style="
                      width: 100%;
                      border-bottom: 2px dashed #e2e3e5;
                      font-size: x-large;
                    "
                      tile
                      @click="searchDishClick(dish.code)"
                  >
                    <div class="name mr-2">
                      <span>{{ dish.code }}.</span
                      >{{ dish.dishName }}
                    </div>
                    <v-spacer></v-spacer>
                    <div
                        v-if="dish.isFree === '1'"
                        class="price d-flex align-center green lighten-3 white--text"
                        style="padding: 2px 4px; border-radius: 4px"
                    >
                      {{ $t('Free') }}
                    </div>
                    <div
                        v-else
                        class="price d-flex align-center text-no-wrap text-truncate"
                    >
                      {{ dish.price | priceDisplay }}
                    </div>
                  </v-card>
                </template>
              </div>
              <div
                  class="text-caption text--secondary"
                  style="font-size: 14px !important"
              >
                {{ $t('PressESCToEnterWindow') }}<br/>
                {{ $t('PressESCToCloseWindow') }}
              </div>
            </v-card>
          </v-fade-transition>
        </keep-alive>
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
                class="primary lighten-4 black--text"
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
          :orderId="tableDetailInfo.order.id"
          :total-price="tableDetailInfo.order.totalPrice"
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
          :id="tableDetailInfo.order.id"
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
          :id="tableDetailInfo.order.id"
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

import {
  findDish,
  getCategoryListWithCache,
  goHome,
  processDishList,
  setDefaultValueForApply
} from '@/oldjs/StaticModel'
import { printNow } from '@/oldjs/Timer'
import CategoryType from 'aaden-base-model/lib/Models/CategoryType'
import GlobalConfig from '../../oldjs/LocalGlobalSettings'

import { debounce, groupBy } from 'lodash-es'

import IKUtils from 'innerken-js-utils'

import { acceptOrder, deleteDish, reprintOrder, safeRequest, showSuccessMessage } from '@/api/api'

import { mapGetters } from 'vuex'

import i18n from '../../i18n'
import dayjs from 'dayjs'
import { TableFilter } from '@/api/tableService'
import { Remember } from '@/api/remember'
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
import priceDisplay from '../SalePage/Fragment/PriceDisplay.vue'
import MemberSelectionDialog from '@/views/TablePage/Dialog/MemberSelectionDialog.vue'
import { getCurrentOrderInfo } from '@/api/Repository/OrderInfo'

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

const keyboardLayout = [
  '7',
  '8',
  '9',
  'C',
  '4',
  '5',
  '6',
  'A',
  '1',
  '2',
  '3',
  'M',
  '.',
  '0',
  'mdi-close',
  'OK'
]

let filterCache = {}

// endregion
export default {
  name: 'TablePage',
  directives: {
    dragscroll
  },
  components: {
    MemberSelectionDialog,
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
      globalLoading: true,
      favoriteList: null,
      reasons: getReason(),
      deleteDishReason: '',
      deleteDishReasonDialog: false,
      useDishesDiscount: false,
      keyboardMode: Remember.keyboardMode,
      tab: null,
      addressFormOpen: false,
      consumeTypeList: [],
      keyboardLayout: GlobalConfig.topKeyboardKey
        .split(',')
        .concat(keyboardLayout),
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
      overrideConsumeTypeId: null,
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
      currentCodeBuffer: '',

      currentMemberId: null,
      showMemberSelectionDialog: null
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
            this.goHome()
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
          this.goHome()
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
      const res = await fastSweetAlertRequest(
        this.$t('WaiterPagePasswordPrompt'),
        'password',
        'Orders.php?op=changeServantForTable',
        'pw',
        { tableId: this.id },
        'POST'
      )
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
        if (
          this.splitOrderListModel.count() === 0 &&
            this.cartListModel.count() === 0
        ) {
          let discountRatio = 0
          const result = await getOrderInfo(
            this.id,
            false
          )
          result
            .filter((d) => d.code === 'lk')
            .map((d) => {
              d.originPrice = d.price
              return d
            })
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
        console.log(e)
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
          blockReady()
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
              dish.currentPrice = (unitCount / unitBase) * unitPrice
              dish.currentName = `${name} ${unitPrice}/${unit} | ${unitCount}${unitName}`

              dish.originPrice = dish.currentPrice.toString().replace(',', '.')
              dish.price = dish.originPrice
              dish.forceFormat = true
              dish.name = dish.currentName
            } catch (e) {
              console.warn(e)
              this.showExtraDish(dish)
              blockReady()
              return
            }
          } else {
            this.showExtraDish(dish)
            blockReady()
            return
          }
        }
        this.feedback =
            '✅' +
            dish.code +
            '.' +
            dish.dishName +
            '*' +
            count +
            this.$t('AddedToCart')
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
      if (mod) {
        this.oldMod = mod
      } else {
        this.oldMod = null
      }
      this.modificationShow = true
    },
    async getDCT () {
      if (this.dct.length === 0) {
        this.dct = (await CategoryType.getList())
          .map((i) => {
            if (!i.isActive) {
              i.isActive = false
            }
            return i
          })
          .sort((a, b) => {
            const rank = GlobalConfig.defaultSort.split(',')
            const idToRank = (id) => {
              const index = rank.indexOf(id.toString())
              return 10 - (index === -1 ? 10 : index)
            }
            const [ra, rb] = [a.id, b.id].map(idToRank)
            return ra > rb ? -1 : 1
          })
          .filter(
            (i) => typeof i.childCount === 'undefined' || i.childCount > 0
          )
      }
    },
    async getCategory (consumeTypeId = 1, force = false) {
      if (this.categories.length === 0 || force) {
        this.categories = await getCategoryListWithCache(consumeTypeId)

        this.dishes = processDishList(this.categories.reduce((arr, i) => {
          arr.push(...i.dishes)
          return arr
        }, []))
        filterCache = groupBy(this.dishes, 'dishesCategoryId')
        this.favoriteList = this.dishes.filter(item => item.isFavorite === '1')
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
      dish.apply = _mod // here we add a apply
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
      this.overrideConsumeTypeId = null
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
      this.password = await optionalAuthorizeAsync(
        '',
        GlobalConfig.checkOutUsePassword,
        '',
        true,
        this.id
      )
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
      return (
        this.modificationShow ||
          this.checkoutShow ||
          this.discountModelShow ||
          this.extraDishShow ||
          this.systemDialogShow ||
          Swal.isVisible()
      )
    },
    async getTableDetail () {
      try {
        this.tableDetailInfo = await getCurrentOrderInfo(this.id)
        if (!this.tableDetailInfo) {
          await goHome()
          return
        }
        this.tableDetailInfo.consumeTypeName = findConsumeTypeById(
          this.tableDetailInfo.consumeTypeId
        ).name
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
      await this.initialUI()
    },
    async acceptOrderWithTime (time) {
      const addressInfo = JSON.parse(this.tableDetailInfo.order.rawAddressInfo)
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
        const res = await IKUtils.showConfirmAsyn(this.$t('AreYouSureToContinue'), this.$t('ReprintAllDishes'))
        if (res.isConfirmed) {
          await hillo.post('Printer.php?op=questReprintOrder', {
            orderId: this.tableDetailInfo.order.id
          })
        }
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
                res = await showConfirmAsyn(i18n.t('BasketOrder'))
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
                  const pw = await optionalAuthorizeAsync(
                    '',
                    GlobalConfig.checkOutUsePassword,
                    null,
                    true,
                    this.id
                  )
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
        order.forEach((o) => {
          o.guestNumber = 1
        })
        await hillo.post(
          'Complex.php?op=addDishesToTable&_servantPw=' +
            GlobalConfig.defaultPassword,
          {
            params: JSON.stringify(order),
            tableId: this.id,
            printingKitchenBon: print ? 1 : 0
          }
        )
        this.cartListModel.clear()
        this.initialUI()
        printNow()
        if (GlobalConfig.jumpToHomeWhenOrder) {
          this.$nextTick(() => {
            this.goHome()
          })
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
    async realInitial () {
      window.onkeydown = this.listenKeyDown
      this.globalLoading = true
      await this.initialUI(true)
      this.globalLoading = false
    },
    updateActiveDCT (index) {
      this.activeDCT = null
      this.$nextTick(() => {
        this.activeDCT = index
      })
    },
    updateFilteredDish () {
      if (this.activeCategoryId) {
        this.filteredDish = this.filterDish()
      }
    },
    debounce: debounce(
      (f) => {
        f()
      },
      200,
      { trailing: true }
    ),
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
              if (
                d.code.toLowerCase().startsWith(code.toLowerCase()) &&
                  d.code !== code
              ) {
                d.rank = 999 + d.code.length
                result.push(d)
              } else if (
                d.dishName.toLowerCase().startsWith(code.toLowerCase())
              ) {
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
      const list = this.dishes

      if (!this.keyboardInput) {
        if (!filterCache[this.activeCategoryId]) {
          filterCache[this.activeCategoryId] = list.filter((item) => {
            return parseInt(item.categoryId) === parseInt(this.activeCategoryId)
          })
        }
        if (this.haveFavoriteItem && this.activeDCT === 0) {
          return list.filter(item => item.isFavorite === '1')
        }
        return filterCache[this.activeCategoryId]
      }
    },
    async cartListModelClear () {
      this.cartListModel.clear()
    }

  },
  computed: {
    priceDisplay () {
      return priceDisplay
    },
    ...mapGetters(['systemDialogShow']),
    haveFavoriteItem () {
      return this.favoriteList?.length > 0
    },
    sourceMarks: function () {
      return this.tableDetailInfo?.sourceMarks ?? []
    },

    totalPrice: function () {
      return this.tableDetailInfo.order?.totalPrice ?? 0
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
    realConsumeTypeId () {
      return this.overrideConsumeTypeId &&
      this.overrideConsumeTypeId !== this.consumeTypeId
        ? this.overrideConsumeTypeId
        : this.consumeTypeId ?? 1
    },
    consumeTypeStatusId () {
      return parseInt(this.tableDetailInfo.order.consumeTypeStatusId ?? 2)
    },
    filteredC: function () {
      return this.categories.filter((item) => {
        const dct = this.dct?.[this.haveFavoriteItem ? (this.activeDCT - 1) : this.activeDCT]
        return parseInt(item.dishesCategoryTypeId) === parseInt(dct?.id)
      })
    }
  },
  watch: {
    activeDCT: function (val) {
      if (val === 0 && this.haveFavoriteItem) {
        this.activeCategoryId = -10
      } else {
        this.keyboardInput = ''
        this.activeCategoryId = null
      }
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
      this.debounce(this.updateSearchDish)
    },
    keyboardMode: function (val) {
      Remember.keyboardMode = val
    },
    realConsumeTypeId (val) {
      this.reloadDish(val, true)
    }
  },
  async activated () {
    await this.realInitial()
    this.currentMemberId = null
  },
  async mounted () {
    await getConsumeTypeList()
    await this.getDCT()
    const selectableId = GlobalConfig.selectableConsumeTypeId
      ?.split(',')
      .map((d) => parseInt(d))
    if (selectableId?.length > 0) {
      this.consumeTypeList = consumeTypeList.filter((c) =>
        selectableId.includes(parseInt(c.id))
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

td,
th {
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
  background: #bbdefb !important;
  border-bottom: 2px solid #367aeb !important;
}
</style>
