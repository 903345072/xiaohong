<template>
	<view>
		<bar-title bgColor='bg-white' @rightTap="barEditTap">
			<block slot="content">比赛分析</block>
			
		</bar-title>
		<web-view :src="getSrc()" style="margin-top: 35rpx;"></web-view>
		<view style="background-color: white;left: 0;right: 0;bottom: 0;position: fixed;z-index: 9999;height: 174rpx;"></view>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	export default{
		name:"fenxi",
		components:{
			barTitle
		},
		data(){
			return {
				id:""
			}
		},
		onLoad(option) {
			this.id = option.game_id
			
		},
		methods:{
			getSrc(){
			
				return "http://m.310win.com/Trade/Info/MatchAnalysis.aspx?sportType=1&useUIWebView=1&scheduleId="+this.id
				//return "http://m.bet007.com/Analy/Analysis/"+this.id+".htm"
			}
		}
	}
</script>

<style>
</style>
