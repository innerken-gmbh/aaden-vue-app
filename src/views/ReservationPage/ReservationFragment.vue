<template>
    <div class="pa-4" style="height: calc(100vh);width: 100%;
        background: #e8e8e8;display: grid;
        grid-template-columns:1fr 3fr;
        grid-gap: 16px;
">
        <template v-if="!notActive">
            <div class="d-flex flex-column">
                <v-date-picker v-model="reservationDate"
                               :locale="$i18n.locale"
                               :min="todayDate"
                               color="primary" full-width
                               style="border-radius: 12px"
                />
                <v-card class="pa-4 mt-4"
                        color="white"
                        elevation="0"
                        style="border-radius: 12px">
                    <div class="text-subtitle-2 d-flex">
                        {{ $t('ReservationSetting') }}
                        <v-spacer></v-spacer>
                        <v-chip class="ml-2 d-flex align-center" color="white" label small>
                            <v-icon color="success" left>mdi-checkbox-marked-circle</v-icon>
                            <span>
                  {{ $t('Synchronized') }}
          </span>
                        </v-chip>
                    </div>
                    <v-btn block class="mt-4" color="success" elevation="0" large @click="addNewReservation">
                        <v-icon left>mdi-plus-box</v-icon>
                        {{ $t('CreateNewReservation') }}
                    </v-btn>
                    <v-btn block class="mt-4" color="warning" elevation="0" large @click="tableSettingDialog=true">
                        <v-icon left>mdi-cog-box</v-icon>
                        {{ $t('ReservedTableSetting') }}
                    </v-btn>
                </v-card>

            </div>
            <v-card elevation="0" style="border-radius: 12px">
                <v-card-title style="background: #f6f6f6">
                    {{ $t('ReservationList') }}
                    <v-spacer></v-spacer>
                    <v-btn class="mr-2" elevation="0" @click="loadData">
                        <v-icon left>mdi-refresh</v-icon>
                        {{ $t('reload') }}
                    </v-btn>
                    <div class="d-flex align-center text-body-2 mr-2" @click="showAllReservation=!showAllReservation">
                        <v-simple-checkbox v-model="showAllReservation" dense hide-details></v-simple-checkbox>
                        {{ $t('DisplayAll') }}
                    </div>
                    <div style="max-width: 196px">
                        <v-text-field
                                v-model="search"
                                append-icon="mdi-magnify"
                                dense
                                hide-details
                                label="Search"
                                solo
                        ></v-text-field>
                    </div>

                </v-card-title>
                <v-data-table
                        :custom-filter="filterItem"
                        :headers="headers"
                        :items="displayReservationItems"
                        :search="search"
                        fixed-header
                        height="calc(100vh - 224px)"
                        @click:row="toggleActiveReservation">
                    <template #item.action="{item}">
                        <div style="display: grid;grid-gap: 4px;grid-auto-flow: column">

                            <v-btn
                                    :color="item.completed==='1'?'success':''" :disabled="item.completed==='1'"
                                    elevation="0"
                                    small
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
                            {{ item.note ? item.note : $t('Nothing') }}
                        </div>
                    </template>
                    <template #item.person="{item}">
                        <v-chip small>
                            <template v-if="item.personCount>0">
                                <v-icon class="mr-1" small>mdi-human-male-female</v-icon>
                                {{ item.personCount }}
                            </template>
                            <template v-if="item.childCount>0">
                                <v-icon class="ml-3 mr-1" small>mdi-human-child</v-icon>
                                {{ item.childCount }}
                            </template>
                            <template v-if="item.useStroller==='1'">
                                <v-icon class="ml-3" small>mdi-baby-carriage</v-icon>
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
        </template>
        <div v-else class="d-flex flex-column justify-center align-center"
             style="height: 100%;width: 100%;grid-column: span 2">
            <div class="d-flex flex-column justify-center text-center" style="max-width: 300px">
                <v-icon size="64">mdi-calendar-lock</v-icon>
                <div class="text-body-1 mt-4">
                    {{ $t('ReservationSystemIsNotOpen') }}
                </div>
                <div class="text-body-2 text--secondary mt-1">
                    {{ $t('OpenReservationHint') }}
                </div>
            </div>

        </div>

        <v-dialog v-model="showReservation" max-width="600px">
            <v-card v-if="activeReservation" class="pa-4"
                    color="grey lighten-4" elevation="0" style="border-radius: 12px">
                <div class="d-flex">
                    <div class="text-subtitle-1">
                        {{ activeReservation.title }} {{ activeReservation.firstName }} {{
                        activeReservation.lastName
                        }}
                    </div>
                    <v-spacer></v-spacer>
                    <v-chip v-if="activeReservation.cancelled==='0'" color="success" small>
                        <v-icon left>mdi-circle-medium</v-icon>
                        {{ $t('normal') }}
                    </v-chip>
                    <v-chip v-else color="error" small>
                        <v-icon left>mdi-remove</v-icon>
                        {{ $t('AlreadyCancelled') }}
                    </v-chip>
                </div>

                <div class="mt-12">
                    <div class="d-flex">
                        <div class="text-body-1">{{ $t('time') }}</div>
                        <v-spacer></v-spacer>
                        <v-icon class="mr-2" small>mdi-clock</v-icon>
                        {{ activeReservation.fromDateTime|onlyTime }} -
                        {{ activeReservation.toDateTime|onlyTime }}
                    </div>
                    <v-divider class="my-3"></v-divider>
                    <div class="d-flex">
                        <div class="text-body-1">{{ $t('NumberOfPeople') }}</div>
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
                            <div class="text-body-1">{{ $t('NeedStroller') }}</div>
                            <v-spacer></v-spacer>
                            <v-chip small>
                                <v-icon small>mdi-check</v-icon>
                            </v-chip>
                        </div>
                        <v-divider class="my-3"></v-divider>
                    </template>
                    <div class="d-flex">
                        <div class="text-body-1">{{ $t('TableNumber') }}</div>
                        <v-spacer></v-spacer>
                        <v-chip color="primary lighten-2" label>
                            <v-icon left>mdi-map-marker-check-outline</v-icon>
                            {{ activeReservation.tableNameNull }}
                        </v-chip>
                    </div>

                    <div class="mt-8" style="display: grid;grid-gap: 8px;">
                        <v-btn block color="warning" elevation="0" @click="moveReservation(activeReservation.id)">{{
                            $t('ReplaceTable')
                            }}
                        </v-btn>
                        <v-btn block color="error" elevation="0" outlined
                               @click="cancelReservation(activeReservation.id)">
                            {{ $t('CancelReservation') }}
                        </v-btn>

                    </div>

                </div>
            </v-card>
        </v-dialog>
        <v-dialog v-model="reservationAddDialog" max-width="600px">
            <v-card v-if="reservationStep===0"
                    class="pa-4" color="grey lighten-4" elevation="0" style="border-radius: 12px">
                <div class="d-flex">
                    <div class="text-subtitle-1">
                        {{ $t('CreateNewReservation') }}
                    </div>
                    <v-spacer></v-spacer>
                    {{ $t('EnterTimeAndNumberOfPeopleToDetermineIfATableIsAvailable') }}
                </div>
                <div class="mt-8">
                    <div class="d-flex align-center">
                        <div class="text-body-1">{{ $t('time') }}</div>
                        <v-spacer></v-spacer>
                        <div style="width: 280px">
                            <v-select v-model="startTime" :items="timeGap" hide-details return-object solo></v-select>
                        </div>
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div class="d-flex align-center">
                        <div class="text-body-1">{{ $t('NumberOfAdults') }}</div>
                        <v-icon class="ml-2">mdi-human-male-female</v-icon>
                        <v-spacer></v-spacer>

                        <v-btn icon large @click="adultCount>0?adultCount--:adultCount=0">
                            <v-icon>mdi-minus-circle</v-icon>
                        </v-btn>
                        {{ adultCount }}
                        <v-btn icon large @click="adultCount++">
                            <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div class="d-flex align-center">
                        <div class="text-subtitle-2">{{ $t('NumberOfChildren') }}</div>
                        <v-icon class=" ml-2">mdi-human-child</v-icon>
                        <v-spacer></v-spacer>

                        <v-btn icon large @click="childCount>0?childCount--:childCount=0">
                            <v-icon>mdi-minus-circle</v-icon>
                        </v-btn>
                        {{ childCount }}
                        <v-btn icon large @click="childCount++">
                            <v-icon>mdi-plus-circle</v-icon>
                        </v-btn>
                    </div>

                    <v-divider class="my-2"></v-divider>
                    <v-btn block color="primary" large @click="checkCurrentTime">
                        <v-icon left>mdi-magnify</v-icon>
                        {{ $t('search') }}
                    </v-btn>
                </div>

            </v-card>
            <v-card v-if="reservationStep===1"
                    class="pa-4" color="grey lighten-4" elevation="0" style="border-radius: 12px">
                <div>
                    <div v-if="otherTime.length>0">
                        <v-chip color="primary" label>
                            {{ $t('FollowingTimeSlotsAreStillAvailable') }}
                        </v-chip>
                        <div class="d-flex flex-wrap mt-2">
                            <v-chip v-for="time in otherTime" :key="time" class="ma-1" large
                                    @click="useOtherTime(time)">
                                {{ reservationDate + ' ' + time|onlyTime }}
                            </v-chip>
                        </div>

                    </div>
                    <div v-else class="d-flex align-center flex-column mt-8" style="height: 200px">
                        <v-icon x-large>mdi-kettle-steam</v-icon>
                        <div class="mt-4">{{ $t('ThereNoAvailableTablesOnThisDay') }}</div>
                        <v-btn class="mt-8" text @click="reservationAddDialog=false">
                            <v-icon left>mdi-close</v-icon>
                            {{ $t('Close') }}
                        </v-btn>
                    </div>
                </div>

            </v-card>
            <v-card v-else-if="reservationStep===2"
                    class="pa-4"
                    color="grey lighten-4" elevation="0" style="border-radius: 12px">
                <div class="d-flex">
                    <div class="text-subtitle-1">
                        {{ $t('CreateNewReservation') }}
                    </div>
                    <v-spacer></v-spacer>
                    <v-chip color="success" small>
                        <v-icon left>mdi-circle-medium</v-icon>
                        {{ $t('normal') }}
                    </v-chip>
                </div>

                <div class="mt-8">
                    <div class="d-flex">
                        <div class="text-subtitle-2">{{ $t('time') }}</div>
                        <v-spacer></v-spacer>
                        <v-icon class="mr-2" small>mdi-clock</v-icon>
                        {{ startTime }}
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div style="display: grid;grid-template-columns: 50% 50%">
                        <div class="d-flex align-center pr-8">
                            <div class="text-subtitle-2">{{ $t('first_name') }}</div>
                            <v-spacer></v-spacer>
                            <v-text-field v-model="firstName" dense hide-details solo></v-text-field>
                        </div>
                        <div class="d-flex align-center pl-8">
                            <div class="text-subtitle-2">{{ $t('last_name') }}</div>
                            <v-spacer></v-spacer>
                            <v-text-field v-model="lastName" dense hide-details solo></v-text-field>
                        </div>
                    </div>

                    <v-divider class="my-2"></v-divider>
                    <div class="d-flex align-center">
                        <div class="text-subtitle-2">{{ $t('NumberOfAdults') }}</div>
                        <v-spacer></v-spacer>
                        <v-icon class="mr-2">mdi-human-male-female</v-icon>
                        {{ adultCount }}
                    </div>
                    <v-divider class="my-2"></v-divider>
                    <div class="d-flex align-center">
                        <div class="text-subtitle-2">{{ $t('NumberOfChildren') }}</div>
                        <v-spacer></v-spacer>
                        <v-icon class="ml-2 mr-2">mdi-human-child</v-icon>
                        {{ childCount }}
                    </div>

                    <v-divider class="my-2"></v-divider>
                    <div class="d-flex align-center">
                        <div class="text-subtitle-2">{{ $t('telefon') }}</div>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="phone" dense hide-details solo></v-text-field>
                    </div>

                    <v-divider class="my-2"></v-divider>
                    <div class="d-flex align-center">
                        <div class="text-subtitle-2">{{ $t('Email') }}</div>
                        <v-spacer></v-spacer>
                        <v-text-field v-model="email" dense hide-details solo></v-text-field>
                    </div>

                    <v-divider class="my-2"></v-divider>

                    <div class="d-flex">
                        <div class="text-subtitle-2">{{ $t('note') }}</div>
                        <v-spacer></v-spacer>
                        <v-textarea v-model="note" height="100" solo/>
                    </div>
                    <v-divider class="my-2"></v-divider>

                    <template>
                        <div class="d-flex">
                            <div class="text-subtitle-2">{{ $t('NeedStroller') }}</div>
                            <v-spacer></v-spacer>
                            <v-simple-checkbox v-model="useStroller"/>
                        </div>
                        <v-divider class="my-2"></v-divider>
                    </template>
                    <v-btn block color="success" @click="submitReservation">{{ $t('Save') }}</v-btn>

                </div>
            </v-card>
        </v-dialog>
        <v-dialog v-model="tableSettingDialog" max-width="600px">
            <v-card color="#f6f6f6" style="border-radius: 12px">
                <v-card-title>{{ $t('ReservedTableSetting') }}</v-card-title>
                <v-card-text class="pa-4" style="overflow: scroll">
                    <div
                            style="display: grid;grid-template-columns: repeat(4,1fr);grid-gap: 4px;max-height: 70vh;overflow-y: scroll">
                        <v-card v-for="t in tableList" :key="t.id"
                                :color="t.reservable?'primary':''"
                                :dark="t.reservable"
                                class="pa-4 d-flex align-center justify-center flex-column" elevation="0"
                                @click="setTableReservable(t.tableId,!t.reservable)">
                            <h2>
                                {{ t.tableName }}
                            </h2>
                            <div class="pa-2 px-3 mt-2 d-flex align-center">
                                <v-icon left size="18">mdi-seat</v-icon>
                                {{ t.tableSeatCount ? t.tableSeatCount : 0 }}
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
  getReservationUserList,
  getTimeSlotForDate,
  loadReserveSettings,
  moveReservation,
  setReservable
} from '@/api/ReservationService'
import IKUtils from 'innerken-js-utils'
import { onlyTimeFormat, todayDate } from '@/api/dateUtils'
import { loadReservationTableInfo } from '@/api/tableService'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { showSuccessMessage, sureTo } from '@/api/api'
import i18n from '@/i18n'

