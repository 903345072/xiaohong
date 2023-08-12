<template>
	<view>
		<bar-title bgColor="bg-white" :isBack="true" >
			<block slot="content">找回密码</block>
		</bar-title>
		<view style="margin: 30rpx 0;">
			<input focus="true" placeholder="输入手机号" v-model="account" style="background: #EEEEEE;padding: 20rpx 10rpx;height: 90rpx;margin: 0 50rpx;" />
			<input placeholder="输入新密码" v-model="password" type="password" style="background: #EEEEEE;padding: 20rpx 10rpx;height: 90rpx;margin: 0 50rpx;margin-top: 20rpx;" />
			<view style="position: relative;">
				<input placeholder="输入短信验证码" v-model="code"  style="background: #EEEEEE;padding: 20rpx 10rpx;height: 90rpx;margin: 0 50rpx;margin-top: 20rpx;position: relative;" />
				<button @click="sendCode()"  :disabled="action" style="position: absolute;right: 50rpx;bottom: 5rpx;background-color: #007AFF;color: white;">
					{{getText()}}
				</button>
			</view>
			
			<view class="flex flex-direction zaiui-btn-view" style="width: 80%;margin-left: 10%;margin-top: 60rpx;" @click="getpwd()">
				<button class="cu-btn bg-red">
					<text>找回</text>
				</button>
			</view>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import config from '@/api/interface.js'
	export default{
		name:"forget",
		components:{
			barTitle
		},
		data(){
			return {
		
				account:"",
				password:"",
				code:"",
				action:false,
				count_down: 60,
			
			}
		},
		methods:{
			getpwd(){
				uni.request({
						url: config.config.url+"/common/index/getPwd",				
						method: 'POST',
						data: {"phone":this.account,'password':this.password,'code':this.code},
						success: res => {
								if(res.data.code != 200){
										uni.showToast({
												title:res.data.msg,
												icon:"error"
											})
											return
								}else{
									uni.showToast({
											title:'设置成功',
											
										
										})
										setTimeout(()=>{
											uni.navigateBack()
										},1000)
										
										
								}
																	
						},
						fail: () => {},
						complete: () => {}
				});
			},
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
						data: {"phone":this.account,'type':'forget'},
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
		}
	}
</script>

<style>
</style>
