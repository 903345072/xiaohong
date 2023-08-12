<template>
	<view>
		
		<z-paging style="margin-top: 30rpx;"  ref="paging" v-model="dataList" @query="queryList" use-page-scroll :hide-empty-view="hideEmptyView"
			:refresher-enabled="false" @contentHeightChanged="contentHeightChanged" :auto="false" :auto-clean-list-when-reload="false">
			<view style="width: 100%;text-align: center;">
				<view style="display: flex;align-items: center;">
					<view style="flex: 1;">用户名</view>
					<view style="flex: 1;">注册时间</view>
					<view style="flex: 1;">详情</view>
				</view>
			</view>
		    <view class="item" v-for="(item,index) in dataList">
		        <view class="item-title" style="padding: 20rpx 20rpx;background-color: white;margin-bottom: 20rpx;" >
					
					<view style="width: 100%;text-align: center;">
						<view style="display: flex;align-items: center;">
							<view style="flex:1;display: flex;align-items: center;">
								<view><image style="width: 60rpx;height: 60rpx;" :src="getSrc(item.avatar)"></image></view>
								<view style="display: flex;flex-direction: column;justify-content: center;">
									<view>{{item.nickname}}</view>
									<view>{{item.phone}}</view>
								</view>
							</view>
							<view style="flex:1">
								<view>{{item.bind_time}}</view>
							</view>
							<view @click="goOrderRecord(item.uid)" style="flex:1;color: #0081FF;">
								查看
							</view>
						</view>
					</view>
					
				</view>
		    </view>
		</z-paging>
	</view>
</template>

<script>
	import config from "@/api/interface.js"
	export default{
		name:"registerList",
		data(){
			return {
				dataList:[],
				total:0,
				hideEmptyView: true,
				completeFunc: null,
			
			}
		},
		props:{
			"range":null,
			"type":null,
			"uid":null,
			"name":null,
			"user":"",
			tabIndex: {
				type: Number,
				default: function(){
					return 0
				}
			},
			//当前swiper切换到第几个index
			currentIndex: {
				type: Number,
				default: function(){
					return 0
				}
			}
		},
		watch: {
			currentIndex: {
				handler(newVal) {
					if (newVal === this.tabIndex) {
						//懒加载，当滑动到当前的item时，才去加载
						setTimeout(() => {
							this.$refs.paging.reload();
						}, 50);
					}
				},
				immediate: true
			}
		},
		methods:{
			getSrc(item){
				return config.config.url+item
			},
			goOrderRecord(uid){
				uni.navigateTo({
					url:"/pages/user/orderRecord?uid="+uid
				})
			},
			getList(range,user){
				var data = {"type":this.type,"uid":this.uid,"range":range,"user":user}
				this.$api.registerList(data).then(res=>{
					this.total = res.data.total
					this.$refs.paging.complete(res.data.data);
					this.$emit("updateCount",res.data)
				})
			},
			queryList(pageNo, pageSize){
				var data = {"type":this.type,"pageNo":pageNo,"pageSize":pageSize,"uid":this.uid,"range":this.range,"user":this.user}
				this.$api.registerList(data).then(res=>{
					this.total = res.data.total
					
					this.$refs.paging.complete(res.data.data);
				
						this.$emit("updateCount",res.data)
				})
			},
			reload(completeFunc) {
				//先把父组件下拉刷新的回调函数存起来
				this.completeFunc = completeFunc;
				//调用z-paging的reload方法
				this.$refs.paging.reload();
			},
			//当列表高度改变时，通知页面的swiper同步更改高度
			contentHeightChanged(height){
				const finalHeight = this.dataList.length ? height : 0;
				this.$emit('heightChanged',finalHeight);
			},
			//页面通知当前子组件加载更多数据
			doLoadMore(){
				this.$refs.paging.doLoadMore();
			},
			//页面通知当前子组件清除数据
			clear(){
				this.$refs.paging.clear();
				this.hideEmptyView = true;
			}
		}
		
	}
</script>

<style>
	
</style>
