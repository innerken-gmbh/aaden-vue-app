(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f59c18b8"],{"03f5":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",[a("v-row",[a("v-col",[a("v-card",[a("v-card-title",[t._v(t._s(t.$t("请选择菜品折扣规则")))]),a("v-card-text",[a("v-select",{attrs:{items:t.discountRules,"item-text":"name","item-value":"id",label:t.$t("折扣规则名字")},model:{value:t.activeSelectDiscount,callback:function(e){t.activeSelectDiscount=e},expression:"activeSelectDiscount"}})],1)],1)],1)],1),t.activeSelectDiscount?[a("v-row",[a("v-col",[a("v-card",[a("ik-data-table",{attrs:{model:t.buffetModel,filter:t.filter,"entity-name":t.$t("时间设置"),icon:"mdi-account-child"}})],1)],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",lg:"12"}},[a("v-card",[a("ik-data-table",{attrs:{model:t.dishesDiscountListModel,filter:t.filter,"entity-name":t.$t("折扣菜品列表"),icon:"mdi-account-child","use-action":!1}})],1)],1)],1)]:t._e()],2)},r=[],i=a("c7eb"),o=a("1da1"),s=a("9d8f"),c=a.n(s),u=a("f4d6"),p=a("2909"),d=(a("d81d"),a("99af"),a("4c03")),l=a("ebc9"),y=a("9225"),f={dishesId:{type:u["IKDataEntity"].Types.Integer,displayName:"Dish ID",formConfig:{requiredNew:!1}},ruleId:{type:u["IKDataEntity"].Types.Integer,displayName:"Rule ID"},name:{displayName:"name"},dishesCategoryId:{displayName:"Label",type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,itemText:"_langsname"}}},dishesCategoryTypeId:{displayName:"Kategorie",type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList,itemText:"name"}}},enabled:{type:u["IKDataEntity"].Types.Boolean,displayName:"Aktiviert"}},g={load:function(){var t=Object(o["a"])(Object(i["a"])().mark((function t(e){return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("DiscountRule.php?op=getDishesListByDiscountRuleId",Object.assign.apply(Object,[{lang:y["a"].locale}].concat(Object(p["a"])(e))));case 2:return t.abrupt("return",t.sent.content.map((function(t){return t.id=t.dishesId,t})));case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),edit:function(){var t=Object(o["a"])(Object(i["a"])().mark((function t(e){return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e),t.next=3,c.a.post("DiscountRule.php?op=updateDishesDiscountRule",{dishesId:e.dishesId,discountRuleId:e.ruleId,enable:e.enabled?1:0});case 3:return t.abrupt("return",t.sent);case 4:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},m=u["IKDataEntity"].ModelFactory(f,g),b=a("5530"),h=a("b85c"),v=(a("4de4"),a("d3b7"),a("caae")),I=a("789a"),O={id:{type:u["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},header:!1,formConfig:{requiredNew:!1}},discountRuleId:{displayName:"Rabattregeln",type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:I["a"].getList,itemText:"name"}}},fromTime:{type:u["IKDataEntity"].Types.Time,displayName:"Zeit ab"},toTime:{type:u["IKDataEntity"].Types.Time,displayName:"Zeit bis"},dayOfWeek:{type:u["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:v["a"].getList(),itemText:"name",multiple:!0}}}},C={load:function(){var t=Object(o["a"])(Object(i["a"])().mark((function t(e){return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e,"i am loaded"),t.next=3,c.a.get.apply(c.a,["Route.php?op=discountTimeList"].concat(Object(p["a"])(e)));case 3:return t.abrupt("return",t.sent.content.filter((function(t){return t.discountRuleId===e[0].id})));case 4:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(){var t=Object(o["a"])(Object(i["a"])().mark((function t(e){var a,n,r,o;return Object(i["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:a=e,console.log("item before",e),n=Object(h["a"])(e.dayOfWeek);try{for(n.s();!(r=n.n()).done;)o=r.value,a.dayOfWeek=o,console.log("item after",a),c.a.post("Route.php?op=discountTimeAdd",Object(b["a"])({},a),{showLoading:!0})}catch(i){n.e(i)}finally{n.f()}return t.abrupt("return",null);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),remove:function(t){return c.a.post("Route.php?op=discountTimeDelete",{id:t})},edit:function(t){return c.a.postWithUploadFile("Route.php?op=discountTimeUpdate",t,{showLoading:!0})}},D=u["IKDataEntity"].ModelFactory(O,C),w={components:{IkDataTable:u["IkDataTable"]},data:function(){return{load:[],activeSelectDiscount:null,discountRules:[],dishesDiscountListModel:m,buffetModel:D}},computed:{filter:function(){return this.activeSelectDiscount?{id:this.activeSelectDiscount}:null}},mounted:function(){var t=this;return Object(o["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("DiscountRule.php?op=getList");case 2:t.discountRules=e.sent.content;case 3:case"end":return e.stop()}}),e)})))()},methods:{}},j=w,T=a("2877"),E=a("6544"),K=a.n(E),x=a("b0af"),F=a("99d9"),k=a("62ad"),N=a("a523"),L=a("0fd9"),R=a("b974"),S=Object(T["a"])(j,n,r,!1,null,null,null);e["default"]=S.exports;K()(S,{VCard:x["a"],VCardText:F["b"],VCardTitle:F["c"],VCol:k["a"],VContainer:N["a"],VRow:L["a"],VSelect:R["a"]})},"4c03":function(t,e,a){"use strict";var n=a("b85c"),r=a("c7eb"),i=a("1da1"),o=a("5530"),s=(a("ac1f"),a("00b4"),a("a15b"),a("e9c4"),a("f4d6")),c=a("9d8f"),u=a.n(c),p=a("ebc9"),d=a("a86d"),l=a("5089"),y=a("641f"),f=a.n(y),g=a("c0d6"),m=a("b0d9"),b=Boolean("0"===l["b"].isShowOnTable),h=["#FFCDD2","#F8BBD0","#E1BEE7","#D1C4E9","#C5CAE9","#BBDEFB","#B3E5FC","#B2EBF2","#B2DFDB","#C8E6C9","#DCEDC8","#F0F4C3","#FFF9C4","#FFECB3","#FFE0B2","#FFCCBC","#D7CCC8","#CFD8DC"],v={id:{type:s["IKDataEntity"].Types.Integer,form:!1,table:!1},color:{type:s["IKDataEntity"].Types.Color,formConfig:{required:!1}},dcImage:{type:s["IKDataEntity"].Types.Image,formConfig:{required:!1,type:{root:function(){return g["a"].getters.rootUrl+l["b"].dcImageRoot}}},displayName:"image",header:b},attributeGroupId:{displayName:"attributeGroupNames",type:s["IKDataEntity"].Types.Option,tableConfig:{width:"100px"},formConfig:{required:!1,type:{selectItems:m["a"].getList,multiple:!0}}},_langsname:{displayName:"KategorieName",form:!1},langs:{displayName:"labelName",type:s["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:l["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(t){return t.lang.toUpperCase()===l["b"].getLang().toUpperCase()},displayChild:function(t){return console.log(t),"name"===t}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1},dishesCategoryTypeId:{displayName:"warengruppe",type:s["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList}}},printOrder:{type:s["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(t){return/^[0-9]\d*$/.test(t)||"Bitte geben Sie die ganze Zahl ein"}]}},categorySort:{type:s["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{required:!0}}},I={add:function(t){return t.appliedAttributeGroup=t.attributeGroupId.join(","),t.catTypeId=t.dishesCategoryTypeId,u.a.post("Category.php?op=add",Object(o["a"])(Object(o["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},edit:function(t){return t.appliedAttributeGroup=t.attributeGroupId.join(","),t.catTypeId=t.dishesCategoryTypeId,console.log("label-manage: item()",t),u.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},remove:function(t){return u.a.post("Category.php?op=delete",{id:t})},load:function(){var t=Object(i["a"])(Object(r["a"])().mark((function t(e){var a;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.a.get("Category.php",e);case 2:return a=t.sent.content,console.log(a,"cate response"),t.abrupt("return",a);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),randomColor:function(){var t=Object(i["a"])(Object(r["a"])().mark((function t(e){var a,i,s;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:f.a.showLoading(!0),a=Object(n["a"])(e),t.prev=2,a.s();case 4:if((i=a.n()).done){t.next=13;break}return s=i.value,s.appliedAttributeGroup=s.attributeGroupId.join(","),s.catTypeId=s.dishesCategoryTypeId,s.color=h[Math.round(18*Math.random())],t.next=11,u.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},s),{},{langs:JSON.stringify(s.langs)}),{showLoading:!1});case 11:t.next=4;break;case 13:t.next=18;break;case 15:t.prev=15,t.t0=t["catch"](2),a.e(t.t0);case 18:return t.prev=18,a.f(),t.finish(18);case 21:f.a.toast("OK");case 22:case"end":return t.stop()}}),t,null,[[2,15,18,21]])})));function e(e){return t.apply(this,arguments)}return e}(),removeAllColor:function(){var t=Object(i["a"])(Object(r["a"])().mark((function t(e){var a,i,s;return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:f.a.showLoading(!0),a=Object(n["a"])(e),t.prev=2,a.s();case 4:if((i=a.n()).done){t.next=13;break}return s=i.value,s.appliedAttributeGroup=s.attributeGroupId.join(","),s.catTypeId=s.dishesCategoryTypeId,s.color="#FFFFFF",t.next=11,u.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},s),{},{langs:JSON.stringify(s.langs)}),{showLoading:!1});case 11:t.next=4;break;case 13:t.next=18;break;case 15:t.prev=15,t.t0=t["catch"](2),a.e(t.t0);case 18:return t.prev=18,a.f(),t.finish(18);case 21:f.a.toast("OK");case 22:case"end":return t.stop()}}),t,null,[[2,15,18,21]])})));function e(e){return t.apply(this,arguments)}return e}(),removeCategoryImage:function(){var t=Object(i["a"])(Object(r["a"])().mark((function t(e){return Object(r["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.a.post("Category.php?op=removeCategoryImage",Object(o["a"])({},e),{showLoading:!0});case 2:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},O=s["IKDataEntity"].ModelFactory(v,I);console.log("Category",O),e["a"]=O},"789a":function(t,e,a){"use strict";var n=a("c7eb"),r=a("5530"),i=a("1da1"),o=(a("d81d"),a("f4d6")),s=a("9d8f"),c=a.n(s),u=a("caae"),p={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"RulesName"},dayOfWeek:{type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList(),itemText:"name"}}},startTime:{type:o["IKDataEntity"].Types.Time},endTime:{type:o["IKDataEntity"].Types.Time},tempDiscountStr:{},priority:{formConfig:{default:20}},isActive:{type:o["IKDataEntity"].Types.Boolean}},d={add:function(t){return 7===t.dayOfWeek&&(t.dayOfWeek=0),c.a.post("DiscountRule.php?op=add",t,{showLoading:!0})},edit:function(t){return 7===t.dayOfWeek&&(t.dayOfWeek=0),c.a.postWithUploadFile("DiscountRule.php?op=change",t,{showLoading:!0})},remove:function(t){return c.a.post("DiscountRule.php?op=delete",{id:t})},load:function(){var t=Object(i["a"])(Object(n["a"])().mark((function t(e){return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("DiscountRule.php?op=getList",Object(r["a"])({},e));case 2:return t.abrupt("return",t.sent.content.map((function(t){return"0"===t.dayOfWeek&&(t.dayOfWeek="7"),t})));case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=o["IKDataEntity"].ModelFactory(p,d)},a523:function(t,e,a){"use strict";a("4de4"),a("d3b7"),a("b64b"),a("2ca0"),a("99af"),a("20f6"),a("4b85"),a("498a"),a("a15b");var n=a("2b0e");function r(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var n=a.props,r=a.data,i=a.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var o=r.attrs;if(o){r.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(r.staticClass+=" ".concat(s.join(" ")))}return n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),e(n.tag,r,i)}})}var i=a("d9f7");e["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,n=e.props,r=e.data,o=e.children,s=r.attrs;return s&&(r.attrs={},a=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}))),n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),t(n.tag,Object(i["a"])(r,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(a||[])}),o)}})},a86d:function(t,e,a){"use strict";var n=a("f4d6"),r={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};e["a"]=n["IKDataEntity"].ModelFactory(r,{})},b0d9:function(t,e,a){"use strict";var n=a("c7eb"),r=a("5530"),i=a("1da1"),o=a("5089"),s=a("f4d6"),c=a("9d8f"),u=a.n(c),p={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:s["IKDataEntity"].Types.Boolean},multiSelect:{type:s["IKDataEntity"].Types.Boolean},attrubuteCount:{type:s["IKDataEntity"].Types.Integer,form:!1}},d={load:function(){var t=Object(i["a"])(Object(n["a"])().mark((function t(e){return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.a.get("Category.php",Object(r["a"])({op:"showAttributeGroup",lang:o["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return u.a.postWithUploadFile("Category.php?op=addAttributeGroup",t,{showLoading:!0})},edit:function(t){return u.a.postWithUploadFile("Category.php?op=updateAttributeGroup",t,{showLoading:!0})},remove:function(t){return u.a.post("Category.php?op=deleteAttributeGroup",{id:t})}};e["a"]=s["IKDataEntity"].ModelFactory(p,d)},caae:function(t,e,a){"use strict";var n=a("9225");e["a"]={list:[{id:1,name:n["a"].t("Monday")},{id:2,name:n["a"].t("Tuesday")},{id:3,name:n["a"].t("Wednesday")},{id:4,name:n["a"].t("Thursday")},{id:5,name:n["a"].t("Friday")},{id:6,name:n["a"].t("Saturday")},{id:7,name:n["a"].t("Sunday")}],getList:function(){return this.list}}},ebc9:function(t,e,a){"use strict";var n=a("c7eb"),r=a("5530"),i=a("1da1"),o=a("5089"),s=a("f4d6"),c=a("9d8f"),u=a.n(c),p={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},d={load:function(){var t=Object(i["a"])(Object(n["a"])().mark((function t(e){return Object(n["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.a.get("CategoryType.php",Object(r["a"])({lang:o["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=s["IKDataEntity"].ModelFactory(p,d)}}]);
//# sourceMappingURL=chunk-f59c18b8.cb9ef783.js.map