<template>
  <div style="background: #f6f6f6;">
    <template v-if="GlobalConfig.activeVip">
      <div style="display: grid;grid-template-columns:400px 1fr;grid-gap: 1px">
        <div
          class="d-flex flex-column"
          style="height: calc(100vh)"
        >
          <v-sheet
            class="pa-6"
            color="white"
          >
            <div class="d-flex align-center">
              <div class="text-h4 font-weight-black">
                {{ $t('ExclusiveMember') }}
              </div>
              <v-spacer></v-spacer>
              <v-icon class="mr-1">mdi-gift-outline</v-icon>
            </div>
            <div class="d-flex align-center mt-4">
              <v-text-field
                v-model="cardSearch"
                :placeholder="$t('SearchVipNumber')"
                append-icon="mdi-magnify"
                autofocus
                class="mr-2"
                clearable
                dense
                filled
                hide-details
                outlined
              ></v-text-field>
              <v-btn
                color="amber lighten-4 black--text"
                elevation="0"
                height="42"
                @click="createNewMemberCard"
              >
                <v-icon
                  color="black"
                  left
                >mdi-plus-circle-outline
                </v-icon>
                {{ $t('Add') }}
              </v-btn>
            </div>
          </v-sheet>
          <div
            class="flex-grow-1 grey lighten-5"
            style="overflow-y: scroll"
          >
            <v-sheet
              v-for="member in filteredList"
              :key="member.id"
              :color="(selectedCardId===member.simpleMemberUuid?'primary lighten-5':'grey lighten-5')"
              :elevation="selectedCardId===member.simpleMemberUuid?1:0"
              class="pa-6"
              @click="selectMemberCard(member.simpleMemberUuid)"
            >
              <div class="d-flex align-center text-body-1">
                <div class="font-weight-bold">
                  {{ member.name }}
                </div>
                <v-spacer></v-spacer>
                <div>余额:{{ member.currentVoucherAmount | priceDisplay }}</div>
              </div>
              <div class="d-flex align-center text-no-wrap text-body-2 text--secondary mt-2">
                {{ member.memberIdentity }} | @{{ member.memberLevel }}
              </div>
            </v-sheet>
          </div>

        </div>
        <div>
          <template v-if="!selectedCardId">
            <div
              class="pa-6 d-flex flex-column"
              style="height: 100%"
            >
              <div class="flex-grow-1 d-flex align-center justify-center flex-column text-center">
                <div class="text-h4 font-weight-bold">
                  {{ $t('ScanMemberCard') }}
                </div>
                <div
                  class="text-body-1 mt-4"
                  style="width: 400px"
                >
                  {{ $t('ManualUserModification') }}
                </div>
                <lottie-animation
                  :animationData="require('@/assets/card.json')"
                  :autoPlay="true"
                  :loop="true"
                  class="my-16"
                  style="height: 200px"
                ></lottie-animation>
              </div>
            </div>
          </template>
          <template v-else-if="selectedCard && VipDetailInfo">
            <div style="max-height: 100vh;overflow-y: scroll">
              <v-sheet class=" pt-6 px-6">
                <div class="text-h4 font-weight-bold">
                  {{ selectedCard.name }}
                </div>
                <div class="text-body-2 text--secondary mt-2">
                  {{ selectedCard.memberLevel }} | {{ selectedCard.simpleMemberUuid }}
                </div>
                <v-tabs
                  v-model="currentTab"
                  class="font-weight-black mt-2"
                  color="indigo"
                >
                  <v-tab>🔥 {{ $t('Overview') }}</v-tab>
                  <v-tab>🗂️ {{ $t('EditVipPoints') }}</v-tab>
                  <v-tab>🧾 {{ $t('DishesRecord') }}</v-tab>
                </v-tabs>

              </v-sheet>

              <v-tabs-items
                v-model="currentTab"
                style="background: transparent !important;"
              >
                <v-tab-item>
                  <div class="pa-6">
                    <div class="text-h5">{{ $t('VipMemberDetails') }}</div>
                    <div
                      class="mt-4"
                      style="display: grid;grid-template-columns: repeat(3,minmax(0,1fr));grid-gap: 24px"
                    >
                      <v-card
                        class="pa-6"
                        color="grey lighten-3 black--text"
                        elevation="0"
                        style="border-radius: 24px !important;"
                      >
                        <div class="text-body-2">{{ $t('Balance') }}</div>
                        <div v-if="!loadingBalance">
                          <div class="d-flex mt-6">
                            <div class="text-h4">{{ VipDetailInfo.currentVoucherAmount | priceDisplay }}</div>
                          </div>
                        </div>

                        <div v-else>
                          <div class="d-flex mt-6">
                            <v-progress-circular
                              indeterminate
                              size="24"

                            ></v-progress-circular>
                          </div>

                        </div>
                      </v-card>
                      <v-card
                        class="pa-6"
                        color="grey lighten-3 black--text"
                        elevation="0"
                        style="border-radius: 24px !important;"
                      >
                        <div class="text-body-2">{{ $t('Integral') }}</div>
                        <div v-if="!loadingPoint">
                          <div class="d-flex mt-6">
                            <div class="text-h4">{{ VipDetailInfo.merchantPoint }}
                              <v-icon
                                color="black"
                                x-large
                              >mdi-star-four-points-small
                              </v-icon>
                            </div>
                          </div>
                        </div>
                        <div v-else>
                          <div class="d-flex mt-6">
                            <v-progress-circular
                              indeterminate
                              size="24"

                            ></v-progress-circular>
                          </div>

                        </div>
                      </v-card>
                      <v-card
                        class="pa-6"
                        color="grey lighten-3 black--text"
                        elevation="0"
                        style="border-radius: 24px !important;"
                      >
                        <div class="text-body-2">{{ $t('CumulativeConsumption') }}</div>
                        <div class="d-flex mt-6">
                          <div class="text-h4">{{ totalCost | priceDisplay }}</div>
                        </div>
                      </v-card>
                    </div>
                    <div class="text-h5 mt-6">{{ $t('Work') }}</div>
                    <div
                      class="mt-4"
                      style="display: grid;grid-auto-flow: column;grid-gap: 12px;grid-auto-columns: min-content"
                    >
                      <div class="d-block overflow-hidden">
                        <v-card
                          color="grey lighten-3"
                          elevation="0"
                          style="border-radius: 12px !important;"
                          width="96"
                          @click="startDeposit"
                        >
                          <v-responsive :aspect-ratio="1">
                            <div
                              class="pa-4 d-flex align-center justify-center flex-wrap"
                              style="height: 100%"
                            >
                              <v-icon style="width: 100%;">mdi-cash-refund</v-icon>
                              <div class="text-body-2 text-truncate">
                                {{ $t('LoadPrepaid') }}
                              </div>
                            </div>
                          </v-responsive>
                        </v-card>
                      </div>
                      <div class="d-block overflow-hidden">
                        <v-card
                          color="grey lighten-3"
                          elevation="0"
                          style="border-radius: 12px !important;"
                          width="96"
                          @click="changeBonusPoint"
                        >
                          <v-responsive :aspect-ratio="1">
                            <div
                              class="pa-4 d-flex align-center justify-center flex-wrap"
                              style="height: 100%"
                            >
                              <v-icon style="width: 100%;">mdi-plus-circle-multiple-outline</v-icon>
                              <div class="text-body-2 text-truncate">
                                {{ $t('EditPoints') }}
                              </div>
                            </div>
                          </v-responsive>
                        </v-card>
                      </div>
                      <div class="d-block overflow-hidden">
                        <v-card
                          color="grey lighten-3"
                          elevation="0"
                          style="border-radius: 12px !important;"
                          width="96"
                        >
                          <v-responsive :aspect-ratio="1">
                            <div
                              class="pa-4 d-flex align-center justify-center flex-wrap"
                              style="height: 100%"
                            >
                              <v-icon style="width: 100%;">mdi-dots-horizontal</v-icon>
                              <div class="text-body-2 text-truncate">
                                {{ $t('StayTurned') }}
                              </div>
                            </div>
                          </v-responsive>
                        </v-card>
                      </div>

                    </div>
                  </div>

                </v-tab-item>
                <v-tab-item>
                    <div
                      class="px-4"
                      style="height: 85vh;overflow-y: scroll"
                      v-dragscroll
                    >
                    <div
                      v-if="usePointLog.length === 0"
                      class="pa-4 d-flex align-center justify-center"
                    >
                      当前暂无数据！
                    </div>
                    <v-card
                      v-for="item in usePointLog"
                      :key="item.id"
                      class="pa-4 d-flex align-center justify-center my-2"
                      elevation="0"
                    >
                      <div class="text-h4">
                        {{ getCurrentPoint(item.pointValue) }}
                      </div>
                      <v-spacer/>
                      <div
                        class="text-h4"
                      >
                        {{ item.electronic_meta_createdAt?.seconds | beautifulTimeByStampTime }}
                      </div>
                    </v-card>
                  </div>
                </v-tab-item>
                <v-tab-item>
                  <div
                    class="px-4"
                    style="height: 85vh;overflow-y: scroll"
                    v-dragscroll
                  >
                      <div
                        v-if="ordersInfo?.length === 0"
                        class="pa-4 d-flex align-center justify-center"
                      >
                        当前暂无数据！
                      </div>
                      <v-card
                        v-for="item in ordersInfo"
                        :key="item.billNr"
                        class="my-2"
                        elevation="0"
                        outlined
                        @click="openOrderDetail(item)"
                      >
                        <div class="pa-4 d-flex align-center justify-center">
                          <div
                            class="text-h4 "
                          >
                            {{ item.billNr }}
                          </div>
                          <v-spacer />
                          <div
                            v-for="(i,index) in item.pointInfo"
                            :key="index"
                          >
                            <div class="d-flex flex-column">
                              <div class="d-flex">
                          <span>
                            积分类型:
                          </span>
                                <v-spacer class="mx-4" />
                                <div>
                                  {{ i.pointType }}
                                </div>
                              </div>
                              <div class="d-flex">
                          <span>
                            积分:
                          </span>
                                <v-spacer class="mx-2" />
                                <div>
                                  {{ i.pointValue }}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </v-card>
                    </div>
                </v-tab-item>
              </v-tabs-items>
            </div>

          </template>
        </div>
      </div>
    </template>
    <template v-else>
      <div style="height: 100vh">
        <no-content-display
          :desc="$t('ContactSupportToActivate')"
          :title="$t('FunctionNotActivated')"
          icon="mdi-lock"
        ></no-content-display>
      </div>
    </template>
    <v-dialog
      v-model="rechargeDialog"
      max-width="600px"
      persistent
    >
      <base-form
        :schema="schemas"
        @close="rechargeDialog=false"
        @submit="saveRecharge"
      >
        <div>{{ $t('PlannedSettings') }}</div>
        <template #subtitle>
          {{ $t('PlannedSettingsHint') }}
        </template>
      </base-form>
    </v-dialog>
    <v-navigation-drawer
      v-model="checkOutDialog"
      app
      right
      temporary
      width="400"
    >
      <v-card
        height="100vh"
        width="100%"
      >
        <checkout-dialog
          :total="depositTotal"
          @payment-cancel="checkOutDialog=false"
          @payment-submit="onDeposit"
        ></checkout-dialog>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import LottieAnimation from 'lottie-web-vue'
