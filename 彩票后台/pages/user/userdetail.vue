<template>
	<view v-if="user != null">
		<bar-title bgColor='bg-white' >
			<block slot="content">用户详情</block>
		</bar-title>
		<view v-if="mask" style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;z-index: 999;background: rgba(167, 166, 166, 0.6);"></view>
		<view style="border-top: 2px solid #EEEEEE;border-bottom: 2px solid #EEEEEE;">
			<view style="display: flex;justify-content: space-between;align-items: center;margin-left: 20rpx;margin-top: 20rpx;margin-bottom: 20rpx;">
				<view style="display: flex;align-items: center;">
					<view >
						<image style="width: 80rpx;height: 80rpx;border-radius: 15rpx;" :src="getSrc(user.avatar)"></image>
					</view>
					<view style="display: flex;flex-direction: column;justify-content: flex-start;margin-left: 20rpx;">
						<view style="font-size: 30rpx;">{{user.nickname}}</view>
						<view style="font-size: 24rpx;color: #818181;">联系方式: {{user.phone}}</view>
						<view style="font-size: 24rpx;color: #818181;">绑定时间: {{user.bind_time}}</view>
					</view>
				</view>
				<view></view>
			</view>
		</view>
		
		<view @click="goBill()" style="border-bottom: 6px solid #EEEEEE;">
			<view style="display: flex;justify-content: center;align-items: center;margin-top: 20rpx;margin-bottom: 20rpx;">
				<view style="font-size: 36rpx;" >
					账户明细
				</view>
			</view>
		</view>
		
		<view @click="goRecord()" style="border-bottom: 6px solid #EEEEEE;">
			<view style="display: flex;justify-content: center;align-items: center;margin-top: 20rpx;margin-bottom: 20rpx;">
				<view style="font-size: 36rpx;" >
					投注记录
				</view>
			</view>
		</view>
		
		<view style="border-bottom: 6px solid #EEEEEE;">
			<view style="display: flex;justify-content: center;align-items: center;margin-top: 20rpx;margin-bottom: 20rpx;margin-left: 20rpx;flex-direction: column;margin-right: 20rpx;">
				<view style="display: flex;justify-content: space-between;width: 100%;">
					<view style="font-size: 30rpx;font-weight: bold;">交易统计</view>
					<view v-if="user.orders.length>0" style="color: #818181;">最近下单时间: {{user.orders[0]["order_time"]}}</view>
					<view v-if="user.orders.length == 0" style="color: #818181;">最近下单时间: 无</view>
				</view>
				
				<view style="display: flex;justify-content: space-between;width: 100%;margin: 20rpx 0;">
					
						<view style="display: flex;flex-direction: column;justify-content: flex-start;line-height: 40rpx;">
							<text style="color: #818181;font-size: 26rpx;">累计消费金额</text>
							<text style="color: red;font-size: 32rpx;">{{user.sum_amount}}</text>
						</view>
					
					<view style="display: flex;flex-direction: column;justify-content: flex-start;line-height: 40rpx;">
						<text style="color: #818181;font-size: 26rpx;">近5单中奖情况</text>
						<view style="display: flex;">
							<text v-for="(item,index) in user.fives" :key="index" style="color: red;font-size: 32rpx;display: flex;">
								<text v-if="item==1" style="color: red;">红</text>
								<text v-if="item==0" style="color: black;">黑</text>
							</text>
						</view>
						
					</view>
				</view>
				
				<view style="display: flex;justify-content: space-between;width: 100%;">
					<view style="font-size: 28rpx;line-height: 40rpx;">
						<view style="color: #818181;font-size: 26rpx;">累计下单数</view>
						<view style="color: #000000;font-size: 32rpx;font-weight: bold;">{{user.order_count}}</view>
					</view>
					
				</view>
				
				<view style="display: flex;justify-content: space-between;width: 100%;margin: 20rpx 0;">
					
						<view style="display: flex;flex-direction: column;justify-content: flex-start;line-height: 40rpx;">
							<text style="color: #818181;font-size: 26rpx;">余额</text>
							<text style="color: red;font-size: 32rpx;">{{getToatal()}}</text>
						</view>
					
					<view style="display: flex;align-items: center;">
						<text @click="openAddPop()" style="border: 1px solid #007AFF;color: #007AFF;border-radius: 3px;padding: 5rpx 60rpx;">修改金额</text>
						<!-- <text @click="openSubPop()" style="border: 1px solid red;color: red;border-radius: 3px;padding: 5rpx 60rpx;margin-left: 20rpx;">扣款</text> -->
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="user != null" style="width: 100%;padding: 20rpx 20rpx;line-height: 80rpx;display: flex;flex-direction: column;justify-content: center;">
			<view style="display: flex;justify-content: space-between;border-bottom: 1px solid #EEEEEE;padding: 15rpx 0;">
				<text style="color: #000000;">设为销售</text>
				<switch @change="setSeller(user.uid)" style="color: red;" :checked="user.is_seller == 1"></switch>
			</view>
			
			<view style="display: flex;justify-content: space-between;border-bottom: 1px solid #EEEEEE;padding: 15rpx 0;">
				<text style="color: #000000;">设为专家</text>
				<switch @change="setDashen(user.uid)" :checked="user.is_dashen == 1"></switch>
			</view>
			
			<view style="display: flex;justify-content: space-between;border-bottom: 1px solid #EEEEEE;padding: 15rpx 0;align-items: center;">
				<text style="color: #000000;">专家排序</text>
				<input style="width: 60rpx;background-color: #EEEEEE;" type="number" v-model="dashen_order" @blur="setDashenOrder(user.uid)"  />
			</view>
			
			<view style="display: flex;justify-content: space-between;border-bottom: 1px solid #EEEEEE;padding: 15rpx 0;">
				<text style="color: #000000;">设为模拟</text>
				<switch @change="setMoni(user.uid)" :checked="user.is_moni == 1" color="#007AFF"></switch>
			</view>
			
			<view @click="goInvitedUser()" style="display: flex;justify-content: space-between;border-bottom: 1px solid #EEEEEE;padding: 15rpx 0;">
				<text style="color: #000000;">他的邀请</text>
				<text>{{user.children_count}}</text>
			</view>
			
			<view style="display: flex;justify-content: space-between;border-bottom: 1px solid #EEEEEE;padding: 15rpx 0;align-items: center;">
				<text style="color: #000000;">佣金比例</text>
				<view style="display: flex;align-items: center;">
					<input style="width: 60rpx;background-color: #EEEEEE;" type="number" v-model="yj_rate" @blur="setYjRate(user.uid)"  />
					<text>%</text>
				</view>
				
			</view>
			
			<view style="display: flex;justify-content: space-between;">
				<text style="color: #000000;">他的上级</text>
				<text>{{user.parent_user}}</text>
			</view>
			
			<view style="">
				<button @click="deleteUser(user.uid)">删除此人</button> 
			</view>
		</view>
			
	<uni-popup ref="addpop" :mask-click="false" type="bottom" background-color="#fff" style="z-index: 999999;height: 300rpx;position: relative;" >
		<view @click="close()" class="cuIcon-close" style="position: absolute;top: 30rpx;right: 30rpx;"></view>
		<view style="padding: 40rpx 20rpx;">
			<view style="display: flex;justify-content: center;font-size: 34rpx;font-weight: bold;margin-bottom: 10rpx;align-items: center;">
				<text>修改金额</text> <text style="color: grey;font-size: 25rpx;">(正数增加金额,负数减小金额)</text>
			</view>
			<view style="display: flex;align-items: center;border-bottom: 1px solid #EEEEEE;margin: 50rpx 0;padding: 10rpx 0;">
				<text style="margin-right: 50rpx;color: grey;">金额</text>
				<input type="number" v-model="money" style="width: 300rpx;" placeholder="请输入金额,单笔5万" />
			</view>
			<view style="display: flex;align-items: center;border-bottom: 1px solid #EEEEEE;margin: 50rpx 0;padding: 10rpx 0;">
				<text style="margin-right: 50rpx;color:grey">备注</text>
				<input v-model="mark" style="width: 300rpx;" placeholder="请输入备注" />
			</view>
			<view @click="changeMoney()" style="display: flex;justify-content: center;font-size: 28rpx;font-weight: bold;margin-bottom: 10rpx;color: white;background-color: #007AFF;border-radius: 60rpx;padding: 20rpx 0;">
				提交
			</view>
		</view>
	</uni-popup>
	
	<uni-popup ref="subpop" :mask-click="false" type="bottom" background-color="#fff" style="z-index: 999999;" >
		asd
	</uni-popup>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import config from '@/api/interface.js'
	export default{
		name:"userdetail",
		components:{
			barTitle
		},
		data(){
			return {
				mask:false,
				user:null,
				yj_rate:0,
				dashen_order:0,
				is_dashen:0,
				is_seller:0,
				is_moni:0,
				money:0,
				mark:""
			}
		},
		onLoad(option) {
			var data = {"uid":option.uid}
			this.$api.getUserInfo(data).then(res=>{
				this.user = res.data
				this.yj_rate = this.user.yj_rate
				this.dashen_order = this.user.dashen_order
				this.is_dashen =  this.user.is_dashen
				this.is_seller =   this.user.is_seller
				this.is_moni =   this.user.is_moni
			})
		},
		methods:{
			deleteUser(uid){
				uni.showModal({
					title: '提示',
					content: '确定要删除吗？',
					cancelText: '再看看',
					confirmText: '确认',
					success: res => {
						if (res.confirm) {
							this.$api.deleteUser({"uid":uid}).then(res=>{
								uni.navigateBack({
									
								})
							})
						}
					}
				})
				
				
			},
			getSrc(item){
				return config.config.url+item
			},
			close(){
				this.mask = false
				this.$refs.addpop.close('bottom')
			},
			goInvitedUser(){
				uni.navigateTo({
					url:"/pages/user/InvitedUser?uid="+this.user.uid
				})
			},
			goBill(){
				uni.navigateTo({
					url:"/pages/user/bill?uid="+this.user.uid
				})
			},
			goRecord(){
				uni.navigateTo({
					url:"/pages/user/orderRecord?uid="+this.user.uid
				})
			},
			changeMoney(){
				if(this.money){
					if(parseFloat(this.money)!=0){
						var data = {"uid":this.user.uid,"value":this.money,"mark":this.mark}
						this.$api.changeMoney(data).then(res=>{
							
							this.mask = false
							this.money = 0
							this.mark = ""
							this.user.now_money = res.data.now_money
							this.$refs.addpop.close('bottom')
							uni.showToast({
								title:"操作成功"
							})
						})
					}
				}
			},
			openAddPop(){
				 this.mask = true
				 this.$refs.addpop.open('bottom')
			},
			getToatal(){
				
				return parseFloat(Number(this.user.now_money)+Number(this.user.award_amount)).toFixed(2)
			},
			setDashen(uid){
				this.is_dashen = this.is_dashen == 1?0:1
				var data = {"uid":uid,"value":this.is_dashen}
				this.$api.setDashen(data).then(res=>{
					uni.showToast({
						title:"操作成功"
					})
				})
			},
			setMoni(uid){
				this.is_moni = this.is_moni == 1?0:1
				var data = {"uid":uid,"value":this.is_moni}
				this.$api.setMoni(data).then(res=>{
					uni.showToast({
						title:"操作成功"
					})
				})
			},
			setDashenOrder(uid){
				var data = {"uid":uid,"value":this.dashen_order}
				if(this.dashen_order){
					if(parseFloat(this.dashen_order)>0){
						this.$api.setDashenOrder(data).then(res=>{
							uni.showToast({
								title:"操作成功"
							})
						})
					}
				}
				
			},
			setYjRate(uid){
				var data = {"uid":uid,"value":this.yj_rate}
				if(this.yj_rate){
					if(parseFloat(this.yj_rate)>0){
						this.$api.setYjRate(data).then(res=>{
							uni.showToast({
								title:"操作成功"
							})
						})
					}
				}
			},
			setSeller(uid){
				this.is_seller = this.is_seller == 1?0:1
				var data = {"uid":uid,"value":this.is_seller}
				this.$api.setSeller(data).then(res=>{
					uni.showToast({
						title:"操作成功"
					})
				})
			}
		}
		
	}
</script>

<style>
	page{
		background-color: white;
	}
	.uni-switch-input{
		background-color: #007AFF !important;
	}
   uni-switch .uni-switch-input:not([class*="bg-"]){
		background-color: #007AFF !important;
	}
	
</style>
