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
                  outlined
                  dense
                  v-model="cardSearch"
                  hide-details
                  filled
                  autofocus
                  clearable
                  class="mr-2"
                  :placeholder="$t('SearchVipNumber')"
                  append-icon="mdi-magnify"
              ></v-text-field>
              <v-btn
                  @click="createNewMemberCard"
                  height="42"
                  elevation="0"
                  color="primary lighten-4 black--text"
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
              style="overflow-y: scroll"
              class="flex-grow-1 grey lighten-5"
          >
            <v-sheet
                class="pa-6"
                :elevation="selectedCardId===member.id?1:0"
                @click="selectMemberCard(member.id)"
                :color="(selectedCardId===member.id?'white':'grey lighten-5')"
                v-for="member in filteredList"
                :key="member.id"
            >
              <div class="d-flex align-center text-body-1">
                <v-icon left v-if="member.cloudId" small>mdi-cloud-check</v-icon>
                <div class="font-weight-bold">
                  {{ member.name }}
                </div>
                <v-spacer></v-spacer>
                <div v-if="member.local">{{ member.voucherTotal | priceDisplay }}</div>
                <div v-else class="text-body-2">{{ $t('CloudMember') }}: {{member.deviceId}}</div>
              </div>
              <div class="d-flex align-center text-no-wrap text-body-2 text--secondary mt-2">
                {{ member.uid }} | @{{ member.createdAt | age }}
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
                <div class="text-body-1 mt-4" style="width: 400px">
                  {{ $t('ManualUserModification') }}
                </div>
                <lottie-animation
                    class="my-16"
                    :animationData="require('@/assets/card.json')"
                    style="height: 200px"
                    :loop="true"
                    :autoPlay="true"
                ></lottie-animation>
              </div>
            </div>
          </template>
          <template v-else-if="selectedCard">
            <div style="max-height: 100vh;overflow-y: scroll">
              <v-sheet class=" pt-6 px-6">
                <div class="text-h4 font-weight-bold">
                  {{ selectedCard.name }}
                </div>
                <div class="text-body-2 text--secondary mt-2">
                  {{ selectedCard.uid }} | {{ selectedCard.createdAt | age }} | {{ selectedCard.birthday }}
                </div>
                <v-tabs v-model="currentTab" color="indigo" class="font-weight-black mt-2">
                  <v-tab>🔥 {{ $t('Overview') }}</v-tab>
                  <v-tab>🗂️ {{ $t('EditVipPoints') }}</v-tab>
                  <v-tab :disabled="!selectedCard.local">🧾 {{ $t('DishesRecord') }}</v-tab>
                </v-tabs>

              </v-sheet>

              <v-tabs-items style="background: transparent !important;" v-model="currentTab">
                <v-tab-item>
                  <div class="pa-6">
                    <div class="text-h5">{{ $t('VipMemberDetails') }}</div>
                    <div class="mt-4" style="display: grid;grid-template-columns: repeat(3,minmax(0,1fr));grid-gap: 24px">
                      <v-card
                          style="border-radius: 24px !important;"
                          elevation="0"
                          color="grey lighten-3 black--text"
                          class="pa-6">
                        <div class="text-body-2">{{ $t('Balance') }}</div>
                        <div class="d-flex mt-6">
                          <div class="text-h4">{{ selectedCard.voucherTotal | priceDisplay }}</div>
                        </div>
                      </v-card>
                      <v-card
                          style="border-radius: 24px !important;"
                          elevation="0"
                          color="grey lighten-3 black--text"
                          class="pa-6">
                        <div class="text-body-2">{{ $t('Integral') }}</div>
                        <div class="d-flex mt-6">
                          <div class="text-h4">{{ totalBonus }}
                            <v-icon color="black" x-large>mdi-star-four-points-small</v-icon>
                          </div>
                        </div>
                      </v-card>
                      <v-card
                          style="border-radius: 24px !important;"
                          elevation="0"
                          color="grey lighten-3 black--text"
                          class="pa-6">
                        <div class="text-body-2">{{ $t('CumulativeConsumption') }}</div>
                        <div class="d-flex mt-6">
                          <div class="text-h4">{{ totalUsage | priceDisplay }}</div>
                        </div>
                      </v-card>
                    </div>
                    <div class="text-h5 mt-6">{{ $t('Work') }}</div>
                    <div style="display: grid;grid-auto-flow: column;grid-gap: 12px;grid-auto-columns: min-content"
                         class="mt-4">
                      <div class="d-block overflow-hidden">
                        <v-card :disabled="!selectedCard.local" @click="startDeposit" color="grey lighten-3" width="96" style="border-radius: 12px !important;" elevation="0">
                          <v-responsive :aspect-ratio="1">
                            <div style="height: 100%" class="pa-4 d-flex align-center justify-center flex-wrap">
                              <v-icon style="width: 100%;">mdi-cash-refund</v-icon>
                              <div class="text-body-2 text-truncate">
                                {{ $t('LoadPrepaid') }}
                              </div>
                            </div>
                          </v-responsive>
                        </v-card>
                      </div>
                      <div class="d-block overflow-hidden">
                        <v-card @click="changeBonusPoint" color="grey lighten-3" width="96" style="border-radius: 12px !important;" elevation="0">
                          <v-responsive :aspect-ratio="1">
                            <div style="height: 100%" class="pa-4 d-flex align-center justify-center flex-wrap">
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
                          :disabled="!selectedCard.local"
                          @click="changeCard" color="grey lighten-3" width="96"
                          style="border-radius: 12px !important;" elevation="0">
                          <v-responsive :aspect-ratio="1">
                            <div style="height: 100%" class="pa-4 d-flex align-center justify-center flex-wrap">
                              <v-icon style="width: 100%;">mdi-briefcase-arrow-left-right</v-icon>
                              <div class="text-body-2 text-truncate">
                                {{ $t('ReportLoss') }}
                              </div>
                            </div>
                          </v-responsive>
                        </v-card>
                      </div>
                      <div class="d-block overflow-hidden">
                        <v-card
                          :disabled="!selectedCard.local"
                          @click="editCard"
                          color="grey lighten-3"
                          width="96"
                          style="border-radius: 12px !important;"
                          elevation="0">
                          <v-responsive :aspect-ratio="1">
                            <div style="height: 100%" class="pa-4 d-flex align-center justify-center flex-wrap">
                              <v-icon style="width: 100%;">mdi-folder-edit</v-icon>
                              <div class="text-body-2 text-truncate">
                                {{ $t('EditInformation') }}
                              </div>
                            </div>
                          </v-responsive>
                        </v-card>
                      </div>
                      <div class="d-block overflow-hidden">
                        <v-card @click="transferToCloud" v-if="selectedCard.local&&!selectedCard.cloudId" color="grey lighten-3" width="96" style="border-radius: 12px !important;" elevation="0">
                          <v-responsive :aspect-ratio="1">
                            <div style="height: 100%" class="pa-4 d-flex align-center justify-center flex-wrap">
                              <v-icon style="width: 100%;">mdi-cloud-arrow-up</v-icon>
                              <div class="text-body-2 text-truncate">
                                {{ $t('SwitchToCloud') }}
                              </div>
                            </div>
                          </v-responsive>
                        </v-card>
                      </div>
                      <div class="d-block overflow-hidden">
                        <v-card color="grey lighten-3" width="96" style="border-radius: 12px !important;" elevation="0">
                          <v-responsive :aspect-ratio="1">
                            <div style="height: 100%" class="pa-4 d-flex align-center justify-center flex-wrap">
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
                  <div class="pa-6">
                    <v-card v-for=" b in bonusList" :key="b.id" elevation="0" color="grey lighten-3"
                            class="d-flex my-2 pa-4">
                      <div class="text-h6">
                        {{ b.createdAt | timeDisplay }}
                      </div>
                      <v-spacer></v-spacer>
                      <div :class="b.bonusPointChange>0?'success--text':'error--text'" class="text-h6">
                        {{ b.bonusPointChange>0 ? '+' + b.bonusPointChange : b.bonusPointChange }}
                      </div>
                    </v-card>
                  </div>
                </v-tab-item>
                <v-tab-item>
                  <div class="pa-6">
                    <v-card v-for=" b in usageInfo" :key="b.id" elevation="0" color="grey lighten-3"
                            class="d-flex align-center my-4 pa-4">
                      <div>
                        <div class="text-body-1">
                          {{ b.updateTimestamp }}
                        </div>
                        <div class="text-body-1">
                          {{ b.dishesOrdersId }}/{{ b.name }}
                        </div>
                      </div>

                      <v-spacer></v-spacer>
                      <div :class="b.sumPrice>0?'success--text':'error--text'" class="text-h6">
                        <span v-if="b.sumPrice>0 ">+</span>{{ b.sumPrice | priceDisplay }}
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
        <no-content-display icon="mdi-lock" :title="$t('FunctionNotActivated')" :desc="$t('ContactSupportToActivate')"></no-content-display>
      </div>
    </template>

    <v-dialog v-model="showCardInfoDialog" max-width="400">
      <v-card class="pa-6" style="border-radius: 24px !important;">
        <div class="text-h6">
          {{ $t('VipMemberInformation') }}
        </div>
        <div class="mt-4">
          <v-text-field autofocus v-model="name" outlined filled :placeholder="$t('name')"></v-text-field>
          <v-text-field v-model="email" outlined filled :placeholder="$t('emailAddress')"></v-text-field>
          <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field outlined filled :placeholder="$t('Birth')" append-icon="mdi-calendar"
                            v-model="date"
                            readonly
                            v-bind="attrs"
                            v-on="on"/>
            </template>
            <v-date-picker
                v-model="date"
                scrollable
            >
              <v-spacer></v-spacer>
              <v-btn
                  text
                  color="primary"
                  @click="modal = false"
              >
                {{ $t('Cancel') }}
              </v-btn>
              <v-btn
                  text
                  color="primary"
                  @click="$refs.dialog.save(date)"
              >
                {{ $t('Confirm') }}
              </v-btn>
            </v-date-picker>
          </v-dialog>
        </div>
        <v-btn @click="saveCard" large color="primary lighten-4 black--text" elevation="0">
          <v-icon left>mdi-check</v-icon>
          {{ $t('Save') }}
        </v-btn>

      </v-card>
    </v-dialog>
    <v-navigation-drawer width="400" right app temporary v-model="checkOutDialog">
      <v-card width="100%" height="100vh">
        <check-out-calculator
            :total="depositTotal"
            @payment-cancel="checkOutDialog=false"
            @payment-submit="onDeposit"
        ></check-out-calculator>
      </v-card>
    </v-navigation-drawer>
  </div>
