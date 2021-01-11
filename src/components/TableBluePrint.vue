<template>
  <div v-dragscroll
       class="flex-grow-1 pa-2"
       style="display: grid;height: calc(100vh - 96px);overflow: hidden;"
       :style="{
          'grid-template-columns':'repeat('+currentSection.sizeX+',1fr)',
          'grid-template-row':'repeat('+currentSection.sizeY+',1fr)'
       }"
  >
    <template v-for="i in slots">
      <table-block
          @click="slotClicked(i)"
          :key="i.id"
          :is-editing="editing"
          :cell="i"
          :current-state="decideCurrentState(i)"
          :table-info="findTableUseSlot(i)"
          :label="i.label"
      ></table-block>
      <!--      <template v-if="!editing">-->
      <!--        <div :key="i.id"-->
      <!--             :style="{background:!i.tableId?'transparent':'#367aeb'}"-->
      <!--             class="d-flex align-center justify-center item">-->
      <!--          {{ i.label }}-->
      <!--        </div>-->
      <!--      </template>-->
      <!--      <template v-if="editing">-->
      <!--        <template v-if="activeTableId&&activeTable.points.length>0">-->
      <!--          <div @click="slotClicked(i)" :key="i.id"-->
      <!--               :style="{background:!i.tableId?'transparent':-->
      <!--               (i.tableId===activeTableId?'red':'#d0d2d9'),-->
      <!--                border:!i.tableId?'1px dotted #d0d2d9':''}"-->
      <!--               class="d-flex align-center justify-center item">-->
      <!--            <template v-if="!i.tableId&&-->
      <!--            hasConnectToActiveTable(i)-->
      <!--            &&!pointInsideActiveTable(i)">-->
      <!--              +</template>-->
      <!--            {{ i.label }}-->
      <!--          </div>-->
      <!--        </template>-->
      <!--        <template v-else>-->
      <!--          <div @click="slotClicked(i)"-->
      <!--               :key="i.id"-->
      <!--               :style="{-->
      <!--          background:!i.tableId?'transparent':'#d0d2d9',-->
      <!--          border:!i.tableId?'1px dotted #d0d2d9':'',-->
      <!--        }"-->
      <!--               class="d-flex align-center justify-center item">-->
      <!--            <template v-if="!i.tableId">+</template>-->
      <!--            {{ i.label }}-->
      <!--          </div>-->
      <!--        </template>-->
      <!--      </template>-->
    </template>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import { defaultSection } from '@/oldjs/defaultConst'
import IKUtils from 'innerken-js-utils'
import TableBlock from '@/components/TableBlock'

const defaultTable = {
  id: 99,
  points: [],
  centerPoint: {},
  radius: 0,
  tableName: '--'
}

const table = {
  id: 1,
  points: [{ x: 12, y: 12 }, { x: 11, y: 12 }, { x: 11, y: 13 }],
  centerPoint: { x: 12, y: 12 },
  radius: '50px',
  tableName: 'A01'
}

// const slotInfo = {
//   table: null,
//   id: null,
//   connect: {
//     l: false,
//     r: false,
//     t: false,
//     b: false
//   }
// }

