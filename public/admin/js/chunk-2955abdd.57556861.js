(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2955abdd"],{"4c03":function(e,t,a){"use strict";var n=a("b85c"),i=a("c7eb"),r=a("1da1"),o=a("5530"),s=(a("ac1f"),a("00b4"),a("a15b"),a("e9c4"),a("f4d6")),p=a("9d8f"),u=a.n(p),c=a("ebc9"),d=a("a86d"),l=a("5089"),y=a("641f"),m=a.n(y),f=a("c0d6"),g=a("b0d9"),b=Boolean("0"===l["b"].isShowOnTable),h=["#FFCDD2","#F8BBD0","#E1BEE7","#D1C4E9","#C5CAE9","#BBDEFB","#B3E5FC","#B2EBF2","#B2DFDB","#C8E6C9","#DCEDC8","#F0F4C3","#FFF9C4","#FFECB3","#FFE0B2","#FFCCBC","#D7CCC8","#CFD8DC"],C={id:{type:s["IKDataEntity"].Types.Integer,form:!1,table:!1},color:{type:s["IKDataEntity"].Types.Color,formConfig:{required:!1}},dcImage:{type:s["IKDataEntity"].Types.Image,formConfig:{required:!1,type:{root:function(){return f["a"].getters.rootUrl+l["b"].dcImageRoot}}},displayName:"image",header:b},attributeGroupId:{displayName:"attributeGroupNames",type:s["IKDataEntity"].Types.Option,tableConfig:{width:"100px"},formConfig:{required:!1,type:{selectItems:g["a"].getList,multiple:!0}}},_langsname:{displayName:"KategorieName",form:!1},langs:{displayName:"labelName",type:s["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:l["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===l["b"].getLang().toUpperCase()},displayChild:function(e){return console.log(e),"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1},dishesCategoryTypeId:{displayName:"warengruppe",type:s["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList}}},printOrder:{type:s["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},categorySort:{type:s["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{required:!0}}},I={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,u.a.post("Category.php?op=add",Object(o["a"])(Object(o["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,console.log("label-manage: item()",e),u.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return u.a.post("Category.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(Object(i["a"])().mark((function e(t){var a;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("Category.php",t);case 2:return a=e.sent.content,console.log(a,"cate response"),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),randomColor:function(){var e=Object(r["a"])(Object(i["a"])().mark((function e(t){var a,r,s;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:m.a.showLoading(!0),a=Object(n["a"])(t),e.prev=2,a.s();case 4:if((r=a.n()).done){e.next=13;break}return s=r.value,s.appliedAttributeGroup=s.attributeGroupId.join(","),s.catTypeId=s.dishesCategoryTypeId,s.color=h[Math.round(18*Math.random())],e.next=11,u.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},s),{},{langs:JSON.stringify(s.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:m.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeAllColor:function(){var e=Object(r["a"])(Object(i["a"])().mark((function e(t){var a,r,s;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:m.a.showLoading(!0),a=Object(n["a"])(t),e.prev=2,a.s();case 4:if((r=a.n()).done){e.next=13;break}return s=r.value,s.appliedAttributeGroup=s.attributeGroupId.join(","),s.catTypeId=s.dishesCategoryTypeId,s.color="#FFFFFF",e.next=11,u.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},s),{},{langs:JSON.stringify(s.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:m.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeCategoryImage:function(){var e=Object(r["a"])(Object(i["a"])().mark((function e(t){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.post("Category.php?op=removeCategoryImage",Object(o["a"])({},t),{showLoading:!0});case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},T=s["IKDataEntity"].ModelFactory(C,I);console.log("Category",T),t["a"]=T},6306:function(e,t,a){"use strict";var n=a("c7eb"),i=a("5530"),r=a("1da1"),o=a("f4d6"),s=a("9d8f"),p=a.n(s),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:o["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:o["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},upsideDown:{type:o["IKDataEntity"].Types.Boolean},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},c={load:function(){var e=Object(r["a"])(Object(n["a"])().mark((function e(t){var a;return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Printer.php",Object(i["a"])({op:"showPrinterGroups"},t));case 2:return a=e.sent.content,console.log("printer",a),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return p.a.postWithUploadFile("Printer.php?op=addPrinterGroups",e,{showLoading:!0})},edit:function(e){return p.a.postWithUploadFile("Printer.php?op=updatePrinterGroups",e,{showLoading:!0})},remove:function(e){return p.a.post("Printer.php?op=deletePrinterGroup",{id:e})}};t["a"]=o["IKDataEntity"].ModelFactory(u,c)},"6e35":function(e,t,a){"use strict";var n=a("c7eb"),i=a("5530"),r=a("1da1"),o=a("f4d6"),s=a("9d8f"),p=a.n(s),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"allergName"},icon:{displayName:"icon"},shortName:{displayName:"shortName"},displayText:{displayName:"displayText"}},c={add:function(e){return p.a.postWithUploadFile("Dishes.php?op=addAllergen",e,{showLoading:!0})},edit:function(e){return p.a.postWithUploadFile("Dishes.php?op=updateAllergen",e,{showLoading:!0})},remove:function(e){return p.a.post("Dishes.php?op=deleteAllergen",{id:e})},load:function(){var e=Object(r["a"])(Object(n["a"])().mark((function e(t){return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Dishes.php",Object(i["a"])({op:"showAllAllergen"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(u,c)},"6f56":function(e,t,a){"use strict";var n=a("c7eb"),i=a("5530"),r=a("1da1"),o=(a("d3b7"),a("159b"),a("07ac"),a("b0c0"),a("e9c4"),a("f4d6")),s=a("9d8f"),p=a.n(s),u=a("5089"),c=a("a86d"),d={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},langs:{displayName:"name",type:o["IKDataEntity"].Types.Group,formConfig:{groupName:"name",default:u["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===u["b"].getLang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[c["a"],c["a"],c["a"]],header:!1},name:{displayName:"shownName",form:!1},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"},color:{type:o["IKDataEntity"].Types.Color,formConfig:{required:!1}}},l={load:function(){var e=Object(r["a"])(Object(n["a"])().mark((function e(t){var a;return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Complex.php",Object(i["a"])({op:"showAllConsumeTypeInfo",lang:u["b"].getLang()},t));case 2:return a=e.sent.content,console.log(a,"response"),a.forEach((function(e){e.langs=Object.values(e.langs)})),e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return e.name=e.langs[2].name,p.a.post("ConsumeType.php?op=add",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.name=e.langs[2].name,p.a.postWithUploadFile("ConsumeType.php?op=update",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return p.a.post("ConsumeType.php?op=delete",{id:e})}};t["a"]=o["IKDataEntity"].ModelFactory(d,l)},a86d:function(e,t,a){"use strict";var n=a("f4d6"),i={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=n["IKDataEntity"].ModelFactory(i,{})},b0d9:function(e,t,a){"use strict";var n=a("c7eb"),i=a("5530"),r=a("1da1"),o=a("5089"),s=a("f4d6"),p=a("9d8f"),u=a.n(p),c={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:s["IKDataEntity"].Types.Boolean},multiSelect:{type:s["IKDataEntity"].Types.Boolean},attrubuteCount:{type:s["IKDataEntity"].Types.Integer,form:!1}},d={load:function(){var e=Object(r["a"])(Object(n["a"])().mark((function e(t){return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("Category.php",Object(i["a"])({op:"showAttributeGroup",lang:o["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return u.a.postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return u.a.postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return u.a.post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=s["IKDataEntity"].ModelFactory(c,d)},c41c7:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-tabs",{model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("v-tab",[e._v(e._s(e.$t("选择消费类型")))]),e.activeConsumeTypeIndex?[a("v-tab",[e._v(e._s(e.$t("修改包餐设置")))]),a("v-tab",[e._v(e._s(e.$t("修改饱餐菜品设置")))])]:e._e(),a("v-tab-item",[a("v-card",[a("v-card-title",[e._v(" "+e._s(e.$t("请选择消费类型"))+" ")]),a("v-card-text",[a("v-select",{attrs:{items:e.consumeTypes,"item-text":"name","item-value":"id",label:e.$t("consumeTypeId")},model:{value:e.activeConsumeTypeIndex,callback:function(t){e.activeConsumeTypeIndex=t},expression:"activeConsumeTypeIndex"}})],1),e.activeConsumeTypeIndex?[a("div",{staticClass:"flex justify-space-between"},[a("v-btn",{staticClass:"primary mb-3 ml-4",on:{click:function(t){e.settingDialog=!0}}},[e._v(" "+e._s(e.$t("Buffet Setting"))+" ")]),a("v-btn",{attrs:{color:"red mb-3 ml-4"},on:{click:e.resetTime}},[e._v(" "+e._s(e.$t("重置全部自助餐时间"))+" ")])],1),a("v-dialog",{attrs:{"max-width":"500"},model:{value:e.settingDialog,callback:function(t){e.settingDialog=t},expression:"settingDialog"}},[a("v-card",{attrs:{"max-width":"500"}},[a("v-card-title",[e._v(" "+e._s(e.$t("自助餐"))+" "),a("v-spacer")],1),a("v-card-text",[a("v-row",[a("v-col",[a("v-text-field",{attrs:{"hide-details":"",label:e.$t("轮数")},model:{value:e.setting.totalRound,callback:function(t){e.$set(e.setting,"totalRound",t)},expression:"setting.totalRound"}})],1),a("v-col",[a("v-text-field",{attrs:{"hide-details":"",label:e.$t("每轮时间")},model:{value:e.setting.roundTime,callback:function(t){e.$set(e.setting,"roundTime",t)},expression:"setting.roundTime"}})],1)],1),a("v-row",[a("v-col",[a("v-text-field",{attrs:{"hide-details":"",label:e.$t("最大用餐时间")},model:{value:e.setting.maxDineTime,callback:function(t){e.$set(e.setting,"maxDineTime",t)},expression:"setting.maxDineTime"}})],1),a("v-col",[a("v-text-field",{attrs:{"hide-details":"",label:e.$t("儿童每轮数量")},model:{value:e.setting.childRoundDishCount,callback:function(t){e.$set(e.setting,"childRoundDishCount",t)},expression:"setting.childRoundDishCount"}})],1)],1),a("v-row",[a("v-col",[a("v-btn",{attrs:{color:"primary",block:""}},[e._v(" "+e._s(e.$t("更新"))+" ")])],1)],1)],1)],1)],1)]:e._e()],2)],1),e.activeConsumeTypeIndex?[a("v-tab-item",[a("v-row",{staticClass:"mt-4 pa-4"},[a("v-col",{attrs:{cols:"12",lg:"6",md:"6"}},[a("v-card",[a("ik-data-table",{attrs:{"one-page-arrangement":!1,model:e.buffetPriceModel,filter:e.filter,"entity-name":e.$t("自助价格菜品"),icon:"mdi-account-child","use-edit-action":!1}})],1)],1),a("v-col",{attrs:{cols:"12",lg:"6",md:"6"}},[a("v-card",[a("ik-data-table",{attrs:{"one-page-arrangement":!1,model:e.buffetModel,filter:e.filter,"entity-name":e.$t("时间设置"),icon:"mdi-account-child"}})],1)],1)],1)],1),a("v-tab-item",[a("ik-data-table",{attrs:{model:e.model,filter:e.filter,"entity-name":e.$t("自助类型设置"),icon:"mdi-account-child","use-action":!1}})],1)]:e._e()],2)],1)},i=[],r=a("53ca"),o=a("c7eb"),s=a("1da1"),p=a("2909"),u=(a("d3b7"),a("3ca3"),a("ddb0"),a("d81d"),a("99af"),a("f4d6")),c=a("9d8f"),d=a.n(c),l=a("c791"),y=a("4c03"),m=a("ebc9"),f={code:{},dishId:{displayName:"name",type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList,itemText:"_langsname"}}},dishesCategoryId:{type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:y["a"].getList,itemText:"_langsname"}}},dishesCategoryTypeId:{displayName:"warengruppe",type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:m["a"].getList,itemText:"name"}}},showing:{type:u["IKDataEntity"].Types.Boolean},isFree:{type:u["IKDataEntity"].Types.Boolean}},g=0,b={edit:function(e){var t=[];return t.push(d.a.post("Dishes.php",e,{params:{op:(e.showing?"enable":"disable")+"SingleDishShowInConsumeType"}})),t.push(d.a.post("Dishes.php",e,{params:{op:(e.isFree?"enable":"disable")+"SingleDishFreeInConsumeType"}})),Promise.all(t)},load:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(t){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d.a.get.apply(d.a,["Dishes.php?op=showDishesShowAndFreeByConsumeType"].concat(Object(p["a"])(t)));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.id=g,g++,e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},h=u["IKDataEntity"].ModelFactory(f,b),C=a("6f56"),I=a("5530"),T=a("b85c"),v=a("caae"),O=a("641f"),w=a.n(O),D={id:{type:u["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},header:!1,formConfig:{requiredNew:!1}},consumeTypeId:{type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:C["a"].getList,itemText:"name"}}},fromTime:{type:u["IKDataEntity"].Types.Time},toTime:{type:u["IKDataEntity"].Types.Time},dayOfWeek:{type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:v["a"].getList(),itemText:"name",multiple:!0}}}},j={load:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(t){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d.a.get.apply(d.a,["ConsumeType.php?op=showConsumeTypeTimeSpanByConsumeType"].concat(Object(p["a"])(t)));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(t){var a,n,i,r;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=t,console.log(a,"tempItem"),n=Object(T["a"])(t.dayOfWeek);try{for(n.s();!(i=n.n()).done;)r=i.value,a.dayOfWeek=r,d.a.post("ConsumeType.php?op=addConsumeTypeTimeSpan",Object(I["a"])({},a),{showLoading:!0})}catch(o){n.e(o)}finally{n.f()}case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),remove:function(e){return d.a.post("ConsumeType.php?op=deleteConsumeTypeTimeSpan",{id:e})},edit:function(e){return console.log("edit item",e),d.a.postWithUploadFile("ConsumeType.php?op=editConsumeTypeTimeSpan",e,{showLoading:!0})},resetTimeSpan:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(t){var a,n,i;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:w.a.showLoading(!0),a=Object(T["a"])(t);try{for(a.s();!(n=a.n()).done;)i=n.value,i.fromTime="00:00:00",i.toTime="23:59:59",d.a.postWithUploadFile("ConsumeType.php?op=editConsumeTypeTimeSpan",i,{showLoading:!1})}catch(r){a.e(r)}finally{a.f()}w.a.toast("OK");case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},x=u["IKDataEntity"].ModelFactory(D,j),E={dishesId:{type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getBuffet,itemText:"_langsname"}}},consumeTypeId:{type:u["IKDataEntity"].Types.Option,formConfig:{disableEdit:!0,type:{selectItems:C["a"].getList,itemText:"name"}}},isForAdult:{type:u["IKDataEntity"].Types.Boolean}},N={load:function(){var e=Object(s["a"])(Object(o["a"])().mark((function e(t){return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d.a.get.apply(d.a,["ConsumeType.php?op=showBuffetPriceDishToConsumeTypeByConsumeType"].concat(Object(p["a"])(t)));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.id=e.dishesId,e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return e.dishId=e.dishesId,e.isForAdult=e.isForAdult?1:0,d.a.postWithUploadFile("ConsumeType.php?op=setBuffetPriceDishToConsumeType",e,{showLoading:!0})},remove:function(e){var t={dishId:e};return d.a.post("ConsumeType.php?op=deleteBuffetPriceDishToConsumeType",t)}},K=u["IKDataEntity"].ModelFactory(E,N),F={roundDishCount:0,childRoundDishCount:0,maxDineTime:0,roundTime:0,totalRound:0},L={name:"BuffetSetting",components:{IkDataTable:u["IkDataTable"]},data:function(){return{tab:null,model:h,buffetModel:x,buffetPriceModel:K,consumeTypes:[],settingDialog:!1,dishes:[],activeConsumeTypeIndex:null,setting:F}},computed:{filter:function(){return this.activeConsumeTypeIndex?{consumeTypeId:this.activeConsumeTypeIndex}:null}},mounted:function(){var e=this;return Object(s["a"])(Object(o["a"])().mark((function t(){return Object(o["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,C["a"].getList();case 2:return e.consumeTypes=t.sent,t.next=5,l["a"].getList();case 5:e.dishes=t.sent;case 6:case"end":return t.stop()}}),t)})))()},methods:{resetTime:function(){return Object(s["a"])(Object(o["a"])().mark((function e(){var t;return Object(o["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,x.getList();case 2:return t=e.sent,console.log("async timespan:",t,"typeof fromTime",Object(r["a"])(t[0].fromTime)),e.next=6,x.resetTimeSpan(t);case 6:case"end":return e.stop()}}),e)})))()}}},G=L,k=a("2877"),A=a("6544"),B=a.n(A),S=a("8336"),P=a("b0af"),_=a("99d9"),q=a("62ad"),$=a("169a"),W=a("0fd9"),U=a("b974"),M=a("2fa4"),R=a("71a3"),V=a("c671"),J=a("fe57"),z=a("8654"),Z=Object(k["a"])(G,n,i,!1,null,"62067445",null);t["default"]=Z.exports;B()(Z,{VBtn:S["a"],VCard:P["a"],VCardText:_["b"],VCardTitle:_["c"],VCol:q["a"],VDialog:$["a"],VRow:W["a"],VSelect:U["a"],VSpacer:M["a"],VTab:R["a"],VTabItem:V["a"],VTabs:J["a"],VTextField:z["a"]})},c791:function(e,t,a){"use strict";var n=a("c7eb"),i=a("1da1"),r=a("5530"),o=(a("ac1f"),a("00b4"),a("caad"),a("2532"),a("d81d"),a("fb6a"),a("a15b"),a("0481"),a("4069"),a("1276"),a("a4d3"),a("e01a"),a("e9c4"),a("4de4"),a("d3b7"),a("b0c0"),a("f4d6")),s=a("9d8f"),p=a.n(s),u=a("5089"),c=a("c0d6"),d=a("4c03"),l=a("6306"),y=a("6e35"),m=a("a86d"),f=a("b0d9"),g=a("9225"),b=Boolean("0"===u["b"].isShowOnTable),h={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",form:!1,header:!0},image:{type:o["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return c["a"].getters.rootUrl+u["b"].dishImageRoot}},required:!1},tableConfig:{filterable:!1},displayName:"image",header:b},color:{type:o["IKDataEntity"].Types.Color,formConfig:{required:!1},tableConfig:{filterable:!1}},code:{tableConfig:{width:"60px"},header:!1},displayCode:{displayName:"code",form:!1,tableConfig:{}},dishName:{displayName:"name",form:!1,tableConfig:{}},price:{type:o["IKDataEntity"].Types.Float,formConfig:{default:"",overwriteRule:!0,rule:[function(e){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(e)||"Bitte geben Sie den richtigen Preis ein"}]}},langs:{displayName:"name",type:o["IKDataEntity"].Types.Group,formConfig:{groupName:"name",default:u["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toLowerCase()===u["b"].getLang().toLowerCase()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[m["a"],m["a"],m["a"]],header:!1},printGroupId:{displayName:g["a"].t("printCatName"),type:o["IKDataEntity"].Types.Option,formConfig:{default:1,type:{selectItems:l["a"].getList}}},extraPrintGroupIds:{displayName:g["a"].t("extraPrintGroup"),type:o["IKDataEntity"].Types.Option,formConfig:{type:{multiple:!0,selectItems:l["a"].getList},required:!1},header:!1},categoryId:{displayName:"分类",tableConfig:{filterable:!1},type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,itemText:"_langsname"}}},AllergenId:{displayName:g["a"].t("过敏源"),type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:y["a"].getList,multiple:!0},required:!1},header:!1},attributeGroupId:{displayName:g["a"].t("attributeGroupNames"),type:o["IKDataEntity"].Types.Option,formConfig:{merge:!1,required:!1,type:{selectItems:f["a"].getList,multiple:!0,disabledItem:function(e,t){return t.inheritAttributeGroupId?Object(r["a"])(Object(r["a"])({},e),{},{disabled:t.inheritAttributeGroupId.includes(e.id)}):e}}},header:!1},localAttributeGroupId:{type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:f["a"].getList,multiple:!0}},form:!1,header:!1},inheritAttributeGroupId:{displayName:"AttributeGroupName",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:f["a"].getList,multiple:!0}},form:!1,header:!1},dishWeight:{displayName:"DishWeight",type:o["IKDataEntity"].Types.Integer,formConfig:{default:1,required:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]},header:!1},isActive:{type:o["IKDataEntity"].Types.Boolean,displayName:"isActive",formConfig:{default:1,required:!1}},dishAlias:{required:!1,formConfig:{requiredNew:!1,requiredEdit:!1},header:!1}},C={load:function(){var e=Object(i["a"])(Object(n["a"])().mark((function e(t){return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Dishes.php",Object(r["a"])({lang:u["b"].getLang(),onlyActive:0},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.displayCode=e.code.length>5?e.code.slice(0,5)+"...":e.code,e.id=e.dishId,e.attributeGroupId=[e.inheritAttributeGroupId?e.inheritAttributeGroupId.split(","):[],e.localAttributeGroupId?e.localAttributeGroupId.split(","):[]].flat().join(","),e.langs=e.langs.map((function(e){return Object(r["a"])(Object(r["a"])({},e),{},{desc:e.description})})),e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),multipleAdd:function(e){return p.a.postWithUploadFile("Dishes.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!1})},add:function(e){var t;return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),console.log(e.extraPrintGroupIds),e.extraPrintGroupIds=null!==(t=e.extraPrintGroupIds)&&void 0!==t&&t.join?e.extraPrintGroupIds.join(","):"",p.a.postWithUploadFile("Dishes.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},remove:function(e){return p.a.post("Dishes.php?op=delete",{id:e})},edit:function(e){var t;return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),e.extraPrintGroupIds=null!==(t=e.extraPrintGroupIds)&&void 0!==t&&t.join?e.extraPrintGroupIds.join(","):"",e.file&&(e.imageExt=e.file.name.split(".")[1]),e.isActive=e.isActive?1:0,p.a.postWithUploadFile("Dishes.php?op=update",Object(r["a"])(Object(r["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})}},I=o["IKDataEntity"].ModelFactory(h,C);I.getBuffet=Object(i["a"])(Object(n["a"])().mark((function e(){return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,I.getList();case 2:return e.abrupt("return",e.sent.filter((function(e){return"8"===e.dishesCategoryTypeId})));case 3:case"end":return e.stop()}}),e)}))),t["a"]=I},caae:function(e,t,a){"use strict";var n=a("9225");t["a"]={list:[{id:1,name:n["a"].t("Monday")},{id:2,name:n["a"].t("Tuesday")},{id:3,name:n["a"].t("Wednesday")},{id:4,name:n["a"].t("Thursday")},{id:5,name:n["a"].t("Friday")},{id:6,name:n["a"].t("Saturday")},{id:7,name:n["a"].t("Sunday")}],getList:function(){return this.list}}},ebc9:function(e,t,a){"use strict";var n=a("c7eb"),i=a("5530"),r=a("1da1"),o=a("5089"),s=a("f4d6"),p=a("9d8f"),u=a.n(p),c={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},d={load:function(){var e=Object(r["a"])(Object(n["a"])().mark((function e(t){return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("CategoryType.php",Object(i["a"])({lang:o["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=s["IKDataEntity"].ModelFactory(c,d)}}]);
//# sourceMappingURL=chunk-2955abdd.57556861.js.map