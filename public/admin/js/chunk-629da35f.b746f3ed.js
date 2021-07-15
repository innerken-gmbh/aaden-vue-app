(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-629da35f"],{"0e51":function(t,e,n){"use strict";n.r(e);var i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{attrs:{id:"wizard",tag:"section"}},[n("validation-observer",{scopedSlots:t._u([{key:"default",fn:function(e){var i=e.valid;return[n("base-material-wizard",{staticClass:"mx-auto",attrs:{"available-steps":t.availableSteps,items:t.tabs},on:{"click:next":function(e){return t.next(i)},"click:prev":function(e){t.tab--}},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[n("v-tab-item",{staticClass:"pb-12"},[n("form",[n("div",{staticClass:"text-center display-1 font-weight-light mb-6"},[t._v(" Let's start with basic information (with validation) ")]),n("v-row",{staticClass:"mx-auto",staticStyle:{"max-width":"500px"},attrs:{justify:"space-around"}},[n("v-col",{staticClass:"text-center",attrs:{cols:"auto"}},[n("input",{ref:"file",staticClass:"d-none",attrs:{type:"file"},on:{change:t.onChange}}),n("v-card",{staticClass:"mx-auto mt-0 d-inline-flex v-card--account",class:t.image?"success--text":"grey--text",attrs:{height:"106",outlined:"",width:"106"},on:{click:function(e){return t.$refs.file.click()}}},[t.image?n("v-img",{attrs:{src:t.image,height:"100%",width:"100%"}}):n("v-icon",{staticClass:"mx-auto",attrs:{size:"96"}},[t._v(" mdi-account ")])],1),n("div",{staticClass:"font-weight-bold grey--text"},[t._v(" CHOOSE PICTURE ")])],1),n("v-col",{attrs:{cols:"12",md:"6"}},[n("validation-provider",{attrs:{name:"first",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[n("v-text-field",{attrs:{"error-messages":i,color:"secondary",label:"First Name*","prepend-icon":"mdi-face","validate-on-blur":""},model:{value:t.first,callback:function(e){t.first=e},expression:"first"}})]}}],null,!0)}),n("validation-provider",{attrs:{name:"last",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[n("v-text-field",{attrs:{"error-messages":i,color:"secondary",label:"Last Name*","prepend-icon":"mdi-account","validate-on-blur":""},model:{value:t.last,callback:function(e){t.last=e},expression:"last"}})]}}],null,!0)})],1),n("v-col",{attrs:{cols:"12"}},[n("validation-provider",{attrs:{name:"email",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[n("v-text-field",{attrs:{"error-messages":i,color:"secondary",label:"Email*","prepend-icon":"mdi-email","validate-on-blur":""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})]}}],null,!0)})],1)],1)],1)]),n("v-tab-item",{staticClass:"pb-12"},[n("form",[n("v-responsive",{staticClass:"mx-auto",attrs:{"max-width":"500"}},[n("div",{staticClass:"text-center display-1 grey--text font-weight-light mb-6"},[t._v(" What are you doing? (checkboxes) ")]),n("validation-provider",{attrs:{name:"type",rules:"required"}},[n("input",{attrs:{type:"hidden"},domProps:{value:t.stringAccount}})]),n("v-item-group",{staticClass:"row",attrs:{multiple:""},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}},t._l(t.accounts,(function(e,i){return n("v-item",{key:i,scopedSlots:t._u([{key:"default",fn:function(i){var a=i.active,s=i.toggle;return[n("v-col",{staticClass:"text-center",attrs:{cols:"4"}},[n("v-card",{staticClass:"mb-6 mx-auto pa-10 d-inline-block v-card--account",class:a?"success--text":"grey--text",attrs:{outlined:""},on:{click:s}},[n("v-icon",{attrs:{large:""},domProps:{textContent:t._s(e.icon)}})],1),n("div",{staticClass:"text-uppercase subtitle-2 text--primary",domProps:{textContent:t._s(e.type)}})],1)]}}],null,!0)})})),1)],1)],1)]),n("v-tab-item",{staticClass:"pb-12"},[n("div",{staticClass:"text-center display-1 grey--text font-weight-light mb-6"},[t._v(" Are you living in a nice area? ")]),n("form",[n("v-row",{staticClass:"mx-auto",staticStyle:{"max-width":"500px"},attrs:{justify:"space-around"}},[n("v-col",{attrs:{cols:"12",md:"8"}},[n("validation-provider",{attrs:{name:"address",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[n("v-text-field",{attrs:{"error-messages":i,color:"secondary",label:"Street Name*","validate-on-blur":""},model:{value:t.address,callback:function(e){t.address=e},expression:"address"}})]}}],null,!0)})],1),n("v-col",{attrs:{cols:"12",md:"4"}},[n("validation-provider",{attrs:{name:"street",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[n("v-text-field",{attrs:{"error-messages":i,color:"secondary",label:"Street Number*","validate-on-blur":""},model:{value:t.street,callback:function(e){t.street=e},expression:"street"}})]}}],null,!0)})],1),n("v-col",{attrs:{cols:"12",md:"6"}},[n("validation-provider",{attrs:{name:"city",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[n("v-text-field",{attrs:{"error-messages":i,color:"secondary",label:"City*","validate-on-blur":""},model:{value:t.city,callback:function(e){t.city=e},expression:"city"}})]}}],null,!0)})],1),n("v-col",{attrs:{cols:"12",md:"6"}},[n("validation-provider",{attrs:{name:"state",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var i=e.errors;return[n("v-autocomplete",{attrs:{autocomplete:Date.now(),"error-messages":i,items:t.states,color:"secondary",label:"State*","validate-on-blur":""},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}})]}}],null,!0)})],1)],1)],1)])],1)]}}])})],1)},a=[],s=(n("caad"),n("a15b"),n("d3b7"),n("3ca3"),n("ddb0"),n("2b3d"),{name:"DashboardFormsWizard",data:function(){return{account:[],accounts:[{icon:"mdi-pencil",type:"design"},{icon:"mdi-code-tags",type:"code"},{icon:"mdi-laptop",type:"develop"}],address:"",city:"",email:"",first:"",image:null,last:"",state:"",states:["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Federated States of Micronesia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Marshall Islands","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Palau","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virgin Island","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],street:"",tab:0,tabs:["About","Account","Address"]}},computed:{stringAccount:function(){return this.account.join(",")},scope:function(){return 0===this.tab?"about":2===this.tab?"address":"account"},availableSteps:function(){var t=[0];return this.first&&this.last&&this.email&&t.push(1),this.stringAccount&&t.includes(1)&&t.push(2),this.address&&this.street&&this.city&&this.state&&t.includes(2)&&t.push(3),t}},methods:{next:function(t){t&&(this.tab===this.tabs.length-1?alert("Form finished"):this.tab++)},onChange:function(t){var e=t.target.files[0];if(!e)return this.image=null;this.image=URL.createObjectURL(e)}}}),r=s,o=(n("4d2a"),n("2877")),l=n("6544"),c=n.n(l),u=n("c6a6"),d=n("b0af"),h=n("62ad"),f=n("a523"),p=n("132d"),m=n("adda"),v=n("ade3"),g=n("4e82"),b=n("58df"),y=n("d9bd"),I=n("2b0e"),x=I["a"].extend({props:{activeClass:String,value:{required:!1}},data:function(){return{isActive:!1}},methods:{toggle:function(){this.isActive=!this.isActive}},render:function(){return this.$scopedSlots.default?(this.$scopedSlots.default&&(t=this.$scopedSlots.default({active:this.isActive,toggle:this.toggle})),Array.isArray(t)&&1===t.length&&(t=t[0]),t&&!Array.isArray(t)&&t.tag?(t.data=this._b(t.data||{},t.tag,{class:Object(v["a"])({},this.activeClass,this.isActive)}),t):(Object(y["c"])("v-item should only contain a single element",this),t)):(Object(y["c"])("v-item is missing a default scopedSlot",this),null);var t}}),S=Object(b["a"])(x,Object(g["a"])("itemGroup","v-item","v-item-group")).extend({name:"v-item"}),w=n("604c"),C=n("6b53"),k=n("0fd9"),j=n("c671"),T=n("8654"),O=Object(o["a"])(r,i,a,!1,null,null,null);e["default"]=O.exports;c()(O,{VAutocomplete:u["a"],VCard:d["a"],VCol:h["a"],VContainer:f["a"],VIcon:p["a"],VImg:m["a"],VItem:S,VItemGroup:w["b"],VResponsive:C["a"],VRow:k["a"],VTabItem:j["a"],VTextField:T["a"]})},"0fd9":function(t,e,n){"use strict";n("99af"),n("4160"),n("caad"),n("13d5"),n("4ec9"),n("b64b"),n("d3b7"),n("ac1f"),n("2532"),n("3ca3"),n("5319"),n("159b"),n("ddb0");var i=n("ade3"),a=n("5530"),s=(n("4b85"),n("2b0e")),r=n("d9f7"),o=n("80d2"),l=["sm","md","lg","xl"],c=["start","end","center"];function u(t,e){return l.reduce((function(n,i){return n[t+Object(o["H"])(i)]=e(),n}),{})}var d=function(t){return[].concat(c,["baseline","stretch"]).includes(t)},h=u("align",(function(){return{type:String,default:null,validator:d}})),f=function(t){return[].concat(c,["space-between","space-around"]).includes(t)},p=u("justify",(function(){return{type:String,default:null,validator:f}})),m=function(t){return[].concat(c,["space-between","space-around","stretch"]).includes(t)},v=u("alignContent",(function(){return{type:String,default:null,validator:m}})),g={align:Object.keys(h),justify:Object.keys(p),alignContent:Object.keys(v)},b={align:"align",justify:"justify",alignContent:"align-content"};function y(t,e,n){var i=b[t];if(null!=n){if(e){var a=e.replace(t,"");i+="-".concat(a)}return i+="-".concat(n),i.toLowerCase()}}var I=new Map;e["a"]=s["a"].extend({name:"v-row",functional:!0,props:Object(a["a"])(Object(a["a"])(Object(a["a"])({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:d}},h),{},{justify:{type:String,default:null,validator:f}},p),{},{alignContent:{type:String,default:null,validator:m}},v),render:function(t,e){var n=e.props,a=e.data,s=e.children,o="";for(var l in n)o+=String(n[l]);var c=I.get(o);return c||function(){var t,e;for(e in c=[],g)g[e].forEach((function(t){var i=n[t],a=y(e,t,i);a&&c.push(a)}));c.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(i["a"])(t,"align-".concat(n.align),n.align),Object(i["a"])(t,"justify-".concat(n.justify),n.justify),Object(i["a"])(t,"align-content-".concat(n.alignContent),n.alignContent),t)),I.set(o,c)}(),t(n.tag,Object(r["a"])(a,{staticClass:"row",class:c}),s)}})},"2bfd":function(t,e,n){},"4bb5":function(t,e,n){},"4d2a":function(t,e,n){"use strict";var i=n("4bb5"),a=n.n(i);a.a},c671:function(t,e,n){"use strict";var i=n("9d65"),a=n("4e82"),s=n("c3f0"),r=n("80d2"),o=n("58df"),l=Object(o["a"])(i["a"],Object(a["a"])("windowGroup","v-window-item","v-window")),c=l.extend().extend().extend({name:"v-window-item",directives:{Touch:s["a"]},props:{disabled:Boolean,reverseTransition:{type:[Boolean,String],default:void 0},transition:{type:[Boolean,String],default:void 0},value:{required:!1}},data:function(){return{isActive:!1,inTransition:!1}},computed:{classes:function(){return this.groupClasses},computedTransition:function(){return this.windowGroup.internalReverse?"undefined"!==typeof this.reverseTransition?this.reverseTransition||"":this.windowGroup.computedTransition:"undefined"!==typeof this.transition?this.transition||"":this.windowGroup.computedTransition}},methods:{genDefaultSlot:function(){return this.$slots.default},genWindowItem:function(){return this.$createElement("div",{staticClass:"v-window-item",class:this.classes,directives:[{name:"show",value:this.isActive}],on:this.$listeners},this.genDefaultSlot())},onAfterTransition:function(){this.inTransition&&(this.inTransition=!1,this.windowGroup.transitionCount>0&&(this.windowGroup.transitionCount--,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=void 0)))},onBeforeTransition:function(){this.inTransition||(this.inTransition=!0,0===this.windowGroup.transitionCount&&(this.windowGroup.transitionHeight=Object(r["g"])(this.windowGroup.$el.clientHeight)),this.windowGroup.transitionCount++)},onTransitionCancelled:function(){this.onAfterTransition()},onEnter:function(t){var e=this;this.inTransition&&this.$nextTick((function(){e.computedTransition&&e.inTransition&&(e.windowGroup.transitionHeight=Object(r["g"])(t.clientHeight))}))}},render:function(t){var e=this;return t("transition",{props:{name:this.computedTransition},on:{beforeEnter:this.onBeforeTransition,afterEnter:this.onAfterTransition,enterCancelled:this.onTransitionCancelled,beforeLeave:this.onBeforeTransition,afterLeave:this.onAfterTransition,leaveCancelled:this.onTransitionCancelled,enter:this.onEnter}},this.showLazyContent((function(){return[e.genWindowItem()]})))}});e["a"]=c.extend({name:"v-tab-item",props:{id:String},methods:{genWindowItem:function(){var t=c.options.methods.genWindowItem.call(this);return t.data.domProps=t.data.domProps||{},t.data.domProps.id=this.id||this.value,t}}})},c6a6:function(t,e,n){"use strict";n("4de4"),n("7db0"),n("c975"),n("d81d"),n("45fc"),n("498a");var i=n("5530"),a=(n("2bfd"),n("b974")),s=n("8654"),r=n("d9f7"),o=n("80d2"),l=Object(i["a"])(Object(i["a"])({},a["b"]),{},{offsetY:!0,offsetOverflow:!0,transition:!1});e["a"]=a["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(t,e,n){return n.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:a["a"].options.props.menuProps.type,default:function(){return l}},noFilter:Boolean,searchInput:{type:String,default:void 0}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({},a["a"].options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},hasDisplayedItems:function(){var t=this;return this.hideSelected?this.filteredItems.some((function(e){return!t.hasItem(e)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var t=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(e){var n=Object(o["r"])(e,t.itemText),i=null!=n?String(n):"";return t.filter(e,String(t.internalSearch),i)}))},internalSearch:{get:function(){return this.lazySearch},set:function(t){this.lazySearch=t,this.$emit("update:search-input",t)}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var t=a["a"].options.computed.$_menuProps.call(this);return t.contentClass="v-autocomplete__content ".concat(t.contentClass||"").trim(),Object(i["a"])(Object(i["a"])({},l),t)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var t=this;return this.multiple?null:this.selectedItems.find((function(e){return t.valueComparator(t.getValue(e),t.getValue(t.internalValue))}))},listData:function(){var t=a["a"].options.computed.listData.call(this);return t.props=Object(i["a"])(Object(i["a"])({},t.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),t}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(t){t?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.updateSelf())},isMenuActive:function(t){!t&&this.hasSlot&&(this.lazySearch=void 0)},items:function(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput:function(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},destroyed:function(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged:function(t,e){var n=this;t!==e&&(this.setMenuIndex(-1),this.$nextTick((function(){n.internalSearch&&(1===t.length||n.autoSelectFirst)&&(n.$refs.menu.getTiles(),n.setMenuIndex(0))})))},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(t){this.searchIsDirty||(this.multiple&&t===o["y"].left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&t===o["y"].right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:t!==o["y"].backspace&&t!==o["y"].delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var t=this.selectedIndex,e=this.selectedItems[t];if(this.isInteractive&&!this.getDisabled(e)){var n=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===n){var i=this.selectedItems.length,a=t!==i-1?t:t-1,s=this.selectedItems[a];s?this.selectItem(e):this.setValue(this.multiple?[]:void 0),this.selectedIndex=a}else this.selectedIndex=n}},clearableCallback:function(){this.internalSearch=void 0,a["a"].options.methods.clearableCallback.call(this)},genInput:function(){var t=s["a"].options.methods.genInput.call(this);return t.data=Object(r["a"])(t.data,{attrs:{"aria-activedescendant":Object(o["p"])(this.$refs.menu,"activeTile.id"),autocomplete:Object(o["p"])(t.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),t},genInputSlot:function(){var t=a["a"].options.methods.genInputSlot.call(this);return t.data.attrs.role="combobox",t},genSelections:function(){return this.hasSlot||this.multiple?a["a"].options.methods.genSelections.call(this):[]},onClick:function(t){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(t.target)||this.activateMenu())},onInput:function(t){if(!(this.selectedIndex>-1)&&t.target){var e=t.target,n=e.value;e.value&&this.activateMenu(),this.internalSearch=n,this.badInput=e.validity&&e.validity.badInput}},onKeyDown:function(t){var e=t.keyCode;a["a"].options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown:function(t){},onTabDown:function(t){a["a"].options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown:function(t){t.preventDefault(),this.activateMenu()},selectItem:function(t){a["a"].options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems:function(){a["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var t=this;this.$nextTick((function(){t.multiple&&t.internalSearch&&t.isMenuActive||(t.internalSearch=!t.selectedItems.length||t.multiple||t.hasSlot?null:t.getText(t.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(t){return this.selectedValues.indexOf(this.getValue(t))>-1},onCopy:function(t){if(-1!==this.selectedIndex){var e=this.selectedItems[this.selectedIndex],n=this.getText(e);t.clipboardData.setData("text/plain",n),t.clipboardData.setData("text/vnd.vuetify.autocomplete.item+plain",n),t.preventDefault()}}}})}}]);
//# sourceMappingURL=chunk-629da35f.b746f3ed.js.map