(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-67474409"],{"2a7f":function(t,e,n){"use strict";n.d(e,"a",(function(){return s})),n.d(e,"b",(function(){return r}));var i=n("71d9"),a=n("80d2"),r=Object(a["i"])("v-toolbar__title"),s=Object(a["i"])("v-toolbar__items");i["a"]},5311:function(t,e,n){"use strict";var i=n("5607"),a=n("2b0e");e["a"]=a["a"].extend({name:"rippleable",directives:{ripple:i["a"]},props:{ripple:{type:[Boolean,Object],default:!0}},methods:{genRipple:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return this.ripple?(t.staticClass="v-input--selection-controls__ripple",t.directives=t.directives||[],t.directives.push({name:"ripple",value:{center:!0}}),this.$createElement("div",t)):null}}})},"5e23":function(t,e,n){},6306:function(t,e,n){"use strict";var i=n("5530"),a=(n("96cf"),n("1da1")),r=n("f4d6"),s=n("9d8f"),o=n.n(s),l={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:r["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:r["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},upsideDown:{type:r["IKDataEntity"].Types.Boolean},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},c={load:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("Printer.php",Object(i["a"])({op:"showPrinterGroups"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return o.a.postWithUploadFile("Printer.php?op=addPrinterGroups",t,{showLoading:!0})},edit:function(t){return o.a.postWithUploadFile("Printer.php?op=updatePrinterGroups",t,{showLoading:!0})},remove:function(t){return o.a.post("Printer.php?op=deletePrinterGroup",{id:t})}};e["a"]=r["IKDataEntity"].ModelFactory(l,c)},"6ca7":function(t,e,n){},"71d9":function(t,e,n){"use strict";n("0481"),n("4160"),n("4069"),n("a9e3");var i=n("3835"),a=n("5530"),r=(n("5e23"),n("8dd9")),s=n("adda"),o=n("80d2"),l=n("d9bd");e["a"]=r["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"}},data:function(){return{isExtended:!1}},computed:{computedHeight:function(){var t=this.computedContentHeight;if(!this.isExtended)return t;var e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight:function(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes:function(){return Object(a["a"])(Object(a["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent})},isCollapsed:function(){return this.collapse},isProminent:function(){return this.prominent},styles:function(){return Object(a["a"])(Object(a["a"])({},this.measurableStyles),{},{height:Object(o["g"])(this.computedHeight)})}},created:function(){var t=this,e=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];e.forEach((function(e){var n=Object(i["a"])(e,2),a=n[0],r=n[1];t.$attrs.hasOwnProperty(a)&&Object(l["a"])(a,r,t)}))},methods:{genBackground:function(){var t={height:Object(o["g"])(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(s["a"],{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent:function(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(o["g"])(this.computedContentHeight)}},Object(o["s"])(this))},genExtension:function(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(o["g"])(this.extensionHeight)}},Object(o["s"])(this,"extension"))}},render:function(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;var e=[this.genContent()],n=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,n,e)}})},ac7c:function(t,e,n){"use strict";n("d3b7"),n("25f0");var i=n("5530"),a=(n("6ca7"),n("ec29"),n("9d26")),r=n("c37a"),s=n("fe09");e["a"]=s["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.isDisabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(a["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(i["a"])(Object(i["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},cb25:function(t,e,n){"use strict";n("b0c0");var i=n("5530"),a=(n("96cf"),n("1da1")),r=n("f4d6"),s=n("9d8f"),o=n.n(s),l=n("6306"),c={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},isSticker:{displayName:"isSticker"},lineLength:{displayName:"lineLength"},typeDesc:{displayName:"typeDesc"},typeName:{displayName:"typeName"}},u={load:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("Printer.php",Object(i["a"])({op:"showPrinterType"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},d=r["IKDataEntity"].ModelFactory(c,u),p={id:{type:r["IKDataEntity"].Types.Integer,displayName:"deviceId",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},printerName:{displayName:"printerName"},printerTypeId:{type:r["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d.getList,itemText:"typeName"},requiredEdit:!1},displayName:"printerTypeName"},identity:{displayName:"identity",header:!1,formConfig:{inEdit:!1}},sn:{displayName:"sn"},key:{displayName:"Key",formConfig:{inEdit:!1}},groupId:{type:r["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList,itemText:"name",multiple:!0},requiredEdit:!1},displayName:"groupSecName"}},h={load:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,r["IKDataEntity"].generalLoad("Printer.php",Object(i["a"])({op:"showAllPrinterStatus"},e));case 2:return n=t.sent,t.abrupt("return",n.content);case 4:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return t.groupIds=JSON.stringify(t.groupId),t.name=t.printerName,o.a.postWithUploadFile("Printer.php?op=add",t,{showLoading:!0})},edit:function(t){return t.groupIds=JSON.stringify(t.groupId),t.name=t.printerName,o.a.postWithUploadFile("Printer.php?op=edit",t,{showLoading:!0})},remove:function(t){return o.a.post("Printer.php?op=remove",{id:t})}};e["a"]=r["IKDataEntity"].ModelFactory(p,h)},d797:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("v-container",{attrs:{fluid:""}},[n("ik-data-table",{attrs:{model:t.model,icon:"mdi-cog-transfer","entity-name":t.$t("分区打印设置")}}),n("v-card",[n("v-toolbar",{attrs:{dense:"",color:"primary",dark:""}},[n("v-toolbar-title",[t._v(t._s(t.$t("设备分布")))]),n("v-spacer"),n("v-btn",{attrs:{text:""},on:{click:t.clearAll}},[t._v(" "+t._s(t.$t("清空"))+" ")])],1),n("v-card-text",[n("v-data-table",{attrs:{dense:"","hide-default-footer":"",headers:t.headers,"items-per-page":100,items:t.tableData},scopedSlots:t._u([t._l(t.sectionHeaders,(function(e,i){return{key:"item."+e.name,fn:function(a){var r=a.item;return[n("v-checkbox",{key:i,attrs:{disabled:t.loading,"input-value":r[e.name]},on:{click:function(n){return t.updateSection(r,e.name,e.id)}}})]}}}))],null,!0)})],1)],1)],1)],1)},a=[],r=(n("99af"),n("4160"),n("c975"),n("d81d"),n("a434"),n("b0c0"),n("159b"),n("96cf"),n("1da1")),s=n("6306"),o=n("cb25"),l=n("9d8f"),c=n.n(l),u=n("f4d6"),d={components:{IkDataTable:u["IkDataTable"]},data:function(){return{model:s["a"],displayData:[],loading:!1,sectionHeaders:[],fixedHeader:[{text:"name",value:"name"},{text:"sn",value:"sn"}]}},computed:{headers:function(){return this.fixedHeader.concat(this.sectionHeaders)},tableData:function(){var t=this,e=[];return this.displayData.forEach((function(n){n.name=n.printerName,t.sectionHeaders.forEach((function(t){n.groupId&&(n[t.name]=n.groupId.indexOf(t.id)>-1)})),e.push(n)})),e}},mounted:function(){this.loadData()},methods:{updateSection:function(t,e,n){var i=this;return Object(r["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return i.loading=!0,t[e]=!t[e],t[e]?t.groupId.push(n):t.groupId.splice(t.groupId.indexOf(n),1),t.groupIds=JSON.stringify(t.groupId),a.next=6,c.a.post("Printer.php?op=edit",t);case 6:i.loading=!1;case 7:case"end":return a.stop()}}),a)})))()},clearAll:function(){this.loading=!0,this.displayData.forEach((function(t){t.groupId=[],t.groupIds=JSON.stringify(t.groupId),c.a.post("Printer.php?op=edit",t)})),this.loading=!1},loadData:function(){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s["a"].getList();case 2:return t.sectionHeaders=e.sent.map((function(t){return t.text=t.name,t.value=t.name,t})),e.next=5,o["a"].getList();case 5:t.displayData=e.sent,console.log(t.displayData,"display");case 7:case"end":return e.stop()}}),e)})))()}}},p=d,h=n("2877"),f=n("6544"),m=n.n(f),g=n("8336"),v=n("b0af"),b=n("99d9"),y=n("ac7c"),I=n("a523"),x=n("8fea"),C=n("2fa4"),k=n("71d9"),O=n("2a7f"),w=Object(h["a"])(p,i,a,!1,null,null,null);e["default"]=w.exports;m()(w,{VBtn:g["a"],VCard:v["a"],VCardText:b["c"],VCheckbox:y["a"],VContainer:I["a"],VDataTable:x["a"],VSpacer:C["a"],VToolbar:k["a"],VToolbarTitle:O["b"]})},ec29:function(t,e,n){},fe09:function(t,e,n){"use strict";n.d(e,"b",(function(){return o}));n("4de4"),n("45fc"),n("d3b7"),n("25f0");var i=n("c37a"),a=n("5311"),r=n("8547"),s=n("58df");function o(t){t.preventDefault()}e["a"]=Object(s["a"])(i["a"],a["a"],r["a"]).extend({name:"selectable",model:{prop:"inputValue",event:"change"},props:{id:String,inputValue:null,falseValue:null,trueValue:null,multiple:{type:Boolean,default:null},label:String},data:function(){return{hasColor:this.inputValue,lazyValue:this.inputValue}},computed:{computedColor:function(){if(this.isActive)return this.color?this.color:this.isDark&&!this.appIsDark?"white":"primary"},isMultiple:function(){return!0===this.multiple||null===this.multiple&&Array.isArray(this.internalValue)},isActive:function(){var t=this,e=this.value,n=this.internalValue;return this.isMultiple?!!Array.isArray(n)&&n.some((function(n){return t.valueComparator(n,e)})):void 0===this.trueValue||void 0===this.falseValue?e?this.valueComparator(e,n):Boolean(n):this.valueComparator(n,this.trueValue)},isDirty:function(){return this.isActive},rippleState:function(){return this.isDisabled||this.validationState?this.validationState:void 0}},watch:{inputValue:function(t){this.lazyValue=t,this.hasColor=t}},methods:{genLabel:function(){var t=i["a"].options.methods.genLabel.call(this);return t?(t.data.on={click:o},t):t},genInput:function(t,e){return this.$createElement("input",{attrs:Object.assign({"aria-checked":this.isActive.toString(),disabled:this.isDisabled,id:this.computedId,role:t,type:t},e),domProps:{value:this.value,checked:this.isActive},on:{blur:this.onBlur,change:this.onChange,focus:this.onFocus,keydown:this.onKeydown,click:o},ref:"input"})},onBlur:function(){this.isFocused=!1},onClick:function(t){this.onChange(),this.$emit("click",t)},onChange:function(){var t=this;if(this.isInteractive){var e=this.value,n=this.internalValue;if(this.isMultiple){Array.isArray(n)||(n=[]);var i=n.length;n=n.filter((function(n){return!t.valueComparator(n,e)})),n.length===i&&n.push(e)}else n=void 0!==this.trueValue&&void 0!==this.falseValue?this.valueComparator(n,this.trueValue)?this.falseValue:this.trueValue:e?this.valueComparator(n,e)?null:e:!n;this.validate(!0,n),this.internalValue=n,this.hasColor=n}},onFocus:function(){this.isFocused=!0},onKeydown:function(t){}}})}}]);
//# sourceMappingURL=chunk-67474409.f2967e02.js.map