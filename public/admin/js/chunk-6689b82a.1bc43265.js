(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6689b82a","chunk-2d20862b"],{1574:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-footer",{attrs:{id:"pages-core-footer",absolute:"",color:"transparent",dark:""}},[i("v-container",[i("v-row",{attrs:{align:"center","no-gutters":""}},[t._l(t.links,(function(e,a){return i("v-col",{key:a,staticClass:"text-center",attrs:{cols:"6",md:"auto"}},[i("a",{staticClass:"mr-0",attrs:{href:e.href,rel:"noopener",target:"_blank"},domProps:{textContent:t._s(e.text)}})])})),i("v-spacer",{staticClass:"hidden-sm-and-down"}),i("v-col",{attrs:{cols:"12",md:"auto"}},[i("div",{staticClass:"body-1 font-weight-light pt-6 pt-md-0 text-center"},[t._v(" © 2020, made with "),i("v-icon",{attrs:{size:"20"}},[t._v(" mdi-heart ")]),t._v(" by InnerKen GmbH ")],1)])],2)],1)],1)},n=[],o={name:"PagesCoreFooter",data:function(){return{links:[{href:"https://Innerken.com",text:"About InnerKen"},{href:"https://aaden.online",text:"Project Aaden"}]}}},s=o,r=(i("b86b"),i("2877")),c=i("6544"),p=i.n(c),l=i("62ad"),u=i("a523"),d=(i("a9e3"),i("c7cd"),i("5530")),h=(i("b5b6"),i("8dd9")),f=i("3a66"),v=i("d10f"),b=i("58df"),m=i("80d2"),g=Object(b["a"])(h["a"],Object(f["a"])("footer",["height","inset"]),v["a"]).extend({name:"v-footer",props:{height:{default:"auto",type:[Number,String]},inset:Boolean,padless:Boolean,tag:{type:String,default:"footer"}},computed:{applicationProperty:function(){return this.inset?"insetFooter":"footer"},classes:function(){return Object(d["a"])(Object(d["a"])({},h["a"].options.computed.classes.call(this)),{},{"v-footer--absolute":this.absolute,"v-footer--fixed":!this.absolute&&(this.app||this.fixed),"v-footer--padless":this.padless,"v-footer--inset":this.inset})},computedBottom:function(){if(this.isPositioned)return this.app?this.$vuetify.application.bottom:0},computedLeft:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.left:0},computedRight:function(){if(this.isPositioned)return this.app&&this.inset?this.$vuetify.application.right:0},isPositioned:function(){return Boolean(this.absolute||this.fixed||this.app)},styles:function(){var t=parseInt(this.height);return Object(d["a"])(Object(d["a"])({},h["a"].options.computed.styles.call(this)),{},{height:isNaN(t)?t:Object(m["h"])(t),left:Object(m["h"])(this.computedLeft),right:Object(m["h"])(this.computedRight),bottom:Object(m["h"])(this.computedBottom)})}},methods:{updateApplication:function(){var t=parseInt(this.height);return isNaN(t)?this.$el?this.$el.clientHeight:0:t}},render:function(t){var e=this.setBackgroundColor(this.color,{staticClass:"v-footer",class:this.classes,style:this.styles});return t(this.tag,e,this.$slots.default)}}),y=i("132d"),j=i("0fd9"),P=i("2fa4"),O=Object(r["a"])(s,a,n,!1,null,null,null);e["default"]=O.exports;p()(O,{VCol:l["a"],VContainer:u["a"],VFooter:g,VIcon:y["a"],VRow:j["a"],VSpacer:P["a"]})},"3a66":function(t,e,i){"use strict";i.d(e,"a",(function(){return o}));var a=i("fe6c"),n=i("58df");function o(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(n["a"])(Object(a["b"])(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty:function(){return t}},watch:{app:function(t,e){e?this.removeApplication(!0):this.callUpdate()},applicationProperty:function(t,e){this.$vuetify.application.unregister(this._uid,e)}},activated:function(){this.callUpdate()},created:function(){for(var t=0,i=e.length;t<i;t++)this.$watch(e[t],this.callUpdate);this.callUpdate()},mounted:function(){this.callUpdate()},deactivated:function(){this.removeApplication()},destroyed:function(){this.removeApplication()},methods:{callUpdate:function(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:function(){return 0}}})}},4321:function(t,e,i){},a523:function(t,e,i){"use strict";i("99af"),i("4de4"),i("b64b"),i("2ca0"),i("20f6"),i("4b85"),i("a15b"),i("498a");var a=i("2b0e");function n(t){return a["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,i){var a=i.props,n=i.data,o=i.children;n.staticClass="".concat(t," ").concat(n.staticClass||"").trim();var s=n.attrs;if(s){n.attrs={};var r=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}));r.length&&(n.staticClass+=" ".concat(r.join(" ")))}return a.id&&(n.domProps=n.domProps||{},n.domProps.id=a.id),e(a.tag,n,o)}})}var o=i("d9f7");e["a"]=n("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var i,a=e.props,n=e.data,s=e.children,r=n.attrs;return r&&(n.attrs={},i=Object.keys(r).filter((function(t){if("slot"===t)return!1;var e=r[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}))),a.id&&(n.domProps=n.domProps||{},n.domProps.id=a.id),t(a.tag,Object(o["a"])(n,{staticClass:"container",class:Array({"container--fluid":a.fluid}).concat(i||[])}),s)}})},b5b6:function(t,e,i){},b86b:function(t,e,i){"use strict";var a=i("4321"),n=i.n(a);n.a}}]);
//# sourceMappingURL=chunk-6689b82a.1bc43265.js.map