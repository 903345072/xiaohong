<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">支付设置</block>
		</bar-title>
		
		<!--设置列表-->
		<view style="padding: 20rpx 20rpx;">支付二维码</view>
		<view style="padding: 20rpx 0;">
			<view style="display: inline-block;padding: 10rpx 20rpx;"  v-for="(item,index) in imgArr" class="ddd">
			  <view style="position: relative;">
				  <image style="width: 150rpx;height: 150rpx;" :src="item"></image>
				  <view @click="deleteImg(index)" style="position: absolute;right: 10rpx;top: 10rpx;z-index: 9999;background-color: black;color: white;padding: 5rpx 5rpx;" class="cuIcon-close" ></view>
			  </view>
			</view>
			<view v-if="imgArr.length<1" @click="choosePhoto()" style="background-color: #EEEEEE;display: flex;justify-content: center;align-items: center;width: 130rpx;height: 130rpx;font-size: 50rpx;padding: 0 20rpx;">
				+
			</view>
		</view>
		
		<view style="padding: 20rpx 20rpx;">银行卡设置</view>
		
		
		<view class="cu-list menu margin-top">
			<view class="cu-item">
				<view class="content">卡号</view>
				<view class="action">
					<input v-model="bank_card" type="text" placeholder="请输入卡号" />
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">开户人</view>
				<view class="action">
					<input v-model="bank_user"  placeholder="请输入开户人"/>
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">开户行</view>
				<view class="action">
					<input v-model="bank_name"  placeholder="请输入开户行"/>
				</view>
			</view>
		</view>
		<!-- <view class="cu-list menu sm-border margin-top">
			<view class="cu-item arrow" @tap="personalTap">
				<view class="content">个人资料</view>
			</view>
			<view class="cu-item arrow" @tap="realNameTap">
				<view class="content">实人认证</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">隐私设置</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">消息通知</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">已屏蔽的人</view>
			</view>
			<view class="cu-item">
				<view class="content">缓存清理</view>
				<view class="action">
					<text class="cuIcon-delete text-grey"/>
				</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">播放控制</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">关于平台</view>
			</view>
			<view class="cu-item arrow">
				<view class="content">给一个好评吧</view>
			</view>
		</view> -->
		
		<!--按钮-->
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom" @click="uploadPhoto()">
			<view class="flex padding-sm flex-direction">
				<button class="cu-btn bg-red">保存</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	import config from "@/api/interface.js"
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				skin: true,
				pwd:"",
				gonggao:"",
				u_account:"",
				u_name:"",
				u_pwd:"",
				imgArr:[],
				bank_user:"",
				bank_name:"",
				bank_card:""
			}
		},
		onLoad() {
			
		},
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			
			
			deleteImg(index){
				this.imgArr.splice(index,1)
			},
			choosePhoto(id) {
				var that = this
				uni.chooseImage({
					count: 1, //最多可以选择的图片张数，默认9
					sourceType: ['album','camera'], //album 从相册选图，camera 使用相机，默认二者都有。如需直接开相机或直接选相册，请只使用一个选项
					sizeType: ['original'],//original 原图，compressed 压缩图，默认二者都有
					success(res) {
						if(res.tempFilePaths.length>0){
							for(let ii in res.tempFilePaths){
								that.imgArr.push(res.tempFilePaths[ii])
							}
						}
					
						
						//that.uploadPhoto(res.tempFilePaths,id);
					},
					fail() {
						console.log('失败', err);
					},
					complete() {
						console.log('结束');
					},
				})
			},
			
			uploadPhoto() { 
				
				var that = this
				let imgArrs = that.imgArr.map((value, index) => {
					return {
						name: 'files'+(index),
						uri : value,
					};
				});
			
				uni.uploadFile({
					url: config.config.baseUrl+"User/payset", //开发者服务器 url
					header:{
						'token':uni.getStorageSync("token")
						
						// HTTP 请求 Header, header 中不能设置 Referer
					},
					files: imgArrs, // 要上传文件资源的路径
				
					formData:{
						"bank_user":that.bank_user,
						"bank_name":that.bank_name,
						"bank_card":that.bank_card,
						// HTTP 请求中其他额外的 form data （即接口需要的其它参数）
					},
					success(res) {
						uni.showToast({
							title:"操作成功"
						})
					
					
					},
					fail(err) {
						uni.showToast({
						title:err.errMsg
						})
					},
					complete() {
						console.log('结束');
					},
				})
			},
			
			savePwd(){
				var data = {
					"pwd":this.pwd,
					"gonggao":this.gonggao,
					"u_pwd":this.u_pwd,
					"u_name":this.u_name,
					"u_account":this.u_account
				}
				this.$api.savePwd(data).then(res=>{
					uni.showToast({
						title:"操作成功"
					})
				})
			},
			SwitchSex(e) {
				this.skin = e.detail.value
			},
			realNameTap() {
				uni.navigateTo({
					url: "/pages/real_name/index"
				});
			},
			personalTap() {
				uni.navigateTo({
					url: "/pages/my/personal-data"
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
</style>
