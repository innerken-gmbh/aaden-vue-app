(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0c849fa2"],{"2f69":function(t,e,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("5089"),i=a("f4d6"),p=a("9d8f"),u=a.n(p),s=a("b0d9"),c=a("ebc9"),d={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"name"},attributeGroupId:{displayName:"groupName",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:s["a"].forceGetList}}},isMultiChosen:{type:i["IKDataEntity"].Types.Boolean},value:{displayName:"value"},printMod:{displayName:"printMod"},priceMod:{type:i["IKDataEntity"].Types.Float,displayName:"priceMod",formConfig:{overwriteRule:!0,rule:[function(t){return/^(-)?[0-9]+\.{0,1}[0-9]{0,2}$/.test(t)||"please enter the correct price"}]}},dishesCategoryTypeId:{displayName:"warengruppe",type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList}}},isAsDefault:{type:i["IKDataEntity"].Types.Boolean}},l={add:function(t){return u.a.postWithUploadFile("Category.php?op=addAttribute",t,{showLoading:!0})},edit:function(t){return u.a.postWithUploadFile("Category.php?op=updateAttribute",t,{showLoading:!0})},remove:function(t){return u.a.post("Category.php?op=deleteAttribute",{id:t})},load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.a.get("Category.php",Object(n["a"])({op:"showAttribute",lang:o["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=i["IKDataEntity"].ModelFactory(d,l)},"5ba4":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("ik-data-table",{attrs:{model:t.AttributeGroup,"entity-name":t.$t("属性组"),icon:"mdi-heart"}})],1),a("v-col",{attrs:{cols:"12"}},[a("ik-data-table",{attrs:{model:t.Attribute,"entity-name":t.$t("属性管理"),icon:"mdi-heart"}})],1)],1)],1)},r=[],o=a("f4d6"),i=a("b0d9"),p=a("2f69"),u={components:{IkDataTable:o["IkDataTable"]},data:function(){return{AttributeGroup:i["a"],Attribute:p["a"]}}},s=u,c=a("2877"),d=a("6544"),l=a.n(d),y=a("62ad"),f=a("a523"),g=a("0fd9"),m=Object(c["a"])(s,n,r,!1,null,null,null);e["default"]=m.exports;l()(m,{VCol:y["a"],VContainer:f["a"],VRow:g["a"]})},b0d9:function(t,e,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("5089"),i=a("f4d6"),p=a("9d8f"),u=a.n(p),s={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:i["IKDataEntity"].Types.Boolean},multiSelect:{type:i["IKDataEntity"].Types.Boolean},attrubuteCount:{type:i["IKDataEntity"].Types.Integer,form:!1}},c={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.a.get("Category.php",Object(n["a"])({op:"showAttributeGroup",lang:o["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return u.a.postWithUploadFile("Category.php?op=addAttributeGroup",t,{showLoading:!0})},edit:function(t){return u.a.postWithUploadFile("Category.php?op=updateAttributeGroup",t,{showLoading:!0})},remove:function(t){return u.a.post("Category.php?op=deleteAttributeGroup",{id:t})}};e["a"]=i["IKDataEntity"].ModelFactory(s,c)},ebc9:function(t,e,a){"use strict";var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("5089"),i=a("f4d6"),p=a("9d8f"),u=a.n(p),s={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},c={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.a.get("CategoryType.php",Object(n["a"])({lang:o["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=i["IKDataEntity"].ModelFactory(s,c)}}]);
//# sourceMappingURL=chunk-0c849fa2.3c1332f4.js.map