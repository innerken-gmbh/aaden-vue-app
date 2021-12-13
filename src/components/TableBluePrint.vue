<template>
  <div class="flex-grow-1 pa-2"
       ref="blueprintContainer"
       style="height: calc(100vh - 96px);overflow: hidden;background: center / cover;"
       :style="{
          backgroundImage:'url('+Config.getBase()+currentSection.image+')'
       }">
    <template v-for="i in tablesInCurrentSection">
      <vue-draggable-resizable
          :min-height="70"
          :min-width="70"
          :max-height="200"
          :max-width="200"
          :draggable="editing"
          :resizable="editing"
          :key="i.id"
          :grid="[40,40]"
          :h="i.h" :w="i.w"
          :x="i.x" :y="i.y"
          @activated="selectTable(i)"
          @dragging="(...args)=>onDrag(i,...args)"
          :active="false"
          @resizing="(...args)=>onResize(i,...args)"
          :snap="true"
          :is-conflict-check="true"
          :parent="true">
        <v-card style="height: calc(100% - 16px)" v-if="i.usageStatus==='1'"
                :dark="tableColorIsDark(i)"
                :color="tableBackgroundColorFunc(i)"
                class="pa-2 elevation-1 ma-2">
          {{ i.tableName }}
        </v-card>
        <v-card v-else
                style="height: calc(100% - 16px)"
                class=" pa-2 elevation-1 ma-2">
          {{ i.tableName }}
        </v-card>
      </vue-draggable-resizable>
    </template>

  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import { defaultSection } from '@/oldjs/defaultConst'
import { addNewTable, setTableLocation } from '@/oldjs/api'
import { toast } from '@/oldjs/common'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import debounce from 'lodash-es/debounce'

const limit = 10000

function encodeTwoNumber (a, b) {
  return a * limit + b
}

function decodeNumber (number) {
  return [Math.floor(number / limit), number % limit]
}

async function refreshAllTablesPosition (listOfTable) {
  const defaultWidth = 60
  const defaultHeight = 60
  const colCount = 10
  const rowCount = 10
  let count = 0
  for (const table of listOfTable) {
    const currentCol = count % colCount
    const currentRow = parseInt(count / rowCount)
    await submitTable(table, currentCol * 20, currentRow * 20, defaultHeight, defaultWidth)
    count++
  }
}

async function submitTable (table, x, y, w, h) {
  console.log('input', table.w, table.h, w, h)
  w = w ?? (table.w !== 'auto' ? table.w : 50)
  h = h ?? (table.h !== 'auto' ? table.h : 50)
  console.log('update', table, x, y, w, h)
  table.cells = [{
    tableId: table.id,
    x: encodeTwoNumber(x, w),
    y: encodeTwoNumber(y, h)
  }]
  console.log(table)
  await setTableLocation(table)
}

export default {
  name: 'TableBluePrint',
  directives: {
    dragscroll
  },
  props: {
    currentTable: Object,
    currentSection: {
      default: () => defaultSection
    },
    editing: Boolean,
    outSideTableList: Array,
    tableBackgroundColorFunc: Function,
    tableColorIsDark: Function

  },
  computed: {
    activeTable () {
      return this.tableList.find(t => {
        return parseInt(t.tableId) === parseInt(this.activeTableId)
      })
    },
    tablesInCurrentSection () {
      return this.tableList.map(t => {
        [t.x, t.w] = decodeNumber(t.cells[0]?.x);
        [t.y, t.h] = decodeNumber(t.cells[0]?.y)
        t.w = t.w > 50 ? t.w : 'auto'
        t.h = t.h > 50 ? t.h : 'auto'
        t.x = t.x ? t.x : 0
        t.y = t.y ? t.y : 0
        return t
      })
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
    currentSection () {
      this.tableList = []
      this.$emit('need-refresh')
      this.$emit('update:editing', false)
    }
  },
  methods: {
    async refreshTables () {
      await refreshAllTablesPosition(this.tableList)
    },

    debounce,
    async submit () {
      if (this.activeTableId === -1) {
        this.activeTable.sectionId = this.currentSection.id

        await setTableLocation({
          ...this.activeTable,
          tableId: await addNewTable(this.activeTable)
        })
      } else {
        await setTableLocation(this.activeTable)
      }
      this.$emit('need-refresh')
      toast()

      this.activeTableId = null
    },
    onResize: function (table, x, y, width, height) {
      this.shouldUpdateSize(table, x, y, width, height)
    },
    onDrag: function (table, x, y) {
      console.log(table, x, y, 'drag')
      this.shouldUpdateSize(table, x, y)
    },
    selectTable (table) {
      if (!this.editing) {
        this.$emit('table-clicked', table.tableName)
      } else {

      }
    },
    shouldUpdateSize: debounce(submitTable, 300)

  },
  data: function () {
    return {
      showId: false,
      activeTableId: null,
      tableList: [],
      Config: GlobalConfig,
      width: 0,
      height: 0,
      x: 0,
      y: 0
    }
  },
  async mounted () {
    this.height = this.$refs.blueprintContainer.clientHeight
    this.width = this.$refs.blueprintContainer.clientWidth - 50

    console.log(this.height, this.width)
  }
}
</script>

<style scoped>
.vdr {
  border: none;
}

.vdr.active {
  border: 1px dashed black;
}

.item {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.tableCard {
  width: 100%;
  height: 100%;
  border-radius: 8px;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  box-shadow: 0 6px 8px #d0d2d9;
}

.tableCard.notUsed {
  background: transparent;
  color: #6b6b6b;
  border: 3px solid #e2e3e5;
  box-shadow: none;
}
</style>
