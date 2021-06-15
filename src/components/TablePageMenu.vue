<template>
  <v-bottom-sheet
    :retain-focus="false"
    :disable-keys="true"
    :close-on-content-click="false"
    offset-y
    v-model="realShow">
    <v-card v-cloak color="#f6f6f6">
      <template v-show="!loading">
        <v-toolbar dense dark color="primary">
          <v-toolbar-title class="bigTableName mr-4">
            {{ tableDetailInfo.tableBasicInfo.name }}
          </v-toolbar-title>
          <v-spacer/>
          <div class="d-flex ml-1">
               <span class="icon-line">
                  <v-icon color="white">mdi-account-outline</v-icon>
                  <span class="ml-1">{{ tableDetailInfo.personCount }}</span>
              </span>
            <span class="icon-line ml-2">
            <v-icon color="white">mdi-calendar-text</v-icon>
            <span class="ml-1">
                 {{ tableDetailInfo.order.id }}
            </span>
         </span>
          </div>
          <v-toolbar-items>
            <v-btn @click="realShow=false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-row>
            <v-col cols="6">
              <v-card>
                <v-list subheader>
                  <v-subheader>Information</v-subheader>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-timer</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ $t('tableInfoLabelTime') }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ tableDetailInfo.createTimestamp }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-seat</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ $t('tableInfoLabelSeat') }}
                      </v-list-item-title>
                      <v-list-item-subtitle>
                        {{ tableDetailInfo.satCount }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list-item>
                    <v-list-item-icon>
                      <v-icon>mdi-food</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>
                        <span>{{ tableDetailInfo.consumeTypeName }}</span>/<span>{{
                          tableDetailInfo.order.counsumeTypeStatusName
                        }}</span>
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider></v-divider>

                </v-list>
              </v-card>

            </v-col>
            <v-col cols="6">
              <table-selector
                @table-selected="tableSelected"
                ref="tablePage">
              </table-selector>
            </v-col>
          </v-row>
        </v-card-text>
      </template>
      <template v-show="loading">
        <v-progress-linear
          indeterminate
          color="green"
        ></v-progress-linear>
      </template>

    </v-card>

  </v-bottom-sheet>
</template>

<script>
import GlobalConfig from '@/oldjs/LocalGlobalSettings'
import hillo from 'hillo'
import {

  jumpToTable,
  openOrEnterTable,
  popAuthorize,
  requestOutTable,
  toManage
} from '@/oldjs/common'
import { dragscroll } from 'vue-dragscroll'
import TableSelector from '@/components/subcomponent/TableSelector'

export default {
  name: 'TablePageMenu',
  components: { TableSelector },
  directives: {
    dragscroll
  },
  props: {
    menuShow: {
      type: Boolean,
      default: false
    },
    tableId: {
      type: [Number, String],
      default: -1
    }
  },
  data: function () {
    return {
      Config: GlobalConfig,
      realShow: null,
      tableDetailInfo: {
        order: {
          id: -1,
          rawAddressInfo: ''
        },
        tableBasicInfo: { name: '' }
      },
      loading: false
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
  methods: {
    async initialMenu () {
      this.loading = true
      // await this.getTableDetail()
      if (this.$refs.tablePage) {
        // this.$refs.tablePage.initialMenu()
      }
      this.loading = false
    },

    tableSelected (table) {
      if (table.usageStatus === '1') {
        jumpToTable(table.tableId, table.tableName)
      } else {
        openOrEnterTable(table.tableName)
      }
    },
    requestOutTable,
    popAuthorize,
    toManage,

    async getTableDetail () {
      console.error('no more')
    }
  }
}
</script>

<style scoped>

</style>
