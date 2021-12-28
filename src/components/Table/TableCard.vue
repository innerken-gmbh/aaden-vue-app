<template>
  <div v-bind:key="table.name" style="height: 100%;width: 100%" class="pa-1">
    <v-card
        class="tableCard"
        tile
        style="position: relative"
        v-if="table.inUse"
        :color="tableBackgroundColor(table)"
        :dark="tableColorIsDark(table)"
        @click='$emit("click",table.tableName)'>
      <div
          v-if="tableYSize>=1.5"
          :style="{
             background:findConsumeTypeColorById(table.consumeType),
             color:colorIsDark(findConsumeTypeColorById(table.consumeType))?'#fff':'#000'}"
          style="
          padding: 4px 0;
                font-size: 14px;
                border-radius: 4px;
                line-height: 12px;
                font-weight: bold;
                text-align: center">
        {{ findConsumeTypeById(table.consumeType) }}
      </div>
      <div class="tableCardName">
        {{ table.tableName }}
      </div>
      <div
          class="pb-1"
      >
        <div class="text" style="
           line-height: 16px;
           font-size: 14px;
        ">
          <table-info-display :info-key="table['info0']" :table="table"></table-info-display>
          <template v-if="tableXSize>=2">/
            <table-info-display :info-key="table['info1']" :table="table"></table-info-display>
          </template>
        </div>
        <div v-if="tableYSize>1" class="text" style="line-height: 16px;font-size: 14px">
          <template v-if="['1','2','3','5'].includes(table.consumeType)">
            <table-info-display :info-key="table['info2']" :table="table"></table-info-display>
            <template v-if="tableXSize>=2">/
              <table-info-display :info-key="table['info3']" :table="table"></table-info-display>
            </template>
          </template>
          <template v-else>
            <span>
               <table-info-display :info-key="table['info4']" :table="table"></table-info-display>
            </span>
            <template v-if="tableXSize>1">/<span>
             <table-info-display :info-key="table['info5']" :table="table"></table-info-display>
            </span>
            </template>
          </template>
        </div>
      </div>
    </v-card>
    <div v-else @click="$emit('click',table.tableName)"
         class="tableCard notUsed">
      <div class="tableCardName">
        {{ table.tableName }}
      </div>
    </div>
  </div>
</template>

<script>
import { findConsumeTypeById } from '@/oldjs/common'
import { getColorLightness } from '@/oldjs/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { defaultTable, getRestaurantInfo } from '@/api/restaurantInfoService'
import TableInfoDisplay from '@/components/Table/TableInfoDisplay'

export default {
  name: 'TableCard',
  components: { TableInfoDisplay },
  props: {
    tableInfo: {}
  },
  methods: {
    tableBackgroundColor (table) {
      return table.inCall ? (getRestaurantInfo()).callColor : (getRestaurantInfo()).tableColor
    },
    tableColorIsDark (table) {
      return this.colorIsDark(this.tableBackgroundColor(table))
    },
    findConsumeTypeColorById (id) {
      return findConsumeTypeById(id)?.color ?? '#367aeb'
    },
    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },
    colorIsDark (color) {
      return getColorLightness(color) < 128
    },
    getKeys () {
      return GlobalConfig.getTableInfoKeys()
    }
  },
  computed: {
    tableXSize () {
      const minSize = GlobalConfig.minTileSize
      return this.table.w / minSize
    },
    tableYSize () {
      const minSize = GlobalConfig.minTileSize
      return this.table.h / minSize
    },
    tableCardFontSize () {
      return '20px'
    },
    table () {
      const res = Object.assign({}, defaultTable, this.tableInfo)
      res.inUse = res.usageStatus === '1'
      res.inCall = res.callService === '1'
      let keyCount = 0
      for (const key of this.getKeys()) {
        res['info' + keyCount] = key
        keyCount++
      }
      return res
    }
  }
}
</script>

<style scoped>

.tableCard {
  text-align: center;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 6px 8px #d0d2d9;
}

.tableCard.notUsed {
  background: #f6f6f6;
  border: 4px dashed #e0e0e0;
  color: #6b6b6b;
  box-shadow: none;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}

.tableBold {
  font-weight: 600;
}

.tableCardName {
  font-size: 24px;
  text-align: center;
  width: 100%;
  font-family: Roboto, "Axure Handwriting", sans-serif;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tableCard.notUsed .tableCardName {
  font-weight: 400;
}

.tableIconRow {
  width: 42px;
  height: 25px;
  display: flex;
  align-items: center;
  font-size: 16px;
  font-weight: 400;
}

</style>
