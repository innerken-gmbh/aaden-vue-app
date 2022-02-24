<template>
  <v-card
      :color="tableBackgroundColor(table)"
      :dark="tableColorIsDark(table)"
      @click='$emit("click",table.tableName)'
      class="pa-2 d-flex"
      style="width:144px" :key="table.id">
    <div>
      <div class="text-body-1 text-truncate">
        <b>#{{ table.tableName }}
          <span class="text-capitalize" v-if="table.addressInfo">{{
              table.addressInfo.firstName
            }} {{ table.addressInfo.lastName }}</span>
        </b>
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
        <v-chip small color="primary lighten-2" label>
          {{ $t(table.addressInfo.deliveryMethod) }} @ <b>{{ table.addressInfo.time }}</b>
        </v-chip>
      </div>

    </div>
    <v-spacer></v-spacer>

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
    tableBackgroundColor (table) {
      return table.inCall ? getRestaurantInfo().callColor : '#ffffff'
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
