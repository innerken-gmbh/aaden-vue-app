<template>
  <v-card
      :key="table.id"
      :width="bigCard?'100%':'240px'"
      class="pa-3"
      color="white"
      elevation="0"
      style="border-radius: 12px;position: relative;"
      @click='$emit("click",table.tableName)'
  >
    <div class="d-flex align-center mt-1">
      <div
          class="text-body-1 font-weight-black text--darken-4"
      >
        {{ table.addressInfo.time }}
        <span
            v-if="timeToNow"
            class="font-weight-regular text-no-wrap text-truncate
         text-body-2"
        >(~{{ timeToNow }})</span>
      </div>
      <v-spacer></v-spacer>
      <v-icon
          v-if="table.addressInfo.toNow<30"
          :color="(table.addressInfo.toNow>30
            ?'black':table.addressInfo.toNow>15
            ?'warning':'red')"
      >mdi-timer-alert
      </v-icon>
    </div>

    <div class="text-body-2 mt-2">
      {{ $t(table.addressInfo.deliveryMethod) }}
      <template v-if="table.addressInfo.firstName||table.addressInfo.lastName">/
        {{ table.addressInfo.firstName }} {{ table.addressInfo.lastName }}
      </template>
    </div>
    <div class="text-body-2 d-flex align-center mt-1">
      <v-icon
          color="pink darken-2"
          small
      >mdi-silverware-fork-knife
      </v-icon>
      <v-icon
          color="indigo darken-2"
          small
      >mdi-beer
      </v-icon>
      <v-icon
          class="mr-2"
          color="orange darken-2"
          small
      >mdi-cash
      </v-icon>
      <div class="text--darken-4 d-flex font-weight-black text--secondary">
        <div>
          {{ table.dishCount }}
        </div>
        /
        <div>
          {{ table.drinkCount }}
        </div>
        /
        <div>
          {{ table.totalPrice | priceDisplay }}
        </div>
      </div>
    </div>
    <div class="mt-2">
      <div class="d-flex mt-1 align-center justify-center">
        <template v-if="table.consumeTypeStatusId<2">
          <v-card
              class="pa-1 mr-1"
              color="grey lighten-4"
              flat
              rounded="xl"
              @click.stop="acceptOrderWithTime"
          >
            <v-icon color="black">mdi-check</v-icon>
          </v-card>
          <v-card
              class="pa-1 mr-1"
              color="grey lighten-4"
              flat
              rounded="xl"
              @click.stop="$emit('reject',tableInfo.tableId)"
          >
            <v-icon color="black">mdi-close</v-icon>
          </v-card>
        </template>
        <template v-else>
          <v-card
              v-if="table.pickStatus!=='1'"
              class="pa-1 mr-1"
              flat
              rounded="xl"
              @click.stop="$emit('click-ok')"
          >
            <v-icon color="grey darken-2">mdi-shopping</v-icon>
          </v-card>
          <v-card
              v-if="table.addressInfo.firstName||table.addressInfo.lastName"
              class="pa-1 mr-1"
              flat
              rounded="xl"
              @click.stop="$emit('address',table.addressInfo)"
          >
            <v-icon color="grey darken-2">mdi-map-marker</v-icon>
          </v-card>
          <v-card
              class="pa-1 mr-1"
              flat
              rounded="xl"
              @click.stop="$emit('checkout',tableInfo.tableId)"
          >
            <v-icon color="grey darken-2">mdi-wallet</v-icon>
          </v-card>
        </template>

        <v-spacer></v-spacer>

        <div
            class="text-h5"
            style="max-width: 220px"
        >
          #{{ table.tableName }}
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { beautifulTable } from '@/api/restaurantInfoService'
import dayjs from 'dayjs'
import { mapActions } from 'vuex'

export default {
  name: 'TakeawayOrderItem',
  props: {
    tableInfo: {},
    bigCard: { default: false }
  },
  computed: {
    table () {
      return beautifulTable(this.tableInfo)
    },
    timeToNow () {
      if (dayjs(this.table.addressInfo.date + this.table.addressInfo.time).isValid()) {
        return dayjs(this.table.addressInfo.date + this.table.addressInfo.time).fromNow()
      } else {
        return ''
      }
    }
  },
  methods: {
    ...mapActions(['showOrderAcceptDialog']),
    async acceptOrderWithTime () {
      const time = await this.showOrderAcceptDialog()
      if (time) {
        const addressInfo = this.table.addressInfo
        let timeReal = dayjs()
        if (addressInfo) {
          if (addressInfo.date && addressInfo.time) {
            timeReal = dayjs(addressInfo.date + ' ' + addressInfo.time, 'YYYY-MM-DD HH:mm')
          }
        }
        timeReal = timeReal.add(time, 'm')
        this.$emit('accept', timeReal.format('DD.MM.YYYY HH:mm'), this.tableInfo.tableId)
      }
    }
  }
}
</script>

<style scoped>

</style>
