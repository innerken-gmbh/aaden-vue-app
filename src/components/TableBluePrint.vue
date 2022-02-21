<template>
  <div>
    <div class="flex-grow-1 pa-2"
         ref="blueprintContainer"
         style="height:1080px;width: 1920px;
       overflow: hidden;transform-origin: left top"
         :style="{
          background:currentSection.image?'no-repeat url('+Config.getBase()+currentSection.image+')':'#f5f5f5',
          transform:'scale('+scale+')'
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
            :h="i.h" :w="i.w"
            :x="i.x" :y="i.y"
            @activated="selectTable(i)"
            @dragstop="(...args)=>onDrag(i,...args)"
            :active="false"
            @resizestop="(...args)=>onResize(i,...args)"
            :snap="true"
            :parent="true">
          <table-card :table-background-color-func="tableBackgroundColorFunc"
                      :table-color-is-dark="tableColorIsDark"
                      :table-info="i"
          ></table-card>
        </vue-draggable-resizable>
      </template>
    </div>
    <v-card class="pa-2" v-if="editing" style="position: absolute;right:224px;bottom: 24px">
      <h1>{{ $t('缩放') }}</h1>
      <div class="d-flex align-center">0.3x
        <v-slider hide-details :min="0.3" :step="0.01" :max="1" v-model="scale"></v-slider>
        1x
      </div>
      <v-btn @click="refreshTables">
        <v-icon left>mdi-refresh</v-icon>
        {{ $t('重置所有桌子') }}
      </v-btn>
    </v-card>

  </div>

</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import { defaultSection } from '@/oldjs/defaultConst'
import { setTableLocation } from '@/oldjs/api'
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
  const defaultWidth = GlobalConfig.defaultTileWidth
  const defaultHeight = GlobalConfig.defaultTileHeight
  const rowCount = Math.floor(containerHeight / defaultHeight)
  const colCount = Math.floor(containerWidth / defaultWidth)
  console.log(rowCount, colCount)
  let count = 0
  for (const table of listOfTable) {
    const currentRow = Math.floor(count / colCount)
    const currentCol = count % colCount
    console.log(currentCol, currentRow)
    await submitTable(table, currentCol * defaultWidth, currentRow * defaultHeight, defaultWidth, defaultHeight)
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
    currentSection: {
      default: () => defaultSection
    },
    editing: Boolean,
    outSideTableList: Array,
    tableBackgroundColorFunc: Function,
    tableColorIsDark: Function

  },
  computed: {
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
    outSideTableList (val) {
      if (!this.editing) {
        this.tableList = val
      }
    },
    currentSection () {
      this.tableList = []
      this.$emit('need-refresh')
      this.$emit('update:editing', false)
    },
    scale (val) {
      GlobalConfig.updateSettings('tableBluePrintScale', val)
    }
  },
  methods: {
    async refreshTables () {
      await refreshAllTablesPosition(this.tableList, this.height, this.width)
    },
    debounce,
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
        this.$emit('edit-table-clicked', table)
      }
    },
    shouldUpdateSize: debounce(submitTable, 300)

  },
  data: function () {
    return {
      tableList: [],
      Config: GlobalConfig,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      scale: GlobalConfig.tableBluePrintScale
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
