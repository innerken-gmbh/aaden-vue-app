<template>
  <div style="background: #f6f6f6;">
    <v-app-bar
        flat
        color="grey lighten-5"
        app
    >
      <restaurant-logo-display/>
    </v-app-bar>

    <div style="display: grid;grid-template-columns:400px 1fr;grid-gap: 1px">
      <div
          class="d-flex flex-column"
          style="height: calc(100vh - 64px)"
      >
        <v-sheet
            class="pa-6"
            color="white"
        >
          <div class="d-flex align-center">
            <div class="text-h4 font-weight-black">
              尊享会员
            </div>
            <v-spacer></v-spacer>
            <v-icon class="mr-1">mdi-gift-outline</v-icon>
          </div>
          <div class="d-flex align-center mt-4">
            <v-text-field
                outlined
                dense
                hide-details
                filled
                class="mr-2"
                placeholder="搜索"
                append-icon="mdi-magnify"
            ></v-text-field>
            <v-btn
                height="42"
                elevation="0"
                color="primary lighten-4 black--text"
            >
              <v-icon
                  color="black"
                  left
              >mdi-plus-circle-outline
              </v-icon>
              新增
            </v-btn>
          </div>
        </v-sheet>
        <div
            style="overflow-y: scroll"
            class="flex-grow-1"
        >
          <v-sheet
              class="pa-6"
              color="grey lighten-5"
              v-for="i in 6"
              :key="i"
          >
            <div class="d-flex align-center text-body-1">
              <div class="font-weight-bold">
                李小波 23岁
              </div>
              <v-spacer></v-spacer>
              <div>{{ 123 | priceDisplay }}</div>
            </div>
            <div class="text-body-2 text--secondary mt-2">10478457</div>
          </v-sheet>
        </div>

      </div>
      <div>
        <template v-if="false">
          <div
              class="pa-6 d-flex flex-column"
              style="height: 100%"
          >
            <div class="text-h4 font-weight-bold">
              扫描会员卡或在左侧选择一位会员
            </div>
            <div class="text-body-1 mt-2">
              在这里您可以查看会员的消费记录，更新会员的信息，或是为会员充值
            </div>
            <div class="flex-grow-1 d-flex align-center justify-center">
              <lottie-animation
                  :animationData="require('@/assets/card.json')"
                  style="height: 200px"
                  :loop="true"
                  :autoPlay="true"
              ></lottie-animation>
            </div>
          </div>
        </template>
        <template v-else>

        </template>

      </div>
    </div>
  </div>

</template>

<script>
import LottieAnimation from 'lottie-web-vue'
import { checkOneMemberCard, loadMemberCard } from '@/api/api'
import { fastSweetAlertRequest } from '@/oldjs/common'
import i18n from '@/i18n'
import RestaurantLogoDisplay from '@/components/RestaurantLogoDisplay.vue'

export default {
  name: 'MemberCardPage',
  components: {
    RestaurantLogoDisplay,
    LottieAnimation
  },
  data: function () {
    return {
      memberCardList: [],
      selectedCardId: null,
      cardSearch: null,
      selectedCard: null
    }
  },
  methods: {
    trySelectCurrentCard () {
      if (this.memberCardList.some(c => c.longId === this.cardSearch)) {
        this.selectedCardId = this.cardSearch
      }
    },
    async loadMemberCardList () {
      this.memberCardList = await loadMemberCard()
    },
    initPanel () {
      this.loadMemberCardList()
      this.selectedCardId = null
      this.cardSearch = null
      this.selectedCard = null
    },
    async renameMemberCard (oldName) {
      this.realShow = false
      await fastSweetAlertRequest(i18n.t('ScanNewCard'), 'password',
        'MemberCard.php?op=renameMemberCard', 'new',
        { old: oldName }, 'POST')
      this.realShow = true
    }
  },
  watch: {
    memberCardDialogShow (val) {
      if (val) {
        this.initPanel()
      }
    },
    async selectedCardId (val) {
      if (val) {
        this.selectedCard = await checkOneMemberCard(val)
      }
    }
  },
  mounted () {
    this.initPanel()
  },
  computed: {
    filteredMemberCardList () {
      if (this.cardSearch) {
        return this.memberCardList.filter(c => c.longId.toLowerCase().includes(this.cardSearch.toLowerCase()) || c.note.toLowerCase().includes(this.cardSearch.toLowerCase()))
      } else {
        return this.memberCardList
      }
    },
    realShow: {
      get: function () {
        return this.memberCardDialogShow
      },
      set: function (val) {
        this.$emit('visibility-changed', val)
      }
    }
  }
}
</script>

<style scoped>

</style>
