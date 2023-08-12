<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">设置</block>
		</bar-title>
		
		<!--设置列表-->
		<view style="padding: 20rpx 20rpx;">系统设置</view>
		<view class="cu-list menu margin-top">
			<view class="cu-item">
				<view class="content">密码</view>
				<view class="action">
					<input v-model="pwd" type="text" placeholder="请输入密码(不填不保存)" />
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">公告显示</view>
				<view class="action">
					<input v-model="gonggao"  placeholder="请输入公告(不填不保存)" />
				</view>
			</view>
		</view>
		
		<view style="padding: 20rpx 20rpx;">添加用户</view>
		
		
		<view class="cu-list menu margin-top">
			<view class="cu-item">
				<view class="content">账号</view>
				<view class="action">
					<input v-model="u_account" type="text" placeholder="请输入手机号(不填不保存)" />
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">昵称</view>
				<view class="action">
					<input v-model="u_name"  placeholder="请输入昵称(不填不保存)"/>
				</view>
			</view>
			
			<view class="cu-item">
				<view class="content">密码</view>
				<view class="action">
					<input v-model="u_pwd"  placeholder="请输入密码(不填不保存)"/>
				</view>
			</view>
		</view>
		
		<view style="padding: 20rpx 20rpx;">清除订单数据(慎选)</view>
		
		
		<view class="example-body" >
				<uni-datetime-picker   v-model="range" @change="change($event)" type="date" @maskClick="maskClick" />
		</view>
	   
		
		<!--按钮-->
		<view class="bg-white zaiui-footer-fixed zaiui-foot-padding-bottom" @click="savePwd()">
			<view class="flex padding-sm flex-direction">
				<button class="cu-btn bg-red">保存</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
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
				month:"",
				mothiList:['01','02','03','04','05','06','07','08','09','10','11','12'],
				maskClick:false,
				range:"",
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
			change(e){
			
				this.range = e
				
			},
			changeType(index){
			    if(this.month != index){
					this.month = index
				}else{
					this.month = ""
				}
				
			
			},
			savePwd(){
				var data = {
					"pwd":this.pwd,
					"gonggao":this.gonggao,
					"u_pwd":this.u_pwd,
					"u_name":this.u_name,
					"u_account":this.u_account,
					"time":this.range
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
	.check_list{
		width: 200rpx;
		border-radius: 10rpx;
		padding: 10rpx 0;
		margin: 15rpx 10rpx;
		text-align: center;
		display: inline-block;
	}
	.unchecked{
		border: 1px solid #CCCCCC;
		color: grey;
		
	}
	.checked_{
		background-color: red;
		color: white;	
	}
</style>
