(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0f15afbf"],{"4c03":function(e,t,r){"use strict";r("a15b"),r("d81d"),r("96cf");var a=r("1da1"),n=r("5530"),i=r("633c"),o=r("ebc9"),p=r("b0d9"),s=r("a86d"),u=r("3405"),d={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:i["a"].Types.Group,formConfig:{groupName:"labelName",default:u["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===u["a"].lang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[s["a"],s["a"],s["a"]],header:!1},dishesCategoryTypeId:{displayName:"labelType",type:i["a"].Types.Option,formConfig:{type:{selectItems:o["a"].getList}}},attributeGroupId:{displayName:"attributeGroupNames",type:i["a"].Types.Option,formConfig:{required:!1,type:{selectItems:p["a"].getList,multiple:!0}}}},l={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,i["e"].post("Category.php?op=add",Object(n["a"])(Object(n["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,i["e"].postWithUploadFile("Category.php?op=update",Object(n["a"])(Object(n["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return i["e"].post("Category.php?op=delete",{id:e})},load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Category.php",Object(n["a"])({},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return i["a"].parseDataForEntity(e,d)})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["a"].ModelFactory(d,l)},6306:function(e,t,r){"use strict";r("d81d");var a=r("5530"),n=(r("96cf"),r("1da1")),i=r("633c"),o={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},name:{displayName:"sectionName"},isSingleLinePrint:{type:i["a"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:i["a"].Types.Boolean,displayName:"isSingleOrderPrint"},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}}},p={load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Printer.php",Object(a["a"])({op:"showPrinterGroups"},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return i["a"].parseDataForEntity(e,o)})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return i["e"].postWithUploadFile("Printer.php?op=addPrinterGroups",e,{showLoading:!0})},edit:function(e){return i["e"].postWithUploadFile("Printer.php?op=updatePrinterGroups",e,{showLoading:!0})},remove:function(e){return i["e"].post("Printer.php?op=deletePrinterGroup",{id:e})}};t["a"]=i["a"].ModelFactory(o,p)},"6e35":function(e,t,r){"use strict";var a=r("5530"),n=(r("96cf"),r("1da1")),i=r("633c"),o={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"allergName"},icon:{displayName:"icon"},shortName:{displayName:"shortName"},displayText:{displayName:"displayText"}},p={add:function(e){return i["e"].postWithUploadFile("Dishes.php?op=addAllergen",e,{showLoading:!0})},edit:function(e){return i["e"].postWithUploadFile("Dishes.php?op=updateAllergen",e,{showLoading:!0})},remove:function(e){return i["e"].post("Dishes.php?op=deleteAllergen",{id:e})},load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Dishes.php",Object(a["a"])({op:"showAllAllergen"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["a"].ModelFactory(o,p)},a86d:function(e,t,r){"use strict";var a=r("633c"),n={id:{type:a["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=a["a"].ModelFactory(n,{})},b0d9:function(e,t,r){"use strict";var a=r("5530"),n=(r("96cf"),r("1da1")),i=r("3405"),o=r("633c"),p={id:{type:o["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},required:{type:o["a"].Types.Boolean},multiSelect:{type:o["a"].Types.Boolean},printTitle:{}},s={load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["e"].get("Category.php",Object(a["a"])({op:"showAttributeGroup",lang:i["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return o["e"].postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return o["e"].postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return o["e"].post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=o["a"].ModelFactory(p,s)},c791:function(e,t,r){"use strict";r("a4d3"),r("e01a"),r("4de4"),r("0481"),r("caad"),r("a15b"),r("d81d"),r("4069"),r("b0c0"),r("ac1f"),r("2532"),r("1276"),r("96cf");var a=r("1da1"),n=r("5530"),i=r("633c"),o=r("3405"),p=r("c0d6"),s=r("4c03"),u=r("6306"),d=r("6e35"),l=r("a86d"),c=r("b0d9"),f={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},code:{},image:{type:i["a"].Types.Image,formConfig:{type:{root:function(){return p["a"].getters.rootUrl+o["a"].dishImageRoot}},required:!1},displayName:"image"},dishName:{displayName:"name",form:!1},langs:{displayName:"name",type:i["a"].Types.Group,formConfig:{groupName:"name",default:o["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===o["a"].lang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[l["a"],l["a"],l["a"]],header:!1},price:{type:i["a"].Types.Float,formConfig:{default:"",required:!1,rule:[function(e){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(e)||"Bitte geben Sie den richtigen Preis ein"}]}},printGroupId:{displayName:"printCatName",type:i["a"].Types.Option,formConfig:{type:{selectItems:u["a"].getList}}},categoryId:{displayName:"labelName",type:i["a"].Types.Option,formConfig:{type:{selectItems:s["a"].getList,itemText:"_langsname"}}},AllergenId:{type:i["a"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,multiple:!0},required:!1},displayName:"过敏源"},attributeGroupId:{displayName:"attributeGroupNames",type:i["a"].Types.Option,formConfig:{merge:!1,type:{selectItems:c["a"].getList,multiple:!0,disabledItem:function(e,t){return t.inheritAttributeGroupId?Object(n["a"])(Object(n["a"])({},e),{},{disabled:t.inheritAttributeGroupId.includes(e.id)}):e}}}},localAttributeGroupId:{type:i["a"].Types.Option,formConfig:{type:{selectItems:c["a"].getList,multiple:!0},inNew:!1,inEdit:!1},header:!1},inheritAttributeGroupId:{displayName:"AttributeGroupName",type:i["a"].Types.Option,formConfig:{type:{selectItems:c["a"].getList,multiple:!0},inNew:!1,inEdit:!1},header:!1},isActive:{type:i["a"].Types.Boolean,displayName:"isActive",formConfig:{default:1}}},g={add:function(e){return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),i["e"].postWithUploadFile("Dishes.php?op=add",Object(n["a"])(Object(n["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},edit:function(e){return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),e.file&&(e.imageExt=e.file.name.split(".")[1]),i["e"].postWithUploadFile("Dishes.php?op=update",Object(n["a"])(Object(n["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},remove:function(e){return i["e"].post("Dishes.php?op=delete",{id:e})},load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Dishes.php",Object(n["a"])({lang:o["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.id=e.dishId,e.attributeGroupId=[e.inheritAttributeGroupId?e.inheritAttributeGroupId.split(","):[],e.localAttributeGroupId?e.localAttributeGroupId.split(","):[]].flat().join(","),e.langs=e.langs.map((function(e){return Object(n["a"])(Object(n["a"])({},e),{},{desc:e.description})})),e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},m=i["a"].ModelFactory(f,g);m.getBuffet=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,m.getList();case 2:return e.abrupt("return",e.sent.filter((function(e){return"8"===e.dishesCategoryTypeId})));case 3:case"end":return e.stop()}}),e)}))),t["a"]=m},e941:function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[r("v-container",{attrs:{fluid:""}},[r("ik-data-table",{attrs:{model:e.model,"entity-name":e.$t("BuffetChildSetting"),icon:"mdi-account-child"}})],1)],1)},n=[],i=r("633c"),o=(r("d81d"),r("5530")),p=(r("96cf"),r("1da1")),s=r("c791"),u={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},childDishId:{type:i["a"].Types.Option,formConfig:{required:!1,type:{selectItems:s["a"].getBuffet,itemText:"_langsname"}}},adultDishId:{type:i["a"].Types.Option,formConfig:{required:!1,type:{selectItems:s["a"].getBuffet,itemText:"_langsname"}}}},d={add:function(e){return i["e"].postWithUploadFile("Dishes.php?op=addJBuffetChild",e,{showLoading:!0})},edit:function(e){return i["e"].postWithUploadFile("Dishes.php?op=editJBuffetChild",e,{showLoading:!0})},remove:function(e){return i["e"].post("Dishes.php?op=deleteJBuffetChild",{id:e})},load:function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Dishes.php?op=showJBuffetChild",Object(o["a"])({},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return i["a"].parseDataForEntity(e,u)})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},l=i["a"].ModelFactory(u,d),c={components:{IkDataTable:i["c"]},data:function(){return{model:l}}},f=c,g=r("2877"),m=r("6544"),y=r.n(m),h=r("a523"),b=Object(g["a"])(f,a,n,!1,null,null,null);t["default"]=b.exports;y()(b,{VContainer:h["a"]})},ebc9:function(e,t,r){"use strict";var a=r("5530"),n=(r("96cf"),r("1da1")),i=r("3405"),o=r("633c"),p={id:{type:o["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},s={load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["e"].get("CategoryType.php",Object(a["a"])({lang:i["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["a"].ModelFactory(p,s)}}]);
//# sourceMappingURL=chunk-0f15afbf.89ea4727.js.map