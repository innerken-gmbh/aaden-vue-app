(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-53d4d255"],{"3bbb":function(t,e,n){"use strict";n("b0c0"),n("ac1f"),n("1276");var a=n("5530"),r=(n("96cf"),n("1da1")),i=n("5089"),s=n("c0d6"),o=n("f4d6"),u=n("9d8f"),c=n.n(u),d={id:{type:o["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},form:!1},photo:{displayName:"image",type:o["IKDataEntity"].Types.Image,formConfig:{type:{root:function(){return s["a"].getters.rootUrl+i["b"].servantRoot}},requiredEdit:!1,requiredNew:!1,md:12},header:!1},name:{displayName:"servantName"},password:{},permission:{type:o["IKDataEntity"].Types.Boolean},isPartTime:{type:o["IKDataEntity"].Types.Boolean}},l={add:function(t){return c.a.postWithUploadFile("Servant.php?op=add",t,{showLoading:!0})},edit:function(t){return t.file&&(t.imageExt=t.file.name.split(".").lastItem),c.a.postWithUploadFile("Servant.php?op=update",t,{showLoading:!0})},remove:function(t){return c.a.post("Servant.php?op=delete",{id:t})},load:function(){var t=Object(r["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("Servant.php",Object(a["a"])({lang:i["b"].getLang()},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=o["IKDataEntity"].ModelFactory(d,l)},"5a0c":function(t,e,n){!function(e,n){t.exports=n()}(0,(function(){"use strict";var t=1e3,e=6e4,n=36e5,a="millisecond",r="second",i="minute",s="hour",o="day",u="week",c="month",d="quarter",l="year",f="date",h="Invalid Date",p=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,y={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},g=function(t,e,n){var a=String(t);return!a||a.length>=e?t:""+Array(e+1-a.length).join(n)+t},v={s:g,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),a=Math.floor(n/60),r=n%60;return(e<=0?"+":"-")+g(a,2,"0")+":"+g(r,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var a=12*(n.year()-e.year())+(n.month()-e.month()),r=e.clone().add(a,c),i=n-r<0,s=e.clone().add(a+(i?-1:1),c);return+(-(a+(n-r)/(i?r-s:s-r))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:l,w:u,d:o,D:f,h:s,m:i,s:r,ms:a,Q:d}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},$="en",b={};b[$]=y;var D=function(t){return t instanceof M},k=function(t,e,n){var a;if(!t)return $;if("string"==typeof t)b[t]&&(a=t),e&&(b[t]=e,a=t);else{var r=t.name;b[r]=t,a=r}return!n&&a&&($=a),a||!n&&$},C=function(t,e){if(D(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new M(n)},w=v;w.l=k,w.i=D,w.w=function(t,e){return C(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var M=function(){function y(t){this.$L=k(t.locale,null,!0),this.parse(t)}var g=y.prototype;return g.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(w.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var a=e.match(p);if(a){var r=a[2]-1||0,i=(a[7]||"0").substring(0,3);return n?new Date(Date.UTC(a[1],r,a[3]||1,a[4]||0,a[5]||0,a[6]||0,i)):new Date(a[1],r,a[3]||1,a[4]||0,a[5]||0,a[6]||0,i)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},g.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},g.$utils=function(){return w},g.isValid=function(){return!(this.$d.toString()===h)},g.isSame=function(t,e){var n=C(t);return this.startOf(e)<=n&&n<=this.endOf(e)},g.isAfter=function(t,e){return C(t)<this.startOf(e)},g.isBefore=function(t,e){return this.endOf(e)<C(t)},g.$g=function(t,e,n){return w.u(t)?this[e]:this.set(n,t)},g.unix=function(){return Math.floor(this.valueOf()/1e3)},g.valueOf=function(){return this.$d.getTime()},g.startOf=function(t,e){var n=this,a=!!w.u(e)||e,d=w.p(t),h=function(t,e){var r=w.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return a?r:r.endOf(o)},p=function(t,e){return w.w(n.toDate()[t].apply(n.toDate("s"),(a?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},m=this.$W,y=this.$M,g=this.$D,v="set"+(this.$u?"UTC":"");switch(d){case l:return a?h(1,0):h(31,11);case c:return a?h(1,y):h(0,y+1);case u:var $=this.$locale().weekStart||0,b=(m<$?m+7:m)-$;return h(a?g-b:g+(6-b),y);case o:case f:return p(v+"Hours",0);case s:return p(v+"Minutes",1);case i:return p(v+"Seconds",2);case r:return p(v+"Milliseconds",3);default:return this.clone()}},g.endOf=function(t){return this.startOf(t,!1)},g.$set=function(t,e){var n,u=w.p(t),d="set"+(this.$u?"UTC":""),h=(n={},n[o]=d+"Date",n[f]=d+"Date",n[c]=d+"Month",n[l]=d+"FullYear",n[s]=d+"Hours",n[i]=d+"Minutes",n[r]=d+"Seconds",n[a]=d+"Milliseconds",n)[u],p=u===o?this.$D+(e-this.$W):e;if(u===c||u===l){var m=this.clone().set(f,1);m.$d[h](p),m.init(),this.$d=m.set(f,Math.min(this.$D,m.daysInMonth())).$d}else h&&this.$d[h](p);return this.init(),this},g.set=function(t,e){return this.clone().$set(t,e)},g.get=function(t){return this[w.p(t)]()},g.add=function(a,d){var f,h=this;a=Number(a);var p=w.p(d),m=function(t){var e=C(h);return w.w(e.date(e.date()+Math.round(t*a)),h)};if(p===c)return this.set(c,this.$M+a);if(p===l)return this.set(l,this.$y+a);if(p===o)return m(1);if(p===u)return m(7);var y=(f={},f[i]=e,f[s]=n,f[r]=t,f)[p]||1,g=this.$d.getTime()+a*y;return w.w(g,this)},g.subtract=function(t,e){return this.add(-1*t,e)},g.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||h;var a=t||"YYYY-MM-DDTHH:mm:ssZ",r=w.z(this),i=this.$H,s=this.$m,o=this.$M,u=n.weekdays,c=n.months,d=function(t,n,r,i){return t&&(t[n]||t(e,a))||r[n].substr(0,i)},l=function(t){return w.s(i%12||12,t,"0")},f=n.meridiem||function(t,e,n){var a=t<12?"AM":"PM";return n?a.toLowerCase():a},p={YY:String(this.$y).slice(-2),YYYY:this.$y,M:o+1,MM:w.s(o+1,2,"0"),MMM:d(n.monthsShort,o,c,3),MMMM:d(c,o),D:this.$D,DD:w.s(this.$D,2,"0"),d:String(this.$W),dd:d(n.weekdaysMin,this.$W,u,2),ddd:d(n.weekdaysShort,this.$W,u,3),dddd:u[this.$W],H:String(i),HH:w.s(i,2,"0"),h:l(1),hh:l(2),a:f(i,s,!0),A:f(i,s,!1),m:String(s),mm:w.s(s,2,"0"),s:String(this.$s),ss:w.s(this.$s,2,"0"),SSS:w.s(this.$ms,3,"0"),Z:r};return a.replace(m,(function(t,e){return e||p[t]||r.replace(":","")}))},g.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},g.diff=function(a,f,h){var p,m=w.p(f),y=C(a),g=(y.utcOffset()-this.utcOffset())*e,v=this-y,$=w.m(this,y);return $=(p={},p[l]=$/12,p[c]=$,p[d]=$/3,p[u]=(v-g)/6048e5,p[o]=(v-g)/864e5,p[s]=v/n,p[i]=v/e,p[r]=v/t,p)[m]||v,h?$:w.a($)},g.daysInMonth=function(){return this.endOf(c).$D},g.$locale=function(){return b[this.$L]},g.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),a=k(t,e,!0);return a&&(n.$L=a),n},g.clone=function(){return w.w(this.$d,this)},g.toDate=function(){return new Date(this.valueOf())},g.toJSON=function(){return this.isValid()?this.toISOString():null},g.toISOString=function(){return this.$d.toISOString()},g.toString=function(){return this.$d.toUTCString()},y}(),O=M.prototype;return C.prototype=O,[["$ms",a],["$s",r],["$m",i],["$H",s],["$W",o],["$M",c],["$y",l],["$D",f]].forEach((function(t){O[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),C.extend=function(t,e){return t.$i||(t(e,M,C),t.$i=!0),C},C.locale=k,C.isDayjs=D,C.unix=function(t){return C(1e3*t)},C.en=b[$],C.Ls=b,C.p={},C}))},"651c":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-container",{staticClass:"fill-height align-start",attrs:{id:"data-tables",fluid:"",tag:"section"}},[n("v-container",{attrs:{fluid:""}},[n("ik-data-table",{attrs:{model:t.model,"entity-name":t.$t("我的记账本"),icon:"mdi-devices",filter:t.filter,"use-select":!1,"use-edit-action":!1},scopedSlots:t._u([{key:"filterLeft",fn:function(){return[n("v-menu",{ref:"menu",attrs:{"close-on-content-click":!1,"return-value":t.dates,"offset-y":""},on:{"update:returnValue":function(e){t.dates=e},"update:return-value":function(e){t.dates=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[n("v-text-field",t._g({staticClass:"ml-auto",staticStyle:{"max-width":"250px"},attrs:{"hide-details":"",label:t.$t("日期筛选"),"prepend-icon":"mdi-calendar",readonly:"","single-line":"","append-icon":"mdi-close"},on:{"click:append":t.clear},model:{value:t.dates,callback:function(e){t.dates=e},expression:"dates"}},a))]}}]),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[n("v-date-picker",{attrs:{"no-title":"",range:"",scrollable:"",locale:"de"},model:{value:t.dates,callback:function(e){t.dates=e},expression:"dates"}},[n("v-spacer"),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.menu=!1}}},[t._v(" "+t._s(t.$t("Cancel"))+" ")]),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menu.save(t.dates)}}},[t._v(" "+t._s(t.$t("OK"))+" ")])],1)],1)]},proxy:!0},{key:"filterRight",fn:function(e){var a=e.tableItems;return[n("v-btn",{staticClass:"ml-4",attrs:{color:"green"}},[t._v(" "+t._s(t.$t("incomeAmount"))+"：€"+t._s(t.calculateIncomePrice(a).toFixed(2))+" ")]),n("v-btn",{staticClass:"ml-4",attrs:{color:"error"}},[t._v(" "+t._s(t.$t("outcomeAmount"))+"：€"+t._s(t.calculateOutcomePrice(a).toFixed(2))+" ")]),n("v-btn",{staticClass:"ml-4",attrs:{color:"#367aeb"}},[t._v(" "+t._s(t.$t("totalAmount"))+"：€"+t._s(t.calculateTotalPrice(a).toFixed(2))+" ")])]}}])})],1),n("v-container",[n("ik-data-table",{attrs:{model:t.modelCashBook,"entity-name":t.$t("现金帐"),icon:"mdi-devices",filter:t.filterCashBook,"use-select":!1,"use-edit-action":!1},scopedSlots:t._u([{key:"filterLeft",fn:function(){return[n("v-menu",{ref:"menuCashBook",attrs:{"close-on-content-click":!1,"return-value":t.datesCashBook,"offset-y":""},on:{"update:returnValue":function(e){t.datesCashBook=e},"update:return-value":function(e){t.datesCashBook=e}},scopedSlots:t._u([{key:"activator",fn:function(e){var a=e.on;return[n("v-text-field",t._g({staticClass:"ml-auto",staticStyle:{"max-width":"250px"},attrs:{"hide-details":"",label:t.$t("日期筛选"),"prepend-icon":"mdi-calendar",readonly:"","single-line":"","append-icon":"mdi-close"},on:{"click:append":t.clear},model:{value:t.datesCashBook,callback:function(e){t.datesCashBook=e},expression:"datesCashBook"}},a))]}}]),model:{value:t.menuCashBook,callback:function(e){t.menuCashBook=e},expression:"menuCashBook"}},[n("v-date-picker",{attrs:{"no-title":"",range:"",scrollable:"",locale:"de"},model:{value:t.datesCashBook,callback:function(e){t.datesCashBook=e},expression:"datesCashBook"}},[n("v-spacer"),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){t.menuCashBook=!1}}},[t._v(" "+t._s(t.$t("Cancel"))+" ")]),n("v-btn",{attrs:{text:"",color:"primary"},on:{click:function(e){return t.$refs.menuCashBook.save(t.datesCashBook)}}},[t._v(" "+t._s(t.$t("OK"))+" ")])],1)],1)]},proxy:!0}])})],1)],1)},r=[],i=(n("13d5"),n("96cf"),n("1da1")),s=n("f4d6"),o=(n("99af"),n("d81d"),n("2909")),u=n("9d8f"),c=n.n(u),d=n("3bbb"),l=n("8976"),f=n("9225"),h={list:[{id:1,name:f["a"].t("收入")},{id:2,name:f["a"].t("支出")}],getList:function(){return this.list}},p=n("ff51"),m={id:{displayName:"id",tableConfig:{align:"start"},formConfig:{requiredEdit:!1,requiredNew:!1},header:!1},type:{type:s["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:h.list,itemText:"name"}}},amount:{},payMethodId:{type:s["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList,itemText:"_langsname"}},displayName:"payMethod"},servantId:{displayName:"servantName",type:s["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:d["a"].getList}}},createdAt:{formConfig:{default:Object(p["b"])(0),disableNew:!0,disableEdit:!0,requiredEdit:!1,requiredNew:!1}},remark:{formConfig:{requiredEdit:!1,requiredNew:!1}}},y={add:function(t){return c.a.post("BackendData.php?op=addAccountingLine",t,{showLoading:!0})},remove:function(t){return c.a.post("BackendData.php?op=deleteAccountingLine",{id:t})},load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,c.a.get("BackendData.php",Object.assign.apply(Object,[{op:"getAccountingTable"}].concat(Object(o["a"])(e))));case 2:return n=t.sent.content.map((function(t,e){return""===t.id&&(t.id="idx"+e),t})),console.log("filter Data",n),t.abrupt("return",n);case 5:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},g=s["IKDataEntity"].ModelFactory(m,y),v={orderId:{tableConfig:{align:"start"},formConfig:{requiredEdit:!1,requiredNew:!1},header:!1},payLogId:{type:s["IKDataEntity"].Types.Integer,displayName:"ID",formConfig:{}},payLogAmount:{type:s["IKDataEntity"].Types.Float,displayName:"Amount",formConfig:{type:{}}},consumeTypeId:{type:s["IKDataEntity"].Types.Option,formConfig:{type:{selectItems:l["a"].getList,itemText:"_langsname"}},displayName:"payMethod"},cashAccountNote:{displayName:"Note"}},$={load:function(){var t=Object(i["a"])(regeneratorRuntime.mark((function t(e){var n,a;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return console.log(e,"i am loaded"),n=e[0],console.log(n,"Data"),t.next=5,c.a.get("Complex.php?op=getCashInOutDetail",n);case 5:return a=t.sent.content,console.log("dateCashBook",a),t.abrupt("return",a);case 8:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()},b=s["IKDataEntity"].ModelFactory(v,$),D=n("0a61"),k=n("5a0c"),C=n.n(k),w={components:{IkDataTable:s["IkDataTable"]},data:function(){return{model:g,modelCashBook:b,dates:[],datesCashBook:[],menu:!1,menuCashBook:!1,currentAmount:-1}},computed:{filter:function(){if(Date.parse(this.dates[0])>Date.parse(this.dates[1])){var t=[this.dates[1],this.dates[0]];this.dates[0]=t[0],this.dates[1]=t[1]}return{start:this.dates[0],end:this.dates[1]}},filterCashBook:function(){if(Date.parse(this.datesCashBook[0])>Date.parse(this.datesCashBook[1])){var t=[this.datesCashBook[1],this.datesCashBook[0]];this.datesCashBook[0]=t[0],this.datesCashBook[1]=t[1]}return{fromDate:this.datesCashBook[0],toDate:this.datesCashBook[1]}}},watch:{},mounted:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return t.datesCashBook=[C()().format("YYYY-MM-DD"),Object(p["a"])(0)],e.next=3,Object(D["q"])();case 3:t.currentAmount=e.sent;case 4:case"end":return e.stop()}}),e)})))()},methods:{saveDatum:function(){if(Date.parse(this.datesCashBook[0])>Date.parse(this.datesCashBook[1])){var t=[this.datesCashBook[1],this.datesCashBook[0]];this.datesCashBook[0]=t[0],this.datesCashBook[1]=t[1]}this.filterCashBook={fromDate:this.datesCashBook[0],toDate:this.datesCashBook[1]}},clear:function(){this.dates=[Object(p["a"])(0),Object(p["a"])(0)],this.datesCashBook=[Object(p["a"])(0),Object(p["a"])(0)]},calculateTotalPrice:function(t){return parseFloat(this.calculateIncomePrice(t))-parseFloat(this.calculateOutcomePrice(t))},calculateIncomePrice:function(t){return t?t.reduce((function(t,e){return 2!==e.type?t+parseFloat(e.amount):t}),0):0},calculateOutcomePrice:function(t){return t?t.reduce((function(t,e){return 1!==e.type?t+parseFloat(e.amount):t}),0):0}}},M=w,O=n("2877"),B=n("6544"),I=n.n(B),S=n("8336"),x=n("a523"),_=n("2e4b"),T=n("e449"),N=n("2fa4"),E=n("8654"),L=Object(O["a"])(M,a,r,!1,null,null,null);e["default"]=L.exports;I()(L,{VBtn:S["a"],VContainer:x["a"],VDatePicker:_["a"],VMenu:T["a"],VSpacer:N["a"],VTextField:E["a"]})},8976:function(t,e,n){"use strict";n("96cf");var a=n("1da1"),r=n("5530"),i=n("f4d6"),s=n("9d8f"),o=n.n(s),u=n("a86d"),c=n("5089"),d={id:{type:i["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},langs:{displayName:"paymentname",type:i["IKDataEntity"].Types.Group,formConfig:{groupName:"paymentname",default:c["b"].supportLang,childLabelKey:"lang",type:{}},tableConfig:{displayCondition:function(t){return t.lang.toUpperCase()===c["b"].getLang().toUpperCase()}},childKey:"name",children:[u["a"],u["a"],u["a"]]},fixedDisplay:{type:i["IKDataEntity"].Types.Boolean},isOnline:{displayName:"isOnline",type:i["IKDataEntity"].Types.Boolean},apiKey:{required:!1,formConfig:{requiredNew:!1,requiredEdit:!1}}},l={add:function(t){return o.a.post("PayMethod.php?op=add",Object(r["a"])(Object(r["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},edit:function(t){return o.a.postWithUploadFile("PayMethod.php?op=update",Object(r["a"])(Object(r["a"])({},t),{},{langs:JSON.stringify(t.langs)}),{showLoading:!0})},remove:function(t){return o.a.post("PayMethod.php?op=delete",{id:t})},load:function(){var t=Object(a["a"])(regeneratorRuntime.mark((function t(e){return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,o.a.get("PayMethod.php",Object(r["a"])({},e));case 2:return t.abrupt("return",t.sent.content);case 3:case"end":return t.stop()}}),t)})));function e(e){return t.apply(this,arguments)}return e}()};e["a"]=i["IKDataEntity"].ModelFactory(d,l)},a86d:function(t,e,n){"use strict";var a=n("f4d6"),r={id:{type:a["IKDataEntity"].Types.Integer,displayName:"id",tableConfig:{align:"start"},formConfig:{requiredNew:!1}},name:{displayName:"Name"},lang:{},desc:{displayName:"Beschreibung",formConfig:{required:!1}}};e["a"]=a["IKDataEntity"].ModelFactory(r,{})},ff51:function(t,e,n){"use strict";n.d(e,"a",(function(){return a})),n.d(e,"b",(function(){return r}));n("a15b");function a(t){var e=new Date,n=e.getTime(),a=864e5,r=n+t*a,i=new Date(r),s=i.getFullYear(),o=i.getMonth()+1,u=i.getDate();return[s,o,u].join("-")}function r(t){var e=new Date,n=e.getTime(),a=864e5,r=n+t*a,i=new Date(r),s=i.getFullYear()+"-",o=i.getMonth()+1,u=i.getDate(),c=i.getHours()<10?"0"+i.getHours():i.getHours(),d=i.getMinutes()<10?"0"+i.getMinutes():i.getMinutes(),l=i.getSeconds()<10?"0"+i.getSeconds():i.getSeconds();return s+o+"-"+u+" "+c+":"+d+":"+l}}}]);
//# sourceMappingURL=chunk-53d4d255.7fcc1231.js.map