(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0abc56"],{1760:function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",[e("ik-data-table",{attrs:{model:t.model,"entity-name":t.$t("阈值颜色"),icon:"mdi-heart"}})],1)},n=[],i=e("f4d6"),r=e("5530"),l=(e("96cf"),e("1da1")),m=e("9d8f"),c=e.n(m),u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},minRatio:{displayName:"minRatio",formConfig:{overwriteRule:!0,rule:[function(t){return/^(-)?[0-9]+\.{0,1}[0-9]{0,2}$/.test(t)||"please enter the correct min Ratio"}]}},maxRatio:{displayName:"maxRatio",formConfig:{overwriteRule:!0,rule:[function(t){return/^(-)?[0-9]+\.{0,1}[0-9]{0,2}$/.test(t)||"please enter the correct max Ratio"}]}},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!0}}},p={add:function(t){if(console.log("add",t),t.minRatio>t.maxRatio){var a=[t.minRatio,t.maxRatio];t.maxRatio=a[0],t.minRatio=a[1]}return t.minRatio<=0&&(t.minRatio="null"),t.maxRatio>1&&(t.maxRatio="null"),c.a.postWithUploadFile("DCache.php?op=createDCacheColor",t,{showLoading:!0})},edit:function(t){if(t.minRatio>t.maxRatio){var a=[t.minRatio,t.maxRatio];t.maxRatio=a[0],t.minRatio=a[1]}return t.minRatio<=0&&(t.minRatio="null"),t.maxRatio>1&&(t.maxRatio="null"),c.a.postWithUploadFile("DCache.php?op=updateDCacheColor",t,{showLoading:!0})},remove:function(t){return c.a.post("DCache.php?op=deleteDCacheColor",{id:t})},load:function(){var t=Object(l["a"])(regeneratorRuntime.mark((function t(a){var e,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("DCache.php",Object(r["a"])({op:"showDCacheColor"},a));case 2:for(o in e=t.sent.content,console.log("load tempItem before",e),e)console.log("show tempItem i",e[o]),null===e[o].minRatio&&(e[o].minRatio="- min"),null===e[o].maxRatio&&(e[o].maxRatio="+ max");return console.log("load tempItem after",e),t.abrupt("return",e);case 7:case"end":return t.stop()}}),t)})));function a(a){return t.apply(this,arguments)}return a}()},s=i["IKDataEntity"].ModelFactory(u,p),d={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:s}}},R=d,f=e("2877"),h=e("6544"),x=e.n(h),C=e("a523"),g=Object(f["a"])(R,o,n,!1,null,"5da30e10",null);a["default"]=g.exports;x()(g,{VContainer:C["a"]})}}]);
//# sourceMappingURL=chunk-2d0abc56.24de96fb.js.map