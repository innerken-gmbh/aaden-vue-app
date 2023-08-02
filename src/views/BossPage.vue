<template>
  <iframe
      width="100%"
      :src="'http://'+Config.Base+'/'+endPoint+'?BaseId='+deviceId
          +'&lang='+Config.lang+'&chaos='+Config.startUpTimestamp+'&pw='+password"
      style="height: 100vh"
  ></iframe>
</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { getCurrentDeviceId } from '@/api/VIPCard/VIPCloudApi'

export default {
  name: 'BossPage',
  data: function () {
    return {
      Config: GlobalConfig,
      endPoint: 'Admin-Edge',
      deviceId: null
    }
  },
  props: {
    password: {}
  },
  async mounted () {
    this.deviceId = await getCurrentDeviceId()
  }
}
</script>

<style scoped>

</style>
