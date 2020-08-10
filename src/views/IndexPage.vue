<template>
    <v-app>
        <v-overlay z-index="1000" opacity="1" :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
        </v-overlay>
        <v-system-bar app>
            {{ $t('appName') }}
            Version <span v-show-quick-buy>FMC-</span>
            {{ version }}
            <v-spacer></v-spacer>
            <time-display/>
        </v-system-bar>
        <Navgation>
            <template slot="left">
                <v-app-bar-nav-icon>
                    <v-icon @click="popAuthorize('boss',toManage)">mdi-home-analytics</v-icon>
                </v-app-bar-nav-icon>
                <v-btn v-hide-quick-buy @click="toggleDebug()" icon>
                    <v-icon>
                        mdi-android-debug-bridge
                    </v-icon>
                </v-btn>
            </template>
            <template slot="right-slot">
                <v-toolbar-items class="mx-1">
                    <v-btn @click="popAuthorize('',
                             requestOutTable)">
                        <v-icon left>mdi-truck-fast</v-icon>
                        {{ $t('takeaway') }}
                    </v-btn>
                    <v-btn :color="onlyActive?'primary':'transparent'" @click="onlyActive=!onlyActive">
                        只看活跃
                    </v-btn>
                </v-toolbar-items>
                <v-text-field ref="ins" v-model="buffer"
                              single-line
                              hide-details
                              clearable
                              class="flex-grow-0"
                              prepend-inner-icon="mdi-magnify"
                              placeholder="instruction.."
                              autofocus></v-text-field>
            </template>
        </Navgation>
        <v-main>
            <div class="center-panel" id="centerPanel">
                <div v-dragscroll class="tableDisplay">
                    <div v-cloak class="areaC" id="areaC">
                        <div :key="area.name" v-cloak v-for="area in realArea" class="area">
                            <div class="areaTitle">{{ area.areaName }}</div>
                            <div class="areaTableContainer">
                                <template v-for="table in area.tables">
                                    <div v-bind:key="table.name">
                                        <div v-if="table.usageStatus==='1'" class="tableCard"
                                             :class="{onCall:parseInt(table.callService)===1}"
                                             @click='jumpToTable(table.tableId,table.tableName)'>
                                            <div class="tableCardName">{{ table.tableName }}</div>
                                            <div class="d-flex justify-space-between">
                                                <div>
                                                    <template v-if="table.consumeType!=='4'&&table.consumeType!=='6'">
                                                        <div v-if="table.consumeType!=='2'" class="tableIconRow">
                                                            <i class="icon material-icons">person_outline</i>
                                                            <div class="text">{{ table.seatCount }}</div>
                                                        </div>
                                                        <div class="tableIconRow">
                                                            <i class="icon material-icons">notifications_none</i>
                                                            <div class="text">
                                                                {{ table.dishCount === null ? 0 : table.dishCount }}
                                                            </div>
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
                                                </div>
                                                <div>
                                                    <span class="tableBold">{{ table.createTimestamp }}</span>
                                                </div>
                                            </div>
                                        </div>
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
  getAllDishes,
  getConsumeTypeList,
  jumpToTable,
  oldJumpTo,
  popAuthorize,
  requestOutTable,
  Strings
} from '../oldjs/common'
import Swal from 'sweetalert2'
import Navgation from '../components/Navgation'
import { dragscroll } from 'vue-dragscroll'
import GlobalConfig, { setDeviceId, useCurrentConfig } from '../oldjs/LocalGlobalSettings'
import { addToTimerList, clearAllTimer } from '../oldjs/Timer'
import { getActiveTables } from 'aaden-base-model/lib/Models/AadenApi'
import TimeDisplay from '@/components/TimeDisplay'

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
      version: version,
      onlyActive: GlobalConfig.FMCVersion,
      reservations: [],
      areas: [],
      seen: true,
      buffer: '',
      ins: {},
      time: '',
      dishes: [],
      loading: false,
      Config: GlobalConfig,
      Strings,
      focusTimer: null
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
    windowHeight: function () {
      console.log(window.innerHeight)
      return window.innerHeight
    },
    realArea: function () {
      const only = this.onlyActive
      return this.areas.map(a => {
        a.tables = a.tables.filter(t => !only || t.usageStatus === '1')
        return a
      }).filter(a => a.tables.length > 0)
    }
  },
  methods: {
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
      // console.log(this.areas)
    },
    listenKeyDown (e) {
      if (Swal.isVisible()) {
        return
      }
      // console.log(e);
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
          console.log(t)
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
      oldJumpTo('admin/index.html', GlobalConfig)
    },
    autoGetFocus () {
      if (Swal.isVisible()) {
        return
      }
      this.$refs.ins.focus()
    },
    async initPage () {
      window.onkeydown = this.listenKeyDown
      await getConsumeTypeList()

      this.refreshTables()
      getAllDishes().then(res => {
        this.dishes = res
      })
      const list = [setInterval(this.autoGetFocus, 1000), setInterval(this.refreshTables, 5000)]
      list.map(addToTimerList)
    }
  },
  mounted: function () {
    this.initPage()
  },
  beforeDestroy () {
    clearAllTimer()
  }
}
</script>

<style scoped>
    .tableDisplay {
        height: calc(100vh - 72px);
        overflow: scroll;
    }

    .tableDisplay::-webkit-scrollbar {
        width: 0 !important
    }

    .areaTableContainer {
        max-height: calc(100vh - 100px);
        margin-top: 18px;
        display: grid;
        grid-template-columns: repeat(1, 108px);
        grid-template-rows: repeat(auto-fill, 108px);
        grid-auto-columns: 108px;
        grid-auto-rows: 108px;
        grid-auto-flow: column;
        grid-gap: 8px;
        margin-bottom: 12px;

    }

    .table-card-content-m {
        vertical-align: middle;
        font-weight: 100;
        font-size: 20px;
        line-height: 30px;
    }

    .tableCard {
        padding: 8px;
        width: 100%;
        height: 100%;
        background: white;
        color: black;
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

    .tableCard.onCall {
        color: white !important;
        background: #F34141;
    }

    .tableCard:active {
        color: white;
        background: #367aeb;
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
        max-height: calc(100vh - 72px);
        margin-right: 14px;
    }

    .area:last-child {
        margin-right: 380px;
    }

    .center-panel {
        width: 100vw;
    }

    /*input:focus{*/
    /*    background: red;*/
    /*    color: red !important;*/
    /*}*/

</style>
