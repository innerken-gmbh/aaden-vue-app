(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3957ae82"],{"17b3":function(t,e,n){},"7e58":function(t,e,n){},e5fe:function(t,e,n){"use strict";n.r(e);var o=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{id:"buttons",fluid:"",tag:"section"}},[n("base-v-component",{attrs:{heading:"Buttons",link:"components/buttons"}}),n("v-card",[n("v-card-text",{staticClass:"pt-0"},[n("v-row",[n("v-col",{attrs:{cols:"12",md:"6"}},[n("base-subheading",[n("h5",{staticClass:"font-weight-light"},[t._v(" Pick your Color ")])]),n("div",t._l(t.colors,(function(e,o){return n("v-btn",{key:o,staticClass:"ma-1",attrs:{color:"default"===e?void 0:e,elevation:"1"}},[t._v(" "+t._s(e)+" ")])})),1)],1),n("v-col",{staticClass:"pt-0",attrs:{cols:"12",md:"6"}},[n("base-subheading",[n("h5",{staticClass:"font-weight-light"},[t._v(" Buttons with Label ")])]),n("div",[t._l(["left","right"],(function(e,o){return n("v-btn",{key:o,staticClass:"ma-1",attrs:{elevation:"1"}},[n("v-icon",{class:"right"===e&&"order-last",attrs:{left:"left"===e,right:"right"===e},domProps:{textContent:t._s(t.icons[e])}}),t._v(" "+t._s(e)+" ")],1)})),t._l(t.colors.slice(2),(function(e,o){return n("v-btn",{key:"btn-"+o,staticClass:"ma-1",attrs:{color:"default"===e?void 0:e,elevation:"1"}},[n("v-icon",{attrs:{left:""},domProps:{textContent:t._s(t.icons[e])}}),t._v(" "+t._s(e)+" ")],1)}))],2)],1),n("v-col",{attrs:{cols:"12",md:"6"}},[n("base-subheading",[n("h5",{staticClass:"font-weight-light"},[t._v(" Pick your Size ")])]),t._l(3,(function(e){return n("v-btn",{key:e,staticClass:"ma-1",attrs:{large:3===e,small:1===e,color:"secondary",elevation:"1"}},[t._v(" "+t._s(1===e?"small":2===e?"regular":"large")+" ")])}))],2),n("v-col",{attrs:{cols:"12",md:"6"}},[n("base-subheading",[n("h5",{staticClass:"font-weight-light"},[t._v(" Pick your Style ")])]),n("v-btn",{staticClass:"ma-1",attrs:{color:"secondary"}},[t._v(" Default ")]),n("v-btn",{staticClass:"ma-1",attrs:{color:"secondary",elevation:"1",rounded:""}},[t._v(" Rounded ")]),n("v-btn",{staticClass:"ma-1",attrs:{color:"secondary",elevation:"1",rounded:""}},[n("v-icon",{attrs:{left:""}},[t._v(" mdi-heart ")]),t._v(" With Icon ")],1),n("v-btn",{staticClass:"ma-1",attrs:{color:"secondary",elevation:"1",fab:"",small:""}},[n("v-icon",[t._v(" mdi-heart ")])],1),n("v-btn",{staticClass:"ma-1",attrs:{color:"secondary",text:""}},[t._v(" Simple ")])],1),n("v-col",{attrs:{cols:"12",md:"6"}},[n("base-subheading",[n("h5",{staticClass:"font-weight-light"},[t._v(" Pagination ")])]),n("v-pagination",{staticClass:"justify-start",attrs:{length:5,value:1,circle:""}}),n("v-pagination",{staticClass:"justify-start",attrs:{length:3,value:2,circle:"","next-icon":"mdi-menu-right","prev-icon":"mdi-menu-left"}})],1),n("v-col",{attrs:{cols:"12",md:"6"}},[n("base-subheading",[n("h5",{staticClass:"font-weight-light"},[t._v(" Button Group ")])]),n("v-sheet",[n("v-btn-toggle",{attrs:{color:"teal"}},t._l(["left","middle","right"],(function(e){return n("v-btn",{key:e},[t._v(" "+t._s(e)+" ")])})),1)],1),n("div",{staticClass:"my-6"}),n("v-btn-toggle",{attrs:{color:"teal",rounded:""}},t._l(4,(function(e){return n("v-btn",{key:e},[t._v(" "+t._s(e)+" ")])})),1),n("div",{staticClass:"my-2"}),n("v-btn-toggle",{attrs:{color:"teal",rounded:""}},t._l(3,(function(e){return n("v-btn",{key:e},[t._v(" "+t._s(e+4)+" ")])})),1)],1),t._l(t.social,(function(e,o){return[n("v-col",{key:o,staticClass:"py-1",attrs:{cols:"12"}},[0===o?n("base-subheading",{key:"heading-"+o},[n("h5",{staticClass:"font-weight-light"},[t._v(" Social buttons ")])]):t._e(),n("v-row",{attrs:{dense:""}},[n("v-col",{attrs:{cols:"auto",md:"4",sm:"5"}},[n("v-btn",{attrs:{color:e.color,dark:"",elevation:"1"}},[n("v-icon",{attrs:{left:""},domProps:{textContent:t._s(e.icon)}}),t._v(" "+t._s(e.text)+" ")],1)],1),n("v-col",{attrs:{cols:"auto",md:"1",sm:"1"}},[n("v-btn",{attrs:{color:e.color,dark:"",elevation:"1","max-width":"41","min-width":"0"}},[n("v-icon",{domProps:{textContent:t._s(e.icon)}})],1)],1),n("v-col",{attrs:{cols:"auto",md:"1",sm:"1"}},[n("v-btn",{attrs:{color:e.color,dark:"",elevation:"1",fab:"","min-width":"0",small:""}},[n("v-icon",{domProps:{textContent:t._s(e.icon)}})],1)],1),n("v-col",{attrs:{cols:"auto",md:"1",sm:"1"}},[n("v-btn",{attrs:{color:e.color,dark:"",icon:"","min-width":"0"}},[n("v-icon",{attrs:{color:e.color},domProps:{textContent:t._s(e.icon)}})],1)],1),n("v-col",{attrs:{cols:"auto",md:"3",sm:"4"}},[n("v-btn",{attrs:{color:e.color,dark:"",text:""}},[n("v-icon",{attrs:{color:e.color,left:""},domProps:{textContent:t._s(e.icon)}}),t._v(" "+t._s(e.text)+" ")],1)],1)],1)],1)]}))],2)],1)],1)],1)},i=[],s={name:"DashboardButtons",data:function(){return{colors:["default","secondary","info","success","warning","error"],icons:{left:"mdi-chevron-left",right:"mdi-chevron-right",info:"mdi-exclamation",success:"mdi-check",warning:"mdi-alert",error:"mdi-close"},social:[{color:"#55ACEE",icon:"mdi-twitter",text:"Connect with Twitter"},{color:"#3B5998",icon:"mdi-facebook",text:"Share - 2.2K"},{color:"#DD4b39",icon:"mdi-google-plus",text:"Share on Google+"},{color:"#0976B4",icon:"mdi-linkedin",text:"Connect with LinkedIn"},{color:"#CC2127",icon:"mdi-pinterest",text:"Pint It - 212"},{color:"#E52D27",icon:"mdi-youtube",text:"View on Youtube"},{color:"#35465C",icon:"mdi-tumblr",text:"Repost"},{color:"#333333",icon:"mdi-github-circle",text:"Connect with Github"},{color:"#1769FF",icon:"mdi-behance",text:"Follow Us"},{color:"#EA4C89",icon:"mdi-dribbble",text:"Follow us on Dribbble"},{color:"#FF4500",icon:"mdi-reddit",text:"Repost - 232"}]}}},a=s,r=n("2877"),l=n("6544"),c=n.n(l),u=n("8336"),h=n("5530"),d=(n("7e58"),n("604c")),v=d["a"].extend({name:"button-group",provide:function(){return{btnToggle:this}},computed:{classes:function(){return d["a"].options.computed.classes.call(this)}},methods:{genData:d["a"].options.methods.genData}}),g=n("a9ad"),m=n("58df"),b=Object(m["a"])(v,g["a"]).extend({name:"v-btn-toggle",props:{backgroundColor:String,borderless:Boolean,dense:Boolean,group:Boolean,rounded:Boolean,shaped:Boolean,tile:Boolean},computed:{classes:function(){return Object(h["a"])(Object(h["a"])({},v.options.computed.classes.call(this)),{},{"v-btn-toggle":!0,"v-btn-toggle--borderless":this.borderless,"v-btn-toggle--dense":this.dense,"v-btn-toggle--group":this.group,"v-btn-toggle--rounded":this.rounded,"v-btn-toggle--shaped":this.shaped,"v-btn-toggle--tile":this.tile},this.themeClasses)}},methods:{genData:function(){var t=this.setTextColor(this.color,Object(h["a"])({},v.options.methods.genData.call(this)));return this.group?t:this.setBackgroundColor(this.backgroundColor,t)}}}),f=n("b0af"),p=n("99d9"),_=n("62ad"),C=n("a523"),x=n("132d"),y=(n("99af"),n("d81d"),n("a9e3"),n("d3b7"),n("25f0"),n("2909")),w=(n("17b3"),n("9d26")),k=n("dc22"),B=n("de2c"),I=n("7560"),j=Object(m["a"])(g["a"],Object(B["a"])({onVisible:["init"]}),I["a"]).extend({name:"v-pagination",directives:{Resize:k["a"]},props:{circle:Boolean,disabled:Boolean,length:{type:Number,default:0,validator:function(t){return t%1===0}},nextIcon:{type:String,default:"$next"},prevIcon:{type:String,default:"$prev"},totalVisible:[Number,String],value:{type:Number,default:0}},data:function(){return{maxButtons:0,selected:null}},computed:{classes:function(){return Object(h["a"])({"v-pagination":!0,"v-pagination--circle":this.circle,"v-pagination--disabled":this.disabled},this.themeClasses)},items:function(){var t=parseInt(this.totalVisible,10),e=Math.min(Math.max(0,t)||this.length,Math.max(0,this.maxButtons)||this.length,this.length);if(this.length<=e)return this.range(1,this.length);var n=e%2===0?1:0,o=Math.floor(e/2),i=this.length-o+1+n;if(this.value>o&&this.value<i){var s=this.value-o+2,a=this.value+o-2-n;return[1,"..."].concat(Object(y["a"])(this.range(s,a)),["...",this.length])}if(this.value===o){var r=this.value+o-1-n;return[].concat(Object(y["a"])(this.range(1,r)),["...",this.length])}if(this.value===i){var l=this.value-o+1;return[1,"..."].concat(Object(y["a"])(this.range(l,this.length)))}return[].concat(Object(y["a"])(this.range(1,o)),["..."],Object(y["a"])(this.range(i,this.length)))}},watch:{value:function(){this.init()}},mounted:function(){this.init()},methods:{init:function(){var t=this;this.selected=null,this.$nextTick(this.onResize),setTimeout((function(){return t.selected=t.value}),100)},onResize:function(){var t=this.$el&&this.$el.parentElement?this.$el.parentElement.clientWidth:window.innerWidth;this.maxButtons=Math.floor((t-96)/42)},next:function(t){t.preventDefault(),this.$emit("input",this.value+1),this.$emit("next")},previous:function(t){t.preventDefault(),this.$emit("input",this.value-1),this.$emit("previous")},range:function(t,e){var n=[];t=t>0?t:1;for(var o=t;o<=e;o++)n.push(o);return n},genIcon:function(t,e,n,o){return t("li",[t("button",{staticClass:"v-pagination__navigation",class:{"v-pagination__navigation--disabled":n},attrs:{type:"button"},on:n?{}:{click:o}},[t(w["a"],[e])])])},genItem:function(t,e){var n=this,o=e===this.value&&(this.color||"primary");return t("button",this.setBackgroundColor(o,{staticClass:"v-pagination__item",class:{"v-pagination__item--active":e===this.value},attrs:{type:"button"},on:{click:function(){return n.$emit("input",e)}}}),[e.toString()])},genItems:function(t){var e=this;return this.items.map((function(n,o){return t("li",{key:o},[isNaN(Number(n))?t("span",{class:"v-pagination__more"},[n.toString()]):e.genItem(t,n)])}))}},render:function(t){var e=[this.genIcon(t,this.$vuetify.rtl?this.nextIcon:this.prevIcon,this.value<=1,this.previous),this.genItems(t),this.genIcon(t,this.$vuetify.rtl?this.prevIcon:this.nextIcon,this.value>=this.length,this.next)];return t("ul",{directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}],class:this.classes},e)}}),V=n("0fd9"),$=n("8dd9"),O=Object(r["a"])(a,o,i,!1,null,null,null);e["default"]=O.exports;c()(O,{VBtn:u["a"],VBtnToggle:b,VCard:f["a"],VCardText:p["c"],VCol:_["a"],VContainer:C["a"],VIcon:x["a"],VPagination:j,VRow:V["a"],VSheet:$["a"]})}}]);
//# sourceMappingURL=chunk-3957ae82.a6aee118.js.map