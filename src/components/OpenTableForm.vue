<template>
  <v-dialog v-model="realShow" max-width="900px">
    <v-card color="#f6f6f6">
      <v-toolbar>
        <v-toolbar-title>
          {{ $t('Frei Tisch Map: ') }}
        </v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col cols="6">
            <v-text-field
                v-model="selectedTableNumber"
                :label="$t('Tisch Nr.:')"
                clearable
                autofocus/>
            <table-selector
                :extra-height="'300px'"
                :only-available="true"
                ref="tablePage"
                @table-selected="updateTable"
            />
          </v-col>
          <v-col cols="6">
            <div>
              <v-btn @click="tryOpenNormalTable" :disabled="!selectedTableNumber" color="primary" x-large block>
                <v-icon left>mdi-food-fork-drink</v-icon>
                {{ $t('In Haus') }}
              </v-btn>

              <v-btn @click="openTakeawayTable" class="mt-4" color="warning" x-large block>
                <v-icon left>mdi-truck-fast</v-icon>
                {{ $t('TOGO') }}
              </v-btn>
              <v-btn @click="realShow=!realShow" class="mt-4" color="error" x-large block>
                <v-icon left>mdi-close</v-icon>
                {{ $t('Zurück') }}
              </v-btn>
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>

</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import TableSelector from '@/components/subcomponent/TableSelector'
import { openOrEnterTable, requestOutTable } from '@/oldjs/common'

export default {
  name: 'openTableForm',
  components: { TableSelector },
  props: {
    menuShow: {},
    servantPassword: {}
  },
  data: function () {
    return {
      Config: GlobalConfig,
      realShow: null,
      selectedTableNumber: null
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
    tryOpenNormalTable () {
      if (this.selectedTableNumber && this.selectedTableNumber.length > 0) {
        openOrEnterTable(this.selectedTableNumber, this.servantPassword, true)
      }
    },
    openTakeawayTable () {
      requestOutTable(this.servantPassword)
    },
    updateTable (table) {
      if (table.usageStatus === '0') {
        this.selectedTableNumber = table.tableName
      }
    },
    async initialMenu () {
      this.selectedTableNumber = null
      this.$nextTick(() => {
        if (this.$refs.tablePage) {
          this.$refs.tablePage.initialMenu()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
