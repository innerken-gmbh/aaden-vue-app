<template>
  <div>
    <div
      ref="blueprintContainer"
      class="flex-grow-1 pa-2"
      style="
         height:calc(100vh - 64px);
         width: 100%;
       transform-origin: left top;
     "
    >
      <template v-if="tableWithInfo.length===0">
        <div
          style="height: calc(100vh - 72px);width: 100%"
          class="d-flex align-center justify-center"
        >
          <v-progress-circular indeterminate></v-progress-circular>
        </div>
      </template>
      <template v-else>
        <template v-if="Config.showTableList">
          <div style="display: grid;grid-template-columns: repeat(auto-fill,minmax(0,100px));grid-auto-rows: 140px">
            <table-card
              v-for="i in tableWithInfo"
              :key="i.id"
              :table-background-color-func="tableBackgroundColorFunc"
              :table-color-is-dark="tableColorIsDark"
              :table-info="i"
              @click="selectTable(i)"
              @reservation-clicked="showReservation"
            ></table-card>
          </div>
        </template>
        <template
          v-for="i in tableWithInfo"
          v-else
        >
          <vue-draggable-resizable
            :key="i.id"
            :draggable="editing"
            :grid="[10,10]"
            :h="i.h"
            :max-height="240"
            :max-width="200"
            :min-height="60"
            :min-width="60"
            :parent="true"
            :prevent-deactivation="false"
            :resizable="editing"
            :snap="true"
            :w="i.w"
            :x="i.x"
            :y="i.y"
            class-name-dragging="dragging"
            @dragstop="(...args)=>onDrag(i,...args)"
            @resizestop="(...args)=>onResize(i,...args)"
          >
            <table-card
              :table-background-color-func="tableBackgroundColorFunc"
              :table-color-is-dark="tableColorIsDark"
              :table-info="i"
              @click="selectTable(i)"
              @reservation-clicked="showReservation"
            ></table-card>
          </vue-draggable-resizable>
        </template>
      </template>

    </div>

    <!--    工具栏-->
    <div style="position: absolute;left:24px;bottom: 36px">
      <v-card
        v-if="editing&&showTableEditInfoCard"
        class="pa-3 mb-1"
        flat
        style="z-index: 100; margin-left: 2px"
      >
        <h2>{{ $t("EditDisplayCardInfo") }}</h2>
        <v-select
          v-model="key1"
          :items="allKeys"
          return-object
        ></v-select>
        <v-select
          v-model="key2"
          :items="allKeys"
          return-object
        ></v-select>
      </v-card>
      <div class="d-flex">
        <v-btn-toggle
          class="mr-2"
          dense
        >
          <template v-if="!editing">
            <v-btn @click="enterEditing">
              <v-icon>mdi-pencil-box-multiple</v-icon>
            </v-btn>
          </template>
          <template v-else>
            <v-btn @click="saveLayoutAndLeave">
              <v-icon>mdi-content-save</v-icon>
            </v-btn>
          </template>

          <v-btn
            v-if="editing"
            @click="largeView"
          >
            {{ $t("SizeBig") }}
          </v-btn>
          <v-btn
            v-if="editing"
            @click="refreshTables"
          >
            {{ $t("SizeMedium") }}
          </v-btn>
          <v-btn
            v-if="editing"
            @click="smallView"
          >
            {{ $t("SizeSmall") }}
          </v-btn>

          <v-btn
            v-if="editing"
            @click="showTableEditInfoCard=!showTableEditInfoCard"
          >
            <v-icon>mdi-book-information-variant</v-icon>
          </v-btn>
        </v-btn-toggle>
      </div>

    </div>
    <v-card
      class="d-flex"
      color="white"
      style="position: absolute;bottom: 36px;
              box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.08);
                right: 0;
                margin: auto;
                width: min-content;
                border-radius: 8px;
                          left: 0;max-width: calc(100vw - 684px);
               "
    >
      <v-item-group
        v-dragscroll
        mandatory
        style="display: grid;
                          grid-auto-columns: max-content;
                          grid-gap: 8px;
                          grid-auto-flow: column;overflow-x: scroll"
      >
        <v-item v-slot="{active,toggle}">
          <v-card
            v-if="Config.showAllTableButton"
            :color="active?'primary':''"
            :dark="active"
            class="px-6 py-2 text-body-1"
            elevation="0"
            style="border-radius: 8px"
            @click="activeSectionId=-1;toggle()"
          >{{ $t("All") }}
          </v-card>
        </v-item>
        <v-item
          v-for="section of notTakeawaySection"
          :key="section.id+'categorytypes'"
          v-slot="{active,toggle}"
        >
          <v-card
            :color="active?'primary':''"
            :dark="active"
            :elevation="active?4:0"
            class="px-6 py-2 text-body-1"
            style="border-radius: 8px"
            @click="activeSectionId=section.id;toggle()"
          >{{ section.name }}
          </v-card>
        </v-item>
      </v-item-group>
    </v-card>
    <v-dialog
      v-model="reservationDialog"
      max-width="600px"
    >
      <v-card color="#f6f6f6">
        <v-card-title>{{ $t("FollowingTableReservation") }}</v-card-title>
        <v-card-text>
          <template v-if="activeTable">
            <div
              style="display: grid;grid-gap: 12px;overflow-y: scroll;
        grid-auto-flow: row;
                    max-height: calc(100vh - 150px)"
            >
              <v-card
                v-for="re in activeTable.reservations"
                :key="re.remoteId"
                class="pa-3 d-flex flex-column"
                elevation="0"
                height="100%"
              >
                <div class="d-flex align-center text-body-1">
                  <span
                    class="text-truncate text-no-wrap d-flex"
                    style="max-width: 200px"
                  >
                    <div class="font-weight-black mr-2">{{ re.personCount }} P</div>
                    {{ re.title }}

                    {{ re.firstName }}
                    {{ re.lastName }}
                  </span>
                  <v-spacer></v-spacer>
                  <v-chip
                    outlined
                    small
                  >
                    <v-icon
                      left
                      small
                    >mdi-clock-outline
                    </v-icon>
                    {{ re.fromDateTime | onlyTime }} - {{ re.toDateTime | onlyTime }}
                  </v-chip>

                </div>
                <div class="d-flex align-center mt-2">
                  <div> {{ re.tel }}</div>
                </div>
                <div class="d-flex mt-2">

                  <v-btn
                    color="error"
                    elevation="0"
                    small
                    @click="cancelReservation(re.id)"
                  >
                    {{ $t("CancelReservation") }}
                  </v-btn>
                  <template v-if="re.status==='Created'">
                    <v-btn
                      class="ml-2"
                      color="success"
                      elevation="0"
                      small
                      @click="confirm(re.id)"
                    >
                      {{ $t("Confirm") }}
                    </v-btn>
                  </template>
                  <template v-else>
                    <div
                      v-if="showChangeButton === 1"
                      class="ml-2"
                    >
                      <v-btn
                        color="warning"
                        elevation="0"
                        small
                        @click="moveReservation(re.id,activeTable.tableId)"
                      >
                        {{ $t("ChangePosition") }}
                      </v-btn>
                    </div>
                    <v-btn
                      v-if="re.status==='Confirmed'"
                      class="ml-2"
                      color="success"
                      elevation="0"
                      small
                      @click="checkIn(re.id)"
                    >
                      {{ $t("checkIn") }}
                    </v-btn>

                  </template>

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
import { cancelReservation, checkIn, confirmReservation, moveReservation } from '@/api/ReservationService'
import uniqBy from 'lodash-es/uniqBy'
import IKUtils from 'innerken-js-utils'
import TableCard from '@/views/FirstPage/Table/Table/Item/TableCard'
import { Remember } from '@/api/remember'
import { showSuccessMessage } from '@/api/api'
import i18n from '@/i18n'

