<template>
	<view>
		<bar-title bgColor="bg-white" isBack >
			<block slot="content">支付确认</block>
		</bar-title>
		<view >
			<view style="font-size: 32rpx;color: orange;border-bottom: 1px solid #eee;padding: 20rpx 20rpx;">
				<view>付款金额</view>
				<view style="color: grey;font-size: 30rpx;">{{this.price}}元</view>
			</view>
			<view style="font-size: 32rpx;border-bottom: 1px solid #eee;padding: 20rpx 20rpx;">
				<view>付款银行名称</view>
				<view style="color: grey;font-size: 30rpx;">{{this.card_name}}</view>
			</view>
			
			<view style="font-size: 32rpx;border-bottom: 1px solid #eee;padding: 20rpx 20rpx;">
				<view>付款银行卡号</view>
				<view style="color: grey;font-size: 30rpx;">{{this.card_no}}元</view>
			</view>
			
			<view style="font-size: 32rpx;border-bottom: 1px solid #eee;padding: 40rpx 20rpx;display: flex;align-items: center;">
				<view>短信验证码:</view>
				<input v-model="sms_code" style="border-bottom: 1px solid orange;margin-left: 40rpx;" />
			</view>
			
			<view style="text-align: center;">
				<button :disabled="disabled" @click="confirmPay()" style="color: white;background: orange;width: 90%;height: 70rpx;line-height: 70rpx;font-size: 32rpx;margin-top: 30rpx;">确认付款</button>
			</view>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	export default{
		name:"kuaijie",
		components:{barTitle},
		data(){
			return {
				price:"",
				card_name:"",
				card_no:"",
			    card_id:"",
				sms_code:"",
				disabled:false,
				hy_token_id:""
			}
		},
		onLoad(option) {
			this.price = option.price
			this.card_name = option.card_name
			this.card_no = option.card_no
			this.card_id = option.card_id
			this.hy_token_id = option.hy_token_id
		},
		methods:{
			
			confirmPay(){
				if(!this.hy_token_id){
					uni.showToast({
						title:'请重新发起支付'
					})
				}
				this.disabled= true
				this.$api.confirmPay({"card_id":this.card_id,"sms_code":this.sms_code,'hy_token_id':this.hy_token_id}).then(res=>{
					uni.showToast({
						title:'支付成功'
					})
					uni.reLaunch({
						url:'/pages/app/index'
					})
				})
			},
			
			addcard(){
				uni.navigateTo({
					url:'/pages/finace/addcard'
				})
			}
		}
	}
</script>

<style>
</style>