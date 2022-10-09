<template>

  <v-card height="124px" elevation="0" @click="$emit('click')"
          style="position:relative;"
          :style="{backgroundColor:''+displayColor,color:''+foreground,}"
          class="dishBlock d-flex flex-column fill-height justify-center align-center pa-2">
       <span style="font-size: 16px;border-radius: 4px;position: absolute;right: 0; top:0"
             class=" px-2 mr-1 white--text red"
             v-show="count>0">{{ count }}</span>
    <div v-code-hide style="font-size: 16px" class="text-truncate">{{ code }}</div>
    <span :style="{fontSize:autoFontSize+'px'}" class="name">
        {{ dishName }}
      </span>
    <v-card :dark="haveMod>0" @click="haveMod>0?$emit('click-tune'):$emit('click')" elevation="0" :color="haveMod>0?'warning':''" class="pa-1 mt-1"
            style="align-items: center;flex-wrap: wrap">
      <div v-if="isFree==='1'"
           class="price d-flex align-center green lighten-3 white--text px-1 rounded">
        {{ $t('Frei') }}
      </div>
      <div v-else class="price d-flex align-center">
        {{ price | priceDisplay }}
        <template v-if="haveMod>0"><v-icon small right>mdi-cog</v-icon></template>
      </div>
    </v-card>
  </v-card>

</template>

<script>

import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export default {
  name: 'DishBlock',
  props: ['displayColor', 'code', 'count',
    'isFree', 'price', 'dishName',
    'foreground', 'haveMod', 'fontSize'],
  data: function () {
    return {
      Config: GlobalConfig
    }
  },
  computed: {
    autoFontSize () {
      const length = this.dishName?.length ?? 0
      return this.fontSize === '-1' ? length < 32 ? 18 : (length < 48 ? 14 : 10) : this.fontSize
    }
  }

}
</script>

<style scoped>
.dishBlock {
  border-radius: 12px;
  cursor: pointer;
}

.dishBlock .code {
  font-size: 18px;
  font-weight: bold;
}

.dishBlock .price {
  font-size: 16px;
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
