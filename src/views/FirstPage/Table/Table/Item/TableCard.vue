<template>
  <div
      :class="table.inUse?'':' notUsed'"
      style="height: 100%;
       width: 100%;
       position: relative"
      class="pa-1"
  >
    <v-card
        height="100%"
        elevation="0"
        class="tableCard d-flex flex-column align-center justify-center lighten-4"
        :color="tableColor"
        @click='$emit("click",table.tableName)'
    >
      <div class="d-flex flex-column align-center justify-center flex-grow-1">
        <div
            class="tableCardName d-flex align-center justify-center"
            :class="table.inUse?'mt-2':''"
        >
          <template v-if="table.inCall">
            <v-icon
                class="mr-1"
                size="18"
            >mdi-bell
            </v-icon>
          </template>
          {{ table.tableName }}
        </div>
        <template v-if="!table.inUse&&displayReservations.length>0">
          <v-btn
              color="grey"
              x-small
              text
              style="font-size: 10px"
              @click.stop="showReservationDialog"
              class="py-1 pa-0 text-caption"
              elevation="0"
          >
            <v-icon
                small
                class="mr-1"
            >mdi-calendar
            </v-icon>
            <span class="font-weight-bold">
              <template v-if="displayReservations.length>1">
            {{ displayReservations.length }} |
          </template>
          </span>

            <template>{{ displayReservations[0].fromDateTime|onlyTime }}</template>
          </v-btn>
        </template>
        <template v-if="table.inUse">
          <template v-if="displayReservations.length>0">
            <v-chip
                small
                color="transparent"
                label
                @click.stop="showReservationDialog"
            >
              <v-icon
                  x-small
                  class="mr-1"
              >mdi-calendar
              </v-icon>
              {{ displayReservations.length }}
            </v-chip>
          </template>
          <div
              class="text-caption"
              v-else-if="table?.h>100"
          >
            {{ findConsumeTypeById(table.consumeType) }}
          </div>
        </template>
      </div>

      <template v-if="table.inUse">

        <div
            class="personDot"
            style="position: absolute"
        >
          <template v-for="i in parseInt(table.seatCount)">
            <div
                :key="i+table.tableName+'person'"
                class="dot"
            ></div>
          </template>
          <template v-for="i in parseInt(table.childCount)">
            <div
                :key="i+table.tableName+'child'"
                class="dot child"
            ></div>
          </template>
        </div>
        <div
            v-for="info in table.infos"
            :key="info"
            style="width: 100%;"
        >
          <table-info-display
              :info-key="info"
              :table="table"
          />
        </div>

      </template>

    </v-card>
  </div>
</template>

<script>
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
    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },
    showReservationDialog () {
      this.$emit('reservation-clicked', this.tableInfo)
    },
    getKeys () {
      return Remember.tableDisplayKeys
    }
  },
  computed: {
    tableCardFontSize () {
      return '20px'
    },
    displayReservations () {
      return this.reservations.filter(it => it.status === 'Confirmed')
    },
    reservations () {
      return this.table?.reservations ?? []
    },
    haveCheckIn () {
      return this.reservations.some(it => it.status === 'CheckIn')
    },
    tableColor () {
      return this.table.inCall ? 'error' : this.table.inUse ? 'rgba(255,216,154,0.8)' : this.haveCheckIn ? 'green' : '#f6f6f6'
    },
    table () {
      const res = Object.assign({}, defaultTable, this.tableInfo)
      res.inUse = res.usageStatus === '1'
      res.inCall = res.callService === '1'
      res.childCount = res.childCount ?? 0
      res.seatCount = res.seatCount ?? 0
      let maxKeyCount = 1
      if (res.h > 120) {
        maxKeyCount = 2
      }
      res.infos = this.getKeys().filter((k, index) => index < maxKeyCount)
      return res
    }
  }
}
</script>

<style
    scoped
    lang="sass"
>
@import '~vuetify/src/styles/styles.sass'

.tableCard
  text-align: center
  width: 100%
  height: 100%
  border-radius: 8px
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
  font-size: 24px
  text-align: center
  width: 100%
  z-index: 1
  font-family: "Axure Handwriting", sans-serif
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
  top: 12px
  left: 12px
  right: 12px
  display: grid
  grid-template-columns: repeat(auto-fit, 6px)
  grid-gap: 4px
  z-index: 0
  position: absolute

.dot
  background: #000
  height: 6px
  width: 6px
  border-radius: 3px

.dot.child
  background: #ffffff

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
