<template>
  <div>
    <iframe
        :src="'https://aaden-vue3-reservation.vercel.app/?Base='+base+'&chaos='+GlobalConfig.startUpTimestamp"
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
      return GlobalConfig.DeviceId.toString().padStart(4, '0')
    }
  }
}
</script>

<style scoped>

</style>
