<template>
    <v-app>
        <Navgation>
            <template slot="left">
                <v-app-bar-nav-icon>
                    <v-icon @click="popAuthorize('boss',toManage)">mdi-home-analytics</v-icon>
                </v-app-bar-nav-icon>
                <v-toolbar-title>
                    {{ $t('appName') }}
                </v-toolbar-title>
            </template>
            <template slot="right-slot">
                <time-display class="mx-1"/>
                <v-toolbar-items class="mx-1">
                    <v-btn v-if="printingList.length>0">
                        <v-icon>mdi-printer</v-icon>
                        <template>
                            {{printingList.length}}
                        </template>
                    </v-btn>
                    <v-menu
                            v-if="hasBadPrint"
                            v-model="menu1"
                            offset-y
                            :close-on-content-click="false"
                            :nudge-width="300"
                            :max-height="600"
                    >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn v-bind="attrs"
                                   v-on="on"
                                   color="error">
                                <v-icon>
                                    mdi-printer-off
                                </v-icon>
                                {{falsePrinterList.length}}
                            </v-btn>
                        </template>
                        <v-card>
                            <v-toolbar dense dark color="primary">
                                <v-toolbar-title>{{$t('UnsuccessPrinterList')}}</v-toolbar-title>
                                <v-spacer/>
                                <v-icon @click="reprintAll">mdi-reload</v-icon>
                                <v-icon @click="menu1=!menu1">mdi-close</v-icon>
                            </v-toolbar>
                            <v-list>
                                <v-list-item
                                        v-for="(key, index) in falsePrinterList"
                                        :key="index"
                                >
                                    <v-list-item-icon>
                                        <v-icon  color="primary">mdi-text-box-remove</v-icon>
                                    </v-list-item-icon>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                           {{key.orderId}}: {{key.printStatusString}}
                                        </v-list-item-title>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-btn icon text @click="reprintBon(key)">
                                            <v-icon color="primary">mdi-printer</v-icon>
                                        </v-btn>
                                    </v-list-item-action>
                                </v-list-item>
                            </v-list>
                        </v-card>
                    </v-menu>
                    <v-btn @click="popAuthorize('',requestOutTable)">
                        <v-icon left>mdi-truck-fast</v-icon>
                        {{ $t('takeaway') }}
                    </v-btn>
                    <v-btn :color="onlyActive?'primary':'transparent'" @click="onlyActive=!onlyActive">
                        {{ $t('只看活跃') }}
                    </v-btn>
                </v-toolbar-items>
                <v-text-field
                        ref="ins" v-model="buffer"
                        single-line
                        hide-details
                        clearable
                        class="flex-grow-0"
                        prepend-inner-icon="mdi-magnify"
                        placeholder="instruction.."
                        autofocus/>
                <v-menu
                        v-model="menu"
                        :close-on-content-click="false"
                        :nudge-width="300"
                        :max-height="600"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn v-bind="attrs"
                               v-on="on"
                               icon>
                            <v-icon>
                                mdi-cog-outline
                            </v-icon>
                        </v-btn>
                    </template>
                    <v-card color="white">
                        <v-list>
                            <v-list-item>
                                <v-list-item-avatar tile>
                                    <img src="@/assets/logo.png">
                                </v-list-item-avatar>
                                <v-list-item-content>
                                    <v-list-item-title>Aaden App</v-list-item-title>
                                    <v-list-item-subtitle>
                                        Version <span v-show-quick-buy>FMC-</span>{{ version }}
                                    </v-list-item-subtitle>
                                </v-list-item-content>

                                <v-list-item-action>
                                    <v-icon>mdi-heart</v-icon>
                                </v-list-item-action>
                            </v-list-item>
                        </v-list>
                        <v-divider></v-divider>
                        <v-list dense>
                            <template v-for="key in NeededKeys">
                                <v-list-item dense :key="'config'+key">
                                    <v-list-item-title>{{key}}</v-list-item-title>
                                    <template v-if="typeof Config[key]==='boolean'">
                                        <v-list-item-action>
                                            <v-switch v-model="Config[key]" color="purple"></v-switch>
                                        </v-list-item-action>
                                    </template>
                                    <template v-else>
                                        <v-list-item-action>
                                            <v-text-field v-model="Config[key]" color="purple"></v-text-field>
                                        </v-list-item-action>
                                    </template>
                                </v-list-item>
                            </template>
                        </v-list>

                        <v-card-actions>
                            <v-btn text @click="hardReload">Clear</v-btn>
                            <v-spacer></v-spacer>
                            <v-btn text @click="menu = false">Cancel</v-btn>
                            <v-btn color="primary" text @click="useCurrentConfig">Save</v-btn>
                        </v-card-actions>
                    </v-card>
                </v-menu>
            </template>
        </Navgation>
        <v-main>
            <div class="center-panel" id="centerPanel">
                <div v-dragscroll class="tableDisplay">
                    <div v-cloak class="areaC" id="areaC">
                        <div :key="area.name" v-cloak v-for="area in realArea" class="area">
                            <div class="areaTitle">{{ area.areaName }}</div>
                            <div class="areaTableContainer"
                                 :style="{
                              gridTemplateRows:'repeat(auto-fill,'+Config.gridSize+'px)',
                              gridAutoColumns:Config.gridSizeX+'px'
                            }">
                                <template v-for="table in area.tables">
                                    <div v-bind:key="table.name">
                                        <v-card v-if="table.usageStatus==='1'"
                                                class="tableCard"
                                                @click='jumpToTable(table.tableId,table.tableName)'>
                                            <div class="tableCardName">{{ table.tableName }}</div>
                                            <div>
                                                <div class="d-flex justify-space-between">
                                                    <div class="tableIconRow">
                                                        <span class="tableBold">{{ table.createTimestamp }}</span>
                                                    </div>
                                                    <div class="tableIconRow justify-end">
                                                        <span :style="{color:parseInt(table.callService)===1?restaurantInfo.callColor:restaurantInfo.tableColor}"
                                                              class="tableBold">{{findConsumeTypeById(table.consumeType)}}</span>
                                                    </div>
                                                </div>
                                                <v-card elevation="0"
                                                        :dark="getColorLightness(parseInt(table.callService)===1?restaurantInfo.callColor:
                                             restaurantInfo.tableColor)<128"
                                                        :color="parseInt(table.callService)===1?restaurantInfo.callColor:restaurantInfo.tableColor"
                                                        tile
                                                        class="d-flex justify-space-between px-2 py-1 rounded-b rounded-tr">
                                                    <template v-if="['1','2','3','5'].includes(table.consumeType)">
                                                        <div class="d-flex align-center">
                                                            <v-icon small>mdi-silverware-fork-knife</v-icon>
                                                            <span class="ml-1">{{ table.dishCount === null ? 0 : table.dishCount }}</span>
                                                        </div>
                                                        <div class="d-flex align-center" v-if="table.consumeType!=='2'">
                                                            <v-icon small>mdi-account</v-icon>
                                                            <span>{{ table.seatCount }}</span>
                                                        </div>
                                                    </template>
                                                    <template v-if="table.consumeType==='4'||table.consumeType==='6'">
                                                        <div class="tableIconRow">
                                                            <i class="icon material-icons">person_outline</i>
                                                            <div class="text">{{ table.seatCount }}</div>
                                                        </div>
                                                        <div class="tableIconRow">
                                                            <i class="icon material-icons">child_care</i>
                                                            <div class="text">{{ table.childCount }}</div>
                                                        </div>
                                                    </template>
                                                </v-card>
                                            </div>

                                        </v-card>
                                        <div v-else @click="createTable(table.tableName)"
                                             class="tableCard notUsed">
                                            <div class="tableCardName">
                                                {{ table.tableName }}
                                            </div>
                                        </div>
                                    </div>
                                </template>

                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </v-main>
    </v-app>
