(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7e8719a6"],{"4c03":function(e,t,r){"use strict";r("a15b");var a=r("b85c"),n=(r("96cf"),r("1da1")),o=r("5530"),i=r("f4d6"),s=r("9d8f"),u=r.n(s),p=r("ebc9"),c=r("a86d"),l=r("5089"),d=r("641f"),g=r.n(d),y=r("c0d6"),f=r("b0d9"),m=Boolean("0"===l["b"].isShowOnTable),b=["#FFCDD2","#F8BBD0","#E1BEE7","#D1C4E9","#C5CAE9","#BBDEFB","#B3E5FC","#B2EBF2","#B2DFDB","#C8E6C9","#DCEDC8","#F0F4C3","#FFF9C4","#FFECB3","#FFE0B2","#FFCCBC","#D7CCC8","#CFD8DC"],h={add:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,u.a.post("Category.php?op=add",Object(o["a"])(Object(o["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},edit:function(e){return e.appliedAttributeGroup=e.attributeGroupId.join(","),e.catTypeId=e.dishesCategoryTypeId,console.log("label-manage: item()",e),u.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},e),{},{langs:JSON.stringify(e.langs)}),{showLoading:!0})},remove:function(e){return u.a.post("Category.php?op=delete",{id:e})},load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("Category.php",t);case 2:return r=e.sent.content,console.log(r,"cate response"),e.abrupt("return",r);case 5:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),randomColor:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:g.a.showLoading(!0),r=Object(a["a"])(t),e.prev=2,r.s();case 4:if((n=r.n()).done){e.next=13;break}return i=n.value,i.appliedAttributeGroup=i.attributeGroupId.join(","),i.catTypeId=i.dishesCategoryTypeId,i.color=b[Math.round(18*Math.random())],e.next=11,u.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},i),{},{langs:JSON.stringify(i.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),r.e(e.t0);case 18:return e.prev=18,r.f(),e.finish(18);case 21:g.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeAllColor:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){var r,n,i;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:g.a.showLoading(!0),r=Object(a["a"])(t),e.prev=2,r.s();case 4:if((n=r.n()).done){e.next=13;break}return i=n.value,i.appliedAttributeGroup=i.attributeGroupId.join(","),i.catTypeId=i.dishesCategoryTypeId,i.color="#FFFFFF",e.next=11,u.a.postWithUploadFile("Category.php?op=update",Object(o["a"])(Object(o["a"])({},i),{},{langs:JSON.stringify(i.langs)}),{showLoading:!1});case 11:e.next=4;break;case 13:e.next=18;break;case 15:e.prev=15,e.t0=e["catch"](2),r.e(e.t0);case 18:return e.prev=18,r.f(),e.finish(18);case 21:g.a.toast("OK");case 22:case"end":return e.stop()}}),e,null,[[2,15,18,21]])})));function t(t){return e.apply(this,arguments)}return t}(),removeCategoryImage:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.post("Category.php?op=removeCategoryImage",Object(o["a"])({},t),{showLoading:!0});case 2:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},C={id:{type:i["IKDataEntity"].Types.Integer,form:!1,table:!1},color:{type:i["IKDataEntity"].Types.Color,formConfig:{required:!1}},dcImage:{type:i["IKDataEntity"].Types.Image,formConfig:{required:!1,type:{root:function(){return y["a"].getters.rootUrl+l["b"].dcImageRoot}}},displayName:"image",header:m},attributeGroupId:{displayName:"attributeGroupNames",type:i["IKDataEntity"].Types.Option,tableConfig:{width:"100px"},formConfig:{required:!1,type:{selectItems:f["a"].getList,multiple:!0}}},_langsname:{displayName:"KategorieName",form:!1},langs:{displayName:"labelName",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"labelName",default:l["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(e){return e.lang.toUpperCase()===l["b"].getLang().toUpperCase()},displayChild:function(e){return console.log(e),"name"===e}},childKey:["name","desc"],labelKey:"lang",children:[c["a"],c["a"],c["a"]],header:!1},dishesCategoryTypeId:{displayName:"warengruppe",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList}}},printOrder:{type:i["IKDataEntity"].Types.Integer,required:!1,formConfig:{default:50,requiredNew:!1,requiredEdit:!1,rule:[function(e){return/^[0-9]\d*$/.test(e)||"Bitte geben Sie die ganze Zahl ein"}]}},categorySort:{type:i["IKDataEntity"].Types.Integer,displayName:"sectionSort",formConfig:{required:!0}}};t["a"]=i["IKDataEntity"].ModelFactory(C,h)},"62fb":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ik-data-table",{ref:"table",staticStyle:{width:"100%"},attrs:{model:e.model,"entity-name":e.$t("分类"),icon:"mdi-label"},on:{reloaded:e.reloaded},scopedSlots:e._u([{key:"footer",fn:function(){return[r("v-btn",{staticClass:"primary ml-4",on:{click:e.setRandomColor}},[e._v(" "+e._s(e.$t("随机设置标签颜色"))+" ")]),r("v-btn",{staticClass:"red",on:{click:e.removeColor}},[e._v(" "+e._s(e.$t("消除所有标签颜色"))+" ")])]},proxy:!0}])})},n=[],o=(r("96cf"),r("1da1")),i=r("f4d6"),s=r("4c03"),u={components:{IkDataTable:i["IkDataTable"]},data:function(){return{model:s["a"],response:null}},mounted:function(){return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:case"end":return e.stop()}}),e)})))()},methods:{reloaded:function(){},setRandomColor:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e.response,"this.responese set"),t.t0=e.model,t.next=4,e.model.getList();case 4:t.t1=t.sent,t.t0.randomColor.call(t.t0,t.t1);case 6:case"end":return t.stop()}}),t)})))()},removeColor:function(){var e=this;return Object(o["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e.response,"this.responese remove"),t.t0=e.model,t.next=4,e.model.getList();case 4:t.t1=t.sent,t.t0.removeAllColor.call(t.t0,t.t1);case 6:case"end":return t.stop()}}),t)})))()}}},p=u,c=r("2877"),l=r("6544"),d=r.n(l),g=r("8336"),y=Object(c["a"])(p,a,n,!1,null,null,null);t["default"]=y.exports;d()(y,{VBtn:g["a"]})},a86d:function(e,t,r){"use strict";var a=r("f4d6"),n={id:{type:a["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};t["a"]=a["IKDataEntity"].ModelFactory(n,{})},b0d9:function(e,t,r){"use strict";var a=r("5530"),n=(r("96cf"),r("1da1")),o=r("5089"),i=r("f4d6"),s=r("9d8f"),u=r.n(s),p={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:i["IKDataEntity"].Types.Boolean},multiSelect:{type:i["IKDataEntity"].Types.Boolean},attrubuteCount:{type:i["IKDataEntity"].Types.Integer,form:!1}},c={load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("Category.php",Object(a["a"])({op:"showAttributeGroup",lang:o["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return u.a.postWithUploadFile("Category.php?op=addAttributeGroup",e,{showLoading:!0})},edit:function(e){return u.a.postWithUploadFile("Category.php?op=updateAttributeGroup",e,{showLoading:!0})},remove:function(e){return u.a.post("Category.php?op=deleteAttributeGroup",{id:e})}};t["a"]=i["IKDataEntity"].ModelFactory(p,c)},ebc9:function(e,t,r){"use strict";var a=r("5530"),n=(r("96cf"),r("1da1")),o=r("5089"),i=r("f4d6"),s=r("9d8f"),u=r.n(s),p={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},c={load:function(){var e=Object(n["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u.a.get("CategoryType.php",Object(a["a"])({lang:o["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["IKDataEntity"].ModelFactory(p,c)}}]);
//# sourceMappingURL=chunk-7e8719a6.17d63c8b.js.map