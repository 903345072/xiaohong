<template>
	<view>
		<view style="display: flex;align-items: center;justify-content: space-around;color: grey;">
			<view>用户</view>
			<view>跟单金额</view>
		</view>
		<view style="background-color: #ff976a;text-align: center;color: white;margin: 20rpx 0;height: 50rpx;line-height: 50rpx;border-radius: 10rpx;">默认展示前10位跟单用户</view>
			<view>
				<view  :style="{'display': 'flex','align-items': 'center','justify-content': 'space-between','margin': '20rpx 10rpx','background':index%2==0?'white':'#f9f9f9','padding':'15rpx 10rpx'}" v-for="(item,index) in list" :key="index">
					<view style="display: flex;align-items: center;">
						<view><image style="width: 50rpx;height: 50rpx;border-radius: 50rpx;" :src="config.config.url+item.user.avatar"></image></view>
						<view style="margin-left: 20rpx;">{{getName(item.user.real_name)}}</view>
					</view>
					<view style="color: red;">
						￥{{item.amount}}
					</view>
				</view>
			</view>
	</view>
</template>

<script>
	import config from "@/api/interface.js"
	export default{
		name:"flowRecord",
		data(){
			return {
				list:[],
				config:""
			}
		},
		props:{
			id:null
		},
		created() {
			this.config = config
			var data = {"id":this.id}
			this.$dashen.getFlowRecord(data).then(res=>{
				this.list = res.data
			})
		},
		methods:{
			getName(item){
				var len = item.length
				return item.substr(0,1)+"*"+item.substr(len-1,1)
			}
		},
		onLoad(option) {
			
		}
	}
</script>

<style>
</style>
