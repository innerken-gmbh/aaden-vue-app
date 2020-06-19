<template>
    <div>
        <nav class="noShadow">
            <div class="nav-wrapper white  avesNav">
                <div class="left flex-Container">
                    <div class="languageSwitch">
                        <div @click="changeLanguage('ZH')" class="active S_langZH">中</div>
                        <div @click="changeLanguage('EN')" class="S_langEN">英</div>
                        <div @click="changeLanguage('DE')" class="S_langDE">德</div>
                    </div>
                    <div class="splitter"></div>
                    <div class="timeDisplay">
                        <div class="timeFont">
                    <span v-cloak id="time">
                        {{time}}
                    </span>
                        </div>
                    </div>
                    <div class="splitter"></div>
                    <div class="appName ">
                        <span class="S_appName">Aaden Kasse</span>-V<span class="S_version"></span>
                    </div>
                    <div class="splitter"></div>
                    <div @click="toggleDebug()" class="adbIcon">
                        <i class="material-icons littleIcon">adb</i>
                    </div>
                </div>
                <div class="right  valign-wrapper">
                    <div class="indexTabs flex-Container">
                        <a @click="popAuthorize('boss',toManage)" class="indexTab S_indexTabBoss"></a>
                        <a href="index.html" class="indexTab active S_indexTabDineIn"></a>
                        <!--                <a class="indexTab S_indexTabTakeaway">外卖</a>-->
                    </div>
                </div>
            </div>
        </nav>

        <main>
            <div class="center-panel" id="centerPanel">
                <div class="tableDisplay  dragscroll  ">
                    <div v-cloak class="areaC" id="areaC">
                        <div :key="area.name" v-cloak v-for="area in areas" class="area">
                            <div class="areaTitle">{{area.areaName}}</div>
                            <div class="areaTableContainer" v-bind:style="{
                        width:area.width,
                    maxHeight:area.maxHeight,
                    flexDirection:area.flexDirection}">
                                <template v-for="table in area.tables">
                                    <div v-bind:key="table.name">
                                        <div v-if="table.usageStatus==='1'" class="tableCard"
                                             v-bind:class="{
                                onCall:parseInt(table.callService)===1
                                  }"
                                             v-on:click='jumpToTable(table.tableId,table.tableName)'>
                                            <div class="tableCardName tableBold">{{table.tableName}}</div>
                                            <div class="tableTimeLabel">
                                                <span>{{findInString('JSTplTableNewTimeLabel')}}</span>
                                                <span class="tableBold">{{table.createTimestamp}}</span>
                                            </div>
                                            <div class="tableIconContainer">
                                                <div v-if="table.consumeType!=='4'&&table.consumeType!=='6'">
                                                    <div v-if="table.consumeType!=='2'" class="tableIconRow">
                                                        <i class="icon material-icons">person_outline</i>
                                                        <div class="text">{{table.seatCount}}</div>
                                                    </div>
                                                    <div class="tableIconRow">
                                                        <i class="icon material-icons">notifications_none</i>
                                                        <div class="text">{{table.dishCount===null?0:table.dishCount}}
                                                        </div>
                                                    </div>
                                                </div>
                                                <div v-if="table.consumeType==='4'||table.consumeType==='6'">
                                                    <div class="tableIconRow">
                                                        <i class="icon material-icons">person_outline</i>
                                                        <div class="text">{{table.seatCount}}</div>
                                                    </div>
                                                    <div class="tableIconRow">
                                                        <i class="icon material-icons">child_care</i>
                                                        <div class="text">{{table.childCount}}</div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="tableStatusContainer tableBold">
                                                {{ table.consumeTypeName}}
                                            </div>
                                        </div>
                                        <div v-else @click="createTable(table.tableName)" class="tableCard notUsed">
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
                                <v-text-field ref="ins" v-model="buffer"
                                              placeholder="instruction.." id="instruction"
                                              autofocus=autofocus></v-text-field>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    </div>
</template>

<script>
import {
  _Config,
  AssginToStringClass,
  blockReady,
  changeLanguage,
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
  showTime,
  Strings,
  toggleDebug,
  version
} from '../oldjs/common'
import Swal from 'sweetalert2'

