(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7aa1b3cc"],{ccdd:function(t,a,e){"use strict";var r=e("5530"),i=e("633c");a["a"]=Object(r["a"])({},i["b"])},ed15:function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",[e("v-card",{attrs:{color:"basil"}},[e("v-tabs",{attrs:{"background-color":"transparent",color:"basil",grow:""}},[t._l(t.tabs,(function(a,r){return e("v-tab",{key:r},[t._v(" "+t._s(a)+" ")])})),e("v-tab-item",[e("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-vuetify",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[e("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("销量实时统计"))+" ")])]},proxy:!0}])},[e("v-divider",{staticClass:"mt-3"}),e("v-data-table",{attrs:{headers:t.headers,items:t.resData,"group-by":"timeDuration","items-per-page":100,"group-desc":""},scopedSlots:t._u([{key:"group.header",fn:function(a){return[e("td",{attrs:{colspan:"100%"}},[e("div",[t._v(" "+t._s(t.$t("time"))+" :"+t._s(a.group)+" "+t._s(t.$t("hour")))])])]}},{key:"footer",fn:function(){return[e("v-toolbar",{attrs:{color:"white",flat:""}},[e("v-spacer"),e("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:t.print}},[t._v(" "+t._s(t.$t("打印"))+" ")])],1)]},proxy:!0}])})],1)],1),e("v-tab-item",[e("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-vuetify",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[e("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("配料实时统计"))+" ")])]},proxy:!0}])},[e("v-divider",{staticClass:"mt-3"}),e("v-data-table",{attrs:{headers:t.attrHeaders,items:t.resAttrData,"group-by":"timeDuration","items-per-page":100,"group-desc":""},scopedSlots:t._u([{key:"group.header",fn:function(a){return[e("td",{attrs:{colspan:"100%"}},[e("div",[t._v(" "+t._s(t.$t("time"))+" :"+t._s(a.group)+" "+t._s(t.$t("hour")))])])]}},{key:"footer",fn:function(){return[e("v-toolbar",{attrs:{color:"white",flat:""}},[e("v-spacer"),e("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:t.printAttribute}},[t._v(" "+t._s(t.$t("打印"))+" ")])],1)]},proxy:!0}])})],1)],1)],2)],1)],1)},i=[],n=(e("4de4"),e("0a61")),o=e("ccdd"),s={data:function(){return{dauer:"",tabs:[this.$i18n.t("销量实时统计"),this.$i18n.t("配料实时统计")],headers:[{text:this.$i18n.t("name"),align:"start",value:"name",groupable:!1},{text:this.$i18n.t("count"),value:"count",align:"center",groupable:!1},{text:this.$i18n.t("sumPrice"),value:"sumPrice",align:"center",groupable:!1},{text:this.$i18n.t("timeDuration"),value:"timeDuration",align:"center"}],resData:[],attrHeaders:[{text:this.$i18n.t("name"),align:"start",value:"aName",groupable:!1},{text:this.$i18n.t("price"),value:"singlePriceMod",align:"center",groupable:!1},{text:this.$i18n.t("count"),value:"totalCount",align:"center",groupable:!1},{text:this.$i18n.t("sumPrice"),value:"totalPriceMod",align:"center",groupable:!1},{text:this.$i18n.t("timeDuration"),value:"timeDuration",align:"center"}],resAttrData:[]}},mounted:function(){this.reloadData()},methods:{reloadData:function(){var t=this;Object(n["o"])().then((function(a){t.resData=a.everyDurationDishesIncome.filter((function(t){return t.count>0})),t.resAttrData=a.attributeIncomeByDuration}))},print:function(){o["a"].showConfirm("Bist du sicher?","Möchten Sie Umsatz Bon drucken?",(function(){Object(n["e"])().then((function(){o["a"].toast("Erfolgreich drucken!")}))}))},printAttribute:function(){o["a"].showConfirm("Bist du sicher?","Möchten Sie Umsatz Bon drucken?",(function(){Object(n["d"])().then((function(){o["a"].toast("Erfolgreich drucken!")}))}))}}},c=s,u=e("2877"),l=e("6544"),d=e.n(l),p=e("8336"),f=e("b0af"),b=e("a523"),v=e("8fea"),h=e("ce7e"),m=e("2fa4"),g=e("71a3"),_=e("c671"),y=e("fe57"),$=e("71d9"),k=Object(u["a"])(c,r,i,!1,null,null,null);a["default"]=k.exports;d()(k,{VBtn:p["a"],VCard:f["a"],VContainer:b["a"],VDataTable:v["a"],VDivider:h["a"],VSpacer:m["a"],VTab:g["a"],VTabItem:_["a"],VTabs:y["a"],VToolbar:$["a"]})}}]);
//# sourceMappingURL=chunk-7aa1b3cc.0d4545fd.js.map