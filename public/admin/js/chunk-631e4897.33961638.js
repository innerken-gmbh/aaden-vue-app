(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-631e4897","chunk-2d20862b"],{1681:function(t,a,e){},"4bd4":function(t,a,e){"use strict";e("4de4"),e("7db0"),e("4160"),e("caad"),e("07ac"),e("2532"),e("159b");var i=e("5530"),s=e("58df"),r=e("7e2b"),n=e("3206");a["a"]=Object(s["a"])(r["a"],Object(n["b"])("form")).extend({name:"v-form",provide:function(){return{form:this}},inheritAttrs:!1,props:{disabled:Boolean,lazyValidation:Boolean,readonly:Boolean,value:Boolean},data:function(){return{inputs:[],watchers:[],errorBag:{}}},watch:{errorBag:{handler:function(t){var a=Object.values(t).includes(!0);this.$emit("input",!a)},deep:!0,immediate:!0}},methods:{watchInput:function(t){var a=this,e=function(t){return t.$watch("hasError",(function(e){a.$set(a.errorBag,t._uid,e)}),{immediate:!0})},i={_uid:t._uid,valid:function(){},shouldValidate:function(){}};return this.lazyValidation?i.shouldValidate=t.$watch("shouldValidate",(function(s){s&&(a.errorBag.hasOwnProperty(t._uid)||(i.valid=e(t)))})):i.valid=e(t),i},validate:function(){return 0===this.inputs.filter((function(t){return!t.validate(!0)})).length},reset:function(){this.inputs.forEach((function(t){return t.reset()})),this.resetErrorBag()},resetErrorBag:function(){var t=this;this.lazyValidation&&setTimeout((function(){t.errorBag={}}),0)},resetValidation:function(){this.inputs.forEach((function(t){return t.resetValidation()})),this.resetErrorBag()},register:function(t){this.inputs.push(t),this.watchers.push(this.watchInput(t))},unregister:function(t){var a=this.inputs.find((function(a){return a._uid===t._uid}));if(a){var e=this.watchers.find((function(t){return t._uid===a._uid}));e&&(e.valid(),e.shouldValidate()),this.watchers=this.watchers.filter((function(t){return t._uid!==a._uid})),this.inputs=this.inputs.filter((function(t){return t._uid!==a._uid})),this.$delete(this.errorBag,a._uid)}}},render:function(t){var a=this;return t("form",{staticClass:"v-form",attrs:Object(i["a"])({novalidate:!0},this.attrs$),on:{submit:function(t){return a.$emit("submit",t)}}},this.$slots.default)}})},"78a0":function(t,a,e){"use strict";e.r(a);var i=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{id:"user-profile",fluid:"",tag:"section"}},[e("v-row",{attrs:{justify:"center"}},[e("v-col",{attrs:{cols:"12",md:"8"}},[e("base-material-card",{attrs:{icon:"mdi-account-outline"},scopedSlots:t._u([{key:"after-heading",fn:function(){return[e("div",{staticClass:"font-weight-light card-title mt-2"},[t._v(" Edit Profile "),e("span",{staticClass:"body-1"},[t._v("— Complete your profile")])])]},proxy:!0}])},[e("v-form",[e("v-container",{staticClass:"py-0"},[e("v-row",[e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{attrs:{disabled:"",label:"Company (disabled)"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"User Name"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Email Address"}})],1),e("v-col",{attrs:{cols:"12",md:"6"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"First Name"}})],1),e("v-col",{attrs:{cols:"12",md:"6"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Last Name"}})],1),e("v-col",{attrs:{cols:"12"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Adress"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"City"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Country"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Postal Code",type:"number"}})],1),e("v-col",{attrs:{cols:"12"}},[e("v-textarea",{staticClass:"purple-input",attrs:{label:"About Me",value:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}})],1),e("v-col",{staticClass:"text-right",attrs:{cols:"12"}},[e("v-btn",{staticClass:"mr-0",attrs:{color:"success"}},[t._v(" Update Profile ")])],1)],1)],1)],1)],1)],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("base-material-card",{staticClass:"v-card-profile",attrs:{avatar:"https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"}},[e("v-card-text",{staticClass:"text-center"},[e("h6",{staticClass:"display-1 mb-1 grey--text"},[t._v(" CEO / CO-FOUNDER ")]),e("h4",{staticClass:"display-2 font-weight-light mb-3 black--text"},[t._v(" Alec Thompson ")]),e("p",{staticClass:"font-weight-light grey--text"},[t._v(" Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is... ")]),e("v-btn",{staticClass:"mr-0",attrs:{color:"success",rounded:""}},[t._v(" Follow ")])],1)],1)],1)],1)],1)},s=[],r={},n=r,o=e("2877"),l=e("6544"),u=e.n(l),c=e("8336"),d=e("99d9"),h=e("62ad"),p=e("a523"),f=e("4bd4"),v=e("0fd9"),m=e("8654"),b=e("a844"),g=Object(o["a"])(n,i,s,!1,null,null,null);a["default"]=g.exports;u()(g,{VBtn:c["a"],VCardText:d["b"],VCol:h["a"],VContainer:p["a"],VForm:f["a"],VRow:v["a"],VTextField:m["a"],VTextarea:b["a"]})},a523:function(t,a,e){"use strict";e("99af"),e("4de4"),e("b64b"),e("2ca0"),e("20f6"),e("4b85"),e("a15b"),e("498a");var i=e("2b0e");function s(t){return i["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(a,e){var i=e.props,s=e.data,r=e.children;s.staticClass="".concat(t," ").concat(s.staticClass||"").trim();var n=s.attrs;if(n){s.attrs={};var o=Object.keys(n).filter((function(t){if("slot"===t)return!1;var a=n[t];return t.startsWith("data-")?(s.attrs[t]=a,!1):a||"string"===typeof a}));o.length&&(s.staticClass+=" ".concat(o.join(" ")))}return i.id&&(s.domProps=s.domProps||{},s.domProps.id=i.id),a(i.tag,s,r)}})}var r=e("d9f7");a["a"]=s("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,a){var e,i=a.props,s=a.data,n=a.children,o=s.attrs;return o&&(s.attrs={},e=Object.keys(o).filter((function(t){if("slot"===t)return!1;var a=o[t];return t.startsWith("data-")?(s.attrs[t]=a,!1):a||"string"===typeof a}))),i.id&&(s.domProps=s.domProps||{},s.domProps.id=i.id),t(i.tag,Object(r["a"])(s,{staticClass:"container",class:Array({"container--fluid":i.fluid}).concat(e||[])}),n)}})},a844:function(t,a,e){"use strict";e("a9e3");var i=e("5530"),s=(e("1681"),e("8654")),r=e("58df"),n=Object(r["a"])(s["a"]);a["a"]=n.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(i["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},s["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{autoGrow:function(t){var a=this;this.$nextTick((function(){var e;t?a.calculateInputHeight():null==(e=a.$refs.input)||e.style.removeProperty("height")}))},lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var a=t.scrollHeight,e=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(e,a)+"px"}},genInput:function(){var t=s["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){s["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})}}]);
//# sourceMappingURL=chunk-631e4897.33961638.js.map