import { deposit, editNfcCard, register, transferToCloud } from '@/api/VIPCard/VIPApi'
import IKUtils from 'innerken-js-utils'
import CheckoutDialog from '@/components/GlobalDialog/CheckoutDialog.vue'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import NoContentDisplay from '@/views/FirstPage/widget/NoContentDisplay.vue'
import {
  getAllPointLog,
  getAllVipList,
  getCashBoxList,
  getMemberDetailInfo,
  getNfcMenuList,
  getPayMethodList,
  memberRechargeFunc,
  updateMemberDetailPoint
} from '@/api/NewVipApi/Vip'
import { sumBy } from 'lodash'
import BaseForm from '@/components/Base/Form/BaseForm'
import { VSelect } from 'vuetify/lib/components'
import { loadAllServants } from '@/api/api'
import { uuid } from 'uuidv4'
import { dragscroll } from 'vue-dragscroll/src/main'
export default {
  name: 'MemberCardPage',
  components: {
    BaseForm,
    NoContentDisplay,
    CheckoutDialog,
    LottieAnimation
  },
  data: function () {
    return {
      GlobalConfig,
      checkOutDialog: null,
      depositTotal: 0,
      showCardInfoDialog: null,
      memberCardList: [],
      bonusList: [],
      selectedCardId: null,
      currentTab: 0,
      cardSearch: null,
      modal: null,
      date: null,
      name: null,
      email: null,
      VipDetailInfo: null,
      rechargeDialog: false,
      paymentList: [],
      nfcMenuList: [],
      servantList: [],
      cashBoxList: [],
      loadingPoint: false,
      VipInfo: null,
      loadingBalance: false,
      usePointLog: null
    }
  },
  directives: {
    dragscroll
  },
  computed: {
    ordersInfo () {
      return this.VipDetailInfo.orders
    },
    schemas () {
      return [
        {
          key: 'nfcMenuId',
          name: '充值类型',
          component: VSelect,
          componentProps: {
            items: this.nfcMenuList.map(it => {
              it.text = it.name
              it.value = it.id
              return it
            })
          }
        },
        {
          key: 'payment',
          name: '支付方式',
          component: VSelect,
          componentProps: {
            items: this.paymentList.map(it => {
              it.text = it.name
              it.value = it.id
              return it
            })
          }
        },
        {
          key: 'pw',
          name: '员工',
          component: VSelect,
          componentProps: {
            items: this.servantList.map(it => {
              it.text = it.name
              it.value = it.password
              return it
            })
          }
        },
        {
          key: 'cashBoxId',
          name: '钱箱',
          component: VSelect,
          componentProps: {
            items: this.cashBoxList.map(it => {
              it.text = it.name
              it.value = it.id
              return it
            })
          },
          required: false
        }
      ]
    },
    totalCost () {
      return sumBy(this.VipDetailInfo.orders, (o) => {
        return parseFloat(o.billInfo.totalPrice)
      })
    },
    selectedCard () {
      return this.memberCardList.find(it => it.simpleMemberUuid === this.selectedCardId)
    },
    totalUsage () {
      return this.usageInfo?.reduce((sum, i) => sum + parseFloat(i.sumPrice), 0) ?? 0
    },
    totalBonus () {
      return this.bonusList?.reduce((sum, i) => sum + parseInt(i.bonusPointChange), 0) ?? 0
    },
    usageInfo () {
      return this.selectedCard?.usageInfos ?? []
    },
    filteredList () {
      return this.memberCardList.filter(it => {
        if (!this.cardSearch) {
          return true
        } else {
          const str = [it.name, it.birthday, it.uid, it.email].join(',')
          return str.includes(this.cardSearch)
        }
      }).slice(0, 100)
    }
  },
  watch: {
    async selectedCard (val) {
      if (this.selectedCard) {
        this.VipInfo = val
        this.VipDetailInfo = await getMemberDetailInfo({ memberIdentity: this.VipInfo.memberIdentity })
        this.usePointLog = await getAllPointLog(this.VipInfo.simpleMemberUuid)
        console.log(this.usePointLog, 'log')
      }
    }
  },
  methods: {
    getCurrentPoint (point) {
      return point < 0 ? '+' + Math.abs(point) : '-' + point
    },
    async saveRecharge (info) {
      this.loadingBalance = true
      const price = this.nfcMenuList.find(it => it.id === info.nfcMenuId).amountToPay
      info.uid = this.VipInfo.simpleMemberUuid
      info.paymentLog = JSON.stringify([{ id: info.payment, price }])
      await memberRechargeFunc(info)
      this.VipDetailInfo = await getMemberDetailInfo({ memberIdentity: this.VipInfo.memberIdentity })
      this.loadingBalance = false
      this.rechargeDialog = false
    },
    async loadMemberCardList () {
      this.memberCardList = await getAllVipList()
    },
    async initPanel () {
      await this.loadMemberCardList()
      this.selectedCardId = null
      this.cardSearch = null
    },
    selectMemberCard (id) {
      this.currentTab = 0
      if (this.selectedCardId === id) {
        this.selectedCardId = null
      } else {
        this.selectedCardId = id
      }
    },
    createNewMemberCard () {
      this.selectedCardId = null
      this.name = ''
      this.email = ''
      this.date = ''
      this.showCardInfoDialog = true
    },
    editCard () {
      if (this.selectedCard) {
        this.name = this.selectedCard.name
        this.email = this.selectedCard.email
        this.date = this.selectedCard.birthday
        this.showCardInfoDialog = true
      }
    },
    async saveCard () {
      if (this.selectedCardId) {
        await this.reloadAndGoBack(async () => {
          await editNfcCard(this.selectedCardId, this.selectedCard.uid, this.date, this.name, this.email)
          this.showCardInfoDialog = false
        })
      } else {
        try {
          this.showCardInfoDialog = false
          const uid = await IKUtils.showInput(this.$t('ScanNfcID'))
          if (uid) {
            await register(uid, this.date, this.name, this.email)
            await this.initPanel()
            this.selectedCardId = this.memberCardList.find(it => it.uid === uid)?.id
          } else {
            this.showCardInfoDialog = true
          }
        } catch (e) {
          IKUtils.showError(e?.message)
          this.showCardInfoDialog = true
        }
      }
    },
    async changeBonusPoint () {
      this.loadingPoint = true
      const newAmount = await IKUtils.showInput(this.$t('EnterNewScore'), 'number',
        this.$t('ActuallyScore') + ': ' + this.totalBonus)
      console.log(newAmount, 'new')
      if (newAmount) {
        await updateMemberDetailPoint({
          customerId: this.VipDetailInfo?.simpleMemberUuid,
          usePointEventId: uuid(),
          pointSourceId: this.VipDetailInfo.deviceId,
          pointType: 'Merchant',
          pointValue: this.VipDetailInfo?.merchantPoint - newAmount,
          note: 'adminEdit'
        })
        this.VipDetailInfo = await getMemberDetailInfo({ memberIdentity: this.VipInfo.memberIdentity })
      }
      this.loadingPoint = false
    },
    async startDeposit () {
      this.rechargeDialog = true
    },
    async reloadAndGoBack (action) {
      const id = this.selectedCardId
      try {
        await action()
        await this.initPanel()
        this.selectedCardId = id
      } catch (e) {

      }
    },
    async changeCard () {
      await this.reloadAndGoBack(async () => {
        const newUid = await IKUtils.showInput(this.$t('RescanVipCard'))
        if (newUid) {
          await editNfcCard(this.selectedCardId, newUid, this.selectedCard.birthday, this.selectedCard.name, this.selectedCard.email)
        }
      })
    },
    async onDeposit (paymentLog = []) {
      if (paymentLog?.length === 0) {
        paymentLog = [{
          id: 1,
          price: this.depositTotal
        }]
      }
      await this.reloadAndGoBack(async () => {
        await deposit(this.selectedCard.uid, this.depositTotal, GlobalConfig.defaultPassword, paymentLog)
        this.checkOutDialog = false
      })
    },
    async transferToCloud () {
      await this.reloadAndGoBack(async () => {
        IKUtils.showLoading()
        await transferToCloud(this.selectedCardId)
        IKUtils.toast()
      })
    }
  },
  activated () {
    this.initPanel()
  },
  async mounted () {
    await this.initPanel()
    this.paymentList = await getPayMethodList()
    this.servantList = await loadAllServants()
    this.nfcMenuList = await getNfcMenuList()
    this.cashBoxList = await getCashBoxList()
  }
}
</script>

<style scoped>

</style>
