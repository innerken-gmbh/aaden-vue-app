(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-992d9150"],{"0fd9":function(t,e,n){"use strict";n("99af"),n("4160"),n("caad"),n("13d5"),n("4ec9"),n("b64b"),n("d3b7"),n("ac1f"),n("2532"),n("3ca3"),n("5319"),n("159b"),n("ddb0");var i=n("ade3"),a=n("5530"),o=(n("4b85"),n("2b0e")),r=n("d9f7"),s=n("80d2"),c=["sm","md","lg","xl"],l=["start","end","center"];function d(t,e){return c.reduce((function(n,i){return n[t+Object(s["H"])(i)]=e(),n}),{})}var u=function(t){return[].concat(l,["baseline","stretch"]).includes(t)},h=d("align",(function(){return{type:String,default:null,validator:u}})),f=function(t){return[].concat(l,["space-between","space-around"]).includes(t)},v=d("justify",(function(){return{type:String,default:null,validator:f}})),m=function(t){return[].concat(l,["space-between","space-around","stretch"]).includes(t)},p=d("alignContent",(function(){return{type:String,default:null,validator:m}})),g={align:Object.keys(h),justify:Object.keys(v),alignContent:Object.keys(p)},y={align:"align",justify:"justify",alignContent:"align-content"};function b(t,e,n){var i=y[t];if(null!=n){if(e){var a=e.replace(t,"");i+="-".concat(a)}return i+="-".concat(n),i.toLowerCase()}}var w=new Map;e["a"]=o["a"].extend({name:"v-row",functional:!0,props:Object(a["a"])(Object(a["a"])(Object(a["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:u}},h),{},{justify:{type:String,default:null,validator:f}},v),{},{alignContent:{type:String,default:null,validator:m}},p),render:function(t,e){var n=e.props,a=e.data,o=e.children,s="";for(var c in n)s+=String(n[c]);var l=w.get(s);return l||function(){var t,e;for(e in l=[],g)g[e].forEach((function(t){var i=n[t],a=b(e,t,i);a&&l.push(a)}));l.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(i["a"])(t,"align-".concat(n.align),n.align),Object(i["a"])(t,"justify-".concat(n.justify),n.justify),Object(i["a"])(t,"align-content-".concat(n.alignContent),n.alignContent),t)),w.set(s,l)}(),t(n.tag,Object(r["a"])(a,{staticClass:"row",class:l}),o)}})},"169a":function(t,e,n){"use strict";n("7db0"),n("caad"),n("45fc"),n("a9e3"),n("2532"),n("498a");var i=n("5530"),a=n("2909"),o=n("ade3"),r=(n("368e"),n("480e")),s=n("4ad4"),c=n("b848"),l=n("75eb"),d=n("e707"),u=n("e4d3"),h=n("21be"),f=n("f2e7"),v=n("a293"),m=n("58df"),p=n("d9bd"),g=n("80d2"),y=Object(m["a"])(s["a"],c["a"],l["a"],d["a"],u["a"],h["a"],f["a"]);e["a"]=y.extend({name:"v-dialog",directives:{ClickOutside:v["a"]},props:{dark:Boolean,disabled:Boolean,fullscreen:Boolean,light:Boolean,maxWidth:{type:[String,Number],default:"none"},noClickAnimation:Boolean,origin:{type:String,default:"center center"},persistent:Boolean,retainFocus:{type:Boolean,default:!0},scrollable:Boolean,transition:{type:[String,Boolean],default:"dialog-transition"},width:{type:[String,Number],default:"auto"}},data:function(){return{activatedBy:null,animate:!1,animateTimeout:-1,isActive:!!this.value,stackMinZIndex:200}},computed:{classes:function(){var t;return t={},Object(o["a"])(t,"v-dialog ".concat(this.contentClass).trim(),!0),Object(o["a"])(t,"v-dialog--active",this.isActive),Object(o["a"])(t,"v-dialog--persistent",this.persistent),Object(o["a"])(t,"v-dialog--fullscreen",this.fullscreen),Object(o["a"])(t,"v-dialog--scrollable",this.scrollable),Object(o["a"])(t,"v-dialog--animated",this.animate),t},contentClasses:function(){return{"v-dialog__content":!0,"v-dialog__content--active":this.isActive}},hasActivator:function(){return Boolean(!!this.$slots.activator||!!this.$scopedSlots.activator)}},watch:{isActive:function(t){t?(this.show(),this.hideScroll()):(this.removeOverlay(),this.unbind())},fullscreen:function(t){this.isActive&&(t?(this.hideScroll(),this.removeOverlay(!1)):(this.showScroll(),this.genOverlay()))}},created:function(){this.$attrs.hasOwnProperty("full-width")&&Object(p["e"])("full-width",this)},beforeMount:function(){var t=this;this.$nextTick((function(){t.isBooted=t.isActive,t.isActive&&t.show()}))},beforeDestroy:function(){"undefined"!==typeof window&&this.unbind()},methods:{animateClick:function(){var t=this;this.animate=!1,this.$nextTick((function(){t.animate=!0,window.clearTimeout(t.animateTimeout),t.animateTimeout=window.setTimeout((function(){return t.animate=!1}),150)}))},closeConditional:function(t){var e=t.target;return!(this._isDestroyed||!this.isActive||this.$refs.content.contains(e)||this.overlay&&e&&!this.overlay.$el.contains(e))&&this.activeZIndex>=this.getMaxZIndex()},hideScroll:function(){this.fullscreen?document.documentElement.classList.add("overflow-y-hidden"):d["a"].options.methods.hideScroll.call(this)},show:function(){var t=this;!this.fullscreen&&!this.hideOverlay&&this.genOverlay(),this.$nextTick((function(){t.$refs.content.focus(),t.bind()}))},bind:function(){window.addEventListener("focusin",this.onFocusin)},unbind:function(){window.removeEventListener("focusin",this.onFocusin)},onClickOutside:function(t){this.$emit("click:outside",t),this.persistent?this.noClickAnimation||this.animateClick():this.isActive=!1},onKeydown:function(t){if(t.keyCode===g["y"].esc&&!this.getOpenDependents().length)if(this.persistent)this.noClickAnimation||this.animateClick();else{this.isActive=!1;var e=this.getActivator();this.$nextTick((function(){return e&&e.focus()}))}this.$emit("keydown",t)},onFocusin:function(t){if(t&&this.retainFocus){var e=t.target;if(e&&![document,this.$refs.content].includes(e)&&!this.$refs.content.contains(e)&&this.activeZIndex>=this.getMaxZIndex()&&!this.getOpenDependentElements().some((function(t){return t.contains(e)}))){var n=this.$refs.content.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),i=Object(a["a"])(n).find((function(t){return!t.hasAttribute("disabled")}));i&&i.focus()}}},genContent:function(){var t=this;return this.showLazyContent((function(){return[t.$createElement(r["a"],{props:{root:!0,light:t.light,dark:t.dark}},[t.$createElement("div",{class:t.contentClasses,attrs:Object(i["a"])({role:"document",tabindex:t.isActive?0:void 0},t.getScopeIdAttrs()),on:{keydown:t.onKeydown},style:{zIndex:t.activeZIndex},ref:"content"},[t.genTransition()])])]}))},genTransition:function(){var t=this.genInnerContent();return this.transition?this.$createElement("transition",{props:{name:this.transition,origin:this.origin,appear:!0}},[t]):t},genInnerContent:function(){var t={class:this.classes,ref:"dialog",directives:[{name:"click-outside",value:{handler:this.onClickOutside,closeConditional:this.closeConditional,include:this.getOpenDependentElements}},{name:"show",value:this.isActive}],style:{transformOrigin:this.origin}};return this.fullscreen||(t.style=Object(i["a"])(Object(i["a"])({},t.style),{},{maxWidth:"none"===this.maxWidth?void 0:Object(g["g"])(this.maxWidth),width:"auto"===this.width?void 0:Object(g["g"])(this.width)})),this.$createElement("div",t,this.getContentSlot())}},render:function(t){return t("div",{staticClass:"v-dialog__container",class:{"v-dialog__container--attached":""===this.attach||!0===this.attach||"attach"===this.attach},attrs:{role:"dialog"}},[this.genActivator(),this.genContent()])}})},"368e":function(t,e,n){},"3bbb":function(t,e,n){"use strict";n("b0c0"),n("ac1f"),n("1276");var i=n("5530"),a=(n("96cf"),n("1da1")),o=n("5089"),r=n("c0d6"),s=n("f4d6"),c=n("9d8f"),l=n.n(c),d={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},photo:{displayName:"image",type:s["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return r["a"].getters.rootUrl+o["b"].servantRoot}},requiredEdit:!1,requiredNew:!1,md:12},header:!1},name:{displayName:"servantName"},password:{},permission:{type:s["IKDataEntity"].Types.Boolean},isPartTime:{type:s["IKDataEntity"].Types.Boolean}},u={add:function(t){return l.a.postWithUploadFile("Servant.php?op=add",t,{showLoading:!0})},edit:function(t){return t.file&&(t.imageExt=t.file.name.split(".").lastItem),l.a.postWithUploadFile("Servant.php?op=update",t,{showLoading:!0})},remove:function(t){return l.a.post("Servant.php?op=delete",{id:t})},load:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l.a.get("Servant.php",Object(i["a"])({lang:o["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=s["IKDataEntity"].ModelFactory(d,u)},"3c93":function(t,e,n){},dbc6:function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("v-container",{attrs:{fluid:""}},[n("ik-data-table",{attrs:{model:t.model,"entity-name":t.$t("人员管理"),icon:"mdi-account"},scopedSlots:t._u([{key:"filterRight",fn:function(){return[n("v-btn",{staticClass:"ml-2 mr-2",attrs:{small:"",color:"red darken-2",dark:""},on:{click:function(e){t.dialog=!0}}},[t._v(" "+t._s(t.$t("打印跑堂日结单"))+" "),n("v-icon",{attrs:{dark:"",right:""}},[t._v(" mdi-plus ")])],1),n("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[n("v-card",[n("v-card-title",[n("span",{staticClass:"headline"},[t._v(t._s(t.$t("打印跑堂日结单")))])]),n("v-card-text",[n("v-container",[n("v-row",[n("v-col",{attrs:{cols:"12",md:"12",sm:"12"}},[n("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":t.dates,"offset-y":""},on:{"update:returnValue":function(e){t.dates=e},"update:return-value":function(e){t.dates=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var i=e.on;return[n("v-text-field",t._g({attrs:{"hide-details":"",label:t.$t("日期筛选"),"prepend-icon":"mdi-calendar","single-line":""},model:{value:t.dates,callback:function(e){t.dates=e},expression:"dates"}},i))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[n("v-date-picker",{attrs:{"full-width":"","no-title":"",range:"",scrollable:"",locale:"de"},model:{value:t.dates,callback:function(e){t.dates=e},expression:"dates"}},[n("v-spacer"),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.menu=!1}}},[t._v(" "+t._s(t.$t("Cancel"))+" ")]),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menu.save(t.dates)}}},[t._v(" "+t._s(t.$t("Ok"))+" ")])],1)],1)],1)],1)],1)],1),n("v-card-actions",[n("v-spacer"),n("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" "+t._s(t.$t("Cancel"))+" ")]),n("v-btn",{attrs:{color:"blue darken-1"},on:{click:t.printAllServantBon}},[t._v(" "+t._s(t.$t("打印"))+" ")])],1)],1)],1)]},proxy:!0},{key:"item.action",fn:function(e){var i=e.item;return[n("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.goNext(i)}}},[t._v(" mdi-arrow-right ")])]}}])})],1)],1)},a=[],o=(n("4160"),n("159b"),n("96cf"),n("1da1")),r=n("5089"),s=n("c787"),c=n("f4d6"),l=n("3bbb"),d=n("0a61"),u=n("ff51"),h={components:{IkDataTable:c["IkDataTable"]},data:function(){return{model:l["a"],dates:[],menu:!1,dialog:!1}},computed:{ImageRoot:function(){return this.$store.getters.rootUrl+r["b"].servantRoot}},mounted:function(){this.dates=[Object(u["a"])(0),Object(u["a"])(0)]},methods:{clear:function(){this.dates=[]},printAllServantBon:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return void 0===t.dates[1]&&(t.dates[1]=t.dates[0]),Date.parse(t.dates[0])>Date.parse(t.dates[1])&&(n=[t.dates[1],t.dates[0]],t.dates[0]=n[0],t.dates[1]=n[1]),e.next=4,l["a"].getList();case 4:i=e.sent,i.forEach((function(e){Object(d["D"])(e.id,t.dates[0],t.dates[1]).then((function(){s["default"].toast(),t.menu=!1,t.dialog=!1}))}));case 6:case"end":return e.stop()}}),e)})))()},goNext:function(t){this.$router.push({name:"Keller Detail Seite",params:{id:t.id}})}}},f=h,v=n("2877"),m=n("6544"),p=n.n(m),g=n("8336"),y=n("b0af"),b=n("99d9"),w=n("62ad"),k=n("a523"),O=n("2e4b"),C=n("169a"),x=n("132d"),S=n("e449"),$=n("0fd9"),j=n("2fa4"),E=n("8654"),_=Object(v["a"])(f,i,a,!1,null,null,null);e["default"]=_.exports;p()(_,{VBtn:g["a"],VCard:y["a"],VCardActions:b["a"],VCardText:b["c"],VCardTitle:b["d"],VCol:w["a"],VContainer:k["a"],VDatePicker:O["a"],VDialog:C["a"],VIcon:x["a"],VMenu:S["a"],VRow:$["a"],VSpacer:j["a"],VTextField:E["a"]})},e707:function(t,e,n){"use strict";n("caad"),n("a9e3"),n("2532");var i=n("5530"),a=(n("3c93"),n("a9ad")),o=n("7560"),r=n("f2e7"),s=n("58df"),c=Object(s["a"])(a["a"],o["a"],r["a"]).extend({name:"v-overlay",props:{absolute:Boolean,color:{type:String,default:"#212121"},dark:{type:Boolean,default:!0},opacity:{type:[Number,String],default:.46},value:{default:!0},zIndex:{type:[Number,String],default:5}},computed:{__scrim:function(){var t=this.setBackgroundColor(this.color,{staticClass:"v-overlay__scrim",style:{opacity:this.computedOpacity}});return this.$createElement("div",t)},classes:function(){return Object(i["a"])({"v-overlay--absolute":this.absolute,"v-overlay--active":this.isActive},this.themeClasses)},computedOpacity:function(){return Number(this.isActive?this.opacity:0)},styles:function(){return{zIndex:this.zIndex}}},methods:{genContent:function(){return this.$createElement("div",{staticClass:"v-overlay__content"},this.$slots.default)}},render:function(t){var e=[this.__scrim];return this.isActive&&e.push(this.genContent()),t("div",{staticClass:"v-overlay",class:this.classes,style:this.styles},e)}}),l=c,d=n("80d2"),u=n("2b0e");e["a"]=u["a"].extend().extend({name:"overlayable",props:{hideOverlay:Boolean,overlayColor:String,overlayOpacity:[Number,String]},data:function(){return{animationFrame:0,overlay:null}},watch:{hideOverlay:function(t){this.isActive&&(t?this.removeOverlay():this.genOverlay())}},beforeDestroy:function(){this.removeOverlay()},methods:{createOverlay:function(){var t=new l({propsData:{absolute:this.absolute,value:!1,color:this.overlayColor,opacity:this.overlayOpacity}});t.$mount();var e=this.absolute?this.$el.parentNode:document.querySelector("[data-app]");e&&e.insertBefore(t.$el,e.firstChild),this.overlay=t},genOverlay:function(){var t=this;if(this.hideScroll(),!this.hideOverlay)return this.overlay||this.createOverlay(),this.animationFrame=requestAnimationFrame((function(){t.overlay&&(void 0!==t.activeZIndex?t.overlay.zIndex=String(t.activeZIndex-1):t.$el&&(t.overlay.zIndex=Object(d["u"])(t.$el)),t.overlay.value=!0)})),!0},removeOverlay:function(){var t=this,e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];this.overlay&&(Object(d["a"])(this.overlay.$el,"transitionend",(function(){t.overlay&&t.overlay.$el&&t.overlay.$el.parentNode&&!t.overlay.value&&(t.overlay.$el.parentNode.removeChild(t.overlay.$el),t.overlay.$destroy(),t.overlay=null)})),cancelAnimationFrame(this.animationFrame),this.overlay.value=!1),e&&this.showScroll()},scrollListener:function(t){if("keydown"===t.type){if(["INPUT","TEXTAREA","SELECT"].includes(t.target.tagName)||t.target.isContentEditable)return;var e=[d["y"].up,d["y"].pageup],n=[d["y"].down,d["y"].pagedown];if(e.includes(t.keyCode))t.deltaY=-1;else{if(!n.includes(t.keyCode))return;t.deltaY=1}}(t.target===this.overlay||"keydown"!==t.type&&t.target===document.body||this.checkPath(t))&&t.preventDefault()},hasScrollbar:function(t){if(!t||t.nodeType!==Node.ELEMENT_NODE)return!1;var e=window.getComputedStyle(t);return["auto","scroll"].includes(e.overflowY)&&t.scrollHeight>t.clientHeight},shouldScroll:function(t,e){return 0===t.scrollTop&&e<0||t.scrollTop+t.clientHeight===t.scrollHeight&&e>0},isInside:function(t,e){return t===e||null!==t&&t!==document.body&&this.isInside(t.parentNode,e)},checkPath:function(t){var e=t.path||this.composedPath(t),n=t.deltaY;if("keydown"===t.type&&e[0]===document.body){var i=this.$refs.dialog,a=window.getSelection().anchorNode;return!(i&&this.hasScrollbar(i)&&this.isInside(a,i))||this.shouldScroll(i,n)}for(var o=0;o<e.length;o++){var r=e[o];if(r===document)return!0;if(r===document.documentElement)return!0;if(r===this.$refs.content)return!0;if(this.hasScrollbar(r))return this.shouldScroll(r,n)}return!0},composedPath:function(t){if(t.composedPath)return t.composedPath();var e=[],n=t.target;while(n){if(e.push(n),"HTML"===n.tagName)return e.push(document),e.push(window),e;n=n.parentElement}return e},hideScroll:function(){this.$vuetify.breakpoint.smAndDown?document.documentElement.classList.add("overflow-y-hidden"):(Object(d["b"])(window,"wheel",this.scrollListener,{passive:!1}),window.addEventListener("keydown",this.scrollListener))},showScroll:function(){document.documentElement.classList.remove("overflow-y-hidden"),window.removeEventListener("wheel",this.scrollListener),window.removeEventListener("keydown",this.scrollListener)}}})},ff51:function(t,e,n){"use strict";n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return a}));n("a15b");function i(t){var e=new Date,n=e.getTime(),i=864e5,a=n+t*i,o=new Date(a),r=o.getFullYear(),s=o.getMonth()+1,c=o.getDate();return[r,s,c].join("-")}function a(t){var e=new Date,n=e.getTime(),i=864e5,a=n+t*i,o=new Date(a),r=o.getFullYear()+"-",s=o.getMonth()+1,c=o.getDate(),l=o.getHours()<10?"0"+o.getHours():o.getHours(),d=o.getMinutes()<10?"0"+o.getMinutes():o.getMinutes(),u=o.getSeconds()<10?"0"+o.getSeconds():o.getSeconds();return r+s+"-"+c+" "+l+":"+d+":"+u}}}]);
//# sourceMappingURL=chunk-992d9150.056ca717.js.map