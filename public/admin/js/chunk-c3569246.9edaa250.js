(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c3569246"],{"0e51":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{id:"wizard",tag:"section"}},[a("validation-observer",{scopedSlots:t._u([{key:"default",fn:function(e){var s=e.valid;return[a("base-material-wizard",{staticClass:"mx-auto",attrs:{"available-steps":t.availableSteps,items:t.tabs},on:{"click:next":function(e){return t.next(s)},"click:prev":function(e){t.tab--}},model:{value:t.tab,callback:function(e){t.tab=e},expression:"tab"}},[a("v-tab-item",{staticClass:"pb-12"},[a("form",[a("div",{staticClass:"text-center display-1 font-weight-light mb-6"},[t._v(" Let's start with basic information (with validation) ")]),a("v-row",{staticClass:"mx-auto",staticStyle:{"max-width":"500px"},attrs:{justify:"space-around"}},[a("v-col",{staticClass:"text-center",attrs:{cols:"auto"}},[a("input",{ref:"file",staticClass:"d-none",attrs:{type:"file"},on:{change:t.onChange}}),a("v-card",{staticClass:"mx-auto mt-0 d-inline-flex v-card--account",class:t.image?"success--text":"grey--text",attrs:{height:"106",outlined:"",width:"106"},on:{click:function(e){return t.$refs.file.click()}}},[t.image?a("v-img",{attrs:{src:t.image,height:"100%",width:"100%"}}):a("v-icon",{staticClass:"mx-auto",attrs:{size:"96"}},[t._v(" mdi-account ")])],1),a("div",{staticClass:"font-weight-bold grey--text"},[t._v(" CHOOSE PICTURE ")])],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("validation-provider",{attrs:{name:"first",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("v-text-field",{attrs:{"error-messages":s,color:"secondary",label:"First Name*","prepend-icon":"mdi-face","validate-on-blur":""},model:{value:t.first,callback:function(e){t.first=e},expression:"first"}})]}}],null,!0)}),a("validation-provider",{attrs:{name:"last",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("v-text-field",{attrs:{"error-messages":s,color:"secondary",label:"Last Name*","prepend-icon":"mdi-account","validate-on-blur":""},model:{value:t.last,callback:function(e){t.last=e},expression:"last"}})]}}],null,!0)})],1),a("v-col",{attrs:{cols:"12"}},[a("validation-provider",{attrs:{name:"email",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("v-text-field",{attrs:{"error-messages":s,color:"secondary",label:"Email*","prepend-icon":"mdi-email","validate-on-blur":""},model:{value:t.email,callback:function(e){t.email=e},expression:"email"}})]}}],null,!0)})],1)],1)],1)]),a("v-tab-item",{staticClass:"pb-12"},[a("form",[a("v-responsive",{staticClass:"mx-auto",attrs:{"max-width":"500"}},[a("div",{staticClass:"text-center display-1 grey--text font-weight-light mb-6"},[t._v(" What are you doing? (checkboxes) ")]),a("validation-provider",{attrs:{name:"type",rules:"required"}},[a("input",{attrs:{type:"hidden"},domProps:{value:t.stringAccount}})]),a("v-item-group",{staticClass:"row",attrs:{multiple:""},model:{value:t.account,callback:function(e){t.account=e},expression:"account"}},t._l(t.accounts,(function(e,s){return a("v-item",{key:s,scopedSlots:t._u([{key:"default",fn:function(s){var i=s.active,n=s.toggle;return[a("v-col",{staticClass:"text-center",attrs:{cols:"4"}},[a("v-card",{staticClass:"mb-6 mx-auto pa-10 d-inline-block v-card--account",class:i?"success--text":"grey--text",attrs:{outlined:""},on:{click:n}},[a("v-icon",{attrs:{large:""},domProps:{textContent:t._s(e.icon)}})],1),a("div",{staticClass:"text-uppercase subtitle-2 text--primary",domProps:{textContent:t._s(e.type)}})],1)]}}],null,!0)})})),1)],1)],1)]),a("v-tab-item",{staticClass:"pb-12"},[a("div",{staticClass:"text-center display-1 grey--text font-weight-light mb-6"},[t._v(" Are you living in a nice area? ")]),a("form",[a("v-row",{staticClass:"mx-auto",staticStyle:{"max-width":"500px"},attrs:{justify:"space-around"}},[a("v-col",{attrs:{cols:"12",md:"8"}},[a("validation-provider",{attrs:{name:"address",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("v-text-field",{attrs:{"error-messages":s,color:"secondary",label:"Street Name*","validate-on-blur":""},model:{value:t.address,callback:function(e){t.address=e},expression:"address"}})]}}],null,!0)})],1),a("v-col",{attrs:{cols:"12",md:"4"}},[a("validation-provider",{attrs:{name:"street",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("v-text-field",{attrs:{"error-messages":s,color:"secondary",label:"Street Number*","validate-on-blur":""},model:{value:t.street,callback:function(e){t.street=e},expression:"street"}})]}}],null,!0)})],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("validation-provider",{attrs:{name:"city",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("v-text-field",{attrs:{"error-messages":s,color:"secondary",label:"City*","validate-on-blur":""},model:{value:t.city,callback:function(e){t.city=e},expression:"city"}})]}}],null,!0)})],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("validation-provider",{attrs:{name:"state",rules:"required"},scopedSlots:t._u([{key:"default",fn:function(e){var s=e.errors;return[a("v-autocomplete",{attrs:{autocomplete:Date.now(),"error-messages":s,items:t.states,color:"secondary",label:"State*","validate-on-blur":""},model:{value:t.state,callback:function(e){t.state=e},expression:"state"}})]}}],null,!0)})],1)],1)],1)])],1)]}}])})],1)},i=[],n=(a("caad"),a("a15b"),a("d3b7"),a("3ca3"),a("ddb0"),a("2b3d"),{name:"DashboardFormsWizard",data:function(){return{account:[],accounts:[{icon:"mdi-pencil",type:"design"},{icon:"mdi-code-tags",type:"code"},{icon:"mdi-laptop",type:"develop"}],address:"",city:"",email:"",first:"",image:null,last:"",state:"",states:["Alabama","Alaska","American Samoa","Arizona","Arkansas","California","Colorado","Connecticut","Delaware","District of Columbia","Federated States of Micronesia","Florida","Georgia","Guam","Hawaii","Idaho","Illinois","Indiana","Iowa","Kansas","Kentucky","Louisiana","Maine","Marshall Islands","Maryland","Massachusetts","Michigan","Minnesota","Mississippi","Missouri","Montana","Nebraska","Nevada","New Hampshire","New Jersey","New Mexico","New York","North Carolina","North Dakota","Northern Mariana Islands","Ohio","Oklahoma","Oregon","Palau","Pennsylvania","Puerto Rico","Rhode Island","South Carolina","South Dakota","Tennessee","Texas","Utah","Vermont","Virgin Island","Virginia","Washington","West Virginia","Wisconsin","Wyoming"],street:"",tab:0,tabs:["About","Account","Address"]}},computed:{stringAccount:function(){return this.account.join(",")},scope:function(){return 0===this.tab?"about":2===this.tab?"address":"account"},availableSteps:function(){var t=[0];return this.first&&this.last&&this.email&&t.push(1),this.stringAccount&&t.includes(1)&&t.push(2),this.address&&this.street&&this.city&&this.state&&t.includes(2)&&t.push(3),t}},methods:{next:function(t){t&&(this.tab===this.tabs.length-1?alert("Form finished"):this.tab++)},onChange:function(t){var e=t.target.files[0];if(!e)return this.image=null;this.image=URL.createObjectURL(e)}}}),r=n,l=(a("4d2a"),a("2877")),o=a("6544"),c=a.n(o),u=a("c6a6"),d=a("b0af"),h=a("62ad"),m=a("a523"),f=a("132d"),p=a("adda"),v=a("ade3"),b=a("4e82"),g=a("58df"),y=a("d9bd"),I=a("2b0e"),x=I["a"].extend({props:{activeClass:String,value:{required:!1}},data:function(){return{isActive:!1}},methods:{toggle:function(){this.isActive=!this.isActive}},render:function(){return this.$scopedSlots.default?(this.$scopedSlots.default&&(t=this.$scopedSlots.default({active:this.isActive,toggle:this.toggle})),Array.isArray(t)&&1===t.length&&(t=t[0]),t&&!Array.isArray(t)&&t.tag?(t.data=this._b(t.data||{},t.tag,{class:Object(v["a"])({},this.activeClass,this.isActive)}),t):(Object(y["c"])("v-item should only contain a single element",this),t)):(Object(y["c"])("v-item is missing a default scopedSlot",this),null);var t}}),S=Object(g["a"])(x,Object(b["a"])("itemGroup","v-item","v-item-group")).extend({name:"v-item"}),C=a("604c"),w=a("6b53"),k=a("0fd9"),D=a("c671"),A=a("8654"),V=Object(l["a"])(r,s,i,!1,null,null,null);e["default"]=V.exports;c()(V,{VAutocomplete:u["a"],VCard:d["a"],VCol:h["a"],VContainer:m["a"],VIcon:f["a"],VImg:p["a"],VItem:S,VItemGroup:C["b"],VResponsive:w["a"],VRow:k["a"],VTabItem:D["a"],VTextField:A["a"]})},"2bfd":function(t,e,a){},"4bb5":function(t,e,a){},"4d2a":function(t,e,a){"use strict";var s=a("4bb5"),i=a.n(s);i.a},c6a6:function(t,e,a){"use strict";a("4de4"),a("7db0"),a("caad"),a("c975"),a("d81d"),a("45fc"),a("2532"),a("498a");var s=a("5530"),i=(a("2bfd"),a("b974")),n=a("8654"),r=a("d9f7"),l=a("80d2"),o=Object(s["a"])(Object(s["a"])({},i["b"]),{},{offsetY:!0,offsetOverflow:!0,transition:!1});e["a"]=i["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(t,e,a){return a.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:i["a"].options.props.menuProps.type,default:function(){return o}},noFilter:Boolean,searchInput:{type:String}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},i["a"].options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},hasDisplayedItems:function(){var t=this;return this.hideSelected?this.filteredItems.some((function(e){return!t.hasItem(e)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var t=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(e){var a=Object(l["r"])(e,t.itemText),s=null!=a?String(a):"";return t.filter(e,String(t.internalSearch),s)}))},internalSearch:{get:function(){return this.lazySearch},set:function(t){this.lazySearch!==t&&(this.lazySearch=t,this.$emit("update:search-input",t))}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var t=i["a"].options.computed.$_menuProps.call(this);return t.contentClass="v-autocomplete__content ".concat(t.contentClass||"").trim(),Object(s["a"])(Object(s["a"])({},o),t)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var t=this;return this.multiple?null:this.selectedItems.find((function(e){return t.valueComparator(t.getValue(e),t.getValue(t.internalValue))}))},listData:function(){var t=i["a"].options.computed.listData.call(this);return t.props=Object(s["a"])(Object(s["a"])({},t.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),t}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(t){t?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.blur(),this.updateSelf())},isMenuActive:function(t){!t&&this.hasSlot&&(this.lazySearch=null)},items:function(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput:function(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},destroyed:function(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged:function(t,e){var a=this;t!==e&&(this.setMenuIndex(-1),this.$nextTick((function(){a.internalSearch&&(1===t.length||a.autoSelectFirst)&&(a.$refs.menu.getTiles(),a.setMenuIndex(0))})))},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(t){this.searchIsDirty||(this.multiple&&t===l["y"].left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&t===l["y"].right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:t!==l["y"].backspace&&t!==l["y"].delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var t=this.selectedIndex,e=this.selectedItems[t];if(this.isInteractive&&!this.getDisabled(e)){var a=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===a){var s=this.selectedItems.length,i=t!==s-1?t:t-1,n=this.selectedItems[i];n?this.selectItem(e):this.setValue(this.multiple?[]:null),this.selectedIndex=i}else this.selectedIndex=a}},clearableCallback:function(){this.internalSearch=null,i["a"].options.methods.clearableCallback.call(this)},genInput:function(){var t=n["a"].options.methods.genInput.call(this);return t.data=Object(r["a"])(t.data,{attrs:{"aria-activedescendant":Object(l["p"])(this.$refs.menu,"activeTile.id"),autocomplete:Object(l["p"])(t.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),t},genInputSlot:function(){var t=i["a"].options.methods.genInputSlot.call(this);return t.data.attrs.role="combobox",t},genSelections:function(){return this.hasSlot||this.multiple?i["a"].options.methods.genSelections.call(this):[]},onClick:function(t){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(t.target)||this.activateMenu())},onInput:function(t){if(!(this.selectedIndex>-1)&&t.target){var e=t.target,a=e.value;e.value&&this.activateMenu(),this.internalSearch=a,this.badInput=e.validity&&e.validity.badInput}},onKeyDown:function(t){var e=t.keyCode;!t.ctrlKey&&[l["y"].home,l["y"].end].includes(e)||i["a"].options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown:function(t){},onTabDown:function(t){i["a"].options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown:function(t){t.preventDefault(),this.activateMenu()},selectItem:function(t){i["a"].options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems:function(){i["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var t=this;this.$nextTick((function(){t.multiple&&t.internalSearch&&t.isMenuActive||(t.internalSearch=!t.selectedItems.length||t.multiple||t.hasSlot?null:t.getText(t.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(t){return this.selectedValues.indexOf(this.getValue(t))>-1},onCopy:function(t){var e,a;if(-1!==this.selectedIndex){var s=this.selectedItems[this.selectedIndex],i=this.getText(s);null==(e=t.clipboardData)||e.setData("text/plain",i),null==(a=t.clipboardData)||a.setData("text/vnd.vuetify.autocomplete.item+plain",i),t.preventDefault()}}}})}}]);
//# sourceMappingURL=chunk-c3569246.9edaa250.js.map