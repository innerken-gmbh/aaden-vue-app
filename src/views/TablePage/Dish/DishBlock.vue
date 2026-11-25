<template>
  <v-card
      height="124px"
      elevation="0"
      @click="$emit('click')"
      @contextmenu="$emit('contextmenu')"
      style="position: relative"
      :style="{ backgroundColor: '' + displayColor, color: '' + foreground }"
      class="dishBlock d-flex flex-column fill-height justify-center align-center pa-2"
  >
    <v-card
        flat
        rounded="xl"
        style="font-size: 16px; border-radius: 4px; position: absolute; right: 8px; top:12px"
        class="px-2 mr-1 grey lighten-3 font-weight-black"
        v-show="count > 0"
    >{{ count }}
    </v-card
    >
    <v-card
        v-if="badge"
        flat
        style="font-size: 11px; line-height: 16px; border-radius: 4px; position: absolute; left: 6px; top: 4px; max-width: 60%"
        class="px-1 orange darken-2 white--text font-weight-bold text-truncate"
    ><v-icon x-small dark class="mr-1">mdi-tag</v-icon>{{ badgeLabel }}
    </v-card>
    <div
        style="font-size: 20px !important;"
        class="text-body-2 mb-1"
    >{{ code }}
    </div>
    <span
        :style="{ fontSize: autoFontSize + 'px !important' }"
        class="name text-body-1"
    >
      {{ dishName }}
    </span>
    <v-card
        @click.stop="haveMod > 0 ? $emit('click-tune') : $emit('click')"
        elevation="0"
        :color="haveMod > 0 ? 'rgba(255,255,255,.67)' : 'transparent'"
        class="mt-1 px-1"
        :class="haveMod>0?'py-1 black--text':''"
        style="align-items: center; border-radius: 4px !important; flex-wrap: wrap"
    >
      <div
          v-if="isFree === '1'"
          class="price d-flex align-center green lighten-3 white--text px-1 rounded"
      >
        {{ $t('Free') }}
      </div>
      <div
          v-else
          class="text-body-2 d-flex align-center"
      >
        <template v-if="discountedPrice != null">
          <s class="mr-1" style="font-size: 11px">{{ price | priceDisplay }}</s>
          <span class="font-weight-bold">{{ discountedPrice | priceDisplay }}</span>
        </template>
        <template v-else>{{ price | priceDisplay }}</template>
        <template v-if="haveMod > 0">
          <v-icon
              small
              right
          >mdi-cog
          </v-icon>
        </template>
      </div>
    </v-card>
  </v-card>
</template>

<script>
import { posPromoState } from '@/views/TablePage/posPromo'

export default {
  name: 'DishBlock',
  props: ['displayColor', 'code', 'count', 'isFree', 'price', 'dishName',
    'foreground', 'haveMod', 'dishId'],
  computed: {
    /** 收银台活动角标（POS-1106）：这道菜挂了对收银台生效的活动 */
    badge () {
      return this.dishId != null ? (posPromoState.menuBadges[String(this.dishId)] ?? null) : null
    },
    badgeLabel () {
      const labels = (this.badge?.promotions ?? []).map(p => p.label).filter(l => l)
      return labels.length > 0 ? labels[0] + (labels.length > 1 ? ' +' + (labels.length - 1) : '') : this.$t('PosPromoBadge')
    },
    /** 折后价（参考价，以下单时的报价为准）：只在云端按的原价和本机菜价一样时显示，对不上就只挂角标 */
    discountedPrice () {
      const b = this.badge
      if (!b || b.originalPrice == null || this.isFree === '1') return null
      return Math.abs(Number(b.originalPrice) - Number(this.price)) < 0.005 ? Number(b.price) : null
    },
    autoFontSize () {
      const length = this.dishName?.length ?? 0
      return length < 8 ? 22 : (length < 32 ? 18 : length < 48 ? 14 : 10)
    }
  }
}
</script>

<style scoped>
.dishBlock {
  border-radius: 16px !important;
  cursor: pointer;
}

.dishBlock .code {
  font-size: 18px;
  font-weight: bold;
}

.dishBlock .name {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
