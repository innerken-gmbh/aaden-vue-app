(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d7659e66"],{"10d0":function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{attrs:{id:"extended-forms",fluid:"",tag:"section"}},[i("base-v-component",{attrs:{heading:"Date Pickers",link:"components/date-pickers"}}),i("v-row",[i("v-col",{attrs:{cols:"12",md:"4",sm:"6"}},[i("base-material-card",{attrs:{color:"success",icon:"mdi-calendar-today"},scopedSlots:t._u([{key:"after-heading",fn:function(){return[i("div",{staticClass:"text-h4 mt-2 font-weight-light"},[t._v(" Date Picker "),i("span",{staticClass:"text-body-1"},[t._v("— labeled")])])]},proxy:!0}])},[i("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":t.date,"min-width":"290px","offset-y":"",transition:"scale-transition"},on:{"update:returnValue":function(e){t.date=e},"update:return-value":function(e){t.date=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[i("v-text-field",t._g({attrs:{color:"secondary",label:"Select date","prepend-icon":"mdi-calendar-outline",readonly:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},n))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[i("v-date-picker",{attrs:{color:"secondary",landscape:"",scrollable:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[i("v-spacer"),i("v-btn",{attrs:{color:"secondary",large:""},on:{click:function(e){t.menu=!1}}},[t._v(" "+t._s(t.$t("Cancel"))+" ")]),i("v-btn",{attrs:{color:"secondary",large:""},on:{click:function(e){return t.$refs.menu.save(t.date)}}},[t._v(" "+t._s(t.$t("OK"))+" ")])],1)],1)],1)],1),i("v-col",{attrs:{cols:"12",md:"4",sm:"6"}},[i("base-material-card",{attrs:{color:"success",icon:"mdi-calendar-today"},scopedSlots:t._u([{key:"after-heading",fn:function(){return[i("div",{staticClass:"text-h4 mt-2 font-weight-light"},[t._v(" Date Picker "),i("span",{staticClass:"text-body-1"},[t._v("— date selected")])])]},proxy:!0}])},[i("v-menu",{ref:"menu2",attrs:{"close-on-content-click":!1,"return-value":t.date,"min-width":"290px","offset-y":"",transition:"scale-transition"},on:{"update:returnValue":function(e){t.date=e},"update:return-value":function(e){t.date=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[i("v-text-field",t._g({attrs:{color:"secondary",label:"Select date","prepend-icon":"mdi-calendar-outline",readonly:""},model:{value:t.date2,callback:function(e){t.date2=e},expression:"date2"}},n))]}}]),model:{value:t.menu2,callback:function(e){t.menu2=e},expression:"menu2"}},[i("v-date-picker",{attrs:{color:"secondary",landscape:"",scrollable:""},model:{value:t.date,callback:function(e){t.date=e},expression:"date"}},[i("v-spacer"),i("v-btn",{attrs:{color:"secondary",large:""},on:{click:function(e){t.menu2=!1}}},[t._v(" "+t._s(t.$t("Cancel"))+" ")])],1)],1)],1)],1),i("v-col",{attrs:{cols:"12",md:"4",sm:"6"}},[i("base-material-card",{attrs:{color:"success",icon:"mdi-calendar-today"},scopedSlots:t._u([{key:"after-heading",fn:function(){return[i("div",{staticClass:"text-h4 mt-2 font-weight-light"},[t._v(" Date Picker "),i("span",{staticClass:"text-body-1"},[t._v("— close on select")])])]},proxy:!0}])},[i("v-menu",{ref:"menu2",attrs:{"close-on-content-click":!1,"return-value":t.date,"min-width":"290px","offset-y":"",transition:"scale-transition"},on:{"update:returnValue":function(e){t.date=e},"update:return-value":function(e){t.date=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[i("v-text-field",t._g({attrs:{color:"secondary","prepend-icon":"mdi-calendar-outline",readonly:""},model:{value:t.date3,callback:function(e){t.date3=e},expression:"date3"}},n))]}}]),model:{value:t.menu3,callback:function(e){t.menu3=e},expression:"menu3"}},[i("v-date-picker",{attrs:{color:"secondary",landscape:"",scrollable:""},on:{input:function(e){t.menu3=!1}},model:{value:t.date3,callback:function(e){t.date3=e},expression:"date3"}},[i("v-spacer"),i("v-btn",{attrs:{color:"secondary",large:""},on:{click:function(e){t.menu3=!1}}},[t._v(" "+t._s(t.$t("Cancel"))+" ")])],1)],1)],1)],1),i("v-col",{attrs:{cols:"12"}},[i("v-card",{staticClass:"pa-6"},[i("v-row",[i("v-col",{attrs:{cols:"12",md:"6"}},[i("base-subheading",[t._v(" Switches ")]),i("v-switch",{attrs:{"hide-details":"","input-value":"true",label:"Toggle is on"}}),i("v-switch",{attrs:{"hide-details":"",label:"Toggle is off"}}),i("div",{staticClass:"my-6"}),i("base-subheading",[t._v(" Tags ")]),i("v-combobox",{attrs:{color:"secondary",multiple:""},scopedSlots:t._u([{key:"selection",fn:function(e){var n=e.attrs,s=e.item,a=e.select,l=e.selected;return[i("v-chip",t._b({attrs:{"input-value":l,close:"",color:"secondary",small:""},on:{click:a,"click:close":function(e){return t.remove(s)}}},"v-chip",n,!1),[t._v(" "+t._s(s)+" ")])]}}]),model:{value:t.items,callback:function(e){t.items=e},expression:"items"}}),i("div",{staticClass:"my-6"}),i("base-subheading",{staticClass:"mb-6"},[t._v(" Progress Bar ")]),i("v-progress-linear",{attrs:{value:30,color:"secondary"}}),i("div",{staticClass:"my-6"}),i("v-progress-linear",{attrs:{value:60,color:"info"}}),i("div",{staticClass:"my-6"}),i("v-progress-linear",{attrs:{value:40,"buffer-value":"0",color:"warning",stream:""}}),i("div",{staticClass:"my-6"}),i("base-subheading",{staticClass:"mb-6"},[t._v(" File Input ")]),i("v-file-input",{attrs:{"display-size":1e3,color:"deep-purple accent-4",counter:"",label:"File input",multiple:"",outlined:"",placeholder:"Select your files","prepend-icon":"mdi-paperclip"},scopedSlots:t._u([{key:"selection",fn:function(e){var n=e.index,s=e.text;return[n<2?i("v-chip",{attrs:{color:"deep-purple accent-4",dark:"",label:"",small:""}},[t._v(" "+t._s(s)+" ")]):2===n?i("span",{staticClass:"text-overline grey--text text--darken-3 mx-2"},[t._v(" +"+t._s(t.files.length-2)+" File(s) ")]):t._e()]}}]),model:{value:t.files,callback:function(e){t.files=e},expression:"files"}})],1),i("v-col",{attrs:{cols:"12",md:"6"}},[i("base-subheading",[t._v(" Customizable Select ")]),i("v-select",{attrs:{items:t.movies,color:"secondary","item-color":"secondary",label:"Movie"},scopedSlots:t._u([{key:"item",fn:function(e){var n=e.attrs,s=e.item,a=e.on;return[i("v-list-item",t._g(t._b({staticClass:"mx-3 mb-3 v-sheet",attrs:{"active-class":"secondary elevation-4 white--text",elevation:"0"}},"v-list-item",n,!1),a),[i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:t._s(s)}})],1)],1)]}}])}),i("v-select",{attrs:{items:t.movies,color:"secondary","item-color":"secondary",label:"Movie",multiple:""},scopedSlots:t._u([{key:"item",fn:function(e){var n=e.attrs,s=e.item,a=e.on;return[i("v-list-item",t._g(t._b({staticClass:"mx-3 mb-2 v-sheet",attrs:{"active-class":"secondary elevation-4 white--text",elevation:"0"}},"v-list-item",n,!1),a),[i("v-list-item-content",[i("v-list-item-title",{domProps:{textContent:t._s(s)}})],1),i("v-scale-transition",[n.inputValue?i("v-list-item-icon",{staticClass:"my-3"},[i("v-icon",[t._v("mdi-check")])],1):t._e()],1)],1)]}}])}),i("div",{staticClass:"my-3"}),i("base-subheading",{staticClass:"mb-6"},[t._v(" Dropdown & Dropup ")]),i("v-row",{staticClass:"mb-6",attrs:{dense:""}},[i("v-col",{attrs:{cols:"auto"}},[i("base-material-dropdown",{attrs:{items:t.dropdown,color:"success",default:""}},[t._v(" MultiLevel Dropdown ")])],1),i("v-col",{attrs:{cols:"auto"}},[i("base-material-dropdown",{attrs:{items:t.dropdown,color:"success",origin:"top right"}},[t._v(" Dropdown ")])],1),i("v-col",{attrs:{cols:"auto"}},[i("base-material-dropdown",{attrs:{items:t.dropdown,color:"success",origin:"bottom right",top:""}},[t._v(" Dropup ")])],1)],1),i("base-subheading",[t._v(" Sliders ")]),i("v-slider",{attrs:{max:t.max,min:t.min,color:"secondary"},model:{value:t.slider,callback:function(e){t.slider=e},expression:"slider"}}),i("v-range-slider",{attrs:{color:"info","track-color":"info lighten-4"},model:{value:t.slider2,callback:function(e){t.slider2=e},expression:"slider2"}})],1)],1)],1)],1)],1)],1)},s=[],a={name:"DashboardFormsExtendedForms",data:function(){return{date:"",date2:"2019-09-26",date3:"",dropdown:[{id:1,text:"Action"},{id:2,text:"Another Action"},{id:3,text:"A Third Action"}],files:[],items:["Amsterdam","Washington","Sydney","Beijing"],menu:!1,menu2:!1,menu3:!1,min:-50,max:90,slider:40,slider2:[30,70],range:[-20,70],movies:["Fight Club","Godfather","Godfather II","Godfather III","Goodfellas","Pulp Fiction","Scarface"]}}},l=a,o=i("2877"),r=i("6544"),c=i.n(r),u=i("8336"),h=i("b0af"),d=i("cc20"),m=i("62ad"),p=i("53ca"),f=i("5530"),v=(i("d3b7"),i("25f0"),i("7db0"),i("8a79"),i("fb6a"),i("b0c0"),i("caad"),i("2532"),i("c740"),i("a434"),i("2bfd"),i("b974")),g=i("c6a6"),b=i("80d2"),I=g["a"].extend({name:"v-combobox",props:{delimiters:{type:Array,default:function(){return[]}},returnObject:{type:Boolean,default:!0}},data:function(){return{editingIndex:-1}},computed:{computedCounterValue:function(){return this.multiple?this.selectedItems.length:(this.internalSearch||"").toString().length},hasSlot:function(){return v["a"].options.computed.hasSlot.call(this)||this.multiple},isAnyValueAllowed:function(){return!0},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!!this.$slots["no-data"]&&!this.hideNoData)},searchIsDirty:function(){return null!=this.internalSearch}},methods:{onInternalSearchChanged:function(t){if(t&&this.multiple&&this.delimiters.length){var e=this.delimiters.find((function(e){return t.endsWith(e)}));null!=e&&(this.internalSearch=t.slice(0,t.length-e.length),this.updateTags())}this.updateMenuDimensions()},genInput:function(){var t=g["a"].options.methods.genInput.call(this);return delete t.data.attrs.name,t.data.on.paste=this.onPaste,t},genChipSelection:function(t,e){var i=this,n=v["a"].options.methods.genChipSelection.call(this,t,e);return this.multiple&&(n.componentOptions.listeners=Object(f["a"])(Object(f["a"])({},n.componentOptions.listeners),{},{dblclick:function(){i.editingIndex=e,i.internalSearch=i.getText(t),i.selectedIndex=-1}})),n},onChipInput:function(t){v["a"].options.methods.onChipInput.call(this,t),this.editingIndex=-1},onEnterDown:function(t){t.preventDefault(),this.getMenuIndex()>-1||this.$nextTick(this.updateSelf)},onKeyDown:function(t){var e=t.keyCode;!t.ctrlKey&&[b["z"].home,b["z"].end].includes(e)||v["a"].options.methods.onKeyDown.call(this,t),this.multiple&&e===b["z"].left&&0===this.$refs.input.selectionStart?this.updateSelf():e===b["z"].enter&&this.onEnterDown(t),this.changeSelectedIndex(e)},onTabDown:function(t){if(this.multiple&&this.internalSearch&&-1===this.getMenuIndex())return t.preventDefault(),t.stopPropagation(),this.updateTags();g["a"].options.methods.onTabDown.call(this,t)},selectItem:function(t){this.editingIndex>-1?this.updateEditing():(g["a"].options.methods.selectItem.call(this,t),this.internalSearch&&this.multiple&&this.getText(t).toLocaleLowerCase().includes(this.internalSearch.toLocaleLowerCase())&&(this.internalSearch=null))},setSelectedItems:function(){null==this.internalValue||""===this.internalValue?this.selectedItems=[]:this.selectedItems=this.multiple?this.internalValue:[this.internalValue]},setValue:function(t){v["a"].options.methods.setValue.call(this,void 0===t?this.internalSearch:t)},updateEditing:function(){var t=this,e=this.internalValue.slice(),i=this.selectedItems.findIndex((function(e){return t.getText(e)===t.internalSearch}));if(i>-1){var n="object"===Object(p["a"])(e[i])?Object.assign({},e[i]):e[i];e.splice(i,1),e.push(n)}else e[this.editingIndex]=this.internalSearch;this.setValue(e),this.editingIndex=-1,this.internalSearch=null},updateCombobox:function(){if(this.searchIsDirty){this.internalSearch!==this.getText(this.internalValue)&&this.setValue();var t=Boolean(this.$scopedSlots.selection)||this.hasChips;t&&(this.internalSearch=null)}},updateSelf:function(){this.multiple?this.updateTags():this.updateCombobox()},updateTags:function(){var t=this,e=this.getMenuIndex();if(!(e<0&&!this.searchIsDirty||!this.internalSearch)){if(this.editingIndex>-1)return this.updateEditing();var i=this.selectedItems.findIndex((function(e){return t.internalSearch===t.getText(e)})),n=i>-1&&"object"===Object(p["a"])(this.selectedItems[i])?Object.assign({},this.selectedItems[i]):this.internalSearch;if(i>-1){var s=this.internalValue.slice();s.splice(i,1),this.setValue(s)}if(e>-1)return this.internalSearch=null;this.selectItem(n),this.internalSearch=null}},onPaste:function(t){var e;if(this.multiple&&!this.searchIsDirty){var i=null==(e=t.clipboardData)?void 0:e.getData("text/vnd.vuetify.autocomplete.item+plain");i&&-1===this.findExistingIndex(i)&&(t.preventDefault(),v["a"].options.methods.selectItem.call(this,i))}},clearableCallback:function(){this.editingIndex=-1,g["a"].options.methods.clearableCallback.call(this)}}}),y=i("a523"),S=i("2e4b"),x=i("23a7"),C=i("132d"),k=i("da13"),V=i("5d23"),w=i("34c3"),_=i("e449"),D=i("8e36"),T=i("2909"),O=i("ade3"),$=(i("d81d"),i("99af"),i("a9e3"),i("33e9"),i("9a18")),j=$["a"].extend({name:"v-range-slider",props:{value:{type:Array,default:function(){return[0,0]}}},data:function(){return{activeThumb:null,lazyValue:this.value}},computed:{classes:function(){return Object(f["a"])(Object(f["a"])({},$["a"].options.computed.classes.call(this)),{},{"v-input--range-slider":!0})},internalValue:{get:function(){return this.lazyValue},set:function(t){var e=this,i=t.map((function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:0;return e.roundValue(Math.min(Math.max(t,e.minValue),e.maxValue))}));if(i[0]>i[1]||i[1]<i[0]){if(null!==this.activeThumb){var n=1===this.activeThumb?0:1,s=this.$refs["thumb_".concat(n)];s.focus()}i=[i[1],i[0]]}this.lazyValue=i,Object(b["k"])(i,this.value)||this.$emit("input",i),this.validate()}},inputWidth:function(){var t=this;return this.internalValue.map((function(e){return(t.roundValue(e)-t.minValue)/(t.maxValue-t.minValue)*100}))}},methods:{getTrackStyle:function(t,e){var i,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0,a=this.vertical?this.$vuetify.rtl?"top":"bottom":this.$vuetify.rtl?"right":"left",l=this.vertical?"height":"width",o="calc(".concat(t,"% + ").concat(n,"px)"),r="calc(".concat(e,"% + ").concat(s,"px)");return i={transition:this.trackTransition},Object(O["a"])(i,a,o),Object(O["a"])(i,l,r),i},getIndexOfClosestValue:function(t,e){return Math.abs(t[0]-e)<Math.abs(t[1]-e)?0:1},genInput:function(){var t=this;return Object(b["i"])(2).map((function(e){var i=$["a"].options.methods.genInput.call(t);return i.data=i.data||{},i.data.attrs=i.data.attrs||{},i.data.attrs.value=t.internalValue[e],i.data.attrs.id="input-".concat(e?"max":"min","-").concat(t._uid),i}))},genTrackContainer:function(){var t=this,e=[],i=this.isDisabled?10:0,n=[{class:"v-slider__track-background",color:this.computedTrackColor,styles:[0,this.inputWidth[0],0,-i]},{class:this.isDisabled?"v-slider__track-background":"v-slider__track-fill",color:this.isDisabled?this.computedTrackColor:this.computedTrackFillColor,styles:[this.inputWidth[0],Math.abs(this.inputWidth[1]-this.inputWidth[0]),i,-2*i]},{class:"v-slider__track-background",color:this.computedTrackColor,styles:[this.inputWidth[1],Math.abs(100-this.inputWidth[1]),i,-i]}];return this.$vuetify.rtl&&n.reverse(),e.push.apply(e,Object(T["a"])(n.map((function(e){return t.$createElement("div",t.setBackgroundColor(e.color,{staticClass:e.class,style:t.getTrackStyle.apply(t,Object(T["a"])(e.styles))}))})))),this.$createElement("div",{staticClass:"v-slider__track-container",ref:"track"},e)},genChildren:function(){var t=this;return[this.genInput(),this.genTrackContainer(),this.genSteps(),Object(b["i"])(2).map((function(e){var i=t.internalValue[e],n=function(i){t.isFocused=!0,t.activeThumb=e,t.$emit("focus",i)},s=function(e){t.isFocused=!1,t.activeThumb=null,t.$emit("blur",e)},a=t.inputWidth[e],l=t.isActive&&t.activeThumb===e,o=t.isFocused&&t.activeThumb===e;return t.genThumbContainer(i,a,l,o,n,s,"thumb_".concat(e))}))]},reevaluateSelected:function(t){this.activeThumb=this.getIndexOfClosestValue(this.internalValue,t);var e="thumb_".concat(this.activeThumb),i=this.$refs[e];i.focus()},onSliderMouseDown:function(t){var e,i=this,n=this.parseMouseMove(t);if(this.reevaluateSelected(n),this.oldValue=this.internalValue,this.isActive=!0,null!=(e=t.target)&&e.matches(".v-slider__thumb-container, .v-slider__thumb-container *")){this.thumbPressed=!0;var s=t.target.getBoundingClientRect(),a="touches"in t?t.touches[0]:t;this.startOffset=this.vertical?a.clientY-(s.top+s.height/2):a.clientX-(s.left+s.width/2)}else this.startOffset=0,window.clearTimeout(this.mouseTimeout),this.mouseTimeout=window.setTimeout((function(){i.thumbPressed=!0}),300);var l=!b["D"]||{passive:!0,capture:!0},o=!!b["D"]&&{passive:!0},r="touches"in t;this.onMouseMove(t),this.app.addEventListener(r?"touchmove":"mousemove",this.onMouseMove,o),Object(b["a"])(this.app,r?"touchend":"mouseup",this.onSliderMouseUp,l),this.$emit("start",this.internalValue)},onSliderClick:function(t){if(!this.isActive){if(this.noClick)return void(this.noClick=!1);var e=this.parseMouseMove(t);this.reevaluateSelected(e),this.setInternalValue(e),this.$emit("change",this.internalValue)}},onMouseMove:function(t){var e=this.parseMouseMove(t);"mousemove"===t.type&&(this.thumbPressed=!0),null===this.activeThumb&&(this.activeThumb=this.getIndexOfClosestValue(this.internalValue,e)),this.setInternalValue(e)},onKeyDown:function(t){if(null!==this.activeThumb){var e=this.parseKeyDown(t,this.internalValue[this.activeThumb]);null!=e&&(this.setInternalValue(e),this.$emit("change",this.internalValue))}},setInternalValue:function(t){var e=this;this.internalValue=this.internalValue.map((function(i,n){return n===e.activeThumb?t:Number(i)}))}}}),M=i("0fd9"),F=i("0789"),P=i("ba0d"),A=i("2fa4"),z=i("b73d"),L=i("8654"),E=Object(o["a"])(l,n,s,!1,null,null,null);e["default"]=E.exports;c()(E,{VBtn:u["a"],VCard:h["a"],VChip:d["a"],VCol:m["a"],VCombobox:I,VContainer:y["a"],VDatePicker:S["a"],VFileInput:x["a"],VIcon:C["a"],VListItem:k["a"],VListItemContent:V["b"],VListItemIcon:w["a"],VListItemTitle:V["d"],VMenu:_["a"],VProgressLinear:D["a"],VRangeSlider:j,VRow:M["a"],VScaleTransition:F["e"],VSelect:v["a"],VSlider:P["a"],VSpacer:A["a"],VSwitch:z["a"],VTextField:L["a"]})},"2bfd":function(t,e,i){},"33e9":function(t,e,i){},"9a18":function(t,e,i){"use strict";var n=i("ba0d");e["a"]=n["a"]},"9d01":function(t,e,i){},a523:function(t,e,i){"use strict";i("4de4"),i("d3b7"),i("b64b"),i("2ca0"),i("99af"),i("20f6"),i("4b85"),i("498a"),i("a15b");var n=i("2b0e");function s(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,i){var n=i.props,s=i.data,a=i.children;s.staticClass="".concat(t," ").concat(s.staticClass||"").trim();var l=s.attrs;if(l){s.attrs={};var o=Object.keys(l).filter((function(t){if("slot"===t)return!1;var e=l[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}));o.length&&(s.staticClass+=" ".concat(o.join(" ")))}return n.id&&(s.domProps=s.domProps||{},s.domProps.id=n.id),e(n.tag,s,a)}})}var a=i("d9f7");e["a"]=s("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var i,n=e.props,s=e.data,l=e.children,o=s.attrs;return o&&(s.attrs={},i=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}))),n.id&&(s.domProps=s.domProps||{},s.domProps.id=n.id),t(n.tag,Object(a["a"])(s,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(i||[])}),l)}})},b73d:function(t,e,i){"use strict";var n=i("15fd"),s=i("5530"),a=(i("0481"),i("4069"),i("ec29"),i("9d01"),i("fe09")),l=i("c37a"),o=i("c3f0"),r=i("0789"),c=i("490a"),u=i("80d2"),h=["title"];e["a"]=a["a"].extend({name:"v-switch",directives:{Touch:o["a"]},props:{inset:Boolean,loading:{type:[Boolean,String],default:!1},flat:{type:Boolean,default:!1}},computed:{classes:function(){return Object(s["a"])(Object(s["a"])({},l["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls v-input--switch":!0,"v-input--switch--flat":this.flat,"v-input--switch--inset":this.inset})},attrs:function(){return{"aria-checked":String(this.isActive),"aria-disabled":String(this.isDisabled),role:"switch"}},validationState:function(){return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0},switchData:function(){return this.setTextColor(this.loading?void 0:this.validationState,{class:this.themeClasses})}},methods:{genDefaultSlot:function(){return[this.genSwitch(),this.genLabel()]},genSwitch:function(){var t=this.attrs$,e=(t.title,Object(n["a"])(t,h));return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.genInput("checkbox",Object(s["a"])(Object(s["a"])({},this.attrs),e)),this.genRipple(this.setTextColor(this.validationState,{directives:[{name:"touch",value:{left:this.onSwipeLeft,right:this.onSwipeRight}}]})),this.$createElement("div",Object(s["a"])({staticClass:"v-input--switch__track"},this.switchData)),this.$createElement("div",Object(s["a"])({staticClass:"v-input--switch__thumb"},this.switchData),[this.genProgress()])])},genProgress:function(){return this.$createElement(r["c"],{},[!1===this.loading?null:this.$slots.progress||this.$createElement(c["a"],{props:{color:!0===this.loading||""===this.loading?this.color||"primary":this.loading,size:16,width:2,indeterminate:!0}})])},onSwipeLeft:function(){this.isActive&&this.onChange()},onSwipeRight:function(){this.isActive||this.onChange()},onKeydown:function(t){(t.keyCode===u["z"].left&&this.isActive||t.keyCode===u["z"].right&&!this.isActive)&&this.onChange()}}})},c6a6:function(t,e,i){"use strict";var n=i("5530"),s=(i("d81d"),i("d3b7"),i("4de4"),i("498a"),i("7db0"),i("c740"),i("caad"),i("2532"),i("2bfd"),i("b974")),a=i("8654"),l=i("d9f7"),o=i("80d2"),r=Object(n["a"])(Object(n["a"])({},s["b"]),{},{offsetY:!0,offsetOverflow:!0,transition:!1});e["a"]=s["a"].extend({name:"v-autocomplete",props:{allowOverflow:{type:Boolean,default:!0},autoSelectFirst:{type:Boolean,default:!1},filter:{type:Function,default:function(t,e,i){return i.toLocaleLowerCase().indexOf(e.toLocaleLowerCase())>-1}},hideNoData:Boolean,menuProps:{type:s["a"].options.props.menuProps.type,default:function(){return r}},noFilter:Boolean,searchInput:{type:String}},data:function(){return{lazySearch:this.searchInput}},computed:{classes:function(){return Object(n["a"])(Object(n["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-autocomplete":!0,"v-autocomplete--is-selecting-index":this.selectedIndex>-1})},computedItems:function(){return this.filteredItems},selectedValues:function(){var t=this;return this.selectedItems.map((function(e){return t.getValue(e)}))},hasDisplayedItems:function(){var t=this;return this.hideSelected?this.filteredItems.some((function(e){return!t.hasItem(e)})):this.filteredItems.length>0},currentRange:function(){return null==this.selectedItem?0:String(this.getText(this.selectedItem)).length},filteredItems:function(){var t=this;return!this.isSearching||this.noFilter||null==this.internalSearch?this.allItems:this.allItems.filter((function(e){var i=Object(o["s"])(e,t.itemText),n=null!=i?String(i):"";return t.filter(e,String(t.internalSearch),n)}))},internalSearch:{get:function(){return this.lazySearch},set:function(t){this.lazySearch!==t&&(this.lazySearch=t,this.$emit("update:search-input",t))}},isAnyValueAllowed:function(){return!1},isDirty:function(){return this.searchIsDirty||this.selectedItems.length>0},isSearching:function(){return this.multiple&&this.searchIsDirty||this.searchIsDirty&&this.internalSearch!==this.getText(this.selectedItem)},menuCanShow:function(){return!!this.isFocused&&(this.hasDisplayedItems||!this.hideNoData)},$_menuProps:function(){var t=s["a"].options.computed.$_menuProps.call(this);return t.contentClass="v-autocomplete__content ".concat(t.contentClass||"").trim(),Object(n["a"])(Object(n["a"])({},r),t)},searchIsDirty:function(){return null!=this.internalSearch&&""!==this.internalSearch},selectedItem:function(){var t=this;return this.multiple?null:this.selectedItems.find((function(e){return t.valueComparator(t.getValue(e),t.getValue(t.internalValue))}))},listData:function(){var t=s["a"].options.computed.listData.call(this);return t.props=Object(n["a"])(Object(n["a"])({},t.props),{},{items:this.virtualizedItems,noFilter:this.noFilter||!this.isSearching||!this.filteredItems.length,searchInput:this.internalSearch}),t}},watch:{filteredItems:"onFilteredItemsChanged",internalValue:"setSearch",isFocused:function(t){t?(document.addEventListener("copy",this.onCopy),this.$refs.input&&this.$refs.input.select()):(document.removeEventListener("copy",this.onCopy),this.blur(),this.updateSelf())},isMenuActive:function(t){!t&&this.hasSlot&&(this.lazySearch=null)},items:function(t,e){e&&e.length||!this.hideNoData||!this.isFocused||this.isMenuActive||!t.length||this.activateMenu()},searchInput:function(t){this.lazySearch=t},internalSearch:"onInternalSearchChanged",itemText:"updateSelf"},created:function(){this.setSearch()},destroyed:function(){document.removeEventListener("copy",this.onCopy)},methods:{onFilteredItemsChanged:function(t,e){var i=this;if(t!==e){if(!this.autoSelectFirst){var n=e[this.$refs.menu.listIndex];n?this.setMenuIndex(t.findIndex((function(t){return t===n}))):this.setMenuIndex(-1),this.$emit("update:list-index",this.$refs.menu.listIndex)}this.$nextTick((function(){i.internalSearch&&(1===t.length||i.autoSelectFirst)&&(i.$refs.menu.getTiles(),i.autoSelectFirst&&t.length&&(i.setMenuIndex(0),i.$emit("update:list-index",i.$refs.menu.listIndex)))}))}},onInternalSearchChanged:function(){this.updateMenuDimensions()},updateMenuDimensions:function(){this.isMenuActive&&this.$refs.menu&&this.$refs.menu.updateDimensions()},changeSelectedIndex:function(t){this.searchIsDirty||(this.multiple&&t===o["z"].left?-1===this.selectedIndex?this.selectedIndex=this.selectedItems.length-1:this.selectedIndex--:this.multiple&&t===o["z"].right?this.selectedIndex>=this.selectedItems.length-1?this.selectedIndex=-1:this.selectedIndex++:t!==o["z"].backspace&&t!==o["z"].delete||this.deleteCurrentItem())},deleteCurrentItem:function(){var t=this.selectedIndex,e=this.selectedItems[t];if(this.isInteractive&&!this.getDisabled(e)){var i=this.selectedItems.length-1;if(-1!==this.selectedIndex||0===i){var n=this.selectedItems.length,s=t!==n-1?t:t-1,a=this.selectedItems[s];a?this.selectItem(e):this.setValue(this.multiple?[]:null),this.selectedIndex=s}else this.selectedIndex=i}},clearableCallback:function(){this.internalSearch=null,s["a"].options.methods.clearableCallback.call(this)},genInput:function(){var t=a["a"].options.methods.genInput.call(this);return t.data=Object(l["a"])(t.data,{attrs:{"aria-activedescendant":Object(o["q"])(this.$refs.menu,"activeTile.id"),autocomplete:Object(o["q"])(t.data,"attrs.autocomplete","off")},domProps:{value:this.internalSearch}}),t},genInputSlot:function(){var t=s["a"].options.methods.genInputSlot.call(this);return t.data.attrs.role="combobox",t},genSelections:function(){return this.hasSlot||this.multiple?s["a"].options.methods.genSelections.call(this):[]},onClick:function(t){this.isInteractive&&(this.selectedIndex>-1?this.selectedIndex=-1:this.onFocus(),this.isAppendInner(t.target)||this.activateMenu())},onInput:function(t){if(!(this.selectedIndex>-1)&&t.target){var e=t.target,i=e.value;e.value&&this.activateMenu(),this.multiple||""!==i||this.deleteCurrentItem(),this.internalSearch=i,this.badInput=e.validity&&e.validity.badInput}},onKeyDown:function(t){var e=t.keyCode;!t.ctrlKey&&[o["z"].home,o["z"].end].includes(e)||s["a"].options.methods.onKeyDown.call(this,t),this.changeSelectedIndex(e)},onSpaceDown:function(t){},onTabDown:function(t){s["a"].options.methods.onTabDown.call(this,t),this.updateSelf()},onUpDown:function(t){t.preventDefault(),this.activateMenu()},selectItem:function(t){s["a"].options.methods.selectItem.call(this,t),this.setSearch()},setSelectedItems:function(){s["a"].options.methods.setSelectedItems.call(this),this.isFocused||this.setSearch()},setSearch:function(){var t=this;this.$nextTick((function(){t.multiple&&t.internalSearch&&t.isMenuActive||(t.internalSearch=!t.selectedItems.length||t.multiple||t.hasSlot?null:t.getText(t.selectedItem))}))},updateSelf:function(){(this.searchIsDirty||this.internalValue)&&(this.multiple||this.valueComparator(this.internalSearch,this.getValue(this.internalValue))||this.setSearch())},hasItem:function(t){return this.selectedValues.indexOf(this.getValue(t))>-1},onCopy:function(t){var e,i;if(-1!==this.selectedIndex){var n=this.selectedItems[this.selectedIndex],s=this.getText(n);null==(e=t.clipboardData)||e.setData("text/plain",s),null==(i=t.clipboardData)||i.setData("text/vnd.vuetify.autocomplete.item+plain",s),t.preventDefault()}}}})}}]);
//# sourceMappingURL=chunk-d7659e66.7d7b1a2c.js.map