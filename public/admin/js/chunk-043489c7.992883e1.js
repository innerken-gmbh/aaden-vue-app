(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-043489c7","chunk-2d20862b"],{"4aad":function(t,e,n){"use strict";e["a"]={list:[{id:1,name:"Others"},{id:2,name:"RechnungBon"},{id:3,name:"Zbon"},{id:4,name:"KitchenBon"}],getList:function(){return this.list}}},6306:function(t,e,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("f4d6"),o=n("9d8f"),s=n.n(o),d={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},upsideDown:{type:i["IKDataEntity"].Types.Boolean},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},c={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Printer.php",Object(a["a"])({op:"showPrinterGroups"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return s.a.postWithUploadFile("Printer.php?op=addPrinterGroups",t,{showLoading:!0})},edit:function(t){return s.a.postWithUploadFile("Printer.php?op=updatePrinterGroups",t,{showLoading:!0})},remove:function(t){return s.a.post("Printer.php?op=deletePrinterGroup",{id:t})}};e["a"]=i["IKDataEntity"].ModelFactory(d,c)},"713a4":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("v-container",{attrs:{fluid:""}},[n("ik-data-table",{attrs:{model:t.model,"use-default-action":!1,"use-select":!1,"show-expand":!0,"single-expand":!0,icon:"mdi-clipboard-list","entity-name":t.$t("打印单列表")},scopedSlots:t._u([{key:"expanded-item",fn:function(e){var a=e.item;return[n("div",{staticClass:"text-center",domProps:{innerHTML:t._s(a.content)}})]}},{key:"footer",fn:function(){return[n("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0},{key:"item.action",fn:function(e){var a=e.item;return[n("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.reprint(a)}}},[t._v(" mdi-printer ")])]}}])})],1)],1)},r=[],i=(n("96cf"),n("1da1")),o=(n("4de4"),n("f4d6")),s=n("9d8f"),d=n.n(s),c=n("6306"),p=n("4aad"),u=n("eff4"),l={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},printStatus:{displayName:"printStatus",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList(),itemText:"name"}}},addTimeStamp:{displayName:"addTimeStamp"},printBonClass:{type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList()}}},printerGroupId:{type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList}}},retryCount:{},printerMsg:{displayName:"printerMsg"},content:{displayName:"checkContent",header:!1}},f={load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("PrintRecord.php",{op:"getAllRecords"});case 2:if(n=t.sent.content,e=e[0],!e){t.next=6;break}return t.abrupt("return",n.filter((function(t){return t.printStatus!==e.printStatus})));case 6:return t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),reprint:function(t){return d.a.get("Printer.php?op=reprintWithDefault",{id:t.id})}},m=o["IKDataEntity"].ModelFactory(l,f),y=n("641f"),g=n.n(y),h={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:m}},methods:{reprint:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.model.reprint(t);case 2:g.a.toast();case 3:case"end":return n.stop()}}),n)})))()}}},v=h,b=n("2877"),w=n("6544"),C=n.n(w),P=n("a523"),I=n("132d"),k=n("71d9"),x=Object(b["a"])(v,a,r,!1,null,null,null);e["default"]=x.exports;C()(x,{VContainer:P["a"],VIcon:I["a"],VToolbar:k["a"]})},a523:function(t,e,n){"use strict";n("99af"),n("4de4"),n("b64b"),n("2ca0"),n("20f6"),n("4b85"),n("a15b"),n("498a");var a=n("2b0e");function r(t){return a["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,n){var a=n.props,r=n.data,i=n.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var o=r.attrs;if(o){r.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(r.staticClass+=" ".concat(s.join(" ")))}return a.id&&(r.domProps=r.domProps||{},r.domProps.id=a.id),e(a.tag,r,i)}})}var i=n("d9f7");e["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var n,a=e.props,r=e.data,o=e.children,s=r.attrs;return s&&(r.attrs={},n=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}))),a.id&&(r.domProps=r.domProps||{},r.domProps.id=a.id),t(a.tag,Object(i["a"])(r,{staticClass:"container",class:Array({"container--fluid":a.fluid}).concat(n||[])}),o)}})},eff4:function(t,e,n){"use strict";var a=n("9225");e["a"]={list:[{id:0,name:a["a"].t("打印失败")},{id:1,name:a["a"].t("打印成功")},{id:2,name:a["a"].t("验证错误")},{id:3,name:a["a"].t("单子格式不合规范")},{id:4,name:a["a"].t("正在打印")},{id:5,name:a["a"].t("网络错误")},{id:6,name:a["a"].t("等待商米打印机打印")}],getList:function(){return this.list}}}}]);
//# sourceMappingURL=chunk-043489c7.992883e1.js.map