(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-021431e6"],{"26c8":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[e("v-container",{attrs:{fluid:""}},[e("ik-data-table",{attrs:{"entity-name":t.$t("CoronaInfo"),model:t.model,icon:"mdi-food-fork-drink"}})],1)],1)},r=[],o=e("f4d6"),i=e("5530"),s=(e("96cf"),e("1da1")),c=e("9d8f"),d=e.n(c),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",form:!1},firstName:{displayName:"Vorname"},lastName:{displayName:"Nachname"},address:{displayName:"Addresse"},eatTime:{type:o["IKDataEntity"].Types.Time,displayName:"Essenszeit"},phone:{displayName:"Telephone"}},p="corona",l={add:function(t){return d.a.post("Route.php?op=".concat(p,"add"),t,{showLoading:!0})},edit:function(t){return d.a.post("Route.php?op=".concat(p,"update"),t,{showLoading:!0})},remove:function(t){return d.a.post("Route.php?op=".concat(p,"delete"),{id:t})},load:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("Route.php?op=".concat(p,"list"),Object(i["a"])({},a));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function a(a){return t.apply(this,arguments)}return a}()},f=o["IKDataEntity"].ModelFactory(u,l),m={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:f}}},y=m,h=e("2877"),g=e("6544"),v=e.n(g),b=e("a523"),k=Object(h["a"])(y,n,r,!1,null,null,null);a["default"]=k.exports;v()(k,{VContainer:b["a"]})},a523:function(t,a,e){"use strict";e("99af"),e("4de4"),e("b64b"),e("2ca0"),e("20f6"),e("4b85"),e("a15b"),e("498a");var n=e("2b0e");function r(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(a,e){var n=e.props,r=e.data,o=e.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var i=r.attrs;if(i){r.attrs={};var s=Object.keys(i).filter((function(t){if("slot"===t)return!1;var a=i[t];return t.startsWith("data-")?(r.attrs[t]=a,!1):a||"string"===typeof a}));s.length&&(r.staticClass+=" ".concat(s.join(" ")))}return n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),a(n.tag,r,o)}})}var o=e("d9f7");a["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,a){var e,n=a.props,r=a.data,i=a.children,s=r.attrs;return s&&(r.attrs={},e=Object.keys(s).filter((function(t){if("slot"===t)return!1;var a=s[t];return t.startsWith("data-")?(r.attrs[t]=a,!1):a||"string"===typeof a}))),n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),t(n.tag,Object(o["a"])(r,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(e||[])}),i)}})}}]);
//# sourceMappingURL=chunk-021431e6.459b9160.js.map