(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-dd5c9500"],{"0418":function(t,e,i){},"09ae":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-navigation-drawer",t._b({attrs:{id:"core-navigation-drawer",dark:"rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)"!==t.barColor,"expand-on-hover":t.expandOnHover,right:!0,src:t.barImage,app:"","mini-variant-width":"80","mobile-break-point":"960",width:"260"},scopedSlots:t._u([{key:"img",fn:function(e){return[i("v-img",t._b({attrs:{gradient:"to bottom, "+t.barColor}},"v-img",e,!1))]}}]),model:{value:t.drawer,callback:function(e){t.drawer=e},expression:"drawer"}},"v-navigation-drawer",t.$attrs,!1),[i("v-divider",{staticClass:"mb-2"}),i("v-list-item",[i("v-list-item-title",{staticClass:"text-uppercase font-weight-regular display-2 d-flex align-center"},[i("v-spacer"),i("v-btn",{attrs:{text:"",href:"../index.html"}},[t._v(" Logout ")])],1)],1),-1!==t.accessLevel?i("v-list",{attrs:{expand:"",nav:""}},[i("div"),t._l(t.computedItems,(function(e,n){return[e.accessRight<=t.accessLevel?[e.children?i("base-item-group",{key:"group-"+n,attrs:{item:e}}):i("base-item",{key:"item-"+n,attrs:{item:e}})]:t._e()]})),i("div")],2):i("v-list",{attrs:{expand:"",nav:""}},[i("v-list-item",[i("v-list-item-content",[t._v("Your Access is denied!")])],1)],1),i("v-list-item",[i("v-list-item-content",[t._v("Version:"+t._s(t.Version))])],1)],1)},a=[],s=(i("d81d"),i("5530")),r=i("2f62"),o=i("9224");console.log(o["a"]);var c={name:"DashboardCoreDrawer",props:{expandOnHover:{type:Boolean,default:!1}},data:function(){return{items:[{icon:"mdi-view-dashboard",title:"dashboard",accessRight:0,to:"/"},{group:"/dishes",icon:"mdi-food",title:"菜品管理",accessRight:0,children:[{title:"分类设置",icon:"mdi-label",to:"labels-manage"},{title:"单个菜品设置",icon:"mdi-food-fork-drink",to:"dishes-manage"},{title:"菜品统计",icon:"mdi-calculator-variant",to:"dish-statistics"},{title:"菜品配料",icon:"mdi-calculator-variant",to:"attribute-group"}]},{group:"/Tables",icon:"mdi-desktop-mac",title:"桌台设置",accessRight:1,children:[{title:"分区设置",icon:"mdi-desktop-tower-monitor",to:"section-manage"},{title:"桌子管理",icon:"mdi-table-chair",to:"tables-manage"}]},{group:"/Person",icon:"mdi-account",title:"跑堂",accessRight:1,children:[{title:"跑堂管理",icon:"mdi-account-switch",to:"person-manage"}]},{group:"/Bills",icon:"mdi-account-cash",title:"订单记录",accessRight:1,children:[{title:"全部账单",icon:"mdi-currency-usd",to:"history-bills"}]},{group:"/Printer",icon:"mdi-printer",title:"打印机和打印记录",accessRight:0,children:[{title:"分区打印设置",icon:"mdi-cog-transfer",to:"section-printer-setting"},{title:"设备列表",icon:"mdi-devices",to:"devicelist"},{title:"打印单列表",icon:"mdi-clipboard-list",to:"printerlist"}]},{group:"/Setting",icon:"mdi-account-cog",title:"设置",accessRight:1,children:[{title:"TaxSetting",icon:"mdi-cash-usd",to:"tax-setting"},{title:"支付设置",icon:"mdi-help",to:"paymentpage"},{title:"过敏源设置",icon:"mdi-help",to:"allergen-setting"},{title:"餐馆身份",icon:"mdi-silver-ware",to:"restaurant-info"},{title:"图片设置",icon:"mdi-silver-ware",to:"restaurant-image"}]}],Version:o["a"]+"Only Order"}},computed:Object(s["a"])(Object(s["a"])({},Object(r["c"])(["barColor","barImage","accessLevel"])),{},{drawer:{get:function(){return this.$store.state.drawer},set:function(t){console.log(t),this.$store.commit("SET_DRAWER",t)}},computedItems:function(){return this.items.map(this.mapItem)}}),watch:{"$vuetify.breakpoint.smAndDown":function(t){this.$emit("update:expandOnHover",!t)}},methods:{mapItem:function(t){return Object(s["a"])(Object(s["a"])({},t),{},{children:t.children?t.children.map(this.mapItem):void 0,title:this.$t(t.title)})}}},l=c,h=(i("f9cb"),i("2877")),u=i("6544"),d=i.n(u),v=i("8336"),p=i("ce7e"),m=i("adda"),f=i("8860"),g=i("da13"),y=i("5d23"),b=(i("99af"),i("a9e3"),i("c7cd"),i("7958"),i("3a66")),w=i("a9ad"),O=i("b848"),A=i("e4cd"),$=i("e707"),C=i("d10f"),x=i("7560"),k=i("a293"),M=i("dc22"),S=i("c3f0"),E=i("80d2"),B=i("58df"),T=Object(B["a"])(Object(b["a"])("left",["isActive","isMobile","miniVariant","expandOnHover","permanent","right","temporary","width"]),w["a"],O["a"],A["a"],$["a"],C["a"],x["a"]),_=T.extend({name:"v-navigation-drawer",provide:function(){return{isInNav:"nav"===this.tag}},directives:{ClickOutside:k["a"],Resize:M["a"],Touch:S["a"]},props:{bottom:Boolean,clipped:Boolean,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,height:{type:[Number,String],default:function(){return this.app?"100vh":"100%"}},miniVariant:Boolean,miniVariantWidth:{type:[Number,String],default:56},permanent:Boolean,right:Boolean,src:{type:[String,Object],default:""},stateless:Boolean,tag:{type:String,default:function(){return this.app?"nav":"aside"}},temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},value:null},data:function(){return{isMouseover:!1,touchArea:{left:0,right:0},stackMinZIndex:6}},computed:{applicationProperty:function(){return this.right?"right":"left"},classes:function(){return Object(s["a"])({"v-navigation-drawer":!0,"v-navigation-drawer--absolute":this.absolute,"v-navigation-drawer--bottom":this.bottom,"v-navigation-drawer--clipped":this.clipped,"v-navigation-drawer--close":!this.isActive,"v-navigation-drawer--fixed":!this.absolute&&(this.app||this.fixed),"v-navigation-drawer--floating":this.floating,"v-navigation-drawer--is-mobile":this.isMobile,"v-navigation-drawer--is-mouseover":this.isMouseover,"v-navigation-drawer--mini-variant":this.isMiniVariant,"v-navigation-drawer--custom-mini-variant":56!==Number(this.miniVariantWidth),"v-navigation-drawer--open":this.isActive,"v-navigation-drawer--open-on-hover":this.expandOnHover,"v-navigation-drawer--right":this.right,"v-navigation-drawer--temporary":this.temporary},this.themeClasses)},computedMaxHeight:function(){if(!this.hasApp)return null;var t=this.$vuetify.application.bottom+this.$vuetify.application.footer+this.$vuetify.application.bar;return this.clipped?t+this.$vuetify.application.top:t},computedTop:function(){if(!this.hasApp)return 0;var t=this.$vuetify.application.bar;return t+=this.clipped?this.$vuetify.application.top:0,t},computedTransform:function(){return this.isActive?0:this.isBottom||this.right?100:-100},computedWidth:function(){return this.isMiniVariant?this.miniVariantWidth:this.width},hasApp:function(){return this.app&&!this.isMobile&&!this.temporary},isBottom:function(){return this.bottom&&this.isMobile},isMiniVariant:function(){return!this.expandOnHover&&this.miniVariant||this.expandOnHover&&!this.isMouseover},isMobile:function(){return!this.stateless&&!this.permanent&&A["a"].options.computed.isMobile.call(this)},reactsToClick:function(){return!this.stateless&&!this.permanent&&(this.isMobile||this.temporary)},reactsToMobile:function(){return this.app&&!this.disableResizeWatcher&&!this.permanent&&!this.stateless&&!this.temporary},reactsToResize:function(){return!this.disableResizeWatcher&&!this.stateless},reactsToRoute:function(){return!this.disableRouteWatcher&&!this.stateless&&(this.temporary||this.isMobile)},showOverlay:function(){return!this.hideOverlay&&this.isActive&&(this.isMobile||this.temporary)},styles:function(){var t=this.isBottom?"translateY":"translateX",e={height:Object(E["g"])(this.height),top:this.isBottom?"auto":Object(E["g"])(this.computedTop),maxHeight:null!=this.computedMaxHeight?"calc(100% - ".concat(Object(E["g"])(this.computedMaxHeight),")"):void 0,transform:"".concat(t,"(").concat(Object(E["g"])(this.computedTransform,"%"),")"),width:Object(E["g"])(this.computedWidth)};return e}},watch:{$route:"onRouteChange",isActive:function(t){this.$emit("input",t)},isMobile:function(t,e){!t&&this.isActive&&!this.temporary&&this.removeOverlay(),null!=e&&this.reactsToResize&&this.reactsToMobile&&(this.isActive=!t)},permanent:function(t){t&&(this.isActive=!0)},showOverlay:function(t){t?this.genOverlay():this.removeOverlay()},value:function(t){this.permanent||(null!=t?t!==this.isActive&&(this.isActive=t):this.init())},expandOnHover:"updateMiniVariant",isMouseover:function(t){this.updateMiniVariant(!t)}},beforeMount:function(){this.init()},methods:{calculateTouchArea:function(){var t=this.$el.parentNode;if(t){var e=t.getBoundingClientRect();this.touchArea={left:e.left+50,right:e.right-50}}},closeConditional:function(){return this.isActive&&!this._isDestroyed&&this.reactsToClick},genAppend:function(){return this.genPosition("append")},genBackground:function(){var t={height:"100%",width:"100%",src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img(t):this.$createElement(m["a"],{props:t});return this.$createElement("div",{staticClass:"v-navigation-drawer__image"},[e])},genDirectives:function(){var t=this,e=[{name:"click-outside",value:{handler:function(){t.isActive=!1},closeConditional:this.closeConditional,include:this.getOpenDependentElements}}];return this.touchless||this.stateless||e.push({name:"touch",value:{parent:!0,left:this.swipeLeft,right:this.swipeRight}}),e},genListeners:function(){var t=this,e={transitionend:function(e){if(e.target===e.currentTarget){t.$emit("transitionend",e);var i=document.createEvent("UIEvents");i.initUIEvent("resize",!0,!1,window,0),window.dispatchEvent(i)}}};return this.miniVariant&&(e.click=function(){return t.$emit("update:mini-variant",!1)}),this.expandOnHover&&(e.mouseenter=function(){return t.isMouseover=!0},e.mouseleave=function(){return t.isMouseover=!1}),e},genPosition:function(t){var e=Object(E["s"])(this,t);return e?this.$createElement("div",{staticClass:"v-navigation-drawer__".concat(t)},e):e},genPrepend:function(){return this.genPosition("prepend")},genContent:function(){return this.$createElement("div",{staticClass:"v-navigation-drawer__content"},this.$slots.default)},genBorder:function(){return this.$createElement("div",{staticClass:"v-navigation-drawer__border"})},init:function(){this.permanent?this.isActive=!0:this.stateless||null!=this.value?this.isActive=this.value:this.temporary||(this.isActive=!this.isMobile)},onRouteChange:function(){this.reactsToRoute&&this.closeConditional()&&(this.isActive=!1)},swipeLeft:function(t){this.isActive&&this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(this.right&&t.touchstartX>=this.touchArea.right?this.isActive=!0:!this.right&&this.isActive&&(this.isActive=!1)))},swipeRight:function(t){this.isActive&&!this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(!this.right&&t.touchstartX<=this.touchArea.left?this.isActive=!0:this.right&&this.isActive&&(this.isActive=!1)))},updateApplication:function(){if(!this.isActive||this.isMobile||this.temporary||!this.$el)return 0;var t=Number(this.computedWidth);return isNaN(t)?this.$el.clientWidth:t},updateMiniVariant:function(t){this.miniVariant!==t&&this.$emit("update:mini-variant",t)}},render:function(t){var e=[this.genPrepend(),this.genContent(),this.genAppend(),this.genBorder()];return(this.src||Object(E["s"])(this,"img"))&&e.unshift(this.genBackground()),t(this.tag,this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,directives:this.genDirectives(),on:this.genListeners()}),e)}}),I=i("2fa4"),N=Object(h["a"])(l,n,a,!1,null,null,null);e["default"]=N.exports;d()(N,{VBtn:v["a"],VDivider:p["a"],VImg:m["a"],VList:f["a"],VListItem:g["a"],VListItemContent:y["b"],VListItemTitle:y["d"],VNavigationDrawer:_,VSpacer:I["a"]})},"3c93":function(t,e,i){},7958:function(t,e,i){},9224:function(t){t.exports=JSON.parse('{"a":"2.1.45"}')},e707:function(t,e,i){"use strict";i("caad"),i("a9e3"),i("2532");var n=i("5530"),a=(i("3c93"),i("a9ad")),s=i("7560"),r=i("f2e7"),o=i("58df"),c=Object(o["a"])(a["a"],s["a"],r["a"]).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim:function(){var t=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",t)},classes:function(){return Object(n["a"])({"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive},this.themeClasses)},computedOpacity:function(){return Number(this.isActive?this.opacity:0)},styles:function(){return{zIndex:this.zIndex}}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-overlay__content"},this.$slots.default)}},render:function(t){var e=[this.__scrim];return this.isActive&&e.push(this.genContent()),t("div",{staticClass:"v-overlay",class:this.classes,style:this.styles},e)}}),l=c,h=i("80d2"),u=i("2b0e");e["a"]=u["a"].extend().extend({name:"overlayable",props:{hideOverlay:Boolean,overlayColor:String,overlayOpacity:[Number,String]},data:function(){return{animationFrame:0,overlay:null}},watch:{hideOverlay:function(t){this.isActive&&(t?this.removeOverlay():this.genOverlay())}},beforeDestroy:function(){this.removeOverlay()},methods:{createOverlay:function(){var t=new l({propsData:{absolute:this.absolute,value:!1,color:this.overlayColor,opacity:this.overlayOpacity}});t.$mount();var e=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");e&&e.insertBefore(t.$el,e.firstChild),this.overlay=t},genOverlay:function(){var t=this;if(this.hideScroll(),!this.hideOverlay)return this.overlay||this.createOverlay(),this.animationFrame=requestAnimationFrame((function(){t.overlay&&(void 0!==t.activeZIndex?t.overlay.zIndex=String(t.activeZIndex-1):t.$el&&(t.overlay.zIndex=Object(h["u"])(t.$el)),t.overlay.value=!0)})),!0},removeOverlay:function(){var t=this,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.overlay&&(Object(h["a"])(this.overlay.$el,"transitionend",(function(){t.overlay&&t.overlay.$el&&t.overlay.$el.parentNode&&!t.overlay.value&&(t.overlay.$el.parentNode.removeChild(t.overlay.$el),t.overlay.$destroy(),t.overlay=null)})),cancelAnimationFrame(this.animationFrame),this.overlay.value=!1),e&&this.showScroll()},scrollListener:function(t){if("keydown"===t.type){if(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||t.target.isContentEditable)return;var e=[h["y"].up,h["y"].pageup],i=[h["y"].down,h["y"].pagedown];if(e.includes(t.keyCode))t.deltaY=-1;else{if(!i.includes(t.keyCode))return;t.deltaY=1}}(t.target===this.overlay||"keydown"!==t.type&&t.target===document.body||this.checkPath(t))&&t.preventDefault()},hasScrollbar:function(t){if(!t||t.nodeType!==Node.ELEMENT_NODE)return!1;var e=window.getComputedStyle(t);return["auto","scroll"].includes(e.overflowY)&&t.scrollHeight>t.clientHeight},shouldScroll:function(t,e){return 0===t.scrollTop&&e<0||t.scrollTop+t.clientHeight===t.scrollHeight&&e>0},isInside:function(t,e){return t===e||null!==t&&t!==document.body&&this.isInside(t.parentNode,e)},checkPath:function(t){var e=t.path||this.composedPath(t),i=t.deltaY;if("keydown"===t.type&&e[0]===document.body){var n=this.$refs.dialog,a=window.getSelection().anchorNode;return!(n&&this.hasScrollbar(n)&&this.isInside(a,n))||this.shouldScroll(n,i)}for(var s=0;s<e.length;s++){var r=e[s];if(r===document)return!0;if(r===document.documentElement)return!0;if(r===this.$refs.content)return!0;if(this.hasScrollbar(r))return this.shouldScroll(r,i)}return!0},composedPath:function(t){if(t.composedPath)return t.composedPath();var e=[],i=t.target;while(i){if(e.push(i),"HTML"===i.tagName)return e.push(document),e.push(window),e;i=i.parentElement}return e},hideScroll:function(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):(Object(h["b"])(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll:function(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}})},f9cb:function(t,e,i){"use strict";var n=i("0418"),a=i.n(n);a.a}}]);
//# sourceMappingURL=chunk-dd5c9500.8615b75a.js.map