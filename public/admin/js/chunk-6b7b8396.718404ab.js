(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6b7b8396"],{"3bbb":function(t,e,a){"use strict";a("b0c0"),a("ac1f"),a("1276");var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("5089"),o=a("c0d6"),s=a("f4d6"),l=a("9d8f"),c=a.n(l),u={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},photo:{displayName:"image",type:s["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return o["a"].getters.rootUrl+i["a"].servantRoot}},requiredEdit:!1,requiredNew:!1,md:12},header:!1},name:{displayName:"servantName"},password:{},permission:{type:s["IKDataEntity"].Types.Boolean},isPartTime:{type:s["IKDataEntity"].Types.Boolean}},d={add:function(t){return c.a.postWithUploadFile("Servant.php?op=add",t,{showLoading:!0})},edit:function(t){return t.file&&(t.imageExt=t.file.name.split(".").lastItem),c.a.postWithUploadFile("Servant.php?op=update",t,{showLoading:!0})},remove:function(t){return c.a.post("Servant.php?op=delete",{id:t})},load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("Servant.php",Object(n["a"])({lang:i["a"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=s["IKDataEntity"].ModelFactory(u,d)},"6f56":function(t,e,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),s=a.n(o),l={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"staffName"},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}}},c={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Complex.php",Object(n["a"])({op:"showAllConsumeTypeInfo"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return s.a.post("ConsumeType.php?op=add",Object(n["a"])(Object(n["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},edit:function(t){return s.a.postWithUploadFile("ConsumeType.php?op=update",Object(n["a"])(Object(n["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},remove:function(t){return s.a.post("ConsumeType.php?op=delete",{id:t})}};e["a"]=i["IKDataEntity"].ModelFactory(l,c)},"9fb3":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{ref:"billTable",attrs:{"use-default-action":!1,model:t.model,filter:t.filter,"entity-name":t.$t("全部账单"),"use-select":!1,icon:"mdi-format-list-bulleted"},scopedSlots:t._u([{key:"filterLeft",fn:function(){return[a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":t.dates,"offset-y":""},on:{"update:returnValue":function(e){t.dates=e},"update:return-value":function(e){t.dates=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[a("v-text-field",t._g({staticClass:"ml-auto",staticStyle:{"max-width":"250px"},attrs:{"hide-details":"",label:t.$t("日期筛选"),"prepend-icon":"mdi-calendar",readonly:"","single-line":"","append-icon":"mdi-close"},on:{"click:append":t.clear},model:{value:t.dates,callback:function(e){t.dates=e},expression:"dates"}},n))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[a("v-date-picker",{attrs:{"no-title":"",range:"",scrollable:"",locale:"de"},model:{value:t.dates,callback:function(e){t.dates=e},expression:"dates"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.menu=!1}}},[t._v(" "+t._s(t.$t("Cancel"))+" ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menu.save(t.dates)}}},[t._v(" "+t._s(t.$t("OK"))+" ")])],1)],1)]},proxy:!0},{key:"filterRight",fn:function(e){var n=e.tableItems;return[a("v-btn",{staticClass:"ml-4",attrs:{color:"green"}},[t._v(" "+t._s(t.$t("sumAmount"))+"：€"+t._s(t.calculateTotalPaymentPrice(n).toFixed(2))+" ")]),a("v-btn",{staticClass:"ml-4",attrs:{color:"#367aeb"}},[t._v(" "+t._s(t.$t("totalPrice"))+"：€"+t._s(t.calculateTotalPrice(n).toFixed(2))+" ")])]}},{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}},[t._l(t.billSelectionList,(function(e,n){return[a("v-btn",{key:n,staticClass:"mr-1",attrs:{color:t.billSelectionColorList[n],dark:"",outlined:""},on:{click:function(e){return t.setBillDates(n)}}},[t._v(" "+t._s(e)+" ")])]})),a("v-spacer"),a("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:function(e){return t.print()}}},[t._v(" "+t._s(t.$t("打印"))+" ")])],2)]},proxy:!0},{key:"item.action",fn:function(e){var n=e.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.goNext(n)}}},[t._v(" mdi-arrow-right ")])]}}])}),a("v-dialog",{model:{value:t.showDetail,callback:function(e){t.showDetail=e},expression:"showDetail"}},[a("v-card",[a("v-toolbar",{on:{click:function(e){t.showDetail=!t.showDetail}}},[a("v-spacer"),a("v-btn",{attrs:{icon:""}},[a("v-icon",[t._v("mdi-close")])],1)],1),a("bill-detail-page",{attrs:{id:t.currentOrderId}})],1)],1)],1)],1)},r=[],i=(a("4de4"),a("4160"),a("a15b"),a("13d5"),a("159b"),a("b85c")),o=(a("96cf"),a("1da1")),s=a("0a61"),l=a("ccdd"),c=(a("99af"),a("d81d"),a("b0c0"),a("2909")),u=a("5530"),d=a("5089"),p=a("f4d6"),m=a("9d8f"),f=a.n(m),y=a("6f56"),b=a("8976"),h=a("d75f"),g=a("4740"),v=a("3bbb"),I={orderId:{type:p["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{disableNew:!0,disableEdit:!0,requiredNew:!1}},tableName:{},servantName:{type:p["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:v["a"].getList,itemText:"name",itemValue:"name"}},displayName:"servantName"},updateTimestamp:{displayName:"结账时间"},totalPrice:{},payMethod:{type:p["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:b["a"].getList,itemText:"_langsname",color:g["a"].getList()}},displayName:"付款状态"},tipIncome:{},consumeTypeId:{type:p["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:y["a"].getList}}},consumeTypeStatusId:{displayName:"consumeTypeStatus",type:p["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:h["a"].getList,itemText:"name"},merge:!1}},paymentStatus:{displayName:"paymentStatus",type:p["IKDataEntity"].Types.Boolean,formConfig:{merge:!1}},paymentStr:{formConfig:{required:!1},displayName:"payMethod"},paymentArr:{displayName:"Payment",type:p["IKDataEntity"].Types.Option,header:!1,formConfig:{required:!1,type:{selectItems:b["a"].getList,itemText:"_langsname",multiple:!0,disabledItem:function(t){return 0===t.id?Object(u["a"])(Object(u["a"])({},t),{},{disabled:t}):t}}}}},w={load:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f.a.get("Orders.php",Object.assign.apply(Object,[{op:"withSortAndFilter",lang:d["a"].getLang()}].concat(Object(c["a"])(e))));case 2:return t.abrupt("return",t.sent.content.map((function(t){return t.payLogs&&(t.paymentStr=[],t.paymentArr=[],t.payLogs.forEach((function(e){if("9"!==e.paymentMethodId){var a=e.name+":"+e.amount;t.paymentStr.push(a),t.paymentArr.push(e.paymentMethodId)}})),t.paymentStr=t.paymentStr.join(" / "),t.paymentArr=String(t.paymentArr)),t})));case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},k=p["IKDataEntity"].ModelFactory(I,w),O=a("c1df"),T=a.n(O),D=a("ccb3"),C=a("ff51"),S={components:{BillDetailPage:D["default"],IkDataTable:p["IkDataTable"]},data:function(){return{model:k,dates:[],timer:null,showDetail:null,currentOrderId:null,menu:!1,modal:!1,menu2:!1,billSelectionList:[this.$i18n.t("当日结单"),this.$i18n.t("本周结单"),this.$i18n.t("本月结单"),this.$i18n.t("本年结单")],billSelectionColorList:["green darken-2","blue darken-2","purple darken-2","pink"]}},computed:{filter:function(){if(Date.parse(this.dates[0])>Date.parse(this.dates[1])){var t=[this.dates[1],this.dates[0]];this.dates[0]=t[0],this.dates[1]=t[1]}return{timespan:this.dates?this.dates.join(" - "):""}}},watch:{},created:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.dates=[Object(C["a"])(0),Object(C["a"])(0)];case 1:case"end":return e.stop()}}),e)})))()},methods:{calculateTotalPrice:function(t){return t?t.reduce((function(t,e){return 5!==e.consumeTypeStatusId?t+parseFloat(e.totalPrice):t}),0):0},calculateTotalPaymentPrice:function(t){if(this.$refs.billTable&&this.$refs.billTable.filterItem.paymentArr&&0!==this.$refs.billTable.filterItem.paymentArr.length){var e=this.$refs.billTable.filterItem.paymentArr,a=0;return e.forEach((function(e){var n,r=Object(i["a"])(t);try{for(r.s();!(n=r.n()).done;){var o=n.value;null!==o.payLogs&&o.payLogs.forEach((function(t){parseInt(t.paymentMethodId)===parseInt(e)&&(a+=parseFloat(t.amount))}))}}catch(s){r.e(s)}finally{r.f()}})),a}return t?t.reduce((function(t,e){return 5!==e.consumeTypeStatusId?t+parseFloat(e.totalPrice):t}),0):0},goNext:function(t){localStorage.setItem("selectData",JSON.stringify(this.dates)),this.showDetail=!0,this.currentOrderId=t.orderId},clear:function(){this.dates=[],localStorage.setItem("selectData",JSON.stringify(this.dates))},setBillDates:function(t){switch(t){case 0:this.dates=[Object(C["a"])(0),Object(C["a"])(0)];break;case 1:this.dates=[T()().startOf("week").format("YYYY-MM-DD"),Object(C["a"])(0)];break;case 2:this.dates=[T()().startOf("month").format("YYYY-MM-DD"),Object(C["a"])(0)];break;case 3:this.dates=[T()().startOf("year").format("YYYY-MM-DD"),Object(C["a"])(0)]}},print:function(){var t=this;l["a"].showConfirm("Bist du sicher?","Möchten Sie alle Datensätze drucken?",(function(){Object(s["b"])(t.filter).then((function(){l["a"].toast("Erfolgreich drucken!")}))}))}}},N=S,x=a("2877"),j=a("6544"),E=a.n(j),_=a("8336"),L=a("b0af"),K=a("a523"),$=a("2e4b"),M=a("169a"),P=a("132d"),F=a("e449"),V=a("2fa4"),Y=a("8654"),A=a("71d9"),R=Object(x["a"])(N,n,r,!1,null,null,null);e["default"]=R.exports;E()(R,{VBtn:_["a"],VCard:L["a"],VContainer:K["a"],VDatePicker:$["a"],VDialog:M["a"],VIcon:P["a"],VMenu:F["a"],VSpacer:V["a"],VTextField:Y["a"],VToolbar:A["a"]})}}]);
//# sourceMappingURL=chunk-6b7b8396.718404ab.js.map