<template>
	<view>
		<bar-title bgColor="bg-white" isBack >
			<block slot="content">快捷支付</block>
		</bar-title>
		<view >
			<view style="font-size: 36rpx;color: orange;border-bottom: 1px solid #eee;padding: 20rpx 20rpx;">付款金额:&nbsp;&nbsp;&nbsp;{{this.price}}元</view>
			<view>
				<view v-if="cardList.length>0" >
				    <view @click="goToPay(item)" v-for="(item,index) in cardList" style="display: flex;justify-content: space-between;padding: 20rpx 30rpx;align-items: center;border-bottom: 1px solid #eee;">
						<view style="display: flex;flex-direction: column;">
							<text>{{item.card_name}}</text>
							<text style="margin-top: 6rpx;">{{item.card_no}}</text>
						</view>
						<view style="margin-right: 30rpx;">
							>
						</view>
					</view>
				</view>
				<view v-if="cardList.length==0" style="text-align: center;margin-top: 20rpx;">
					<text style="color: grey;">还没签约任何银行卡</text>
				</view>
			</view>
			<view style="text-align: center;">
				<button @click="addcard()" style="color: white;background: orange;width: 90%;height: 70rpx;line-height: 70rpx;font-size: 32rpx;margin-top: 30rpx;">新增银行卡</button>
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
				cardList:[]
			}
		},
		onLoad(option) {
			this.price = option.price
			this.getCardList()
		},
		methods:{
			goToPay(card){
				
				this.$api.sendRechargeCode({'id':card.id,'price':this.price}).then(res=>{
					uni.navigateTo({
						url:"/pages/finace/dorecharge?card_no="+card.card_no+"&card_name="+card.card_name+"&price="+this.price+"&card_id="+card.id+"&hy_token_id="+res.data.hy_token_id
					})
				})
			},
			getCardList(){
				this.$api.getSingCard().then(res=>{
					this.cardList = res.data
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