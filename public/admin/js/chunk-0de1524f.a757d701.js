(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0de1524f"],{caae:function(t,e,a){"use strict";var n=a("9225");e["a"]={list:[{id:1,name:n["a"].t("Monday")},{id:2,name:n["a"].t("Tuesday")},{id:3,name:n["a"].t("Wednesday")},{id:4,name:n["a"].t("Thursday")},{id:5,name:n["a"].t("Friday")},{id:6,name:n["a"].t("Saturday")},{id:7,name:n["a"].t("Sunday")}],getList:function(){return this.list}}},f7b9:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:t.model,"entity-name":t.$t("营业时间设置"),icon:"mdi-calendar-clock"}})],1)],1)},i=[],r=a("5530"),d=(a("96cf"),a("1da1")),o=a("f4d6"),s=a("9d8f"),p=a.n(s),u=a("caae"),l={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{disableNew:!0,disableEdit:!0,requiredNew:!1}},weekday:{type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList(),multiple:!0,disableEdit:!0,itemText:"name"}}},startTime:{type:o["IKDataEntity"].Types.Time},endTime:{type:o["IKDataEntity"].Types.Time}},c={add:function(t){return p.a.post("Takeaway.php?op=addOpeningTime",t,{showLoading:!0})},edit:function(t){return p.a.postWithUploadFile("Takeaway.php?op=updateOpeningTime",t,{showLoading:!0})},remove:function(t){return p.a.post("Takeaway.php?op=deleteOpeningTime",{id:t})},load:function(){var t=Object(d["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p.a.get("Takeaway.php?op=showAllOpeningTime",Object(r["a"])({},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},m=o["IKDataEntity"].ModelFactory(l,c),y={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:m}}},f=y,T=a("2877"),g=a("6544"),w=a.n(g),h=a("a523"),b=Object(T["a"])(f,n,i,!1,null,null,null);e["default"]=b.exports;w()(b,{VContainer:h["a"]})}}]);
//# sourceMappingURL=chunk-0de1524f.a757d701.js.map