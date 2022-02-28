<template>
  <v-card
      color="white"
      elevation="0"
      @click='$emit("click",table.tableName)'
      class="pa-3 "
      style="border-radius: 12px;position: relative"
      :key="table.id">

    <div class="text-body-1 text-truncate">
      <h2>#{{ table.tableName }}<span class="text-capitalize ml-2" v-if="table.addressInfo">{{
          table.addressInfo.firstName
        }} {{ table.addressInfo.lastName }}</span></h2>
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
      <v-btn icon color="error" v-if="table.inCall" x-small>
        <v-icon x-small>mdi-bell</v-icon>
      </v-btn>
      <v-chip small color="primary lighten-2" label>
        {{ $t(table.addressInfo.deliveryMethod) }} @ <b>{{ table.addressInfo.time }}</b>
      </v-chip>
    </div>

    <v-card class="error--text"
            elevation="0"
            style="position: absolute;
            border-radius: 12px;
            text-align: center;
            margin: auto;top: 0;bottom: 0;height: fit-content;
    right: 16px">
      <div class="font-weight-black text-h6">45</div>
      <div class="font-weight-regular text-body-2 mt-n2"
      >Min
      </div>
    </v-card>

  </v-card>
</template>

<script>
import { getColorLightness } from '@/oldjs/api'
import { beautifulTable, getRestaurantInfo } from '@/api/restaurantInfoService'

export default {
  name: 'TableGirdItem',
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
