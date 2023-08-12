<!-- 在这个文件对每个tab对应的列表进行渲染 -->
<template>
	<view class="content">
		<!-- 这里设置了z-paging加载时禁止自动调用reload方法，自行控制何时reload（懒加载）-->
		<z-paging  ref="paging" v-model="dataList" @query="queryList" use-page-scroll :hide-empty-view="hideEmptyView"
			:refresher-enabled="false" @contentHeightChanged="contentHeightChanged" :auto="false" :auto-clean-list-when-reload="false">
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<view style="width: 100%;background-color: #f8f7ff;color: #0081FF;padding: 0 20rpx;height: 60rpx;line-height: 60rpx;">
				统计:￥{{total}}
			</view>
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
	import config from "@/api/interface.js"
	import gameImg from "@/components/zaiui-common/basics/gameImg.vue"
	export default {
		data() {
			return {
				//v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
				dataList: [],
				height: 0,
				hideEmptyView: true,
				completeFunc: null,
				total:0
			}
		},
		components:{
			gameImg
		},
		props: {
			"range": null,
			"type": null,
			"uid": null,
			"name": null,
			//当前组件的index，也就是当前组件是swiper中的第几个
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
		
			created() {
				this.config = config
			
			
			},
		
		methods: {
			goFlowDetail(id){
				uni.navigateTo({
					url:"/pages/flow/flowDetail?id="+id
				})
			},
			goHomePage(uid){
				uni.navigateTo({
					url:"/pages/flow/homePage?uid="+uid
				})
			},
					
		
			
			
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
			},
			//页面通知当前子组件刷新列表
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
	/* 注意，1、父节点需要固定高度，z-paging的height:100%才会生效 */
	/* 注意，2、请确保z-paging与同级的其他view的总高度不得超过屏幕宽度，以避免超出屏幕高度时页面的滚动与z-paging内部的滚动冲突 */
	.content {
		height: 100%;
	}

	

	
</style>
