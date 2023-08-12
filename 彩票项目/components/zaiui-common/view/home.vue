<template>
	<view class="zaiui-home-box" :class="show?'show':''">
	
		<view class="main-bg" >
			
			
			
			<view style="border:4rpx solid #c7cacc ;background-color: #7e9df8;text-align: center; width: 40%;margin: 1rpx auto;height: 60rpx;display: flex;flex-direction: column;align-items: center;justify-content: center;">
				<text style="color: #f7d27f;font-weight: bold;">线下店铺 实体出票</text>
			</view>
			
			<view style="display: flex;align-items: flex-end;margin: 20rpx 30rpx;">
				<view class="dian-name">
					<img style="width: 100rpx;height: 100rpx;border:2rpx solid white;border-radius: 15rpx;"  :src="logo" alt="">
				</view>
				<view >
					<view style="margin-left: 30rpx;">
						<view style="display: flex;align-items: center;">
							<text style="color: white;">{{shopName}}</text>
							<view style="background-color: #f7e1ae;border-radius: 8rpx;margin-left: 15rpx;display: flex;align-items: center;justify-content: center;height: 30rpx;padding: 0 10rpx;">
								<view style="background-color: #bc9544;width: 22rpx;height: 22rpx;border-radius: 22rpx;"><view class="cuIcon-check" style="font-size: 20rpx;color: white;"></view></view>
								<view style="font-size: 20rpx;color: #bc9544;margin-left: 10rpx;">已认证</view>
							</view>
						</view>
						<view style="display: flex;margin-top:30rpx">
							<view style="background-color: #8ac1fa;display: flex;height: 45rpx;line-height: 45rpx;border-radius: 90rpx;align-items: center;padding: 0 15rpx;">
								<text style="color: white;font-size: 23rpx;margin-right: 5rpx;">评分</text>
								<view style="display: flex;">
									<view class="cuIcon-favorfill" style="color: #f6cb56;"></view>
									<view class="cuIcon-favorfill" style="color: #f6cb56;"></view>
									<view class="cuIcon-favorfill" style="color: #f6cb56;"></view>
									<view class="cuIcon-favorfill" style="color: #f6cb56;"></view>
									<view class="cuIcon-favorfill" style="color: #f6cb56;"></view>
								</view>
								<text class="cuIcon-right" style="color: #d4e9fd;"></text>
							</view>
							<view style="" @click="contact()" style="background-color: #8ac1fa;margin-left:20rpx;height: 45rpx;line-height: 45rpx;border-radius: 90rpx;padding: 0 20rpx;display: none;">
								<text style="color: white;">投诉</text>
							</view>
						</view>
					</view>
					<view>
						
					</view>
				</view>
			</view>
		<!-- 	<view style="position: absolute;left:0;right:0;bottom: 0;  background-color: #80b7f9;height: 130rpx;margin:0 15rpx;border-radius: 20rpx 20rpx 0 0;display: flex;justify-content: space-around;align-items: center;">
				
				
				<view @click="copyWeChat(wechat)" style="display: flex;flex-direction: column;align-items: center;">
					<view style="background-color: white; width: 60rpx;height: 60rpx;border-radius: 60rpx;display: flex;justify-content: center;align-items: center;">
						<img style="width: 40rpx;height: 40rpx;" src="/static/images/index/wx.png" alt="">
					</view>
					<view style="color: white;;padding-top:5rpx">添加QQ</view>
				</view>
				
				<view @click="inviteUser()" style="display: flex;flex-direction: column;align-items: center;">
					<view style="background-color: white; width: 60rpx;height: 60rpx;border-radius: 60rpx;display: flex;justify-content: center;align-items: center;">
						<img style="width: 30rpx;height: 30rpx;" src="/static/images/index/invite.png" alt="">
					</view>
					<view style="color: white;padding-top:5rpx">邀请好友</view>
				</view>
			</view> -->
		</view>
		<view style="display: flex;margin: 25rpx;25rpx;background-color: white;box-shadow: 2rpx 6rpx 6rpx #CCCCCC;align-items: center;padding: 10rpx 0;border-radius: 10rpx;">
			<view style="background: linear-gradient(red, pink);padding: 3rpx 10rpx;color: white;margin:0 20rpx;font-size: 20rpx;border-radius: 12rpx;">公告</view>
			<view style="font-size: 25rpx;">{{gonggao}}</view>
		</view> 
		<view style="display: flex;justify-content: center;width: 100%;margin-top: 35rpx;">
			<image src="/static/images/index/hengfu.jpg" style="height: 140rpx;width: 95%;"></image>
		</view>
		<view style="display: flex;justify-content: space-between;border-bottom: 1px solid #CCCCCC;padding: 10rpx 15rpx;margin: 15rpx 20rpx;align-items: center;">
			<view style="display: flex;align-items: center;">
				<image src="/static/images/index/shuangxing.png" style="width: 40rpx;height: 40rpx;"></image>
				<view style="margin-left: 15rpx;font-size: 23rpx;">玩法大厅</view>
			</view>
			<view style="font-size: 23rpx;">实体店出票</view>
		</view>
		
		<view style="box-shadow: 5rpx 5rpx 10rpx #CCCCCC;color: white;padding: 25rpx 20rpx;margin: 10rpx 20rpx;margin-top: 30rpx;border-radius: 20rpx;">
			<view style="display: flex;align-items: center;">
				<view>
					<image src="/static/images/index/ticai.png" style="width: 50rpx;height: 50rpx;"></image>
				</view>
				<view style="color: #333333;">体育彩票</view>
			</view>
			<view style="display: flex;justify-content: space-around;margin-top: 15rpx;">
				<view @tap="toFootball"  style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<image src="/static/images/index/jczq.png" style="width: 100rpx;height: 100rpx;"></image>
					<text style="color: #333333;margin-top: 10rpx;">竞彩足球</text>
				</view>
				
				<view @tap="toBasketball" style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<image src="/static/images/index/jclq.png" style="width: 100rpx;height: 100rpx;"></image>
					<text style="color: #333333;margin-top: 10rpx;">竞彩篮球</text>
				</view>
				
				<view   style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<image src="/static/images/index/pl3.png" style="width: 100rpx;height: 100rpx;"></image>
					<text style="color: #333333;margin-top: 10rpx;">排列3</text>
				</view>
				<view @tap="toBeijing" style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<image src="/static/images/index/bjdc.png" style="width: 100rpx;height: 100rpx;"></image>
					<text style="color: #333333;margin-top: 10rpx;">北京单场</text>
				</view>
				
				
			</view>
			
			<view style="display: flex;margin-top: 15rpx;margin-left:25rpx">
				<view @tap="torenjiu"  style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<image src="/static/images/index/renjiu.png" style="width: 120rpx;height: 120rpx;"></image>
					<text style="color: #333333;margin-top: 10rpx;">胜负彩</text>
				</view>
				
			
				<!-- <view @tap="toGuanYa"  style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-left:50rpx">
					<image src="/static/images/index/pcjcmc.png" style="width: 100rpx;height: 100rpx;"></image>
					<text style="color: #333333;margin-top: 10rpx;">冠/冠亚军</text>
				</view> -->
				
			</view>
		</view>
		
		<view style="box-shadow: 5rpx 5rpx 10rpx #CCCCCC;color: white;padding: 40rpx 20rpx;margin: 20rpx 20rpx;margin-top: 40rpx;border-radius: 20rpx;">
			<view style="display: flex;align-items: center;">
				
				<view style="color: #333333;">赛事情报</view>
			</view>
			<view style="display: flex;justify-content: space-around;margin-top: 15rpx;align-items: center;">
				<view @click="gotoBifen('foot')" style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<text style="color: #59b076;margin-top: 10rpx;">足球赛事</text>
					<text style="color: #333333;margin-top: 10rpx;">实时赛事</text>
				</view>
				
				<view @click="gotoBifen('foot')" style="display: flex;align-items: center;">
					<image src="/static/images/index/zqc.png" style="width: 100rpx;height: 60rpx;"></image>
				</view>
				
				<view @click="gotoBifen('basket')" style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
					<text style="color: #e14837;margin-top: 10rpx;">篮球赛事</text>
					<text style="color: #333333;margin-top: 10rpx;">直播比分</text>
				</view>
				
				<view @click="gotoBifen('basket')" style="display: flex;align-items: center;">
					<image src="/static/images/index/lanwang.png" style="width: 100rpx;height: 100rpx;"></image>
				</view>
			
			</view>
		</view>
		<view style="width: 100%;height: 250rpx;"></view>
		<uni-popup ref="popup" :mask-click="true" type="top"  style="z-index: 999999999;left: 50%;top: 10%;"  >
			
			<view style="width: 100%;display: flex;justify-content: center;align-items: center;position: relative;">
				<view style="position: absolute;right: 180rpx;bottom: 320rpx;z-index: 99999999999;color: #aa0000;text-align: center;">
					{{shopName}}
				</view>
				<image style="height: 1200rpx;width: 85%;border-radius: 20rpx;"   src="../../../static/img/invite.png"></image>
				<view style="position: absolute;right: 142rpx;bottom: 84rpx;background: white;">
					<image style="width: 216rpx;height: 216rpx;" :src="qrcode"></image>
				</view>
				<view style="position: absolute;bottom: -40rpx;">截图保存</view>
			</view>
			
			
		
			
		</uni-popup>
		<view @click="closeMask()" v-if="mask"
			style="position: absolute;left: 0;right: 0;top: 0;bottom: 0;z-index: 999;background: rgba(167, 166, 166, 0.6);">
		</view>
	</view>
	
