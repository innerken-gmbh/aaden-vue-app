(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-699ef3d1"],{"3f43":function(t,e,a){},a523:function(t,e,a){"use strict";a("4de4"),a("d3b7"),a("b64b"),a("2ca0"),a("99af"),a("20f6"),a("4b85"),a("498a"),a("a15b");var i=a("2b0e");function n(t){return i["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var i=a.props,n=a.data,s=a.children;n.staticClass="".concat(t," ").concat(n.staticClass||"").trim();var o=n.attrs;if(o){n.attrs={};var r=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}));r.length&&(n.staticClass+=" ".concat(r.join(" ")))}return i.id&&(n.domProps=n.domProps||{},n.domProps.id=i.id),e(i.tag,n,s)}})}var s=a("d9f7");e["a"]=n("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,i=e.props,n=e.data,o=e.children,r=n.attrs;return r&&(n.attrs={},a=Object.keys(r).filter((function(t){if("slot"===t)return!1;var e=r[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}))),i.id&&(n.domProps=n.domProps||{},n.domProps.id=i.id),t(i.tag,Object(s["a"])(n,{staticClass:"container",class:Array({"container--fluid":i.fluid}).concat(a||[])}),o)}})},aaf8:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height justify-center",attrs:{id:"register",tag:"section"}},[a("v-row",{attrs:{justify:"center"}},[a("v-col",{attrs:{cols:"12",md:"9"}},[a("v-slide-y-transition",{attrs:{appear:""}},[a("v-card",{staticClass:"pa-3 pa-md-5 mx-auto",attrs:{light:""}},[a("pages-heading",{staticClass:"text-center text-h2"},[t._v(" Register ")]),a("v-row",[a("v-col",{attrs:{cols:"12",md:"6"}},[a("v-row",{attrs:{"no-gutters":""}},t._l(t.sections,(function(e,i){return a("v-col",{key:i,attrs:{cols:"12"}},[a("v-list-item",{attrs:{"three-line":""}},[a("v-list-item-icon",{staticClass:"mr-4 mt-5 mt-md-4"},[a("v-icon",{attrs:{color:e.iconColor,large:t.$vuetify.breakpoint.mdAndUp},domProps:{textContent:t._s(e.icon)}})],1),a("v-list-item-content",[a("v-list-item-title",{staticClass:"font-weight-light mb-4 mt-3",domProps:{textContent:t._s(e.title)}}),a("v-list-item-subtitle",{domProps:{textContent:t._s(e.text)}})],1)],1)],1)})),1)],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("div",{staticClass:"text-center"},[t._l(t.socials,(function(e,i){return a("v-btn",{key:i,staticClass:"my-2 mr-1",attrs:{color:e.iconColor,dark:"",depressed:"",fab:"",small:""}},[a("v-icon",{domProps:{textContent:t._s(e.icon)}})],1)})),a("div",{staticClass:"my-2"}),a("div",{staticClass:"text-center grey--text text-body-1 font-weight-light"},[t._v(" Or Be Classical ")]),a("v-text-field",{attrs:{color:"secondary",label:"First Name...","prepend-icon":"mdi-face"}}),a("v-text-field",{attrs:{color:"secondary",label:"Email...","prepend-icon":"mdi-email"}}),a("v-text-field",{staticClass:"mb-8",attrs:{color:"secondary",label:"Password...","prepend-icon":"mdi-lock-outline"}}),a("v-checkbox",{attrs:{"input-value":!0,color:"secondary"},scopedSlots:t._u([{key:"label",fn:function(){return[a("span",{staticClass:"text-no-wrap"},[t._v("I agree to the ")]),a("a",{staticClass:"secondary--text ml-6 ml-sm-0",attrs:{href:"#"}},[t._v(" terms and conditions ")]),t._v(". ")]},proxy:!0}])}),a("pages-btn",{attrs:{color:"success"}},[t._v(" Get Started ")])],2)])],1)],1)],1)],1)],1)],1)},n=[],s=(a("d3b7"),a("3ca3"),a("ddb0"),{name:"PagesRegister",components:{PagesBtn:function(){return a.e("chunk-2d0c4bbd").then(a.bind(null,"3ba9"))},PagesHeading:function(){return a.e("chunk-2d0b2927").then(a.bind(null,"254b"))}},data:function(){return{sections:[{icon:"mdi-chart-timeline-variant",iconColor:"primary",title:"Marketing",text:"We've created the marketing campaign of the website. It was a very interesting collaboration."},{icon:"mdi-code-tags",iconColor:"secondary",title:"Fully Coded in HTML5",text:"We've developed the website with HTML5 and CSS3. The client has access to the code using GitHub."},{icon:"mdi-account-multiple",iconColor:"cyan",title:"Built Audience",text:"There is also a Fully Customizable CMS Admin Dashboard for this product."}],socials:[{href:"#",icon:"mdi-twitter",iconColor:"#1DA1F2"},{href:"#",icon:"mdi-dribbble",iconColor:"#ea4c89"},{href:"#",icon:"mdi-facebook",iconColor:"#3B5998"}]}}}),o=s,r=(a("fb8ff"),a("2877")),c=a("6544"),l=a.n(c),d=a("8336"),u=a("b0af"),f=a("ac7c"),m=a("62ad"),p=a("a523"),v=a("132d"),b=a("da13"),h=a("5d23"),g=a("34c3"),C=a("0fd9"),y=a("0789"),x=a("8654"),w=Object(r["a"])(o,i,n,!1,null,null,null);e["default"]=w.exports;l()(w,{VBtn:d["a"],VCard:u["a"],VCheckbox:f["a"],VCol:m["a"],VContainer:p["a"],VIcon:v["a"],VListItem:b["a"],VListItemContent:h["b"],VListItemIcon:g["a"],VListItemSubtitle:h["c"],VListItemTitle:h["d"],VRow:C["a"],VSlideYTransition:y["g"],VTextField:x["a"]})},fb8ff:function(t,e,a){"use strict";a("3f43")}}]);
//# sourceMappingURL=chunk-699ef3d1.2886fd99.js.map