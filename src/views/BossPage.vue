<template>
  <iframe
      :src="iframeSrc"
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
      base: GlobalConfig.Base,
      host: location.protocol + '//'
    }
  },
  props: {
    password: {}
  },
  computed: {
    iframeSrc () {
      return this.host + this.base + '/' + this.endPoint +
          '?Base=' + this.base +
          '&chaos=' + this.Config.startUpTimestamp +
          '&pw=' + this.password
    }
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
