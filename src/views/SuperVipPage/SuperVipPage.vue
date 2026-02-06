<template>
  <div style="background: #f6f6f6;">
    <template v-if="!GlobalConfig.activeVip">
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
                v-for="member in memberCardList"
                :key="member.userId"
                :color="(selectedCardId===member.userId?'primary lighten-5':'grey lighten-5')"
                :elevation="selectedCardId===member.userId?1:0"
                class="pa-6"
                @click="selectMemberCard(member)"
            >
              <div class="d-flex align-center text-body-1">
                <div class="font-weight-bold">
                  {{ member?.cloudUserInfo?.username }}
                </div>
                <v-spacer></v-spacer>
                <div>积分:{{ member?.currentMembership?.currentPoints }}</div>
              </div>
              <div class="d-flex align-center text-no-wrap text-body-2 text--secondary mt-2">
                {{ timeDisplay(member.currentMembership?.userLastConsumeAt) }} |
                @{{ member.currentMembership?.currentLevel?.displayInfo?.name }}
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
          <template v-else-if="selectedCard">
            <div style="max-height: 100vh;overflow-y: scroll">
              <user-details-page :user-id="selectedCardId"/>
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
import { deposit } from '@/api/VIPCard/VIPApi'
import CheckoutDialog from '@/components/GlobalDialog/CheckoutDialog.vue'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import NoContentDisplay from '@/views/FirstPage/widget/NoContentDisplay.vue'
import { dragscroll } from 'vue-dragscroll/src/main'
import { getSuperVipList } from '@/api/SuperVipApi/SuperVip'
import { timeDisplay } from '@/api/dateUtils'
import UserDetailsPage from '@/views/SuperVipPage/UserDetails/index.vue'

export default {
  name: 'SuperVipPage',
  components: {
    UserDetailsPage,
    NoContentDisplay,
    CheckoutDialog,
    LottieAnimation
  },
  data: function () {
    return {
      loadingDetailPage: false,
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
    selectedCard () {
      return this.memberCardList.find(it => it.userId === this.selectedCardId)
    }
  },
  methods: {
    createNewMemberCard () {
      console.log('createNewMemberCard')
    },
    timeDisplay,
    async loadMemberCardList () {
      this.memberCardList = await getSuperVipList()
      console.log(this.memberCardList, 'memberCardList')
    },
    async initPanel () {
      await this.loadMemberCardList()
      this.selectedCardId = null
      this.cardSearch = null
    },
    async selectMemberCard (user) {
      console.log('selectMemberCard', user)
      this.loadingDetailPage = true
      this.currentTab = 0
      if (this.selectedCardId === user.userId) {
        this.selectedCardId = null
      } else {
        this.selectedCardId = user.userId
      }
      console.log(user.userId, 'id')
      this.VipDetailInfo = user.userId
      this.loadingDetailPage = false
      console.log(this.VipDetailInfo, 'detailInfo')
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
    }
  },
  activated () {
    this.initPanel()
  },
  async mounted () {
    await this.initPanel()
  }
}
</script>

<style scoped>

</style>
