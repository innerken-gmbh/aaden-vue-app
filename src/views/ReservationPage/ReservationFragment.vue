<template>
  <div>
    <iframe
        v-if="id!=null"
        :src="'https://aaden-vue3-reservation.vercel.app/?userId='+id+'&chaos='
        +GlobalConfig.startUpTimestamp"
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
  async mounted () {
    this.id = await getCurrentDeviceId()
  }
}
</script>

<style scoped>

</style>
