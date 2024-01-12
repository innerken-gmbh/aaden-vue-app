<template>
  <v-card
    color="white"
    elevation="0"
    @click='$emit("click",table.tableName)'
    class="pa-3"
    :width="bigCard?'100%':'240px'"
    style="border-radius: 12px;position: relative;"
    :key="table.id">

    <div class="text-body-1 text-truncate text-no-wrap" style="max-width: 220px">
      <span class="font-weight-bold">#{{ table.tableName }}</span>
      <span class="text-capitalize ml-1"
            v-if="table.addressInfo">{{
          table.addressInfo.firstName
        }} {{ table.addressInfo.lastName }}</span>
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
      <v-chip color="error" elevation="0" v-if="table.inCall" small label class="mr-2">
        <v-icon x-small>mdi-bell</v-icon>
      </v-chip>
      <v-chip small outlined label>
        {{ $t(table.addressInfo.deliveryMethod) }} @ <b>{{ table.addressInfo.time }}</b>
      </v-chip>
    </div>
    <v-card v-if="bigCard"
            :class="(table.addressInfo.toNow>30
            ?'success':table.addressInfo.toNow>15
            ?'warning':'error')+'--text'"
            elevation="0"
            style="
              position: absolute;
              right: 24px;
              top: 0;
              bottom: 0;
              margin: auto;
              height: fit-content;
            text-align: center;">
      <template v-if="table.addressInfo.toNow">
        <div class="font-weight-black text-h6">{{ Math.abs(table.addressInfo.toNow) }}</div>
        <div class="font-weight-regular text-body-2 mt-n2">
          Min
        </div>
      </template>

      <v-card @click.stop="$emit('click-ok')" class="pa-2 rounded" elevation="0" color="#f6f6f6">
        <v-icon>mdi-shopping</v-icon>
      </v-card>
    </v-card>
  </v-card>
</template>

<script>
import { beautifulTable } from '@/api/restaurantInfoService'

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
  }
}
</script>

<style scoped>

</style>
