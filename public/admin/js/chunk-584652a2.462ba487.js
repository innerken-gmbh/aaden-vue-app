(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-584652a2"],{1681:function(t,a,e){},"78a0":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{id:"user-profile",fluid:"",tag:"section"}},[e("v-row",{attrs:{justify:"center"}},[e("v-col",{attrs:{cols:"12",md:"8"}},[e("base-material-card",{attrs:{icon:"mdi-account-outline"},scopedSlots:t._u([{key:"after-heading",fn:function(){return[e("div",{staticClass:"font-weight-light card-title mt-2"},[t._v(" Edit Profile "),e("span",{staticClass:"text-body-1"},[t._v("— Complete your profile")])])]},proxy:!0}])},[e("v-form",[e("v-container",{staticClass:"py-0"},[e("v-row",[e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{attrs:{disabled:"",label:"Company (disabled)"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"User Name"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Email Address"}})],1),e("v-col",{attrs:{cols:"12",md:"6"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"First Name"}})],1),e("v-col",{attrs:{cols:"12",md:"6"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Last Name"}})],1),e("v-col",{attrs:{cols:"12"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Adress"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"City"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Country"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Postal Code",type:"number"}})],1),e("v-col",{attrs:{cols:"12"}},[e("v-textarea",{staticClass:"purple-input",attrs:{label:"About Me",value:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}})],1),e("v-col",{staticClass:"text-right",attrs:{cols:"12"}},[e("v-btn",{staticClass:"mr-0",attrs:{color:"success"}},[t._v(" Update Profile ")])],1)],1)],1)],1)],1)],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("base-material-card",{staticClass:"v-card-profile",attrs:{avatar:"https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"}},[e("v-card-text",{staticClass:"text-center"},[e("h6",{staticClass:"text-h4 mb-1 grey--text"},[t._v(" CEO / CO-FOUNDER ")]),e("h4",{staticClass:"text-h3 font-weight-light mb-3 black--text"},[t._v(" Alec Thompson ")]),e("p",{staticClass:"font-weight-light grey--text"},[t._v(" Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is... ")]),e("v-btn",{staticClass:"mr-0",attrs:{color:"success",rounded:""}},[t._v(" Follow ")])],1)],1)],1)],1)],1)},r=[],i={},o=i,n=e("2877"),l=e("6544"),c=e.n(l),u=e("8336"),d=e("99d9"),p=e("62ad"),f=e("a523"),v=e("4bd4"),h=e("0fd9"),m=e("8654"),b=e("a844"),g=Object(n["a"])(o,s,r,!1,null,null,null);a["default"]=g.exports;c()(g,{VBtn:u["a"],VCardText:d["b"],VCol:p["a"],VContainer:f["a"],VForm:v["a"],VRow:h["a"],VTextField:m["a"],VTextarea:b["a"]})},a523:function(t,a,e){"use strict";e("4de4"),e("d3b7"),e("b64b"),e("2ca0"),e("99af"),e("20f6"),e("4b85"),e("498a"),e("a15b");var s=e("2b0e");function r(t){return s["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(a,e){var s=e.props,r=e.data,i=e.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var o=r.attrs;if(o){r.attrs={};var n=Object.keys(o).filter((function(t){if("slot"===t)return!1;var a=o[t];return t.startsWith("data-")?(r.attrs[t]=a,!1):a||"string"===typeof a}));n.length&&(r.staticClass+=" ".concat(n.join(" ")))}return s.id&&(r.domProps=r.domProps||{},r.domProps.id=s.id),a(s.tag,r,i)}})}var i=e("d9f7");a["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,a){var e,s=a.props,r=a.data,o=a.children,n=r.attrs;return n&&(r.attrs={},e=Object.keys(n).filter((function(t){if("slot"===t)return!1;var a=n[t];return t.startsWith("data-")?(r.attrs[t]=a,!1):a||"string"===typeof a}))),s.id&&(r.domProps=r.domProps||{},r.domProps.id=s.id),t(s.tag,Object(i["a"])(r,{staticClass:"container",class:Array({"container--fluid":s.fluid}).concat(e||[])}),o)}})},a844:function(t,a,e){"use strict";var s=e("5530"),r=(e("a9e3"),e("1681"),e("8654")),i=e("58df"),o=Object(i["a"])(r["a"]);a["a"]=o.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(s["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},r["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{autoGrow:function(t){var a=this;this.$nextTick((function(){var e;t?a.calculateInputHeight():null==(e=a.$refs.input)||e.style.removeProperty("height")}))},lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var a=t.scrollHeight,e=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(e,a)+"px"}},genInput:function(){var t=r["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){r["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})}}]);
//# sourceMappingURL=chunk-584652a2.462ba487.js.map