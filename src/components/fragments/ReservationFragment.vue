<template>
  <div class="pa-4" style="height: calc(100vh - 64px);width: 100%;
        background: #e8e8e8;display: grid;
        grid-template-columns:1fr 1fr 2fr;
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
        <v-btn elevation="0" @click="addNewReservation" block large color="success" class="mt-4">
          <v-icon>mdi-plus</v-icon>
          新建预定
        </v-btn>

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
      <div class="text-subtitle-2 d-flex align-center">预定列表
        <v-spacer></v-spacer>
        <v-btn elevation="0">
          <v-icon left>mdi-refresh</v-icon>
          重新加载
        </v-btn>
      </div>
      <div
          style="display: grid;grid-gap: 12px;overflow-y: scroll;
                    max-height: calc(100vh - 150px)"
          class="mt-4">
        <v-card
            @click="toggleActiveReservation(re)"
            v-for="re in reservations" :key="re.remoteId" elevation="0"
            height="100%"
            class="pa-3 d-flex flex-column">
          <div class=" d-flex align-center text-body-1 mt-1">
            <span class="text-truncate text-no-wrap" style="max-width: 140px">
                {{ re.title }} {{ re.firstName }} {{ re.lastName }}
            </span>

            <v-spacer></v-spacer>
            <v-chip outlined small>
              <v-icon left small>mdi-clock-outline</v-icon>
              {{ re.fromDateTime | onlyTime }} - {{ re.toDateTime | onlyTime }}
            </v-chip>

          </div>
          <div class="mt-2 d-flex justify-space-between py-2 pr-2">
            <div class="d-flex align-center ">
              <v-icon class="mr-3">mdi-map-marker</v-icon>
              <div class="text-h5"> {{ re.tableNameNull }}</div>
            </div>
            <div class="d-flex align-center ">
              <v-icon class="mr-3">mdi-human-male-female</v-icon>
              <div class="text-h5"> {{ re.personCount }}</div>
            </div>
            <div class="d-flex align-center">
              <v-icon class="mr-3">mdi-human-child</v-icon>
              <div class="text-h5">{{ re.childCount }}</div>
            </div>

          </div>
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

      <div class="mt-12">
        <div class="d-flex">
          <div class="text-body-1">时间</div>
          <v-spacer></v-spacer>
          <v-icon small class="mr-2">mdi-clock</v-icon>
          {{ activeReservation.fromDateTime|onlyTime }} -
          {{ activeReservation.toDateTime|onlyTime }}
        </div>
        <v-divider class="my-3"></v-divider>
        <div class="d-flex">
          <div class="text-body-1">人数</div>
          <v-spacer></v-spacer>
          <v-icon class="mr-2">mdi-human-male-female</v-icon>
          {{ activeReservation.personCount }}
          <v-icon class="ml-2 mr-2">mdi-human-child</v-icon>
          {{ activeReservation.childCount }}
        </div>

        <v-divider class="my-3"></v-divider>
        <div class="d-flex">
          <div class="text-body-1">电话</div>
          <v-spacer></v-spacer>
          {{ activeReservation.tel }}
        </div>

        <v-divider class="my-3"></v-divider>
        <div class="d-flex">
          <div class="text-body-1">邮箱</div>
          <v-spacer></v-spacer>
          {{ activeReservation.email }}
        </div>

        <v-divider class="my-3"></v-divider>
        <template v-if="activeReservation.note">
          <div class="d-flex">
            <div class="text-body-1">备注</div>
            <v-spacer></v-spacer>
            {{ activeReservation.note }}
          </div>
          <v-divider class="my-3"></v-divider>
        </template>
        <div class="d-flex">
          <div class="text-body-1">桌号</div>
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
          <v-divider class="my-3"></v-divider>
        </template>
        <div style="display: grid;grid-gap: 8px;" class="mt-8">
          <v-btn @click="moveReservation(activeReservation.id)" block color="warning" elevation="0">更换桌子</v-btn>
          <v-btn @click="cancelReservation(activeReservation.id)" outlined block color="error" elevation="0">
            取消预定
          </v-btn>

        </div>

      </div>
    </v-card>

    <v-dialog max-width="600px" v-model="reservationAddDialog">
      <v-card style="border-radius: 12px"
              class="pa-4" elevation="0" color="grey lighten-4" v-if="reservationStep===0">
        <div class="d-flex">
          <div class="text-subtitle-1">
            新建预定
          </div>
          <v-spacer></v-spacer>
          输入时间和人数，确定是否有空闲桌子
        </div>
        <div class="mt-8">
          <div class="d-flex align-center">
            <div class="text-body-1">时间</div>
            <v-spacer></v-spacer>
            <div style="width: 280px">
              <v-select hide-details :items="timeGap" v-model="startTime" return-object solo></v-select>
            </div>
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-body-1">成人人数</div>
            <v-icon class="ml-2">mdi-human-male-female</v-icon>
            <v-spacer></v-spacer>

            <v-btn large icon @click="adultCount>0?adultCount--:adultCount=0">
              <v-icon>mdi-minus-circle</v-icon>
            </v-btn>
            {{ adultCount }}
            <v-btn large icon @click="adultCount++">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-subtitle-2">儿童人数</div>
            <v-icon class=" ml-2">mdi-human-child</v-icon>
            <v-spacer></v-spacer>

            <v-btn large icon @click="childCount>0?childCount--:childCount=0">
              <v-icon>mdi-minus-circle</v-icon>
            </v-btn>
            {{ childCount }}
            <v-btn large icon @click="childCount++">
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </div>

          <v-divider class="my-2"></v-divider>
          <v-btn @click="checkCurrentTime" color="primary" block large>
            <v-icon left>mdi-magnify</v-icon>
            查询
          </v-btn>
        </div>

      </v-card>
      <v-card style="border-radius: 12px"
              class="pa-4" elevation="0" color="grey lighten-4" v-if="reservationStep===1">
        <div>
          <div v-if="otherTime.length>0">
            <v-chip color="primary" label>
              以下的时间段依旧可用
            </v-chip>
            <div class="d-flex flex-wrap mt-2">
              <v-chip large @click="useOtherTime(time)" v-for="time in otherTime" :key="time" class="ma-1">
                {{ reservationDate + ' ' + time|onlyTime }}
              </v-chip>
            </div>

          </div>
          <div style="height: 200px" v-else class="d-flex align-center flex-column mt-8">
            <v-icon x-large>mdi-kettle-steam</v-icon>
            <div class="mt-4">非常抱歉，这一天已经没有空闲的桌子了！</div>
            <v-btn text @click="reservationAddDialog=false" class="mt-8">
              <v-icon left>mdi-close</v-icon>
              关闭
            </v-btn>
          </div>
        </div>

      </v-card>
      <v-card v-else-if="reservationStep===2"
              style="border-radius: 12px"
              class="pa-4" elevation="0" color="grey lighten-4">
        <div class="d-flex">
          <div class="text-subtitle-1">
            新建预定
          </div>
          <v-spacer></v-spacer>
          <v-chip small color="success">
            <v-icon left>mdi-circle-medium</v-icon>
            正常
          </v-chip>
        </div>

        <div class="mt-8">
          <div class="d-flex">
            <div class="text-subtitle-2">时间</div>
            <v-spacer></v-spacer>
            <v-icon small class="mr-2">mdi-clock</v-icon>
            {{ startTime }}
          </div>
          <v-divider class="my-2"></v-divider>
          <div style="display: grid;grid-template-columns: 50% 50%">
            <div class="d-flex align-center pr-8">
              <div class="text-subtitle-2">名</div>
              <v-spacer></v-spacer>
              <v-text-field solo hide-details dense v-model="firstName"></v-text-field>
            </div>
            <div class="d-flex align-center pl-8">
              <div class="text-subtitle-2">姓</div>
              <v-spacer></v-spacer>
              <v-text-field solo hide-details dense v-model="lastName"></v-text-field>
            </div>
          </div>

          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-subtitle-2">成人人数</div>
            <v-spacer></v-spacer>
            <v-icon class="mr-2">mdi-human-male-female</v-icon>
            {{ adultCount }}
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-subtitle-2">儿童人数</div>
            <v-spacer></v-spacer>
            <v-icon class="ml-2 mr-2">mdi-human-child</v-icon>
            {{ childCount }}
          </div>

          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-subtitle-2">电话</div>
            <v-spacer></v-spacer>
            <v-text-field solo hide-details dense v-model="phone"></v-text-field>
          </div>

          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-subtitle-2">邮箱</div>
            <v-spacer></v-spacer>
            <v-text-field solo hide-details dense v-model="email"></v-text-field>
          </div>

          <v-divider class="my-2"></v-divider>

          <div class="d-flex">
            <div class="text-subtitle-2">备注</div>
            <v-spacer></v-spacer>
            <v-textarea solo v-model="note" height="100"/>
          </div>
          <v-divider class="my-2"></v-divider>

          <template>
            <div class="d-flex">
              <div class="text-subtitle-2">需要婴儿车</div>
              <v-spacer></v-spacer>
              <v-simple-checkbox v-model="useStroller"/>
            </div>
            <v-divider class="my-2"></v-divider>
          </template>
          <v-btn @click="submitReservation" block color="success">保存</v-btn>

        </div>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  addReservation,
  cancelReservation,
  checkTableTimeAvailable,
  getReservation,
  getTimeSlotForDate,
  loadReserveSettings,
  moveReservation
} from '@/api/ReservationService'
import IKUtils from 'innerken-js-utils'
import { onlyTimeFormat, todayDate } from '@/api/dateUtils'

