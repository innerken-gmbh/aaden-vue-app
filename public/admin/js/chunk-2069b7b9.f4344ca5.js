(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2069b7b9"],{a523:function(t,e,a){"use strict";a("99af"),a("4de4"),a("b64b"),a("2ca0"),a("20f6"),a("4b85"),a("a15b"),a("498a");var n=a("2b0e");function r(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var n=a.props,r=a.data,s=a.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var i=r.attrs;if(i){r.attrs={};var o=Object.keys(i).filter((function(t){if("slot"===t)return!1;var e=i[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}));o.length&&(r.staticClass+=" ".concat(o.join(" ")))}return n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),e(n.tag,r,s)}})}var s=a("d9f7");e["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,n=e.props,r=e.data,i=e.children,o=r.attrs;return o&&(r.attrs={},a=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}))),n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),t(n.tag,Object(s["a"])(r,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(a||[])}),i)}})},ccdd:function(t,e,a){"use strict";var n=a("5530"),r=a("641f"),s=a.n(r);e["a"]=Object(n["a"])({},s.a)},cfca:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height align-start",attrs:{fluid:""}},[a("v-card",[a("v-card-title",{staticClass:"pb-2"},[t._v(" "+t._s(t.$t("Datev"))+" ")]),a("v-card-text",[a("v-row",[t._l(t.datevForm,(function(e,n){return[a("v-col",{key:n,attrs:{cols:"12",md:"4",sm:"6"}},[a("v-text-field",{attrs:{label:e.fieldName,placeholder:e.description,rules:"1"===e.isRequired?[function(){return!!e.value||"This field should not be empty"}]:[]},model:{value:e.value,callback:function(a){t.$set(e,"value",a)},expression:"item.value"}})],1)]})),a("v-col",{attrs:{cols:"12",md:"4",sm:"6"}},[a("v-btn",{staticClass:"green",attrs:{block:""},on:{click:t.saveConfirm}},[a("v-icon",{attrs:{left:""}},[t._v(" mdi-content-save-outline ")]),t._v(" "+t._s(t.$t("保存"))+" ")],1)],1)],2)],1),a("v-card-text")],1),a("v-card",{staticStyle:{width:"100%"}},[a("v-card-text",[a("v-row",[a("v-col",{attrs:{cols:"6"}},[a("v-text-field",{attrs:{label:"The previous month's Datev will be sent to the tax preparer on the 1st of each month",disabled:""}}),a("v-text-field",{attrs:{label:t.sendStatus,disabled:""}})],1),a("v-col",{attrs:{cols:"6"}},[a("v-text-field",{attrs:{value:t.emailAddress,disabled:"",label:"E-Mail-Adresse des CSV Empfänger"}}),a("v-btn",{staticClass:"primary pt-13",attrs:{block:""},on:{click:t.sendDatevToEmail}},[a("v-icon",{attrs:{left:""}},[t._v(" mdi-send ")]),t._v(" "+t._s(t.$t("发送"))+" ")],1)],1)],1)],1)],1)],1)},r=[],s=(a("7db0"),a("13d5"),a("96cf"),a("1da1")),i=a("f4d6"),o={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},sendDatum:{}},c={load:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.abrupt("return",null);case 1:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},u=i["IKDataEntity"].ModelFactory(o,c),d=a("ff51"),l=a("0a61"),f=a("5a0c"),m=a.n(f),v=a("ccdd"),h={name:"Datev",data:function(){return{modelDatevTime:u,datevForm:null,emailAddress:null,sendStatus:null,DateFormLabel:["E-Mail:","Beratenummer:","Mandantennummer:","Datum: (MMTT)","Kleinste Sachkontennummemlänge:","Name:","Verarbeitungskennzeichen:","Konto Für 7% USt:","Konto Für 19% USt:","Konto Für 0% USt:"]}},computed:{filter:function(){if(Date.parse(this.dates[0])>Date.parse(this.dates[1])){var t=[this.dates[1],this.dates[0]];this.dates[0]=t[0],this.dates[1]=t[1]}return{start:this.dates[0],end:this.dates[1]}},filterCashBook:function(){if(Date.parse(this.datesCashBook[0])>Date.parse(this.datesCashBook[1])){var t=[this.datesCashBook[1],this.datesCashBook[0]];this.datesCashBook[0]=t[0],this.datesCashBook[1]=t[1]}return{fromDate:this.datesCashBook[0],toDate:this.datesCashBook[1]}}},watch:{},mounted:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.datesCashBook=[m()().format("YYYY-MM-DD"),Object(d["a"])(0)],e.next=3,Object(l["s"])();case 3:return t.currentAmount=e.sent,e.next=6,t.initialize();case 6:case"end":return e.stop()}}),e)})))()},methods:{sendDatevToEmail:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return v["a"].showLoading(!0),e.next=3,Object(l["N"])();case 3:return a=e.sent,t.sendStatus=a.content.length<=0?"Sent sucessfully!".toUpperCase():a.content[0].toUpperCase(),a.content.length<=0?v["a"].hideLoading(t.sendStatus):v["a"].showError(t.sendStatus,""),e.abrupt("return",!1);case 7:case"end":return e.stop()}}),e)})))()},saveConfirm:function(){var t=this,e=!1;if(this.datevForm.find((function(t){return"1"===t.isRequired&&""===t.value})))return e=!0,v["a"].showError("some field is empty"),!1;e||(console.log("hasEmptyItem",e),Object(l["S"])(this.datevForm).then((function(){v["a"].toast("提交成功"),t.initialize()})))},initialize:function(){var t=this;return Object(s["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.getDatevSettings();case 2:t.datevForm=e.sent,t.emailAddress=t.datevForm.find((function(t){return"sendingToEmail"===t.key})).value;case 4:case"end":return e.stop()}}),e)})))()},clear:function(){this.dates=[Object(d["a"])(0),Object(d["a"])(0)],this.datesCashBook=[Object(d["a"])(0),Object(d["a"])(0)]},calculateTotalPrice:function(t){return parseFloat(this.calculateIncomePrice(t))-parseFloat(this.calculateOutcomePrice(t))},calculateIncomePrice:function(t){return t?t.reduce((function(t,e){return 2!==e.type?t+parseFloat(e.amount):t}),0):0},calculateOutcomePrice:function(t){return t?t.reduce((function(t,e){return 1!==e.type?t+parseFloat(e.amount):t}),0):0},getDatevSettings:function(){return Object(s["a"])(regeneratorRuntime.mark((function t(){var e;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(l["Q"])().then((function(t){return t.content}));case 2:return e=t.sent,t.abrupt("return",e);case 4:case"end":return t.stop()}}),t)})))()}}},p=h,g=a("2877"),b=a("6544"),w=a.n(b),C=a("8336"),k=a("b0af"),D=a("99d9"),x=a("62ad"),y=a("a523"),S=a("132d"),j=a("0fd9"),O=a("8654"),T=Object(g["a"])(p,n,r,!1,null,null,null);e["default"]=T.exports;w()(T,{VBtn:C["a"],VCard:k["a"],VCardText:D["b"],VCardTitle:D["c"],VCol:x["a"],VContainer:y["a"],VIcon:S["a"],VRow:j["a"],VTextField:O["a"]})},ff51:function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return s}));a("a15b");function n(t){var e=new Date,a=e.getTime(),n=864e5,r=a+t*n,s=new Date(r),i=s.getFullYear(),o=s.getMonth()+1,c=s.getDate();return[i,o,c].join("-")}function r(t){var e=new Date,a=e.getTime(),n=864e5,r=a+t*n,s=new Date(r),i=s.getFullYear()+"-",o=s.getMonth()+1,c=s.getDate(),u=s.getHours()<10?"0"+s.getHours():s.getHours(),d=s.getMinutes()<10?"0"+s.getMinutes():s.getMinutes(),l=s.getSeconds()<10?"0"+s.getSeconds():s.getSeconds();return i+o+"-"+c+" "+u+":"+d+":"+l}function s(t){var e=t;return e.maxDineTime&&(e.maxDineTime=e.maxDineTime/60),e.roundTime&&(e.roundTime=e.roundTime/60),e}}}]);
//# sourceMappingURL=chunk-2069b7b9.f4344ca5.js.map