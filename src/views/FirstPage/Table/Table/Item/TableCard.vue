<template>
  <div :class="table.inUse?'':' notUsed'"
       style="height: 100%;
       width: 100%;
       position: relative"
       class="pa-1">
    <v-card
        dark
        height="100%"
        elevation="0"
        class="tableCard d-flex flex-column align-center justify-center"
        :color="tableColor"
        @click='$emit("click",table.tableName)'>

      <div class="tableCardName d-flex align-center justify-center" :class="table.inUse?'mt-1':''">
        <template v-if="table.inCall">
          <v-icon class="mr-1" size="18">mdi-bell</v-icon>
        </template>
        {{ table.tableName }}
      </div>
      <template v-if="table.inUse">
        <div class="personDot" style="position: absolute">
          <template v-for="i in parseInt(table.seatCount)">
            <div :key="i+table.tableName+'person'" class="dot"></div>
          </template>
          <template v-for="i in parseInt(table.childCount)">
            <div :key="i+table.tableName+'child'" class="dot child"></div>
          </template>
        </div>
        <div :style="{
             background:findConsumeTypeColorById(table.consumeType)}"
             style="
           position: absolute;
           right: 0px;
           top: 0px;
           padding: 1px 2px;
           color: white;
            font-size: 10px;
           z-index:0;
                border-radius: 4px;">
          {{ findConsumeTypeById(table.consumeType) }}
        </div>
        <div class="d-flex flex-column align-center"
             style="z-index: 2"
        >
          <div class="mt-1" style="display: grid;grid-template-columns: repeat(2,1fr);grid-gap: 2px">
            <div v-for="info in table.infos" :key="info">
              <table-info-display :info-key="info" :table="table"/>
            </div>
          </div>
        </div>
      </template>

      <template v-if="!table.inUse&&table.reservations.length>0">
        <v-btn color="primary lighten-2"
               x-small
               text
               style="font-size: 10px"
               @click.stop="showReservationDialog"
               class="py-1 pa-0"
               elevation="0"
        >
          <v-icon small class="mr-1">mdi-calendar</v-icon>
          <template v-if="table.reservations.length>1">
            {{ table.reservations.length }} |
          </template>
          <template>{{ table.reservations[0].fromDateTime|onlyTime }}</template>
        </v-btn>

      </template>
      <div style="position:absolute;right: -4px;top: -4px">

        <template v-if="table.reservations.length>0&&table.inUse">
          <v-chip @click.stop="showReservationDialog" class="px-2 py-1" small height="min-content" color="warning"
                  elevation="0">
            <v-icon small class="mr-1">mdi-calendar</v-icon>
            {{ table.reservations.length }}
          </v-chip>
        </template>
      </div>
    </v-card>
  </div>
</template>

<script>
import { getColorLightness } from '@/oldjs/api'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { defaultTable } from '@/api/restaurantInfoService'
import { findConsumeTypeById } from '@/oldjs/common'
import TableInfoDisplay from '@/views/FirstPage/Table/Table/Widget/TableInfoDisplay'
import { Remember } from '@/api/remember'

export default {
  name: 'TableCard',
  components: { TableInfoDisplay },
  props: {
    tableInfo: {},
    cardOnly: { default: false }
  },
  methods: {
    findConsumeTypeColorById (id) {
      return findConsumeTypeById(id)?.color ?? this.$vuetify.theme.currentTheme.primary
    },
    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },
    showReservationDialog () {
      this.$emit('reservation-clicked', this.tableInfo)
    },
    colorIsDark (color) {
      return getColorLightness(color) < 128
    },
    getKeys () {
      return Remember.tableDisplayKeys
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
    tableColor () {
      return this.table.inCall ? 'warning' : this.table.inUse ? 'primary' : '#f6f6f6'
    },
    tableChipList () {
      let allowCount = 1
      if (this.tableXSize > 1 || this.tableYSize > 1) {
        allowCount = 2
      } else if (this.tableXSize >= 2 && this.tableYSize > 1) {
        allowCount = 4
      }
      return Object.keys(this.table)
        .filter(it => it.includes('info') && it.replace('info', '') < allowCount)
    },
    table () {
      const res = Object.assign({}, defaultTable, this.tableInfo)
      res.inUse = res.usageStatus === '1'
      res.inCall = res.callService === '1'
      res.childCount = res.childCount ?? 0
      res.seatCount = res.seatCount ?? 0
      const maxKeyCount = 2
      res.infos = this.getKeys().filter((k, index) => index < maxKeyCount)
      return res
    }
  }
}
</script>

<style scoped lang="sass">
@import '~vuetify/src/styles/styles.sass'

.tableCard
  text-align: center
  box-shadow: 0 0px 12px var(--v-primary-lighten3) !important
  width: 100%
  height: 100%
  border-radius: 12px
  cursor: pointer

.notUsed .tableCard
  background: #f6f6f6
  color: #6b6b6b
  box-shadow: none !important
  display: flex
  justify-content: center
  align-items: center
  flex-wrap: nowrap

.tableBold
  font-weight: 600

.tableCardName
  font-size: 26px
  text-align: center
  width: 100%
  z-index: 1
  font-family: Roboto, "Axure Handwriting", sans-serif
  font-weight: 600
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.notUsed .tableCard .tableCardName
  font-weight: 600
  color: grey

.chair
  --margin: -10px
  --chairHeight: 8px
  --chairWidth: 50%
  z-index: -1
  position: absolute
  margin: auto
  background: #fdd3b7

.notUsed .chair
  background: #f6f6f6

.chair.top
  top: var(--margin)
  left: 0
  right: 0
  height: var(--chairHeight)
  width: var(--chairWidth)
  border-radius: 16px 16px 0 0

.chair.left
  left: var(--margin)
  width: var(--chairHeight)
  height: var(--chairWidth)
  top: 0
  bottom: 0
  border-radius: 16px 0 0 16px

.chair.right
  right: var(--margin)
  width: var(--chairHeight)
  height: var(--chairWidth)
  top: 0
  bottom: 0
  border-radius: 0 16px 16px 0

.chair.bottom
  bottom: var(--margin)
  left: 0
  right: 0
  height: var(--chairHeight)
  width: var(--chairWidth)
  border-radius: 0 0 16px 16px

.personDot
  top: 8px
  left: 8px
  right: 36px
  display: grid
  grid-template-columns: repeat(auto-fit, 6px)
  grid-gap: 4px
  z-index: 0
  position: absolute

.dot
  background: #689F38
  height: 6px
  width: 6px
  border-radius: 3px

.dot.child
  background: #FFA726

.dragging .tableCard
  box-shadow: 1px 3px 12px rgba(0, 0, 0, 0.11) !important

.tableIconRow
  width: 42px
  height: 25px
  display: flex
  align-items: center
  font-size: 16px
  font-weight: 400

</style>
