(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f9f18af8"],{"0418":function(t,i,e){},"09ae":function(t,i,e){"use strict";e.r(i);var n=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("v-navigation-drawer",t._b({attrs:{id:"core-navigation-drawer",touchless:"","expand-on-hover":t.expandOnHover,right:t.$vuetify.rtl,app:"","mini-variant-width":"80","mobile-break-point":"960",width:"260"},model:{value:t.drawer,callback:function(i){t.drawer=i},expression:"drawer"}},"v-navigation-drawer",t.$attrs,!1),[n("v-list-item",[n("v-list-item-avatar",[n("v-avatar",{staticClass:"logo-mini white"},[n("img",{attrs:{src:e("4f6c"),alt:"John"}})])],1),n("v-list-item-content",[n("v-list-item-title",[n("span",{staticClass:"overline"},[t._v(t._s(t.$t("Aaden ADMIN")))])]),n("v-list-item-subtitle",[t._v(" "+t._s(t.Version)+" ")])],1)],1),n("v-switch",{staticClass:"pl-4",attrs:{label:t.$t("briefView")+": "+(t.toggleBriefView?t.$t("on"):t.$t("off"))},model:{value:t.toggleBriefView,callback:function(i){t.toggleBriefView=i},expression:"toggleBriefView"}}),n("v-divider",{staticClass:"mb-2"}),n("v-list",{attrs:{expand:"",nav:""}},[n("div"),t._l(t.computedItems,(function(t,i){return[[t.children?n("base-item-group",{key:"group-"+i,attrs:{item:t}}):n("base-item",{key:"item-"+i,attrs:{item:t}})]]})),n("div")],2)],1)},a=[],s=(e("4de4"),e("d81d"),e("2909")),o=e("b85c"),r=e("5530"),c=e("2f62"),l=e("9224");console.log(l["a"]);var h={name:"DashboardCoreDrawer",props:{expandOnHover:{type:Boolean,default:!1}},data:function(){return{items:[{icon:"mdi-view-dashboard",title:"dashboard",accessRight:0,to:"/",brief:!0},{title:"Zbon日历",accessRight:1,icon:"mdi-calendar",to:"/Bills/daily-zbon",brief:!0},{title:"Zbon列表",accessRight:1,icon:"mdi-format-list-bulleted",to:"/Bills/zbonlist",brief:!0},{group:"/dishes",icon:"mdi-food",title:"菜品",accessRight:0,children:[{title:"标签管理",icon:"mdi-label",to:"labels-manage",brief:!0},{title:"菜品管理",icon:"mdi-food-fork-drink",to:"dishes-manage",brief:!0},{title:"快速添加菜品",icon:"mdi-food-fork-drink",to:"dish-quick-create"},{title:"属性组",icon:"mdi-calculator-variant",to:"attribute-group"},{title:"BuffetChildSetting",icon:"mdi-calculator-variant",to:"buffet-child-setting"},{title:"过敏源设置",icon:"mdi-help",to:"allergen-setting"},{title:"折扣规则设置",icon:"mdi-help",to:"discount-rules-setting"}]},{group:"/Tables",icon:"mdi-desktop-mac",title:"桌子&人员",accessRight:1,children:[{title:"分区管理",icon:"mdi-desktop-tower-monitor",to:"section-manage"},{title:"桌子管理",icon:"mdi-table-chair",to:"tables-manage"},{title:"人员管理",icon:"mdi-account-switch",to:"person-manage"}]},{group:"/Sales",icon:"mdi-chart-line",title:"销售",accessRight:1,children:[{title:"自助餐设置",icon:"mdi-buffet",to:"BuffetSetting",brief:!0},{title:"菜品统计",icon:"mdi-calculator-variant",to:"dish-statistics"},{title:"高级销售分析",icon:"mdi-calculator-variant",to:"sales-insight"},{title:"配送距离设置",icon:"mdi-help",to:"delivery-range-setting"},{title:"营业时间设置",icon:"mdi-help",to:"open-time-setting"},{title:"用户管理",icon:"mdi-help",to:"user-management"},{title:"会员卡销售记录",icon:"mdi-help",to:"member-card-sale-record"},{title:"CoronaInfo",icon:"mdi-virus",to:"corona-info"}]},{group:"/Bills",icon:"mdi-account-cash",title:"账单",accessRight:1,children:[{title:"本日总汇",icon:"mdi-calendar-account",to:"today-bills"},{title:"全部账单",icon:"mdi-currency-usd",to:"history-bills",brief:!0},{title:"导出CSV",icon:"mdi-format-list-bulleted",to:"exportcsv"},{title:"我的记账本",icon:"mdi-format-list-bulleted",to:"simpleaccounting"}]},{group:"/Printer",icon:"mdi-printer",title:"打印",accessRight:0,children:[{title:"操作记录",icon:"mdi-developer-board",to:"operationlist"},{title:"分区打印设置",icon:"mdi-cog-transfer",to:"section-printer-setting",brief:!0},{title:"设备列表",icon:"mdi-devices",to:"devicelist"},{title:"打印单列表",icon:"mdi-clipboard-list",to:"printerlist"},{title:"BonTemplate",icon:"mdi-clipboard-list",to:"bon-template"}]},{group:"/Setting",icon:"mdi-account-cog",title:"设置",accessRight:1,children:[{title:"支付设置",icon:"mdi-help",to:"paymentpage"},{title:"预定设置",icon:"mdi-calendar-today",to:"reservation"},{title:"餐馆身份",icon:"mdi-silver-ware",to:"restaurant-info"},{title:"图片设置",icon:"mdi-silver-ware",to:"restaurant-image"},{title:"系统设置",icon:"mdi-help",to:"aaden-system-setting"},{title:"关于我们",icon:"mdi-account-group",to:"about-us"}]}],Version:l["a"],toggleBriefView:!0}},computed:Object(r["a"])(Object(r["a"])({},Object(c["c"])(["barColor","barImage","accessLevel"])),{},{drawer:{get:function(){return this.$store.state.drawer},set:function(t){console.log(t),this.$store.commit("SET_DRAWER",t)}},computedItems:function(){var t=this.items.map(this.mapItem);if(this.toggleBriefView){for(var i=[],e=0;e<t.length;e++)if(void 0!==t[e].brief&&!0===t[e].brief&&i.push(t[e]),void 0!==t[e].children&&t[e].children.length>0){var n,a=t[e].children.filter((function(t){return void 0!==t.brief&&!0===t.brief})),r=Object(o["a"])(a);try{for(r.s();!(n=r.n()).done;){var c=n.value;c.to=t[e].group+"/"+c.to}}catch(l){r.e(l)}finally{r.f()}i.push.apply(i,Object(s["a"])(a))}return i}return t}}),watch:{"$vuetify.breakpoint.smAndDown":function(t){this.$emit("update:expandOnHover",!t)}},methods:Object(r["a"])(Object(r["a"])({},Object(c["b"])({setDrawer:"SET_DRAWER"})),{},{mapItem:function(t){return Object(r["a"])(Object(r["a"])({},t),{},{children:t.children?t.children.map(this.mapItem):void 0,title:this.$t(t.title)})}})},u=h,d=(e("f9cb"),e("2877")),p=e("6544"),v=e.n(p),m=e("8212"),f=e("ce7e"),g=e("8860"),b=e("da13"),w=e("8270"),y=e("5d23"),A=(e("99af"),e("a9e3"),e("c7cd"),e("7958"),e("adda")),O=e("3a66"),B=e("a9ad"),M=e("b848"),V=e("e4cd"),$=e("e707"),C=e("d10f"),R=e("7560"),x=e("a293"),k=e("dc22"),j=e("c3f0"),T=e("80d2"),_=e("58df"),I=Object(_["a"])(Object(O["a"])("left",["isActive","isMobile","miniVariant","expandOnHover","permanent","right","temporary","width"]),B["a"],M["a"],V["a"],$["a"],C["a"],R["a"]),S=I.extend({name:"v-navigation-drawer",directives:{ClickOutside:x["a"],Resize:k["a"],Touch:j["a"]},provide:function(){return{isInNav:"nav"===this.tag}},props:{bottom:Boolean,clipped:Boolean,disableResizeWatcher:Boolean,disableRouteWatcher:Boolean,expandOnHover:Boolean,floating:Boolean,height:{type:[Number,String],default:function(){return this.app?"100vh":"100%"}},miniVariant:Boolean,miniVariantWidth:{type:[Number,String],default:56},permanent:Boolean,right:Boolean,src:{type:[String,Object],default:""},stateless:Boolean,tag:{type:String,default:function(){return this.app?"nav":"aside"}},temporary:Boolean,touchless:Boolean,width:{type:[Number,String],default:256},value:null},data:function(){return{isMouseover:!1,touchArea:{left:0,right:0},stackMinZIndex:6}},computed:{applicationProperty:function(){return this.right?"right":"left"},classes:function(){return Object(r["a"])({"v-navigation-drawer":!0,"v-navigation-drawer--absolute":this.absolute,"v-navigation-drawer--bottom":this.bottom,"v-navigation-drawer--clipped":this.clipped,"v-navigation-drawer--close":!this.isActive,"v-navigation-drawer--fixed":!this.absolute&&(this.app||this.fixed),"v-navigation-drawer--floating":this.floating,"v-navigation-drawer--is-mobile":this.isMobile,"v-navigation-drawer--is-mouseover":this.isMouseover,"v-navigation-drawer--mini-variant":this.isMiniVariant,"v-navigation-drawer--custom-mini-variant":56!==Number(this.miniVariantWidth),"v-navigation-drawer--open":this.isActive,"v-navigation-drawer--open-on-hover":this.expandOnHover,"v-navigation-drawer--right":this.right,"v-navigation-drawer--temporary":this.temporary},this.themeClasses)},computedMaxHeight:function(){if(!this.hasApp)return null;var t=this.$vuetify.application.bottom+this.$vuetify.application.footer+this.$vuetify.application.bar;return this.clipped?t+this.$vuetify.application.top:t},computedTop:function(){if(!this.hasApp)return 0;var t=this.$vuetify.application.bar;return t+=this.clipped?this.$vuetify.application.top:0,t},computedTransform:function(){return this.isActive?0:this.isBottom||this.right?100:-100},computedWidth:function(){return this.isMiniVariant?this.miniVariantWidth:this.width},hasApp:function(){return this.app&&!this.isMobile&&!this.temporary},isBottom:function(){return this.bottom&&this.isMobile},isMiniVariant:function(){return!this.expandOnHover&&this.miniVariant||this.expandOnHover&&!this.isMouseover},isMobile:function(){return!this.stateless&&!this.permanent&&V["a"].options.computed.isMobile.call(this)},reactsToClick:function(){return!this.stateless&&!this.permanent&&(this.isMobile||this.temporary)},reactsToMobile:function(){return this.app&&!this.disableResizeWatcher&&!this.permanent&&!this.stateless&&!this.temporary},reactsToResize:function(){return!this.disableResizeWatcher&&!this.stateless},reactsToRoute:function(){return!this.disableRouteWatcher&&!this.stateless&&(this.temporary||this.isMobile)},showOverlay:function(){return!this.hideOverlay&&this.isActive&&(this.isMobile||this.temporary)},styles:function(){var t=this.isBottom?"translateY":"translateX";return{height:Object(T["g"])(this.height),top:this.isBottom?"auto":Object(T["g"])(this.computedTop),maxHeight:null!=this.computedMaxHeight?"calc(100% - ".concat(Object(T["g"])(this.computedMaxHeight),")"):void 0,transform:"".concat(t,"(").concat(Object(T["g"])(this.computedTransform,"%"),")"),width:Object(T["g"])(this.computedWidth)}}},watch:{$route:"onRouteChange",isActive:function(t){this.$emit("input",t)},isMobile:function(t,i){!t&&this.isActive&&!this.temporary&&this.removeOverlay(),null!=i&&this.reactsToResize&&this.reactsToMobile&&(this.isActive=!t)},permanent:function(t){t&&(this.isActive=!0)},showOverlay:function(t){t?this.genOverlay():this.removeOverlay()},value:function(t){this.permanent||(null!=t?t!==this.isActive&&(this.isActive=t):this.init())},expandOnHover:"updateMiniVariant",isMouseover:function(t){this.updateMiniVariant(!t)}},beforeMount:function(){this.init()},methods:{calculateTouchArea:function(){var t=this.$el.parentNode;if(t){var i=t.getBoundingClientRect();this.touchArea={left:i.left+50,right:i.right-50}}},closeConditional:function(){return this.isActive&&!this._isDestroyed&&this.reactsToClick},genAppend:function(){return this.genPosition("append")},genBackground:function(){var t={height:"100%",width:"100%",src:this.src},i=this.$scopedSlots.img?this.$scopedSlots.img(t):this.$createElement(A["a"],{props:t});return this.$createElement("div",{staticClass:"v-navigation-drawer__image"},[i])},genDirectives:function(){var t=this,i=[{name:"click-outside",value:{handler:function(){t.isActive=!1},closeConditional:this.closeConditional,include:this.getOpenDependentElements}}];return this.touchless||this.stateless||i.push({name:"touch",value:{parent:!0,left:this.swipeLeft,right:this.swipeRight}}),i},genListeners:function(){var t=this,i={transitionend:function(i){if(i.target===i.currentTarget){t.$emit("transitionend",i);var e=document.createEvent("UIEvents");e.initUIEvent("resize",!0,!1,window,0),window.dispatchEvent(e)}}};return this.miniVariant&&(i.click=function(){return t.$emit("update:mini-variant",!1)}),this.expandOnHover&&(i.mouseenter=function(){return t.isMouseover=!0},i.mouseleave=function(){return t.isMouseover=!1}),i},genPosition:function(t){var i=Object(T["s"])(this,t);return i?this.$createElement("div",{staticClass:"v-navigation-drawer__".concat(t)},i):i},genPrepend:function(){return this.genPosition("prepend")},genContent:function(){return this.$createElement("div",{staticClass:"v-navigation-drawer__content"},this.$slots.default)},genBorder:function(){return this.$createElement("div",{staticClass:"v-navigation-drawer__border"})},init:function(){this.permanent?this.isActive=!0:this.stateless||null!=this.value?this.isActive=this.value:this.temporary||(this.isActive=!this.isMobile)},onRouteChange:function(){this.reactsToRoute&&this.closeConditional()&&(this.isActive=!1)},swipeLeft:function(t){this.isActive&&this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(this.right&&t.touchstartX>=this.touchArea.right?this.isActive=!0:!this.right&&this.isActive&&(this.isActive=!1)))},swipeRight:function(t){this.isActive&&!this.right||(this.calculateTouchArea(),Math.abs(t.touchendX-t.touchstartX)<100||(!this.right&&t.touchstartX<=this.touchArea.left?this.isActive=!0:this.right&&this.isActive&&(this.isActive=!1)))},updateApplication:function(){if(!this.isActive||this.isMobile||this.temporary||!this.$el)return 0;var t=Number(this.computedWidth);return isNaN(t)?this.$el.clientWidth:t},updateMiniVariant:function(t){this.miniVariant!==t&&this.$emit("update:mini-variant",t)}},render:function(t){var i=[this.genPrepend(),this.genContent(),this.genAppend(),this.genBorder()];return(this.src||Object(T["s"])(this,"img"))&&i.unshift(this.genBackground()),t(this.tag,this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,directives:this.genDirectives(),on:this.genListeners()}),i)}}),E=e("b73d"),H=Object(d["a"])(u,n,a,!1,null,null,null);i["default"]=H.exports;v()(H,{VAvatar:m["a"],VDivider:f["a"],VList:g["a"],VListItem:b["a"],VListItemAvatar:w["a"],VListItemContent:y["b"],VListItemSubtitle:y["c"],VListItemTitle:y["d"],VNavigationDrawer:S,VSwitch:E["a"]})},"4f6c":function(t,i,e){t.exports=e.p+"img/logonew.f17258eb.png"},7958:function(t,i,e){},9224:function(t){t.exports=JSON.parse('{"a":"2.1.51"}')},f9cb:function(t,i,e){"use strict";var n=e("0418"),a=e.n(n);a.a}}]);
//# sourceMappingURL=chunk-f9f18af8.4a8b5b5e.js.map