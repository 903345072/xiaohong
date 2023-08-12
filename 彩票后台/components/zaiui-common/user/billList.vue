<template>
	<view>
		<view style="width: 100%;background-color: #f8f7ff;color: #0081FF;padding: 0 20rpx;height: 60rpx;line-height: 60rpx;">
			统计:￥{{total}}
		</view>
		<z-paging class="pages" ref="paging" v-model="dataList" @query="queryList" style="margin-top: 60rpx;">
		    <view class="item" v-for="(item,index) in dataList">
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
		</z-paging>
	</view>
</template>

<script>
	export default{
		name:"billList",
		data(){
			return {
				dataList:[],
				total:0
			}
		},
		props:{
			"range":null,
			"type":null,
			"uid":null,
			"name":null
		},
		
		methods:{
			getList(range){
				var data = {"type":this.type,"uid":this.uid,"range":range}
				this.$api.getBillList(data).then(res=>{
					this.total = res.data.total
					this.$refs.paging.complete(res.data.data);
				})
			},
			queryList(pageNo, pageSize){
			
				var data = {"type":this.type,"pageNo":pageNo,"pageSize":pageSize,"uid":this.uid,"range":this.range}
				this.$api.getBillList(data).then(res=>{
					this.total = res.data.total
					this.$refs.paging.complete(res.data.data);
				})
			}
		}
		
	}
</script>

<style>
	
</style>
