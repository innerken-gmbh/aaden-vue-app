<template>
  <div style="width: 100%" class="d-flex justify-center">
    <v-card
        elevation="0"
        color="transparent"
        class="pa-1"
    >
      <v-avatar
          tile
          size="28"
      >
        <v-img :src="require('@/assets/new/logo/logo.png')"/>
      </v-avatar>
    </v-card>
  </div>

</template>

<script>
export default {
  name: 'LogoDisplay'
}
</script>

<style scoped>

</style>
