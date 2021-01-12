<template>
  <div v-dragscroll
       class="flex-grow-1 pa-2"
       style="display: grid;height: calc(100vh - 96px);overflow: hidden;"
       :style="{
          'grid-template-columns':'repeat('+currentSection.sizeX+',1fr)',
          'grid-template-row':'repeat('+currentSection.sizeY+',1fr)'
       }">
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
    </template>
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import { defaultSection } from '@/oldjs/defaultConst'
import IKUtils from 'innerken-js-utils'
import TableBlock from '@/components/TableBlock'
import { addNewTable, setTableLocation } from '@/oldjs/api'
import { toast } from '@/oldjs/common'

const defaultTable = {
  tableId: -1,
  cells: [],
  centerPoint: {},
  radius: 4,
  tableName: ''
}

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
    editing: Boolean,
    outSideTableList: Array
  },
  computed: {
    activeTable () {
      return this.tableList.find(t => {
        return parseInt(t.tableId) === parseInt(this.activeTableId)
      })
    },
    slots () {
      const slot = []
      for (let i = 0; i < this.currentSection.sizeY; i++) {
        for (let t = 0; t < this.currentSection.sizeX; t++) {
          slot.push({ id: i * this.currentSection.sizeX + t, x: t, y: i })
        }
      }
      for (const table of this.tableList) {
        for (const point of table.cells) {
          slot[this.findSlotIndexUsePoint(point)].tableId = table.tableId
          slot[this.findSlotIndexUsePoint(point)] = {
            ...slot[this.findSlotIndexUsePoint(point)],
            ...this.checkConnection(point, table.cells)
          }
        }
        if (table.cells.length === 0) {
          table.centerPoint = null
        }
        if (!table.centerPoint && table.cells.length > 0) {
          table.centerPoint = this.findCenterPoint(table.cells)
        }
        if (table.centerPoint) {
          if (slot[this.findSlotIndexUsePoint(table.centerPoint)]) {
            slot[this.findSlotIndexUsePoint(table.centerPoint)].label = table.tableName
          }
        }
      }
      return slot
    }
  },
  watch: {
    currentTable (val) {
      console.log(val, 'outSideCurrentTable')
      if (val?.tableId && val?.tableId !== this.activeTableId) {
        this.submit()
        this.activeTableId = val.tableId
      }
    },
    activeTable (val) {
      console.log(val, 'currentTableChanged')
      if (val) {
        val.centerPoint = this.findCenterPoint(val.cells)
      }
      this.$emit('update:currentTable', val)
    },
    outSideTableList (val) {
      if (!this.editing) {
        this.tableList = val
      }
    },
    currentSection (val) {
      console.log('section Changed')
      this.submit()
      this.tableList = []
      this.$emit('need-refresh')
      this.$emit('update:editing', false)
      console.log('refresh')
    }
  },
  methods: {
    findCenterPoint (graph) {
      if (graph.length > 0) {
        const c = graph.map(p => ({ ...p, connections: this.checkConnection(p, graph) }))
        let maxC = 0
        c.forEach(p => {
          p.count = Object.keys(p.connections).filter(k => p.connections[k]).length
          if (p.count > maxC) {
            maxC = p.count
          }
        })
        return c.find(p => p.count === maxC)
      }
      return null
    },

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
        if (this.activeTableId && this.activeTable.cells.length > 0) {
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
          const table = this.findTableUseSlot(slot)
          if (table.usageStatus === '1') {
            return 'active'
          }
          if (table.callService === '1') {
            return 'call'
          }
          return 'idle'
        } else {
          return 'nodata'
        }
      }
    },
    findTableUseSlot (slot) {
      return this.tableList.find(t => t.tableId === slot.tableId)
    },
    async submit () {
      if (this.activeTable) {
        if (this.activeTableId === -1) {
          this.activeTable.sectionId = this.currentSection.id

          await setTableLocation({ ...this.activeTable, tableId: await addNewTable(this.activeTable) })
        } else {
          await setTableLocation(this.activeTable)
        }
        this.$emit('need-refresh')
        toast()
      }

      this.activeTableId = null
    },
    slotClicked (slot) {
      if (this.editing) {
        if (this.activeTableId) {
          if (this.hasConnectToActiveTable(slot) || this.activeTable.cells.length === 0) {
            this.toggleSlotTable(slot, this.activeTable)
          } else {
            this.submit()
          }
        } else {
          if (slot.tableId) {
            this.activeTableId = slot.tableId
          } else {
            const newTable = IKUtils.deepCopy(defaultTable)
            this.tableList.push(newTable)
            this.activeTableId = newTable.tableId
            this.toggleSlotTable(slot, newTable)
          }
        }
      } else {
        if (slot.tableId) {
          this.$emit('table-clicked', this.findTableUseSlot(slot)?.tableName)
        }
      }
    },
    toggleSlotTable (slot, table) {
      if (slot.tableId) {
        if (slot.tableId === table.tableId) {
          table.cells = table.cells.filter(p => this.findSlotIndexUsePoint(p) !== slot.id)
          slot.tableId = null
        }
      } else {
        slot.tableId = table.tableId
        table.cells.push(slot)
      }
      this.tableUpdated(table)
    },
    tableUpdated (table) {
      if (table.cells.length > 0) {
        if (!table.centerPoint || !this.pointInsideGraph(table.centerPoint, table.cells)) {
          table.centerPoint = table.cells[0]
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
      return this.pointInsideGraph(point, this.activeTable.cells)
    },
    pointInsideGraph (point, graph) {
      return graph.some(p => p.x === point.x && p.y === point.y)
    },
    hasConnectToActiveTable (point) {
      return this.haveConnectToPoints(point, this.activeTable.cells)
    },
    haveConnectToPoints (point, points) {
      return points.some(p => this.haveDirectConnectToPoint(point, p))
    },
    haveDirectConnectToPoint (p1, p2) {
      return (Math.abs(p1.x - p2.x) + Math.abs(p1.y - p2.y)) === 1
    },
    findSlotIndexUsePoint (point) {
      return parseInt(point.y * this.currentSection.sizeX) + parseInt(point.x)
    }
  },
  data: function () {
    return {
      showId: false,
      activeTableId: null,
      tableList: []
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
