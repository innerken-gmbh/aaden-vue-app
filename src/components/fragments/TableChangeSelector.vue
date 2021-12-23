<template>
  <v-dialog v-model="realShow" scrollable>
    <v-card >
      <v-toolbar flat fixed class="caption">
        <v-toolbar-title>
          {{ title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="realShow=false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs grow v-model="tab">
            <v-tab v-for="area in areaTables" :key="'tab'+area.areaName">
              <span class="areaTitle font-weight-bold " style="font-size: 20px">{{ area.areaName }}</span>
            </v-tab>
<!--            <v-tab v-for="(section,index) in sections" :key="'tab'+index">-->
<!--              <span class="areaTitle font-weight-bold " style="font-size: 20px">{{ section.name }}</span>-->
<!--            </v-tab>-->

          </v-tabs>
        </template>
      </v-toolbar>

      <!--      <table-selector-->
      <!--        :extra-height="'300px'"-->
      <!--        :only-available="true"-->
      <!--        ref="tablePage"-->
      <!--        @table-selected="updateTable"-->
      <!--      />-->

      <v-card-text style=" height: 600px; width: 900px; color: white; padding: 5px">

        <v-tabs-items v-model="tab" >
          <v-tab-item v-for="(tables,index) in areaTables" :key="'tables'+index">
            <div v-dragscroll style="overflow-y: scroll; display: grid; grid-template-columns: repeat(6,90px); grid-gap: 8px; padding: 5px">
              <template v-for="(table,index) in tables.tables" >
                <v-btn :key="'table'+ index" @click="tryOpenNormalTable(table)" block style="height: 64px">
                  {{ table.tableName }}
                </v-btn>
              </template>

            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-card-text>

      <!--      <div v-bind:key="'area'+area.areaName" v-for="area in areaTables"-->
      <!--           class="area">-->
      <!--        <div class="areaTitle">{{ area.areaName }}</div>-->
      <!--        <div class="areaTableContainer">-->
      <!--          <template v-for="(table) in area.areaTables">-->
      <!--            <div v-if="table.usageStatus==='0'||!onlyAvailable" :key="'table'+table.tableName">-->
      <!--              <div v-if="table.usageStatus==='1'" class="tableCard"-->
      <!--                   v-bind:class="{onCall:parseInt(table.callService)===1}"-->
      <!--                   v-on:click='tableSelected(table)'>-->
      <!--                <div class="tableCardName tableBold">{{ table.tableName }}-->
      <!--                </div>-->
      <!--              </div>-->
      <!--              <div v-else @click="tableSelected(table)"-->
      <!--                   class="tableCard notUsed">-->
      <!--                <div class="tableCardName">-->
      <!--                  {{ table.tableName }}-->
      <!--                </div>-->
      <!--              </div>-->
      <!--            </div>-->
      <!--          </template>-->
      <!--        </div>-->
      <!--      </div>-->

      <!--      <v-card-actions>-->
      <!--        <v-spacer></v-spacer>-->
      <!--        <v-btn>{{ $t('取消') }}</v-btn>-->
      <!--        <v-btn>{{ $t('确定') }}</v-btn>-->
      <!--      </v-card-actions>-->
      <!--      </v-card-text>-->
    </v-card>
  </v-dialog>

</template>

<script>

import { getActiveTables } from 'aaden-base-model/lib/Models/AadenApi'
import { dragscroll } from 'vue-dragscroll'
import { openOrEnterTable } from '@/oldjs/common'

export default {
  name: 'TableChangeSelector',
  directives: {
    dragscroll
  },
  props: {
    title: {},
    activeStatus: {
      type: Boolean,
      default: null
    }, // true, false, null
    menuShow: {},
    servantPassword: {}
  },
  computed: {
  },
  data: function () {
    return {
      tab: null,
      realShow: null,
      selectedTableNumber: null,
      areaTables: [],
      onlyAvailable: true,
      sections: null,
      activeTables: {}
    }
  },
  watch: {

    realShow: function (val) {
      this.$emit('update:menuShow', val)
    },
    menuShow: async function (val) {
      this.realShow = val
      if (val) {
        this.initialMenu()
      }
    }
  },
  mounted () {
    this.initialMenu()
  },
  methods: {
    tryOpenNormalTable (table) {
      // if (this.selectedTableNumber && this.selectedTableNumber.length > 0) {
      //   openOrEnterTable(this.selectedTableNumber, this.servantPassword, true)
      // }
      console.log('Table', table)
      // openOrEnterTable(this.selectedTableNumber, this.servantPassword, true)
      openOrEnterTable(table.tableName, this.servantPassword, true)
    },
    // openTakeawayTable () {
    //   requestOutTable(this.servantPassword)
    // },

    updateTable (table) {
      if (table.usageStatus === '0') {
        this.selectedTableNumber = table.tableName
        console.log('this.selectedTableNumber', this.selectedTableNumber)
      }
      this.realShow = false
    },
    initialMenu: async function () {
      const allTables = (await getActiveTables()).filter(item => item.areaName.toLowerCase() !== 'togo')
      console.log('allTables', allTables)

      this.activeTables = allTables.filter(item => item.tables.filter(i => i.usageStatus === '1').length > 0)
      this.activeTables.forEach(function (item, index, arr) {
        item.tables = item.tables.filter(i => i.usageStatus === '1')
      })

      this.inactiveTables = allTables.filter(item => item.tables.filter(i => i.usageStatus === '0').length > 0)
      console.log('inactiveTables 1', this.inactiveTables)
      this.inactiveTables.forEach(function (item, index, arr) {
        item.tables = item.tables.filter(i => i.usageStatus === '0')
      })

      console.log('activeTables', this.activeTables)
      console.log('inactiveTables 2', this.inactiveTables)

      if (this.title === 'Table Change:') {
        this.areaTables = this.activeTables
      }
      if (this.title === 'Table Merge:') {
        this.areaTables = this.inactiveTables
      }

      // console.log('activeTables ', this.activeTables)
      // console.log('inactiveTables', this.inactiveTables)
      // this.sections = this.areaTables.map(item => item.areaName)
      // this.areas = await getAllTables()
      // console.log('this.areas', this.areas)
      this.selectedTableNumber = null
      // this.$nextTick(() => {
      //   if (this.$refs.tablePage) {
      //     this.$refs.tablePage.initialMenu()
      //   }
      // })
    }
  }
}
</script>

<style scoped>
.dishCardList {
  padding: 8px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  margin-bottom: 120px;
  width: 100%;
  grid-gap: 6px;
}
</style>
