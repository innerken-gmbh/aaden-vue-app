<template>
  <v-dialog
      v-model="show"
      max-width="400px"
  >
    <v-card
        class="pa-4 d-flex flex-column align-center"
        rounded="lg"
    >
      <v-icon
          class="mb-3"
          color="black"
      >mdi-timer
      </v-icon>
      <div class="text-body-1 text-center mb-4 font-weight-black">
        Please choose estimate finish time for orders
      </div>
      <div style="display: grid;grid-template-columns: repeat(2,minmax(0,1fr));grid-gap: 8px;width: 100%">
        <v-card
            flat
            @click="confirmTime(t)"
            class="pa-3 grey lighten-4 text-center"
            :key="t"
            v-for=" t in availableTime"
        >
          + {{ t }} minutes
        </v-card>
      </div>

    </v-card>
  </v-dialog>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  name: 'OrderAcceptDialog',
  data: function () {
    return {
      show: false,
      availableTime: [0, 10, 15, 20, 30, 40, 50, 60, 90, 120]
    }
  },
  computed: {
    ...mapState(['showOrderAcceptDialog', 'orderResolve'])
  },
  watch: {
    showOrderAcceptDialog (val) {
      this.show = val
    },
    show (val) {
      if (!val) {
        this.hideOrderAcceptDialog()
      }
    }
  },
  methods: {
    confirmTime (t) {
      console.log(t, 'time here')
      this.orderResolve(t)
      this.show = false
    },
    ...mapMutations(['hideOrderAcceptDialog'])
  }
}
</script>

<style scoped>

</style>
