(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-85eb6d4c"],{"3bbb":function(e,t,a){"use strict";a("b0c0"),a("ac1f"),a("1276");var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("3405"),i=a("c0d6"),p=a("633c"),s={id:{type:p["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},photo:{displayName:"image",type:p["a"].Types.Image,formConfig:{type:{root:function(){return i["a"].getters.rootUrl+o["a"].servantRoot}},requiredEdit:!1,requiredNew:!1,md:12}},name:{displayName:"servantName"},password:{},permission:{type:p["a"].Types.Boolean},isPartTime:{type:p["a"].Types.Boolean}},c={add:function(e){return p["e"].postWithUploadFile("Servant.php?op=add",e,{showLoading:!0})},edit:function(e){return e.file&&(e.imageExt=e.file.name.split(".").lastItem),p["e"].postWithUploadFile("Servant.php?op=update",e,{showLoading:!0})},remove:function(e){return p["e"].post("Servant.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p["e"].get("Servant.php",Object(n["a"])({lang:o["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=p["a"].ModelFactory(s,c)},"8a91":function(e,t,a){"use strict";a("d81d");var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("3405"),i=a("633c"),p=a("3bbb"),s={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},name:{displayName:"sectionName"},servantId:{displayName:"servantName",type:i["a"].Types.Option,formConfig:{type:{selectItems:p["a"].getList}}},tableCount:{form:!1}},c={add:function(e){return i["e"].postWithUploadFile("Section.php?op=add",e,{showLoading:!0})},edit:function(e){return i["e"].postWithUploadFile("Section.php?op=update",e,{showLoading:!0})},remove:function(e){return i["e"].post("Section.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Section.php",Object(n["a"])({op:"view",lang:o["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return i["a"].parseDataForEntity(e,s)})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["a"].ModelFactory(s,c)},e348:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:e.model,icon:"mdi-desktop-tower-monitor","entity-name":e.$t("分区管理")}})],1)],1)},r=[],o=a("8a91"),i=a("633c"),p={components:{IkDataTable:i["c"]},data:function(){return{model:o["a"]}}},s=p,c=a("2877"),u=a("6544"),d=a.n(u),l=a("a523"),m=Object(c["a"])(s,n,r,!1,null,null,null);t["default"]=m.exports;d()(m,{VContainer:l["a"]})}}]);
//# sourceMappingURL=chunk-85eb6d4c.da05d7b5.js.map