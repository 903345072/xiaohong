<template>
	<view>
		<bar-title bgColor="bg-white" isBack @rightTap="goToWithdrawList()">
			<block slot="content">提现</block>
			<block slot="right">
				<text>提现记录</text>
			</block>
		</bar-title>
		<view>
			<view style="background-color: white;margin: 20rpx 20rpx;border-radius: 20rpx;">
				<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>

				<swiper :current="TabCur" @change="swiperChange" style="height: 25vh;">
					<swiper-item>
						<view @click="goEditAliCode()" style="border-bottom: 1px solid #EEEEEE;padding: 30rpx 0;margin: 0 20rpx;">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view   v-if="ali_code" style="display: flex;align-items: center;">
									<view class="cu-avatar sm"
										style="background-image:url(/static/zaiui/img/alipay.png)">
									</view>
									<view style="margin-left: 20rpx;">
										{{ali_code}}
									</view>
								</view>

								<view  v-if="!ali_code" style="display: flex;align-items: center;">
									<view class="cuIcon-add"
										style="background:#007AFF;color: white;width: 50rpx;height: 50rpx;border-radius: 50rpx;text-align: center;line-height: 50rpx;font-size: 40rpx;">

									</view>
									<view style="margin-left: 20rpx;">
										添加提现支付宝
									</view>
								</view>
								<view class="cuIcon-right"></view>
							</view>
						</view>
						<view style="margin:40rpx 30rpx;display: flex;flex-direction: column;">
							<text>提现金额</text>
							<view
								style="height: 90rpx;padding-left: 10rpx;position: relative;display: flex;align-items: center;">
								<view class="cuIcon-moneybag" style="margin-right: 10rpx;"></view>
								<input @input="input" type="digit" v-model="value" :placeholder="getText()" />
							</view>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;padding: 0 20rpx;">
							<text>有{{no_withdraw}}不可提现</text>
							<text @click="chakan()" style="color:#007AFF;">查看原因</text>
						</view>
					</swiper-item>

					<swiper-item>
						<view @click="goEditBankCard()" style="border-bottom: 1px solid #EEEEEE;padding: 30rpx 0;margin: 0 20rpx;">
							<view style="display: flex;justify-content: space-between;align-items: center;">
								<view v-if="bank_card" style="display: flex;align-items: center;">
									<view class="cu-avatar sm" style="background-image:url(/static/zaiui/img/v.png)">
									</view>
									<view style="margin-left: 20rpx;">
										{{bank_card}}
									</view>
								</view>

								<view v-if="!bank_card" style="display: flex;align-items: center;">
									<view class="cuIcon-add"
										style="background:#007AFF;color: white;width: 50rpx;height: 50rpx;border-radius: 50rpx;text-align: center;line-height: 50rpx;font-size: 40rpx;">

									</view>
									<view style="margin-left: 20rpx;">
										添加提现银行卡
									</view>
								</view>
								<view class="cuIcon-right"></view>
							</view>
						</view>
						<view style="margin:40rpx 30rpx;display: flex;flex-direction: column;">
							<text>提现金额</text>
							<view
								style="height: 90rpx;padding-left: 10rpx;position: relative;display: flex;align-items: center;">
								<view class="cuIcon-moneybag" style="margin-right: 10rpx;"></view>
								<input @input="input" type="digit" v-model="value" :placeholder="getText()" :maxlength="can_withdraw" />
							</view>
						</view>
						<view
							style="display: flex;align-items: center;justify-content: space-between;padding: 0 20rpx;">
							<text>有{{no_withdraw}}不可提现</text>
							<text @click="chakan()" style="color:#007AFF;">查看原因</text>
						</view>
					</swiper-item>
				</swiper>
			</view>



			<view style="background-color: white;margin: 30rpx 20rpx;border-radius: 20rpx;padding: 20rpx 5rpx;">



				<view @click="doWithdraw()"
					style="background-color: #007AFF;color: white;width: 90%;height: 80rpx;line-height: 80rpx;text-align: center;margin-left: 5%;border-radius: 10rpx;margin-top: 20rpx;">
					提现
				</view>

				<view style="color: grey;padding: 20rpx 20rpx;">
					<div data-v-727a97c9="" class="fz-13 tips">
						<div data-v-727a97c9="">1.为了优化店主提现转账速度,每天限制提现一次</div>
						<div data-v-727a97c9="">2.如有紧急情况，请找店主后台扣款，线下处理提现</div>
						<div data-v-727a97c9="">3.本平台为店主的数字化管理工具，提现需要店主手动打款，用户资金是由店主托管和监管，如出现资金问题请及时联系店主处理与平台无关</div>
						<div data-v-727a97c9="">4.如有联系不上店主需要帮助的，请在首页右上角点击投诉并描述具体情况和诉求，平台客服会协助您处理</div>
					</div>
				</view>
			</view>



		</view>
		<view v-if="mask"
			style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;z-index: 999;background: rgba(167, 166, 166, 0.6);">
		</view>

		<uni-popup ref="dialogInput" type="center" style="z-index: 999999;" :maskClick="is_masclick">
			<view style="background-color: white;padding: 50rpx 50rpx;border-radius: 20rpx;margin: 20rpx 20rpx;">
				<view>
					<view style="width: 100%;text-align: center;margin-bottom: 20rpx;">温馨提示</view>
					<div class="van-dialog__message van-dialog__message--has-title van-dialog__message--left">
						1、为防止套现和洗钱，充值、赠送的金额不能直接提现，您可用于投注。仅中奖奖金可提现。（如充值金额需要提现，可与店主协商处理）<br>2、本平台为店主的数字化管理工具，提现需要店主手动打款，用户资金是由店主托管和监管，如出现资金问题请及时联系店主处理与平台无关<br>3、如有联系不上店主需要帮助的，请在首页右上角点击投诉并描述具体情况和诉求，平台客服会协助您处理
					</div>
					<view @click="cancel()" style="text-align: center;margin-top: 20rpx;color: #007AFF;">
						知道了
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	export default {
		name: "recharge",
		components: {
			barTitle,
		},
		data() {
			return {
				ali_code: "",
				bank_card: "",
				is_masclick: false,
				mask: false,
				cur_index: 6,
				can_withdraw: 0,
				no_withdraw: 0,
				value: "",
				money_arr: [11, 52, 101, 202, 501, 1001],
				checkAll: true,
				radio: 'alipay1',
				TabCur: 0,
				tabList: [{
						name: '提现到支付宝',
						type: "buy_lottery"
					},
					{
						name: '提现到银行卡',
						type: "recharge"
					},

				],
			}
		},
		
		onShow() {
			this.getUserInfo()
		},
		methods: {
			goToWithdrawList(){
				uni.navigateTo({
					url:"/pages/finace/withdrawList"
				})
			},
			goEditAliCode(){
				
				uni.navigateTo({
					url:"/pages/finace/editAliCode"
				})
			},
			goEditBankCard(){
				
				uni.navigateTo({
					url:"/pages/finace/editBankCard"
				})
			},
			cancel() {
				this.$refs.dialogInput.close("center")
				this.mask = false
			},
			getUserInfo() {
				this.$api.getUserInfo().then(res => {
					this.can_withdraw = res.data.data.award_amount
					this.no_withdraw = res.data.data.now_money
					this.ali_code = res.data.data.card_info.alipay_code
					this.bank_card = res.data.data.card_info.bank_card
				})
			},
			chakan() {

				this.$refs.dialogInput.open("center")
				this.mask = true
			},
			getText() {
				return "可提现金额" + this.can_withdraw
			},
			tabChange(index) {
				this.TabCur = index;
			},
			swiperChange(e) {
				let {
					current
				} = e.target;
				this.TabCur = current;
			},
			doWithdraw() {
				var data = {
					"type": this.TabCur,
					"price": this.value
				}
				if (this.TabCur == 0) {
				     if(!this.ali_code){
						 uni.showToast({
						 	title: "请先绑定支付宝",
						 	icon: "error"
						 })
						 return false
					 }
				}
				if (this.TabCur == 1) {
				     if(!this.bank_card){
						 uni.showToast({
						 	title: "请先绑定银行卡",
						 	icon: "error"
						 })
						 return false
					 }
				}
				this.$api.doWithdraw(data).then(res => {
					
					
					this.getUserInfo()
					uni.showToast({
						title:"操作成功"
					})
					this.value = ""
				})
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
