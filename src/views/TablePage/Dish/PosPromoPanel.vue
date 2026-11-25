<template>
  <div>
    <div
        v-if="cart && offline"
        class="mx-2 mt-2 px-2 py-1 rounded grey lighten-3 text-body-2 d-flex align-center"
    >
      <v-icon
          class="mr-1"
          small
      >mdi-cloud-off-outline
      </v-icon>
      {{ $t('PosPromoOffline') }}
    </div>
    <div
        v-if="cart && unsynced"
        class="mx-2 mt-1 text-caption grey--text text--darken-1"
    >
      {{ $t('PosPromoPriceUnsynced') }}
    </div>
    <template v-if="cart">
      <div
          v-for="n in nudgeList"
          :key="n.type + (n.promotion.instanceKey || n.promotion.promotionId)"
          class="mx-2 mt-1 px-2 py-1 rounded amber lighten-5 d-flex align-center"
      >
        <v-icon
            class="mr-2"
            small
        >mdi-tag-outline
        </v-icon>
        <div class="flex-grow-1 text-body-2">
          <div class="font-weight-bold">{{ promotionName(n.promotion) }}</div>
          <div>{{ nudgeText(n.promotion) }}</div>
        </div>
        <v-btn
            v-if="choosable(n.promotion)"
            color="primary"
            small
            text
            @click="openPicker(n)"
        >
          {{ $t('PosPromoChoose') }}
        </v-btn>
      </div>
    </template>
    <div
        v-for="t in totals"
        :key="t.label"
        class="mx-2 mt-1 px-2 text-body-2 d-flex"
    >
      <v-icon
          class="mr-1"
          small
      >mdi-sale
      </v-icon>
      <span class="flex-grow-1 text-truncate">{{ t.label }}</span>
      <span class="font-weight-bold">-{{ t.amount | priceDisplay }}</span>
    </div>

    <v-dialog
        v-if="cart"
        :value="picker != null"
        max-width="480"
        @input="v => { if (!v) closePicker() }"
    >
      <v-card v-if="picker">
        <v-card-title>{{ promotionName(picker.promotion) }}</v-card-title>
        <v-card-subtitle class="pt-1">{{ $t('PosPromoPickOne') }}</v-card-subtitle>
        <v-card-text style="max-height: 420px; overflow-y: auto">
          <v-card
              v-for="c in picker.promotion.choices || []"
              :key="c.dishId"
              :disabled="c.available === false"
              class="mb-2 pa-3 d-flex align-center"
              color="grey lighten-4"
              flat
              @click="choose(c)"
          >
            <span class="flex-grow-1">{{ [c.code, c.name].filter(x => x).join('. ') }}</span>
            <template v-if="isAddOn(picker.promotion) && c.promoPrice != null">
              <s class="mr-2 grey--text">{{ c.price | priceDisplay }}</s>
              <span class="font-weight-bold">{{ c.promoPrice | priceDisplay }}</span>
            </template>
            <span
                v-else-if="!isAddOn(picker.promotion)"
                class="font-weight-bold"
            >{{ $t('PosPromoFree') }}</span>
            <span v-else-if="c.price != null">{{ c.price | priceDisplay }}</span>
          </v-card>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              text
              @click="declinePicker"
          >
            {{ isAddOn(picker.promotion) ? $t('PosPromoNoAddon') : $t('PosPromoNoGift') }}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  decline,
  nudges,
  orderPromotionTotals,
  pick,
  posPromoState,
  priceUnsynced,
  promotionName
} from '@/views/TablePage/posPromo'

/**
 * 收银台活动（POS-1106）：购物车下面的离线提示、凑单提示、满减合计、赠品 / 换购选择；
 * 已下的单只显示满减合计（[cart] = false）
 */
export default {
  name: 'PosPromoPanel',
  props: {
    rows: {
      default: () => []
    },
    cart: {
      default: false
    }
  },
  computed: {
    offline () {
      return posPromoState.offline
    },
    picker () {
      return posPromoState.picker
    },
    unsynced () {
      return priceUnsynced()
    },
    nudgeList () {
      return nudges()
    },
    totals () {
      return orderPromotionTotals(this.rows)
    }
  },
  methods: {
    promotionName,
    isAddOn (p) {
      return p.kind === 'ORDER_ADD_ON'
    },
    choosable (p) {
      return (p.state === 'UNCLAIMED' || p.state === 'AVAILABLE') && (p.choices ?? []).length > 0
    },
    nudgeText (p) {
      const gift = p.kind === 'ORDER_GIFT'
      if (p.state === 'UNCLAIMED') return this.$t('PosPromoRemindTitle')
      if (p.state === 'AVAILABLE') return this.$t('PosPromoNudgeAddonReady')
      if ((p.missingUnits ?? 0) > 0) return this.$t(gift ? 'PosPromoNudgeGiftCount' : 'PosPromoNudgeMoreItems', { count: p.missingUnits })
      const amount = this.$options.filters.priceDisplay(Number(p.missingAmount ?? 0))
      return this.$t(gift ? 'PosPromoNudgeGift' : 'PosPromoNudgeMoreAmount', { amount })
    },
    openPicker (n) {
      posPromoState.picker = { type: n.type, promotion: n.promotion }
    },
    closePicker () {
      posPromoState.picker = null
    },
    choose (c) {
      if (c.available === false) return
      pick(this.picker, c)
    },
    declinePicker () {
      decline(this.picker)
    }
  }
}
</script>
