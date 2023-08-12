<template>
	<view class="zaiui-find-box" :class="show?'show':''">
		<!--分类标题栏-->
		<view class="bg-white zaiui-title-tab-box" style="border-bottom: 1px solid #EEEEEE;">
			
			<!--小程序端的标题-->
			<!-- #ifdef MP -->
			<view class="text-center text-black zaiui-small-routine-title">发现</view>
			<!-- #endif -->
			
			<view class="flex flex-wrap" style="display: flex;justify-content: center;height: 60rpx;line-height: 60rpx;position: relative;">
			       <text>用户</text>
				   <view @click="()=>{hava=true;getList(0)}" class="cuIcon-refresh" style="position: absolute;right: 10rpx;font-size: 30rpx;color: #000000;"></view>
			</view>
		</view>
		
		<!--占位的-->
		<view class="zaiui-seat-height"/>
		
		<!-- 搜索框 -->
			<view style="width: 100%;display: flex;justify-content: center;">
				<view class="search-bar" >
								 <view class="search-bar-box" >
								<view class="cuIcon-search search-span"></view>
								 <input  @input="input()" v-model="username"  placeholder="搜索" class="search-text" maxlength="10" focus/>
								 </view>
				</view>
			</view>
		
		    <view style="margin: 20rpx 20rpx;color: #007AFF;">销售</view>
		    <view class="item" v-for="(item,index) in sellerList" >
		        <view class="item-title" style="padding: 30rpx 20rpx;background-color: white;margin-bottom: 20rpx;" @click="">
		    		<view style="display: flex;align-items: center;justify-content: space-between;" @click="goUserDetail(item.uid)">
		    			<view style="display: flex;align-items: center;">
		    				<view style="display: flex;align-items: center;margin-right: 20rpx;">
		    					<image style="width: 60rpx;height: 60rpx;" class="image_"  :src="getSrc(item.avatar)"></image>
		    				
		    					<text style="font-size: 24rpx;margin-top: 10rpx;color: #000000;font-weight: bold;margin-left: 20rpx;">{{item.nickname}}</text>
		    				</view>
		    				
		    			</view>
		    			<view style="display: flex;flex-direction: column;">
		    				<view>
		    					{{getTotal(item.now_money,item.award_amount)}}.00元
		    				</view>
		    				<view v-if="item.fives.length>0" style="display: flex;justify-content: flex-end;">
		    					<view v-for="(items,index1) in item.fives" >
		    						<view v-if="items == 0" style="background-color: #000000;width: 20rpx;height: 20rpx;border-radius: 20rpx;margin-left: 10rpx;"></view>
		    						<view v-if="items == 1" style="background-color: red;width: 20rpx;height: 20rpx;border-radius: 20rpx;margin-left: 10rpx;"></view>
		    					</view>
		    				</view>
		    				
		    				<view v-if="item.fives.length==0" style="display: flex;justify-content: flex-end;">
		    					暂无数据
		    				</view>
		    				
		    			</view>
		    		</view>
		    		
		    		
		    	</view>
		    </view>
		
		    <view style="margin: 20rpx 20rpx;color: #007AFF;">所有用户</view>
		    <view class="item" v-for="(item,index) in dataList" :key="index">
		        <view class="item-title" style="padding: 30rpx 20rpx;background-color: white;margin-bottom: 20rpx;" @click="">
					<view style="display: flex;align-items: center;justify-content: space-between;" @click="goUserDetail(item.uid)">
						<view style="display: flex;align-items: center;">
							<view style="display: flex;align-items: center;margin-right: 20rpx;">
								<image style="width: 60rpx;height: 60rpx;" class="image_"  :src="getSrc(item.avatar)"></image>
							
								<text style="font-size: 24rpx;margin-top: 10rpx;color: #000000;font-weight: bold;margin-left: 20rpx;">{{item.nickname}}</text>
							</view>
							
						</view>
						<view style="display: flex;flex-direction: column;">
							<view>
								{{getTotal(item.now_money,item.award_amount)}}.00元
							</view>
							<view v-if="item.fives.length>0" style="display: flex;justify-content: flex-end;">
								<view v-for="(items,index1) in item.fives" :key="index1" >
									<view v-if="items == 0" style="background-color: #000000;width: 20rpx;height: 20rpx;border-radius: 20rpx;margin-left: 10rpx;"></view>
									<view v-if="items == 1" style="background-color: red;width: 20rpx;height: 20rpx;border-radius: 20rpx;margin-left: 10rpx;"></view>
								</view>
							</view>
							
							<view v-if="item.fives.length==0" style="display: flex;justify-content: flex-end;">
								暂无数据
							</view>
							
						</view>
					</view>
					
					
				</view>
		    </view>
	
		<view style="width: 100%;height: 200rpx;"></view>
		
		
		
		<!--中间内容区域-->
	
		
	</view>
</template>

