<template>
  <div class="pa-4" style="height: calc(100vh - 64px);width: 100%;
        background: #e8e8e8;display: grid;
        grid-template-columns: repeat(4,1fr);
        grid-gap: 16px;
">
    <div class="d-flex flex-column">
      <v-card elevation="0" style="border-radius: 12px" color="grey lighten-2">
        <v-card color="white"
                elevation="0"
                style="border-radius: 12px"
                class="pa-4">
          <div class="text-subtitle-2 d-flex">
            预定设置
            <v-spacer></v-spacer>
            <v-chip label color="white" small class="ml-2 d-flex align-center">
              <v-icon left color="success">mdi-checkbox-marked-circle</v-icon>
              <span>
                  已经同步
          </span>
            </v-chip>
          </div>
          <div class="text-body-1 mt-4">
            <div class="py-2 d-flex align-center">
              接受预定
              <v-spacer></v-spacer>
              <v-switch hide-details :value="true" class="mt-0"/>
            </div>
          </div>

        </v-card>
        <v-date-picker class="mt-4"
                       style="border-radius: 12px"
                       :locale="$i18n.locale"
                       full-width color="primary"
                       v-model="reservationDate"
        />
      </v-card>
      <v-card
          elevation="0"
          class="mt-4 flex-grow-1"
          style="border-radius: 12px"
          color="grey lighten-2"
      >

      </v-card>

    </div>

    <v-card style="border-radius: 12px" elevation="0"
            color="grey lighten-2" class="pa-4 d-flex flex-column">
      <div class="text-subtitle-2 d-flex align-center">预定列表
        <v-spacer></v-spacer>
        <div class="d-flex">
          <v-checkbox class="mt-0 mr-2" hide-details label="只看预定"></v-checkbox>
          <v-checkbox class="mt-0" hide-details label="只看空桌"></v-checkbox>
        </div>

      </div>
      <v-item-group>
        <div style="display: grid;grid-gap: 12px;overflow-y: scroll;" class="mt-4">
          <v-item
              v-for="re in reservations" :key="re.remoteId"
              #default="{active,toggle}">
            <v-card elevation="0" style="border-radius: 12px;position: relative"
                    @click="toggle"
                    class="pa-3 pr-6 d-flex align-center">
              <div>
                <div class="text--secondary text-caption d-flex align-center">
                  <v-icon small class="mr-1">mdi-clock</v-icon>
                  {{ re.fromDateTime | onlyTime }} -
                  {{ re.toDateTime | onlyTime }}
                </div>
                <div class="text-truncate text-no-wrap d-flex align-center mt-1">

                  <h3>
                    {{ re.tel }}/{{ re.title }} {{ re.firstName }} {{ re.lastName }}
                  </h3>
                </div>
                <div class="mt-1 d-flex align-center">
                  <v-chip label color="primary lighten-2">
                    <v-icon left>mdi-map-marker-check-outline</v-icon>
                    {{ re.tableNameNull }}
                  </v-chip>
                  <v-chip label class="d-flex align-center ml-1">
                    <v-icon small>mdi-human-male-female</v-icon>
                    {{ re.personCount }}
                    <v-icon small class="ml-2">mdi-human-child</v-icon>
                    {{ re.childCount }}
                  </v-chip>
                </div>
              </div>
              <v-spacer></v-spacer>
              <div v-if="active" style="position: absolute;width: 8px;
              height: 60%;border-radius: 4px;top: 0;bottom: 0;margin:auto;right: 8px;
"
                   class="primary"></div>
            </v-card>
          </v-item>

        </div>
      </v-item-group>

    </v-card>
    <v-card style="border-radius: 12px" class="pa-4" elevation="0" color="grey lighten-2">
      <div class="text-subtitle-2">选择一个以查看</div>
    </v-card>
    <div class="d-flex flex-column">

    </div>

  </div>
</template>

<script>
import { getReservation } from '@/api/ReservationService'

export default {
  name: 'Reservation',
  data: function () {
    return {
      reservationDate: '2022-01-28',
      reservations: []
    }
  },
  watch: {
    reservationDate (val) {
      this.loadReservations()
    }
  },
  methods: {
    async loadReservations () {
      this.reservations = await getReservation(this.reservationDate)
      console.log(this.reservations, 'reservation')
    }
  },
  mounted () {
    this.loadReservations()
  }
}
</script>

<style scoped>

</style>
