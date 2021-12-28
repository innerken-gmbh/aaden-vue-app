<template>
  <v-dialog v-model="realShow" scrollable>
    <v-card>
      <v-toolbar flat fixed class="caption">
        <v-toolbar-title style="color: #0d47a1">
          {{ title }}
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="realShow=false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <template v-slot:extension>
          <v-tabs grow v-model="tab">
            <v-tab @click="activeSection(section.id)" v-for="section in sections" :key="section.id">
              <span class="areaTitle font-weight-bold"
                    style="font-size: 20px; color: black">{{ section.name }}</span>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <div style="height: 500px">
        <div style="display: grid; grid-template-columns: repeat(6,120px); grid-gap: 10px;">
          <v-btn v-for="(table) in displayTables"
                 :key="table.tableId"
                 style="color: #0d47a1; height: 65px"
                 @click="$emit('table-select',table.tableName)"
          >
            {{ table.tableName }}
          </v-btn>
        </div>
      </div>
    </v-card>
  </v-dialog>

</template>

<script>

import { dragscroll } from 'vue-dragscroll'
import { getSectionList, getTableListWithCells } from '@/oldjs/api'

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
    // tableDetailInfo.order.id
    currentTableName: {}
  },
  data: function () {
    return {
      tab: null,
      realShow: null,
      sections: [],
      tables: [],
      activeSectionId: null
    }
  },
  computed: {
    displayTables () {
      const active = this.activeStatus ? '1' : '0'
      const activeTable = this.tables.filter(t => t.sectionId !== '6').filter(t => t.usageStatus === active).filter(t => !this.activeSectionId || t.sectionId === this.activeSectionId).filter(t => t.tableName !== this.currentTableName)
      // console.log(this.tables, this.activeSectionId, this.activeStatus, active, 'activeTable: ', activeTable, 'currentTableName', this.currentTableName)
      return activeTable
    }
  },
  watch: {
    realShow: function (val) {
      this.$emit('update:menuShow', val)
    },
    menuShow: async function (val) {
      this.realShow = val
      if (val) {
        await this.initialMenu()
      }
    }
  },
  mounted () {
    this.initialMenu()
  },
  methods: {
    activeSection (id) {
      this.activeSectionId = id
    },
    initialMenu: async function () {
      this.tables = await getTableListWithCells()
      this.sections = (await getSectionList()).filter(item => item.name.toLowerCase() !== 'togo')
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
