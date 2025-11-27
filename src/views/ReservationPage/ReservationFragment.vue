<template>
  <div>
    <iframe
        v-if="id!=null"
        :src="iframeSrc"
        style="height: 98vh"
        width="100%"
    ></iframe>
  </div>

</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { getCurrentDeviceId } from '@/api/VIPCard/VIPCloudApi'

export default {
  name: 'Reservation',
  data: function () {
    return {
      GlobalConfig,
      id: null
    }
  },
  computed: {
    iframeSrc () {
      if (this.id && this.id.toString() === '1750') {
        return 'https://aaden-vue3-reservation-zlas.vercel.app/?userId=' + this.id + '&chaos=' + GlobalConfig.startUpTimestamp
      } else {
        return 'https://aaden-vue3-reservation.vercel.app/?userId=' + this.id + '&chaos=' + GlobalConfig.startUpTimestamp
      }
    }
  },
  async mounted () {
    this.id = await getCurrentDeviceId()
  }
}
</script>

<style scoped>

</style>
