(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-31a799e8"],{"09ae":function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-navigation-drawer",t._b({attrs:{id:"core-navigation-drawer",touchless:"",right:t.$vuetify.rtl,app:"","mobile-break-point":"960",width:"260"},model:{value:t.drawer,callback:function(i){t.drawer=i},expression:"drawer"}},"v-navigation-drawer",t.$attrs,!1),[n("v-card",[n("v-btn",{attrs:{width:"50%",tile:"",dark:"",large:"",href:"../index.html"}},[t._v(" "+t._s(t.$t("logout"))+" ")]),n("v-menu",{attrs:{bottom:"",left:"","offset-y":"",origin:"top right",transition:"scale-transition"},scopedSlots:t._u([{key:"activator",fn:function(i){var e=i.attrs,a=i.on;return[n("v-btn",t._g(t._b({attrs:{width:"50%",text:"",large:"",tile:""}},"v-btn",e,!1),a),[n("v-icon",{attrs:{left:""}},[t._v(" mdi-web ")]),t._v(t._s(t.$t("语言"))+" ")],1)]}}])},[n("v-list",{attrs:{tile:!1,nav:""}},t._l(t.notifications,(function(i,e){return n("v-list-item",{key:e,on:{click:function(e){return t.changeLanguage(i)}}},[n("v-list-item-title",{domProps:{textContent:t._s(i)}})],1)})),1)],1)],1),n("v-list-item",[n("v-list-item-avatar",[n("v-avatar",{staticClass:"logo-mini white"},[n("img",{attrs:{src:e("4f6c"),alt:"John"}})])],1),n("v-list-item-content",[n("v-list-item-title",[n("span",{staticClass:"overline"},[t._v(t._s(t.$t("Aaden ADMIN")))])]),n("v-list-item-subtitle",[t._v(" "+t._s(t.Version)+" ")])],1)],1),n("v-switch",{staticClass:"pl-4",attrs:{label:t.$t("briefView")+": "+(t.toggleBriefView?t.$t("on"):t.$t("off"))},model:{value:t.toggleBriefView,callback:function(i){t.toggleBriefView=i},expression:"toggleBriefView"}}),n("v-divider",{staticClass:"mb-2"}),n("v-list",{staticClass:"pb-16",attrs:{expand:"",nav:""}},[n("div"),t._l(t.computedItems,(function(t,i){return[[t.children?n("base-item-group",{key:"group-"+i,attrs:{item:t}}):n("base-item",{key:"item-"+i,attrs:{item:t}})]]})),n("div")],2)],1)},a=[],s=(e("4de4"),e("d81d"),e("2909")),o=e("b85c"),r=e("5530"),c=e("2f62"),l=e("9224"),h=e("5089");console.log(l["a"]);var u={name:"DashboardCoreDrawer",props:{expandOnHover:{type:Boolean,default:!1}},data:function(){return{items:[{icon:"mdi-view-dashboard",title:"dashboard",accessRight:0,to:"/",brief:!0},{title:"Zbon日历",accessRight:1,icon:"mdi-calendar",to:"/Bills/daily-zbon",brief:!0},{title:"Zbon列表",accessRight:1,icon:"mdi-format-list-bulleted",to:"/Bills/zbonlist",brief:!0},{group:"/dishes",icon:"mdi-food",title:"菜品管理",accessRight:0,children:[{title:"分类",icon:"mdi-label",to:"labels-manage",brief:!0},{title:"库存",icon:"mdi-label",to:"cache-table"},{title:"菜品",icon:"mdi-food-fork-drink",to:"dishes-manage",brief:!0},{title:"属性组",icon:"mdi-calculator-variant",to:"attribute-group"},{title:"BuffetChildSetting",icon:"mdi-calculator-variant",to:"buffet-child-setting"},{title:"过敏源",icon:"mdi-help",to:"allergen-setting"},{title:"折扣规则",icon:"mdi-help",to:"discount-rules-setting"},{title:"折扣规则(新)",icon:"mdi-help",to:"discount-rules-newsetting"},{title:"阈值颜色",icon:"mdi-help",to:"threshold-color-setting"}]},{group:"/Tables",icon:"mdi-desktop-mac",title:"桌子&人员",accessRight:1,children:[{title:"分区",icon:"mdi-desktop-tower-monitor",to:"section-manage"},{title:"桌子",icon:"mdi-table-chair",to:"tables-manage"},{title:"人员",icon:"mdi-account-switch",to:"person-manage"}]},{group:"/Sales",icon:"mdi-chart-line",title:"销售",accessRight:1,children:[{title:"自助餐",icon:"mdi-buffet",to:"BuffetSetting",brief:!0},{title:"菜品统计",icon:"mdi-calculator-variant",to:"dish-statistics"},{title:"菜品出库统计",icon:"mdi-food-fork-drink",to:"dish-delivery-statistics",brief:!0},{title:"高级销售分析",icon:"mdi-calculator-variant",to:"sales-insight"},{title:"配送距离",icon:"mdi-help",to:"delivery-range-setting"},{title:"营业时间",icon:"mdi-help",to:"open-time-setting"},{title:"用户信息",icon:"mdi-help",to:"user-management"},{title:"会员卡销售记录",icon:"mdi-help",to:"member-card-sale-record"},{title:"CoronaInfo",icon:"mdi-virus",to:"corona-info"}]},{group:"/Bills",icon:"mdi-account-cash",title:"账单",accessRight:1,children:[{title:"全部账单",icon:"mdi-currency-usd",to:"history-bills",brief:!0},{title:"导出CSV",icon:"mdi-format-list-bulleted",to:"exportcsv"},{title:"我的记账本",icon:"mdi-format-list-bulleted",to:"cashbook"},{title:"Datev",icon:"mdi-format-list-bulleted",to:"Datev"}]},{group:"/Printer",icon:"mdi-printer",title:"打印",accessRight:0,children:[{title:"操作记录",icon:"mdi-developer-board",to:"operationlist"},{title:"打印分区",icon:"mdi-cog-transfer",to:"section-printer-setting",brief:!0},{title:"设备列表",icon:"mdi-devices",to:"devicelist"},{title:"打印单列表",icon:"mdi-clipboard-list",to:"printerlist"},{title:"BonTemplate",icon:"mdi-clipboard-list",to:"bon-template"}]},{group:"/Setting",icon:"mdi-account-cog",title:"设置",accessRight:1,children:[{title:"自由信息单",icon:"mdi-text-box-outline",to:"freeInfoSheet"},{title:"支付",icon:"mdi-help",to:"paymentpage"},{title:"预约",icon:"mdi-calendar-today",to:"reservation"},{title:"餐馆身份",icon:"mdi-silver-ware",to:"restaurant-info"},{title:"图片",icon:"mdi-silver-ware",to:"restaurant-image"},{title:"轮播图",icon:"mdi-silver-ware",to:"banner-image"},{title:"系统",icon:"mdi-help",to:"aaden-system-setting"},{title:"关于我们",icon:"mdi-account-group",to:"about-us"}]}],Version:l["a"],toggleBriefView:!0,notifications:["ZH","EN","DE"],profile:[{title:"logout"}]}},computed:Object(r["a"])(Object(r["a"])({},Object(c["c"])(["barColor","barImage","accessLevel","drawer"])),{},{drawer:{get:function(){return this.$store.state.drawer},set:function(t){console.log(t),this.$store.commit("SET_DRAWER",t)}},computedItems:function(){var t=this.items.map(this.mapItem);if(this.toggleBriefView){for(var i=[],e=0;e<t.length;e++)if(void 0!==t[e].brief&&!0===t[e].brief&&i.push(t[e]),void 0!==t[e].children&&t[e].children.length>0){var n,a=t[e].children.filter((function(t){return void 0!==t.brief&&!0===t.brief})),r=Object(o["a"])(a);try{for(r.s();!(n=r.n()).done;){var c=n.value;c.to=t[e].group+"/"+c.to}}catch(l){r.e(l)}finally{r.f()}i.push.apply(i,Object(s["a"])(a))}return i}return t}}),watch:{"$vuetify.breakpoint.smAndDown":function(t){this.$emit("update:expandOnHover",!t)}},methods:Object(r["a"])(Object(r["a"])({changeLanguage:h["a"]},Object(c["b"])({setDrawer:"SET_DRAWER"})),{},{mapItem:function(t){return Object(r["a"])(Object(r["a"])({},t),{},{children:t.children?t.children.map(this.mapItem):void 0,title:this.$t(t.title)})}})},d=u,p=(e("f9cb"),e("2877")),v=e("6544"),m=e.n(v),f=e("8212"),g=e("8336"),b=e("b0af"),w=e("ce7e"),y=e("132d"),A=e("8860"),O=e("da13"),$=e("8270"),C=e("5d23"),V=e("e449"),B=(e("99af"),e("a9e3"),e("c7cd"),e("7958"),e("adda")),_=e("3a66"),M=e("a9ad"),k=e("b848"),x=e("e4cd"),S=e("e707"),j=e("d10f"),R=e("7560"),T=e("a293"),E=e("dc22"),D=e("c3f0"),I=e("80d2"),L=e("58df"),P=Object(L["a"])(Object(_["a"])("left",["isActive","isMobile","miniVariant","expandOnHover","permanent","right","temporary","width"]),M["a"],k["a"],x["a"],S["a"],j["a"],R["a"]),W=P.extend({name:"v-navigation-drawer",directives:{ClickOutside:T["a"],Resize:E["a"],Touch:D["a"]},provide:function(){return{isInNav:"nav"===this.tag}},props:{bottom:Boolean,clipped:Boolean,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,height:{type:[Number,String],default:function(){return this.app?"100vh":"100%"}},miniVariant:Boolean,miniVariantWidth:{type:[Number,String],default:56},permanent:Boolean,right:Boolean,src:{type:[String,Object],default:""},stateless:Boolean,tag:{type:String,default:function(){return this.app?"nav":"aside"}},temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},value:null},data:function(){return{isMouseover:!1,touchArea:{left:0,right:0},stackMinZIndex:6}},computed:{applicationProperty:function(){return this.right?"right":"left"},classes:function(){return Object(r["a"])({"v-navigation-drawer":!0,"v-navigation-drawer--absolute":this.absolute,"v-navigation-drawer--bottom":this.bottom,"v-navigation-drawer--clipped":this.clipped,"v-navigation-drawer--close":!this.isActive,"v-navigation-drawer--fixed":!this.absolute&&(this.app||this.fixed),"v-navigation-drawer--floating":this.floating,"v-navigation-drawer--is-mobile":this.isMobile,"v-navigation-drawer--is-mouseover":this.isMouseover,"v-navigation-drawer--mini-variant":this.isMiniVariant,"v-navigation-drawer--custom-mini-variant":56!==Number(this.miniVariantWidth),"v-navigation-drawer--open":this.isActive,"v-navigation-drawer--open-on-hover":this.expandOnHover,"v-navigation-drawer--right":this.right,"v-navigation-drawer--temporary":this.temporary},this.themeClasses)},computedMaxHeight:function(){if(!this.hasApp)return null;var t=this.$vuetify.application.bottom+this.$vuetify.application.footer+this.$vuetify.application.bar;return this.clipped?t+this.$vuetify.application.top:t},computedTop:function(){if(!this.hasApp)return 0;var t=this.$vuetify.application.bar;return t+=this.clipped?this.$vuetify.application.top:0,t},computedTransform:function(){return this.isActive?0:this.isBottom||this.right?100:-100},computedWidth:function(){return this.isMiniVariant?this.miniVariantWidth:this.width},hasApp:function(){return this.app&&!this.isMobile&&!this.temporary},isBottom:function(){return this.bottom&&this.isMobile},isMiniVariant:function(){return!this.expandOnHover&&this.miniVariant||this.expandOnHover&&!this.isMouseover},isMobile:function(){return!this.stateless&&!this.permanent&&x["a"].options.computed.isMobile.call(this)},reactsToClick:function(){return!this.stateless&&!this.permanent&&(this.isMobile||this.temporary)},reactsToMobile:function(){return this.app&&!this.disableResizeWatcher&&!this.permanent&&!this.stateless&&!this.temporary},reactsToResize:function(){return!this.disableResizeWatcher&&!this.stateless},reactsToRoute:function(){return!this.disableRouteWatcher&&!this.stateless&&(this.temporary||this.isMobile)},showOverlay:function(){return!this.hideOverlay&&this.isActive&&(this.isMobile||this.temporary)},styles:function(){var t=this.isBottom?"translateY":"translateX";return{height:Object(I["h"])(this.height),top:this.isBottom?"auto":Object(I["h"])(this.computedTop),maxHeight:null!=this.computedMaxHeight?"calc(100% - ".concat(Object(I["h"])(this.computedMaxHeight),")"):void 0,transform:"".concat(t,"(").concat(Object(I["h"])(this.computedTransform,"%"),")"),width:Object(I["h"])(this.computedWidth)}}},watch:{$route:"onRouteChange",isActive:function(t){this.$emit("input",t)},isMobile:function(t,i){!t&&this.isActive&&!this.temporary&&this.removeOverlay(),null!=i&&this.reactsToResize&&this.reactsToMobile&&(this.isActive=!t)},permanent:function(t){t&&(this.isActive=!0)},showOverlay:function(t){t?this.genOverlay():this.removeOverlay()},value:function(t){this.permanent||(null!=t?t!==this.isActive&&(this.isActive=t):this.init())},expandOnHover:"updateMiniVariant",isMouseover:function(t){this.updateMiniVariant(!t)}},beforeMount:function(){this.init()},methods:{calculateTouchArea:function(){var t=this.$el.parentNode;if(t){var i=t.getBoundingClientRect();this.touchArea={left:i.left+50,right:i.right-50}}},closeConditional:function(){return this.isActive&&!this._isDestroyed&&this.reactsToClick},genAppend:function(){return this.genPosition("append")},genBackground:function(){var t={height:"100%",width:"100%",src:this.src},i=this.$scopedSlots.img?this.$scopedSlots.img(t):this.$createElement(B["a"],{props:t});return this.$createElement("div",{staticClass:"v-navigation-drawer__image"},[i])},genDirectives:function(){var t=this,i=[{name:"click-outside",value:{handler:function(){t.isActive=!1},closeConditional:this.closeConditional,include:this.getOpenDependentElements}}];return this.touchless||this.stateless||i.push({name:"touch",value:{parent:!0,left:this.swipeLeft,right:this.swipeRight}}),i},genListeners:function(){var t=this,i={mouseenter:function(){return t.isMouseover=!0},mouseleave:function(){return t.isMouseover=!1},transitionend:function(i){if(i.target===i.currentTarget){t.$emit("transitionend",i);var e=document.createEvent("UIEvents");e.initUIEvent("resize",!0,!1,window,0),window.dispatchEvent(e)}}};return this.miniVariant&&(i.click=function(){return t.$emit("update:mini-variant",!1)}),i},genPosition:function(t){var i=Object(I["t"])(this,t);return i?this.$createElement("div",{staticClass:"v-navigation-drawer__".concat(t)},i):i},genPrepend:function(){return this.genPosition("prepend")},genContent:function(){return this.$createElement("div",{staticClass:"v-navigation-drawer__content"},this.$slots.default)},genBorder:function(){return this.$createElement("div",{staticClass:"v-navigation-drawer__border"})},init:function(){this.permanent?this.isActive=!0:this.stateless||null!=this.value?this.isActive=this.value:this.temporary||(this.isActive=!this.isMobile)},onRouteChange:function(){this.reactsToRoute&&this.closeConditional()&&(this.isActive=!1)},swipeLeft:function(t){this.isActive&&this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(this.right&&t.touchstartX>=this.touchArea.right?this.isActive=!0:!this.right&&this.isActive&&(this.isActive=!1)))},swipeRight:function(t){this.isActive&&!this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(!this.right&&t.touchstartX<=this.touchArea.left?this.isActive=!0:this.right&&this.isActive&&(this.isActive=!1)))},updateApplication:function(){if(!this.isActive||this.isMobile||this.temporary||!this.$el)return 0;var t=Number(this.miniVariant?this.miniVariantWidth:this.width);return isNaN(t)?this.$el.clientWidth:t},updateMiniVariant:function(t){this.miniVariant!==t&&this.$emit("update:mini-variant",t)}},render:function(t){var i=[this.genPrepend(),this.genContent(),this.genAppend(),this.genBorder()];return(this.src||Object(I["t"])(this,"img"))&&i.unshift(this.genBackground()),t(this.tag,this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,directives:this.genDirectives(),on:this.genListeners()}),i)}}),H=e("b73d"),N=Object(p["a"])(d,n,a,!1,null,null,null);i["default"]=N.exports;m()(N,{VAvatar:f["a"],VBtn:g["a"],VCard:b["a"],VDivider:w["a"],VIcon:y["a"],VList:A["a"],VListItem:O["a"],VListItemAvatar:$["a"],VListItemContent:C["b"],VListItemSubtitle:C["c"],VListItemTitle:C["d"],VMenu:V["a"],VNavigationDrawer:W,VSwitch:H["a"]})},"3a66":function(t,i,e){"use strict";e.d(i,"a",(function(){return s}));var n=e("fe6c"),a=e("58df");function s(t){var i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];return Object(a["a"])(Object(n["b"])(["absolute","fixed"])).extend({name:"applicationable",props:{app:Boolean},computed:{applicationProperty:function(){return t}},watch:{app:function(t,i){i?this.removeApplication(!0):this.callUpdate()},applicationProperty:function(t,i){this.$vuetify.application.unregister(this._uid,i)}},activated:function(){this.callUpdate()},created:function(){for(var t=0,e=i.length;t<e;t++)this.$watch(i[t],this.callUpdate);this.callUpdate()},mounted:function(){this.callUpdate()},deactivated:function(){this.removeApplication()},destroyed:function(){this.removeApplication()},methods:{callUpdate:function(){this.app&&this.$vuetify.application.register(this._uid,this.applicationProperty,this.updateApplication())},removeApplication:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];(t||this.app)&&this.$vuetify.application.unregister(this._uid,this.applicationProperty)},updateApplication:function(){return 0}}})}},"4f6c":function(t,i,e){t.exports=e.p+"img/logonew.f17258eb.png"},"5e6c":function(t,i,e){},7958:function(t,i,e){},9224:function(t){t.exports=JSON.parse('{"a":"2.1.52"}')},"9d01":function(t,i,e){},b73d:function(t,i,e){"use strict";e("0481"),e("4069");var n=e("15fd"),a=e("5530"),s=(e("ec29"),e("9d01"),e("fe09")),o=e("c37a"),r=e("c3f0"),c=e("0789"),l=e("490a"),h=e("80d2");i["a"]=s["a"].extend({name:"v-switch",directives:{Touch:r["a"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return Object(a["a"])(Object(a["a"])({},o["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){var t=this.attrs$,i=(t.title,Object(n["a"])(t,["title"]));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",Object(a["a"])(Object(a["a"])({},this.attrs),i)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",Object(a["a"])({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",Object(a["a"])({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(c["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(l["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(t){(t.keyCode===h["z"].left&&this.isActive||t.keyCode===h["z"].right&&!this.isActive)&&this.onChange()}}})},f9cb:function(t,i,e){"use strict";var n=e("5e6c"),a=e.n(n);a.a}}]);
//# sourceMappingURL=chunk-31a799e8.b89d3a65.js.map