<template>
  <div>
    <iframe
        :src="'https://aaden-vue3-reservation.vercel.app/?userid='+base+'&chaos='+GlobalConfig.startUpTimestamp"
        style="height: 98vh"
        width="100%"
    ></iframe>
  </div>

</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export default {
  name: 'Reservation',
  data: function () {
    return {
      GlobalConfig
    }
  },
  computed: {
    base () {
      return parseInt(GlobalConfig.DeviceId)
    }
  }
}
</script>

<style scoped>

</style>
