(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bf4ac512"],{"4c03":function(e,t,n){"use strict";n("a15b"),n("96cf");var i=n("1da1"),a=n("5530"),r=n("633c"),o=n("ebc9"),p=n("b0d9"),s=n("a86d"),l=n("3405"),u=n("6f56"),d={load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["hillo"].get("Category.php",Object(a["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},c={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:r["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:l["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===l["a"].lang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[s["a"],s["a"],s["a"]],header:!1}},y=r["IKDataEntity"].ModelFactory(c,d),f={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),r["hillo"].post("Category.php?op=add",Object(a["a"])(Object(a["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),r["hillo"].postWithUploadFile("Category.php?op=update",Object(a["a"])(Object(a["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return r["hillo"].post("Category.php?op=delete",{id:e})},load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["hillo"].get("Category.php",Object(a["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},g={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},categorySort:{type:r["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{default:50,required:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:r["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:l["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===l["a"].lang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[s["a"],s["a"],s["a"]],header:!1},dishesCategoryTypeId:{displayName:"labelType",type:r["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:o["a"].getList}}},attributeGroupId:{displayName:"attributeGroupNames",type:r["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:p["a"].getList,multiple:!0}}},consumeTypeIds:{type:r["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:u["a"].getList,multiple:!0}}},freeInConsumeTypeIds:{type:r["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:u["a"].getList,multiple:!0}}},color:{type:r["IKDataEntity"].Types.Color,formConfig:{required:!1}},printOrder:{type:r["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},parentId:{type:r["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:y.getList,itemText:"_langsname"}}}};t["a"]=r["IKDataEntity"].ModelFactory(g,f)},6306:function(e,t,n){"use strict";var i=n("5530"),a=(n("96cf"),n("1da1")),r=n("633c"),o={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:r["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:r["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},p={load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["hillo"].get("Printer.php",Object(i["a"])({op:"showPrinterGroups"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return r["hillo"].postWithUploadFile("Printer.php?op=addPrinterGroups",e,{showLoading:!0})},edit:function(e){return r["hillo"].postWithUploadFile("Printer.php?op=updatePrinterGroups",e,{showLoading:!0})},remove:function(e){return r["hillo"].post("Printer.php?op=deletePrinterGroup",{id:e})}};t["a"]=r["IKDataEntity"].ModelFactory(o,p)},"6e35":function(e,t,n){"use strict";var i=n("5530"),a=(n("96cf"),n("1da1")),r=n("633c"),o={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"allergName"},icon:{displayName:"icon"},shortName:{displayName:"shortName"},displayText:{displayName:"displayText"}},p={add:function(e){return r["hillo"].postWithUploadFile("Dishes.php?op=addAllergen",e,{showLoading:!0})},edit:function(e){return r["hillo"].postWithUploadFile("Dishes.php?op=updateAllergen",e,{showLoading:!0})},remove:function(e){return r["hillo"].post("Dishes.php?op=deleteAllergen",{id:e})},load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["hillo"].get("Dishes.php",Object(i["a"])({op:"showAllAllergen"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=r["IKDataEntity"].ModelFactory(o,p)},"6f56":function(e,t,n){"use strict";var i=n("5530"),a=(n("96cf"),n("1da1")),r=n("633c"),o={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"staffName"},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"},color:{type:r["IKDataEntity"].Types.Color,formConfig:{required:!1}}},p={load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["hillo"].get("Complex.php",Object(i["a"])({op:"showAllConsumeTypeInfo"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return r["hillo"].post("ConsumeType.php?op=add",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return r["hillo"].postWithUploadFile("ConsumeType.php?op=update",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return r["hillo"].post("ConsumeType.php?op=delete",{id:e})}};t["a"]=r["IKDataEntity"].ModelFactory(o,p)},a86d:function(e,t,n){"use strict";var i=n("633c"),a={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=i["IKDataEntity"].ModelFactory(a,{})},b0d9:function(e,t,n){"use strict";var i=n("5530"),a=(n("96cf"),n("1da1")),r=n("3405"),o=n("633c"),p={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:o["IKDataEntity"].Types.Boolean},multiSelect:{type:o["IKDataEntity"].Types.Boolean},attrubuteCount:{type:o["IKDataEntity"].Types.Integer,form:!1}},s={load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["hillo"].get("Category.php",Object(i["a"])({op:"showAttributeGroup",lang:r["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return o["hillo"].postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return o["hillo"].postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return o["hillo"].post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=o["IKDataEntity"].ModelFactory(p,s)},c791:function(e,t,n){"use strict";n("a4d3"),n("e01a"),n("4de4"),n("0481"),n("caad"),n("a15b"),n("d81d"),n("4069"),n("b0c0"),n("ac1f"),n("2532"),n("1276"),n("96cf");var i=n("1da1"),a=n("5530"),r=n("633c"),o=n("3405"),p=n("c0d6"),s=n("4c03"),l=n("6306"),u=n("6e35"),d=n("a86d"),c=n("b0d9"),y=Boolean("0"===o["a"].isShowOnTable),f={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},code:{},image:{type:r["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return p["a"].getters.rootUrl+o["a"].dishImageRoot}},required:!1},displayName:"image",header:y},dishName:{displayName:"name",form:!1},price:{type:r["IKDataEntity"].Types.Float,formConfig:{default:"",overwriteRule:!0,rule:[function(e){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(e)||"Bitte geben Sie den richtigen Preis ein"}]}},langs:{displayName:"name",type:r["IKDataEntity"].Types.Group,formConfig:{groupName:"name",default:o["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===o["a"].lang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1},printGroupId:{displayName:"printCatName",type:r["IKDataEntity"].Types.Option,formConfig:{default:1,type:{selectItems:l["a"].getList}}},categoryId:{displayName:"labelName",type:r["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:s["a"].getList,itemText:"_langsname"}}},AllergenId:{type:r["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList,multiple:!0},required:!1},displayName:"过敏源"},attributeGroupId:{displayName:"attributeGroupNames",type:r["IKDataEntity"].Types.Option,formConfig:{merge:!1,required:!1,type:{selectItems:c["a"].getList,multiple:!0,disabledItem:function(e,t){return t.inheritAttributeGroupId?Object(a["a"])(Object(a["a"])({},e),{},{disabled:t.inheritAttributeGroupId.includes(e.id)}):e}}}},localAttributeGroupId:{type:r["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList,multiple:!0},inNew:!1,inEdit:!1},header:!1},inheritAttributeGroupId:{displayName:"AttributeGroupName",type:r["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList,multiple:!0},inNew:!1,inEdit:!1},header:!1},dishWeight:{displayName:"DishWeight",type:r["IKDataEntity"].Types.Integer,formConfig:{default:1,required:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},isActive:{type:r["IKDataEntity"].Types.Boolean,displayName:"isActive",formConfig:{default:1,required:!1}},dishAlias:{required:!1,formConfig:{requiredNew:!1,requiredEdit:!1}},printText:{displayName:"printTitle",required:!1,formConfig:{requiredNew:!1,requiredEdit:!1}}},g={add:function(e){return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),r["hillo"].postWithUploadFile("Dishes.php?op=add",Object(a["a"])(Object(a["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},edit:function(e){return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),e.file&&(e.imageExt=e.file.name.split(".")[1]),r["hillo"].postWithUploadFile("Dishes.php?op=update",Object(a["a"])(Object(a["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},remove:function(e){return r["hillo"].post("Dishes.php?op=delete",{id:e})},load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["hillo"].get("Dishes.php",Object(a["a"])({lang:o["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.id=e.dishId,e.attributeGroupId=[e.inheritAttributeGroupId?e.inheritAttributeGroupId.split(","):[],e.localAttributeGroupId?e.localAttributeGroupId.split(","):[]].flat().join(","),e.langs=e.langs.map((function(e){return Object(a["a"])(Object(a["a"])({},e),{},{desc:e.description})})),e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},m=r["IKDataEntity"].ModelFactory(f,g);m.getBuffet=Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,m.getList();case 2:return e.abrupt("return",e.sent.filter((function(e){return"8"===e.dishesCategoryTypeId})));case 3:case"end":return e.stop()}}),e)}))),t["a"]=m},e941:function(e,t,n){"use strict";n.r(t);var i=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("v-container",{attrs:{fluid:""}},[n("v-row",[n("v-col",{attrs:{cols:"12"}},[n("ik-data-table",{attrs:{model:e.ConsumeType,"entity-name":e.$t("ConsumeTypeSetting"),icon:"mdi-view-grid-plus"}})],1),n("v-col",{attrs:{cols:"12"}},[n("ik-data-table",{attrs:{model:e.BuffetChild,"entity-name":e.$t("自助类型设置"),icon:"mdi-account-child"}})],1),n("v-col",{attrs:{cols:"12"}},[n("ik-data-table",{attrs:{model:e.BuffetSetting,"entity-name":e.$t("BuffetChildSetting"),icon:"mdi-cogs"}})],1)],1)],1)],1)},a=[],r=n("633c"),o=n("5530"),p=(n("96cf"),n("1da1")),s=n("c791"),l=n("6f56"),u={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{disableNew:!0,disableEdit:!0}},childDishId:{type:r["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:s["a"].getBuffet,itemText:"_langsname"}}},adultDishId:{type:r["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:s["a"].getBuffet,itemText:"_langsname"}}},consumeTypeId:{displayName:"ConsumeTypeSetting",type:r["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList}}}},d={add:function(e){return r["hillo"].postWithUploadFile("Dishes.php?op=addJBuffetChild",e,{showLoading:!0})},edit:function(e){return r["hillo"].postWithUploadFile("Dishes.php?op=editJBuffetChild",e,{showLoading:!0})},remove:function(e){return r["hillo"].post("Dishes.php?op=deleteJBuffetChild",{id:e})},load:function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["hillo"].get("Dishes.php?op=showJBuffetChild",Object(o["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},c=r["IKDataEntity"].ModelFactory(u,d),y={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},consumeTypeId:{type:r["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList}}},totalRound:{formConfig:{default:"",rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die richtige Zahl ein"}]}},roundTime:{formConfig:{default:"",rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die richtige Zahl ein"}]}},maxDineTime:{formConfig:{default:"",rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die richtige Zahl ein"}]}},roundDishCount:{formConfig:{default:"",rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die richtige Zahl ein"}]}},childRoundDishCount:{formConfig:{default:"",rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die richtige Zahl ein"}]}}},f={add:function(e){return r["hillo"].post("ConsumeType.php?op=addJpBuffetSetting",Object(o["a"])(Object(o["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return r["hillo"].postWithUploadFile("ConsumeType.php?op=updateJpBuffetSetting",Object(o["a"])(Object(o["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return r["hillo"].post("ConsumeType.php?op=deleteJpBuffetSetting",{id:e})},load:function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,r["hillo"].get("ConsumeType.php?op=showAllBuffetSetting",Object(o["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},g=r["IKDataEntity"].ModelFactory(y,f),m={components:{IkDataTable:r["IkDataTable"]},data:function(){return{BuffetChild:c,BuffetSetting:g,ConsumeType:l["a"]}}},h=m,b=n("2877"),I=n("6544"),C=n.n(I),T=n("62ad"),N=n("a523"),w=n("0fd9"),D=Object(b["a"])(h,i,a,!1,null,null,null);t["default"]=D.exports;C()(D,{VCol:T["a"],VContainer:N["a"],VRow:w["a"]})},ebc9:function(e,t,n){"use strict";var i=n("5530"),a=(n("96cf"),n("1da1")),r=n("3405"),o=n("633c"),p={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},s={load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["hillo"].get("CategoryType.php",Object(i["a"])({lang:r["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(p,s)}}]);
//# sourceMappingURL=chunk-bf4ac512.796959af.js.map