</template>

<script>
import LottieAnimation from 'lottie-web-vue'
import {
  addBonusPoint,
  deposit,
  editNfcCard,
  getBonusRecord,
  register,
  searchNfcCard,
  transferToCloud
} from '@/api/VIPCard/VIPApi'
import IKUtils from 'innerken-js-utils'
import CheckOutCalculator from '@/components/GlobalDialog/CheckOutCalculator.vue'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import NoContentDisplay from '@/views/FirstPage/widget/NoContentDisplay.vue'

export default {
  name: 'MemberCardPage',
  components: {
    NoContentDisplay,
    CheckOutCalculator,
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
      email: null
    }
  },
  computed: {
    selectedCard () {
      return this.memberCardList.find(it => it.id === this.selectedCardId)
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
      }).slice(0, 10)
    }
  },
  watch: {
    async selectedCard () {
      if (this.selectedCard) {
        this.bonusList = await getBonusRecord(this.selectedCard.uid)
      }
    }
  },
  methods: {
    async loadMemberCardList () {
      this.memberCardList = await searchNfcCard()
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
            this.initPanel()
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
      const newAmount = await IKUtils.showInput(this.$t('EnterNewScore'), 'number',
        this.$t('ActuallyScore') + ': ' + this.totalBonus)
      if (newAmount) {
        const modify = (parseFloat(newAmount) - parseFloat(this.totalBonus)).toFixed(2)
        await this.reloadAndGoBack(async () => {
          await addBonusPoint(this.selectedCard.uid, modify)
        })
      }
    },
    async startDeposit () {
      const amount = await IKUtils.showInput(this.$t('EnterPrepaidAmount'))
      if (!isNaN(amount)) {
        this.depositTotal = amount
        this.checkOutDialog = true
      }
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
  mounted () {
    this.initPanel()
  }
}
</script>

<style scoped>

</style>
