(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01e567ac"],{a523:function(t,e,a){"use strict";a("4de4"),a("d3b7"),a("b64b"),a("2ca0"),a("99af"),a("20f6"),a("4b85"),a("498a"),a("a15b");var s=a("2b0e");function i(t){return s["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var s=a.props,i=a.data,r=a.children;i.staticClass="".concat(t," ").concat(i.staticClass||"").trim();var d=i.attrs;if(d){i.attrs={};var o=Object.keys(d).filter((function(t){if("slot"===t)return!1;var e=d[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}));o.length&&(i.staticClass+=" ".concat(o.join(" ")))}return s.id&&(i.domProps=i.domProps||{},i.domProps.id=s.id),e(s.tag,i,r)}})}var r=a("d9f7");e["a"]=i("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,s=e.props,i=e.data,d=e.children,o=i.attrs;return o&&(i.attrs={},a=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}))),s.id&&(i.domProps=i.domProps||{},i.domProps.id=s.id),t(s.tag,Object(r["a"])(i,{staticClass:"container",class:Array({"container--fluid":s.fluid}).concat(a||[])}),d)}})},de1f:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{id:"grid",fluid:"",tag:"section"}},[a("base-v-component",{attrs:{heading:"Grid System",link:"components/grid"}}),a("v-row",{staticClass:"text-center"},[a("base-subheading",{staticClass:"pb-0 pl-3 mt-5",attrs:{subheading:"XS Grid",text:"Always Horizontal"}}),t._l(3,(function(e){return a("v-col",{key:"cols-"+e,staticClass:"pt-0",attrs:{cols:"4"}},[a("v-card",{staticClass:"mt-0"},[a("v-card-text",{staticClass:"red--text text--darken-4"},[t._v(" col-4 ")])],1)],1)})),a("base-subheading",{staticClass:"pb-0 pl-3 mt-5",attrs:{subheading:"SM Grid",text:"Collapsed at 600px"}}),t._l(3,(function(e){return a("v-col",{key:"sm-"+e,staticClass:"pt-0",attrs:{cols:"12",sm:"4"}},[a("v-card",{staticClass:"mt-0"},[a("v-card-text",{staticClass:"red--text text--darken-4"},[t._v(" col-sm-4 ")])],1)],1)})),a("base-subheading",{staticClass:"pb-0 pl-3 mt-5",attrs:{subheading:"MD Grid",text:"Collapsed at 960px"}}),t._l(3,(function(e){return a("v-col",{key:"md-"+e,staticClass:"pt-0",attrs:{cols:"12",md:"4"}},[a("v-card",{staticClass:"mt-0"},[a("v-card-text",{staticClass:"red--text text--darken-4"},[t._v(" col-md-4 ")])],1)],1)})),a("base-subheading",{staticClass:"pb-0 pl-3 mt-5",attrs:{subheading:"LG Grid",text:"Collapsed at 1280px"}}),t._l(3,(function(e){return a("v-col",{key:"lg-"+e,staticClass:"pt-0",attrs:{cols:"12",lg:"4"}},[a("v-card",{staticClass:"mt-0"},[a("v-card-text",{staticClass:"red--text text--darken-4"},[t._v(" col-lg-4 ")])],1)],1)})),a("base-subheading",{staticClass:"pb-0 pl-3 mt-5",attrs:{subheading:"XL Grid",text:"Collapsed at 1920px"}}),t._l(3,(function(e){return a("v-col",{key:"xl-"+e,staticClass:"pt-0",attrs:{cols:"12",xl:"4"}},[a("v-card",{staticClass:"mt-0"},[a("v-card-text",{staticClass:"red--text text--darken-4"},[t._v(" col-xl-4 ")])],1)],1)})),a("base-subheading",{staticClass:"pb-0 pl-3 mt-5",attrs:{subheading:"Mixed Grid",text:"Showing different sizes on different screens"}}),t._l(4,(function(e){return a("v-col",{key:"mixed-"+e,staticClass:"pt-0",attrs:{lg:"3",sm:"6"}},[a("v-card",{staticClass:"mt-0"},[a("v-card-text",{staticClass:"red--text text--darken-4"},[t._v(" col-xl-4 ")])],1)],1)}))],2),a("v-row",{staticClass:"text-center"},[a("base-subheading",{staticClass:"pb-0 pl-3 mt-5",attrs:{subheading:"Offset Grid",text:"Adding some space when neede"}}),a("v-col",{staticClass:"pt-0",attrs:{md:"3"}},[a("v-card",{staticClass:"mt-0"},[a("v-card-text",{staticClass:"red--text text--darken-4"},[t._v(" col-md-3 ")])],1)],1),a("v-col",{staticClass:"ml-auto",attrs:{md:"3"}},[a("v-card",{staticClass:"mt-0"},[a("v-card-text",{staticClass:"red--text text--darken-4"},[t._v(" col-md-4 ml-auto mr-auto ")])],1)],1)],1),a("v-row",{staticClass:"text-center"},t._l(2,(function(e){return a("v-col",{key:"offset-"+e,staticClass:"ml-auto mr-auto",attrs:{md:"4"}},[a("v-card",{staticClass:"mt-0"},[a("v-card-text",{staticClass:"red--text text--darken-4"},[t._v(" col-md-4 ml-auto mr-auto ")])],1)],1)})),1),a("v-row",{staticClass:"text-center mb-12"},[a("v-col",{staticClass:"ml-auto mr-auto",attrs:{md:"6"}},[a("v-card",{staticClass:"mt-0"},[a("v-card-text",{staticClass:"red--text text--darken-4"},[t._v(" col-md-6 ml-auto mr-auto ")])],1)],1)],1),a("v-row",[a("paragraph-heading",{staticClass:"text-center pb-0"},[a("h4",{staticClass:"font-weight-light"},[t._v(" Paragraphs ")])]),a("v-col",{attrs:{cols:"12 pt-0"}},[a("v-card",[a("v-container",{attrs:{fluid:""}},[a("v-row",[a("v-col",{attrs:{cols:"12",md:"6"}},[a("paragraph-heading",[t._v("Some Title Here")]),a("v-card-text",{staticClass:"font-weight-light"},[t._v(' One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What\'s happened to me?" he thought. ')])],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("paragraph-heading",[t._v("Another Title Here")]),a("v-card-text",{staticClass:"font-weight-light"},[t._v(' One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. His many legs, pitifully thin compared with the size of the rest of him, waved about helplessly as he looked. "What\'s happened to me?" he thought. ')])],1),a("v-col",{attrs:{cols:"12",md:"4"}},[a("paragraph-heading",[t._v("Some Title Here")]),a("v-card-text",{staticClass:"font-weight-light"},[t._v(" One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. ")])],1),a("v-col",{attrs:{cols:"12",md:"4"}},[a("paragraph-heading",[t._v("Another Title Here")]),a("v-card-text",{staticClass:"font-weight-light"},[t._v(" One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. ")])],1),a("v-col",{attrs:{cols:"12",md:"4"}},[a("paragraph-heading",[t._v("Another Title Here")]),a("v-card-text",{staticClass:"font-weight-light"},[t._v(" One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. ")])],1),a("v-col",{attrs:{cols:"12",md:"4"}},[a("paragraph-heading",[t._v("Some Title Here")]),a("v-card-text",{staticClass:"font-weight-light"},[t._v(" One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. ")])],1),a("v-col",{attrs:{cols:"12",md:"8"}},[a("paragraph-heading",[t._v("Another Title Here")]),a("v-card-text",{staticClass:"font-weight-light"},[t._v(" One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. One morning, when Gregor Samsa woke from troubled dreams, he found himself transformed in his bed into a horrible vermin. He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment. ")])],1)],1)],1)],1)],1)],1)],1)},i=[],r={name:"DashboardGrid",components:{ParagraphHeading:{render:function(t){return t("div",{class:"headline font-weight-light col cols-12"},this.$slots.default)}}}},d=r,o=a("2877"),l=a("6544"),n=a.n(l),c=a("b0af"),h=a("99d9"),m=a("62ad"),f=a("a523"),v=a("0fd9"),b=Object(o["a"])(d,s,i,!1,null,null,null);e["default"]=b.exports;n()(b,{VCard:c["a"],VCardText:h["b"],VCol:m["a"],VContainer:f["a"],VRow:v["a"]})}}]);
//# sourceMappingURL=chunk-01e567ac.7497f5fd.js.map