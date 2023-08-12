<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack @rightTap="rightTap">
			<block slot="content">注册</block>
		</bar-title>
		
		<!--登录图标-->
		<view class="zaiui-user-login-avatar-view">
			<image :src="src" class="cu-avatar round lg"></image>
		</view>
		
		<view style="margin: 30rpx 0;">
			<input focus="true" placeholder="输入手机号" v-model="account" style="background: #EEEEEE;padding: 20rpx 10rpx;height: 90rpx;margin: 0 50rpx;" />
			<input placeholder="输入密码" v-model="password" type="password" style="background: #EEEEEE;padding: 20rpx 10rpx;height: 90rpx;margin: 0 50rpx;margin-top: 20rpx;" />
			<input placeholder="再次输入密码" v-model="repassword" type="password" style="background: #EEEEEE;padding: 20rpx 10rpx;height: 90rpx;margin: 0 50rpx;margin-top: 20rpx;" />
			<input placeholder="输入邀请码" v-model="invite_code"  style="background: #EEEEEE;padding: 20rpx 10rpx;height: 90rpx;margin: 0 50rpx;margin-top: 20rpx;" />
			<input placeholder="输入昵称" v-model="real_name"  style="background: #EEEEEE;padding: 20rpx 10rpx;height: 90rpx;margin: 0 50rpx;margin-top: 20rpx;" />
			<view style="position: relative;">
				<input placeholder="输入短信验证码" v-model="code"  style="background: #EEEEEE;padding: 20rpx 10rpx;height: 90rpx;margin: 0 50rpx;margin-top: 20rpx;position: relative;" />
				<button @click="sendCode()"  :disabled="action" style="position: absolute;right: 50rpx;bottom: 5rpx;background-color: #007AFF;color: white;">
					{{getText()}}
				</button>
			</view>
			
			
		</view>
		
		<!--按钮-->
		<view class="flex flex-direction zaiui-btn-view" @click="login()">
			<button class="cu-btn bg-red">
				<text>注册</text>
			</button>
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
				password:"",
				repassword:"",
				invite_code:"",
				real_name:"",
				code:"",
				action:false,
				count_down: 60,
				downUrl:""
			
			}
		},
		onLoad(option) {
			this.invite_code = option.code
			
			var that = this
			uni.request({				
					url: config.config.url+"/common/index/shopInfo",				
					method: 'GET',
					data: {},
					success: res => {
						that.src = res.data.data.logo
						that.downUrl = res.data.data.downUrl				
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
			getText(){
				if(this.action == false){
					return '发送'
				}else{
					return "重新获取"+this.count_down
				}
			},
			sendCode(){
				if(!this.account){
					uni.showToast({
						title:"请填写手机",
						icon:"error"
					})
					return false
				}
			
				var that = this
				uni.request({				
						url: config.config.url+"/common/index/sendCode",				
						method: 'GET',
						data: {"phone":this.account},
						success: res => {
							that.action = true
							that.countDown()
											
				       },
						fail: () => {},
						complete: () => {}
				});
				
			
			},
			    // 倒计时
			countDown () {
			      var that = this
			      this.timer = setInterval(() => {
			        that.count_down = that.count_down - 1
					
			        if (that.count_down < 10) that.count_down = '0' + that.count_down
			        if (that.count_down <= 0) {
			          clearInterval(that.timer)
			          that.count_down = 60
					  that.action = false
			        }
			      },1000)
			},
			login(){
				var that = this
				uni.request({
						url: config.config.url+"/common/index/register",				
						method: 'POST',
						data: {
							"account":that.account,
							"password":that.password,
							"invite_code":that.invite_code,
							"repassword":that.repassword,
							"code":that.code,
							"real_name":that.real_name,
							
						},
						success: res => {
							if(res.data.code != 200){
								uni.showToast({
									title:res.data.msg,
									icon:"error"
								})
								return
							}else{
								
								window.location.href = this.downUrl
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
