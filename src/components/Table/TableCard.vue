<template>
  <div :class="table.inUse?'':' notUsed'"
       style="height: 100%;
       width: 100%;
       position: relative"
       class="pa-1">
    <v-card
        height="100%"
        elevation="0"
        class="tableCard d-flex flex-column align-center justify-center"
        :color="table.inUse?'#fdd3b7':'#f6f6f6'"
        @click='$emit("click",table.tableName)'>
      <div class="personDot" style="position: absolute">
        <template v-for="i in parseInt(table.seatCount)">
          <div :key="i+table.tableName+'person'" class="dot"></div>
        </template>
        <template v-for="i in parseInt(table.childCount)">
          <div :key="i+table.tableName+'child'" class="dot child"></div>
        </template>
      </div>
      <div class="tableCardName">
        {{ table.tableName }}
      </div>

      <template v-if="table.inCall">
        <div style="position:absolute;right: -4px;top: -4px">
          <v-icon color="error">mdi-bell-circle</v-icon>
        </div>
      </template>
      <template v-if="table.inUse">
        <div class="d-flex flex-column align-center">
          <div class="mb-1"
               v-if="tableYSize>=2"
               :style="{
             background:findConsumeTypeColorById(table.consumeType),
             color:colorIsDark(findConsumeTypeColorById(table.consumeType))?'#fff':'#000'}"
               style="
          width: fit-content;
          padding: 4px 4px;
                font-size: 14px;
                border-radius: 4px;
                line-height: 12px;
                font-weight: bold;
                text-align: center">
            {{ findConsumeTypeById(table.consumeType) }}
          </div>
          <div>
            <table-info-display :info-key="table['info0']" :table="table"></table-info-display>
          </div>
          <div class="mt-1">
            <table-info-display :info-key="table['info1']" :table="table"></table-info-display>
          </div>
        </div>
      </template>

    </v-card>
    <div class="chair top"></div>
    <div class="chair left"></div>
    <div class="chair bottom"></div>
    <div class="chair right"></div>

  </div>
</template>

<script>
import { findConsumeTypeById } from '@/oldjs/common'
import { getColorLightness } from '@/oldjs/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { defaultTable } from '@/api/restaurantInfoService'
import TableInfoDisplay from '@/components/Table/TableInfoDisplay'

export default {
  name: 'TableCard',
  components: { TableInfoDisplay },
  props: {
    tableInfo: {}
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
    tableChipList () {
      let allowCount = 1
      if (this.tableXSize > 1 || this.tableYSize > 1) {
        allowCount = 2
      } else if (this.tableXSize >= 2 && this.tableYSize > 1) {
        allowCount = 4
      }
      return Object.keys(this.table)
        .filter(it => it.includes('info') && it.replace('info', '') < allowCount)
    },
    table () {
      const res = Object.assign({}, defaultTable, this.tableInfo)
      res.inUse = res.usageStatus === '1'
      res.inCall = res.callService === '1'
      res.childCount = res.childCount ?? 0
      res.seatCount = res.seatCount ?? 0
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

  border: 3px solid #f6c7bb !important;
  text-align: center;
  box-shadow: 0 0px 12px #FFCC80 !important;
  width: 100%;
  height: 100%;
  border-radius: 12px;
  cursor: pointer;
}

.notUsed .tableCard {
  background: #f6f6f6;
  border: 4px solid #e0e0e0 !important;
  color: #6b6b6b;
  box-shadow: none !important;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
}

.tableBold {
  font-weight: 600;
}

.tableCardName {
  font-size: 26px;
  text-align: center;
  width: 100%;
  z-index: 1;
  font-family: Roboto, "Axure Handwriting", sans-serif;
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notUsed .tableCard .tableCardName {
  font-weight: 600;
  color: grey;
}

.chair {
  --margin: -10px;
  --chairHeight: 8px;
  --chairWidth: 50%;
  z-index: -1;
  position: absolute;
  margin: auto;
  background: #fdd3b7;
}

.notUsed .chair {
  background: #f6f6f6;
}

.chair.top {
  top: var(--margin);
  left: 0;
  right: 0;
  height: var(--chairHeight);
  width: var(--chairWidth);
  border-radius: 16px 16px 0 0;
}

.chair.left {
  left: var(--margin);
  width: var(--chairHeight);;
  height: var(--chairWidth);
  top: 0;
  bottom: 0;
  border-radius: 16px 0 0 16px;
}

.chair.right {
  right: var(--margin);
  width: var(--chairHeight);
  height: var(--chairWidth);
  top: 0;
  bottom: 0;
  border-radius: 0 16px 16px 0;
}

.chair.bottom {
  bottom: var(--margin);
  left: 0;
  right: 0;
  height: var(--chairHeight);
  width: var(--chairWidth);
  border-radius: 0 0 16px 16px;
}

.personDot {
  top: 2px;
  left: 4px;
  right: 4px;
  display: grid;
  grid-template-columns: repeat(auto-fit, 6px);
  grid-gap: 4px;
  z-index: 0;
  position: absolute;

}

.dot {
  background: #689F38;
  height: 6px;
  width: 6px;
  border-radius: 3px;
}

.dot.child {
  background: #FFA726;
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
