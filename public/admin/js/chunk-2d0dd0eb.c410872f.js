(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0dd0eb"],{8085:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[e("v-container",{attrs:{fluid:""}},[e("ik-data-table",{attrs:{model:t.model,icon:"mdi-calendar-today","entity-name":t.$t("图片设置")}})],1)],1)},r=[],i=e("f4d6"),o=(e("b0c0"),e("ac1f"),e("1276"),e("96cf"),e("1da1")),s=e("5530"),l=e("9d8f"),u=e.n(l),p=e("5089"),c=e("c0d6"),d={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},sort:{displayName:"sectionSort",type:i["IKDataEntity"].Types.Integer},image:{type:i["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return c["a"].getters.rootUrl+p["b"].dishImageRoot}}},displayName:"image"}},f={add:function(t){return u.a.postWithUploadFile("Restaurant.php?op=uploadImage",Object(s["a"])({},t),{showLoading:!0})},edit:function(t){return t.file&&(t.imageExt=t.file.name.split(".")[1]),u.a.postWithUploadFile("Restaurant.php?op=modifyRestaurantImage",Object(s["a"])(Object(s["a"])({},t),{},{params:JSON.stringify(t)}),{showLoading:!0})},remove:function(t){return u.a.post("Restaurant.php?op=deleteRestaurantImage",{id:t})},load:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.a.get("Restaurant.php",Object(s["a"])({op:"showAllRestaurantImage"},a));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function a(a){return t.apply(this,arguments)}return a}()},m=i["IKDataEntity"].ModelFactory(d,f),g={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:m}}},y=g,h=e("2877"),b=e("6544"),I=e.n(b),w=e("a523"),R=Object(h["a"])(y,n,r,!1,null,null,null);a["default"]=R.exports;I()(R,{VContainer:w["a"]})}}]);
//# sourceMappingURL=chunk-2d0dd0eb.c410872f.js.map