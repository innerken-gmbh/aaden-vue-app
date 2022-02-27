<template>
  <v-card
      color="grey lighten-4"
      elevation="0"
      @click='$emit("click",table.tableName)'
      class="pa-2"
      :key="table.id">
    <div>
      <div class="text-body-1 text-truncate">
        <h2>#{{ table.tableName }}<span class="text-capitalize ml-2" v-if="table.addressInfo">{{
            table.addressInfo.firstName
          }} {{ table.addressInfo.lastName }}</span></h2>
      </div>
      <div class="text--disabled mt-1">
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
      <div class="mt-1">
        <v-btn icon color="error" v-if="table.inCall" x-small>
          <v-icon x-small>mdi-bell</v-icon>
        </v-btn>
        <v-chip small color="primary lighten-2" label>
          {{ $t(table.addressInfo.deliveryMethod) }} @ <b>{{ table.addressInfo.time }}</b>
        </v-chip>
      </div>

    </div>
  </v-card>
</template>

<script>
import { getColorLightness } from '@/oldjs/api'
import { beautifulTable, getRestaurantInfo } from '@/api/restaurantInfoService'

export default {
  name: 'TableGirdItem',
  props: {
    tableInfo: {}
  },
  computed: {
    table () {
      return beautifulTable(this.tableInfo)
    }
  },
  methods: {
    async tableBackgroundColor (table) {
      return table.inCall ? getRestaurantInfo().callColor : '#367aeb'
    },
    tableColorIsDark (table) {
      return this.colorIsDark(this.tableBackgroundColor(table))
    },
    colorIsDark (color) {
      return getColorLightness(color) < 128
    }
  }
}
</script>

<style scoped>

</style>
