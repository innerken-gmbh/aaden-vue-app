(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cf668"],{"640d":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:t.model,icon:"mdi-calendar-today","entity-name":t.$t("轮播图")}})],1)],1)},r=[],i=a("f4d6"),o=(a("96cf"),a("1da1")),s=a("5530"),d=a("9d8f"),p=a.n(d),u=a("5089"),c=a("c0d6"),l={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},image:{type:i["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return c["a"].getters.rootUrl+u["b"].bannerImageRoot}},required:!1},displayName:"image"},sort:{displayName:"Ordnung",type:i["IKDataEntity"].Types.Integer,formConfig:{}},remark:{type:i["IKDataEntity"].Types.String,displayName:"remark",formConfig:{required:!1}}},f={add:function(t){return p.a.postWithUploadFile("Restaurant.php?op=addGiraffeBannerImage",Object(s["a"])({},t),{showLoading:!0})},edit:function(t){return p.a.postWithUploadFile("Restaurant.php?op=modifyRestaurantImage",Object(s["a"])(Object(s["a"])({},t),{},{params:JSON.stringify(t)}),{showLoading:!0})},remove:function(t){return p.a.post("Restaurant.php?op=deleteGiraffeBannerImage",{id:t})},load:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p.a.get("Restaurant.php?op=showGiraffeBannerImage",{});case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(){return t.apply(this,arguments)}return e}()},m=i["IKDataEntity"].ModelFactory(l,f),g={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:m}}},y=g,h=a("2877"),b=a("6544"),I=a.n(b),w=a("a523"),k=Object(h["a"])(y,n,r,!1,null,null,null);e["default"]=k.exports;I()(k,{VContainer:w["a"]})}}]);
//# sourceMappingURL=chunk-2d0cf668.d19ca664.js.map