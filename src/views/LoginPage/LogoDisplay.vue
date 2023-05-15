<!--
  - Copyright (c) 2023. Haodong JU
  -->

<template>
  <div
    class="d-flex align-center"
  >
    <v-avatar
      class="mr-2"
      size="24"
      tile
    >
      <v-img :src="require('@/assets/newLogo/logo.png')"/>
    </v-avatar>
    <div
      class="text-body-2"
    >
      Aaden
      <span class="font-weight-black mr-1">POS</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoDisplay',
  props: {}
}
</script>

<style scoped>

</style>
