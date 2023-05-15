<!--
  - Copyright (c) 2023. Haodong JU
  -->
<template>
  <div class="d-flex flex-column align-center">
    <div
      class="d-flex align-center"
    >
      <v-avatar
        class="mr-2"
        size="48"
        tile
      >
        <v-img :src="require('@/assets/newLogo/logo.png')"/>
      </v-avatar>
      <div
        class="text-h4"
      >
        Aaden
        <span class="font-weight-black mr-1">POS</span>
      </div>
    </div>
    <div class="text-h5 mt-1">
      欧洲最靠谱的POS系统，帮您<span class="gradientText">化繁为简</span>
    </div>
  </div>
</template>
<script>

export default {
  name: 'PrimaryLogoDisplay'
}
</script>

<style scoped>
.gradientText {
    background: -webkit-linear-gradient(315deg, #ffca28 25%, #4caf50);
    background-clip: text;
    -webkit-background-clip: text;
    font-weight: 800;
    -webkit-text-fill-color: transparent;
}

</style>
