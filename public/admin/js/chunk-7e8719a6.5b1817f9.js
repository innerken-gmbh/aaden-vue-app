(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e8719a6"],{"4c03":function(e,t,a){"use strict";a("a15b"),a("96cf");var n=a("1da1"),r=a("5530"),i=a("f4d6"),o=a("9d8f"),p=a.n(o),s=a("ebc9"),d=a("b0d9"),u=a("a86d"),l=a("5089"),c={load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Category.php",Object(r["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},y={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:l["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===l["b"].getLang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[u["a"],u["a"],u["a"]],header:!1}},g=i["IKDataEntity"].ModelFactory(y,c),f={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),p.a.post("Category.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),p.a.postWithUploadFile("Category.php?op=update",Object(r["a"])(Object(r["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return p.a.post("Category.php?op=delete",{id:e})},load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Category.php",Object(r["a"])({},t));case 2:return a=e.sent.content,console.log(a,"cate response"),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},m={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:l["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===l["b"].getLang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[u["a"],u["a"],u["a"]],header:!1},dishesCategoryTypeId:{displayName:"labelType",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:s["a"].getList}}},attributeGroupId:{displayName:"attributeGroupNames",type:i["IKDataEntity"].Types.Option,tableConfig:{width:"100px"},formConfig:{required:!1,type:{selectItems:d["a"].getList,multiple:!0}}},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}},printOrder:{type:i["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},parentId:{type:i["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:g.getList,itemText:"_langsname"}},header:!1}};t["a"]=i["IKDataEntity"].ModelFactory(m,f)},"62fb":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("ik-data-table",{ref:"table",staticStyle:{width:"100%"},attrs:{model:e.model,"entity-name":e.$t("标签管理"),icon:"mdi-label"},on:{reloaded:e.reloaded}})],1)},r=[],i=a("f4d6"),o=a("4c03"),p={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:o["a"]}},methods:{reloaded:function(){}}},s=p,d=a("2877"),u=a("6544"),l=a.n(u),c=a("a523"),y=Object(d["a"])(s,n,r,!1,null,null,null);t["default"]=y.exports;l()(y,{VContainer:c["a"]})},a86d:function(e,t,a){"use strict";var n=a("f4d6"),r={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=n["IKDataEntity"].ModelFactory(r,{})},b0d9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),p=a("9d8f"),s=a.n(p),d={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:o["IKDataEntity"].Types.Boolean},multiSelect:{type:o["IKDataEntity"].Types.Boolean},attrubuteCount:{type:o["IKDataEntity"].Types.Integer,form:!1}},u={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Category.php",Object(n["a"])({op:"showAttributeGroup",lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return s.a.postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return s.a.postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return s.a.post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=o["IKDataEntity"].ModelFactory(d,u)},ebc9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),p=a("9d8f"),s=a.n(p),d={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},u={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("CategoryType.php",Object(n["a"])({lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(d,u)}}]);
//# sourceMappingURL=chunk-7e8719a6.5b1817f9.js.map