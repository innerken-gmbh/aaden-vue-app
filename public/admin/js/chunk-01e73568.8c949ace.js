(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01e73568"],{a523:function(t,a,e){"use strict";e("4de4"),e("d3b7"),e("b64b"),e("2ca0"),e("99af"),e("20f6"),e("4b85"),e("498a"),e("a15b");var n=e("2b0e");function i(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(a,e){var n=e.props,i=e.data,s=e.children;i.staticClass="".concat(t," ").concat(i.staticClass||"").trim();var r=i.attrs;if(r){i.attrs={};var o=Object.keys(r).filter((function(t){if("slot"===t)return!1;var a=r[t];return t.startsWith("data-")?(i.attrs[t]=a,!1):a||"string"===typeof a}));o.length&&(i.staticClass+=" ".concat(o.join(" ")))}return n.id&&(i.domProps=i.domProps||{},i.domProps.id=n.id),a(n.tag,i,s)}})}var s=e("d9f7");a["a"]=i("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,a){var e,n=a.props,i=a.data,r=a.children,o=i.attrs;return o&&(i.attrs={},e=Object.keys(o).filter((function(t){if("slot"===t)return!1;var a=o[t];return t.startsWith("data-")?(i.attrs[t]=a,!1):a||"string"===typeof a}))),n.id&&(i.domProps=i.domProps||{},i.domProps.id=n.id),t(n.tag,Object(s["a"])(i,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(e||[])}),r)}})},bda7:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{staticClass:"fill-height justify-center",attrs:{id:"pricing",tag:"section"}},[e("v-row",{staticClass:"text-center",attrs:{align:"center",justify:"center"}},[e("v-col",{staticClass:"mb-10",attrs:{cols:"12"}},[e("pages-heading",{staticClass:"mb-12"},[t._v(" Pick the best plan for you ")]),e("div",{staticClass:"text-h4 font-weight-light grey--text text--lighten-2"},[t._v(" You have Free Unlimited Updates and Premium Support on "),e("br",{staticClass:"hidden-sm-and-down"}),t._v("each package. ")])],1),t._l(t.plans,(function(a,n){return[e("v-col",{key:n,staticClass:"d-flex",attrs:{cols:"12",md:"3",sm:"6"}},[e("pages-plan-card",{attrs:{plan:a}})],1),1===n&&t.$vuetify.breakpoint.smAndDown&&n+1!==t.plans.length?e("v-col",{key:"divider-"+n,staticClass:"pa-6",attrs:{cols:"12"}},[e("v-divider")],1):t._e()]}))],2)],1)},i=[],s=(e("d3b7"),e("3ca3"),e("ddb0"),{name:"PagesPricing",components:{PagesHeading:function(){return e.e("chunk-2d0b2927").then(e.bind(null,"254b"))},PagesPlanCard:function(){return e.e("chunk-446ee19c").then(e.bind(null,"5d13"))}},data:function(){return{plans:[{heading:"Aaden Flux",icon:"mdi-sofa",title:"€29/Month",text:"Use Cloud Features for Small shops"},{best:!0,heading:"Aaden Classical",icon:"mdi-home",title:"€1499",text:"This is good if your company size is between 2 and 10 Persons."},{heading:"Aaden Pro",icon:"mdi-domain",title:"€1999",text:"This is good if your company size is between 11 and 99 Persons."},{heading:"Aaden Utla",icon:"mdi-bank",title:"€2499",text:"This is good if your company size is 99+ or greater Persons."}]}}}),r=s,o=e("2877"),d=e("6544"),c=e.n(d),l=e("62ad"),u=e("a523"),f=e("ce7e"),p=e("0fd9"),g=Object(o["a"])(r,n,i,!1,null,null,null);a["default"]=g.exports;c()(g,{VCol:l["a"],VContainer:u["a"],VDivider:f["a"],VRow:p["a"]})}}]);
//# sourceMappingURL=chunk-01e73568.8c949ace.js.map