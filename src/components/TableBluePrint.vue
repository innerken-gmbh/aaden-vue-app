<template>
  <div v-dragscroll
       class="flex-grow-1 pa-2"
       style="display: grid;height: calc(100vh - 48px);overflow: hidden;"
       :style="{
          'grid-template-columns':'repeat('+currentSection.sizeX+',1fr)',
          'grid-template-row':'repeat('+currentSection.sizeY+',1fr)'
       }"
  >
    <div @click="submit" style="position:absolute;top: 20px;left: 20px;width: 200px;background: #367aeb;color: white">
      {{ activeTableId }}
    </div>
    <template v-for="i in slots">
      <template v-if="currentStatus===BluePrintStatus.Show">
        <div :key="i.id"
             style="width: 100%;height: 100%;"
             :style="{background:i.table==null?'transparent':'red'}"
             class="d-flex align-center justify-center">
          <template v-if="showId">{{ i.id }}</template>
        </div>
      </template>
      <template v-if="currentStatus===BluePrintStatus.Edit">
        <template v-if="activeTableId&&activeTable.points.length>0">
          <div @click="slotClicked(i)" :key="i.id"
               style="width: 100%;height: 100%;"
               :style="{

          background:!i.tableId?'transparent':(i.tableId===activeTableId?'red':'#d0d2d9'),
          border:!i.tableId?'1px dotted #d0d2d9':''
        }"
               class="d-flex align-center justify-center"><template v-if="hasConnectToActiveTable(i)&&!pointInsideActiveTable(i)">+</template></div>
        </template>
        <template v-else>
          <div @click="slotClicked(i)" :key="i.id"
               style="width: 100%;height: 100%;"
               :style="{
          background:!i.tableId?'transparent':'#d0d2d9',
          border:!i.tableId?'1px dotted #d0d2d9':'',

        }"
               class="d-flex align-center justify-center">
            <template v-if="!i.tableId">+</template>
          </div>
        </template>
      </template>
    </template>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import { BluePrintStatus, defaultSection } from '@/oldjs/defaultConst'
import IKUtils from 'innerken-js-utils'

// const point = {
//   x: 0,
//   y: 0,
//   tableId: null
// }

const BorderType = {
  Round: Symbol('round'),
  Tile: Symbol('tile')
}

const defaultTable = {
  id: 99,
  points: [],
  centerPoint: {},
  borderType: BorderType.Tile,
  tableName: 'New Table'
}

const table = {
  id: 1,
  points: [{ x: 12, y: 12 }, { x: 11, y: 12 }, { x: 11, y: 13 }],
  centerPoint: { x: 12, y: 12 },
  borderType: BorderType.Round,
  tableName: '1dwadwada '
}

const tableLabel = {
  l: 0,
  r: 0,
  t: 0,
  b: 0,
  label: ''
}
console.log(tableLabel)

const slotInfo = {
  table: null,
  id: null,
  connect: {
    l: false,
    r: false,
    t: false,
    b: false
  }
}

console.log(slotInfo)
console.log(table)

export default {
  name: 'TableBluePrint',
  directives: {
    dragscroll
  },
  props: {
    currentSection: {
      default: () => defaultSection
    }
  },
  computed: {
    activeTable () {
      return this.tableList.find(t => t.id === this.activeTableId)
    },
    tableLabels () {
      const tableLabels = this.tableList.map(t => ({
        ...this.findGraphEdge(t.points),
        label: t.tableName
      }))
      console.log(tableLabels)
      return tableLabels
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
        }
      }
      return slot
    }
  },
  methods: {
    submit () {
      this.activeTableId = null
    },
    slotClicked (slot) {
      console.log(slot)
      if (this.activeTableId) {
        const tableUpdate = this.tableList.find(t => this.activeTableId === t.id)
        this.toggleSlotTable(slot, tableUpdate)
      } else {
        if (slot.tableId) {
          this.activeTableId = slot.tableId
        } else {
          const newTable = IKUtils.deepCopy(defaultTable)
          newTable.id = this.tableList.length + 2
          console.log(newTable.id)
          this.tableList.push(newTable)
          this.activeTableId = newTable.id
          this.toggleSlotTable(slot, newTable)
        }
      }
    },
    toggleSlotTable (slot, table) {
      if (slot.tableId) {
        if (slot.tableId === table.id) {
          table.points = table.points.filter(p => this.findSlotIndexUsePoint(p) !== slot.id)
          this.tableUpdated(table)
          slot.tableId = null
        }
      } else {
        slot.tableId = table.id
        table.points.push(slot)
      }
    },
    tableUpdated (table) {

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
      currentStatus: BluePrintStatus.Edit,
      BluePrintStatus,
      tableList: [table]
    }
  }
}
</script>

<style scoped>

</style>
