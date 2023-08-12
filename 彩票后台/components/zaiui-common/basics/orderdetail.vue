<template>
	<view>
		<view style="position: relative;left: 0;right: 0;height: 400rpx;background-image: linear-gradient(90deg, #6bb4f9, #f70af4);">
			<view v-if="orderdetail.flag==0" @click="close()" class="cuIcon-close"
							style="position: absolute;left: 30rpx; top:30rpx;font-size: 40rpx;color: white;"></view>
						<view v-if="orderdetail.flag==1" @click="goBack()" class="cuIcon-back"
							style="position: absolute;left: 30rpx; top:30rpx;font-size: 40rpx;color: white;"></view>
		        <view style="text-align: center;padding: 30rpx 0;font-size: 35rpx;color: white;">订单详情</view>
				<view style="display: flex;align-items: center;justify-content: space-around;width: 100%;color: white;">
								<view
									style="display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 50rpx;">
									<view style="font-size: 35rpx;">{{orderdetail.award_money>0?orderdetail.award_money:'暂无'}}</view>
									<view style="font-size: 28rpx;">中奖金额</view>
								</view>
				
								<view
									style="display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 50rpx;">
									<view style="font-size: 35rpx;">{{orderdetail.en_state}}</view>
									<view style="font-size: 28rpx;">订单状态</view>
								</view>
				
								<view
									style="display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 50rpx;">
									<view style="font-size: 35rpx;">{{orderdetail.amount}}</view>
									<view style="font-size: 28rpx;">投注金额</view>
								</view>
				 </view>
		</view>
		
		<view style="display: flex;flex-direction: column;align-items: center;margin-top: -150rpx;z-index: 999999999;position: relative;">
			<view
							style="background-color: white;padding: 20rpx 20rpx;width: 90%;border-radius: 20rpx;">
							<footdetail v-if="orderdetail.type=='foot'" :orderdetail="orderdetail"></footdetail>
							<basketdetail v-if="orderdetail.type=='basket'" :orderdetail="orderdetail"></basketdetail>
							<pl3detail v-if="orderdetail.type=='pl3'" :orderdetail="orderdetail"></pl3detail>
							<bddetail v-if="orderdetail.type=='bd'" :orderdetail="orderdetail"></bddetail>
							<sfcdetail v-if="orderdetail.type=='sfc' || orderdetail.type=='renjiu'" :orderdetail="orderdetail"></sfcdetail>
							<guanyajundetail v-if="orderdetail.type=='gj' || orderdetail.type=='gyj'" :orderdetail="orderdetail"></guanyajundetail>
			</view>
			
			<view v-if="orderdetail.mode == 4">
				<view style="width: 100%;display: flex;justify-content: center;">
					<view style="border: 1px solid grey;display: flex;align-items: center;justify-content: center;width: 680rpx;">
						<view style="width: 160rpx;border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;">过关</view>
						<view style="width: 260rpx;border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;">单注组合</view>
						<view style="width: 260rpx;text-align: center;height: 60rpx;line-height: 60rpx;">注数分布</view>
					
					</view>
				</view>
				<view style="width: 100%;text-align: center;display: flex;align-items: center;flex-direction: column;margin-bottom: 20rpx;">
					<view style="width: 680rpx;border: 1px solid grey;border-top: none;border-bottom: none;">
						<view v-for="(item,index) in orderdetail.dd" :key="index" style="border-bottom: 1px solid grey;" >
							
							<view style="display: flex;">
								<view style="width: 160rpx;height: 120rpx;line-height: 120rpx;">{{item.bet_content.length!=1?item.bet_content.length+"串1":"单关"}}</view>
								<view style="width: 260rpx;height: 120rpx;display: flex;flex-direction: column;justify-content: space-around;align-items: center;border-left: 1px solid grey;border-right: 1px solid grey;">
									<view  style="font-size: 22rpx;" v-for="(item1,index1) in item.bet_content" :key="index1" v-if="index1<2">
										{{item1["h_name"]}}|{{item1["name"]}}({{item1["pl"]}})
									</view>
									<view class="cuIcon-unfold" @click="changeDisplay(index)">
										
									</view>
								</view>
								<view style="width: 260rpx;height: 120rpx;line-height: 120rpx;display: flex;align-items: center;text-align: center;justify-content: center;">
									{{item["num"]}}
								</view>
								
							</view>
							
						<view :ref="index" style="display: none;">
							<view style="border: 1px solid grey;display: flex;align-items: center;justify-content: center;background-color: #f4ede4;font-weight: bold;">
								<view style="border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;flex:1">场次</view>
								<view style="border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;flex:1">主队</view>
								<view style="border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;flex:1">客队</view>
								<view style="text-align: center;height: 60rpx;line-height: 60rpx;flex:1">投注内容</view>
							</view>
							
							<view v-for="(item1,index1) in item.bet_content" :key="index1" style="border: 1px solid grey;display: flex;align-items: center;justify-content: center;background-color: #f4ede4;">
								<view style="border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;flex:1">{{item1["week"]}}</view>
								<view style="border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;flex:1">{{item1["h_name"]}}</view>
								<view style="border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;flex:1">{{item1["a_name"]}}</view>
								<view style="text-align: center;height: 60rpx;line-height: 60rpx;flex:1">{{item1["name"]}}({{item1["pl"]}})</view>
							</view>
						</view>
								
						
						
						</view>
					</view>
					
				</view>
			</view>
			
			<view
							style="background-color: white;padding: 20rpx 20rpx;width: 90%;border-radius: 20rpx;color: grey;line-height: 60rpx;margin: 30rpx 0;">
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<text style="color: #000000;font-size: 32rpx;">订单信息</text>
			
							</view>
							<view v-if="orderdetail.puser" style="display: flex;align-items: center;justify-content: space-between;">
								<view>发单人</view>
								<view style="color: #323232;">{{orderdetail.puser.user.real_name}}</view>
							</view>
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<view>订单编号</view>
								<view style="color: #323232;">{{orderdetail.order_no}}</view>
							</view>
			
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<view>付款时间</view>
								<view style="color: #323232;">{{orderdetail.order_time}}</view>
							</view>
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<view>出票时间</view>
								<view style="color: #323232;">{{orderdetail.tick_time}}</view>
			
							</view>
			
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<view>截止时间{{scrollH}}</view>
								<view style="color: #323232;">{{orderdetail.stop_time}}</view>
							</view>
			
			
						</view>
						
						<view
										style="background-color: white;padding: 20rpx 20rpx;width: 90%;border-radius: 20rpx;color: grey;line-height: 60rpx;position: relative;margin-bottom: 140rpx;">
										<view style="display: flex;align-items: center;justify-content: space-between;">
											<text style="color: #000000;font-size: 32rpx;">彩票照片</text>
						
										</view>
										<view>
											<image :src="config.config.url+orderdetail.order_pic"></image>
										</view>
						
						
						
									</view>
			
		</view>
	</view>
	
