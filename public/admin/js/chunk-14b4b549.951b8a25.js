(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-14b4b549"],{"3bbb":function(t,e,n){"use strict";n("b0c0"),n("ac1f"),n("1276");var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("5089"),o=n("c0d6"),p=n("f4d6"),s=n("9d8f"),d=n.n(s),u={id:{type:p["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},photo:{displayName:"image",type:p["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return o["a"].getters.rootUrl+i["b"].servantRoot}},requiredEdit:!1,requiredNew:!1,md:12},header:!1},name:{displayName:"servantName"},password:{},permission:{type:p["IKDataEntity"].Types.Boolean},isPartTime:{type:p["IKDataEntity"].Types.Boolean}},c={add:function(t){return d.a.postWithUploadFile("Servant.php?op=add",t,{showLoading:!0})},edit:function(t){return t.file&&(t.imageExt=t.file.name.split(".").lastItem),d.a.postWithUploadFile("Servant.php?op=update",t,{showLoading:!0})},remove:function(t){return d.a.post("Servant.php?op=delete",{id:t})},load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("Servant.php",Object(a["a"])({lang:i["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=p["IKDataEntity"].ModelFactory(u,c)},6306:function(t,e,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("f4d6"),o=n("9d8f"),p=n.n(o),s={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"sectionName"},isSingleLinePrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleLinePrint"},isSingleOrderPrint:{type:i["IKDataEntity"].Types.Boolean,displayName:"isSingleOrderPrint"},upsideDown:{type:i["IKDataEntity"].Types.Boolean},printerCount:{displayName:"printerCount",formConfig:{inEdit:!1,inNew:!1}},defaultRetryCount:{formConfig:{default:"0"}},totalDishesCount:{formConfig:{inEdit:!1,inNew:!1}}},d={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p.a.get("Printer.php",Object(a["a"])({op:"showPrinterGroups"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return p.a.postWithUploadFile("Printer.php?op=addPrinterGroups",t,{showLoading:!0})},edit:function(t){return p.a.postWithUploadFile("Printer.php?op=updatePrinterGroups",t,{showLoading:!0})},remove:function(t){return p.a.post("Printer.php?op=deletePrinterGroup",{id:t})}};e["a"]=i["IKDataEntity"].ModelFactory(s,d)},"8a91":function(t,e,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("5089"),o=n("f4d6"),p=n("9d8f"),s=n.n(p),d=n("3bbb"),u=n("c0d6"),c={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},name:{displayName:"sectionName"},image:{type:o["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return u["a"].getters.rootUrl}},required:!1},displayName:"sectionImg"},servantIds:{displayName:"servantName",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList,multiple:!0}}},tableCount:{form:!1}},l={add:function(t){return t.servantIds=JSON.stringify(t.servantIds),s.a.postWithUploadFile("Section.php?op=add",t,{showLoading:!0})},edit:function(t){return t.servantIds=JSON.stringify(t.servantIds),s.a.postWithUploadFile("Section.php?op=update",t,{showLoading:!0})},remove:function(t){return s.a.post("Section.php?op=delete",{id:t})},load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,s.a.get("Section.php",Object(a["a"])({op:"view",lang:i["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=o["IKDataEntity"].ModelFactory(c,l)},cb25:function(t,e,n){"use strict";n("b0c0");var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("f4d6"),o=n("9d8f"),p=n.n(o),s=n("6306"),d={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},isSticker:{displayName:"isSticker"},lineLength:{displayName:"lineLength"},typeDesc:{displayName:"typeDesc"},typeName:{displayName:"typeName"}},u={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,p.a.get("Printer.php",Object(a["a"])({op:"showPrinterType"},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},c=i["IKDataEntity"].ModelFactory(d,u),l=n("8a91"),y={id:{type:i["IKDataEntity"].Types.Integer,displayName:"deviceId",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},printerName:{displayName:"printerName"},printerTypeId:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c.getList,itemText:"typeName"},requiredEdit:!1},displayName:"printerTypeName"},identity:{displayName:"identity",header:!1,formConfig:{inEdit:!1}},sn:{displayName:"sn"},key:{displayName:"Key",formConfig:{inEdit:!1}},groupId:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:s["a"].getList,itemText:"name",multiple:!0},requiredEdit:!1},displayName:"groupSecName"},sectionIds:{type:i["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList,itemText:"name",multiple:!0},requiredEdit:!0},displayName:"sectionName"}},m={load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,i["IKDataEntity"].generalLoad("Printer.php",Object(a["a"])({op:"showAllPrinterStatus"},e));case 2:return n=t.sent,t.abrupt("return",n.content);case 4:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}(),add:function(t){return t.groupIds=JSON.stringify(t.groupId),t.name=t.printerName,t.printerSectionID=JSON.stringify(t.sectionIds),p.a.postWithUploadFile("Printer.php?op=add",t,{showLoading:!0})},edit:function(t){return t.groupIds=JSON.stringify(t.groupId),t.name=t.printerName,t.printerSectionID=JSON.stringify(t.sectionIds),p.a.postWithUploadFile("Printer.php?op=edit",t,{showLoading:!0})},remove:function(t){return p.a.post("Printer.php?op=remove",{id:t})}};e["a"]=i["IKDataEntity"].ModelFactory(y,m)},e2d9:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("ik-data-table",{attrs:{model:t.model,"entity-name":t.$t("设备列表"),icon:"mdi-devices"}})],1)},r=[],i=n("cb25"),o=n("f4d6"),p={components:{IkDataTable:o["IkDataTable"]},data:function(){return{model:i["a"]}}},s=p,d=n("2877"),u=n("6544"),c=n.n(u),l=n("a523"),y=Object(d["a"])(s,a,r,!1,null,null,null);e["default"]=y.exports;c()(y,{VContainer:l["a"]})}}]);
//# sourceMappingURL=chunk-14b4b549.951b8a25.js.map