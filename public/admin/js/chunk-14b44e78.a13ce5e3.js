(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-14b44e78"],{"3bbb":function(e,t,n){"use strict";n("b0c0"),n("ac1f"),n("1276");var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("5089"),o=n("c0d6"),s=n("f4d6"),p=n("9d8f"),d=n.n(p),u={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},photo:{displayName:"image",type:s["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return o["a"].getters.rootUrl+i["b"].servantRoot}},requiredEdit:!1,requiredNew:!1,md:12},header:!1},name:{displayName:"servantName"},password:{},permission:{type:s["IKDataEntity"].Types.Boolean},isPartTime:{type:s["IKDataEntity"].Types.Boolean}},c={add:function(e){return d.a.postWithUploadFile("Servant.php?op=add",e,{showLoading:!0})},edit:function(e){return e.file&&(e.imageExt=e.file.name.split(".").lastItem),d.a.postWithUploadFile("Servant.php?op=update",e,{showLoading:!0})},remove:function(e){return d.a.post("Servant.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("Servant.php",Object(a["a"])({lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=s["IKDataEntity"].ModelFactory(u,c)},6306:function(e,t,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("f4d6"),o=n("9d8f"),s=n.n(o),p={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},upsideDown:{type:i["IKDataEntity"].Types.Boolean},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},d={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Printer.php",Object(a["a"])({op:"showPrinterGroups"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return s.a.postWithUploadFile("Printer.php?op=addPrinterGroups",e,{showLoading:!0})},edit:function(e){return s.a.postWithUploadFile("Printer.php?op=updatePrinterGroups",e,{showLoading:!0})},remove:function(e){return s.a.post("Printer.php?op=deletePrinterGroup",{id:e})}};t["a"]=i["IKDataEntity"].ModelFactory(p,d)},"8a91":function(e,t,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("5089"),o=n("f4d6"),s=n("9d8f"),p=n.n(s),d=n("3bbb"),u=n("c0d6"),c={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},name:{displayName:"sectionName"},image:{type:o["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return u["a"].getters.rootUrl}},required:!1},displayName:"sectionImg"},servantIds:{displayName:"servantName",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,multiple:!0}}},tableCount:{form:!1}},l={add:function(e){return e.servantIds=JSON.stringify(e.servantIds),p.a.postWithUploadFile("Section.php?op=add",e,{showLoading:!0})},edit:function(e){return e.servantIds=JSON.stringify(e.servantIds),p.a.postWithUploadFile("Section.php?op=update",e,{showLoading:!0})},remove:function(e){return p.a.post("Section.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Section.php",Object(a["a"])({op:"view",lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(c,l)},cb25:function(e,t,n){"use strict";n("b0c0");var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("f4d6"),o=n("9d8f"),s=n.n(o),p=n("6306"),d={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},isSticker:{displayName:"isSticker"},lineLength:{displayName:"lineLength"},typeDesc:{displayName:"typeDesc"},typeName:{displayName:"typeName"}},u={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,s.a.get("Printer.php",Object(a["a"])({op:"showPrinterType"},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()},c=i["IKDataEntity"].ModelFactory(d,u),l=n("8a91"),f={id:{type:i["IKDataEntity"].Types.Integer,displayName:"deviceId",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},printerName:{displayName:"printerName"},printerTypeId:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c.getList,itemText:"typeName"},requiredEdit:!1},displayName:"printerTypeName"},identity:{displayName:"identity",header:!1,formConfig:{inEdit:!1}},sn:{displayName:"sn"},key:{displayName:"Key",formConfig:{inEdit:!1}},groupId:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList,itemText:"name",multiple:!0},requiredEdit:!1},displayName:"groupSecName"},sectionIds:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList,itemText:"name",multiple:!0},requiredEdit:!0},displayName:"sectionName"}},m={load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){var n;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i["IKDataEntity"].generalLoad("Printer.php",Object(a["a"])({op:"showAllPrinterStatus"},t));case 2:return n=e.sent,e.abrupt("return",n.content);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),add:function(e){return e.groupIds=JSON.stringify(e.groupId),e.name=e.printerName,e.printerSectionID=JSON.stringify(e.sectionIds),s.a.postWithUploadFile("Printer.php?op=add",e,{showLoading:!0})},edit:function(e){return e.groupIds=JSON.stringify(e.groupId),e.name=e.printerName,e.printerSectionID=JSON.stringify(e.sectionIds),s.a.postWithUploadFile("Printer.php?op=edit",e,{showLoading:!0})},remove:function(e){return s.a.post("Printer.php?op=remove",{id:e})}};t["a"]=i["IKDataEntity"].ModelFactory(f,m)},d797:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("v-container",{attrs:{fluid:""}},[n("ik-data-table",{attrs:{model:e.model,icon:"mdi-cog-transfer","entity-name":e.$t("打印分区")}}),n("v-card",[n("v-toolbar",{attrs:{dense:"",color:"primary",dark:""}},[n("v-toolbar-title",[e._v(e._s(e.$t("设备分布")))]),n("v-spacer"),n("v-btn",{attrs:{text:""},on:{click:e.clearAll}},[e._v(" "+e._s(e.$t("清空"))+" ")])],1),n("v-card-text",[n("v-data-table",{attrs:{dense:"","hide-default-footer":"",headers:e.headers,"items-per-page":100,items:e.tableData},scopedSlots:e._u([e._l(e.sectionHeaders,(function(t,a){return{key:"item."+t.name,fn:function(r){var i=r.item;return[n("v-checkbox",{key:a,attrs:{disabled:e.loading,"input-value":i[t.name]},on:{click:function(n){return e.updateSection(i,t.name,t.id)}}})]}}}))],null,!0)})],1)],1)],1)],1)},r=[],i=(n("99af"),n("4160"),n("c975"),n("d81d"),n("a434"),n("b0c0"),n("159b"),n("96cf"),n("1da1")),o=n("6306"),s=n("cb25"),p=n("9d8f"),d=n.n(p),u=n("f4d6"),c={components:{IkDataTable:u["IkDataTable"]},data:function(){return{model:o["a"],displayData:[],loading:!1,sectionHeaders:[],fixedHeader:[{text:"name",value:"name"},{text:"sn",value:"sn"}]}},computed:{headers:function(){return this.fixedHeader.concat(this.sectionHeaders)},tableData:function(){var e=this,t=[];return this.displayData.forEach((function(n){n.name=n.printerName,e.sectionHeaders.forEach((function(e){n.groupId&&(n[e.name]=n.groupId.indexOf(e.id)>-1)})),t.push(n)})),t}},mounted:function(){this.loadData()},methods:{updateSection:function(e,t,n){var a=this;return Object(i["a"])(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){while(1)switch(r.prev=r.next){case 0:return a.loading=!0,e[t]=!e[t],e[t]?e.groupId.push(n):e.groupId.splice(e.groupId.indexOf(n),1),e.groupIds=JSON.stringify(e.groupId),r.next=6,d.a.post("Printer.php?op=edit",e);case 6:a.loading=!1;case 7:case"end":return r.stop()}}),r)})))()},clearAll:function(){this.loading=!0,this.displayData.forEach((function(e){e.groupId=[],e.groupIds=JSON.stringify(e.groupId),d.a.post("Printer.php?op=edit",e)})),this.loading=!1},loadData:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o["a"].getList();case 2:return e.sectionHeaders=t.sent.map((function(e){return e.text=e.name,e.value=e.name,e})),t.next=5,s["a"].getList();case 5:e.displayData=t.sent,console.log(e.displayData,"display");case 7:case"end":return t.stop()}}),t)})))()}}},l=c,f=n("2877"),m=n("6544"),y=n.n(m),g=n("8336"),h=n("b0af"),I=n("99d9"),b=n("ac7c"),v=n("a523"),N=n("8fea"),w=n("2fa4"),D=n("71d9"),E=n("2a7f"),x=Object(f["a"])(l,a,r,!1,null,null,null);t["default"]=x.exports;y()(x,{VBtn:g["a"],VCard:h["a"],VCardText:I["c"],VCheckbox:b["a"],VContainer:v["a"],VDataTable:N["a"],VSpacer:w["a"],VToolbar:D["a"],VToolbarTitle:E["b"]})}}]);
//# sourceMappingURL=chunk-14b44e78.a13ce5e3.js.map