async function refreshAllTablesPosition (listOfTable, containerHeight, containerWidth, sectionId, width, height) {
  IKUtils.showLoading(true)
  const defaultWidth = width ?? GlobalConfig.defaultTileWidth
  const defaultHeight = height ?? GlobalConfig.defaultTileHeight
  const colCount = Math.floor((containerWidth - 48) / defaultWidth)
  let count = 0
  const tablesListSorted = listOfTable.sort((a, b) => {
    return a.tableName.localeCompare(b.tableName, undefined, {
      numeric: true,
      sensitivity: 'base'
    })
  })
  for (const table of tablesListSorted) {
    const currentRow = Math.floor(count / colCount)
    const currentCol = count % colCount
    await submitTable(table, currentCol * defaultWidth, currentRow * defaultHeight, defaultWidth - 12, defaultHeight - 12, sectionId)
    count++
  }
  showSuccessMessage(i18n.t('Success'))
}
const tableChanges = {}

async function submitTable (table, x, y, w, h, currentSectionId) {
  console.log(table, x, y, w, h, currentSectionId)
  console.log(table.x, table.y, table.w, table.h)
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

  table.cells = uniqBy([table.cells.filter(c => c.sectionId && c.sectionId !== currentSectionId), newCell]
    .flat().map(c => {
      c.sectionId = c.sectionId ?? supplyMentSectionId
      return c
    }), function (c) {
    return c.sectionId
  }
  )
  await setTableLocation(table)
}

