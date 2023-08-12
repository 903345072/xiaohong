<template>
	<view>
		<bar-title bgColor="bg-white" isBack @rightTap="goBill()">
			<block slot="content">店铺余1额</block>
			<block slot="right">
				<text>账单</text>
			</block>
		</bar-title>
		<view>
			<view
				style="display: flex;align-items: center;justify-content: space-between;font-size: 35rpx;background-color: white;padding: 20rpx 20rpx;width: 100%;margin-top: 30rpx;">
				<view>当前余额： <text style="color: #007AFF;">{{money}}</text></view>
				<view @click="goWithdraw()"
					style="background: linear-gradient(90deg,#51caff,#3192ff);color: white;padding: 10rpx 30rpx;border-radius: 50rpx;font-size: 30rpx;">
					去提现</view>
			</view>
			<view style="background-color: white;margin: 20rpx 20rpx;border-radius: 20rpx;padding: 20rpx 5rpx;">
				<view style="margin-left: 20rpx;font-size: 35rpx;">请选择充值金额</view>
				<view style="width: 100%;margin-left: 3%;">
					<view @click="change(index)" v-for="(item,index) in money_arr" :key="index" class="dd"
						:class="[{'active':cur_index == index?true:false}]">
						￥{{item}}
					</view>
				</view>
				<view
					style="width: 90%;margin-left: 5%;border: 1px solid #EEEEEE;border-radius: 20rpx;height: 90rpx;padding-left: 30rpx;position: relative;display: flex;align-items: center;">
					<view class="cuIcon-moneybag" style="margin-right: 30rpx;"></view>
					<input @input="input" type="digit" v-model="value" placeholder="请输入充值金额" />
				</view>
			</view>

			<view style="background-color: white;margin: 30rpx 20rpx;border-radius: 20rpx;padding: 20rpx 5rpx;">
				<view style="margin-left: 20rpx;font-size: 35rpx;">支付方式</view>
				<view class="bg-white zaiui-pay-view">
					<radio-group class="block" @change="RadioChange">
						<view class="zaiui-pay-bar" @tap="payTap('yl')">
							<view class="cu-avatar sm" style="background-image:url(/static/zaiui/img/v.png)" />
							<view class="content">
								<view class="text-black">
									<text class="margin-right-sm">网银快捷</text>
						
								</view>
								<view class="text-gray text-sm">依托银行,迅捷安全</view>
							</view>
							<view class="action">
								<radio class="red zaiui-radio" :class="radio=='yl'?'checked':''"
									:checked="radio=='yl'?true:false" value="yl" />
							</view>
						</view>
						<view class="zaiui-pay-bar" @tap="payTap('alipay2')">
							<view class="cu-avatar sm" style="background-image:url(/static/zaiui/img/alipay.png)" />
							<view class="content">
								<view class="text-black">
									<text class="margin-right-sm">支付宝支付(通道一)</text>
									<text class="cu-tag line-red radius sm">HOT</text>
								</view>
								<view class="text-gray text-sm">数亿用户都在用，安全可托付</view>
							</view>
							<view class="action">
								<radio class="red zaiui-radio" :class="radio=='alipay2'?'checked':''"
									:checked="radio=='alipay2'?true:false" value="alipay2" />
							</view>
						</view>
						
						<view class="zaiui-pay-bar" @tap="payTap('alipay3')">
							<view class="cu-avatar sm" style="background-image:url(/static/zaiui/img/alipay.png)" />
							<view class="content">
								<view class="text-black">
									<text class="margin-right-sm">支付宝支付(通道二)</text>
									<text class="cu-tag line-red radius sm">HOT</text>
								</view>
								<view class="text-gray text-sm">数亿用户都在用，安全可托付</view>
							</view>
							<view class="action">
								<radio class="red zaiui-radio" :class="radio=='alipay3'?'checked':''"
									:checked="radio=='alipay3'?true:false" value="alipay3" />
							</view>
						</view>

						


						<!-- <view class="zaiui-pay-bar" @tap="payTap('yl')">
							<view class="cu-avatar sm" style="background-image:url(/static/zaiui/img/v.png)" />
							<view class="content">
								<view class="text-black">
									<text class="margin-right-sm">线下支付</text>

								</view>
								<view class="text-gray text-sm">线下转账</view>
							</view>
							<view class="action">
								<radio class="red zaiui-radio" :class="radio=='yl'?'checked':''"
									:checked="radio=='yl'?true:false" value="yl" />
							</view>
						</view> -->
					</radio-group>
				</view>

				<view @click="doRecharge()"
					style="background-color: #007AFF;color: white;width: 90%;height: 80rpx;line-height: 80rpx;text-align: center;margin-left: 5%;border-radius: 10rpx;margin-top: 20rpx;">
					充值
				</view>

				<view style="color: grey;padding: 20rpx 20rpx;">
					<div data-v-2234a3f0="" class="fz-13 tips p-t-4"><span data-v-2234a3f0="">充值说明：</span><br
							data-v-2234a3f0=""><span data-v-2234a3f0="">1.为防止恶意套现和洗钱，您在本平台的充值金额只能用于消费</span><br
							data-v-2234a3f0=""><span
							data-v-2234a3f0="">2.本平台为店主的数字化管理工具，您充值的金额将直接进入店主账户，本平台不对用户资金托管和监管，如出现资金问题请及时联系店主处理与平台无关</span><br
							data-v-2234a3f0=""><span
							data-v-2234a3f0="">3.如有联系不上店主需要帮助的，请在首页右上角点击投诉并描述具体情况和诉求，平台客服会协助您处理</span></div>
				</view>
			</view>



		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	export default {
		name: "recharge",
		components: {
			barTitle
		},
		data() {
			return {
				cur_index: 6,
				money: 0,
				value: "",
				money_arr: [11, 52, 101, 202, 501, 1001],
				checkAll: true,
				radio: 'yl',
			}
		},
		onLoad(option) {
			this.money = option.money
		},
		methods: {
			goWithdraw(){
				uni.navigateTo({
					url:"/pages/finace/withdraw"
				})
			},
			goBill(){
				uni.navigateTo({
					url:"/pages/finace/bill?uid="+""
				})
			},
			doRecharge() {
				var data = {
					"type": this.radio,
					"price": this.value
				}
				if (!this.value) {
					uni.showToast({
						title: "请选择充值金额",
						icon: "erro"
					})
					return false
				}
				if(this.radio == 'yl'){
					if(this.value>5000){
						uni.showToast({
							title:'不得大于5000'
						})
						return
					}
					uni.navigateTo({
						url:"/pages/finace/kuaijie?price="+this.value
					})
					return
					// uni.navigateTo({
					// 	url:'/pages/finace/xianxia?price='+this.value
					// })
				}else if(this.radio == 'alipay1' || this.radio == 'alipay2'){
					this.$api.doRecharge(data).then(res => {
						//window.location.href = res.data;
							document.querySelector('body').innerHTML = res.data;
							   			       //调用submit 方法
							 document.forms[0].submit()
				
					})
				}else{
					this.$api.doRecharge(data).then(res => {
						window.location.href = res.data;
				
									
					})
				}
			},
			input(e) {
				this.value = e.detail.value
			},
			change(index) {
				this.cur_index = index
				this.value = this.money_arr[index]
			},
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			payBtnTap() {
				uni.navigateTo({
					url: "/pages/status/pay_status"
				});
			},
			payTap(type) {
				this.radio = type;
			}
		}
	}
</script>

<style lang="scss">
	.dd {
		display: inline-block;
		color: black;
		padding: 20rpx 0;
		border: 1px solid #EEEEEE;
		border-radius: 20rpx;
		width: 23%;
		text-align: center;
		margin: 20rpx 30rpx;
		font-weight: bold;
	}

	.active {
		color: #007AFF;
		border: 1px solid #007AFF;
	}

	@import "../../static/zaiui/style/pay.scss";
</style>