export default {
  name: 'TableBluePrint',
  components: { TableBlock },
  directives: {
    dragscroll
  },
  props: {
    showCoordinate: Boolean,
    currentTable: Object,
    currentSection: {
      default: () => defaultSection
    },
    editing: Boolean
  },
  computed: {
    activeTable () {
      return this.tableList.find(t => t.id === this.activeTableId)
    },
    slots () {
      const slot = []
      for (let i = 0; i < this.currentSection.sizeY; i++) {
        for (let t = 0; t < this.currentSection.sizeX; t++) {
          slot.push({ id: i * this.currentSection.sizeX + t, x: t, y: i })
        }
      }
      for (const table of this.tableList) {
        for (const point of table.points) {
          slot[this.findSlotIndexUsePoint(point)].tableId = table.id
          slot[this.findSlotIndexUsePoint(point)] = {
            ...slot[this.findSlotIndexUsePoint(point)],
            ...this.checkConnection(slot[this.findSlotIndexUsePoint(point)], table.points)
          }
        }
        if (table.centerPoint) {
          slot[this.findSlotIndexUsePoint(table.centerPoint)].label = table.tableName
        }
      }
      return slot
    }
  },
  watch: {
    activeTable (val) {
      console.log(val, 'currentTableChanged')
      this.$emit('update:currentTable', val)
    }
  },
  methods: {
    checkConnection (point, graph) {
      return {
        l: this.pointInsideGraph({ x: point.x - 1, y: point.y }, graph),
        r: this.pointInsideGraph({ x: point.x + 1, y: point.y }, graph),
        t: this.pointInsideGraph({ x: point.x, y: point.y - 1 }, graph),
        b: this.pointInsideGraph({ x: point.x, y: point.y + 1 }, graph)
      }
    },
    decideCurrentState (slot) {
      if (this.editing) {
        if (this.activeTableId && this.activeTable.points.length > 0) {
          if (!slot.tableId) {
            if (this.hasConnectToActiveTable(slot) && !this.pointInsideActiveTable(slot)) {
              return 'selectable'
            } else {
              return 'idle'
            }
          } else {
            if (slot.tableId === this.activeTableId) {
              return 'selected'
            } else {
              return 'occupied'
            }
          }
        } else {
          if (slot.tableId) {
            return 'occupied'
          } else {
            return 'selectable'
          }
        }
      } else {
        if (slot.tableId) {
          return 'idle'
        } else {
          return 'nodata'
        }
      }
    },
    findTableUseSlot (slot) {
      return this.tableList.find(t => t.id === slot.tableId)
    },
    submit () {
      this.activeTableId = null
    },
    slotClicked (slot) {
      if (this.editing) {
        if (this.activeTableId) {
          const tableUpdate = this.tableList.find(t => this.activeTableId === t.id)
          if (this.hasConnectToActiveTable(slot)) {
            this.toggleSlotTable(slot, tableUpdate)
          } else {
            this.submit()
          }
        } else {
          if (slot.tableId) {
            this.activeTableId = slot.tableId
          } else {
            const newTable = IKUtils.deepCopy(defaultTable)
            newTable.id = this.tableList.length + 2
            this.tableList.push(newTable)
            this.activeTableId = newTable.id
            this.toggleSlotTable(slot, newTable)
          }
        }
      } else {
        if (slot.tableId) {
          this.$emit('table-clicked', slot.tableId)
        }
      }
    },
    toggleSlotTable (slot, table) {
      if (slot.tableId) {
        if (slot.tableId === table.id) {
          table.points = table.points.filter(p => this.findSlotIndexUsePoint(p) !== slot.id)
          slot.tableId = null
        }
      } else {
        slot.tableId = table.id
        table.points.push(slot)
      }
      this.tableUpdated(table)
    },
    tableUpdated (table) {
      if (table.points.length > 0) {
        if (!table.centerPoint || !this.pointInsideGraph(table.centerPoint, table.points)) {
          table.centerPoint = table.points[0]
        }
      } else {
        table.centerPoint = null
      }
    },
    findGraphEdge (graph) {
      const x = []
      const y = []
      graph.forEach(p => {
        x.push(p.x)
        y.push(p.y)
      })
      return {
        l: Math.min(...x),
        r: Math.max(...x) + 1,
        t: Math.min(...y),
        b: Math.max(...y) + 1
      }
    },
    pointInsideActiveTable (point) {
      return this.pointInsideGraph(point, this.activeTable.points)
    },
    pointInsideGraph (point, graph) {
      return graph.some(p => p.x === point.x && p.y === point.y)
    },
    hasConnectToActiveTable (point) {
      return this.haveConnectToPoints(point, this.activeTable.points)
    },
    haveConnectToPoints (point, points) {
      return points.some(p => this.haveDirectConnectToPoint(point, p))
    },
    haveDirectConnectToPoint (p1, p2) {
      return (Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)) === 1
    },
    findSlotIndexUsePoint (point) {
      return point.y * this.currentSection.sizeX + point.x
    }
  },
  data: function () {
    return {
      showId: false,
      activeTableId: null,
      tableList: [table]
    }
  }
}
</script>

<style scoped>
.item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
