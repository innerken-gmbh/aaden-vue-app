(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f679554","chunk-2d20862b"],{a523:function(t,e,a){"use strict";a("99af"),a("4de4"),a("b64b"),a("2ca0"),a("20f6"),a("4b85"),a("a15b"),a("498a");var n=a("2b0e");function r(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var n=a.props,r=a.data,i=a.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var o=r.attrs;if(o){r.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(r.staticClass+=" ".concat(s.join(" ")))}return n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),e(n.tag,r,i)}})}var i=a("d9f7");e["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,n=e.props,r=e.data,o=e.children,s=r.attrs;return s&&(r.attrs={},a=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}))),n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),t(n.tag,Object(i["a"])(r,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(a||[])}),o)}})},a86d:function(t,e,a){"use strict";var n=a("f4d6"),r={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};e["a"]=n["IKDataEntity"].ModelFactory(r,{})},fde5:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:t.model,"entity-name":t.$t("自由信息单"),"use-select":!0,icon:"mdi-format-list-bulleted"}})],1)},r=[],i=(a("96cf"),a("1da1")),o=a("5530"),s=a("f4d6"),d=a("9d8f"),c=a.n(d),l=a("5089"),p=a("a86d"),u={id:{type:s["IKDataEntity"].Types.Integer,tableConfig:{align:"start"},header:!0},sort:{type:s["IKDataEntity"].Types.Integer},_langsname:{displayName:"name",form:!1},langs:{displayName:"name",type:s["IKDataEntity"].Types.Group,formConfig:{groupName:"name",default:l["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(t){return t.lang.toUpperCase()===l["b"].getLang().toUpperCase()},displayChild:function(t){return"name"===t}},childKey:["name"],labelKey:"lang",children:[p["a"],p["a"],p["a"]],header:!1}},f={add:function(t){return c.a.post("FreeInformation.php?op=add",Object(o["a"])(Object(o["a"])({},t),{},{langs:JSON.stringify(t.langs)}))},remove:function(t){return-9!==t&&-10!==t&&c.a.post("FreeInformation.php?op=delete",{id:t})},edit:function(t){return-9!==t.id&&-10!==t.id&&(console.log("edit item",t),c.a.postWithUploadFile("FreeInformation.php?op=update",Object(o["a"])(Object(o["a"])({},t),{},{langs:JSON.stringify(t.langs)})))},load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("FreeInformation.php",e);case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},m=s["IKDataEntity"].ModelFactory(u,f),g={name:"FreeInfoSheetVue",components:{IkDataTable:s["IkDataTable"]},data:function(){return{model:m}},methods:{}},y=g,b=a("2877"),h=a("6544"),v=a.n(h),I=a("a523"),C=Object(b["a"])(y,n,r,!1,null,"42f473bf",null);e["default"]=C.exports;v()(C,{VContainer:I["a"]})}}]);
//# sourceMappingURL=chunk-6f679554.16e58ce1.js.map