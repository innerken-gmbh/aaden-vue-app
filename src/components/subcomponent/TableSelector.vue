<template>
  <v-dialog max-width="90%" v-model="realShow">
    <v-card style="position: relative">
      <div
          style="
        background: #e8e8e8;
          height: calc(100vh - 96px);
          width: 100%;
          overflow: scroll"
      >
        <table-blue-print
            :out-side-table-list="tableInCurrentSection"
            :editing="false"
            @table-clicked="tableSelected"
        />
        <v-card
            color="white"
            class="d-flex"
            style="position: absolute;bottom: 36px;
              box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.08);
                right: 0;
                margin: auto;
                width: min-content;
                border-radius: 8px;
                          left: 0;max-width: calc(100vw - 684px);
               ">
          <v-item-group v-dragscroll v-model="currentSectionIndex"
                        mandatory
                        style="display: grid;
                          grid-auto-columns: max-content;
                          grid-gap: 8px;
                          grid-auto-flow: column;overflow-x: scroll">

            <v-item v-for="section of notTakeawaySection" v-bind:key="section.id+'categorytypes'"
                    v-slot="{active,toggle}">
              <v-card :elevation="active?4:0"
                      style="border-radius: 8px"
                      :color="active?'primary':''"
                      class="px-6 py-2 text-body-1" @click="toggle"
                      :dark="active">{{ section.name }}
              </v-card>
            </v-item>
          </v-item-group>
        </v-card>
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { mapMutations, mapState } from 'vuex'
import TableBluePrint from '@/components/TableBluePrint'
import { getSectionList, getTableListWithCells } from '@/oldjs/api'
import { defaultSection } from '@/oldjs/defaultConst'

export default {
  name: 'TableSelector',
  components: { TableBluePrint },
  directives: {
    dragscroll
  },
  data: function () {
    return {
      Config: GlobalConfig,
      tableList: [],
      currentSectionIndex: 0,
      sectionList: []
    }
  },
  watch: {
    realShow: {
      immediate: true,
      handler: function (val) {
        if (val) {
          this.initial()
        }
      }
    }
  },
  computed: {
    tableInCurrentSection () {
      const filter = t => {
        let res = t.sectionId === this.currentSection.id
        if (this.tableFilter) {
          res = res && this.tableFilter(t)
        }
        return res
      }
      return this.tableList.filter(filter)
    },

    currentSection () {
      return this.notTakeawaySection[this.currentSectionIndex] ?? defaultSection
    },
    notTakeawaySection () {
      return this.sectionList.filter(it => it.id !== '6')
    },
    ...mapState(['tableSelectDialogShow', 'tableFilter']),
    realShow: {
      get: function () {
        return this.tableSelectDialogShow
      },
      set: function (val) {
        if (!val) {
          this.HIDE_TABLE_PICK_DIALOG()
        }
      }
    }
  },
  methods: {
    tableSelected (table) {
      this.TABLE_PICKED(table)
    },
    ...mapMutations(['HIDE_TABLE_PICK_DIALOG', 'TABLE_PICKED']),
    async refreshSectionList () {
      this.sectionList = (await getSectionList())
        .filter(it => it.tableCount > 0)
    },
    async initial () {
      await this.refreshSectionList()
      this.tableList = await getTableListWithCells()
    }
  }
}
</script>

<style scoped>

</style>
