(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-85eb6d4c"],{"3bbb":function(e,t,n){"use strict";n("b0c0"),n("ac1f"),n("1276");var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("5089"),o=n("c0d6"),s=n("f4d6"),d=n("9d8f"),p=n.n(d),c={id:{type:s["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},photo:{displayName:"image",type:s["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return o["a"].getters.rootUrl+i["b"].servantRoot}},requiredEdit:!1,requiredNew:!1,md:12},header:!1},name:{displayName:"servantName"},password:{},permission:{type:s["IKDataEntity"].Types.Boolean},isPartTime:{type:s["IKDataEntity"].Types.Boolean}},u={add:function(e){return p.a.postWithUploadFile("Servant.php?op=add",e,{showLoading:!0})},edit:function(e){return e.file&&(e.imageExt=e.file.name.split(".").lastItem),p.a.postWithUploadFile("Servant.php?op=update",e,{showLoading:!0})},remove:function(e){return p.a.post("Servant.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,p.a.get("Servant.php",Object(a["a"])({lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=s["IKDataEntity"].ModelFactory(c,u)},"8a91":function(e,t,n){"use strict";var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("5089"),o=n("f4d6"),s=n("9d8f"),d=n.n(s),p=n("3bbb"),c=n("c0d6"),u={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"}},name:{displayName:"sectionName"},image:{type:o["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return c["a"].getters.rootUrl}},required:!1},displayName:"sectionImg"},servantIds:{displayName:"servantName",type:o["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:p["a"].getList,multiple:!0}}},tableCount:{form:!1}},l={add:function(e){return e.servantIds=JSON.stringify(e.servantIds),d.a.postWithUploadFile("Section.php?op=add",e,{showLoading:!0})},edit:function(e){return e.servantIds=JSON.stringify(e.servantIds),d.a.postWithUploadFile("Section.php?op=update",e,{showLoading:!0})},remove:function(e){return d.a.post("Section.php?op=delete",{id:e})},load:function(){var e=Object(r["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,d.a.get("Section.php",Object(a["a"])({op:"view",lang:i["b"].getLang()},t));case 2:return e.abrupt("return",e.sent.content);case 3:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}()};t["a"]=o["IKDataEntity"].ModelFactory(u,l)},e348:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("ik-data-table",{attrs:{model:e.model,icon:"mdi-desktop-tower-monitor","entity-name":e.$t("分区")}})},r=[],i=(n("99af"),n("4160"),n("c975"),n("d81d"),n("a434"),n("b0c0"),n("159b"),n("96cf"),n("1da1")),o=n("8a91"),s=n("3bbb"),d=n("641f"),p=n.n(d),c=n("f4d6"),u=n("9d8f"),l=n.n(u),f={components:{IkDataTable:c["IkDataTable"]},data:function(){return{model:o["a"],displayData:[],loading:!1,fixedHeader:[{text:"Name",value:"name"},{text:"Password",value:"password"}],sectionHeaders:[]}},computed:{headers:function(){return this.fixedHeader.concat(this.sectionHeaders)},tableData:function(){var e=this,t=[];return this.displayData.forEach((function(n){e.sectionHeaders.forEach((function(e){e.copyServantsIds=p.a.deepCopy(e.servantIds),n.id&&(null!==e.servantIds&&e.servantIds.length>0?n[e.name]=e.servantIds.indexOf(n.id)>-1:n[e.name]=!1)})),t.push(n)})),console.log(t,"item"),t}},mounted:function(){this.loadData()},methods:{updateSection:function(e,t){var n=this;return Object(i["a"])(regeneratorRuntime.mark((function a(){return regeneratorRuntime.wrap((function(a){while(1)switch(a.prev=a.next){case 0:return n.loading=!1,e[t.name]=!e[t.name],"string"===typeof t.copyServantsIds&&(t.copyServantsIds=JSON.parse(t.copyServantsIds)),e[t.name]?t.copyServantsIds.push(e.id):t.copyServantsIds.splice(t.copyServantsIds.indexOf(e.id),1),t.servantIds=JSON.stringify(t.copyServantsIds),a.next=7,l.a.post("Section.php?op=update",t);case 7:case"end":return a.stop()}}),a)})))()},loadData:function(){var e=this;return Object(i["a"])(regeneratorRuntime.mark((function t(){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o["a"].getList();case 2:return e.sectionHeaders=t.sent.map((function(e){return e.text=e.name,e.value=e.name,e})),t.next=5,s["a"].getList();case 5:e.displayData=t.sent;case 6:case"end":return t.stop()}}),t)})))()}}},m=f,y=n("2877"),g=Object(y["a"])(m,a,r,!1,null,null,null);t["default"]=g.exports}}]);
//# sourceMappingURL=chunk-85eb6d4c.fe9b0dc9.js.map