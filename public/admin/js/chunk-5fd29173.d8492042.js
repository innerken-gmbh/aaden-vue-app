(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5fd29173"],{"4c03":function(e,t,a){"use strict";a("a15b"),a("96cf");var n=a("1da1"),r=a("5530"),o=a("633c"),i=a("ebc9"),p=a("b0d9"),s=a("a86d"),u=a("3405"),d=a("6f56"),l={id:{type:o["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},categorySort:{type:o["a"].Types.Integer,displayName:"sectionSort",formConfig:{default:50,required:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:o["a"].Types.Group,formConfig:{groupName:"labelName",default:u["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===u["a"].lang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[s["a"],s["a"],s["a"]],header:!1},dishesCategoryTypeId:{displayName:"labelType",type:o["a"].Types.Option,formConfig:{type:{selectItems:i["a"].getList}}},attributeGroupId:{displayName:"attributeGroupNames",type:o["a"].Types.Option,formConfig:{required:!1,type:{selectItems:p["a"].getList,multiple:!0}}},consumeTypeIds:{type:o["a"].Types.Option,formConfig:{required:!1,type:{selectItems:d["a"].getList,multiple:!0}}},freeInConsumeTypeIds:{type:o["a"].Types.Option,formConfig:{required:!1,type:{selectItems:d["a"].getList,multiple:!0}}},color:{type:o["a"].Types.Color,formConfig:{required:!1}},printOrder:{type:o["a"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}}},c={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),o["e"].post("Category.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),o["e"].postWithUploadFile("Category.php?op=update",Object(r["a"])(Object(r["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return o["e"].post("Category.php?op=delete",{id:e})},load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["e"].get("Category.php",Object(r["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["a"].ModelFactory(l,c)},"62fb":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{ref:"table",attrs:{model:e.model,"entity-name":e.$t("标签管理"),icon:"mdi-label"},on:{reloaded:e.reloaded}})],1)],1)},r=[],o=a("633c"),i=a("4c03"),p={components:{IkDataTable:o["c"]},data:function(){return{model:i["a"]}},methods:{reloaded:function(){}}},s=p,u=a("2877"),d=a("6544"),l=a.n(d),c=a("a523"),y=Object(u["a"])(s,n,r,!1,null,null,null);t["default"]=y.exports;l()(y,{VContainer:c["a"]})},"6f56":function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("633c"),i={id:{type:o["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"staffName"},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"}},p={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["e"].get("Complex.php",Object(n["a"])({op:"showAllConsumeTypeInfo"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return o["e"].post("ConsumeType.php?op=add",Object(n["a"])(Object(n["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return o["e"].postWithUploadFile("ConsumeType.php?op=update",Object(n["a"])(Object(n["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return o["e"].post("ConsumeType.php?op=delete",{id:e})}};t["a"]=o["a"].ModelFactory(i,p)},a86d:function(e,t,a){"use strict";var n=a("633c"),r={id:{type:n["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=n["a"].ModelFactory(r,{})},b0d9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("3405"),i=a("633c"),p={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:i["a"].Types.Boolean},multiSelect:{type:i["a"].Types.Boolean}},s={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Category.php",Object(n["a"])({op:"showAttributeGroup",lang:o["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return i["e"].postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return i["e"].postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return i["e"].post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=i["a"].ModelFactory(p,s)},ebc9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("3405"),i=a("633c"),p={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},s={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("CategoryType.php",Object(n["a"])({lang:o["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["a"].ModelFactory(p,s)}}]);
//# sourceMappingURL=chunk-5fd29173.d8492042.js.map