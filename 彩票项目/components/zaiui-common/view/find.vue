<template>

	<view class="zaiui-find-box" :class="show?'show':''">

		<!--分类标题栏-->
		<bar-title bgColor="bg-white" :isBack="isBack">
			<block slot="content">跟单大厅</block>
			<block slot="left">
				<view @click="goSearch()" class="cuIcon-search"></view>
				<!-- <view class="cuIcon-people" style="margin-left: 40rpx;"></view> -->
			</block>
			<block slot="right">
				<view @click="refresh()" class="cuIcon-refresh" ></view>
			</block>
		</bar-title>
		
        <view class="content" >
			
					<scroll-view scroll-y>
						<dashen></dashen>
						<view style="z-index: 0;position: sticky;top :100;">
							<tabs-view @change="tabsChange" :current="current" :items="tabList"></tabs-view>
						</view>
						<swiper @change="swiperChange"   class="swiper" :style="[{height:swiperHeight+'rpx'}]" :current="current" >
						    <swiper-item  class="swiper-item" style="height: 100%;" v-for="(item, index) in tabList"
						        							:key="index">
						        <flowList v-if="index == current"   :type="index" @heightChanged="heightChanged" style="height: 100%;" :ref="index" :tabIndex="index" :currentIndex="current">
						        </flowList>
						    </swiper-item>
						</swiper>
					</scroll-view>
        </view>
	</view>

</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import config from "@/api/interface.js"
	import flowList from "@/components/zaiui-common/flow/flowList.vue"
	import uTabsSwiper from "@/uni_modules/z-paging/components/u-tabs-swiper/u-tabs-swiper"
    import tabsView from "@/uni_modules/z-paging/components/tabs-view/tabs-view"
	import stickySwiperNextItem from "@/uni_modules/z-paging/components/sticky-swiper-next-item/sticky-swiper-next-item"
	import dashen from "@/components/zaiui-common/basics/dashen"
	export default {
		name: 'flow',
		components: {
			barTitle,
			flowList,
			uTabsSwiper,
			dashen
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
		
       
		props: {
			
			index: {
				type: Number,
				default: 1
			},
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
		data() {
			return {
				list:[],
				isBack: false,
			
				config: "",
				TabCur: 0,
				tabList: [{
						name: '人气跟单',
						type: "buy_lottery"
					},
					{
						name: '跟单总额',
						type: "recharge"
					},
					{
						name: '我的关注',
						type: "system"
					},

				],
			
				
				refresherStatus: 0,
				swiperHeight: 1000,
				tabList: ['人气跟单', '跟单总额', '我的关注'],
				current: 0, // tabs组件的current值，表示当前活动的tab选项

			}
		},
		created() {

			this.config = config
		
		
		},
	
		watch: {
		scrollBottom() {
			
			if(this.scrollBottom != 0 && this.index == 1) {
			var t = this.current
				this.$refs[t][0].getList(1);
			}
		},
		},

		methods: {
			refresh(){
				
				var t = this.current
				this.$refs[t][0].refresh();
			},
		swiperChange(e) {
			
		this.current = e.target.current;
		var t = this.current
		this.$nextTick(()=>{
			this.$refs[t][0].getList(0);
		}) 
		},
			goSearch() {
				uni.navigateTo({
					url: "/pages/flow/searchUser"
				})
			},
			goHomePage(uid) {
				uni.navigateTo({
					url: "/pages/flow/homePage?uid=" + uid
				})
			},
		
			tabsChange(index) {
				
				this.current = index;
				var t = this.current
		        // this.$nextTick(()=>{
		        // 	this.$refs[t][0].getList(0);
		        // }) 
				
			},

			heightChanged(height){
				if(height === 0){
					//默认swiper高度为屏幕可用高度-tabsView高度-slot="top"内view的高度
					height = uni.getSystemInfoSync().windowHeight - uni.upx2px(80);
				}
				this.swiperHeight = height;
			
			},
	  }
	}
</script>

<style lang="scss" scoped>


	.paging-content {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.swiper {
		flex: 1;
	}

	.zaiui-find-box {
		display: none;
	}

	.zaiui-find-box.show {
		display: block;
	}

	.zaiui-title-tab-box {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 999999;
		padding: calc(var(--status-bar-height) + 9.09rpx) 27.27rpx 9.09rpx 9.09rpx;

		.flex {
			.basis-l {
				flex-basis: 70%;
			}

			.basis-s {
				flex-basis: 30%;
			}
		}
	}

	.zaiui-seat-height {
		width: 100%;

		/* #ifndef MP */
		height: calc(var(--status-bar-height) + 81.81rpx);
		/* #endif */

		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 185rpx);
		/* #endif */
	}

	.zaiui-view-content {
		padding: 0 27.27rpx 54.54rpx;
	}
</style>