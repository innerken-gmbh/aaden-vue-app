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
            :additional-filter="tableFilter"
            :out-side-table-list="tableList"
            :editing="false"
            :return-table-key="requiredTableKey"
            @need-refresh="initial"
            @table-clicked="tableSelected"
        />
        <v-card
            class="pa-2 px-4" elevation="0"
            color="rgba(0,0,0,0.2)"
            style="position: absolute;top: 24px;z-index: 15;right: 0;left: 0;margin: auto;width: fit-content">
          <h2>
            选择一个桌子</h2>
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
import { getTableListWithCells } from '@/oldjs/api'

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
    ...mapState(['tableSelectDialogShow', 'tableFilter', 'requiredTableKey']),
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

    async initial () {
      this.tableList = await getTableListWithCells()
    }
  }
}
</script>

<style scoped>

</style>
