(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7a8be86b"],{"5df9":function(t,n,e){"use strict";e.r(n);var a=function(){var t=this,n=t.$createElement,e=t._self._c||n;return e("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[e("v-container",{attrs:{fluid:""}},[e("ik-data-table",{ref:"zbon",attrs:{"use-default-action":!1,model:t.Zbon,"use-select":!1,"entity-name":t.$t("Zbon列表"),icon:"mdi-format-list-bulleted"},scopedSlots:t._u([{key:"footer",fn:function(){return[e("v-toolbar",{attrs:{color:"white",flat:""}},[e("v-spacer"),e("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:function(n){return t.print()}}},[t._v(" "+t._s(t.$t("打印"))+" ")])],1)]},proxy:!0},{key:"item.action",fn:function(n){var a=n.item;return[e("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(n){return t.printSingleItem(a)}}},[t._v(" mdi-printer ")])]}}])})],1)],1)},r=[],i=e("0a61"),c=e("ccdd"),o=(e("d81d"),e("5530")),s=(e("96cf"),e("1da1")),u=e("3405"),l=e("633c"),d={id:{type:l["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},lastPrintTimeStamp:{},createTimeStamp:{},printTimeStamp:{}},f={load:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(n){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l["e"].get("ZBon.php",Object(o["a"])({lang:u["a"].lang()},n));case 2:return t.abrupt("return",t.sent.content.map((function(t){return l["a"].parseDataForEntity(t,d)})));case 3:case"end":return t.stop()}}),t)})));function n(n){return t.apply(this,arguments)}return n}()},p=l["a"].ModelFactory(d,f),m={components:{IkDataTable:l["c"]},data:function(){return{Zbon:p}},methods:{print:function(){var t=this;c["a"].showConfirm("Bist du sicher?","Möchten Sie alle Datensätze drucken?",(function(){Object(i["c"])().then((function(){c["a"].toast("Erfolgreich drucken!"),t.$refs.zbon.reload()}))}))},printSingleItem:function(t){var n=this;c["a"].showConfirm("Bist du sicher?","Möchten Sie dieser Rekord drucken?",(function(){Object(i["t"])(t.id).then((function(){c["a"].toast("Erfolgreich drucken!"),n.$refs.zbon.reload()}))}))}}},b=m,h=e("2877"),k=e("6544"),v=e.n(k),g=e("8336"),w=e("a523"),y=e("132d"),S=e("2fa4"),C=e("71d9"),j=Object(h["a"])(b,a,r,!1,null,null,null);n["default"]=j.exports;v()(j,{VBtn:g["a"],VContainer:w["a"],VIcon:y["a"],VSpacer:S["a"],VToolbar:C["a"]})},ccdd:function(t,n,e){"use strict";var a=e("5530"),r=e("633c");n["a"]=Object(a["a"])({},r["b"])}}]);
//# sourceMappingURL=chunk-7a8be86b.70a5a46d.js.map