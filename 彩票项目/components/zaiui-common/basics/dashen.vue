<template>
	<view style="white-space: nowrap;">
		<view
			style="display: flex;align-items: center;background-color: white;padding: 20rpx 20rpx;margin: 10rpx 30rpx;border-radius: 30rpx;">
			<view
				style="display: flex;flex-direction: column;align-items: center;width: 15%;">
				<image style="width: 60rpx;height: 60rpx;" src="../../../static/dashen/tuijian.png">
				</image>
				<text style="color: #ff5359;font-size: 22rpx;">推荐专家</text>
			</view>
			<view v-for="(item,index) in tuijian_dashen"
				style="display: flex;align-items: center;justify-content: space-around;width: 20%;">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<view @click.stop="goHomePage(item.uid)">
						<image style="width: 60rpx;height: 60rpx;border-radius: 60rpx;"
							:src="config.config.url+item.avatar"></image>
					</view>
					<view style="font-size: 25rpx;white-space: nowrap;">{{item.real_name}}</view>
				</view>
			</view>
		</view>
		
		<view
			style="display: flex;align-items: center;background-color: white;padding: 20rpx 20rpx;margin: 10rpx 30rpx;border-radius: 30rpx;">
			<view
				style="display: flex;flex-direction: column;align-items: center;width: 15%;">
				<image style="width: 60rpx;height: 60rpx;" src="../../../static/dashen/lianhong.png">
				</image>
				<text style="color: #ff5359;font-size: 22rpx;">连红榜</text>
			</view>
			<view v-for="(item,index) in lianhong_dashen"
				style="display: flex;align-items: center;justify-content: space-around;width: 20%;">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<view @click.stop="goHomePage(item.uid)">
						<image style="width: 60rpx;height: 60rpx;border-radius: 60rpx;"
							:src="config.config.url+item.avatar"></image>
					</view>
					<view style="font-size: 25rpx;">{{item.real_name}}</view>
				</view>
			</view>
		</view>
		<view
			style="display: flex;align-items: center;background-color: white;padding: 20rpx 20rpx;margin: 10rpx 30rpx;border-radius: 30rpx;">
			<view
				style="display: flex;flex-direction: column;align-items: center;width: 15%;">
				<image style="width: 60rpx;height: 60rpx;" src="../../../static/dashen/shenglv.png">
				</image>
				<text style="color: #ff5359;font-size: 22rpx;">胜率榜</text>
			</view>
			<view v-for="(item,index) in shenglv_dashen"
				style="display: flex;align-items: center;justify-content: space-around;width: 20%;">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<view @click.stop="goHomePage(item.uid)">
						<image style="width: 60rpx;height: 60rpx;border-radius: 60rpx;"
							:src="config.config.url+item.avatar"></image>
					</view>
					<view style="font-size: 25rpx;">{{item.real_name}}</view>
				</view>
			</view>
		</view>
		
		<view
			style="display: flex;align-items: center;background-color: white;padding: 20rpx 20rpx;margin: 10rpx 30rpx;border-radius: 30rpx;">
			<view
				style="display: flex;flex-direction: column;align-items: center;width: 15%;">
				<image style="width: 60rpx;height: 60rpx;" src="../../../static/dashen/yingli.png">
				</image>
				<text style="color: #ff5359;font-size: 22rpx;">盈利榜</text>
			</view>
			<view v-for="(item,index) in yingli_dashen"
				style="display: flex;align-items: center;justify-content: space-around;width: 20%">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<view @click.stop="goHomePage(item.uid)">
						<image style="width: 60rpx;height: 60rpx;border-radius: 60rpx;"
							:src="config.config.url+item.avatar"></image>
					</view>
					<view style="font-size: 25rpx;">{{item.real_name}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import config from "@/api/interface.js"
	export default{
		name:"dashen",
		data(){
			return {
				config:"",
				tuijian_dashen: [],
				lianhong_dashen: [],
				shenglv_dashen: [],
				yingli_dashen: [],
			}
		},
		created() {
			this.config = config
			this.$dashen.getDashenList().then(res => {
				this.tuijian_dashen = res.data.tuijian
				this.lianhong_dashen = res.data.lianhong
				this.shenglv_dashen = res.data.shenglv
				this.yingli_dashen = res.data.yingli
			})
		},
		methods:{
			goHomePage(uid) {
				uni.navigateTo({
					url: "/pages/flow/homePage?uid=" + uid
				})
			},
		}
	}
</script>

<style>
</style>
