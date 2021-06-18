<template>
  <v-lazy @click="$emit('click')" :options="{threshold: .5}"
          min-height="112px"
          height="100%"
  >
    <div :style="{backgroundColor:''+displayColor,color:''+foreground,}"
         class="dishBlock d-flex flex-column fill-height justify-space-between">
      <div :style="{fontSize:fontSize+'px'}" class="name"><span v-code-hide>{{ code }}.</span>{{ dishName }}</div>
      <div class="d-flex justify-space-between"
           style="align-items: center;flex-wrap: wrap">
        <div class="code">
          <v-btn v-if="haveMod>0&&Config.useConfigButton" @click.stop="$emit('click-tune')">
            <v-icon>mdi-tune</v-icon>
            <span v-show="count>0">* {{ count }}</span>
          </v-btn>
          <template v-else-if="haveMod>0">
            <span style="color: red">*</span>
            <span style="font-size: 16px;border-radius: 4px "
                  class=" px-2 mr-1 white--text red"
                  v-show="count>0">{{ count }}</span>
          </template>
          <template v-else>
            <span style="font-size: 16px;border-radius: 4px "
                  class=" px-2 mr-1 white--text red"
                  v-show="count>0">{{ count }}</span>
          </template>

        </div>
        <div v-if="isFree==='1'"
             style="padding:2px 4px;border-radius: 4px;"
             class="price d-flex align-center green lighten-3 white--text">
          {{  $t('Frei')  }}
        </div>
        <div v-else class="price d-flex align-center">
          {{price | priceDisplay}}
        </div>
      </div>
    </div>
  </v-lazy>
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
  cursor: pointer;
  padding: 4px;
  background: white;
  border-radius: 4px;
}

.dishBlock .code {
  font-size: 18px;
  font-weight: bold;
}

.dishBlock .price {
  font-size: 18px;
}

.dishBlock .name {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  width: 100%;
  font-size: 18px;
  font-weight: 600;
  overflow: hidden;
  word-break: break-word;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;

}
</style>
