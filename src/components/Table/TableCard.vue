<template>
  <div v-bind:key="table.name" style="height: 100%;width: 100%" class="pa-1">
    <v-card
        class="tableCard"
        tile
        style="position: relative"
        v-if="table.inUse"
        :color="tableBackgroundColorFunc(table)"
        :dark="tableColorIsDark(table)"
        @click='$emit("click",table.tableName)'>
      <div
          class="mt-1"
          v-if="tableYSize>=1.5"
          :style="{
             background:findConsumeTypeColorById(table.consumeType),
             color:colorIsDark(findConsumeTypeColorById(table.consumeType))?'#fff':'#000'}"
          style="
                font-size: 14px;
                border-radius: 4px;
                line-height: 12px;
                font-weight: bold;
                text-align: center">
        {{ findConsumeTypeById(table.consumeType) }}
      </div>
      <v-sheet
          :color="tableBackgroundColorFunc(table)"
          :dark="tableColorIsDark(table)"
          class="pb-1"
      >
        <div :style="{fontSize:tableCardFontSize+'px'}"
             class="tableCardName">
          {{ table.tableName }}
        </div>
        <div class="text" style="line-height: 16px;font-size: 14px">
          {{ table.createTimestamp }}
          <template v-if="tableXSize>=2">/{{ table.servantName }}</template>
        </div>
        <div v-if="tableYSize>1" class="text" style="line-height: 16px;font-size: 14px">
          <template v-if="['1','2','3','5'].includes(table.consumeType)">
          <span :class="parseInt(table.dishCount)===0?' alert':''"><v-icon x-small>mdi-silverware-fork-knife</v-icon>
          <span class="ml-1">{{ table.dishCount === null ? 0 : table.dishCount }}</span></span>
            <template v-if="tableXSize>=2">/
              <v-icon x-small>mdi-currency-eur</v-icon>
              <span>{{ table.totalPrice }}</span></template>
          </template>
          <template v-else>
            <span>
              <v-icon x-small>mdi-account-outline</v-icon>
              <span class="ml-1">{{ table.seatCount }}</span>
            </span>
            <template v-if="tableXSize>1">/<span>
              <v-icon x-small>mdi-human-child</v-icon>
              <span class="ml-1">{{ table.childCount }}</span>
            </span></template>
          </template>
        </div>
      </v-sheet>
    </v-card>
    <div v-else @click="$emit('click',table.tableName)"
         class="tableCard notUsed">
      <div :style="{fontSize:tableCardFontSize+'px'}"
           class="tableCardName">
        {{ table.tableName }}
      </div>
    </div>
  </div>
</template>

<script>
import { findConsumeTypeById } from '@/oldjs/common'
import { getColorLightness } from '@/oldjs/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

const defaultTable = {
  tableName: '1',
  usageStatus: '1',
  callService: '0'
}

export default {
  name: 'TableCard',
  props: {
    tableInfo: {},
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
