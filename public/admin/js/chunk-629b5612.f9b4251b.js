(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-629b5612"],{"154d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{ref:"statisticTable",attrs:{model:e.model,"use-action":!1,"use-select":!1,icon:"mdi-calculator-variant","entity-name":e.$t("菜品统计"),filter:e.filter},scopedSlots:e._u([{key:"filterLeft",fn:function(){return[a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":e.dates,"offset-y":""},on:{"update:returnValue":function(t){e.dates=t},"update:return-value":function(t){e.dates=t}},scopedSlots:e._u([{key:"activator",fn:function(t){var n=t.on;return[a("v-text-field",e._g({staticClass:"ml-auto",staticStyle:{"max-width":"250px"},attrs:{"hide-details":"",label:e.$t("日期筛选"),"prepend-icon":"mdi-calendar",readonly:"","single-line":"","append-icon":"mdi-close"},on:{"click:append":e.clear},model:{value:e.dates,callback:function(t){e.dates=t},expression:"dates"}},n))]}}]),model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[a("v-date-picker",{attrs:{"no-title":"",range:"",scrollable:"",locale:"de"},model:{value:e.dates,callback:function(t){e.dates=t},expression:"dates"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){e.menu=!1}}},[e._v(" "+e._s(e.$t("Cancel"))+" ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){return e.$refs.menu.save(e.dates)}}},[e._v(" "+e._s(e.$t("OK"))+" ")])],1)],1)]},proxy:!0},{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}},[a("v-spacer"),a("v-btn",{staticClass:"mb-2 mr-2",attrs:{color:"primary",dark:""},on:{click:e.printBySale}},[e._v(" "+e._s(e.$t("按销量打印"))+" ")]),a("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:e.print}},[e._v(" "+e._s(e.$t("打印"))+" ")])],1)]},proxy:!0}])})],1)],1)},r=[],i=(a("4de4"),a("99af"),a("2909")),o=(a("96cf"),a("1da1")),s=a("3405"),l=a("633c"),p=a("4c03"),c=a("ebc9"),d={dishId:{type:l["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},code:{displayName:"code"},name:{displayName:"name"},categoryId:{displayName:"labelName",type:l["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList,itemText:"_langsname"}}},categoryTypeId:{displayName:"labelType",type:l["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList}}},price:{displayName:"price"},weeklyCount:{displayName:"weeklyCount"},monthlyCount:{displayName:"monthlyCount"},totalCount:{displayName:"totalMoneyCount"}},u={load:function(){var e=Object(o["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l["hillo"].get("BackendData.php",Object.assign.apply(Object,[{op:"dishStatistic",lang:s["a"].lang()}].concat(Object(i["a"])(t))));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},y=l["IKDataEntity"].ModelFactory(d,u),f=a("ccdd"),m=a("0a61"),g={components:{IkDataTable:l["IkDataTable"]},data:function(){return{model:y,dates:[],menu:!1,dishCategoryTypeIds:""}},computed:{filter:function(){if(Date.parse(this.dates[0])>Date.parse(this.dates[1])){var e=[this.dates[1],this.dates[0]];this.dates[0]=e[0],this.dates[1]=e[1]}return{start:this.dates[0],end:this.dates[1]}}},watch:{dates:function(e){}},methods:{clear:function(){this.dates=[]},printBySale:function(){var e=this;this.$refs.statisticTable.filterItem.categoryTypeId&&(this.dishCategoryTypeIds=this.$refs.statisticTable.filterItem.categoryTypeId),0===this.dates.length?f["a"].showError("Bitte wählen Sie ein Startdatum und Enddatum"):f["a"].showConfirm("Bist du sicher?","Möchten Sie Umsatz Bon drucken?",(function(){Object(m["g"])(e.dishCategoryTypeIds,e.filter).then((function(){f["a"].toast("Erfolgreich drucken!")}))}))},print:function(){var e=this;this.$refs.statisticTable.filterItem.categoryTypeId&&(this.dishCategoryTypeIds=this.$refs.statisticTable.filterItem.categoryTypeId),0===this.dates.length?f["a"].showError("Bitte wählen Sie ein Startdatum und Enddatum"):f["a"].showConfirm("Bist du sicher?","Möchten Sie Umsatz Bon drucken?",(function(){Object(m["f"])(e.dishCategoryTypeIds,e.filter).then((function(){f["a"].toast("Erfolgreich drucken!")}))}))}}},h=g,b=a("2877"),I=a("6544"),C=a.n(I),T=a("8336"),v=a("a523"),N=a("2e4b"),w=a("e449"),O=a("2fa4"),E=a("8654"),K=a("71d9"),k=Object(b["a"])(h,n,r,!1,null,null,null);t["default"]=k.exports;C()(k,{VBtn:T["a"],VContainer:v["a"],VDatePicker:N["a"],VMenu:w["a"],VSpacer:O["a"],VTextField:E["a"],VToolbar:K["a"]})},"4c03":function(e,t,a){"use strict";a("a15b"),a("96cf");var n=a("1da1"),r=a("5530"),i=a("633c"),o=a("ebc9"),s=a("b0d9"),l=a("a86d"),p=a("3405"),c=a("6f56"),d={load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["hillo"].get("Category.php",Object(r["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:p["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===p["a"].lang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[l["a"],l["a"],l["a"]],header:!1}},y=i["IKDataEntity"].ModelFactory(u,d),f={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),i["hillo"].post("Category.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),i["hillo"].postWithUploadFile("Category.php?op=update",Object(r["a"])(Object(r["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return i["hillo"].post("Category.php?op=delete",{id:e})},load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["hillo"].get("Category.php",Object(r["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},m={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},categorySort:{type:i["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{default:50,required:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:p["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===p["a"].lang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[l["a"],l["a"],l["a"]],header:!1},dishesCategoryTypeId:{displayName:"labelType",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:o["a"].getList}}},attributeGroupId:{displayName:"attributeGroupNames",type:i["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:s["a"].getList,multiple:!0}}},consumeTypeIds:{type:i["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:c["a"].getList,multiple:!0}}},freeInConsumeTypeIds:{type:i["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:c["a"].getList,multiple:!0}}},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}},printOrder:{type:i["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},parentId:{type:i["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:y.getList,itemText:"_langsname"}}}};t["a"]=i["IKDataEntity"].ModelFactory(m,f)},"6f56":function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("633c"),o={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"staffName"},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}}},s={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["hillo"].get("Complex.php",Object(n["a"])({op:"showAllConsumeTypeInfo"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return i["hillo"].post("ConsumeType.php?op=add",Object(n["a"])(Object(n["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return i["hillo"].postWithUploadFile("ConsumeType.php?op=update",Object(n["a"])(Object(n["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return i["hillo"].post("ConsumeType.php?op=delete",{id:e})}};t["a"]=i["IKDataEntity"].ModelFactory(o,s)},a86d:function(e,t,a){"use strict";var n=a("633c"),r={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=n["IKDataEntity"].ModelFactory(r,{})},b0d9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("3405"),o=a("633c"),s={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:o["IKDataEntity"].Types.Boolean},multiSelect:{type:o["IKDataEntity"].Types.Boolean}},l={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["hillo"].get("Category.php",Object(n["a"])({op:"showAttributeGroup",lang:i["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return o["hillo"].postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return o["hillo"].postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return o["hillo"].post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=o["IKDataEntity"].ModelFactory(s,l)},ccdd:function(e,t,a){"use strict";var n=a("5530"),r=a("633c");t["a"]=Object(n["a"])({},r["IKUtils"])},ebc9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("3405"),o=a("633c"),s={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},l={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["hillo"].get("CategoryType.php",Object(n["a"])({lang:i["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(s,l)}}]);
//# sourceMappingURL=chunk-629b5612.f9b4251b.js.map