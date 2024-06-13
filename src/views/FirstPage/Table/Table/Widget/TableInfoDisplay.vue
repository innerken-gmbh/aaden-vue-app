<template>
  <v-card
      elevation="0"
      color="rgba(255,255,255,0.3)"
      :class="metaData.classFunc ? metaData.classFunc(table[infoKey]) :''"
      class="d-flex align-center font-weight-black"
      style="width:fit-content;margin:auto;overflow: hidden;padding: 2px 4px;border-radius: 4px"
  >
    <template v-if="metaData.icon">
      <v-icon x-small left>{{ metaData.icon }}</v-icon>
    </template>
    <div
        class="text-no-wrap text-caption text-truncate font-weight-black">{{ info.length > 5 ? info.slice(0, 5) : info }}
    </div>
  </v-card>
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
    metaData () {
      return TableInfoMetaData[this.infoKey]
    }
  }
}
</script>

<style scoped>

</style>
