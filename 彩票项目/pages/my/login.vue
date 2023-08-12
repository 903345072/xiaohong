<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" :isBack="false" >
			<block slot="content">登录</block>
		</bar-title>
		
		<!--登录图标-->
		<view class="zaiui-user-login-avatar-view">
			<image :src="src" class="cu-avatar round lg"></image>
		</view>
		
		<view style="margin: 30rpx 0;">
			<input type="text" focus="true" placeholder="输入手机号" v-model="account" style="background: #EEEEEE;padding: 20rpx 10rpx;height: 90rpx;margin: 0 50rpx;" />
			<input placeholder="输入密码" v-model="password" type="password" style="background: #EEEEEE;padding: 20rpx 10rpx;height: 90rpx;margin: 0 50rpx;margin-top: 20rpx;" />
		</view>
		
		<!--按钮-->
		<view class="flex flex-direction zaiui-btn-view" @click="login()">
			<button class="cu-btn bg-red">
				
				<text>登录</text>
			</button>
		</view>
		
		<!--协议-->
		<view class="zaiui-agreement-checked-view" style="display: none;">
			<!-- <checkbox class='round red sm zaiui-checked checked'/> -->
			<view class="text-sm text-black-view">
				<!-- <view class="text-gray">已阅读并同意以下协议</view> -->
				<view @click="goResiger()" class="text-red">没有账号,立即注册?</view>
			</view>
		</view>
	
		<view class="zaiui-agreement-checked-view" style="">
			<!-- <checkbox class='round red sm zaiui-checked checked'/> -->
			<view class="text-sm text-black-view">
				<!-- <view class="text-gray">已阅读并同意以下协议</view> -->
				<view @click="goForget()" class="text-red">忘记密码</view>
			</view>
		</view>
		<!--底部说明
		<!-- <view class="text-sm text-gray zaiui-foot-ad-view">腾讯投资-更专业的闲置二手交易平台</view> -->
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	import config from '@/api/interface.js'
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				src:"",
				account:"",
				password:""
			}
		},
		onLoad() {
			var that = this
			uni.request({				
					url: config.config.url+"/common/index/shopInfo",				
					method: 'GET',
					data: {},
					success: res => {
						that.src = res.data.data.logo
										
			       },
					fail: () => {},
					complete: () => {}
			});
			
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			goForget(){
				uni.navigateTo({
					url:"/pages/my/forget"
				})
			},
			goResiger(){
				uni.navigateTo({
					url:"/pages/my/register"
				})
			},
			login(){
				var that = this
				uni.request({
						url: config.config.url+"/common/index/userLogin",				
						method: 'POST',
						data: {
							"account":that.account,
							"password":that.password
						},
						success: res => {
							if(res.data.code != 200){
								uni.showToast({
									title:"用户名或密码不正确",
									icon:"error"
								})
								return
							}else{
								
								uni.setStorageSync("bear_token",res.data.data.token)
							
								uni.reLaunch({
									url:"/pages/app/index"
								})
							}
											
				       },
						fail: () => {},
						complete: () => {}
				});
			}
			
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
		@import "../../static/colorui/main.css";
		@import "../../static/colorui/icon.css";
		@import "../../static/zaiui/style/app.scss";
	/* #endif */
	
	.zaiui-user-login-avatar-view {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 218.18rpx;
		.cu-avatar {
		    width: 181.81rpx;
		    height: 181.81rpx;	
		}
	}
	.zaiui-btn-view {
		position: relative;
		margin-top: 72.72rpx;
		padding: 0 45.45rpx;
		.cu-btn .icon {
			position: relative;
			font-size: 47.27rpx;
			right: 9.09rpx;
			top: -3.63rpx;	
		}
	}
	.zaiui-agreement-checked-view {
		position: relative;
		padding: 27.27rpx 45.45rpx;
		.zaiui-checked {
			position: absolute;
			transform: scale(0.7);
		}
		.text-black-view {
			padding-left: 54.54rpx;
			line-height: 47.27rpx;
		}
	}
	.zaiui-foot-ad-view {
		position: fixed;
		text-align: center;
	    bottom: 72.72rpx;
	    width: 100%;	
	}
</style>
