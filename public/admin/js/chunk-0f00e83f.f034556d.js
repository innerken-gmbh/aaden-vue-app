(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0f00e83f"],{"4c03":function(e,t,a){"use strict";a("a15b");var n=a("b85c"),r=(a("96cf"),a("1da1")),i=a("5530"),o=a("f4d6"),s=a("9d8f"),u=a.n(s),p=a("ebc9"),l=a("b0d9"),d=a("a86d"),c=a("5089"),m={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("Category.php",Object(i["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},f={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:o["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:c["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===c["b"].getLang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1}},g=o["IKDataEntity"].ModelFactory(f,m),y=a("641f"),h=a.n(y),b=a("c0d6"),I=Boolean("0"===c["b"].isShowOnTable),v=["#FFCDD2","#F8BBD0","#E1BEE7","#D1C4E9","#C5CAE9","#BBDEFB","#B3E5FC","#B2EBF2","#B2DFDB","#C8E6C9","#DCEDC8","#F0F4C3","#FFF9C4","#FFECB3","#FFE0B2","#FFCCBC","#D7CCC8","#CFD8DC"],C={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,u.a.post("Category.php?op=add",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,console.log("label-manage: item()",e),u.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return u.a.post("Category.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("Category.php",Object(i["a"])({},t));case 2:return a=e.sent.content,console.log(a,"cate response"),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),randomColor:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:h.a.showLoading(!0),a=Object(n["a"])(t),e.prev=2,a.s();case 4:if((r=a.n()).done){e.next=13;break}return o=r.value,o.appliedAttributeGroup=o.attributeGroupId.join(","),o.catTypeId=o.dishesCategoryTypeId,o.color=v[Math.round(18*Math.random())],e.next=11,u.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},o),{},{langs:JSON.stringify(o.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:h.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeAllColor:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:h.a.showLoading(!0),a=Object(n["a"])(t);try{for(a.s();!(r=a.n()).done;)o=r.value,o.appliedAttributeGroup=o.attributeGroupId.join(","),o.catTypeId=o.dishesCategoryTypeId,o.color="#FFFFFF",u.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},o),{},{langs:JSON.stringify(o.langs)}),{showLoading:!1})}catch(s){a.e(s)}finally{a.f()}h.a.toast("OK");case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),removeCategoryImage:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.post("Category.php?op=removeCategoryImage",Object(i["a"])({},t),{showLoading:!0});case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},w={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},dcImage:{type:o["IKDataEntity"].Types.Image,formConfig:{required:!1,type:{root:function(){return b["a"].getters.rootUrl+c["b"].dcImageRoot}}},displayName:"Label Image",header:I},langs:{displayName:"labelName",type:o["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:c["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===c["b"].getLang().toUpperCase()},displayChild:function(e){return console.log(e),"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1},dishesCategoryTypeId:{displayName:"labelType",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList}}},attributeGroupId:{displayName:"attributeGroupNames",type:o["IKDataEntity"].Types.Option,tableConfig:{width:"100px"},formConfig:{required:!1,type:{selectItems:l["a"].getList,multiple:!0}}},printOrder:{type:o["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},parentId:{type:o["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:g.getList,itemText:"_langsname"}},header:!1}};t["a"]=o["IKDataEntity"].ModelFactory(w,C)},6306:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),s=a.n(o),u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},upsideDown:{type:i["IKDataEntity"].Types.Boolean},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},p={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Printer.php",Object(n["a"])({op:"showPrinterGroups"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return s.a.postWithUploadFile("Printer.php?op=addPrinterGroups",e,{showLoading:!0})},edit:function(e){return s.a.postWithUploadFile("Printer.php?op=updatePrinterGroups",e,{showLoading:!0})},remove:function(e){return s.a.post("Printer.php?op=deletePrinterGroup",{id:e})}};t["a"]=i["IKDataEntity"].ModelFactory(u,p)},"6a28":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{attrs:{fluid:""}},[a("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"indigo",icon:"mdi-pencil-box-multiple-outline",inline:""},scopedSlots:e._u([{key:"after-heading",fn:function(){return[a("div",{staticClass:"display-2 font-weight-light"},[e._v(" "+e._s(e.$t("快速添加菜品"))+" ")])]},proxy:!0}])},[a("v-container",[a("v-form",{ref:"form",attrs:{"lazy-validation":!1},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[a("span",{staticClass:"subtitle-1 font-weight-bold"},[e._v(e._s(e.$t("菜品信息")))]),e._l(e.savedItemsList.length,(function(t,n){return[a("v-row",{key:n,staticClass:"mb-0 mt-0",attrs:{dense:""}},[a("v-col",{attrs:{cols:"12",md:"2",sm:"12"}},[a("v-text-field",{attrs:{label:e.$t("code"),rules:e.textRules,required:"",dense:"",outlined:""},scopedSlots:e._u([{key:"append",fn:function(){return[a("div",{staticClass:"red--text"},[e._v(" * ")])]},proxy:!0}],null,!0),model:{value:e.savedItemsList[n].code,callback:function(t){e.$set(e.savedItemsList[n],"code",t)},expression:"savedItemsList[index].code"}})],1),a("v-col",{attrs:{cols:"12",md:"2",sm:"12"}},[a("v-text-field",{attrs:{label:e.$t("price"),rules:e.priceRules,required:"",dense:"",outlined:""},scopedSlots:e._u([{key:"append",fn:function(){return[a("div",{staticClass:"red--text"},[e._v(" * ")])]},proxy:!0}],null,!0),model:{value:e.savedItemsList[n].price,callback:function(t){e.$set(e.savedItemsList[n],"price",t)},expression:"savedItemsList[index].price"}})],1),a("v-col",{attrs:{cols:"12",md:"3",sm:"12"}},[a("v-text-field",{attrs:{label:e.$t("nameDE"),rules:e.textRules,required:"",dense:"",outlined:""},scopedSlots:e._u([{key:"append",fn:function(){return[a("div",{staticClass:"red--text"},[e._v(" * ")])]},proxy:!0}],null,!0),model:{value:e.savedItemsList[n].nameDE,callback:function(t){e.$set(e.savedItemsList[n],"nameDE",t)},expression:"savedItemsList[index].nameDE"}})],1),a("v-col",{attrs:{cols:"12",md:"2",sm:"12"}},[a("v-select",{attrs:{items:e.printGroupList,"item-text":"name","item-value":"id",label:e.$t("printCatName"),rules:e.textRules,required:"",dense:"",outlined:""},scopedSlots:e._u([{key:"append",fn:function(){return[a("div",{staticClass:"red--text"},[e._v(" * ")])]},proxy:!0}],null,!0),model:{value:e.savedItemsList[n].printGroupId,callback:function(t){e.$set(e.savedItemsList[n],"printGroupId",t)},expression:"savedItemsList[index].printGroupId"}})],1),a("v-col",{attrs:{cols:"12",md:"2",sm:"12"}},[a("v-select",{attrs:{items:e.categoryList,"item-text":"_langsname","item-value":"id",label:e.$t("labelName"),rules:e.textRules,required:"",dense:"",outlined:""},scopedSlots:e._u([{key:"append",fn:function(){return[a("div",{staticClass:"red--text"},[e._v(" * ")])]},proxy:!0}],null,!0),model:{value:e.savedItemsList[n].categoryId,callback:function(t){e.$set(e.savedItemsList[n],"categoryId",t)},expression:"savedItemsList[index].categoryId"}})],1),e.savedItemsList.length>1?a("v-col",{attrs:{cols:"12",md:"1",sm:"12"}},[a("v-btn",{attrs:{icon:"","x-large":"",color:"primary"},on:{click:function(t){return e.deleteItem(n)}}},[a("v-icon",[e._v(" mdi-delete-circle ")])],1)],1):e._e()],1)]})),a("v-btn",{staticClass:"ml-4",attrs:{icon:"",large:"",color:"primary"},on:{click:function(t){return e.nPlus()}}},[a("v-icon",[e._v(" mdi-pencil-plus ")]),e._v(" "+e._s(e.$t("添加菜品"))+" ")],1)],2),a("v-divider",{staticClass:"mx-2 my-2"}),a("v-row",[a("v-spacer"),a("v-btn",{attrs:{color:!0===e.valid?"primary":"grey"},on:{click:function(t){return e.submit()}}},[e._v(" "+e._s(e.$t("保存"))+" ")])],1)],1)],1)],1)},r=[],i=(a("4160"),a("a434"),a("b0c0"),a("3ca3"),a("159b"),a("ddb0"),a("b85c")),o=(a("96cf"),a("1da1")),s=a("4c03"),u=a("6306"),p=a("c791"),l={data:function(){var e=this;return{valid:!0,categoryList:[],printGroupList:[],textRules:[function(t){return!!t||e.$t("Item is required")}],priceRules:[function(e){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(e)||"Bitte geben Sie den richtigen Preis ein"}],defaultItem:{code:"",price:"",nameDE:"",categoryId:"",printGroupId:""},langs:[{lang:"zh",id:1,name:""},{lang:"en",id:2,name:""},{lang:"de",id:3,name:""}],savedItemsList:[]}},mounted:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.savedItemsList.push(e.defaultItem),t.next=3,s["a"].getList();case 3:return e.categoryList=t.sent,t.next=6,u["a"].getList();case 6:e.printGroupList=t.sent;case 7:case"end":return t.stop()}}),t)})))()},methods:{nPlus:function(){this.defaultItem={code:"",price:"",nameDE:"",categoryId:"",printGroupId:""},this.savedItemsList.push(this.defaultItem)},deleteItem:function(e){this.savedItemsList.splice(e,1)},submit:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){var a,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!0!==e.valid){t.next=20;break}a=Object(i["a"])(e.savedItemsList),t.prev=2,r=regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=n.value,e.langs.forEach((function(e){e.name=a.nameDE})),a.langs=e.langs,t.next=5,p["a"].multipleAdd(a);case 5:case"end":return t.stop()}}),t)})),a.s();case 5:if((n=a.n()).done){t.next=9;break}return t.delegateYield(r(),"t0",7);case 7:t.next=5;break;case 9:t.next=14;break;case 11:t.prev=11,t.t1=t["catch"](2),a.e(t.t1);case 14:return t.prev=14,a.f(),t.finish(14);case 17:e.$router.push({path:"/dishes/dishes-manage"}),t.next=21;break;case 20:e.$refs.form.validate();case 21:case"end":return t.stop()}}),t,null,[[2,11,14,17]])})))()}}},d=l,c=a("2877"),m=a("6544"),f=a.n(m),g=a("8336"),y=a("62ad"),h=a("a523"),b=a("ce7e"),I=a("4bd4"),v=a("132d"),C=a("0fd9"),w=a("b974"),x=a("2fa4"),D=a("8654"),L=Object(c["a"])(d,n,r,!1,null,null,null);t["default"]=L.exports;f()(L,{VBtn:g["a"],VCol:y["a"],VContainer:h["a"],VDivider:b["a"],VForm:I["a"],VIcon:v["a"],VRow:C["a"],VSelect:w["a"],VSpacer:x["a"],VTextField:D["a"]})},"6e35":function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),s=a.n(o),u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"allergName"},icon:{displayName:"icon"},shortName:{displayName:"shortName"},displayText:{displayName:"displayText"}},p={add:function(e){return s.a.postWithUploadFile("Dishes.php?op=addAllergen",e,{showLoading:!0})},edit:function(e){return s.a.postWithUploadFile("Dishes.php?op=updateAllergen",e,{showLoading:!0})},remove:function(e){return s.a.post("Dishes.php?op=deleteAllergen",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Dishes.php",Object(n["a"])({op:"showAllAllergen"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["IKDataEntity"].ModelFactory(u,p)},a86d:function(e,t,a){"use strict";var n=a("f4d6"),r={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=n["IKDataEntity"].ModelFactory(r,{})},b0d9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),s=a("9d8f"),u=a.n(s),p={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:o["IKDataEntity"].Types.Boolean},multiSelect:{type:o["IKDataEntity"].Types.Boolean},attrubuteCount:{type:o["IKDataEntity"].Types.Integer,form:!1}},l={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("Category.php",Object(n["a"])({op:"showAttributeGroup",lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return u.a.postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return u.a.postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return u.a.post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=o["IKDataEntity"].ModelFactory(p,l)},c791:function(e,t,a){"use strict";a("a4d3"),a("e01a"),a("4de4"),a("0481"),a("caad"),a("a15b"),a("d81d"),a("4069"),a("b0c0"),a("ac1f"),a("2532"),a("1276"),a("96cf");var n=a("1da1"),r=a("5530"),i=a("f4d6"),o=a("9d8f"),s=a.n(o),u=a("5089"),p=a("c0d6"),l=a("4c03"),d=a("6306"),c=a("6e35"),m=a("a86d"),f=a("b0d9"),g=a("9225"),y=Boolean("0"===u["b"].isShowOnTable),h={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",form:!1},code:{},image:{type:i["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return p["a"].getters.rootUrl+u["b"].dishImageRoot}},required:!1},displayName:"image",header:y},dishName:{displayName:"name",form:!1},price:{type:i["IKDataEntity"].Types.Float,formConfig:{default:"",overwriteRule:!0,rule:[function(e){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(e)||"Bitte geben Sie den richtigen Preis ein"}]}},langs:{displayName:"name",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"name",default:u["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toLowerCase()===u["b"].getLang().toLowerCase()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[m["a"],m["a"],m["a"]],header:!1},printGroupId:{displayName:g["a"].t("printCatName"),type:i["IKDataEntity"].Types.Option,formConfig:{default:1,type:{selectItems:d["a"].getList}}},extraPrintGroupIds:{displayName:g["a"].t("extraPrintGroup"),type:i["IKDataEntity"].Types.Option,formConfig:{type:{multiple:!0,selectItems:d["a"].getList},required:!1},header:!1},categoryId:{displayName:"labelName",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList,itemText:"_langsname"}}},AllergenId:{displayName:g["a"].t("过敏源"),type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList,multiple:!0},required:!1},header:!1},attributeGroupId:{displayName:g["a"].t("attributeGroupNames"),type:i["IKDataEntity"].Types.Option,formConfig:{merge:!1,required:!1,type:{selectItems:f["a"].getList,multiple:!0,disabledItem:function(e,t){return t.inheritAttributeGroupId?Object(r["a"])(Object(r["a"])({},e),{},{disabled:t.inheritAttributeGroupId.includes(e.id)}):e}}},header:!1},localAttributeGroupId:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:f["a"].getList,multiple:!0}},form:!1,header:!1},inheritAttributeGroupId:{displayName:"AttributeGroupName",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:f["a"].getList,multiple:!0}},form:!1,header:!1},dishWeight:{displayName:"DishWeight",type:i["IKDataEntity"].Types.Integer,formConfig:{default:1,required:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]},header:!1},isActive:{type:i["IKDataEntity"].Types.Boolean,displayName:"isActive",formConfig:{default:1,required:!1}},dishAlias:{required:!1,formConfig:{requiredNew:!1,requiredEdit:!1},header:!1},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}}},b={multipleAdd:function(e){return s.a.postWithUploadFile("Dishes.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!1})},add:function(e){return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),e.extraPrintGroupIds=e.extraPrintGroupIds.join(","),s.a.postWithUploadFile("Dishes.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},edit:function(e){return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),e.extraPrintGroupIds=e.extraPrintGroupIds.join(","),e.file&&(e.imageExt=e.file.name.split(".")[1]),e.isActive=e.isActive?1:0,s.a.postWithUploadFile("Dishes.php?op=update",Object(r["a"])(Object(r["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},remove:function(e){return s.a.post("Dishes.php?op=delete",{id:e})},load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Dishes.php",Object(r["a"])({lang:u["b"].getLang(),onlyActive:0},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.id=e.dishId,e.attributeGroupId=[e.inheritAttributeGroupId?e.inheritAttributeGroupId.split(","):[],e.localAttributeGroupId?e.localAttributeGroupId.split(","):[]].flat().join(","),e.langs=e.langs.map((function(e){return Object(r["a"])(Object(r["a"])({},e),{},{desc:e.description})})),e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},I=i["IKDataEntity"].ModelFactory(h,b);I.getBuffet=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,I.getList();case 2:return e.abrupt("return",e.sent.filter((function(e){return"8"===e.dishesCategoryTypeId})));case 3:case"end":return e.stop()}}),e)}))),t["a"]=I},ebc9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),s=a("9d8f"),u=a.n(s),p={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},l={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("CategoryType.php",Object(n["a"])({lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(p,l)}}]);
//# sourceMappingURL=chunk-0f00e83f.f034556d.js.map