(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-02143598","chunk-2d20862b"],{2750:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[e("v-container",{attrs:{fluid:""}},[e("ik-data-table",{attrs:{model:t.model,icon:"mdi-card-account-details-outline","entity-name":t.$t("用户信息")}})],1)],1)},r=[],i=e("f4d6"),o=e("5530"),s=(e("96cf"),e("1da1")),d=e("9d8f"),c=e.n(d),l={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},email:{displayName:"emailAddress"},password:{displayName:"password"},rawInfo:{displayName:"rawInfo"}},u={add:function(t){return c.a.post("Takeaway.php?op=addUsers",t,{showLoading:!0})},edit:function(t){return c.a.postWithUploadFile("Takeaway.php?op=updateUsers",t,{showLoading:!0})},remove:function(t){return c.a.post("Takeaway.php?op=deleteUsers",{id:t})},load:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(a){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("Takeaway.php?op=showAllUsers",Object(o["a"])({},a));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function a(a){return t.apply(this,arguments)}return a}()},p=i["IKDataEntity"].ModelFactory(l,u),f={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:p}}},m=f,g=e("2877"),y=e("6544"),h=e.n(y),w=e("a523"),b=Object(g["a"])(m,n,r,!1,null,null,null);a["default"]=b.exports;h()(b,{VContainer:w["a"]})},a523:function(t,a,e){"use strict";e("99af"),e("4de4"),e("b64b"),e("2ca0"),e("20f6"),e("4b85"),e("a15b"),e("498a");var n=e("2b0e");function r(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(a,e){var n=e.props,r=e.data,i=e.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var o=r.attrs;if(o){r.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var a=o[t];return t.startsWith("data-")?(r.attrs[t]=a,!1):a||"string"===typeof a}));s.length&&(r.staticClass+=" ".concat(s.join(" ")))}return n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),a(n.tag,r,i)}})}var i=e("d9f7");a["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,a){var e,n=a.props,r=a.data,o=a.children,s=r.attrs;return s&&(r.attrs={},e=Object.keys(s).filter((function(t){if("slot"===t)return!1;var a=s[t];return t.startsWith("data-")?(r.attrs[t]=a,!1):a||"string"===typeof a}))),n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),t(n.tag,Object(i["a"])(r,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(e||[])}),o)}})}}]);
//# sourceMappingURL=chunk-02143598.2b959816.js.map