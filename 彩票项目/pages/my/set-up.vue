<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">设置</block>
		</bar-title>
		
		<!--设置列表-->
		<view class="cu-list menu margin-top">
			<view class="cu-item">
				<view class="content">密码</view>
				<view class="action">
					<input v-model="pwd" type="password" placeholder="请输入密码" />
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
				pwd:""
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
			savePwd(){
				var data = {
					"pwd":this.pwd
				}
				this.$api.savePwd(data).then(res=>{
					uni.showToast({
						title:"修改成功"
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
