(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-4e95cdaa"],{"3bbb":function(t,e,a){"use strict";a("b0c0"),a("ac1f"),a("1276");var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("3405"),i=a("c0d6"),s=a("633c"),c={id:{type:s["a"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},photo:{displayName:"image",type:s["a"].Types.Image,formConfig:{type:{root:function(){return i["a"].getters.rootUrl+o["a"].servantRoot}},requiredEdit:!1,requiredNew:!1,md:12}},name:{displayName:"servantName"},password:{},permission:{type:s["a"].Types.Boolean},isPartTime:{type:s["a"].Types.Boolean}},u={add:function(t){return s["e"].postWithUploadFile("Servant.php?op=add",t,{showLoading:!0})},edit:function(t){return t.file&&(t.imageExt=t.file.name.split(".").lastItem),s["e"].postWithUploadFile("Servant.php?op=update",t,{showLoading:!0})},remove:function(t){return s["e"].post("Servant.php?op=delete",{id:t})},load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s["e"].get("Servant.php",Object(n["a"])({lang:o["a"].lang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=s["a"].ModelFactory(c,u)},dbc6:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[a("v-container",{attrs:{fluid:""}},[a("ik-data-table",{attrs:{model:t.model,"entity-name":t.$t("人员管理"),icon:"mdi-account"},scopedSlots:t._u([{key:"item.action",fn:function(e){var n=e.item;return[a("v-icon",{staticClass:"mr-2",attrs:{small:""},on:{click:function(e){return t.goNext(n)}}},[t._v(" mdi-arrow-right ")])]}}])})],1)],1)},r=[],o=a("3405"),i=a("633c"),s=a("3bbb"),c={components:{IkDataTable:i["c"]},data:function(){return{model:s["a"]}},computed:{ImageRoot:function(){return this.$store.getters.rootUrl+o["a"].servantRoot}},methods:{goNext:function(t){this.$router.push({name:"Keller Detail Seite",params:{id:t.id}})}}},u=c,l=a("2877"),d=a("6544"),p=a.n(d),m=a("a523"),f=a("132d"),g=Object(l["a"])(u,n,r,!1,null,null,null);e["default"]=g.exports;p()(g,{VContainer:m["a"],VIcon:f["a"]})}}]);
//# sourceMappingURL=chunk-4e95cdaa.fdd31ebd.js.map