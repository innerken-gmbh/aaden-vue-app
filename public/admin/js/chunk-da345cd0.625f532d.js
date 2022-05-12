(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-da345cd0"],{"5c3a8":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{id:"dashboard",fluid:"",tag:"section"}},[a("v-row",[a("v-col",{attrs:{cols:"12",md:"8"}},[a("v-card",{attrs:{color:"basil"}},[a("v-card-title",{staticClass:"text-center justify-center py-5"},[a("h1",{staticClass:"font-weight-bold text-h3 display-3 basil--text"},[t._v(" "+t._s(t.restaurantName)+" ")])]),a("v-tabs",{attrs:{"background-color":"transparent",color:"basil",grow:""}},[t._l(t.items,(function(e,s){return a("v-tab",{key:s},[t._v(" "+t._s(e)+" ")])})),a("v-tab-item",[a("div",{staticClass:"px-5 py-3",attrs:{id:"coloured-line"}},[a("chartist",{staticClass:"mt-3",staticStyle:{"max-height":"300px"},attrs:{data:t.salesData,options:t.salesDataChart.options,type:"Line"}}),a("v-divider",{staticClass:"ma-3"}),a("div",{staticClass:"px-3"},[a("div",{staticClass:"body-2 text-uppercase grey--text font-weight-bold mb-3"},[t._v(" "+t._s(t.$t("legend"))+" ")]),a("v-row",{staticClass:"ma-0",attrs:{align:"center"}},[a("v-avatar",{staticClass:"mr-1",attrs:{color:"info",size:"12"}}),a("span",{staticClass:"mr-3 font-weight-light"},[t._v(t._s(t.$t("Food")))]),a("v-avatar",{staticClass:"mr-1",attrs:{color:"red",size:"12"}}),a("span",{staticClass:"mr-3 font-weight-light"},[t._v(t._s(t.$t("Drinks")))])],1)],1)],1)]),a("v-tab-item",[a("div",{staticClass:"px-5 py-3"},[a("v-data-table",{attrs:{headers:t.servantHeader,items:t.thisMonthServantRank},scopedSlots:t._u([{key:"item.photo",fn:function(e){var s=e.item;return[a("v-avatar",{attrs:{tile:""}},[a("v-img",{attrs:{src:t.servantImgRoot+s.photo,height:"48px",width:"48px"}})],1)]}}])})],1)])],2)],1)],1),a("v-col",{attrs:{cols:"12",md:"4"}},[void 0!==t.realTimeIncomeList?a("v-card",[a("v-card-title",{staticClass:"text-center justify-center text-h3 font-weight-bold"},[a("div",[t._v(t._s(t.$t("日结单")))]),a("v-spacer"),a("v-btn",{staticClass:"mr-3",attrs:{text:"",fab:""},on:{click:t.reloadData}},[a("v-icon",[t._v("mdi-cached")]),t._v(" "+t._s(t.$t("更新数据"))+" ")],1)],1),a("v-divider",{staticClass:"mx-2 my-2 mt-0"}),a("v-card-title",{staticClass:"subheading font-weight-bold"},[a("div",[t._v(t._s(t.$t("今日销售额(含未结单)")))]),a("v-spacer"),a("div",[t._v(t._s(t._f("priceDisplay")(parseFloat(t.realTimeIncomeList.sumIncome)+parseFloat(t.realTimeIncomeList.unpaid)))+"€")])],1),a("v-card-title",{staticClass:"subheading font-weight-bold"},[void 0!==t.taxInfos?a("div",[t._v(" "+t._s(t.$t("今日销售额(已结单)"))+" ")]):t._e(),a("v-spacer"),void 0!==t.taxInfos?a("div",[t._v(" "+t._s(t._f("priceDisplay")(t.realTimeIncomeList.sumIncome))+"€ ")]):t._e()],1),a("v-divider"),a("div",{staticClass:"py-6 px-6 pb-2"},[void 0!==t.taxInfos&&t.taxInfos.length<=9?a("div",[a("div",{staticClass:"d-flex justify-space-between text-subtitle-2 grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("Umsatz In Haus"))+t._s(parseInt(100*t.taxInfos[1].taxRateGroupValue))+"%")]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[1].taxGroupTotal))+"€")])]),a("div",{staticClass:"d-flex justify-space-between text-subtitle-2 grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("Umsatz Ausser Haus"))+t._s(parseInt(100*t.taxInfos[2].taxRateGroupValue))+"%")]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[2].taxGroupTotal))+"€")])]),a("v-divider",{staticClass:"mx-2 my-2"}),a("div",{staticClass:"d-flex justify-space-between font-weight-black grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("GesamtUmsatz"))+t._s(parseInt(100*t.taxInfos[0].taxRateGroupValue))+"%")]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[1].taxGroupTotal+t.taxInfos[2].taxGroupTotal))+"€")])]),a("div",{staticClass:"d-flex justify-space-between grey--text text--darken-2"},[a("div",[t._v("-"+t._s(t.$t("MWST")))]),a("div",[t._v(" "+t._s(t._f("priceDisplay")(t.taxInfos[1].taxGroupTotal/(1+t.taxInfos[1].taxRateGroupValue)*t.taxInfos[1].taxRateGroupValue+t.taxInfos[2].taxGroupTotal/(1+t.taxInfos[2].taxRateGroupValue)*t.taxInfos[2].taxRateGroupValue))+"€ ")])]),a("div",{staticClass:"d-flex justify-space-between grey--text text--darken-2"},[a("div",[t._v("-"+t._s(t.$t("Netto")))]),a("div",[t._v(" "+t._s(t._f("priceDisplay")(t.taxInfos[1].taxGroupTotal/(1+t.taxInfos[1].taxRateGroupValue)+t.taxInfos[2].taxGroupTotal/(1+t.taxInfos[2].taxRateGroupValue)))+"€ ")])]),a("v-divider",{staticClass:"mx-2 my-2"}),a("div",{staticClass:"d-flex justify-space-between text-subtitle-2 grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("Umsatz In Haus"))+t._s(parseInt(100*t.taxInfos[4].taxRateGroupValue))+"%")]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[4].taxGroupTotal))+"€")])]),a("div",{staticClass:"d-flex justify-space-between text-subtitle-2 grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("Umsatz Ausser Haus"))+t._s(parseInt(100*t.taxInfos[5].taxRateGroupValue))+"%")]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[5].taxGroupTotal))+"€")])]),a("v-divider",{staticClass:"mx-2 my-2"}),a("div",{staticClass:"d-flex justify-space-between font-weight-black grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("GesamtUmsatz"))+t._s(parseInt(100*t.taxInfos[3].taxRateGroupValue))+"%")]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[4].taxGroupTotal+t.taxInfos[5].taxGroupTotal))+"€")])]),a("div",{staticClass:"d-flex justify-space-between grey--text text--darken-2"},[a("div",[t._v("-"+t._s(t.$t("MWST")))]),a("div",[t._v(" "+t._s(t._f("priceDisplay")(t.taxInfos[4].taxGroupTotal/(1+t.taxInfos[4].taxRateGroupValue)*t.taxInfos[4].taxRateGroupValue+t.taxInfos[5].taxGroupTotal/(1+t.taxInfos[5].taxRateGroupValue)*t.taxInfos[3].taxRateGroupValue))+"€ ")])]),a("div",{staticClass:"d-flex justify-space-between grey--text text--darken-2"},[a("div",[t._v("-"+t._s(t.$t("Netto")))]),a("div",[t._v(" "+t._s(t._f("priceDisplay")(t.taxInfos[4].taxGroupTotal/(1+t.taxInfos[4].taxRateGroupValue)+t.taxInfos[5].taxGroupTotal/(1+t.taxInfos[5].taxRateGroupValue)))+"€ ")])]),a("v-divider",{staticClass:"mx-2 my-2"}),t.taxInfos[6]?a("div",{staticClass:"d-flex justify-space-between text-subtitle-2 grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("Umsatz In Haus"))+t._s(parseInt(100*t.taxInfos[7].taxRateGroupValue))+"%")]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[7].taxGroupTotal))+"€")])]):t._e(),t.taxInfos[6]?a("div",{staticClass:"d-flex justify-space-between text-subtitle-2 grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("Umsatz Ausser Haus"))+t._s(parseInt(100*t.taxInfos[8].taxRateGroupValue))+"%")]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[8].taxGroupTotal))+"€")])]):t._e(),a("v-divider",{staticClass:"mx-2 my-2"}),t.taxInfos[6]?a("div",{staticClass:"d-flex justify-space-between font-weight-black grey--text text--darken-2"},[a("div",[t._v(t._s(t.$t("GesamtUmsatz"))+t._s(parseInt(100*t.taxInfos[6].taxRateGroupValue))+"%")]),a("div",[t._v(t._s(t._f("priceDisplay")(t.taxInfos[7].taxGroupTotal+t.taxInfos[8].taxGroupTotal))+"€")])]):t._e(),t.taxInfos[6]?a("div",{staticClass:"d-flex justify-space-between grey--text text--darken-2"},[a("div",[t._v("-"+t._s(t.$t("MWST")))]),a("div",[t._v(" "+t._s(t._f("priceDisplay")(t.taxInfos[7].taxGroupTotal/(1+t.taxInfos[7].taxRateGroupValue)*t.taxInfos[7].taxRateGroupValue+t.taxInfos[8].taxGroupTotal/(1+t.taxInfos[8].taxRateGroupValue)*t.taxInfos[6].taxRateGroupValue))+"€ ")])]):t._e(),t.taxInfos[6]?a("div",{staticClass:"d-flex justify-space-between grey--text text--darken-2"},[a("div",[t._v("-"+t._s(t.$t("Netto")))]),a("div",[t._v(" "+t._s(t._f("priceDisplay")(t.taxInfos[7].taxGroupTotal/(1+t.taxInfos[7].taxRateGroupValue)+t.taxInfos[8].taxGroupTotal/(1+t.taxInfos[8].taxRateGroupValue)))+"€ ")])]):t._e(),a("v-divider",{staticClass:"mx-2 my-2"})],1):t._e(),a("div",{staticClass:"d-flex justify-space-between font-weight-black text-subtitle-2"},[a("div",[t._v(t._s(t.$t("现金额")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.cashAmount))+"€")])]),a("div",{staticClass:"d-flex justify-space-between font-weight-black text-subtitle-2"},[a("div",[t._v(t._s(t.$t("刷卡额")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.cardAmount))+"€")])]),a("div",{staticClass:"d-flex justify-space-between font-weight-black text-subtitle-2"},[a("div",[t._v(t._s(t.$t("信用卡")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.creditCardAmount))+"€")])]),a("v-divider",{staticClass:"mx-2 my-2"}),t.realTimeIncomeList.takeawayAmount?a("div",{staticClass:"d-flex justify-space-between font-weight-black text-subtitle-2"},[a("div",[t._v(t._s(t.$t("外卖总销售额")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.realTimeIncomeList.takeawayAmount))+"€")])]):t._e(),a("v-divider",{staticClass:"mx-2 my-2"}),t.realTimeIncomeList.storno?a("div",{staticClass:"d-flex justify-space-between font-weight-black text-subtitle-2"},[a("div",[t._v(t._s(t.$t("退菜金额")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.stornoAmount))+"€")])]):t._e(),a("v-divider",{staticClass:"mx-2 my-2"}),a("div",{staticClass:"d-flex justify-space-between font-weight-black text--darken-2"},[a("div",[t._v(t._s(t.$t("未结单营业额")))]),a("div",[t._v(t._s(t._f("priceDisplay")(t.realTimeIncomeList.unpaid))+"€")])]),a("v-divider",{staticClass:"mx-2 my-2"}),a("div",{staticClass:"d-flex justify-space-between font-weight-black text--darken-2 mt-2"},[t.realTimeIncomeList.storno?a("v-btn",{attrs:{color:"error",dark:"",small:""},on:{click:t.checkStorno}},[t._v(" "+t._s(t.$t("查看退菜"))+" ")]):t._e(),a("v-dialog",{model:{value:t.stornoDialog,callback:function(e){t.stornoDialog=e},expression:"stornoDialog"}},[a("v-card",[a("ik-data-table",{attrs:{model:t.storno,"use-action":!1,"use-select":!1,icon:"mdi-calculator-variant","entity-name":t.$t("退菜列表")}})],1)],1),a("v-btn",{attrs:{color:"primary",dark:"",small:""},on:{click:t.printTodayBills}},[t._v(" "+t._s(t.$t("打印"))+" ")])],1)],1)],1):t._e()],1)],1),a("v-row",[a("v-col",{attrs:{lg:"3",cols:"12"}},[a("base-material-card",{attrs:{color:"error",icon:"mdi-run-fast",title:t.$t("快速操作")}},[a("v-list",[a("v-list-item",{on:{click:t.toZbon}},[a("v-list-item-icon",[a("v-icon",[t._v(" mdi-format-list-bulleted ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" "+t._s(t.$t("Zbon列表"))+" ")])],1)],1),a("v-list-item",{on:{click:t.toAllBills}},[a("v-list-item-icon",[a("v-icon",[t._v(" mdi-calendar-account ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" "+t._s(t.$t("全部账单"))+" ")])],1)],1),a("v-list-item",{on:{click:t.addDishes}},[a("v-list-item-icon",[a("v-icon",[t._v(" mdi-pencil ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" "+t._s(t.$t("菜品管理"))+" ")])],1)],1),a("v-list-item",{on:{click:t.addCategories}},[a("v-list-item-icon",[a("v-icon",[t._v(" mdi-domain ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" "+t._s(t.$t("分类"))+" ")])],1)],1),a("v-list-item",{on:{click:t.dishStatistic}},[a("v-list-item-icon",[a("v-icon",[t._v(" mdi-dialpad ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" "+t._s(t.$t("菜品统计"))+" ")])],1)],1),a("v-list-item",{on:{click:t.dailyBill}},[a("v-list-item-icon",[a("v-icon",[t._v(" mdi-bulletin-board ")])],1),a("v-list-item-content",[a("v-list-item-title",[t._v(" "+t._s(t.$t("本日总汇"))+" ")])],1)],1)],1)],1)],1),a("v-col",{attrs:{lg:"5",cols:"12"}},[a("base-material-card",{attrs:{color:"primary",icon:"mdi-poll",title:t.$t("统计信息")}},[a("v-list",{attrs:{dense:""}},[a("v-list-item",[a("v-list-item-content",[t._v(" "+t._s(t.$t("今日营业总额"))+" ")]),a("v-list-item-content",[t._v(" "+t._s(t.todayInfo.sumIncome)+" ")])],1),a("v-list-item",[a("v-list-item-content",[t._v(" "+t._s(t.$t("今日用餐总人数"))+" ")]),a("v-list-item-content",[t._v(" "+t._s(t.todayInfo.sumPersonCount)+" ")])],1),a("v-list-item",[a("v-list-item-content",[t._v(" "+t._s(t.$t("本月平均翻台率"))+" ")]),a("v-list-item-content",[t._v(" "+t._s(t.tableRenew.toFixed(2)+"%")+" ")])],1)],1)],1)],1),a("v-col",{attrs:{lg:"4",cols:"12"}},[a("base-material-card",{attrs:{color:"success",icon:"mdi-calendar",title:t.$t("桌位")}},[a("v-card-title",{staticClass:"text-h4 font-weight-bold"},[t._v(" "+t._s(t.$t("未结账桌子"))+" "),a("v-spacer"),a("v-btn",{staticClass:"mr-3",attrs:{text:"",fab:""},on:{click:t.reloadData}},[a("v-icon",[t._v("mdi-cached")]),t._v(" "+t._s(t.$t("更新数据"))+" ")],1)],1),a("v-divider"),a("div",{staticClass:"py-6 px-6"},t._l(t.unpaidTable,(function(e,s){return a("div",{key:s,staticClass:"d-flex justify-space-between text-subtitle-2"},[a("div",[t._v(t._s(t.$t("桌号"))+": "+t._s(e.tableName))]),a("div",[t._v(t._s(e.totalPrice))])])})),0),a("div",{staticClass:"py-6 px-6"},[a("div",[t._v(t._s(t.$t("使用中的桌子")))]),a("div",[t._v(t._s(t.tableUsageStatus.inUse))])])],1)],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",md:"6"}},[a("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"pink",icon:"mdi-heart",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[a("div",{staticClass:"display-1 font-weight-light mt-2"},[t._v(" "+t._s(t.$t("本周内最受欢迎的精美食品"))+" ")])]},proxy:!0}])},[a("v-card-text",[a("v-data-table",{attrs:{headers:t.dishesHeader,items:t.thisWeekMostPopularDishes},scopedSlots:t._u([{key:"item.photo",fn:function(e){var s=e.item;return[a("v-avatar",{attrs:{tile:""}},[a("v-img",{attrs:{src:t.dishImgRoot+s.image,height:"48px",width:"48px"}})],1)]}}])})],1)],1)],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("v-card",[a("v-card-title",{staticClass:"subheading font-weight-bold"},[t._v(" "+t._s(t.$t("热销菜品分布"))+" "),a("v-btn",{attrs:{text:""},on:{click:t.changeDateToDay}},[t._v(" "+t._s(t.$t("查看本日"))+" ")]),a("v-btn",{attrs:{text:""},on:{click:t.changeDateToMonth}},[t._v(" "+t._s(t.$t("查看本月"))+" ")])],1),a("v-divider"),a("v-list",{attrs:{dense:""}},t._l(t.dishIncomeList,(function(e,s){return a("v-list-item",{key:s},[a("v-list-item-content",[t._v(" "+t._s(t.dishIncomeList[s].name)+": ")]),a("v-list-item-content",[t._v(" "+t._s(t.dishIncomeList[s].sumPrice)+" ")])],1)})),1)],1)],1)],1)],1)},i=[],n=(a("7db0"),a("4160"),a("a15b"),a("13d5"),a("b0c0"),a("ac1f"),a("1276"),a("159b"),a("96cf"),a("1da1")),o=a("b85c"),r=a("0a61"),l=a("5089"),c=a("641f"),d=a.n(c),u=a("f4d6"),v=a("ff51"),m=a("ccdd"),f=a("5530"),x=a("9d8f"),p=a.n(x),h={name:{},orderId:{},Dname:{},time:{},price:{}},_={load:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log("+++++++="),t.next=3,p.a.get("IndexData.php?",Object(f["a"])({lang:l["b"].getLang()},e));case 3:return a=t.sent,t.abrupt("return",a.realtimeIncomeAndInfo.storno);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},b=u["IKDataEntity"].ModelFactory(h,_),I=(a("d81d"),a("9225"));function g(){var t=[{text:I["a"].t("Name"),align:"start",value:"name"},{text:I["a"].t("AllUmsatz"),value:"all"},{text:"19%",value:"p19"},{text:"7%",value:"p7"},{text:"0%",value:"p0"}],e=t.map((function(t){return Object(f["a"])(Object(f["a"])({},t),{},{class:"font-size: 20px"})}));return e}function y(){return[{text:I["a"].t("Table"),align:"start",value:"tableName"},{text:I["a"].t("Discount"),value:"discountStr"},{text:I["a"].t("servantName"),value:"servantName"},{text:I["a"].t("Time"),value:"timeStamp"},{text:I["a"].t("DiscountValue"),value:"value"}]}function D(){return[{text:I["a"].t("Table"),align:"start",value:"tableName"},{text:I["a"].t("Count"),value:"count"},{text:I["a"].t("Dishname"),value:"Dname"},{text:I["a"].t("returnReason"),value:"returnReason"},{text:I["a"].t("Time"),value:"time"},{text:I["a"].t("StornValue"),value:"value"},{text:I["a"].t("servantName"),value:"servantName"}]}var C={name:"DashboardDashboard",components:{IkDataTable:u["IkDataTable"]},data:function(){return{storno:b,stornoDialog:!1,items:[this.$i18n.t("销售数据统计"),this.$i18n.t("跑堂排行")],salesDataChart:{options:{low:0,chartPadding:{top:0,right:0,bottom:0,left:0}}},servantHeader:[{text:this.$i18n.t("servant"),value:"name"},{text:this.$i18n.t("income"),value:"income",align:"right"},{text:this.$i18n.t("billCount"),value:"billCount",align:"right"}],dishesHeader:[{text:this.$i18n.t("Ranking"),value:"rank"},{text:this.$i18n.t("image"),value:"photo",align:"center"},{text:this.$i18n.t("name"),value:"name",align:"right"},{text:this.$i18n.t("price"),value:"price",align:"right"},{text:this.$i18n.t("count"),value:"sumCount",align:"right"}],indexData:{sevenDaysFoodDrinkIncome:[],thisMonthServantRank:[],realTimeIncomeList:{taxInfos:[]},todayInfo:{sumIncome:"0"},tableUsageStatus:{inUse:"0"},thisMonthAverageTablesRenewRate:0},restaurantName:"",dishIncomeList:[],dishIncomeWithPLog:[],cashAmount:0,cardAmount:0,creditCardAmount:0,taxItem:{consumeTypeName:"",taxGroupTotal:0,taxRateGroupValue:0},paymentMethodList:[],umsatzHeaders:g(),discountHeaders:y(),stornHeaders:D(),showTotalPayMentSum:!0,flag:null}},computed:{realTimeIncomeList:function(){return this.indexData.realtimeIncomeAndInfo?this.indexData.realtimeIncomeAndInfo:void 0},taxInfos:function(){var t=this;if(this.indexData.realtimeIncomeAndInfo.taxInfos){var e=[];return this.indexData.realtimeIncomeAndInfo.taxInfos.forEach((function(a){t.taxItem=d.a.deepCopy(a),e.push(t.taxItem)})),e}},servantImgRoot:function(){return this.$store.getters.rootUrl+l["b"].servantRoot},dishImgRoot:function(){return this.$store.getters.rootUrl+l["b"].dishImageRoot},salesData:function(){var t,e=[],a=[],s=[],i=Object(o["a"])(this.indexData.sevenDaysFoodDrinkIncome);try{for(i.s();!(t=i.n()).done;){var n=t.value,r=n.find((function(t){return"foods"===t.name.toLowerCase()})),l=n.find((function(t){return"drinks"===t.name.toLowerCase()}));e.push(r.dateDisplay),a.push(r.income),s.push(l.income)}}catch(c){i.e(c)}finally{i.f()}return{labels:e.reverse(),series:[a.reverse(),s.reverse()]}},unpaidTable:function(){return this.indexData.realtimeIncomeAndInfo?this.indexData.realtimeIncomeAndInfo.unpaidTable:void 0},stornoList:function(){return this.indexData.realtimeIncomeAndInfo?this.indexData.realtimeIncomeAndInfo.storno:void 0},stornoAmount:function(){if(this.indexData.realtimeIncomeAndInfo.storno){var t=this.indexData.realtimeIncomeAndInfo.storno;return t.reduce((function(t,e){return t+parseFloat(e.price)}),0)}},thisMonthServantRank:function(){return this.indexData.thisMonthServantRank},todayInfo:function(){return this.indexData.todayInfo},tableUsageStatus:function(){return this.indexData.tableUsageStatus},tableRenew:function(){return this.indexData.thisMonthAverageTablesRenewRate},thisWeekMostPopularDishes:function(){return this.indexData.thisWeekMostPopularDishes},totalSales:function(){return this.sales.reduce((function(t,e){return t+e.salesInM}),0)}},created:function(){this.onceData(),this.reloadData()},methods:{checkStorno:function(){this.stornoDialog=!0},changeDateToDay:function(){this.dishIncomeList=this.indexData.thisDayIncomePieChart},changeDateToMonth:function(){this.dishIncomeList=this.indexData.thisMonthIncomePieChart},reprint:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.model.reprint(t);case 2:d.a.toast();case 3:case"end":return a.stop()}}),a)})))()},toZbon:function(){this.$router.push({path:"/Bills/zbonlist"})},toAllBills:function(){this.$router.push({path:"/Bills/history-bills"})},addDishes:function(){this.$router.push({path:"/dishes/dishes-manage"})},addCategories:function(){this.$router.push({path:"/dishes/labels-manage"})},dishStatistic:function(){this.$router.push({path:"/dishes/dish-statistics"})},dailyBill:function(){this.$router.push({path:"/Bills/today-bills"})},printTodayBills:function(){var t=[Object(v["a"])(0),Object(v["a"])(0)],e={timespan:t?t.join(" - "):""};m["a"].showConfirm("Bist du sicher?","Möchten Sie alle Datensätze drucken?",(function(){Object(r["I"])(e).then((function(){m["a"].toast("Erfolgreich drucken!")}))}))},onceData:function(){var t=this;Object(r["A"])().then((function(e){var a=[];a=e.content[0].name.split("<BR>"),t.restaurantName=a.join(" ")}))},calculateAmount:function(t){var e=this;this.cashAmount=0,this.cardAmount=0,this.creditCardAmount=0,t.forEach((function(t){null!==t.payLogs?t.payLogs.forEach((function(t){"2"===t.paymentMethodId&&(e.cardAmount+=parseFloat(t.amount)),"1"===t.paymentMethodId&&(e.cashAmount+=parseFloat(t.amount)),"3"===t.paymentMethodId&&(e.creditCardAmount+=parseFloat(t.amount))})):("3"===t.payMethod&&(e.creditCardAmount+=parseFloat(t.totalPrice)),"2"===t.payMethod&&(e.cardAmount+=parseFloat(t.totalPrice)),"1"===t.payMethod&&(e.cashAmount+=parseFloat(t.totalPrice)))}))},reloadData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(r["x"])().then((function(e){t.indexData=e,t.dishIncomeList=t.indexData.thisMonthIncomePieChart}));case 2:return a=[Object(v["a"])(0),Object(v["a"])(0)].join(" - "),e.next=5,Object(r["j"])(a).then((function(e){t.dishIncomeWithPLog=e.content,t.calculateAmount(t.dishIncomeWithPLog)}));case 5:case"end":return e.stop()}}),e)})))()},beforeDestroy:function(){clearTimeout(this.timer1),clearTimeout(this.timer2),this.timer1=null,this.timer2=null},complete:function(t){this.list[t]=!this.list[t]}}},w=C,k=(a("674b"),a("2877")),T=a("6544"),$=a.n(T),G=a("8212"),R=a("8336"),V=a("b0af"),j=a("99d9"),A=a("62ad"),L=a("a523"),S=a("8fea"),M=a("169a"),P=a("ce7e"),O=a("132d"),U=a("adda"),z=a("8860"),F=a("da13"),H=a("5d23"),N=a("34c3"),B=a("0fd9"),W=a("2fa4"),E=a("71a3"),Z=a("c671"),J=a("fe57"),Y=Object(k["a"])(w,s,i,!1,null,null,null);e["default"]=Y.exports;$()(Y,{VAvatar:G["a"],VBtn:R["a"],VCard:V["a"],VCardText:j["b"],VCardTitle:j["c"],VCol:A["a"],VContainer:L["a"],VDataTable:S["a"],VDialog:M["a"],VDivider:P["a"],VIcon:O["a"],VImg:U["a"],VList:z["a"],VListItem:F["a"],VListItemContent:H["b"],VListItemIcon:N["a"],VListItemTitle:H["d"],VRow:B["a"],VSpacer:W["a"],VTab:E["a"],VTabItem:Z["a"],VTabs:J["a"]})},"674b":function(t,e,a){"use strict";var s=a("855d"),i=a.n(s);i.a},"855d":function(t,e,a){},a523:function(t,e,a){"use strict";a("99af"),a("4de4"),a("b64b"),a("2ca0"),a("20f6"),a("4b85"),a("a15b"),a("498a");var s=a("2b0e");function i(t){return s["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var s=a.props,i=a.data,n=a.children;i.staticClass="".concat(t," ").concat(i.staticClass||"").trim();var o=i.attrs;if(o){i.attrs={};var r=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}));r.length&&(i.staticClass+=" ".concat(r.join(" ")))}return s.id&&(i.domProps=i.domProps||{},i.domProps.id=s.id),e(s.tag,i,n)}})}var n=a("d9f7");e["a"]=i("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,s=e.props,i=e.data,o=e.children,r=i.attrs;return r&&(i.attrs={},a=Object.keys(r).filter((function(t){if("slot"===t)return!1;var e=r[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}))),s.id&&(i.domProps=i.domProps||{},i.domProps.id=s.id),t(s.tag,Object(n["a"])(i,{staticClass:"container",class:Array({"container--fluid":s.fluid}).concat(a||[])}),o)}})},ccdd:function(t,e,a){"use strict";var s=a("5530"),i=a("641f"),n=a.n(i);e["a"]=Object(s["a"])({},n.a)},ff51:function(t,e,a){"use strict";a.d(e,"a",(function(){return s})),a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return n}));a("a15b");function s(t){var e=new Date,a=e.getTime(),s=864e5,i=a+t*s,n=new Date(i),o=n.getFullYear(),r=n.getMonth()+1,l=n.getDate();return[o,r,l].join("-")}function i(t){var e=new Date,a=e.getTime(),s=864e5,i=a+t*s,n=new Date(i),o=n.getFullYear()+"-",r=n.getMonth()+1,l=n.getDate(),c=n.getHours()<10?"0"+n.getHours():n.getHours(),d=n.getMinutes()<10?"0"+n.getMinutes():n.getMinutes(),u=n.getSeconds()<10?"0"+n.getSeconds():n.getSeconds();return o+r+"-"+l+" "+c+":"+d+":"+u}function n(t){var e=t;return e.maxDineTime&&(e.maxDineTime=e.maxDineTime/60),e.roundTime&&(e.roundTime=e.roundTime/60),e}}}]);
//# sourceMappingURL=chunk-da345cd0.625f532d.js.map