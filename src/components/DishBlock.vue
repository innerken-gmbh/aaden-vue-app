<template>
  <v-lazy @click="$emit('click')" :options="{threshold: .5}"
          min-height="108px"
          height="100%"
  >
    <div :style="{
 backgroundColor:''+displayColor,
 color:''+foreground,
}"
         class="dishBlock d-flex flex-column fill-height justify-space-between">
      <div :style="{fontSize:fontSize+'px'}" class="name">{{ dishName }}</div>
      <div class="d-flex justify-space-between"
           style="align-items: center;flex-wrap: wrap">
        <div class="code">
          <span v-code-hide>{{ code }}</span>
          <span style="font-size: 16px;border-radius: 4px "
                class=" px-2 mr-1 white--text red"
                v-show="count>0">{{ count }}</span>
          <span class="red--text" v-if="haveMod>0">*</span>
        </div>
        <div class="price d-flex align-center">
          {{ isFree === '1' ? 'Frei' : price }}
        </div>
      </div>
    </div>
  </v-lazy>
</template>

<script>

export default {
  name: 'DishBlock',
  props: ['displayColor', 'code', 'count',
    'isFree', 'price', 'dishName',
    'foreground', 'haveMod', 'fontSize']

}
</script>

<style scoped>
.dishBlock {
  cursor: pointer;
  padding: 5px 12px;
  background: white;
}

.dishBlock .code {
  font-size: 18px;
  font-weight: bold;
}

.dishBlock .price {
  font-size: 18px;
}

.dishBlock .name {
  margin-top: 8px;
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
