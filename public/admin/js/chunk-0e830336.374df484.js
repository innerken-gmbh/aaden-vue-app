(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0e830336"],{"52ab":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("v-container",{attrs:{fluid:""}},[n("ik-data-table",{attrs:{model:e.model,icon:"mdi-cash-usd","entity-name":e.$t("TaxSetting"),"use-delete-action":!1},scopedSlots:e._u([{key:"footer",fn:function(){return[n("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0}])})],1)],1)},r=[],o=n("633c"),i=(n("d81d"),n("5530")),s=(n("96cf"),n("1da1")),p=n("3405"),u=n("6f56"),c=n("ebc9"),l={id:{type:o["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},consumeTypeId:{type:o["a"].Types.Option,formConfig:{type:{selectItems:u["a"].getList}},form:!1},dishesCategoryTypeId:{displayName:"labelType",type:o["a"].Types.Option,formConfig:{type:{selectItems:c["a"].getList}},form:!1},taxRateValue:{}},d={edit:function(e){return o["e"].postWithUploadFile("TaxRate.php?op=update",e,{showLoading:!0})},load:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["e"].get("TaxRate.php?",Object(i["a"])({op:"getList",lang:p["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return o["a"].parseDataForEntity(e,l)})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},f=o["a"].ModelFactory(l,d),g={components:{IkDataTable:o["c"]},data:function(){return{model:f}}},m=g,y=n("2877"),b=n("6544"),h=n.n(b),w=n("a523"),T=n("71d9"),C=Object(y["a"])(m,a,r,!1,null,null,null);t["default"]=C.exports;h()(C,{VContainer:w["a"],VToolbar:T["a"]})},"6f56":function(e,t,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),o=n("3405"),i=n("633c"),s={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"staffName"},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"}},p={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Complex.php",Object(a["a"])({op:"showAllConsumeTypeInfo",lang:o["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return i["e"].post("ConsumeType.php?op=add",Object(a["a"])(Object(a["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return i["e"].postWithUploadFile("ConsumeType.php?op=update",Object(a["a"])(Object(a["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return i["e"].post("ConsumeType.php?op=delete",{id:e})}};t["a"]=i["a"].ModelFactory(s,p)},ebc9:function(e,t,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),o=n("3405"),i=n("633c"),s={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},p={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("CategoryType.php",Object(a["a"])({lang:o["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["a"].ModelFactory(s,p)}}]);
//# sourceMappingURL=chunk-0e830336.374df484.js.map