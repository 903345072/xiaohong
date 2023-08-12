<template>
	<view class="zaiui-home-box" :class="show?'show':''">
	
		<view class="" >
			
			<bar-title bgColor='bg-white' @rightTap="barEditTap" :isBack="true">
				<block slot="content">待派奖</block>
				<block slot="right" style="display: flex;align-items: center;">
					
					<text class="cuIcon-searchlist" style="font-size: 40rpx;"></text>
					<text @click="check" style="font-size: 25rpx;padding-left: 5rpx;">筛选</text>
				</block>
			</bar-title>
		</view>
		<view @click="cancel_()" v-if="mask" style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;z-index: 999;background: rgba(167, 166, 166, 0.6);"></view>
		
		<view class="content" >
		    
		          <view class="item" v-for="(item,index) in dataList" >
					 
		              <view class="item-title" style="padding: 30rpx 20rpx;background-color: white;margin-bottom: 20rpx;display: flex;align-items: center;" >
						
						             <view style="flex:1">
										 <checkbox-group @click="checkboxChange(index)">
										 	<checkbox class='round red zaiui-checked' 
											:class="item.is_checked == true?'checked':''"
											:checked="item.is_checked"
										 	 :value="item.id.toString()"/>
										 					
										 </checkbox-group>
									 </view> 
									<view style="display: flex;align-items: flex-start;justify-content: center;flex-direction: column;padding-bottom: 25rpx;line-height: 50rpx;flex: 10;" @click="open(item)">
										<view style="display: flex;justify-content: space-between;align-items: center;width: 100%;border-bottom: 1px solid #dedede;">
											<view >
												<view style="display: flex;align-items: center;">
													<gameImg :width="40" :height="40" :type="item.type"></gameImg>
													<text style="font-size: 26rpx;margin-top: 10rpx;color: #000000;font-weight: bold;">{{item.en_type}}</text>
													<view style="background-color: #df0edc;border-radius: 25rpx;font-size: 20rpx;height: 35rpx;text-align: center;line-height: 35rpx;color: white;padding: 0 10rpx;margin-left: 10rpx;">{{item.en_mode}}</view>
												</view>
											</view>
											<view :style="{color:item.state==2 || item.state==3?'red':'#797374','font-weight':'bold'}">
												{{item.en_state}}
											</view>
										</view>
										<view style="font-size: 22rpx; color: #adadad;" @click.stop="copy(item.order_no)">
											订单编号:{{item.order_no}}<text class="cuIcon-copy" ></text>
										</view>
										<view style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
											<view >注数:{{item["num"]}}</view>
											<view>投注金额:<text style="color: red;">{{item["amount"]}}</text></view>
										</view>
										
										<view style="display: flex;align-items: center;justify-content: space-between;width: 100%;">
											
											<view>用户:<text >{{item["user"]["nickname"]}}</text></view>
											<view v-if="item['state'] == 2 || item['state'] == 3" style="color: red;font-size: 33rpx;">
												奖金:<text>{{item["award_money"].toFixed(2)}}</text>
											</view>
										</view>
										
										<view style="font-size: 22rpx; color: #adadad;display: flex;align-items: center;justify-content: space-between;width: 100%;">
											
											<view v-if="item['state'] == 0 || item['state'] == -1 || item['state'] == 1 || item['state'] == 2">出票时间:<text >{{item["tick_time"]}}</text></view>
											<view v-if="item['state'] == 3">派奖时间:<text >{{item["send_award_time"]}}</text></view>
											<view v-if="item['state'] == 4">撤销时间:<text >{{item["cancel_time"]}}</text></view>
											<view v-if="item['state'] == -1" style="display: flex;align-items: center;">
												<view @click.stop="cancel(item['id'],index)" style="background-color: red;padding: 5rpx 40rpx;border-radius: 10rpx;color: white;">撤销</view>
												<view @click.stop="printTick(item['id'],index)" style="background-color: #00aaff;padding: 5rpx 40rpx;margin-left: 10rpx;border-radius: 10rpx;color: white;">出票</view>
											</view>
										</view>
									</view>
									
									
								</view>
		          </view>
		
					<view style="width: 100%;height: 200rpx;"></view>	
						<uni-popup ref="popup" :mask-click="false" type="top"  style="z-index: 999999;"  backgroundColor="#FAFAFA">
							<scroll-view :style="{'overflow':'scroll','height':scrollH+'rpx'}" :scroll-y="true">
							
							<orderdetail :style="{'overflow':'scroll'}" :orderdetail="this.orderdetail" @closeWindow = "closeWindow()"></orderdetail>
							
							</scroll-view>
							
						</uni-popup>
						
						<uni-popup ref="checkpop" :mask-click="true" type="right"  style="z-index: 999999;"  backgroundColor="white">
							<scroll-view scroll-y="true" class="scroll-Y" :style="{'height':'100vh','width':'30vh'}">
							
							<view style="padding: 40rpx 40rpx;">
								<view style="margin-bottom: 20rpx;font-weight: bold;">彩种</view>
								<view @click="changeGameType(index)" style="display: inline-block;width: 33%;line-height: 60rpx;" v-for="(item,index) in game_type_arr" :key="index">
									<view :style="{'border':game_index==index?'1px solid #007AFF':'1px solid grey','text-align': 'center','margin': '5rpx 5rpx','color':game_index==index?'#007AFF':'grey','border-radius':'10rpx','white-space':'nowrap'}">{{item.value}}</view>
								</view>
								
								
								<view style="margin-bottom: 20rpx;font-weight: bold;margin-top: 20rpx;display: flex;align-items: center;">
									<view @click="cancel_()" style="margin-right: 20rpx;color: grey;border: 1px solid grey;padding: 20rpx 40rpx;">取消</view>
									<view @click="confirm_()" style="color: white;padding: 20rpx 40rpx;background-color: #007AFF;">确认</view>
								</view>
							</view>
							
							</scroll-view>
							
						</uni-popup>
		</view>
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom" >
			<view class="cu-bar padding-lr">
				<view class="checked-view" @tap="tapChecked"> 
					<checkbox class='round red sm zaiui-checked' :class="checkbox_all?'checked':''" :checked="checkbox_all"/>
					<text class="text-black text-lg">全选</text>
				</view>
				<view class="btn-view" style="display: flex;align-items: center;">
					<view style="font-size: 30rpx;">合计:{{getTotal()}}</view>
					<button @click="sendAward()" class="cu-btn radius bg-red" :disabled="can_dian" style="margin-left: 20rpx;">派奖</button>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	//加载组件  
	import welcomeTip from '@/components/zaiui-common/basics/welcome-tip';
	import swiperBackground from '@/components/zaiui-common/basics/swiper-background';
	import gridMenuList from '@/components/zaiui-common/list/grid-menu-list';
	import identifyList from '@/components/zaiui-common/list/identify-list';
	import sellQuicklyList from '@/components/zaiui-common/list/sell-quickly-list';
	import activityList from '@/components/zaiui-common/list/activity-list';
	import goodsList from '@/components/zaiui-common/list/goods-list';
	import liveList from '@/components/zaiui-common/list/live-list';
	import videoList from '@/components/zaiui-common/list/video-list';
	import footerTabbar from '@/components/zaiui-common/footer/footer-tabbar';
	import gridSortList from '@/components/zaiui-common/list/grid-sort-list';
	import modalImg from '@/components/zaiui-common/basics/modal-img';
	//======================================================================
	import _home_data from '@/static/zaiui/data/home.js';	//虚拟数据
	import _tool from '@/static/zaiui/util/tools.js';
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import orderdetail from '@/components/zaiui-common/basics/orderdetail';
	import gameImg from "@/components/zaiui-common/basics/gameImg.vue"
	export default {
		name: 'noSend',
		components: { 
			welcomeTip, swiperBackground, gridMenuList, identifyList, sellQuicklyList, activityList, goodsList, liveList, videoList, footerTabbar,
			gridSortList, modalImg,barTitle,orderdetail,gameImg
			
			
		},
		onReachBottom() {
			this.getList(1)
		},
		computed:{
				scrollH:function(){
					let sys = uni.getSystemInfoSync();
					let winWidth = sys.windowWidth;
					let winrate = 750/winWidth;
					let winHeight =parseInt(sys.windowHeight*winrate)
					
					return winHeight
					
				}
			},
		data() {
			return {
				swiperInfo: {index: 0, show: true, welcome: true, list: []}, headInfo: {Class: "", opacity: 0,}, goodsShow: true, 
				headTab: {TabCur: 0, scrollLeft: 0, list: []}, viewContent: {welcome: true,}, gridMenuData: [], identifyData: [],
				quickly: {}, activity: [], goodsTabData: {TabCur: 0, list: []}, goodsData: [], liveData: [], videoData: [],
				gridSortData: [], modalShow: true,orderdetail:{},dataList:[],emulator_Height: 0,state:2,
				game_index:0,game_type_arr:[{"en_name":"0","value":"全部"},{"en_name":"foot","value":"竞彩足球"},{"en_name":"basket","value":"竞彩篮球"},{"en_name":"pl3","value":"排列三"},{"en_name":"pl5","value":"排列五"},{"en_name":"bd","value":"北京单场"}],
				maskClick:false,
				range: [],
				state_arr:[{"value":-2,"name":"全部订单"},{"value":-1,"name":"待出票"},{"value":0,"name":"待开奖"},{"value":1,"name":"未中奖"},{"value":2,"name":"待派奖"},{"value":3,"name":"已派奖"},{"value":4,"name":"已撤销"}],
				mask:false,
			
				checkbox_all:false,
				pageNo:1,
				pageSize:10,
				hava:true,
				can_dian:false
			}
		},
		props: {
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
				if(this.scrollBottom != 0) {
					//通知他妈的触底了
					this.setReachBottom();
				}
			},
		},
		onLoad() {
			this.getList(0)
		},
		created() {
		
		},
		mounted() {
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
				var data = {"state":this.state,"pageNo":this.pageNo,"pageSize":this.pageSize,"type":this.game_type_arr[this.game_index]["en_name"]}
				this.$api.getOrderList(data).then(res=>{
					
					if(flag == 0){
						this.dataList = res.data
					
					}else{
						if(res.data.length == 0){
							this.hava=false
						}
						this.dataList = this.dataList.concat(res.data)
						
					}
					this.can_dian = false
					
				})
			},
			sendAward(){
				
				if(this.getTotal() == 0){
					uni.showToast({
						icon:"error",
						title:"请选择订单",
					
					})
					return false
				}
				this.can_dian = true
				var data = {"ids":[]}
				for(let item in this.dataList){
					if(this.dataList[item]["is_checked"] == true){
						data["ids"].push(this.dataList[item]["id"])
					}
				}
				var that = this
				
				this.$api.sendAward(data).then(res=>{
					this.hava = true
					this.getList(0)
				})
			},
			tapChecked(){
				this.checkbox_all = !this.checkbox_all
				for(let item in this.dataList){
					if(this.checkbox_all == true){
						this.dataList[item]["is_checked"] = true
					}else{
						this.dataList[item]["is_checked"] = false
					}
					
				}
			},
			getTotal(){
				var i = 0
				for(let item in this.dataList){
					if(this.dataList[item]["is_checked"] == true){
						i+=this.dataList[item]["award_money"]
					}
				}
				return i.toFixed(2)
			},
			checkboxChange(e){
				var i = 0
			
			this.dataList[e]["is_checked"] = !this.dataList[e]["is_checked"]
			for(let item in this.dataList){
				if(this.dataList[item]["is_checked"] == true){
					i++
				}
			}
				if(i == this.dataList.length){
					this.checkbox_all = true
				}else{
					this.checkbox_all = false
				}
			},
			cancel_(){
				this.mask = false
				this.$refs.checkpop.close("right")
			},
			confirm_(){
				
			  this.hava = true
			  this.getList(0)
			  this.mask = false
			  this.$refs.checkpop.close("right")
			},
			change(e){
			
			this.range = e
			
			},
			changeStateType(index){
				this.state = index
			},
			changeGameType(index){
				this.game_index = index
			},
			check(){
				this.mask = true
				this.$refs.checkpop.open("right")
			},
			printTick(id,index){
				var data = {}
				data["id"] = id
				this.$api.printTick(data).then(res=>{
					this.dataList[index]["en_state"] = res.data["en_state"]
					this.dataList[index]["tick_time"] = res.data["tick_time"]
					this.dataList[index]["state"] = res.data["state"]
					uni.showToast({
						title:"操作成功"
					})
				})
			},
			cancel(id,index){
				var data = {}
				data["id"] = id
				var that = this
				
				uni.showModal({
					title:"确认撤销吗",
					success: (res) => {
						if(res.confirm) {  
							that.$api.cancel(data).then(res=>{
								that.dataList[index]["en_state"] = res.data["en_state"]
									that.dataList[index]["state"] = res.data["state"]
								uni.showToast({
									title:"操作成功"
								})
							})
						} else {  
							
							}  
						} 
					
				})
				
			},
			copy(item){
				uni.setClipboardData({
									data: item,
									success: function() {
										uni.showToast({
											title:'复制成功'
										})
									}
								})
				
			},
			open(item){
				this.orderdetail = item
				this.orderdetail["flag"] = 0
				this.$refs.popup.open("top")
			},
			closeWindow(){
				this.$refs.popup.close("top")
			},
			barEditTap() {
				
			},
			
			queryList(pageNo, pageSize){
			
				var data = {"state":this.state,"pageNo":pageNo,"pageSize":pageSize}
				this.$api.getOrderList(data).then(res=>{
					this.$refs.paging.complete(res.data);
				
				})
			},
			toFootball() {
				uni.navigateTo({
					url: "/pages/football/index"
				});
			},
			toBasketball() {
				uni.navigateTo({
					url: "/pages/basketball/index"
				});
			},
			//页面被滚动
			setPageScroll(scrollTop) {
				//console.log(scrollTop);
				if(this.headTab.TabCur == 0) {
					if(scrollTop <= 100) {
						let num = scrollTop / 100;
						this.headInfo.opacity = num;
					} else if(scrollTop > 100) {
						this.headInfo.opacity = 1;
					}
				}
			},
			//触底了
			setReachBottom() {
				console.log('触底了');
			},
			//欢迎提示关闭事件
			welcomeClose(bol) {
				this.swiperInfo.welcome = bol;
				this.headTab.welcome = bol;
				let Class = this.headInfo.Class;
				this.headInfo.Class = Class.replace(/welcome/g, '');
				this.viewContent.welcome = bol;
				//设置颜色
				_tool.setBarColor(false);
				console.log(bol);
			},
			//搜索框下的tab菜单被点击
			tabSelect(e) {
				let index = e.currentTarget.dataset.id;
				this.headTab.TabCur = index;
				this.headTab.scrollLeft = (index - 1) * 60;
				if(index == 0) {
					this.swiperInfo.show = true;
					this.headInfo.opacity = 0;
				} else {
					this.swiperInfo.show = false;
					this.headInfo.opacity = 1;
				}
				uni.pageScrollTo({
				    scrollTop: 0,
				    duration: 0
				});
			},
			swiperChange(e) {
				this.swiperInfo.index = e.detail.current;
			},
			gridMenuTap(e) {
				console.log(e);
				uni.navigateTo({
					url: "/pages/home/sort_list"
				});
			},
			identifyTap(e) {
				console.log(e);
			},
			quicklyTap(e) {
				console.log(e);
			},
			activityTap(e) {
				console.log(e);
			},
			//商品列表上的分类tab被点击
			goodsTab(e) {
				this.goodsTabData.TabCur = e.currentTarget.dataset.id;
				// #ifdef H5
				uni.pageScrollTo({
				    scrollTop: 1060,
				    duration: 200
				});
				// #endif
				
				// #ifdef APP-PLUS
				uni.pageScrollTo({
				    scrollTop: 1010,
				    duration: 200
				});
				// #endif
			},
			goodsListTap(e) {
				console.log(e);
				if(e.index==0) {
					uni.navigateTo({
						url: '/pages/goods/goods'
					});
				} else if(e.index == 2) {
					uni.navigateTo({
						url: '/pages/goods/second_hand'
					});
				} else if(e.index == 3) {
					uni.navigateTo({
						url: '/pages/goods/second_terrace'
					});
				} else {
					
				}
			},
			liveListTap(e) {
				console.log(e);
			},
			videoListTap(e) {
				console.log(e);
			},
			gridSortTap(e) {
				console.log(e);
			},
			rewardTap() {
				uni.navigateTo({
					url: "/pages/goods/reward"
				});
			},
			imgTap() {
				this.modalShow = false;
				uni.navigateTo({
					url: "/pages/goods/reward"
				});
				console.log('图片被点击');
			},
			closeTap() {
				this.modalShow = false;
				console.log('点击了关闭');
			},
			sortVueTap() {
				uni.navigateTo({
					url: "/pages/home/sort"
				});
			},
			searchTap() {
				uni.navigateTo({
					url: "/pages/home/search"
				});
			}
		}
	}
