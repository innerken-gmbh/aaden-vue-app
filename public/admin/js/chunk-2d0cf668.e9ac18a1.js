(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cf668"],{"640d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ik-data-table",{attrs:{model:e.model,icon:"mdi-calendar-today","entity-name":e.$t("轮播图")}})},r=[],o=a("f4d6"),i=(a("96cf"),a("1da1")),p=a("5530"),s=a("9d8f"),u=a.n(s),d=a("5089"),c=a("c0d6"),f={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},image:{type:o["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return c["a"].getters.rootUrl+d["b"].bannerImageRoot}},required:!1},displayName:"image"},sort:{displayName:"Ordnung",type:o["IKDataEntity"].Types.Integer,formConfig:{}},remark:{type:o["IKDataEntity"].Types.String,displayName:"remark",formConfig:{required:!1}}},l={add:function(e){return u.a.postWithUploadFile("Restaurant.php?op=addGiraffeBannerImage",Object(p["a"])({},e),{showLoading:!0})},edit:function(e){return u.a.postWithUploadFile("Restaurant.php?op=modifyRestaurantImage",Object(p["a"])(Object(p["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},remove:function(e){return u.a.post("Restaurant.php?op=deleteGiraffeBannerImage",{id:e})},load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("Restaurant.php?op=showGiraffeBannerImage",{});case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},m=o["IKDataEntity"].ModelFactory(f,l),g={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:m}}},y=g,h=a("2877"),I=Object(h["a"])(y,n,r,!1,null,null,null);t["default"]=I.exports}}]);
//# sourceMappingURL=chunk-2d0cf668.e9ac18a1.js.map