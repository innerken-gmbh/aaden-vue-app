(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d22d95e"],{f7b9:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:e.model,"entity-name":e.$t("营业时间设置"),icon:"mdi-calendar-clock"}})],1)],1)},i=[],r=(a("d81d"),a("5530")),d=(a("96cf"),a("1da1")),o=a("633c"),s=a("9225"),p={list:[{id:"1",name:s["a"].t("Monday")},{id:"2",name:s["a"].t("Tuesday")},{id:"3",name:s["a"].t("Wednesday")},{id:"4",name:s["a"].t("Thursday")},{id:"5",name:s["a"].t("Friday")},{id:"6",name:s["a"].t("Saturday")},{id:"7",name:s["a"].t("Sunday")}],getList:function(){return this.list}},u={id:{type:o["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{disableNew:!0,disableEdit:!0,requiredNew:!1}},weekday:{type:o["a"].Types.Option,formConfig:{type:{selectItems:p.getList(),multiple:!0,itemText:"name"}}},startTime:{type:o["a"].Types.Time},endTime:{type:o["a"].Types.Time}},l={add:function(e){return o["e"].post("Takeaway.php?op=addOpeningTime",e,{showLoading:!0})},edit:function(e){return o["e"].postWithUploadFile("Takeaway.php?op=updateOpeningTime",e,{showLoading:!0})},remove:function(e){return o["e"].post("Takeaway.php?op=deleteOpeningTime",{id:e})},load:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["e"].get("Takeaway.php?op=showAllOpeningTime",Object(r["a"])({},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return o["a"].parseDataForEntity(e,u)})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},c=o["a"].ModelFactory(u,l),m={components:{IkDataTable:o["c"]},data:function(){return{model:c}}},y=m,f=a("2877"),T=a("6544"),g=a.n(T),w=a("a523"),h=Object(f["a"])(y,n,i,!1,null,null,null);t["default"]=h.exports;g()(h,{VContainer:w["a"]})}}]);
//# sourceMappingURL=chunk-2d22d95e.023a7889.js.map