(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-46a55e98"],{"3bbb":function(t,e,a){"use strict";a("b0c0"),a("ac1f"),a("1276");var n=a("5530"),r=(a("96cf"),a("1da1")),o=a("5089"),i=a("c0d6"),s=a("f4d6"),c=a("9d8f"),u=a.n(c),d={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},photo:{displayName:"image",type:s["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return i["a"].getters.rootUrl+o["b"].servantRoot}},requiredEdit:!1,requiredNew:!1,md:12},header:!1},name:{displayName:"servantName"},password:{},permission:{type:s["IKDataEntity"].Types.Boolean},isPartTime:{type:s["IKDataEntity"].Types.Boolean}},l={add:function(t){return u.a.postWithUploadFile("Servant.php?op=add",t,{showLoading:!0})},edit:function(t){return t.file&&(t.imageExt=t.file.name.split(".").lastItem),u.a.postWithUploadFile("Servant.php?op=update",t,{showLoading:!0})},remove:function(t){return u.a.post("Servant.php?op=delete",{id:t})},load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,u.a.get("Servant.php",Object(n["a"])({lang:o["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=s["IKDataEntity"].ModelFactory(d,l)},dbc6:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ik-data-table",{attrs:{model:t.model,"entity-name":t.$t("人员"),icon:"mdi-account"},scopedSlots:t._u([{key:"footer",fn:function(){return[a("v-btn",{staticClass:"ml-2 mr-2",staticStyle:{color:"white"},attrs:{dark:""},on:{click:function(e){t.dialog=!0}}},[t._v(" "+t._s(t.$t("打印跑堂日结单"))+" "),a("v-icon",{attrs:{dark:"",right:""}},[t._v(" mdi-plus ")])],1),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.dialog,callback:function(e){t.dialog=e},expression:"dialog"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v(t._s(t.$t("打印跑堂日结单")))])]),a("v-card-text",[a("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":t.dates,"offset-y":""},on:{"update:returnValue":function(e){t.dates=e},"update:return-value":function(e){t.dates=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var n=e.on;return[a("v-text-field",t._g({attrs:{"hide-details":"",label:t.$t("日期筛选"),"prepend-icon":"mdi-calendar","single-line":""},model:{value:t.dates,callback:function(e){t.dates=e},expression:"dates"}},n))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[a("v-date-picker",{staticStyle:{width:"100%"},attrs:{"no-title":"",range:"",scrollable:"",locale:"de"},model:{value:t.dates,callback:function(e){t.dates=e},expression:"dates"}},[a("v-spacer"),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.menu=!1}}},[t._v(" "+t._s(t.$t("Cancel"))+" ")]),a("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menu.save(t.dates)}}},[t._v(" "+t._s(t.$t("Ok"))+" ")])],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:function(e){t.dialog=!1}}},[t._v(" "+t._s(t.$t("Cancel"))+" ")]),a("v-btn",{attrs:{color:"blue darken-1"},on:{click:t.printAllServantBon}},[t._v(" "+t._s(t.$t("打印"))+" ")])],1)],1)],1)]},proxy:!0}])})},r=[],o=(a("4160"),a("159b"),a("96cf"),a("1da1")),i=a("5089"),s=a("641f"),c=a.n(s),u=a("f4d6"),d=a("3bbb"),l=a("0a61"),p=a("ff51"),f={components:{IkDataTable:u["IkDataTable"]},data:function(){return{model:d["a"],dates:[],menu:!1,dialog:!1}},computed:{ImageRoot:function(){return this.$store.getters.rootUrl+i["b"].servantRoot}},mounted:function(){this.dates=[Object(p["a"])(0),Object(p["a"])(0)]},methods:{clear:function(){this.dates=[]},printAllServantBon:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){var a,n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return void 0===t.dates[1]&&(t.dates[1]=t.dates[0]),Date.parse(t.dates[0])>Date.parse(t.dates[1])&&(a=[t.dates[1],t.dates[0]],t.dates[0]=a[0],t.dates[1]=a[1]),e.next=4,d["a"].getList();case 4:n=e.sent,n.forEach((function(e){Object(l["G"])(e.id,t.dates[0],t.dates[1]).then((function(){c.a.toast(),t.menu=!1,t.dialog=!1}))}));case 6:case"end":return e.stop()}}),e)})))()},goNext:function(t){this.$router.push({name:"Keller Detail Seite",params:{id:t.id}})}}},m=f,v=a("2877"),g=a("6544"),b=a.n(g),h=a("8336"),y=a("b0af"),k=a("99d9"),x=a("2e4b"),w=a("169a"),D=a("132d"),T=a("e449"),_=a("2fa4"),S=a("8654"),I=Object(v["a"])(m,n,r,!1,null,null,null);e["default"]=I.exports;b()(I,{VBtn:h["a"],VCard:y["a"],VCardActions:k["a"],VCardText:k["b"],VCardTitle:k["c"],VDatePicker:x["a"],VDialog:w["a"],VIcon:D["a"],VMenu:T["a"],VSpacer:_["a"],VTextField:S["a"]})},ff51:function(t,e,a){"use strict";a.d(e,"a",(function(){return n})),a.d(e,"b",(function(){return r})),a.d(e,"c",(function(){return o}));a("a15b");function n(t){var e=new Date,a=e.getTime(),n=864e5,r=a+t*n,o=new Date(r),i=o.getFullYear(),s=o.getMonth()+1,c=o.getDate();return[i,s,c].join("-")}function r(t){var e=new Date,a=e.getTime(),n=864e5,r=a+t*n,o=new Date(r),i=o.getFullYear()+"-",s=o.getMonth()+1,c=o.getDate(),u=o.getHours()<10?"0"+o.getHours():o.getHours(),d=o.getMinutes()<10?"0"+o.getMinutes():o.getMinutes(),l=o.getSeconds()<10?"0"+o.getSeconds():o.getSeconds();return i+s+"-"+c+" "+u+":"+d+":"+l}function o(t){var e=t;return e.maxDineTime&&(e.maxDineTime=e.maxDineTime/60),e.roundTime&&(e.roundTime=e.roundTime/60),e}}}]);
//# sourceMappingURL=chunk-46a55e98.f1373d0c.js.map