(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6bd0457e"],{"6e35":function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("633c"),o={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"allergName"},icon:{displayName:"icon"},shortName:{displayName:"shortName"},displayText:{displayName:"displayText"}},s={add:function(e){return i["e"].postWithUploadFile("Dishes.php?op=addAllergen",e,{showLoading:!0})},edit:function(e){return i["e"].postWithUploadFile("Dishes.php?op=updateAllergen",e,{showLoading:!0})},remove:function(e){return i["e"].post("Dishes.php?op=deleteAllergen",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Dishes.php",Object(n["a"])({op:"showAllAllergen"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["a"].ModelFactory(o,s)},faf4:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:e.model,icon:"mdi-chart-bubble","entity-name":e.$t("过敏源设置")}})],1)],1)},r=[],i=a("633c"),o=a("6e35"),s={components:{IkDataTable:i["c"]},data:function(){return{model:o["a"]}}},l=s,c=a("2877"),p=a("6544"),d=a.n(p),u=a("a523"),h=Object(c["a"])(l,n,r,!1,null,null,null);t["default"]=h.exports;d()(h,{VContainer:u["a"]})}}]);
//# sourceMappingURL=chunk-6bd0457e.a86aa223.js.map