<template>
	<view>
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">编辑银行卡账号</block>
		</bar-title>
		<view style="background-color: white;padding: 50rpx 20rpx;margin: 20rpx 20rpx;border-radius: 10rpx;">
			<view style="border-left: 3px solid #007AFF;padding-left: 10rpx;font-size: 30rpx;">编辑提现银行卡账号</view>
			<view style="margin: 30rpx 0;display: flex;color: grey;">
				<view style="margin: 0 20rpx;" >姓名</view>
				<view>
					<text>**{{real_name}}</text>
				</view>
				
			</view>
			<view style="margin: 30rpx 0;display: flex;color: grey;">
				<view style="margin: 0 20rpx;" >银行卡名称</view>
				<view>
					<input @input="input1" v-model="bank_name" placeholder="请输入银行卡名称" />
				</view>
				
			</view>
			<view style="margin: 30rpx 0;display: flex;color: grey;">
				<view style="margin: 0 20rpx;" >银行卡账号</view>
				<view>
					<input @input="input2" v-model="bank_card" placeholder="请输入银行卡账号" />
				</view>
				
			</view>
			<view @click="submit()" style="background-color: #007AFF;color: white;width: 90%;margin-left: 5%;height: 70rpx;line-height: 70rpx;text-align: center;border-radius: 10rpx;">提交</view>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	export default{
		name:"bank_card",
		components:{
			barTitle
		},
		data(){
			return {
				bank_card:"",
				real_name:"",
				bank_name:""
			}
		},
		onLoad() {
			this.$api.getUserInfo().then(res=>{
				this.real_name = res.data.data.card_info.real_name.substring(res.data.data.card_info.real_name.length-1,1)
			})
		},
		methods:{
			submit(){
				if(!this.bank_card || !this.bank_name){
					uni.showToast({
						title:"请输入完整信息",
						icon:"error"
					})
					return
				}
				var data = {"bank_card":this.bank_card,"bank_name":this.bank_name}
				this.$api.editBankCard(data).then(res=>{
					uni.showToast({
						title:"修改成功"
					})
				})
			},
			input1(e){
				this.bank_name = e.detail.value
			},
			input2(e){
				this.bank_card = e.detail.value
			}
		}
	}
</script>

<style>
</style>
