<template>
  <iframe width="100%" :src="'/Admin?Base='+Config.Base+'&lang='+Config.lang"
          style="height: 100vh"></iframe>
</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export default {
  name: 'BossPage',
  data: function () {
    return {
      Config: GlobalConfig
    }
  }
}
</script>

<style scoped>

</style>
