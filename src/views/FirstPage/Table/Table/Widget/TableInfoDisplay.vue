<template>
  <div
      :class="metaData.classFunc ? metaData.classFunc(table[infoKey]) :''"
      class="d-flex flex-column align-center"
      style="width:fit-content;margin:auto;overflow: hidden;padding: 2px;border-radius: 4px"
  >
    <template v-if="metaData.icon">
      <v-icon small>{{ metaData.icon }}</v-icon>
    </template>
    <div
        style="line-height: 10px;font-size: 10px;border-radius: 2px;width: fit-content;padding: 2px;margin-top: 2px"
        class="text-no-wrap">{{ info }}
    </div>
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
    metaData () {
      return TableInfoMetaData[this.infoKey]
    }
  }
}
</script>

<style scoped>

</style>
