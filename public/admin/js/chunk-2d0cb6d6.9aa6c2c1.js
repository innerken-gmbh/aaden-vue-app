(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cb6d6"],{"4a2e":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:t.model,icon:"mdi-cards","entity-name":t.$t("会员卡销售记录"),"use-action":!1},scopedSlots:t._u([{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0}])})],1)],1)},r=[],o=a("633c"),i=(a("d81d"),a("5530")),c=(a("96cf"),a("1da1")),l={dishId:{type:o["a"].Types.Integer,displayName:"ID",tableConfig:{align:"start"}},memberCardName:{},createTime:{},totalAmount:{},leftAmount:{},longId:{}},s={load:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o["e"].get("MembershipCard.php",Object(i["a"])({op:"showAllMemberCardSaleRecord"},e));case 2:return t.abrupt("return",t.sent.content.map((function(t){return o["a"].parseDataForEntity(t,l)})));case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},u=o["a"].ModelFactory(l,s),d={components:{IkDataTable:o["c"]},data:function(){return{model:u}}},p=d,f=a("2877"),m=a("6544"),b=a.n(m),h=a("a523"),w=a("71d9"),g=Object(f["a"])(p,n,r,!1,null,null,null);e["default"]=g.exports;b()(g,{VContainer:h["a"],VToolbar:w["a"]})}}]);
//# sourceMappingURL=chunk-2d0cb6d6.9aa6c2c1.js.map