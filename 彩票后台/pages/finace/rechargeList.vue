<template>
	<view>
		<bar-title bgColor="bg-white" :isBack="true" @rightTap="barTitleRightTap">
			<block slot="content">充值总金额</block>
		</bar-title>
		
		<view class="example-body" style="display: flex;align-items: center;">
			<picker @change="bindPickerChange" :value="index" style="flex:1;margin: 0 20rpx;" :range="array">
				<view class="uni-input">{{array[index]}}</view>
			</picker>
				<uni-datetime-picker   v-model="range" @change="change($event)" style="flex:5" type="datetimerange" @maskClick="maskClick" />
				<text style="color: red;flex: 1;">￥{{all}}</text>
		</view>
		<z-paging class="pages" ref="paging" v-model="dataList" @query="queryList">
		    <view class="item" v-for="(item,index) in dataList">
		        <view class="item-title" style="padding: 30rpx 20rpx;background-color: white;margin-bottom: 20rpx;">
					<view style="display: flex;align-items: center;justify-content: space-between;">
						<view>
							<view style="display: flex;align-items: center;">
								<text>{{item.user.nickname}}</text>
								<text>|</text>
								<text>{{item.recharge_type}}</text>
							</view>
							<view style="color: grey;">
								{{item.add_time}}
							</view>
						</view>
						<view>￥{{item.price}}</view>
					</view>
					
					
				</view>
		    </view>
		</z-paging>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	export default{
		name:"rechargeList",
		components: {
			barTitle
		},
		data(){
			return {
				array: [],
				index: 0,
				maskClick:false,
				range: [],
				dataList:[],
				all:0
			}
		},
		
		methods:{
			bindPickerChange(e){
				this.index = e.target.value
				var data = {"range":this.range,"type":this.index}
				this.$api.getRechargeList(data).then(res=>{
					this.all = res.data.all
					this.$refs.paging.complete(res.data.data);
				})
			},
			change(e){
				this.range = e
				var data = {"range":this.range,"type":this.index}
				this.$api.getRechargeList(data).then(res=>{
					this.all = res.data.all
					this.$refs.paging.complete(res.data.data);
				})
			},
			queryList(pageNo, pageSize){
			
				
				this.$api.getTimeArea().then(res=>{
					this.range.push(res.data[0])
					this.range.push(res.data[1])
					var data = {"pageNo":pageNo,"pageSize":pageSize,"range":this.range,"type":this.index}
					this.$api.getRechargeList(data).then(res=>{
					    this.array = res.data.pay_type
						this.all = res.data.all
					  
						this.$refs.paging.complete(res.data.data);
					})
				})
				
			}
		}
		
	}
</script>

<style>
	.pages{
		/* #ifndef MP */
		margin-top: calc(var(--status-bar-height) + 181rpx);
		/* #endif */
		
		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 241rpx);
		/* #endif */
	}
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
