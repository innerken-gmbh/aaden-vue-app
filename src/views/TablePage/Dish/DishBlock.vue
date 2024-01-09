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
    <span
        style="font-size: 16px; border-radius: 4px; position: absolute; right: 0; top: 0"
        class="px-2 mr-1 white--text red"
        v-show="count > 0"
    >{{ count }}</span
    >
    <div
        style="font-size: 16px"
        class="text-truncate"
    >{{ code }}
    </div>
    <span
        :style="{ fontSize: autoFontSize + 'px' }"
        class="name"
    >
      {{ dishName }}
    </span>
    <v-card
        @click.stop="haveMod > 0 ? $emit('click-tune') : $emit('click')"
        elevation="0"
        :color="haveMod > 0 ? 'grey lighten-4 black--text' : 'transparent'"
        class="mt-1 px-1"
        :class="haveMod>0?'py-1':''"
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
        {{ price | priceDisplay }}
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

export default {
  name: 'DishBlock',
  props: ['displayColor', 'code', 'count', 'isFree', 'price', 'dishName',
    'foreground', 'haveMod'],
  computed: {
    autoFontSize () {
      const length = this.dishName?.length ?? 0
      return (length < 32 ? 18 : length < 48 ? 14 : 10)
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
  line-height: 20px;
  text-align: center;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}
</style>
