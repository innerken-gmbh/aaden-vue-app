<template>
  <div>
    <div class="flex-grow-1 pa-2"
         ref="blueprintContainer"
         style="
         height:calc(100vh - 64px);
         width: 100%;
       overflow: hidden;
       transform-origin: left top;
       background: #e8e8e8;"
         :style="{
          transform:'scale('+scale+')'
       }">
      <template v-for="i in tableWithInfo">
        <vue-draggable-resizable
            :min-height="80"
            :min-width="60"
            :max-height="180"
            :max-width="180"
            :draggable="editing"
            :resizable="editing"
            :key="i.id"
            :h="i.h" :w="i.w"
            :x="i.x" :y="i.y"
            @dragstop="(...args)=>onDrag(i,...args)"
            @resizestop="(...args)=>onResize(i,...args)"
            :snap="true"
            :parent="true">
          <table-card
              @click="selectTable(i)"
              :table-background-color-func="tableBackgroundColorFunc"
              :table-color-is-dark="tableColorIsDark"
              :table-info="i"
              @reservation-clicked="showReservation"
          ></table-card>
        </vue-draggable-resizable>
      </template>
    </div>
    <!--    工具栏-->
    <div style="position: absolute;left:24px;bottom: 12px">
      <v-btn-toggle rounded>
        <v-btn @click="scale-=0.05">
          <v-icon>mdi-minus</v-icon>
        </v-btn>
        <v-btn @click="editing=!editing">
          <v-icon>mdi-pencil-box-multiple</v-icon>
        </v-btn>
        <v-btn @click="scale+=0.05">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
        <v-btn v-if="editing" @click="refreshTables">
          <v-icon left>mdi-refresh</v-icon>
          {{ $t('重置所有桌子') }}
        </v-btn>
      </v-btn-toggle>
      <div class="d-flex align-center">0.3x
        <v-slider hide-details :min="0.3" :step="0.01" :max="1" v-model="scale"></v-slider>
        1x
      </div>

    </div>
    <v-dialog max-width="400px" v-model="reservationDialog">
      <v-card color="#f6f6f6">
        <v-card-title>本桌后续预定</v-card-title>
        <v-card-text>
          <template v-if="activeTable">
            <div style="display: grid;grid-gap: 12px;overflow-y: scroll;
        grid-auto-flow: row;
                    max-height: calc(100vh - 150px)">
              <v-card
                  v-for="re in activeTable.reservations" :key="re.remoteId" elevation="0"
                  height="100%"
                  class="pa-3 d-flex flex-column">
                <div class="d-flex align-center text-body-1 mt-1">
                  <span style="max-width: 200px" class="text-truncate text-no-wrap">
                    {{ re.title }}
                    {{ re.firstName }}
                    {{ re.lastName }}
                  </span>
                  <v-spacer></v-spacer>
                  <v-chip outlined small>
                    <v-icon left small>mdi-clock-outline</v-icon>
                    {{ re.fromDateTime | onlyTime }} - {{ re.toDateTime | onlyTime }}
                  </v-chip>

                </div>
                <div class="d-flex">
                  <div>
                    <div class="d-flex align-center mt-2">
                      <v-icon small class="mr-3">mdi-phone</v-icon>
                      <div> {{ re.tel }}</div>
                    </div>
                    <div class="d-flex align-center mt-2">
                      <v-icon small class="mr-3">mdi-human-male-female</v-icon>
                      <div> {{ re.personCount }}</div>
                      <v-icon small class="mr-3 ml-4">mdi-human-child</v-icon>
                      <div>{{ re.childCount }}</div>
                    </div>
                  </div>
                  <v-spacer/>
                  <div class="d-flex align-end flex-column">
                    <div class="mt-1">
                      <v-btn @click="cancelReservation(re.id)" small color="error" elevation="0">取消预定</v-btn>
                    </div>
                    <div class="mt-1">
                      <v-btn @click="moveReservation(re.id)" small color="warning" elevation="0">换位置</v-btn>
                    </div>

                  </div>

                </div>
              </v-card>
            </div>

          </template>

        </v-card-text>

      </v-card>

    </v-dialog>

  </div>

</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import { defaultSection } from '@/oldjs/defaultConst'
import { setTableLocation } from '@/oldjs/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import debounce from 'lodash-es/debounce'
import TableCard from '@/components/Table/TableCard'
import { cancelReservation, getCurrentReservation, moveReservation } from '@/api/ReservationService'
import { groupBy } from 'lodash-es'

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
    outSideTableList: Array,
    tableBackgroundColorFunc: Function,
    tableColorIsDark: Function,
    returnTableKey: { default: 'tableName' }

  },

  computed: {
    tableWithInfo () {
      return this.tableList
    }
  },
  watch: {
    async outSideTableList (val) {
      if (!this.editing) {
        const reservations = groupBy(await getCurrentReservation(), 'tableId')
        this.tableList = val.map(t => {
          [t.x, t.w] = decodeNumber(t.cells[0]?.x);
          [t.y, t.h] = decodeNumber(t.cells[0]?.y)
          t.w = t.w > 50 ? t.w : 'auto'
          t.h = t.h > 50 ? t.h : 'auto'
          t.x = t.x ? t.x : 0
          t.y = t.y ? t.y : 0
          t.reservations = reservations[t.tableId] ?? []
          return t
        })
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
    async moveReservation (id) {
      await moveReservation(id)
      this.reservationDialog = false
    },
    async cancelReservation (id) {
      await cancelReservation(id)
      this.reservationDialog = false
    },

    showReservation (e) {
      this.activeTable = e
      this.reservationDialog = true
    },
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
        this.$emit('table-clicked', table[this.returnTableKey])
      } else {
        this.$emit('edit-table-clicked', table)
      }
    },
    shouldUpdateSize: debounce(submitTable, 300)

  },
  data: function () {
    return {
      editing: false,
      tableList: [],
      Config: GlobalConfig,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      scale: GlobalConfig.tableBluePrintScale,
      reservationDialog: null,
      activeTable: null
    }
  },
  async mounted () {
    this.$nextTick(() => {
      this.height = this.$refs.blueprintContainer.clientHeight
      this.width = this.$refs.blueprintContainer.clientWidth - 50
    })
  }
}
</script>

<style scoped>
.vdr {
  border: none;
}

</style>
