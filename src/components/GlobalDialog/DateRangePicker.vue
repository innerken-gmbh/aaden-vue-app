<template>
  <div class="pa-1">
    <h3>{{ $t('DateRange') }}</h3>
    <div class="mt-2">
      <div style="display: grid;grid-template-columns: repeat(2,1fr);grid-gap: 8px">
        <div>
          <v-dialog
              ref="dialog"
              v-model="startDateDialog"
              width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="startDate"
                  :label="$t('From')"
                  :placeholder="$t('From')"
                  hide-details
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  solo
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="startDate"
                :max="endDate"
                @input="startDateDialog=false"
            >
            </v-date-picker>
          </v-dialog>
        </div>
        <div>
          <v-dialog
              ref="dialog"
              v-model="endDateDialog"
              width="290px"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                  v-model="endDate"
                  :label="$t('InputTo')"
                  :placeholder="$t('InputTo')"
                  hide-details
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  solo
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                v-model="endDate"
                :max="today"
                :min="startDate"
                @input="endDateDialog=false"
            >
            </v-date-picker>
          </v-dialog>
        </div>
      </div>
    </div>

    <div class="mt-4"
         style="display: grid;grid-template-columns: repeat(4,1fr);grid-gap: 8px">

      <base-card
          v-for="d in predefinedTimeList" :key="d.label"
          :active="currentDateMatch(d.dateRange())"
          :style="currentDateMatch(d.dateRange())?{color:'white'}:{}"
          @click="dateRange=d.dateRange()">
        <div class="d-flex justify-center align-center text-body-1"
             style="height: 100%">
          {{ $t(d.label) }}
        </div>
      </base-card>

    </div>
  </div>
</template>

<script>

import BaseCard from '@/components/Base/BaseCard'
import { predefinedDateRangeList, today } from '@/api/Repository/DateRepository'

export default {
  name: 'DateRangePicker',
  components: { BaseCard },
  data: function () {
    return {
      startDate: null,
      endDate: null,
      startDateDialog: null,
      endDateDialog: null,
      predefinedTimeList: predefinedDateRangeList
    }
  },
  computed: {
    today () {
      return today()
    },
    dateRange: {
      get () {
        return [this.startDate, this.endDate]
      },
      set (val) {
        if (val?.length === 2) {
          [this.startDate, this.endDate] = val
        }
      }
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.dateRange = val
      }
    },
    dateRange (val) {
      this.$emit('input', val)
    }
  },
  props: {
    value: {}
  },
  methods: {
    currentDateMatch (dateRange) {
      return [this.startDate, this.endDate].join() === dateRange.join()
    }
  }
}
</script>

<style scoped>

</style>
