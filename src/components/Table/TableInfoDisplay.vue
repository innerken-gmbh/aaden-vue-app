<template>
  <v-chip small label class="px-1" outlined :class="metaData.classFunc ? metaData.classFunc(table[infoKey]) :''">
    <template v-if="metaData.icon">
      <v-icon class="mr-1" x-small>{{ metaData.icon }}</v-icon>
    </template>
    <span>{{ table[infoKey] }}</span>
  </v-chip>
</template>

<script>
import { TableInfoMetaData } from '@/api/tableService'

export default {
  name: 'TableInfoDisplay',
  props: { infoKey: {}, table: {} },
  computed: {
    metaData () {
      return TableInfoMetaData[this.infoKey]
    }
  }
}
</script>

<style scoped>

</style>
