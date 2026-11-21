<template>
  <div>
    <!-- 待开桌列表（顶栏「待开桌 N」点开） -->
    <v-dialog
        :value="dineOpenListShow"
        max-width="460px"
        @input="SHOW_DINE_OPEN_LIST($event)"
    >
      <v-card
          class="pa-4"
          rounded="lg"
      >
        <div class="text-h6 font-weight-black mb-3">{{ $t('DineOpenRequests') }}</div>
        <div
            v-if="dineOpenRequests.length === 0"
            class="text-body-2 grey--text py-6 text-center"
        >{{ $t('DineOpenEmpty') }}
        </div>
        <v-card
            v-for="r in dineOpenRequests"
            :key="r.sessionId"
            :class="r.rejectedAt ? 'grey lighten-3 grey--text' : 'amber lighten-5'"
            class="pa-3 mb-2 d-flex align-center"
            flat
            @click="OPEN_DINE_REQUEST(r)"
        >
          <div class="text-h6 font-weight-black mr-4">{{ r.tableName }}</div>
          <div class="flex-grow-1">
            <div class="text-body-2">{{ partyText(r) }}</div>
            <div class="text-caption grey--text">
              {{ $t('DineOpenWaitingMinutes', { minutes: waitedMinutes(r) }) }}
              <template v-if="r.queuedRounds > 0"> · {{ $t('DineOpenQueuedShort', { count: r.queuedRounds }) }}</template>
              <template v-if="r.claimedBy"> · {{ $t('DineOpenClaimedBy', { name: r.claimedBy }) }}</template>
              <template v-if="r.rejectedAt"> · {{ $t('DineOpenWasRejected') }}</template>
            </div>
          </div>
          <v-icon>mdi-chevron-right</v-icon>
        </v-card>
      </v-card>
    </v-dialog>

    <!-- 确认开桌：可改人数、单点 / 自助、自助类型，或拒绝。
         拿到服务员密码以后才显示：开着「使用跑堂密码」时先弹密码框，确认框要是先出来会盖住密码键盘，密码输不进去 -->
    <v-dialog
        :value="!!dineOpenTarget && pw != null"
        max-width="520px"
        persistent
    >
      <v-card
          v-if="dineOpenTarget"
          class="pa-4"
          rounded="lg"
      >
        <div class="d-flex align-center mb-2">
          <div class="text-h5 font-weight-black">{{ dineOpenTarget.tableName }}</div>
          <v-spacer/>
          <v-btn
              :disabled="busy"
              icon
              @click="close"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="text-body-2 grey--text mb-4">{{ $t('DineOpenGuestAsked', { party: partyText(dineOpenTarget) }) }}</div>

        <div
            v-if="loading"
            class="py-8 d-flex justify-center"
        >
          <v-progress-circular indeterminate/>
        </div>
        <template v-else-if="detail">
          <!-- 有自助许可、现在也有能开的自助类型时才能选自助；没有时只能单点（和服务员确认网页一样） -->
          <template v-if="detail.buffetLicensed && buffetTypes.length > 0">
            <div class="text-subtitle-2 mb-1">{{ $t('DineOpenMode') }}</div>
            <v-btn-toggle
                v-model="form.mode"
                class="mb-3"
                color="primary"
                mandatory
            >
              <v-btn value="A_LA_CARTE">{{ $t('DineOpenModeAlaCarte') }}</v-btn>
              <v-btn value="BUFFET">{{ $t('DineOpenModeBuffet') }}</v-btn>
            </v-btn-toggle>
            <template v-if="form.mode === 'BUFFET'">
              <div class="text-subtitle-2 mb-1">{{ $t('DineOpenBuffetType') }}</div>
              <div style="display: grid;grid-template-columns: repeat(2,minmax(0,1fr));grid-gap: 8px" class="mb-3">
                <v-card
                    v-for="t in buffetTypes"
                    :key="t.id"
                    :class="form.consumeTypeId === t.id ? 'primary white--text' : 'grey lighten-4'"
                    class="pa-3 text-center"
                    flat
                    @click="form.consumeTypeId = t.id"
                >
                  {{ t.name }}
                </v-card>
              </div>
            </template>
          </template>

          <div style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 16px" class="mb-3">
            <div>
              <div class="text-subtitle-2 mb-1">{{ $t('DineOpenAdults') }}</div>
              <div class="d-flex align-center">
                <v-btn icon outlined @click="form.adults = Math.max(0, form.adults - 1)"><v-icon>mdi-minus</v-icon></v-btn>
                <div class="text-h6 mx-4">{{ form.adults }}</div>
                <v-btn icon outlined @click="form.adults++"><v-icon>mdi-plus</v-icon></v-btn>
              </div>
            </div>
            <div>
              <div class="text-subtitle-2 mb-1">{{ $t('DineOpenChildren') }}</div>
              <div class="d-flex align-center">
                <v-btn icon outlined @click="form.children = Math.max(0, form.children - 1)"><v-icon>mdi-minus</v-icon></v-btn>
                <div class="text-h6 mx-4">{{ form.children }}</div>
                <v-btn icon outlined @click="form.children++"><v-icon>mdi-plus</v-icon></v-btn>
              </div>
            </div>
          </div>

          <div
              v-if="detail.queued && detail.queued.length"
              class="text-body-2 mb-3"
          >{{ $t('DineOpenQueued', { count: detail.queued.length }) }}
          </div>
        </template>

        <div
            v-if="error"
            class="error--text text-body-2 mb-3"
        >{{ error }}
        </div>

        <div class="d-flex">
          <v-btn
              :disabled="busy || loading"
              color="error"
              outlined
              @click="reject"
          >{{ $t('DineOpenReject') }}
          </v-btn>
          <v-spacer/>
          <v-btn
              :disabled="busy || loading || !canOpen"
              :loading="busy"
              color="primary"
              depressed
              @click="open"
          >{{ $t('DineOpenConfirm') }}
          </v-btn>
        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { addToQueue } from '@/oldjs/poolJobs'
