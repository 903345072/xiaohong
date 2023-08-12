<template>
	<view>
		<view v-if="orderdetail.order_detail_.length == 0" style="display: flex;flex-direction: column;justify-content: center;align-items: center;font-size: 40rpx;color: grey;line-height: 80rpx;">
			<view class="cuIcon-lock" style="font-size: 80rpx;margin-top: 20rpx;"></view>
			<view>开赛后可见</view>
			<view>截止时间 {{orderdetail.stop_time}}</view>
		</view>
		<view v-if="orderdetail.order_detail_.length>0">
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<text>{{orderdetail.en_type}}</text>
				<view style="color: white;">
					<view style="background-color: #6bb4f9;display: inline-block;padding: 4rpx 10rpx;border-radius: 10rpx;">{{orderdetail.num}}注</view>
					<view style="background-color: red;display: inline-block;padding: 4rpx 10rpx;border-radius: 10rpx;margin: 0 6rpx;">{{orderdetail.bei}}倍</view>
					<view style="background-color: #bf8ef0;display: inline-block;padding: 4rpx 10rpx;border-radius: 10rpx;">{{orderdetail.chuan}}</view>
				</view>
			</view>
			
				<view style="display: flex;background-color: #ebebeb;width: 100%;padding: 5rpx 0;margin-top: 15rpx;">
					<view style="width: 25%;text-align: center;color: grey;">场次</view>
					<view style="width: 25%;text-align: center;color: grey;">主队/客队</view>
					<view style="width: 25%;text-align: center;color: grey;">投注内容</view>
					<view style="width: 25%;text-align: center;color: grey;">赛果(全/半)</view>
				</view>
			
				
				<view  v-for="(item,index) in orderdetail.order_detail_" :key="index" :style="{'display': 'flex','width': '100%','margin': '25rpx 0','align-items': 'center','background-color': index%2==0?'white':'#ebebeb','padding': '15rpx 0'}">
					<view style="width: 25%;text-align: center;color: black;">{{item[0]["game_no"]}}</view>
					<view style="width: 25%;text-align: center;color: black;display: flex;flex-direction: column;justify-content: center;">
						<view>{{item[0]["h_name"]}}(<text v-if="item[0]['p_goal']>0" style="color: red;">+{{item[0]['p_goal']}}</text><text v-if="item[0]['p_goal']<0" style="color: green;">{{item[0]["p_goal"]}}</text>)</view>
						<view>vs</view>
						<view>{{item[0]["a_name"]}}</view>
					</view>
					
					<view style=" width: 25%;">
						<view v-for="(item1,index1) in item" :key="index1" style="text-align: center;color: black;display: flex;flex-direction: column;justify-content: center;">
							<view :style="{'color':checkred(item1)?'red':'black'}">{{item1.name}}</view>
							<view>({{item1.pl}})</view>
						
						</view>
					</view>
					
					<view :style="{'width': '25%','text-align': 'center','display': 'flex','flex-direction': 'column','justify-content': 'center'}">
						<view>{{item[0]['qcbf']?item[0]['qcbf']:"__/__"}}</view>
						<view>半:{{item[0]['bcbf']?item[0]['bcbf']:"__/__"}}</view>
					
					</view>
				</view>
				
				
		</view>
	</view>
	
</template>

<script>
	export default{
		name:"footdetail",
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
