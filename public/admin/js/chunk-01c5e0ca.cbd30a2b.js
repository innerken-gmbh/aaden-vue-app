(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01c5e0ca","chunk-2d20862b"],{"6e35":function(t,a,e){"use strict";var n=e("5530"),r=(e("96cf"),e("1da1")),i=e("f4d6"),s=e("9d8f"),o=e.n(s),d={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"allergName"},icon:{displayName:"icon"},shortName:{displayName:"shortName"},displayText:{displayName:"displayText"}},c={add:function(t){return o.a.postWithUploadFile("Dishes.php?op=addAllergen",t,{showLoading:!0})},edit:function(t){return o.a.postWithUploadFile("Dishes.php?op=updateAllergen",t,{showLoading:!0})},remove:function(t){return o.a.post("Dishes.php?op=deleteAllergen",{id:t})},load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("Dishes.php",Object(n["a"])({op:"showAllAllergen"},a));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function a(a){return t.apply(this,arguments)}return a}()};a["a"]=i["IKDataEntity"].ModelFactory(d,c)},a523:function(t,a,e){"use strict";e("99af"),e("4de4"),e("b64b"),e("2ca0"),e("20f6"),e("4b85"),e("a15b"),e("498a");var n=e("2b0e");function r(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(a,e){var n=e.props,r=e.data,i=e.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var s=r.attrs;if(s){r.attrs={};var o=Object.keys(s).filter((function(t){if("slot"===t)return!1;var a=s[t];return t.startsWith("data-")?(r.attrs[t]=a,!1):a||"string"===typeof a}));o.length&&(r.staticClass+=" ".concat(o.join(" ")))}return n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),a(n.tag,r,i)}})}var i=e("d9f7");a["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,a){var e,n=a.props,r=a.data,s=a.children,o=r.attrs;return o&&(r.attrs={},e=Object.keys(o).filter((function(t){if("slot"===t)return!1;var a=o[t];return t.startsWith("data-")?(r.attrs[t]=a,!1):a||"string"===typeof a}))),n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),t(n.tag,Object(i["a"])(r,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(e||[])}),s)}})},faf4:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[e("v-container",{attrs:{fluid:""}},[e("ik-data-table",{attrs:{model:t.model,icon:"mdi-chart-bubble","entity-name":t.$t("过敏源")}})],1)],1)},r=[],i=e("f4d6"),s=e("6e35"),o={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:s["a"]}}},d=o,c=e("2877"),l=e("6544"),u=e.n(l),p=e("a523"),f=Object(c["a"])(d,n,r,!1,null,null,null);a["default"]=f.exports;u()(f,{VContainer:p["a"]})}}]);
//# sourceMappingURL=chunk-01c5e0ca.cbd30a2b.js.map