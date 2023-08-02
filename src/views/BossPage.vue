<template>
  <iframe
      width="100%"
      :src="'http://'+Config.Base+'/'+endPoint+'?Base='+Config.Base
          +'&lang='+Config.lang+'&chaos='+Config.startUpTimestamp+'&pw='+password"
      style="height: 100vh"
  ></iframe>
</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export default {
  name: 'BossPage',
  data: function () {
    return {
      Config: GlobalConfig,
      endPoint: 'Admin-Edge'
    }
  },
  props: {
    password: {}
  }
}
</script>

<style scoped>

</style>