<script>
	import trendsList from '@/components/zaiui-common/list/trends-list';
	import hotTopicList from '@/components/zaiui-common/list/hot-topic-list';
	import recommendScrollList from '@/components/zaiui-common/list/recommend-scroll-list';
	import topicGridList from '@/components/zaiui-common/list/topic-grid-list';
	import topicCardList from '@/components/zaiui-common/list/topic-card-list';
	
	//======================================================================
	import _find_data from '@/static/zaiui/data/find.js';	//虚拟数据
	import _tool from '@/static/zaiui/util/tools.js';
	import config from '@/api/interface.js'
	
	export default {
		name: 'find',
		components: { 
			trendsList, hotTopicList, recommendScrollList, topicGridList, topicCardList
		},
		data() {
			return {
				TabCur: 1, TabData: ['关注','推荐','广场'], followTrendsData: [], trendsData: [], hotTopicData: [], recommendScrollData: [],
				topicGridData: [], topicCardData: [],username:"",dataList:[],
				have:true,
				pageNo:1,
				pageSize:10,
				sellerList:[]
			}
		},
		props: {
			index:{
				type: Number,
				default: 1
			},
			show: {
				type: Boolean,
				default: true
			},
			scrollY: {
				type: Number,
				default: 0
			},
			scrollBottom: {
				type: Number,
				default: 0
			}
		},
		watch: {
			scrollY() {
				//通知他妈的滚动了。
				this.setPageScroll(this.scrollY);
			},
			scrollBottom() {
				if(this.scrollBottom != 0 &&this.index == 1) {
					//通知他妈的触底了
					this.getList(1)
				}
			},
		},
		created() {
			this.getList(0)
		},
		mounted() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			getList(flag){
				if(this.hava == false){
					return
				}
				if(flag == 0){
					this.pageNo = 1
				}
				if(flag == 1){
					this.pageNo++
				}
				var data = {"pageNo":this.pageNo,"pageSize":this.pageSize,'nickname':this.username}
				this.$api.getUserList(data).then(res=>{
					
					if(flag == 0){
						this.dataList = res.data.common_user
						this.sellerList = res.data.seller_user
					}else{
						if(res.data.common_user.length == 0){
							this.hava=false
						}
						this.dataList = this.dataList.concat(res.data.common_user)
					}
				})
			},
			getSrc(item){
				return config.config.url+item
			},
			goUserDetail(uid){
				uni.navigateTo({
					url:'/pages/user/userdetail?uid='+uid
				})
			},
			input(){
				this.hava = true
				
				
				this.getList(0)
			},
			getTotal(a,b){
				return parseInt(a)+parseInt(b)
			},
			queryList(pageNo, pageSize){
				
			},
			//页面被滚动
			setPageScroll(scrollTop) {
				//console.log(scrollTop);
			},
			//触底了
			setReachBottom() {
				console.log('触底了');
			},
			tabSelect(e) {
				this.TabCur = e.currentTarget.dataset.id;
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 0
				});
			},
			trends_userTap(e) {
				console.log('用户区域被点击：' + JSON.stringify(e));
			},
			trends_followTap(e) {
				console.log('关注按钮被点击：' + JSON.stringify(e));
			},
			trends_contentTap(e) {
				console.log('文字内容被点击：' + JSON.stringify(e));
			},
			trends_imgTap(e) {
				console.log('图片被点击：' + JSON.stringify(e));
			},
			trends_talkTap(e) {
				console.log('话题被点击：' + JSON.stringify(e));
			},
			trends_forwardTap(e) {
				console.log('分享被点击：' + JSON.stringify(e));
			},
			trends_commentTap(e) {
				console.log('评论被点击：' + JSON.stringify(e));
			},
			trends_appreciateTap(e) {
				console.log('点赞被点击：' + JSON.stringify(e));
			},
			trends_viewBtnTap(e) {
				console.log('查看TA被点击：' + JSON.stringify(e));
			},
			hotTopicTap(e) {
				console.log(e);
			},
			viewAllTap() {
				console.log('点击了查看全部');
			},
			r_userTap(e) {
				console.log('用户信息被点击：' + JSON.stringify(e));
			},
			r_followTap(e) {
				console.log('关注按钮被点击：' + JSON.stringify(e));
			},
			r_viewAllTap() {
				console.log('点击了查看全部');
			},
			topicGridTap(e) {
				console.log(e);
			},
			topicCardTap(e) {
				console.log(e);
			},
			topicCardViewTap(e) {
				console.log(e);
			}
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background-color: white;
	}
	.pages{
		/* #ifndef MP */
		margin-top: calc(var(--status-bar-height) + 161rpx);
		/* #endif */
		
		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 221rpx);
		/* #endif */
	}
	.zaiui-find-box {
		display: none;
	}
	.zaiui-find-box.show {
		display: block;
	}
	.zaiui-title-tab-box {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 999999;
		padding: calc(var(--status-bar-height) + 9.09rpx) 27.27rpx 9.09rpx 9.09rpx;
		.flex {
			.basis-l {
				flex-basis: 70%;
			}
			.basis-s {
				flex-basis: 30%;
			}
		}
	}
	.zaiui-seat-height {
		width: 100%;
		
		/* #ifndef MP */
		height: calc(var(--status-bar-height) + 81.81rpx);
		/* #endif */
		
		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 185rpx);
		/* #endif */
	}
	.zaiui-view-content {
		padding: 0 27.27rpx 54.54rpx;
	}
	
	// 搜索框
	.search-bar{
	
		width: 95%;
		height: 50rpx;
		margin-top: 2%;

		background-color: #f4f4f4;
	
	}
	.search-bar-box{
			
		display: flex;
		align-items: center;
		margin: 0 auto;
		
		height: 50rpx;
		
		border-radius: 50rpx;
	}
	.search-span{
		width: 40rpx;
		height: 56rpx;
		margin-top: 30rpx;
		margin-left: 30rpx;
	}
	.search-text{
		width: 100%;
		margin-top: 10rpx;
		
		font-size: 30rpx;
		color: #7f7f81;
	}


</style>
