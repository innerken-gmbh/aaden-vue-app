(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0a38e6"],{"034a":function(e,a,t){"use strict";t.r(a);var r=function(){var e=this,a=e.$createElement,t=e._self._c||a;return t("ik-data-table",{attrs:{model:e.model,"entity-name":e.$t("配送距离"),icon:"mdi-truck"}})},n=[],i=t("f4d6"),o=t("5530"),p=(t("96cf"),t("1da1")),l=t("9d8f"),c=t.n(l),u=[function(e){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(e)||"please enter the correct price"}],d={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},PLZArea:{displayName:"plzArea"},name:{displayName:"delivname"},priceMod:{displayName:"priceMod",formConfig:{rule:u}},freePrice:{displayName:"freePrice",formConfig:{rule:u}},startPrice:{displayName:"startPrice",formConfig:{rule:u}}},s={add:function(e){return c.a.post("Takeaway.php?op=addDeliveryArea",e,{showLoading:!0})},edit:function(e){return c.a.postWithUploadFile("Takeaway.php?op=updateDeliveryArea",e,{showLoading:!0})},remove:function(e){return c.a.post("Takeaway.php?op=deleteDeliveryArea",{id:e})},load:function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(a){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("Takeaway.php?op=showAllDeliveryArea",Object(o["a"])({},a));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function a(a){return e.apply(this,arguments)}return a}()},f=i["IKDataEntity"].ModelFactory(d,s),m={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:f}}},y=m,w=t("2877"),h=Object(w["a"])(y,r,n,!1,null,null,null);a["default"]=h.exports}}]);
//# sourceMappingURL=chunk-2d0a38e6.ef3d5407.js.map