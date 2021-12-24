<template>
  <v-dialog v-model="realShow" scrollable>
    <v-card>
      <v-toolbar flat fixed class="caption">
        <v-toolbar-title style="color: #0d47a1">
          {{ realTitle }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="realShow=false">
          <v-icon>mdi-close</v-icon>
        </v-btn>

        <template v-slot:extension>
          <v-tabs grow v-model="tab">
            <v-tab v-for="section in showTables" :key="'tab'+section.areaName">
              <span class="areaTitle font-weight-bold"
                    style="font-size: 20px; color: black">{{ section.areaName }}</span>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-tabs-items v-model="tab">
        <v-tab-item v-for="(section,index) in showTables" :key="`section`+ index" style="height: 500px">

          <div style="; display: grid; grid-template-columns: repeat(6,120px); grid-gap: 10px; ">
            <v-btn v-for="(table,index) of section.tables"
                   :key="`table`+index"
                   style="color: #0d47a1; height: 65px"
                   @click="tryOpenNormalTable(table)"
            >
              {{ $t(table.tableName) }}
            </v-btn>
          </div>
        </v-tab-item>
      </v-tabs-items>

      <!--     </v-tab-item> <v-card-actions>-->
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
import { getSectionList, getServantList, getTableListWithCells } from '../../oldjs/api'

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
    realTitle () {
      if (this.title === 'TableChange') {
        // this.changeOrMergeFlag = false
        return 'Table Change:'
      } else if (this.title === 'TableMerge') {
        // this.changeOrMergeFlag = true
        return 'Table Merge:'
      } else {
        return ''
      }
    }
  },
  data: function () {
    return {
      changeOrMergeFlag: null,
      tab: null,
      realShow: null,
      selectedTableNumber: null,
      areaTables: [],
      onlyAvailable: true,
      sections: null,
      activeTables: {},
      inactiveTables: {},
      tableList: [],
      showTables: []
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
    async refreshTables () {
      if (!this.useOrderView) {
        this.tableList = await getTableListWithCells()
      } else {
        this.areas = await getActiveTables()
      }
    },
    async refreshSectionList () {
      this.sectionList = await getSectionList()
    },
    initialMenu: async function () {
      // const allTables = (await getActiveTables()).filter(item => item.areaName.toLowerCase() !== 'togo')
      this.tableList = await getTableListWithCells()
      // this.tableList = await getActiveTables()
      this.sectionList = (await getSectionList()).filter(item => item.name.toLowerCase() !== 'togo')
      this.servantList = await getServantList()

      console.log('this.tableList', this.tableList)
      console.log('this.sectionList', this.sectionList)
      console.log('this.servantList', this.servantList)

      if (this.title === 'TableChange') {
        this.showTables = []
        for (const section of this.sectionList) {
          const temp = {
            areaName: section.name,
            tables: this.tableList.filter(item => (item.usageStatus === '1' && item.sectionName === section.name))
          }
          if (temp.tables.length > 0) {
            this.showTables.push(temp)
          }
        }
        // console.log('this.showTables', this.showTables)
      } else if (this.title === 'TableMerge') {
        this.showTables = []
        for (const section of this.sectionList) {
          const temp = {
            areaName: section.name,
            tables: this.tableList.filter(item => (item.usageStatus === '0' && item.sectionName === section.name))
          }
          if (temp.tables.length > 0) {
            this.showTables.push(temp)
          }
        }
        console.log(' this.showTables', this.showTables)
      }
      console.log('this.showTables', this.showTables)
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
