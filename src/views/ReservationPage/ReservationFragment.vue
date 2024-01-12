<template>
  <div>
    <v-app-bar
        dark
        color="transparent"
        flat
    >
      <v-icon>mdi-menu</v-icon>
      <v-btn
          icon
          @click="reservationDate=dayjs(reservationDate).add(-1,'d').format('YYYY-MM-DD')"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <div class="d-flex align-center">
        <div class="text-caption">
          {{ dayjs(reservationDate).format('dddd') }}
        </div>
        <div class="font-weight-black text-h5 mx-2">
          {{ dayjs(reservationDate).format('DD') }}
        </div>
        <div class="text-caption font-weight-black">
          {{ dayjs(reservationDate).format('MMMM') }}
        </div>
      </div>
      <v-btn
          icon
          @click="reservationDate=dayjs(reservationDate).add(1,'d').format('YYYY-MM-DD')"

      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
      <v-card
          class="pa-2 py-1 mr-1 text-body-2"
          flat
          color="rgba(255,255,255,.17)"
      >
        Today
      </v-card>
      <v-card
          class="pa-2 py-1 mr-1  text-body-2"
          flat
          color="rgba(255,255,255,.17)"
      >
        Tomorrow
      </v-card>
      <v-text-field
          dense
          class="mx-4"
          prepend-inner-icon="mdi-magnify"
          hide-details
          solo-inverted
          placeholder="Start typing to search"
      ></v-text-field>
      <v-btn
          icon
          class="mr-2"
      >
        <v-icon>mdi-cog</v-icon>
      </v-btn>
      <v-btn
          @click="addNewReservation"
          small
          icon
          class="white black--text"
      >
        <v-icon
        >mdi-plus
        </v-icon>
      </v-btn>
    </v-app-bar>
    <v-card rounded="lg">
      <div
          class="d-flex align-start"
          style="height: calc(100vh - 64px);
          width: 100vw;
          overflow-x: scroll;overflow-y: scroll;"
      >
        <v-card
            tile
            rounded="lg"
            style="position: sticky;display:grid;grid-auto-flow: row;
            grid-template-rows: 36px;
            grid-gap: 2px;
            left: 0;top:0; z-index: 4;"
            class="white"
        >
          <div></div>
          <div
              style="height: 36px"
              class="px-2 text-body-2"
          >
            Seated
          </div>
          <div
              :class="i%2===0?'grey lighten-2':'grey lighten-4'"
              class="d-flex align-center px-2 font-weight-black"
              style="height: 36px;width: 72px"
              v-for="(t,i) in tableList"
              :key="t.id"
          >
            {{ t.tableName }}
            <v-spacer></v-spacer>
            <v-icon color="green">mdi-circle-medium</v-icon>
          </div>
        </v-card>
        <div
            style="display: grid;grid-gap: 2px;position: relative"
            :style="{gridTemplateColumns:'repeat('+timeSlot.length+',40px)',
             gridTemplateRows:'repeat('+(tableList.length+2)+',36px)',
             }"
        >
          <template v-for="t in bigTime">
            <div
                :key="t"
                class="grey lighten-2 pa-1 text-caption"
                style="width: 100%;height: 100%;grid-column:span 4"
            >
              {{ t }}
            </div>
          </template>
          <template v-for="t in seatedInfo">
            <div
                :key="t.time"
                class="grey lighten-5 pa-1 text-center text-body-2"
                style="width: 100%;height: 100%;grid-column:span 2"
            >
              {{ t.count }}
            </div>
          </template>
          <canvas
              ref="background"
              class=""
              :width="containerWidth"
              :height="containerHeight"
              style="position: absolute;"
              :style="{
            gridColumn:'0 / '+timeSlot.length,
            gridRow:'3 / '+(tableList.length+6)
          }"
          ></canvas>
          <v-card
              color="transparent"
              flat
              tile
              :width="containerWidth"
              :height="containerHeight"
              style="position: absolute;"
              :style="{
            gridColumn:'0 / '+timeSlot.length,
            gridRow:'3 / '+(tableList.length+6)
          }"
          >
            <vue-draggable-resizable
                v-for="r in reservations"
                :key="r.id"
                :draggable="true"
                :grid="[40,36]"
                :h="36"
                :parent="true"
                :prevent-deactivation="false"
                active-class=""
                :resizable="false"
                :snap="true"
                :x="r.grid.x"
                :y="r.grid.y"
                :w="r.grid.w"
                class-name-dragging="dragging"
                @dragstop="(...args)=>onDrag(r,...args)"
            >
              <v-card

                  color="rgba(0,0,0,.64)"
                  height="36"
                  class="pa-2 white--text text-caption d-flex align-center reservationCard"
                  style="position: absolute;width: 100%"
                  :style="{
              gridColumn:r.grid.xStart+' / '+r.grid.xEnd,
              gridRow:r.grid.y
            }"
              >
                <v-icon
                    small
                    class="mr-2"
                    color="white"
                    @click="toggleActiveReservation(r)"
                >mdi-arrow-expand
                </v-icon>
                {{ r.firstName }} {{ r.lastName }}
                <v-spacer></v-spacer>
                <v-icon
                    small
                    class="mr-2"
                    color="white"
                >mdi-account
                </v-icon>
                {{ r.personCount }}
                <template v-if="r.childCount>0">
                  <v-icon
                      small
                      class="mx-2"
                      color="white"
                  >mdi-human-child
                  </v-icon>
                  {{ r.childCount }}
                </template>
              </v-card>
            </vue-draggable-resizable>
            <template>

            </template>

          </v-card>

        </div>
        <template v-if="false">
          <template v-if="!notActive">
            <v-card
                elevation="0"
                style="border-radius: 12px"
            >
              <v-card-title style="background: #f6f6f6">
                {{ $t('ReservationList') }}
                <v-spacer></v-spacer>
                <v-btn
                    class="mr-2"
                    elevation="0"
                    @click="loadData"
                >
                  <v-icon left>mdi-refresh</v-icon>
                  {{ $t('reload') }}
                </v-btn>
                <div style="max-width: 196px">
                  <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      dense
                      hide-details
                      :label="$t('search')"
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
                  @click:row="toggleActiveReservation"
              >
                <template #item.action="{item}">
                  <div style="display: grid;grid-gap: 4px;grid-auto-flow: column">

                    <v-btn
                        :color="item.completed==='1'?'success':''"
                        :disabled="item.completed==='1'"
                        elevation="0"
                        small
                        @click.stop="confirmReservation(item.id)"
                    >
                      <v-icon left>mdi-check</v-icon>
                      {{ $t('Arrival') }}
                    </v-btn>
                    <v-btn
                        elevation="0"
                        small
                        @click.stop="toggleActiveReservation(item)"
                    >
                      <v-icon left>mdi-open-in-new</v-icon>
                      {{ $t('Details') }}
                    </v-btn>
                  </div>

                </template>
                <template #item.note="{item}">
                  <div
                      class="text-decoration-underline"
                      style="max-width: 96px;overflow: hidden;white-space: nowrap;
                  text-overflow: ellipsis"
                  >
                    {{ item.note ? item.note : $t('Nothing') }}
                  </div>
                </template>
                <template #item.person="{item}">
                  <v-chip small>
                    <template v-if="item.personCount>0">
                      <v-icon
                          class="mr-1"
                          small
                      >mdi-human-male-female
                      </v-icon>
                      {{ item.personCount }}
                    </template>
                    <template v-if="item.childCount>0">
                      <v-icon
                          class="ml-3 mr-1"
                          small
                      >mdi-human-child
                      </v-icon>
                      {{ item.childCount }}
                    </template>
                    <template v-if="item.useStroller==='1'">
                      <v-icon
                          class="ml-3"
                          small
                      >mdi-baby-carriage
                      </v-icon>
                    </template>
                  </v-chip>
                </template>
                <template #item.user="{item}">
                  <div class="pa-2">
                    <div class="font-weight-bold">
                      {{ item.title }} {{ item.firstName }} {{ item.lastName }}
                    </div>
                    <div
                        class="text--secondary"
                        style="border-bottom: 1px dashed black;width: fit-content"
                    >
                      {{ item.tel }}
                    </div>
                  </div>
                </template>
                <template #item.time="{item}">
                  <v-chip
                      outlined
                      small
                  >
                    <v-icon
                        left
                        small
                    >mdi-clock-outline
                    </v-icon>
                    {{ item.fromDateTime | onlyTime }} - {{ item.toDateTime | onlyTime }}
                  </v-chip>
                </template>
              </v-data-table>
            </v-card>
          </template>
          <no-content-display
              v-else
              icon="mdi-calendar-lock"
              :title="$t('ReservationSystemIsNotOpen')"

              :desc="$t('OpenReservationHint')"
          />

        </template>
      </div>
    </v-card>
    <v-dialog
        v-model="showReservation"
        max-width="600px"
    >
      <v-card
          v-if="activeReservation"
          class="pa-4"
          color="grey lighten-4"
          elevation="0"
          style="border-radius: 12px"
      >
        <div class="d-flex">
          <div class="text-subtitle-1">
            {{ activeReservation.title }} {{ activeReservation.firstName }} {{
              activeReservation.lastName
            }}
          </div>
          <v-spacer></v-spacer>
          <v-chip
              v-if="activeReservation.cancelled==='0'"
              color="success"
              small
          >
            <v-icon left>mdi-circle-medium</v-icon>
            {{ $t('normal') }}
          </v-chip>
          <v-chip
              v-else
              color="error"
              small
          >
            <v-icon left>mdi-remove</v-icon>
            {{ $t('AlreadyCancelled') }}
          </v-chip>
        </div>

        <div class="mt-12">
          <div class="d-flex">
            <div class="text-body-1">{{ $t('time') }}</div>
            <v-spacer></v-spacer>
            <v-icon
                class="mr-2"
                small
            >mdi-clock
            </v-icon>
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
            <v-chip
                color="primary lighten-2"
                label
            >
              <v-icon left>mdi-map-marker-check-outline</v-icon>
              {{ activeReservation.tableNameNull }}
            </v-chip>
          </div>

          <div
              class="mt-8"
              style="display: grid;grid-gap: 8px;"
          >
            <v-btn
                block
                color="warning"
                elevation="0"
                @click="moveReservation(activeReservation.id)"
            >{{
                $t('ReplaceTable')
              }}
            </v-btn>
            <v-btn
                block
                color="error"
                elevation="0"
                outlined
                @click="cancelReservation(activeReservation.id)"
            >
              {{ $t('CancelReservation') }}
            </v-btn>

          </div>

        </div>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="reservationAddDialog"
        max-width="600px"
    >
      <v-card
          v-if="reservationStep===0"
          class="pa-4"
          color="grey lighten-4"
          elevation="0"
          style="border-radius: 12px"
      >
        <div class="d-flex align-baseline">
          <div class="text-subtitle-1 font-weight-bold">
            {{ $t('CreateNewReservation') }}
          </div>
          <v-spacer></v-spacer>
          <div style="max-width: 340px">{{ $t('EnterTimeAndNumberOfPeopleToDetermineIfATableIsAvailable') }}</div>
        </div>
        <div class="mt-8">
          <div class="d-flex align-center">
            <div class="text-body-1">{{ $t('time') }}</div>
            <v-spacer></v-spacer>
            <div style="width: 280px">
              <v-select
                  v-model="startTime"
                  :items="timeGap"
                  hide-details
                  return-object
                  solo
              ></v-select>
            </div>
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-body-1">{{ $t('NumberOfAdults') }}</div>
            <v-icon class="ml-2">mdi-human-male-female</v-icon>
            <v-spacer></v-spacer>

            <v-btn
                icon
                large
                @click="adultCount>0?adultCount--:adultCount=0"
            >
              <v-icon>mdi-minus-circle</v-icon>
            </v-btn>
            {{ adultCount }}
            <v-btn
                icon
                large
                @click="adultCount++"
            >
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </div>
          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-subtitle-2">{{ $t('NumberOfChildren') }}</div>
            <v-icon class=" ml-2">mdi-human-child</v-icon>
            <v-spacer></v-spacer>

            <v-btn
                icon
                large
                @click="childCount>0?childCount--:childCount=0"
            >
              <v-icon>mdi-minus-circle</v-icon>
            </v-btn>
            {{ childCount }}
            <v-btn
                icon
                large
                @click="childCount++"
            >
              <v-icon>mdi-plus-circle</v-icon>
            </v-btn>
          </div>

          <v-divider class="my-2"></v-divider>
          <v-btn
              block
              color="primary"
              large
              @click="checkCurrentTime"
          >
            <v-icon left>mdi-magnify</v-icon>
            {{ $t('search') }}
          </v-btn>
        </div>

      </v-card>
      <v-card
          v-if="reservationStep===1"
          class="pa-4"
          color="grey lighten-4"
          elevation="0"
          style="border-radius: 12px"
      >
        <div>
          <div v-if="otherTime.length>0">
            <v-chip
                color="primary"
                label
            >
              {{ $t('FollowingTimeSlotsAreStillAvailable') }}
            </v-chip>
            <div class="d-flex flex-wrap mt-2">
              <v-chip
                  v-for="time in otherTime"
                  :key="time"
                  class="ma-1"
                  large
                  @click="useOtherTime(time)"
              >
                {{ reservationDate + ' ' + time|onlyTime }}
              </v-chip>
            </div>

          </div>
          <div
              v-else
              class="d-flex align-center flex-column mt-8"
              style="height: 200px"
          >
            <v-icon x-large>mdi-kettle-steam</v-icon>
            <div class="mt-4">{{ $t('ThereNoAvailableTablesOnThisDay') }}</div>
            <v-btn
                class="mt-8"
                text
                @click="reservationAddDialog=false"
            >
              <v-icon left>mdi-close</v-icon>
              {{ $t('Close') }}
            </v-btn>
          </div>
        </div>

      </v-card>
      <v-card
          v-else-if="reservationStep===2"
          class="pa-4"
          color="grey lighten-4"
          elevation="0"
          style="border-radius: 12px"
      >
        <div class="d-flex">
          <div class="text-subtitle-1">
            {{ $t('CreateNewReservation') }}
          </div>
          <v-spacer></v-spacer>
          <v-chip
              color="success"
              small
          >
            <v-icon left>mdi-circle-medium</v-icon>
            {{ $t('normal') }}
          </v-chip>
        </div>

        <div class="mt-8">
          <div class="d-flex">
            <div class="text-subtitle-2">{{ $t('time') }}</div>
            <v-spacer></v-spacer>
            <v-icon
                class="mr-2"
                small
            >mdi-clock
            </v-icon>
            {{ startTime }}
          </div>
          <v-divider class="my-2"></v-divider>
          <div style="display: grid;grid-template-columns: 50% 50%">
            <div class="d-flex align-center pr-8">
              <div class="text-subtitle-2">{{ $t('first_name') }}</div>
              <v-spacer></v-spacer>
              <v-text-field
                  v-model="firstName"
                  dense
                  hide-details
                  solo
              ></v-text-field>
            </div>
            <div class="d-flex align-center pl-8">
              <div class="text-subtitle-2">{{ $t('last_name') }}</div>
              <v-spacer></v-spacer>
              <v-text-field
                  v-model="lastName"
                  dense
                  hide-details
                  solo
              ></v-text-field>
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
            <v-text-field
                v-model="phone"
                dense
                hide-details
                solo
            ></v-text-field>
          </div>

          <v-divider class="my-2"></v-divider>
          <div class="d-flex align-center">
            <div class="text-subtitle-2">{{ $t('Email') }}</div>
            <v-spacer></v-spacer>
            <v-text-field
                v-model="email"
                dense
                hide-details
                solo
            ></v-text-field>
          </div>

          <v-divider class="my-2"></v-divider>

          <div class="d-flex">
            <div class="text-subtitle-2">{{ $t('note') }}</div>
            <v-spacer></v-spacer>
            <v-textarea
                v-model="note"
                height="100"
                solo
            />
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
          <v-btn
              block
              color="success"
              @click="submitReservation"
          >{{ $t('Save') }}
          </v-btn>

        </div>
      </v-card>
    </v-dialog>
    <v-dialog
        v-model="tableSettingDialog"
        max-width="600px"
    >
      <v-card
          color="#f6f6f6"
          style="border-radius: 12px"
      >
        <v-card-title>{{ $t('ReservedTableSetting') }}</v-card-title>
        <v-card-text
            class="pa-4"
            style="overflow: scroll"
        >
          <div
              style="display: grid;grid-template-columns: repeat(4,1fr);grid-gap: 4px;max-height: 70vh;overflow-y: scroll"
          >
            <v-card
                v-for="t in tableList"
                :key="t.id"
                :color="t.reservable?'primary':''"
                :dark="t.reservable"
                class="pa-4 d-flex align-center justify-center flex-column"
                elevation="0"
                @click="setTableReservable(t.tableId,!t.reservable)"
            >
              <h2>
                {{ t.tableName }}
              </h2>
              <div class="pa-2 px-3 mt-2 d-flex align-center">
                <v-icon
                    left
                    size="18"
                >mdi-seat
                </v-icon>
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
import NoContentDisplay from '@/views/FirstPage/widget/NoContentDisplay.vue'
import { getCurrentDeviceId } from '@/api/VIPCard/VIPCloudApi'
import dayjs from 'dayjs'
import { dragscroll } from 'vue-dragscroll/src/main'

