(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b326f"],{"26c8":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ik-data-table",{attrs:{"entity-name":e.$t("CoronaInfo"),model:e.model,icon:"mdi-food-fork-drink"}})},o=[],r=a("f4d6"),i=a("5530"),p=(a("96cf"),a("1da1")),s=a("9d8f"),c=a.n(s),d={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",form:!1},firstName:{displayName:"Vorname"},lastName:{displayName:"Nachname"},address:{displayName:"Addresse"},eatTime:{type:r["IKDataEntity"].Types.Time,displayName:"Essenszeit"},phone:{displayName:"Telephone"}},u="corona",l={add:function(e){return c.a.post("Route.php?op=".concat(u,"add"),e,{showLoading:!0})},edit:function(e){return c.a.post("Route.php?op=".concat(u,"update"),e,{showLoading:!0})},remove:function(e){return c.a.post("Route.php?op=".concat(u,"delete"),{id:e})},load:function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("Route.php?op=".concat(u,"list"),Object(i["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},m=r["IKDataEntity"].ModelFactory(d,l),f={components:{IkDataTable:r["IkDataTable"]},data:function(){return{model:m}}},y=f,h=a("2877"),w=Object(h["a"])(y,n,o,!1,null,null,null);t["default"]=w.exports}}]);
//# sourceMappingURL=chunk-2d0b326f.9db8b3b4.js.map