</script>

<style lang="scss" scoped>

	.zaiui-head-search-box {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 9999;
		background-color: rgba(229, 77, 66,0);
		padding-top: var(--status-bar-height);
		transition: top .25s;
		padding-bottom: 10rpx;
		.zaiui-search-box {
			position: relative;
		}
		.zaiui-flex-tab {
			position: relative;
			transition: opacity .25s;
			.flex {
				.basis-xxl {
					flex-basis: 90%;
					width: 90%;
					z-index: 1;
				}
				.basis-xxs {
					flex-basis: 10%;
					z-index: 1;
					width: 10%;
				}
				.sort-icon {
					font-size: 55rpx;
					height: 64rpx;
					line-height: 64rpx;
					text-align: center;
				}
			}
		}
	}
	.zaiui-head-search-box.welcome {
		top: calc(var(--status-bar-height) + 101rpx);
		transition: top .25s;
	}
	.zaiui-view-content {
		display: none;
		width: 100%;
		
		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) + 30rpx);
		/* #endif */
		
		/* #ifdef H5 */
		margin-top: calc(var(--status-bar-height) + 70rpx);
		/* #endif */
		
		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 85rpx);
		/* #endif */
		
		.zaiui-tab-list {
			position: relative;
			width: 100%;
		}
	}
	.zaiui-view-content.welcome {
		/* #ifdef APP-PLUS */
		margin-top: calc(var(--status-bar-height) + 180rpx);
		/* #endif */
		
		/* #ifdef H5 */
		margin-top: calc(var(--status-bar-height) + 220rpx);
		/* #endif */
		
		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 220rpx);
		/* #endif */
		
		transition: all .25s;
	}
	.zaiui-view-content.show {
		display: block;
	}
	.zaiui-swiper-box {
		width: 100%;
		.screen-swiper {
			height: 230rpx;
			min-height: 230rpx;
			.swiper-padding {
				padding: 0 25rpx;
			}
		}
	}
	.red-envelopes {
		width: 100%;
	}
	.zaiui-goods-tab-box {
		position: sticky;
		padding: 2rpx 0;
		transition: all .25s;
		z-index: 9999;
		background: #fff;
		
		/* #ifndef MP */
		top: calc(var(--status-bar-height) + 101rpx);
		/* #endif */
		
		/* #ifdef MP */
		top: calc(var(--status-bar-height) + 161rpx);
		/* #endif */
		
		.cu-tag.z {
			top: 0px;
			right: -32.72rpx;
			font-size: 20rpx;
			padding: 19rpx 6rpx;
			transform: scale(0.8);
		}
	}
	.zaiui-ad-img {
		width: 100%;
	}
	.zaiui-tab-list-title {
		.img-aau {
			width: 101.81rpx;
			margin-top: 12.72rpx;
		}
		.text-right {
			.img-aau {
				margin-right: 14.54rpx;
			}
		}
		.text-left {
			.img-aau {
				margin-left: 14.54rpx;
			}
		}
	}
	.zaiui-add-btn-view-box {
		position: fixed;
		z-index: 999999;
		bottom: 181.81rpx;
		right: 27.27rpx;
		.cu-btn {
			margin: auto;
			width: 81.81rpx;
			height: 81.81rpx;
			font-weight: 800;
			border-radius: 50%;
			font-size: 36.36rpx;
			border: 9.09rpx solid #fff;
			box-shadow: 0 0 14.54rpx 7.27rpx #d0d0d0;
		}
	}
	.zaiui-home-box {
		display: none;
	}
	.zaiui-home-box.show {
		display: block;
	}
	.zaiui-title-tab-box {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 999999;
	
		padding: calc(var(--status-bar-height) + 0rpx) 27.27rpx 9.09rpx 9.09rpx;
	
		.flex {
			.basis-l {
				flex-basis: 70%;
			}
			.basis-s {
				flex-basis: 30%;
			}
		}
	}
	.main-bg{
		height: 350rpx;
		background-color: #5ca1f8;
		position: relative;
		margin-top: var(--status-bar-height);
	}
	.pages{
		/* #ifndef MP */
		margin-top: calc(var(--status-bar-height) + 121rpx);
		/* #endif */
		
		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 181rpx);
		/* #endif */
	}
	.image_{
		width: 40rpx;
		height: 40rpx;
	}

</style>