export default {
  name: 'TableBluePrint',
  components: { TableCard },
  directives: {
    dragscroll
  },
  props: {
    showChangeButton: { default: 1 },
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
        if (this.activeSectionId === -1 && GlobalConfig.showAllTableButton) {
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
      console.log(this.activeSectionId)
      if (GlobalConfig.showAllTableButton) {
        return (this.activeSectionId !== -1) ? this.notTakeawaySection.find(it => it.id === this.activeSectionId) ?? defaultSection : { id: 0 }
      } else {
        return this.notTakeawaySection.find(it => it.id === this.activeSectionId)
      }
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
        const sectionId = this.currentSection?.id ?? 0
        const cell = t.cells.find(c => c.sectionId === sectionId) ?? t.cells?.[0] ?? {
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
    activeSectionId () {
      this.$emit('need-refresh')
    }
  },
  methods: {
    enterEditing () {
      this.refreshBlueprintSize()
      this.editing = true
    },
    async saveLayoutAndLeave () {
      IKUtils.showLoading()
      for (const changes of Object.values(tableChanges)) {
        await submitTable(changes.table, changes.x, changes.y, changes.w, changes.h, this.currentSection.id)
      }
      IKUtils.toast('ok')
      this.editing = false
      this.$emit('need-refresh')
    },
    async checkIn (id) {
      await checkIn(id)
      this.reservationDialog = false
      this.$emit('need-refresh')
    },
    async confirm (id) {
      await confirmReservation(id)
      this.reservationDialog = false
      this.$emit('need-refresh')
    },
    async moveReservation (id, tableId) {
      await moveReservation(id, tableId)
      this.reservationDialog = false
      this.$emit('need-refresh')
    },
    async cancelReservation (id) {
      await cancelReservation(id)
      this.reservationDialog = false
      this.$emit('need-refresh')
    },
    async refreshSectionList () {
      this.sectionList = (await getSectionList())
        .filter(it => it.tableCount > 0)
      if (!GlobalConfig.showAllTableButton) {
        this.activeSectionId = this.sectionList[0].id
      }
    },
    showReservation (e) {
      this.activeTable = e
      this.reservationDialog = true
    },
    async largeView () {
      await refreshAllTablesPosition(this.tableInCurrentSection,
        this.height,
        this.width,
        this.currentSection.id, 120, 140)
      this.editing = false
      this.$emit('need-refresh')
    },
    async smallView () {
      await refreshAllTablesPosition(this.tableInCurrentSection,
        this.height,
        this.width,
        this.currentSection.id, 100, 100)
      this.editing = false
      this.$emit('need-refresh')
    },
    async refreshTables () {
      await refreshAllTablesPosition(this.tableInCurrentSection, this.height, this.width, this.currentSection.id)
      this.editing = false
      this.$emit('need-refresh')
    },
    debounce,
    onResize: function (table, x, y, width, height) {
      tableChanges[table.tableId] = {
        x, y, w: width, h: height, table
      }
    },
    onDrag: function (table, x, y) {
      const w = tableChanges?.[table.tableId]?.w ?? table.w
      const h = tableChanges?.[table.tableId]?.h ?? table.h
      tableChanges[table.tableId] = {
        x, y, w, h, table
      }
    },
    refreshBlueprintSize: function () {
      this.$nextTick(async () => {
        await IKUtils.wait(100)
        this.height = this.$refs.blueprintContainer.clientHeight
        this.width = this.$refs.blueprintContainer.clientWidth - 50
      })
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
      reservationDialog: null,
      activeTable: null,
      activeSectionId: -1,
      sectionList: [],
      allKeys: GlobalConfig.tableInfoKeys,
      key1: Remember.tableDisplayKeys[0],
      key2: Remember.tableDisplayKeys[1]
    }
  },
  async mounted () {
    this.refreshBlueprintSize()
    await this.refreshSectionList()
  }
}
</script>

<style
  lang="sass"
  scoped
>
.vdr
  border: none

</style>
