(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-32b571a3"],{"2a7f":function(e,t,n){"use strict";n.d(t,"a",(function(){return i}));var a=n("71d9"),r=n("80d2"),i=Object(r["i"])("v-toolbar__title"),s=Object(r["i"])("v-toolbar__items");a["a"]},"3c7b":function(e,t,n){},"4c72":function(e,t,n){},"80f5":function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("v-container",{attrs:{id:"calendar",fluid:"",tag:"section"}},[n("base-v-component",{attrs:{heading:"Calendar",link:"components/calendars"}}),n("v-row",[n("v-col",{staticClass:"mx-auto",attrs:{cols:"12",md:"10"}},[n("v-card",[n("v-toolbar",{attrs:{flat:""}},[n("v-toolbar-title",[e._v("August 2019")]),n("v-spacer"),e._l(e.types,(function(t,a){return n("calendar-btn",{key:a,on:{click:function(n){e.type=t}}},[e._v(" "+e._s(t)+" ")])})),n("v-spacer"),n("calendar-btn",{on:{click:function(t){return e.$refs.calendar.prev()}}},[n("v-icon",[e._v("mdi-chevron-left")])],1),n("calendar-btn",{on:{click:function(t){return e.$refs.calendar.next()}}},[n("v-icon",[e._v("mdi-chevron-right")])],1)],2),n("v-sheet",{staticClass:"mt-5",attrs:{flat:"",height:"600"}},[n("v-calendar",{ref:"calendar",attrs:{events:e.events,type:e.type,"event-color":"primary",now:"2019-01-08"},model:{value:e.calendar,callback:function(t){e.calendar=t},expression:"calendar"}})],1)],1)],1)],1)],1)},r=[],i=(n("a9e3"),n("5530")),s=n("8336"),o={name:"DashboardCalendar",components:{CalendarBtn:{extends:s["a"],props:{color:{type:String,default:"secondary"},minWidth:{type:Number,default:0},rounded:{type:Boolean,default:!0}},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({},s["a"].options.computed.classes.call(this)),{},{"mx-1":!0,"text-lowercase":!0})}}}},data:function(){return{calendar:"2019-01-08",disabled:!0,events:[{name:"Vacation",start:"2018-12-30",end:"2019-01-02"},{name:"Meeting",start:"2019-01-07"},{name:"30th Birthday",start:"2019-01-03"},{name:"New Year",start:"2019-01-01"},{name:"Conference",start:"2019-01-21"},{name:"Hackathon",start:"2019-01-30",end:"2019-02-01"}],focus:"",type:"month",types:["month","week","day"]}}},u=o,c=(n("f449"),n("2877")),d=n("6544"),l=n.n(d),h=(n("99af"),n("4de4"),n("4160"),n("d81d"),n("159b"),n("d13b"),n("5607")),v=(n("fb6a"),n("ac1f"),n("1276"),n("58df")),f=n("a9ad"),m=n("dfda"),p=n("ade3"),y=n("2b0e"),g=y["a"].extend({name:"mouse",methods:{getDefaultMouseEventHandlers:function(e,t){var n;return this.getMouseEventHandlers((n={},Object(p["a"])(n,"click"+e,{event:"click"}),Object(p["a"])(n,"contextmenu"+e,{event:"contextmenu",prevent:!0,result:!1}),Object(p["a"])(n,"mousedown"+e,{event:"mousedown"}),Object(p["a"])(n,"mousemove"+e,{event:"mousemove"}),Object(p["a"])(n,"mouseup"+e,{event:"mouseup"}),Object(p["a"])(n,"mouseenter"+e,{event:"mouseenter"}),Object(p["a"])(n,"mouseleave"+e,{event:"mouseleave"}),Object(p["a"])(n,"touchstart"+e,{event:"touchstart"}),Object(p["a"])(n,"touchmove"+e,{event:"touchmove"}),Object(p["a"])(n,"touchend"+e,{event:"touchend"}),n),t)},getMouseEventHandlers:function(e,t){var n=this,a={},r=function(r){var i=e[r];if(!n.$listeners[r])return"continue";var s=i.passive?"&":(i.once?"~":"")+(i.capture?"!":""),o=s+i.event,u=function(e){var a=e;return(void 0===i.button||a.buttons>0&&a.button===i.button)&&(i.prevent&&e.preventDefault(),i.stop&&e.stopPropagation(),n.$emit(r,t(e))),i.result};o in a?Array.isArray(a[o])?a[o].push(u):a[o]=[a[o],u]:a[o]=u};for(var i in e)r(i);return a}}}),b=n("7560"),k=n("ea4a"),O=y["a"].extend({name:"times",props:{now:{type:String,validator:k["B"]}},data:function(){return{times:{now:Object(k["u"])("0000-00-00 00:00",!0),today:Object(k["u"])("0000-00-00",!0)}}},computed:{parsedNow:function(){return this.now?Object(k["u"])(this.now,!0):null}},watch:{parsedNow:"updateTimes"},created:function(){this.updateTimes(),this.setPresent()},methods:{setPresent:function(){this.times.now.present=this.times.today.present=!0,this.times.now.past=this.times.today.past=!1,this.times.now.future=this.times.today.future=!1},updateTimes:function(){var e=this.parsedNow||this.getNow();this.updateDay(e,this.times.now),this.updateTime(e,this.times.now),this.updateDay(e,this.times.today)},getNow:function(){return Object(k["s"])(new Date)},updateDay:function(e,t){e.date!==t.date&&(t.year=e.year,t.month=e.month,t.day=e.day,t.weekday=e.weekday,t.date=e.date)},updateTime:function(e,t){e.time!==t.time&&(t.hour=e.hour,t.minute=e.minute,t.time=e.time)}}}),j=n("dc22"),w=(n("13d5"),n("3835")),E=n("b85c"),x=864e5;function T(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=e.map((function(e){return{event:e,columnCount:0,column:0,left:0,width:100}}));return n.sort((function(e,n){return Math.max(t,e.event.startTimestampIdentifier)-Math.max(t,n.event.startTimestampIdentifier)||n.event.endTimestampIdentifier-e.event.endTimestampIdentifier})),n}function C(e,t,n,a){var r=!(arguments.length>4&&void 0!==arguments[4])||arguments[4];return r?!(e>=a||t<=n):!(e>a||t<n)}function I(e){e.forEach((function(t){t.visuals.forEach((function(t){t.columnCount=e.length}))}))}function S(e){return[e.startTimestampIdentifier,e.endTimestampIdentifier]}function M(e){return[e.startIdentifier,e.endIdentifier]}function D(e,t){return[Math.max(t,e.startTimestampIdentifier),Math.min(t+x,e.endTimestampIdentifier)]}function F(e,t,n,a){for(var r=0;r<e.length;r++){var i=e[r],s=!1;if(C(t,n,i.start,i.end,a))for(var o=0;o<i.visuals.length;o++){var u=i.visuals[o],c=a?S(u.event):M(u.event),d=Object(w["a"])(c,2),l=d[0],h=d[1];if(C(t,n,l,h,a)){s=!0;break}}if(!s)return r}return-1}function H(e){var t={groups:[],min:-1,max:-1,reset:function(){t.groups=[],t.min=t.max=-1},getVisuals:function(n,a,r){(n.weekday===e||r)&&t.reset();var i=Object(k["p"])(n),s=T(a,i);return s.forEach((function(e){var n=r?S(e.event):M(e.event),a=Object(w["a"])(n,2),i=a[0],s=a[1];t.groups.length>0&&!C(i,s,t.min,t.max,r)&&(I(t.groups),t.reset());var o=F(t.groups,i,s,r);-1===o&&(o=t.groups.length,t.groups.push({start:i,end:s,visuals:[]}));var u=t.groups[o];u.visuals.push(e),u.start=Math.min(u.start,i),u.end=Math.max(u.end,s),e.column=o,-1===t.min?(t.min=i,t.max=s):(t.min=Math.min(t.min,i),t.max=Math.max(t.max,s))})),I(t.groups),s}};return t}var $=100,_=5,W=1.7,B=function(e,t,n){var a=H(t);return function(e,t,r){if(!r)return a.getVisuals(e,t,r);var i,s=Object(k["p"])(e),o=T(t,s),u=U(o,s),c=Object(E["a"])(u);try{for(c.s();!(i=c.n()).done;){var d,l=i.value,h=[],v=Object(E["a"])(l.visuals);try{for(v.s();!(d=v.n()).done;){var f=d.value,m=Z(f,s),p=R(m,h);if(!1===p){var y=L(m,h);y&&(m.parent=y,m.sibling=C(m.start,m.end,y.start,q(y.start,n)),m.index=y.index+1,y.children.push(m))}else{var g=V(m,h,p-1,p-1),b=Object(w["a"])(g,1),O=b[0],j=V(m,h,p+1,p+h.length,!0);m.children=j,m.index=p,O&&(m.parent=O,m.sibling=C(m.start,m.end,O.start,q(O.start,n)),O.children.push(m));var x,I=Object(E["a"])(j);try{for(I.s();!(x=I.n()).done;){var S=x.value;S.parent===O&&(S.parent=m);var M=S.index-m.index<=1;M&&m.sibling&&C(m.start,q(m.start,n),S.start,S.end)&&(S.sibling=!0)}}catch(D){I.e(D)}finally{I.f()}}h.push(m)}}catch(D){v.e(D)}finally{v.f()}N(h,n)}}catch(D){c.e(D)}finally{c.f()}return o.sort((function(e,t){return e.left-t.left||e.event.startTimestampIdentifier-t.event.startTimestampIdentifier})),o}};function N(e,t){var n,a=Object(E["a"])(e);try{for(a.s();!(n=a.n()).done;){var r=n.value,i=r.visual,s=r.parent,o=z(r)+1,u=s?s.visual.left:0,c=$-u,d=Math.min(_,$/o),l=A(r,e),h=c/(o-r.index+1),v=c/(o-r.index+(r.sibling?1:0))*l;s&&(i.left=r.sibling?u+h:u+d),i.width=Y(r,e,t)?$-i.left:Math.min($-i.left,v*W)}}catch(f){a.e(f)}finally{a.f()}}function A(e,t){if(!e.children.length)return 1;var n=e.index+t.length,a=e.children.reduce((function(e,t){return Math.min(e,t.index)}),n);return a-e.index}function P(e,t){var n,a=[],r=Object(E["a"])(t);try{for(r.s();!(n=r.n()).done;){var i=n.value;C(e.start,e.end,i.start,i.end)&&a.push(i.index)}}catch(s){r.e(s)}finally{r.f()}return a}function R(e,t){var n=P(e,t);n.sort();for(var a=0;a<n.length;a++)if(a<n[a])return a;return!1}function V(e,t,n,a){var r,i=arguments.length>4&&void 0!==arguments[4]&&arguments[4],s=[],o=Object(E["a"])(t);try{for(o.s();!(r=o.n()).done;){var u=r.value;u.index>=n&&u.index<=a&&C(e.start,e.end,u.start,u.end)&&s.push(u)}}catch(d){o.e(d)}finally{o.f()}if(i&&s.length>0){var c=s.reduce((function(e,t){return Math.min(e,t.index)}),s[0].index);return s.filter((function(e){return e.index===c}))}return s}function L(e,t){var n,a=null,r=Object(E["a"])(t);try{for(r.s();!(n=r.n()).done;){var i=n.value;C(e.start,e.end,i.start,i.end)&&(null===a||i.index>a.index)&&(a=i)}}catch(s){r.e(s)}finally{r.f()}return a}function Y(e,t,n){var a,r=Object(E["a"])(t);try{for(r.s();!(a=r.n()).done;){var i=a.value;if(i!==e&&i.index>e.index&&C(e.start,q(e.start,n),i.start,i.end))return!1}}catch(s){r.e(s)}finally{r.f()}return!0}function U(e,t){var n,a=[],r=Object(E["a"])(e);try{for(r.s();!(n=r.n()).done;){var i,s=n.value,o=D(s.event,t),u=Object(w["a"])(o,2),c=u[0],d=u[1],l=!1,h=Object(E["a"])(a);try{for(h.s();!(i=h.n()).done;){var v=i.value;if(C(c,d,v.start,v.end)){v.visuals.push(s),v.end=Math.max(v.end,d),l=!0;break}}}catch(f){h.e(f)}finally{h.f()}l||a.push({start:c,end:d,visuals:[s]})}}catch(f){r.e(f)}finally{r.f()}return a}function Z(e,t){var n=D(e.event,t),a=Object(w["a"])(n,2),r=a[0],i=a[1];return{parent:null,sibling:!0,index:0,visual:e,start:r,end:i,children:[]}}function z(e){var t,n=e.index,a=Object(E["a"])(e.children);try{for(a.s();!(t=a.n()).done;){var r=t.value,i=z(r);i>n&&(n=i)}}catch(s){a.e(s)}finally{a.f()}return n}function q(e,t){var n=e%100,a=n+t,r=Math.floor(a/60),i=a%60;return e-n+100*r+i}var G=100,J=function(e,t,n){var a=H(t);return function(e,t,n){var r=a.getVisuals(e,t,n);return n&&r.forEach((function(e){e.left=e.column*G/e.columnCount,e.width=G/e.columnCount})),r}},X={stack:B,column:J},K={base:{start:{type:String,validate:k["B"],default:function(){return Object(k["s"])(new Date).date}},end:{type:String,validate:k["B"]},weekdays:{type:[Array,String],default:function(){return[0,1,2,3,4,5,6]},validate:ee},hideHeader:{type:Boolean,default:!1},shortWeekdays:{type:Boolean,default:!0},weekdayFormat:{type:Function,default:null},dayFormat:{type:Function,default:null}},intervals:{maxDays:{type:Number,default:7},shortIntervals:{type:Boolean,default:!0},intervalHeight:{type:[Number,String],default:48,validate:Q},intervalWidth:{type:[Number,String],default:60,validate:Q},intervalMinutes:{type:[Number,String],default:60,validate:Q},firstInterval:{type:[Number,String],default:0,validate:Q},intervalCount:{type:[Number,String],default:24,validate:Q},intervalFormat:{type:Function,default:null},intervalStyle:{type:Function,default:null},showIntervalLabel:{type:Function,default:null}},weeks:{minWeeks:{validate:Q,default:1},shortMonths:{type:Boolean,default:!0},showMonthOnFirst:{type:Boolean,default:!0},monthFormat:{type:Function,default:null}},calendar:{type:{type:String,default:"month"},value:{type:String,validate:k["B"]}},events:{events:{type:Array,default:function(){return[]}},eventStart:{type:String,default:"start"},eventEnd:{type:String,default:"end"},eventHeight:{type:Number,default:20},eventColor:{type:[String,Function],default:"primary"},eventTextColor:{type:[String,Function],default:"white"},eventName:{type:[String,Function],default:"name"},eventOverlapThreshold:{type:[String,Number],default:60},eventOverlapMode:{type:[String,Function],default:"stack",validate:function(e){return e in X||"function"===typeof e}},eventMore:{type:Boolean,default:!0},eventMoreText:{type:String,default:"$vuetify.calendar.moreEvents"},eventRipple:{type:[Boolean,Object],default:null},eventMarginBottom:{type:Number,default:1}}};function Q(e){return isFinite(parseInt(e))}function ee(e){if("string"===typeof e&&(e=e.split(",")),Array.isArray(e)){var t=e.map((function(e){return parseInt(e)}));if(t.length>k["b"]||0===t.length)return!1;for(var n={},a=!1,r=0;r<t.length;r++){var i=t[r];if(!isFinite(i)||i<0||i>=k["b"])return!1;if(r>0){var s=i-t[r-1];if(s<0){if(a)return!1;a=!0}else if(0===s)return!1}if(n[i])return!1;n[i]=!0}return!0}return!1}var te=Object(v["a"])(f["a"],m["a"],g,b["a"],O).extend({name:"calendar-base",directives:{Resize:j["a"]},props:K.base,computed:{parsedWeekdays:function(){return Array.isArray(this.weekdays)?this.weekdays:(this.weekdays||"").split(",").map((function(e){return parseInt(e,10)}))},weekdaySkips:function(){return Object(k["q"])(this.parsedWeekdays)},weekdaySkipsReverse:function(){var e=this.weekdaySkips.slice();return e.reverse(),e},parsedStart:function(){return Object(k["u"])(this.start,!0)},parsedEnd:function(){var e=this.parsedStart,t=this.end&&Object(k["u"])(this.end)||e;return Object(k["p"])(t)<Object(k["p"])(e)?e:t},days:function(){return Object(k["f"])(this.parsedStart,this.parsedEnd,this.times.today,this.weekdaySkips)},dayFormatter:function(){if(this.dayFormat)return this.dayFormat;var e={timeZone:"UTC",day:"numeric"};return Object(k["h"])(this.currentLocale,(function(t,n){return e}))},weekdayFormatter:function(){if(this.weekdayFormat)return this.weekdayFormat;var e={timeZone:"UTC",weekday:"long"},t={timeZone:"UTC",weekday:"short"};return Object(k["h"])(this.currentLocale,(function(n,a){return a?t:e}))}},methods:{getRelativeClasses:function(e){var t=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return{"v-present":e.present,"v-past":e.past,"v-future":e.future,"v-outside":t}},getStartOfWeek:function(e){return Object(k["o"])(e,this.parsedWeekdays,this.times.today)},getEndOfWeek:function(e){return Object(k["m"])(e,this.parsedWeekdays,this.times.today)},getFormatter:function(e){return Object(k["h"])(this.locale,(function(t,n){return e}))}}}),ne=n("80d2");function ae(e,t,n,a){var r=Object(k["u"])(e[n],!0),i=e[a]?Object(k["u"])(e[a],!0):r,s=Object(k["k"])(r),o=Object(k["p"])(r),u=Object(k["k"])(i),c=r.hasTime?0:2359,d=Object(k["p"])(i)+c,l=!r.hasTime;return{input:e,start:r,startIdentifier:s,startTimestampIdentifier:o,end:i,endIdentifier:u,endTimestampIdentifier:d,allDay:l,index:t}}function re(e,t){return t>=e.startIdentifier&&t<=e.endIdentifier&&t*k["d"]!==e.endTimestampIdentifier}function ie(e,t,n,a){return n===e.startIdentifier||a===t.weekday&&re(e,n)}function se(e,t,n){return t<=e.endIdentifier&&n>=e.startIdentifier}var oe=100,ue=95,ce=1440,de=te.extend({name:"calendar-with-events",directives:{ripple:h["a"]},props:K.events,computed:{noEvents:function(){return 0===this.events.length},parsedEvents:function(){var e=this;return this.events.map((function(t,n){return ae(t,n,e.eventStart,e.eventEnd)}))},parsedEventOverlapThreshold:function(){return parseInt(this.eventOverlapThreshold)},eventColorFunction:function(){var e=this;return"function"===typeof this.eventColor?this.eventColor:function(){return e.eventColor}},eventTextColorFunction:function(){var e=this;return"function"===typeof this.eventTextColor?this.eventTextColor:function(){return e.eventTextColor}},eventNameFunction:function(){var e=this;return"function"===typeof this.eventName?this.eventName:function(t,n){var a=Object(ne["l"])(t.input[e.eventName]);if(t.start.hasTime){if(n){var r=t.start.hour<12&&t.end.hour>=12,i=e.formatTime(t.start,r),s=e.formatTime(t.end,!0),o=Object(k["j"])(t.start,t.end)<=e.parsedEventOverlapThreshold,u=o?", ":"<br>";return"<strong>".concat(a,"</strong>").concat(u).concat(i," - ").concat(s)}var c=e.formatTime(t.start,!0);return"<strong>".concat(c,"</strong> ").concat(a)}return a}},eventModeFunction:function(){return"function"===typeof this.eventOverlapMode?this.eventOverlapMode:X[this.eventOverlapMode]},eventWeekdays:function(){return this.parsedWeekdays}},methods:{formatTime:function(e,t){var n=this.getFormatter({timeZone:"UTC",hour:"numeric",minute:e.minute>0?"numeric":void 0});return n(e,!0)},updateEventVisibility:function(){if(!this.noEvents&&this.eventMore){var e=this.eventHeight,t=this.getEventsMap();for(var n in t){var a=t[n],r=a.parent,i=a.events,s=a.more;if(!s)break;for(var o=r.getBoundingClientRect(),u=i.length-1,c=!1,d=0,l=0;l<=u;l++){if(!c){var h=i[l].getBoundingClientRect();c=l===u?h.bottom>o.bottom:h.bottom+e>o.bottom}c&&(i[l].style.display="none",d++)}c?(s.style.display="",s.innerHTML=this.$vuetify.lang.t(this.eventMoreText,d)):s.style.display="none"}}},getEventsMap:function(){var e={},t=this.$refs.events;return t&&t.forEach?(t.forEach((function(t){var n=t.getAttribute("data-date");t.parentElement&&n&&(n in e||(e[n]={parent:t.parentElement,more:null,events:[]}),t.getAttribute("data-more")?e[n].more=t:(e[n].events.push(t),t.style.display=""))})),e):e},genDayEvent:function(e,t){for(var n=e.event,a=this.eventHeight,r=this.eventMarginBottom,i=Object(k["k"])(t),s=t.week,o=i===n.startIdentifier,u=i===n.endIdentifier,c=ue,d=t.index+1;d<s.length;d++){var l=Object(k["k"])(s[d]);if(!(n.endIdentifier>=l)){u=!0;break}c+=oe,l===n.endIdentifier&&(u=!0)}var h={event:n.input,day:t,outside:t.outside,start:o,end:u,timed:!1};return this.genEvent(n,h,!1,{staticClass:"v-event",class:{"v-event-start":o,"v-event-end":u},style:{height:"".concat(a,"px"),width:"".concat(c,"%"),"margin-bottom":"".concat(r,"px")},attrs:{"data-date":t.date},key:n.index,ref:"events",refInFor:!0})},genTimedEvent:function(e,t){var n=e.event,a=e.left,r=e.width,i=Object(k["k"])(t),s=n.startIdentifier>=i,o=n.endIdentifier>i,u=s?t.timeToY(n.start):0,c=o?t.timeToY(ce):t.timeToY(n.end),d=Math.max(this.eventHeight,c-u),l={event:n.input,day:t,outside:t.outside,start:s,end:o,timed:!0};return this.genEvent(n,l,!0,{staticClass:"v-event-timed",style:{top:"".concat(u,"px"),height:"".concat(d,"px"),left:"".concat(a,"%"),width:"".concat(r,"%")}})},genEvent:function(e,t,n,a){var r=this.$scopedSlots.event,s=this.eventTextColorFunction(e.input),o=this.eventColorFunction(e.input);return this.$createElement("div",this.setTextColor(s,this.setBackgroundColor(o,Object(i["a"])({on:this.getDefaultMouseEventHandlers(":event",(function(e){return Object(i["a"])(Object(i["a"])({},t),{},{nativeEvent:e})})),directives:[{name:"ripple",value:null==this.eventRipple||this.eventRipple}]},a))),r?r(t):[this.genName(e,n)])},genName:function(e,t){return this.$createElement("div",{staticClass:"pl-1",domProps:{innerHTML:this.eventNameFunction(e,t)}})},genPlaceholder:function(e){var t=this.eventHeight+this.eventMarginBottom;return this.$createElement("div",{style:{height:"".concat(t,"px")},attrs:{"data-date":e.date},ref:"events",refInFor:!0})},genMore:function(e){var t=this,n=this.eventHeight,a=this.eventMarginBottom;return this.$createElement("div",{staticClass:"v-event-more pl-1",class:{"v-outside":e.outside},attrs:{"data-date":e.date,"data-more":1},directives:[{name:"ripple",value:null==this.eventRipple||this.eventRipple}],on:{click:function(){return t.$emit("click:more",e)}},style:{display:"none",height:"".concat(n,"px"),"margin-bottom":"".concat(a,"px")},ref:"events",refInFor:!0})},getVisibleEvents:function(){var e=Object(k["k"])(this.days[0]),t=Object(k["k"])(this.days[this.days.length-1]);return this.parsedEvents.filter((function(n){return se(n,e,t)}))},getEventsForDay:function(e){var t=Object(k["k"])(e),n=this.eventWeekdays[0];return this.parsedEvents.filter((function(a){return ie(a,e,t,n)}))},getEventsForDayAll:function(e){var t=Object(k["k"])(e),n=this.eventWeekdays[0];return this.parsedEvents.filter((function(a){return a.allDay&&ie(a,e,t,n)}))},getEventsForDayTimed:function(e){var t=Object(k["k"])(e);return this.parsedEvents.filter((function(e){return!e.allDay&&re(e,t)}))},getScopedSlots:function(){var e=this;if(this.noEvents)return Object(i["a"])({},this.$scopedSlots);var t=this.eventModeFunction(this.parsedEvents,this.eventWeekdays[0],this.parsedEventOverlapThreshold),n=function(n,a,r,i){var s=a(n);if(0!==s.length){var o=t(n,s,i);if(i)return o.map((function(e){return r(e,n)}));var u=[];return o.forEach((function(t,a){while(u.length<t.column)u.push(e.genPlaceholder(n));u.push(r(t,n))})),u}},a=this.$scopedSlots,r=a.day,s=a["day-header"],o=a["day-body"];return Object(i["a"])(Object(i["a"])({},a),{},{day:function(t){var a=n(t,e.getEventsForDay,e.genDayEvent,!1);if(a&&a.length>0&&e.eventMore&&a.push(e.genMore(t)),r){var i=r(t);i&&(a=a?a.concat(i):i)}return a},"day-header":function(t){var a=n(t,e.getEventsForDayAll,e.genDayEvent,!1);if(s){var r=s(t);r&&(a=a?a.concat(r):r)}return a},"day-body":function(t){var a=n(t,e.getEventsForDayTimed,e.genTimedEvent,!0),r=[e.$createElement("div",{staticClass:"v-event-timed-container"},a)];if(o){var i=o(t);i&&(r=r.concat(i))}return r}})}}}),le=(n("4c72"),n("aff5"),n("2909")),he=n("afdd"),ve=te.extend({name:"v-calendar-weekly",props:K.weeks,computed:{staticClass:function(){return"v-calendar-weekly"},classes:function(){return this.themeClasses},parsedMinWeeks:function(){return parseInt(this.minWeeks)},days:function(){var e=this.parsedMinWeeks*this.parsedWeekdays.length,t=this.getStartOfWeek(this.parsedStart),n=this.getEndOfWeek(this.parsedEnd);return Object(k["f"])(t,n,this.times.today,this.weekdaySkips,Number.MAX_SAFE_INTEGER,e)},todayWeek:function(){var e=this.times.today,t=this.getStartOfWeek(e),n=this.getEndOfWeek(e);return Object(k["f"])(t,n,e,this.weekdaySkips,this.parsedWeekdays.length,this.parsedWeekdays.length)},monthFormatter:function(){if(this.monthFormat)return this.monthFormat;var e={timeZone:"UTC",month:"long"},t={timeZone:"UTC",month:"short"};return Object(k["h"])(this.currentLocale,(function(n,a){return a?t:e}))}},methods:{isOutside:function(e){var t=Object(k["k"])(e);return t<Object(k["k"])(this.parsedStart)||t>Object(k["k"])(this.parsedEnd)},genHead:function(){return this.$createElement("div",{staticClass:"v-calendar-weekly__head"},this.genHeadDays())},genHeadDays:function(){return this.todayWeek.map(this.genHeadDay)},genHeadDay:function(e,t){var n=this.isOutside(this.days[t]),a=e.present?this.color:void 0;return this.$createElement("div",this.setTextColor(a,{key:e.date,staticClass:"v-calendar-weekly__head-weekday",class:this.getRelativeClasses(e,n)}),this.weekdayFormatter(e,this.shortWeekdays))},genWeeks:function(){for(var e=this.days,t=this.parsedWeekdays.length,n=[],a=0;a<e.length;a+=t)n.push(this.genWeek(e.slice(a,a+t)));return n},genWeek:function(e){var t=this;return this.$createElement("div",{key:e[0].date,staticClass:"v-calendar-weekly__week"},e.map((function(n,a){return t.genDay(n,a,e)})))},genDay:function(e,t,n){var a=this.isOutside(e);return this.$createElement("div",{key:e.date,staticClass:"v-calendar-weekly__day",class:this.getRelativeClasses(e,a),on:this.getDefaultMouseEventHandlers(":day",(function(t){return e}))},[this.genDayLabel(e)].concat(Object(le["a"])(Object(ne["r"])(this,"day",(function(){return Object(i["a"])({outside:a,index:t,week:n},e)}))||[])))},genDayLabel:function(e){return this.$createElement("div",{staticClass:"v-calendar-weekly__day-label"},Object(ne["r"])(this,"day-label",e)||[this.genDayLabelButton(e)])},genDayLabelButton:function(e){var t=e.present?this.color:"transparent",n=1===e.day&&this.showMonthOnFirst;return this.$createElement(he["a"],{props:{color:t,fab:!0,depressed:!0,small:!0},on:this.getMouseEventHandlers({"click:date":{event:"click",stop:!0},"contextmenu:date":{event:"contextmenu",stop:!0,prevent:!0,result:!1}},(function(t){return e}))},n?this.monthFormatter(e,this.shortMonths)+" "+this.dayFormatter(e,!1):this.dayFormatter(e,!1))},genDayMonth:function(e){var t=e.present?this.color:void 0;return this.$createElement("div",this.setTextColor(t,{staticClass:"v-calendar-weekly__day-month"}),Object(ne["r"])(this,"day-month",e)||this.monthFormatter(e,this.shortMonths))}},render:function(e){return e("div",{staticClass:this.staticClass,class:this.classes,nativeOn:{dragstart:function(e){e.preventDefault()}}},[this.hideHeader?"":this.genHead()].concat(Object(le["a"])(this.genWeeks())))}}),fe=ve.extend({name:"v-calendar-monthly",computed:{staticClass:function(){return"v-calendar-monthly v-calendar-weekly"},parsedStart:function(){return Object(k["n"])(Object(k["u"])(this.start,!0))},parsedEnd:function(){return Object(k["l"])(Object(k["u"])(this.end,!0))}}}),me=(n("fcf4"),te.extend({name:"calendar-with-intervals",props:K.intervals,computed:{parsedFirstInterval:function(){return parseInt(this.firstInterval)},parsedIntervalMinutes:function(){return parseInt(this.intervalMinutes)},parsedIntervalCount:function(){return parseInt(this.intervalCount)},parsedIntervalHeight:function(){return parseFloat(this.intervalHeight)},firstMinute:function(){return this.parsedFirstInterval*this.parsedIntervalMinutes},bodyHeight:function(){return this.parsedIntervalCount*this.parsedIntervalHeight},days:function(){return Object(k["f"])(this.parsedStart,this.parsedEnd,this.times.today,this.weekdaySkips,this.maxDays)},intervals:function(){var e=this.days,t=this.parsedFirstInterval,n=this.parsedIntervalMinutes,a=this.parsedIntervalCount,r=this.times.now;return e.map((function(e){return Object(k["g"])(e,t,n,a,r)}))},intervalFormatter:function(){if(this.intervalFormat)return this.intervalFormat;var e={timeZone:"UTC",hour:"2-digit",minute:"2-digit"},t={timeZone:"UTC",hour:"numeric",minute:"2-digit"},n={timeZone:"UTC",hour:"numeric"};return Object(k["h"])(this.currentLocale,(function(a,r){return r?0===a.minute?n:t:e}))}},methods:{showIntervalLabelDefault:function(e){var t=this.intervals[0][0],n=t.hour===e.hour&&t.minute===e.minute;return!n},intervalStyleDefault:function(e){},getTimestampAtEvent:function(e,t){var n=Object(k["e"])(t),a=e.currentTarget.getBoundingClientRect(),r=this.firstMinute,i=e,s=e,o=i.changedTouches||i.touches,u=o&&o[0]?o[0].clientY:s.clientY,c=(u-a.top)/this.parsedIntervalHeight,d=Math.floor(c*this.parsedIntervalMinutes),l=r+d;return Object(k["y"])(n,l,this.times.now)},getSlotScope:function(e){var t=Object(k["e"])(e);return t.timeToY=this.timeToY,t.minutesToPixels=this.minutesToPixels,t.week=this.days,t},scrollToTime:function(e){var t=this.timeToY(e),n=this.$refs.scrollArea;return!(!1===t||!n)&&(n.scrollTop=t,!0)},minutesToPixels:function(e){return e/this.parsedIntervalMinutes*this.parsedIntervalHeight},timeToY:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=Object(k["t"])(e);if(!1===n)return!1;var a=this.firstMinute,r=this.parsedIntervalCount*this.parsedIntervalMinutes,i=(n-a)/r,s=i*this.bodyHeight;return t&&(s<0&&(s=0),s>this.bodyHeight&&(s=this.bodyHeight)),s}}})),pe=me.extend({name:"v-calendar-daily",directives:{Resize:j["a"]},data:function(){return{scrollPush:0}},computed:{classes:function(){return Object(i["a"])({"v-calendar-daily":!0},this.themeClasses)}},mounted:function(){this.init()},methods:{init:function(){this.$nextTick(this.onResize)},onResize:function(){this.scrollPush=this.getScrollPush()},getScrollPush:function(){var e=this.$refs.scrollArea,t=this.$refs.pane;return e&&t?e.offsetWidth-t.offsetWidth:0},genHead:function(){return this.$createElement("div",{staticClass:"v-calendar-daily__head",style:{marginRight:this.scrollPush+"px"}},[this.genHeadIntervals()].concat(Object(le["a"])(this.genHeadDays())))},genHeadIntervals:function(){var e=Object(ne["g"])(this.intervalWidth);return this.$createElement("div",{staticClass:"v-calendar-daily__intervals-head",style:{width:e}},Object(ne["r"])(this,"interval-header"))},genHeadDays:function(){return this.days.map(this.genHeadDay)},genHeadDay:function(e,t){var n=this,a=Object(ne["r"])(this,"day-header",(function(){return Object(i["a"])(Object(i["a"])({week:n.days},e),{},{index:t})}));return this.$createElement("div",{key:e.date,staticClass:"v-calendar-daily_head-day",class:this.getRelativeClasses(e),on:this.getDefaultMouseEventHandlers(":day",(function(t){return n.getSlotScope(e)}))},[this.genHeadWeekday(e),this.genHeadDayLabel(e)].concat(Object(le["a"])(a||[])))},genHeadWeekday:function(e){var t=e.present?this.color:void 0;return this.$createElement("div",this.setTextColor(t,{staticClass:"v-calendar-daily_head-weekday"}),this.weekdayFormatter(e,this.shortWeekdays))},genHeadDayLabel:function(e){return this.$createElement("div",{staticClass:"v-calendar-daily_head-day-label"},Object(ne["r"])(this,"day-label-header",e)||[this.genHeadDayButton(e)])},genHeadDayButton:function(e){var t=e.present?this.color:"transparent";return this.$createElement(he["a"],{props:{color:t,fab:!0,depressed:!0},on:this.getMouseEventHandlers({"click:date":{event:"click",stop:!0},"contextmenu:date":{event:"contextmenu",stop:!0,prevent:!0,result:!1}},(function(t){return e}))},this.dayFormatter(e,!1))},genBody:function(){return this.$createElement("div",{staticClass:"v-calendar-daily__body"},[this.genScrollArea()])},genScrollArea:function(){return this.$createElement("div",{ref:"scrollArea",staticClass:"v-calendar-daily__scroll-area"},[this.genPane()])},genPane:function(){return this.$createElement("div",{ref:"pane",staticClass:"v-calendar-daily__pane",style:{height:Object(ne["g"])(this.bodyHeight)}},[this.genDayContainer()])},genDayContainer:function(){return this.$createElement("div",{staticClass:"v-calendar-daily__day-container"},[this.genBodyIntervals()].concat(Object(le["a"])(this.genDays())))},genDays:function(){return this.days.map(this.genDay)},genDay:function(e,t){var n=this;return this.$createElement("div",{key:e.date,staticClass:"v-calendar-daily__day",class:this.getRelativeClasses(e),on:this.getDefaultMouseEventHandlers(":time",(function(t){return n.getSlotScope(n.getTimestampAtEvent(t,e))}))},[].concat(Object(le["a"])(this.genDayIntervals(t)),Object(le["a"])(Object(ne["r"])(this,"day-body",(function(){return n.getSlotScope(e)}))||[])))},genDayIntervals:function(e){return this.intervals[e].map(this.genDayInterval)},genDayInterval:function(e){var t=this,n=Object(ne["g"])(this.intervalHeight),a=this.intervalStyle||this.intervalStyleDefault,r={key:e.time,staticClass:"v-calendar-daily__day-interval",style:Object(i["a"])({height:n},a(e))},s=Object(ne["r"])(this,"interval",(function(){return t.getSlotScope(e)}));return this.$createElement("div",r,s)},genBodyIntervals:function(){var e=this,t=Object(ne["g"])(this.intervalWidth),n={staticClass:"v-calendar-daily__intervals-body",style:{width:t},on:this.getDefaultMouseEventHandlers(":interval",(function(t){return e.getTimestampAtEvent(t,e.parsedStart)}))};return this.$createElement("div",n,this.genIntervalLabels())},genIntervalLabels:function(){return this.intervals.length?this.intervals[0].map(this.genIntervalLabel):null},genIntervalLabel:function(e){var t=Object(ne["g"])(this.intervalHeight),n=this.shortIntervals,a=this.showIntervalLabel||this.showIntervalLabelDefault,r=a(e),i=r?this.intervalFormatter(e,n):void 0;return this.$createElement("div",{key:e.time,staticClass:"v-calendar-daily__interval",style:{height:t}},[this.$createElement("div",{staticClass:"v-calendar-daily__interval-text"},i)])}},render:function(e){return e("div",{class:this.classes,nativeOn:{dragstart:function(e){e.preventDefault()}},directives:[{modifiers:{quiet:!0},name:"resize",value:this.onResize}]},[this.hideHeader?"":this.genHead(),this.genBody()])}}),ye=de.extend({name:"v-calendar",props:Object(i["a"])(Object(i["a"])(Object(i["a"])({},K.calendar),K.weeks),K.intervals),data:function(){return{lastStart:null,lastEnd:null}},computed:{parsedValue:function(){return Object(k["B"])(this.value)?Object(k["u"])(this.value,!0):this.parsedStart||this.times.today},renderProps:function(){var e=this.parsedValue,t=null,n=this.maxDays,a=this.parsedWeekdays,r=e,i=e;switch(this.type){case"month":t=fe,r=Object(k["n"])(e),i=Object(k["l"])(e);break;case"week":t=pe,r=this.getStartOfWeek(e),i=this.getEndOfWeek(e),n=7;break;case"day":t=pe,n=1,a=[r.weekday];break;case"4day":t=pe,i=Object(k["w"])(Object(k["e"])(i),k["r"],4),Object(k["x"])(i),n=4,a=[r.weekday,(r.weekday+1)%7,(r.weekday+2)%7,(r.weekday+3)%7];break;case"custom-weekly":t=ve,r=this.parsedStart||e,i=this.parsedEnd;break;case"custom-daily":t=pe,r=this.parsedStart||e,i=this.parsedEnd;break;default:throw new Error(this.type+" is not a valid Calendar type")}return{component:t,start:r,end:i,maxDays:n,weekdays:a}},eventWeekdays:function(){return this.renderProps.weekdays}},watch:{renderProps:"checkChange"},mounted:function(){this.updateEventVisibility(),this.checkChange()},updated:function(){window.requestAnimationFrame(this.updateEventVisibility)},methods:{checkChange:function(){var e=this.lastStart,t=this.lastEnd,n=this.renderProps,a=n.start,r=n.end;e&&t&&a.date===e.date&&r.date===t.date||(this.lastStart=a,this.lastEnd=r,this.$emit("change",{start:a,end:r}))},move:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1,t=Object(k["e"])(this.parsedValue),n=e>0,a=n?k["r"]:k["v"],r=n?k["a"]:k["c"],i=n?e:-e;while(--i>=0)switch(this.type){case"month":t.day=r,a(t);break;case"week":Object(k["w"])(t,a,k["b"]);break;case"day":Object(k["w"])(t,a,1);break;case"4day":Object(k["w"])(t,a,4);break}Object(k["A"])(t),Object(k["x"])(t),Object(k["z"])(t,this.times.now),this.$emit("input",t.date),this.$emit("moved",t)},next:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.move(e)},prev:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;this.move(-e)},timeToY:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=this.$children[0];return!(!n||!n.timeToY)&&n.timeToY(e,t)},minutesToPixels:function(e){var t=this.$children[0];return t&&t.minutesToPixels?t.minutesToPixels(e):-1},scrollToTime:function(e){var t=this.$children[0];return!(!t||!t.scrollToTime)&&t.scrollToTime(e)}},render:function(e){var t=this,n=this.renderProps,a=n.start,r=n.end,s=n.maxDays,o=n.component,u=n.weekdays;return e(o,{staticClass:"v-calendar",class:{"v-calendar-events":!this.noEvents},props:Object(i["a"])(Object(i["a"])({},this.$props),{},{start:a.date,end:r.date,maxDays:s,weekdays:u}),directives:[{modifiers:{quiet:!0},name:"resize",value:this.updateEventVisibility}],on:Object(i["a"])(Object(i["a"])({},this.$listeners),{},{"click:date":function(e){t.$listeners["input"]&&t.$emit("input",e.date),t.$listeners["click:date"]&&t.$emit("click:date",e)}}),scopedSlots:this.getScopedSlots()})}}),ge=n("b0af"),be=n("62ad"),ke=n("a523"),Oe=n("132d"),je=n("0fd9"),we=n("8dd9"),Ee=n("2fa4"),xe=n("71d9"),Te=n("2a7f"),Ce=Object(c["a"])(u,a,r,!1,null,null,null);t["default"]=Ce.exports;l()(Ce,{VCalendar:ye,VCard:ge["a"],VCol:be["a"],VContainer:ke["a"],VIcon:Oe["a"],VRow:je["a"],VSheet:we["a"],VSpacer:Ee["a"],VToolbar:xe["a"],VToolbarTitle:Te["a"]})},aff5:function(e,t,n){var a=n("23e7");a({target:"Number",stat:!0},{MAX_SAFE_INTEGER:9007199254740991})},d13b:function(e,t,n){},f449:function(e,t,n){"use strict";var a=n("3c7b"),r=n.n(a);r.a},fcf4:function(e,t,n){}}]);
//# sourceMappingURL=chunk-32b571a3.f3ad14a4.js.map