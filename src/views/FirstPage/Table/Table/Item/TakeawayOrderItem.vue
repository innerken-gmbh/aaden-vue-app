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

    <div class="d-flex align-center">

      <span style="max-width: 220px">
          #{{ table.tableName }}

      {{ table.addressInfo.firstName }}
      </span>
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
    <div class="text--disabled mt-2">
      <v-chip
          outlined
          small
      >
        <v-icon
            class="mr-1"
            color="grey darken-1"
            x-small
        >mdi-silverware-fork-knife
        </v-icon>
        {{ table.dishCount }}
        <v-icon
            class="mr-1 ml-1"
            color="grey darken-1"
            x-small
        >mdi-beer
        </v-icon>
        {{ table.drinkCount }}
      </v-chip>
      <v-chip
          class="ml-1"
          outlined
          small
      >
        <v-icon
            class="mr-1"
            color="grey darken-1"
        >mdi-cash
        </v-icon>
        {{ table.totalPrice | priceDisplay }}
      </v-chip>
    </div>
    <div class="mt-2">
      <v-chip
          label
          outlined
      >
        {{ $t(table.addressInfo.deliveryMethod) }} @ <b>{{ table.addressInfo.time }}</b>
      </v-chip>
      <div>
        <template
            v-for="(time) in [0,10,15,20,30,40,50,60]"
        >
          <v-chip
              :key="time"
              class="ma-1"
              color="success"
              label
              outlined
              @click.stop="acceptOrderWithTime(time)"
          >
            + {{ time }}
          </v-chip>
        </template>
        <v-chip
            color="error"
            label
            outlined
            @click.stop="$emit('reject',tableInfo.tableId)"
        >{{ $t('Reject') }}
        </v-chip>
      </div>
    </div>
  </v-card>
</template>

<script>
import { beautifulTable } from '@/api/restaurantInfoService'
import dayjs from 'dayjs'

export default {
  name: 'TakeawayOrderItem',
  props: {
    tableInfo: {},
    bigCard: { default: false }
  },
  computed: {
    table () {
      return beautifulTable(this.tableInfo)
    }
  },
  methods: {
    async acceptOrderWithTime (time) {
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
</script>

<style scoped>

</style>
