(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-01e6bfdc","chunk-2d20862b"],{a523:function(t,e,a){"use strict";a("99af"),a("4de4"),a("b64b"),a("2ca0"),a("20f6"),a("4b85"),a("a15b"),a("498a");var s=a("2b0e");function i(t){return s["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,a){var s=a.props,i=a.data,r=a.children;i.staticClass="".concat(t," ").concat(i.staticClass||"").trim();var o=i.attrs;if(o){i.attrs={};var n=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}));n.length&&(i.staticClass+=" ".concat(n.join(" ")))}return s.id&&(i.domProps=i.domProps||{},i.domProps.id=s.id),e(s.tag,i,r)}})}var r=a("d9f7");e["a"]=i("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var a,s=e.props,i=e.data,o=e.children,n=i.attrs;return n&&(i.attrs={},a=Object.keys(n).filter((function(t){if("slot"===t)return!1;var e=n[t];return t.startsWith("data-")?(i.attrs[t]=e,!1):e||"string"===typeof e}))),s.id&&(i.domProps=i.domProps||{},i.domProps.id=s.id),t(s.tag,Object(r["a"])(i,{staticClass:"container",class:Array({"container--fluid":s.fluid}).concat(a||[])}),o)}})},d76a:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{id:"extended-tables",fluid:"",tag:"section"}},[a("base-v-component",{attrs:{heading:"Simple Tables",link:"componetns/simple-tables"}}),a("base-material-card",{staticClass:"px-5 py-3 mb-5",attrs:{color:"success",icon:"mdi-clipboard-text",inline:"",title:"Simple Table"}},[a("v-simple-table",[a("thead",[a("tr",[a("th",[t._v("#")]),a("th",[t._v("Name")]),a("th",[t._v("Job Position")]),a("th",[t._v("Since")]),a("th",{staticClass:"text-right"},[t._v(" Salary ")]),a("th",{staticClass:"text-right"},[t._v(" Actions ")])])]),a("tbody",[a("tr",[a("td",[t._v("1")]),a("td",[t._v("Andrew Mike")]),a("td",[t._v("Developer")]),a("td",[t._v("2013")]),a("td",{staticClass:"text-right"},[t._v(" € 99,225 ")]),a("td",{staticClass:"text-right"},t._l(t.actions,(function(e,s){return a("v-btn",{key:s,staticClass:"px-2 ml-1",attrs:{color:e.color,"min-width":"0",small:""}},[a("v-icon",{attrs:{small:""},domProps:{textContent:t._s(e.icon)}})],1)})),1)]),a("tr",[a("td",[t._v("2")]),a("td",[t._v("John Doe")]),a("td",[t._v("Designer")]),a("td",[t._v("2012")]),a("td",{staticClass:"text-right"},[t._v(" € 89,241 ")]),a("td",{staticClass:"text-right"},t._l(t.actions,(function(e,s){return a("v-btn",{key:s,staticClass:"px-1 ml-1",attrs:{color:e.color,fab:"","x-small":""}},[a("v-icon",{domProps:{textContent:t._s(e.icon)}})],1)})),1)]),a("tr",[a("td",[t._v("3")]),a("td",[t._v("Alex Mike")]),a("td",[t._v("Designer")]),a("td",[t._v("2010")]),a("td",{staticClass:"text-right"},[t._v(" € 92,144 ")]),a("td",{staticClass:"text-right"},t._l(t.actions,(function(e,s){return a("v-btn",{key:s,staticClass:"ml-1",attrs:{color:e.color,fab:"",icon:"","x-small":""}},[a("v-icon",{attrs:{small:""},domProps:{textContent:t._s(e.icon)}})],1)})),1)]),a("tr",[a("td",[t._v("4")]),a("td",[t._v("Mike Monday")]),a("td",[t._v("Marketing")]),a("td",[t._v("2013")]),a("td",{staticClass:"text-right"},[t._v(" € 49,990 ")]),a("td",{staticClass:"text-right"},t._l(t.actions,(function(e,s){return a("v-btn",{key:s,staticClass:"px-1 ml-1",attrs:{color:e.color,fab:"","x-small":""}},[a("v-icon",{domProps:{textContent:t._s(e.icon)}})],1)})),1)]),a("tr",[a("td",[t._v("5")]),a("td",[t._v("Paul Dickens")]),a("td",[t._v("Communications")]),a("td",[t._v("2015")]),a("td",{staticClass:"text-right"},[t._v(" € 69,201 ")]),a("td",{staticClass:"text-right"},t._l(t.actions,(function(e,s){return a("v-btn",{key:s,staticClass:"px-2 ml-1",attrs:{color:e.color,"min-width":"0",small:""}},[a("v-icon",{attrs:{small:""},domProps:{textContent:t._s(e.icon)}})],1)})),1)])])])],1),a("div",{staticClass:"py-3"}),a("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"success",icon:"mdi-clipboard",inline:"",title:"Checked Table"}},[a("v-data-table",{attrs:{headers:t.headers,items:t.selections,"hide-default-footer":"","show-select":""},scopedSlots:t._u([{key:"footer",fn:function(){return[a("v-card-text",[a("v-row",{attrs:{align:"center",justify:"end"}},[a("strong",{staticClass:"title"},[t._v("Total")]),a("div",{staticClass:"display-1 font-weight-light ml-12"},[t._v(" € 12,999 ")])])],1)]},proxy:!0}])})],1),a("div",{staticClass:"py-3"}),a("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"success",icon:"mdi-vuetify",inline:"",title:"Shopping Cart Table"}},[a("v-data-table",{attrs:{headers:t.productHeaders,items:t.products,"hide-default-footer":""},scopedSlots:t._u([{key:"item",fn:function(e){var s=e.item;return[a("tr",[a("td",[a("v-img",{staticClass:"mx-auto",attrs:{src:s.src,"max-width":"75"}})],1),a("td",[a("div",{staticClass:"purple--text headline",domProps:{textContent:t._s(s.name)}}),a("div",{staticClass:"grey--text subtitle-1 font-weight-light"},[t._v(" by "+t._s(s.brand)+" ")])]),a("td",{domProps:{textContent:t._s(s.color)}}),a("td",{domProps:{textContent:t._s(s.size)}}),a("td",{staticClass:"text-right",domProps:{textContent:t._s(s.price)}}),a("td"),a("td",{staticClass:"text-right",domProps:{textContent:t._s(s.amount)}})])]}},{key:"footer",fn:function(){return[a("v-divider"),a("v-card-text",[a("v-row",{attrs:{align:"center",justify:"end"}},[a("strong",{staticClass:"title"},[t._v("Total")]),a("div",{staticClass:"display-1 font-weight-light ml-12"},[t._v(" € 2,346 ")])])],1),a("v-divider"),a("div",{staticClass:"text-right py-6"},[a("v-btn",{staticClass:"mr-0",attrs:{color:"info",default:"",rounded:""}},[t._v(" Complete Purchase "),a("v-icon",[t._v("mdi-chevron-right")])],1)],1)]},proxy:!0}])})],1)],1)},i=[],r={name:"DashboardExtendedTables",data:function(){return{actions:[{color:"info",icon:"mdi-account"},{color:"success",icon:"mdi-pencil"},{color:"error",icon:"mdi-close"}],headers:[{text:"#",value:"id"},{text:"Product Name",value:"name"},{text:"Type",value:"type"},{align:"right",text:"Qty",value:"qty"},{align:"right",text:"Price",value:"price"},{align:"right",text:"Amount",value:"amount"}],productHeaders:[{sortable:!1,text:"",value:"src"},{text:"Product",value:"name"},{text:"Color",value:"color"},{text:"Size",value:"size"},{align:"right",text:"Price",value:"price"},{text:"Qty",value:"qty"},{align:"right",text:"Amount",value:"amount"}],products:[{src:"https://demos.creative-tim.com/material-dashboard-pro/assets/img/product1.jpg",name:"Spring Jacket",brand:"Dolce & Gabbana",color:"Red",size:"M",price:"€ 549",amount:"€ 549",qty:1},{src:"https://demos.creative-tim.com/material-dashboard-pro/assets/img/product2.jpg",name:"Short Pants",brand:"Pucca",color:"Purple",size:"M",price:"€ 499",amount:"€ 499",qty:2},{src:"https://demos.creative-tim.com/material-dashboard-pro/assets/img/product3.jpg",name:"Pencil Skirt",brand:"Valentino",color:"White",size:"XL",price:"€ 799",amount:"€ 799",qty:1}],selections:[{id:1,name:"Moleskine Agenda",type:"Office",qty:25,price:"€ 49",amount:"€ 1,225"},{id:2,name:"Stabilo Pen",type:"Office",qty:30,price:"€ 10",amount:"€ 300"},{id:3,name:"A4 Paper Pack",type:"Office",qty:30,price:"€ 10.99",amount:"€ 109"},{id:4,name:"Apple iPad",type:"Meeting",qty:10,price:"€ 499",amount:"€ 4,990"},{id:5,name:"Apple iPhone",type:"Communication",qty:10,price:"€ 599",amount:"€ 5,999"}]}}},o=r,n=a("2877"),c=a("6544"),l=a.n(c),d=a("8336"),m=a("99d9"),p=a("a523"),u=a("8fea"),v=a("ce7e"),f=a("132d"),h=a("adda"),g=a("0fd9"),x=a("1f4f"),b=Object(n["a"])(o,s,i,!1,null,null,null);e["default"]=b.exports;l()(b,{VBtn:d["a"],VCardText:m["b"],VContainer:p["a"],VDataTable:u["a"],VDivider:v["a"],VIcon:f["a"],VImg:h["a"],VRow:g["a"],VSimpleTable:x["a"]})}}]);
//# sourceMappingURL=chunk-01e6bfdc.c5d6f819.js.map