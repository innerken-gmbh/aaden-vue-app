(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bf4ac512"],{"4c03":function(e,t,n){"use strict";n("a15b"),n("d81d"),n("96cf");var r=n("1da1"),a=n("5530"),i=n("633c"),o=n("ebc9"),p=n("b0d9"),s=n("a86d"),u=n("3405"),d=n("6f56"),l={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},categorySort:{displayName:"sort",formConfig:{required:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:i["a"].Types.Group,formConfig:{groupName:"labelName",default:u["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===u["a"].lang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[s["a"],s["a"],s["a"]],header:!1},dishesCategoryTypeId:{displayName:"labelType",type:i["a"].Types.Option,formConfig:{type:{selectItems:o["a"].getList}}},attributeGroupId:{displayName:"attributeGroupNames",type:i["a"].Types.Option,formConfig:{required:!1,type:{selectItems:p["a"].getList,multiple:!0}}},consumeTypeIds:{type:i["a"].Types.Option,formConfig:{required:!1,type:{selectItems:d["a"].getList,multiple:!0}}},freeInConsumeTypeIds:{type:i["a"].Types.Option,formConfig:{required:!1,type:{selectItems:d["a"].getList,multiple:!0}}},color:{type:i["a"].Types.Color,formConfig:{required:!1}},printOrder:{type:i["a"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}}},c={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),i["e"].post("Category.php?op=add",Object(a["a"])(Object(a["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),i["e"].postWithUploadFile("Category.php?op=update",Object(a["a"])(Object(a["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return i["e"].post("Category.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Category.php",Object(a["a"])({},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return i["a"].parseDataForEntity(e,l)})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["a"].ModelFactory(l,c)},6306:function(e,t,n){"use strict";n("d81d");var r=n("5530"),a=(n("96cf"),n("1da1")),i=n("633c"),o={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:i["a"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:i["a"].Types.Boolean,displayName:"isSingleOrderPrint"},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}}},p={load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Printer.php",Object(r["a"])({op:"showPrinterGroups"},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return i["a"].parseDataForEntity(e,o)})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return i["e"].postWithUploadFile("Printer.php?op=addPrinterGroups",e,{showLoading:!0})},edit:function(e){return i["e"].postWithUploadFile("Printer.php?op=updatePrinterGroups",e,{showLoading:!0})},remove:function(e){return i["e"].post("Printer.php?op=deletePrinterGroup",{id:e})}};t["a"]=i["a"].ModelFactory(o,p)},"6e35":function(e,t,n){"use strict";var r=n("5530"),a=(n("96cf"),n("1da1")),i=n("633c"),o={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"allergName"},icon:{displayName:"icon"},shortName:{displayName:"shortName"},displayText:{displayName:"displayText"}},p={add:function(e){return i["e"].postWithUploadFile("Dishes.php?op=addAllergen",e,{showLoading:!0})},edit:function(e){return i["e"].postWithUploadFile("Dishes.php?op=updateAllergen",e,{showLoading:!0})},remove:function(e){return i["e"].post("Dishes.php?op=deleteAllergen",{id:e})},load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Dishes.php",Object(r["a"])({op:"showAllAllergen"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["a"].ModelFactory(o,p)},"6f56":function(e,t,n){"use strict";var r=n("5530"),a=(n("96cf"),n("1da1")),i=n("633c"),o={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"staffName"},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"}},p={load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Complex.php",Object(r["a"])({op:"showAllConsumeTypeInfo"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return i["e"].post("ConsumeType.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return i["e"].postWithUploadFile("ConsumeType.php?op=update",Object(r["a"])(Object(r["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return i["e"].post("ConsumeType.php?op=delete",{id:e})}};t["a"]=i["a"].ModelFactory(o,p)},a86d:function(e,t,n){"use strict";var r=n("633c"),a={id:{type:r["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=r["a"].ModelFactory(a,{})},b0d9:function(e,t,n){"use strict";var r=n("5530"),a=(n("96cf"),n("1da1")),i=n("3405"),o=n("633c"),p={id:{type:o["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:o["a"].Types.Boolean},multiSelect:{type:o["a"].Types.Boolean}},s={load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["e"].get("Category.php",Object(r["a"])({op:"showAttributeGroup",lang:i["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return o["e"].postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return o["e"].postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return o["e"].post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=o["a"].ModelFactory(p,s)},c791:function(e,t,n){"use strict";n("a4d3"),n("e01a"),n("4de4"),n("0481"),n("caad"),n("a15b"),n("d81d"),n("4069"),n("b0c0"),n("ac1f"),n("2532"),n("1276"),n("96cf");var r=n("1da1"),a=n("5530"),i=n("633c"),o=n("3405"),p=n("c0d6"),s=n("4c03"),u=n("6306"),d=n("6e35"),l=n("a86d"),c=n("b0d9"),f=Boolean("0"===o["a"].isShowOnTable),g={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},code:{},image:{type:i["a"].Types.Image,formConfig:{type:{root:function(){return p["a"].getters.rootUrl+o["a"].dishImageRoot}},required:!1},displayName:"image",header:f},dishName:{displayName:"name",form:!1},price:{type:i["a"].Types.Float,formConfig:{default:"",overwriteRule:!0,rule:[function(e){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(e)||"Bitte geben Sie den richtigen Preis ein"}]}},langs:{displayName:"name",type:i["a"].Types.Group,formConfig:{groupName:"name",default:o["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===o["a"].lang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[l["a"],l["a"],l["a"]],header:!1},printGroupId:{displayName:"printCatName",type:i["a"].Types.Option,formConfig:{default:1,type:{selectItems:u["a"].getList}}},categoryId:{displayName:"labelName",type:i["a"].Types.Option,formConfig:{type:{selectItems:s["a"].getList,itemText:"_langsname"}}},AllergenId:{type:i["a"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,multiple:!0},required:!1},displayName:"过敏源"},attributeGroupId:{displayName:"attributeGroupNames",type:i["a"].Types.Option,formConfig:{merge:!1,required:!1,type:{selectItems:c["a"].getList,multiple:!0,disabledItem:function(e,t){return t.inheritAttributeGroupId?Object(a["a"])(Object(a["a"])({},e),{},{disabled:t.inheritAttributeGroupId.includes(e.id)}):e}}}},localAttributeGroupId:{type:i["a"].Types.Option,formConfig:{type:{selectItems:c["a"].getList,multiple:!0},inNew:!1,inEdit:!1},header:!1},inheritAttributeGroupId:{displayName:"AttributeGroupName",type:i["a"].Types.Option,formConfig:{type:{selectItems:c["a"].getList,multiple:!0},inNew:!1,inEdit:!1},header:!1},dishWeight:{displayName:"DishWeight",type:i["a"].Types.Integer,formConfig:{default:1,required:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},isActive:{type:i["a"].Types.Boolean,displayName:"isActive",formConfig:{default:1,required:!1}},dishAlias:{required:!1,formConfig:{requiredNew:!1,requiredEdit:!1}}},m={add:function(e){return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),i["e"].postWithUploadFile("Dishes.php?op=add",Object(a["a"])(Object(a["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},edit:function(e){return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),e.file&&(e.imageExt=e.file.name.split(".")[1]),i["e"].postWithUploadFile("Dishes.php?op=update",Object(a["a"])(Object(a["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},remove:function(e){return i["e"].post("Dishes.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Dishes.php",Object(a["a"])({lang:o["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.id=e.dishId,e.attributeGroupId=[e.inheritAttributeGroupId?e.inheritAttributeGroupId.split(","):[],e.localAttributeGroupId?e.localAttributeGroupId.split(","):[]].flat().join(","),e.langs=e.langs.map((function(e){return Object(a["a"])(Object(a["a"])({},e),{},{desc:e.description})})),e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},y=i["a"].ModelFactory(g,m);y.getBuffet=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,y.getList();case 2:return e.abrupt("return",e.sent.filter((function(e){return"8"===e.dishesCategoryTypeId})));case 3:case"end":return e.stop()}}),e)}))),t["a"]=y},e941:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("ik-data-table",{attrs:{model:e.ConsumeType,"entity-name":e.$t("ConsumeTypeSetting"),icon:"mdi-view-grid-plus"}})],1),n("v-col",{attrs:{cols:"12"}},[n("ik-data-table",{attrs:{model:e.BuffetChild,"entity-name":e.$t("自助类型设置"),icon:"mdi-account-child"}})],1),n("v-col",{attrs:{cols:"12"}},[n("ik-data-table",{attrs:{model:e.BuffetSetting,"entity-name":e.$t("BuffetChildSetting"),icon:"mdi-cogs"}})],1)],1)],1)],1)},a=[],i=n("633c"),o=(n("d81d"),n("5530")),p=(n("96cf"),n("1da1")),s=n("c791"),u=n("6f56"),d={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{disableNew:!0,disableEdit:!0}},childDishId:{type:i["a"].Types.Option,formConfig:{type:{selectItems:s["a"].getBuffet,itemText:"_langsname"}}},adultDishId:{type:i["a"].Types.Option,formConfig:{type:{selectItems:s["a"].getBuffet,itemText:"_langsname"}}},consumeTypeId:{displayName:"ConsumeTypeSetting",type:i["a"].Types.Option,formConfig:{type:{selectItems:u["a"].getList}}}},l={add:function(e){return i["e"].postWithUploadFile("Dishes.php?op=addJBuffetChild",e,{showLoading:!0})},edit:function(e){return i["e"].postWithUploadFile("Dishes.php?op=editJBuffetChild",e,{showLoading:!0})},remove:function(e){return i["e"].post("Dishes.php?op=deleteJBuffetChild",{id:e})},load:function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Dishes.php?op=showJBuffetChild",Object(o["a"])({},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return i["a"].parseDataForEntity(e,d)})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},c=i["a"].ModelFactory(d,l),f={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},consumeTypeId:{displayName:"自助餐类型",type:i["a"].Types.Option,formConfig:{type:{selectItems:u["a"].getList}}},totalRound:{displayName:"自助餐轮数",formConfig:{default:"",rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die richtige Zahl ein"}]}},roundTime:{displayName:"自助餐每轮时长（秒）",formConfig:{default:"",rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die richtige Zahl ein"}]}},maxDineTime:{displayName:"最长时间（秒）",formConfig:{default:"",rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die richtige Zahl ein"}]}},roundDishCount:{displayName:"成人每轮点菜数",formConfig:{default:"",rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die richtige Zahl ein"}]}},childRoundDishCount:{displayName:"儿童每轮点菜数",formConfig:{default:"",rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die richtige Zahl ein"}]}}},g={add:function(e){return i["e"].post("ConsumeType.php?op=addJpBuffetSetting",Object(o["a"])(Object(o["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return i["e"].postWithUploadFile("ConsumeType.php?op=updateJpBuffetSetting",Object(o["a"])(Object(o["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return i["e"].post("ConsumeType.php?op=deleteJpBuffetSetting",{id:e})},load:function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("ConsumeType.php?op=showAllBuffetSetting",Object(o["a"])({},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return i["a"].parseDataForEntity(e,f)})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},m=i["a"].ModelFactory(f,g),y={components:{IkDataTable:i["c"]},data:function(){return{BuffetChild:c,BuffetSetting:m,ConsumeType:u["a"]}}},h=y,b=n("2877"),C=n("6544"),N=n.n(C),I=n("62ad"),T=n("a523"),w=n("0fd9"),O=Object(b["a"])(h,r,a,!1,null,null,null);t["default"]=O.exports;N()(O,{VCol:I["a"],VContainer:T["a"],VRow:w["a"]})},ebc9:function(e,t,n){"use strict";var r=n("5530"),a=(n("96cf"),n("1da1")),i=n("3405"),o=n("633c"),p={id:{type:o["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},s={load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["e"].get("CategoryType.php",Object(r["a"])({lang:i["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["a"].ModelFactory(p,s)}}]);
//# sourceMappingURL=chunk-bf4ac512.5dcd3a58.js.map