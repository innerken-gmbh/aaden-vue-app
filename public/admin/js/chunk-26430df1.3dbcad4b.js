(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-26430df1"],{4497:function(t,e,n){"use strict";n("4de4"),n("d81d"),n("96cf");var r=n("1da1"),a=n("633c"),i=n("6306"),o=n("9225"),s={list:[{id:1,name:o["a"].t("Others")},{id:2,name:o["a"].t("RechnungBon")},{id:3,name:o["a"].t("Zbon")},{id:4,name:o["a"].t("KitchenBon")}],getList:function(){return this.list}},p={list:[{id:0,name:o["a"].t("打印失败")},{id:1,name:o["a"].t("打印成功")},{id:2,name:o["a"].t("验证错误")},{id:3,name:o["a"].t("单子格式不合规范")},{id:4,name:o["a"].t("正在打印")},{id:5,name:o["a"].t("网络错误")}],getList:function(){return this.list}},u={id:{type:a["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},printStatus:{displayName:"printStatus",type:a["a"].Types.Option,formConfig:{type:{selectItems:p.getList(),itemText:"name"}}},addTimeStamp:{displayName:"addTimeStamp"},printBonClass:{type:a["a"].Types.Option,formConfig:{type:{selectItems:s.getList()}}},printerGroupId:{type:a["a"].Types.Option,formConfig:{type:{selectItems:i["a"].getList}}},retryCount:{},printerMsg:{displayName:"printerMsg"},content:{displayName:"checkContent",header:!1}},c={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e,"filter"),t.next=3,a["e"].get("PrintRecord.php",{op:"getAllRecords"});case 3:if(n=t.sent.content.map((function(t){return a["a"].parseDataForEntity(t,u)})),e=e[0],!e){t.next=8;break}return console.log(e,"filter"),t.abrupt("return",n.filter((function(t){return console.log(t.printStatus,"filter.."),console.log(e.printStatus,"filter......"),t.printStatus!==e.printStatus})));case 8:return t.abrupt("return",n);case 9:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),reprint:function(t){return a["e"].get("Printer.php?op=reprintWithDefault",{id:t.id})}};e["a"]=a["a"].ModelFactory(u,c)},6306:function(t,e,n){"use strict";n("d81d");var r=n("5530"),a=(n("96cf"),n("1da1")),i=n("633c"),o={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:i["a"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:i["a"].Types.Boolean,displayName:"isSingleOrderPrint"},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}}},s={load:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i["e"].get("Printer.php",Object(r["a"])({op:"showPrinterGroups"},e));case 2:return t.abrupt("return",t.sent.content.map((function(t){return i["a"].parseDataForEntity(t,o)})));case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return i["e"].postWithUploadFile("Printer.php?op=addPrinterGroups",t,{showLoading:!0})},edit:function(t){return i["e"].postWithUploadFile("Printer.php?op=updatePrinterGroups",t,{showLoading:!0})},remove:function(t){return i["e"].post("Printer.php?op=deletePrinterGroup",{id:t})}};e["a"]=i["a"].ModelFactory(o,s)},"713a4":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("v-container",{attrs:{fluid:""}},[n("ik-data-table",{attrs:{model:t.model,"use-default-action":!1,"use-select":!1,"show-expand":!0,"single-expand":!0,icon:"mdi-clipboard-list","entity-name":t.$t("打印单列表")},scopedSlots:t._u([{key:"expanded-item",fn:function(e){var r=e.item;return[n("div",{staticClass:"text-center",domProps:{innerHTML:t._s(r.content)}})]}},{key:"footer",fn:function(){return[n("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0},{key:"item.action",fn:function(e){var r=e.item;return[n("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.reprint(r)}}},[t._v(" mdi-printer ")])]}}])})],1)],1)},a=[],i=(n("96cf"),n("1da1")),o=n("4497"),s=n("633c"),p={components:{IkDataTable:s["c"]},data:function(){return{model:o["a"]}},methods:{reprint:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.model.reprint(t);case 2:s["b"].toast();case 3:case"end":return n.stop()}}),n)})))()}}},u=p,c=n("2877"),l=n("6544"),d=n.n(l),m=n("a523"),f=n("132d"),g=n("71d9"),y=Object(c["a"])(u,r,a,!1,null,null,null);e["default"]=y.exports;d()(y,{VContainer:m["a"],VIcon:f["a"],VToolbar:g["a"]})}}]);
//# sourceMappingURL=chunk-26430df1.3dbcad4b.js.map