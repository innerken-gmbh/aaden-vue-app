<template>
  <v-card
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
    <div>
      <div class="caption">
        {{ table.buffetCount }}/{{ table.drinkCount }}/€{{ table.totalPrice }}
      </div>
      <div class="caption text-right">
        {{ table.createTimestamp }}/<span
          class="pa-1"
          style="border-radius: 4px"
          :style="{
                      background:findConsumeTypeColorById(table.consumeType),
                      color:colorIsDark(findConsumeTypeColorById(table.consumeType))?'#fff':'#000'}"
      >{{ findConsumeTypeById(table.consumeType) }}</span>
      </div>
    </div>
  </v-card>
</template>

<script>
import { findConsumeTypeById } from '@/oldjs/common'
import { getColorLightness } from '@/oldjs/api'

export default {
  name: 'TableListItem',
  props: {
    table: {},
    tableBackgroundColorFunc: Function,
    tableColorIsDark: Function
  },
  methods: {
    findConsumeTypeColorById (id) {
      return findConsumeTypeById(id)?.color ?? '#367aeb'
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
