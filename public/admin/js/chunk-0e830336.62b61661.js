(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0e830336"],{"52ab":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("v-container",{attrs:{fluid:""}},[n("ik-data-table",{attrs:{model:t.model,icon:"mdi-cash-usd","entity-name":t.$t("TaxSetting"),"use-delete-action":!1},scopedSlots:t._u([{key:"footer",fn:function(){return[n("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0}])})],1)],1)},r=[],i=n("633c"),o=n("5530"),s=(n("96cf"),n("1da1")),l=n("3405"),p=n("6f56"),u=n("ebc9"),c={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},consumeTypeId:{type:i["IKDataEntity"].Types.Option,formConfig:{requiredEdit:!1,type:{selectItems:p["a"].getList}}},dishesCategoryTypeId:{displayName:"labelType",type:i["IKDataEntity"].Types.Option,formConfig:{requiredEdit:!1,type:{selectItems:u["a"].getList}}},taxRateValue:{}},d={edit:function(t){return i["hillo"].postWithUploadFile("TaxRate.php?op=update",t,{showLoading:!0})},load:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i["hillo"].get("TaxRate.php?",Object(o["a"])({op:"getList",lang:l["a"].lang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},f=i["IKDataEntity"].ModelFactory(c,d),y={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:f}}},g=y,m=n("2877"),h=n("6544"),b=n.n(h),w=n("a523"),T=n("71d9"),C=Object(m["a"])(g,a,r,!1,null,null,null);e["default"]=C.exports;b()(C,{VContainer:w["a"],VToolbar:T["a"]})},"6f56":function(t,e,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("633c"),o={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"staffName"},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}}},s={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i["hillo"].get("Complex.php",Object(a["a"])({op:"showAllConsumeTypeInfo"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return i["hillo"].post("ConsumeType.php?op=add",Object(a["a"])(Object(a["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},edit:function(t){return i["hillo"].postWithUploadFile("ConsumeType.php?op=update",Object(a["a"])(Object(a["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},remove:function(t){return i["hillo"].post("ConsumeType.php?op=delete",{id:t})}};e["a"]=i["IKDataEntity"].ModelFactory(o,s)},ebc9:function(t,e,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("3405"),o=n("633c"),s={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},l={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o["hillo"].get("CategoryType.php",Object(a["a"])({lang:i["a"].lang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=o["IKDataEntity"].ModelFactory(s,l)}}]);
//# sourceMappingURL=chunk-0e830336.62b61661.js.map