</template>

<script>
	

	import config from "@/api/interface.js"
	export default {
		name: 'home',
	
		data() {
			return {
				config:"",shopName:"",logo:"",phone:"",wechat:"",qrcode:"",mask: false,is_seller:false,"gonggao":"欢迎您的到来!"
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
	
		created() {
			
		
	
		},
	
		mounted() {
		
			this.config = config
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		
			var that = this
			uni.request({
					url: config.config.url+"/common/index/shopInfo",				
					method: 'GET',
					data: {},
					success: res => {
						
						this.shopName = res.data.data.name
						this.logo = res.data.data.logo			
						this.phone = res.data.data.phone
						this.wechat = res.data.data.wechat,
						this.gonggao = res.data.data.gonggao
			       },
					fail: () => {},
					complete: () => {}
			});
			this.$api.getUserInfo().then(res=>{
				this.qrcode = res.data.data.qrcode
				this.is_seller = res.data.data.is_seller
			})
		},
		methods: {
			toGuanYa() {
				uni.navigateTo({
					url: "/pages/football/guanya"
				});
			},
			toBeijing() {
				uni.navigateTo({
					url: "/pages/beijing/index"
				});
			},
			torenjiu(){
				uni.navigateTo({
					url: "/pages/renjiu/index"
				});
			},
			toPl3() {
				uni.navigateTo({
					url: "/pages/pl/pl3"
				});
			},
			closeMask(){
				this.mask = false
				this.$refs.popup.close("top")
			},
			getSrc(){
			
				var url = ""
				return url
			},
			inviteUser(){
				if(this.is_seller){
					this.mask = true
					this.$refs.popup.open("top")
				}else{
					uni.showToast({
						title:"暂无权限",
						icon:"error"
					})
				}
			
			},
			gotoBifen(index){
				uni.navigateTo({
					url: "/pages/news/index?url="+index
				});
			},
			copyWeChat(item){
				
			
				uni.setClipboardData({
									data: item,
									success: function() {
										uni.showToast({
											title:'微信号已复制到粘贴版'
										})
									}
								})
			},
			contact(){
				window.location.href = "tel:" + this.phone
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
		height: 250rpx;
		background-color: #5ca1f8;
		position: relative;
		margin-top: var(--status-bar-height);
	}
</style>
