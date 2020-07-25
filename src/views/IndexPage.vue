<template>
    <v-app>
        <Navgation>
            <template slot="right-slot">
                <div class="">
                    <div style="height: 48px" class="d-flex justify-center align-center fill-height">
                        <v-switch v-model="onlyActive" color="red"></v-switch>
                        <div class="splitter-no-margin mx-1"></div>
                        <v-btn outlined
                               color="#367aeb" @click="popAuthorize('boss',toManage)">
                            {{$t('indexTabBoss')}}
                        </v-btn>
                    </div>
                </div>
            </template>
        </Navgation>
        <main>
            <div class="center-panel" id="centerPanel">
                <div v-dragscroll class="tableDisplay">
                    <div v-cloak class="areaC" id="areaC">
                        <div :key="area.name" v-cloak v-for="area in realArea" class="area">
                            <div>
                                <div class="areaTitle">{{area.areaName}}</div>
                                <div class="areaTableContainer" :style="Config.FMCVersion?
                                'grid-template-rows: repeat(4, 124px);':'grid-template-rows: repeat(6, 124px);'">
                                    <template v-for="table in area.tables">
                                        <div v-bind:key="table.name">
                                            <div v-if="table.usageStatus==='1'" class="tableCard"
                                                 v-bind:class="{
                                onCall:parseInt(table.callService)===1
                                  }"
                                                 v-on:click='jumpToTable(table.tableId,table.tableName)'>
                                                <div class="">
                                                    <div class="tableCardName">{{table.tableName}}</div>
                                                </div>
                                                <div class="d-flex justify-space-between">
                                                    <div class="">
                                                        <template
                                                                v-if="table.consumeType!=='4'&&table.consumeType!=='6'">
                                                            <div v-if="table.consumeType!=='2'" class="tableIconRow">
                                                                <i class="icon material-icons">person_outline</i>
                                                                <div class="text">{{table.seatCount}}</div>
                                                            </div>
                                                            <div class="tableIconRow">
                                                                <i class="icon material-icons">notifications_none</i>
                                                                <div class="text">
                                                                    {{table.dishCount===null?0:table.dishCount}}
                                                                </div>
                                                            </div>
                                                        </template>
                                                        <template
                                                                v-if="table.consumeType==='4'||table.consumeType==='6'">
                                                            <div class="tableIconRow">
                                                                <i class="icon material-icons">person_outline</i>
                                                                <div class="text">{{table.seatCount}}</div>
                                                            </div>
                                                            <div class="tableIconRow">
                                                                <i class="icon material-icons">child_care</i>
                                                                <div class="text">{{table.childCount}}</div>
                                                            </div>
                                                        </template>
                                                    </div>
                                                    <div class="text-right">
                                                        <div class="tableStatusContainer tableBold">
                                                            <span style="border-bottom: 0.2px solid white;">
                                                                      {{ table.consumeTypeName}}
                                                            </span>
                                                        </div>
                                                        <div class="tableTimeLabel">
                                                            <span class="tableBold">{{table.createTimestamp}}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-else @click="createTable(table.tableName)"
                                                 class="tableCard notUsed">
                                                <div class="tableCardName">
                                                    {{table.tableName}}
                                                </div>
                                            </div>
                                        </div>
                                    </template>

                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div class="right-panel ">
                <div></div>
                <div class="insPanel surface">
                    <div class="hintPanel">
                        <div class="floatMenuPanel">
                            <div @click="popAuthorize('', requestOutTable)" class="floatMenuPanelItem">
                                <div class="innerItem ">
                                    <div class="icon"><i class="material-icons">shopping_basket</i></div>
                                    <div class="text S_takeaway">外卖</div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="inputArea">
                        <div class="insInput ">
                            <div class="input-field ">
                                <v-text-field color="black" ref="ins" v-model="buffer"
                                              placeholder="instruction.." id="instruction"
                                              autofocus=autofocus></v-text-field>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    </v-app>
</template>

<script>
import {
  AssginToStringClass,
  blockReady,
  createOrEnterTable,
  findInString,
  getActiveTables,
  getAllDishes,
  getConsumeTypeList,
  jumpToTable,
  oldJumpTo,
  popAuthorize,
  requestOutTable,
  resolveBestIP,
  Strings
} from '../oldjs/common'
import Swal from 'sweetalert2'
import Navgation from '../components/Navgation'
import { dragscroll } from 'vue-dragscroll'
import GlobalConfig from '../oldjs/LocalGlobalSettings'
import { addToTimerList, clearAllTimer } from '../oldjs/Timer'

export default {
  name: 'IndexPage',
  directives: {
    dragscroll
  },
  components: { Navgation },
  props: {
    refresh: {
      type: Number
    }
  },
  data: function () {
    return {
      onlyActive: GlobalConfig.FMCVersion,
      reservations: [],
      areas: [],
      seen: true,
      buffer: '',
      ins: {},
      dishes: [],
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
    findInString,
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
        if (t === 'w') {
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
    initPage () {
      resolveBestIP(() => {
        for (const i in this.Strings[GlobalConfig.lang]) {
          AssginToStringClass(i, this.Strings[GlobalConfig.lang][i])
        }
        getConsumeTypeList(() => {
          window.onkeydown = this.listenKeyDown
          this.refreshTables()

          getAllDishes().then(res => {
            this.dishes = res
          })
          setInterval(this.refreshTables, 5000)
          const list = [setInterval(this.autoGetFocus, 1000)]
          list.map(addToTimerList)
        })
      })
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

        /* margin-left: 155px; */

        height: calc(100vh - 48px);
        /* width: calc(100vw - 330px - 100px); */
        overflow: scroll;
    }

    .tableDisplay::-webkit-scrollbar {
        width: 0 !important
    }

    .area {

        margin-right: 14px;

    }

    .areaTableContainer {
        max-height: 900px;
        margin-top: 36px;
        display: grid;
        grid-template-columns: repeat(1, 124px);

        grid-auto-columns: 124px;
        grid-auto-rows: 124px;
        grid-auto-flow: column;
        grid-gap: 16px;
        margin-bottom: 55px;

    }

    .table-card-content-m {
        vertical-align: middle;
        font-weight: 100;
        font-size: 20px;
        line-height: 30px;
    }

    .tableCard {
        padding: 16px;
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
    .tableTimeLabel {
        color: black;
        font-size: 18px;
        height: 25px;
        font-weight: 900;
    }

    .onCall .tableTimeLabel {
        color: white;
    }

    .onCall > .tableIconContainer > .tableIconRow > .material-icons {
        color: white;
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

    .tableStatusContainer {
        font-size: 18px;
        height: 25px;
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
        margin-top: 24px;
        margin-left: 24px;
        display: flex;
        width: max-content;
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
