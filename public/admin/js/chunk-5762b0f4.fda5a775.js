(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5762b0f4"],{"03f5":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-row",[a("v-col",[a("v-card",[a("v-card-title",[e._v(e._s(e.$t("请选择菜品折扣规则")))]),a("v-card-text",[a("v-select",{attrs:{items:e.discountRules,"item-text":"name","item-value":"id",label:e.$t("折扣规则名字")},model:{value:e.activeSelectDiscount,callback:function(t){e.activeSelectDiscount=t},expression:"activeSelectDiscount"}})],1)],1)],1)],1),e.activeSelectDiscount?[a("v-row",[a("v-col",[a("v-card",[a("ik-data-table",{attrs:{model:e.buffetModel,filter:e.filter,"entity-name":e.$t("时间设置"),icon:"mdi-account-child"}})],1)],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",lg:"12"}},[a("v-card",[a("ik-data-table",{attrs:{model:e.dishesDiscountListModel,filter:e.filter,"entity-name":e.$t("折扣菜品列表"),icon:"mdi-account-child","use-action":!1}})],1)],1)],1)]:e._e()],2)},r=[],i=(a("96cf"),a("1da1")),o=a("9d8f"),s=a.n(o),u=a("f4d6"),c=(a("99af"),a("d81d"),a("2909")),p=a("4c03"),d=a("ebc9"),l=a("9225"),y={dishesId:{type:u["IKDataEntity"].Types.Integer,displayName:"Dish ID",formConfig:{requiredNew:!1}},ruleId:{type:u["IKDataEntity"].Types.Integer,displayName:"Rule ID"},name:{displayName:"name"},dishesCategoryId:{displayName:"Label",type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList,itemText:"_langsname"}}},dishesCategoryTypeId:{displayName:"Kategorie",type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,itemText:"name"}}},enabled:{type:u["IKDataEntity"].Types.Boolean,displayName:"Aktiviert"}},f={load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("DiscountRule.php?op=getDishesListByDiscountRuleId",Object.assign.apply(Object,[{lang:l["a"].locale}].concat(Object(c["a"])(t))));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.id=e.dishesId,e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),edit:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t),e.next=3,s.a.post("DiscountRule.php?op=updateDishesDiscountRule",{dishesId:t.dishesId,discountRuleId:t.ruleId,enable:t.enabled?1:0});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},m=u["IKDataEntity"].ModelFactory(y,f),g=(a("4de4"),a("5530")),h=a("b85c"),b=a("caae"),I=a("789a"),C={id:{type:u["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},header:!1,formConfig:{requiredNew:!1}},discountRuleId:{displayName:"Rabattregeln",type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:I["a"].getList,itemText:"name"}}},fromTime:{type:u["IKDataEntity"].Types.Time,displayName:"Zeit ab"},toTime:{type:u["IKDataEntity"].Types.Time,displayName:"Zeit bis"},dayOfWeek:{type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:b["a"].getList(),itemText:"name",multiple:!0}}}},v={load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t,"i am loaded"),e.next=3,s.a.get.apply(s.a,["Route.php?op=discountTimeList"].concat(Object(c["a"])(t)));case 3:return e.abrupt("return",e.sent.content.filter((function(e){return e.discountRuleId===t[0].id})));case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var a,n,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=t,console.log("item before",t),n=Object(h["a"])(t.dayOfWeek);try{for(n.s();!(r=n.n()).done;)i=r.value,a.dayOfWeek=i,console.log("item after",a),s.a.post("Route.php?op=discountTimeAdd",Object(g["a"])({},a),{showLoading:!0})}catch(o){n.e(o)}finally{n.f()}return e.abrupt("return",null);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),remove:function(e){return s.a.post("Route.php?op=discountTimeDelete",{id:e})},edit:function(e){return s.a.postWithUploadFile("Route.php?op=discountTimeUpdate",e,{showLoading:!0})}},D=u["IKDataEntity"].ModelFactory(C,v),w={components:{IkDataTable:u["IkDataTable"]},data:function(){return{load:[],activeSelectDiscount:null,discountRules:[],dishesDiscountListModel:m,buffetModel:D}},computed:{filter:function(){return this.activeSelectDiscount?{id:this.activeSelectDiscount}:null}},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("DiscountRule.php?op=getList");case 2:e.discountRules=t.sent.content;case 3:case"end":return t.stop()}}),t)})))()},methods:{}},T=w,O=a("2877"),E=a("6544"),R=a.n(E),K=a("b0af"),F=a("99d9"),N=a("62ad"),j=a("a523"),x=a("0fd9"),k=a("b974"),L=Object(O["a"])(T,n,r,!1,null,null,null);t["default"]=L.exports;R()(L,{VCard:K["a"],VCardText:F["c"],VCardTitle:F["d"],VCol:N["a"],VContainer:j["a"],VRow:x["a"],VSelect:k["a"]})},"4c03":function(e,t,a){"use strict";a("a15b");var n=a("b85c"),r=(a("96cf"),a("1da1")),i=a("5530"),o=a("f4d6"),s=a("9d8f"),u=a.n(s),c=a("ebc9"),p=a("b0d9"),d=a("a86d"),l=a("5089"),y=a("641f"),f=a.n(y),m=a("c0d6"),g=Boolean("0"===l["b"].isShowOnTable),h=["#FFCDD2","#F8BBD0","#E1BEE7","#D1C4E9","#C5CAE9","#BBDEFB","#B3E5FC","#B2EBF2","#B2DFDB","#C8E6C9","#DCEDC8","#F0F4C3","#FFF9C4","#FFECB3","#FFE0B2","#FFCCBC","#D7CCC8","#CFD8DC"],b={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,u.a.post("Category.php?op=add",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,console.log("label-manage: item()",e),u.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return u.a.post("Category.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("Category.php",t);case 2:return a=e.sent.content,console.log(a,"cate response"),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),randomColor:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:f.a.showLoading(!0),a=Object(n["a"])(t),e.prev=2,a.s();case 4:if((r=a.n()).done){e.next=13;break}return o=r.value,o.appliedAttributeGroup=o.attributeGroupId.join(","),o.catTypeId=o.dishesCategoryTypeId,o.color=h[Math.round(18*Math.random())],e.next=11,u.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},o),{},{langs:JSON.stringify(o.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:f.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeAllColor:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:f.a.showLoading(!0),a=Object(n["a"])(t);try{for(a.s();!(r=a.n()).done;)o=r.value,o.appliedAttributeGroup=o.attributeGroupId.join(","),o.catTypeId=o.dishesCategoryTypeId,o.color="#FFFFFF",u.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},o),{},{langs:JSON.stringify(o.langs)}),{showLoading:!1})}catch(s){a.e(s)}finally{a.f()}f.a.toast("OK");case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),removeCategoryImage:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.post("Category.php?op=removeCategoryImage",Object(i["a"])({},t),{showLoading:!0});case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},I={_langsname:{displayName:"KategorieName",form:!1},dcImage:{type:o["IKDataEntity"].Types.Image,formConfig:{required:!1,type:{root:function(){return m["a"].getters.rootUrl+l["b"].dcImageRoot}}},displayName:"image",header:g},langs:{displayName:"labelName",type:o["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:l["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===l["b"].getLang().toUpperCase()},displayChild:function(e){return console.log(e),"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1},dishesCategoryTypeId:{displayName:"warengruppe",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList}}},attributeGroupId:{displayName:"attributeGroupNames",type:o["IKDataEntity"].Types.Option,tableConfig:{width:"100px"},formConfig:{required:!1,type:{selectItems:p["a"].getList,multiple:!0}}},color:{type:o["IKDataEntity"].Types.Color,formConfig:{required:!1}},printOrder:{type:o["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},categorySort:{type:o["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{required:!0}}};t["a"]=o["IKDataEntity"].ModelFactory(I,b)},"789a":function(e,t,a){"use strict";a("d81d");var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),s=a.n(o),u=a("caae"),c={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"RulesName"},dayOfWeek:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList(),itemText:"name"}}},startTime:{type:i["IKDataEntity"].Types.Time},endTime:{type:i["IKDataEntity"].Types.Time},tempDiscountStr:{},priority:{formConfig:{default:20}},isActive:{type:i["IKDataEntity"].Types.Boolean}},p={add:function(e){return 7===e.dayOfWeek&&(e.dayOfWeek=0),s.a.post("DiscountRule.php?op=add",e,{showLoading:!0})},edit:function(e){return 7===e.dayOfWeek&&(e.dayOfWeek=0),s.a.postWithUploadFile("DiscountRule.php?op=change",e,{showLoading:!0})},remove:function(e){return s.a.post("DiscountRule.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("DiscountRule.php?op=getList",Object(n["a"])({},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return"0"===e.dayOfWeek&&(e.dayOfWeek="7"),e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["IKDataEntity"].ModelFactory(c,p)},a86d:function(e,t,a){"use strict";var n=a("f4d6"),r={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=n["IKDataEntity"].ModelFactory(r,{})},b0d9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),s=a("9d8f"),u=a.n(s),c={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:o["IKDataEntity"].Types.Boolean},multiSelect:{type:o["IKDataEntity"].Types.Boolean},attrubuteCount:{type:o["IKDataEntity"].Types.Integer,form:!1}},p={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("Category.php",Object(n["a"])({op:"showAttributeGroup",lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return u.a.postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return u.a.postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return u.a.post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=o["IKDataEntity"].ModelFactory(c,p)},caae:function(e,t,a){"use strict";var n=a("9225");t["a"]={list:[{id:1,name:n["a"].t("Monday")},{id:2,name:n["a"].t("Tuesday")},{id:3,name:n["a"].t("Wednesday")},{id:4,name:n["a"].t("Thursday")},{id:5,name:n["a"].t("Friday")},{id:6,name:n["a"].t("Saturday")},{id:7,name:n["a"].t("Sunday")}],getList:function(){return this.list}}},ebc9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),s=a("9d8f"),u=a.n(s),c={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},p={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("CategoryType.php",Object(n["a"])({lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(c,p)}}]);
//# sourceMappingURL=chunk-5762b0f4.fda5a775.js.map