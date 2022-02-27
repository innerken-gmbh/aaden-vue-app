<template>

  <v-card height="112px" elevation="0" @click="$emit('click')"
          style="position:relative;"
          :style="{backgroundColor:''+displayColor,color:''+foreground,}"
          class="dishBlock d-flex flex-column fill-height justify-center align-center pa-2">
       <span style="font-size: 16px;border-radius: 4px;position: absolute;right: 0; top:0"
             class=" px-2 mr-1 white--text red"
             v-show="count>0">{{ count }}</span>
    <span v-code-hide style="font-size: 16px">{{ code }}</span>
    <span :style="{fontSize:fontSize+'px'}" class="name">
        {{ dishName }}
      </span>
    <div style="align-items: center;flex-wrap: wrap">
      <div v-if="isFree==='1'"
           class="price d-flex align-center green lighten-3 white--text px-1 rounded">
        {{ $t('Frei') }}
      </div>
      <div v-else class="price d-flex align-center text--secondary">
        {{ price | priceDisplay }}
        <template v-if="haveMod>0"><span style="color: red"> *</span></template>
      </div>

    </div>
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