</template>

<script>
import { version } from '../../package.json'
import {
  blockReady,
  createOrEnterTable,
  findConsumeTypeById,
  getAllDishes,
  getConsumeTypeList,
  getFalsePrinterList,
  jumpToTable,
  oldJumpTo,
  popAuthorize,
  requestOutTable,
  Strings
} from '../oldjs/common'
import Swal from 'sweetalert2'
import Navgation from '../components/Navgation'
import { dragscroll } from 'vue-dragscroll'
import GlobalConfig, { hardReload, NeededKeys, setDeviceId, useCurrentConfig } from '../oldjs/LocalGlobalSettings'
import { addToTimerList, clearAllTimer, printNow } from '../oldjs/Timer'
import { getActiveTables } from 'aaden-base-model/lib/Models/AadenApi'
import PrinterList from 'aaden-base-model/lib/Models/PrinterList'
import TimeDisplay from '@/components/TimeDisplay'
import { getColorLightness, getRestaurantInfo } from '../oldjs/api'

export default {
  name: 'IndexPage',
  directives: {
    dragscroll
  },
  components: { TimeDisplay, Navgation },
  props: {
    refresh: {
      type: Number
    }
  },
  data: function () {
    return {
      NeededKeys,
      menu: null,
      menu1: null,
      version: version,
      onlyActive: GlobalConfig.FMCVersion,
      reservations: [],
      areas: [],
      seen: true,
      buffer: '',
      restaurantInfo: {
        tableColor: '#fff',
        callColor: '#f06800'
      },
      ins: {},
      time: '',
      dishes: [],
      Config: GlobalConfig,
      Strings,
      focusTimer: null,
      falsePrinterList: [],
      printingList: []
    }
  },
  watch: {
    onlyActive: function () {
      this.refreshTables()
    },
    refresh: function () {
      this.initPage()
    }
  },
  computed: {
    realArea: function () {
      const only = this.onlyActive
      return this.areas.map(a => {
        a.tables = a.tables.filter(t => !only || t.usageStatus === '1')
        return a
      }).filter(a => a.tables.length > 0)
    },
    hasBadPrint () {
      return this.falsePrinterList ? this.falsePrinterList.length > 0 : false
    }
  },
  methods: {
    printNow,
    findConsumeTypeById (id) {
      return findConsumeTypeById(id).name
    },
    getColorLightness,
    useCurrentConfig,
    hardReload,
    popAuthorize,
    createTable: createOrEnterTable,
    jumpToTable,
    requestOutTable,
    initialUI () {
      this.$refs.ins.focus()
      blockReady()
    },
    async refreshTables () {
      this.areas = await getActiveTables()
    },
    async refreshPrinterList () {
      const res = (await getFalsePrinterList()) ?? []
      this.falsePrinterList = res.filter(item => {
        return item.printStatus !== '4'
      })
      this.printingList = res.filter(item => item.printStatus === '4') ?? []
    },
    reprintAll (items) {
      this.falsePrinterList.map(PrinterList.reprint)
    },
    async reprintBon (item) {
      await PrinterList.reprint(item)
    },
    listenKeyDown (e) {
      if (Swal.isVisible()) {
        return
      }
      switch (e.key) {
        case 'Escape':
          this.back()
          break
        case 'Enter': {
          this.insDecode(this.readBuffer())
        }
      }
    },
    back () {
      this.initialUI()
    },
    readBuffer: function (clear = true) {
      const ins = this.buffer
      if (clear) {
        this.buffer = ''
      }
      return ins
    },
    insDecode (t) {
      if (t !== '') {
        const escapeStr = '--//'
        if (t.startsWith(escapeStr)) {
          t = t.substr(escapeStr.length)
          if (t.startsWith('d')) {
            t = t.substr(1)
            setDeviceId(t)
          }
          if (t === 'c') {
            GlobalConfig.Protocol = 'http://'
            useCurrentConfig()
          } else if (t === 'h') {
            GlobalConfig.Protocol = 'https://'
            useCurrentConfig()
          }
          if (t.startsWith('f/')) {
            t = t.substr(2)
            // eslint-disable-next-line no-eval
            eval(t)
          }
        } else if (t === 'w') {
          popAuthorize('', requestOutTable)
        } else if (t === 'l') {
          popAuthorize('', this.toManage)
        } else {
          this.createTable(t)
        }
      }
    },
    toManage () {
      oldJumpTo('admin/index.html', { DeviceId: GlobalConfig.DeviceId, lang: GlobalConfig.lang })
    },
    autoGetFocus () {
      if (Swal.isVisible()) {
        return
      }
      if (this.menu) {
        return
      }
      this.$refs.ins.focus()
    },
    async initPage () {
      window.onkeydown = this.listenKeyDown
      this.refreshTables()
      this.refreshPrinterList()
      getAllDishes()
      await getConsumeTypeList()
      const list = [setInterval(this.refreshTables, 5000), setInterval(this.refreshPrinterList, 5000)]
      if (GlobalConfig.getFocus) {
        list.push(setInterval(this.autoGetFocus, 1000))
      }
      list.map(addToTimerList)
    }
  },
  mounted: async function () {
    this.initPage()

    this.restaurantInfo = Object.assign(this.restaurantInfo, (await getRestaurantInfo()).content[0])
  },
  beforeDestroy () {
    clearAllTimer()
  }

}
</script>

