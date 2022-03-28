<template>
  <span style="font-family: 'Roboto',serif;font-weight: bold;" class="mr-4">
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
    this.time = showTime()
    setInterval(() => {
      this.time = showTime()
    }, 1000)
  }
}
</script>

<style scoped>

</style>
