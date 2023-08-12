<template>
	<view>
		
		
	
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<text>{{orderdetail.en_type}}</text>
				<view v-if="orderdetail.mode != 4" style="color: white;">
					<view style="background-color: #6bb4f9;display: inline-block;padding: 4rpx 10rpx;border-radius: 10rpx;">{{orderdetail.num}}注</view>
					<view style="background-color: red;display: inline-block;padding: 4rpx 10rpx;border-radius: 10rpx;margin: 0 6rpx;">{{orderdetail.bei}}倍</view>
				
				</view>
			</view>
			
				<view style="display: flex;background-color: #ebebeb;width: 100%;padding: 5rpx 0;margin-top: 15rpx;">
					<view style="width: 33%;text-align: center;color: grey;">场次</view>
					<view style="width: 33%;text-align: center;color: grey;">队伍</view>
		
					<view style="width: 33%;text-align: center;color: grey;">赛果</view>
				</view>
			
				
				<view  v-for="(item,index) in orderdetail.order_details[0]['bet_content']" :key="index" :style="{'display': 'flex','width': '100%','margin': '25rpx 0','align-items': 'center','background-color': index%2==0?'white':'#ebebeb','padding': '15rpx 0'}">
				<view style="width: 33%;text-align: center;color: black;">{{index}}</view>
					<view v-if="orderdetail.type=='gj'" style="width: 33%;text-align: center;color: black;display: flex;flex-direction: column;justify-content: center;">
					
						<view :style="{'color':checkred(item)?'red':'black'}">{{item["h_name"]}}({{item.pl}})</view>
					</view>
					<view v-if="orderdetail.type=='gyj'" style="width:33%;text-align: center;color: black;display: flex;flex-direction: column;justify-content: center;">
						<view>{{item["a_name"]}}</view>
						<view style="margin-left: 80rpx;">vs({{item.pl}})</view>
						<view>{{item["h_name"]}}</view>
					</view>
				
					
					<view :style="{'width': '33%','text-align': 'center','color': 'black','display': 'flex','flex-direction': 'column','justify-content': 'center'}">
						<view>{{item['qcbf']?item['qcbf']:"暂无"}}</view>
					</view>
				</view>
		
			
	</view>
</template>

<script>
	export default{
		name:"guanyajun",
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
