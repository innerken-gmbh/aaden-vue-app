(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e85a5e0"],{"4c03":function(e,t,a){"use strict";a("a15b");var n=a("b85c"),r=(a("96cf"),a("1da1")),o=a("5530"),i=a("f4d6"),p=a("9d8f"),s=a.n(p),u=a("ebc9"),c=a("b0d9"),d=a("a86d"),l=a("5089"),g={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Category.php",Object(o["a"])({},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},y={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},langs:{displayName:"labelName",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:l["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===l["b"].getLang()},displayChild:function(e){return"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1}},f=i["IKDataEntity"].ModelFactory(y,g),m=a("641f"),h=a.n(m),b=a("c0d6"),C=Boolean("0"===l["b"].isShowOnTable),I=["#FFCDD2","#F8BBD0","#E1BEE7","#D1C4E9","#C5CAE9","#BBDEFB","#B3E5FC","#B2EBF2","#B2DFDB","#C8E6C9","#DCEDC8","#F0F4C3","#FFF9C4","#FFECB3","#FFE0B2","#FFCCBC","#D7CCC8","#CFD8DC"],w={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,s.a.post("Category.php?op=add",Object(o["a"])(Object(o["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,console.log("label-manage: item()",e),s.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return s.a.post("Category.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Category.php",Object(o["a"])({},t));case 2:return a=e.sent.content,console.log(a,"cate response"),e.abrupt("return",a);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),randomColor:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:h.a.showLoading(!0),a=Object(n["a"])(t),e.prev=2,a.s();case 4:if((r=a.n()).done){e.next=13;break}return i=r.value,i.appliedAttributeGroup=i.attributeGroupId.join(","),i.catTypeId=i.dishesCategoryTypeId,i.color=I[Math.round(18*Math.random())],e.next=11,s.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},i),{},{langs:JSON.stringify(i.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),a.e(e.t0);case 18:return e.prev=18,a.f(),e.finish(18);case 21:h.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeAllColor:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var a,r,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:h.a.showLoading(!0),a=Object(n["a"])(t);try{for(a.s();!(r=a.n()).done;)i=r.value,i.appliedAttributeGroup=i.attributeGroupId.join(","),i.catTypeId=i.dishesCategoryTypeId,i.color="#FFFFFF",s.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},i),{},{langs:JSON.stringify(i.langs)}),{showLoading:!1})}catch(p){a.e(p)}finally{a.f()}h.a.toast("OK");case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),removeCategoryImage:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.post("Category.php?op=removeCategoryImage",Object(o["a"])({},t),{showLoading:!0});case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},D={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},_langsname:{displayName:"labelName",form:!1},dcImage:{type:i["IKDataEntity"].Types.Image,formConfig:{required:!1,type:{root:function(){return b["a"].getters.rootUrl+l["b"].dcImageRoot}}},displayName:"Label Image",header:C},langs:{displayName:"labelName",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:l["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===l["b"].getLang().toUpperCase()},displayChild:function(e){return console.log(e),"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[d["a"],d["a"],d["a"]],header:!1},dishesCategoryTypeId:{displayName:"labelType",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList}}},attributeGroupId:{displayName:"attributeGroupNames",type:i["IKDataEntity"].Types.Option,tableConfig:{width:"100px"},formConfig:{required:!1,type:{selectItems:c["a"].getList,multiple:!0}}},printOrder:{type:i["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},parentId:{type:i["IKDataEntity"].Types.Option,formConfig:{required:!1,type:{selectItems:f.getList,itemText:"_langsname"}},header:!1}};t["a"]=i["IKDataEntity"].ModelFactory(D,w)},"6e8d":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("ik-data-table",{ref:"table",staticStyle:{width:"100%"},attrs:{model:e.model,"entity-name":e.$t("库存"),icon:"mdi-label"},on:{reloaded:e.reloaded}})],1)},r=[],o=a("f4d6"),i=(a("96cf"),a("1da1")),p=a("9d8f"),s=a.n(p),u=a("4c03"),c=a("9225"),d={id:{},code:{},dishName:{displayName:"name"},dishesCategoryId:{displayName:"category",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList,itemText:"_langsname"}}},threshold:{},shortFactor:{}},l={edit:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.ids=t.id,e.next=3,s.a.post("DCache.php?op=setDCachePropertyForIdIn",t);case 3:return e.abrupt("return",e.sent.content);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),load:function(){var e=Object(i["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("DCache.php?op=showDCacheProperty",{lang:c["a"].locale});case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},g=o["IKDataEntity"].ModelFactory(d,l),y={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:g}},methods:{reloaded:function(){}}},f=y,m=a("2877"),h=a("6544"),b=a.n(h),C=a("a523"),I=Object(m["a"])(f,n,r,!1,null,"26bdc2b0",null);t["default"]=I.exports;b()(I,{VContainer:C["a"]})},a86d:function(e,t,a){"use strict";var n=a("f4d6"),r={id:{type:n["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=n["IKDataEntity"].ModelFactory(r,{})},b0d9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("5089"),i=a("f4d6"),p=a("9d8f"),s=a.n(p),u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:i["IKDataEntity"].Types.Boolean},multiSelect:{type:i["IKDataEntity"].Types.Boolean},attrubuteCount:{type:i["IKDataEntity"].Types.Integer,form:!1}},c={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Category.php",Object(n["a"])({op:"showAttributeGroup",lang:o["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return s.a.postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return s.a.postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return s.a.post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=i["IKDataEntity"].ModelFactory(u,c)},ebc9:function(e,t,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("5089"),i=a("f4d6"),p=a("9d8f"),s=a.n(p),u={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},c={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("CategoryType.php",Object(n["a"])({lang:o["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["IKDataEntity"].ModelFactory(u,c)}}]);
//# sourceMappingURL=chunk-7e85a5e0.eba3fa43.js.map