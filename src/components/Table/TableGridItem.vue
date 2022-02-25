<template>
  <v-card
      elevation="0"
      outlined
      rounded
      @click='$emit("click",table.tableName)'
      class="pa-2"
      :key="table.id">
    <v-responsive :aspect-ratio="1">
      <div>
        <div class="text-body-1 text-truncate">
          <h2>#{{ table.tableName }}
            <span class="text-capitalize" v-if="table.addressInfo">{{
                table.addressInfo.firstName
              }} {{ table.addressInfo.lastName }}</span>
          </h2>
        </div>
        <div class="text--disabled mt-2">
          <v-chip outlined small>
            <v-icon x-small class="mr-1">mdi-silverware-fork-knife</v-icon>
            {{ table.dishCount }}
            <v-icon x-small class="mr-1 ml-1">mdi-beer</v-icon>
            {{ table.drinkCount }}
          </v-chip>
          <v-chip outlined small class="mt-1">
            <v-icon class="mr-1">mdi-cash</v-icon>
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

      </div>
    </v-responsive>
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
