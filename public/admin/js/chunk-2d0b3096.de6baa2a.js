(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b3096"],{2750:function(e,a,t){"use strict";t.r(a);var n=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ik-data-table",{attrs:{model:e.model,icon:"mdi-card-account-details-outline","entity-name":e.$t("用户信息")}})},r=[],o=t("f4d6"),i=t("5530"),s=(t("96cf"),t("1da1")),d=t("9d8f"),p=t.n(d),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},email:{displayName:"emailAddress"},password:{displayName:"password"},rawInfo:{displayName:"rawInfo"}},l={add:function(e){return p.a.post("Takeaway.php?op=addUsers",e,{showLoading:!0})},edit:function(e){return p.a.postWithUploadFile("Takeaway.php?op=updateUsers",e,{showLoading:!0})},remove:function(e){return p.a.post("Takeaway.php?op=deleteUsers",{id:e})},load:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Takeaway.php?op=showAllUsers",Object(i["a"])({},a));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function a(a){return e.apply(this,arguments)}return a}()},c=o["IKDataEntity"].ModelFactory(u,l),w={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:c}}},f=w,m=t("2877"),y=Object(m["a"])(f,n,r,!1,null,null,null);a["default"]=y.exports}}]);
//# sourceMappingURL=chunk-2d0b3096.de6baa2a.js.map