import { popAuthorize, showConfirmAsyn, toast } from '@/oldjs/common'
import {
  claimDineOpenRequest,
  confirmDineOpenRequest,
  dineOpenErrorOf,
  loadDineOpenRequests,
  rejectDineOpenRequest
} from '@/api/dineOpenRequests'

/**
 * 扫码点餐 / 堂食版的待开桌（POS-275）。挂在 App 上：
 * - 每秒的任务队列里按云端给的 nextPollSeconds 拉列表（有堂食的店 3 秒，没有的 5 分钟），有新请求时响一声；
 * - 确认框：打开时用服务员密码占住这一桌（客人页显示谁在确认），确认开桌或拒绝。
 * 服务员密码按这台收银机的规矩取（popAuthorize：关了「用密码」就是默认服务员，开着就弹 PIN）。
 */
export default {
  name: 'DineOpenRequestDialog',
  data: () => ({
    nextPollAt: 0,
    polling: false,
    audio: null,
    seen: new Set(),
    pw: null,
    detail: null,
    loading: false,
    busy: false,
    // 每打开一次确认框加一：关掉再开别的桌时，上一桌迟到的结果不写进来
    seq: 0,
    error: '',
    form: { mode: 'A_LA_CARTE', consumeTypeId: null, adults: 1, children: 0 }
  }),
  computed: {
    ...mapState(['dineOpenRequests', 'dineOpenTarget', 'dineOpenListShow']),
    buffetTypes () {
      return [...(this.detail?.candidates ?? []), ...(this.detail?.alternatives ?? [])]
    },
    canOpen () {
      if (!this.detail) return false
      if (this.form.adults + this.form.children < 1) return false
      return this.form.mode !== 'BUFFET' || !!this.form.consumeTypeId
    }
  },
  watch: {
    dineOpenTarget (target) {
      if (target) this.start(target)
    }
  },
  mounted () {
    addToQueue('dineOpenRequests', () => this.poll())
  },
  methods: {
    ...mapMutations(['SET_DINE_OPEN_REQUESTS', 'OPEN_DINE_REQUEST', 'CLOSE_DINE_REQUEST', 'SHOW_DINE_OPEN_LIST']),
    async poll () {
      if (this.polling || Date.now() < this.nextPollAt) return
      this.polling = true
      try {
        const res = await loadDineOpenRequests()
        const list = res?.requests ?? []
        // 只为新的、没被拒绝过的请求响一声；被拒绝过的桌客人再点一轮时会重新算新的
        const active = list.filter(r => !r.rejectedAt)
        if (active.some(r => !this.seen.has(r.sessionId))) this.beep()
        this.seen = new Set(active.map(r => r.sessionId))
        this.SET_DINE_OPEN_REQUESTS(list)
        this.nextPollAt = Date.now() + (res?.nextPollSeconds ?? 30) * 1000
      } catch (e) {
        // 拿不到设备号或云端连不上：一分钟后再试，不打扰收银。
        // 清掉旧列表：不然断网时点有角标的桌还会被拦到确认框里，进不了桌
        this.SET_DINE_OPEN_REQUESTS([])
        this.nextPollAt = Date.now() + 60 * 1000
      } finally {
        this.polling = false
      }
    },
    beep () {
      try {
        // 一直用同一个 AudioContext：每次新建不关，长时间开着会撞上浏览器的数量上限
        if (!this.audio) this.audio = new (window.AudioContext || window.webkitAudioContext)()
        const ctx = this.audio
        const osc = ctx.createOscillator()
        osc.frequency.value = 880
        osc.connect(ctx.destination)
        osc.start()
        osc.stop(ctx.currentTime + 0.25)
      } catch (e) {
      }
    },
    lang () {
      return (this.$i18n.locale || 'de').slice(0, 2)
    },
    partyText (r) {
      const people = r.children > 0
        ? this.$t('DineOpenPartyWithChildren', { adults: r.adults, children: r.children })
        : this.$t('DineOpenParty', { adults: r.adults })
      const mode = r.mode === 'BUFFET' ? this.$t('DineOpenModeBuffet') : this.$t('DineOpenModeAlaCarte')
      return `${people} · ${mode}`
    },
    waitedMinutes (r) {
      return r.requestedAt ? Math.max(0, Math.floor((Date.now() - new Date(r.requestedAt).getTime()) / 60000)) : 0
    },
    async start (target) {
      const seq = ++this.seq
      // 确认框跟着 pw 显示：先清掉上一桌的，等这一桌的密码
      this.pw = null
      this.detail = null
      this.error = ''
      this.loading = true
      this.form = { mode: target.mode || 'A_LA_CARTE', consumeTypeId: target.consumeTypeId, adults: target.adults, children: target.children }
      try {
        const pw = await popAuthorize('')
        if (seq !== this.seq) return
        // 服务员没输 PIN 就点了外面：不占桌，直接关掉
        if (pw == null) {
          this.close()
          return
        }
        this.pw = pw
        const detail = await claimDineOpenRequest(target.sessionId, pw, this.lang())
        if (seq !== this.seq) return
        this.detail = detail
        const types = this.buffetTypes
        // 客人选的类型现在还能开就沿用；只有一种能开时默认选它；多种时让服务员自己选（和确认网页一样）
        const typeId = types.some(t => t.id === detail.consumeTypeId)
          ? detail.consumeTypeId
          : (detail.candidates?.length === 1 ? detail.candidates[0].id : null)
        this.form = {
          // 现在没有能开的自助类型（比如自助时段刚过）：只能单点，切换也不显示
          mode: types.length > 0 && detail.buffetLicensed ? (detail.mode || this.form.mode) : 'A_LA_CARTE',
          consumeTypeId: typeId,
          adults: detail.adults,
          children: detail.children
        }
      } catch (e) {
        if (seq === this.seq) this.error = this.describe(e)
      } finally {
        if (seq === this.seq) this.loading = false
      }
    },
    async open () {
      this.busy = true
      this.error = ''
      try {
        const res = await confirmDineOpenRequest(this.dineOpenTarget.sessionId, this.pw, {
          ...this.form,
          consumeTypeId: this.form.mode === 'BUFFET' ? this.form.consumeTypeId : null
        })
        toast(this.$t('DineOpenDone', { table: res.tableName ?? this.dineOpenTarget.tableName }), null, 'success')
        this.finish()
      } catch (e) {
        this.error = this.describe(e)
      } finally {
        this.busy = false
      }
    },
    async reject () {
      const answer = await showConfirmAsyn(this.$t('DineOpenRejectHint'), this.$t('DineOpenReject'))
      if (!answer?.value) return
      this.busy = true
      this.error = ''
      try {
        await rejectDineOpenRequest(this.dineOpenTarget.sessionId, this.pw, this.lang())
        toast(this.$t('DineOpenRejected', { table: this.dineOpenTarget.tableName }))
        this.finish()
      } catch (e) {
        this.error = this.describe(e)
      } finally {
        this.busy = false
      }
    },
    finish () {
      this.close()
      this.nextPollAt = 0
    },
    close () {
      this.seq++
      this.loading = false
      this.pw = null
      this.detail = null
      this.CLOSE_DINE_REQUEST()
    },
    describe (e) {
      const { code, info, params } = dineOpenErrorOf(e)
      // 锁住时云端带上还要等几分钟
      if (code === 'DINE_WAITER_LOCKED' && params?.minutes) return this.$t('DineOpenErrorLockedMinutes', { minutes: params.minutes })
      const known = {
        DINE_WAITER_PW_WRONG: 'DineOpenErrorPassword',
        DINE_WAITER_SIGN_IN: 'DineOpenErrorPassword',
        DINE_WAITER_LOCKED: 'DineOpenErrorLocked',
        DINE_TABLE_ALREADY_OPEN: 'DineOpenErrorAlreadyOpen',
        DINE_OPEN_CODE_EXPIRED: 'DineOpenErrorGone',
        DINE_SESSION_NOT_FOUND: 'DineOpenErrorGone',
        STORE_UNREACHABLE: 'DineOpenErrorStoreUnreachable',
        STORE_UNAVAILABLE: 'DineOpenErrorStoreUnreachable',
        CLOUD_UNREACHABLE: 'DineOpenErrorUnreachable',
        DINE_BUFFET_TYPE_UNAVAILABLE: 'DineOpenErrorBuffetUnavailable',
        DINE_OUTSIDE_SERVICE: 'DineOpenErrorBuffetUnavailable',
        DINE_BUFFET_NOT_LICENSED: 'DineOpenErrorBuffetUnavailable',
        DINE_TIER_MISMATCH: 'DineOpenErrorPeople',
        DINE_TIER_REQUIRED: 'DineOpenErrorPeople',
        DINE_PEOPLE_INVALID: 'DineOpenErrorPeople',
        DINE_OPEN_IN_PROGRESS: 'DineOpenErrorInProgress',
        DINE_SESSION_BUSY: 'DineOpenErrorInProgress',
        DINE_OPEN_UNCONFIRMED: 'DineOpenErrorInProgress',
        DINE_OPEN_REFUSED: 'DineOpenErrorRefused',
        DINE_BUFFET_TYPE_REQUIRED: 'DineOpenErrorBuffetType'
      }
      if (code === 'DINE_TABLE_ALREADY_OPEN' || code === 'DINE_SESSION_NOT_FOUND') this.nextPollAt = 0
      if (known[code]) return this.$t(known[code])
      // 云端的 message 是中文，不给店员看；只带上错误码方便排查
      return code ? `${this.$t('DineOpenErrorUnknown')} (${code})` : (info || this.$t('DineOpenErrorUnknown'))
    }
  }
}
</script>