export default {
  name: 'Reservation',
  components: {
    NoContentDisplay
  },
  data: function () {
    return {
      notActive: true,
      userId: null,
      todayDate,
      reservationDate: todayDate,
      showAllReservation: false,
      timeSlot: Array.from(Array(24 - 7 + 3).keys())
        .map(it => (it + 7) % 24).map(it => Array
          .from(Array(4).keys())
          .map(minute => it.toString().padStart(2, '0') +
                  ':' + (minute * 15).toString().padStart(2, '0'))).flat(),
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
        {
          text: i18n.t('name'),
          value: 'user'
        },
        {
          text: i18n.t('Message'),
          value: 'note'
        },
        {
          text: i18n.t('TableNumber'),
          value: 'tableNameNull'
        },
        {
          text: i18n.t('NumberOfPeople'),
          value: 'person'
        },
        {
          text: i18n.t('time'),
          value: 'time'
        },
        {
          text: i18n.t('status'),
          value: 'action'
        }

      ],
      setting: {
        gap: 'PT15M'
      }
    }
  },
  computed: {
    displayReservationItems () {
      return this.reservations.filter(item => (this.showAllReservation || item.completed === '0'))
    },
    containerWidth () {
      return (this.timeSlot.length * 40) + (this.timeSlot.length - 1) * 2
    },
    containerHeight () {
      return (this.tableList.length * 36) + (this.tableList.length - 1) * 2
    },
    bigTime () {
      console.log(this.timeSlot.filter(it => it.endsWith('00')))
      return this.timeSlot.filter(it => it.endsWith('00'))
    },
    seatedInfo () {
      const list = this.timeSlot.filter(it => it.endsWith('00') || it.endsWith('30'))
      return list.map(it => {
        let seatCount = 0
        const target = dayjs(this.reservationDate + ' ' + it)
        this.reservations.forEach(r => {
          const [start, end] = [r.fromDateTime, r.toDateTime].map(t => dayjs(t))
          if (target.isBefore(end) && target.add(30, 'm').isAfter(start)) {
            seatCount++
          }
        })
        return {
          time: it,
          count: seatCount
        }
      })
    }
  },
  directives: {
    dragscroll
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
    dayjs,
    onDrag: function (table, x, y) {
      console.log(table, x, y)
    },
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
          await confirmReservation(id)
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
      showSuccessMessage(i18n.t('Success'))
      await this.loadData()
    },
    async loadData () {
      const activeReservationStoreList = (await getReservationUserList()).map(it => it.id)
      this.notActive = !activeReservationStoreList.includes(parseInt(await getCurrentDeviceId()))
      await this.getTables()
      await this.loadReservations()

      this.activeReservation = null
      this.setting = await loadReserveSettings()
      this.timeGap = await getTimeSlotForDate(this.reservationDate, this.setting)
      this.userId = parseInt(GlobalConfig.DeviceId)
      this.$nextTick(() => {
        if (this.$refs.background) {
          const ctx = this.$refs.background.getContext('2d')
          const maxHeight = this.tableList.length * 36 + (this.tableList.length - 1) * 2
          const maxWidth = this.timeSlot.length * 40 + (this.timeSlot.length - 1) * 2
          let currentX = 0
          let currentY = 0
          ctx.fillStyle = '#e0e0e0'
          ctx.clearRect(0, 0, maxWidth, maxHeight)

          this.tableList.forEach(() => {
            currentX = 0
            this.timeSlot.forEach(() => {
              ctx.fillRect(currentX, currentY, 40, 36)
              currentX += 40 + 2
            })
            ctx.fillStyle = ctx.fillStyle === '#e0e0e0' ? '#f5f5f5' : '#e0e0e0'
            currentY += 36 + 2
          })
        }
      })
    },
    async getTables () {
      this.tableList = await loadReservationTableInfo()
    },
    async setTableReservable (id, reservable) {
      await setReservable(id, reservable)
      await this.getTables()
    },
    async loadReservations () {
      this.reservations = (await getReservation(this.reservationDate)).map(it => {
        const xIndex = this.timeSlot.findIndex(t => dayjs(it.fromDateTime).format('HH:mm') === t)
        const xStopIndex = this.timeSlot.findIndex(t => dayjs(it.toDateTime).format('HH:mm') === t)
        const yIndex = this.tableList.findIndex(t => parseInt(t.tableId) === parseInt(it.tableId))
        it.grid = {
          x: xIndex * 40 + (xIndex - 1) * 2,
          w: (xStopIndex - xIndex) * 40 + (xStopIndex - xIndex) * 2,
          y: yIndex * 36 + (yIndex - 1) * 2
        }
        return it
      })
    }
  },
  async mounted () {
    await this.loadData()
  }
}
</script>

<style scoped>
.reservationCard:hover {
  background-color: black !important;
}

</style>
