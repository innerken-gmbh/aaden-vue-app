(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0de1524f"],{caae:function(e,t,a){"use strict";var n=a("9225");t["a"]={list:[{id:1,name:n["a"].t("Monday")},{id:2,name:n["a"].t("Tuesday")},{id:3,name:n["a"].t("Wednesday")},{id:4,name:n["a"].t("Thursday")},{id:5,name:n["a"].t("Friday")},{id:6,name:n["a"].t("Saturday")},{id:7,name:n["a"].t("Sunday")}],getList:function(){return this.list}}},f7b9:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ik-data-table",{attrs:{model:e.model,"entity-name":e.$t("营业时间"),icon:"mdi-calendar-clock"}})},i=[],r=a("5530"),d=(a("96cf"),a("1da1")),o=a("f4d6"),p=a("9d8f"),s=a.n(p),u=a("caae"),c={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{disableNew:!0,disableEdit:!0,requiredNew:!1}},weekday:{type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList(),multiple:!0,disableEdit:!0,itemText:"name"}}},startTime:{type:o["IKDataEntity"].Types.Time},endTime:{type:o["IKDataEntity"].Types.Time}},l={add:function(e){return s.a.post("Takeaway.php?op=addOpeningTime",e,{showLoading:!0})},edit:function(e){return s.a.postWithUploadFile("Takeaway.php?op=updateOpeningTime",e,{showLoading:!0})},remove:function(e){return s.a.post("Takeaway.php?op=deleteOpeningTime",{id:e})},load:function(){var e=Object(d["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Takeaway.php?op=showAllOpeningTime",Object(r["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},m=o["IKDataEntity"].ModelFactory(c,l),y={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:m}}},f=y,T=a("2877"),w=Object(T["a"])(f,n,i,!1,null,null,null);t["default"]=w.exports}}]);
//# sourceMappingURL=chunk-0de1524f.9a3d7196.js.map