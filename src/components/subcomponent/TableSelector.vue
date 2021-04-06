<template>
  <div
      :style="{
        maxHeight:'calc(100vh - '+extraHeight+')'
      }"
      style="max-height:calc(100vh - 124px); overflow: hidden"
      class="collapse pa-2"
      v-dragscroll
  >
    <div v-bind:key="'area'+area.areaName" v-for="area in areas"
         class="area">
      <div class="areaTitle">{{ area.areaName }}</div>
      <div class="areaTableContainer">
        <template v-for="(table) in area.tables">
          <div v-if="table.usageStatus==='0'||!onlyAvailable" :key="'table'+table.tableName">
            <div v-if="table.usageStatus==='1'" class="tableCard"
                 v-bind:class="{onCall:parseInt(table.callService)===1}"
                 v-on:click='tableSelected(table)'>
              <div class="tableCardName tableBold">{{table.tableName}}
              </div>
            </div>
            <div v-else @click="tableSelected(table)"
                 class="tableCard notUsed">
              <div class="tableCardName">
                {{ table.tableName }}
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { getActiveTables } from 'aaden-base-model/lib/Models/AadenApi'

export default {
  name: 'TableSelector',
  directives: {
    dragscroll
  },
  props: {
    extraHeight: {
      default: '124px'
    },
    onlyAvailable: {
      default: false
    }
  },
  data: function () {
    return {
      Config: GlobalConfig,
      areas: [],
      realShow: null
    }
  },
  methods: {
    async initialMenu () {
      this.areas = await getActiveTables()
    },
    tableSelected (table) {
      this.$emit('table-selected', table)
    }
  }
}
</script>

<style scoped>

</style>
