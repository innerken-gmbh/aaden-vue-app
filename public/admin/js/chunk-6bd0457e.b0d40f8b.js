(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6bd0457e"],{"6e35":function(e,t,a){"use strict";var n=a("5530"),i=(a("96cf"),a("1da1")),r=a("633c"),l={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"allergName"},icon:{displayName:"icon"},shortName:{displayName:"shortName"},displayText:{displayName:"displayText"}},o={add:function(e){return r["hillo"].postWithUploadFile("Dishes.php?op=addAllergen",e,{showLoading:!0})},edit:function(e){return r["hillo"].postWithUploadFile("Dishes.php?op=updateAllergen",e,{showLoading:!0})},remove:function(e){return r["hillo"].post("Dishes.php?op=deleteAllergen",{id:e})},load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["hillo"].get("Dishes.php",Object(n["a"])({op:"showAllAllergen"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=r["IKDataEntity"].ModelFactory(l,o)},faf4:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:e.model,icon:"mdi-chart-bubble","entity-name":e.$t("过敏源设置")}})],1)],1)},i=[],r=a("633c"),l=a("6e35"),o={components:{IkDataTable:r["IkDataTable"]},data:function(){return{model:l["a"]}}},s=o,c=a("2877"),p=a("6544"),d=a.n(p),u=a("a523"),h=Object(c["a"])(s,n,i,!1,null,null,null);t["default"]=h.exports;d()(h,{VContainer:u["a"]})}}]);
//# sourceMappingURL=chunk-6bd0457e.b0d40f8b.js.map