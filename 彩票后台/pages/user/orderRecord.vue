<template>
	<view>
		<bar-title bgColor='bg-white' @rightTap="barEditTap">
			<block slot="content">订单记录</block>
			
		</bar-title>
		 <view class="example-body">
		 			<uni-datetime-picker v-model="range" @change="change($event)" type="datetimerange" @maskClick="maskClick" />
		 		</view>
		  <view class="content" >
		        <z-paging class="pages" ref="paging" v-model="dataList" @query="queryList" style="margin-top: 200rpx;">
		            <view class="item" v-for="(item,index) in dataList">
		                <view class="item-title" style="padding: 30rpx 20rpx;background-color: white;margin-bottom: 20rpx;" @click="open(item)">
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<view style="display: flex;align-items: center;">
									<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-right: 20rpx;">
										<gameImg :width="40" :height="40" :type="item.type"></gameImg>
										<text style="font-size: 24rpx;margin-top: 10rpx;color: #000000;font-weight: bold;">{{item.en_type}}</text>
									</view>
									<view style="display: flex;flex-direction: column;justify-content: center;align-items: flex-start;">
										<view :style="{color:item.state==2 || item.state==3?'red':'#797374','font-weight':'bold'}">
											{{item.en_state}}
										</view>
										<view style="padding: 10rpx 0;color: #515151;">{{item.order_time}}</view>
										<view style="color: #515151;">订单编号:{{item.order_no}}</view>
									</view>
								</view>
								<view style="color: #515151;">订单<text style="color: red;">{{item.amount}}元</text></view>
							</view>
							
							
						</view>
		            </view>
		        </z-paging>
				
				<uni-popup ref="popup" :mask-click="false" type="top"  style="z-index: 999999;"  backgroundColor="#FAFAFA">
					<scroll-view :style="{'overflow':'scroll','height':scrollH+'rpx'}" :scroll-y="true">
					
					<orderdetail :style="{'overflow':'scroll'}" :orderdetail="this.orderdetail" @closeWindow = "closeWindow()"></orderdetail>
					
					</scroll-view>
					
				</uni-popup>
		  </view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import orderdetail from '@/components/zaiui-common/basics/orderdetail';
	import gameImg from "@/components/zaiui-common/basics/gameImg.vue"
	export default{
		name:"orderRecord",
		components: {
			barTitle,orderdetail,gameImg
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
	    data(){
			return {
				maskClick:false,
				range: [],
				emulator_Height: 0,
				state:-1,
				dataList:[],
				orderdetail:{},
				uid:"",
			}
		},
		methods:{
			change(e){
			this.range = e
				var data = {"uid":this.uid,"range":this.range}
					this.$api.getOrderRecord(data).then(res=>{
						this.$refs.paging.complete(res.data);
					})
				},
			open(item){
				this.orderdetail = item
				this.orderdetail["flag"] = 0
				this.$refs.popup.open("top")
			},
			closeWindow(){
				this.$refs.popup.close("top")
			},
			barEditTap() {
				
			},
			getList(){
				
			},
			queryList(pageNo, pageSize){
			
				var data = {"pageNo":pageNo,"pageSize":pageSize,"uid":this.uid,"range":this.range}
				this.$api.getOrderRecord(data).then(res=>{
					this.$refs.paging.complete(res.data);
				})
			}
		},
		onLoad(option) {
			this.uid = option.uid
			let self = this;
			uni.getSystemInfo({
			    success: function(res) {
			 
			        self.emulator_Height = (res.screenHeight * (750 / res.windowWidth)) //将px 转换rpx
			   
			    }
			});
		}
		
	}
</script>

<style lang="scss" scoped>
	.pages{
		/* #ifndef MP */
		margin-top: calc(var(--status-bar-height) + 121rpx);
		/* #endif */
		
		/* #ifdef MP */
		margin-top: calc(var(--status-bar-height) + 181rpx);
		/* #endif */
	}
	.image_{
		width: 60rpx;
		height: 60rpx;
	}
</style>
