(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bb668236"],{"3bbb":function(t,e,n){"use strict";n("b0c0"),n("ac1f"),n("1276");var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("5089"),o=n("c0d6"),s=n("f4d6"),p=n("9d8f"),d=n.n(p),u={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},photo:{displayName:"image",type:s["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return o["a"].getters.rootUrl+i["b"].servantRoot}},requiredEdit:!1,requiredNew:!1,md:12},header:!1},name:{displayName:"servantName"},password:{},permission:{type:s["IKDataEntity"].Types.Boolean},isPartTime:{type:s["IKDataEntity"].Types.Boolean}},c={add:function(t){return d.a.postWithUploadFile("Servant.php?op=add",t,{showLoading:!0})},edit:function(t){return t.file&&(t.imageExt=t.file.name.split(".").lastItem),d.a.postWithUploadFile("Servant.php?op=update",t,{showLoading:!0})},remove:function(t){return d.a.post("Servant.php?op=delete",{id:t})},load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("Servant.php",Object(a["a"])({lang:i["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=s["IKDataEntity"].ModelFactory(u,c)},6306:function(t,e,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("f4d6"),o=n("9d8f"),s=n.n(o),p={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},upsideDown:{type:i["IKDataEntity"].Types.Boolean},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},d={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Printer.php",Object(a["a"])({op:"showPrinterGroups"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return s.a.postWithUploadFile("Printer.php?op=addPrinterGroups",t,{showLoading:!0})},edit:function(t){return s.a.postWithUploadFile("Printer.php?op=updatePrinterGroups",t,{showLoading:!0})},remove:function(t){return s.a.post("Printer.php?op=deletePrinterGroup",{id:t})}};e["a"]=i["IKDataEntity"].ModelFactory(p,d)},"8a91":function(t,e,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("5089"),o=n("f4d6"),s=n("9d8f"),p=n.n(s),d=n("3bbb"),u=n("c0d6"),c={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},name:{displayName:"sectionName"},image:{type:o["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return u["a"].getters.rootUrl}},required:!1},displayName:"sectionImg"},servantIds:{displayName:"servantName",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,multiple:!0}}},tableCount:{form:!1}},l={add:function(t){return t.servantIds=JSON.stringify(t.servantIds),p.a.postWithUploadFile("Section.php?op=add",t,{showLoading:!0})},edit:function(t){return t.servantIds=JSON.stringify(t.servantIds),p.a.postWithUploadFile("Section.php?op=update",t,{showLoading:!0})},remove:function(t){return p.a.post("Section.php?op=delete",{id:t})},load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p.a.get("Section.php",Object(a["a"])({op:"view",lang:i["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=o["IKDataEntity"].ModelFactory(c,l)},a523:function(t,e,n){"use strict";n("99af"),n("4de4"),n("b64b"),n("2ca0"),n("20f6"),n("4b85"),n("a15b"),n("498a");var a=n("2b0e");function r(t){return a["a"].extend({name:"v-".concat(t),functional:!0,props:{id:String,tag:{type:String,default:"div"}},render:function(e,n){var a=n.props,r=n.data,i=n.children;r.staticClass="".concat(t," ").concat(r.staticClass||"").trim();var o=r.attrs;if(o){r.attrs={};var s=Object.keys(o).filter((function(t){if("slot"===t)return!1;var e=o[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}));s.length&&(r.staticClass+=" ".concat(s.join(" ")))}return a.id&&(r.domProps=r.domProps||{},r.domProps.id=a.id),e(a.tag,r,i)}})}var i=n("d9f7");e["a"]=r("container").extend({name:"v-container",functional:!0,props:{id:String,tag:{type:String,default:"div"},fluid:{type:Boolean,default:!1}},render:function(t,e){var n,a=e.props,r=e.data,o=e.children,s=r.attrs;return s&&(r.attrs={},n=Object.keys(s).filter((function(t){if("slot"===t)return!1;var e=s[t];return t.startsWith("data-")?(r.attrs[t]=e,!1):e||"string"===typeof e}))),a.id&&(r.domProps=r.domProps||{},r.domProps.id=a.id),t(a.tag,Object(i["a"])(r,{staticClass:"container",class:Array({"container--fluid":a.fluid}).concat(n||[])}),o)}})},cb25:function(t,e,n){"use strict";n("b0c0");var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("f4d6"),o=n("9d8f"),s=n.n(o),p=n("6306"),d={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},isSticker:{displayName:"isSticker"},lineLength:{displayName:"lineLength"},typeDesc:{displayName:"typeDesc"},typeName:{displayName:"typeName"}},u={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Printer.php",Object(a["a"])({op:"showPrinterType"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},c=i["IKDataEntity"].ModelFactory(d,u),l=n("8a91"),f={id:{type:i["IKDataEntity"].Types.Integer,displayName:"deviceId",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},printerName:{displayName:"printerName"},printerTypeId:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c.getList,itemText:"typeName"},requiredEdit:!1},displayName:"printerTypeName"},identity:{displayName:"identity",header:!1,formConfig:{inEdit:!1}},sn:{displayName:"sn"},key:{displayName:"Key",formConfig:{inEdit:!1}},groupId:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList,itemText:"name",multiple:!0},requiredEdit:!1},displayName:"groupSecName"},sectionIds:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList,itemText:"name",multiple:!0},requiredEdit:!0},displayName:"sectionName"}},y={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i["IKDataEntity"].generalLoad("Printer.php",Object(a["a"])({op:"showAllPrinterStatus"},e));case 2:return n=t.sent,t.abrupt("return",n.content);case 4:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return t.groupIds=JSON.stringify(t.groupId),t.name=t.printerName,t.printerSectionID=JSON.stringify(t.sectionIds),s.a.postWithUploadFile("Printer.php?op=add",t,{showLoading:!0})},edit:function(t){return t.groupIds=JSON.stringify(t.groupId),t.name=t.printerName,t.printerSectionID=JSON.stringify(t.sectionIds),s.a.postWithUploadFile("Printer.php?op=edit",t,{showLoading:!0})},remove:function(t){return s.a.post("Printer.php?op=remove",{id:t})}};e["a"]=i["IKDataEntity"].ModelFactory(f,y)},e2d9:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("ik-data-table",{attrs:{model:t.model,"entity-name":t.$t("设备列表"),icon:"mdi-devices"}})],1)},r=[],i=n("cb25"),o=n("f4d6"),s={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:i["a"]}}},p=s,d=n("2877"),u=n("6544"),c=n.n(u),l=n("a523"),f=Object(d["a"])(p,a,r,!1,null,null,null);e["default"]=f.exports;c()(f,{VContainer:l["a"]})}}]);
//# sourceMappingURL=chunk-bb668236.4bb10e21.js.map