<style scoped>
    .tableDisplay {
        height: calc(100vh - 48px);
        overflow: scroll;
    }

    .tableDisplay::-webkit-scrollbar {
        width: 0 !important
    }

    .areaTableContainer {
        max-height: calc(100vh - 100px);
        margin-top: 18px;
        display: grid;
        grid-auto-flow: column;
        grid-gap: 10px;
        margin-bottom: 12px;

    }

    .table-card-content-m {
        vertical-align: middle;
        font-weight: 100;
        font-size: 20px;
        line-height: 30px;
    }

    .tableCard {
        width: 100%;
        height: 100%;
        padding: 8px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        cursor: pointer;
        border-radius: 8px;
        box-shadow: 0 6px 8px #d0d2d9;
    }

    .tableCard.notUsed {
        background: transparent;
        color: #6b6b6b;
        border: 3px dotted #e2e3e5;
        box-shadow: none;
    }

    .tableBold {
        font-weight: 600;
    }

    .tableCardName {
        line-height: 23px;
        font-size: 28px;
        text-align: left;
        font-family: Roboto, "Axure Handwriting", sans-serif;
        font-weight: 600;
    }

    .tableCard.notUsed .tableCardName {
        font-weight: 400;
    }

    .tableIconRow > .material-icons {
        font-size: 20px;
        margin-right: 2px;
    }

    .tableIconRow {
        width: 42px;
        height: 25px;
        display: flex;
        align-items: center;
        font-size: 16px;
        font-weight: 400;
    }

    .areaTitle {
        font-size: 16px;
        font-weight: 600;
    }

    .select-wrapper > ul {
        z-index: 0;
        top: -48px;
        width: 152px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 3px 6px rgba(0, 86, 255, 0.08);
        opacity: 1;
        border-radius: 0px 0px 5px 5px;
    }

    .select-wrapper > ul > li {
        border-bottom: 0.3px solid rgba(112, 112, 112, 0.38);;
    }

    .select-dropdown.dropdown-content li.selected {
        background: rgba(255, 255, 255, 1);
    }

    .dropdown-content li > a, .dropdown-content li > span {
        padding: 13px 16px;
        color: #4b4b4b;
        font-weight: 200;
        font-size: inherit;
        line-height: inherit;
    }

    .dropdown-content li {
        height: 45px;
        min-height: unset;
    }

    .areaC {
        margin-top: 12px;
        margin-left: 12px;
        display: flex;
        width: max-content;
    }

    .area {
        max-height: calc(100vh - 48px);
        margin-right: 14px;
    }

    .area:last-child {
        margin-right: 380px;
    }

    .center-panel {
        background: #f6f6f6;
        width: 100vw;
    }

    /*input:focus{*/
    /*    background: red;*/
    /*    color: red !important;*/
    /*}*/

</style>
