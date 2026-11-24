<template>
  <div>
    <!-- 请求列表（顶栏「待开桌 N」点开）：分「待开桌」和「已开桌 · 待确认」两组（POS-883） -->
    <v-dialog
        :value="dineOpenListShow"
        max-width="560px"
        scrollable
        @input="SHOW_DINE_OPEN_LIST($event)"
    >
      <v-card
          class="pa-4"
          rounded="lg"
      >
        <div class="text-h6 font-weight-black mb-3">{{ $t('DineOpenRequests') }}</div>
        <div style="max-height: 70vh;overflow-y: auto">
          <!-- 按确认改单后要在收银机上人工核对的（POS-901），醒目放最上面 -->
          <v-alert
              v-for="a in manualChecks"
              :key="'m' + a.sessionId + '-' + a.orderId"
              class="mb-2"
              dense
              text
              type="error"
          >
            <div class="font-weight-bold">{{ $t('DineOpenManualCheckTable', { table: a.tableName }) }}</div>
            <div class="text-body-2">{{ $t('DineOpenManualCheckHint') }}</div>
          </v-alert>
          <div
              v-for="a in pendingAdjustments"
              :key="'p' + a.sessionId + '-' + a.orderId"
              class="text-body-2 grey--text text--darken-1 mb-2 d-flex align-center"
          >
            <v-progress-circular
                class="mr-2"
                indeterminate
                size="14"
                width="2"
            />
            {{ $t('DineOpenAdjustPendingTable', { table: a.tableName }) }}
          </div>

          <div
              v-if="dineOpenVisible.length === 0"
              class="text-body-2 grey--text py-6 text-center"
          >{{ $t('DineOpenEmpty') }}
          </div>
          <template v-for="group in groups">
            <div
                v-if="group.list.length > 0"
                :key="group.key"
                class="mb-2"
            >
              <div class="text-subtitle-2 font-weight-bold mb-1">{{ $t(group.title) }} · {{ group.list.length }}</div>
              <v-card
                  v-for="r in group.list"
                  :key="r.sessionId"
                  :class="r.open ? 'teal lighten-5' : 'amber lighten-5'"
                  class="pa-3 mb-2 d-flex align-center"
                  flat
              >
                <div class="text-h6 font-weight-black mr-4">{{ r.tableName }}</div>
                <div class="flex-grow-1">
                  <div class="text-body-2">{{ partyText(r) }}</div>
                  <div class="text-caption grey--text text--darken-1">{{ waitText(r) }}</div>
                </div>
                <v-btn
                    class="ml-2"
                    color="error"
                    outlined
                    small
                    @click="REJECT_DINE_REQUEST(r)"
                >{{ $t('DineOpenReject') }}
                </v-btn>
                <v-btn
                    class="ml-2"
                    color="primary"
                    depressed
                    small
                    @click="OPEN_DINE_REQUEST(r)"
                >{{ $t('DineOpenConfirmShort') }}
                </v-btn>
              </v-card>
            </div>
          </template>
        </div>
      </v-card>
    </v-dialog>

    <!-- 点了没开、挂着请求的桌：三选一（POS-883） -->
    <v-dialog
        :value="!!dineOpenChoice"
        max-width="420px"
        @input="!$event && SHOW_DINE_OPEN_CHOICE(null)"
    >
      <v-card
          v-if="dineOpenChoice"
          class="pa-4"
          rounded="lg"
      >
        <div class="d-flex align-center mb-1">
          <div class="text-h5 font-weight-black">{{ dineOpenChoice.tableName }}</div>
          <v-spacer/>
          <v-btn
              icon
              @click="SHOW_DINE_OPEN_CHOICE(null)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        <div class="text-body-2">{{ $t('DineOpenGuestAsked', { party: partyText(dineOpenChoice) }) }}</div>
        <div class="text-caption grey--text text--darken-1 mb-4">{{ waitText(dineOpenChoice) }}</div>
        <v-btn
            block
            class="mb-2"
            color="primary"
            depressed
            large
            @click="OPEN_DINE_REQUEST(dineOpenChoice)"
        >{{ $t('DineOpenChoiceConfirm') }}
        </v-btn>
        <v-btn
            block
            class="mb-1"
            large
            outlined
            @click="openOnly(dineOpenChoice)"
        >{{ $t('DineOpenChoiceOpenOnly') }}
        </v-btn>
        <div class="text-caption grey--text text-center mb-3">{{ $t('DineOpenChoiceOpenOnlyHint') }}</div>
        <v-btn
            block
            color="error"
            large
            text
            @click="REJECT_DINE_REQUEST(dineOpenChoice)"
        >{{ $t('DineOpenReject') }}
        </v-btn>
      </v-card>
    </v-dialog>

    <!-- 确认：可改人数、单点 / 自助、自助类型，或拒绝；确认后在这里写结果。
         拿到服务员密码以后才显示：开着「使用跑堂密码」时先弹密码框，确认框要是先出来会盖住密码键盘，密码输不进去（#80） -->
    <v-dialog
        :value="!!dineOpenTarget && pw != null"
        max-width="560px"
        persistent
        scrollable
    >
      <v-card
          v-if="dineOpenTarget"
          class="pa-4"
          rounded="lg"
      >
        <div class="d-flex align-center mb-2">
          <div class="text-h5 font-weight-black">{{ dineOpenTarget.tableName }}</div>
          <v-chip
              v-if="tableOpen"
              class="ml-3"
              color="teal"
              small
              text-color="white"
          >{{ $t('DineOpenTableOpenChip') }}
          </v-chip>
          <v-spacer/>
          <v-btn
              :disabled="busy"
              icon
              @click="result ? finish() : close()"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>

        <!-- 确认结果（POS-902 / POS-901） -->
        <template v-if="result">
          <div class="text-h6 font-weight-bold mb-1">
            <v-icon
                class="mr-1"
                color="success"
            >mdi-check-circle
            </v-icon>
            {{ $t(result.alreadyOpen ? 'DineOpenJoined' : 'DineOpenDone', { table: result.tableName || dineOpenTarget.tableName }) }}
          </div>
          <div
              v-if="resultPeople > 0"
              class="text-body-1 mb-2"
          >{{ [resultTypeName, $t('DineOpenParty', { adults: resultPeople })].filter(Boolean).join(' · ') }}
          </div>
          <div
              v-for="(line, i) in resultLines"
              :key="i"
              class="text-body-2 mb-1"
          >{{ line }}
          </div>
          <v-alert
              v-if="shownAdjust.status === 'PENDING'"
              class="mt-3 mb-0"
              dense
              text
              type="info"
          >
            <div class="font-weight-bold">{{ $t('DineOpenAdjustPending') }}</div>
            <div class="text-body-2">{{ $t('DineOpenAdjustPendingHint') }}</div>
          </v-alert>
          <v-alert
              v-if="shownAdjust.manualCheck"
              class="mt-3 mb-0"
              prominent
              type="error"
          >
            <div class="font-weight-bold">{{ $t('DineOpenManualCheck') }}</div>
            <div class="text-body-2">{{ $t('DineOpenManualCheckHint') }}</div>
          </v-alert>
          <div class="d-flex mt-4">
            <v-spacer/>
            <v-btn
                color="primary"
                depressed
                @click="finish"
            >{{ $t('DineOpenGotIt') }}
            </v-btn>
          </div>
        </template>

        <template v-else>
          <div
              v-if="loading"
              class="py-8 d-flex justify-center"
          >
            <v-progress-circular indeterminate/>
          </div>
          <template v-else-if="detail">
            <div class="text-body-2 grey--text text--darken-1 mb-3">{{ $t('DineOpenGuestAsked', { party: partyText(guestChoice) }) }}</div>

            <!-- 收银机已经开了这一桌（POS-897）：门店现在的样子，和能不能在这里改 -->
            <v-alert
                v-if="tableOpen"
                :type="editable ? 'info' : 'warning'"
                class="mb-3"
                dense
                text
            >
              <div class="font-weight-bold">{{ $t('DineOpenTableOpenTitle') }}
                <template v-if="tableNow"> · {{ tableNow }}</template>
              </div>
              <div class="text-body-2">{{ $t(tableOpenHint) }}</div>
            </v-alert>
            <!-- 这张单上一次按确认改单还在处理、或者要人工核对（POS-901） -->
            <v-alert
                v-if="tableOpen && detail.adjust"
                :type="detail.adjust.manualCheck ? 'error' : 'info'"
                class="mb-3"
                dense
                text
            >
              <div class="font-weight-bold">{{ $t(detail.adjust.status === 'PENDING' ? 'DineOpenEarlierAdjustPending' : 'DineOpenManualCheck') }}</div>
              <div
                  v-if="detail.adjust.manualCheck"
                  class="text-body-2"
              >{{ $t('DineOpenManualCheckHint') }}
              </div>
            </v-alert>

            <!-- 有自助许可、现在也有能开的自助类型时才能选自助；没有时只能单点（和服务员确认网页一样） -->
            <template v-if="editable && hasBuffet && !typeLocked">
              <div class="text-subtitle-2 mb-1">{{ $t('DineOpenMode') }}</div>
              <v-btn-toggle
                  :value="form.mode"
                  class="mb-1"
                  color="primary"
                  mandatory
                  @change="setMode"
              >
                <v-btn value="A_LA_CARTE">{{ $t('DineOpenModeAlaCarte') }}</v-btn>
                <v-btn value="BUFFET">{{ $t('DineOpenModeBuffet') }}</v-btn>
              </v-btn-toggle>
              <div
                  v-if="guestChoice.mode && guestChoice.mode !== form.mode"
                  class="text-caption grey--text text--darken-1 mb-2"
              >{{ $t(guestChoice.mode === 'BUFFET' ? 'DineOpenGuestBuffet' : 'DineOpenGuestAlaCarte') }}
              </div>
              <template v-if="form.mode === 'BUFFET'">
                <div class="text-subtitle-2 mb-1 mt-2">{{ $t('DineOpenBuffetType') }}</div>
                <div
                    v-if="detail.reason"
                    class="text-caption grey--text text--darken-1 mb-1"
                >{{ $t('DineOpenHolidayPrice', { name: detail.reason }) }}
                </div>
                <div
                    class="mb-1"
                    style="display: grid;grid-template-columns: repeat(2,minmax(0,1fr));grid-gap: 8px"
                >
                  <v-card
                      v-for="t in buffetTypes"
                      :key="t.id"
                      :class="form.consumeTypeId === t.id ? 'primary white--text' : 'grey lighten-4'"
                      class="pa-3 text-center"
                      flat
                      @click="setType(t.id)"
                  >
                    {{ t.name }}
                  </v-card>
                </div>
                <div
                    v-if="guestType && guestType.id !== form.consumeTypeId"
                    class="text-caption grey--text text--darken-1 mb-2"
                >{{ $t('DineOpenGuestType', { name: guestType.name }) }}
                </div>
              </template>
            </template>
            <!-- 门店不能改单、有人在线上付款，或这桌已经点过菜：类型只读，请先在收银机上改（POS-901） -->
            <v-alert
                v-if="typeLocked"
                class="mb-3"
                dense
                outlined
                type="warning"
            >
              <div class="font-weight-bold">{{ lockedTypeText }}</div>
              <div class="text-body-2">{{ $t('DineOpenTypeLocked') }}</div>
            </v-alert>

            <div
                v-if="editable"
                class="mb-3 mt-2"
                style="display: grid;grid-template-columns: 1fr 1fr;grid-gap: 16px"
            >
              <div>
                <div class="text-subtitle-2 mb-1">{{ $t('DineOpenAdults') }}</div>
                <div class="d-flex align-center">
                  <v-btn
                      icon
                      outlined
                      @click="setParty('adults', form.adults - 1)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <div class="text-h6 mx-4">{{ form.adults }}</div>
                  <v-btn
                      icon
                      outlined
                      @click="setParty('adults', form.adults + 1)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
              <!-- 选的自助类型没有儿童价档：不填儿童，和确认网页一样 -->
              <div v-if="hasChildTier">
                <div class="text-subtitle-2 mb-1">{{ $t('DineOpenChildren') }}</div>
                <div class="d-flex align-center">
                  <v-btn
                      icon
                      outlined
                      @click="setParty('children', form.children - 1)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                  <div class="text-h6 mx-4">{{ form.children }}</div>
                  <v-btn
                      icon
                      outlined
                      @click="setParty('children', form.children + 1)"
                  >
                    <v-icon>mdi-plus</v-icon>
                  </v-btn>
                </div>
              </div>
            </div>

            <!-- 送单会整批拒（锅底不止一份等）：说清这一轮会整批退回，和送单结果一样（POS-1039） -->
            <v-alert
                v-if="queuedRefusal"
                class="mb-3"
                dense
                text
                type="warning"
            >{{ $t(queuedRefusalKey) }}
            </v-alert>
            <!-- 等着的一轮按确认的人数算额度，超出的退回客人购物车（POS-897 / POS-902） -->
            <v-alert
                v-if="queuedOutcome"
                class="mb-3"
                dense
                text
                type="warning"
            >{{ $t('DineOpenOverQuota', { people: partyCount, send: queuedOutcome.send, back: queuedOutcome.back }) }}
            </v-alert>
            <v-alert
                v-if="editable && hasBuffet && form.mode !== 'BUFFET' && queuedLines.length > 0"
                class="mb-3"
                dense
                text
                type="warning"
            >{{ $t('DineOpenAllAlaCarte') }}
            </v-alert>

            <div
                v-if="detail.queued && detail.queued.length"
                class="mb-3"
            >
              <div class="text-body-2 font-weight-bold">
                {{ $t(tableOpen ? 'DineOpenQueuedOpenTable' : 'DineOpenQueued', { count: detail.queued.length }) }}
              </div>
              <div class="text-caption grey--text text--darken-1">{{ queuedLines.map(l => l.qty + '× ' + l.name).join(' · ') }}</div>
            </div>
          </template>

          <div
              v-if="error"
              class="error--text text-body-2 mb-3"
          >{{ error }}
          </div>
          <!-- 确认结果未知（超时、断网）：自动重拉列表后写这一桌的真实状态，不让服务员手工补录（POS-1064） -->
          <div
              v-if="recheckState"
              class="d-flex align-center text-body-2 mb-3"
          >
            <v-progress-circular
                v-if="recheckState === 'checking'"
                class="mr-2"
                indeterminate
                size="16"
                width="2"
            />
            <span>{{ $t('DineOpenRecheck_' + recheckState) }}</span>
            <v-spacer/>
            <v-btn
                v-if="recheckState !== 'checking'"
                small
                text
                @click="recheck()"
            >{{ $t('DineOpenRecheckAgain') }}
            </v-btn>
          </div>

          <div class="d-flex">
            <v-btn
                :disabled="busy || loading"
                color="error"
                outlined
                @click="REJECT_DINE_REQUEST(dineOpenTarget)"
            >{{ $t('DineOpenReject') }}
            </v-btn>
            <v-spacer/>
            <v-btn
                :disabled="busy || loading || !canOpen"
                :loading="busy"
                color="primary"
                depressed
                @click="open"
            >{{ $t(tableOpen ? 'DineOpenConfirmShort' : 'DineOpenConfirm') }}
            </v-btn>
          </div>
        </template>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex'
