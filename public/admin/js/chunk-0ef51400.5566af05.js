(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0ef51400"],{1681:function(t,a,e){},"78a0":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{id:"user-profile",fluid:"",tag:"section"}},[e("v-row",{attrs:{justify:"center"}},[e("v-col",{attrs:{cols:"12",md:"8"}},[e("base-material-card",{attrs:{icon:"mdi-account-outline"},scopedSlots:t._u([{key:"after-heading",fn:function(){return[e("div",{staticClass:"font-weight-light card-title mt-2"},[t._v(" Edit Profile "),e("span",{staticClass:"body-1"},[t._v("— Complete your profile")])])]},proxy:!0}])},[e("v-form",[e("v-container",{staticClass:"py-0"},[e("v-row",[e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{attrs:{disabled:"",label:"Company (disabled)"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"User Name"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Email Address"}})],1),e("v-col",{attrs:{cols:"12",md:"6"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"First Name"}})],1),e("v-col",{attrs:{cols:"12",md:"6"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Last Name"}})],1),e("v-col",{attrs:{cols:"12"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Adress"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"City"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Country"}})],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("v-text-field",{staticClass:"purple-input",attrs:{label:"Postal Code",type:"number"}})],1),e("v-col",{attrs:{cols:"12"}},[e("v-textarea",{staticClass:"purple-input",attrs:{label:"About Me",value:"Lorem ipsum dolor sit amet, consectetur adipiscing elit."}})],1),e("v-col",{staticClass:"text-right",attrs:{cols:"12"}},[e("v-btn",{staticClass:"mr-0",attrs:{color:"success"}},[t._v(" Update Profile ")])],1)],1)],1)],1)],1)],1),e("v-col",{attrs:{cols:"12",md:"4"}},[e("base-material-card",{staticClass:"v-card-profile",attrs:{avatar:"https://demos.creative-tim.com/vue-material-dashboard/img/marc.aba54d65.jpg"}},[e("v-card-text",{staticClass:"text-center"},[e("h6",{staticClass:"display-1 mb-1 grey--text"},[t._v(" CEO / CO-FOUNDER ")]),e("h4",{staticClass:"display-2 font-weight-light mb-3 black--text"},[t._v(" Alec Thompson ")]),e("p",{staticClass:"font-weight-light grey--text"},[t._v(" Don't be scared of the truth because we need to restart the human foundation in truth And I love you like Kanye loves Kanye I love Rick Owens’ bed design but the back is... ")]),e("v-btn",{staticClass:"mr-0",attrs:{color:"success",rounded:""}},[t._v(" Follow ")])],1)],1)],1)],1)],1)},i=[],o={},l=o,r=e("2877"),n=e("6544"),c=e.n(n),u=e("8336"),d=e("99d9"),p=e("62ad"),h=e("a523"),v=e("4bd4"),m=e("0fd9"),f=e("8654"),b=e("a844"),g=Object(r["a"])(l,s,i,!1,null,null,null);a["default"]=g.exports;c()(g,{VBtn:u["a"],VCardText:d["c"],VCol:p["a"],VContainer:h["a"],VForm:v["a"],VRow:m["a"],VTextField:f["a"],VTextarea:b["a"]})},a844:function(t,a,e){"use strict";e("a9e3");var s=e("5530"),i=(e("1681"),e("8654")),o=e("58df"),l=Object(o["a"])(i["a"]);a["a"]=l.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(s["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},i["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var a=t.scrollHeight,e=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(e,a)+"px"}},genInput:function(){var t=i["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){i["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})}}]);
//# sourceMappingURL=chunk-0ef51400.5566af05.js.map