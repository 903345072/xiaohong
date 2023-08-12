<template>
	<view>
		<bar-title bgColor="bg-white" isBack :opacity="true">
			<block slot="content">他的主页</block>
		</bar-title>
		<view @click="goBack()" style="position: fixed;left: 40rpx;top: 40rpx;z-index: 99999999;display: flex;">
			<view style="font-size: 35rpx;color: white;" class="cuIcon-back"></view>
		</view>
		<view style="position: fixed;top: 40rpx;z-index: 99999;display: flex;justify-content: center;width: 100%;">
			<view style="color: white;font-weight: bold;font-size: 32rpx;">Ta的主页</view>
		</view>
		<view
			style="background: url(../../static/img/homePage_bg.png) no-repeat 0 0/100% auto,#f9f9f9;position: absolute;left: 0;top: 0;right: 0;height: 288rpx;width: 100%;">
		</view>
		<view v-if="data">

			<view
				style="background: white;width: 94%;height: 170rpx;position: relative;margin-left: 3%;border-radius: 20rpx;margin-top: 70rpx;">

				<view style="display: flex;align-items: center;position: absolute;top: -60rpx;left: 40rpx;">
					<view style="margin-right: 20rpx;">
						<image style="width: 110rpx;height: 110rpx;border-radius: 110rpx;"
							:src="config.config.url+data.avatar"></image>
					</view>
					<view style="z-index: 99999;font-size: 30rpx;">
						<view style="display: flex;align-items: center;margin-bottom: 20rpx;">
							<text style="color: white;">{{data.real_name}}</text>
							<view @click="guanzhu(data.uid)"
								style="background: white;color: #3192ff;height: 40rpx;line-height: 40rpx;text-align: center;padding: 0 30rpx;margin-left: 20rpx;border-radius: 20rpx;">
								{{data.is_guanzhu==0?"关注":"取消关注"}}
							</view>
						</view>
						<view style="display: flex;align-items: center;">
							<view>粉丝{{data.fans_count}}</view>
							<view style="height: 20rpx;width: 1px;border-left: 1px solid #000000;margin: 0 30rpx;">
							</view>
							<view>发单{{data.send_count}}</view>
						</view>
					</view>
				</view>


				<view style="position: absolute;bottom: 20rpx;left: 20rpx;font-size: 26rpx;">Ta没有留下任何介绍</view>
			</view>
			<view
				style="width: 94%;margin-left: 3%;background: white;display: flex;align-items: center;justify-content: space-around;margin-top: 20rpx;padding: 25rpx 0rpx;border-radius: 20rpx;">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<view style="color: #f53629;font-weight: bold;">{{data.total_award.toFixed(2)}}</view>
					<view style="margin-top: 10rpx;">累计奖金</view>
				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
					<view style="color: #f53629;font-weight: bold;">{{data.profit_rate}}%</view>
					<view style="margin-top: 10rpx;">7日盈利</view>
				</view>
				<view style="display: flex;flex-direction: column;align-items: center;">
					<view style="color: #f53629;font-weight: bold;">{{data.seven_target}}</view>
					<view style="margin-top: 10rpx;">7日命中</view>
				</view>
			</view>

			<view style="width: 94%;margin-left: 3%;background: white;border-radius: 20rpx;margin-top: 20rpx;padding: 20rpx 20rpx;">
				<view style="display: flex;align-items: center;justify-content: space-between;">
					<view style="display: flex;align-items: center;">
						<view style="height: 30rpx;border-right: 8rpx solid #3192FF;"></view>
						<view>近5场战绩</view>
					</view>
					<view v-if="data.fives.length>0" style="display: flex;align-items: center;">
						<view v-for="(item,index) in data.fives" style="display: flex;align-items: center;">
							<view v-if="item ==0" style="background: #979797;color: white;height: 40rpx;width: 40rpx;line-height: 40rpx;text-align: center;border-radius: 40rpx;font-size: 20rpx;">黑</view>
							<view v-if="item ==1" style="background: #ff5359;color: white;height: 40rpx;width: 40rpx;line-height: 40rpx;text-align: center;border-radius: 40rpx;font-size: 20rpx;">红</view>
							<view v-if="index<data.fives.length-1" style="width: 30rpx;border-top: 2rpx solid #979797;"></view>
						</view>
					</view>
					<view v-if="data.fives.length==0">
						暂无数据
					</view>
				</view>
				<view v-if="data.printed_orders.length>0" style="margin-top: 20rpx;">
					<view @click="goFlowDetail(item.id)" v-for="(item,index) in data.printed_orders" :style="{'border-bottom':index < ((data.printed_orders.length)-1)?'1px solid #EEEEEE':null,'margin':'30rpx 0','padding':'20rpx 0'}">
						<view style="display: flex;align-items: center;justify-content: space-between;">
							<view style="display: flex;">
								<gameImg :width="40" :height="40" :type="item.type"></gameImg>
								<view style="margin-left: 10rpx;">{{item.en_type}}</view>
							</view>
						    <view>
								{{item.order_time}}
							</view>
						</view>
						<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 15rpx;">
							<view v-if="item.state == 0  &&  item.can_flow == true" style="color: white;background-color: #3192ff;padding: 8rpx 30rpx;font-size: 22rpx;border-radius: 10rpx;">立即跟单</view>
							<view v-if="item.state == 1" style="color: #979797;background-color: #f3f3f3;padding: 8rpx 30rpx;font-size: 22rpx;border-radius: 10rpx;">未中奖</view>
							<view v-if="item.state == 0  && item.can_flow == false" style="color: #979797;background-color: #f3f3f3;padding: 8rpx 30rpx;font-size: 22rpx;border-radius: 10rpx;">未开奖</view>
							<view v-if="item.state == 2 || item.state == 3" style="color: white;background-color: #ff5359;padding: 8rpx 30rpx;font-size: 22rpx;border-radius: 10rpx;">中奖{{item.award_money}}</view>
							<view><text>自购:<span style="color: #ff5359;">{{item.amount}}</span></text> 元<text style="margin-left: 20rpx;">跟单:<span style="color: #ff5359;">{{item.flow_count}}</span>人</text></view>
						</view>
					</view>
				</view>
				
				
				<view v-if="data.printed_orders.length==0" style="text-align: center;min-height: 10vh;margin-top: 40rpx;">
					暂无数据
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import config from "@/api/interface.js"
	import gameImg from "@/components/zaiui-common/basics/gameImg.vue" 
	export default {
		name: "homePage",
		components: {
			barTitle,gameImg
		},
		data() {
			return {
				config: "",
				data: ""
			}
		},
		onPullDownRefresh(){
		
		},
		created() {
			this.config = config
		},
		onLoad(option) {
			var uid = option.uid
			var data = {
				"uid": uid
			}
			this.$dashen.getHomePage(data).then(res => {
				this.data = res.data
			})
		},
		methods: {
			goFlowDetail(id){
				uni.navigateTo({
					url:"/pages/flow/flowDetail?id="+id
				})
			},
			guanzhu(uid) {
				var data = {
					"uid": uid
				}
				this.$dashen.guanzhu(data).then(res => {
					uni.showToast({
						title: "操作成功"
					})
					this.data.is_guanzhu = this.data.is_guanzhu == 0 ? 1 : 0
				})
			},
			goBack() {
				uni.navigateBack();
			}
		}
	}
</script>

<style>
	
</style>
