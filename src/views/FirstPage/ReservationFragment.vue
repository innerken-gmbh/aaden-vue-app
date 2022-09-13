<template>
  <div class="pa-4" style="height: calc(100vh - 64px);width: 100%;
        background: #e8e8e8;display: grid;
        grid-template-columns:1fr 3fr;
        grid-gap: 16px;
">
    <div class="d-flex flex-column">
      <v-date-picker style="border-radius: 12px"
                     :min="todayDate"
                     :locale="$i18n.locale"
                     full-width color="primary"
                     v-model="reservationDate"
      />
      <v-card color="white"
              elevation="0"
              style="border-radius: 12px"
              class="pa-4 mt-4">
        <div class="text-subtitle-2 d-flex">
          {{ $t('reservation_setting') }}
          <v-spacer></v-spacer>
          <v-chip label color="white" small class="ml-2 d-flex align-center">
            <v-icon left color="success">mdi-checkbox-marked-circle</v-icon>
            <span>
                  {{ $t('already_synchronized') }}
          </span>
          </v-chip>
        </div>
        <v-btn elevation="0" @click="addNewReservation" block large color="success" class="mt-4">
          <v-icon left>mdi-plus-box</v-icon>
          {{ $t('create_new_reservation') }}
        </v-btn>
        <v-btn elevation="0" @click="tableSettingDialog=true" block large color="warning" class="mt-4">
          <v-icon left>mdi-cog-box</v-icon>
          {{ $t('reserved_table_setting') }}
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
    <v-card elevation="0" style="border-radius: 12px">
      <v-card-title style="background: #f6f6f6">
        {{ $t('reservation_list') }}
        <v-spacer></v-spacer>
        <v-btn class="mr-2" elevation="0" @click="loadData">
          <v-icon left>mdi-refresh</v-icon>
          {{ $t('reload') }}
        </v-btn>
        <div @click="showAllReservation=!showAllReservation" class="d-flex align-center text-body-2 mr-2">
          <v-simple-checkbox hide-details dense v-model="showAllReservation"></v-simple-checkbox>
          {{ $t('display_all') }}
        </div>
        <div style="max-width: 196px">
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="Search"
              solo
              dense
              hide-details
          ></v-text-field>
        </div>

      </v-card-title>
      <v-data-table
          height="calc(100vh - 224px)"
          fixed-header
          :custom-filter="filterItem"
          @click:row="toggleActiveReservation"
          :headers="headers"
          :items="displayReservationItems"
          :search="search">
        <template #item.action="{item}">
          <div style="display: grid;grid-gap: 4px;grid-auto-flow: column">

            <v-btn :color="item.completed==='1'?'success':''"
                   elevation="0" small
                   @click.stop="confirmReservation(item.id)">
              <v-icon left>mdi-check</v-icon>
              {{ $t('Arrival') }}
            </v-btn>
            <v-btn elevation="0" small @click.stop="toggleActiveReservation(item)">
              <v-icon left>mdi-open-in-new</v-icon>
              {{ $t('Details') }}
            </v-btn>
          </div>

        </template>
        <template #item.note="{item}">
          <div
              class="text-decoration-underline"
              style="max-width: 96px;overflow: hidden;white-space: nowrap;
                  text-overflow: ellipsis">
            {{ item.note ? item.note : $t('nothing') }}
          </div>
        </template>
        <template #item.person="{item}">
          <v-chip small>
            <template v-if="item.personCount>0">
              <v-icon small class="mr-1">mdi-human-male-female</v-icon>
              {{ item.personCount }}
            </template>
            <template v-if="item.childCount>0">
              <v-icon small class="ml-3 mr-1">mdi-human-child</v-icon>
              {{ item.childCount }}
            </template>
            <template v-if="item.useStroller==='1'">
              <v-icon small class="ml-3">mdi-baby-carriage</v-icon>
            </template>
          </v-chip>
        </template>
        <template #item.user="{item}">
          <div class="pa-2">
            <div class="font-weight-bold">
              {{ item.title }} {{ item.firstName }} {{ item.lastName }}
            </div>
            <div class="text--secondary" style="border-bottom: 1px dashed black;width: fit-content">
              {{ item.tel }}
            </div>
          </div>
        </template>
        <template #item.time="{item}">
          <v-chip outlined small>
            <v-icon left small>mdi-clock-outline</v-icon>
            {{ item.fromDateTime | onlyTime }} - {{ item.toDateTime | onlyTime }}
          </v-chip>
        </template>
      </v-data-table>
    </v-card>
    <v-dialog max-width="600px" v-model="showReservation">
      <v-card v-if="activeReservation" style="border-radius: 12px"
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
            {{ $t('normal') }}
          </v-chip>
          <v-chip small color="error" v-else>
            <v-icon left>mdi-remove</v-icon>
            {{ $t('already_cancelled') }}
          </v-chip>
        </div>

        <div class="mt-12">
          <div class="d-flex">
            <div class="text-body-1">{{ $t('time') }}</div>
            <v-spacer></v-spacer>
            <v-icon small class="mr-2">mdi-clock</v-icon>
            {{ activeReservation.fromDateTime|onlyTime }} -
            {{ activeReservation.toDateTime|onlyTime }}
          </div>
          <v-divider class="my-3"></v-divider>
          <div class="d-flex">
            <div class="text-body-1">{{ $t('number_of_people') }}</div>
            <v-spacer></v-spacer>
            <v-icon class="mr-2">mdi-human-male-female</v-icon>
            {{ activeReservation.personCount }}
            <v-icon class="ml-2 mr-2">mdi-human-child</v-icon>
            {{ activeReservation.childCount }}
          </div>

          <v-divider class="my-3"></v-divider>
          <div class="d-flex">
            <div class="text-body-1">{{ $t('telefon') }}</div>
            <v-spacer></v-spacer>
            {{ activeReservation.tel }}
          </div>

          <v-divider class="my-3"></v-divider>
          <div class="d-flex">
            <div class="text-body-1">{{ $t('Email') }}</div>
            <v-spacer></v-spacer>
            {{ activeReservation.email }}
          </div>

          <v-divider class="my-3"></v-divider>
          <template v-if="activeReservation.note">
            <div class="d-flex">
              <div class="text-body-1">{{ $t('note') }}</div>
              <v-spacer></v-spacer>
              {{ activeReservation.note }}
            </div>
            <v-divider class="my-3"></v-divider>
          </template>
          <template v-if="activeReservation.useStroller==='1'">
            <div class="d-flex">
              <div class="text-body-1">{{ $t('need_stroller') }}</div>
              <v-spacer></v-spacer>
              <v-chip small>
                <v-icon small>mdi-check</v-icon>
              </v-chip>
            </div>
            <v-divider class="my-3"></v-divider>
          </template>
          <div class="d-flex">
            <div class="text-body-1">{{ $t('Table_No.') }}</div>
            <v-spacer></v-spacer>
            <v-chip label color="primary lighten-2">
              <v-icon left>mdi-map-marker-check-outline</v-icon>
              {{ activeReservation.tableNameNull }}
            </v-chip>
          </div>

          <div style="display: grid;grid-gap: 8px;" class="mt-8">
            <v-btn @click="moveReservation(activeReservation.id)" block color="warning" elevation="0">{{
                $t('replace_table')
              }}
            </v-btn>
            <v-btn @click="cancelReservation(activeReservation.id)" outlined block color="error" elevation="0">
              {{ $t('cancel_reservation') }}
            </v-btn>

          </div>

        </div>
      </v-card>
    </v-dialog>
    <v-dialog max-width="600px" v-model="reservationAddDialog">
      <v-card style="border-radius: 12px"
              class="pa-4" elevation="0" color="grey lighten-4" v-if="reservationStep===0">
        <div class="d-flex">
          <div class="text-subtitle-1">
            {{ $t('create_new_reservation') }}
          </div>
          <v-spacer></v-spacer>
          {{ $t('enter_the_time_and_number_of_people_to_determine_if_a_table_is_available') }}
        </div>
        <div class="mt-8">
          <div class="d-flex align-center">
            <div class="text-body-1">{{ $t('time') }}</div>
            <v-spacer></v-spacer>
            <div style="width: 280px">
              <v-select hide-details :items="timeGap" v-model="startTime" return-object solo></v-select>
            </div>
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-body-1">{{ $t('number_of_adults') }}</div>
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
            <div class="text-subtitle-2">{{ $t('Number_of_children') }}</div>
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
            {{ $t('search') }}
          </v-btn>
        </div>

      </v-card>
      <v-card style="border-radius: 12px"
              class="pa-4" elevation="0" color="grey lighten-4" v-if="reservationStep===1">
        <div>
          <div v-if="otherTime.length>0">
            <v-chip color="primary" label>
              {{ $t('following_time_slots_are_still_available') }}
            </v-chip>
            <div class="d-flex flex-wrap mt-2">
              <v-chip large @click="useOtherTime(time)" v-for="time in otherTime" :key="time" class="ma-1">
                {{ reservationDate + ' ' + time|onlyTime }}
              </v-chip>
            </div>

          </div>
          <div style="height: 200px" v-else class="d-flex align-center flex-column mt-8">
            <v-icon x-large>mdi-kettle-steam</v-icon>
            <div class="mt-4">{{ $t('sorry_there_are_no_available_tables_on_this_day') }}</div>
            <v-btn text @click="reservationAddDialog=false" class="mt-8">
              <v-icon left>mdi-close</v-icon>
              {{ $t('Close') }}
            </v-btn>
          </div>
        </div>

      </v-card>
      <v-card v-else-if="reservationStep===2"
              style="border-radius: 12px"
              class="pa-4" elevation="0" color="grey lighten-4">
        <div class="d-flex">
          <div class="text-subtitle-1">
            {{ $t('create_new_reservation') }}
          </div>
          <v-spacer></v-spacer>
          <v-chip small color="success">
            <v-icon left>mdi-circle-medium</v-icon>
            {{ $t('normal') }}
          </v-chip>
        </div>

        <div class="mt-8">
          <div class="d-flex">
            <div class="text-subtitle-2">{{ $t('time') }}</div>
            <v-spacer></v-spacer>
            <v-icon small class="mr-2">mdi-clock</v-icon>
            {{ startTime }}
          </div>
          <v-divider class="my-2"></v-divider>
          <div style="display: grid;grid-template-columns: 50% 50%">
            <div class="d-flex align-center pr-8">
              <div class="text-subtitle-2">{{ $t('first_name') }}</div>
              <v-spacer></v-spacer>
              <v-text-field solo hide-details dense v-model="firstName"></v-text-field>
            </div>
            <div class="d-flex align-center pl-8">
              <div class="text-subtitle-2">{{ $t('last_name') }}</div>
              <v-spacer></v-spacer>
              <v-text-field solo hide-details dense v-model="lastName"></v-text-field>
            </div>
          </div>

          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-subtitle-2">{{ $t('number_of_adults') }}</div>
            <v-spacer></v-spacer>
            <v-icon class="mr-2">mdi-human-male-female</v-icon>
            {{ adultCount }}
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-subtitle-2">{{ $t('Number_of_children') }}</div>
            <v-spacer></v-spacer>
            <v-icon class="ml-2 mr-2">mdi-human-child</v-icon>
            {{ childCount }}
          </div>

          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-subtitle-2">{{ $t('telefon') }}</div>
            <v-spacer></v-spacer>
            <v-text-field solo hide-details dense v-model="phone"></v-text-field>
          </div>

          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-subtitle-2">{{ $t('Email') }}</div>
            <v-spacer></v-spacer>
            <v-text-field solo hide-details dense v-model="email"></v-text-field>
          </div>

          <v-divider class="my-2"></v-divider>

          <div class="d-flex">
            <div class="text-subtitle-2">{{ $t('note') }}</div>
            <v-spacer></v-spacer>
            <v-textarea solo v-model="note" height="100"/>
          </div>
          <v-divider class="my-2"></v-divider>

          <template>
            <div class="d-flex">
              <div class="text-subtitle-2">{{ $t('need_stroller') }}</div>
              <v-spacer></v-spacer>
              <v-simple-checkbox v-model="useStroller"/>
            </div>
            <v-divider class="my-2"></v-divider>
          </template>
          <v-btn @click="submitReservation" block color="success">{{ $t('Save') }}</v-btn>

        </div>
      </v-card>
    </v-dialog>
    <v-dialog max-width="600px" v-model="tableSettingDialog">
      <v-card color="#f6f6f6" style="border-radius: 12px">
        <v-card-title>{{ $t('reserved_table_setting') }}</v-card-title>
        <v-card-text class="pa-4" style="overflow: scroll">
          <div
              style="display: grid;grid-template-columns: repeat(4,1fr);grid-gap: 4px;max-height: 70vh;overflow-y: scroll">
            <v-card elevation="0" class="pa-4 d-flex align-center justify-center flex-column"
                    :color="t.reservable?'primary':''"
                    :dark="t.reservable"
                    @click="setTableReservable(t.tableId,!t.reservable)" v-for="t in tableList" :key="t.id">
              <h2>
                {{ t.tableName }}
              </h2>
              <div class="pa-2 px-3 mt-2 d-flex align-center">
                <v-icon size="18" left>mdi-seat</v-icon>
                {{ t.seatCount ? t.seatCount : 0 }}
              </div>
            </v-card>
          </div>
        </v-card-text>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import {
  addReservation,
  cancelReservation,
  checkTableTimeAvailable,
  confirmReservation,
  getReservation,
  getTimeSlotForDate,
  loadReserveSettings,
  moveReservation,
  setReservable
} from '@/api/ReservationService'
import IKUtils from 'innerken-js-utils'
import { onlyTimeFormat, todayDate } from '@/api/dateUtils'
import { loadReservationTableInfo } from '@/api/tableService'

