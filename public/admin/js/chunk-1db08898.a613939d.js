(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-1db08898"],{1681:function(t,e,i){},"768b":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-container",{attrs:{fluid:""}},[i("base-material-card",{staticClass:"px-5 py-3 ",attrs:{color:"indigo",icon:"mdi-desktop-tower-monitor",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[i("div",{staticClass:"display-2 font-weight-light"},[t._v(" "+t._s(t.$t("提交问题"))+" ")])]},proxy:!0}])},[i("v-form",{ref:"form",attrs:{"lazy-validation":!1},model:{value:t.valid,callback:function(e){t.valid=e},expression:"valid"}},[i("v-container",[i("v-row",[i("v-col",{attrs:{cols:"12",md:"12",sm:"6"}},[i("span",{staticClass:"subtitle-1 font-weight-bold"},[t._v(t._s(t.$t("title")))])]),i("v-col",{attrs:{cols:"12",md:"12",sm:"6"}},[i("v-text-field",{attrs:{rules:t.Utils.ValidateRules.NotEmpty,label:t.$t("title")},model:{value:t.editedItem.title,callback:function(e){t.$set(t.editedItem,"title",e)},expression:"editedItem.title"}})],1)],1),i("v-row",[i("v-col",{attrs:{cols:"12",md:"12",sm:"6"}},[i("span",{staticClass:"subtitle-1 font-weight-bold"},[t._v(t._s(t.$t("description")))])]),i("v-col",{attrs:{cols:"12",md:"12",sm:"6"}},[i("v-textarea",{attrs:{rules:t.Utils.ValidateRules.NotEmpty,label:t.$t("problem")},model:{value:t.editedItem.content,callback:function(e){t.$set(t.editedItem,"content",e)},expression:"editedItem.content"}})],1)],1),i("v-row",[i("v-spacer"),i("v-btn",{staticClass:"mb-2",attrs:{color:"primary",dark:""},on:{click:function(e){return t.summit()}}},[t._v(" "+t._s(t.$t("提交"))+" ")])],1)],1)],1)],1)],1)},n=[],o=(i("96cf"),i("1da1")),s=i("0a61"),r=i("ccdd"),l={data:function(){return{loading:!0,desserts:[],editedIndex:-1,valid:!0,Utils:r["a"],editedItem:{title:"",content:""},defaultItem:{title:"",content:""}}},computed:{formTitle:function(){return-1===this.editedIndex?this.$i18n.t("添加新的分区"):this.$i18n.t("编辑")}},watch:{dialog:function(t){t||this.close()}},created:function(){this.initialize()},methods:{initialize:function(){return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:case"end":return t.stop()}}),t)})))()},summit:function(){var t=this;this.$refs.form.validate()&&r["a"].showConfirm("Are you sure?","you want to summit",(function(){Object(s["p"])(t.editedItem.title,t.editedItem.content).then((function(){r["a"].toast("提交成功"),t.initialize()}))}))},close:function(){this.dialog=!1,this.editedIndex=-1}}},c=l,u=i("2877"),d=i("6544"),h=i.n(d),m=i("8336"),f=i("62ad"),p=i("a523"),v=i("4bd4"),w=i("0fd9"),g=i("2fa4"),b=i("8654"),x=i("a844"),I=Object(u["a"])(c,a,n,!1,null,null,null);e["default"]=I.exports;h()(I,{VBtn:m["a"],VCol:f["a"],VContainer:p["a"],VForm:v["a"],VRow:w["a"],VSpacer:g["a"],VTextField:b["a"],VTextarea:x["a"]})},a844:function(t,e,i){"use strict";i("a9e3");var a=i("5530"),n=(i("1681"),i("8654")),o=i("58df"),s=Object(o["a"])(n["a"]);e["a"]=s.extend({name:"v-textarea",props:{autoGrow:Boolean,noResize:Boolean,rowHeight:{type:[Number,String],default:24,validator:function(t){return!isNaN(parseFloat(t))}},rows:{type:[Number,String],default:5,validator:function(t){return!isNaN(parseInt(t,10))}}},computed:{classes:function(){return Object(a["a"])({"v-textarea":!0,"v-textarea--auto-grow":this.autoGrow,"v-textarea--no-resize":this.noResizeHandle},n["a"].options.computed.classes.call(this))},noResizeHandle:function(){return this.noResize||this.autoGrow}},watch:{lazyValue:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)},rowHeight:function(){this.autoGrow&&this.$nextTick(this.calculateInputHeight)}},mounted:function(){var t=this;setTimeout((function(){t.autoGrow&&t.calculateInputHeight()}),0)},methods:{calculateInputHeight:function(){var t=this.$refs.input;if(t){t.style.height="0";var e=t.scrollHeight,i=parseInt(this.rows,10)*parseFloat(this.rowHeight);t.style.height=Math.max(i,e)+"px"}},genInput:function(){var t=n["a"].options.methods.genInput.call(this);return t.tag="textarea",delete t.data.attrs.type,t.data.attrs.rows=this.rows,t},onInput:function(t){n["a"].options.methods.onInput.call(this,t),this.autoGrow&&this.calculateInputHeight()},onKeyDown:function(t){this.isFocused&&13===t.keyCode&&t.stopPropagation(),this.$emit("keydown",t)}}})},ccdd:function(t,e,i){"use strict";var a=i("5530"),n=i("633c");e["a"]=Object(a["a"])({},n["b"])}}]);
//# sourceMappingURL=chunk-1db08898.a613939d.js.map