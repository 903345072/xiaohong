<template>
	<view class="zaiui-news-box" :class="show?'show':''">
		<!--标题栏-->
		<bar-title bgColor="bg-white" :isBack="true" @rightTap="barTitleRightTap">
			<block slot="content">比分中心</block>
			
		</bar-title>
	
		
	
		
		<view><web-view   :src="url"></web-view></view>
		<view style="background-color: white;left: 0;right: 0;bottom: 0;position: fixed;z-index: 9999;height: 206rpx;"></view>
		
		<!--占位底部距离-->
		<view class="cu-tabbar-height"/>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';

	export default {
		name: 'index',
		components: { 
			barTitle
		},
		data() {
			return {
				url:"",show:true,
			}
		},
	
	
	
		onLoad(option) {
			console.log(1231232113)
			if(option.url == "foot"){
				this.url =  "https://m.sporttery.cn/mjc/zqsgkj/"
			}
			if(option.url == "basket"){
				this.url = "https://m.sporttery.cn/mjc/lqsgkj/"
			}
		},
		methods: {
		
		
		}
	}
</script>

<style lang="scss" scoped>
	.zaiui-news-box {
		width: 100%;
		display: none;
		.zaiui-follow-box {
			.action-text-cut {
				width: 70%;
			}
		}
		.zaiui-grid-menu {
			.cu-list.grid.no-border>.cu-item {
				.cu-avatar {
					margin: 0 auto;
				}
			}
		}
		.zaiui-news-list-box {
			padding: 0 9.09rpx;
			.cu-list.menu-avatar>.cu-item>.cu-avatar {
				width: 81.81rpx;
				height: 81.81rpx;
			}
			.cu-list.menu-avatar>.cu-item {
				height: 163.63rpx;
				align-items: inherit;
				.cu-avatar {
					margin-top: 25.45rpx;
					.cu-tag.badge {
					    width: 21.81rpx;
					    height: 21.81rpx;
					    top: 0;
					    right: 0;
					    border: 1.81rpx solid #fff;	
					}
				}
				.content {
				    left: 136.36rpx;
					margin-top: 18.18rpx;
				    width: calc(100% - 90.9rpx - 54.54rpx - 18.18rpx);
				    line-height: 1.7em;	
					.cu-tag {
						padding: 0 3.63rpx;
						text {
							position: relative;
							top: -2rpx;
						}
					}
				}
				&:after {
					width: 0;
					height: 0;
					border-bottom: 0;
				}
			}
			.cu-list.menu-avatar>.cu-item.goods {
				.content {
				    width: calc(100% - 309.09rpx);
				}
				.action {
					position: absolute;	
				    right: 23.63rpx;
					width: 127.27rpx;
					.cu-avatar {
						width: 127.27rpx;
						height: 127.27rpx;
						margin-top: 18.18rpx;
					}
				}
			}
		}
	}
	.zaiui-news-box.show {
		display: block;
	}
</style>
