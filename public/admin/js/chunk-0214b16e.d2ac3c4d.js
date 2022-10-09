(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0214b16e"],{"0cbd":function(t,e,r){"use strict";r.r(e);var a=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("v-container",{attrs:{id:"validation-forms",fluid:"",tag:"section"}},[r("base-v-component",{attrs:{heading:"Forms",link:"components/forms"}}),r("v-row",[r("v-col",{attrs:{cols:"12",md:"6"}},[r("base-material-card",{staticClass:"py-3 px-5",attrs:{color:"success",icon:"mdi-mail",title:"Register Form"}},[r("v-form",[r("v-text-field",{attrs:{color:"secondary",label:"Email Address*"}}),r("v-text-field",{attrs:{"append-icon":t.show?"mdi-eye":"mdi-eye-off",type:t.show?"text":"password",color:"secondary",label:"Password*"},on:{"click:append":function(e){e.preventDefault(),t.show=!t.show}}}),r("v-text-field",{attrs:{"append-icon":t.show2?"mdi-eye":"mdi-eye-off",type:t.show2?"text":"password",color:"secondary",label:"Confirm Password*"},on:{"click:append":function(e){e.preventDefault(),t.show2=!t.show2}}}),r("div",{staticClass:"text-body-2 font-weight-light"},[t._v(" * Required Fields ")]),r("v-card-actions",{staticClass:"pa-0"},[r("v-checkbox",{attrs:{label:"Subscribe to newsletter"}}),r("v-spacer"),r("v-btn",{attrs:{color:"success",default:""}},[t._v(" Register ")])],1)],1)],1)],1),r("v-col",{attrs:{cols:"12",md:"6"}},[r("base-material-card",{staticClass:"py-3 px-5",attrs:{color:"success",icon:"mdi-camera-account",title:"Login Form"}},[r("v-form",[r("v-text-field",{attrs:{color:"secondary",label:"Email Address*"}}),r("v-text-field",{attrs:{"append-icon":t.show3?"mdi-eye":"mdi-eye-off",type:t.show3?"text":"password",color:"secondary",label:"Password*"},on:{"click:append":function(e){e.preventDefault(),t.show3=!t.show3}}}),r("v-card-actions",{staticClass:"pa-0"},[r("v-spacer"),r("v-btn",{attrs:{color:"success",default:""}},[t._v(" Login ")])],1)],1)],1)],1),r("v-col",{attrs:{cols:"12"}},[r("validation-observer",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.handleSubmit;return[r("form",{on:{submit:function(e){return e.preventDefault(),a(t.validateForm)}}},[r("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"success",inline:"",title:"Type Validation"}},[r("v-row",{attrs:{align:"center",dense:""}},[r("v-col",{staticClass:"text-right text-body-1 grey--text",attrs:{cols:"2"}},[t._v(" Required Text ")]),r("v-col",{attrs:{cols:"8"}},[r("validation-provider",{attrs:{name:"email",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[r("v-text-field",{attrs:{"error-messages":a,color:"secondary"},model:{value:t.required,callback:function(e){t.required=e},expression:"required"}})]}}],null,!0)})],1),r("v-col",[r("code",[t._v("required")])])],1),r("v-row",{attrs:{align:"center",dense:""}},[r("v-col",{staticClass:"text-right text-body-1 grey--text",attrs:{cols:"2"}},[t._v(" Email ")]),r("v-col",{attrs:{cols:"8"}},[r("validation-provider",{attrs:{name:"email",rules:"required|email"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[r("v-text-field",{attrs:{"error-messages":a,color:"secondary",type:"email"},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})]}}],null,!0)})],1),r("v-col",[r("code",[t._v('type="email"')])])],1),r("v-row",{attrs:{align:"center",dense:""}},[r("v-col",{staticClass:"text-right text-body-1 grey--text",attrs:{cols:"2"}},[t._v(" Number ")]),r("v-col",{attrs:{cols:"8"}},[r("validation-provider",{attrs:{name:"number",rules:"required|numeric"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[r("v-text-field",{attrs:{"error-messages":a,color:"secondary",type:"number"},model:{value:t.number,callback:function(e){t.number=e},expression:"number"}})]}}],null,!0)})],1),r("v-col",[r("code",[t._v('type="number"')])])],1),r("v-row",{attrs:{align:"center",dense:""}},[r("v-col",{staticClass:"text-right text-body-1 grey--text",attrs:{cols:"2"}},[t._v(" Url ")]),r("v-col",{attrs:{cols:"8"}},[r("validation-provider",{attrs:{name:"url",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[r("v-text-field",{attrs:{"error-messages":a,color:"secondary",type:"url"},model:{value:t.url,callback:function(e){t.url=e},expression:"url"}})]}}],null,!0)})],1),r("v-col",[r("code",[t._v('type="url"')])])],1),r("div",{staticClass:"pa-3 text-center"},[r("v-btn",{attrs:{color:"success",default:"",type:"submit"}},[t._v(" Validate Inputs ")])],1)],1)],1)]}}])})],1),r("v-col",{attrs:{cols:"12"}},[r("validation-observer",{scopedSlots:t._u([{key:"default",fn:function(e){var a=e.handleSubmit;return[r("form",{on:{submit:function(e){return e.preventDefault(),a(t.validateForm)}}},[r("base-material-card",{attrs:{color:"success",inline:"",title:"Range Validation"}},[r("v-row",{attrs:{align:"center",dense:""}},[r("v-col",{staticClass:"text-right text-body-1 grey--text",attrs:{cols:"2"}},[t._v(" Min Length ")]),r("v-col",{attrs:{cols:"8"}},[r("validation-provider",{attrs:{name:"min length",rules:"required|min:5"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[r("v-text-field",{attrs:{"error-messages":a,color:"secondary"},model:{value:t.min,callback:function(e){t.min=e},expression:"min"}})]}}],null,!0)})],1),r("v-col",[r("code",[t._v('minLength="5"')])])],1),r("v-row",{attrs:{align:"center",dense:""}},[r("v-col",{staticClass:"text-right text-body-1 grey--text",attrs:{cols:"2"}},[t._v(" Max Length ")]),r("v-col",{attrs:{cols:"8"}},[r("validation-provider",{attrs:{name:"max length",rules:"required|max:5"},scopedSlots:t._u([{key:"default",fn:function(e){var a=e.errors;return[r("v-text-field",{attrs:{"error-messages":a,color:"secondary"},model:{value:t.max,callback:function(e){t.max=e},expression:"max"}})]}}],null,!0)})],1),r("v-col",[r("code",[t._v('maxLength="5"')])])],1),r("div",{staticClass:"pa-3 text-center"},[r("v-btn",{attrs:{color:"success",default:"",type:"submit"}},[t._v(" Validate Inputs ")])],1)],1)],1)]}}])})],1)],1)],1)},s=[],o={name:"DashboardFormsValidationForms",$_veeValidate:{validator:"new"},data:function(){return{email:"",max:"",min:"",number:null,url:"",required:"",show:!1,show2:!1,show3:!1}},methods:{validateForm:function(t){alert("Form Submitted!")}}},n=o,l=r("2877"),i=r("6544"),c=r.n(i),d=r("8336"),u=r("99d9"),v=r("ac7c"),m=r("62ad"),f=r("a523"),p=r("4bd4"),b=r("0fd9"),y=r("2fa4"),x=r("8654"),g=Object(l["a"])(n,a,s,!1,null,null,null);e["default"]=g.exports;c()(g,{VBtn:d["a"],VCardActions:u["a"],VCheckbox:v["a"],VCol:m["a"],VContainer:f["a"],VForm:p["a"],VRow:b["a"],VSpacer:y["a"],VTextField:x["a"]})},a523:function(t,e,r){"use strict";r("4de4"),r("d3b7"),r("b64b"),r("2ca0"),r("99af"),r("20f6"),r("4b85"),r("498a"),r("a15b");var a=r("2b0e");function s(t){return a["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,r){var a=r.props,s=r.data,o=r.children;s.staticClass="".concat(t," ").concat(s.staticClass||"").trim();var n=s.attrs;if(n){s.attrs={};var l=Object.keys(n).filter((function(t){if("slot"===t)return!1;var e=n[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}));l.length&&(s.staticClass+=" ".concat(l.join(" ")))}return a.id&&(s.domProps=s.domProps||{},s.domProps.id=a.id),e(a.tag,s,o)}})}var o=r("d9f7");e["a"]=s("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var r,a=e.props,s=e.data,n=e.children,l=s.attrs;return l&&(s.attrs={},r=Object.keys(l).filter((function(t){if("slot"===t)return!1;var e=l[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}))),a.id&&(s.domProps=s.domProps||{},s.domProps.id=a.id),t(a.tag,Object(o["a"])(s,{staticClass:"container",class:Array({"container--fluid":a.fluid}).concat(r||[])}),n)}})}}]);
//# sourceMappingURL=chunk-0214b16e.d2ac3c4d.js.map