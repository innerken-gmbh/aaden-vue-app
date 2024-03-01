<template>
  <div class="pa-6">
    <v-card
        v-for="r in reservationList"
        :key="r.id"
        class="pa-6"
        color="white"
        elevation="0"
    >
      <div>
        <div class="text-h5 d-flex align-center">
          <div class="font-weight-black">
            {{ r.fromDateTime | onlyTime }}-{{ r.toDateTime | onlyTime }}
          </div>
          <v-spacer/>
          <span class="font-weight-black">{{ r.personCount }} P/</span>
          {{ r.title }} {{ r.firstName }} {{ r.lastName }}
        </div>
        <div class="text-body-1 mt-2">
          Note: {{ r.note || '-' }}
        </div>
      </div>
      <div class="d-flex mt-4">
        <v-btn
            @click="cancel(r.id)"
            elevation="0"
            class="grey lighten-4"
        >
          <v-icon left>mdi-cancel</v-icon>
          Cancel
        </v-btn>
        <v-btn
            @click="move(r.id)"
            elevation="0"
            class="grey lighten-4 ml-2"
        >
          <v-icon left>mdi-swap-horizontal</v-icon>
          Move
        </v-btn>
        <v-btn
            @click="checkIn(r.id)"
            elevation="0"
            class="grey lighten-4 ml-2"
        >
          <v-icon left>mdi-check</v-icon>
          Check in
        </v-btn>
      </div>
    </v-card>
  </div>

</template>

<script>
import { cancelReservation, checkIn, moveReservation } from '@/api/ReservationService'

export default {
  name: 'ReservationListPage',
  props: {
    reservationList: {},
    id: {}
  },
  data: function () {
    return {
      loading: false
    }
  },
  methods: {
    async checkIn (id) {
      this.loading = true
      await checkIn(id)
      this.$emit('need-refresh')
      this.loading = false
    },
    async cancel (id) {
      this.loading = true
      await cancelReservation(id)
      this.$emit('need-refresh')
      this.loading = false
    },
    async move (id) {
      this.loading = true
      await moveReservation(id, this.id)
      this.$emit('need-refresh')
      this.loading = false
    }
  }
}
</script>

<style scoped>

</style>
