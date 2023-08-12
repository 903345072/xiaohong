<template>
	<view class="content" >

	   <scroll-view>
			<view class="item" v-for="(item,index) in dataList" >
				<view class="item-title" style="padding: 20rpx 20rpx;background-color: white;margin-bottom: 20rpx;"
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
									<!-- <view style="color: grey;">预计回报{{(item.expect_max_award/item.amount).toFixed(1)}}倍</view> -->
								</view>
							</view>
							<view style="display: flex;flex-direction: column;align-items: center;">
								<view style="color: grey;">截止时间</view>
								<view style="color: red;">{{item.grouptime_h}}:{{item.grouptime_m}}:{{item.grouptime_s}}
								</view>
							</view>
						</view>
						<view style="margin: 20rpx 0;">
							{{item.plan_desc.length>20?item.plan_desc.substr(0,20)+'...':item.plan_desc}}
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
		
	   </scroll-view>
	</view>
</template>

<script>
	import config from "@/api/interface.js"
	import gameImg from "@/components/zaiui-common/basics/gameImg.vue"

	export default {
	
		name: "flowList",
		components:{
			gameImg
		},
		
		onReachBottom(){
				console.log('已触底');
		    },
		
		data() {
			return {
	
	            hava:true, 
				total: 0,
				config: "",
				timer: null, //重复执
				dataList: [],
				pageNo:1,
				pageSize:10,
				pageg:1
			
			
			
			}
		},
		props: {
		    
			"range": null,
			"type": null,
			"uid": null,
			"name": null,
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
		
		created() {
			this.config = config
		
			
			this.countdown();
		},
	    
		methods: {
			changeFirst(v){
				this.first = v
			},
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
		refresh() {
			this.pageNo = 1
			this.hava = true
			this.getList(0)
			},

			getList(flag) {
				if(this.hava == false){
					return
				}
				if(flag == 1){
					this.pageNo++
				}else{
					this.pageNo =1
				}
				var data = {
					"type": this.type,
					"pageNo": this.pageNo,
					"pageSize": this.pageSize,
					"uid": this.uid,
					"range": this.range
				}
				this.$dashen.getPageList(data).then(res => {
					this.pageHeight = uni.getSystemInfoSync().windowHeight;
					if(flag == 1){
						var arr = this.dataList.concat(res.data.data)
						this.dataList = arr
						if(res.data.data.length==0){
							this.hava = false
						}
					}else{
						this.dataList = res.data.data
					} 
				
						this.$nextTick(() => {
							const query = uni.createSelectorQuery();
							query.select('.item').boundingClientRect(data => {
								var base_height = 160
								
								if(data != null){
									base_height = data.height        
								}
								if(this.dataList.length > 0){
									var px = (base_height*(this.dataList.length+1)+100)+(this.pageNo*80)
									var rpx =  px *(750/ wx.getSystemInfoSync().windowWidth)
								}else{
									rpx = 800
								}
							console.log(rpx)
							
								 this.$emit('heightChanged',rpx);
										
							}).exec();
						})
					
					

				})
				
			},

			queryList(pageNo, pageSize) {

				var data = {
					"type": this.type,
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
		loadSuccess(paging){
			
			var data = {
				"type": this.type,
				"pageNo": paging.page,
				"pageSize": paging.size,
				"uid": this.uid,
				"range": this.range
			}
			this.$dashen.getPageList(data).then(res => {
			     this.dataList = res.data.data
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
			
			}
		}

	}
</script>

<style>
.content {
		height: 100%;
	}
</style>
