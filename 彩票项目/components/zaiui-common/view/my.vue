<template>
	<view class="zaiui-my-box" :class="show?'show':''">
		<view class="bg-gradual-red zaiui-head-box" style="background-image:linear-gradient(45deg, #6bb4f9, #4e90f7) ;">
			<!--标题栏-->
			<!--小程序端不显示-->
			<!-- #ifndef MP -->
			<bar-title :isBack="false" :fixed="false">
				
			</bar-title>
			<!-- #endif -->
			
			<!--用户信息-->
			<view v-if="user != null" class="content text-xl" style="display: flex;left: 0;background: url(/static/img/backgroundCard.png) no-repeat 0 0/100% 100%;width: 92%;margin-left: 4%;padding: 50rpx 20rpx;">
				<view style="position: relative;margin-right: 40rpx;">
					<img class="cu-avatar round lg" :src="getSrc(user.avatar)" />
					<view @click.stop="choosePhoto(user.uid)" class="cuIcon-edit" style="position: absolute;bottom:3rpx;right: 3rpx;background-color: #b60fb3;width: 40rpx;height: 40rpx;border-radius: 40rpx;font-size: 25rpx;text-align: center;line-height: 40rpx;"></view>
				</view>
				<view style="line-height: 50rpx;">
					<view class="text-white" style="color: #000000;;">
						<text class="margin-right">{{user.real_name}}</text>
											
					</view>
					<view class="text-white-bg text-sm" style="color: #000000;">
						<text class="text-border-x">关注 {{guanzhu}}</text>
						<text style="margin-left: 10rpx;">粉丝 {{fans}}</text>
					</view>
				</view>
			</view>
			
			<!--用户数据-->
			<!-- <view class="zaiui-user-info-num-box">
				<view class="cu-list grid col-4 no-border">
					<view class="cu-item" @tap="cartTap">
						<view class="text-xl" v-if="login">-</view>
						<view class="text-xl" v-else>0</view>
						<text class="text-sm">购物车</text>
					</view>
					<view class="cu-item" @tap="footmarkTap">
						<view class="text-xl" v-if="login">-</view>
						<view class="text-xl" v-else>4</view>
						<text class="text-sm">足迹</text>
					</view>
					<view class="cu-item" @tap="sponsoredTap">
						<view class="text-xl" v-if="login">-</view>
						<view class="text-xl" v-else>0</view>
						<text class="text-sm">红包</text>
					</view>
					<view class="cu-item">
						<view class="text-xl" v-if="login">-</view>
						<view class="text-xl" v-else>0</view>
						<text class="text-sm">账单</text>
					</view>
				</view>
			</view> -->
			
			<!--用户提示-->
			<view class="text-sm zaiui-user-info-tip-box"  v-if="user != null"  style="background-image: linear-gradient(45deg, white, white);padding: 18rpx 10rpx;padding-right: 5rpx;">
				<view class="text-cut" style="display: flex;align-items: center;justify-content: space-between;padding-right: 15rpx;">
					<view class="cuIcon-shop" style="color: #007AFF;font-size: 40rpx;"><text style="color: #000000;font-size: 26rpx;margin-left: 15rpx;">店铺名称: {{user.shop_name}}</text></view>
					
					<!-- <image src="../../../static/images/index/exchange.png" style="width: 30rpx;" mode="widthFix"></image> -->
				</view>
				
			</view>	
		</view>
		
		
		<view class="zaiui-view-content">
			<!--用户数据-->
			<view class="padding-xs bg-white zaiui-user-info-order-box">
			
				<view class="cu-list grid col-4 no-border" style="display: flex;justify-content: space-around;align-items: center;">
					<view class="cu-item" @tap="order_list_tap">
						
						<view  class="text-xxl text-black" ><image style="width: 60rpx;" mode="widthFix" src="../../../static/images/index/order.png"></image></view>
						<text class="text-sm">订单记录</text>
					</view>
					<view style="border-right: 1px solid #EEEEEE;width: 1px;height: 65rpx"></view>
					<view class="cu-item" @tap="goToWallet()">
						
						<view class="text-xxl text-black" ><image style="width: 80rpx;" mode="widthFix"  src="../../../static/images/index/torecharge.png"></image></view>
						<text class="text-sm">我的钱包</text>
					</view>
				
				</view>
			</view>
			
			
			
			<!--推荐工具-->
			<view class="padding-xs bg-white margin-top zaiui-user-info-tools-box">
				<view class="padding-sm tools-view">
					<view class="text-black text-bold text-lg tools-title">系统管理</view>
					
				</view>
				
				<view class="zaiui-tools-list-box">
					<view class="cu-list grid col-4 no-border">
						<block v-for="(item,index) in toolsList" :key="index">
							<view class="cu-item" v-if="index < 12" @tap="gridTap(item)">
								<view class="text-black" :class="['cuIcon-' + item.icon]"/>
								<text>{{item.name}}</text>
							</view>
						</block>
					</view>
				</view>
				
			</view>
			
		</view>
	
		<!--占位底部距离-->
		<view class="cu-tabbar-height"></view>
		
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
	
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import config from '@/api/interface.js'
	import _my_data from '@/static/zaiui/data/my.js';	//虚拟数据
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	export default {
		name: 'my',
		components: { 
			barTitle
		},
		data() {
			return {
				toolsList: [], login: false,
				user:null,
				fans:0,
				guanzhu:0,
				phone:"",
				wechat:"",
				shopName:"",
				qrcode:"",
				mask:false
				
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
		created() {
			//加载虚拟数据
			this.toolsList = _my_data.toolsListData();
		    this.getUserInfo()
		},
		mounted() {
			_tool.setBarColor(false);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
			 
		},
		onLoad() {
			
		},
		methods: {
			getUserInfo(){
				var that = this
				this.$api.getUserInfo().then(res=>{
					that.user = res.data.data
					that.fans = res.data.fans_count
					that.guanzhu = res.data.guanzhu
					that.phone = res.data.data.phone
					that.wechat = res.data.data.wechat
					that.shopName = res.data.data.shop_name
					that.qrcode = res.data.data.qrcode
				})
			},
			goToWallet(){
				uni.navigateTo({
					url:"/pages/finace/wallet"
				})
			},
			getSrc(src){
				return config.config.url+src
			},
			choosePhoto(id) {
				var that = this
				uni.chooseImage({
					count: 1, //最多可以选择的图片张数，默认9
					sourceType: ['album','camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					sizeType: ['original'],//original 原图，compressed 压缩图，默认二者都有
					success(res) {
						
						that.uploadPhoto(res.tempFilePaths,id);
					},
					fail() {
						console.log('失败', err);
					},
					complete() {
						console.log('结束');
					},
				})
			},
			
			uploadPhoto(tempFilePaths,id) { 
				var that = this
				uni.uploadFile({
					url: config.config.url+"/api/user/editAvatar?id="+id, //开发者服务器 url
					header:{
						'bear_token':uni.getStorageSync("bear_token")
						// HTTP 请求 Header, header 中不能设置 Referer
					},
					filePath: tempFilePaths[0], // 要上传文件资源的路径
					name: 'upload', // 文件对应的 key , 开发者在服务器端通过这个 key 可以获取到文件二进制内容
					formData:{
						// HTTP 请求中其他额外的 form data （即接口需要的其它参数）
					},
					success(res) {
						uni.showToast({
							title:"上传成功"
						})
					that.user = JSON.parse(res.data).data	
					
					},
					fail() {
						console.log('失败', err);
					},
					complete() {
						console.log('结束');
					},
				})
			},
			//页面被滚动
			setPageScroll(scrollTop) {
				//console.log(scrollTop);
			},
			//触底了
			setReachBottom() {
				console.log('触底了');
			},
			//购物车
			cartTap() {
				uni.navigateTo({
					url: "/pages/goods/my_cart"
				});
			},
			//足迹
			footmarkTap() {
				uni.navigateTo({
					url: "/pages/my/footmark"
				});
			},
			//我买到的
			order_list_tap() {
				uni.navigateTo({
					url: "/pages/order/orderlist"
				});
			},
			loginUrlTap() {
				uni.navigateTo({
					url: "/pages/my/login"
				});
			},
			loginTap() {
				if(this.login) {
					this.login = false;
				} else {
					this.login = true;
				}
			},
			realNameTap() {
				uni.navigateTo({
					url: "/pages/real_name/index"
				});
			},
			setupTap() {
				uni.navigateTo({
					url: "/pages/my/set-up"
				});
			},
			gridTap(item) {
				if(item.name == '退出登录') {
					uni.setStorageSync("bear_token",null)
					this.loginUrlTap()
				}
				
				if(item.name == '修改密码') {
					this.setupTap()
				}
				if(item.name == '实名认证'){
					uni.navigateTo({
						url:"/pages/real_name/form"
					})
				}
				if(item.name == '联系店主'){
				
					window.location.href = "tel:" + this.phone
				}
				if(item.name == '客服qq'){
				var we = this.wechat
					uni.setClipboardData({
										data: we,
										success: function() {
											uni.showToast({
												title:'已复制到粘贴版'
											})
										}
									})
				}
				if(item.name == '邀请好友'){
				
						if(this.user.is_seller){
							this.mask = true
							this.$refs.popup.open("top")
						}else{
							uni.showToast({
								title:"暂无权限",
								icon:"error"
							})
						}
					
					
				}
				
				if(item.name == '我的下级'){
					uni.navigateTo({
						url:"/pages/user/InvitedUser?uid="+""
					})
				}
				
				// if(item.name == '设置') {
				// 	this.setupTap();
				// }
			},
			sponsoredTap() {
				uni.navigateTo({
					url: "/pages/my/sponsored"
				});
			},
			closeMask(){
				this.mask = false
				this.$refs.popup.close("top")
			},
		}
	}
</script>

<style lang="scss" scoped>
	.zaiui-my-box {
		width: 100%;
		display: none;
		.zaiui-head-box {
			padding-top: 0;
			padding-bottom: 72.72rpx;
			.zaiui-user-info-box {
				/* #ifdef MP */
				padding-top: calc(var(--status-bar-height) + 50rpx);
				/* #endif */
				.login-user-view {
					position: relative;
					text-align: center;
					.login-user-avatar-view {
						position: relative;
						margin-bottom: 18.18rpx;
					}
				}
				.cu-list.menu-avatar>.cu-item {
					background-color: inherit;
					.content {
						width: calc(100% - 94.54rpx - 59.99rpx - 20rpx);
						.text-white-bg {
							color: #e8e8e8;
							.text-border-x {
								margin-right: 25.45rpx;
							    position: relative;
								&:after {
									position: absolute;
									background: #dddddd;
								    top: 5.45rpx;
								    width: 1.81rpx;
									right: -12.72rpx;
								    height: 16.36rpx;
								    content: " ";
								}
							}
						}
					}
					&:after {
						width: 0;
						height: 0;
						border-bottom: 0;
					}
				}
				.cu-list.menu-avatar>.cu-item .content>view:first-child {
					font-size: 34.54rpx;
				}
			}
			.zaiui-user-info-num-box {
				.cu-list.grid.no-border {
					padding: 0;
				}
				.cu-list.grid.no-border>.cu-item {
				    padding-top: 27.27rpx;
				    padding-bottom: 9.09rpx;
				}
				.cu-list.grid {
					background-color: inherit;
				}
				.cu-list.grid>.cu-item text {
					color: #e8e8e8;
					font-size: 20rpx;
					line-height: 27.27rpx;
				}
			}
			.zaiui-user-info-tip-box {
				position: relative;
				margin: 18.18rpx 27.27rpx;
				border-radius: 9.09rpx;
				padding: 18.18rpx 27.27rpx;
				background: #ea8d8d;
				background-image: linear-gradient(45deg, #f7615f, #f553b3);
				.text-cut {
					padding-right: 45.45rpx;
				}
				.icon {
					position: absolute;
					right: 27.27rpx;
					top: 23.63rpx;
				}
			}
		}
		.zaiui-view-content {
			padding: 0 27.27rpx 54.54rpx;
			margin-top: -63.63rpx;
			.zaiui-user-info-order-box {
				border-radius: 18.18rpx;
				.cu-list.grid.no-border {
				    padding: 0;
				}
				.cu-list.grid.no-border>.cu-item {
				    padding-bottom: 9.09rpx;
				}
			}
			.cu-list.grid>.cu-item text {
			    color: inherit;
			}
			.zaiui-user-info-money-box {
				border-radius: 18.18rpx;
				.money-col {
					padding: 0 9.09rpx 9.09rpx;
					.money-item {
						position: relative;
						padding: 9.09rpx;
						.money-item-view {
							border: 1.81rpx solid #f3f2f3;
							border-radius: 18.18rpx;
							position: relative;
							padding: 9.09rpx;
							.cu-avatar {
								position: absolute;
								left: 9.09rpx;
							}
							.money-content {
								position: relative;
							    margin-left: 109.09rpx;
							    margin-bottom: 27.27rpx;
							    top: 12.72rpx;
							}
						}
					}
				}
			}
			.zaiui-user-info-tools-box {
				border-radius: 18.18rpx;
				.tools-view {
					position: relative;
					.tools-title {
						padding-right: 81.81rpx;	
					}
					.tools-right {
						position: absolute;
					    right: 9.09rpx;
					    bottom: 23.63rpx;	
					}
				}
				
			}
		}
	}
	.zaiui-my-box.show {
		display: block;
	}
</style>