export default {
  name: 'Reservation',
  data: function () {
    return {
      todayDate,
      reservationDate: todayDate,
      showAllReservation: false,

      reservations: [],
      timeGap: [],
      activeReservation: null,
      tableList: [],
      search: '',
      tableSettingDialog: null,
      showReservation: null,
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
      headers: [
        { text: '姓名', value: 'user' },
        { text: '留言', value: 'note' },
        { text: '桌号', value: 'tableNameNull' },
        { text: '人数', value: 'person' },
        { text: '时间', value: 'time' },
        { text: '操作', value: 'action' }

      ],
      setting: {
        gap: 'PT15M'
      }
    }
  },
  computed: {
    displayReservationItems () {
      console.log(this.showAllReservation, '123')
      return this.reservations.filter(item => (this.showAllReservation || item.completed === '0'))
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
    filterItem (value, search, item) {
      if (search.trim() === '') {
        return true
      } else {
        return Object.keys(item).some(k => {
          return item[k].includes(search)
        })
      }
    },
    async checkCurrentTime () {
      if (!this.startTime) {
        IKUtils.showError(this.$t('pls_select_reservation_time') + '！')
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
    async confirmReservation (id) {
      const res = await confirmReservation(id)
      console.log(res)
      await this.loadData()
    },
    async submitReservation () {
      if (!this.firstName && !this.lastName) {
        IKUtils.showError(this.$t('pls_enter_name') + '!')
        return
      }
      IKUtils.showLoading(true)
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
      IKUtils.toast()
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

      this.showReservation = true
      this.activeReservation = reservation
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
      await this.getTables()
      this.activeReservation = null
      this.setting = await loadReserveSettings()
      this.timeGap = await getTimeSlotForDate(this.reservationDate, this.setting)
    },
    async getTables () {
      this.tableList = await loadReservationTableInfo()
    },
    async setTableReservable (id, reservable) {
      await setReservable(id, reservable)
      await this.getTables()
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
