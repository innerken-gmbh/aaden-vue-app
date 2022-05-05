<template>
  <v-dialog v-model="realShow">
    <v-card>
      <v-toolbar flat fixed class="caption" width="50vw">
        <v-toolbar-title style="color: #0d47a1">
          <h3>{{ title }}</h3>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn icon @click="realShow=false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <template v-slot:extension>

          <v-tabs grow v-model="tab">
            <v-tab @click="showAllTable=true">
              <span class="areaTitle font-weight-bold"
                    style="font-size: 20px; color: black">{{ $t('All')}}</span>
            </v-tab>
            <v-tab @click="activeSection(section.id)" v-for="section in sections" :key="section.id">
              <span class="areaTitle font-weight-bold"
                    style="font-size: 20px; color: black">{{ section.name }}</span>
            </v-tab>
          </v-tabs>
        </template>
      </v-toolbar>
      <div style="height: 500px; overflow: scroll">
        <div class="pa-2" style="display: grid; grid-template-columns: repeat(auto-fill,64px); grid-gap: 12px;">
          <v-btn v-for="(table) in displayTables"
                 :key="table.tableId"
                 style="height: 64px;"
                 :style="table.usageStatus === '1' ? {backgroundColor: '#3a86ff', color: 'white'}: {}"
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
    dishTableChange: {
      type: Boolean,
      default: null
    },
    menuShow: {},
    // tableDetailInfo.order.id
    currentTableName: {}
  },
  data: function () {
    return {
      showAllTable: false,
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
      let res = null

      if (this.showAllTable) {
        res = this.tables.filter(t => t.sectionId !== '6')
      } else {
        if (this.dishTableChange) {
          res = this.tables.filter(t => t.sectionId !== '6')
            .filter(t => !this.activeSectionId || t.sectionId === this.activeSectionId)
            .filter(t => t.tableName !== this.currentTableName)
        } else {
          res = this.tables.filter(t => t.sectionId !== '6').filter(t => t.usageStatus === active)
            .filter(t => !this.activeSectionId || t.sectionId === this.activeSectionId)
            .filter(t => t.tableName !== this.currentTableName)
        }
      }
      return res
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
      this.showAllTable = false
      this.activeSectionId = id
    },
    initialMenu: async function () {
      this.tables = await getTableListWithCells()
      this.sections = (await getSectionList()).filter(item => item.id !== '6' && parseInt(item.tableCount) > 0)
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
