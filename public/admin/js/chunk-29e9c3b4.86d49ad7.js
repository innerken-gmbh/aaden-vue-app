(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-29e9c3b4"],{"5ba4":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{attrs:{fluid:""}},[r("v-row",[r("v-col",{attrs:{cols:"12"}},[r("ik-data-table",{attrs:{model:t.AttributeGroup,"entity-name":t.$t("属性组管理"),icon:"mdi-heart"}})],1),r("v-col",{attrs:{cols:"12"}},[r("ik-data-table",{attrs:{model:t.Attribute,"entity-name":t.$t("属性管理"),icon:"mdi-heart"}})],1)],1)],1)},n=[],o=r("633c"),i=r("b0d9"),p=r("5530"),u=(r("96cf"),r("1da1")),s=r("3405"),c={id:{type:o["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"name"},attributeGroupId:{displayName:"groupName",type:o["a"].Types.Option,formConfig:{type:{selectItems:i["a"].forceGetList}}},isMultiChosen:{type:o["a"].Types.Boolean},value:{displayName:"value"},printMod:{displayName:"printMod"},priceMod:{type:o["a"].Types.Float,displayName:"priceMod",formConfig:{overwriteRule:!0,rule:[function(t){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(t)||"please enter the correct price"}]}}},l={add:function(t){return o["e"].postWithUploadFile("Category.php?op=addAttribute",t,{showLoading:!0})},edit:function(t){return o["e"].postWithUploadFile("Category.php?op=updateAttribute",t,{showLoading:!0})},remove:function(t){return o["e"].post("Category.php?op=deleteAttribute",{id:t})},load:function(){var t=Object(u["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o["e"].get("Category.php",Object(p["a"])({op:"showAttribute",lang:s["a"].lang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},d=o["a"].ModelFactory(c,l),y={components:{IkDataTable:o["c"]},data:function(){return{AttributeGroup:i["a"],Attribute:d}}},f=y,m=r("2877"),b=r("6544"),g=r.n(b),h=r("62ad"),w=r("a523"),v=r("0fd9"),C=Object(m["a"])(f,a,n,!1,null,null,null);e["default"]=C.exports;g()(C,{VCol:h["a"],VContainer:w["a"],VRow:v["a"]})},b0d9:function(t,e,r){"use strict";var a=r("5530"),n=(r("96cf"),r("1da1")),o=r("3405"),i=r("633c"),p={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:i["a"].Types.Boolean},multiSelect:{type:i["a"].Types.Boolean}},u={load:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i["e"].get("Category.php",Object(a["a"])({op:"showAttributeGroup",lang:o["a"].lang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return i["e"].postWithUploadFile("Category.php?op=addAttributeGroup",t,{showLoading:!0})},edit:function(t){return i["e"].postWithUploadFile("Category.php?op=updateAttributeGroup",t,{showLoading:!0})},remove:function(t){return i["e"].post("Category.php?op=deleteAttributeGroup",{id:t})}};e["a"]=i["a"].ModelFactory(p,u)}}]);
//# sourceMappingURL=chunk-29e9c3b4.86d49ad7.js.map