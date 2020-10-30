(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0af2ab"],{"0cbd":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("v-container",{attrs:{id:"validation-forms",fluid:"",tag:"section"}},[r("base-v-component",{attrs:{heading:"Forms",link:"components/forms"}}),r("v-row",[r("v-col",{attrs:{cols:"12",md:"6"}},[r("base-material-card",{staticClass:"py-3 px-5",attrs:{color:"success",icon:"mdi-mail",title:"Register Form"}},[r("v-form",[r("v-text-field",{attrs:{color:"secondary",label:"Email Address*"}}),r("v-text-field",{attrs:{"append-icon":e.show?"mdi-eye":"mdi-eye-off",type:e.show?"text":"password",color:"secondary",label:"Password*"},on:{"click:append":function(t){t.preventDefault(),e.show=!e.show}}}),r("v-text-field",{attrs:{"append-icon":e.show2?"mdi-eye":"mdi-eye-off",type:e.show2?"text":"password",color:"secondary",label:"Confirm Password*"},on:{"click:append":function(t){t.preventDefault(),e.show2=!e.show2}}}),r("div",{staticClass:"body-2 font-weight-light"},[e._v(" * Required Fields ")]),r("v-card-actions",{staticClass:"pa-0"},[r("v-checkbox",{attrs:{label:"Subscribe to newsletter"}}),r("v-spacer"),r("v-btn",{attrs:{color:"success",default:""}},[e._v(" Register ")])],1)],1)],1)],1),r("v-col",{attrs:{cols:"12",md:"6"}},[r("base-material-card",{staticClass:"py-3 px-5",attrs:{color:"success",icon:"mdi-camera-account",title:"Login Form"}},[r("v-form",[r("v-text-field",{attrs:{color:"secondary",label:"Email Address*"}}),r("v-text-field",{attrs:{"append-icon":e.show3?"mdi-eye":"mdi-eye-off",type:e.show3?"text":"password",color:"secondary",label:"Password*"},on:{"click:append":function(t){t.preventDefault(),e.show3=!e.show3}}}),r("v-card-actions",{staticClass:"pa-0"},[r("v-spacer"),r("v-btn",{attrs:{color:"success",default:""}},[e._v(" Login ")])],1)],1)],1)],1),r("v-col",{attrs:{cols:"12"}},[r("validation-observer",{scopedSlots:e._u([{key:"default",fn:function(t){var a=t.handleSubmit;return[r("form",{on:{submit:function(t){return t.preventDefault(),a(e.validateForm)}}},[r("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"success",inline:"",title:"Type Validation"}},[r("v-row",{attrs:{align:"center",dense:""}},[r("v-col",{staticClass:"text-right body-1 grey--text",attrs:{cols:"2"}},[e._v(" Required Text ")]),r("v-col",{attrs:{cols:"8"}},[r("validation-provider",{attrs:{name:"email",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("v-text-field",{attrs:{"error-messages":a,color:"secondary"},model:{value:e.required,callback:function(t){e.required=t},expression:"required"}})]}}],null,!0)})],1),r("v-col",[r("code",[e._v("required")])])],1),r("v-row",{attrs:{align:"center",dense:""}},[r("v-col",{staticClass:"text-right body-1 grey--text",attrs:{cols:"2"}},[e._v(" Email ")]),r("v-col",{attrs:{cols:"8"}},[r("validation-provider",{attrs:{name:"email",rules:"required|email"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("v-text-field",{attrs:{"error-messages":a,color:"secondary",type:"email"},model:{value:e.email,callback:function(t){e.email=t},expression:"email"}})]}}],null,!0)})],1),r("v-col",[r("code",[e._v('type="email"')])])],1),r("v-row",{attrs:{align:"center",dense:""}},[r("v-col",{staticClass:"text-right body-1 grey--text",attrs:{cols:"2"}},[e._v(" Number ")]),r("v-col",{attrs:{cols:"8"}},[r("validation-provider",{attrs:{name:"number",rules:"required|numeric"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("v-text-field",{attrs:{"error-messages":a,color:"secondary",type:"number"},model:{value:e.number,callback:function(t){e.number=t},expression:"number"}})]}}],null,!0)})],1),r("v-col",[r("code",[e._v('type="number"')])])],1),r("v-row",{attrs:{align:"center",dense:""}},[r("v-col",{staticClass:"text-right body-1 grey--text",attrs:{cols:"2"}},[e._v(" Url ")]),r("v-col",{attrs:{cols:"8"}},[r("validation-provider",{attrs:{name:"url",rules:"required"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("v-text-field",{attrs:{"error-messages":a,color:"secondary",type:"url"},model:{value:e.url,callback:function(t){e.url=t},expression:"url"}})]}}],null,!0)})],1),r("v-col",[r("code",[e._v('type="url"')])])],1),r("div",{staticClass:"pa-3 text-center"},[r("v-btn",{attrs:{color:"success",default:"",type:"submit"}},[e._v(" Validate Inputs ")])],1)],1)],1)]}}])})],1),r("v-col",{attrs:{cols:"12"}},[r("validation-observer",{scopedSlots:e._u([{key:"default",fn:function(t){var a=t.handleSubmit;return[r("form",{on:{submit:function(t){return t.preventDefault(),a(e.validateForm)}}},[r("base-material-card",{attrs:{color:"success",inline:"",title:"Range Validation"}},[r("v-row",{attrs:{align:"center",dense:""}},[r("v-col",{staticClass:"text-right body-1 grey--text",attrs:{cols:"2"}},[e._v(" Min Length ")]),r("v-col",{attrs:{cols:"8"}},[r("validation-provider",{attrs:{name:"min length",rules:"required|min:5"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("v-text-field",{attrs:{"error-messages":a,color:"secondary"},model:{value:e.min,callback:function(t){e.min=t},expression:"min"}})]}}],null,!0)})],1),r("v-col",[r("code",[e._v('minLength="5"')])])],1),r("v-row",{attrs:{align:"center",dense:""}},[r("v-col",{staticClass:"text-right body-1 grey--text",attrs:{cols:"2"}},[e._v(" Max Length ")]),r("v-col",{attrs:{cols:"8"}},[r("validation-provider",{attrs:{name:"max length",rules:"required|max:5"},scopedSlots:e._u([{key:"default",fn:function(t){var a=t.errors;return[r("v-text-field",{attrs:{"error-messages":a,color:"secondary"},model:{value:e.max,callback:function(t){e.max=t},expression:"max"}})]}}],null,!0)})],1),r("v-col",[r("code",[e._v('maxLength="5"')])])],1),r("div",{staticClass:"pa-3 text-center"},[r("v-btn",{attrs:{color:"success",default:"",type:"submit"}},[e._v(" Validate Inputs ")])],1)],1)],1)]}}])})],1)],1)],1)},s=[],o={name:"DashboardFormsValidationForms",$_veeValidate:{validator:"new"},data:function(){return{email:"",max:"",min:"",number:null,url:"",required:"",show:!1,show2:!1,show3:!1}},methods:{validateForm:function(e){alert("Form Submitted!")}}},l=o,n=r("2877"),c=r("6544"),i=r.n(c),d=r("8336"),u=r("99d9"),v=r("ac7c"),m=r("62ad"),f=r("a523"),p=r("4bd4"),b=r("0fd9"),y=r("2fa4"),x=r("8654"),g=Object(n["a"])(l,a,s,!1,null,null,null);t["default"]=g.exports;i()(g,{VBtn:d["a"],VCardActions:u["a"],VCheckbox:v["a"],VCol:m["a"],VContainer:f["a"],VForm:p["a"],VRow:b["a"],VSpacer:y["a"],VTextField:x["a"]})}}]);
//# sourceMappingURL=chunk-2d0af2ab.42f8189c.js.map