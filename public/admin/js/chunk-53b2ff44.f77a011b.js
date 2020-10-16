(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53b2ff44"],{"5c3a8":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{id:"dashboard",fluid:"",tag:"section"}},[a("v-row",[a("v-col",{attrs:{cols:"12",md:"9"}},[a("v-card",{attrs:{color:"basil"}},[a("v-card-title",{staticClass:"text-center justify-center py-6"},[a("h1",{staticClass:"font-weight-bold display-3 basil--text"},[t._v(" "+t._s(t.restaurantName)+" ")])]),a("v-tabs",{attrs:{"background-color":"transparent",color:"basil",grow:""}},[t._l(t.items,(function(e,i){return a("v-tab",{key:i},[t._v(" "+t._s(e)+" ")])})),a("v-tab-item",[a("v-row",[a("v-col",{attrs:{cols:"12",md:"9"}},[a("base-material-card",{staticClass:"px-5 py-3",attrs:{id:"coloured-line",color:"warning",icon:"mdi-chart-timeline-variant"},scopedSlots:t._u([{key:"after-heading",fn:function(){return[a("div",{staticClass:"display-1 font-weight-light mt-2"},[t._v(" "+t._s(t.$t("销售数据统计"))+" ")])]},proxy:!0}])},[a("chartist",{staticClass:"mt-3",staticStyle:{"max-height":"300px"},attrs:{data:t.salesData,options:t.salesDataChart.options,type:"Line"}}),a("v-divider",{staticClass:"ma-3"}),a("div",{staticClass:"px-3"},[a("div",{staticClass:"body-2 text-uppercase grey--text font-weight-bold mb-3"},[t._v(" Legend ")]),a("v-row",{staticClass:"ma-0",attrs:{align:"center"}},[a("v-avatar",{staticClass:"mr-1",attrs:{color:"info",size:"12"}}),a("span",{staticClass:"mr-3 font-weight-light"},[t._v(t._s(t.$t("Food")))]),a("v-avatar",{staticClass:"mr-1",attrs:{color:"red",size:"12"}}),a("span",{staticClass:"mr-3 font-weight-light"},[t._v(t._s(t.$t("Drinks")))])],1)],1)],1)],1),a("v-col",{attrs:{cols:"12",md:"3"}},[void 0!==t.unpaidTable&&t.unpaidTable.length>0?a("v-card",{staticClass:"mr-2"},[a("v-card-title",{staticClass:"subheading font-weight-bold"},[t._v(" "+t._s(t.$t("未结账桌子"))+" "),a("v-btn",{attrs:{icon:"",large:"",color:"primary"},on:{click:t.reloadData}},[a("v-icon",[t._v("mdi-cached")])],1)],1),a("v-divider"),a("div",{staticClass:"py-6 px-6"},t._l(t.unpaidTable,(function(e,i){return a("div",{key:i,staticClass:"d-flex justify-space-between text-subtitle-2"},[a("div",[t._v(t._s(t.$t("桌号"))+": "+t._s(e.tableName))]),a("div",[t._v(t._s(e.totalPrice)+"€")])])})),0)],1):t._e()],1)],1)],1),a("v-tab-item",[a("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"primary",icon:"mdi-account",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[a("div",{staticClass:"display-1 font-weight-light mt-2"},[t._v(" "+t._s(t.$t("随时更新，随时掌握营销状况"))+" ")])]},proxy:!0}])},[a("v-card-text",[a("v-data-table",{attrs:{headers:t.servantHeader,items:t.thisMonthServantRank},scopedSlots:t._u([{key:"item.photo",fn:function(e){var i=e.item;return[a("v-avatar",{attrs:{tile:""}},[a("v-img",{attrs:{src:t.servantImgRoot+i.photo,height:"48px",width:"48px"}})],1)]}}])})],1)],1)],1)],2)],1)],1),a("v-col",{attrs:{cols:"12",md:"3"}},[void 0!==t.realTimeIncomeList?a("v-card",[a("v-card-title",{staticClass:"text-center justify-center text-h2 font-weight-bold"},[a("div",[t._v(t._s(t.$t("日结单")))]),a("v-btn",{attrs:{icon:"",large:"",color:"primary"},on:{click:t.reloadData}},[a("v-icon",[t._v("mdi-cached")])],1)],1),a("v-divider",{staticClass:"mx-2 my-2"}),a("v-card-title",{staticClass:"subheading font-weight-bold"},[a("div",[t._v(t._s(t.$t("今日销售额(含未结单)")))]),a("v-spacer"),a("div",[t._v(t._s(t.realTimeIncomeList.sumIncome)+"€")]),void 0!==t.taxInfos?a("div",[t._v(" "+t._s(t.$t("今日销售额(已结单)"))+" ")]):t._e(),a("v-spacer"),void 0!==t.taxInfos?a("div",[t._v(" "+t._s(t._f("priceDisplay")(t.taxInfos[0].taxGroupTotal+t.taxInfos[1].taxGroupTotal+t.taxInfos[2].taxGroupTotal+t.taxInfos[3].taxGroupTotal))+"€ ")]):t._e()],1),a("v-divider"),a("div",{staticClass:"py-6 px-6 pb-2"},[void 0!==t.taxInfos?a("div",[a("div",{staticClass:"d-flex justify-space-between text-subtitle-2 grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("Umsatz In Haus 5%")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[0].taxGroupTotal))+"€")])]),a("div",{staticClass:"d-flex justify-space-between text-subtitle-2 grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("Umsatz Ausser Haus 5%")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[1].taxGroupTotal))+"€")])]),a("v-divider",{staticClass:"mx-2 my-2"}),a("div",{staticClass:"d-flex justify-space-between font-weight-black grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("GesamtUmsatz 5%")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[0].taxGroupTotal+t.taxInfos[1].taxGroupTotal))+"€")])]),a("div",{staticClass:"d-flex justify-space-between grey--text text--darken-2"},[a("div",[t._v("-"+t._s(t.$t("Netto 5%")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[0].taxGroupTotal/(1+t.taxInfos[0].taxRateGroupValue)*t.taxInfos[0].taxRateGroupValue+t.taxInfos[1].taxGroupTotal/(1+t.taxInfos[1].taxRateGroupValue)*t.taxInfos[1].taxRateGroupValue))+"€")])]),a("div",{staticClass:"d-flex justify-space-between grey--text text--darken-2"},[a("div",[t._v("-"+t._s(t.$t("Nwst 5%")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[0].taxGroupTotal/(1+t.taxInfos[0].taxRateGroupValue)+t.taxInfos[1].taxGroupTotal/(1+t.taxInfos[1].taxRateGroupValue)))+"€")])]),a("v-divider",{staticClass:"mx-2 my-2"}),a("div",{staticClass:"d-flex justify-space-between text-subtitle-2 grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("Umsatz In Haus 16%")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[2].taxGroupTotal))+"€")])]),a("div",{staticClass:"d-flex justify-space-between text-subtitle-2 grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("Umsatz Ausser Haus 16%")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[3].taxGroupTotal))+"€")])]),a("v-divider",{staticClass:"mx-2 my-2"}),a("div",{staticClass:"d-flex justify-space-between font-weight-black grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("GesamtUmsatz 16%")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[2].taxGroupTotal+t.taxInfos[3].taxGroupTotal))+"€")])]),a("div",{staticClass:"d-flex justify-space-between grey--text text--darken-2"},[a("div",[t._v("-"+t._s(t.$t("Netto 16%")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[2].taxGroupTotal/(1+t.taxInfos[2].taxRateGroupValue)*t.taxInfos[2].taxRateGroupValue+t.taxInfos[3].taxGroupTotal/(1+t.taxInfos[3].taxRateGroupValue)*t.taxInfos[3].taxRateGroupValue))+"€")])]),a("div",{staticClass:"d-flex justify-space-between grey--text text--darken-2"},[a("div",[t._v("-"+t._s(t.$t("Nwst 16%")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[2].taxGroupTotal/(1+t.taxInfos[2].taxRateGroupValue)+t.taxInfos[3].taxGroupTotal/(1+t.taxInfos[3].taxRateGroupValue)))+"€")])]),a("v-divider",{staticClass:"mx-2 my-2"})],1):t._e(),a("div",{staticClass:"d-flex justify-space-between font-weight-black text-subtitle-2"},[a("div",[t._v(t._s(t.$t("刷卡额")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.cardAmount))+"€")])]),a("div",{staticClass:"d-flex justify-space-between font-weight-black text-subtitle-2"},[a("div",[t._v(t._s(t.$t("现金额")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.cashAmount))+"€")])]),a("v-divider",{staticClass:"mx-2 my-2"}),t.realTimeIncomeList.takeawayAmount?a("div",{staticClass:"d-flex justify-space-between font-weight-black text-subtitle-2"},[a("div",[t._v(t._s(t.$t("外卖营业额")))]),a("div",[t._v(t._s(t.realTimeIncomeList.takeawayAmount)+"€")])]):t._e(),a("v-divider",{staticClass:"mx-2 my-2"}),t.realTimeIncomeList.storno?a("div",{staticClass:"d-flex justify-space-between font-weight-black text-subtitle-2"},[a("div",[t._v(t._s(t.$t("退菜金额")))]),a("div",[t._v(t._s(t.stornoAmount)+"€")])]):t._e(),a("v-divider",{staticClass:"mx-2 my-2"}),a("div",{staticClass:"d-flex justify-space-between font-weight-black text--darken-2"},[a("div",[t._v(t._s(t.$t("未结单营业额")))]),a("div",[t._v(t._s(t.realTimeIncomeList.unpaid)+"€")])]),a("v-divider",{staticClass:"mx-2 my-2"}),a("div",{staticClass:"d-flex justify-space-between font-weight-black text--darken-2 mt-10"},[t.realTimeIncomeList.storno?a("v-btn",{attrs:{color:"error",dark:""},on:{click:t.checkStorno}},[t._v(" "+t._s(t.$t("查看退菜"))+" ")]):t._e(),a("v-dialog",{model:{value:t.stornoDialog,callback:function(e){t.stornoDialog=e},expression:"stornoDialog"}},[a("v-card",[a("v-toolbar",{attrs:{dense:"",color:"white"}},[a("v-spacer"),a("v-icon",{on:{click:function(e){t.stornoDialog=!t.stornoDialog}}},[t._v(" mdi-close ")])],1),a("v-card-text",[a("ik-data-table",{attrs:{model:t.storno,"use-action":!1,"use-select":!1,icon:"mdi-calculator-variant","entity-name":t.$t("退菜列表")},scopedSlots:t._u([{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0}],null,!1,2407724576)})],1)],1)],1),a("v-btn",{attrs:{color:"primary",dark:""},on:{click:t.printTodayBills}},[t._v(" "+t._s(t.$t("打印"))+" ")])],1)],1)],1):t._e()],1)],1),a("v-row",[a("v-col",{attrs:{lg:"3",cols:"12"}},[a("base-material-card",{attrs:{color:"error",icon:"mdi-run-fast",title:t.$t("快速操作")}},[a("v-list",[a("v-list-item",{on:{click:t.toZbon}},[a("v-list-item-icon",[a("v-icon",[t._v(" mdi-format-list-bulleted ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" "+t._s(t.$t("Zbon列表"))+" ")])],1)],1),a("v-list-item",{on:{click:t.toAllBills}},[a("v-list-item-icon",[a("v-icon",[t._v(" mdi-calendar-account ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" "+t._s(t.$t("全部账单"))+" ")])],1)],1),a("v-list-item",{on:{click:t.addDishes}},[a("v-list-item-icon",[a("v-icon",[t._v(" mdi-pencil ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" "+t._s(t.$t("菜品管理"))+" ")])],1)],1),a("v-list-item",{on:{click:t.addCategories}},[a("v-list-item-icon",[a("v-icon",[t._v(" mdi-domain ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" "+t._s(t.$t("标签管理"))+" ")])],1)],1),a("v-list-item",{on:{click:t.dishStatistic}},[a("v-list-item-icon",[a("v-icon",[t._v(" mdi-dialpad ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" "+t._s(t.$t("菜品统计"))+" ")])],1)],1),a("v-list-item",{on:{click:t.dailyBill}},[a("v-list-item-icon",[a("v-icon",[t._v(" mdi-bulletin-board ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" "+t._s(t.$t("本日总汇"))+" ")])],1)],1)],1)],1)],1),[a("v-col",{attrs:{lg:"9",cols:"12"}},[a("v-row",[a("v-col",{attrs:{cols:"12",md:"6"}},[a("base-material-stats-card",{attrs:{color:"info",icon:"mdi-twitter","sub-icon":"mdi-clock","sub-text":t.$t("Just Updated"),title:t.$t("今日营业总额"),value:"€"+t.todayInfo.sumIncome}})],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("base-material-stats-card",{attrs:{color:"primary",icon:"mdi-poll","sub-icon":"mdi-tag","sub-text":t.$t("Tracked from Aaden Analytics"),title:t.$t("今日用餐总人数"),value:t.todayInfo.sumPersonCount}})],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("base-material-stats-card",{attrs:{color:"success",icon:"mdi-store","sub-icon":"mdi-calendar","sub-text":"",title:t.$t("使用中的桌子"),value:t.tableUsageStatus.inUse}})],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("base-material-stats-card",{attrs:{color:"orange",icon:"mdi-sofa","sub-icon":"mdi-alert",title:t.$t("本月平均翻台率"),"sub-text":t.$t("翻台率是指桌子被使用的频率"),value:t.tableRenew.toFixed(2)+"%"}})],1)],1)],1)]],2),a("v-row",[a("v-col",{attrs:{cols:"12",md:"6"}},[a("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"pink",icon:"mdi-heart",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[a("div",{staticClass:"display-1 font-weight-light mt-2"},[t._v(" "+t._s(t.$t("本周内最受欢迎的精美食品"))+" ")])]},proxy:!0}])},[a("v-card-text",[a("v-data-table",{attrs:{headers:t.dishesHeader,items:t.thisWeekMostPopularDishes},scopedSlots:t._u([{key:"item.photo",fn:function(e){var i=e.item;return[a("v-avatar",{attrs:{tile:""}},[a("v-img",{attrs:{src:t.dishImgRoot+i.image,height:"48px",width:"48px"}})],1)]}}])})],1)],1)],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("v-card",[a("v-card-title",{staticClass:"subheading font-weight-bold"},[t._v(" "+t._s(t.$t("热销菜品分布"))+" "),a("v-btn",{attrs:{text:""},on:{click:t.changeDateToDay}},[t._v(" 查看本日 ")]),a("v-btn",{attrs:{text:""},on:{click:t.changeDateToMonth}},[t._v(" 查看本月 ")])],1),a("v-divider"),a("v-list",{attrs:{dense:""}},t._l(t.dishIncomeList,(function(e,i){return a("v-list-item",{key:i},[a("v-list-item-content",[t._v(" "+t._s(t.dishIncomeList[i].name)+": ")]),a("v-list-item-content",[t._v(" "+t._s(t.dishIncomeList[i].sumPrice)+" ")])],1)})),1)],1)],1)],1)],1)},s=[],n=(a("7db0"),a("4160"),a("a15b"),a("13d5"),a("b0c0"),a("ac1f"),a("1276"),a("159b"),a("96cf"),a("1da1")),o=a("b85c"),r=a("0a61"),c=a("3405"),l=a("633c"),d=a("ff51"),u=a("ccdd"),v=a("5530"),m={name:{},orderId:{},Dname:{},time:{},price:{}},f={load:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("+++++++="),t.next=3,l["hillo"].get("IndexData.php?",Object(v["a"])({lang:c["a"].lang()},e));case 3:return a=t.sent,t.abrupt("return",a.realtimeIncomeAndInfo.storno);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},h=l["IKDataEntity"].ModelFactory(m,f),p={name:"DashboardDashboard",components:{IkDataTable:l["IkDataTable"]},data:function(){return{storno:h,stornoDialog:!1,items:[this.$i18n.t("销售数据统计"),this.$i18n.t("跑堂排行")],salesDataChart:{options:{low:0,chartPadding:{top:0,right:0,bottom:0,left:0}}},servantHeader:[{text:"Name",value:"name"},{text:this.$i18n.t("income"),value:"income",align:"right"},{text:this.$i18n.t("billCount"),value:"billCount",align:"right"}],dishesHeader:[{text:this.$i18n.t("Ranking"),value:"rank"},{text:this.$i18n.t("image"),value:"photo",align:"center"},{text:this.$i18n.t("name"),value:"name",align:"right"},{text:this.$i18n.t("price"),value:"price",align:"right"},{text:this.$i18n.t("count"),value:"sumCount",align:"right"}],indexData:{sevenDaysFoodDrinkIncome:[],thisMonthServantRank:[],realTimeIncomeList:{tax_infos:[]},todayInfo:{sumIncome:"0"},tableUsageStatus:{inUse:"0"},thisMonthAverageTablesRenewRate:0},restaurantName:"",dishIncomeList:[],dishIncomeWithPLog:[],cashAmount:0,cardAmount:0,taxItem:{consumeTypeName:"",taxGroupTotal:0,taxRateGroupValue:0}}},computed:{realTimeIncomeList:function(){return this.indexData.realtimeIncomeAndInfo?this.indexData.realtimeIncomeAndInfo:void 0},taxInfos:function(){var t=this;if(this.indexData.realtimeIncomeAndInfo.taxInfos){var e=[];return this.indexData.realtimeIncomeAndInfo.taxInfos.forEach((function(a){t.taxItem=l["IKUtils"].deepCopy(a),e.push(t.taxItem)})),e}},servantImgRoot:function(){return this.$store.getters.rootUrl+c["a"].servantRoot},dishImgRoot:function(){return this.$store.getters.rootUrl+c["a"].dishImageRoot},salesData:function(){var t,e=[],a=[],i=[],s=Object(o["a"])(this.indexData.sevenDaysFoodDrinkIncome);try{for(s.s();!(t=s.n()).done;){var n=t.value,r=n.find((function(t){return"foods"===t.name.toLowerCase()})),c=n.find((function(t){return"drinks"===t.name.toLowerCase()}));e.push(r.dateDisplay),a.push(r.income),i.push(c.income)}}catch(l){s.e(l)}finally{s.f()}return{labels:e.reverse(),series:[a.reverse(),i.reverse()]}},unpaidTable:function(){return this.indexData.realtimeIncomeAndInfo?this.indexData.realtimeIncomeAndInfo.unpaidTable:void 0},stornoList:function(){return this.indexData.realtimeIncomeAndInfo?this.indexData.realtimeIncomeAndInfo.storno:void 0},stornoAmount:function(){if(this.indexData.realtimeIncomeAndInfo.storno){var t=this.indexData.realtimeIncomeAndInfo.storno;return t.reduce((function(t,e){return t+parseFloat(e.price)}),0)}},thisMonthServantRank:function(){return this.indexData.thisMonthServantRank},todayInfo:function(){return this.indexData.todayInfo},tableUsageStatus:function(){return this.indexData.tableUsageStatus},tableRenew:function(){return this.indexData.thisMonthAverageTablesRenewRate},thisWeekMostPopularDishes:function(){return this.indexData.thisWeekMostPopularDishes},totalSales:function(){return this.sales.reduce((function(t,e){return t+e.salesInM}),0)}},created:function(){this.onceData(),this.reloadData()},methods:{checkStorno:function(){this.stornoDialog=!0},changeDateToDay:function(){this.dishIncomeList=this.indexData.thisDayIncomePieChart},changeDateToMonth:function(){this.dishIncomeList=this.indexData.thisMonthIncomePieChart},reprint:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.model.reprint(t);case 2:l["IKUtils"].toast();case 3:case"end":return a.stop()}}),a)})))()},toZbon:function(){this.$router.push({path:"/Bills/zbonlist"})},toAllBills:function(){this.$router.push({path:"/Bills/history-bills"})},addDishes:function(){this.$router.push({path:"/dishes/dishes-manage"})},addCategories:function(){this.$router.push({path:"/dishes/labels-manage"})},dishStatistic:function(){this.$router.push({path:"/dishes/dish-statistics"})},dailyBill:function(){this.$router.push({path:"/Bills/today-bills"})},printTodayBills:function(){var t=[Object(d["a"])(0),Object(d["a"])(0)],e={timespan:t?t.join(" - "):""};u["a"].showConfirm("Bist du sicher?","Möchten Sie alle Datensätze drucken?",(function(){Object(r["b"])(e).then((function(){u["a"].toast("Erfolgreich drucken!")}))}))},onceData:function(){var t=this;Object(r["w"])().then((function(e){var a=[];a=e.content[0].name.split("<BR>"),t.restaurantName=a.join(" ")}))},calculateAmount:function(t){var e=this;this.cashAmount=0,this.cardAmount=0,t.forEach((function(t){null!==t.payLogs?t.payLogs.forEach((function(t){"2"===t.paymentMethodId&&(e.cardAmount+=parseFloat(t.amount)),"1"===t.paymentMethodId&&(e.cashAmount+=parseFloat(t.amount))})):("2"===t.payMethod&&(e.cardAmount+=parseFloat(t.totalPrice)),"1"===t.payMethod&&(e.cashAmount+=parseFloat(t.totalPrice)))}))},reloadData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(r["t"])().then((function(e){t.indexData=e,t.dishIncomeList=t.indexData.thisMonthIncomePieChart}));case 2:return a=[Object(d["a"])(0),Object(d["a"])(0)].join(" - "),e.next=5,Object(r["j"])(a).then((function(e){t.dishIncomeWithPLog=e.content,t.calculateAmount(t.dishIncomeWithPLog)}));case 5:case"end":return e.stop()}}),e)})))()},beforeDestroy:function(){clearTimeout(this.timer1),clearTimeout(this.timer2),this.timer1=null,this.timer2=null},complete:function(t){this.list[t]=!this.list[t]}}},x=p,_=(a("674b"),a("2877")),b=a("6544"),g=a.n(b),I=a("8212"),y=a("8336"),D=a("b0af"),w=a("99d9"),k=a("62ad"),C=a("a523"),$=a("8fea"),T=a("169a"),j=a("ce7e"),R=a("132d"),A=a("adda"),G=a("8860"),V=a("da13"),L=a("5d23"),M=a("34c3"),S=a("0fd9"),U=a("2fa4"),O=a("71a3"),P=a("c671"),B=a("fe57"),F=a("71d9"),H=Object(_["a"])(x,i,s,!1,null,null,null);e["default"]=H.exports;g()(H,{VAvatar:I["a"],VBtn:y["a"],VCard:D["a"],VCardText:w["c"],VCardTitle:w["d"],VCol:k["a"],VContainer:C["a"],VDataTable:$["a"],VDialog:T["a"],VDivider:j["a"],VIcon:R["a"],VImg:A["a"],VList:G["a"],VListItem:V["a"],VListItemContent:L["b"],VListItemIcon:M["a"],VListItemTitle:L["d"],VRow:S["a"],VSpacer:U["a"],VTab:O["a"],VTabItem:P["a"],VTabs:B["a"],VToolbar:F["a"]})},"674b":function(t,e,a){"use strict";var i=a("d1f7"),s=a.n(i);s.a},ccdd:function(t,e,a){"use strict";var i=a("5530"),s=a("633c");e["a"]=Object(i["a"])({},s["IKUtils"])},d1f7:function(t,e,a){},ff51:function(t,e,a){"use strict";a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return s}));a("a15b");function i(t){var e=new Date,a=e.getTime(),i=864e5,s=a+t*i,n=new Date(s),o=n.getFullYear(),r=n.getMonth()+1,c=n.getDate();return[o,r,c].join("-")}function s(t){var e=new Date,a=e.getTime(),i=864e5,s=a+t*i,n=new Date(s),o=n.getFullYear()+"-",r=n.getMonth()+1,c=n.getDate(),l=n.getHours()<10?"0"+n.getHours():n.getHours(),d=n.getMinutes()<10?"0"+n.getMinutes():n.getMinutes(),u=n.getSeconds()<10?"0"+n.getSeconds():n.getSeconds();return o+r+"-"+c+" "+l+":"+d+":"+u}}}]);
//# sourceMappingURL=chunk-53b2ff44.f77a011b.js.map