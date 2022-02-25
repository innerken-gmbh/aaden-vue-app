<template>
  <v-card
      color="grey lighten-3"
      elevation="0"
      @click='$emit("click",table.tableName)'
      class="pa-2"
      :key="table.id">
    <v-responsive :aspect-ratio="2">
      <div>
        <div class="text-body-1 text-truncate">
          <h2>#{{ table.tableName }}</h2>
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
