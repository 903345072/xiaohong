<template>
	<view>
		
		
		
		<z-paging class="pages" ref="paging" v-model="dataList" @query="queryList">
		    <view class="item" v-for="(item,index) in dataList">
		        <view class="item-title" style="padding: 30rpx 20rpx;background-color: white;margin-bottom: 20rpx;">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view>
							<view style="display: flex;align-items: center;">
								<text>{{item.user.nickname}}</text>
								<text>|</text>
								<text>扣款</text>
							</view>
							<view style="color: grey;">
								{{item.time}}
							</view>
						</view>
						<view>￥{{item.number}}</view>
					</view>
					
					
				</view>
		    </view>
		</z-paging>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	export default{
		name:"subList",
		components: {
			barTitle
		},
		props:{
			range:null
		},
		data(){
			return {
				array: [],
				index: 0,
				maskClick:false,
		
				dataList:[],
				all:0
			}
		},
	
		methods:{
		
			getList(e){
				this.range = e
				var data = {"range":this.range,"type":0}
				this.$api.getSystemList(data).then(res=>{
					this.all = res.data.all
					this.$emit("updateBetAmount",this.all)
					this.$refs.paging.complete(res.data.data);
				})
			},
			queryList(pageNo, pageSize){
				var that = this
				
						
						var data = {"pageNo":pageNo,"pageSize":pageSize,"range":this.range,"type":0}
						this.$api.getSystemList(data).then(res=>{
						    this.array = res.data.pay_type
							this.all = res.data.all
							this.$emit("updateBetAmount",this.all)
							this.$emit("updateRange",that.range)
							this.$refs.paging.complete(res.data.data);
						})
						
				
			
					
				
				
			}
		}
		
	}
</script>

<style>
	
	 picker {
	   	font-size: 20rpx;
	   	height: 80rpx;
	   	/* background: #F2F2FC url(../../static/images/icon_sanjiao.png) 93% center no-repeat; */
	   	background-color: #f2f2fc;
	   	background-size: 32rpx 22rpx;
	   	padding: 0 20rpx;
	   	border-radius: 10rpx;
	
	   	line-height: 80rpx;
	   }
	
</style>
