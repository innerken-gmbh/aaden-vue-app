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
          :class="(table.addressInfo.toNow>30
            ?'black':table.addressInfo.toNow>15
            ?'warning':'orange')+'--text'"
      >
        {{ table.addressInfo.time }}
        <span
            v-if="timeToNow"
            class="font-weight-regular text-no-wrap text-truncate
         text-body-2"
        >(~{{ timeToNow }})</span>
      </div>
      <v-spacer></v-spacer>
      <v-chip
          v-if="table.inCall"
          class="mr-2"
          color="error"
          elevation="0"
          label
          small
      >
        <v-icon x-small>mdi-bell</v-icon>
        {{ $t('New') }}
      </v-chip>

    </div>

    <div class="text-body-2 mt-2">
      {{ $t(table.addressInfo.deliveryMethod) }}
      <template v-if="table.addressInfo.firstName||table.addressInfo.lastName">/
        {{ table.addressInfo.firstName }} {{ table.addressInfo.lastName }}
      </template>
    </div>
    <div class="text-body-2 d-flex align-center mt-1">
      <v-icon
          small
          color="pink darken-2"
      >mdi-silverware-fork-knife
      </v-icon>
      <v-icon
          small
          color="indigo darken-2"
      >mdi-beer
      </v-icon>
      <v-icon
          class="mr-2"
          small
          color="orange darken-2"
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
      <div class="d-flex align-baseline mt-1">
        <template v-if="table.consumeTypeStatusId<2">
          <v-card
              @click.stop="acceptOrderWithTime"
              flat
              rounded="xl"
              color="grey lighten-4"
              class="pa-1 mr-1"
          >
            <v-icon color="black">mdi-check</v-icon>
          </v-card>
          <v-card
              @click.stop="$emit('reject',tableInfo.tableId)"
              flat
              rounded="xl"
              color="grey lighten-4"
              class="pa-1 mr-1"
          >
            <v-icon color="black">mdi-close</v-icon>
          </v-card>
        </template>
        <template v-else>
          <v-card
              v-if="table.pickStatus!=='1'"
              @click.stop="$emit('click-ok')"
              flat
              rounded="xl"
              color="grey lighten-4"
              class="pa-1 mr-1"
          >
            <v-icon color="grey darken-2">mdi-shopping</v-icon>
          </v-card>
          <v-card
              v-if="table.addressInfo.firstName||table.addressInfo.lastName"
              @click.stop="$emit('address',table.addressInfo)"
              flat
              rounded="xl"
              color="grey lighten-4"
              class="pa-1 mr-1"
          >
            <v-icon color="grey darken-2">mdi-map-marker</v-icon>
          </v-card>
          <v-card
              @click.stop="$emit('checkout',tableInfo.tableId)"
              flat
              rounded="xl"
              color="grey lighten-4"
              class="pa-1 mr-1"
          >
            <v-icon color="grey darken-2">mdi-wallet</v-icon>
          </v-card>
        </template>

        <v-spacer></v-spacer>
        <div
            class="text-caption"
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
