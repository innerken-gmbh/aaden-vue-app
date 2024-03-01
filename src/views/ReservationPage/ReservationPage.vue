<template>
  <div>
    <reservation v-if="Config.activeReservation"/>
    <div
        v-else
        style="height: 100vh"
        class="white"
    >

      <no-content-display
          icon="mdi-lock"
          :title="$t('FunctionNotActivated')"
          :desc="$t('ContactSupportToActivate')"
      ></no-content-display>
    </div>
  </div>

</template>

<script>
import Reservation from '@/views/ReservationPage/ReservationFragment.vue'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import NoContentDisplay from '@/views/FirstPage/widget/NoContentDisplay.vue'

export default {
  name: 'ReservationPage',
  components: {
    NoContentDisplay,
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
