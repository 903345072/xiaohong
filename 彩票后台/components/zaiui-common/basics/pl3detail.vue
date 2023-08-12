<template>
	<view>
		
		
		<view >
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<text>{{orderdetail.en_type}}</text>
				<view v-if="orderdetail.mode != 4" style="color: white;">
					<view style="background-color: #6bb4f9;display: inline-block;padding: 4rpx 10rpx;border-radius: 10rpx;">{{orderdetail.num}}注</view>
					<view style="background-color: red;display: inline-block;padding: 4rpx 10rpx;border-radius: 10rpx;margin: 0 6rpx;">{{orderdetail.bei}}倍</view>
					
				</view>
			</view>
			
				<view style="display: flex;background-color: #ebebeb;width: 100%;padding: 5rpx 0;margin-top: 15rpx;">
					<view style="width: 23%;text-align: center;color: grey;">期号</view>
			
					<view style="width: 53%;text-align: center;color: grey;">投注内容</view>
					<view style="width: 28%;text-align: center;color: grey;">投注方式</view>
					<view style="width: 28%;text-align: center;color: grey;">赛果</view>
				</view>
			
				
				<view  :style="{'display': 'flex','width': '100%','margin': '25rpx 0','align-items': 'center','background-color': '#ebebeb','padding': '15rpx 0'}">
					<view style="width: 28%;text-align: center;color: black;">{{orderdetail.qh}}</view>
					
					
					<view style=" width: 53%;font-size: 24rpx;">
						<view :style="{'text-align': 'center','display': 'flex','flex-direction': 'column','justify-content': 'center'}">
							<!-- <view :style="{'color': checkred(item1)?'red':'black',}">{{item1.name}} <text style="color: #007AFF;"> {{item1.met.substr(0,1) == 3?'('+item[0]['dxf']+')':''}}</text></view> -->
							<view :style="{'color': orderdetail.order_details[0]['bet_content']['ret'] == 1?'red':'black',}">{{orderdetail.order_details[0]['bet_content']["content"]}}</view>
						</view>
					</view>
					<view style="width: 28%;text-align: center;color: black;">
						<text v-if="orderdetail.pl_type==1">直选</text>
						<text v-if="orderdetail.pl_type==2">组三</text>
						<text v-if="orderdetail.pl_type==3">组六</text>
					</view>
					<view :style="{'width': '33%','text-align': 'center','color': 'black','display': 'flex','flex-direction': 'column','justify-content': 'center'}">
						<view>{{orderdetail.order_details[0]['bet_content']["caiguo"]}}</view>
					</view>
				</view>
		</view>	
			
	</view>
</template>

<script>
	export default{
		name:"pl3detail",
		props:{
			orderdetail:null
		},
		methods:{
			checkred(item){
				if(item["ret"] == '1'){
					return true
				}else{
					return false
				}
			}
		}
	}
</script>

<style>
</style>
