(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-043489c7"],{"4aad":function(t,e,n){"use strict";e["a"]={list:[{id:1,name:"Others"},{id:2,name:"RechnungBon"},{id:3,name:"Zbon"},{id:4,name:"KitchenBon"}],getList:function(){return this.list}}},6306:function(t,e,n){"use strict";var r=n("5530"),a=(n("96cf"),n("1da1")),i=n("f4d6"),o=n("9d8f"),s=n.n(o),d={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},upsideDown:{type:i["IKDataEntity"].Types.Boolean},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},p={load:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Printer.php",Object(r["a"])({op:"showPrinterGroups"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return s.a.postWithUploadFile("Printer.php?op=addPrinterGroups",t,{showLoading:!0})},edit:function(t){return s.a.postWithUploadFile("Printer.php?op=updatePrinterGroups",t,{showLoading:!0})},remove:function(t){return s.a.post("Printer.php?op=deletePrinterGroup",{id:t})}};e["a"]=i["IKDataEntity"].ModelFactory(d,p)},"713a4":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("v-container",{attrs:{fluid:""}},[n("ik-data-table",{attrs:{model:t.model,"use-default-action":!1,"use-customer-action-only":!0,"use-select":!1,"show-expand":!0,"single-expand":!0,icon:"mdi-clipboard-list","entity-name":t.$t("打印单列表")},scopedSlots:t._u([{key:"expanded-item",fn:function(e){var r=e.item;return[n("div",{staticClass:"text-center",domProps:{innerHTML:t._s(r.content)}})]}},{key:"footer",fn:function(){return[n("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0},{key:"item.action",fn:function(e){var r=e.item;return[n("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.reprint(r)}}},[t._v(" mdi-printer ")])]}}])})],1)],1)},a=[],i=(n("96cf"),n("1da1")),o=(n("4de4"),n("f4d6")),s=n("9d8f"),d=n.n(s),p=n("6306"),c=n("4aad"),u=n("eff4"),l={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{width:"70px"}},printStatus:{displayName:"printStatus",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList(),itemText:"name"},width:"150px"}},addTimeStamp:{displayName:"addTimeStamp",formConfig:{width:"150px"}},printBonClass:{type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList()}}},printerGroupId:{type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList},width:"150px"}},retryCount:{},printerMsg:{displayName:"printerMsg"},content:{displayName:"checkContent",header:!1}},f={load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("PrintRecord.php",{op:"getAllRecords"});case 2:if(n=t.sent.content,e=e[0],!e){t.next=6;break}return t.abrupt("return",n.filter((function(t){return t.printStatus!==e.printStatus})));case 6:return t.abrupt("return",n);case 7:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),reprint:function(t){return d.a.get("Printer.php?op=reprintWithDefault",{id:t.id})}},m=o["IKDataEntity"].ModelFactory(l,f),y=n("641f"),g=n.n(y),h={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:m}},methods:{reprint:function(t){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.model.reprint(t);case 2:g.a.toast();case 3:case"end":return n.stop()}}),n)})))()}}},v=h,b=n("2877"),w=n("6544"),C=n.n(w),P=n("a523"),x=n("132d"),I=n("71d9"),k=Object(b["a"])(v,r,a,!1,null,null,null);e["default"]=k.exports;C()(k,{VContainer:P["a"],VIcon:x["a"],VToolbar:I["a"]})},a523:function(t,e,n){"use strict";n("99af"),n("4de4"),n("b64b"),n("2ca0"),n("20f6"),n("4b85"),n("a15b"),n("498a");var r=n("2b0e");function a(t){return r["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,n){var r=n.props,a=n.data,i=n.children;a.staticClass="".concat(t," ").concat(a.staticClass||"").trim();var o=a.attrs;if(o){a.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(a.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(a.staticClass+=" ".concat(s.join(" ")))}return r.id&&(a.domProps=a.domProps||{},a.domProps.id=r.id),e(r.tag,a,i)}})}var i=n("d9f7");e["a"]=a("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var n,r=e.props,a=e.data,o=e.children,s=a.attrs;return s&&(a.attrs={},n=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(a.attrs[t]=e,!1):e||"string"===typeof e}))),r.id&&(a.domProps=a.domProps||{},a.domProps.id=r.id),t(r.tag,Object(i["a"])(a,{staticClass:"container",class:Array({"container--fluid":r.fluid}).concat(n||[])}),o)}})},eff4:function(t,e,n){"use strict";var r=n("9225");e["a"]={list:[{id:0,name:r["a"].t("打印失败")},{id:1,name:r["a"].t("打印成功")},{id:2,name:r["a"].t("验证错误")},{id:3,name:r["a"].t("单子格式不合规范")},{id:4,name:r["a"].t("正在打印")},{id:5,name:r["a"].t("网络错误")},{id:6,name:r["a"].t("等待商米打印机打印")}],getList:function(){return this.list}}}}]);
//# sourceMappingURL=chunk-043489c7.5a3a9450.js.map