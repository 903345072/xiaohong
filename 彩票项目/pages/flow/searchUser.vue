<template>
	<view>
		<bar-title bgColor="bg-white" isBack :opacity="true">
			<block slot="content">他的主页</block>
		</bar-title>
		<view style="background-color: white;display: flex;position: fixed;top: 0;left: 0;right: 0;padding: 20rpx 20rpx;align-items: center;z-index: 9999;">
			<view @click="goBack()" class="cuIcon-close" style="color: grey;font-size: 40rpx;margin-right: 20rpx;"></view>
			<view style="position: relative;flex: 5;">
				<view class="cuIcon-search" style="position: absolute;left: 10rpx;top: 15rpx;"></view>
				<input @input="input" :focus="true" style="width:100% ;background-color: #f3f3f3;padding-left: 55rpx;height: 60rpx;line-height: 60rpx;" placeholder="搜索专家" />
			</view>
			
		</view>
		<z-paging class="pages" ref="paging" v-model="data" @query="queryList" style="margin-top: 120rpx;">
			<view class="item" v-for="(item,index) in data">
				<view class="item-title" style="padding: 20rpx 20rpx;background-color: white;margin-bottom: 20rpx;"
					@click="goHomePage(item.uid)">
		
					<view style="display: flex;align-items: center;">
						<image style="width: 90rpx;height: 90rpx;border-radius: 20rpx;" :src="config.config.url+item.avatar"></image>
						<view style="margin-left: 20rpx;">{{item.real_name}}</view>
					</view>
		
				</view>
			</view>
		</z-paging>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import config from "@/api/interface.js"
	export default{
		name:"searchUser",
		components:{
			barTitle
		},
		data(){
			return {
				data:[],
				config:""
			}
		},
		created() {
			this.config = config
		},
		methods:{
			goHomePage(uid){
				uni.navigateTo({
					url:"/pages/flow/homePage?uid="+uid
				})
			},
			goBack(){
				uni.navigateBack()
			},
			input(e){
				var d = e.detail.value
				if(!d){
					this.$api.getUserList(data).then(res => {
								
						this.$refs.paging.complete([]);
					
					})
					return
				}
				var data = {
					"name": d,
				}
				this.$api.getUserList(data).then(res => {
							
					this.$refs.paging.complete(res.data);
				
				})
			},
			queryList(pageNo, pageSize) {
			
				var data = {
					"name": "asdsadsadsadsaasd",
					"pageNo": pageNo,
					"pageSize": pageSize,
				}
				this.$api.getUserList(data).then(res => {
			
					this.$refs.paging.complete(res.data);
				
				})
			
			}
		}
		
	}
</script>

<style>
</style>
