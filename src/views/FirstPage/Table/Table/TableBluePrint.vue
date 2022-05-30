<template>
  <div class="mr-16">
    <div class="flex-grow-1 pa-2"
         ref="blueprintContainer"
         style="
         height:calc(100vh - 64px);
         width: 100%;
       transform-origin: left top;
       background: #e8e8e8;"
         :style="{
          transform:'scale('+scale+')'
       }">

      <template v-for="i in tableWithInfo">
        <vue-draggable-resizable
            class-name-dragging="dragging"
            :min-height="60"
            :min-width="60"
            :max-height="180"
            :max-width="200"
            :prevent-deactivation="false"
            :scaleRation="scale"
            :draggable="editing"
            :resizable="editing"
            :grid="[10,10]"
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
    <div style="position: absolute;left:24px;bottom: 36px">
      <v-card v-if="editing&&showTableEditInfoCard" style="z-index: 100; margin-left: 2px" flat class="pa-3 mb-1">
        <h2>{{ $t('cardDisplayInfoEdit') }}</h2>
        <v-select :items="allKeys" return-object v-model="key1"></v-select>
        <v-select :items="allKeys" return-object v-model="key2"></v-select>
      </v-card>
      <div class="d-flex">
        <v-btn-toggle dense class="mr-2">
          <v-btn @click="scale-=0.05">
            <v-icon>mdi-minus</v-icon>
          </v-btn>
          <v-btn @click="editing=!editing">
            <template v-if="!editing">
              <v-icon>mdi-pencil-box-multiple</v-icon>
            </template>
            <template v-else>
              <v-icon>mdi-content-save</v-icon>
            </template>

          </v-btn>
          <v-btn @click="scale+=0.05">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
          <v-btn v-if="editing" @click="refreshTables">
            <v-icon left>mdi-refresh</v-icon>
            {{ $t('重置所有桌子') }}
          </v-btn>
          <v-btn v-if="editing" @click="showTableEditInfoCard=!showTableEditInfoCard">
            <v-icon>mdi-book-information-variant</v-icon>
          </v-btn>
        </v-btn-toggle>
        <div v-if="editing" class="d-flex align-center" style="width: 96px">0.3x
          <v-slider hide-details :min="0.3" :step="0.01" :max="1" v-model="scale"></v-slider>
          1x
        </div>
      </div>

    </div>
    <v-card
        color="white"
        class="d-flex"
        style="position: absolute;bottom: 36px;
              box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.08);
                right: 0;
                margin: auto;
                width: min-content;
                border-radius: 8px;
                          left: 0;max-width: calc(100vw - 684px);
               ">
      <v-item-group v-dragscroll v-model="currentSectionIndex"
                    mandatory
                    style="display: grid;
                          grid-auto-columns: max-content;
                          grid-gap: 8px;
                          grid-auto-flow: column;overflow-x: scroll">
        <v-item v-slot="{active,toggle}">
          <v-card elevation="0" style="border-radius: 8px"
                  :color="active?'primary':''"
                  class="px-6 py-2 text-body-1" @click="toggle"
                  :dark="active">{{ $t('全部') }}
          </v-card>
        </v-item>
        <v-item v-for="section of notTakeawaySection" :key="section.id+'categorytypes'"
                v-slot="{active,toggle}">
          <v-card :elevation="active?4:0"
                  style="border-radius: 8px"
                  :color="active?'primary':''"
                  class="px-6 py-2 text-body-1" @click="toggle"
                  :dark="active">{{ section.name }}
          </v-card>
        </v-item>
      </v-item-group>
    </v-card>
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
import { getSectionList, setTableLocation } from '@/oldjs/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import debounce from 'lodash-es/debounce'
import { cancelReservation, moveReservation } from '@/api/ReservationService'
import uniqBy from 'lodash-es/uniqBy'
import IKUtils from 'innerken-js-utils'
import TableCard from '@/views/FirstPage/Table/Table/Item/TableCard'
import { Remember } from '@/api/remember'

async function refreshAllTablesPosition (listOfTable, containerHeight, containerWidth, sectionId) {
  IKUtils.showLoading(true)
  const defaultWidth = GlobalConfig.defaultTileWidth
  const defaultHeight = GlobalConfig.defaultTileHeight
  const rowCount = Math.floor(containerHeight / defaultHeight)
  const colCount = Math.floor((containerWidth - 48) / defaultWidth)
  console.log(rowCount, colCount)
  let count = 0
  for (const table of listOfTable) {
    const currentRow = Math.floor(count / colCount)
    const currentCol = count % colCount
    await submitTable(table, currentCol * defaultWidth, currentRow * defaultHeight, defaultWidth - 12, defaultHeight - 12, sectionId)
    count++
  }
  IKUtils.toast()
}