export default {
  name: 'IndexPage',
  data: function () {
    return {
      reservations: [],
      areas: [],
      seen: true,
      time: '',
      buffer: '',
      ins: {},
      dishes: [],
      Config: _Config,
      Strings,
      focusTimer: null
    }
  },
  methods: {
    popAuthorize,
    findInString,
    createTable: createOrEnterTable,
    jumpToTable,
    changeLanguage,
    toggleDebug,
    requestOutTable,
    initialUI () {
      this.$refs.ins.focus()
      blockReady()
    },
    async refreshTables () {
      this.areas = await getActiveTables()
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
      oldJumpTo('admin/index.html', this.Config)
      // jumpTo('manage.html',Config);
    },
    autoGetFocus () {
      if (Swal.isVisible()) {
        return
      }
      this.$refs.ins.focus()
    }
  },
  mounted: function () {
    setInterval(() => {
      this.time = showTime()
    }, 1000)
    AssginToStringClass('version', version)
    resolveBestIP(() => {
      for (const i in this.Strings[this.Config.lang]) {
        AssginToStringClass(i, this.Strings[this.Config.lang][i])
      }
      getConsumeTypeList(() => {
        window.onkeydown = this.listenKeyDown
        this.refreshTables()
        this.focusTimer =
          [setInterval(this.autoGetFocus, 1000),
            setInterval(this.refreshTables, 5000)]
        getAllDishes().then(res => {
          this.dishes = res
        })
      })
    })
  },
  beforeDestroy () {
    if (this.focusTimer != null) {
      this.focusTimer.map(clearInterval)
    }
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

        min-width: 220px;
        max-width: 708px;
        margin-right: 14px;

    }

    .areaTableContainer {
        max-height: 900px;
        display: flex;
        width: fit-content;
        flex-direction: column;
        flex-wrap: wrap;
        margin-bottom: 55px;

    }

    .table-card-content-m {
        vertical-align: middle;
        font-weight: 100;
        font-size: 20px;
        line-height: 30px;
    }

    .tableCard {
        cursor: pointer;
        width: 196px;
        height: 95px;
        background: url("/Resources/第一页/白色背景板@2x.png") center / cover;
        margin-right: 24px;
        border-radius: 4px;
        margin-top: 36px;
        position: relative;
        -webkit-box-shadow: 3px 3px 8px 0 rgba(75, 75, 75, 0.08);
        box-shadow: 3px 3px 8px 0 rgba(75, 75, 75, 0.08);
    }

    .tableCard.notUsed {
        background: #d0d0d0;
        color: white;
    }

    .tableCard.notUsed .tableCardName {
        color: white;
    }

    .tableCard.onCall {
        color: white !important;
        background-image: url("/Resources/第一页/红色背景板@2x.png");
    }

    .onCall > .tableTimeLabel {
        color: white;
    }

    .onCall > .tableIconContainer > .tableIconRow > .material-icons {
        color: white;
    }

    .tableBold {
        font-weight: 600;
    }

    .tableCardName {
        position: absolute;
        top: 17px;
        left: 17px;
        line-height: 23px;
        font-size: 26px;
        font-family: Roboto, "Axure Handwriting", sans-serif;
        font-weight: 600;
    }

    .tableTimeLabel {
        position: absolute;
        bottom: 17px;
        left: 17px;
        margin-top: 10px;
        color: #367aeb;
        font-size: 12px;
    }

    .tableIconRow > .material-icons {
        font-size: 16px;
        line-height: 18px;
        color: #367aeb;
        margin-right: 4px;
    }

    .inputRow {
        width: 100%;
        display: flex;
        justify-content: space-between;

    }

    .tableIconRow {
        display: flex;
        font-size: 12px;
        font-weight: 600;
    }

    .tableIconContainer {
        position: absolute;
        top: 15px;
        right: 17px;
    }

    .tableStatusContainer {
        position: absolute;
        font-size: 14px;
        bottom: 17px;
        right: 17px;
    }

    .tableTimeLabel .tableBold {
        margin-left: 8px;
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

    .newInput {
        border-bottom: 1px dashed #367aeb !important;
        box-shadow: none !important;

    }

    .inputContainer2 {
        margin-top: 12px;
        width: 170px;
    }

    .select-wrapper .caret {
        height: 39px;
        width: 28px;
        z-index: 4;
        background: #367aeb;
        border-radius: 0 5px 5px 0;
        fill: white;
        box-shadow: 0 10px 10px #367aeb;
    }

    .select-wrapper input.select-dropdown {
        border: none;
        background: #f5f6fa;
        width: 170px;
        height: 39px;
        padding-left: 14px;
        box-shadow: 0 10px 10px #f5f6fa;
        color: rgba(29, 29, 29, 1);
        font-weight: 100;
        line-height: 20px;
        font-size: 14px;

    }

    .select-wrapper input.select-dropdown:focus {
        border: none;
    }

    .select-wrapper + label {
        top: -57px;
        font-size: 14px;
        color: #4b4b4b;
    }

    .totalLabel {
        margin-top: 15px;
    }

    .rightLittlePopContainer {
        top: 584px;
    }

    /*input:focus{*/
    /*    background: red;*/
    /*    color: red !important;*/
    /*}*/
    .adbIcon {
        display: flex;
        align-items: center;
    }

    .adbIcon .material-icons {
        height: auto;
        line-height: unset;
    }

</style>
