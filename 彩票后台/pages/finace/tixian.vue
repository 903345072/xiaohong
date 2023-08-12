<template>
	<view>
		<bar-title bgColor="bg-white" isBack @rightTap="rightTap">
			<block slot="content">提现申请</block>
			<block slot="right">历史记录</block>
		
		</bar-title>
		
		<z-paging class="pages" ref="paging" v-model="dataList" @query="queryList">
		    <view class="item" v-for="(item,index) in dataList">
		        <view class="item-title" style="padding: 30rpx 20rpx;background-color: white;margin-bottom: 20rpx;" >
							<view style="display: flex;align-items: center;border-bottom: 1px solid #b4b4b4;justify-content: space-between;padding-bottom: 10rpx;">
								<view @click.stop="copy(item.real_name)">
									<text>{{item.real_name}}</text>
									<text class="cuIcon-copy"></text>
								</view>
								<view >
									<text>{{item.extract_price}}</text>
									<text style="margin-left: 10rpx;background: #00aaff;color: white;padding: 5rpx 10rpx;border-radius: 15rpx;">{{item.en_type}}</text>
								
								</view>
							</view>			
							
							<view style="display: flex;align-items: center;margin: 40rpx 0">
								<image :src="getSrc(item.user.avatar)" style="width: 100rpx;height: 100rpx;border-radius: 100rpx;"></image>
								<view style="display: flex;flex-direction: column;margin-left: 20rpx;">
									<view @click.stop="copy(item.account)">
										<text>{{item.en_type.substring(0,1)}}</text>
										<text>{{item.account}}</text>
										<text class="cuIcon-copy"></text>
									</view>
									
									<view @click.stop="copy(item.user.phone)" style="margin: 6rpx 0;">
										<text class="cuIcon-phone"></text>
										<text>{{item.user.phone}}</text>
										<text class="cuIcon-copy"></text>
									</view>
									<view>{{item.add_time}}</view>
								</view>
							</view>	
							
							<view style="width: 100%;display: flex;justify-content: space-around;color: white;">
								<view @click="refuse(item.id)" style="width: 35%;height: 50rpx;text-align: center;background-color: red;border-radius: 20rpx;line-height: 50rpx;">拒绝</view>
								<view @click="pass(item.id)" style="width: 35%;height: 50rpx;text-align: center;background-color: #007AFF;border-radius: 20rpx;line-height: 50rpx;">同意</view>
							</view>
							
							 <uni-popup ref="dialogInput" type="dialog">
							     <uni-popup-dialog mode="input" title="备注信息"   value="" placeholder="请输入备注内容" @confirm="dialogInputConfirm"/>
							  </uni-popup>
											
											
				</view>
		    </view>
		</z-paging>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import config from '@/api/interface.js'
	export default{
		name:"tixian",
		data(){
			return {
				dataList:[],
				id:""
			
			}
		},
		components: {
		  barTitle
		},
		methods:{
			getSrc(src){
				
				return config.config.url+src
			},
			dialogInputConfirm(val){
				var data = {"id":this.id,"mark":val}
				this.$api.refuseWithdraw(data).then(res=>{
			this.$refs.paging.reload()
				})
			},
			refuse(id){
			    this.id = id
				 this.$refs['dialogInput'][0].open()
			},
			pass(id){
				var data = {"id":id}
				var that = this
				uni.showModal({
					title:"确认通过?",
					success: (res) => {
						if(res.confirm) {  
							that.$api.passWithdraw(data).then(res=>{
								
								this.$refs.paging.reload()
							})
						} else {  
							
							}  
						} 
					
				})
			},
			rightTap(){
				uni.navigateTo({
					url:"/pages/finace/withdrawList"
				})
			},
			queryList(pageNo, pageSize){
			
				var data = {"state":this.state,"pageNo":pageNo,"pageSize":pageSize}
				this.$api.getWithdrawApplyList(data).then(res=>{
					this.$refs.paging.complete(res.data);
				})
			},
			copy(item){
				uni.setClipboardData({
									data: item,
									success: function() {
										uni.showToast({
											title:'复制成功'
										})
									}
								})
				
			},
		}
		
	}
</script>

<style>
	.pages{
		/* #ifndef MP */
		margin-top: calc(var(--status-bar-height) + 121rpx);
		/* #endif */
		
		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 181rpx);
		/* #endif */
	}
</style>
