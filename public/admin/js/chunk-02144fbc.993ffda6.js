(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02144fbc"],{"22d2":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{fluid:""}},[e("v-row",[e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-card",{staticClass:"mx-auto",attrs:{loading:t.loading,align:"center"}},[e("v-img",{attrs:{width:"250",height:"250",src:t.src},scopedSlots:t._u([{key:"placeholder",fn:function(){return[e("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[e("v-progress-circular",{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])}),e("v-card-title",{staticClass:"d-flex justify-space-between"},[e("div",{staticClass:"font-weight-bold"},[t._v(" "+t._s(t.$t("tableName"))+"："+t._s(t.servantData.tableInfo.tableName)+" ")]),e("div",[t._v(t._s(t.servantData.tableInfo.sectionName))])]),e("v-divider",{staticClass:"mx-2"}),e("v-card-title",{staticClass:"subtitle-2"},[t._v(" "+t._s(t.$t("本日总结"))+" ")]),e("v-card-text",[e("v-list",{attrs:{shaped:"",dense:"",align:"left"}},[e("v-list-item-group",{attrs:{color:"primary"},model:{value:t.currentIndex,callback:function(a){t.currentIndex=a},expression:"currentIndex"}},t._l(t.infoList,(function(a,s){return e("v-list-item",{key:s},[e("v-list-item-content",[e("v-list-item-title",{domProps:{textContent:t._s(a.text)}})],1)],1)})),1)],1)],1)],1)],1),e("v-col",{attrs:{cols:"12",md:"8"}},[e("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[e("v-container",{attrs:{fluid:""}},[e("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-vuetify",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[e("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("本日账单"))+" ")])]},proxy:!0}])},[e("v-text-field",{staticClass:"ml-auto",staticStyle:{"max-width":"250px"},attrs:{"append-icon":"mdi-magnify","hide-details":"",label:t.$t("Search"),"single-line":""},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}}),e("v-divider",{staticClass:"mt-3"}),e("v-data-table",{attrs:{"fixed-header":!0,headers:t.headers,items:t.desserts,"items-per-page":10,loading:t.loading,search:t.search,"multi-sort":""},on:{"update:search":function(a){t.search=a}},scopedSlots:t._u([{key:"item.paymentStatus",fn:function(t){var a=t.item;return[e("v-checkbox",{attrs:{readonly:!0,"input-value":"1"===a.paymentStatus,disabled:""}})]}}])}),e("v-row",[e("v-spacer"),e("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:function(a){return t.goback()}}},[t._v(" "+t._s(t.$t("返回"))+" ")])],1)],1)],1)],1)],1)],1)],1)},i=[],r=(e("a9e3"),e("0a61")),n=e("5089"),o={props:{id:{default:-1,type:Number}},data:function(){return{loading:!1,currentIndex:0,tableId:this.id,servantData:{tableInfo:{tableName:""}},infoList:[],search:"",headers:[{text:"OrderID",align:"start",sortable:!1,value:"orderId"},{text:this.$i18n.t("servantName"),value:"servantName"},{text:this.$i18n.t("time"),value:"eatTime"},{text:this.$i18n.t("price"),value:"totalPrice"},{text:this.$i18n.t("paymentStatus"),value:"paymentStatus"}],desserts:[],dates:[]}},computed:{src:function(){return!!this.servantData.tableInfo&&n["b"].SQR+this.$store.getters.rootUrl+n["b"].genSQUrl+"TableName="+this.servantData.tableInfo.tableName}},created:function(){this.loadDetail(this.tableId)},mounted:function(){},methods:{loadDetail:function(t){var a=this;Object(r["v"])(t).then((function(t){a.servantData=t;var e=a.servantData.tableInfo.usageStatus;e=0===e?a.$i18n.t("可使用"):a.$i18n.t("已使用"),a.infoList.push({text:a.$i18n.t("seatCount")+":"+a.servantData.tableInfo.seatCount}),a.infoList.push({text:a.$i18n.t("usageStatus")+":"+e}),a.infoList.push({text:a.$i18n.t("usageCount")+":"+a.servantData.tableInfo.todayUsageCount}),a.desserts=a.servantData.todayBill}))},goback:function(){this.$router.history.go(-1)}}},l=o,c=e("2877"),d=e("6544"),u=e.n(d),f=e("8336"),v=e("b0af"),p=e("99d9"),m=e("ac7c"),h=e("62ad"),b=e("a523"),g=e("8fea"),x=e("ce7e"),y=e("adda"),C=e("8860"),I=e("da13"),V=e("5d23"),S=e("1baa"),_=e("490a"),k=e("0fd9"),$=e("2fa4"),w=e("8654"),D=Object(c["a"])(l,s,i,!1,null,"4c211324",null);a["default"]=D.exports;u()(D,{VBtn:f["a"],VCard:v["a"],VCardText:p["b"],VCardTitle:p["c"],VCheckbox:m["a"],VCol:h["a"],VContainer:b["a"],VDataTable:g["a"],VDivider:x["a"],VImg:y["a"],VList:C["a"],VListItem:I["a"],VListItemContent:V["b"],VListItemGroup:S["a"],VListItemTitle:V["d"],VProgressCircular:_["a"],VRow:k["a"],VSpacer:$["a"],VTextField:w["a"]})},a523:function(t,a,e){"use strict";e("99af"),e("4de4"),e("b64b"),e("2ca0"),e("20f6"),e("4b85"),e("a15b"),e("498a");var s=e("2b0e");function i(t){return s["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(a,e){var s=e.props,i=e.data,r=e.children;i.staticClass="".concat(t," ").concat(i.staticClass||"").trim();var n=i.attrs;if(n){i.attrs={};var o=Object.keys(n).filter((function(t){if("slot"===t)return!1;var a=n[t];return t.startsWith("data-")?(i.attrs[t]=a,!1):a||"string"===typeof a}));o.length&&(i.staticClass+=" ".concat(o.join(" ")))}return s.id&&(i.domProps=i.domProps||{},i.domProps.id=s.id),a(s.tag,i,r)}})}var r=e("d9f7");a["a"]=i("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,a){var e,s=a.props,i=a.data,n=a.children,o=i.attrs;return o&&(i.attrs={},e=Object.keys(o).filter((function(t){if("slot"===t)return!1;var a=o[t];return t.startsWith("data-")?(i.attrs[t]=a,!1):a||"string"===typeof a}))),s.id&&(i.domProps=i.domProps||{},i.domProps.id=s.id),t(s.tag,Object(r["a"])(i,{staticClass:"container",class:Array({"container--fluid":s.fluid}).concat(e||[])}),n)}})}}]);
//# sourceMappingURL=chunk-02144fbc.993ffda6.js.map