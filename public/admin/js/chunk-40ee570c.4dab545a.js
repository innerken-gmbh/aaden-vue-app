(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-40ee570c"],{"3bbb":function(t,e,a){"use strict";a("b0c0"),a("ac1f"),a("1276");var n=a("5530"),i=(a("96cf"),a("1da1")),o=a("5089"),r=a("c0d6"),s=a("f4d6"),d=a("9d8f"),c=a.n(d),l={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},photo:{displayName:"image",type:s["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return r["a"].getters.rootUrl+o["b"].servantRoot}},requiredEdit:!1,requiredNew:!1,md:12},header:!1},name:{displayName:"servantName"},password:{},permission:{type:s["IKDataEntity"].Types.Boolean},isPartTime:{type:s["IKDataEntity"].Types.Boolean}},u={add:function(t){return c.a.postWithUploadFile("Servant.php?op=add",t,{showLoading:!0})},edit:function(t){return t.file&&(t.imageExt=t.file.name.split(".").lastItem),c.a.postWithUploadFile("Servant.php?op=update",t,{showLoading:!0})},remove:function(t){return c.a.post("Servant.php?op=delete",{id:t})},load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("Servant.php",Object(n["a"])({lang:o["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=s["IKDataEntity"].ModelFactory(l,u)},"8a91":function(t,e,a){"use strict";var n=a("5530"),i=(a("96cf"),a("1da1")),o=a("5089"),r=a("f4d6"),s=a("9d8f"),d=a.n(s),c=a("3bbb"),l=a("c0d6"),u={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},name:{displayName:"sectionName"},image:{type:r["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return l["a"].getters.rootUrl}},required:!1},displayName:"sectionImg"},servantIds:{displayName:"servantName",type:r["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:c["a"].getList,multiple:!0}}},tableCount:{form:!1}},p={add:function(t){return t.servantIds=JSON.stringify(t.servantIds),d.a.postWithUploadFile("Section.php?op=add",t,{showLoading:!0})},edit:function(t){return t.servantIds=JSON.stringify(t.servantIds),d.a.postWithUploadFile("Section.php?op=update",t,{showLoading:!0})},remove:function(t){return d.a.post("Section.php?op=delete",{id:t})},load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,d.a.get("Section.php",Object(n["a"])({op:"view",lang:o["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=r["IKDataEntity"].ModelFactory(u,p)},cbe7:function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ik-data-table",{attrs:{model:t.model,icon:"mdi-table-chair","entity-name":t.$t("桌子")},scopedSlots:t._u([{key:"filterRight",fn:function(){return[a("v-btn",{attrs:{small:"",color:"green darken-2",dark:""},on:{click:t.printQR}},[t._v(" "+t._s(t.$t("打印二维码"))+" "),a("v-icon",{attrs:{dark:"",right:""}},[t._v(" mdi-plus ")])],1),a("v-btn",{staticClass:"ml-2 mr-2",attrs:{small:"",color:"blue darken-2",dark:""},on:{click:t.addAdvancedMultipleTable}},[t._v(" "+t._s(t.$t("批量添加桌子"))+" "),a("v-icon",{attrs:{dark:"",right:""}},[t._v(" mdi-plus ")])],1),a("v-dialog",{attrs:{"max-width":"500px"},model:{value:t.dialogAdvanced,callback:function(e){t.dialogAdvanced=e},expression:"dialogAdvanced"}},[a("v-card",[a("v-card-title",[a("span",{staticClass:"headline"},[t._v(t._s(t.$t("批量添加桌子")))])]),a("v-card-text",[a("v-container",[a("v-row",[a("v-col",{attrs:{cols:"12",md:"6",sm:"6"}},[a("v-select",{attrs:{items:t.sectionList,"item-text":"name","item-value":"id",label:t.$t("sectionName"),required:""},model:{value:t.advancedItem.sectionId,callback:function(e){t.$set(t.advancedItem,"sectionId",e)},expression:"advancedItem.sectionId"}})],1),a("v-col",{attrs:{cols:"12",md:"6",sm:"12"}},[a("v-text-field",{attrs:{label:t.$t("start"),required:""},model:{value:t.advancedItem.start,callback:function(e){t.$set(t.advancedItem,"start",e)},expression:"advancedItem.start"}})],1),a("v-col",{attrs:{cols:"12",md:"6",sm:"12"}},[a("v-text-field",{attrs:{label:t.$t("end"),required:""},model:{value:t.advancedItem.end,callback:function(e){t.$set(t.advancedItem,"end",e)},expression:"advancedItem.end"}})],1),a("v-col",{attrs:{cols:"12",md:"6",sm:"12"}},[a("v-switch",{attrs:{label:t.$t("digit")},model:{value:t.advancedItem.digit,callback:function(e){t.$set(t.advancedItem,"digit",e)},expression:"advancedItem.digit"}})],1),a("v-col",{attrs:{cols:"12",md:"6",sm:"12"}},[a("v-text-field",{attrs:{label:t.$t("seatCount")},model:{value:t.advancedItem.seatCount,callback:function(e){t.$set(t.advancedItem,"seatCount",e)},expression:"advancedItem.seatCount"}})],1)],1)],1)],1),a("v-card-actions",[a("v-spacer"),a("v-btn",{attrs:{color:"blue darken-1",text:""},on:{click:t.closeAdvancedDialog}},[t._v(" "+t._s(t.$t("Cancel"))+" ")]),a("v-btn",{attrs:{color:"blue darken-1"},on:{click:t.saveAdvancedDialog}},[t._v(" "+t._s(t.$t("Save"))+" ")])],1)],1)],1)]},proxy:!0}])})},i=[],o=(a("96cf"),a("1da1")),r=a("f4d6"),s=(a("d81d"),a("b0c0"),a("5530")),d=a("5089"),c=a("9d8f"),l=a.n(c),u=a("8a91"),p={id:{type:r["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},name:{displayName:"tableName"},sectionId:{displayName:"sectionName",type:r["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:u["a"].getList,itemText:"name"}}},seatCount:{formConfig:{default:4}},usageStatus:{type:r["IKDataEntity"].Types.Boolean,form:!1},usageCount:{form:!1}},m={add:function(t){return l.a.postWithUploadFile("Tables.php?op=add",t,{showLoading:!0})},edit:function(t){return l.a.postWithUploadFile("Tables.php?op=update",t,{showLoading:!0})},remove:function(t){return l.a.post("Tables.php?op=delete",{id:t})},load:function(){var t=Object(o["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,l.a.get("Tables.php",Object(s["a"])({op:"currentInfos",lang:d["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content.map((function(t){return t.sqCode=t.name,t})));case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},v=r["IKDataEntity"].ModelFactory(p,m),f=a("0a61"),g=a("ccdd"),b={components:{IkDataTable:r["IkDataTable"]},data:function(){return{model:v,sectionModel:u["a"],sectionList:[],dialog:!1,dialogAdvanced:!1,editedItem:{sectionId:"",tableAmount:"",seatCount:"4"},advancedItem:{sectionId:"",start:"",end:"",digit:0,seatCount:"4"}}},created:function(){this.getSectionList()},methods:{addMultipleTable:function(){this.dialog=!0},addAdvancedMultipleTable:function(){this.dialogAdvanced=!0},printQR:function(){Object(f["F"])().then((function(){g["a"].toast("Successful!")}))},saveAdvancedDialog:function(){var t=this;Object(f["g"])(this.advancedItem.sectionId,this.advancedItem.start,this.advancedItem.end,this.advancedItem.digit,this.advancedItem.seatCount).then((function(e){g["a"].toast("Successful!"),t.closeAdvancedDialog()}))},closeAdvancedDialog:function(){this.dialogAdvanced=!1},save:function(){var t=this;Object(f["h"])(this.editedItem.sectionId,this.editedItem.tableAmount,this.editedItem.seatCount).then((function(e){g["a"].toast("Successful!"),t.close()}))},close:function(){this.dialog=!1},getSectionList:function(){var t=this;return Object(o["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,u["a"].getList();case 2:t.sectionList=e.sent;case 3:case"end":return e.stop()}}),e)})))()},goNext:function(t){this.$router.push({name:"Tabellendetailseite",params:{id:t.id}})}}},h=b,I=a("2877"),y=a("6544"),w=a.n(y),k=a("8336"),x=a("b0af"),C=a("99d9"),T=a("62ad"),D=a("a523"),S=a("169a"),N=a("132d"),$=a("0fd9"),L=a("b974"),A=a("2fa4"),E=a("b73d"),O=a("8654"),_=Object(I["a"])(h,n,i,!1,null,null,null);e["default"]=_.exports;w()(_,{VBtn:k["a"],VCard:x["a"],VCardActions:C["a"],VCardText:C["b"],VCardTitle:C["c"],VCol:T["a"],VContainer:D["a"],VDialog:S["a"],VIcon:N["a"],VRow:$["a"],VSelect:L["a"],VSpacer:A["a"],VSwitch:E["a"],VTextField:O["a"]})},ccdd:function(t,e,a){"use strict";var n=a("5530"),i=a("641f"),o=a.n(i);e["a"]=Object(n["a"])({},o.a)}}]);
//# sourceMappingURL=chunk-40ee570c.4dab545a.js.map