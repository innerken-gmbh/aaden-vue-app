<template>
  <div class="pa-1">
    <h3>日期范围</h3>
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
                  label="从..."
                  placeholder="从..."
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  hide-details
                  solo
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                :max="endDate"
                v-model="startDate"
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
                  label="到..."
                  placeholder="到..."
                  prepend-inner-icon="mdi-calendar"
                  readonly
                  hide-details
                  solo
                  v-bind="attrs"
                  v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
                :min="startDate"
                :max="today"
                v-model="endDate"
                @input="endDateDialog=false"
            >
            </v-date-picker>
          </v-dialog>
        </div>
      </div>
    </div>

    <div style="display: grid;grid-template-columns: repeat(4,1fr);grid-gap: 8px"
         class="mt-4">

      <base-card
          :key="d.label" v-for="d in predefinedTimeList"
          :active="currentDateMatch(d.dateRange())"
          :style="currentDateMatch(d.dateRange())?{color:'white'}:{}"
          @click="dateRange=d.dateRange()">
        <div class="d-flex justify-center align-center text-body-1"
             style="height: 100%">
          {{ d.label }}
        </div>
      </base-card>
      ˛

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
      today,
      startDate: null,
      endDate: null,
      startDateDialog: null,
      endDateDialog: null,
      predefinedTimeList: predefinedDateRangeList
    }
  },
  computed: {
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
