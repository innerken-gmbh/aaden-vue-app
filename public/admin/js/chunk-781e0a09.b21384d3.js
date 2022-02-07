(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-781e0a09","chunk-2d20862b"],{"154d":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("v-card",{attrs:{color:"basil"}},[a("v-card-title",{staticClass:"text-center justify-center py-6"},[a("h1",{staticClass:"font-weight-bold display-3 black--text"},[t._v(" "+t._s(t.$t("菜品及销量统计"))+" ")])]),a("v-card-text",[a("v-row",[a("v-col",{attrs:{cols:"6"}},[a("v-select",{attrs:{items:t.categoryList,"item-text":"_langsname","item-value":"id",label:t.$t("永久隐藏类型"),"append-icon":"mdi-close",multiple:""},on:{"click:append":t.clearFixedCategory,change:function(e){return t.selectFixedCategory(t.fixedHideCategories)}},model:{value:t.fixedHideCategories,callback:function(e){t.fixedHideCategories=e},expression:"fixedHideCategories"}})],1),a("v-col",{attrs:{cols:"6"}},[a("v-select",{attrs:{items:t.realAttributes,label:t.$t("永久隐藏属性"),"item-text":"name","item-value":"id","append-icon":"mdi-close",multiple:""},on:{"click:append":t.clearFixedHideAttribute,change:function(e){return t.selectAttributes(t.fixedHideAttributes)}},model:{value:t.fixedHideAttributes,callback:function(e){t.fixedHideAttributes=e},expression:"fixedHideAttributes"}})],1)],1)],1),a("v-tabs",{attrs:{"background-color":"transparent",color:"primary",grow:""}},[t._l(t.tabs,(function(e,r){return a("v-tab",{key:r},[t._v(" "+t._s(e)+" ")])})),a("v-tab-item",[a("ik-data-table",{ref:"statisticTable",attrs:{model:t.model,"use-action":!1,"use-select":!1,icon:"mdi-calculator-variant","entity-name":t.$t("菜品统计"),filter:t.filter,"use-date-filter":!0,"required-date-value":t.dates},scopedSlots:t._u([{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}},[a("v-spacer"),a("v-btn",{staticClass:"mb-2 mr-2",attrs:{color:"primary",dark:""},on:{click:t.printByDishCode}},[t._v(" "+t._s(t.$t("按菜号打印"))+" ")]),a("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:t.print}},[t._v(" "+t._s(t.$t("打印"))+" ")])],1)]},proxy:!0}])})],1),a("v-tab-item",[a("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-vuetify",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[a("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("销量实时统计"))+" ")])]},proxy:!0}])},[a("v-row",[a("v-col",{attrs:{cols:"2"}},[a("v-dialog",{ref:"dialog",attrs:{"return-value":t.realTimeDates,persistent:"",width:"290px"},on:{"update:returnValue":function(e){t.realTimeDates=e},"update:return-value":function(e){t.realTimeDates=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,i=e.attrs;return[a("v-text-field",t._g(t._b({attrs:{label:t.$t("日期筛选"),"prepend-icon":"mdi-calendar",readonly:""},model:{value:t.realTimeDates,callback:function(e){t.realTimeDates=e},expression:"realTimeDates"}},"v-text-field",i,!1),r))]}}]),model:{value:t.datePickerDialog,callback:function(e){t.datePickerDialog=e},expression:"datePickerDialog"}},[a("v-date-picker",{attrs:{scrollable:""},model:{value:t.realTimeDates,callback:function(e){t.realTimeDates=e},expression:"realTimeDates"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.datePickerDialog=!1}}},[t._v(" Cancel ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.dialog.save(t.realTimeDates)}}},[t._v(" OK ")])],1)],1)],1),a("v-col",{attrs:{cols:"2"}},[a("v-dialog",{ref:"timeDialog",attrs:{"return-value":t.hourStart,persistent:"",width:"290px"},on:{"update:returnValue":function(e){t.hourStart=e},"update:return-value":function(e){t.hourStart=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,i=e.attrs;return[a("v-text-field",t._g(t._b({attrs:{label:t.$t("startTime"),"prepend-icon":"mdi-calendar",readonly:""},model:{value:t.hourStart,callback:function(e){t.hourStart=e},expression:"hourStart"}},"v-text-field",i,!1),r))]}}]),model:{value:t.timeStartPickerDialog,callback:function(e){t.timeStartPickerDialog=e},expression:"timeStartPickerDialog"}},[a("v-time-picker",{attrs:{range:"",scrollable:""},model:{value:t.hourStart,callback:function(e){t.hourStart=e},expression:"hourStart"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.timeStartPickerDialog=!1}}},[t._v(" Cancel ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.timeDialog.save(t.hourStart)}}},[t._v(" OK ")])],1)],1)],1),a("v-col",{attrs:{cols:"2"}},[a("v-dialog",{ref:"timeEndDialog",attrs:{"return-value":t.hourEnd,persistent:"",width:"290px"},on:{"update:returnValue":function(e){t.hourEnd=e},"update:return-value":function(e){t.hourEnd=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var r=e.on,i=e.attrs;return[a("v-text-field",t._g(t._b({attrs:{label:t.$t("endTime"),"prepend-icon":"mdi-calendar",readonly:""},model:{value:t.hourEnd,callback:function(e){t.hourEnd=e},expression:"hourEnd"}},"v-text-field",i,!1),r))]}}]),model:{value:t.timeEndPickerDialog,callback:function(e){t.timeEndPickerDialog=e},expression:"timeEndPickerDialog"}},[a("v-time-picker",{attrs:{range:"",scrollable:""},model:{value:t.hourEnd,callback:function(e){t.hourEnd=e},expression:"hourEnd"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.timeEndPickerDialog=!1}}},[t._v(" Cancel ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.timeEndDialog.save(t.hourEnd)}}},[t._v(" OK ")])],1)],1)],1),a("v-col",{attrs:{cols:"2"}},[a("v-select",{staticStyle:{"max-width":"250px"},attrs:{items:t.selectedCategoryList,"item-text":"categoryName","item-value":"dishesCategoryId","append-icon":"mdi-magnify",label:t.$t("Search"),multiple:""},on:{change:function(e){return t.selectCategory(t.search)}},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}})],1),a("v-col",{attrs:{cols:"4"}},[a("v-btn",{attrs:{"x-large":"",color:"primary",block:""},on:{click:t.refreshData}},[t._v(" "+t._s(t.$t("刷新数据"))+" ")])],1)],1),a("v-divider",{staticClass:"mt-3"}),a("v-data-table",{attrs:{headers:t.headers,items:t.showData,"group-by":"timeDuration","items-per-page":100,"group-desc":""},scopedSlots:t._u([{key:"group.header",fn:function(e){return[a("td",{attrs:{colspan:"100%"}},[a("div",[t._v(" "+t._s(t.$t("time"))+" :"+t._s(e.group)+" "+t._s(t.$t("hour")))])])]}},{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}},[a("v-spacer"),a("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:function(e){return t.printRealTimeSalesBon(t.search)}}},[t._v(" "+t._s(t.$t("打印"))+" ")])],1)]},proxy:!0}])})],1)],1)],2)],1)],1)],1)},i=[],n=(a("4de4"),a("7db0"),a("4160"),a("caad"),a("a15b"),a("13d5"),a("2532"),a("159b"),a("96cf"),a("1da1")),o=a("5089"),s=a("f4d6"),c=a("9d8f"),u=a.n(c),d=a("4c03"),l=a("ebc9"),p={dishId:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},code:{displayName:"code"},name:{displayName:"name"},categoryId:{displayName:"labelName",type:s["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,itemText:"_langsname"}}},categoryTypeId:{displayName:"warengruppe",type:s["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList}}},price:{displayName:"price"},totalCount:{tableConfig:{}}},f={load:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){var a,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=[],localStorage.getItem("fixedHideCategories")&&(a=JSON.parse(localStorage.getItem("fixedHideCategories"))),console.log("filteredCategory",a),console.log("filter",e),r={start:e[0].dateFilter[0],end:e[0].dateFilter[1]},t.next=7,u.a.get("BackendData.php",Object.assign({op:"dishStatistic",lang:o["b"].getLang()},r));case 7:return t.abrupt("return",t.sent.content.filter((function(t){return!a.includes(parseInt(t.categoryId))})));case 8:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},g=s["IKDataEntity"].ModelFactory(p,f),h=a("ccdd"),m=a("0a61"),y=a("ff51"),b=a("b0d9"),v=a("2f69"),C=a("641f"),I=a.n(C),x={components:{IkDataTable:s["IkDataTable"]},data:function(){return{tabs:[this.$i18n.t("菜品统计"),this.$i18n.t("销量实时统计")],model:g,dates:[],menu:!1,dishCategoryTypeIds:[],search:[],fixedHideCategories:[],fixedHideAttributes:[],headers:[{text:this.$i18n.t("name"),align:"start",value:"name",groupable:!1},{text:this.$i18n.t("labelName"),value:"categoryName",align:"center",groupable:!1},{text:this.$i18n.t("count"),value:"count",align:"center",groupable:!1},{text:this.$i18n.t("sumPrice"),value:"sumPrice",align:"center",groupable:!1},{text:this.$i18n.t("timeDuration"),value:"timeDuration",align:"center"}],resData:[],showData:[],categoryList:[],selectedCategoryList:[],dishCategoryIds:[],datePickerDialog:null,timeStartPickerDialog:null,timeEndPickerDialog:null,hourStart:"",hourEnd:"",realTimeDates:"",printCategoryIds:[],attributeData:[],hideAttributeIds:[],realAttributes:[]}},computed:{filter:function(){if(Date.parse(this.dates[0])>Date.parse(this.dates[1])){var t=[this.dates[1],this.dates[0]];this.dates[0]=t[0],this.dates[1]=t[1]}return{start:this.dates[0],end:this.dates[1]}}},watch:{dates:function(t){}},mounted:function(){},methods:{refreshData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return a=[t.realTimeDates+" "+t.hourStart,t.realTimeDates+" "+t.hourEnd],e.next=3,t.getData(a);case 3:case"end":return e.stop()}}),e)})))()},selectCategory:function(t){this.dishCategoryIds=t,this.showData=this.resData.filter((function(e){return t.includes(e.dishesCategoryId)})),0===t.length&&(this.showData=this.resData)},clearFixedCategory:function(){this.fixedHideCategories=[],localStorage.removeItem("fixedHideCategories")},clearFixedHideAttribute:function(){localStorage.removeItem("fixedHideAttribute")},selectFixedCategory:function(t){var e=JSON.stringify(t);localStorage.setItem("fixedHideCategories",e),this.selectedCategoryList=this.selectedCategoryList.filter((function(e){return!t.includes(e.dishesCategoryId)})),this.showData=this.resData.filter((function(e){return t.includes(e.dishesCategoryId)})),0===t.length&&(this.showData=this.resData)},selectAttributes:function(t){var e=JSON.stringify(t);localStorage.setItem("fixedHideAttribute",e)},groupElement:function(t,e){var a=function(a,r){var i=I.a.deepCopy(a),n=function(a){return t.forEach((function(t){var n=i.find((function(a){return t[e]===a[r]}));n&&(n[a]||(n[a]=[]),n[a].push(t))})),i};return{saveIn:n}};return{on:a}},getAllAttribute:function(){return Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,v["a"].getList();case 2:return t.abrupt("return",t.sent.filter((function(t){return t.optattributeGroupId.length>0})));case 3:case"end":return t.stop()}}),t)})))()},reloadData:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.realTimeDates=Object(y["a"])(0),t.hourStart=""===t.hourStart?"00:00:00":t.hourStart,t.hourEnd=""===t.hourEnd?"23:59:59":t.hourEnd,e.next=5,d["a"].getList();case 5:return t.categoryList=e.sent,a=[t.realTimeDates+" "+t.hourStart,t.realTimeDates+" "+t.hourEnd],e.next=9,t.getData(a);case 9:return localStorage.getItem("fixedHideAttribute")&&(t.fixedHideAttributes=JSON.parse(localStorage.getItem("fixedHideAttribute"))),e.next=12,t.getAttributeGrouped();case 12:t.attributeData=e.sent,t.realAttributes=t.attributeData.reduce((function(t,e){return e.childAttributes&&e.childAttributes.forEach((function(e){return t.push(e)})),t}),[]);case 14:case"end":return e.stop()}}),e)})))()},clear:function(){this.dates=[]},getData:function(t){var e=this;return Object(n["a"])(regeneratorRuntime.mark((function a(){var r;return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return r=[],a.next=3,Object(m["y"])(t).then((function(t){r=t.content.filter((function(t){return t.count>0})),localStorage.getItem("fixedHideCategories")?(e.fixedHideCategories=JSON.parse(localStorage.getItem("fixedHideCategories")),e.resData=r.filter((function(t){return!e.fixedHideCategories.includes(parseInt(t.dishesCategoryId))}))):e.resData=I.a.deepCopy(r),e.showData=e.resData}));case 3:e.showData.forEach((function(t){var a=e.selectedCategoryList.find((function(e){return e.dishesCategoryId===t.dishesCategoryId}));a||(a={dishesCategoryId:t.dishesCategoryId,categoryName:t.categoryName},e.selectedCategoryList.push(a))}));case 4:case"end":return a.stop()}}),a)})))()},getAttributeGrouped:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a,r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,b["a"].getList();case 2:return a=e.sent,e.next=5,t.getAllAttribute();case 5:return r=e.sent,e.abrupt("return",t.groupElement(r,"attributeGroupId").on(a,"id").saveIn("childAttributes"));case 7:case"end":return e.stop()}}),e)})))()},printRealTimeSalesBon:function(t){var e=this;this.dishCategoryIds=t.join(",");var a=[this.realTimeDates+" "+this.hourStart,this.realTimeDates+" "+this.hourEnd];h["a"].showConfirm("Bist du sicher?","Möchten Sie Umsatz Bon drucken?",(function(){Object(m["c"])(a,e.dishCategoryIds).then((function(){h["a"].toast("Erfolgreich drucken!")}))}))},printByDishCode:function(){var t=this;if(this.$refs.statisticTable.filterItem.categoryTypeId&&(this.dishCategoryTypeIds=this.$refs.statisticTable.filterItem.categoryTypeId),this.$refs.statisticTable.filterItem.categoryId)this.printCategoryIds=this.$refs.statisticTable.filterItem.categoryId;else{var e=[];if(localStorage.getItem("fixedHideCategories")){this.fixedHideCategories=JSON.parse(localStorage.getItem("fixedHideCategories"));var a=[];a=this.categoryList.filter((function(e){return!t.fixedHideCategories.includes(parseInt(e.id))})),a.forEach((function(t){e.push(t.id)}))}this.printCategoryIds=e.join(",")}var r=[];if(localStorage.getItem("fixedHideAttribute")){this.fixedHideAttributes=JSON.parse(localStorage.getItem("fixedHideAttribute"));var i=[];i=this.realAttributes.filter((function(e){return!t.fixedHideAttributes.includes(parseInt(e.id))})),i.forEach((function(t){r.push(t.id)}))}this.hideAttributeIds=r.join(","),0===this.dates.length?h["a"].showError("Bitte wählen Sie ein Startdatum und Enddatum"):h["a"].showConfirm("Bist du sicher?","Möchten Sie Umsatz Bon drucken?",(function(){Object(m["e"])(t.dishCategoryTypeIds,t.printCategoryIds,t.hideAttributeIds,t.filter).then((function(){h["a"].toast("Erfolgreich drucken!")}))}))},print:function(){var t=this;if(this.$refs.statisticTable.filterItem.categoryTypeId&&(this.dishCategoryTypeIds=this.$refs.statisticTable.filterItem.categoryTypeId),this.$refs.statisticTable.filterItem.categoryId)this.printCategoryIds=this.$refs.statisticTable.filterItem.categoryId;else{var e=[];if(localStorage.getItem("fixedHideCategories")){this.fixedHideCategories=JSON.parse(localStorage.getItem("fixedHideCategories"));var a=[];a=this.categoryList.filter((function(e){return!t.fixedHideCategories.includes(parseInt(e.id))})),a.forEach((function(t){e.push(t.id)}))}this.printCategoryIds=e.join(",")}var r=[];if(localStorage.getItem("fixedHideAttribute")){this.fixedHideAttributes=JSON.parse(localStorage.getItem("fixedHideAttribute"));var i=[];i=this.realAttributes.filter((function(e){return!t.fixedHideAttributes.includes(parseInt(e.id))})),i.forEach((function(t){r.push(t.id)}))}this.hideAttributeIds=r.join(","),0===this.dates.length?h["a"].showError("Bitte wählen Sie ein Startdatum und Enddatum"):h["a"].showConfirm("Bist du sicher?","Möchten Sie Umsatz Bon drucken?",(function(){Object(m["d"])(t.dishCategoryTypeIds,t.printCategoryIds,t.hideAttributeIds,t.filter).then((function(){h["a"].toast("Erfolgreich drucken!")}))}))}}},D=x,w=a("2877"),T=a("6544"),k=a.n(T),S=a("8336"),E=a("b0af"),O=a("99d9"),A=a("62ad"),N=a("a523"),F=a("8fea"),j=a("2e4b"),H=a("169a"),_=a("ce7e"),K=a("0fd9"),L=a("b974"),B=a("2fa4"),$=a("71a3"),R=a("c671"),P=a("fe57"),V=a("8654"),M=a("c964"),G=a("71d9"),J=Object(w["a"])(D,r,i,!1,null,null,null);e["default"]=J.exports;k()(J,{VBtn:S["a"],VCard:E["a"],VCardText:O["b"],VCardTitle:O["c"],VCol:A["a"],VContainer:N["a"],VDataTable:F["a"],VDatePicker:j["a"],VDialog:H["a"],VDivider:_["a"],VRow:K["a"],VSelect:L["a"],VSpacer:B["a"],VTab:$["a"],VTabItem:R["a"],VTabs:P["a"],VTextField:V["a"],VTimePicker:M["a"],VToolbar:G["a"]})},"2f69":function(t,e,a){"use strict";var r=a("5530"),i=(a("96cf"),a("1da1")),n=a("5089"),o=a("f4d6"),s=a("9d8f"),c=a.n(s),u=a("b0d9"),d=a("ebc9"),l={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"name"},attributeGroupId:{displayName:"groupName",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].forceGetList}}},isMultiChosen:{type:o["IKDataEntity"].Types.Boolean},value:{displayName:"value"},printMod:{displayName:"printMod"},priceMod:{type:o["IKDataEntity"].Types.Float,displayName:"priceMod",formConfig:{overwriteRule:!0,rule:[function(t){return/^(-)?[0-9]+\.{0,1}[0-9]{0,2}$/.test(t)||"please enter the correct price"}]}},dishesCategoryTypeId:{displayName:"warengruppe",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList}}},isAsDefault:{type:o["IKDataEntity"].Types.Boolean}},p={add:function(t){return c.a.postWithUploadFile("Category.php?op=addAttribute",t,{showLoading:!0})},edit:function(t){return c.a.postWithUploadFile("Category.php?op=updateAttribute",t,{showLoading:!0})},remove:function(t){return c.a.post("Category.php?op=deleteAttribute",{id:t})},load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("Category.php",Object(r["a"])({op:"showAttribute",lang:n["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=o["IKDataEntity"].ModelFactory(l,p)},"4c03":function(t,e,a){"use strict";a("a15b");var r=a("b85c"),i=(a("96cf"),a("1da1")),n=a("5530"),o=a("f4d6"),s=a("9d8f"),c=a.n(s),u=a("ebc9"),d=a("a86d"),l=a("5089"),p=a("641f"),f=a.n(p),g=a("c0d6"),h=Boolean("0"===l["b"].isShowOnTable),m=["#FFCDD2","#F8BBD0","#E1BEE7","#D1C4E9","#C5CAE9","#BBDEFB","#B3E5FC","#B2EBF2","#B2DFDB","#C8E6C9","#DCEDC8","#F0F4C3","#FFF9C4","#FFECB3","#FFE0B2","#FFCCBC","#D7CCC8","#CFD8DC"],y={add:function(t){return t.appliedAttributeGroup="",t.catTypeId=t.dishesCategoryTypeId,c.a.post("Category.php?op=add",Object(n["a"])(Object(n["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},edit:function(t){return t.appliedAttributeGroup="",t.catTypeId=t.dishesCategoryTypeId,console.log("label-manage: item()",t),c.a.postWithUploadFile("Category.php?op=update",Object(n["a"])(Object(n["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},remove:function(t){return c.a.post("Category.php?op=delete",{id:t})},load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("Category.php",e);case 2:return a=t.sent.content,console.log(a,"cate response"),t.abrupt("return",a);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),randomColor:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a,i,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:f.a.showLoading(!0),a=Object(r["a"])(e),t.prev=2,a.s();case 4:if((i=a.n()).done){t.next=13;break}return o=i.value,o.appliedAttributeGroup=o.attributeGroupId.join(","),o.catTypeId=o.dishesCategoryTypeId,o.color=m[Math.round(18*Math.random())],t.next=11,c.a.postWithUploadFile("Category.php?op=update",Object(n["a"])(Object(n["a"])({},o),{},{langs:JSON.stringify(o.langs)}),{showLoading:!1});case 11:t.next=4;break;case 13:t.next=18;break;case 15:t.prev=15,t.t0=t["catch"](2),a.e(t.t0);case 18:return t.prev=18,a.f(),t.finish(18);case 21:f.a.toast("OK");case 22:case"end":return t.stop()}}),t,null,[[2,15,18,21]])})));function e(e){return t.apply(this,arguments)}return e}(),removeAllColor:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var a,i,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:f.a.showLoading(!0),a=Object(r["a"])(e),t.prev=2,a.s();case 4:if((i=a.n()).done){t.next=13;break}return o=i.value,o.appliedAttributeGroup=o.attributeGroupId.join(","),o.catTypeId=o.dishesCategoryTypeId,o.color="#FFFFFF",t.next=11,c.a.postWithUploadFile("Category.php?op=update",Object(n["a"])(Object(n["a"])({},o),{},{langs:JSON.stringify(o.langs)}),{showLoading:!1});case 11:t.next=4;break;case 13:t.next=18;break;case 15:t.prev=15,t.t0=t["catch"](2),a.e(t.t0);case 18:return t.prev=18,a.f(),t.finish(18);case 21:f.a.toast("OK");case 22:case"end":return t.stop()}}),t,null,[[2,15,18,21]])})));function e(e){return t.apply(this,arguments)}return e}(),removeCategoryImage:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.post("Category.php?op=removeCategoryImage",Object(n["a"])({},e),{showLoading:!0});case 2:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},b={id:{type:o["IKDataEntity"].Types.Integer,form:!1,table:!1},color:{type:o["IKDataEntity"].Types.Color,formConfig:{required:!1}},dcImage:{type:o["IKDataEntity"].Types.Image,formConfig:{required:!1,type:{root:function(){return g["a"].getters.rootUrl+l["b"].dcImageRoot}}},displayName:"image",header:h},_langsname:{displayName:"KategorieName",form:!1},langs:{displayName:"labelName",type:o["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:l["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(t){return t.lang.toUpperCase()===l["b"].getLang().toUpperCase()},displayChild:function(t){return console.log(t),"name"===t}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1},dishesCategoryTypeId:{displayName:"warengruppe",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList}}},printOrder:{type:o["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(t){return/^[0-9]\d*$/.test(t)||"Bitte geben Sie die ganze Zahl ein"}]}},categorySort:{type:o["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{required:!0}}};e["a"]=o["IKDataEntity"].ModelFactory(b,y)},a523:function(t,e,a){"use strict";a("99af"),a("4de4"),a("b64b"),a("2ca0"),a("20f6"),a("4b85"),a("a15b"),a("498a");var r=a("2b0e");function i(t){return r["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var r=a.props,i=a.data,n=a.children;i.staticClass="".concat(t," ").concat(i.staticClass||"").trim();var o=i.attrs;if(o){i.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(i.staticClass+=" ".concat(s.join(" ")))}return r.id&&(i.domProps=i.domProps||{},i.domProps.id=r.id),e(r.tag,i,n)}})}var n=a("d9f7");e["a"]=i("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,r=e.props,i=e.data,o=e.children,s=i.attrs;return s&&(i.attrs={},a=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}))),r.id&&(i.domProps=i.domProps||{},i.domProps.id=r.id),t(r.tag,Object(n["a"])(i,{staticClass:"container",class:Array({"container--fluid":r.fluid}).concat(a||[])}),o)}})},a86d:function(t,e,a){"use strict";var r=a("f4d6"),i={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};e["a"]=r["IKDataEntity"].ModelFactory(i,{})},b0d9:function(t,e,a){"use strict";var r=a("5530"),i=(a("96cf"),a("1da1")),n=a("5089"),o=a("f4d6"),s=a("9d8f"),c=a.n(s),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:o["IKDataEntity"].Types.Boolean},multiSelect:{type:o["IKDataEntity"].Types.Boolean},attrubuteCount:{type:o["IKDataEntity"].Types.Integer,form:!1}},d={load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("Category.php",Object(r["a"])({op:"showAttributeGroup",lang:n["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return c.a.postWithUploadFile("Category.php?op=addAttributeGroup",t,{showLoading:!0})},edit:function(t){return c.a.postWithUploadFile("Category.php?op=updateAttributeGroup",t,{showLoading:!0})},remove:function(t){return c.a.post("Category.php?op=deleteAttributeGroup",{id:t})}};e["a"]=o["IKDataEntity"].ModelFactory(u,d)},ccdd:function(t,e,a){"use strict";var r=a("5530"),i=a("641f"),n=a.n(i);e["a"]=Object(r["a"])({},n.a)},ebc9:function(t,e,a){"use strict";var r=a("5530"),i=(a("96cf"),a("1da1")),n=a("5089"),o=a("f4d6"),s=a("9d8f"),c=a.n(s),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},d={load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("CategoryType.php",Object(r["a"])({lang:n["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=o["IKDataEntity"].ModelFactory(u,d)},ff51:function(t,e,a){"use strict";a.d(e,"a",(function(){return r})),a.d(e,"b",(function(){return i})),a.d(e,"c",(function(){return n}));a("a15b");function r(t){var e=new Date,a=e.getTime(),r=864e5,i=a+t*r,n=new Date(i),o=n.getFullYear(),s=n.getMonth()+1,c=n.getDate();return[o,s,c].join("-")}function i(t){var e=new Date,a=e.getTime(),r=864e5,i=a+t*r,n=new Date(i),o=n.getFullYear()+"-",s=n.getMonth()+1,c=n.getDate(),u=n.getHours()<10?"0"+n.getHours():n.getHours(),d=n.getMinutes()<10?"0"+n.getMinutes():n.getMinutes(),l=n.getSeconds()<10?"0"+n.getSeconds():n.getSeconds();return o+s+"-"+c+" "+u+":"+d+":"+l}function n(t){var e=t;return e.maxDineTime&&(e.maxDineTime=e.maxDineTime/60),e.roundTime&&(e.roundTime=e.roundTime/60),e}}}]);
//# sourceMappingURL=chunk-781e0a09.b21384d3.js.map