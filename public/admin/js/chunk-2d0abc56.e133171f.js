(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0abc56"],{1760:function(t,a,e){"use strict";e.r(a);var o=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",[e("ik-data-table",{ref:"thresholdColor",attrs:{model:t.model,"entity-name":t.$t("阈值颜色"),icon:"mdi-heart"},scopedSlots:t._u([{key:"footer",fn:function(){return[e("v-btn",{staticClass:"red ml-2",on:{click:t.reset}},[t._v(" "+t._s(t.$t("重置菜品阈值"))+" ")])]},proxy:!0}])})],1)},n=[],r=e("c7eb"),i=e("1da1"),c=e("f4d6"),l=e("b85c"),p=e("5530"),s=(e("4e827"),e("c740"),e("fb6a"),e("7db0"),e("d3b7"),e("e9c4"),e("9d8f")),h=e.n(s),u=e("2ef0"),d=e.n(u),f=e("641f"),m=e.n(f),C={id:{type:c["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},ratio:{displayName:"ratio",formConfig:{required:!0,overwriteRule:!1},form:!1},color:{type:c["IKDataEntity"].Types.Color,formConfig:{required:!0}}},R={add:function(){var t=Object(i["a"])(Object(r["a"])().mark((function t(a){var e,o,n;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e=[],t.next=3,h.a.get("DCache.php",{op:"showDCacheColor"});case 3:if(o=t.sent.content,console.log("tempList 1",o),!(o.length<=0)){t.next=9;break}return t.abrupt("return",[]);case 9:console.log("sortedArray 2 before",o),e=o.sort((function(t,a){var e=t.maxRatio,o=a.maxRatio;return!o||parseFloat(e)<parseFloat(o)?-1:!e||parseFloat(e)>parseFloat(o)?1:0})),console.log("sortedArray 3 after",e);case 12:if(!(d.a.findIndex(e,(function(t){return t.maxRatio===a.Ratio}))>=0)){t.next=17;break}return console.log("they are the same"),t.abrupt("return",!0);case 17:return console.log("sorted -1 Array",d.a.slice(e,0,e.length-1)),n=d.a.findIndex(d.a.slice(e,0,e.length-1),(function(t){return t.maxRatio<a.Ratio})),console.log("colorIndex",n),n<=-1?(a.minRatio=null,a.maxRatio=a.Ratio,e[0].minRatio=a.Ratio,console.log("colorIndex item",a),h.a.postWithUploadFile("DCache.php?op=updateDCacheColor",e[0],{showLoading:!0})):(a.minRatio=e[n].maxRatio,a.maxRatio=a.Ratio,e[n+1].minRatio=a.Ratio,h.a.postWithUploadFile("DCache.php?op=updateDCacheColor",e[n],{showLoading:!0}),h.a.postWithUploadFile("DCache.php?op=updateDCacheColor",e[n+1],{showLoading:!0})),h.a.postWithUploadFile("DCache.php?op=createDCacheColor",a,{showLoading:!0}),t.abrupt("return",!0);case 23:case"end":return t.stop()}}),t)})));function a(a){return t.apply(this,arguments)}return a}(),edit:function(t){return"+Infi"===t.Ratio?t.maxRatio=null:t.maxRatio=t.Ratio,h.a.postWithUploadFile("DCache.php?op=updateDCacheColor",t,{showLoading:!0})},remove:function(){var t=Object(i["a"])(Object(r["a"])().mark((function t(a){var e,o,n,i;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h.a.get("DCache.php",{op:"showDCacheColor"});case 2:return e=t.sent.content,o=e.find((function(t){return t.id===JSON.stringify(a)})),o.maxRatio?(i=e.find((function(t){return t.minRatio===o.maxRatio})),i.minRatio=o.minRatio,h.a.postWithUploadFile("DCache.php?op=updateDCacheColor",i,{showLoading:!0})):(n=e.find((function(t){return t.maxRatio===o.minRatio})),n.maxRatio=null,h.a.postWithUploadFile("DCache.php?op=updateDCacheColor",n,{showLoading:!0})),h.a.post("DCache.php?op=deleteDCacheColor",{id:a}),t.abrupt("return",!0);case 7:case"end":return t.stop()}}),t)})));function a(a){return t.apply(this,arguments)}return a}(),load:function(){var t=Object(i["a"])(Object(r["a"])().mark((function t(a){var e,o,n;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h.a.get("DCache.php",Object(p["a"])({op:"showDCacheColor"},a));case 2:if(e=t.sent.content,console.log("tempItem",e),o=null,e.length<=0)h.a.postWithUploadFile("DCache.php?op=createDCacheColor",{minRatio:null,maxRatio:1,Ratio:1,color:"#E57373"},{showLoading:!0}),h.a.postWithUploadFile("DCache.php?op=createDCacheColor",{minRatio:1,maxRatio:null,Ratio:"+Infi",color:"#A5D6A7"},{showLoading:!0});else if(1===e.length)o=e[0],o.minRatio?o.maxRatio?(h.a.postWithUploadFile("DCache.php?op=createDCacheColor",{minRatio:o.maxRatio,maxRatio:null,Ratio:"+Infi",color:"#A5D6A7"},{showLoading:!0}),h.a.postWithUploadFile("DCache.php?op=createDCacheColor",{minRatio:null,maxRatio:o.minRatio,Ratio:"-Infi",color:"#E57373"},{showLoading:!0})):h.a.postWithUploadFile("DCache.php?op=createDCacheColor",{minRatio:null,maxRatio:o.minRatio,Ratio:"-Infi",color:"#E57373"},{showLoading:!0}):h.a.postWithUploadFile("DCache.php?op=createDCacheColor",{minRatio:o.maxRatio,maxRatio:null,Ratio:"+Infi",color:"#A5D6A7"},{showLoading:!0});else for(n in o=e,o)o[n].maxRatio?o[n].Ratio=o[n].maxRatio:o[n].Ratio="+Infi";return console.log("load tempItem",o),t.abrupt("return",o);case 8:case"end":return t.stop()}}),t)})));function a(a){return t.apply(this,arguments)}return a}(),getSortedColorList:function(){var t=Object(i["a"])(Object(r["a"])().mark((function t(){var a,e;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h.a.get("DCache.php",{op:"showDCacheColor"});case 2:if(a=t.sent.content,!(a.length<=0)){t.next=7;break}return t.abrupt("return",[]);case 7:return e=a.sort((function(t,a){var e=t.maxRatio,o=a.maxRatio;return o&&e<o?-1:e&&e>o?1:0})),console.log("getSortedList",a),t.abrupt("return",e);case 10:case"end":return t.stop()}}),t)})));function a(){return t.apply(this,arguments)}return a}(),resetColorList:function(){var t=Object(i["a"])(Object(r["a"])().mark((function t(){var a,e,o,n;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,h.a.get("DCache.php",{op:"showDCacheColor"});case 2:a=t.sent.content,m.a.showLoading(!0),e=Object(l["a"])(a);try{for(e.s();!(o=e.n()).done;)n=o.value,h.a.post("DCache.php?op=deleteDCacheColor",{id:n.id})}catch(r){e.e(r)}finally{e.f()}h.a.postWithUploadFile("DCache.php?op=createDCacheColor",{minRatio:null,maxRatio:1,Ratio:1,color:"#E57373"},{}),h.a.postWithUploadFile("DCache.php?op=createDCacheColor",{minRatio:1,maxRatio:null,Ratio:"+Infi",color:"#A5D6A7"},{}),m.a.toast("OK");case 9:case"end":return t.stop()}}),t)})));function a(){return t.apply(this,arguments)}return a}()},D=c["IKDataEntity"].ModelFactory(C,R),x={components:{IkDataTable:c["IkDataTable"]},data:function(){return{model:D}},methods:{reset:function(){var t=this;return Object(i["a"])(Object(r["a"])().mark((function a(){return Object(r["a"])().wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,t.model.resetColorList();case 2:t.$refs.thresholdColor.reload();case 3:case"end":return a.stop()}}),a)})))()}}},b=x,w=e("2877"),g=e("6544"),v=e.n(g),y=e("8336"),O=Object(w["a"])(b,o,n,!1,null,"35dfe1ad",null);a["default"]=O.exports;v()(O,{VBtn:y["a"]})}}]);
//# sourceMappingURL=chunk-2d0abc56.e133171f.js.map