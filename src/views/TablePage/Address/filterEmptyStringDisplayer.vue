<template>
  <div>
    <slot v-if="data&&data.length>0"></slot>
  </div>
</template>

<script>
export default {
  name: 'filterEmptyStringDisplayer',
  props: {
    data: { }
  }
}
</script>

<style scoped>

</style>
