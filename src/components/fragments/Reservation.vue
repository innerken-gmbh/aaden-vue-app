<template>
  <div class="pa-4" style="height: calc(100vh - 64px);width: 100%;
        background: #e8e8e8;display: grid;
        grid-template-columns: 1fr 1fr 2fr;
        grid-gap: 16px;
">
    <div class="d-flex flex-column">
      <v-card elevation="0" style="border-radius: 12px" color="grey lighten-2">
        <v-date-picker
            style="border-radius: 12px"
            :locale="$i18n.locale"
            full-width color="primary"
            v-model="reservationDate"
        />
      </v-card>
      <v-card color="white"
              elevation="0"
              style="border-radius: 12px"
              class="pa-4 mt-4">
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

          <div class="py-2 d-flex align-center">
            接受配送订单
            <v-spacer></v-spacer>
            <v-switch hide-details class="mt-0"/>
          </div>
        </div>

      </v-card>

    </div>

    <v-card style="border-radius: 12px" elevation="0"
            color="grey lighten-2" class="pa-4 d-flex flex-column">
      <div class="text-subtitle-2 d-flex align-center">预定列表
        <trailing-number>
          {{ reservations.length }}
        </trailing-number>
        <v-spacer></v-spacer>
        <v-btn color="success">
          <v-icon left>mdi-plus-circle</v-icon>
          新增
        </v-btn>
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
                <div class="text-truncate text-no-wrap">
                  <h3>
                    T{{ re.tableId }}/
                    {{ re.title }} {{ re.firstName }} {{ re.lastName }}
                  </h3>
                </div>
              </div>
              <v-spacer></v-spacer>
              <div>
                <div class="d-flex align-center">
                  <v-icon small>mdi-human-male-female</v-icon>
                  {{ re.personCount }}
                  <v-icon small class="ml-2">mdi-human-child</v-icon>
                  {{ re.childCount }}
                </div>

              </div>
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

  </div>
</template>

<script>
import { getReservation } from '@/api/ReservationService'
import TrailingNumber from '@/components/widget/TrailingNumber'

export default {
  name: 'Reservation',
  components: { TrailingNumber },
  data: function () {
    return {
      reservationDate: '2022-01-28',
      reservations: []
    }
  },
  watch: {
    reservationDate (val) {
      console.log(val)
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
