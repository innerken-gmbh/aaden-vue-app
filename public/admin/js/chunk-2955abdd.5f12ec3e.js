(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2955abdd"],{"4c03":function(e,t,a){"use strict";a("a15b");var n=a("b85c"),r=(a("96cf"),a("1da1")),i=a("5530"),o=a("f4d6"),s=a("9d8f"),p=a.n(s),u=a("ebc9"),d=a("a86d"),l=a("5089"),c=a("641f"),m=a.n(c),y=a("c0d6"),f=Boolean("0"===l["b"].isShowOnTable),g=["#FFCDD2","#F8BBD0","#E1BEE7","#D1C4E9","#C5CAE9","#BBDEFB","#B3E5FC","#B2EBF2","#B2DFDB","#C8E6C9","#DCEDC8","#F0F4C3","#FFF9C4","#FFECB3","#FFE0B2","#FFCCBC","#D7CCC8","#CFD8DC"],h={add:function(e){return e.appliedAttributeGroup="",e.catTypeId=e.dishesCategoryTypeId,p.a.post("Category.php?op=add",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup="",e.catTypeId=e.dishesCategoryTypeId,console.log("label-manage: item()",e),p.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return p.a.post("Category.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Category.php",t);case 2:return a=e.sent.content,console.log(a,"cate response"),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),randomColor:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:m.a.showLoading(!0),a=Object(n["a"])(t),e.prev=2,a.s();case 4:if((r=a.n()).done){e.next=13;break}return o=r.value,o.appliedAttributeGroup=o.attributeGroupId.join(","),o.catTypeId=o.dishesCategoryTypeId,o.color=g[Math.round(18*Math.random())],e.next=11,p.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},o),{},{langs:JSON.stringify(o.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:m.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeAllColor:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:m.a.showLoading(!0),a=Object(n["a"])(t),e.prev=2,a.s();case 4:if((r=a.n()).done){e.next=13;break}return o=r.value,o.appliedAttributeGroup=o.attributeGroupId.join(","),o.catTypeId=o.dishesCategoryTypeId,o.color="#FFFFFF",e.next=11,p.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},o),{},{langs:JSON.stringify(o.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:m.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeCategoryImage:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.post("Category.php?op=removeCategoryImage",Object(i["a"])({},t),{showLoading:!0});case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},b={id:{type:o["IKDataEntity"].Types.Integer,form:!1,table:!1},color:{type:o["IKDataEntity"].Types.Color,formConfig:{required:!1}},dcImage:{type:o["IKDataEntity"].Types.Image,formConfig:{required:!1,type:{root:function(){return y["a"].getters.rootUrl+l["b"].dcImageRoot}}},displayName:"image",header:f},_langsname:{displayName:"KategorieName",form:!1},langs:{displayName:"labelName",type:o["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:l["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===l["b"].getLang().toUpperCase()},displayChild:function(e){return console.log(e),"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1},dishesCategoryTypeId:{displayName:"warengruppe",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList}}},printOrder:{type:o["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},categorySort:{type:o["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{required:!0}}};t["a"]=o["IKDataEntity"].ModelFactory(b,h)},6306:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),s=a.n(o),p={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},upsideDown:{type:i["IKDataEntity"].Types.Boolean},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},u={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Printer.php",Object(n["a"])({op:"showPrinterGroups"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return s.a.postWithUploadFile("Printer.php?op=addPrinterGroups",e,{showLoading:!0})},edit:function(e){return s.a.postWithUploadFile("Printer.php?op=updatePrinterGroups",e,{showLoading:!0})},remove:function(e){return s.a.post("Printer.php?op=deletePrinterGroup",{id:e})}};t["a"]=i["IKDataEntity"].ModelFactory(p,u)},"6e35":function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),s=a.n(o),p={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"allergName"},icon:{displayName:"icon"},shortName:{displayName:"shortName"},displayText:{displayName:"displayText"}},u={add:function(e){return s.a.postWithUploadFile("Dishes.php?op=addAllergen",e,{showLoading:!0})},edit:function(e){return s.a.postWithUploadFile("Dishes.php?op=updateAllergen",e,{showLoading:!0})},remove:function(e){return s.a.post("Dishes.php?op=deleteAllergen",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Dishes.php",Object(n["a"])({op:"showAllAllergen"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["IKDataEntity"].ModelFactory(p,u)},"6f56":function(e,t,a){"use strict";a("4160"),a("b0c0"),a("07ac"),a("159b");var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),s=a.n(o),p=a("5089"),u=a("a86d"),d={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},langs:{displayName:"name",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"name",default:p["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===p["b"].getLang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[u["a"],u["a"],u["a"]],header:!1},name:{displayName:"shownName",form:!1},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}}},l={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Complex.php",Object(n["a"])({op:"showAllConsumeTypeInfo",lang:p["b"].getLang()},t));case 2:return a=e.sent.content,console.log(a,"response"),a.forEach((function(e){e.langs=Object.values(e.langs)})),e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return e.name=e.langs[2].name,s.a.post("ConsumeType.php?op=add",Object(n["a"])(Object(n["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.name=e.langs[2].name,s.a.postWithUploadFile("ConsumeType.php?op=update",Object(n["a"])(Object(n["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return s.a.post("ConsumeType.php?op=delete",{id:e})}};t["a"]=i["IKDataEntity"].ModelFactory(d,l)},a86d:function(e,t,a){"use strict";var n=a("f4d6"),r={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=n["IKDataEntity"].ModelFactory(r,{})},b0d9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),s=a("9d8f"),p=a.n(s),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:o["IKDataEntity"].Types.Boolean},multiSelect:{type:o["IKDataEntity"].Types.Boolean},attrubuteCount:{type:o["IKDataEntity"].Types.Integer,form:!1}},d={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Category.php",Object(n["a"])({op:"showAttributeGroup",lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return p.a.postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return p.a.postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return p.a.post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=o["IKDataEntity"].ModelFactory(u,d)},c41c7:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("v-tabs",{model:{value:e.tab,callback:function(t){e.tab=t},expression:"tab"}},[a("v-tab",[e._v("选择消费类型")]),e.activeConsumeTypeIndex?[a("v-tab",[e._v("修改包餐设置")]),a("v-tab",[e._v("修改饱餐菜品设置")])]:e._e(),a("v-tab-item",[a("v-card",[a("v-card-title",[e._v(" "+e._s(e.$t("请选择消费类型"))+" ")]),a("v-card-text",[a("v-select",{attrs:{items:e.consumeTypes,"item-text":"name","item-value":"id",label:e.$t("consumeTypeId")},model:{value:e.activeConsumeTypeIndex,callback:function(t){e.activeConsumeTypeIndex=t},expression:"activeConsumeTypeIndex"}})],1),e.activeConsumeTypeIndex?[a("div",{staticClass:"flex justify-space-between"},[a("v-btn",{staticClass:"primary mb-3 ml-4",on:{click:function(t){e.settingDialog=!0}}},[e._v(" "+e._s(e.$t("Buffet Setting"))+" ")]),a("v-btn",{attrs:{color:"red mb-3 ml-4"},on:{click:e.resetTime}},[e._v(" "+e._s(e.$t("重置全部自助餐时间"))+" ")])],1),a("v-dialog",{attrs:{"max-width":"500"},model:{value:e.settingDialog,callback:function(t){e.settingDialog=t},expression:"settingDialog"}},[a("v-card",{attrs:{"max-width":"500"}},[a("v-card-title",[e._v(" "+e._s(e.$t("自助餐"))+" "),a("v-spacer")],1),a("v-card-text",[a("v-row",[a("v-col",[a("v-text-field",{attrs:{"hide-details":"",label:e.$t("轮数")},model:{value:e.setting.totalRound,callback:function(t){e.$set(e.setting,"totalRound",t)},expression:"setting.totalRound"}})],1),a("v-col",[a("v-text-field",{attrs:{"hide-details":"",label:e.$t("每轮时间")},model:{value:e.setting.roundTime,callback:function(t){e.$set(e.setting,"roundTime",t)},expression:"setting.roundTime"}})],1)],1),a("v-row",[a("v-col",[a("v-text-field",{attrs:{"hide-details":"",label:e.$t("最大用餐时间")},model:{value:e.setting.maxDineTime,callback:function(t){e.$set(e.setting,"maxDineTime",t)},expression:"setting.maxDineTime"}})],1),a("v-col",[a("v-text-field",{attrs:{"hide-details":"",label:e.$t("儿童每轮数量")},model:{value:e.setting.childRoundDishCount,callback:function(t){e.$set(e.setting,"childRoundDishCount",t)},expression:"setting.childRoundDishCount"}})],1)],1),a("v-row",[a("v-col",[a("v-btn",{attrs:{color:"primary",block:""}},[e._v(" "+e._s(e.$t("更新"))+" ")])],1)],1)],1)],1)],1)]:e._e()],2)],1),e.activeConsumeTypeIndex?[a("v-tab-item",[a("v-row",{staticClass:"mt-4 pa-4"},[a("v-col",{attrs:{cols:"12",lg:"6",md:"6"}},[a("v-card",[a("ik-data-table",{attrs:{"one-page-arrangement":!1,model:e.buffetPriceModel,filter:e.filter,"entity-name":e.$t("自助价格菜品"),icon:"mdi-account-child","use-edit-action":!1}})],1)],1),a("v-col",{attrs:{cols:"12",lg:"6",md:"6"}},[a("v-card",[a("ik-data-table",{attrs:{"one-page-arrangement":!1,model:e.buffetModel,filter:e.filter,"entity-name":e.$t("时间设置"),icon:"mdi-account-child"}})],1)],1)],1)],1),a("v-tab-item",[a("ik-data-table",{attrs:{model:e.model,filter:e.filter,"entity-name":e.$t("自助类型设置"),icon:"mdi-account-child","use-action":!1}})],1)]:e._e()],2)],1)},r=[],i=a("53ca"),o=(a("96cf"),a("1da1")),s=(a("99af"),a("d81d"),a("d3b7"),a("3ca3"),a("ddb0"),a("2909")),p=a("f4d6"),u=a("9d8f"),d=a.n(u),l=a("c791"),c=a("4c03"),m=a("ebc9"),y={code:{},dishId:{displayName:"name",type:p["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList,itemText:"_langsname"}}},dishesCategoryId:{type:p["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList,itemText:"_langsname"}}},dishesCategoryTypeId:{displayName:"warengruppe",type:p["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:m["a"].getList,itemText:"name"}}},showing:{type:p["IKDataEntity"].Types.Boolean},isFree:{type:p["IKDataEntity"].Types.Boolean}},f=0,g={edit:function(e){var t=[];return t.push(d.a.post("Dishes.php",e,{params:{op:(e.showing?"enable":"disable")+"SingleDishShowInConsumeType"}})),t.push(d.a.post("Dishes.php",e,{params:{op:(e.isFree?"enable":"disable")+"SingleDishFreeInConsumeType"}})),Promise.all(t)},load:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d.a.get.apply(d.a,["Dishes.php?op=showDishesShowAndFreeByConsumeType"].concat(Object(s["a"])(t)));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.id=f,f++,e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},h=p["IKDataEntity"].ModelFactory(y,g),b=a("6f56"),C=a("5530"),I=a("b85c"),T=a("caae"),v=a("641f"),w=a.n(v),D={id:{type:p["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},header:!1,formConfig:{requiredNew:!1}},consumeTypeId:{type:p["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:b["a"].getList,itemText:"name"}}},fromTime:{type:p["IKDataEntity"].Types.Time},toTime:{type:p["IKDataEntity"].Types.Time},dayOfWeek:{type:p["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:T["a"].getList(),itemText:"name",multiple:!0}}}},x={load:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d.a.get.apply(d.a,["ConsumeType.php?op=showConsumeTypeTimeSpanByConsumeType"].concat(Object(s["a"])(t)));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var a,n,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=t,console.log(a,"tempItem"),n=Object(I["a"])(t.dayOfWeek);try{for(n.s();!(r=n.n()).done;)i=r.value,a.dayOfWeek=i,d.a.post("ConsumeType.php?op=addConsumeTypeTimeSpan",Object(C["a"])({},a),{showLoading:!0})}catch(o){n.e(o)}finally{n.f()}case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),remove:function(e){return d.a.post("ConsumeType.php?op=deleteConsumeTypeTimeSpan",{id:e})},edit:function(e){return console.log("edit item",e),d.a.postWithUploadFile("ConsumeType.php?op=editConsumeTypeTimeSpan",e,{showLoading:!0})},resetTimeSpan:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){var a,n,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:w.a.showLoading(!0),a=Object(I["a"])(t);try{for(a.s();!(n=a.n()).done;)r=n.value,r.fromTime="00:00:00",r.toTime="23:59:59",d.a.postWithUploadFile("ConsumeType.php?op=editConsumeTypeTimeSpan",r,{showLoading:!1})}catch(i){a.e(i)}finally{a.f()}w.a.toast("OK");case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},O=p["IKDataEntity"].ModelFactory(D,x),E={dishesId:{type:p["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getBuffet,itemText:"_langsname"}}},consumeTypeId:{type:p["IKDataEntity"].Types.Option,formConfig:{disableEdit:!0,type:{selectItems:b["a"].getList,itemText:"name"}}},isForAdult:{type:p["IKDataEntity"].Types.Boolean}},N={load:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d.a.get.apply(d.a,["ConsumeType.php?op=showBuffetPriceDishToConsumeTypeByConsumeType"].concat(Object(s["a"])(t)));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.id=e.dishesId,e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return e.dishId=e.dishesId,e.isForAdult=e.isForAdult?1:0,d.a.postWithUploadFile("ConsumeType.php?op=setBuffetPriceDishToConsumeType",e,{showLoading:!0})},remove:function(e){var t={dishId:e};return d.a.post("ConsumeType.php?op=deleteBuffetPriceDishToConsumeType",t)}},K=p["IKDataEntity"].ModelFactory(E,N),j={roundDishCount:0,childRoundDishCount:0,maxDineTime:0,roundTime:0,totalRound:0},F={name:"BuffetSetting",components:{IkDataTable:p["IkDataTable"]},data:function(){return{tab:null,model:h,buffetModel:O,buffetPriceModel:K,consumeTypes:[],settingDialog:!1,dishes:[],activeConsumeTypeIndex:null,setting:j}},computed:{filter:function(){return this.activeConsumeTypeIndex?{consumeTypeId:this.activeConsumeTypeIndex}:null}},mounted:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b["a"].getList();case 2:return e.consumeTypes=t.sent,t.next=5,l["a"].getList();case 5:e.dishes=t.sent;case 6:case"end":return t.stop()}}),t)})))()},methods:{resetTime:function(){return Object(o["a"])(regeneratorRuntime.mark((function e(){var t;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,O.getList();case 2:return t=e.sent,console.log("async timespan:",t,"typeof fromTime",Object(i["a"])(t[0].fromTime)),e.next=6,O.resetTimeSpan(t);case 6:case"end":return e.stop()}}),e)})))()}}},L=F,R=a("2877"),G=a("6544"),k=a.n(G),A=a("8336"),B=a("b0af"),S=a("99d9"),P=a("62ad"),q=a("169a"),_=a("0fd9"),W=a("b974"),U=a("2fa4"),$=a("71a3"),M=a("c671"),V=a("fe57"),J=a("8654"),z=Object(R["a"])(L,n,r,!1,null,"0aa6ffec",null);t["default"]=z.exports;k()(z,{VBtn:A["a"],VCard:B["a"],VCardText:S["b"],VCardTitle:S["c"],VCol:P["a"],VDialog:q["a"],VRow:_["a"],VSelect:W["a"],VSpacer:U["a"],VTab:$["a"],VTabItem:M["a"],VTabs:V["a"],VTextField:J["a"]})},c791:function(e,t,a){"use strict";a("a4d3"),a("e01a"),a("4de4"),a("0481"),a("caad"),a("a15b"),a("d81d"),a("fb6a"),a("4069"),a("b0c0"),a("ac1f"),a("2532"),a("1276"),a("96cf");var n=a("1da1"),r=a("5530"),i=a("f4d6"),o=a("9d8f"),s=a.n(o),p=a("5089"),u=a("c0d6"),d=a("4c03"),l=a("6306"),c=a("6e35"),m=a("a86d"),y=a("b0d9"),f=a("9225"),g=Boolean("0"===p["b"].isShowOnTable),h={image:{type:i["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return u["a"].getters.rootUrl+p["b"].dishImageRoot}},required:!1},tableConfig:{filterable:!1},displayName:"image",header:g},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1},tableConfig:{filterable:!1}},code:{tableConfig:{width:"60px"},header:!1},displayCode:{displayName:"code",form:!1},dishName:{displayName:"name",form:!1},price:{type:i["IKDataEntity"].Types.Float,formConfig:{default:"",overwriteRule:!0,rule:[function(e){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(e)||"Bitte geben Sie den richtigen Preis ein"}]}},langs:{displayName:"name",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"name",default:p["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toLowerCase()===p["b"].getLang().toLowerCase()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[m["a"],m["a"],m["a"]],header:!1},extraPrintGroupIds:{displayName:f["a"].t("extraPrintGroup"),type:i["IKDataEntity"].Types.Option,formConfig:{type:{multiple:!0,selectItems:l["a"].getList},required:!1},header:!1},categoryId:{displayName:"分类",tableConfig:{filterable:!1},type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,itemText:"_langsname"}}},AllergenId:{displayName:f["a"].t("过敏源"),type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList,multiple:!0},required:!1},header:!1},attributeGroupId:{displayName:f["a"].t("attributeGroupNames"),type:i["IKDataEntity"].Types.Option,formConfig:{merge:!1,required:!1,type:{selectItems:y["a"].getList,multiple:!0,disabledItem:function(e,t){return t.inheritAttributeGroupId?Object(r["a"])(Object(r["a"])({},e),{},{disabled:t.inheritAttributeGroupId.includes(e.id)}):e}}},header:!1},localAttributeGroupId:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:y["a"].getList,multiple:!0}},form:!1,header:!1},inheritAttributeGroupId:{displayName:"AttributeGroupName",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:y["a"].getList,multiple:!0}},form:!1,header:!1},dishWeight:{displayName:"DishWeight",type:i["IKDataEntity"].Types.Integer,formConfig:{default:1,required:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]},header:!1},isActive:{type:i["IKDataEntity"].Types.Boolean,displayName:"isActive",formConfig:{default:1,required:!1}},dishAlias:{required:!1,formConfig:{requiredNew:!1,requiredEdit:!1},header:!1}},b={multipleAdd:function(e){return s.a.postWithUploadFile("Dishes.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!1})},add:function(e){var t;return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),console.log(e.extraPrintGroupIds),e.extraPrintGroupIds=(null===(t=e.extraPrintGroupIds)||void 0===t?void 0:t.join)?e.extraPrintGroupIds.join(","):"",s.a.postWithUploadFile("Dishes.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},edit:function(e){return e.attributeGroup=e.attributeGroupId.filter((function(t){return!e.inheritAttributeGroupId.includes(t)})).join(","),e.allergenGroup=e.AllergenId.join(","),e.extraPrintGroupIds=e.extraPrintGroupIds.join(","),e.file&&(e.imageExt=e.file.name.split(".")[1]),e.isActive=e.isActive?1:0,s.a.postWithUploadFile("Dishes.php?op=update",Object(r["a"])(Object(r["a"])({},e),{},{params:JSON.stringify(e)}),{showLoading:!0})},remove:function(e){return s.a.post("Dishes.php?op=delete",{id:e})},load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Dishes.php",Object(r["a"])({lang:p["b"].getLang(),onlyActive:0},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.displayCode=e.code.length>5?e.code.slice(0,5)+"...":e.code,e.id=e.dishId,e.attributeGroupId=[e.inheritAttributeGroupId?e.inheritAttributeGroupId.split(","):[],e.localAttributeGroupId?e.localAttributeGroupId.split(","):[]].flat().join(","),e.langs=e.langs.map((function(e){return Object(r["a"])(Object(r["a"])({},e),{},{desc:e.description})})),e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},C=i["IKDataEntity"].ModelFactory(h,b);C.getBuffet=Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,C.getList();case 2:return e.abrupt("return",e.sent.filter((function(e){return"8"===e.dishesCategoryTypeId})));case 3:case"end":return e.stop()}}),e)}))),t["a"]=C},caae:function(e,t,a){"use strict";var n=a("9225");t["a"]={list:[{id:1,name:n["a"].t("Monday")},{id:2,name:n["a"].t("Tuesday")},{id:3,name:n["a"].t("Wednesday")},{id:4,name:n["a"].t("Thursday")},{id:5,name:n["a"].t("Friday")},{id:6,name:n["a"].t("Saturday")},{id:7,name:n["a"].t("Sunday")}],getList:function(){return this.list}}},ebc9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),s=a("9d8f"),p=a.n(s),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},d={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("CategoryType.php",Object(n["a"])({lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(u,d)}}]);
//# sourceMappingURL=chunk-2955abdd.5f12ec3e.js.map