(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0effffae"],{"4a2e":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:e.model,icon:"mdi-cards","entity-name":e.$t("会员卡销售记录"),"use-default-action":!1,"use-select":!1},scopedSlots:e._u([{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0},{key:"item.action",fn:function(t){var r=t.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.goNext(r)}}},[e._v(" mdi-arrow-right ")])]}}])})],1)],1)},n=[],i=a("f4d6"),o=a("5530"),p=(a("96cf"),a("1da1")),s=a("9d8f"),u=a.n(s),d=a("c791"),l={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},dishesId:{displayName:"memberCardName",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,itemText:"_langsname"}}},createdAt:{},totalAmount:{},leftAmount:{},longId:{}},c={load:function(){var e=Object(p["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("MemberCard.php",Object(o["a"])({op:"showAllMemberCardSaleRecord"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},y=i["IKDataEntity"].ModelFactory(l,c),g={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:y}},methods:{goNext:function(e){this.$router.push({name:"消费记录",params:{id:e.id}})}}},f=g,m=a("2877"),h=a("6544"),b=a.n(h),I=a("a523"),C=a("132d"),w=a("71d9"),N=Object(m["a"])(f,r,n,!1,null,null,null);t["default"]=N.exports;b()(N,{VContainer:I["a"],VIcon:C["a"],VToolbar:w["a"]})},"4c03":function(e,t,a){"use strict";a("a15b");var r=a("b85c"),n=(a("96cf"),a("1da1")),i=a("5530"),o=a("f4d6"),p=a("9d8f"),s=a.n(p),u=a("ebc9"),d=a("b0d9"),l=a("a86d"),c=a("5089"),y={load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Category.php",Object(i["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},g={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:o["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:c["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===c["b"].getLang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[l["a"],l["a"],l["a"]],header:!1}},f=o["IKDataEntity"].ModelFactory(g,y),m=a("641f"),h=a.n(m),b=a("c0d6"),I=Boolean("0"===c["b"].isShowOnTable),C=["#FFCDD2","#F8BBD0","#E1BEE7","#D1C4E9","#C5CAE9","#BBDEFB","#B3E5FC","#B2EBF2","#B2DFDB","#C8E6C9","#DCEDC8","#F0F4C3","#FFF9C4","#FFECB3","#FFE0B2","#FFCCBC","#D7CCC8","#CFD8DC"],w={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,s.a.post("Category.php?op=add",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,console.log("label-manage: item()",e),s.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return s.a.post("Category.php?op=delete",{id:e})},load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Category.php",Object(i["a"])({},t));case 2:return a=e.sent.content,console.log(a,"cate response"),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),randomColor:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,n,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:h.a.showLoading(!0),a=Object(r["a"])(t),e.prev=2,a.s();case 4:if((n=a.n()).done){e.next=13;break}return o=n.value,o.appliedAttributeGroup=o.attributeGroupId.join(","),o.catTypeId=o.dishesCategoryTypeId,o.color=C[Math.round(18*Math.random())],e.next=11,s.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},o),{},{langs:JSON.stringify(o.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:h.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeAllColor:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,n,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:h.a.showLoading(!0),a=Object(r["a"])(t);try{for(a.s();!(n=a.n()).done;)o=n.value,o.appliedAttributeGroup=o.attributeGroupId.join(","),o.catTypeId=o.dishesCategoryTypeId,o.color="#FFFFFF",s.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},o),{},{langs:JSON.stringify(o.langs)}),{showLoading:!1})}catch(p){a.e(p)}finally{a.f()}h.a.toast("OK");case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),removeCategoryImage:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.post("Category.php?op=removeCategoryImage",Object(i["a"])({},t),{showLoading:!0});case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},N={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},dcImage:{type:o["IKDataEntity"].Types.Image,formConfig:{required:!1,type:{root:function(){return b["a"].getters.rootUrl+c["b"].dcImageRoot}}},displayName:"Label Image",header:I},langs:{displayName:"labelName",type:o["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:c["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===c["b"].getLang().toUpperCase()},displayChild:function(e){return console.log(e),"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[l["a"],l["a"],l["a"]],header:!1},dishesCategoryTypeId:{displayName:"labelType",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList}}},attributeGroupId:{displayName:"attributeGroupNames",type:o["IKDataEntity"].Types.Option,tableConfig:{width:"100px"},formConfig:{required:!1,type:{selectItems:d["a"].getList,multiple:!0}}},printOrder:{type:o["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},parentId:{type:o["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:f.getList,itemText:"_langsname"}},header:!1}};t["a"]=o["IKDataEntity"].ModelFactory(N,w)},6306:function(e,t,a){"use strict";var r=a("5530"),n=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),p=a.n(o),s={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},upsideDown:{type:i["IKDataEntity"].Types.Boolean},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},u={load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Printer.php",Object(r["a"])({op:"showPrinterGroups"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return p.a.postWithUploadFile("Printer.php?op=addPrinterGroups",e,{showLoading:!0})},edit:function(e){return p.a.postWithUploadFile("Printer.php?op=updatePrinterGroups",e,{showLoading:!0})},remove:function(e){return p.a.post("Printer.php?op=deletePrinterGroup",{id:e})}};t["a"]=i["IKDataEntity"].ModelFactory(s,u)},"6e35":function(e,t,a){"use strict";var r=a("5530"),n=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),p=a.n(o),s={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"allergName"},icon:{displayName:"icon"},shortName:{displayName:"shortName"},displayText:{displayName:"displayText"}},u={add:function(e){return p.a.postWithUploadFile("Dishes.php?op=addAllergen",e,{showLoading:!0})},edit:function(e){return p.a.postWithUploadFile("Dishes.php?op=updateAllergen",e,{showLoading:!0})},remove:function(e){return p.a.post("Dishes.php?op=deleteAllergen",{id:e})},load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Dishes.php",Object(r["a"])({op:"showAllAllergen"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["IKDataEntity"].ModelFactory(s,u)},a86d:function(e,t,a){"use strict";var r=a("f4d6"),n={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=r["IKDataEntity"].ModelFactory(n,{})},b0d9:function(e,t,a){"use strict";var r=a("5530"),n=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),p=a("9d8f"),s=a.n(p),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:o["IKDataEntity"].Types.Boolean},multiSelect:{type:o["IKDataEntity"].Types.Boolean},attrubuteCount:{type:o["IKDataEntity"].Types.Integer,form:!1}},d={load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Category.php",Object(r["a"])({op:"showAttributeGroup",lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return s.a.postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return s.a.postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return s.a.post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=o["IKDataEntity"].ModelFactory(u,d)},c791:function(e,t,a){"use strict";a("a4d3"),a("e01a"),a("4de4"),a("0481"),a("caad"),a("a15b"),a("d81d"),a("4069"),a("b0c0"),a("ac1f"),a("2532"),a("1276"),a("96cf");var r=a("1da1"),n=a("5530"),i=a("f4d6"),o=a("9d8f"),p=a.n(o),s=a("5089"),u=a("c0d6"),d=a("4c03"),l=a("6306"),c=a("6e35"),y=a("a86d"),g=a("b0d9"),f=a("9225"),m=Boolean("0"===s["b"].isShowOnTable),h={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",form:!1},code:{},image:{type:i["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return u["a"].getters.rootUrl+s["b"].dishImageRoot}},required:!1},displayName:"image",header:m},dishName:{displayName:"name",form:!1},price:{type:i["IKDataEntity"].Types.Float,formConfig:{default:"",overwriteRule:!0,rule:[function(e){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(e)||"Bitte geben Sie den richtigen Preis ein"}]}},langs:{displayName:"name",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"name",default:s["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toLowerCase()===s["b"].getLang().toLowerCase()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[y["a"],y["a"],y["a"]],header:!1},printGroupId:{displayName:f["a"].t("printCatName"),type:i["IKDataEntity"].Types.Option,formConfig:{default:1,type:{selectItems:l["a"].getList}}},extraPrintGroupIds:{displayName:f["a"].t("extraPrintGroup"),type:i["IKDataEntity"].Types.Option,formConfig:{type:{multiple:!0,selectItems:l["a"].getList},required:!1},header:!1},categoryId:{displayName:"labelName",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,itemText:"_langsname"}}},AllergenId:{displayName:f["a"].t("过敏源"),type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList,multiple:!0},required:!1},header:!1},attributeGroupId:{displayName:f["a"].t("attributeGroupNames"),type:i["IKDataEntity"].Types.Option,formConfig:{merge:!1,required:!1,type:{selectItems:g["a"].getList,multiple:!0,disabledItem:function(e,t){return t.inheritAttributeGroupId?Object(n["a"])(Object(n["a"])({},e),{},{disabled:t.inheritAttributeGroupId.includes(e.id)}):e}}},header:!1},localAttributeGroupId:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:g["a"].getList,multiple:!0}},form:!1,header:!1},inheritAttributeGroupId:{displayName:"AttributeGroupName",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:g["a"].getList,multiple:!0}},form:!1,header:!1},dishWeight:{displayName:"DishWeight",type:i["IKDataEntity"].Types.Integer,formConfig:{default:1,required:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]},header:!1},isActive:{type:i["IKDataEntity"].Types.Boolean,displayName:"isActive",formConfig:{default:1,required:!1}},dishAlias:{required:!1,formConfig:{requiredNew:!1,requiredEdit:!1},header:!1},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}}},b={multipleAdd:function(e){return p.a.postWithUploadFile("Dishes.php?op=add",Object(n["a"])(Object(n["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!1})},add:function(e){return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),e.extraPrintGroupIds=e.extraPrintGroupIds.join(","),p.a.postWithUploadFile("Dishes.php?op=add",Object(n["a"])(Object(n["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},edit:function(e){return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),e.extraPrintGroupIds=e.extraPrintGroupIds.join(","),e.file&&(e.imageExt=e.file.name.split(".")[1]),e.isActive=e.isActive?1:0,p.a.postWithUploadFile("Dishes.php?op=update",Object(n["a"])(Object(n["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},remove:function(e){return p.a.post("Dishes.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Dishes.php",Object(n["a"])({lang:s["b"].getLang(),onlyActive:0},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.id=e.dishId,e.attributeGroupId=[e.inheritAttributeGroupId?e.inheritAttributeGroupId.split(","):[],e.localAttributeGroupId?e.localAttributeGroupId.split(","):[]].flat().join(","),e.langs=e.langs.map((function(e){return Object(n["a"])(Object(n["a"])({},e),{},{desc:e.description})})),e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},I=i["IKDataEntity"].ModelFactory(h,b);I.getBuffet=Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,I.getList();case 2:return e.abrupt("return",e.sent.filter((function(e){return"8"===e.dishesCategoryTypeId})));case 3:case"end":return e.stop()}}),e)}))),t["a"]=I},ebc9:function(e,t,a){"use strict";var r=a("5530"),n=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),p=a("9d8f"),s=a.n(p),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},d={load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("CategoryType.php",Object(r["a"])({lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(u,d)}}]);
//# sourceMappingURL=chunk-0effffae.530f7678.js.map