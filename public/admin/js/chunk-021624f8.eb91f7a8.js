(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-021624f8","chunk-2d20862b"],{"034a":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:t.model,"entity-name":t.$t("配送距离"),icon:"mdi-truck"}})],1)],1)},n=[],i=a("f4d6"),o=a("5530"),s=(a("96cf"),a("1da1")),c=a("9d8f"),d=a.n(c),l=[function(t){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(t)||"please enter the correct price"}],u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},PLZArea:{displayName:"plzArea"},name:{displayName:"delivname"},priceMod:{displayName:"priceMod",formConfig:{rule:l}},freePrice:{displayName:"freePrice",formConfig:{rule:l}},startPrice:{displayName:"startPrice",formConfig:{rule:l}}},p={add:function(t){return d.a.post("Takeaway.php?op=addDeliveryArea",t,{showLoading:!0})},edit:function(t){return d.a.postWithUploadFile("Takeaway.php?op=updateDeliveryArea",t,{showLoading:!0})},remove:function(t){return d.a.post("Takeaway.php?op=deleteDeliveryArea",{id:t})},load:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("Takeaway.php?op=showAllDeliveryArea",Object(o["a"])({},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},f=i["IKDataEntity"].ModelFactory(u,p),m={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:f}}},y=m,g=a("2877"),v=a("6544"),h=a.n(v),b=a("a523"),w=Object(g["a"])(y,r,n,!1,null,null,null);e["default"]=w.exports;h()(w,{VContainer:b["a"]})},a523:function(t,e,a){"use strict";a("99af"),a("4de4"),a("b64b"),a("2ca0"),a("20f6"),a("4b85"),a("a15b"),a("498a");var r=a("2b0e");function n(t){return r["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var r=a.props,n=a.data,i=a.children;n.staticClass="".concat(t," ").concat(n.staticClass||"").trim();var o=n.attrs;if(o){n.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(n.staticClass+=" ".concat(s.join(" ")))}return r.id&&(n.domProps=n.domProps||{},n.domProps.id=r.id),e(r.tag,n,i)}})}var i=a("d9f7");e["a"]=n("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,r=e.props,n=e.data,o=e.children,s=n.attrs;return s&&(n.attrs={},a=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}))),r.id&&(n.domProps=n.domProps||{},n.domProps.id=r.id),t(r.tag,Object(i["a"])(n,{staticClass:"container",class:Array({"container--fluid":r.fluid}).concat(a||[])}),o)}})}}]);
//# sourceMappingURL=chunk-021624f8.eb91f7a8.js.map