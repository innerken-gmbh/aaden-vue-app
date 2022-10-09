<template>
  <v-card
      :color="tableBackgroundColor(table)"
      :dark="tableColorIsDark(table)"
      outlined
      @click='$emit("click",table.tableName)'
      elevation="0"
      class="py-1 px-2 mx-1 d-flex align-center justify-lg-space-between"
      style="height: 56px;width: 196px;
             writing-mode: horizontal-tb;" :key="table.id">
    <span style="font-size: 24px;font-weight: bold; overflow: hidden;width: 100px;
  text-overflow: ellipsis;
  white-space: nowrap;">{{ table.tableName }}</span>
    <v-spacer/>
    <div style="text-align: right">
      <div class="caption" v-if="table.consumeType==='1'||table.consumeType==='2'||table.consumeType==='5'">
        {{ table.dishCount }}/{{ table.drinkCount }}/€{{ table.totalPrice }}
      </div>
      <div class="caption d-flex align-center justify-end" v-else>
        <v-icon x-small>mdi-account</v-icon>
        {{ parseInt(table.seatCount)+parseInt(table.childCount) }}/{{ table.drinkCount }}/€{{ table.totalPrice }}
      </div>
      <div class="caption text-right d-flex align-center">
        {{ table.createTimestamp }}/<div
          class="px-1 hideMore"
          style="border-radius: 4px;max-width: 60px;white-space: nowrap;overflow: hidden;text-overflow: ellipsis"
          :style="{
                      background:findConsumeTypeColorById(table.consumeType),
                      color:colorIsDark(findConsumeTypeColorById(table.consumeType))?'#fff':'#000'}"
      >{{ findConsumeTypeById(table.consumeType) }}</div>
      </div>
    </div>
  </v-card>
</template>

<script>
import { findConsumeTypeById } from '@/oldjs/common'
import { getColorLightness } from '@/oldjs/api'
import { defaultTable, getRestaurantInfo } from '@/api/restaurantInfoService'

export default {
  name: 'TableListItem',
  props: {
    tableInfo: {}
  },
  computed: {
    table () {
      const res = Object.assign({}, defaultTable, this.tableInfo)
      res.inUse = res.usageStatus === '1'
      res.inCall = res.callService === '1'
      return res
    }
  },
  methods: {
    tableBackgroundColor (table) {
      return table.inCall ? getRestaurantInfo().callColor : '#ffffff'
    },
    tableColorIsDark (table) {
      return this.colorIsDark(this.tableBackgroundColor(table))
    },
    findConsumeTypeColorById (id) {
      return findConsumeTypeById(id)?.color ?? this.$vuetify.theme.currentTheme.primary
    },
    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },
    colorIsDark (color) {
      return getColorLightness(color) < 128
    }
  }
}
</script>

<style scoped>

</style>
