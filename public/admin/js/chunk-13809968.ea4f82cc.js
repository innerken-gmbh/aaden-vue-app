(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-13809968"],{"2f69":function(t,e,a){"use strict";var r=a("5530"),n=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),p=a("9d8f"),s=a.n(p),u=a("b0d9"),c=a("ebc9"),d=a("c0d6"),l={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"name"},image:{type:o["IKDataEntity"].Types.Image,formConfig:{required:!1,type:{root:function(){return d["a"].getters.rootUrl+i["b"].dcImageRoot}}}},attributeGroupId:{displayName:"groupName",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].forceGetList}}},isMultiChosen:{type:o["IKDataEntity"].Types.Boolean},value:{displayName:"value",formConfig:{default:1}},printMod:{displayName:"printMod"},priceMod:{type:o["IKDataEntity"].Types.Float,displayName:"priceMod",formConfig:{overwriteRule:!0,rule:[function(t){return/^(-)?[0-9]+\.{0,1}[0-9]{0,2}$/.test(t)||"please enter the correct price"}]}},dishesCategoryTypeId:{displayName:"warengruppe",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList}}},isAsDefault:{type:o["IKDataEntity"].Types.Boolean},isActive:{type:o["IKDataEntity"].Types.Boolean}},f={add:function(t){return s.a.postWithUploadFile("Category.php?op=addAttribute",t,{showLoading:!0})},edit:function(t){return s.a.postWithUploadFile("Category.php?op=updateAttribute",t,{showLoading:!0})},remove:function(t){return s.a.post("Category.php?op=deleteAttribute",{id:t})},load:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Category.php",Object(r["a"])({op:"showAttribute",lang:i["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=o["IKDataEntity"].ModelFactory(l,f)},"5ba4":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{fluid:""}},[a("v-row",[a("v-col",{attrs:{cols:"12"}},[a("ik-data-table",{attrs:{model:t.AttributeGroup,"entity-name":t.$t("属性组"),icon:"mdi-heart"}})],1),a("v-col",{attrs:{cols:"12"}},[a("ik-data-table",{attrs:{model:t.Attribute,"entity-name":t.$t("属性管理"),icon:"mdi-heart"}})],1)],1)],1)},n=[],i=a("f4d6"),o=a("b0d9"),p=a("2f69"),s={components:{IkDataTable:i["IkDataTable"]},data:function(){return{AttributeGroup:o["a"],Attribute:p["a"]}}},u=s,c=a("2877"),d=a("6544"),l=a.n(d),f=a("62ad"),y=a("a523"),g=a("0fd9"),m=Object(c["a"])(u,r,n,!1,null,null,null);e["default"]=m.exports;l()(m,{VCol:f["a"],VContainer:y["a"],VRow:g["a"]})},a523:function(t,e,a){"use strict";a("99af"),a("4de4"),a("b64b"),a("2ca0"),a("20f6"),a("4b85"),a("a15b"),a("498a");var r=a("2b0e");function n(t){return r["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var r=a.props,n=a.data,i=a.children;n.staticClass="".concat(t," ").concat(n.staticClass||"").trim();var o=n.attrs;if(o){n.attrs={};var p=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}));p.length&&(n.staticClass+=" ".concat(p.join(" ")))}return r.id&&(n.domProps=n.domProps||{},n.domProps.id=r.id),e(r.tag,n,i)}})}var i=a("d9f7");e["a"]=n("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,r=e.props,n=e.data,o=e.children,p=n.attrs;return p&&(n.attrs={},a=Object.keys(p).filter((function(t){if("slot"===t)return!1;var e=p[t];return t.startsWith("data-")?(n.attrs[t]=e,!1):e||"string"===typeof e}))),r.id&&(n.domProps=n.domProps||{},n.domProps.id=r.id),t(r.tag,Object(i["a"])(n,{staticClass:"container",class:Array({"container--fluid":r.fluid}).concat(a||[])}),o)}})},b0d9:function(t,e,a){"use strict";var r=a("5530"),n=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),p=a("9d8f"),s=a.n(p),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{},printTitle:{},required:{type:o["IKDataEntity"].Types.Boolean},multiSelect:{type:o["IKDataEntity"].Types.Boolean},attrubuteCount:{type:o["IKDataEntity"].Types.Integer,form:!1}},c={load:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Category.php",Object(r["a"])({op:"showAttributeGroup",lang:i["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return s.a.postWithUploadFile("Category.php?op=addAttributeGroup",t,{showLoading:!0})},edit:function(t){return s.a.postWithUploadFile("Category.php?op=updateAttributeGroup",t,{showLoading:!0})},remove:function(t){return s.a.post("Category.php?op=deleteAttributeGroup",{id:t})}};e["a"]=o["IKDataEntity"].ModelFactory(u,c)},ebc9:function(t,e,a){"use strict";var r=a("5530"),n=(a("96cf"),a("1da1")),i=a("5089"),o=a("f4d6"),p=a("9d8f"),s=a.n(p),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{},lang:{}},c={load:function(){var t=Object(n["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("CategoryType.php",Object(r["a"])({lang:i["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=o["IKDataEntity"].ModelFactory(u,c)}}]);
//# sourceMappingURL=chunk-13809968.ea4f82cc.js.map