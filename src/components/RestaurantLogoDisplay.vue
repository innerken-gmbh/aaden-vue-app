<template>
  <div
      class="d-flex align-center"
  >
    <v-avatar
        class="mr-3"
        size="18"
    >
      <v-img :src="logoPath"/>
    </v-avatar>
    <div
        class="text-h6"
    >
      {{ name }}
    </div>
  </div>
</template>

<script>
import { getRestaurantInfo } from '@/api/restaurantInfoService'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export default {
  name: 'RestaurantLogoDisplay',
  data: function () {
    return {
      name: '',
      logoPath: ''
    }
  },
  async mounted () {
    const info = await getRestaurantInfo()
    this.name = info.name
    this.logoPath = GlobalConfig.getBaseUrl() + info.buffetLogo
  }
}
</script>

<style scoped>

</style>
