(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-51d12fa3"],{"55c8":function(t,e,n){"use strict";var r=n("5530"),a=(n("96cf"),n("1da1")),i=n("5089"),o=n("f4d6"),c=n("9d8f"),u=n.n(c),s={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},lastPrintTimeStamp:{},createTimeStamp:{},printTimeStamp:{}},l={load:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.a.get("ZBon.php",Object(r["a"])({lang:i["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),outputMultiplePDF:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.a.get("ZBon.php?op=outputMultiplePDF",{idStrings:e});case 2:return t.abrupt("return",t.sent);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=o["IKDataEntity"].ModelFactory(s,l)},"5df9":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("ik-data-table",{ref:"zbon",attrs:{"use-default-action":!1,model:t.Zbon,"use-select":!0,"entity-name":t.$t("Zbon列表"),icon:"mdi-format-list-bulleted","use-customer-action-only":!0},scopedSlots:t._u([{key:"footer",fn:function(){return[n("v-btn",{staticClass:"mr-2",attrs:{color:"success",dark:""},on:{click:function(e){return t.outputPdf()}}},[t._v(" "+t._s(t.$t("PDF"))+" ")]),n("v-btn",{staticClass:"mr-2",attrs:{color:"primary",dark:""},on:{click:function(e){return t.print()}}},[t._v(" "+t._s(t.$t("打印"))+" ")])]},proxy:!0},{key:"item.action",fn:function(e){var r=e.item;return[n("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.printSingleItem(r)}}},[t._v(" mdi-printer ")]),n("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.generateZBonPDF(r)}}},[t._v(" mdi-file-pdf-box ")])]}}])})},a=[],i=(n("a15b"),n("13d5"),n("96cf"),n("1da1")),o=n("0a61"),c=n("ccdd"),u=n("55c8"),s=n("f4d6"),l=n("5089"),d={components:{IkDataTable:s["IkDataTable"]},data:function(){return{Zbon:u["a"]}},methods:{print:function(){var t=this;c["a"].showConfirm("Bist du sicher?","Möchten Sie alle Datensätze drucken?",(function(){Object(o["b"])().then((function(){c["a"].toast("Erfolgreich drucken!"),t.$refs.zbon.reload()}))}))},generateZBonPDF:function(t){return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:window.open(l["b"].getEndPoint()+"ZBon.php?op=exportPDF&id="+t.id);case 1:case"end":return e.stop()}}),e)})))()},outputPdf:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=t.$refs.zbon.$data.selectedItems.reduce((function(t,e){return t.push(e.id),t}),[]).join(","),console.log(n),t.Zbon.outputMultiplePDF(n);case 3:case"end":return e.stop()}}),e)})))()},printSingleItem:function(t){var e=this;c["a"].showConfirm("Bist du sicher?","Möchten Sie dieser Rekord drucken?",(function(){Object(o["K"])(t.id).then((function(){c["a"].toast("Erfolgreich drucken!"),e.$refs.zbon.reload()}))}))}}},f=d,p=n("2877"),m=n("6544"),b=n.n(m),h=n("8336"),g=n("132d"),k=Object(p["a"])(f,r,a,!1,null,null,null);e["default"]=k.exports;b()(k,{VBtn:h["a"],VIcon:g["a"]})},ccdd:function(t,e,n){"use strict";var r=n("5530"),a=n("641f"),i=n.n(a);e["a"]=Object(r["a"])({},i.a)}}]);
//# sourceMappingURL=chunk-51d12fa3.0da92cb1.js.map