export default {
  name: 'Reservation',
  data: function () {
    return {
      notActive: true,

      userId: null,
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
        { text: i18n.t('name'), value: 'user' },
        { text: i18n.t('Message'), value: 'note' },
        { text: i18n.t('TableNumber'), value: 'tableNameNull' },
        { text: i18n.t('NumberOfPeople'), value: 'person' },
        { text: i18n.t('time'), value: 'time' },
        { text: i18n.t('Confirm'), value: 'action' }

      ],
      setting: {
        gap: 'PT15M'
      }
    }
  },
  computed: {
    displayReservationItems () {
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
        IKUtils.showError(this.$t('PleaseSelectReservationTime') + '！')
        return
      }
      const res = await checkTableTimeAvailable(
        this.reservationDate,
        this.startTime,
        parseInt(this.adultCount) + parseInt(this.childCount),
        this.userId)
      if (!res) {
        this.reservationStep = 2
      } else if (res === '请设置该人数的规则') {
        IKUtils.showError(this.$t('checkPersonRules') + '!')
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
      await sureTo(
        async () => {
          const res = await confirmReservation(id)
          console.log(res)
        })
      await this.loadData()
    },
    async submitReservation () {
      if (!this.firstName && !this.lastName) {
        IKUtils.showError(this.$t('PleaseEnterName') + '!')
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
        useStroller: this.useStroller ? 1 : 0,
        userId: this.userId
      })
      console.log(res)
      if (res.message === '已预定') {
        IKUtils.showError(this.$t('emailAlreadyOrder') + '!')
        this.email = ''
      } else {
        this.reservationAddDialog = false
        this.clearForm()
        await this.loadData()
        IKUtils.toast()
      }
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
      this.showReservation = false
      this.activeReservation = null
      await this.loadReservations()
    },

    async moveReservation (id) {
      await moveReservation(id)
      showSuccessMessage('success')
      await this.loadData()
    },
    async loadData () {
      const activeReservationStoreList = (await getReservationUserList()).map(it => it.id)
      if (!activeReservationStoreList.includes(parseInt(GlobalConfig.DeviceId))) {
        this.notActive = true
      } else {
        this.notActive = false
      }
      await this.loadReservations()
      await this.getTables()
      this.activeReservation = null
      this.setting = await loadReserveSettings()
      this.timeGap = await getTimeSlotForDate(this.reservationDate, this.setting)

      this.userId = parseInt(GlobalConfig.DeviceId)
    },
    async getTables () {
      this.tableList = await loadReservationTableInfo()
    },
    async setTableReservable (id, reservable) {
      await setReservable(id, reservable)
      await this.getTables()
    },
    async loadReservations () {
      this.reservations = (await getReservation(this.reservationDate))
    }
  },
  async mounted () {
    await this.loadData()
  }
}
</script>

<style scoped>

</style>
