(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b3096"],{2750:function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[t("v-container",{attrs:{fluid:""}},[t("ik-data-table",{attrs:{model:e.model,icon:"mdi-card-account-details-outline","entity-name":e.$t("用户管理")}})],1)],1)},r=[],o=t("633c"),i=t("5530"),s=(t("96cf"),t("1da1")),d={id:{type:o["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},email:{displayName:"emailAddress"},password:{displayName:"password"},rawInfo:{displayName:"rawInfo"}},l={add:function(e){return o["e"].post("Takeaway.php?op=addUsers",e,{showLoading:!0})},edit:function(e){return o["e"].postWithUploadFile("Takeaway.php?op=updateUsers",e,{showLoading:!0})},remove:function(e){return o["e"].post("Takeaway.php?op=deleteUsers",{id:e})},load:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["e"].get("Takeaway.php?op=showAllUsers",Object(i["a"])({},a));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function a(a){return e.apply(this,arguments)}return a}()},c=o["a"].ModelFactory(d,l),p={components:{IkDataTable:o["c"]},data:function(){return{model:c}}},u=p,f=t("2877"),w=t("6544"),m=t.n(w),h=t("a523"),y=Object(f["a"])(u,n,r,!1,null,null,null);a["default"]=y.exports;m()(y,{VContainer:h["a"]})}}]);
//# sourceMappingURL=chunk-2d0b3096.5695800c.js.map