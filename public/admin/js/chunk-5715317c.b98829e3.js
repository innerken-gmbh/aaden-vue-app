(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5715317c"],{"4aad":function(t,e,a){"use strict";e["a"]={list:[{id:1,name:"Others"},{id:2,name:"RechnungBon"},{id:3,name:"Zbon"},{id:4,name:"KitchenBon"}],getList:function(){return this.list}}},6306:function(t,e,a){"use strict";var n=a("5530"),i=(a("96cf"),a("1da1")),r=a("633c"),o={id:{type:r["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:r["a"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:r["a"].Types.Boolean,displayName:"isSingleOrderPrint"},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}}},s={load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r["e"].get("Printer.php",Object(n["a"])({op:"showPrinterGroups"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return r["e"].postWithUploadFile("Printer.php?op=addPrinterGroups",t,{showLoading:!0})},edit:function(t){return r["e"].postWithUploadFile("Printer.php?op=updatePrinterGroups",t,{showLoading:!0})},remove:function(t){return r["e"].post("Printer.php?op=deletePrinterGroup",{id:t})}};e["a"]=r["a"].ModelFactory(o,s)},8976:function(t,e,a){"use strict";a("96cf");var n=a("1da1"),i=a("5530"),r=a("633c"),o=a("a86d"),s=a("3405"),l={id:{type:r["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},langs:{displayName:"paymentname",type:r["a"].Types.Group,formConfig:{groupName:"paymentname",default:s["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(t){return t.lang.toUpperCase()===s["a"].lang()}},childKey:"name",children:[o["a"],o["a"],o["a"]]},fixedDisplay:{type:r["a"].Types.Boolean},isOnline:{displayName:"isOnline",type:r["a"].Types.Boolean},apiKey:{required:!1,formConfig:{requiredNew:!1,requiredEdit:!1}}},c={add:function(t){return r["e"].post("PayMethod.php?op=add",Object(i["a"])(Object(i["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},edit:function(t){return r["e"].postWithUploadFile("PayMethod.php?op=update",Object(i["a"])(Object(i["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},remove:function(t){return r["e"].post("PayMethod.php?op=delete",{id:t})},load:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r["e"].get("PayMethod.php",Object(i["a"])({},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=r["a"].ModelFactory(l,c)},a86d:function(t,e,a){"use strict";var n=a("633c"),i={id:{type:n["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};e["a"]=n["a"].ModelFactory(i,{})},ccb3:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("v-row",[a("v-col",{attrs:{cols:"12",md:"8"}},[a("v-row",[a("v-col",{attrs:{cols:"6"}},[a("v-btn",{attrs:{block:"","x-large":"",color:"error"},on:{click:function(e){t.dialog=!t.dialog}}},[a("span",{staticStyle:{"font-size":"36px"}},[t._v(t._s(t.$t("修改支付方式")))])])],1),a("v-col",{attrs:{cols:"6"}},[a("v-btn",{attrs:{block:"","x-large":"",color:"success"},on:{click:t.reprintOrder}},[a("span",{staticStyle:{"font-size":"36px"}},[t._v(t._s(t.$t("补打订单")))])])],1)],1),a("v-card",{attrs:{color:"basil"}},[a("v-tabs",{attrs:{"background-color":"transparent",color:"basil",grow:""}},[t._l(t.items,(function(e,n){return a("v-tab",{key:n},[t._v(" "+t._s(e)+" ")])})),a("v-tab-item",[a("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-vuetify",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[a("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("菜品信息"))+" ")])]},proxy:!0}])},[a("v-divider",{staticClass:"mt-3"}),a("v-data-table",{attrs:{"fixed-header":!0,headers:t.headers,items:t.orders,"items-per-page":15,loading:t.loading,"item-key":"id","multi-sort":""},on:{reloaded:function(e){return t.loadDetail(t.id)}},scopedSlots:t._u([{key:"item.name",fn:function(e){var n=e.item;return[t._v(" "+t._s(n.name)+" "),n.hasMod>0?a("span",{staticClass:"red--text font-weight-bold"},[t._v("*")]):t._e()]}},{key:"item.mod",fn:function(e){var n=e.item;return[a("div",{attrs:{colspan:t.headers.length}},[a("dish-modification",{attrs:{"dish-item":n}})],1)]}}])})],1)],1),a("v-tab-item",[a("ik-data-table",{attrs:{model:t.PrinterListByOrder,icon:"mdi-cards","entity-name":t.$t("打印单列表"),"use-default-action":!1,"use-select":!1,"show-expand":!0,"single-expand":!0,filter:{id:t.id}},scopedSlots:t._u([{key:"expanded-item",fn:function(e){var n=e.item;return[a("div",{staticClass:"text-center",domProps:{innerHTML:t._s(n.content)}})]}},{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0},{key:"item.action",fn:function(e){var n=e.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.reprint(n)}}},[t._v(" mdi-printer ")])]}}])})],1)],2)],1),"1"===t.billData.billInfo.paymentStatus?a("ik-data-table",{ref:"paymentLog",attrs:{model:t.BillPaymentInfo,icon:"mdi-cards","entity-name":t.$t("付款记录"),"use-action":!1,"use-select":!1,filter:t.filter},scopedSlots:t._u([{key:"footer",fn:function(){return[a("div")]},proxy:!0}],null,!1,3545152822)}):t._e()],1),a("v-col",{attrs:{id:"billPayment",cols:"4"}},[a("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-account-cash",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[a("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("订单信息"))+" ")])]},proxy:!0}])},[a("v-data-table",{attrs:{"fixed-header":!1,headers:t.infoHeaders,items:t.infoList,loading:t.loading,"items-per-page":30,"hide-default-footer":"","hide-default-header":""},scopedSlots:t._u([{key:"item.keyname",fn:function(e){var n=e.item;return[a("span",{staticClass:"font-weight-black"},[t._v(" "+t._s(n.keyname)+" ")])]}}])})],1)],1)],1),a("v-row",[a("v-col",{staticClass:"printText",attrs:{cols:"12",md:"6"}},[t.rawAddressInfo?a("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-account-cash",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[a("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("地址信息"))+" ")])]},proxy:!0}],null,!1,2582449564)},[a("v-row",[a("v-col",{attrs:{cols:"12",md:"12"}},[a("address-info-block",{attrs:{"address-info":t.rawAddressInfo}})],1)],1)],1):t._e()],1),t.rawAddressInfo?a("v-col",{staticClass:"printText",attrs:{cols:"12",md:"6"}},[a("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-printer",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[a("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("打印订单"))+" ")])]},proxy:!0}],null,!1,1893731830)},[a("v-row",[a("v-col",{staticClass:"d-flex spaceBetween",staticStyle:{width:"100%"},attrs:{cols:"12",md:"12"}},[a("div",{staticClass:"mr-2"},[a("v-alert",{attrs:{border:"left","colored-border":"",color:"deep-purple accent-4",elevation:"2"}},[t._v(" "+t._s(t.$t("此处打印的订单仅供参考,不可作为Rechnung使用"))+" ")])],1),a("v-btn",{attrs:{right:"",large:"",color:"success",dark:""},on:{click:function(e){e.stopPropagation(),t.printDialogShow=!0}}},[t._v(" "+t._s(t.$t("打印"))+" ")])],1)],1)],1)],1):t._e(),a("v-dialog",{attrs:{"max-width":"400px"},model:{value:t.printDialogShow,callback:function(e){t.printDialogShow=e},expression:"printDialogShow"}},[a("v-card",[a("v-card-title",{staticClass:"headline"},[t._v(" "+t._s(t.$t("打印此订单?"))+" ")]),a("v-card-text",{attrs:{id:"detail"}},[a("v-card-subtitle",[t._v(t._s(t.$t("地址信息")))]),a("v-divider"),a("address-info-block",{attrs:{"address-info":t.rawAddressInfo}}),a("v-card-subtitle",[t._v(t._s(t.$t("订单信息")))]),a("v-divider"),a("dish-info-block",{attrs:{"render-list":!0,"dish-orders":t.orders}})],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"green darken-1",text:""},on:{click:function(e){t.printDialogShow=!1}}},[t._v(" "+t._s(t.$t("Cancel"))+" ")]),a("v-btn",{directives:[{name:"print",rawName:"v-print",value:"#detail",expression:"'#detail'"}],attrs:{color:"green darken-1",text:""},on:{click:function(e){t.printDialogShow=!1}}},[t._v(" "+t._s(t.$t("打印"))+" ")])],1)],1)],1)],1),a("v-dialog",{attrs:{"max-width":"600"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[t._v(" "+t._s(t.$t("修改支付方式"))+" ")]),a("v-card-text",[a("div",{staticClass:"pa-"},[a("span",{staticClass:"font-weight-black"},[t._v(t._s(t.$t("修改支付方式的方法:")))]),a("br"),t._v(" "+t._s(t.$t("选择一种支付方式，输入支付的数额后点击确定"))),a("br"),t._v(" "+t._s(t.$t("如果有需要,选择其他支付方式,输入支付的数额后点击确定"))),a("br"),t._v(" "+t._s(t.$t("选择小费支付方式来支付负数的数额"))),a("br"),t._v(" "+t._s(t.$t("在剩余数额为0后点击完成"))+" ")]),a("v-chip",{attrs:{color:"error",large:"",label:""}},[a("span",{staticStyle:{"font-size":"18px"}},[t._v(t._s(t.$t("还剩"))+t._s(t.totalPrice.toFixed(2)))])]),a("v-sheet",[a("div",{staticClass:"paymentLogList"},[t._l(t.newPaymentLog,(function(e,n){return[a("div",{key:"log"+n,staticClass:"d-flex"},[t._v(" "+t._s(e.name)+":"+t._s(e.price.toFixed(2))+" ")])]}))],2),a("div",{staticClass:"d-flex justify-space-between align-center"},[a("v-text-field",{attrs:{label:t.$t("数额"),type:"number",min:"0",step:"0.01"},model:{value:t.newAmount,callback:function(e){t.newAmount=e},expression:"newAmount"}}),a("v-select",{staticClass:"ml-4",attrs:{label:t.$t("paymentname"),"item-value":"id","item-text":"name",items:t.payMethods},model:{value:t.newId,callback:function(e){t.newId=e},expression:"newId"}}),a("v-btn",{staticClass:"ml-2",attrs:{disabled:!t.newAmount||!t.newId,color:"primary"},on:{click:t.insertNewPaymentLog}},[a("v-icon",{attrs:{left:""}},[t._v(" mdi-plus ")]),t._v(" "+t._s(t.$t("OK"))+" ")],1)],1)])],1),a("v-divider"),a("v-card-actions",[a("v-btn",{attrs:{color:"primary",text:""},on:{click:function(e){t.dialog=!t.dialog}}},[t._v(" "+t._s(t.$t("Close"))+" ")]),a("v-btn",{attrs:{color:"primary",text:""},on:{click:function(e){t.newPaymentLog=[]}}},[t._v(" "+t._s(t.$t("Cancel"))+" ")]),a("v-spacer"),a("v-btn",{attrs:{color:"primary",text:"",disabled:!t.equals(t.totalPrice,0)},on:{click:t.updatePaymentLog}},[t._v(" "+t._s(t.$t("完成"))+" ")])],1)],1)],1)],1)},i=[],r=(a("4de4"),a("7db0"),a("d81d"),a("13d5"),a("b0c0"),a("a9e3"),a("ac1f"),a("1276"),a("96cf"),a("1da1")),o=a("5530"),s=a("0a61"),l=a("9225"),c=a("f683"),d=a("4907"),u=a("d926"),p=(a("99af"),a("2909")),m=a("3405"),f=a("633c"),y=a("8976"),g={id:{type:f["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},paymentMethodId:{type:f["a"].Types.Option,formConfig:{type:{selectItems:y["a"].getList,itemText:"_langsname"}},displayName:"payMethod"},createdAt:{form:!1},memberCardId:{form:!1},amount:{form:!1}},v={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f["e"].get("BackendData.php",Object.assign.apply(Object,[{op:"billDetail",lang:m["a"].lang()}].concat(Object(p["a"])(e))));case 2:return t.abrupt("return",t.sent.billPaymentInfo);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),edit:function(t){return f["e"].post("Orders.php?op=updatePaymentMethod",t,{showLoading:!0})}},h=f["a"].ModelFactory(g,v),b=a("3d20"),w=a.n(b),x=a("d75f"),_=a("6306"),k=a("4aad"),C=a("eff4"),I={id:{type:f["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},printStatus:{displayName:"printStatus",type:f["a"].Types.Option,formConfig:{type:{selectItems:C["a"].getList(),itemText:"name"}}},addTimeStamp:{displayName:"addTimeStamp"},printBonClass:{type:f["a"].Types.Option,formConfig:{type:{selectItems:k["a"].getList()}}},printerGroupId:{type:f["a"].Types.Option,formConfig:{type:{selectItems:_["a"].getList}}},retryCount:{},printerMsg:{displayName:"printerMsg"},content:{displayName:"checkContent",header:!1}},$={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,f["e"].get("PrintRecord.php",Object(o["a"])({op:"getOneDishOrderRecords"},e[0]));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),reprint:function(t){return f["e"].get("Printer.php?op=reprintWithDefault",{id:t.id})}},S=f["a"].ModelFactory(I,$),O={components:{DishModification:u["default"],DishInfoBlock:d["default"],AddressInfoBlock:c["default"],IkDataTable:f["c"]},props:{id:{default:"-1",type:[String,Number]}},data:function(){return{items:[this.$i18n.t("菜品信息"),this.$i18n.t("打印单列表")],newId:null,newAmount:null,BillPaymentInfo:h,loading:!1,orderId:this.id,billData:{billInfo:{paymentStatus:0},billOrderInfo:[]},printDialogShow:!1,newPaymentLog:[],dialog:null,payMethods:[],rawAddressInfo:"",infoHeaders:[{value:"keyname",align:"left"},{value:"value",align:"right"}],infoList:[],headers:[{text:this.$i18n.t("code"),align:"start",sortable:!1,value:"code"},{text:this.$i18n.t("name"),value:"name"},{text:this.$i18n.t("modification"),value:"mod"},{text:this.$i18n.t("createTimestamp"),value:"stamp"},{text:this.$i18n.t("price"),value:"price",align:"center"},{text:this.$i18n.t("count"),value:"sumCount",align:"center"},{text:this.$i18n.t("sumPrice"),value:"totalPrice",align:"center"},{text:this.$i18n.t("note"),value:"note"},{text:this.$i18n.t("Status"),value:"dishStatusString",align:"center"}],orders:[],defaultItem:{paymentMethodId:-1,name:""},consumeTypeStatusList:[],consumeTypeStatus:"",paymentStatus:"",PrinterListByOrder:S}},computed:{filter:function(){return{id:this.id}},totalPrice:function(){var t,e=null!==(t=this.billData.billInfo.totalPrice)&&void 0!==t?t:0;return e-this.newPaymentLog.reduce((function(t,e){return parseFloat(t)+parseFloat(e.price)}),0)}},watch:{id:{immediate:!0,handler:function(){this.reloadItem(this.id)}}},mounted:function(){},methods:{equals:function(t,e){return Math.abs(t-e)<.01},insertNewPaymentLog:function(){var t,e,a=this;this.newPaymentLog.push(f["b"].deepCopy({id:this.newId,name:null!==(t=null===(e=this.payMethods.find((function(t){return t.id===a.newId})))||void 0===e?void 0:e.name)&&void 0!==t?t:"",price:(9===this.newId?-1:1)*parseFloat(this.newAmount)})),this.newId=null,this.newAmount=null},loadDetail:function(t){var e=this;Object(s["k"])(t).then((function(t){e.billData=t,e.orders=e.billData.billOrderInfo.map((function(t,e){return Object(o["a"])({id:e,agNameArr:t.hasMod>0?t.agName.split(","):[],aNameArr:t.hasMod>0?t.aName.split(","):[]},t)})),e.rawAddressInfo=JSON.parse(e.billData.billInfo.rawAddressInfo),e.paymentStatus="1"===e.billData.billInfo.paymentStatus?e.$i18n.t("已支付"):e.$i18n.t("未支付"),e.consumeTypeStatus=e.consumeTypeStatusList.find((function(t){return parseInt(e.billData.billInfo.consumeTypeStatusId)===t.id})).name,e.infoList=[{keyname:e.$i18n.t("订单号"),value:e.billData.billInfo.id},{keyname:e.$i18n.t("servantName"),value:e.billData.billInfo.servantName},{keyname:e.$i18n.t("tableName"),value:e.billData.billInfo.tableName},{keyname:e.$i18n.t("startTime"),value:e.billData.billInfo.startTime},{keyname:e.$i18n.t("结账时间"),value:e.billData.billInfo.endTime},{keyname:e.$i18n.t("payMethod"),value:e.billData.billInfo.payMethodName},{keyname:e.$i18n.t("支付状态"),value:e.paymentStatus},{keyname:e.$i18n.t("consumeTypeStatus"),value:e.consumeTypeStatus},{keyname:e.$i18n.t("personCount"),value:e.billData.billInfo.personCount},{keyname:e.$i18n.t("tipIncome"),value:e.billData.billInfo.tipIncome},{keyname:e.$i18n.t("discount"),value:e.billData.billInfo.discountStr},{keyname:e.$i18n.t("totalPrice"),value:e.billData.billInfo.totalPrice}]}))},reloadItem:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return e.dialog=!1,e.$nextTick((function(){e.$refs.paymentLog.reload()})),a.next=4,x["a"].getList();case 4:return e.consumeTypeStatusList=a.sent,a.next=7,y["a"].getList();case 7:e.payMethods=a.sent.filter((function(t){return 0!==t.id})),e.loadDetail(t);case 9:case"end":return a.stop()}}),a)})))()},reprintOrder:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){var a,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,w.a.fire({title:t.$i18n.t("Bitte wählen Sie eine Rechnungsart."),input:"select",inputOptions:{1:t.$i18n.t("Normal Rechnung"),2:t.$i18n.t("Unternehmensrechnung-1"),3:t.$i18n.t("Unternehmensrechnung-2")}});case 2:a=e.sent,a.value&&(a.value=parseInt(a.value),n=0,i=1,a.value>1&&(n=1),a.value>2&&(i=2),Object(s["t"])(t.id,n,i));case 4:case"end":return e.stop()}}),e)})))()},findLangInArray:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:l["a"].locale;return t.find((function(t){return t.lang.toLowerCase()===e.toLowerCase()}))},goBack:function(){this.$router.history.go(-1)},reprint:function(t){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,e.PrinterListByOrder.reprint(t);case 2:f["b"].toast();case 3:case"end":return a.stop()}}),a)})))()},updatePaymentLog:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(s["x"])(t.orderId,t.newPaymentLog);case 2:t.reloadItem(t.orderId);case 3:case"end":return e.stop()}}),e)})))()}}},N=O,T=a("2877"),L=a("6544"),P=a.n(L),D=a("0798"),M=a("8336"),j=a("b0af"),R=a("99d9"),V=a("cc20"),A=a("62ad"),B=a("a523"),F=a("8fea"),q=a("169a"),K=a("ce7e"),G=a("132d"),U=a("0fd9"),J=a("b974"),W=a("8dd9"),z=a("2fa4"),E=a("71a3"),H=a("c671"),Z=a("fe57"),Q=a("8654"),X=a("71d9"),Y=Object(T["a"])(N,n,i,!1,null,"ed64215a",null);e["default"]=Y.exports;P()(Y,{VAlert:D["a"],VBtn:M["a"],VCard:j["a"],VCardActions:R["a"],VCardSubtitle:R["b"],VCardText:R["c"],VCardTitle:R["d"],VChip:V["a"],VCol:A["a"],VContainer:B["a"],VDataTable:F["a"],VDialog:q["a"],VDivider:K["a"],VIcon:G["a"],VRow:U["a"],VSelect:J["a"],VSheet:W["a"],VSpacer:z["a"],VTab:E["a"],VTabItem:H["a"],VTabs:Z["a"],VTextField:Q["a"],VToolbar:X["a"]})},d75f:function(t,e,a){"use strict";var n=a("5530"),i=(a("96cf"),a("1da1")),r=a("633c"),o=a("3405"),s=a("a86d"),l={id:{type:r["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},langs:{displayName:"consumeTypeStatusName",type:r["a"].Types.Group,formConfig:{groupName:"consumeTypeStatusName",default:o["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(t){return t.lang.toUpperCase()===o["a"].lang()}},childKey:"name",labelKey:"lang",children:[s["a"],s["a"],s["a"]]},name:{displayName:"consumeTypeStatus"}},c={load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r["e"].get("Orders.php",Object(n["a"])({op:"showConsumeTypeStatusList"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=r["a"].ModelFactory(l,c)},eff4:function(t,e,a){"use strict";var n=a("9225");e["a"]={list:[{id:0,name:n["a"].t("打印失败")},{id:1,name:n["a"].t("打印成功")},{id:2,name:n["a"].t("验证错误")},{id:3,name:n["a"].t("单子格式不合规范")},{id:4,name:n["a"].t("正在打印")},{id:5,name:n["a"].t("网络错误")}],getList:function(){return this.list}}}}]);
//# sourceMappingURL=chunk-5715317c.b98829e3.js.map