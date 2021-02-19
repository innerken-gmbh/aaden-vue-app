<template>
  <span style="font-size: 26px;font-weight: bold">
      {{ time }}
  </span>
</template>

<script>
import { showTime } from '@/oldjs/common'
export default {
  name: 'TimeDisplay',
  data: function () {
    return {
      time: ''
    }
  },
  created () {
    setInterval(() => {
      this.time = showTime()
    }, 1000)
  }
}
</script>

<style scoped>

</style>
