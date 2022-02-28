<template>
 <span class="white--text ml-2 " :class="color"
       style="font-size: small;border-radius: 24px;padding: 2px 8px"><slot></slot></span>
</template>

<script>
export default {
  name: 'TrailingNumber',
  props: {
    content: {},
    color: { default: 'error' }
  }
}
</script>

<style scoped>

</style>
