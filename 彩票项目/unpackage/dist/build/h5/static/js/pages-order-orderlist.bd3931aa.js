(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-order-orderlist","components-zaiui-common-basics-orderdetail"],{1768:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".zaiui-bar-title-box .cu-bar[data-v-1f1d0f19]{padding-top:0;min-height:calc(0px + %?101?%)}.zaiui-bar-title-box .cu-bar .content[data-v-1f1d0f19]{top:0}.zaiui-bar-title-box .cu-bar .content .cu-tag[data-v-1f1d0f19]{position:relative;top:%?-2.72?%;padding:0 %?5.45?%}.zaiui-bar-title-box .cu-bar .content .cu-tag uni-text[data-v-1f1d0f19]{position:relative;top:%?2?%}.zaiui-bar-title-box .cu-bar.fixed.no-shadow[data-v-1f1d0f19]{box-shadow:inherit}.zaiui-bar-title-box .cu-bar.bg-white[data-v-1f1d0f19]{color:#333}.zaiui-bar-title-box .zaiui-seat-height[data-v-1f1d0f19]{width:100%;height:calc(0px + %?101?%)}",""]),t.exports=e},2239:function(t,e,i){var a=i("24fb");e=a(!1),e.push([t.i,".pages[data-v-3e220375]{margin-top:calc(0px + %?121?%)}.image_[data-v-3e220375]{width:%?60?%;height:%?60?%}.popup-content[data-v-4141175d][data-v-3e220375]{display:flex;flex-direction:row;align-items:center;justify-content:center;padding:15px;background-color:#fff}",""]),t.exports=e},"2f18":function(t,e,i){"use strict";i("7a82");var a=i("4ea4").default;Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0,i("e25e"),i("99af");var n=a(i("50a3")),o=a(i("e252")),r=a(i("33af")),c={name:"orderlist",components:{barTitle:n.default,orderdetail:o.default,gameImg:r.default},onReachBottom:function(){this.getList(1)},computed:{scrollH:function(){var t=uni.getSystemInfoSync(),e=t.windowWidth,i=750/e,a=parseInt(t.windowHeight*i);return a}},data:function(){return{emulator_Height:0,state:0,dataList:[],orderdetail:{},array:[],index:0,pageNo:1,pageSize:10,hava:!0}},methods:{bindPickerChange:function(t){this.pageNo=1,this.hava=!0,this.state=t.target.value,this.getList(0)},open:function(t){this.orderdetail=t,this.orderdetail["flag"]=0,this.$refs.popup.open("top")},closeWindow:function(){this.$refs.popup.close("top")},barEditTap:function(){},getList:function(t){var e=this;if(0!=this.hava){0==t&&(this.pageNo=1),1==t&&this.pageNo++,this.array[0]="全部",this.array[1]="待出票",this.array[2]="待开奖",this.array[3]="未中奖",this.array[4]="待派奖",this.array[5]="已派奖";var i={state:this.state,pageNo:this.pageNo,pageSize:this.pageSize};this.$api.getOrderList(i).then((function(i){0==t?e.dataList=i.data:(0==i.data.length&&(e.hava=!1),e.dataList=e.dataList.concat(i.data))}))}}},onLoad:function(){this.getList(0)}};e.default=c},"31aa":function(t,e,i){"use strict";var a=i("32d2"),n=i.n(a);n.a},"32d2":function(t,e,i){var a=i("2239");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("24d6f86d",a,!0,{sourceMap:!1,shadowMode:!1})},"33af":function(t,e,i){"use strict";i.r(e);var a=i("9b92"),n=i("3a0c");for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);var r=i("f0c5"),c=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"4a7a96b8",null,!1,a["a"],void 0);e["default"]=c.exports},"3a0c":function(t,e,i){"use strict";i.r(e);var a=i("ec2e"),n=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},"3f7e":function(t,e,i){"use strict";var a=i("4a0d"),n=i.n(a);n.a},"4a0d":function(t,e,i){var a=i("1768");a.__esModule&&(a=a.default),"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=i("4f06").default;n("07b5b8ea",a,!0,{sourceMap:!1,shadowMode:!1})},"50a3":function(t,e,i){"use strict";i.r(e);var a=i("ba20"),n=i("9256");for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("3f7e");var r=i("f0c5"),c=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"1f1d0f19",null,!1,a["a"],void 0);e["default"]=c.exports},5713:function(t,e,i){"use strict";i.r(e);var a=i("2f18"),n=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},7005:function(t,e,i){t.exports=i.p+"static/img/jclq.8aac4248.png"},"822c":function(t,e,i){"use strict";i.r(e);var a=i("b09b"),n=i("5713");for(var o in n)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(o);i("31aa");var r=i("f0c5"),c=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,"3e220375",null,!1,a["a"],void 0);e["default"]=c.exports},"8af8":function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={name:"bar-title",props:{bgColor:{type:String,default:""},isBack:{type:Boolean,default:!0},backText:{type:String,default:""},fixed:{type:Boolean,default:!0},opacity:{type:Boolean,default:!1},shadow:{type:Boolean,default:!1}},methods:{BackPage:function(){var t=getCurrentPages();t&&t.length>1?uni.navigateBack({delta:1}):history.back()},leftTap:function(){this.$emit("leftTap")},contentTap:function(){this.$emit("contentTap")},rightTap:function(){this.$emit("rightTap")}}};e.default=a},9256:function(t,e,i){"use strict";i.r(e);var a=i("8af8"),n=i.n(a);for(var o in a)["default"].indexOf(o)<0&&function(t){i.d(e,t,(function(){return a[t]}))}(o);e["default"]=n.a},"931a":function(t,e,i){t.exports=i.p+"static/img/bjdc.b529018a.png"},"9b92":function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-uni-view",[a("v-uni-view",["foot"==t.type?a("v-uni-image",{style:{width:t.width+"rpx",height:t.height+"rpx"},attrs:{src:i("d33b")}}):t._e(),"basket"==t.type?a("v-uni-image",{staticClass:"img",style:{width:t.width+"rpx",height:t.height+"rpx"},attrs:{src:i("7005")}}):t._e(),"bd"==t.type?a("v-uni-image",{staticClass:"img",style:{width:t.width+"rpx",height:t.height+"rpx"},attrs:{src:i("931a")}}):t._e(),"pl3"==t.type?a("v-uni-image",{staticClass:"img",style:{width:t.width+"rpx",height:t.height+"rpx"},attrs:{src:i("d1ad")}}):t._e(),"renjiu"==t.type||"sfc"==t.type?a("v-uni-image",{staticClass:"img",style:{width:t.width+"rpx",height:t.height+"rpx"},attrs:{src:i("da1c")}}):t._e(),"gj"==t.type||"gyj"==t.type?a("v-uni-image",{staticClass:"img",style:{width:t.width+"rpx",height:t.height+"rpx"},attrs:{src:i("bef4")}}):t._e()],1)],1)},n=[]},b09b:function(t,e,i){"use strict";i.d(e,"b",(function(){return n})),i.d(e,"c",(function(){return o})),i.d(e,"a",(function(){return a}));var a={uniPopup:i("687f").default},n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",[i("bar-title",{attrs:{bgColor:"bg-white"},on:{rightTap:function(e){arguments[0]=e=t.$handleEvent(e),t.barEditTap.apply(void 0,arguments)}}},[i("template",{attrs:{slot:"content"},slot:"content"},[t._v("订单记录")]),i("template",{staticStyle:{display:"flex","align-items":"center"},attrs:{slot:"right"},slot:"right"},[i("v-uni-text",{staticClass:"cuIcon-searchlist",staticStyle:{"font-size":"40rpx"}}),i("v-uni-picker",{staticStyle:{flex:"1",margin:"0 20rpx"},attrs:{value:t.index,range:t.array},on:{change:function(e){arguments[0]=e=t.$handleEvent(e),t.bindPickerChange.apply(void 0,arguments)}}},[t._v("筛选")])],1)],2),i("v-uni-view",{staticClass:"content"},[t._l(t.dataList,(function(e,a){return i("v-uni-view",{staticClass:"item"},[i("v-uni-view",{staticClass:"item-title",staticStyle:{padding:"30rpx 20rpx","background-color":"white","margin-bottom":"20rpx"},on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.open(e)}}},[i("v-uni-view",{staticStyle:{display:"flex","align-items":"center","justify-content":"space-between"}},[i("v-uni-view",{staticStyle:{display:"flex","align-items":"center"}},[i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"center","margin-right":"20rpx"}},[i("game-img",{attrs:{width:60,height:60,type:e.type}}),i("v-uni-text",{staticStyle:{"font-size":"24rpx","margin-top":"10rpx",color:"#000000","font-weight":"bold"}},[t._v(t._s(e.en_type))])],1),i("v-uni-view",{staticStyle:{display:"flex","flex-direction":"column","justify-content":"center","align-items":"flex-start"}},[i("v-uni-view",{style:{color:2==e.state||3==e.state?"red":"#797374","font-weight":"bold"}},[t._v(t._s(e.en_state))]),i("v-uni-view",{staticStyle:{padding:"10rpx 0",color:"#515151"}},[t._v(t._s(e.order_time))]),i("v-uni-view",{staticStyle:{color:"#515151"}},[t._v("订单编号:"+t._s(e.order_no))])],1)],1),i("v-uni-view",{staticStyle:{color:"#515151"}},[t._v("订单"),i("v-uni-text",{staticStyle:{color:"red"}},[t._v(t._s(e.amount)+"元")])],1)],1)],1)],1)})),i("uni-popup",{ref:"popup",staticStyle:{"z-index":"999999",top:"101rpx"},attrs:{"mask-click":!1,type:"top",backgroundColor:"#FAFAFA"}},[i("v-uni-scroll-view",{style:{overflow:"scroll",height:t.scrollH+"rpx"},attrs:{"scroll-y":!0}},[i("orderdetail",{style:{overflow:"scroll"},attrs:{orderdetail:this.orderdetail},on:{closeWindow:function(e){arguments[0]=e=t.$handleEvent(e),t.closeWindow()}}})],1)],1)],2)],1)},o=[]},ba20:function(t,e,i){"use strict";i.d(e,"b",(function(){return a})),i.d(e,"c",(function(){return n})),i.d(e,"a",(function(){}));var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"zaiui-bar-title-box",style:{opacity:1==t.opacity?0:1}},[i("v-uni-view",{staticClass:"cu-bar",class:[t.fixed?"fixed":"",t.shadow?"":"no-shadow",t.bgColor]},[t.isBack?i("v-uni-view",{staticClass:"action",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.BackPage.apply(void 0,arguments)}}},[i("v-uni-text",{staticClass:"cuIcon-back"}),i("v-uni-text",[t._v(t._s(t.backText))])],1):t._e(),t.isBack?t._e():i("v-uni-view",{staticClass:"action",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.leftTap.apply(void 0,arguments)}}},[t._t("left")],2),i("v-uni-view",{staticClass:"content",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.contentTap.apply(void 0,arguments)}}},[t._t("content")],2),i("v-uni-view",{staticClass:"action",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.rightTap.apply(void 0,arguments)}}},[t._t("right")],2)],1),t.fixed?i("v-uni-view",{staticClass:"zaiui-seat-height"}):t._e()],1)},n=[]},bef4:function(t,e,i){t.exports=i.p+"static/img/pcjcmc.3ed697b2.png"},d1ad:function(t,e,i){t.exports=i.p+"static/img/pl3.d66cc098.png"},d33b:function(t,e,i){t.exports=i.p+"static/img/jczq.eacea4f2.png"},da1c:function(t,e,i){t.exports=i.p+"static/img/renjiu.71c1eb9c.png"},ec2e:function(t,e,i){"use strict";i("7a82"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;e.default={name:"gameImg",props:{width:null,height:null,type:null}}}}]);