(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01e4f736"],{a523:function(t,a,e){"use strict";e("4de4"),e("d3b7"),e("b64b"),e("2ca0"),e("99af"),e("20f6"),e("4b85"),e("498a"),e("a15b");var n=e("2b0e");function i(t){return n["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(a,e){var n=e.props,i=e.data,r=e.children;i.staticClass="".concat(t," ").concat(i.staticClass||"").trim();var o=i.attrs;if(o){i.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var a=o[t];return t.startsWith("data-")?(i.attrs[t]=a,!1):a||"string"===typeof a}));s.length&&(i.staticClass+=" ".concat(s.join(" ")))}return n.id&&(i.domProps=i.domProps||{},i.domProps.id=n.id),a(n.tag,i,r)}})}var r=e("d9f7");a["a"]=i("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,a){var e,n=a.props,i=a.data,o=a.children,s=i.attrs;return s&&(i.attrs={},e=Object.keys(s).filter((function(t){if("slot"===t)return!1;var a=s[t];return t.startsWith("data-")?(i.attrs[t]=a,!1):a||"string"===typeof a}))),n.id&&(i.domProps=i.domProps||{},i.domProps.id=n.id),t(n.tag,Object(r["a"])(i,{staticClass:"container",class:Array({"container--fluid":n.fluid}).concat(e||[])}),o)}})},f623:function(t,a,e){"use strict";e.r(a);var n=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("v-container",{attrs:{id:"data-tables",tag:"section"}},[e("base-v-component",{attrs:{heading:"Data Tables",link:"components/data-tables"}}),e("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"indigo",icon:"mdi-vuetify",inline:""},scopedSlots:t._u([{key:"after-heading",fn:function(){return[e("div",{staticClass:"text-h3 font-weight-light"},[t._v(" DataTables ")])]},proxy:!0}])},[e("v-text-field",{staticClass:"ml-auto",staticStyle:{"max-width":"250px"},attrs:{"append-icon":"mdi-magnify","hide-details":"",label:t.$t("Search"),"single-line":""},model:{value:t.search,callback:function(a){t.search=a},expression:"search"}}),e("v-divider",{staticClass:"mt-3"}),e("v-data-table",{attrs:{headers:t.headers,items:t.items,search:t.search,"sort-by":["name","office"],"sort-desc":[!1,!0],"multi-sort":""},on:{"update:search":function(a){t.search=a}}})],1)],1)},i=[],r={name:"DashboardDataTables",data:function(){return{headers:[{text:"Name",value:"name"},{text:"Position",value:"position"},{text:"Office",value:"office"},{text:"Age",value:"age"},{text:"Date",value:"date"},{sortable:!1,text:"Actions",value:"actions"}],items:[{name:"Airi Satou",position:"Accountant",office:"Tokyo",age:33,date:"2008/11/28"},{name:"Angelica Ramos",position:"Chief Executive Officer (CEO)",office:"London",age:47,date:"2009/10/09"},{name:"Ashton Cox",position:"Junior Technical Author",office:"San Francisco",age:66,date:"2009/01/12"},{name:"Bradley Greer",position:"Software Engineer",office:"London",age:41,date:"2012/10/13"},{name:"Brenden Wagner",position:"Software Engineer",office:"San Francisco",age:28,date:"2011/06/07"}],search:void 0}}},o=r,s=e("2877"),c=e("6544"),d=e.n(c),l=e("a523"),f=e("8fea"),u=e("ce7e"),p=e("8654"),m=Object(s["a"])(o,n,i,!1,null,null,null);a["default"]=m.exports;d()(m,{VContainer:l["a"],VDataTable:f["a"],VDivider:u["a"],VTextField:p["a"]})}}]);
//# sourceMappingURL=chunk-01e4f736.83ba9d83.js.map