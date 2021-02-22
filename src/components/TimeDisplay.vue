<template>
  <span style="font-size: 28px;font-weight: 900; font-family: 'Roboto',serif">
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
