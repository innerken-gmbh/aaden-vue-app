<template>
  <v-dialog v-model="realShow" max-width="90%">
    <v-card style="position: relative">
      <div
          style="
        background: #e8e8e8;
          height: calc(100vh - 96px);
          width: 100%;
          overflow: scroll"
      >
        <table-blue-print
            v-if="realShow"
            :additional-filter="tableFilter"
            :editing="false"
            :out-side-table-list="tableList"
            :return-table-key="requiredTableKey"
            :show-change-button="hideButton"
            @need-refresh="initial"
            @table-clicked="tableSelected"
        />
        <v-card
            class="pa-2 px-4" color="rgba(0,0,0,0.2)"
            elevation="0"
            style="position: absolute;top: 24px;z-index: 15;right: 0;left: 0;margin: auto;width: fit-content">
          <h2>
            {{ $t('SelectTable') }}</h2>
        </v-card>

      </div>
    </v-card>
  </v-dialog>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import { mapMutations, mapState } from 'vuex'
import { getTableListWithCells } from '@/oldjs/api'
import TableBluePrint from '@/views/FirstPage/Table/Table/TableBluePrint'

export default {
  name: 'TableSelector',
  components: { TableBluePrint },
  directives: {
    dragscroll
  },
  data: function () {
    return {
      hideButton: -1,
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
