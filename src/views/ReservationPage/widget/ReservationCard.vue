<template>
  <vue-draggable-resizable
      :draggable="!checkedIn"
      :grid="[xSize,ySize]"
      :h="ySize"
      :parent="true"
      :prevent-deactivation="false"
      active-class=""
      :resizable="false"
      :snap="true"
      :x="reservationInfo.grid.x"
      :y="reservationInfo.grid.y"
      :w="reservationInfo.grid.w"
      class-name-dragging="dragging"
      @dragstop="(...args)=>$emit('dragstop',...args)"
  >
    <v-menu
        offset-y
        :close-on-content-click="false"
        open-on-hover
    >
      <template v-slot:activator="{ on,attrs }">
        <v-card
            v-on="on"
            v-bind="attrs"
            :height="ySize"
            :color="color"
            class="pa-2 white--text text-caption d-flex align-center reservationCard"
            style="position: absolute;width: 100%"
            :style="{
              gridColumn:reservationInfo.grid.xStart+' / '+reservationInfo.grid.xEnd,
              gridRow:reservationInfo.grid.y
            }"
        >
          <v-icon
              small
              class="mr-2"
              color="white"
              @click.stop="$emit('open')"
          >mdi-arrow-expand
          </v-icon>
          <div class="text-body-1 font-weight-black mr-4">
            {{ reservationInfo.personCount }}
          </div>
          <div class="text-body-2 font-weight-regular">
            {{ reservationInfo.firstName }} {{ reservationInfo.lastName }}
          </div>
          <template v-if="reservationInfo.childCount>0">
            <v-icon
                small
                class="mx-2"
                color="white"
            >mdi-human-child
            </v-icon>
            {{ reservationInfo.childCount }}
          </template>
          <div
              style="font-size: 0.5rem;width: 0"
              class="text-no-wrap text-truncate text-right ml-2 flex-grow-1"
          >
            {{ reservationInfo.note }}
          </div>

          <v-icon
              v-if="checkedIn"
              small
              color="white"
              class="ml-2"
          >mdi-location-enter
          </v-icon>

        </v-card>
      </template>
      <v-card>
        <div class="pa-3">
          <v-textarea
              v-model="reservationInfo.note"
              outlined
              auto-grow
              placeholder="add notes"
              hide-details
          ></v-textarea>
        </div>

        <div class="d-flex pa-3 grey lighten-3">
          <v-icon class="error pa-1 lighten-4 rounded-xl">mdi-calendar-remove</v-icon>
          <v-spacer></v-spacer>
          <v-icon
              class="grey pa-1 lighten-4 rounded-xl"
              @click="$emit('checkin')"
          >mdi-location-enter
          </v-icon>
        </div>
      </v-card>
    </v-menu>

  </vue-draggable-resizable>
</template>

<script>
export default {
  name: 'ReservationCard',
  props: {
    reservationInfo: {},
    xSize: {},
    ySize: {}
  },
  computed: {
    color () {
      if (this.checkedIn) {
        return 'complete'
      } else if (this.reservationInfo.cancelled === '1') {
        return 'red lighten-2'
      }
      return 'gradient'
    },
    checkedIn () {
      return this.reservationInfo.completed === '1'
    }
  }
}
</script>

<style scoped>
.reservationCard:hover {
  background-color: black !important;
}

.gradient {
  background: #3a7bd5; /* fallback for old browsers */
  background: linear-gradient(to right bottom, rgba(0, 0, 0, .56), #341d33);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}

.complete {
  background: #3a7bd5; /* fallback for old browsers */
  background: linear-gradient(to right bottom, rgba(11, 84, 24, 0.48), rgba(18, 132, 38, 0.48));
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
}
</style>
