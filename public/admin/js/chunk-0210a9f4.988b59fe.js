(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0210a9f4","chunk-2d20862b"],{"640d":function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[e("v-container",{attrs:{fluid:""}},[e("ik-data-table",{attrs:{model:t.model,icon:"mdi-calendar-today","entity-name":t.$t("轮播图")}})],1)],1)},r=[],i=e("f4d6"),o=(e("96cf"),e("1da1")),s=e("5530"),d=e("9d8f"),c=e.n(d),u=e("5089"),p=e("c0d6"),l={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},image:{type:i["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return p["a"].getters.rootUrl+u["b"].bannerImageRoot}},required:!1},displayName:"image"},sort:{displayName:"Ordnung",type:i["IKDataEntity"].Types.Integer,formConfig:{}},remark:{type:i["IKDataEntity"].Types.String,displayName:"remark",formConfig:{required:!1}}},f={add:function(t){return c.a.postWithUploadFile("Restaurant.php?op=addGiraffeBannerImage",Object(s["a"])({},t),{showLoading:!0})},edit:function(t){return c.a.postWithUploadFile("Restaurant.php?op=modifyRestaurantImage",Object(s["a"])(Object(s["a"])({},t),{},{params:JSON.stringify(t)}),{showLoading:!0})},remove:function(t){return c.a.post("Restaurant.php?op=deleteGiraffeBannerImage",{id:t})},load:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("Restaurant.php?op=showGiraffeBannerImage",{});case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function a(){return t.apply(this,arguments)}return a}()},m=i["IKDataEntity"].ModelFactory(l,f),g={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:m}}},y=g,b=e("2877"),h=e("6544"),v=e.n(h),I=e("a523"),k=Object(b["a"])(y,n,r,!1,null,null,null);a["default"]=k.exports;v()(k,{VContainer:I["a"]})},a523:function(t,a,e){"use strict";e("99af"),e("4de4"),e("b64b"),e("2ca0"),e("20f6"),e("4b85"),e("a15b"),e("498a");var n=e("2b0e");function r(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(a,e){var n=e.props,r=e.data,i=e.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var o=r.attrs;if(o){r.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var a=o[t];return t.startsWith("data-")?(r.attrs[t]=a,!1):a||"string"===typeof a}));s.length&&(r.staticClass+=" ".concat(s.join(" ")))}return n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),a(n.tag,r,i)}})}var i=e("d9f7");a["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,a){var e,n=a.props,r=a.data,o=a.children,s=r.attrs;return s&&(r.attrs={},e=Object.keys(s).filter((function(t){if("slot"===t)return!1;var a=s[t];return t.startsWith("data-")?(r.attrs[t]=a,!1):a||"string"===typeof a}))),n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),t(n.tag,Object(i["a"])(r,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(e||[])}),o)}})}}]);
//# sourceMappingURL=chunk-0210a9f4.988b59fe.js.map