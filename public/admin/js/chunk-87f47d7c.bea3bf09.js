(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-87f47d7c"],{"52ab":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:t.model,icon:"mdi-cash-usd","entity-name":t.$t("TaxSetting"),"use-delete-action":!1},scopedSlots:t._u([{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0}])})],1)],1)},r=[],i=a("f4d6"),o=a("c7eb"),s=a("5530"),c=a("1da1"),d=a("5089"),p=a("9d8f"),l=a.n(p),u=a("6f56"),f=a("ebc9"),g={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},consumeTypeId:{type:i["IKDataEntity"].Types.Option,formConfig:{requiredEdit:!1,type:{selectItems:u["a"].getList}}},dishesCategoryTypeId:{displayName:"warengruppe",type:i["IKDataEntity"].Types.Option,formConfig:{requiredEdit:!1,type:{selectItems:f["a"].getList}}},taxRateValue:{}},y={edit:function(t){return l.a.postWithUploadFile("TaxRate.php?op=update",t,{showLoading:!0})},load:function(){var t=Object(c["a"])(Object(o["a"])().mark((function t(e){return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l.a.get("TaxRate.php?",Object(s["a"])({op:"getList",lang:d["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},m=i["IKDataEntity"].ModelFactory(g,y),b={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:m}}},h=b,C=a("2877"),v=a("6544"),w=a.n(v),O=a("a523"),I=a("71d9"),j=Object(C["a"])(h,n,r,!1,null,null,null);e["default"]=j.exports;w()(j,{VContainer:O["a"],VToolbar:I["a"]})},"6f56":function(t,e,a){"use strict";var n=a("c7eb"),r=a("5530"),i=a("1da1"),o=(a("d3b7"),a("159b"),a("07ac"),a("b0c0"),a("e9c4"),a("f4d6")),s=a("9d8f"),c=a.n(s),d=a("5089"),p=a("a86d"),l={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},langs:{displayName:"name",type:o["IKDataEntity"].Types.Group,formConfig:{groupName:"name",default:d["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(t){return t.lang.toUpperCase()===d["b"].getLang()},displayChild:function(t){return"name"===t}},childKey:["name","desc"],labelKey:"lang",children:[p["a"],p["a"],p["a"]],header:!1},name:{displayName:"shownName",form:!1},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"},color:{type:o["IKDataEntity"].Types.Color,formConfig:{required:!1}}},u={load:function(){var t=Object(i["a"])(Object(n["a"])().mark((function t(e){var a;return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("Complex.php",Object(r["a"])({op:"showAllConsumeTypeInfo",lang:d["b"].getLang()},e));case 2:return a=t.sent.content,console.log(a,"response"),a.forEach((function(t){t.langs=Object.values(t.langs)})),t.abrupt("return",a);case 6:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return t.name=t.langs[2].name,c.a.post("ConsumeType.php?op=add",Object(r["a"])(Object(r["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},edit:function(t){return t.name=t.langs[2].name,c.a.postWithUploadFile("ConsumeType.php?op=update",Object(r["a"])(Object(r["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},remove:function(t){return c.a.post("ConsumeType.php?op=delete",{id:t})}};e["a"]=o["IKDataEntity"].ModelFactory(l,u)},a523:function(t,e,a){"use strict";a("4de4"),a("d3b7"),a("b64b"),a("2ca0"),a("99af"),a("20f6"),a("4b85"),a("498a"),a("a15b");var n=a("2b0e");function r(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var n=a.props,r=a.data,i=a.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var o=r.attrs;if(o){r.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(r.staticClass+=" ".concat(s.join(" ")))}return n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),e(n.tag,r,i)}})}var i=a("d9f7");e["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,n=e.props,r=e.data,o=e.children,s=r.attrs;return s&&(r.attrs={},a=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}))),n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),t(n.tag,Object(i["a"])(r,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(a||[])}),o)}})},a86d:function(t,e,a){"use strict";var n=a("f4d6"),r={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};e["a"]=n["IKDataEntity"].ModelFactory(r,{})},ebc9:function(t,e,a){"use strict";var n=a("c7eb"),r=a("5530"),i=a("1da1"),o=a("5089"),s=a("f4d6"),c=a("9d8f"),d=a.n(c),p={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},l={load:function(){var t=Object(i["a"])(Object(n["a"])().mark((function t(e){return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("CategoryType.php",Object(r["a"])({lang:o["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=s["IKDataEntity"].ModelFactory(p,l)}}]);
//# sourceMappingURL=chunk-87f47d7c.bea3bf09.js.map