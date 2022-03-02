<template>
  <div class="pa-4" style="height: calc(100vh - 64px);width: 100%;
        background: #e8e8e8;display: grid;
        grid-template-columns:repeat(4,1fr);
        grid-gap: 16px;
">
    <div class="d-flex flex-column">

      <v-date-picker style="border-radius: 12px"
                     :locale="$i18n.locale"
                     full-width color="primary"
                     v-model="reservationDate"
      />

      <v-card color="white"
              elevation="0"
              style="border-radius: 12px"
              class="pa-4 mt-4">
        <div class="text-subtitle-2 d-flex">
          预定设置
          <v-spacer></v-spacer>
          <v-chip label color="white" small class="ml-2 d-flex align-center">
            <v-icon left color="success">mdi-checkbox-marked-circle</v-icon>
            <span>
                  已经同步
          </span>
          </v-chip>
        </div>
        <div class="text-body-1 mt-4">
          <div class="py-2 d-flex align-center">
            接受预定
            <v-spacer></v-spacer>
            <v-switch hide-details :value="true" class="mt-0"/>
          </div>
        </div>

      </v-card>

      <v-card
          elevation="0"
          class="mt-4 flex-grow-1"
          style="border-radius: 12px"
          color="grey lighten-2"
      >
      </v-card>
    </div>
    <v-card style="border-radius: 12px" elevation="0"
            height="100%"
            color="grey lighten-2" class="pa-4 d-flex flex-column">
      <div class="text-subtitle-2 d-flex align-center">桌子列表
        <v-spacer></v-spacer>
        <v-btn elevation="0">
          <v-icon left>mdi-refresh</v-icon>
          重新加载
        </v-btn>
      </div>
      <v-item-group v-model="activeTableIndex"
                    style="display: grid;grid-gap: 12px;overflow-y: scroll;
                    max-height: calc(100vh - 150px)"
                    class="mt-4">
        <v-item
            v-for="t in tableWithReservation" :key="t.tableId"
            #default="{active,toggle}">
          <v-card elevation="0" style="border-radius: 12px;"
                  @click="toggle"
                  :color="active?'primary lighten-2':''"
                  :dark="active"
                  class="pa-3 pr-6 d-flex align-center">

            <h3>
              <v-icon left>mdi-map-marker-check-outline</v-icon>
              {{ t.tableName }}
            </h3>
            <v-spacer></v-spacer>
            <template v-if="t.reservations.length>0">
              <v-chip outlined small class="mr-2">预定数量{{ t.reservations.length }}</v-chip>
            </template>

            <v-simple-checkbox
                v-ripple
                hide-details class="mt-0"
                @click="setTableReservable(t.tableId,!t.reservable)"
                :value="t.reservable"/>
          </v-card>
        </v-item>
      </v-item-group>
    </v-card>
    <template v-if="activeTable">
      <v-card style="border-radius: 12px;position: relative" elevation="0"
              color="grey lighten-2" class="pa-4 d-flex flex-column">
        <div class="text-subtitle-2 d-flex align-center">该桌今日安排
          <v-spacer></v-spacer>
          <v-btn elevation="0">全部移到另一桌</v-btn>
        </div>
        <div style="display: grid;grid-gap: 2px;max-height: calc(100vh - 150px)" class="mt-4">
          <v-card draggable="false" elevation="0" v-for="gap in gapWithReservation" :key="gap.gapName"
                  color="grey lighten-3"
                  style="position: relative;"
                  height="10px"
                  class="pa-0 d-flex align-center">
            <span :class="gap.gapName.endsWith('00')?'font-weight-black':'text--disabled'"
                  class="text-caption ">{{ gap.gapName }}</span>
            <template v-if="gap.reservations.length>0">

              <v-card draggable v-for="re in gap.reservations" :key="re.remoteId" elevation="1"
                      style="position: absolute;right: 0;top: 0; z-index: 1;width: 100%"
                      class="pa-3 pr-6 d-flex align-center">
                <div>
                  <div class="text-caption d-flex align-center">
                    <v-icon small class="mr-1">mdi-clock</v-icon>
                    {{ re.fromDateTime | onlyTime }} -
                    {{ re.toDateTime | onlyTime }}
                  </div>
                  <div class="text-truncate text-no-wrap d-flex align-center mt-1">
                    <h3>
                      {{ re.title }} {{ re.firstName }} {{ re.lastName }}
                    </h3>
                  </div>
                  <div class="mt-1 d-flex align-center">
                    <v-chip outlined label class="d-flex align-center ml-1">
                      <v-icon small>mdi-human-male-female</v-icon>
                      {{ re.personCount }}
                      <v-icon small class="ml-2">mdi-human-child</v-icon>
                      {{ re.childCount }}
                    </v-chip>
                  </div>
                </div>
                <v-spacer></v-spacer>
              </v-card>

            </template>
          </v-card>
        </div>

      </v-card>

      <v-card v-if="activeReservation"
              style="border-radius: 12px"
              class="pa-4" elevation="0" color="grey lighten-4">
        <div class="d-flex">
          <div class="text-subtitle-1">
            {{ activeReservation.title }} {{ activeReservation.firstName }} {{
              activeReservation.lastName
            }}
          </div>
          <v-spacer></v-spacer>
          <v-chip small color="success" v-if="activeReservation.cancelled==='0'">
            <v-icon left>mdi-circle-medium</v-icon>
            正常
          </v-chip>
          <v-chip small color="error" v-else>
            <v-icon left>mdi-remove</v-icon>
            已经取消
          </v-chip>
        </div>

        <div class="mt-8">
          <div class="d-flex">
            <div class="text-subtitle-2">时间</div>
            <v-spacer></v-spacer>
            <v-icon small class="mr-2">mdi-clock</v-icon>
            {{ activeReservation.fromDateTime|onlyTime }} -
            {{ activeReservation.toDateTime|onlyTime }}
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex">
            <div class="text-subtitle-2">人数</div>
            <v-spacer></v-spacer>
            <v-icon small class="mr-2">mdi-human-male-female</v-icon>
            {{ activeReservation.personCount }}
            <v-icon small class="ml-2 mr-2">mdi-human-child</v-icon>
            {{ activeReservation.childCount }}
          </div>

          <v-divider class="my-2"></v-divider>
          <div class="d-flex">
            <div class="text-subtitle-2">电话</div>
            <v-spacer></v-spacer>
            {{ activeReservation.tel }}
          </div>

          <v-divider class="my-2"></v-divider>
          <div class="d-flex">
            <div class="text-subtitle-2">邮箱</div>
            <v-spacer></v-spacer>
            {{ activeReservation.email }}
          </div>

          <v-divider class="my-2"></v-divider>
          <template v-if="activeReservation.note">
            <div class="d-flex">
              <div class="text-subtitle-2">备注</div>
              <v-spacer></v-spacer>
              {{ activeReservation.note }}
            </div>
            <v-divider class="my-2"></v-divider>
          </template>
          <div class="d-flex">
            <div class="text-subtitle-2">桌号</div>
            <v-spacer></v-spacer>
            <v-chip label color="primary lighten-2">
              <v-icon left>mdi-map-marker-check-outline</v-icon>
              {{ activeReservation.tableNameNull }}
            </v-chip>
          </div>
          <template v-if="activeReservation.useStroller==='1'">
            <div class="d-flex">
              <div class="text-subtitle-2">需要婴儿车</div>
              <v-spacer></v-spacer>
              <v-chip color="success">
                <v-icon>mdi-check</v-icon>
              </v-chip>
            </div>
            <v-divider class="my-2"></v-divider>
          </template>
          <div style="display: grid;grid-gap: 8px;" class="mt-8">
            <v-btn block color="warning" elevation="0">更换桌子</v-btn>
            <v-btn @click="cancelReservation(activeReservation.id)" outlined block color="error" elevation="0">
              取消预定
            </v-btn>

          </div>

        </div>
      </v-card>
    </template>

  </div>
