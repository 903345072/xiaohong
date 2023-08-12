<template>
	<view class="zaiui-news-box" :class="show?'show':''">
		<!--标题栏-->
		<bar-title bgColor="bg-white" :isBack="false" @rightTap="barTitleRightTap">
			<block slot="content">统计</block>
			<block slot="right">
				<view class="cuIcon-refresh">刷新</view>
			</block>
		</bar-title>
	    <view class="example-body" >
				<uni-datetime-picker   v-model="range" @change="change($event)" type="datetimerange" @maskClick="maskClick" />
		</view>
		
		<view style="display: flex;align-items: center;background: linear-gradient(to right,#b4e8ff,#55aaff);padding: 40rpx 60rpx;width: 90%;margin: 0 auto;margin-top: 40rpx;border-radius: 20rpx 20rpx 5rpx 5rpx;color:white">
			<view style="flex:1;display: flex;flex-direction: column;align-items: center;">
				<view style="font-size: 40rpx;">{{chupiao}}</view>
				<view style="margin: 20rpx 0;">出票总金额</view>
			</view>
			<view style="border-right: 1px solid white;height: 40rpx;text-align: center;width: 1px;margin: 0 40rpx;"></view>
			<view style="flex:1;display: flex;flex-direction: column;align-items: center;">
				<view style="font-size: 40rpx;">{{zhongjiang.toFixed(2)}}</view>
				<view style="margin: 20rpx 0;white-space: nowrap;">中奖总金额(已派奖)</view>
			</view>
		</view>
		
		<!-- <view style="display: flex;align-items: center;background: linear-gradient(to right,#ffeef5,#f041ff);padding: 40rpx 60rpx;width: 90%;margin: 0 auto;border-radius: 5rpx 5rpx 20rpx 20rpx;justify-content: space-around;">
			<view style="display: flex;align-items: center;">
				<view class="cuIcon-ticket" style="color: #0081FF;font-size: 40rpx;"></view>
				<view style="margin: 20rpx 0;margin-left: 20rpx;font-size: 30rpx;">出票详情</view>
			</view>
			
			<view style="display: flex;align-items: center;">
				<view class="cuIcon-moneybag" style="color: #0081FF;font-size: 40rpx;"></view>
				<view style="margin: 20rpx 0;margin-left: 20rpx;font-size: 30rpx;">中奖详情<text style="font-size: 20rpx;">(已派奖)</text></view>
			</view>
		</view> -->
		
		<view style="width: 90%;margin: 20rpx auto;">对账汇总</view>
		
	     <view style="width: 90%;margin: 20rpx auto;background-color: white;border-radius: 20rpx;display: flex;flex-direction: column;align-items: center;padding: 40rpx 40rpx;box-shadow:2px 2px 2px 0px rgba(0,0,0,0.5)  ;">
			 <view @click="goRechargeList()" style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
				 <view  style="display: flex;align-items: center;">
					 <view class="cuIcon-moneybag" style="color: #0081FF;font-size: 40rpx;"></view>
					 <view style="margin-left: 20rpx;">充值总金额</view>
				 </view>
				 <view style="display: flex;align-items: center;">
				 	<view style="color: red;font-size: 40rpx;">{{recharge}}</view>
				 	<view class="cuIcon-right" ></view>
				 </view>
				 
			 </view>
			 
			 <view @click="goWithdrawList()" style="display: flex;align-items: center;justify-content: space-between;width: 100%;margin-top: 50rpx;">
			 				 <view style="display: flex;align-items: center;">
			 					 <view class="cuIcon-moneybag" style="color: #0081FF;font-size: 40rpx;"></view>
			 					 <view style="margin-left: 20rpx;">提现总金额</view>
			 				 </view>
			 				 <view style="display: flex;align-items: center;">
			 				 	<view style="color: #007AFF;font-size: 40rpx;" >{{extract}}</view>
			 				 	<view class="cuIcon-right"></view>
			 				 </view>
			 				 
			 </view>
		 </view>
		 
		 <view style="width: 90%;margin: 30rpx auto;">加扣款统计</view>
		 
		  <view style="width: 90%;margin: 20rpx auto;background-color: white;border-radius: 20rpx;display: flex;align-items: center;padding: 40rpx 40rpx;box-shadow:2px 2px 2px 0px rgba(0,0,0,0.5);justify-content: space-around;">
		 	
		 	 <view @click="goSystemRecord(0)" style="display: flex;flex-direction: column;justify-content: center;color: red;align-items: center;">
				 <view>加款金额</view>
				 <view style="margin-top: 20rpx;">+{{add}}</view>
			 </view>
			 
			 <view @click="goSystemRecord(1)" style="display: flex;flex-direction: column;justify-content: center;color: #0081FF;align-items: center;">
			 	 <view>扣款金额</view>
			 	 <view style="margin-top: 20rpx;">{{sub}}</view>
			 </view>
		 	
		  </view>
		
		
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	export default {
		name: 'news',
		components: { 
			barTitle
		},
	
		data() {
			return {
				modalName: null, listTouchStart: 0, listTouchDirection: null,
				maskClick:false,
				range: [],
				add:0,
				sub:0,
				chupiao:0,
				zhongjiang:0,
				recharge:0,
				extract:0
			}
		},
		props: {
			show: {
				type: Boolean,
				default: true
			},
			scrollY: {
				type: Number,
				default: 0
			},
			scrollBottom: {
				type: Number,
				default: 0
			}
		},
		watch: {
			scrollY() {
				//通知他妈的滚动了。
				this.setPageScroll(this.scrollY);
			},
			scrollBottom() {
				if(this.scrollBottom != 0) {
					//通知他妈的触底了
					this.setReachBottom();
				}
			},
		},
		created() {
			//加载虚拟数据
		},
		mounted() {
			this.getData()
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			goSystemRecord(index){
				uni.navigateTo({
					url:"/pages/user/systemRecord?id="+index
				})	
			},
			goWithdrawList(){
				uni.navigateTo({
					url:"/pages/finace/withdrawList"
				})
			},
			goRechargeList(){
				uni.navigateTo({
					url:"/pages/finace/rechargeList"
				})
			},
			getData(){
				var data= {}
				var that = this
				this.$api.getTimeArea(data).then(res=>{
					that.range.push(res.data[0])
					that.range.push(res.data[1])
					var data1 = {"range":that.range}
					this.$api.tongji(data1).then(res=>{
						that.add = res.data.add
						that.sub = res.data.sub
						that.recharge = res.data.recharge
						that.extract = res.data.extract
						that.chupiao = res.data.chupiao
						that.zhongjiang = res.data.zhongjiang
						
					})
				})
			},
			change(e){
			var that = this
				this.range = e
				var data1 = {"range":this.range}
				this.$api.tongji(data1).then(res=>{
					that.add = res.data.add
					that.sub = res.data.sub
					that.recharge = res.data.recharge
					that.extract = res.data.extract
					that.chupiao = res.data.chupiao
					that.zhongjiang = res.data.zhongjiang
					
				})
			},
			//页面被滚动
			setPageScroll(scrollTop) {
				//console.log(scrollTop);
			},
			//触底了
			setReachBottom() {
				console.log('触底了');
			},
			barTitleRightTap() {
				this.getData()
			},
			// ListTouch触摸开始
			ListTouchStart(e) {
				this.listTouchStart = e.touches[0].pageX
			},
			// ListTouch计算方向
			ListTouchMove(e) {
				this.listTouchDirection = e.touches[0].pageX - this.listTouchStart > 0 ? 'right' : 'left'
			},
			// ListTouch计算滚动
			ListTouchEnd(e) {
				if (this.listTouchDirection == 'left') {
					this.modalName = e.currentTarget.dataset.target
				} else {
					this.modalName = null
				}
				this.listTouchDirection = null
			},
			//被点击
			tapNews(index) {
				console.log(index);
				if(index == 0) {
					uni.navigateTo({
						url: '/pages/news/notice',
					});
				} else if (index == 1) {
					uni.navigateTo({
						url: '/pages/news/chat',
					});
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: #f5f5f5;
	}
	.zaiui-news-box {
		width: 100%;
		display: none;
		.zaiui-follow-box {
			.action-text-cut {
				width: 70%;
			}
		}
		.zaiui-grid-menu {
			.cu-list.grid.no-border>.cu-item {
				.cu-avatar {
					margin: 0 auto;
				}
			}
		}
		.zaiui-news-list-box {
			padding: 0 9.09rpx;
			.cu-list.menu-avatar>.cu-item>.cu-avatar {
				width: 81.81rpx;
				height: 81.81rpx;
			}
			.cu-list.menu-avatar>.cu-item {
				height: 163.63rpx;
				align-items: inherit;
				.cu-avatar {
					margin-top: 25.45rpx;
					.cu-tag.badge {
					    width: 21.81rpx;
					    height: 21.81rpx;
					    top: 0;
					    right: 0;
					    border: 1.81rpx solid #fff;	
					}
				}
				.content {
				    left: 136.36rpx;
					margin-top: 18.18rpx;
				    width: calc(100% - 90.9rpx - 54.54rpx - 18.18rpx);
				    line-height: 1.7em;	
					.cu-tag {
						padding: 0 3.63rpx;
						text {
							position: relative;
							top: -2rpx;
						}
					}
				}
				&:after {
					width: 0;
					height: 0;
					border-bottom: 0;
				}
			}
			.cu-list.menu-avatar>.cu-item.goods {
				.content {
				    width: calc(100% - 309.09rpx);
				}
				.action {
					position: absolute;	
				    right: 23.63rpx;
					width: 127.27rpx;
					.cu-avatar {
						width: 127.27rpx;
						height: 127.27rpx;
						margin-top: 18.18rpx;
					}
				}
			}
		}
	}
	.zaiui-news-box.show {
		display: block;
	}
</style>
