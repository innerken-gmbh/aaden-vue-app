<template>
  <iframe
      :src="'http://'+Config.Base+'/'+endPoint+'?Base='+base+'&chaos='+Config.startUpTimestamp+'&pw='+password"
      style="height: 100vh"
      width="100%"
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
      endPoint: GlobalConfig.adminEndpoint,
      deviceId: null,
      base: null
    }
  },
  props: {
    password: {}
  },
  async mounted () {
    this.base = GlobalConfig.Base
    this.deviceId = await getCurrentDeviceId()
  },
  async activated () {
    this.deviceId = await getCurrentDeviceId()
  }
}
</script>

<style scoped>

</style>