export default {
  name: 'Reservation',
  data: function () {
    return {
      reservationDate: todayDate,
      reservations: [],
      timeGap: [],
      activeReservation: null,

      reservationStep: 0,
      reservationAddDialog: false,
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      note: '',
      adultCount: 1,
      childCount: 0,
      useStroller: false,
      startTime: '',
      otherTime: [],

      setting: {
        gap: 'PT15M'
      }
    }
  },
  watch: {
    reservationDate (val) {
      this.loadData()
    },
    reservationAddDialog () {
      this.clearForm()
    }
  },
  methods: {
    async checkCurrentTime () {
      if (!this.startTime) {
        IKUtils.showError('请选择订餐时间！')
        return
      }
      const res = await checkTableTimeAvailable(
        this.reservationDate,
        this.startTime,
        parseInt(this.adultCount) + parseInt(this.childCount))
      if (!res) {
        this.reservationStep = 2
      } else {
        this.otherTime = res
        this.reservationStep = 1
      }
    },
    addNewReservation () {
      this.reservationAddDialog = true
    },
    useOtherTime (time) {
      this.startTime = onlyTimeFormat(this.reservationDate + ' ' + time)
      this.reservationStep = 2
    },
    async submitReservation () {
      if (!this.firstName && !this.lastName) {
        IKUtils.showError('请填写姓名！')
        return
      }
      const res = await addReservation({
        fromDateTime: this.reservationDate + ' ' + this.startTime + ':00',
        personCount: this.adultCount,
        childCount: this.childCount,
        firstName: this.firstName,
        lastName: this.lastName,
        tel: this.phone,
        email: this.email,
        note: this.note,
        useStroller: this.useStroller ? 1 : 0
      })
      console.log(res)
      this.reservationAddDialog = false
      this.clearForm()
      await this.loadData()
    },
    clearForm () {
      this.reservationStep = 0
      this.startTime = ''
      this.adultCount = 2
      this.childCount = 0
      this.firstName = ''
      this.lastName = ''
      this.tel = ''
      this.email = ''
      this.note = ''
      this.useStroller = false
    },
    toggleActiveReservation (reservation) {
      this.reservationAddDialog = false
      if (this.activeReservation?.remoteId === reservation?.remoteId) {
        this.activeReservation = null
      } else {
        this.activeReservation = reservation
      }
    },
    async cancelReservation (id) {
      await cancelReservation(id)
      await this.loadReservations()
    },

    async moveReservation (id) {
      await moveReservation(id)
      await this.loadData()
    },
    async loadData () {
      await this.loadReservations()
      this.activeReservation = null
      this.setting = await loadReserveSettings()
      this.timeGap = await getTimeSlotForDate(this.reservationDate, this.setting)
    },

    async loadReservations () {
      this.reservations = await getReservation(this.reservationDate)
    }
  },
  async mounted () {
    await this.loadData()
  }
}
</script>

<style scoped>

</style>
