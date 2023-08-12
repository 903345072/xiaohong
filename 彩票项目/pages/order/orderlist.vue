<template>
	<view>
		<bar-title bgColor='bg-white' @rightTap="barEditTap">
			<block slot="content">订单记录</block>
			<block slot="right" style="display: flex;align-items: center;">
				
				<text class="cuIcon-searchlist" style="font-size: 40rpx;"></text>
				<picker @change="bindPickerChange" :value="index" style="flex:1;margin: 0 20rpx;" :range="array">
					筛选
				</picker>
			</block>
		</bar-title>
		 
		  <view class="content" >
		       
		            <view class="item" v-for="(item,index) in dataList">
		                <view class="item-title" style="padding: 30rpx 20rpx;background-color: white;margin-bottom: 20rpx;" @click="open(item)">
							<view style="display: flex;align-items: center;justify-content: space-between;">
								<view style="display: flex;align-items: center;">
									<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;margin-right: 20rpx;">
										<game-img :width="60" :height="60" :type="item.type"></game-img>
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
		 
						
				<uni-popup ref="popup" :mask-click="false" type="top"  style="z-index: 999999;top: 101rpx;"  backgroundColor="#FAFAFA">
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
	import gameImg from '@/components/zaiui-common/basics/gameImg.vue'
	export default{
		name:"orderlist",
		components: {
			barTitle,orderdetail,gameImg
		},
	    onReachBottom() {
	    	this.getList(1)
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
				emulator_Height: 0,
				state:0,
				dataList:[],
				orderdetail:{},
				array: [],
				index: 0,
				pageNo:1,
				pageSize:10,
				hava:true
			}
		},
		methods:{
			bindPickerChange(e){
				this.pageNo = 1
				this.hava = true
				this.state = e.target.value
			
				this.getList(0)
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
			getList(flag){
				if(this.hava == false){
					return
				}
				if(flag == 0){
					this.pageNo = 1
				}
				if(flag == 1){
					this.pageNo++
				}
				this.array[0] = "全部"
				this.array[1] = "待出票"
				this.array[2] = "待开奖"
				this.array[3] = "未中奖"
				this.array[4] = "待派奖"
				this.array[5] = "已派奖"
				var data = {"state":this.state,"pageNo":this.pageNo,"pageSize":this.pageSize}
				this.$api.getOrderList(data).then(res=>{
					
					if(flag == 0){
						this.dataList = res.data
					}else{
						if(res.data.length == 0){
							this.hava=false
						}
						this.dataList = this.dataList.concat(res.data)
					}
					
					
				})
			},
			
		},
		onLoad() {
			this.getList(0)
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
	.popup-content[data-v-4141175d] {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  justify-content: center;
	  padding: 15px;
	
	  background-color: #fff;
	  }
</style>
