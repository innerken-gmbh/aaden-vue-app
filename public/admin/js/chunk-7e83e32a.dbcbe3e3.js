(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e83e32a"],{"4c03":function(e,t,a){"use strict";var n=a("b85c"),r=a("c7eb"),o=a("1da1"),i=a("5530"),s=(a("ac1f"),a("00b4"),a("a15b"),a("e9c4"),a("f4d6")),c=a("9d8f"),p=a.n(c),u=a("ebc9"),d=a("a86d"),l=a("5089"),y=a("641f"),f=a.n(y),g=a("c0d6"),b=a("b0d9"),m=Boolean("0"===l["b"].isShowOnTable),h=["#FFCDD2","#F8BBD0","#E1BEE7","#D1C4E9","#C5CAE9","#BBDEFB","#B3E5FC","#B2EBF2","#B2DFDB","#C8E6C9","#DCEDC8","#F0F4C3","#FFF9C4","#FFECB3","#FFE0B2","#FFCCBC","#D7CCC8","#CFD8DC"],C={id:{type:s["IKDataEntity"].Types.Integer,form:!1,table:!1},color:{type:s["IKDataEntity"].Types.Color,formConfig:{required:!1}},dcImage:{type:s["IKDataEntity"].Types.Image,formConfig:{required:!1,type:{root:function(){return g["a"].getters.rootUrl+l["b"].dcImageRoot}}},displayName:"image",header:m},attributeGroupId:{displayName:"attributeGroupNames",type:s["IKDataEntity"].Types.Option,tableConfig:{width:"100px"},formConfig:{required:!1,type:{selectItems:b["a"].getList,multiple:!0}}},_langsname:{displayName:"KategorieName",form:!1},langs:{displayName:"labelName",type:s["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:l["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===l["b"].getLang().toUpperCase()},displayChild:function(e){return console.log(e),"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1},dishesCategoryTypeId:{displayName:"warengruppe",type:s["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList}}},printOrder:{type:s["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},categorySort:{type:s["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{required:!0}}},v={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,p.a.post("Category.php?op=add",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,console.log("label-manage: item()",e),p.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return p.a.post("Category.php?op=delete",{id:e})},load:function(){var e=Object(o["a"])(Object(r["a"])().mark((function e(t){var a;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Category.php",t);case 2:return a=e.sent.content,console.log(a,"cate response"),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),randomColor:function(){var e=Object(o["a"])(Object(r["a"])().mark((function e(t){var a,o,s;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:f.a.showLoading(!0),a=Object(n["a"])(t),e.prev=2,a.s();case 4:if((o=a.n()).done){e.next=13;break}return s=o.value,s.appliedAttributeGroup=s.attributeGroupId.join(","),s.catTypeId=s.dishesCategoryTypeId,s.color=h[Math.round(18*Math.random())],e.next=11,p.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},s),{},{langs:JSON.stringify(s.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:f.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeAllColor:function(){var e=Object(o["a"])(Object(r["a"])().mark((function e(t){var a,o,s;return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:f.a.showLoading(!0),a=Object(n["a"])(t),e.prev=2,a.s();case 4:if((o=a.n()).done){e.next=13;break}return s=o.value,s.appliedAttributeGroup=s.attributeGroupId.join(","),s.catTypeId=s.dishesCategoryTypeId,s.color="#FFFFFF",e.next=11,p.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},s),{},{langs:JSON.stringify(s.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:f.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeCategoryImage:function(){var e=Object(o["a"])(Object(r["a"])().mark((function e(t){return Object(r["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.post("Category.php?op=removeCategoryImage",Object(i["a"])({},t),{showLoading:!0});case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},I=s["IKDataEntity"].ModelFactory(C,v);console.log("Category",I),t["a"]=I},"8c9d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-card",{attrs:{color:"basil"}},[a("ik-data-table",{ref:"statisticTable",attrs:{model:e.model,"use-action":!1,"use-default-action":!1,"use-select":!1,"use-date-filter":!0,icon:"mdi-calculator-variant","entity-name":e.$t("菜品出库统计")},scopedSlots:e._u([{key:"filterLeft",fn:function(){return[a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":e.dates,"offset-y":""},on:{"update:returnValue":function(t){e.dates=t},"update:return-value":function(t){e.dates=t}},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[a("v-text-field",e._g({staticClass:"ml-auto",staticStyle:{"max-width":"250px"},attrs:{"hide-details":"",label:e.$t("日期筛选"),"prepend-icon":"mdi-calendar",readonly:"","single-line":"","append-icon":"mdi-close"},on:{"click:append":function(t){e.dates=[]}},model:{value:e.dates,callback:function(t){e.dates=t},expression:"dates"}},n))]}}]),model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[a("v-date-picker",{attrs:{range:"",locale:"de"},model:{value:e.dates,callback:function(t){e.dates=t},expression:"dates"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){e.menu=!1}}},[e._v(" "+e._s(e.$t("Cancel"))+" ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){return e.$refs.menu.save(e.dates)}}},[e._v(" "+e._s(e.$t("OK"))+" ")])],1)],1)]},proxy:!0}])})],1)},r=[],o=a("f4d6"),i=a("c7eb"),s=a("3835"),c=a("1da1"),p=(a("d3b7"),a("4de4"),a("d81d"),a("5089")),u=a("9d8f"),d=a.n(u),l=a("4c03"),y=a("ebc9"),f=a("5a0c"),g=a.n(f),b={dishId:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},code:{displayName:"code"},name:{displayName:"name"},categoryId:{displayName:"labelName",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList,itemText:"_langsname"}}},categoryTypeId:{displayName:"warengruppe",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:y["a"].getList}}},totalCount:{displayName:"totalMoneyCount"},totalDelivery:{displayName:"totalDelivery"}},m={load:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t){var a,n,r,o,c,u,l,y,f,b;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=t[0].dateFilter,n=g()().format("YYYY-MM-DD"),r=Object(s["a"])(a,2),o=r[0],c=r[1],u=Object.assign({},{from:null!==o&&void 0!==o?o:n,to:null!==c&&void 0!==c?c:n}),e.next=6,d.a.get("DCache.php",Object.assign({op:"showAllDCache",lang:p["b"].getLang()},u));case 6:return l=e.sent.content,y=l.filter((function(e){return e.amount<0})).reduce((function(e,t){return e[t.id]?e[t.id]+=-1*parseInt(t.amount):e[t.id]=-1*parseInt(t.amount),e}),{}),f=Object.assign({},{start:null!==o&&void 0!==o?o:n,end:null!==c&&void 0!==c?c:n}),e.next=11,d.a.get("BackendData.php",Object.assign({op:"dishStatistic",lang:p["b"].getLang()},f));case 11:return b=e.sent.content.map((function(e){var t=e;return y[t.dishId]?t.totalDelivery=y[t.dishId]:t.totalDelivery=0,t})),e.abrupt("return",b);case 13:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},h=o["IKDataEntity"].ModelFactory(b,m),C={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:h,dates:[],menu:!1}},computed:{filter:function(){if(Date.parse(this.dates[0])>Date.parse(this.dates[1])){var e=[this.dates[1],this.dates[0]];this.dates[0]=e[0],this.dates[1]=e[1]}return{start:this.dates[0],end:this.dates[1]}}},mounted:function(){},methods:{}},v=C,I=a("2877"),O=a("6544"),D=a.n(O),w=a("8336"),j=a("b0af"),F=a("2e4b"),E=a("e449"),T=a("2fa4"),x=a("8654"),N=Object(I["a"])(v,n,r,!1,null,null,null);t["default"]=N.exports;D()(N,{VBtn:w["a"],VCard:j["a"],VDatePicker:F["a"],VMenu:E["a"],VSpacer:T["a"],VTextField:x["a"]})},a86d:function(e,t,a){"use strict";var n=a("f4d6"),r={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=n["IKDataEntity"].ModelFactory(r,{})},b0d9:function(e,t,a){"use strict";var n=a("c7eb"),r=a("5530"),o=a("1da1"),i=a("5089"),s=a("f4d6"),c=a("9d8f"),p=a.n(c),u={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:s["IKDataEntity"].Types.Boolean},multiSelect:{type:s["IKDataEntity"].Types.Boolean},attrubuteCount:{type:s["IKDataEntity"].Types.Integer,form:!1}},d={load:function(){var e=Object(o["a"])(Object(n["a"])().mark((function e(t){return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Category.php",Object(r["a"])({op:"showAttributeGroup",lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return p.a.postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return p.a.postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return p.a.post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=s["IKDataEntity"].ModelFactory(u,d)},ebc9:function(e,t,a){"use strict";var n=a("c7eb"),r=a("5530"),o=a("1da1"),i=a("5089"),s=a("f4d6"),c=a("9d8f"),p=a.n(c),u={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},d={load:function(){var e=Object(o["a"])(Object(n["a"])().mark((function e(t){return Object(n["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("CategoryType.php",Object(r["a"])({lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=s["IKDataEntity"].ModelFactory(u,d)}}]);
//# sourceMappingURL=chunk-7e83e32a.dbcbe3e3.js.map