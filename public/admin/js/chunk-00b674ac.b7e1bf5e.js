(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-00b674ac"],{"0fd9":function(e,t,n){"use strict";n("99af"),n("4160"),n("caad"),n("13d5"),n("4ec9"),n("b64b"),n("d3b7"),n("ac1f"),n("2532"),n("3ca3"),n("5319"),n("159b"),n("ddb0");var a=n("ade3"),r=n("5530"),i=(n("4b85"),n("2b0e")),s=n("d9f7"),o=n("80d2"),u=["sm","md","lg","xl"],d=["start","end","center"];function l(e,t){return u.reduce((function(n,a){return n[e+Object(o["H"])(a)]=t(),n}),{})}var p=function(e){return[].concat(d,["baseline","stretch"]).includes(e)},c=l("align",(function(){return{type:String,default:null,validator:p}})),f=function(e){return[].concat(d,["space-between","space-around"]).includes(e)},m=l("justify",(function(){return{type:String,default:null,validator:f}})),y=function(e){return[].concat(d,["space-between","space-around","stretch"]).includes(e)},g=l("alignContent",(function(){return{type:String,default:null,validator:y}})),h={align:Object.keys(c),justify:Object.keys(m),alignContent:Object.keys(g)},b={align:"align",justify:"justify",alignContent:"align-content"};function v(e,t,n){var a=b[e];if(null!=n){if(t){var r=t.replace(e,"");a+="-".concat(r)}return a+="-".concat(n),a.toLowerCase()}}var I=new Map;t["a"]=i["a"].extend({name:"v-row",functional:!0,props:Object(r["a"])(Object(r["a"])(Object(r["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:p}},c),{},{justify:{type:String,default:null,validator:f}},m),{},{alignContent:{type:String,default:null,validator:y}},g),render:function(e,t){var n=t.props,r=t.data,i=t.children,o="";for(var u in n)o+=String(n[u]);var d=I.get(o);return d||function(){var e,t;for(t in d=[],h)h[t].forEach((function(e){var a=n[e],r=v(t,e,a);r&&d.push(r)}));d.push((e={"no-gutters":n.noGutters,"row--dense":n.dense},Object(a["a"])(e,"align-".concat(n.align),n.align),Object(a["a"])(e,"justify-".concat(n.justify),n.justify),Object(a["a"])(e,"align-content-".concat(n.alignContent),n.alignContent),e)),I.set(o,d)}(),e(n.tag,Object(s["a"])(r,{staticClass:"row",class:d}),i)}})},"4bd4":function(e,t,n){"use strict";n("4de4"),n("7db0"),n("4160"),n("caad"),n("07ac"),n("2532"),n("159b");var a=n("5530"),r=n("58df"),i=n("7e2b"),s=n("3206");t["a"]=Object(r["a"])(i["a"],Object(s["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(e){var t=Object.values(e).includes(!0);this.$emit("input",!t)},deep:!0,immediate:!0}},methods:{watchInput:function(e){var t=this,n=function(e){return e.$watch("hasError",(function(n){t.$set(t.errorBag,e._uid,n)}),{immediate:!0})},a={_uid:e._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?a.shouldValidate=e.$watch("shouldValidate",(function(r){r&&(t.errorBag.hasOwnProperty(e._uid)||(a.valid=n(e)))})):a.valid=n(e),a},validate:function(){return 0===this.inputs.filter((function(e){return!e.validate(!0)})).length},reset:function(){this.inputs.forEach((function(e){return e.reset()})),this.resetErrorBag()},resetErrorBag:function(){var e=this;this.lazyValidation&&setTimeout((function(){e.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(e){return e.resetValidation()})),this.resetErrorBag()},register:function(e){this.inputs.push(e),this.watchers.push(this.watchInput(e))},unregister:function(e){var t=this.inputs.find((function(t){return t._uid===e._uid}));if(t){var n=this.watchers.find((function(e){return e._uid===t._uid}));n&&(n.valid(),n.shouldValidate()),this.watchers=this.watchers.filter((function(e){return e._uid!==t._uid})),this.inputs=this.inputs.filter((function(e){return e._uid!==t._uid})),this.$delete(this.errorBag,t._uid)}}},render:function(e){var t=this;return e("form",{staticClass:"v-form",attrs:Object(a["a"])({novalidate:!0},this.attrs$),on:{submit:function(e){return t.$emit("submit",e)}}},this.$slots.default)}})},"4c03":function(e,t,n){"use strict";n("a15b"),n("96cf");var a=n("1da1"),r=n("5530"),i=n("f4d6"),s=n("9d8f"),o=n.n(s),u=n("ebc9"),d=n("b0d9"),l=n("a86d"),p=n("5089"),c=n("6f56"),f={load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("Category.php",Object(r["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},m={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:p["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===p["b"].getLang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[l["a"],l["a"],l["a"]],header:!1}},y=i["IKDataEntity"].ModelFactory(m,f),g={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),o.a.post("Category.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),o.a.postWithUploadFile("Category.php?op=update",Object(r["a"])(Object(r["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return o.a.post("Category.php?op=delete",{id:e})},load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("Category.php",Object(r["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},h={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},categorySort:{type:i["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{default:50,required:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:p["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===p["b"].getLang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[l["a"],l["a"],l["a"]],header:!1},dishesCategoryTypeId:{displayName:"labelType",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList}}},attributeGroupId:{displayName:"attributeGroupNames",type:i["IKDataEntity"].Types.Option,tableConfig:{width:"100px"},formConfig:{required:!1,type:{selectItems:d["a"].getList,multiple:!0}}},consumeTypeIds:{type:i["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:c["a"].getList,multiple:!0}}},freeInConsumeTypeIds:{type:i["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:c["a"].getList,multiple:!0}}},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}},printOrder:{type:i["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},parentId:{type:i["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:y.getList,itemText:"_langsname"}},header:!1}};t["a"]=i["IKDataEntity"].ModelFactory(h,g)},6306:function(e,t,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("f4d6"),s=n("9d8f"),o=n.n(s),u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},upsideDown:{type:i["IKDataEntity"].Types.Boolean},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},d={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("Printer.php",Object(a["a"])({op:"showPrinterGroups"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return o.a.postWithUploadFile("Printer.php?op=addPrinterGroups",e,{showLoading:!0})},edit:function(e){return o.a.postWithUploadFile("Printer.php?op=updatePrinterGroups",e,{showLoading:!0})},remove:function(e){return o.a.post("Printer.php?op=deletePrinterGroup",{id:e})}};t["a"]=i["IKDataEntity"].ModelFactory(u,d)},"6a28":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{fluid:""}},[n("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"indigo",icon:"mdi-pencil-box-multiple-outline",inline:""},scopedSlots:e._u([{key:"after-heading",fn:function(){return[n("div",{staticClass:"display-2 font-weight-light"},[e._v(" "+e._s(e.$t("快速添加菜品"))+" ")])]},proxy:!0}])},[n("v-container",[n("v-form",{ref:"form",attrs:{"lazy-validation":!1},model:{value:e.valid,callback:function(t){e.valid=t},expression:"valid"}},[n("span",{staticClass:"subtitle-1 font-weight-bold"},[e._v(e._s(e.$t("菜品信息")))]),e._l(e.savedItemsList.length,(function(t,a){return[n("v-row",{key:a,staticClass:"mb-0 mt-0",attrs:{dense:""}},[n("v-col",{attrs:{cols:"12",md:"2",sm:"12"}},[n("v-text-field",{attrs:{label:e.$t("code"),rules:e.textRules,required:"",dense:"",outlined:""},scopedSlots:e._u([{key:"append",fn:function(){return[n("div",{staticClass:"red--text"},[e._v(" * ")])]},proxy:!0}],null,!0),model:{value:e.savedItemsList[a].code,callback:function(t){e.$set(e.savedItemsList[a],"code",t)},expression:"savedItemsList[index].code"}})],1),n("v-col",{attrs:{cols:"12",md:"2",sm:"12"}},[n("v-text-field",{attrs:{label:e.$t("price"),rules:e.priceRules,required:"",dense:"",outlined:""},scopedSlots:e._u([{key:"append",fn:function(){return[n("div",{staticClass:"red--text"},[e._v(" * ")])]},proxy:!0}],null,!0),model:{value:e.savedItemsList[a].price,callback:function(t){e.$set(e.savedItemsList[a],"price",t)},expression:"savedItemsList[index].price"}})],1),n("v-col",{attrs:{cols:"12",md:"3",sm:"12"}},[n("v-text-field",{attrs:{label:e.$t("nameDE"),rules:e.textRules,required:"",dense:"",outlined:""},scopedSlots:e._u([{key:"append",fn:function(){return[n("div",{staticClass:"red--text"},[e._v(" * ")])]},proxy:!0}],null,!0),model:{value:e.savedItemsList[a].nameDE,callback:function(t){e.$set(e.savedItemsList[a],"nameDE",t)},expression:"savedItemsList[index].nameDE"}})],1),n("v-col",{attrs:{cols:"12",md:"2",sm:"12"}},[n("v-select",{attrs:{items:e.printGroupList,"item-text":"name","item-value":"id",label:e.$t("printCatName"),rules:e.textRules,required:"",dense:"",outlined:""},scopedSlots:e._u([{key:"append",fn:function(){return[n("div",{staticClass:"red--text"},[e._v(" * ")])]},proxy:!0}],null,!0),model:{value:e.savedItemsList[a].printGroupId,callback:function(t){e.$set(e.savedItemsList[a],"printGroupId",t)},expression:"savedItemsList[index].printGroupId"}})],1),n("v-col",{attrs:{cols:"12",md:"2",sm:"12"}},[n("v-select",{attrs:{items:e.categoryList,"item-text":"_langsname","item-value":"id",label:e.$t("labelName"),rules:e.textRules,required:"",dense:"",outlined:""},scopedSlots:e._u([{key:"append",fn:function(){return[n("div",{staticClass:"red--text"},[e._v(" * ")])]},proxy:!0}],null,!0),model:{value:e.savedItemsList[a].categoryId,callback:function(t){e.$set(e.savedItemsList[a],"categoryId",t)},expression:"savedItemsList[index].categoryId"}})],1),e.savedItemsList.length>1?n("v-col",{attrs:{cols:"12",md:"1",sm:"12"}},[n("v-btn",{attrs:{icon:"","x-large":"",color:"primary"},on:{click:function(t){return e.deleteItem(a)}}},[n("v-icon",[e._v(" mdi-delete-circle ")])],1)],1):e._e()],1)]})),n("v-btn",{staticClass:"ml-4",attrs:{icon:"",large:"",color:"primary"},on:{click:function(t){return e.nPlus()}}},[n("v-icon",[e._v(" mdi-pencil-plus ")]),e._v(" "+e._s(e.$t("添加菜品"))+" ")],1)],2),n("v-divider",{staticClass:"mx-2 my-2"}),n("v-row",[n("v-spacer"),n("v-btn",{attrs:{color:!0===e.valid?"primary":"grey"},on:{click:function(t){return e.submit()}}},[e._v(" "+e._s(e.$t("保存"))+" ")])],1)],1)],1)],1)},r=[],i=(n("4160"),n("a434"),n("b0c0"),n("3ca3"),n("159b"),n("ddb0"),n("b85c")),s=(n("96cf"),n("1da1")),o=n("4c03"),u=n("6306"),d=n("c791"),l={data:function(){var e=this;return{valid:!0,categoryList:[],printGroupList:[],textRules:[function(t){return!!t||e.$t("Item is required")}],priceRules:[function(e){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(e)||"Bitte geben Sie den richtigen Preis ein"}],defaultItem:{code:"",price:"",nameDE:"",categoryId:"",printGroupId:""},langs:[{lang:"zh",id:1,name:""},{lang:"en",id:2,name:""},{lang:"de",id:3,name:""}],savedItemsList:[]}},mounted:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.savedItemsList.push(e.defaultItem),t.next=3,o["a"].getList();case 3:return e.categoryList=t.sent,t.next=6,u["a"].getList();case 6:e.printGroupList=t.sent;case 7:case"end":return t.stop()}}),t)})))()},methods:{nPlus:function(){this.defaultItem={code:"",price:"",nameDE:"",categoryId:"",printGroupId:""},this.savedItemsList.push(this.defaultItem)},deleteItem:function(e){this.savedItemsList.splice(e,1)},submit:function(){var e=this;return Object(s["a"])(regeneratorRuntime.mark((function t(){var n,a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!0!==e.valid){t.next=20;break}n=Object(i["a"])(e.savedItemsList),t.prev=2,r=regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=a.value,e.langs.forEach((function(e){e.name=n.nameDE})),n.langs=e.langs,t.next=5,d["a"].multipleAdd(n);case 5:case"end":return t.stop()}}),t)})),n.s();case 5:if((a=n.n()).done){t.next=9;break}return t.delegateYield(r(),"t0",7);case 7:t.next=5;break;case 9:t.next=14;break;case 11:t.prev=11,t.t1=t["catch"](2),n.e(t.t1);case 14:return t.prev=14,n.f(),t.finish(14);case 17:e.$router.push({path:"/dishes/dishes-manage"}),t.next=21;break;case 20:e.$refs.form.validate();case 21:case"end":return t.stop()}}),t,null,[[2,11,14,17]])})))()}}},p=l,c=n("2877"),f=n("6544"),m=n.n(f),y=n("8336"),g=n("62ad"),h=n("a523"),b=n("ce7e"),v=n("4bd4"),I=n("132d"),C=n("0fd9"),w=n("b974"),N=n("2fa4"),x=n("8654"),O=Object(c["a"])(p,a,r,!1,null,null,null);t["default"]=O.exports;m()(O,{VBtn:y["a"],VCol:g["a"],VContainer:h["a"],VDivider:b["a"],VForm:v["a"],VIcon:I["a"],VRow:C["a"],VSelect:w["a"],VSpacer:N["a"],VTextField:x["a"]})},"6e35":function(e,t,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("f4d6"),s=n("9d8f"),o=n.n(s),u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"allergName"},icon:{displayName:"icon"},shortName:{displayName:"shortName"},displayText:{displayName:"displayText"}},d={add:function(e){return o.a.postWithUploadFile("Dishes.php?op=addAllergen",e,{showLoading:!0})},edit:function(e){return o.a.postWithUploadFile("Dishes.php?op=updateAllergen",e,{showLoading:!0})},remove:function(e){return o.a.post("Dishes.php?op=deleteAllergen",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("Dishes.php",Object(a["a"])({op:"showAllAllergen"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["IKDataEntity"].ModelFactory(u,d)},"6f56":function(e,t,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("f4d6"),s=n("9d8f"),o=n.n(s),u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"staffName"},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}}},d={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("Complex.php",Object(a["a"])({op:"showAllConsumeTypeInfo"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return o.a.post("ConsumeType.php?op=add",Object(a["a"])(Object(a["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return o.a.postWithUploadFile("ConsumeType.php?op=update",Object(a["a"])(Object(a["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return o.a.post("ConsumeType.php?op=delete",{id:e})}};t["a"]=i["IKDataEntity"].ModelFactory(u,d)},a86d:function(e,t,n){"use strict";var a=n("f4d6"),r={id:{type:a["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=a["IKDataEntity"].ModelFactory(r,{})},b0d9:function(e,t,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("5089"),s=n("f4d6"),o=n("9d8f"),u=n.n(o),d={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:s["IKDataEntity"].Types.Boolean},multiSelect:{type:s["IKDataEntity"].Types.Boolean},attrubuteCount:{type:s["IKDataEntity"].Types.Integer,form:!1}},l={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("Category.php",Object(a["a"])({op:"showAttributeGroup",lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return u.a.postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return u.a.postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return u.a.post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=s["IKDataEntity"].ModelFactory(d,l)},c791:function(e,t,n){"use strict";n("a4d3"),n("e01a"),n("4de4"),n("0481"),n("caad"),n("a15b"),n("d81d"),n("4069"),n("b0c0"),n("ac1f"),n("2532"),n("1276"),n("96cf");var a=n("1da1"),r=n("5530"),i=n("f4d6"),s=n("9d8f"),o=n.n(s),u=n("5089"),d=n("c0d6"),l=n("4c03"),p=n("6306"),c=n("6e35"),f=n("a86d"),m=n("b0d9"),y=n("9225"),g=Boolean("0"===u["b"].isShowOnTable),h={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",form:!1},code:{},image:{type:i["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return d["a"].getters.rootUrl+u["b"].dishImageRoot}},required:!1},displayName:"image",header:g},dishName:{displayName:"name",form:!1},price:{type:i["IKDataEntity"].Types.Float,formConfig:{default:"",overwriteRule:!0,rule:[function(e){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(e)||"Bitte geben Sie den richtigen Preis ein"}]}},langs:{displayName:"name",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"name",default:u["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===u["b"].getLang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[f["a"],f["a"],f["a"]],header:!1},printGroupId:{displayName:"printCatName",type:i["IKDataEntity"].Types.Option,formConfig:{default:1,type:{selectItems:p["a"].getList}}},categoryId:{displayName:"labelName",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList,itemText:"_langsname"}}},AllergenId:{displayName:y["a"].t("过敏源"),type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList,multiple:!0},required:!1},header:!1},attributeGroupId:{displayName:"attributeGroupNames",type:i["IKDataEntity"].Types.Option,formConfig:{merge:!1,required:!1,type:{selectItems:m["a"].getList,multiple:!0,disabledItem:function(e,t){return t.inheritAttributeGroupId?Object(r["a"])(Object(r["a"])({},e),{},{disabled:t.inheritAttributeGroupId.includes(e.id)}):e}}},header:!1},localAttributeGroupId:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:m["a"].getList,multiple:!0},inNew:!1,inEdit:!1},header:!1},inheritAttributeGroupId:{displayName:"AttributeGroupName",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:m["a"].getList,multiple:!0},inNew:!1,inEdit:!1},header:!1},dishWeight:{displayName:"DishWeight",type:i["IKDataEntity"].Types.Integer,formConfig:{default:1,required:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]},header:!1},isActive:{type:i["IKDataEntity"].Types.Boolean,displayName:"isActive",formConfig:{default:1,required:!1},header:!1},dishAlias:{required:!1,formConfig:{requiredNew:!1,requiredEdit:!1}},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}}},b={multipleAdd:function(e){return o.a.postWithUploadFile("Dishes.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!1})},add:function(e){return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),o.a.postWithUploadFile("Dishes.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},edit:function(e){return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),e.file&&(e.imageExt=e.file.name.split(".")[1]),o.a.postWithUploadFile("Dishes.php?op=update",Object(r["a"])(Object(r["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},remove:function(e){return o.a.post("Dishes.php?op=delete",{id:e})},load:function(){var e=Object(a["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o.a.get("Dishes.php",Object(r["a"])({lang:u["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.id=e.dishId,e.attributeGroupId=[e.inheritAttributeGroupId?e.inheritAttributeGroupId.split(","):[],e.localAttributeGroupId?e.localAttributeGroupId.split(","):[]].flat().join(","),e.langs=e.langs.map((function(e){return Object(r["a"])(Object(r["a"])({},e),{},{desc:e.description})})),e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},v=i["IKDataEntity"].ModelFactory(h,b);v.getBuffet=Object(a["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,v.getList();case 2:return e.abrupt("return",e.sent.filter((function(e){return"8"===e.dishesCategoryTypeId})));case 3:case"end":return e.stop()}}),e)}))),t["a"]=v},ebc9:function(e,t,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("5089"),s=n("f4d6"),o=n("9d8f"),u=n.n(o),d={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},l={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("CategoryType.php",Object(a["a"])({lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=s["IKDataEntity"].ModelFactory(d,l)}}]);
//# sourceMappingURL=chunk-00b674ac.b7e1bf5e.js.map