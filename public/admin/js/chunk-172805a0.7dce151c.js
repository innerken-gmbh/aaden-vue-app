(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-172805a0"],{"52ab":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:e.model,icon:"mdi-cash-usd","entity-name":e.$t("TaxSetting"),"use-delete-action":!1},scopedSlots:e._u([{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0}])})],1)],1)},r=[],i=a("f4d6"),o=a("5530"),s=(a("96cf"),a("1da1")),p=a("5089"),l=a("9d8f"),u=a.n(l),c=a("6f56"),d=a("ebc9"),f={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},consumeTypeId:{type:i["IKDataEntity"].Types.Option,formConfig:{requiredEdit:!1,type:{selectItems:c["a"].getList}}},dishesCategoryTypeId:{displayName:"warengruppe",type:i["IKDataEntity"].Types.Option,formConfig:{requiredEdit:!1,type:{selectItems:d["a"].getList}}},taxRateValue:{}},g={edit:function(e){return u.a.postWithUploadFile("TaxRate.php?op=update",e,{showLoading:!0})},load:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("TaxRate.php?",Object(o["a"])({op:"getList",lang:p["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},y=i["IKDataEntity"].ModelFactory(f,g),m={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:y}}},b=m,h=a("2877"),C=a("6544"),w=a.n(C),I=a("a523"),T=a("71d9"),N=Object(h["a"])(b,n,r,!1,null,null,null);t["default"]=N.exports;w()(N,{VContainer:I["a"],VToolbar:T["a"]})},"6f56":function(e,t,a){"use strict";a("4160"),a("b0c0"),a("07ac"),a("159b");var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),s=a.n(o),p=a("5089"),l=a("a86d"),u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},langs:{displayName:"name",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"name",default:p["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===p["b"].getLang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[l["a"],l["a"],l["a"]],header:!1},name:{displayName:"shownName",form:!1},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}}},c={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Complex.php",Object(n["a"])({op:"showAllConsumeTypeInfo",lang:p["b"].getLang()},t));case 2:return a=e.sent.content,console.log(a,"response"),a.forEach((function(e){e.langs=Object.values(e.langs)})),e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return e.name=e.langs[2].name,s.a.post("ConsumeType.php?op=add",Object(n["a"])(Object(n["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.name=e.langs[2].name,s.a.postWithUploadFile("ConsumeType.php?op=update",Object(n["a"])(Object(n["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return s.a.post("ConsumeType.php?op=delete",{id:e})}};t["a"]=i["IKDataEntity"].ModelFactory(u,c)},a86d:function(e,t,a){"use strict";var n=a("f4d6"),r={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=n["IKDataEntity"].ModelFactory(r,{})},ebc9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),s=a("9d8f"),p=a.n(s),l={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},u={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("CategoryType.php",Object(n["a"])({lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(l,u)}}]);
//# sourceMappingURL=chunk-172805a0.7dce151c.js.map