import { addToQueue } from '@/oldjs/poolJobs'
import { findConsumeTypeById, openOrEnterTable, popAuthorize, showConfirmAsyn, toast } from '@/oldjs/common'
import {
  claimDineOpenRequest,
  confirmDineOpenRequest,
  createDinePollReporter,
  dineOpenErrorOf,
  dineOpenOutcomeUnknown,
  dineRequestMinutesLeft,
  dineRequestWaitedMinutes,
  loadDineOpenRequests,
  rejectDineOpenRequest,
  releaseDineOpenRequest
} from '@/api/dineOpenRequests'

/** 改单没改成的原因（POS-901），每个有一句文案；不认识的按「收银机没有接受」写，和确认网页一样 */
const KNOWN_REASONS = ['STORE_CANNOT_ADJUST', 'PAYMENT_IN_PROGRESS', 'ORDER_HAS_DISHES', 'NEED_BOSS', 'NO_PERMISSION', 'ORDER_PAID',
  'ORDER_DOWN_PAYMENT', 'ORDER_SPLIT', 'STORE_UNREACHABLE', 'STORE_REFUSED', 'TYPE_UNKNOWN', 'ADJUST_PENDING', 'ORDER_MISMATCH',
  'TILL_CHANGED', 'TABLE_UNAVAILABLE']

