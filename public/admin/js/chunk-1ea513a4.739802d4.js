(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1ea513a4"],{"22ae":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:e.model,icon:"mdi-calendar-today","entity-name":e.$t("预定设置")}})],1)],1)},r=[],o=a("633c"),i=(a("d81d"),a("bf19"),a("5530")),s=(a("96cf"),a("1da1")),u=a("3405"),c=a("ccdd"),p={id:{type:o["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"reservename"},personCount:{displayName:"personCount"},phone:{},date:{type:o["a"].Types.Date,formConfig:{dateLocale:u["a"].lang()}},time:{type:o["a"].Types.Time}},d={add:function(e){if(e.count=e.personCount,!(Date.parse(e.date+" "+e.time)<Date.parse((new Date).toJSON())))return e.time=e.date+" "+e.time,o["e"].postWithUploadFile("Reserve.php?op=add",e,{showLoading:!0});c["a"].showError("Die Uhrzeit darf nicht vor dem aktuellen Datum liegen")},edit:function(e){return e.count=e.personCount,e.time=e.date+" "+e.time,o["e"].postWithUploadFile("Reserve.php?op=update",e,{showLoading:!0})},remove:function(e){return o["e"].post("Reserve.php?op=delete",{id:e})},load:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["e"].get("Reserve.php",Object(i["a"])({op:"all",lang:u["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.reserveTime&&(e.date=e.reserveTime.substring(0,10),e.time=e.reserveTime.substring(10)),e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},l=o["a"].ModelFactory(p,d),m={components:{IkDataTable:o["c"]},data:function(){return{model:l}}},f=m,h=a("2877"),g=a("6544"),v=a.n(g),b=a("a523"),y=Object(h["a"])(f,n,r,!1,null,null,null);t["default"]=y.exports;v()(y,{VContainer:b["a"]})},bf19:function(e,t,a){"use strict";var n=a("23e7");n({target:"URL",proto:!0,enumerable:!0},{toJSON:function(){return URL.prototype.toString.call(this)}})},ccdd:function(e,t,a){"use strict";var n=a("5530"),r=a("633c");t["a"]=Object(n["a"])({},r["b"])}}]);
//# sourceMappingURL=chunk-1ea513a4.739802d4.js.map