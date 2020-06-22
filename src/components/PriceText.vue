<template>
<span>
       <span v-if="price>0">+{{price | priceDisplay}}</span>
       <span v-else-if="price<0">-{{price | priceDisplay}}</span>
       <span v-else-if="displayZero">{{price | priceDisplay}}</span>
</span>
</template>

<script>
export default {
  name: 'PriceText',
  props: {
    price: {
      type: [String, Number],
      default: '0'
    },
    displayZero: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