async function submitTable (table, x, y, w, h, currentSectionId) {
  w = w ?? (table.w ?? 50)
  h = h ?? (table.h ?? 50)
  currentSectionId = currentSectionId + ''

  const newCell = Object.assign(table.cells.find(c => c.sectionId === currentSectionId) ?? {
    sectionId: currentSectionId
  }, {
    x: Math.round(x / 10) * 10,
    y: Math.round(y / 10) * 10,
    w: Math.round(w / 10) * 10,
    h: Math.round(h / 10) * 10
  })
  const supplyMentSectionId = currentSectionId === '0' ? table.sectionId : '0'
  console.log(supplyMentSectionId, table, currentSectionId)
  table.cells = uniqBy([table.cells.filter(c => c.sectionId && c.sectionId !== currentSectionId), newCell].flat().map(c => {
    c.sectionId = c.sectionId ?? supplyMentSectionId
    return c
  }), function (c) {
    return c.sectionId
  }
  )
  console.log(table.cells)

  await setTableLocation(table)
}

export default {
  name: 'TableBluePrint',
  components: { TableCard },
  directives: {
    dragscroll
  },
  props: {
    outSideTableList: Array,
    tableBackgroundColorFunc: Function,
    tableColorIsDark: Function,
    returnTableKey: { default: 'tableName' },
    additionalFilter: Function
  },

  computed: {
    tableWithInfo () {
      return this.tableInCurrentSection
    },
    tableInCurrentSection () {
      const filter = t => {
        let res = t.sectionId === this.currentSection?.id
        if (this.currentSectionIndex === 0) {
          res = t.sectionId !== '6'
        }

        if (this.additionalFilter) {
          res = res && this.additionalFilter(t)
        }
        return res
      }
      return this.tableList.filter(filter)
    },
    currentSection () {
      return this.currentSectionIndex !== 0 ? this.notTakeawaySection[this.currentSectionIndex - 1] ?? defaultSection : { id: 0 }
    },
    notTakeawaySection () {
      return this.sectionList.filter(it => it.id !== '6')
    }
  },
  watch: {
    key1 (val) {
      Remember.tableDisplayKeys = [val, Remember.tableDisplayKeys[1]]
    },
    key2 (val) {
      Remember.tableDisplayKeys = [Remember.tableDisplayKeys[0], val]
    },
    async outSideTableList (val) {
      this.tableList = val.map(t => {
        const cell = t.cells.find(c => c.sectionId === this.currentSection.id) ?? t.cells?.[0] ?? {
          x: 0,
          y: 0,
          w: 50,
          h: 50
        }
        t.x = parseInt(cell.x)
        t.y = parseInt(cell.y)
        t.w = parseInt(cell.w)
        t.h = parseInt(cell.h)
        t.w = t.w > 50 ? t.w : GlobalConfig.defaultTileWidth
        t.h = t.h > 50 ? t.h : GlobalConfig.defaultTileHeight
        t.x = t.x ? t.x : 0
        t.y = t.y ? t.y : 0
        return t
      })
    },
    scale (val) {
      Remember.tableBluePrintScale = val
      console.log(' Remember.tableBluePrintScale', Remember.tableBluePrintScale)
    },
    currentSectionIndex () {
      this.$emit('need-refresh')
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
    async refreshSectionList () {
      this.sectionList = (await getSectionList())
        .filter(it => it.tableCount > 0)
    },
    showReservation (e) {
      this.activeTable = e
      this.reservationDialog = true
    },
    async refreshTables () {
      await refreshAllTablesPosition(this.tableList, this.height, this.width, this.currentSection.id)
      this.$emit('need-refresh')
    },
    debounce,
    onResize: function (table, x, y, width, height) {
      this.shouldUpdateSize(table, x, y, width, height, this.currentSection.id)
    },
    onDrag: function (table, x, y) {
      this.shouldUpdateSize(table, x, y, table.w, table.h, this.currentSection.id)
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
      showTableEditInfoCard: false,
      editing: false,
      tableList: [],
      Config: GlobalConfig,
      width: 0,
      height: 0,
      x: 0,
      y: 0,
      scale: parseFloat(Remember.tableBluePrintScale || 1),
      reservationDialog: null,
      activeTable: null,
      currentSectionIndex: 0,
      sectionList: [],
      allKeys: GlobalConfig.tableInfoKeys,
      key1: Remember.tableDisplayKeys[0],
      key2: Remember.tableDisplayKeys[1]
    }
  },
  async mounted () {
    this.$nextTick(async () => {
      this.height = this.$refs.blueprintContainer.clientHeight
      this.width = this.$refs.blueprintContainer.clientWidth - 50
    })
    await this.refreshSectionList()
    console.log(Remember.tableDisplayKeys)
  }
}
</script>

<style scoped lang="sass">
.vdr
  border: none

</style>
