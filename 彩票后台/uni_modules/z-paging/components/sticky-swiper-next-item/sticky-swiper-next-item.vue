<!-- 在这个文件对每个tab对应的列表进行渲染 -->
<template>
	<view class="content">
		<!-- 这里设置了z-paging加载时禁止自动调用reload方法，自行控制何时reload（懒加载）-->
		<z-paging  ref="paging" v-model="dataList" @query="queryList" use-page-scroll :hide-empty-view="hideEmptyView"
			:refresher-enabled="false" @contentHeightChanged="contentHeightChanged" :auto="false" :auto-clean-list-when-reload="false">
			<!-- 如果希望其他view跟着页面滚动，可以放在z-paging标签内 -->
			<view class="item" v-for="(item,index) in dataList">
				<view class="item-title" style="padding: 20rpx 20rpx;background-color: white;margin-bottom: 20rpx;width:100%"
					@click="goFlowDetail(item.id)">
			
					<view>
						<view style="display: flex;justify-content: space-between;align-items: center;">
							<view style="display: flex;align-items: center;">
								<view @click.stop="goHomePage(item.uid)">
									<image style="width: 60rpx;height: 60rpx;border-radius: 60rpx;"
										:src="config.config.url+item.user.avatar"></image>
								</view>
								<view style="display: flex;flex-direction: column;margin-left: 10rpx;">
									<view>{{item.user.real_name}}</view>
								</view>
							</view>
							<view style="display: flex;flex-direction: column;align-items: center;">
								<view style="color: grey;">截止时间</view>
								<view style="color: red;">{{item.grouptime_h}}:{{item.grouptime_m}}:{{item.grouptime_s}}
								</view>
							</view>
						</view>
						<view style="margin: 20rpx 0;">
							{{item.plan_desc}}
						</view>
						<view style="display: flex;align-items: center;">
							<view
								style="display: flex;align-items: center;background-color: #f9f9f9;padding: 20rpx 20rpx;border-radius: 20rpx;width: 80%;justify-content: space-around;">
								<view
									style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
									<gameImg :type="item.type" :width="30" :height="30"></gameImg>
									<view>
										{{item.en_type}}
									</view>
								</view>
								<view style="border-right: 1px solid #d6d6d6;height: 50rpx;width: 1px;"></view>
								<view style="display: flex;flex-direction: column;align-items: center;">
									<view>自购</view>
									<view style="color: red;">{{item.amount}}</view>
								</view>
								<view style="border-right: 1px solid #d6d6d6;height: 50rpx;width: 1px;"></view>
								<view style="display: flex;flex-direction: column;align-items: center;">
									<view>人气</view>
									<view style="color: red;">{{item.flow_count}}</view>
								</view>
							</view>
							<view style="width: 20%;text-align: center;background: linear-gradient(93deg,#31ceff,#4e86ff 30%,#f72bfe);padding: 15rpx 30rpx;margin:0 20rpx;color: white;border-radius: 20rpx;">
								<text>跟单</text>
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
	import gameImg from "@/components/zaiui-common/basics/gameImg.vue"
	export default {
		data() {
			return {
				//v-model绑定的这个变量不要在分页请求结束中自己赋值！！！
				dataList: [],
				height: 0,
				hideEmptyView: true,
				completeFunc: null
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
			
				this.countdown();
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
					
			countdown() {
				let that = this;
				let timer = setInterval(function(){
					
					for (let i = 0; i < that.dataList.length; i++) {
						that.dataList[i].stime -= 1
						let t = that.dataList[i].stime
						if (t > 0) {
							let day = Math.floor(t / 86400)
							let hour = Math.floor((t / 3600) % 24) + day * 24
							let min = Math.floor((t / 60) % 60)
							let sec = Math.floor((t / 1) % 60)
							day = day < 10 ? '0' + day : day
							hour = hour < 10 ? '0' + hour : hour
							min = min < 10 ? '0' + min : min
							sec = sec < 10 ? '0' + sec : sec
							that.dataList[i].grouptime_d = day;
							that.dataList[i].grouptime_h = hour;
							that.dataList[i].grouptime_m = min;
							that.dataList[i].grouptime_s = sec;
						} else {
							// 进行判断 如果数据内所有的倒计时已经结束，那么结束定时器， 如果没有那么继续执行定时器
							let flag = that.dataList.every((val, ind) => val.stime <= 0);
							if (flag) {
								clearInterval(timer);
							}
					
							that.dataList[i].grouptime_d = 0;
							that.dataList[i].grouptime_h = 0;
							that.dataList[i].grouptime_m = 0;
							that.dataList[i].grouptime_s = 0;
							that.dataList.splice(i, 1)
						}
					}
				}, 1000);
			},
			
			
			getList(range) {
				var data = {
					"type": this.tabIndex,
					"uid": this.uid,
					"range": range
				}
				this.$dashen.getPageList(data).then(res => {
			
					this.$refs.paging.complete(res.data.data);
				})
			},
			queryList(pageNo, pageSize) {
				//组件加载时会自动触发此方法，因此默认页面加载时会自动触发，无需手动调用
				//这里的pageNo和pageSize会自动计算好，直接传给服务器即可
				//模拟请求服务器获取分页数据，请替换成自己的网络请求
				var data = {
					"type": this.tabIndex,
					"pageNo": pageNo,
					"pageSize": pageSize,
					"uid": this.uid,
					"range": this.range
				}
				this.$dashen.getPageList(data).then(res => {
				
					this.$refs.paging.complete(res.data.data);
					this.hideEmptyView = false;
					if (this.completeFunc) {
						this.completeFunc();
					}
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
