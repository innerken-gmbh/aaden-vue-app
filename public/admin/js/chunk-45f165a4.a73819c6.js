(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45f165a4","chunk-2d20862b"],{1681:function(t,e,a){},"5b8b":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-desktop-mac",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[a("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("BonTemplate"))+" ")])]},proxy:!0}])},[a("v-row",[a("v-col",{attrs:{cols:"12",md:"6",sm:"6"}},[a("v-select",{attrs:{items:t.ClassList,"item-text":"class","item-value":"class",label:t.$t("Choose your section")},on:{change:function(e){t.reloadItem(t.ResItem.class)}},model:{value:t.ResItem.class,callback:function(e){t.$set(t.ResItem,"class",e)},expression:"ResItem.class"}})],1)],1),a("v-divider",{staticClass:"mt-3"}),a("v-data-table",{attrs:{"fixed-header":!0,headers:t.headers,items:t.desserts,"items-per-page":15,loading:t.loading,"multi-sort":""},scopedSlots:t._u([{key:"item.action",fn:function(e){var i=e.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.editItem(i)}}},[t._v(" mdi-pencil ")]),a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.deleteItem(i)}}},[t._v(" mdi-delete ")])]}},{key:"no-data",fn:function(){return[a("v-btn",{attrs:{color:"primary"},on:{click:t.initialize}},[t._v(" Reset ")])]},proxy:!0},{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}},[a("v-spacer"),a("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:t.insertBon}},[t._v(" "+t._s(t.$t("增加默认厨房单"))+" ")])],1)]},proxy:!0}])})],1),a("v-dialog",{attrs:{"max-width":"80%"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v(t._s(t.formTitle))])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",md:"6",sm:"6"}},[a("v-text-field",{attrs:{label:"ID",value:"Auto",disabled:""}})],1),a("v-col",{attrs:{cols:"12",md:"6",sm:"6"}},[a("v-text-field",{attrs:{label:t.$t("sectionSort")},model:{value:t.editedItem.sectionSort,callback:function(e){t.$set(t.editedItem,"sectionSort",e)},expression:"editedItem.sectionSort"}})],1),a("v-col",{attrs:{cols:"12",md:"12",sm:"12"}},[a("v-textarea",{attrs:{label:t.$t("content"),"auto-grow":"",outlined:""},model:{value:t.editedItem.content,callback:function(e){t.$set(t.editedItem,"content",e)},expression:"editedItem.content"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.close}},[t._v(" "+t._s(t.$t("Cancel"))+" ")]),a("v-btn",{attrs:{color:"blue darken-1"},on:{click:t.save}},[t._v(" "+t._s(t.$t("Save"))+" ")])],1)],1)],1)],1)],1)},s=[],n=(a("96cf"),a("1da1")),o=a("0a61"),r=a("ccdd"),c={data:function(){return{loading:!0,dialog:!1,Utils:r["a"],headers:[{text:"Id",align:"start",sortable:!1,value:"id"},{text:this.$i18n.t("class"),value:"class"},{text:this.$i18n.t("sectionName"),value:"section"},{text:this.$i18n.t("sectionSort"),value:"sectionSort"},{text:this.$i18n.t("remark"),value:"remark"},{text:this.$i18n.t("action"),value:"action",sortable:!1}],desserts:[],ClassList:[],editedIndex:-1,ResItem:{class:""},editedItem:{sectionSort:"",content:"",id:-1}}},computed:{formTitle:function(){return this.editedIndex,this.$i18n.t("Edit")}},watch:{dialog:function(t){t||this.close()}},created:function(){this.initialize()},methods:{insertBon:function(){var t=this;Object(o["D"])(this.ResItem.class).then((function(e){r["a"].toast("Successful!"),t.close(),t.initialize()}))},initialize:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["p"])().then((function(e){if(t.ClassList=e.content,localStorage.getItem("lastItemClass")){var a=localStorage.getItem("lastItemClass");console.log(a),t.ResItem.class=a}else t.ResItem.class=t.ClassList[0].class;t.reloadItem(t.ResItem.class)}));case 2:case"end":return e.stop()}}),e)})))()},reloadItem:function(t){var e=this;Object(o["o"])(t).then((function(a){e.loading=!1,e.desserts=a.content,localStorage.setItem("lastItemClass",t)}))},editItem:function(t){this.editedItem=Object.assign({},t),this.dialog=!0,this.editedItem.sectionSort="5"},deleteItem:function(t){var e=this;Object(o["j"])(t.id).then((function(t){r["a"].toast("Successful!"),e.initialize()}))},save:function(){var t=this;Object(o["Q"])(this.editedItem.id,this.editedItem.sectionSort,this.editedItem.content).then((function(e){r["a"].toast("Successful!"),t.close(),t.initialize()}))},close:function(){this.dialog=!1}}},l=c,d=a("2877"),u=a("6544"),f=a.n(u),m=a("8336"),h=a("b0af"),v=a("99d9"),p=a("62ad"),g=a("a523"),b=a("8fea"),I=a("169a"),x=a("ce7e"),w=a("132d"),k=a("0fd9"),y=a("b974"),C=a("2fa4"),S=a("8654"),$=a("a844"),V=a("71d9"),R=Object(d["a"])(l,i,s,!1,null,null,null);e["default"]=R.exports;f()(R,{VBtn:m["a"],VCard:h["a"],VCardActions:v["a"],VCardText:v["b"],VCardTitle:v["c"],VCol:p["a"],VContainer:g["a"],VDataTable:b["a"],VDialog:I["a"],VDivider:x["a"],VIcon:w["a"],VRow:k["a"],VSelect:y["a"],VSpacer:C["a"],VTextField:S["a"],VTextarea:$["a"],VToolbar:V["a"]})},a523:function(t,e,a){"use strict";a("99af"),a("4de4"),a("b64b"),a("2ca0"),a("20f6"),a("4b85"),a("a15b"),a("498a");var i=a("2b0e");function s(t){return i["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var i=a.props,s=a.data,n=a.children;s.staticClass="".concat(t," ").concat(s.staticClass||"").trim();var o=s.attrs;if(o){s.attrs={};var r=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}));r.length&&(s.staticClass+=" ".concat(r.join(" ")))}return i.id&&(s.domProps=s.domProps||{},s.domProps.id=i.id),e(i.tag,s,n)}})}var n=a("d9f7");e["a"]=s("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,i=e.props,s=e.data,o=e.children,r=s.attrs;return r&&(s.attrs={},a=Object.keys(r).filter((function(t){if("slot"===t)return!1;var e=r[t];return t.startsWith("data-")?(s.attrs[t]=e,!1):e||"string"===typeof e}))),i.id&&(s.domProps=s.domProps||{},s.domProps.id=i.id),t(i.tag,Object(n["a"])(s,{staticClass:"container",class:Array({"container--fluid":i.fluid}).concat(a||[])}),o)}})},a844:function(t,e,a){"use strict";a("a9e3");var i=a("5530"),s=(a("1681"),a("8654")),n=a("58df"),o=Object(n["a"])(s["a"]);e["a"]=o.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(i["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},s["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{autoGrow:function(t){var e=this;this.$nextTick((function(){var a;t?e.calculateInputHeight():null==(a=e.$refs.input)||a.style.removeProperty("height")}))},lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,a=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(a,e)+"px"}},genInput:function(){var t=s["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){s["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},ccdd:function(t,e,a){"use strict";var i=a("5530"),s=a("641f"),n=a.n(s);e["a"]=Object(i["a"])({},n.a)}}]);
//# sourceMappingURL=chunk-45f165a4.a73819c6.js.map