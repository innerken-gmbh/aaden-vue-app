(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01e3acfe"],{a523:function(t,a,e){"use strict";e("99af"),e("4de4"),e("b64b"),e("2ca0"),e("20f6"),e("4b85"),e("a15b"),e("498a");var i=e("2b0e");function n(t){return i["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(a,e){var i=e.props,n=e.data,s=e.children;n.staticClass="".concat(t," ").concat(n.staticClass||"").trim();var o=n.attrs;if(o){n.attrs={};var r=Object.keys(o).filter((function(t){if("slot"===t)return!1;var a=o[t];return t.startsWith("data-")?(n.attrs[t]=a,!1):a||"string"===typeof a}));r.length&&(n.staticClass+=" ".concat(r.join(" ")))}return i.id&&(n.domProps=n.domProps||{},n.domProps.id=i.id),a(i.tag,n,s)}})}var s=e("d9f7");a["a"]=n("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,a){var e,i=a.props,n=a.data,o=a.children,r=n.attrs;return r&&(n.attrs={},e=Object.keys(r).filter((function(t){if("slot"===t)return!1;var a=r[t];return t.startsWith("data-")?(n.attrs[t]=a,!1):a||"string"===typeof a}))),i.id&&(n.domProps=n.domProps||{},n.domProps.id=i.id),t(i.tag,Object(s["a"])(n,{staticClass:"container",class:Array({"container--fluid":i.fluid}).concat(e||[])}),o)}})},fb0a:function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{fluid:""}},[e("v-row",[e("v-col",{attrs:{cols:"12",md:"8"}},[e("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-vuetify",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[e("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("服务员营业额"))+" ")])]},proxy:!0}])},[e("v-divider",{staticClass:"mt-3"}),e("v-data-table",{attrs:{"fixed-header":!0,headers:t.staffHeaders,items:t.staffArr,"items-per-page":10,loading:t.loading,search:t.search,"multi-sort":""},on:{"update:search":function(a){t.search=a}},scopedSlots:t._u([{key:"item.paymentStatus",fn:function(t){var a=t.item;return[e("v-checkbox",{attrs:{readonly:!0,"input-value":"1"===a.paymentStatus}})]}}])})],1),e("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-calendar-account",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[e("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("订单统计"))+" ")])]},proxy:!0}])},[e("v-text-field",{staticClass:"ml-auto",staticStyle:{"max-width":"250px"},attrs:{"append-icon":"mdi-magnify","hide-details":"",label:t.$t("Search"),"single-line":""},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}}),e("v-divider",{staticClass:"mt-3"}),e("v-data-table",{attrs:{"fixed-header":!0,headers:t.headers,items:t.desserts,"items-per-page":10,loading:t.loading,search:t.search,"multi-sort":""},on:{"update:search":function(a){t.search=a}},scopedSlots:t._u([{key:"item.paymentStatus",fn:function(t){var a=t.item;return[e("v-checkbox",{attrs:{readonly:!0,"input-value":"1"===a.paymentStatus,disabled:""}})]}},{key:"item.action",fn:function(a){var i=a.item;return[e("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(a){return t.goNext(i)}}},[t._v(" mdi-arrow-right ")])]}},{key:"no-data",fn:function(){return[e("v-btn",{attrs:{color:"primary"},on:{click:t.loadDetail}},[t._v(" Reset ")])]},proxy:!0}])})],1)],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-card",{staticClass:"mx-auto",attrs:{"max-width":"600"}},[e("v-toolbar",{attrs:{color:"light-blue",dark:""}},[e("v-toolbar-title",[t._v(t._s(t.$t("日结单")))]),e("v-spacer")],1),e("v-list",{attrs:{"two-line":"",subheader:""}},t._l(t.infoList,(function(a){return e("v-list-item",{key:a.title},[e("v-list-item-avatar",[e("v-icon",{domProps:{textContent:t._s(a.icon)}})],1),e("v-list-item-content",[e("v-list-item-title",{staticClass:"d-flex justify-space-between font-weight-black text-h4",domProps:{textContent:t._s(a.title)}})],1),e("v-list-item-action",[e("v-list-item-action-text",{staticClass:"text-h3",domProps:{textContent:t._s(a.action)}})],1)],1)})),1)],1)],1)],1)],1)},n=[],s=e("0a61"),o={data:function(){return{loading:!0,infoList:[],BillData:{},headers:[{text:"Id",align:"start",sortable:!1,value:"orderId"},{text:this.$i18n.t("servantName"),value:"servantName"},{text:this.$i18n.t("time"),value:"eatTime"},{text:this.$i18n.t("price"),value:"totalPrice"},{text:this.$i18n.t("paymentStatus"),value:"paymentStatus"},{text:this.$i18n.t("action"),value:"action",sortable:!1}],search:"",desserts:[],staffHeaders:[{text:this.$i18n.t("servantName"),value:"name"},{text:this.$i18n.t("income"),value:"income"},{text:this.$i18n.t("billCount"),value:"billCount"}],staffArr:[]}},created:function(){this.loadDetail()},methods:{loadDetail:function(){var t=this;Object(s["D"])().then((function(a){t.BillData=a,t.infoList=[],t.infoList.push({title:t.$i18n.t("今日营业总额"),action:t.BillData.totalIncome+"€",icon:"mdi-bulletin-board"}),t.infoList.push({title:t.$i18n.t("总单数"),action:t.BillData.totalCount,icon:"mdi-poll"}),t.infoList.push({title:t.$i18n.t("酒水营业额"),action:t.BillData.drinkInfo+"€",icon:"mdi-coffee"}),t.infoList.push({title:t.$i18n.t("食品营业额"),action:t.BillData.foodInfo+"€",icon:"mdi-noodles"}),t.BillData.takeawayAmount&&t.infoList.push({title:t.$i18n.t("外卖总销售额"),action:t.BillData.takeawayAmount+"€",icon:"mdi-tractor"}),t.desserts=t.BillData.todayBill,t.staffArr=t.BillData.servantRank,t.loading=!1}))},goNext:function(t){this.$router.push({name:"Seite mit den Rechnungsdetails",params:{id:t.orderId}})}}},r=o,l=e("2877"),c=e("6544"),d=e.n(c),u=e("8336"),f=e("b0af"),m=e("ac7c"),p=e("62ad"),v=e("a523"),h=e("8fea"),b=e("ce7e"),x=e("132d"),y=e("8860"),g=e("da13"),C=e("1800"),k=e("5d23"),V=e("8270"),$=e("0fd9"),w=e("2fa4"),S=e("8654"),_=e("71d9"),D=e("2a7f"),L=Object(l["a"])(r,i,n,!1,null,null,null);a["default"]=L.exports;d()(L,{VBtn:u["a"],VCard:f["a"],VCheckbox:m["a"],VCol:p["a"],VContainer:v["a"],VDataTable:h["a"],VDivider:b["a"],VIcon:x["a"],VList:y["a"],VListItem:g["a"],VListItemAction:C["a"],VListItemActionText:k["a"],VListItemAvatar:V["a"],VListItemContent:k["b"],VListItemTitle:k["d"],VRow:$["a"],VSpacer:w["a"],VTextField:S["a"],VToolbar:_["a"],VToolbarTitle:D["b"]})}}]);
//# sourceMappingURL=chunk-01e3acfe.9003abde.js.map