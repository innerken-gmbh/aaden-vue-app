(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1045af4a"],{"0fd9":function(t,e,a){"use strict";a("99af"),a("4160"),a("caad"),a("13d5"),a("4ec9"),a("b64b"),a("d3b7"),a("ac1f"),a("2532"),a("3ca3"),a("5319"),a("159b"),a("ddb0");var n=a("ade3"),i=a("5530"),s=(a("4b85"),a("2b0e")),r=a("d9f7"),o=a("80d2"),c=["sm","md","lg","xl"],l=["start","end","center"];function u(t,e){return c.reduce((function(a,n){return a[t+Object(o["H"])(n)]=e(),a}),{})}var d=function(t){return[].concat(l,["baseline","stretch"]).includes(t)},h=u("align",(function(){return{type:String,default:null,validator:d}})),f=function(t){return[].concat(l,["space-between","space-around"]).includes(t)},p=u("justify",(function(){return{type:String,default:null,validator:f}})),v=function(t){return[].concat(l,["space-between","space-around","stretch"]).includes(t)},m=u("alignContent",(function(){return{type:String,default:null,validator:v}})),g={align:Object.keys(h),justify:Object.keys(p),alignContent:Object.keys(m)},b={align:"align",justify:"justify",alignContent:"align-content"};function y(t,e,a){var n=b[t];if(null!=a){if(e){var i=e.replace(t,"");n+="-".concat(i)}return n+="-".concat(a),n.toLowerCase()}}var x=new Map;e["a"]=s["a"].extend({name:"v-row",functional:!0,props:Object(i["a"])(Object(i["a"])(Object(i["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},h),{},{justify:{type:String,default:null,validator:f}},p),{},{alignContent:{type:String,default:null,validator:v}},m),render:function(t,e){var a=e.props,i=e.data,s=e.children,o="";for(var c in a)o+=String(a[c]);var l=x.get(o);return l||function(){var t,e;for(e in l=[],g)g[e].forEach((function(t){var n=a[t],i=y(e,t,n);i&&l.push(i)}));l.push((t={"no-gutters":a.noGutters,"row--dense":a.dense},Object(n["a"])(t,"align-".concat(a.align),a.align),Object(n["a"])(t,"justify-".concat(a.justify),a.justify),Object(n["a"])(t,"align-content-".concat(a.alignContent),a.alignContent),t)),x.set(o,l)}(),t(a.tag,Object(r["a"])(i,{staticClass:"row",class:l}),s)}})},"4f6c":function(t,e,a){t.exports=a.p+"img/logonew.f17258eb.png"},5311:function(t,e,a){"use strict";var n=a("5607"),i=a("2b0e");e["a"]=i["a"].extend({name:"rippleable",directives:{ripple:n["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}})},"6ca7":function(t,e,a){},ac7c:function(t,e,a){"use strict";a("d3b7"),a("25f0");var n=a("5530"),i=(a("6ca7"),a("ec29"),a("9d26")),s=a("c37a"),r=a("fe09");e["a"]=r["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(i["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(n["a"])(Object(n["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},b385:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("v-row",[a("v-col",{attrs:{cols:"12",md:"4"}},[a("v-card",{staticClass:"mx-auto",attrs:{loading:t.loading}},[a("v-img",{attrs:{height:"250",src:t.src},scopedSlots:t._u([{key:"placeholder",fn:function(){return[a("v-row",{staticClass:"fill-height ma-0",attrs:{align:"center",justify:"center"}},[a("v-progress-circular",{attrs:{indeterminate:"",color:"grey lighten-5"}})],1)]},proxy:!0}])}),a("v-card-title",{staticClass:"d-flex justify-space-between"},[a("div",{staticClass:"font-weight-bold"},[t._v(" "+t._s(t.servantData.basic.name)+" ")]),a("div",[t._v(t._s(t.servantData.basic.password))])]),a("v-card-text",[a("div",{staticClass:"font-weight-bold"},[t._v(" "+t._s(t.servantData.basic.managedSection)+" ")])]),a("v-divider",{staticClass:"mx-2"}),a("v-card-title",{staticClass:"subtitle-2"},[t._v(" "+t._s(t.$t("本日总结"))+" ")]),a("v-card-text",[a("v-list",{attrs:{shaped:"",dense:""}},[a("v-list-item-group",{attrs:{color:"primary"},model:{value:t.currentIndex,callback:function(e){t.currentIndex=e},expression:"currentIndex"}},t._l(t.infoList,(function(e,n){return a("v-list-item",{key:n},[a("v-list-item-content",[a("v-list-item-title",{domProps:{textContent:t._s(e.text)}})],1)],1)})),1)],1),a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":t.dates,"offset-y":""},on:{"update:returnValue":function(e){t.dates=e},"update:return-value":function(e){t.dates=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[a("v-text-field",t._g({attrs:{"hide-details":"",label:t.$t("日期筛选"),"prepend-icon":"mdi-calendar","single-line":""},model:{value:t.dates,callback:function(e){t.dates=e},expression:"dates"}},n))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[a("v-date-picker",{attrs:{"no-title":"",range:"",scrollable:"",locale:"de"},model:{value:t.dates,callback:function(e){t.dates=e},expression:"dates"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.menu=!1}}},[t._v(" "+t._s(t.$t("Cancel"))+" ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menu.save(t.dates)}}},[t._v(" "+t._s(t.$t("OK"))+" ")])],1)],1)],1),a("v-card-actions",[a("v-row",{attrs:{justify:"center"}},[a("v-btn",{attrs:{small:"",color:"primary"},on:{click:function(e){return t.printSummary(t.id)}}},[t._v(" "+t._s(t.$t("打印本日总结"))+" ")])],1)],1)],1)],1),a("v-col",{attrs:{cols:"12",md:"8"}},[a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-vuetify",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[a("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("本日账单"))+" ")])]},proxy:!0}])},[a("v-text-field",{staticClass:"ml-auto",staticStyle:{"max-width":"250px"},attrs:{"append-icon":"mdi-magnify","hide-details":"",label:t.$t("Search"),"single-line":""},model:{value:t.search,callback:function(e){t.search=e},expression:"search"}}),a("v-divider",{staticClass:"mt-3"}),a("v-data-table",{attrs:{"fixed-header":!0,headers:t.headers,items:t.desserts,"items-per-page":10,loading:t.loading,search:t.search,"multi-sort":""},on:{"update:search":function(e){t.search=e}},scopedSlots:t._u([{key:"item.paymentStatus",fn:function(t){var e=t.item;return[a("v-checkbox",{attrs:{readonly:!0,"input-value":"1"===e.paymentStatus,disabled:""}})]}},{key:"item.action",fn:function(e){var n=e.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.goNext(n)}}},[t._v(" mdi-arrow-right ")])]}}])}),a("v-row",[a("v-spacer"),a("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:function(e){return t.goBack()}}},[t._v(" "+t._s(t.$t("返回"))+" ")])],1)],1)],1)],1)],1)],1)],1)},i=[],s=(a("a9e3"),a("0a61")),r=a("5089"),o=a("c787"),c=a("ff51"),l={props:{id:{default:-1,type:Number}},data:function(){return{dates:[],menu:!1,loading:!1,currentIndex:0,servantId:this.id,servantData:{},infoList:[],search:"",headers:[{text:"Id",align:"start",sortable:!1,value:"orderId"},{text:this.$i18n.t("tableName"),value:"tableName"},{text:this.$i18n.t("time"),value:"eatTime"},{text:this.$i18n.t("price"),value:"totalPrice"},{text:this.$i18n.t("paymentStatus"),value:"paymentStatus"},{text:this.$i18n.t("action"),value:"action",sortable:!1}],desserts:[]}},computed:{src:function(){return!!this.servantData.basic&&this.$store.getters.rootUrl+r["b"].ServantImgRoot+this.servantData.basic.photo},defalutLogoUrl:function(){return"this.src="+a("4f6c")}},created:function(){this.loadDetail(this.servantId)},mounted:function(){this.dates=[Object(c["a"])(0),Object(c["a"])(0)]},methods:{goNext:function(t){this.$router.push({name:"Seite mit den Rechnungsdetails",params:{id:t.orderId}})},clear:function(){this.dates=[]},loadDetail:function(t){var e=this;Object(s["y"])(t).then((function(t){e.servantData=t.content,e.infoList.push({text:e.$i18n.t("总单数")+": "+e.servantData.display.count}),e.infoList.push({text:e.$i18n.t("今日营业总额")+": "+e.servantData.display.totalPrice}),e.infoList.push({text:e.$i18n.t("现金")+": "+e.servantData.bar}),e.infoList.push({text:e.$i18n.t("EC")+": "+e.servantData.ec}),e.infoList.push({text:e.$i18n.t("tipIncome")+": "+e.servantData.display.tip}),e.desserts=e.servantData.order}))},printSummary:function(t){if(void 0===this.dates[1]&&(this.dates[1]=this.dates[0]),Date.parse(this.dates[0])>Date.parse(this.dates[1])){var e=[this.dates[1],this.dates[0]];this.dates[0]=e[0],this.dates[1]=e[1]}Object(s["D"])(t,this.dates[0],this.dates[1]).then((function(){o["IKUtils"].toast()}))},goBack:function(){this.$router.history.go(-1)}}},u=l,d=a("2877"),h=a("6544"),f=a.n(h),p=a("8336"),v=a("b0af"),m=a("99d9"),g=a("ac7c"),b=a("62ad"),y=a("a523"),x=a("8fea"),C=a("2e4b"),k=a("ce7e"),V=a("132d"),S=a("adda"),I=a("8860"),w=a("da13"),j=a("5d23"),D=a("1baa"),$=a("e449"),_=a("490a"),O=a("0fd9"),L=a("2fa4"),A=a("8654"),B=Object(d["a"])(u,n,i,!1,null,"d67d6b2e",null);e["default"]=B.exports;f()(B,{VBtn:p["a"],VCard:v["a"],VCardActions:m["a"],VCardText:m["c"],VCardTitle:m["d"],VCheckbox:g["a"],VCol:b["a"],VContainer:y["a"],VDataTable:x["a"],VDatePicker:C["a"],VDivider:k["a"],VIcon:V["a"],VImg:S["a"],VList:I["a"],VListItem:w["a"],VListItemContent:j["b"],VListItemGroup:D["a"],VListItemTitle:j["d"],VMenu:$["a"],VProgressCircular:_["a"],VRow:O["a"],VSpacer:L["a"],VTextField:A["a"]})},ec29:function(t,e,a){},fe09:function(t,e,a){"use strict";a.d(e,"b",(function(){return o}));a("4de4"),a("45fc"),a("d3b7"),a("25f0");var n=a("c37a"),i=a("5311"),s=a("8547"),r=a("58df");function o(t){t.preventDefault()}e["a"]=Object(r["a"])(n["a"],i["a"],s["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,a=this.internalValue;return this.isMultiple?!!Array.isArray(a)&&a.some((function(a){return t.valueComparator(a,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,a):Boolean(a):this.valueComparator(a,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=n["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:o},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:o},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,a=this.internalValue;if(this.isMultiple){Array.isArray(a)||(a=[]);var n=a.length;a=a.filter((function(a){return!t.valueComparator(a,e)})),a.length===n&&a.push(e)}else a=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(a,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(a,e)?null:e:!a;this.validate(!0,a),this.internalValue=a,this.hasColor=a}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})},ff51:function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return i}));a("a15b");function n(t){var e=new Date,a=e.getTime(),n=864e5,i=a+t*n,s=new Date(i),r=s.getFullYear(),o=s.getMonth()+1,c=s.getDate();return[r,o,c].join("-")}function i(t){var e=new Date,a=e.getTime(),n=864e5,i=a+t*n,s=new Date(i),r=s.getFullYear()+"-",o=s.getMonth()+1,c=s.getDate(),l=s.getHours()<10?"0"+s.getHours():s.getHours(),u=s.getMinutes()<10?"0"+s.getMinutes():s.getMinutes(),d=s.getSeconds()<10?"0"+s.getSeconds():s.getSeconds();return r+o+"-"+c+" "+l+":"+u+":"+d}}}]);
//# sourceMappingURL=chunk-1045af4a.c094b37d.js.map