(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b2384"],{"22d2":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{fluid:""}},[e("v-row",[e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-card",{staticClass:"mx-auto",attrs:{loading:t.loading,align:"center"}},[e("v-img",{attrs:{width:"250",height:"250",src:t.src},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[e("v-progress-circular",{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])}),e("v-card-title",{staticClass:"d-flex justify-space-between"},[e("div",{staticClass:"font-weight-bold"},[t._v(" "+t._s(t.$t("tableName"))+"："+t._s(t.servantData.tableInfo.tableName)+" ")]),e("div",[t._v(t._s(t.servantData.tableInfo.sectionName))])]),e("v-divider",{staticClass:"mx-2"}),e("v-card-title",{staticClass:"subtitle-2"},[t._v(" "+t._s(t.$t("本日总结"))+" ")]),e("v-card-text",[e("v-list",{attrs:{shaped:"",dense:"",align:"left"}},[e("v-list-item-group",{attrs:{color:"primary"},model:{value:t.currentIndex,callback:function(a){t.currentIndex=a},expression:"currentIndex"}},t._l(t.infoList,(function(a,s){return e("v-list-item",{key:s},[e("v-list-item-content",[e("v-list-item-title",{domProps:{textContent:t._s(a.text)}})],1)],1)})),1)],1)],1)],1)],1),e("v-col",{attrs:{cols:"12",md:"8"}},[e("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[e("v-container",{attrs:{fluid:""}},[e("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-vuetify",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[e("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("本日账单"))+" ")])]},proxy:!0}])},[e("v-text-field",{staticClass:"ml-auto",staticStyle:{"max-width":"250px"},attrs:{"append-icon":"mdi-magnify","hide-details":"",label:t.$t("Search"),"single-line":""},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}}),e("v-divider",{staticClass:"mt-3"}),e("v-data-table",{attrs:{"fixed-header":!0,headers:t.headers,items:t.desserts,"items-per-page":10,loading:t.loading,search:t.search,"multi-sort":""},on:{"update:search":function(a){t.search=a}},scopedSlots:t._u([{key:"item.paymentStatus",fn:function(t){var a=t.item;return[e("v-checkbox",{attrs:{readonly:!0,"input-value":"1"===a.paymentStatus,disabled:""}})]}}])}),e("v-row",[e("v-spacer"),e("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:function(a){return t.goback()}}},[t._v(" "+t._s(t.$t("返回"))+" ")])],1)],1)],1)],1)],1)],1)],1)},i=[],n=(e("a9e3"),e("0a61")),r=e("3405"),l={props:{id:{default:-1,type:Number}},data:function(){return{loading:!1,currentIndex:0,tableId:this.id,servantData:{tableInfo:{tableName:""}},infoList:[],search:"",headers:[{text:"OrderID",align:"start",sortable:!1,value:"orderId"},{text:this.$i18n.t("servantName"),value:"servantName"},{text:this.$i18n.t("time"),value:"eatTime"},{text:this.$i18n.t("price"),value:"totalPrice"},{text:this.$i18n.t("paymentStatus"),value:"paymentStatus"}],desserts:[],dates:[]}},computed:{src:function(){return!!this.servantData.tableInfo&&r["a"].SQR+this.$store.getters.rootUrl+r["a"].genSQUrl+"TableName="+this.servantData.tableInfo.tableName}},created:function(){this.loadDetail(this.tableId)},mounted:function(){},methods:{loadDetail:function(t){var a=this;Object(n["s"])(t).then((function(t){a.servantData=t;var e=a.servantData.tableInfo.usageStatus;e=0===e?a.$i18n.t("可使用"):a.$i18n.t("已使用"),a.infoList.push({text:a.$i18n.t("seatCount")+":"+a.servantData.tableInfo.seatCount}),a.infoList.push({text:a.$i18n.t("usageStatus")+":"+e}),a.infoList.push({text:a.$i18n.t("usageCount")+":"+a.servantData.tableInfo.todayUsageCount}),a.desserts=a.servantData.todayBill}))},goback:function(){this.$router.history.go(-1)}}},o=l,c=e("2877"),d=e("6544"),u=e.n(d),v=e("8336"),f=e("b0af"),m=e("99d9"),h=e("ac7c"),p=e("62ad"),b=e("a523"),g=e("8fea"),x=e("ce7e"),y=e("adda"),C=e("8860"),I=e("da13"),V=e("5d23"),_=e("1baa"),$=e("490a"),k=e("0fd9"),w=e("2fa4"),D=e("8654"),S=Object(c["a"])(o,s,i,!1,null,"e2b1118c",null);a["default"]=S.exports;u()(S,{VBtn:v["a"],VCard:f["a"],VCardText:m["c"],VCardTitle:m["d"],VCheckbox:h["a"],VCol:p["a"],VContainer:b["a"],VDataTable:g["a"],VDivider:x["a"],VImg:y["a"],VList:C["a"],VListItem:I["a"],VListItemContent:V["b"],VListItemGroup:_["a"],VListItemTitle:V["d"],VProgressCircular:$["a"],VRow:k["a"],VSpacer:w["a"],VTextField:D["a"]})}}]);
//# sourceMappingURL=chunk-2d0b2384.7a4d4d24.js.map