(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-364473e0","chunk-2d20862b"],{"4c03":function(e,t,a){"use strict";a("a15b");var r=a("b85c"),n=(a("96cf"),a("1da1")),o=a("5530"),i=a("f4d6"),s=a("9d8f"),c=a.n(s),p=a("ebc9"),u=a("a86d"),d=a("5089"),l=a("641f"),g=a.n(l),f=a("c0d6"),y=Boolean("0"===d["b"].isShowOnTable),m=["#FFCDD2","#F8BBD0","#E1BEE7","#D1C4E9","#C5CAE9","#BBDEFB","#B3E5FC","#B2EBF2","#B2DFDB","#C8E6C9","#DCEDC8","#F0F4C3","#FFF9C4","#FFECB3","#FFE0B2","#FFCCBC","#D7CCC8","#CFD8DC"],h={add:function(e){return e.appliedAttributeGroup="",e.catTypeId=e.dishesCategoryTypeId,c.a.post("Category.php?op=add",Object(o["a"])(Object(o["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup="",e.catTypeId=e.dishesCategoryTypeId,console.log("label-manage: item()",e),c.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return c.a.post("Category.php?op=delete",{id:e})},load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("Category.php",t);case 2:return a=e.sent.content,console.log(a,"cate response"),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),randomColor:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:g.a.showLoading(!0),a=Object(r["a"])(t),e.prev=2,a.s();case 4:if((n=a.n()).done){e.next=13;break}return i=n.value,i.appliedAttributeGroup=i.attributeGroupId.join(","),i.catTypeId=i.dishesCategoryTypeId,i.color=m[Math.round(18*Math.random())],e.next=11,c.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},i),{},{langs:JSON.stringify(i.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:g.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeAllColor:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var a,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:g.a.showLoading(!0),a=Object(r["a"])(t),e.prev=2,a.s();case 4:if((n=a.n()).done){e.next=13;break}return i=n.value,i.appliedAttributeGroup=i.attributeGroupId.join(","),i.catTypeId=i.dishesCategoryTypeId,i.color="#FFFFFF",e.next=11,c.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},i),{},{langs:JSON.stringify(i.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:g.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeCategoryImage:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.post("Category.php?op=removeCategoryImage",Object(o["a"])({},t),{showLoading:!0});case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},b={id:{type:i["IKDataEntity"].Types.Integer,form:!1,table:!1},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}},dcImage:{type:i["IKDataEntity"].Types.Image,formConfig:{required:!1,type:{root:function(){return f["a"].getters.rootUrl+d["b"].dcImageRoot}}},displayName:"image",header:y},_langsname:{displayName:"KategorieName",form:!1},langs:{displayName:"labelName",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:d["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===d["b"].getLang().toUpperCase()},displayChild:function(e){return console.log(e),"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[u["a"],u["a"],u["a"]],header:!1},dishesCategoryTypeId:{displayName:"warengruppe",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList}}},printOrder:{type:i["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},categorySort:{type:i["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{required:!0}}};t["a"]=i["IKDataEntity"].ModelFactory(b,h)},"6e8d":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("ik-data-table",{ref:"table",staticStyle:{width:"100%"},attrs:{model:e.model,"entity-name":e.$t("库存"),icon:"mdi-label"},on:{reloaded:e.reloaded}})],1)},n=[],o=a("f4d6"),i=(a("96cf"),a("1da1")),s=a("9d8f"),c=a.n(s),p=a("4c03"),u=a("9225"),d={id:{},code:{},dishName:{displayName:"name"},dishesCategoryId:{displayName:"分类",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList,itemText:"_langsname"}}},threshold:{},shortFactor:{}},l={edit:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.ids=t.id,e.next=3,c.a.post("DCache.php?op=setDCachePropertyForIdIn",t);case 3:return e.abrupt("return",e.sent.content);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("DCache.php?op=showDCacheProperty",{lang:u["a"].locale});case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},g=o["IKDataEntity"].ModelFactory(d,l),f={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:g}},methods:{reloaded:function(){}}},y=f,m=a("2877"),h=a("6544"),b=a.n(h),C=a("a523"),v=Object(m["a"])(y,r,n,!1,null,"26bdc2b0",null);t["default"]=v.exports;b()(v,{VContainer:C["a"]})},a523:function(e,t,a){"use strict";a("99af"),a("4de4"),a("b64b"),a("2ca0"),a("20f6"),a("4b85"),a("a15b"),a("498a");var r=a("2b0e");function n(e){return r["a"].extend({name:"v-".concat(e),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(t,a){var r=a.props,n=a.data,o=a.children;n.staticClass="".concat(e," ").concat(n.staticClass||"").trim();var i=n.attrs;if(i){n.attrs={};var s=Object.keys(i).filter((function(e){if("slot"===e)return!1;var t=i[e];return e.startsWith("data-")?(n.attrs[e]=t,!1):t||"string"===typeof t}));s.length&&(n.staticClass+=" ".concat(s.join(" ")))}return r.id&&(n.domProps=n.domProps||{},n.domProps.id=r.id),t(r.tag,n,o)}})}var o=a("d9f7");t["a"]=n("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(e,t){var a,r=t.props,n=t.data,i=t.children,s=n.attrs;return s&&(n.attrs={},a=Object.keys(s).filter((function(e){if("slot"===e)return!1;var t=s[e];return e.startsWith("data-")?(n.attrs[e]=t,!1):t||"string"===typeof t}))),r.id&&(n.domProps=n.domProps||{},n.domProps.id=r.id),e(r.tag,Object(o["a"])(n,{staticClass:"container",class:Array({"container--fluid":r.fluid}).concat(a||[])}),i)}})},a86d:function(e,t,a){"use strict";var r=a("f4d6"),n={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=r["IKDataEntity"].ModelFactory(n,{})},ebc9:function(e,t,a){"use strict";var r=a("5530"),n=(a("96cf"),a("1da1")),o=a("5089"),i=a("f4d6"),s=a("9d8f"),c=a.n(s),p={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},u={load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,c.a.get("CategoryType.php",Object(r["a"])({lang:o["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["IKDataEntity"].ModelFactory(p,u)}}]);
//# sourceMappingURL=chunk-364473e0.c7573cc4.js.map