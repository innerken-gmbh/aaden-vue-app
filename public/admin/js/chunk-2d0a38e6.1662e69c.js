(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a38e6"],{"034a":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[t("v-container",{attrs:{fluid:""}},[t("ik-data-table",{attrs:{model:e.model,"entity-name":e.$t("配送距离设置"),icon:"mdi-truck"}})],1)],1)},n=[],i=t("f4d6"),o=t("5530"),l=(t("96cf"),t("1da1")),c=t("9d8f"),s=t.n(c),d=[function(e){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(e)||"please enter the correct price"}],p={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},PLZArea:{displayName:"plzArea"},name:{displayName:"delivname"},priceMod:{displayName:"priceMod",formConfig:{rule:d}},freePrice:{displayName:"freePrice",formConfig:{rule:d}},startPrice:{displayName:"startPrice",formConfig:{rule:d}}},u={add:function(e){return s.a.post("Takeaway.php?op=addDeliveryArea",e,{showLoading:!0})},edit:function(e){return s.a.postWithUploadFile("Takeaway.php?op=updateDeliveryArea",e,{showLoading:!0})},remove:function(e){return s.a.post("Takeaway.php?op=deleteDeliveryArea",{id:e})},load:function(){var e=Object(l["a"])(regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Takeaway.php?op=showAllDeliveryArea",Object(o["a"])({},a));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function a(a){return e.apply(this,arguments)}return a}()},f=i["IKDataEntity"].ModelFactory(p,u),m={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:f}}},y=m,h=t("2877"),w=t("6544"),g=t.n(w),k=t("a523"),v=Object(h["a"])(y,r,n,!1,null,null,null);a["default"]=v.exports;g()(v,{VContainer:k["a"]})}}]);
//# sourceMappingURL=chunk-2d0a38e6.1662e69c.js.map