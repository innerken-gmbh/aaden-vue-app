(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-f007a846"],{"4a2e":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:t.model,icon:"mdi-cards","entity-name":t.$t("会员卡销售记录"),"use-default-action":!1,"use-select":!1},scopedSlots:t._u([{key:"footer",fn:function(){return[a("v-toolbar",{attrs:{color:"white",flat:""}})]},proxy:!0},{key:"item.action",fn:function(e){var n=e.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.goNext(n)}}},[t._v(" mdi-arrow-right ")])]}}])})],1)],1)},r=[],i=a("f4d6"),o=a("5530"),s=(a("96cf"),a("1da1")),p=a("9d8f"),l=a.n(p),d=a("c791"),u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},dishesId:{displayName:"memberCardName",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,itemText:"_langsname"}}},createdAt:{},totalAmount:{},leftAmount:{},longId:{}},c={load:function(){var t=Object(s["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l.a.get("MemberCard.php",Object(o["a"])({op:"showAllMemberCardSaleRecord"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},f=i["IKDataEntity"].ModelFactory(u,c),g={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:f}},methods:{goNext:function(t){this.$router.push({name:"消费记录",params:{id:t.id}})}}},y=g,m=a("2877"),h=a("6544"),b=a.n(h),I=a("a523"),C=a("132d"),v=a("71d9"),N=Object(m["a"])(y,n,r,!1,null,null,null);e["default"]=N.exports;b()(N,{VContainer:I["a"],VIcon:C["a"],VToolbar:v["a"]})},"4c03":function(t,e,a){"use strict";a("a15b"),a("96cf");var n=a("1da1"),r=a("5530"),i=a("f4d6"),o=a("9d8f"),s=a.n(o),p=a("ebc9"),l=a("b0d9"),d=a("a86d"),u=a("5089"),c=a("6f56"),f={load:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Category.php",Object(r["a"])({},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},g={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:u["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(t){return t.lang.toUpperCase()===u["a"].getLang()},displayChild:function(t){return"name"===t}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1}},y=i["IKDataEntity"].ModelFactory(g,f),m={add:function(t){return t.appliedAttributeGroup=t.attributeGroupId.join(","),t.catTypeId=t.dishesCategoryTypeId,t.appliedConsumeTypeIds=t.consumeTypeIds.join(","),t.appliedFreeInConsumeTypeIds=t.freeInConsumeTypeIds.join(","),s.a.post("Category.php?op=add",Object(r["a"])(Object(r["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},edit:function(t){return t.appliedAttributeGroup=t.attributeGroupId.join(","),t.catTypeId=t.dishesCategoryTypeId,t.appliedConsumeTypeIds=t.consumeTypeIds.join(","),t.appliedFreeInConsumeTypeIds=t.freeInConsumeTypeIds.join(","),s.a.postWithUploadFile("Category.php?op=update",Object(r["a"])(Object(r["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},remove:function(t){return s.a.post("Category.php?op=delete",{id:t})},load:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Category.php",Object(r["a"])({},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},h={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},categorySort:{type:i["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{default:50,required:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:u["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(t){return t.lang.toUpperCase()===u["a"].getLang()},displayChild:function(t){return"name"===t}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1},dishesCategoryTypeId:{displayName:"labelType",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList}}},attributeGroupId:{displayName:"attributeGroupNames",type:i["IKDataEntity"].Types.Option,tableConfig:{width:"100px"},formConfig:{required:!1,type:{selectItems:l["a"].getList,multiple:!0}}},consumeTypeIds:{type:i["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:c["a"].getList,multiple:!0}}},freeInConsumeTypeIds:{type:i["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:c["a"].getList,multiple:!0}}},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}},printOrder:{type:i["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(t){return/^[0-9]\d*$/.test(t)||"Bitte geben Sie die ganze Zahl ein"}]}},parentId:{type:i["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:y.getList,itemText:"_langsname"}},header:!1}};e["a"]=i["IKDataEntity"].ModelFactory(h,m)},"5e23":function(t,e,a){},6306:function(t,e,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),s=a.n(o),p={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},l={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Printer.php",Object(n["a"])({op:"showPrinterGroups"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return s.a.postWithUploadFile("Printer.php?op=addPrinterGroups",t,{showLoading:!0})},edit:function(t){return s.a.postWithUploadFile("Printer.php?op=updatePrinterGroups",t,{showLoading:!0})},remove:function(t){return s.a.post("Printer.php?op=deletePrinterGroup",{id:t})}};e["a"]=i["IKDataEntity"].ModelFactory(p,l)},"6e35":function(t,e,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),s=a.n(o),p={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"allergName"},icon:{displayName:"icon"},shortName:{displayName:"shortName"},displayText:{displayName:"displayText"}},l={add:function(t){return s.a.postWithUploadFile("Dishes.php?op=addAllergen",t,{showLoading:!0})},edit:function(t){return s.a.postWithUploadFile("Dishes.php?op=updateAllergen",t,{showLoading:!0})},remove:function(t){return s.a.post("Dishes.php?op=deleteAllergen",{id:t})},load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Dishes.php",Object(n["a"])({op:"showAllAllergen"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=i["IKDataEntity"].ModelFactory(p,l)},"6f56":function(t,e,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("f4d6"),o=a("9d8f"),s=a.n(o),p={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"staffName"},printName:{displayName:"printTitle"},zbonGroup:{displayName:"zbonGroup"},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}}},l={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Complex.php",Object(n["a"])({op:"showAllConsumeTypeInfo"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return s.a.post("ConsumeType.php?op=add",Object(n["a"])(Object(n["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},edit:function(t){return s.a.postWithUploadFile("ConsumeType.php?op=update",Object(n["a"])(Object(n["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},remove:function(t){return s.a.post("ConsumeType.php?op=delete",{id:t})}};e["a"]=i["IKDataEntity"].ModelFactory(p,l)},"71d9":function(t,e,a){"use strict";a("0481"),a("4160"),a("4069"),a("a9e3");var n=a("3835"),r=a("5530"),i=(a("5e23"),a("8dd9")),o=a("adda"),s=a("80d2"),p=a("d9bd");e["a"]=i["a"].extend({name:"v-toolbar",props:{absolute:Boolean,bottom:Boolean,collapse:Boolean,dense:Boolean,extended:Boolean,extensionHeight:{default:48,type:[Number,String]},flat:Boolean,floating:Boolean,prominent:Boolean,short:Boolean,src:{type:[String,Object],default:""},tag:{type:String,default:"header"}},data:function(){return{isExtended:!1}},computed:{computedHeight:function(){var t=this.computedContentHeight;if(!this.isExtended)return t;var e=parseInt(this.extensionHeight);return this.isCollapsed?t:t+(isNaN(e)?0:e)},computedContentHeight:function(){return this.height?parseInt(this.height):this.isProminent&&this.dense?96:this.isProminent&&this.short?112:this.isProminent?128:this.dense?48:this.short||this.$vuetify.breakpoint.smAndDown?56:64},classes:function(){return Object(r["a"])(Object(r["a"])({},i["a"].options.computed.classes.call(this)),{},{"v-toolbar":!0,"v-toolbar--absolute":this.absolute,"v-toolbar--bottom":this.bottom,"v-toolbar--collapse":this.collapse,"v-toolbar--collapsed":this.isCollapsed,"v-toolbar--dense":this.dense,"v-toolbar--extended":this.isExtended,"v-toolbar--flat":this.flat,"v-toolbar--floating":this.floating,"v-toolbar--prominent":this.isProminent})},isCollapsed:function(){return this.collapse},isProminent:function(){return this.prominent},styles:function(){return Object(r["a"])(Object(r["a"])({},this.measurableStyles),{},{height:Object(s["g"])(this.computedHeight)})}},created:function(){var t=this,e=[["app","<v-app-bar app>"],["manual-scroll",'<v-app-bar :value="false">'],["clipped-left","<v-app-bar clipped-left>"],["clipped-right","<v-app-bar clipped-right>"],["inverted-scroll","<v-app-bar inverted-scroll>"],["scroll-off-screen","<v-app-bar scroll-off-screen>"],["scroll-target","<v-app-bar scroll-target>"],["scroll-threshold","<v-app-bar scroll-threshold>"],["card","<v-app-bar flat>"]];e.forEach((function(e){var a=Object(n["a"])(e,2),r=a[0],i=a[1];t.$attrs.hasOwnProperty(r)&&Object(p["a"])(r,i,t)}))},methods:{genBackground:function(){var t={height:Object(s["g"])(this.computedHeight),src:this.src},e=this.$scopedSlots.img?this.$scopedSlots.img({props:t}):this.$createElement(o["a"],{props:t});return this.$createElement("div",{staticClass:"v-toolbar__image"},[e])},genContent:function(){return this.$createElement("div",{staticClass:"v-toolbar__content",style:{height:Object(s["g"])(this.computedContentHeight)}},Object(s["s"])(this))},genExtension:function(){return this.$createElement("div",{staticClass:"v-toolbar__extension",style:{height:Object(s["g"])(this.extensionHeight)}},Object(s["s"])(this,"extension"))}},render:function(t){this.isExtended=this.extended||!!this.$scopedSlots.extension;var e=[this.genContent()],a=this.setBackgroundColor(this.color,{class:this.classes,style:this.styles,on:this.$listeners});return this.isExtended&&e.push(this.genExtension()),(this.src||this.$scopedSlots.img)&&e.unshift(this.genBackground()),t(this.tag,a,e)}})},a523:function(t,e,a){"use strict";a("99af"),a("4de4"),a("b64b"),a("2ca0"),a("20f6"),a("4b85"),a("a15b"),a("498a");var n=a("2b0e");function r(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var n=a.props,r=a.data,i=a.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var o=r.attrs;if(o){r.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(r.staticClass+=" ".concat(s.join(" ")))}return n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),e(n.tag,r,i)}})}var i=a("d9f7");e["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,n=e.props,r=e.data,o=e.children,s=r.attrs;return s&&(r.attrs={},a=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}))),n.id&&(r.domProps=r.domProps||{},r.domProps.id=n.id),t(n.tag,Object(i["a"])(r,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(a||[])}),o)}})},a86d:function(t,e,a){"use strict";var n=a("f4d6"),r={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};e["a"]=n["IKDataEntity"].ModelFactory(r,{})},b0d9:function(t,e,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),s=a("9d8f"),p=a.n(s),l={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:o["IKDataEntity"].Types.Boolean},multiSelect:{type:o["IKDataEntity"].Types.Boolean},attrubuteCount:{type:o["IKDataEntity"].Types.Integer,form:!1}},d={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p.a.get("Category.php",Object(n["a"])({op:"showAttributeGroup",lang:i["a"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return p.a.postWithUploadFile("Category.php?op=addAttributeGroup",t,{showLoading:!0})},edit:function(t){return p.a.postWithUploadFile("Category.php?op=updateAttributeGroup",t,{showLoading:!0})},remove:function(t){return p.a.post("Category.php?op=deleteAttributeGroup",{id:t})}};e["a"]=o["IKDataEntity"].ModelFactory(l,d)},c791:function(t,e,a){"use strict";a("a4d3"),a("e01a"),a("4de4"),a("0481"),a("caad"),a("a15b"),a("d81d"),a("4069"),a("b0c0"),a("ac1f"),a("2532"),a("1276"),a("96cf");var n=a("1da1"),r=a("5530"),i=a("f4d6"),o=a("9d8f"),s=a.n(o),p=a("5089"),l=a("c0d6"),d=a("4c03"),u=a("6306"),c=a("6e35"),f=a("a86d"),g=a("b0d9"),y=Boolean("0"===p["a"].isShowOnTable),m={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},code:{},image:{type:i["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return l["a"].getters.rootUrl+p["a"].dishImageRoot}},required:!1},displayName:"image",header:y},dishName:{displayName:"name",form:!1},price:{type:i["IKDataEntity"].Types.Float,formConfig:{default:"",overwriteRule:!0,rule:[function(t){return/^[0-9]+\.{0,1}[0-9]{0,2}$/.test(t)||"Bitte geben Sie den richtigen Preis ein"}]}},langs:{displayName:"name",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"name",default:p["a"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(t){return t.lang.toUpperCase()===p["a"].getLang()},displayChild:function(t){return"name"===t}},childKey:["name","desc"],labelKey:"lang",children:[f["a"],f["a"],f["a"]],header:!1},printGroupId:{displayName:"printCatName",type:i["IKDataEntity"].Types.Option,formConfig:{default:1,type:{selectItems:u["a"].getList}}},categoryId:{displayName:"labelName",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,itemText:"_langsname"}}},AllergenId:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList,multiple:!0},required:!1},header:!1,displayName:"过敏源"},attributeGroupId:{displayName:"attributeGroupNames",type:i["IKDataEntity"].Types.Option,formConfig:{merge:!1,required:!1,type:{selectItems:g["a"].getList,multiple:!0,disabledItem:function(t,e){return e.inheritAttributeGroupId?Object(r["a"])(Object(r["a"])({},t),{},{disabled:e.inheritAttributeGroupId.includes(t.id)}):t}}},header:!1},localAttributeGroupId:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:g["a"].getList,multiple:!0},inNew:!1,inEdit:!1},header:!1},inheritAttributeGroupId:{displayName:"AttributeGroupName",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:g["a"].getList,multiple:!0},inNew:!1,inEdit:!1},header:!1},dishWeight:{displayName:"DishWeight",type:i["IKDataEntity"].Types.Integer,formConfig:{default:1,required:!1,rule:[function(t){return/^[0-9]\d*$/.test(t)||"Bitte geben Sie die ganze Zahl ein"}]},header:!1},isActive:{type:i["IKDataEntity"].Types.Boolean,displayName:"isActive",formConfig:{default:1,required:!1},header:!1},dishAlias:{required:!1,formConfig:{requiredNew:!1,requiredEdit:!1}}},h={add:function(t){return t.attributeGroup=t.attributeGroupId.filter((function(e){return!t.inheritAttributeGroupId.includes(e)})).join(","),t.allergenGroup=t.AllergenId.join(","),s.a.postWithUploadFile("Dishes.php?op=add",Object(r["a"])(Object(r["a"])({},t),{},{params:JSON.stringify(t)}),{showLoading:!0})},edit:function(t){return t.attributeGroup=t.attributeGroupId.filter((function(e){return!t.inheritAttributeGroupId.includes(e)})).join(","),t.allergenGroup=t.AllergenId.join(","),t.file&&(t.imageExt=t.file.name.split(".")[1]),s.a.postWithUploadFile("Dishes.php?op=update",Object(r["a"])(Object(r["a"])({},t),{},{params:JSON.stringify(t)}),{showLoading:!0})},remove:function(t){return s.a.post("Dishes.php?op=delete",{id:t})},load:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Dishes.php",Object(r["a"])({lang:p["a"].getLang()},e));case 2:return t.abrupt("return",t.sent.content.map((function(t){return t.id=t.dishId,t.attributeGroupId=[t.inheritAttributeGroupId?t.inheritAttributeGroupId.split(","):[],t.localAttributeGroupId?t.localAttributeGroupId.split(","):[]].flat().join(","),t.langs=t.langs.map((function(t){return Object(r["a"])(Object(r["a"])({},t),{},{desc:t.description})})),t})));case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},b=i["IKDataEntity"].ModelFactory(m,h);b.getBuffet=Object(n["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,b.getList();case 2:return t.abrupt("return",t.sent.filter((function(t){return"8"===t.dishesCategoryTypeId})));case 3:case"end":return t.stop()}}),t)}))),e["a"]=b},ebc9:function(t,e,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),s=a("9d8f"),p=a.n(s),l={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},d={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p.a.get("CategoryType.php",Object(n["a"])({lang:i["a"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=o["IKDataEntity"].ModelFactory(l,d)}}]);
//# sourceMappingURL=chunk-f007a846.1583a33d.js.map