</template>

<script>
	import footdetail from '@/components/zaiui-common/basics/footdetail';
	import basketdetail from '@/components/zaiui-common/basics/basketdetail';
	import pl3detail from '@/components/zaiui-common/basics/pl3detail';
	import bddetail from '@/components/zaiui-common/basics/bddetail';
	import sfcdetail from '@/components/zaiui-common/basics/sfcdetail';
	import config from '@/api/interface.js'
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import guanyajundetail from '@/components/zaiui-common/basics/guanyajun';
	export default {
		name: "orderdetail",
		components: {
			footdetail,
			basketdetail,
			barTitle,
			pl3detail,
			bddetail,
			sfcdetail,
			guanyajundetail
		},
		computed: {
			scrollH: function() {
				let sys = uni.getSystemInfoSync();
				let winWidth = sys.windowWidth;
				let winrate = 750 / winWidth;
				let winHeight = parseInt(sys.windowHeight * winrate)

				return winHeight

			}
		},

		data() {
			return {
				order: {},
				config: "",
				pageHeight: 0

			}
		},
		props: {
			orderdetail: null
		},
		created() {
			this.config = config
		},
		onLoad(option) {

		},
		methods: {
			changeDisplay(str){
			
				this.$refs[str][0].$el.style.display = this.$refs[str][0].$el.style.display != "none"?"none":"block"
				//this.$refs.str.$el.style.display = 'none'
			},
			close() {
				this.$emit("closeWindow")
			},
			goBack() {
				uni.navigateTo({
					url: "/pages/app/index"
				})
			}
		}
	}
</script>