<template>
  <v-card
    color="white"
    elevation="0"
    @click='$emit("click",table.tableName)'
    class="pa-3"
    :width="bigCard?'100%':'240px'"
    style="border-radius: 12px;position: relative;"
    :key="table.id">

    <div class="d-flex align-center">

      <span style="max-width: 220px">
          #{{ table.tableName }}

      {{ table.addressInfo.firstName }}
      </span>
      <v-spacer></v-spacer>
      <v-chip color="error" elevation="0" v-if="table.inCall" small label class="mr-2">
        <v-icon x-small>mdi-bell</v-icon>
        {{ $t('New') }}
      </v-chip>

    </div>
    <div class="text--disabled mt-2">
      <v-chip outlined small>
        <v-icon x-small color="grey darken-1" class="mr-1">mdi-silverware-fork-knife</v-icon>
        {{ table.dishCount }}
        <v-icon x-small color="grey darken-1" class="mr-1 ml-1">mdi-beer</v-icon>
        {{ table.drinkCount }}
      </v-chip>
      <v-chip class="ml-1" outlined small>
        <v-icon color="grey darken-1" class="mr-1">mdi-cash</v-icon>
        {{ table.totalPrice | priceDisplay }}
      </v-chip>
    </div>
    <div class="mt-2">
      <v-chip outlined label>
        {{ $t(table.addressInfo.deliveryMethod) }} @ <b>{{ table.addressInfo.time }}</b>
      </v-chip>
      <div>
        <template
          v-for="(time) in [0,10,15,20,30,40,50,60]"
        >
          <v-chip
            label
            class="ma-1"
            :key="time"
            outlined
            color="success"
            @click.stop="acceptOrderWithTime(time)"
          >
            + {{ time }}
          </v-chip>
        </template>
        <v-chip label outlined color="error" @click.stop="$emit('reject',tableInfo.tableId)">{{ $t('Reject') }}</v-chip>
      </div>
    </div>
  </v-card>
</template>

<script>
import { getColorLightness } from '@/oldjs/api'
import { beautifulTable, getRestaurantInfo } from '@/api/restaurantInfoService'
import dayjs from 'dayjs'
import { changeFireBaseOrderDeliveryTime } from '@/api/fireStore'
import { Timestamp } from 'firebase/firestore'
import i18n from '@/i18n'

export default {
  name: 'TakeawayOrderItem',
  props: {
    tableInfo: {},
    bigCard: { default: false }
  },
  computed: {
    table () {
      console.log(this.tableInfo, i18n.t('Table'))
      return beautifulTable(this.tableInfo)
    }
  },
  methods: {
    async tableBackgroundColor (table) {
      return table.inCall ? getRestaurantInfo().callColor : this.$vuetify.theme.currentTheme.primary
    },
    tableColorIsDark (table) {
      return this.colorIsDark(this.tableBackgroundColor(table))
    },
    colorIsDark (color) {
      return getColorLightness(color) < 128
    },
    async acceptOrderWithTime (time) {
      const addressInfo = this.table.addressInfo
      let timeReal = dayjs()
      if (addressInfo) {
        if (addressInfo.date && addressInfo.time) {
          timeReal = dayjs(addressInfo.date + ' ' + addressInfo.time, 'YYYY-MM-DD HH:mm')
        }
      }
      timeReal = timeReal.add(time, 'm')
      console.log(this.table)

      this.$emit('accept', timeReal.format('DD.MM.YYYY HH:mm'), this.tableInfo.tableId)
      await changeFireBaseOrderDeliveryTime(this.table.externalId,
        Timestamp.fromDate(timeReal.toDate()))
    }
  }
}
</script>

<style scoped>

</style>
