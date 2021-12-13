<template>
  <div class="flex-grow-1 pa-2"
       ref="blueprintContainer"
       style="height: calc(100vh - 48px);overflow: hidden;background: center / cover;"
       :style="{
          backgroundImage:'url('+Config.getBase()+currentSection.image+')'
       }">
    <template v-for="i in tablesInCurrentSection">
      <vue-draggable-resizable
          :min-height="60"
          :min-width="60"
          :max-height="120"
          :max-width="120"
          :draggable="editing"
          :resizable="editing"
          :key="i.id"
          :grid="[20,20]"
          :h="i.h" :w="i.w"
          :x="i.x" :y="i.y"
          @activated="selectTable(i)"
          @dragstop="(...args)=>onDrag(i,...args)"
          :active="false"
          @resizestop="(...args)=>onResize(i,...args)"
          :snap="true"
          :is-conflict-check="true"
          :parent="true">
        <table-card :table-background-color-func="tableBackgroundColorFunc"
                    :table-color-is-dark="tableColorIsDark"
                    :table-info="i"
        ></table-card>
      </vue-draggable-resizable>
    </template>
    <v-btn @click="refreshTables" fab bottom right absolute style="bottom: 24px" v-if="editing">
      Refresh
    </v-btn>

  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import { defaultSection } from '@/oldjs/defaultConst'
import { addNewTable, setTableLocation } from '@/oldjs/api'
import { toast } from '@/oldjs/common'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import debounce from 'lodash-es/debounce'
import TableCard from '@/components/Table/TableCard'

const limit = 10000

function encodeTwoNumber (a, b) {
  return a * limit + b
}

function decodeNumber (number) {
  return [Math.floor(number / limit), number % limit]
}

async function refreshAllTablesPosition (listOfTable, containerHeight, containerWidth) {
  const minSize = GlobalConfig.minTileSize
  const defaultWidth = minSize
  const defaultHeight = minSize
  const rowCount = Math.floor(containerHeight / minSize)
  const colCount = Math.floor(containerWidth / minSize)
  console.log(rowCount, colCount)
  let count = 0
  for (const table of listOfTable) {
    const currentRow = Math.floor(count / colCount)
    const currentCol = count % colCount
    console.log(currentCol, currentRow)
    await submitTable(table, currentCol * minSize, currentRow * minSize, defaultHeight, defaultWidth)
    count++
  }
}

async function submitTable (table, x, y, w, h) {
  w = w ?? (table.w !== 'auto' ? table.w : 50)
  h = h ?? (table.h !== 'auto' ? table.h : 50)

  table.cells = [{
    tableId: table.id,
    x: encodeTwoNumber(x, w),
    y: encodeTwoNumber(y, h)
  }]

  await setTableLocation(table)
}

export default {
  name: 'TableBluePrint',
  components: { TableCard },
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
      await refreshAllTablesPosition(this.tableList, this.height, this.width)
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
    this.$nextTick(() => {
      this.height = this.$refs.blueprintContainer.clientHeight
      this.width = this.$refs.blueprintContainer.clientWidth - 50

      console.log(this.height, this.width)
    })
  }
}
</script>

<style scoped>
.vdr {
  border: none;
}

.vdr.active {
  border: 1px solid black;
}
</style>
