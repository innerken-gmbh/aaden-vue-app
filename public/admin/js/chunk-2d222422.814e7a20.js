(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d222422"],{ce9c:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("ik-data-table",{attrs:{model:e.model,"use-action":!1,"use-select":!1,icon:"mdi-developer-board","entity-name":e.$t("操作记录")},scopedSlots:e._u([{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0}])})},r=[],o=a("5530"),c=(a("96cf"),a("1da1")),i=a("f4d6"),l=a("9d8f"),p=a.n(l),s={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},operateType:{displayName:"operateType"},operateName:{displayName:"operateName"},operateData:{displayName:"operateData"},createdAt:{displayName:"Datum/Uhrzeit"}},u={load:function(){var e=Object(c["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("AccessLog.php",Object(o["a"])({op:"getAllRecords"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},d=i["IKDataEntity"].ModelFactory(s,u),m={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:d}}},f=m,y=a("2877"),b=a("6544"),w=a.n(b),h=a("71d9"),g=Object(y["a"])(f,n,r,!1,null,null,null);t["default"]=g.exports;w()(g,{VToolbar:h["a"]})}}]);
//# sourceMappingURL=chunk-2d222422.814e7a20.js.map