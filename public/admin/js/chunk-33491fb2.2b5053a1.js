(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-33491fb2"],{"4aad":function(t,e,n){"use strict";e["a"]={list:[{id:1,name:"Others"},{id:2,name:"RechnungBon"},{id:3,name:"Zbon"},{id:4,name:"KitchenBon"}],getList:function(){return this.list}}},6306:function(t,e,n){"use strict";var r=n("5530"),i=(n("96cf"),n("1da1")),a=n("633c"),o={id:{type:a["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:a["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:a["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},s={load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,a["hillo"].get("Printer.php",Object(r["a"])({op:"showPrinterGroups"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return a["hillo"].postWithUploadFile("Printer.php?op=addPrinterGroups",t,{showLoading:!0})},edit:function(t){return a["hillo"].postWithUploadFile("Printer.php?op=updatePrinterGroups",t,{showLoading:!0})},remove:function(t){return a["hillo"].post("Printer.php?op=deletePrinterGroup",{id:t})}};e["a"]=a["IKDataEntity"].ModelFactory(o,s)},"713a4":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("v-container",{attrs:{fluid:""}},[n("ik-data-table",{attrs:{model:t.model,"use-default-action":!1,"use-select":!1,"show-expand":!0,"single-expand":!0,icon:"mdi-clipboard-list","entity-name":t.$t("打印单列表")},scopedSlots:t._u([{key:"expanded-item",fn:function(e){var r=e.item;return[n("div",{staticClass:"text-center",domProps:{innerHTML:t._s(r.content)}})]}},{key:"footer",fn:function(){return[n("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0},{key:"item.action",fn:function(e){var r=e.item;return[n("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.reprint(r)}}},[t._v(" mdi-printer ")])]}}])})],1)],1)},i=[],a=(n("96cf"),n("1da1")),o=(n("4de4"),n("633c")),s=n("6306"),p=n("4aad"),u=n("eff4"),l={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},printStatus:{displayName:"printStatus",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList(),itemText:"name"}}},addTimeStamp:{displayName:"addTimeStamp"},printBonClass:{type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList()}}},printerGroupId:{type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:s["a"].getList}}},retryCount:{},printerMsg:{displayName:"printerMsg"},content:{displayName:"checkContent",header:!1}},c={load:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o["hillo"].get("PrintRecord.php",{op:"getAllRecords"});case 2:if(n=t.sent.content,e=e[0],!e){t.next=6;break}return t.abrupt("return",n.filter((function(t){return t.printStatus!==e.printStatus})));case 6:return t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),reprint:function(t){return o["hillo"].get("Printer.php?op=reprintWithDefault",{id:t.id})}},d=o["IKDataEntity"].ModelFactory(l,c),f={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:d}},methods:{reprint:function(t){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.model.reprint(t);case 2:o["IKUtils"].toast();case 3:case"end":return n.stop()}}),n)})))()}}},m=f,y=n("2877"),h=n("6544"),g=n.n(h),b=n("a523"),w=n("132d"),v=n("71d9"),C=Object(y["a"])(m,r,i,!1,null,null,null);e["default"]=C.exports;g()(C,{VContainer:b["a"],VIcon:w["a"],VToolbar:v["a"]})},eff4:function(t,e,n){"use strict";var r=n("9225");e["a"]={list:[{id:0,name:r["a"].t("打印失败")},{id:1,name:r["a"].t("打印成功")},{id:2,name:r["a"].t("验证错误")},{id:3,name:r["a"].t("单子格式不合规范")},{id:4,name:r["a"].t("正在打印")},{id:5,name:r["a"].t("网络错误")},{id:6,name:r["a"].t("等待商米打印机打印")}],getList:function(){return this.list}}}}]);
//# sourceMappingURL=chunk-33491fb2.2b5053a1.js.map