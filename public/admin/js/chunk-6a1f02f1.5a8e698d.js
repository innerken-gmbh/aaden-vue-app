(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6a1f02f1"],{"2a7f":function(t,e,i){"use strict";i.d(e,"a",(function(){return s})),i.d(e,"b",(function(){return r}));var o=i("71d9"),n=i("80d2"),r=Object(n["i"])("v-toolbar__title"),s=Object(n["i"])("v-toolbar__items");o["a"]},"3a66":function(t,e,i){"use strict";i.d(e,"a",(function(){return r}));var o=i("fe6c"),n=i("58df");function r(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(n["a"])(Object(o["b"])(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty:function(){return t}},watch:{app:function(t,e){e?this.removeApplication(!0):this.callUpdate()},applicationProperty:function(t,e){this.$vuetify.application.unregister(this._uid,e)}},activated:function(){this.callUpdate()},created:function(){for(var t=0,i=e.length;t<i;t++)this.$watch(e[t],this.callUpdate);this.callUpdate()},mounted:function(){this.callUpdate()},deactivated:function(){this.removeApplication()},destroyed:function(){this.removeApplication()},methods:{callUpdate:function(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:function(){return 0}}})}},"5e23":function(t,e,i){},"71d9":function(t,e,i){"use strict";i("0481"),i("4160"),i("4069"),i("a9e3");var o=i("3835"),n=i("5530"),r=(i("5e23"),i("8dd9")),s=i("adda"),a=i("80d2"),l=i("d9bd");e["a"]=r["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"}},data:function(){return{isExtended:!1}},computed:{computedHeight:function(){var t=this.computedContentHeight;if(!this.isExtended)return t;var e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight:function(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes:function(){return Object(n["a"])(Object(n["a"])({},r["a"].options.computed.classes.call(this)),{},{"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent})},isCollapsed:function(){return this.collapse},isProminent:function(){return this.prominent},styles:function(){return Object(n["a"])(Object(n["a"])({},this.measurableStyles),{},{height:Object(a["g"])(this.computedHeight)})}},created:function(){var t=this,e=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];e.forEach((function(e){var i=Object(o["a"])(e,2),n=i[0],r=i[1];t.$attrs.hasOwnProperty(n)&&Object(l["a"])(n,r,t)}))},methods:{genBackground:function(){var t={height:Object(a["g"])(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(s["a"],{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent:function(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(a["g"])(this.computedContentHeight)}},Object(a["s"])(this))},genExtension:function(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(a["g"])(this.extensionHeight)}},Object(a["s"])(this,"extension"))}},render:function(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;var e=[this.genContent()],i=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,i,e)}})},7496:function(t,e,i){"use strict";var o=i("5530"),n=(i("df86"),i("7560")),r=i("58df");e["a"]=Object(r["a"])(n["a"]).extend({name:"v-app",props:{dark:{type:Boolean,default:void 0},id:{type:String,default:"app"},light:{type:Boolean,default:void 0}},computed:{isDark:function(){return this.$vuetify.theme.dark}},beforeCreate:function(){if(!this.$vuetify||this.$vuetify===this.$root)throw new Error("Vuetify is not properly initialized, see https://vuetifyjs.com/getting-started/quick-start#bootstrapping-the-vuetify-object")},render:function(t){var e=t("div",{staticClass:"v-application--wrap"},this.$slots.default);return t("div",{staticClass:"v-application",class:Object(o["a"])({"v-application--is-rtl":this.$vuetify.rtl,"v-application--is-ltr":!this.$vuetify.rtl},this.themeClasses),attrs:{"data-app":!0},domProps:{id:this.id}},[e])}})},"8b0df":function(t,e,i){},cd59:function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app",[i("dashboard-core-app-bar",{model:{value:t.expandOnHover,callback:function(e){t.expandOnHover=e},expression:"expandOnHover"}}),i("dashboard-core-drawer",{attrs:{"expand-on-hover":t.expandOnHover},on:{"update:expandOnHover":function(e){t.expandOnHover=e},"update:expand-on-hover":function(e){t.expandOnHover=e}},model:{value:t.expandOnHover,callback:function(e){t.expandOnHover=e},expression:"expandOnHover"}}),i("dashboard-core-view")],1)},n=[],r=(i("d3b7"),function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-app-bar",{attrs:{id:"app-bar",app:"",dense:"",flat:""}},[i("v-btn",{staticClass:"mr-3",attrs:{elevation:"1",fab:"",small:""},on:{click:function(e){t.$vuetify.breakpoint.smAndDown?t.setDrawer(!t.drawer):t.$emit("input",!t.value)}}},[t.value?i("v-icon",[t._v(" mdi-view-quilt ")]):i("v-icon",[t._v(" mdi-dots-vertical ")])],1),i("v-toolbar-title",{staticClass:"hidden-sm-and-down font-weight-light",domProps:{textContent:t._s(t.$t(t.$route.name))}}),i("v-spacer"),i("v-toolbar-items",[i("v-btn",{attrs:{dark:"",large:"",href:"../index.html"}},[t._v(" Logout ")]),i("v-menu",{attrs:{bottom:"",left:"","offset-y":"",origin:"top right",transition:"scale-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.attrs,n=e.on;return[i("v-btn",t._g(t._b({staticClass:"ml-2",attrs:{"min-width":"0",text:""}},"v-btn",o,!1),n),[i("v-icon",[t._v("mdi-web")])],1)]}}])},[i("v-list",{attrs:{tile:!1,nav:""}},t._l(t.notifications,(function(e,o){return i("v-list-item",{key:o,on:{click:function(i){return t.changeLanguage(e)}}},[i("v-list-item-title",{domProps:{textContent:t._s(e)}})],1)})),1)],1),i("v-menu",{attrs:{bottom:"",left:"","min-width":"200","offset-y":"",origin:"top right",transition:"scale-transition"},scopedSlots:t._u([{key:"activator",fn:function(e){var o=e.attrs,n=e.on;return[i("v-btn",t._g(t._b({staticClass:"ml-2",attrs:{"min-width":"0",text:""}},"v-btn",o,!1),n),[i("v-icon",[t._v("mdi-account")])],1)]}}])},[i("v-list",{attrs:{tile:!1,flat:"",nav:""}},[i("app-bar-item",[i("v-list-item-title",{domProps:{textContent:t._s("Aktuelle Ausrüstung:"+t.$store.state.currentDeviceId)}})],1),t._l(t.profile,(function(e,o){return[i("app-bar-item",{key:"item-"+o,attrs:{to:"/pages/login"}},[i("v-list-item-title",{domProps:{textContent:t._s(e.title)}})],1)]}))],2)],1)],1)],1)}),s=[],a=i("5530"),l=i("2f62"),c=i("5089"),h={name:"DashboardCoreAppBar",props:{value:{type:Boolean,default:!1}},data:function(){return{notifications:["ZH","EN","DE"],profile:[{title:"Log out"}]}},computed:Object(a["a"])({},Object(l["c"])(["drawer"])),methods:Object(a["a"])({changeLanguage:c["a"]},Object(l["b"])({setDrawer:"SET_DRAWER"}))},d=h,p=i("2877"),u=i("6544"),f=i.n(u),v=(i("a9e3"),i("b680"),i("c7cd"),i("8b0df"),i("71d9")),m=i("53ca");function b(t,e){var i=e.modifiers||{},o=i.self,n=void 0!==o&&o,r=e.value,s="object"===Object(m["a"])(r)&&r.options||{passive:!0},a="function"===typeof r||"handleEvent"in r?r:r.handler,l=n?t:e.arg?document.querySelector(e.arg):window;l&&(l.addEventListener("scroll",a,s),t._onScroll={handler:a,options:s,target:n?void 0:l})}function g(t){if(t._onScroll){var e=t._onScroll,i=e.handler,o=e.options,n=e.target,r=void 0===n?t:n;r.removeEventListener("scroll",i,o),delete t._onScroll}}var S={inserted:b,unbind:g},O=S,x=i("3a66"),y=i("d9bd"),j=i("2b0e"),w=j["a"].extend({name:"scrollable",directives:{Scroll:S},props:{scrollTarget:String,scrollThreshold:[String,Number]},data:function(){return{currentScroll:0,currentThreshold:0,isActive:!1,isScrollingUp:!1,previousScroll:0,savedScroll:0,target:null}},computed:{canScroll:function(){return"undefined"!==typeof window},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):300}},watch:{isScrollingUp:function(){this.savedScroll=this.savedScroll||this.currentScroll},isActive:function(){this.savedScroll=0}},mounted:function(){this.scrollTarget&&(this.target=document.querySelector(this.scrollTarget),this.target||Object(y["c"])("Unable to locate element with identifier ".concat(this.scrollTarget),this))},methods:{onScroll:function(){var t=this;this.canScroll&&(this.previousScroll=this.currentScroll,this.currentScroll=this.target?this.target.scrollTop:window.pageYOffset,this.isScrollingUp=this.currentScroll<this.previousScroll,this.currentThreshold=Math.abs(this.currentScroll-this.computedScrollThreshold),this.$nextTick((function(){Math.abs(t.currentScroll-t.savedScroll)>t.computedScrollThreshold&&t.thresholdMet()})))},thresholdMet:function(){}}}),T=i("d10f"),_=i("f2e7"),C=i("80d2"),B=i("58df"),H=Object(B["a"])(v["a"],w,T["a"],_["a"],Object(x["a"])("top",["clippedLeft","clippedRight","computedHeight","invertedScroll","isExtended","isProminent","value"])),$=H.extend({name:"v-app-bar",directives:{Scroll:O},props:{clippedLeft:Boolean,clippedRight:Boolean,collapseOnScroll:Boolean,elevateOnScroll:Boolean,fadeImgOnScroll:Boolean,hideOnScroll:Boolean,invertedScroll:Boolean,scrollOffScreen:Boolean,shrinkOnScroll:Boolean,value:{type:Boolean,default:!0}},data:function(){return{isActive:this.value}},computed:{applicationProperty:function(){return this.bottom?"bottom":"top"},canScroll:function(){return w.options.computed.canScroll.call(this)&&(this.invertedScroll||this.elevateOnScroll||this.hideOnScroll||this.collapseOnScroll||this.isBooted||!this.value)},classes:function(){return Object(a["a"])(Object(a["a"])({},v["a"].options.computed.classes.call(this)),{},{"v-toolbar--collapse":this.collapse||this.collapseOnScroll,"v-app-bar":!0,"v-app-bar--clipped":this.clippedLeft||this.clippedRight,"v-app-bar--fade-img-on-scroll":this.fadeImgOnScroll,"v-app-bar--elevate-on-scroll":this.elevateOnScroll,"v-app-bar--fixed":!this.absolute&&(this.app||this.fixed),"v-app-bar--hide-shadow":this.hideShadow,"v-app-bar--is-scrolled":this.currentScroll>0,"v-app-bar--shrink-on-scroll":this.shrinkOnScroll})},computedContentHeight:function(){if(!this.shrinkOnScroll)return v["a"].options.computed.computedContentHeight.call(this);var t=this.computedOriginalHeight,e=this.dense?48:56,i=t,o=i-e,n=o/this.computedScrollThreshold,r=this.currentScroll*n;return Math.max(e,i-r)},computedFontSize:function(){if(this.isProminent){var t=this.dense?96:128,e=t-this.computedContentHeight,i=.00347;return Number((1.5-e*i).toFixed(2))}},computedLeft:function(){return!this.app||this.clippedLeft?0:this.$vuetify.application.left},computedMarginTop:function(){return this.app?this.$vuetify.application.bar:0},computedOpacity:function(){if(this.fadeImgOnScroll){var t=Math.max((this.computedScrollThreshold-this.currentScroll)/this.computedScrollThreshold,0);return Number(parseFloat(t).toFixed(2))}},computedOriginalHeight:function(){var t=v["a"].options.computed.computedContentHeight.call(this);return this.isExtended&&(t+=parseInt(this.extensionHeight)),t},computedRight:function(){return!this.app||this.clippedRight?0:this.$vuetify.application.right},computedScrollThreshold:function(){return this.scrollThreshold?Number(this.scrollThreshold):this.computedOriginalHeight-(this.dense?48:56)},computedTransform:function(){if(!this.canScroll||this.elevateOnScroll&&0===this.currentScroll&&this.isActive)return 0;if(this.isActive)return 0;var t=this.scrollOffScreen?this.computedHeight:this.computedContentHeight;return this.bottom?t:-t},hideShadow:function(){return this.elevateOnScroll&&this.isExtended?this.currentScroll<this.computedScrollThreshold:this.elevateOnScroll?0===this.currentScroll||this.computedTransform<0:(!this.isExtended||this.scrollOffScreen)&&0!==this.computedTransform},isCollapsed:function(){return this.collapseOnScroll?this.currentScroll>0:v["a"].options.computed.isCollapsed.call(this)},isProminent:function(){return v["a"].options.computed.isProminent.call(this)||this.shrinkOnScroll},styles:function(){return Object(a["a"])(Object(a["a"])({},v["a"].options.computed.styles.call(this)),{},{fontSize:Object(C["g"])(this.computedFontSize,"rem"),marginTop:Object(C["g"])(this.computedMarginTop),transform:"translateY(".concat(Object(C["g"])(this.computedTransform),")"),left:Object(C["g"])(this.computedLeft),right:Object(C["g"])(this.computedRight)})}},watch:{canScroll:"onScroll",computedTransform:function(){this.canScroll&&(this.clippedLeft||this.clippedRight)&&this.callUpdate()},invertedScroll:function(t){this.isActive=!t||0!==this.currentScroll}},created:function(){this.invertedScroll&&(this.isActive=!1)},methods:{genBackground:function(){var t=v["a"].options.methods.genBackground.call(this);return t.data=this._b(t.data||{},t.tag,{style:{opacity:this.computedOpacity}}),t},updateApplication:function(){return this.invertedScroll?0:this.computedHeight+this.computedTransform},thresholdMet:function(){this.invertedScroll?this.isActive=this.currentScroll>this.computedScrollThreshold:(this.hideOnScroll&&(this.isActive=this.isScrollingUp||this.currentScroll<this.computedScrollThreshold),this.currentThreshold<this.computedScrollThreshold||(this.savedScroll=this.currentScroll))}},render:function(t){var e=v["a"].options.render.call(this,t);return e.data=e.data||{},this.canScroll&&(e.data.directives=e.data.directives||[],e.data.directives.push({arg:this.scrollTarget,name:"scroll",value:this.onScroll})),e}}),k=i("8336"),E=i("132d"),A=i("8860"),P=i("da13"),L=i("5d23"),D=i("e449"),V=i("2fa4"),I=i("2a7f"),U=Object(p["a"])(d,r,s,!1,null,null,null),M=U.exports;f()(U,{VAppBar:$,VBtn:k["a"],VIcon:E["a"],VList:A["a"],VListItem:P["a"],VListItemTitle:L["d"],VMenu:D["a"],VSpacer:V["a"],VToolbarItems:I["a"],VToolbarTitle:I["b"]});var N={name:"DashboardIndex",components:{DashboardCoreAppBar:M,DashboardCoreDrawer:function(){return i.e("chunk-4d4c503e").then(i.bind(null,"09ae"))},DashboardCoreView:function(){return i.e("chunk-39d72ad0").then(i.bind(null,"2038"))}},data:function(){return{expandOnHover:!1}}},R=N,F=i("7496"),q=Object(p["a"])(R,o,n,!1,null,null,null);e["default"]=q.exports;f()(q,{VApp:F["a"]})},df86:function(t,e,i){}}]);
//# sourceMappingURL=chunk-6a1f02f1.5a8e698d.js.map