<template>
 <span class="ml-2" :class="color"
       style="font-size: small;border-radius: 24px;padding: 1px 8px"><slot></slot></span>
</template>

<script>
export default {
  name: 'TrailingNumber',
  props: {
    content: {},
    color: { default: 'grey lighten-4 black--text' }
  }
}
</script>

<style scoped>

</style>