/** 这些错误说明请求已经没了：列表里马上去掉 */
const GONE_CODES = ['DINE_SESSION_NOT_FOUND', 'DINE_OPEN_CODE_EXPIRED', 'DINE_SESSION_CLOSED', 'DINE_OPEN_NOT_REQUESTED', 'DINE_REQUEST_ORDER_ENDED']

/**
 * 扫码点餐 / 堂食版的开桌请求（POS-275，POS-883 跟云端 POS-897 / 899 / 901 / 902 对齐）。挂在 App 上：
 * - 每秒的任务队列里按云端给的 nextPollSeconds 拉列表（有堂食的店 3 秒，没有的 5 分钟），带 openTables=1，已开桌上挂着的请求也要；
 *   有新请求时响一声，按会话算，桌开了（请求从「待开桌」挪到「已开桌」）不再响；
 * - 列表分「待开桌」和「已开桌 · 待确认」两组；点没开、挂着请求的桌弹三选一；
 * - 确认框：打开时用服务员密码占住这一桌（带 adjust，已开的桌云端现读门店），确认开桌或拒绝，确认后在框里写结果。
 * 服务员密码按这台收银机的规矩取（popAuthorize：关了「用密码」就是默认服务员，开着就弹 PIN）。
 */
export default {
  name: 'DineOpenRequestDialog',
  data: () => ({
    nextPollAt: 0,
    // 正在拉列表时是那一次的 Promise：确认结果未知时要等它拉完再拉一次新的
    polling: null,
    audio: null,
    seen: new Set(),
    pw: null,
    detail: null,
    result: null,
    // 门店还在处理的改单在列表 adjustments 里见过：消失了就是处理完了（没要人工核对）
    adjustSeen: false,
    loading: false,
    busy: false,
    // 每打开一次确认框加一：关掉再开别的桌时，上一桌迟到的结果不写进来
    seq: 0,
    error: '',
    // 确认结果未知（超时、断网）后重拉列表看到的这一桌：checking / waiting / tableOpen / gone / failed（POS-1064）
    recheckState: null,
    form: { mode: 'A_LA_CARTE', consumeTypeId: null, adults: 1, children: 0 },
    // 服务员动过哪几项：已开的桌只传动过的（POS-901），没动的云端沿用门店现在的，不把收银机刚改的又改回去
    touched: { mode: false, type: false, party: false }
  }),
  computed: {
    ...mapState(['dineOpenRequests', 'dineOpenTarget', 'dineOpenListShow', 'dineOpenChoice', 'dineOpenRejectTarget', 'dineOpenAdjustments', 'dineOpenNow']),
    ...mapGetters(['dineOpenVisible']),
    groups () {
      return [
        { key: 'closed', title: 'DineOpenGroupNotOpen', list: this.dineOpenVisible.filter(r => !r.open) },
        { key: 'open', title: 'DineOpenGroupOpen', list: this.dineOpenVisible.filter(r => r.open) }
      ]
    },
    manualChecks () {
      return this.dineOpenAdjustments.filter(a => a.manualCheck)
    },
    pendingAdjustments () {
      return this.dineOpenAdjustments.filter(a => !a.manualCheck && a.status === 'PENDING')
    },
    tableOpen () {
      return !!this.detail?.tableOpen || this.justOpened
    },
    /**
     * 收银机上刚开了这一桌（「只开桌」后马上在单页顶条上点确认），云端还没看到：claim 按没开的桌回，
     * 但确认时云端会并进已开的单、不管这里填的人数和类型。按已开、只读处理，要改请在收银机上改或者稍后重开确认框
     */
    justOpened () {
      return !!this.detail && !this.detail.tableOpen && !!this.dineOpenTarget?.open
    },
    /** 已开的桌上按确认改门店单：门店能改、没人在线上付款（和确认网页一样） */
    adjusting () {
      return this.tableOpen && !!this.detail?.canAdjust && !this.detail?.tablePaying
    },
    editable () {
      return !this.tableOpen || this.adjusting
    },
    /** 这桌已经点过菜：类型只能在收银机上改，人数照样能改 */
    typeLocked () {
      return this.adjusting && !!this.detail?.tableHasDishes
    },
    storeBuffet () {
      return this.adjusting && this.detail?.tableMode === 'BUFFET'
    },
    buffetTypes () {
      const types = [...(this.detail?.candidates ?? []), ...(this.detail?.alternatives ?? [])]
      // 门店现在的类型不在能开的里（比如过了时段）：也列出来，默认就是它
      const store = this.storeBuffet ? this.detail?.tableType : null
      return store && !types.some(t => t.id === store.id) ? [...types, store] : types
    },
    hasBuffet () {
      return !!this.detail?.buffetLicensed && this.buffetTypes.length > 0
    },
    guestChoice () {
      const d = this.detail ?? this.dineOpenTarget ?? {}
      return { mode: d.mode, consumeTypeId: d.consumeTypeId, adults: d.adults ?? 0, children: d.children ?? 0 }
    },
    guestType () {
      return this.buffetTypes.find(t => t.id === this.guestChoice.consumeTypeId) ?? null
    },
    pickedType () {
      return this.form.mode === 'BUFFET' ? this.buffetTypes.find(t => t.id === this.form.consumeTypeId) ?? null : null
    },
    /** 收银机上这桌现在的样子：类型 · 几位 */
    tableNow () {
      const d = this.detail
      if (!d) return ''
      const people = d.tableAdults != null ? d.tableAdults + (d.tableChildren ?? 0) : d.tablePeople
      return [d.tableTypeName || (d.tableMode === 'A_LA_CARTE' ? this.$t('DineOpenModeAlaCarte') : null),
        people ? this.$t('DineOpenParty', { adults: people }) : null].filter(Boolean).join(' · ')
    },
    tableOpenHint () {
      if (this.justOpened) return 'DineOpenTableJustOpenedHint'
      if (this.adjusting) return 'DineOpenTableOpenAdjustHint'
      if (this.detail?.tablePaying) return 'DineOpenTableOpenPayingHint'
      return 'DineOpenTableOpenReadOnlyHint'
    },
    lockedTypeText () {
      const d = this.detail
      return d?.tableMode === 'BUFFET' ? (d.tableType?.name || d.tableTypeName || this.$t('DineOpenModeBuffet')) : this.$t('DineOpenModeAlaCarte')
    },
    queuedLines () {
      return (this.detail?.queued ?? []).flatMap(r => r.lines ?? [])
    },
    /** 选的自助类型有没有儿童价档；没有档位的（常见的是火锅）和单点都能填儿童 */
    hasChildTier () {
      const t = this.pickedType
      return !t || !t.tiers?.length || t.tiers.some(x => !x.isForAdult)
    },
    /** 实际确认的儿童数：没有儿童档时算 0 */
    partyChildren () {
      return this.hasChildTier ? this.form.children : 0
    },
    partyCount () {
      return this.form.adults + this.partyChildren
    },
    freePerRound () {
      const t = this.pickedType
      return t ? (t.perAdult ?? 0) * this.form.adults + (t.perChild ?? 0) * this.partyChildren : 0
    },
    /** 等着的一轮送单时会整批拒的原因（云端 queuedRefusal，和送单同一条规则）；有它时不看额度 */
    queuedRefusal () {
      return this.editable ? (this.pickedType?.queuedRefusal ?? null) : null
    },
    queuedRefusalKey () {
      const known = ['DINE_HOTPOT_ONE_ONLY', 'DINE_HOTPOT_INCOMPLETE']
      return 'DineOpenQueuedRefused_' + (known.includes(this.queuedRefusal) ? this.queuedRefusal : 'OTHER')
    },
    /**
     * 等着的一轮按确认人数的每轮上限送几道、退几道（POS-1039）：云端和送单截额度同一个算法算好（queuedOutcomes，含额外送的锅底），
     * 这里按上限查表，自己不算；查不到（不会退、老云端）就不提示
     */
    queuedOutcome () {
      if (!this.editable || !this.pickedType || this.freePerRound <= 0) return null
      return (this.pickedType.queuedOutcomes ?? []).find(o => o.limit === this.freePerRound) ?? null
    },
    canOpen () {
      if (!this.detail) return false
      if (!this.editable) return true
      if (this.partyCount < 1) return false
      return this.form.mode !== 'BUFFET' || !!this.form.consumeTypeId
    },
    /** 改单的结论：门店还在处理时按列表 adjustments 里的最新状态写 */
    shownAdjust () {
      const r = this.result ?? {}
      const base = { status: r.adjustStatus ?? null, manualCheck: !!r.manualCheck, adjustedFields: r.adjustedFields ?? [], ignoredReasons: r.ignoredReasons ?? {} }
      if (base.status !== 'PENDING') return base
      const live = this.dineOpenAdjustments.find(a => a.sessionId === this.dineOpenTarget?.sessionId)
      if (live) return { ...base, ...live }
      // 见过、现在不在了：门店处理完了，也不用人工核对
      return this.adjustSeen ? { ...base, status: 'DONE' } : base
    },
    resultPeople () {
      const r = this.result
      if (!r) return 0
      const live = this.shownAdjust
      if (live.storeAdults != null) return live.storeAdults + (live.storeChildren ?? 0)
      if (r.storeAdults != null) return r.storeAdults + (r.storeChildren ?? 0)
      return r.people ?? 0
    },
    resultTypeName () {
      const r = this.result
      if (!r) return ''
      const id = this.shownAdjust.storeConsumeTypeId ?? r.storeConsumeTypeId
      if (r.storeTypeName || id) return r.storeTypeName || findConsumeTypeById(id).name
      // 没开的桌按确认框里选的开：结果里没有类型，写服务员确认的
      if (r.alreadyOpen) return ''
      return this.pickedType?.name ?? this.$t('DineOpenModeAlaCarte')
    },
    resultLines () {
      const r = this.result
      if (!r) return []
      const a = this.shownAdjust
      const lines = []
      if (r.sentRounds > 0) lines.push(this.$t('DineOpenResultSent', { count: r.sentRounds }))
      if (r.returnedDishes > 0) lines.push(this.$t('DineOpenResultReturned', { count: r.returnedDishes }))
      if (r.droppedDishes > 0) lines.push(this.$t('DineOpenResultDropped', { count: r.droppedDishes }))
      if (r.failedRounds > 0) lines.push(this.$t('DineOpenResultFailed', { count: r.failedRounds }))
      // 门店还在改单时等着的一轮改完再送，提示写在改单那一条里
      if (r.waitingRounds > 0 && a.status !== 'PENDING') lines.push(this.$t('DineOpenResultLater', { count: r.waitingRounds }))
      const reasons = [...new Set(Object.values(a.ignoredReasons ?? {}).map(x => KNOWN_REASONS.includes(x) ? x : 'STORE_REFUSED'))]
      if (r.inputIgnored && reasons.length === 0) lines.push(this.$t('DineOpenInputIgnored'))
      if ((a.adjustedFields ?? []).length > 0) {
        // 改了什么：类型写改成的类型名，人数写改成几位
        const what = a.adjustedFields.map(f => f === 'type'
          ? (this.resultTypeName || this.$t('DineOpenFieldType'))
          : this.$t('DineOpenParty', { adults: this.resultPeople }))
        lines.push(this.$t('DineOpenAdjusted', { what: what.join(' · ') }))
      }
      reasons.forEach(x => lines.push(this.$t('DineOpenNotApplied_' + x)))
      return lines
    }
  },
  watch: {
    dineOpenTarget (target) {
      if (target) this.start(target)
    },
    dineOpenRejectTarget (target) {
      if (target) this.rejectFlow(target)
    },
    dineOpenAdjustments (list) {
      if (this.result?.adjustStatus === 'PENDING' && list.some(a => a.sessionId === this.dineOpenTarget?.sessionId)) this.adjustSeen = true
    }
  },
  created () {
    // 不放进 data：只是计数，不用响应式
    this.pollReporter = createDinePollReporter()
  },
  mounted () {
    addToQueue('dineOpenRequests', () => {
      this.TICK_DINE_OPEN()
      this.poll()
    })
  },
  methods: {
    ...mapMutations(['SET_DINE_OPEN_REQUESTS', 'SET_DINE_OPEN_ADJUSTMENTS', 'OPEN_DINE_REQUEST', 'CLOSE_DINE_REQUEST',
      'SHOW_DINE_OPEN_LIST', 'SHOW_DINE_OPEN_CHOICE', 'REJECT_DINE_REQUEST', 'DINE_REJECT_DONE', 'HIDE_DINE_REQUEST',
      'DINE_OPEN_CONFIRMED', 'TICK_DINE_OPEN']),
    /** 拉一次列表，成功回 true。force：不管间隔马上拉，正在拉的那次等它完再拉新的（确认结果未知时要拉到之后的状态） */
    async poll (force = false) {
      if (this.polling && !force) return false
      // 几次强制拉同时进来时一个一个来：等到没人在拉再开始，自己拉完只清自己的那一次
      while (this.polling) await this.polling
      if (!force && Date.now() < this.nextPollAt) return false
      const mine = this.loadList()
      this.polling = mine
      try {
        return await mine
      } finally {
        if (this.polling === mine) this.polling = null
      }
    },
    async loadList () {
      try {
        const res = await loadDineOpenRequests()
        const list = res?.requests ?? []
        // 只为新的、没被拒绝过的请求响一声；按会话算，两组都算，桌开了挪到「已开桌」不再响
        const active = list.filter(r => !r.rejectedAt)
        if (active.some(r => !this.seen.has(r.sessionId))) this.beep()
        this.seen = new Set(active.map(r => r.sessionId))
        this.SET_DINE_OPEN_REQUESTS(list)
        this.SET_DINE_OPEN_ADJUSTMENTS(res?.adjustments ?? [])
        this.nextPollAt = Date.now() + (res?.nextPollSeconds ?? 30) * 1000
        this.pollReporter.succeeded()
        return true
      } catch (e) {
        this.pollReporter.failed(e?.code)
        // 拿不到设备号或云端连不上：一分钟后再试，不打扰收银。
        // 清掉旧列表：不然断网时点有角标的桌还会被拦到三选一里
        // adjustments 留着上一次的：清掉会把「门店还在处理」当成处理完了，人工核对的红条也会跟着没了
        this.SET_DINE_OPEN_REQUESTS([])
        this.nextPollAt = Date.now() + 60 * 1000
        return false
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
    /** 几位 · 自助（类型名）或单点 */
    partyText (r) {
      const people = r.children > 0
        ? this.$t('DineOpenPartyWithChildren', { adults: r.adults, children: r.children })
        : this.$t('DineOpenParty', { adults: r.adults })
      let mode = this.$t('DineOpenModeAlaCarte')
      if (r.mode === 'BUFFET') {
        const name = r.consumeTypeId ? findConsumeTypeById(r.consumeTypeId).name : ''
        mode = name ? `${this.$t('DineOpenModeBuffet')} · ${name}` : this.$t('DineOpenModeBuffet')
      }
      return `${people} · ${mode}`
    },
    /** 等着的一轮 · 等了几分钟 · 还剩几分钟过期 · 谁在确认 */
    waitText (r) {
      const parts = []
      if (r.queuedRounds > 0) {
        // 云端带 queuedDishes 时写一共几道菜，老云端只有轮数
        parts.push(r.queuedDishes > 0
          ? this.$t('DineOpenQueuedDishes', { count: r.queuedDishes })
          : this.$t('DineOpenQueuedShort', { count: r.queuedRounds }))
      }
      // 时间都只用来显示：云端时间按柏林解析，到期优先用云端给的
      const waited = dineRequestWaitedMinutes(r, this.dineOpenNow)
      if (waited != null) parts.push(this.$t('DineOpenWaitingMinutes', { minutes: waited }))
      const left = dineRequestMinutesLeft(r, this.dineOpenNow)
      if (left != null) parts.push(this.$t('DineOpenExpiresIn', { minutes: left }))
      if (r.claimedBy) parts.push(this.$t('DineOpenClaimedBy', { name: r.claimedBy }))
      return parts.join(' · ')
    },
    /** 三选一里的「只开桌」：照常进桌开单，请求继续挂着，之后在单页顶上确认 */
    openOnly (r) {
      this.SHOW_DINE_OPEN_CHOICE(null)
      openOrEnterTable(r.tableName)
    },
    setMode (mode) {
      if (mode == null || mode === this.form.mode) return
      this.form.mode = mode
      this.touched.mode = true
    },
    setType (id) {
      this.form.consumeTypeId = id
      this.touched.type = true
    },
    setParty (key, value) {
      this.form[key] = Math.max(0, value)
      this.touched.party = true
    },
    async start (target) {
      const seq = ++this.seq
      // 确认框跟着 pw 显示：先清掉上一桌的，等这一桌的密码
      this.pw = null
      this.detail = null
      this.result = null
      this.adjustSeen = false
      this.error = ''
      this.recheckState = null
      this.loading = true
      this.touched = { mode: false, type: false, party: false }
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
        // 占上的时候框已经关了：马上放开，不让客人干等 10 分钟
        if (seq !== this.seq) {
          this.release(target.sessionId, detail?.claimId)
          return
        }
        this.detail = detail
        this.form = this.initialForm(detail)
      } catch (e) {
        if (seq !== this.seq) return
        // 还没拿到密码就出错：确认框跟着 pw 显示，不关掉的话请求挂着却什么都看不见
        if (this.pw == null) {
          this.close()
          return
        }
        this.error = this.describe(e)
      } finally {
        if (seq === this.seq) this.loading = false
      }
    },
    initialForm (detail) {
      const types = this.buffetTypes
      const offered = detail.candidates ?? []
      // 客人选的类型现在还能开就沿用（POS-899）；只有一种能开时默认选它；多种时让服务员自己选（和确认网页一样）
      const guestTypeId = types.some(t => t.id === detail.consumeTypeId)
        ? detail.consumeTypeId
        : (offered.length === 1 ? offered[0].id : null)
      if (this.adjusting) {
        // 已开的桌：默认是门店现在的人数和类型，服务员改了才传
        return {
          mode: this.storeBuffet ? 'BUFFET' : 'A_LA_CARTE',
          consumeTypeId: this.storeBuffet ? detail.tableConsumeTypeId : guestTypeId,
          adults: detail.tableAdults ?? 0,
          children: detail.tableChildren ?? 0
        }
      }
      return {
        // 现在没有能开的自助类型（比如自助时段刚过）：只能单点，切换也不显示
        mode: types.length > 0 && detail.buffetLicensed ? (detail.mode || this.form.mode) : 'A_LA_CARTE',
        consumeTypeId: guestTypeId,
        adults: detail.adults,
        children: detail.children
      }
    },
    confirmFields () {
      const buffet = this.form.mode === 'BUFFET'
      // 收银机已经开了这一桌、门店不能改：人数和类型以收银机为准，不传（POS-897）
      if (!this.editable) return {}
      if (this.adjusting) {
        // 已开的桌按确认改门店单（POS-901）：只传服务员动过的
        const fields = { adjust: true }
        if (this.touched.mode || this.touched.type) {
          fields.mode = this.form.mode
          if (buffet) fields.consumeTypeId = this.form.consumeTypeId
        }
        if (this.touched.party) {
          fields.adults = this.form.adults
          fields.children = this.partyChildren
        }
        return fields
      }
      return {
        mode: this.form.mode,
        consumeTypeId: buffet ? this.form.consumeTypeId : null,
        adults: this.form.adults,
        children: this.partyChildren
      }
    },
    async open () {
      const target = this.dineOpenTarget
      const seq = this.seq
      this.busy = true
      this.error = ''
      this.recheckState = null
      try {
        const res = await confirmDineOpenRequest(target.sessionId, this.pw, this.confirmFields())
        if (seq !== this.seq) return
        this.HIDE_DINE_REQUEST(target.sessionId)
        this.DINE_OPEN_CONFIRMED()
        this.result = res
        this.nextPollAt = 0
      } catch (e) {
        if (seq !== this.seq) return
        this.error = this.describe(e, target, 'open')
        // 等超时、断网或网关 5xx：云端可能已经开好桌、等着的一轮稍后自动送厨房，不能当失败（审查 B5）。马上重拉列表看这一桌的真实状态
        if (dineOpenOutcomeUnknown(dineOpenErrorOf(e).code)) this.recheck(target, seq)
      } finally {
        this.busy = false
      }
    },
    /** 拒绝：列表、三选一、单页顶条、确认框里点「拒绝」都走这里。先问一句，再要密码（确认框里已经有了就不再要） */
    async rejectFlow (target) {
      try {
        const answer = await showConfirmAsyn(this.$t('DineOpenRejectHint'), this.$t('DineOpenRejectTitle', { table: target.tableName }))
        if (!answer?.value) return
        const inDialog = this.dineOpenTarget?.sessionId === target.sessionId && this.pw != null
        const pw = inDialog ? this.pw : await popAuthorize('')
        if (pw == null) return
        if (inDialog) this.busy = true
        await rejectDineOpenRequest(target.sessionId, pw, this.lang())
        this.HIDE_DINE_REQUEST(target.sessionId)
        toast(this.$t('DineOpenRejected', { table: target.tableName }))
        if (inDialog) this.close()
        this.nextPollAt = 0
      } catch (e) {
        const message = this.describe(e, target)
        if (this.dineOpenTarget?.sessionId === target.sessionId) {
          this.error = message
        } else {
          toast(message, null, 'error')
        }
      } finally {
        this.busy = false
        this.DINE_REJECT_DONE()
      }
    },
    /** 确认结果未知时：重拉列表，按这一桌还在不在、桌开没开写真实状态（POS-1064） */
    async recheck (target = this.dineOpenTarget, seq = this.seq) {
      if (!target) return
      this.recheckState = 'checking'
      const ok = await this.poll(true)
      if (seq !== this.seq) return
      const live = ok ? this.dineOpenRequests.find(r => r.sessionId === target.sessionId) : null
      if (!ok) this.recheckState = 'failed'
      else if (!live) this.recheckState = 'gone'
      else this.recheckState = live.tableOpen ? 'tableOpen' : 'waiting'
    },
    /** 放开这次打开确认框时的占用（POS-1064）；没占上（没拿到 claim 的结果）、老云端不回凭据时不用放 */
    release (sessionId, claimId) {
      if (sessionId && claimId) releaseDineOpenRequest(sessionId, claimId).catch(() => {})
    },
    finish () {
      this.close()
      this.nextPollAt = 0
    },
    close () {
      // 取消、确认完、拒绝完都走这里：放开打开时的占用。确认、拒绝成功后云端已经放了，这一下什么都不改
      this.release(this.dineOpenTarget?.sessionId, this.detail?.claimId)
      this.seq++
      this.recheckState = null
      this.loading = false
      this.pw = null
      this.detail = null
      this.result = null
      this.CLOSE_DINE_REQUEST()
    },
    /** action 是 'open' 时，连不上、超时、网关 5xx 说成「结果未知」：确认可能已经成了（POS-1064） */
    describe (e, target = this.dineOpenTarget, action = null) {
      const { code, info, params } = dineOpenErrorOf(e)
      if (action === 'open' && dineOpenOutcomeUnknown(code)) return this.$t('DineOpenErrorOutcomeUnknown')
      // 请求已经没了（过期、结账、拒绝、桌上换了单）：列表里马上去掉
      if (GONE_CODES.includes(code) && target) this.HIDE_DINE_REQUEST(target.sessionId)
      if (GONE_CODES.includes(code) || code === 'DINE_TABLE_ALREADY_OPEN') this.nextPollAt = 0
      // 锁住时云端带上还要等几分钟
      if (code === 'DINE_WAITER_LOCKED' && params?.minutes) return this.$t('DineOpenErrorLockedMinutes', { minutes: params.minutes })
      const known = {
        DINE_WAITER_PW_WRONG: 'DineOpenErrorPassword',
        DINE_WAITER_SIGN_IN: 'DineOpenErrorPassword',
        DINE_WAITER_LOCKED: 'DineOpenErrorLocked',
        DINE_WAITER_PW_MISSING: 'DineOpenErrorPasswordMissing',
        DINE_TABLE_ALREADY_OPEN: 'DineOpenErrorAlreadyOpen',
        DINE_OPEN_CODE_EXPIRED: 'DineOpenErrorGone',
        DINE_SESSION_NOT_FOUND: 'DineOpenErrorGone',
        DINE_SESSION_CLOSED: 'DineOpenErrorGone',
        DINE_OPEN_NOT_REQUESTED: 'DineOpenErrorGone',
        DINE_REQUEST_ORDER_ENDED: 'DineOpenErrorOrderEnded',
        DINE_OPEN_CLAIMED: 'DineOpenErrorClaimed',
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
      if (known[code]) return this.$t(known[code])
      // 云端的 message 是中文，不给店员看；只带上错误码方便排查
      return code ? `${this.$t('DineOpenErrorUnknown')} (${code})` : (info || this.$t('DineOpenErrorUnknown'))
    }
  }
}
</script>
