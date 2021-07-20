(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d2374e3"],{fb0a:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{fluid:""}},[e("v-row",[e("v-col",{attrs:{cols:"12",md:"8"}},[e("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-vuetify",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[e("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("服务员营业额"))+" ")])]},proxy:!0}])},[e("v-divider",{staticClass:"mt-3"}),e("v-data-table",{attrs:{"fixed-header":!0,headers:t.staffHeaders,items:t.staffArr,"items-per-page":10,loading:t.loading,search:t.search,"multi-sort":""},on:{"update:search":function(a){t.search=a}},scopedSlots:t._u([{key:"item.paymentStatus",fn:function(t){var a=t.item;return[e("v-checkbox",{attrs:{readonly:!0,"input-value":"1"===a.paymentStatus}})]}}])})],1),e("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-calendar-account",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[e("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("订单统计"))+" ")])]},proxy:!0}])},[e("v-text-field",{staticClass:"ml-auto",staticStyle:{"max-width":"250px"},attrs:{"append-icon":"mdi-magnify","hide-details":"",label:t.$t("Search"),"single-line":""},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}}),e("v-divider",{staticClass:"mt-3"}),e("v-data-table",{attrs:{"fixed-header":!0,headers:t.headers,items:t.desserts,"items-per-page":10,loading:t.loading,search:t.search,"multi-sort":""},on:{"update:search":function(a){t.search=a}},scopedSlots:t._u([{key:"item.paymentStatus",fn:function(t){var a=t.item;return[e("v-checkbox",{attrs:{readonly:!0,"input-value":"1"===a.paymentStatus,disabled:""}})]}},{key:"item.action",fn:function(a){var i=a.item;return[e("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(a){return t.goNext(i)}}},[t._v(" mdi-arrow-right ")])]}},{key:"no-data",fn:function(){return[e("v-btn",{attrs:{color:"primary"},on:{click:t.loadDetail}},[t._v(" Reset ")])]},proxy:!0}])})],1)],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-card",{staticClass:"mx-auto",attrs:{"max-width":"600"}},[e("v-toolbar",{attrs:{color:"light-blue",dark:""}},[e("v-toolbar-title",[t._v(t._s(t.$t("日结单")))]),e("v-spacer")],1),e("v-list",{attrs:{"two-line":"",subheader:""}},t._l(t.infoList,(function(a){return e("v-list-item",{key:a.title},[e("v-list-item-avatar",[e("v-icon",{domProps:{textContent:t._s(a.icon)}})],1),e("v-list-item-content",[e("v-list-item-title",{staticClass:"d-flex justify-space-between font-weight-black text-h4",domProps:{textContent:t._s(a.title)}})],1),e("v-list-item-action",[e("v-list-item-action-text",{staticClass:"text-h3",domProps:{textContent:t._s(a.action)}})],1)],1)})),1)],1)],1)],1)],1)},n=[],s=e("0a61"),o={data:function(){return{loading:!0,infoList:[],BillData:{},headers:[{text:"Id",align:"start",sortable:!1,value:"orderId"},{text:this.$i18n.t("servantName"),value:"servantName"},{text:this.$i18n.t("time"),value:"eatTime"},{text:this.$i18n.t("price"),value:"totalPrice"},{text:this.$i18n.t("paymentStatus"),value:"paymentStatus"},{text:this.$i18n.t("action"),value:"action",sortable:!1}],search:"",desserts:[],staffHeaders:[{text:this.$i18n.t("servantName"),value:"name"},{text:this.$i18n.t("income"),value:"income"},{text:this.$i18n.t("billCount"),value:"billCount"}],staffArr:[]}},created:function(){this.loadDetail()},methods:{loadDetail:function(){var t=this;Object(s["A"])().then((function(a){t.BillData=a,t.infoList=[],t.infoList.push({title:t.$i18n.t("今日营业总额"),action:t.BillData.totalIncome+"€",icon:"mdi-bulletin-board"}),t.infoList.push({title:t.$i18n.t("总单数"),action:t.BillData.totalCount,icon:"mdi-poll"}),t.infoList.push({title:t.$i18n.t("酒水营业额"),action:t.BillData.drinkInfo+"€",icon:"mdi-coffee"}),t.infoList.push({title:t.$i18n.t("食品营业额"),action:t.BillData.foodInfo+"€",icon:"mdi-noodles"}),t.BillData.takeawayAmount&&t.infoList.push({title:t.$i18n.t("外卖营业额"),action:t.BillData.takeawayAmount+"€",icon:"mdi-tractor"}),t.desserts=t.BillData.todayBill,t.staffArr=t.BillData.servantRank,t.loading=!1}))},goNext:function(t){this.$router.push({name:"Seite mit den Rechnungsdetails",params:{id:t.orderId}})}}},l=o,r=e("2877"),c=e("6544"),d=e.n(c),u=e("8336"),m=e("b0af"),f=e("ac7c"),h=e("62ad"),v=e("a523"),p=e("8fea"),x=e("ce7e"),b=e("132d"),y=e("8860"),g=e("da13"),k=e("1800"),C=e("5d23"),V=e("8270"),$=e("0fd9"),w=e("2fa4"),_=e("8654"),D=e("71d9"),L=e("2a7f"),S=Object(r["a"])(l,i,n,!1,null,null,null);a["default"]=S.exports;d()(S,{VBtn:u["a"],VCard:m["a"],VCheckbox:f["a"],VCol:h["a"],VContainer:v["a"],VDataTable:p["a"],VDivider:x["a"],VIcon:b["a"],VList:y["a"],VListItem:g["a"],VListItemAction:k["a"],VListItemActionText:C["a"],VListItemAvatar:V["a"],VListItemContent:C["b"],VListItemTitle:C["d"],VRow:$["a"],VSpacer:w["a"],VTextField:_["a"],VToolbar:D["a"],VToolbarTitle:L["b"]})}}]);
//# sourceMappingURL=chunk-2d2374e3.957a029b.js.map