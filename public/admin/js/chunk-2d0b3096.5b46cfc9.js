(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b3096"],{2750:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:t.model,icon:"mdi-card-account-details-outline","entity-name":t.$t("用户管理")}})],1)],1)},r=[],i=a("633c"),o=a("5530"),s=(a("96cf"),a("1da1")),l={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},email:{displayName:"emailAddress"},password:{displayName:"password"},rawInfo:{displayName:"rawInfo"}},d={add:function(t){return i["hillo"].post("Takeaway.php?op=addUsers",t,{showLoading:!0})},edit:function(t){return i["hillo"].postWithUploadFile("Takeaway.php?op=updateUsers",t,{showLoading:!0})},remove:function(t){return i["hillo"].post("Takeaway.php?op=deleteUsers",{id:t})},load:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i["hillo"].get("Takeaway.php?op=showAllUsers",Object(o["a"])({},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},p=i["IKDataEntity"].ModelFactory(l,d),u={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:p}}},c=u,f=a("2877"),w=a("6544"),h=a.n(w),m=a("a523"),y=Object(f["a"])(c,n,r,!1,null,null,null);e["default"]=y.exports;h()(y,{VContainer:m["a"]})}}]);
//# sourceMappingURL=chunk-2d0b3096.5b46cfc9.js.map