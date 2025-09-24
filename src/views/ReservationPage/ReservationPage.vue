<template>
  <div>
    <reservation />
  </div>

</template>

<script>
import Reservation from '@/views/ReservationPage/ReservationFragment.vue'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

export default {
  name: 'ReservationPage',
  components: {
    Reservation
  },
  data: function () {
    return {
      Config: GlobalConfig
    }
  }
}
</script>

<style scoped>

</style>
