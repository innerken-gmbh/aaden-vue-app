(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-63504776","chunk-29164b38"],{"0160":function(t,e,a){},"1e06":function(t,e,a){"use strict";a("c96a");var i=a("5530"),n=a("58df"),s=a("9d26"),o=a("7560"),r=a("a9ad"),l=Object(n["a"])(r["a"],o["a"]);e["a"]=l.extend().extend({name:"v-timeline-item",inject:["timeline"],props:{color:{type:String,default:"primary"},fillDot:Boolean,hideDot:Boolean,icon:String,iconColor:String,large:Boolean,left:Boolean,right:Boolean,small:Boolean},computed:{hasIcon:function(){return!!this.icon||!!this.$slots.icon}},methods:{genBody:function(){return this.$createElement("div",{staticClass:"v-timeline-item__body"},this.$slots.default)},genIcon:function(){return this.$slots.icon?this.$slots.icon:this.$createElement(s["a"],{props:{color:this.iconColor,dark:!this.theme.isDark,small:this.small}},this.icon)},genInnerDot:function(){var t=this.setBackgroundColor(this.color);return this.$createElement("div",Object(i["a"])({staticClass:"v-timeline-item__inner-dot"},t),[this.hasIcon&&this.genIcon()])},genDot:function(){return this.$createElement("div",{staticClass:"v-timeline-item__dot",class:{"v-timeline-item__dot--small":this.small,"v-timeline-item__dot--large":this.large}},[this.genInnerDot()])},genDivider:function(){var t=[];return this.hideDot||t.push(this.genDot()),this.$createElement("div",{staticClass:"v-timeline-item__divider"},t)},genOpposite:function(){return this.$createElement("div",{staticClass:"v-timeline-item__opposite"},this.$slots.opposite)}},render:function(t){var e=[this.genBody(),this.genDivider()];return this.$slots.opposite&&e.push(this.genOpposite()),t("div",{staticClass:"v-timeline-item",class:Object(i["a"])({"v-timeline-item--fill-dot":this.fillDot,"v-timeline-item--before":this.timeline.reverse?this.right:this.left,"v-timeline-item--after":this.timeline.reverse?this.left:this.right},this.themeClasses)},e)}})},"2c36":function(t,e,a){},"5d13":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-card",{staticClass:"v-card--plan mx-auto pt-3 pb-4 px-2 text-center",attrs:{color:t.plan.best?void 0:"transparent elevation-0",light:t.plan.best,"max-width":"100%"}},[a("div",{staticClass:"body-2 text-uppercase grey--text",domProps:{textContent:t._s(t.plan.heading)}}),a("v-avatar",{attrs:{size:"130"}},[a("v-icon",{attrs:{color:t.plan.best?"success":void 0,size:"64"},domProps:{textContent:t._s(t.plan.icon)}})],1),a("h2",{staticClass:"display-2 font-weight-light",domProps:{textContent:t._s(t.plan.title)}}),a("v-card-text",{staticClass:"body-1 font-weight-light pa-1",domProps:{textContent:t._s(t.plan.text)}}),a("pages-btn",{attrs:{color:t.plan.best?"success":"white"}},[t._v(" "+t._s(t.$t("plan"))+" ")])],1)},n=[],s=(a("d3b7"),{name:"PagesPlanCard",components:{PagesBtn:function(){return a.e("chunk-2d0c4bbd").then(a.bind(null,"3ba9"))}},props:{plan:{type:Object,default:function(){return{best:!1,heading:void 0,icon:void 0,title:void 0,text:void 0}}}}}),o=s,r=(a("bddb"),a("2877")),l=a("6544"),c=a.n(l),d=a("8212"),u=a("b0af"),h=a("99d9"),m=a("132d"),v=Object(r["a"])(o,i,n,!1,null,null,null);e["default"]=v.exports;c()(v,{VAvatar:d["a"],VCard:u["a"],VCardText:h["c"],VIcon:m["a"]})},"6ca7":function(t,e,a){},8414:function(t,e,a){"use strict";var i=a("5530"),n=(a("0160"),a("58df")),s=a("7560");e["a"]=Object(n["a"])(s["a"]).extend({name:"v-timeline",provide:function(){return{timeline:this}},props:{alignTop:Boolean,dense:Boolean,reverse:Boolean},computed:{classes:function(){return Object(i["a"])({"v-timeline--align-top":this.alignTop,"v-timeline--dense":this.dense,"v-timeline--reverse":this.reverse},this.themeClasses)}},render:function(t){return t("div",{staticClass:"v-timeline",class:this.classes},this.$slots.default)}})},ab4f:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-container",{attrs:{id:"widgets",fluid:"",tag:"section"}},[a("base-v-component",{attrs:{heading:"Cards",link:"components/cards"}}),a("v-row",[a("v-col",{attrs:{cols:"12",md:"6"}},[a("base-material-card",{staticClass:"px-5 py-3",attrs:{color:"warning",inline:""},scopedSlots:t._u([{key:"heading",fn:function(){return[a("div",{staticClass:"display-2 font-weight-light"},[t._v(" Employees Stats ")]),a("div",{staticClass:"subtitle-1 font-weight-light"},[t._v(" New employees on 15th September, 2016 ")])]},proxy:!0}])},[a("v-card-text",[a("v-data-table",{attrs:{headers:t.headers,items:t.items}})],1)],1)],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("base-material-card",{staticClass:"px-5 py-3",scopedSlots:t._u([{key:"heading",fn:function(){return[a("v-tabs",{attrs:{"background-color":"transparent","slider-color":"white"},model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},[a("span",{staticClass:"subheading font-weight-light mx-3",staticStyle:{"align-self":"center"}},[t._v("Tasks:")]),a("v-tab",{staticClass:"mr-3"},[a("v-icon",{staticClass:"mr-2"},[t._v(" mdi-bug ")]),t._v(" Bugs ")],1),a("v-tab",{staticClass:"mr-3"},[a("v-icon",{staticClass:"mr-2"},[t._v(" mdi-code-tags ")]),t._v(" Website ")],1),a("v-tab",[a("v-icon",{staticClass:"mr-2"},[t._v(" mdi-cloud ")]),t._v(" Server ")],1)],1)]},proxy:!0}])},[a("v-tabs-items",{staticClass:"transparent",model:{value:t.tabs,callback:function(e){t.tabs=e},expression:"tabs"}},t._l(3,(function(e){return a("v-tab-item",{key:e},[a("v-card-text",[t._l(t.tasks[t.tabs],(function(e,i){return[a("v-row",{key:i,attrs:{align:"center"}},[a("v-col",{attrs:{cols:"1"}},[a("v-list-item-action",[a("v-checkbox",{attrs:{color:"secondary"},model:{value:e.value,callback:function(a){t.$set(e,"value",a)},expression:"task.value"}})],1)],1),a("v-col",{attrs:{cols:"9"}},[a("div",{staticClass:"font-weight-light",domProps:{textContent:t._s(e.text)}})]),a("v-col",{staticClass:"text-right",attrs:{cols:"2"}},[a("v-icon",{staticClass:"mx-1"},[t._v(" mdi-pencil ")]),a("v-icon",{staticClass:"mx-1",attrs:{color:"error"}},[t._v(" mdi-close ")])],1)],1)]}))],2)],1)})),1)],1)],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("v-row",[t._l(t.plans,(function(t,e){return[a("v-col",{key:e,attrs:{cols:"12",md:"6"}},[a("pages-plan-card",{attrs:{plan:t}})],1)]})),a("v-col",{attrs:{cols:"12"}},[a("base-material-testimony",{attrs:{author:"Alec Thompson",blurb:"Your products, all the kits that I have downloaded from your site and worked with are sooo cool! I love the color mixtures, cards... everything. Keep up the great work!",handle:"@alecthompson"}})],1)],2)],1),a("v-col",{attrs:{cols:"12",md:"6"}},[a("v-timeline",{attrs:{"align-top":"",dense:""}},t._l(t.timelines,(function(e,i){return a("v-timeline-item",{key:i,attrs:{color:e.color,icon:e.icon,"fill-dot":"",large:""}},[a("v-card",{staticClass:"pa-6"},[a("v-chip",{staticClass:"overline mb-3",attrs:{color:e.color,small:""}},[t._v(" "+t._s(e.chip)+" ")]),a("p",{staticClass:"subtitle-1",domProps:{textContent:t._s(e.text)}}),a("div",{staticClass:"text-uppercase body-2",domProps:{textContent:t._s(e.subtext)}}),e.action?[a("v-divider",{staticClass:"mb-3"}),a("v-menu",{attrs:{bottom:"","offset-y":"",origin:"top left",right:"",transition:"scale-transition"},scopedSlots:t._u([{key:"activator",fn:function(i){var n=i.attrs,s=i.on;return[a("v-btn",t._g(t._b({attrs:{color:e.action,default:"",rounded:""}},"v-btn",n,!1),s),[a("v-icon",{attrs:{left:""},domProps:{textContent:t._s(e.actionIcon)}}),a("v-icon",{attrs:{right:""}},[t._v(" "+t._s(t.menu?"mdi-menu-up":"mdi-menu-down")+" ")])],1)]}}],null,!0),model:{value:t.menu,callback:function(e){t.menu=e},expression:"menu"}},[a("v-sheet",[a("v-list",t._l(e.actions,(function(e){return a("v-list-item",{key:e,attrs:{link:""}},[a("v-list-item-title",{domProps:{textContent:t._s(e)}})],1)})),1)],1)],1)]:t._e()],2)],1)})),1)],1)],1)],1)},n=[],s=a("5d13"),o={name:"Widgets",components:{PagesPlanCard:s["default"]},data:function(){return{headers:[{sortable:!1,text:"ID",value:"id"},{sortable:!1,text:"Name",value:"name"},{sortable:!1,text:"Salary",value:"salary",align:"right"},{sortable:!1,text:"Country",value:"country",align:"right"},{sortable:!1,text:"City",value:"city",align:"right"}],items:[{id:1,name:"Dakota Rice",country:"Niger",city:"Oud-Tunrhout",salary:"$35,738"},{id:2,name:"Minerva Hooper",country:"Curaçao",city:"Sinaai-Waas",salary:"$23,738"},{id:3,name:"Sage Rodriguez",country:"Netherlands",city:"Overland Park",salary:"$56,142"},{id:4,name:"Philip Chanley",country:"Korea, South",city:"Gloucester",salary:"$38,735"},{id:5,name:"Doris Greene",country:"Malawi",city:"Feldkirchen in Kārnten",salary:"$63,542"}],menu:!1,plans:[{best:!0,heading:"Small Company",icon:"mdi-home",title:"29$",text:"This is good if your company size is between 2 and 10 Persons."},{heading:"Freelancer",icon:"mdi-sofa",title:"Free",text:"This is good if your company size is between 2 and 10 Persons."}],tabs:0,tasks:{0:[{text:'Sign contract for "What are conference organizers afraid of?"',value:!0},{text:"Lines From Great Russian Literature? Or E-mails From My Boss?",value:!1},{text:"Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",value:!1},{text:"Create 4 Invisible User Experiences you Never Knew About",value:!0}],1:[{text:"Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",value:!0},{text:'Sign contract for "What are conference organizers afraid of?"',value:!1}],2:[{text:"Lines From Great Russian Literature? Or E-mails From My Boss?",value:!1},{text:"Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit",value:!0},{text:'Sign contract for "What are conference organizers afraid of?"',value:!0}]},timelines:[{chip:"Some title",color:"error",icon:"mdi-briefcase",text:"Wifey made the best Father's Day meal ever. So thankful so happy so blessed. Thank you for making my family We just had fun with the “future” theme !!! It was a fun night all together ... The always rude Kanye Show at 2am Sold Out Famous viewing @ Figueroa and 12th in downtown.",subtext:"11 hours ago via twitter"},{chip:"Another one",color:"success",icon:"mdi-puzzle",text:"Thank God for the support of my wife and real friends. I also wanted to point out that it’s the first album to go number 1 off of streaming!!! I love you Ellen and also my number one design rule of anything I do from shoes to music to homes is that Kim has to like it...."},{chip:"Another title",color:"info",icon:"mdi-fingerprint",text:"Called I Miss the Old Kanye That’s all it was Kanye And I love you like Kanye loves Kanye Famous viewing @ Figueroa and 12th in downtown LA 11:10PM. What if Kanye made a song about Kanye Royère doesn't make a Polar bear bed but the Polar bear couch is my favorite piece of furniture we own It wasn’t any Kanyes Set on his goals Kanye",action:"info",actionIcon:"mdi-wrench",actions:["Action","Another Action","Something else here"]}]}}},r=o,l=a("2877"),c=a("6544"),d=a.n(c),u=a("8336"),h=a("b0af"),m=a("99d9"),v=a("ac7c"),p=a("cc20"),f=a("62ad"),g=a("a523"),b=a("8fea"),y=a("ce7e"),x=a("132d"),C=a("8860"),w=a("da13"),_=a("1800"),k=a("5d23"),I=a("e449"),S=a("0fd9"),$=a("8dd9"),V=a("71a3"),O=a("c671"),T=a("fe57"),D=a("aac8"),P=a("8414"),B=a("1e06"),E=Object(l["a"])(r,i,n,!1,null,null,null);e["default"]=E.exports;d()(E,{VBtn:u["a"],VCard:h["a"],VCardText:m["c"],VCheckbox:v["a"],VChip:p["a"],VCol:f["a"],VContainer:g["a"],VDataTable:b["a"],VDivider:y["a"],VIcon:x["a"],VList:C["a"],VListItem:w["a"],VListItemAction:_["a"],VListItemTitle:k["c"],VMenu:I["a"],VRow:S["a"],VSheet:$["a"],VTab:V["a"],VTabItem:O["a"],VTabs:T["a"],VTabsItems:D["a"],VTimeline:P["a"],VTimelineItem:B["a"]})},ac7c:function(t,e,a){"use strict";a("d3b7"),a("25f0");var i=a("5530"),n=(a("6ca7"),a("ec29"),a("9d26")),s=a("c37a"),o=a("fe09");e["a"]=o["a"].extend({name:"v-checkbox",props:{indeterminate:Boolean,indeterminateIcon:{type:String,default:"$checkboxIndeterminate"},offIcon:{type:String,default:"$checkboxOff"},onIcon:{type:String,default:"$checkboxOn"}},data:function(){return{inputIndeterminate:this.indeterminate}},computed:{classes:function(){return Object(i["a"])(Object(i["a"])({},s["a"].options.computed.classes.call(this)),{},{"v-input--selection-controls":!0,"v-input--checkbox":!0,"v-input--indeterminate":this.inputIndeterminate})},computedIcon:function(){return this.inputIndeterminate?this.indeterminateIcon:this.isActive?this.onIcon:this.offIcon},validationState:function(){if(!this.disabled||this.inputIndeterminate)return this.hasError&&this.shouldValidate?"error":this.hasSuccess?"success":null!==this.hasColor?this.computedColor:void 0}},watch:{indeterminate:function(t){var e=this;this.$nextTick((function(){return e.inputIndeterminate=t}))},inputIndeterminate:function(t){this.$emit("update:indeterminate",t)},isActive:function(){this.indeterminate&&(this.inputIndeterminate=!1)}},methods:{genCheckbox:function(){return this.$createElement("div",{staticClass:"v-input--selection-controls__input"},[this.$createElement(n["a"],this.setTextColor(this.validationState,{props:{dense:this.dense,dark:this.dark,light:this.light}}),this.computedIcon),this.genInput("checkbox",Object(i["a"])(Object(i["a"])({},this.attrs$),{},{"aria-checked":this.inputIndeterminate?"mixed":this.isActive.toString()})),this.genRipple(this.setTextColor(this.rippleState))])},genDefaultSlot:function(){return[this.genCheckbox(),this.genLabel()]}}})},bddb:function(t,e,a){"use strict";var i=a("2c36"),n=a.n(i);n.a}}]);
//# sourceMappingURL=chunk-63504776.851b288e.js.map