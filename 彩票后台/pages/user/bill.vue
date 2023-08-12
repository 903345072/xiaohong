<template>
	<view>
		<bar-title bgColor='bg-white' >
			<block slot="content">账户明细</block>
		</bar-title>
	
          <view class="content" >
		
			  <z-paging style="margin-top: 101rpx;" :refresher-only="false" ref="paging" @onRefresh="onRefresh" :refresher-status.sync="refresherStatus" @scrolltolower="scrolltolower">
			    <view class="example-body">
			     			<uni-datetime-picker v-model="range" @change="change($event)" type="datetimerange" @maskClick="maskClick" />
			     </view>
				 
				 <view style="z-index: 0;position: sticky;top :100;">
				 	<tabs-view @change="tabsChange" :current="current" :items="tabList"></tabs-view>
				 </view>
				 <swiper :duration="100" class="swiper" :style="[{height:swiperHeight+'px'}]" :current="current" @animationfinish="animationfinish">
				 	<swiper-item class="swiper-item" style="height: 100%;" v-for="(item, index) in tabList"
				 		:key="index">
				 		<testBill :range="range" :name="tabList[current]" :type="types[current]" :uid="uid" style="height: 100%;" ref="swiperList" :tabIndex="index" :currentIndex="current" @heightChanged="heightChanged">
				 		</testBill>
				 	</swiper-item>
				 </swiper>
			  </z-paging>
		  </view> 	  


	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import billList from '@/components/zaiui-common/user/billList';
	import testBill from '@/components/zaiui-common/user/testBill';
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import tabsView from "@/uni_modules/z-paging/components/tabs-view/tabs-view"
	import stickySwiperNextItem from "@/uni_modules/z-paging/components/sticky-swiper-next-item/sticky-swiper-next-item"
	export default{
		name:"bill",
		components:{
			barTitle,billList,testBill
		},
		onLoad(option) {
			this.uid = option.uid
		},
		
		data(){
			return {
				maskClick:false,
				range: [],
				single: "2021-04-3",
				date:"",
				uid:"",
				TabCur: 0,
			
				data:[],
				refresherStatus: 0,
				swiperHeight: 0,
				tabList: ['投注', '充值', '系统','奖金','佣金','提现'],
				types:["buy_lottery","recharge","system","win_price","order_back_money","withdraw"],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
			}
		},
		methods:{
		change(e){
	    this.range = e
		this.$refs.swiperList[this.current].getList(e)
			
		},
			tabChange(index) {
			            this.TabCur = index;
			        },
			swiperChange(e) {
					    let { current } = e.target;
					    this.TabCur = current;
			    },
				
				tabsChange(index) {
					this._setCurrent(index);
				},
				//下拉刷新时，通知当前显示的列表进行reload操作
				onRefresh(){
					this.$refs.swiperList[this.current].reload(() => {
						this.$refs.paging.complete([]);
					});
				},
				//当滚动到底部时，通知当前显示的列表加载更多
				scrolltolower(){
					this.$refs.swiperList[this.current].doLoadMore();
				},
				// swiper滑动结束
				animationfinish(e) {
					let current = e.detail.current;
					this._setCurrent(current);
				},
				//设置swiper的高度
				heightChanged(height){
					if(height === 0){
						//默认swiper高度为屏幕可用高度-tabsView高度-slot="top"内view的高度
						height = uni.getSystemInfoSync().windowHeight - uni.upx2px(80);
					}
					this.swiperHeight = height;
				},
				_setCurrent(current){
					if (current !== this.current){
						//切换tab时，将上一个tab的数据清空
						this.$refs.swiperList[this.current].clear();
					}
					this.current = current;
				}
		}
		
	}
</script>

<style>
</style>
