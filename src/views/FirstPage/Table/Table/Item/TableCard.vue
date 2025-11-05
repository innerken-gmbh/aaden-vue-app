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
      <v-icon
          v-if="table.consumeTypeStatusId === '1'"
          class="alert-icon"
          color="error"
          size="18"
      >mdi-alert-circle
      </v-icon>
      <div
          class="d-flex align-center justify-center flex-grow-1"
          :class="table.inUse?'mt-3':''"
      >
        <div
            class="tableCardName"

        >
          {{ table.tableName }}
          <template v-if="table.inCall">
            <v-icon
                class="mr-1"
                size="18"
            >mdi-bell
            </v-icon>
          </template>

        </div>
      </div>

      <div style="width: 100%">
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
              style="font-size: 9px;text-align: right;width: 100%;"
              class="pa-1 text-no-wrap text-truncate font-weight-black"
              v-if="table?.h>100"
          >
            {{ findConsumeTypeById(table.consumeType) }}
          </div>
          <div style="display: grid;grid-template-columns: repeat(2,minmax(0,1fr))">
            <div
                v-for="(info,index) in table.infos"
                :key="info + index"
                style="width: 100%;"
            >
              <table-info-display
                  :info-key="info"
                  :table="table"
              />
            </div>
          </div>

        </template>
        <template v-if="displayReservations.length>0">
          <v-card
              @click.stop="showReservationDialog"
              dark
              class="d-flex px-2 py-1 align-center"

              :color="haveNotConfirmed?'red':'rgba(0,0,0,.3)'"
              width="100%"
              elevation="0"
          >
            <v-icon
                class="mt-1 mr-1"
                size="14"
            >mdi-calendar
            </v-icon>
            <div class="text-body-2">{{ displayReservations.length }}</div>
            <v-spacer></v-spacer>
            <div class="text-caption">@{{ displayReservations[0].fromDateTime|onlyTime }}</div>

          </v-card>
        </template>
      </div>

    </v-card>
  </div>
</template>

<script>
import { defaultTable } from '@/api/restaurantInfoService'
import { findConsumeTypeById } from '@/oldjs/common'
import TableInfoDisplay from '@/views/FirstPage/Table/Table/Widget/TableInfoDisplay'
import { Remember } from '@/api/remember'
import store from '@/store'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'

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
      if (this.displayReservations.length > 0) {
        this.$emit('reservation-clicked', this.tableInfo)
      }
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
      return this.reservations.filter(it => it.status === 'Confirmed' || it.status === 'Created')
    },
    reservations () {
      return this.table?.reservations ?? []
    },
    haveNotConfirmed () {
      return this.reservations.some(it => it.status === 'Created')
    },
    haveCheckIn () {
      return this.reservations.some(it => it.status === 'CheckIn')
    },
    tableColor () {
      const defaultColor = '#f6f6f6'
      const colorTableInUse = 'rgba(255,216,154,0.8)'
      const colorTableHaveCheckIn = 'green'

      if (this.table.inCall) {
        return GlobalConfig.userTableColor === '1' ? store.state.tableColor : 'error'
      }

      if (this.table.inUse) {
        return colorTableInUse
      }

      if (this.haveCheckIn) {
        return colorTableHaveCheckIn
      }

      return defaultColor
    },
    table () {
      const res = Object.assign({}, defaultTable, this.tableInfo)
      res.inUse = res.usageStatus === '1'
      res.inCall = res.callService === '1'
      res.childCount = res.childCount ?? 0
      res.seatCount = res.seatCount ?? 0
      let maxKeyCount = 1

      maxKeyCount = 2

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
  font-weight: 900
  overflow: hidden
  text-overflow: ellipsis
  white-space: nowrap

.notUsed .tableCard .tableCardName
  font-weight: 900
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

.alert-icon
  position: absolute
  top: 5px
  right: 5px
  z-index: 2

</style>
