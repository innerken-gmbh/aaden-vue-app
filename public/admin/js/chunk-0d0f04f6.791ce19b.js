(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0d0f04f6"],{"154d":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("v-card",{attrs:{color:"basil"}},[a("v-card-title",{staticClass:"text-center justify-center py-6"},[a("h1",{staticClass:"font-weight-bold display-3 black--text"},[e._v(" "+e._s(e.$t("菜品及销量统计"))+" ")])]),a("v-card-text",[a("v-row",[a("v-col",{attrs:{cols:"6"}},[a("v-select",{attrs:{items:e.categoryList,"item-text":"_langsname","item-value":"id",label:e.$t("永久隐藏类型"),"append-icon":"mdi-close",multiple:""},on:{"click:append":e.clearFixedCategory,change:function(t){return e.selectFixedCategory(e.fixedHideCategories)}},model:{value:e.fixedHideCategories,callback:function(t){e.fixedHideCategories=t},expression:"fixedHideCategories"}})],1),a("v-col",{attrs:{cols:"6"}},[a("v-select",{attrs:{items:e.realAttributes,label:e.$t("永久隐藏属性"),"item-text":"name","item-value":"id","append-icon":"mdi-close",multiple:""},on:{"click:append":e.clearFixedHideAttribute,change:function(t){return e.selectAttributes(e.fixedHideAttributes)}},model:{value:e.fixedHideAttributes,callback:function(t){e.fixedHideAttributes=t},expression:"fixedHideAttributes"}})],1)],1)],1),a("v-tabs",{attrs:{"background-color":"transparent",color:"primary",grow:""}},[e._l(e.tabs,(function(t,r){return a("v-tab",{key:r},[e._v(" "+e._s(t)+" ")])})),a("v-tab-item",[a("ik-data-table",{ref:"statisticTable",attrs:{model:e.model,"use-action":!1,"use-select":!1,icon:"mdi-calculator-variant","entity-name":e.$t("菜品统计"),filter:e.filter},scopedSlots:e._u([{key:"filterLeft",fn:function(){return[a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":e.dates,"offset-y":""},on:{"update:returnValue":function(t){e.dates=t},"update:return-value":function(t){e.dates=t}},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on;return[a("v-text-field",e._g({staticClass:"ml-auto",staticStyle:{"max-width":"250px"},attrs:{"hide-details":"",label:e.$t("日期筛选"),"prepend-icon":"mdi-calendar",readonly:"","single-line":"","append-icon":"mdi-close"},on:{"click:append":e.clear},model:{value:e.dates,callback:function(t){e.dates=t},expression:"dates"}},r))]}}]),model:{value:e.menu,callback:function(t){e.menu=t},expression:"menu"}},[a("v-date-picker",{attrs:{"no-title":"",range:"",scrollable:"",locale:"de"},model:{value:e.dates,callback:function(t){e.dates=t},expression:"dates"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){e.menu=!1}}},[e._v(" "+e._s(e.$t("Cancel"))+" ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){return e.$refs.menu.save(e.dates)}}},[e._v(" "+e._s(e.$t("OK"))+" ")])],1)],1)]},proxy:!0},{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}},[a("v-spacer"),a("v-btn",{staticClass:"mb-2 mr-2",attrs:{color:"primary",dark:""},on:{click:e.printByDishCode}},[e._v(" "+e._s(e.$t("按菜号打印"))+" ")]),a("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:e.print}},[e._v(" "+e._s(e.$t("打印"))+" ")])],1)]},proxy:!0}])})],1),a("v-tab-item",[a("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-vuetify",inline:""},scopedSlots:e._u([{key:"after-heading",fn:function(){return[a("div",{staticClass:"display-2 font-weight-light"},[e._v(" "+e._s(e.$t("销量实时统计"))+" ")])]},proxy:!0}])},[a("v-row",[a("v-col",{attrs:{cols:"2"}},[a("v-dialog",{ref:"dialog",attrs:{"return-value":e.realTimeDates,persistent:"",width:"290px"},on:{"update:returnValue":function(t){e.realTimeDates=t},"update:return-value":function(t){e.realTimeDates=t}},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,i=t.attrs;return[a("v-text-field",e._g(e._b({attrs:{label:e.$t("日期筛选"),"prepend-icon":"mdi-calendar",readonly:""},model:{value:e.realTimeDates,callback:function(t){e.realTimeDates=t},expression:"realTimeDates"}},"v-text-field",i,!1),r))]}}]),model:{value:e.datePickerDialog,callback:function(t){e.datePickerDialog=t},expression:"datePickerDialog"}},[a("v-date-picker",{attrs:{scrollable:""},model:{value:e.realTimeDates,callback:function(t){e.realTimeDates=t},expression:"realTimeDates"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){e.datePickerDialog=!1}}},[e._v(" Cancel ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){return e.$refs.dialog.save(e.realTimeDates)}}},[e._v(" OK ")])],1)],1)],1),a("v-col",{attrs:{cols:"2"}},[a("v-dialog",{ref:"timeDialog",attrs:{"return-value":e.hourStart,persistent:"",width:"290px"},on:{"update:returnValue":function(t){e.hourStart=t},"update:return-value":function(t){e.hourStart=t}},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,i=t.attrs;return[a("v-text-field",e._g(e._b({attrs:{label:e.$t("startTime"),"prepend-icon":"mdi-calendar",readonly:""},model:{value:e.hourStart,callback:function(t){e.hourStart=t},expression:"hourStart"}},"v-text-field",i,!1),r))]}}]),model:{value:e.timeStartPickerDialog,callback:function(t){e.timeStartPickerDialog=t},expression:"timeStartPickerDialog"}},[a("v-time-picker",{attrs:{range:"",scrollable:""},model:{value:e.hourStart,callback:function(t){e.hourStart=t},expression:"hourStart"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){e.timeStartPickerDialog=!1}}},[e._v(" Cancel ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){return e.$refs.timeDialog.save(e.hourStart)}}},[e._v(" OK ")])],1)],1)],1),a("v-col",{attrs:{cols:"2"}},[a("v-dialog",{ref:"timeEndDialog",attrs:{"return-value":e.hourEnd,persistent:"",width:"290px"},on:{"update:returnValue":function(t){e.hourEnd=t},"update:return-value":function(t){e.hourEnd=t}},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,i=t.attrs;return[a("v-text-field",e._g(e._b({attrs:{label:e.$t("endTime"),"prepend-icon":"mdi-calendar",readonly:""},model:{value:e.hourEnd,callback:function(t){e.hourEnd=t},expression:"hourEnd"}},"v-text-field",i,!1),r))]}}]),model:{value:e.timeEndPickerDialog,callback:function(t){e.timeEndPickerDialog=t},expression:"timeEndPickerDialog"}},[a("v-time-picker",{attrs:{range:"",scrollable:""},model:{value:e.hourEnd,callback:function(t){e.hourEnd=t},expression:"hourEnd"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){e.timeEndPickerDialog=!1}}},[e._v(" Cancel ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(t){return e.$refs.timeEndDialog.save(e.hourEnd)}}},[e._v(" OK ")])],1)],1)],1),a("v-col",{attrs:{cols:"2"}},[a("v-select",{staticStyle:{"max-width":"250px"},attrs:{items:e.selectedCategoryList,"item-text":"categoryName","item-value":"dishesCategoryId","append-icon":"mdi-magnify",label:e.$t("Search"),multiple:""},on:{change:function(t){return e.selectCategory(e.search)}},model:{value:e.search,callback:function(t){e.search=t},expression:"search"}})],1),a("v-col",{attrs:{cols:"4"}},[a("v-btn",{attrs:{"x-large":"",color:"primary",block:""},on:{click:e.refreshData}},[e._v(" "+e._s(e.$t("刷新数据"))+" ")])],1)],1),a("v-divider",{staticClass:"mt-3"}),a("v-data-table",{attrs:{headers:e.headers,items:e.showData,"group-by":"timeDuration","items-per-page":100,"group-desc":""},scopedSlots:e._u([{key:"group.header",fn:function(t){return[a("td",{attrs:{colspan:"100%"}},[a("div",[e._v(" "+e._s(e.$t("time"))+" :"+e._s(t.group)+" "+e._s(e.$t("hour")))])])]}},{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}},[a("v-spacer"),a("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:function(t){return e.printRealTimeSalesBon(e.search)}}},[e._v(" "+e._s(e.$t("打印"))+" ")])],1)]},proxy:!0}])})],1)],1)],2)],1)],1)],1)},i=[],n=(a("4de4"),a("7db0"),a("4160"),a("caad"),a("a15b"),a("13d5"),a("2532"),a("159b"),a("96cf"),a("1da1")),o=(a("99af"),a("2909")),s=a("5089"),l=a("f4d6"),c=a("9d8f"),u=a.n(c),d=a("4c03"),p=a("ebc9"),f={dishId:{type:l["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},code:{displayName:"code"},name:{displayName:"name"},categoryId:{displayName:"labelName",type:l["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,itemText:"_langsname"}}},categoryTypeId:{displayName:"labelType",type:l["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList}}},price:{displayName:"price"},todayCount:{displayName:"todayCount"},weeklyCount:{displayName:"weeklyCount"},monthlyCount:{displayName:"monthlyCount"},totalCount:{displayName:"totalMoneyCount"}},g={load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=[],localStorage.getItem("fixedHideCategories")&&(a=JSON.parse(localStorage.getItem("fixedHideCategories"))),console.log("filteredCategory",a),e.next=5,u.a.get("BackendData.php",Object.assign.apply(Object,[{op:"dishStatistic",lang:s["a"].getLang()}].concat(Object(o["a"])(t))));case 5:return e.abrupt("return",e.sent.content.filter((function(e){return!a.includes(parseInt(e.categoryId))})));case 6:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},m=l["IKDataEntity"].ModelFactory(f,g),y=a("ccdd"),h=a("0a61"),b=a("ff51"),v=a("b0d9"),C=a("2f69"),I=a("c787"),x={components:{IkDataTable:l["IkDataTable"]},data:function(){return{tabs:[this.$i18n.t("菜品统计"),this.$i18n.t("销量实时统计")],model:m,dates:[],menu:!1,dishCategoryTypeIds:[],search:[],fixedHideCategories:[],fixedHideAttributes:[],headers:[{text:this.$i18n.t("name"),align:"start",value:"name",groupable:!1},{text:this.$i18n.t("labelName"),value:"categoryName",align:"center",groupable:!1},{text:this.$i18n.t("count"),value:"count",align:"center",groupable:!1},{text:this.$i18n.t("sumPrice"),value:"sumPrice",align:"center",groupable:!1},{text:this.$i18n.t("timeDuration"),value:"timeDuration",align:"center"}],resData:[],showData:[],categoryList:[],selectedCategoryList:[],dishCategoryIds:[],datePickerDialog:null,timeStartPickerDialog:null,timeEndPickerDialog:null,hourStart:"",hourEnd:"",realTimeDates:"",printCategoryIds:[],attributeData:[],hideAttributeIds:[],realAttributes:[]}},computed:{filter:function(){if(Date.parse(this.dates[0])>Date.parse(this.dates[1])){var e=[this.dates[1],this.dates[0]];this.dates[0]=e[0],this.dates[1]=e[1]}return{start:this.dates[0],end:this.dates[1]}}},watch:{dates:function(e){}},mounted:function(){this.reloadData()},methods:{refreshData:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=[e.realTimeDates+" "+e.hourStart,e.realTimeDates+" "+e.hourEnd],t.next=3,e.getData(a);case 3:case"end":return t.stop()}}),t)})))()},selectCategory:function(e){this.dishCategoryIds=e,this.showData=this.resData.filter((function(t){return e.includes(t.dishesCategoryId)})),0===e.length&&(this.showData=this.resData)},clearFixedCategory:function(){this.fixedHideCategories=[],localStorage.removeItem("fixedHideCategories")},clearFixedHideAttribute:function(){localStorage.removeItem("fixedHideAttribute")},selectFixedCategory:function(e){var t=JSON.stringify(e);localStorage.setItem("fixedHideCategories",t),this.selectedCategoryList=this.selectedCategoryList.filter((function(t){return!e.includes(t.dishesCategoryId)})),this.showData=this.resData.filter((function(t){return e.includes(t.dishesCategoryId)})),0===e.length&&(this.showData=this.resData)},selectAttributes:function(e){var t=JSON.stringify(e);localStorage.setItem("fixedHideAttribute",t)},groupElement:function(e,t){var a=function(a,r){var i=I["default"].deepCopy(a),n=function(a){return e.forEach((function(e){var n=i.find((function(a){return e[t]===a[r]}));n&&(n[a]||(n[a]=[]),n[a].push(e))})),i};return{saveIn:n}};return{on:a}},getAllAttribute:function(){return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,C["a"].getList();case 2:return e.abrupt("return",e.sent.filter((function(e){return e.optattributeGroupId.length>0})));case 3:case"end":return e.stop()}}),e)})))()},reloadData:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return e.realTimeDates=Object(b["a"])(0),e.hourStart=""===e.hourStart?"00:00:00":e.hourStart,e.hourEnd=""===e.hourEnd?"23:59:59":e.hourEnd,t.next=5,d["a"].getList();case 5:return e.categoryList=t.sent,a=[e.realTimeDates+" "+e.hourStart,e.realTimeDates+" "+e.hourEnd],t.next=9,e.getData(a);case 9:return localStorage.getItem("fixedHideAttribute")&&(e.fixedHideAttributes=JSON.parse(localStorage.getItem("fixedHideAttribute"))),t.next=12,e.getAttributeGrouped();case 12:e.attributeData=t.sent,e.realAttributes=e.attributeData.reduce((function(e,t){return t.childAttributes.forEach((function(t){return e.push(t)})),e}),[]);case 14:case"end":return t.stop()}}),t)})))()},clear:function(){this.dates=[]},getData:function(e){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=[],a.next=3,Object(h["u"])(e).then((function(e){r=e.content.filter((function(e){return e.count>0})),localStorage.getItem("fixedHideCategories")?(t.fixedHideCategories=JSON.parse(localStorage.getItem("fixedHideCategories")),t.resData=r.filter((function(e){return!t.fixedHideCategories.includes(parseInt(e.dishesCategoryId))}))):t.resData=I["default"].deepCopy(r),t.showData=t.resData}));case 3:t.showData.forEach((function(e){var a=t.selectedCategoryList.find((function(t){return t.dishesCategoryId===e.dishesCategoryId}));a||(a={dishesCategoryId:e.dishesCategoryId,categoryName:e.categoryName},t.selectedCategoryList.push(a))}));case 4:case"end":return a.stop()}}),a)})))()},getAttributeGrouped:function(){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function t(){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,v["a"].getList();case 2:return a=t.sent,t.next=5,e.getAllAttribute();case 5:return r=t.sent,t.abrupt("return",e.groupElement(r,"attributeGroupId").on(a,"id").saveIn("childAttributes"));case 7:case"end":return t.stop()}}),t)})))()},printRealTimeSalesBon:function(e){var t=this;this.dishCategoryIds=e.join(",");var a=[this.realTimeDates+" "+this.hourStart,this.realTimeDates+" "+this.hourEnd];y["a"].showConfirm("Bist du sicher?","Möchten Sie Umsatz Bon drucken?",(function(){Object(h["d"])(a,t.dishCategoryIds).then((function(){y["a"].toast("Erfolgreich drucken!")}))}))},printByDishCode:function(){var e=this;if(this.$refs.statisticTable.filterItem.categoryTypeId&&(this.dishCategoryTypeIds=this.$refs.statisticTable.filterItem.categoryTypeId),this.$refs.statisticTable.filterItem.categoryId)this.printCategoryIds=this.$refs.statisticTable.filterItem.categoryId;else{var t=[];if(localStorage.getItem("fixedHideCategories")){this.fixedHideCategories=JSON.parse(localStorage.getItem("fixedHideCategories"));var a=[];a=this.categoryList.filter((function(t){return!e.fixedHideCategories.includes(parseInt(t.id))})),a.forEach((function(e){t.push(e.id)}))}this.printCategoryIds=t.join(",")}var r=[];if(localStorage.getItem("fixedHideAttribute")){this.fixedHideAttributes=JSON.parse(localStorage.getItem("fixedHideAttribute"));var i=[];i=this.realAttributes.filter((function(t){return!e.fixedHideAttributes.includes(parseInt(t.id))})),i.forEach((function(e){r.push(e.id)}))}this.hideAttributeIds=r.join(","),0===this.dates.length?y["a"].showError("Bitte wählen Sie ein Startdatum und Enddatum"):y["a"].showConfirm("Bist du sicher?","Möchten Sie Umsatz Bon drucken?",(function(){Object(h["f"])(e.dishCategoryTypeIds,e.printCategoryIds,e.hideAttributeIds,e.filter).then((function(){y["a"].toast("Erfolgreich drucken!")}))}))},print:function(){var e=this;if(this.$refs.statisticTable.filterItem.categoryTypeId&&(this.dishCategoryTypeIds=this.$refs.statisticTable.filterItem.categoryTypeId),this.$refs.statisticTable.filterItem.categoryId)this.printCategoryIds=this.$refs.statisticTable.filterItem.categoryId;else{var t=[];if(localStorage.getItem("fixedHideCategories")){this.fixedHideCategories=JSON.parse(localStorage.getItem("fixedHideCategories"));var a=[];a=this.categoryList.filter((function(t){return!e.fixedHideCategories.includes(parseInt(t.id))})),a.forEach((function(e){t.push(e.id)}))}this.printCategoryIds=t.join(",")}var r=[];if(localStorage.getItem("fixedHideAttribute")){this.fixedHideAttributes=JSON.parse(localStorage.getItem("fixedHideAttribute"));var i=[];i=this.realAttributes.filter((function(t){return!e.fixedHideAttributes.includes(parseInt(t.id))})),i.forEach((function(e){r.push(e.id)}))}this.hideAttributeIds=r.join(","),0===this.dates.length?y["a"].showError("Bitte wählen Sie ein Startdatum und Enddatum"):y["a"].showConfirm("Bist du sicher?","Möchten Sie Umsatz Bon drucken?",(function(){Object(h["e"])(e.dishCategoryTypeIds,e.printCategoryIds,e.hideAttributeIds,e.filter).then((function(){y["a"].toast("Erfolgreich drucken!")}))}))}}},D=x,T=a("2877"),k=a("6544"),w=a.n(k),S=a("8336"),E=a("b0af"),N=a("99d9"),O=a("62ad"),A=a("a523"),_=a("8fea"),j=a("2e4b"),K=a("169a"),H=a("ce7e"),L=a("e449"),$=a("0fd9"),R=a("b974"),F=a("2fa4"),V=a("71a3"),M=a("c671"),B=a("fe57"),G=a("8654"),P=a("c964"),q=a("71d9"),J=Object(T["a"])(D,r,i,!1,null,null,null);t["default"]=J.exports;w()(J,{VBtn:S["a"],VCard:E["a"],VCardText:N["c"],VCardTitle:N["d"],VCol:O["a"],VContainer:A["a"],VDataTable:_["a"],VDatePicker:j["a"],VDialog:K["a"],VDivider:H["a"],VMenu:L["a"],VRow:$["a"],VSelect:R["a"],VSpacer:F["a"],VTab:V["a"],VTabItem:M["a"],VTabs:B["a"],VTextField:G["a"],VTimePicker:P["a"],VToolbar:q["a"]})},"2f69":function(e,t,a){"use strict";var r=a("5530"),i=(a("96cf"),a("1da1")),n=a("5089"),o=a("f4d6"),s=a("9d8f"),l=a.n(s),c=a("b0d9"),u=a("ebc9"),d={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"name"},attributeGroupId:{displayName:"groupName",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].forceGetList}}},isMultiChosen:{type:o["IKDataEntity"].Types.Boolean},value:{displayName:"value"},printMod:{displayName:"printMod"},priceMod:{type:o["IKDataEntity"].Types.Float,displayName:"priceMod",formConfig:{overwriteRule:!0,rule:[function(e){return/^(-)?[0-9]+\.{0,1}[0-9]{0,2}$/.test(e)||"please enter the correct price"}]}},dishesCategoryTypeId:{displayName:"labelType",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList}}},isAsDefault:{type:o["IKDataEntity"].Types.Boolean}},p={add:function(e){return l.a.postWithUploadFile("Category.php?op=addAttribute",e,{showLoading:!0})},edit:function(e){return l.a.postWithUploadFile("Category.php?op=updateAttribute",e,{showLoading:!0})},remove:function(e){return l.a.post("Category.php?op=deleteAttribute",{id:e})},load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l.a.get("Category.php",Object(r["a"])({op:"showAttribute",lang:n["a"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(d,p)},"4c03":function(e,t,a){"use strict";a("a15b"),a("96cf");var r=a("1da1"),i=a("5530"),n=a("f4d6"),o=a("9d8f"),s=a.n(o),l=a("ebc9"),c=a("b0d9"),u=a("a86d"),d=a("5089"),p=a("6f56"),f={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Category.php",Object(i["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},g={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:n["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:d["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===d["a"].getLang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[u["a"],u["a"],u["a"]],header:!1}},m=n["IKDataEntity"].ModelFactory(g,f),y={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),s.a.post("Category.php?op=add",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,e.appliedConsumeTypeIds=e.consumeTypeIds.join(","),e.appliedFreeInConsumeTypeIds=e.freeInConsumeTypeIds.join(","),s.a.postWithUploadFile("Category.php?op=update",Object(i["a"])(Object(i["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return s.a.post("Category.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Category.php",Object(i["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},h={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},categorySort:{type:n["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{default:50,required:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:n["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:d["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===d["a"].getLang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[u["a"],u["a"],u["a"]],header:!1},dishesCategoryTypeId:{displayName:"labelType",type:n["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList}}},attributeGroupId:{displayName:"attributeGroupNames",type:n["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:c["a"].getList,multiple:!0}}},consumeTypeIds:{type:n["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:p["a"].getList,multiple:!0}}},freeInConsumeTypeIds:{type:n["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:p["a"].getList,multiple:!0}}},color:{type:n["IKDataEntity"].Types.Color,formConfig:{required:!1}},printOrder:{type:n["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},parentId:{type:n["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:m.getList,itemText:"_langsname"}}}};t["a"]=n["IKDataEntity"].ModelFactory(h,y)},"6f56":function(e,t,a){"use strict";var r=a("5530"),i=(a("96cf"),a("1da1")),n=a("f4d6"),o=a("9d8f"),s=a.n(o),l={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"staffName"},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"},color:{type:n["IKDataEntity"].Types.Color,formConfig:{required:!1}}},c={load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Complex.php",Object(r["a"])({op:"showAllConsumeTypeInfo"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return s.a.post("ConsumeType.php?op=add",Object(r["a"])(Object(r["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return s.a.postWithUploadFile("ConsumeType.php?op=update",Object(r["a"])(Object(r["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return s.a.post("ConsumeType.php?op=delete",{id:e})}};t["a"]=n["IKDataEntity"].ModelFactory(l,c)},a86d:function(e,t,a){"use strict";var r=a("f4d6"),i={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=r["IKDataEntity"].ModelFactory(i,{})},b0d9:function(e,t,a){"use strict";var r=a("5530"),i=(a("96cf"),a("1da1")),n=a("5089"),o=a("f4d6"),s=a("9d8f"),l=a.n(s),c={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:o["IKDataEntity"].Types.Boolean},multiSelect:{type:o["IKDataEntity"].Types.Boolean},attrubuteCount:{type:o["IKDataEntity"].Types.Integer,form:!1}},u={load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l.a.get("Category.php",Object(r["a"])({op:"showAttributeGroup",lang:n["a"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return l.a.postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return l.a.postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return l.a.post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=o["IKDataEntity"].ModelFactory(c,u)},ccdd:function(e,t,a){"use strict";var r=a("5530"),i=a("c787");t["a"]=Object(r["a"])({},i["default"])},ebc9:function(e,t,a){"use strict";var r=a("5530"),i=(a("96cf"),a("1da1")),n=a("5089"),o=a("f4d6"),s=a("9d8f"),l=a.n(s),c={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},u={load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,l.a.get("CategoryType.php",Object(r["a"])({lang:n["a"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(c,u)},ff51:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return i}));a("a15b");function r(e){var t=new Date,a=t.getTime(),r=864e5,i=a+e*r,n=new Date(i),o=n.getFullYear(),s=n.getMonth()+1,l=n.getDate();return[o,s,l].join("-")}function i(e){var t=new Date,a=t.getTime(),r=864e5,i=a+e*r,n=new Date(i),o=n.getFullYear()+"-",s=n.getMonth()+1,l=n.getDate(),c=n.getHours()<10?"0"+n.getHours():n.getHours(),u=n.getMinutes()<10?"0"+n.getMinutes():n.getMinutes(),d=n.getSeconds()<10?"0"+n.getSeconds():n.getSeconds();return o+s+"-"+l+" "+c+":"+u+":"+d}}}]);
//# sourceMappingURL=chunk-0d0f04f6.791ce19b.js.map