<template>
  <div class="d-flex flex-column" style="width: 24px;overflow: hidden"
       :class="metaData.classFunc ? metaData.classFunc(table[infoKey]) :''">
    <template v-if="metaData.icon">
      <v-icon small>{{ metaData.icon }}</v-icon>
    </template>
    <div :style="{fontSize:infoLong?'10px':'12px'}" style="line-height: 18px" class="text-no-wrap">{{ info }}</div>
  </div>
</template>

<script>
import { TableInfoMetaData } from '@/api/tableService'

export default {
  name: 'TableInfoDisplay',
  props: { infoKey: {}, table: {} },
  computed: {
    info () {
      return this.table[this.infoKey]
    },
    infoLong () {
      return this.info.length > 2
    },
    metaData () {
      return TableInfoMetaData[this.infoKey]
    }
  }
}
</script>

<style scoped>

</style>