</template>

<script>
import {
  cancelReservation,
  getReservation,
  getTimeSlotForDate,
  moveReservation,
  setReservable
} from '@/api/ReservationService'
import IKUtils from 'innerken-js-utils'
import { loadReservationTableInfo } from '@/api/tableService'
import { onlyTimeFormat } from '@/api/dateUtils'

export default {
  name: 'Reservation',
  data: function () {
    return {
      reservationDate: '2022-01-27',
      timeGap: [],
      reservations: [],
      tableList: [],
      activeIndex: null,
      activeTableIndex: null
    }
  },
  watch: {
    reservationDate (val) {
      this.loadReservations()
    }
  },
  computed: {
    activeTable () {
      return this.tableWithReservation?.[this.activeTableIndex]
    },
    tableWithReservation () {
      return this.tableList.map(t => {
        t.reservations = this.reservations.filter(it => it.tableId === t.tableId)
        t.sortRank = t.reservations.length + t.reservable * 1
        return t
      }).sort((a, b) => b.sortRank - a.sortRank)
    },
    gapWithReservation () {
      return this.timeGap.map(g => {
        const res = {
          gapName: g
        }
        res.reservations = this.activeTable.reservations
          .filter(r => onlyTimeFormat(r.fromDateTime) === g)
        console.log(this.activeTable.reservations.map(r => onlyTimeFormat(r.fromDateTime)))
        return res
      })
    },
    activeReservation () {
      return this.activeTable.reservations[this.activeIndex]
    }
  },
  methods: {
    startDrag (evt, item) {
      evt.dataTransfer.dropEffect = 'move'
      evt.dataTransfer.effectAllowed = 'move'
      evt.dataTransfer.setData('itemID', item.id)
    },
    onDrop (evt, list) {
      // const itemID = evt.dataTransfer.getData('itemID')
      // const item = this.items.find(item => item.id == itemID)
      // item.list = list
    },
    async cancelReservation (id) {
      const res = await IKUtils.showConfirmAsyn(
        '取消预定将会发送一封邮件来通知预定的客人。',
        '您是否确定取消此预定？')
      if (res.isConfirmed) {
        await cancelReservation(id)
        await this.loadReservations()
      }
    },

    async setTableReservable (id, reservable) {
      await setReservable(id, reservable)
      await this.getTables()
    },
    async moveReservation (id, tableId) {
      await moveReservation(id, tableId)
      await this.loadReservations()
    },
    async loadData () {
      await this.loadReservations()
      await this.getTables()

      this.timeGap = await getTimeSlotForDate(this.reservationDate)
      console.log(this.timeGap, 'timegap')
    },
    async getTables () {
      this.activeTableIndex = null
      this.tableList = await loadReservationTableInfo()
    },
    async loadReservations () {
      this.activeIndex = null
      this.reservations = await getReservation(this.reservationDate)
      console.log(this.reservations, 'reservation')
    }
  },
  async mounted () {
    await this.loadData()
  }
}
</script>

<style scoped>

</style>
