(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-527fa600"],{"0c95":function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[t("v-container",{attrs:{fluid:""}},[t("ik-data-table",{attrs:{model:e.model,"entity-name":e.$t("支付设置"),icon:"mdi-cash-plus"}})],1)],1)},i=[],r=t("633c"),o=t("8976"),s={components:{IkDataTable:r["c"]},data:function(){return{model:o["a"]}}},l=s,d=t("2877"),p=t("6544"),c=t.n(p),u=t("a523"),f=Object(d["a"])(l,n,i,!1,null,null,null);a["default"]=f.exports;c()(f,{VContainer:u["a"]})},8976:function(e,a,t){"use strict";t("96cf");var n=t("1da1"),i=t("5530"),r=t("633c"),o=t("a86d"),s=t("3405"),l={id:{type:r["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},langs:{displayName:"paymentname",type:r["a"].Types.Group,formConfig:{groupName:"paymentname",default:s["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===s["a"].lang()}},childKey:"name",children:[o["a"],o["a"],o["a"]]},fixedDisplay:{type:r["a"].Types.Boolean},isOnline:{displayName:"isOnline",type:r["a"].Types.Boolean},apiKey:{required:!1,formConfig:{requiredNew:!1,requiredEdit:!1}}},d={add:function(e){return r["e"].post("PayMethod.php?op=add",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return r["e"].postWithUploadFile("PayMethod.php?op=update",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return r["e"].post("PayMethod.php?op=delete",{id:e})},load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["e"].get("PayMethod.php",Object(i["a"])({},a));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function a(a){return e.apply(this,arguments)}return a}()};a["a"]=r["a"].ModelFactory(l,d)},a86d:function(e,a,t){"use strict";var n=t("633c"),i={id:{type:n["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};a["a"]=n["a"].ModelFactory(i,{})}}]);
//# sourceMappingURL=chunk-527fa600.b3f88c5e.js.map