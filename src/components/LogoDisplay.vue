<template>
  <div
    class="d-flex align-center flex-column"
  >
    <v-avatar
      tile
      size="24"
    >
      <v-img :src="require('@/assets/new/logo/logo.png')"/>
    </v-avatar>
    <div
      class="text-caption"
    >
      Aaden
      <span class="font-weight-black">POS</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LogoDisplay'
}
</script>

<style scoped>

</style>
