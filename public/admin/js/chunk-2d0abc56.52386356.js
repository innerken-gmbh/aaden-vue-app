(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0abc56"],{1760:function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",[e("ik-data-table",{attrs:{model:t.model,"entity-name":t.$t("阈值颜色"),icon:"mdi-heart"}}),e("v-card",{attrs:{"min-height":"500px"}},[e("div",{staticStyle:{height:"50px",display:"flex","justify-content":"start","background-color":"#707070",position:"relative",top:"0px",bottom:"0px"}},[e("div",{staticStyle:{"padding-left":"10px"}},[e("v-icon",[t._v("mdi-heart")])],1),e("div",{staticStyle:{"padding-left":"5px"}},[t._v(" "+t._s(t.$t("阈值颜色"))+" ")])])])],1)},n=[],i=e("f4d6"),r=e("5530"),p=(e("96cf"),e("1da1")),c=e("9d8f"),l=e.n(c),u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},Ratio:{displayName:"Ratio"},minRatio:{displayName:"minRatio",formConfig:{overwriteRule:!1,rule:[function(t){return!isNaN(parseFloat(t))&&parseFloat(t)>0||"The min Ratio should be greater than 0"}]}},maxRatio:{displayName:"maxRatio",formConfig:{overwriteRule:!0,rule:[function(t){return!isNaN(parseFloat(t))&&parseFloat(t)>=0||"The max Ratio could not be negative"}]}},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!0}}},s={add:function(){var t=Object(p["a"])(regeneratorRuntime.mark((function t(a){var e,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l.a.get("DCache.php",{op:"showDCacheColor"});case 2:return e=t.sent.content,o=e.sort((function(t,a){var e=t.maxRatio,o=a.maxRatio;return e<o?-1:e>o?1:0})),a.Ratio<o[0].maxRatio&&(a.minRatio=null,a.maxRatio=a.Ratio,o[0].minRatio=a.Ratio,l.a.postWithUploadFile("DCache.php?op=updateDCacheColor",o[0],{showLoading:!0})),t.abrupt("return",l.a.postWithUploadFile("DCache.php?op=createDCacheColor",a,{showLoading:!0}));case 6:case"end":return t.stop()}}),t)})));function a(a){return t.apply(this,arguments)}return a}(),edit:function(t){if(t.minRatio>t.maxRatio){var a=[t.minRatio,t.maxRatio];t.maxRatio=a[0],t.minRatio=a[1]}return t.minRatio<=0&&(t.minRatio="null"),t.maxRatio>1&&(t.maxRatio="null"),l.a.postWithUploadFile("DCache.php?op=updateDCacheColor",t,{showLoading:!0})},remove:function(t){return l.a.post("DCache.php?op=deleteDCacheColor",{id:t})},load:function(){var t=Object(p["a"])(regeneratorRuntime.mark((function t(a){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l.a.get("DCache.php",Object(r["a"])({op:"showDCacheColor"},a));case 2:return e=t.sent.content,e.Ratio=e.maxRatio,console.log("tempItem",e),t.abrupt("return",e);case 6:case"end":return t.stop()}}),t)})));function a(a){return t.apply(this,arguments)}return a}()},d=i["IKDataEntity"].ModelFactory(u,s),m={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:d}}},h=m,f=e("2877"),R=e("6544"),x=e.n(R),C=e("b0af"),g=e("a523"),v=e("132d"),y=Object(f["a"])(h,o,n,!1,null,"2e0390f5",null);a["default"]=y.exports;x()(y,{VCard:C["a"],VContainer:g["a"],VIcon:v["a"]})}}]);
//# sourceMappingURL=chunk-2d0abc56.52386356.js.map