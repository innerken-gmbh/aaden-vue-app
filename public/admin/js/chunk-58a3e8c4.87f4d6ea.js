(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-58a3e8c4"],{"3bbb":function(t,e,a){"use strict";a("b0c0"),a("ac1f"),a("1276");var r=a("5530"),n=(a("96cf"),a("1da1")),i=a("5089"),o=a("c0d6"),l=a("f4d6"),s=a("9d8f"),c=a.n(s),d={id:{type:l["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},photo:{displayName:"image",type:l["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return o["a"].getters.rootUrl+i["b"].servantRoot}},requiredEdit:!1,requiredNew:!1,md:12},header:!1},name:{displayName:"servantName"},password:{},permission:{type:l["IKDataEntity"].Types.Boolean},isPartTime:{type:l["IKDataEntity"].Types.Boolean}},u={add:function(t){return c.a.postWithUploadFile("Servant.php?op=add",t,{showLoading:!0})},edit:function(t){return t.file&&(t.imageExt=t.file.name.split(".").lastItem),c.a.postWithUploadFile("Servant.php?op=update",t,{showLoading:!0})},remove:function(t){return c.a.post("Servant.php?op=delete",{id:t})},load:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("Servant.php",Object(r["a"])({lang:i["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=l["IKDataEntity"].ModelFactory(d,u)},4740:function(t,e,a){"use strict";e["a"]={list:[{id:-11,color:"brown lighten-5"},{id:-10,color:"deep-orange lighten-5"},{id:0,color:"error"},{id:1,color:"primary"},{id:2,color:"success"},{id:3,color:"warning"},{id:4,color:"secondary"},{id:5,color:"accent"},{id:6,color:"tertiary"},{id:7,color:"info"},{id:8,color:"pink"},{id:9,color:"cyan"},{id:10,color:"deep-purple lighten-4"},{id:11,color:"lime"},{id:12,color:"light-green"},{id:13,color:"amber"},{id:14,color:"yellow"},{id:15,color:"deep-orange"},{id:16,color:"blue lighten-4"},{id:17,color:"blue-grey"},{id:18,color:"yellow darken-4"},{id:19,color:"brown lighten-5"},{id:20,color:"deep-orange lighten-5"}],getList:function(){return this.list}}},"9fb3":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("ik-data-table",{ref:"billTable",staticStyle:{width:"100%"},attrs:{"use-default-action":!1,model:t.model,"required-date-value":t.dates,"entity-name":t.$t("全部账单"),"use-select":!1,"use-customer-action-only":!0,icon:"mdi-format-list-bulleted","use-date-filter":!0},scopedSlots:t._u([{key:"footer",fn:function(e){e.selectItems,e.items;return[a("div",{staticClass:"d-flex pa-2"},[t._l(t.billSelectionList,(function(e,r){return[a("v-btn",{key:r,staticClass:"mr-1",attrs:{color:t.billSelectionColorList[r],dark:"",outlined:"",small:""},on:{click:function(e){return t.setBillDates(r)}}},[t._v(" "+t._s(e)+" ")])]})),a("v-btn",{staticClass:"ml-1",attrs:{small:"",color:"green"}},[t._v(" "+t._s(t.$t("sumAmount"))+"：€"+t._s(t.calculateTotalPaymentPrice().toFixed(2))+" ")]),a("v-btn",{staticClass:"primary",attrs:{small:""},on:{click:t.print}},[t._v(" "+t._s(t.$t("打印"))+" ")])],2)]}},{key:"item.action",fn:function(e){var r=e.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.goNext(r)}}},[t._v(" mdi-arrow-right ")])]}}])}),a("v-dialog",{attrs:{fullscreen:""},model:{value:t.showDetail,callback:function(e){t.showDetail=e},expression:"showDetail"}},[a("v-card",{attrs:{color:"#f6f6f6"}},[a("v-toolbar",{attrs:{dense:""}},[a("v-spacer"),a("v-toolbar-items",{staticClass:"mr-n4"},[a("v-btn",{attrs:{color:"error"},on:{click:function(e){t.showDetail=!1}}},[a("v-icon",{attrs:{color:"white",left:""}},[t._v(" mdi-close ")]),a("span",{staticStyle:{"font-size":"24px"}},[t._v("Zurück")])],1)],1)],1),a("bill-detail-page",{attrs:{id:t.currentOrderId}})],1)],1)],1)},n=[],i=(a("4160"),a("a15b"),a("13d5"),a("159b"),a("b85c")),o=(a("96cf"),a("1da1")),l=a("0a61"),s=a("641f"),c=a.n(s),d=(a("7db0"),a("d81d"),a("5530")),u=a("5089"),p=a("f4d6"),m=a("9d8f"),f=a.n(m),y=a("6f56"),b=a("8976"),h=a("4740"),g=a("3bbb"),D={orderId:{type:p["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{disableNew:!0,disableEdit:!0,requiredNew:!1}},tableName:{tableConfig:{sortable:!0}},servantName:{type:p["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:g["a"].getList,itemText:"name",itemValue:"name"}},displayName:"servantName"},totalPrice:{tableConfig:{sortable:!0}},payMethod:{type:p["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:b["a"].getList,itemText:"_langsname",color:h["a"].getList()},merge:!1},displayName:"付款状态"},paymentStr:{formConfig:{required:!1},displayName:"payMethod"},consumeTypeId:{type:p["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:y["a"].getList}}},paymentArr:{displayName:"payMethod",type:p["IKDataEntity"].Types.Option,header:!1,formConfig:{required:!1,type:{selectItems:b["a"].getList,multiple:!0,disabledItem:function(t){return 0===t.id?Object(d["a"])(Object(d["a"])({},t),{},{disabled:t}):t}}}},updateTimestamp:{displayName:"结账时间"}},v={load:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){var a,r,n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a=e[0].dateFilter.join(" - "),t.next=3,b["a"].getList();case 3:return r=t.sent,t.next=6,f.a.get("Orders.php",{op:"withSortAndFilter",lang:u["b"].getLang(),timespan:a});case 6:return n=t.sent.content,t.abrupt("return",n.map((function(t){return t.payLogs&&(t.paymentStr=[],t.paymentArr=[],t.payLogs.forEach((function(e){if(e.paymentOriginalItem=r.find((function(t){return t.id===parseInt(e.paymentMethodId)})),"9"!==e.paymentMethodId){var a="";e.paymentOriginalItem&&(a=e.paymentOriginalItem._langsname+":"+e.amount),t.paymentStr.push(a),t.paymentArr.push(e.paymentMethodId)}})),t.paymentStr=t.paymentStr.join(" / "),t.paymentArr=String(t.paymentArr)),t.id=t.orderId,t})));case 8:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},I=p["IKDataEntity"].ModelFactory(D,v),Y=a("ccb3"),w=a("5a0c"),M=a.n(w),k={components:{BillDetailPage:Y["default"],IkDataTable:p["IkDataTable"]},data:function(){return{model:I,dates:[M()().format("YYYY-MM-DD"),M()().format("YYYY-MM-DD")],timer:null,showDetail:null,currentOrderId:null,menu:!1,modal:!1,menu2:!1,billSelectionList:[this.$i18n.t("当日结单"),this.$i18n.t("本周结单"),this.$i18n.t("本月结单")],billSelectionColorList:["green darken-2","blue darken-2","purple darken-2","pink"]}},mounted:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:t.dates=[M()().format("YYYY-MM-DD"),M()().format("YYYY-MM-DD")];case 1:case"end":return e.stop()}}),e)})))()},methods:{calculateTotalPrice:function(t){return t?t.reduce((function(t,e){return 5!==e.consumeTypeStatusId?t+parseFloat(e.totalPrice):t}),0):0},calculateTotalPaymentPrice:function(){var t=this.$refs.billTable.tableItem;if(this.$refs.billTable&&this.$refs.billTable.filterItem.paymentArr&&0!==this.$refs.billTable.filterItem.paymentArr.length){var e=this.$refs.billTable.filterItem.paymentArr,a=0;return e.forEach((function(e){var r,n=Object(i["a"])(t);try{for(n.s();!(r=n.n()).done;){var o=r.value;null!==o.payLogs&&o.payLogs.forEach((function(t){parseInt(t.paymentMethodId)===parseInt(e)&&(a+=parseFloat(t.amount))}))}}catch(l){n.e(l)}finally{n.f()}})),a}return t?t.reduce((function(t,e){return 5!==e.consumeTypeStatusId?t+parseFloat(e.totalPrice):t}),0):0},goNext:function(t){this.showDetail=!0,this.currentOrderId=t.orderId},setBillDates:function(t){switch(t){case 0:this.dates=[M()().format("YYYY-MM-DD"),M()().format("YYYY-MM-DD")];break;case 1:this.dates=[M()().startOf("week").format("YYYY-MM-DD"),M()().format("YYYY-MM-DD")];break;case 2:this.dates=[M()().startOf("month").format("YYYY-MM-DD"),M()().format("YYYY-MM-DD")];break;case 3:this.dates=[M()().startOf("year").format("YYYY-MM-DD"),M()().format("YYYY-MM-DD")]}},print:function(){var t={timespan:this.$refs.billTable.okDates.join(" - ")};c.a.showConfirm("Bist du sicher?","Möchten Sie alle Datensätze drucken?",(function(){Object(l["H"])(t).then((function(){c.a.toast("Erfolgreich drucken!")}))}))}}},T=k,O=a("2877"),S=a("6544"),C=a.n(S),E=a("8336"),L=a("b0af"),N=a("169a"),x=a("132d"),_=a("2fa4"),$=a("71d9"),j=a("2a7f"),K=Object(O["a"])(T,r,n,!1,null,null,null);e["default"]=K.exports;C()(K,{VBtn:E["a"],VCard:L["a"],VDialog:N["a"],VIcon:x["a"],VSpacer:_["a"],VToolbar:$["a"],VToolbarItems:j["a"]})}}]);
//# sourceMappingURL=chunk-58a3e8c4.87f4d6ea.js.map