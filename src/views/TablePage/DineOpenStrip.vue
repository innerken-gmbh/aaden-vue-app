<template>
  <!-- 客人在这一桌扫码请求开桌、还没确认（POS-883）：不弹框打断加菜，单页顶上一条确认 / 拒绝 -->
  <div
      v-if="request"
      class="dineOpenStrip"
  >
    <v-icon
        class="mr-2"
        color="white"
        small
    >mdi-qrcode-scan
    </v-icon>
    <div class="text-body-2 text-truncate mr-3">
      <span class="font-weight-bold">{{ $t('DineOpenBadgeOpenTable') }}</span>
      · {{ text }}
    </div>
    <v-btn
        class="mr-1"
        color="white"
        outlined
        small
        @click="REJECT_DINE_REQUEST(request)"
    >{{ $t('DineOpenReject') }}
    </v-btn>
    <v-btn
        class="teal--text text--darken-2"
        color="white"
        depressed
        small
        @click="OPEN_DINE_REQUEST(request)"
    >{{ $t('DineOpenConfirmShort') }}
    </v-btn>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { findConsumeTypeById } from '@/oldjs/common'

/** 单页顶上的扫码请求条（POS-883）：没开、已开的桌都显示，确认和拒绝交给 DineOpenRequestDialog */
export default {
  name: 'DineOpenStrip',
  props: {
    tableName: { type: String, default: null }
  },
  computed: {
    ...mapGetters(['dineOpenVisible']),
    request () {
      return this.tableName ? this.dineOpenVisible.find(r => r.tableName === this.tableName) ?? null : null
    },
    /** 几位 · 自助（类型名）或单点 · 几轮等着送 */
    text () {
      const r = this.request
      if (!r) return ''
      const people = r.children > 0
        ? this.$t('DineOpenPartyWithChildren', { adults: r.adults, children: r.children })
        : this.$t('DineOpenParty', { adults: r.adults })
      const mode = r.mode === 'BUFFET'
        ? [this.$t('DineOpenModeBuffet'), r.consumeTypeId ? findConsumeTypeById(r.consumeTypeId).name : ''].filter(Boolean).join(' · ')
        : this.$t('DineOpenModeAlaCarte')
      return [people, mode, r.queuedRounds > 0 ? this.$t('DineOpenQueuedShort', { count: r.queuedRounds }) : null].filter(Boolean).join(' · ')
    }
  },
  methods: {
    ...mapMutations(['OPEN_DINE_REQUEST', 'REJECT_DINE_REQUEST'])
  }
}
</script>

<style scoped>
.dineOpenStrip {
  display: flex;
  align-items: center;
  max-width: 520px;
  margin-right: 16px;
  padding: 4px 8px 4px 12px;
  border-radius: 20px;
  background: #00897b;
  color: white;
}
</style>
