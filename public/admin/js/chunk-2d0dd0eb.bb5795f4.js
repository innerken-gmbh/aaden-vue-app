(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0dd0eb"],{8085:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ik-data-table",{attrs:{model:t.model,icon:"mdi-calendar-today","entity-name":t.$t("图片")}})},r=[],o=a("f4d6"),i=a("c7eb"),s=a("1da1"),p=a("5530"),c=(a("ac1f"),a("1276"),a("b0c0"),a("e9c4"),a("9d8f")),u=a.n(c),d=a("5089"),l=a("c0d6"),m={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},sort:{displayName:"sectionSort",type:o["IKDataEntity"].Types.Integer},image:{type:o["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return l["a"].getters.rootUrl+d["b"].dishImageRoot}}},displayName:"image"}},f={add:function(t){return u.a.postWithUploadFile("Restaurant.php?op=uploadImage",Object(p["a"])({},t),{showLoading:!0})},edit:function(t){return t.file&&(t.imageExt=t.file.name.split(".")[1]),u.a.postWithUploadFile("Restaurant.php?op=modifyRestaurantImage",Object(p["a"])(Object(p["a"])({},t),{},{params:JSON.stringify(t)}),{showLoading:!0})},remove:function(t){return u.a.post("Restaurant.php?op=deleteRestaurantImage",{id:t})},load:function(){var t=Object(s["a"])(Object(i["a"])().mark((function t(e){return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.a.get("Restaurant.php",Object(p["a"])({op:"showAllRestaurantImage"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},y=o["IKDataEntity"].ModelFactory(m,f),b={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:y}}},g=b,h=a("2877"),I=Object(h["a"])(g,n,r,!1,null,null,null);e["default"]=I.exports}}]);
//# sourceMappingURL=chunk-2d0dd0eb.bb5795f4.js.map