(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-85ebd20e"],{"3bbb":function(e,t,a){"use strict";a("b0c0"),a("ac1f"),a("1276");var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("3405"),i=a("c0d6"),s=a("633c"),p={id:{type:s["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},photo:{displayName:"image",type:s["a"].Types.Image,formConfig:{type:{root:function(){return i["a"].getters.rootUrl+o["a"].servantRoot}},requiredEdit:!1,md:12}},name:{displayName:"servantName"},password:{},permission:{type:s["a"].Types.Boolean},isPartTime:{type:s["a"].Types.Boolean}},u={add:function(e){return s["e"].postWithUploadFile("Servant.php?op=add",e,{showLoading:!0})},edit:function(e){return e.file&&(e.imageExt=e.file.name.split(".").lastItem),s["e"].postWithUploadFile("Servant.php?op=update",e,{showLoading:!0})},remove:function(e){return s["e"].post("Servant.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s["e"].get("Servant.php",Object(n["a"])({lang:o["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=s["a"].ModelFactory(p,u)},"8a91":function(e,t,a){"use strict";a("d81d");var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("3405"),i=a("633c"),s=a("3bbb"),p={id:{type:i["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"sectionName"},servantId:{displayName:"servantName",type:i["a"].Types.Option,formConfig:{type:{selectItems:s["a"].getList}}},tableCount:{form:!1}},u={add:function(e){return i["e"].postWithUploadFile("Section.php?op=add",e,{showLoading:!0})},edit:function(e){return i["e"].postWithUploadFile("Section.php?op=update",e,{showLoading:!0})},remove:function(e){return i["e"].post("Section.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["e"].get("Section.php",Object(n["a"])({op:"view",lang:o["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return i["a"].parseDataForEntity(e,p)})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=i["a"].ModelFactory(p,u)},cbe7:function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:e.model,icon:"mdi-table-chair","entity-name":e.$t("桌子管理")},scopedSlots:e._u([{key:"item.action",fn:function(t){var n=t.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(t){return e.goNext(n)}}},[e._v(" mdi-arrow-right ")])]}}])})],1)],1)},r=[],o=(a("b0c0"),a("633c")),i=(a("d81d"),a("5530")),s=(a("96cf"),a("1da1")),p=a("3405"),u=a("8a91"),c={id:{type:o["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"tableName"},sectionId:{displayName:"sectionName",type:o["a"].Types.Option,formConfig:{type:{selectItems:u["a"].getList,itemText:"name"}}},seatCount:{formConfig:{default:4}},usageStatus:{type:o["a"].Types.Boolean,form:!1},usageCount:{form:!1}},d={add:function(e){return o["e"].postWithUploadFile("Tables.php?op=add",e,{showLoading:!0})},edit:function(e){return o["e"].postWithUploadFile("Tables.php?op=update",e,{showLoading:!0})},remove:function(e){return o["e"].post("Tables.php?op=delete",{id:e})},load:function(){var e=Object(s["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,o["e"].get("Tables.php",Object(i["a"])({op:"currentInfos",lang:p["a"].lang()},t));case 2:return e.abrupt("return",e.sent.content.map((function(e){return o["a"].parseDataForEntity(e,c)})));case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},l=o["a"].ModelFactory(c,d),m={components:{IkDataTable:o["c"]},data:function(){return{model:l}},methods:{goNext:function(e){console.log(e.name),this.$router.push({name:"Tabellendetailseite",params:{id:e.id}})}}},f=m,g=a("2877"),h=a("6544"),y=a.n(h),b=a("a523"),v=a("132d"),w=Object(g["a"])(f,n,r,!1,null,null,null);t["default"]=w.exports;y()(w,{VContainer:b["a"],VIcon:v["a"]})}}]);
//# sourceMappingURL=chunk-85ebd20e.946647f4.js.map