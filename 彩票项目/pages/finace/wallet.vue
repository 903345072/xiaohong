<template>
	<view>
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">钱包</block>
		</bar-title>
		<view>
			<view style="margin: 30rpx 40rpx">我的余额</view>
			<view style="background: linear-gradient(90deg,#51caff,#3192ff);padding: 60rpx 0;margin: 20rpx 30rpx;border-radius: 20rpx;">
				<view style="display: flex;align-items: center;justify-content: space-around;color: white;">
					<view style="width: 80rpx;height: 80rpx;border-radius: 80rpx;text-align: center;background-color: white;line-height: 100rpx;">
						<image style="width: 40rpx;height: 40rpx;" src="/static/img/rmb.png"></image>
					</view>
					
					<view style="display: flex;flex-direction: column;">
						<text>店铺余额</text>
						<text style="margin-top: 30rpx;">预存在店铺用于投注</text>
					</view>
					<view style="display: flex;flex-direction: column;align-items: flex-end;">
						<text style="font-weight: bold;">{{money.toFixed(2)}}</text>
						<view style="display: flex;margin-top: 30rpx;">
							<view @click="goToWithdraw()" style="border: 1px solid white;padding: 5rpx 25rpx;border-radius: 10rpx;">提现</view>
							<view @click="goToRecharge()" style="border: 1px solid white;padding: 5rpx 25rpx;border-radius: 10rpx;background-color: white;color: #007AFF;margin-left: 10rpx;">充值</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	export default {
		name: "wallet",
		components: {
			barTitle
		},
		data(){
			return {
				money:0,
				can_withdraw:0,
				no_withdraw:0,
				is_sm:false
			}
		},
		onLoad() {
			this.$api.getUserInfo().then(res=>{
				this.money = res.data.data.all_money 
				this.can_withdraw = res.data.data.award_amount
				this.no_withdraw = res.data.data.now_money
				this.is_sm = res.data.data.card_info !=null
			})
		},
		methods:{
			goToRecharge(){
				if(!this.is_sm){
					uni.showToast({
						title: "未实名!"
					})
					uni.navigateTo({
						url:"/pages/real_name/form"
					})
					return
				}
				uni.navigateTo({
					url:"/pages/finace/recharge?money="+this.money.toFixed(2)
				})
			},
			goToWithdraw(){
				if(!this.is_sm){
					uni.showToast({
						title: "未实名!"
					})
					uni.navigateTo({
						url:"/pages/real_name/form"
					})
					return
				}
				uni.navigateTo({
					url:"/pages/finace/withdraw?can_withdraw="+this.can_withdraw+"&no_withdraw="+this.no_withdraw
				})
			}
		}
	}
</script>

<style>
</style>
