<template>
	<view>
	
	<view style="width: 100%;background-color: #f8f7ff;color: #0081FF;padding: 0 20rpx;height: 60rpx;line-height: 60rpx;margin-top: 140rpx;">
		统计:￥{{total}}
	</view>
		    <view class="item" v-for="(item,index) in dataList" style="margin-top: 30rpx;">
		        <view class="item-title" style="padding: 20rpx 20rpx;background-color: white;margin-bottom: 20rpx;" @click="open(item)">
					
					<view style="display: flex;justify-content: space-between;align-items: center;">
						<view style="display: flex;flex-direction: column;">
							<view>
								<text>{{name}}</text>
								<text style="padding: 0 10rpx;">|</text>
								<text>{{item.mark}}</text>
							</view>
							<view style="margin-top: 10rpx;color: #a8a8a8;">
								{{item.time}}
							</view>
						</view>
						<view>
							{{item.number}}
						</view>
					</view>
					
				</view>
		    </view>

	</view>
</template>

<script>
	export default{
		name:"billList",
		data(){
			return {
			
				
			}
		},
		props:{
			"total":null,
			"dataList":null,
			"range":null,
			"type":null,
			"uid":null,
			"name":null
		},
		
		methods:{
			
		}
		
	}
</script>

<style>
	
</style>
