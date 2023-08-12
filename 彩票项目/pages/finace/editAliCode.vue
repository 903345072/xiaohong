<template>
	<view>
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">编辑支付宝账号</block>
		</bar-title>
		<view style="background-color: white;padding: 50rpx 20rpx;margin: 20rpx 20rpx;border-radius: 10rpx;">
			<view style="border-left: 3px solid #007AFF;padding-left: 10rpx;font-size: 30rpx;">编辑提现支付宝账号</view>
			<view style="margin: 30rpx 0;display: flex;">
				<view style="margin: 0 20rpx;" >支付宝账号</view>
				<view>
					<input @input="input" v-model="ali_code" placeholder="请输入支付宝账号" />
				</view>
				
			</view>
			<view @click="submit()" style="background-color: #007AFF;color: white;width: 90%;margin-left: 5%;height: 70rpx;line-height: 70rpx;text-align: center;border-radius: 10rpx;">提交</view>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	export default{
		name:"ali_code",
		components:{
			barTitle
		},
		data(){
			return {
				ali_code:""
			}
		},
		methods:{
			submit(){
				if(!this.ali_code){
					uni.showToast({
						title:"请输入账号",
						icon:"error"
					})
					return
				}
				var data = {"ali_code":this.ali_code}
				this.$api.editAliCode(data).then(res=>{
					uni.showToast({
						title:"修改成功"
					})
				})
			},
			input(e){
				this.ali_code = e.detail.value
			}
		}
	}
</script>

<style>
</style>
