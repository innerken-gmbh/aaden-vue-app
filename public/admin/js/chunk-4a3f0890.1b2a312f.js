(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4a3f0890","chunk-2d20862b"],{"03f5":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",[a("v-row",[a("v-col",[a("v-card",[a("v-card-title",[e._v(e._s(e.$t("请选择菜品折扣规则")))]),a("v-card-text",[a("v-select",{attrs:{items:e.discountRules,"item-text":"name","item-value":"id",label:e.$t("折扣规则名字")},model:{value:e.activeSelectDiscount,callback:function(t){e.activeSelectDiscount=t},expression:"activeSelectDiscount"}})],1)],1)],1)],1),e.activeSelectDiscount?[a("v-row",[a("v-col",[a("v-card",[a("ik-data-table",{attrs:{model:e.buffetModel,filter:e.filter,"entity-name":e.$t("时间设置"),icon:"mdi-account-child"}})],1)],1)],1),a("v-row",[a("v-col",{attrs:{cols:"12",lg:"12"}},[a("v-card",[a("ik-data-table",{attrs:{model:e.dishesDiscountListModel,filter:e.filter,"entity-name":e.$t("折扣菜品列表"),icon:"mdi-account-child","use-action":!1}})],1)],1)],1)]:e._e()],2)},r=[],i=(a("96cf"),a("1da1")),o=a("9d8f"),s=a.n(o),c=a("f4d6"),u=(a("99af"),a("d81d"),a("2909")),d=a("4c03"),p=a("ebc9"),l=a("9225"),f={dishesId:{type:c["IKDataEntity"].Types.Integer,displayName:"Dish ID",formConfig:{requiredNew:!1}},ruleId:{type:c["IKDataEntity"].Types.Integer,displayName:"Rule ID"},name:{displayName:"name"},dishesCategoryId:{displayName:"Label",type:c["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,itemText:"_langsname"}}},dishesCategoryTypeId:{displayName:"Kategorie",type:c["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList,itemText:"name"}}},enabled:{type:c["IKDataEntity"].Types.Boolean,displayName:"Aktiviert"}},y={load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("DiscountRule.php?op=getDishesListByDiscountRuleId",Object.assign.apply(Object,[{lang:l["a"].locale}].concat(Object(u["a"])(t))));case 2:return e.abrupt("return",e.sent.content.map((function(e){return e.id=e.dishesId,e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),edit:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t),e.next=3,s.a.post("DiscountRule.php?op=updateDishesDiscountRule",{dishesId:t.dishesId,discountRuleId:t.ruleId,enable:t.enabled?1:0});case 3:return e.abrupt("return",e.sent);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},m=c["IKDataEntity"].ModelFactory(f,y),g=(a("4de4"),a("5530")),h=a("b85c"),b=a("caae"),v=a("789a"),I={id:{type:c["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},header:!1,formConfig:{requiredNew:!1}},discountRuleId:{displayName:"Rabattregeln",type:c["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:v["a"].getList,itemText:"name"}}},fromTime:{type:c["IKDataEntity"].Types.Time,displayName:"Zeit ab"},toTime:{type:c["IKDataEntity"].Types.Time,displayName:"Zeit bis"},dayOfWeek:{type:c["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:b["a"].getList(),itemText:"name",multiple:!0}}}},C={load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return console.log(t,"i am loaded"),e.next=3,s.a.get.apply(s.a,["Route.php?op=discountTimeList"].concat(Object(u["a"])(t)));case 3:return e.abrupt("return",e.sent.content.filter((function(e){return e.discountRuleId===t[0].id})));case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){var a,n,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:a=t,console.log("item before",t),n=Object(h["a"])(t.dayOfWeek);try{for(n.s();!(r=n.n()).done;)i=r.value,a.dayOfWeek=i,console.log("item after",a),s.a.post("Route.php?op=discountTimeAdd",Object(g["a"])({},a),{showLoading:!0})}catch(o){n.e(o)}finally{n.f()}return e.abrupt("return",null);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),remove:function(e){return s.a.post("Route.php?op=discountTimeDelete",{id:e})},edit:function(e){return s.a.postWithUploadFile("Route.php?op=discountTimeUpdate",e,{showLoading:!0})}},D=c["IKDataEntity"].ModelFactory(I,C),w={components:{IkDataTable:c["IkDataTable"]},data:function(){return{load:[],activeSelectDiscount:null,discountRules:[],dishesDiscountListModel:m,buffetModel:D}},computed:{filter:function(){return this.activeSelectDiscount?{id:this.activeSelectDiscount}:null}},mounted:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("DiscountRule.php?op=getList");case 2:e.discountRules=t.sent.content;case 3:case"end":return t.stop()}}),t)})))()},methods:{}},T=w,O=a("2877"),R=a("6544"),E=a.n(R),k=a("b0af"),x=a("99d9"),j=a("62ad"),F=a("a523"),K=a("0fd9"),N=a("b974"),L=Object(O["a"])(T,n,r,!1,null,null,null);t["default"]=L.exports;E()(L,{VCard:k["a"],VCardText:x["b"],VCardTitle:x["c"],VCol:j["a"],VContainer:F["a"],VRow:K["a"],VSelect:N["a"]})},"4c03":function(e,t,a){"use strict";a("a15b");var n=a("b85c"),r=(a("96cf"),a("1da1")),i=a("5530"),o=a("f4d6"),s=a("9d8f"),c=a.n(s),u=a("ebc9"),d=a("a86d"),p=a("5089"),l=a("641f"),f=a.n(l),y=a("c0d6"),m=Boolean("0"===p["b"].isShowOnTable),g=["#FFCDD2","#F8BBD0","#E1BEE7","#D1C4E9","#C5CAE9","#BBDEFB","#B3E5FC","#B2EBF2","#B2DFDB","#C8E6C9","#DCEDC8","#F0F4C3","#FFF9C4","#FFECB3","#FFE0B2","#FFCCBC","#D7CCC8","#CFD8DC"],h={add:function(e){return e.appliedAttributeGroup="",e.catTypeId=e.dishesCategoryTypeId,c.a.post("Category.php?op=add",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup="",e.catTypeId=e.dishesCategoryTypeId,console.log("label-manage: item()",e),c.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return c.a.post("Category.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("Category.php",t);case 2:return a=e.sent.content,console.log(a,"cate response"),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),randomColor:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:f.a.showLoading(!0),a=Object(n["a"])(t),e.prev=2,a.s();case 4:if((r=a.n()).done){e.next=13;break}return o=r.value,o.appliedAttributeGroup=o.attributeGroupId.join(","),o.catTypeId=o.dishesCategoryTypeId,o.color=g[Math.round(18*Math.random())],e.next=11,c.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},o),{},{langs:JSON.stringify(o.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:f.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeAllColor:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,o;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:f.a.showLoading(!0),a=Object(n["a"])(t),e.prev=2,a.s();case 4:if((r=a.n()).done){e.next=13;break}return o=r.value,o.appliedAttributeGroup=o.attributeGroupId.join(","),o.catTypeId=o.dishesCategoryTypeId,o.color="#FFFFFF",e.next=11,c.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},o),{},{langs:JSON.stringify(o.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:f.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeCategoryImage:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.post("Category.php?op=removeCategoryImage",Object(i["a"])({},t),{showLoading:!0});case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},b={id:{type:o["IKDataEntity"].Types.Integer,form:!1,table:!1},color:{type:o["IKDataEntity"].Types.Color,formConfig:{required:!1}},dcImage:{type:o["IKDataEntity"].Types.Image,formConfig:{required:!1,type:{root:function(){return y["a"].getters.rootUrl+p["b"].dcImageRoot}}},displayName:"image",header:m},_langsname:{displayName:"KategorieName",form:!1},langs:{displayName:"labelName",type:o["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:p["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===p["b"].getLang().toUpperCase()},displayChild:function(e){return console.log(e),"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1},dishesCategoryTypeId:{displayName:"warengruppe",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList}}},printOrder:{type:o["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},categorySort:{type:o["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{required:!0}}};t["a"]=o["IKDataEntity"].ModelFactory(b,h)},"789a":function(e,t,a){"use strict";a("d81d");var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),s=a.n(o),c=a("caae"),u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"RulesName"},dayOfWeek:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList(),itemText:"name"}}},startTime:{type:i["IKDataEntity"].Types.Time},endTime:{type:i["IKDataEntity"].Types.Time},tempDiscountStr:{},priority:{formConfig:{default:20}},isActive:{type:i["IKDataEntity"].Types.Boolean}},d={add:function(e){return 7===e.dayOfWeek&&(e.dayOfWeek=0),s.a.post("DiscountRule.php?op=add",e,{showLoading:!0})},edit:function(e){return 7===e.dayOfWeek&&(e.dayOfWeek=0),s.a.postWithUploadFile("DiscountRule.php?op=change",e,{showLoading:!0})},remove:function(e){return s.a.post("DiscountRule.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("DiscountRule.php?op=getList",Object(n["a"])({},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return"0"===e.dayOfWeek&&(e.dayOfWeek="7"),e})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["IKDataEntity"].ModelFactory(u,d)},a523:function(e,t,a){"use strict";a("99af"),a("4de4"),a("b64b"),a("2ca0"),a("20f6"),a("4b85"),a("a15b"),a("498a");var n=a("2b0e");function r(e){return n["a"].extend({name:"v-".concat(e),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(t,a){var n=a.props,r=a.data,i=a.children;r.staticClass="".concat(e," ").concat(r.staticClass||"").trim();var o=r.attrs;if(o){r.attrs={};var s=Object.keys(o).filter((function(e){if("slot"===e)return!1;var t=o[e];return e.startsWith("data-")?(r.attrs[e]=t,!1):t||"string"===typeof t}));s.length&&(r.staticClass+=" ".concat(s.join(" ")))}return n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),t(n.tag,r,i)}})}var i=a("d9f7");t["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(e,t){var a,n=t.props,r=t.data,o=t.children,s=r.attrs;return s&&(r.attrs={},a=Object.keys(s).filter((function(e){if("slot"===e)return!1;var t=s[e];return e.startsWith("data-")?(r.attrs[e]=t,!1):t||"string"===typeof t}))),n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),e(n.tag,Object(i["a"])(r,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(a||[])}),o)}})},a86d:function(e,t,a){"use strict";var n=a("f4d6"),r={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=n["IKDataEntity"].ModelFactory(r,{})},caae:function(e,t,a){"use strict";var n=a("9225");t["a"]={list:[{id:1,name:n["a"].t("Monday")},{id:2,name:n["a"].t("Tuesday")},{id:3,name:n["a"].t("Wednesday")},{id:4,name:n["a"].t("Thursday")},{id:5,name:n["a"].t("Friday")},{id:6,name:n["a"].t("Saturday")},{id:7,name:n["a"].t("Sunday")}],getList:function(){return this.list}}},ebc9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),s=a("9d8f"),c=a.n(s),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},d={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("CategoryType.php",Object(n["a"])({lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(u,d)}}]);
//# sourceMappingURL=chunk-4a3f0890.1b2a312f.js.map