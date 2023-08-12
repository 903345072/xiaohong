<template>
	<view>
		<bar-title bgColor="bg-white" isBack >
			<block slot="content">排列三</block>
		</bar-title>
		<view>
			<view @click="zhedie" v-if="data.length>0" style="display: flex;align-items: center;padding: 20rpx 20rpx;border-bottom: 1px solid #eee;">
				<view style="color: grey;">{{data[0]['qh']}}期</view>
				<view style="display: flex;align-items: center;margin-left: 30rpx;">
					<view style="display: flex;" >
						<view class="qq">{{data[0]['value'][0]}}</view>
						<view class="qq">{{data[0]['value'][1]}}</view>
						<view class="qq">{{data[0]['value'][2]}}</view>
					</view>
					<view>
						<view  :class="[{'cuIcon-fold':is_zhedie==true,'cuIcon-unfold':is_zhedie==false}]"></view>
					</view>
				</view>
			</view>
			<view  v-show="this.is_zhedie == true" >
				<view v-for="(item,index) in data.slice(1)" :key="index" :style="{'background-color':index%2==0?'#dceaee':'white','width':'100%','padding':'20rpx 20rpx'}">
					<view style="display: flex;">
						<view style="color: grey;">{{item['qh']}}期</view>
						<view style="display: flex;align-items: center;margin-left: 25rpx;">
							<view class="gg">{{item['value'][0]}}</view>
							<view class="gg">{{item['value'][1]}}</view>
							<view class="gg">{{item['value'][2]}}</view>
						</view>
					</view>
				</view>
			</view>
			<view>
				<tabs-view @change="tabsChange"   :current="current" :items="tabList"></tabs-view>
				<swiper @change="swiperChange"   class="swiper" style="height: 1000rpx;" :current="current" >
				    <swiper-item  class="swiper-item" style="height: 100%;" >
				     <view style="display: flex;padding: 20rpx 20rpx;border-bottom: 1px solid #eee;">
						<view>百位:</view>
						<view style="margin-left: 20rpx;">
							<view style="display: flex;">
													  <view  v-for="(item,index) in d1" :key="index" style="display: flex;" v-if="index<5">
														  <view @click="changed1(index)" :style="{'background-color': item.checked==true?'red':'#f3d2d2','color': item.checked==true?'white':'red','width': '60rpx','height': '60rpx','line-height': '60rpx','border-radius': '60rpx','text-align': 'center','margin': '0 15rpx'}">{{item.value}}</view>
													  </view>
							</view>
							
							<view style="display: flex;margin-top: 10rpx;">
									<view  v-for="(item,index) in d1" :key="index" style="display: flex;" v-if="index>=5">
											<view @click="changed1(index)" :style="{'background-color': item.checked==true?'red':'#f3d2d2','color': item.checked==true?'white':'red','width': '60rpx','height': '60rpx','line-height': '60rpx','border-radius': '60rpx','text-align': 'center','margin': '0 15rpx'}">{{item.value}}</view>
									</view>
							</view>
						</view>
					 </view>
					 
					 <view style="display: flex;padding: 20rpx 20rpx;border-bottom: 1px solid #eee;">
					 						<view>十位:</view>
					 						<view style="margin-left: 20rpx;">
					 							<view style="display: flex;">
					 													  <view  v-for="(item,index) in d2" :key="index" style="display: flex;" v-if="index<5">
					 														  <view @click="changed2(index)" :style="{'background-color': item.checked==true?'red':'#f3d2d2','color': item.checked==true?'white':'red','width': '60rpx','height': '60rpx','line-height': '60rpx','border-radius': '60rpx','text-align': 'center','margin': '0 15rpx'}">{{item.value}}</view>
					 													  </view>
					 							</view>
					 							
					 							<view style="display: flex;margin-top: 10rpx;">
					 									<view  v-for="(item,index) in d2" :key="index" style="display: flex;" v-if="index>=5">
					 											<view @click="changed2(index)" :style="{'background-color': item.checked==true?'red':'#f3d2d2','color': item.checked==true?'white':'red','width': '60rpx','height': '60rpx','line-height': '60rpx','border-radius': '60rpx','text-align': 'center','margin': '0 15rpx'}">{{item.value}}</view>
					 									</view>
					 							</view>
					 						</view>
					 </view>
					 
					 <view style="display: flex;padding: 20rpx 20rpx;border-bottom: 1px solid #eee;">
					 						<view>个位:</view>
					 						<view style="margin-left: 20rpx;">
					 							<view style="display: flex;">
					 													  <view  v-for="(item,index) in d3" :key="index" style="display: flex;" v-if="index<5">
					 														  <view @click="changed3(index)" :style="{'background-color': item.checked==true?'red':'#f3d2d2','color': item.checked==true?'white':'red','width': '60rpx','height': '60rpx','line-height': '60rpx','border-radius': '60rpx','text-align': 'center','margin': '0 15rpx'}">{{item.value}}</view>
					 													  </view>
					 							</view>
					 							
					 							<view style="display: flex;margin-top: 10rpx;">
					 									<view  v-for="(item,index) in d3" :key="index" style="display: flex;" v-if="index>=5">
					 											<view @click="changed3(index)" :style="{'background-color': item.checked==true?'red':'#f3d2d2','color': item.checked==true?'white':'red','width': '60rpx','height': '60rpx','line-height': '60rpx','border-radius': '60rpx','text-align': 'center','margin': '0 15rpx'}">{{item.value}}</view>
					 									</view>
					 							</view>
					 						</view>
					 </view>
					 
					 
					
					  
				    </swiper-item>
					<swiper-item  class="swiper-item" style="height: 100%;" >
					  <view style="display: flex;">
						  <tabs-view @change="changezu"   :current="zucurrent" :items="zutabList" style="width: 100%;background-color: #EEEEEE;"></tabs-view>
					  </view>
					 <view style="width: 100%;display: flex;justify-content: center;margin-top: 40rpx;">
						 <view style="">
						 	<view style="display: flex;">
						 							  <view  v-for="(item,index) in d4" :key="index" style="display: flex;" v-if="index<5">
						 								  <view @click="changed4(index)" :style="{'background-color': item.checked==true?'red':'#f3d2d2','color': item.checked==true?'white':'red','width': '60rpx','height': '60rpx','line-height': '60rpx','border-radius': '60rpx','text-align': 'center','margin': '0 15rpx'}">{{item.value}}</view>
						 							  </view>
						 	</view>
						 	
						 	<view style="display: flex;margin-top: 10rpx;">
						 			<view  v-for="(item,index) in d4" :key="index" style="display: flex;" v-if="index>=5">
						 					<view @click="changed4(index)" :style="{'background-color': item.checked==true?'red':'#f3d2d2','color': item.checked==true?'white':'red','width': '60rpx','height': '60rpx','line-height': '60rpx','border-radius': '60rpx','text-align': 'center','margin': '0 15rpx'}">{{item.value}}</view>
						 			</view>
						 	</view>
						 </view>
					 </view>
					</swiper-item>
				</swiper>
			</view>
		</view>
		
		<view style="width: 100%;height: 250rpx;"></view>
		<view style="position: fixed;z-index: 999;left: 0;right: 0;bottom: 0;background-color: white;display: flex;justify-content: space-between;align-items: center;padding: 20rpx 20rpx;border-top: 1px solid #EEEEEE;height: 110rpx;">
			<view @click="deleteAll()" class="cuIcon-delete" style="font-size: 40rpx;"></view>
			<view style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
			
				<view>
					已选择<text class="check_color" style="color: red;">{{getzhu()}}</text>注,<text style="color: red;">{{getzhu()*2*bei}}</text>元
				</view>
			
			<view style="display: flex;align-items: center;">
				<text >投</text>
				<view @click="subBei()" style="background-color: #EEEEEE;height: 50rpx;text-align: center;width: 50rpx;margin-left: 20rpx;">一</view>
				<input @blur="starBlur_(bei)" v-model="bei" @input="starBlur($event,3)" type="digit" style="background: #EEEEEE;width: 50rpx;margin: 0 5rpx;height: 50rpx;text-align: center;" />
				<view @click="addBei()" class="cuIcon-add" style="color: #000000;background-color: #EEEEEE;height: 50rpx;text-align: center;width: 50rpx;line-height: 50rpx;margin-right: 20rpx;"></view>
				<text style="margin-right: 20rpx;">倍</text>
			</view>
			</view>
			<view @click="openorderpop()" style="background: linear-gradient(to right,#97e2e2,#ffaaff);padding: 10rpx 80rpx;border-radius: 16rpx;color: white;">提交</view>
		</view>
		<payorder :num="getzhu()" :pl_type="type.toString()"  :expect_max_award="getExpectMaxAward()" ref="orderpop_" :amount="getzhu()*bei*2" :shop_money="this.shop_money" :bei="bei" :check_game="getCheck()" :mode="1" :chuan_arr="chuan_arr" :game_type="game_type" @closeopendoor="closeopendoor()" >
		
		</payorder>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import payorder from '@/components/zaiui-common/basics/payorder'
	export default{
		name:"pl3",
		components:{
			barTitle,payorder
		},
		onLoad() {
			this.$api.plGames().then(res=>{
				this.data = res.data
			
			})
			this.initData()
		},
		data(){
			return {
				game_type:'pl3',
				is_zhedie:false,
				data:[],
				tabList: ['直选', '组选'],
				current:0,
				type:1,
				d1:[],
				d2:[],
				d3:[],
				d4:[],
				zucurrent:0,
				zutabList:['组三', '组六'],
				zutype:0,
				is_order_open:false,
				bei:1,
				shop_money:0,
				chuan_arr:[],
				check_game:{}
			}
		},
		methods:{
			subBei(){
				if(this.bei>1){
					this.bei--
				}
			},
			addBei(){
				
					this.bei++
				
			},
			starBlur(e,index){
				if(e.detail.value < 1){
				
					this.bei = 1
					
				}
				
			},
			starBlur_(e){
				if(e < 1){
				
					this.bei = 1
					
				}
				
			},
			getCheck(){
				var arr = []
				if(this.type == 1){ //组三
					var cd1 =this.d1.filter((item)=>{
						return item.checked == true
					})
					var cd2 =this.d2.filter((item)=>{
						return item.checked == true
					})
					var cd3 =this.d3.filter((item)=>{
						return item.checked == true
					})
					arr.push(cd1)
					arr.push(cd2)
					arr.push(cd3)
				
				}else{ //组六
					var cd4 =this.d4.filter((item)=>{
						return item.checked == true
					})
					arr.push(cd4)
				}
				return arr
				
			},
			getExpectMaxAward(){
				var base = 0
				if(this.type == 1){
					base = 1040 
				}
				if(this.type == 2){
					base = 346 
				}
				if(this.type == 3){
					base = 173 
				}
				return (base*this.bei).toString()
			},
			getUserInfo(){
								 var data = {
								 	
								 };
								 this.$api.getUserInfo(data).then(res=>{
									 var res_ =res.data.data
									 this.shop_money = res_.total_money
							
								     this.$refs.orderpop_.$refs.orderpop.open('bottom')
									 this.is_order_open =true
								 })
			},
			initData(){
				this.d1 = []
				this.d2 = []
				this.d3 = []
				this.d4 = []
				for(let z=0;z<=9;z++){
					var d = {"value":z,"checked":false}
					this.d1.push(d)
				}
				for(let z=0;z<=9;z++){
					var d = {"value":z,"checked":false}
					this.d2.push(d)
				}
				for(let z=0;z<=9;z++){
					var d = {"value":z,"checked":false}
					this.d3.push(d)
				}
				for(let z=0;z<=9;z++){
					var d = {"value":z,"checked":false}
					this.d4.push(d)
				}
			},
			zhedie(){
				this.is_zhedie = !this.is_zhedie
			},
			swiperChange(e) {
				
			this.current = e.target.current;
			if(this.current == 0){
				this.type = 1
			}else{
				this.type = 2
			}
			 this.closeopendoor()
			},
			changezu(index){
				this.zucurrent = index;
				if(index == 1){
					this.type = 3
				}
				this.zutype = index
				 this.closeopendoor()
			},
			tabsChange(index) {
				this.current = index;
				if(this.current == 0){
					this.type = 1
				}else{
					this.type = 2
				}
				 this.closeopendoor()
			},
			changed1(index){
			var v = !this.d1[index]["checked"]
		
				 this.$set(this.d1[index], 'checked', v) 
				 this.closeopendoor()

			},
			changed2(index){
			var v = !this.d2[index]["checked"]
					
				 this.$set(this.d2[index], 'checked', v) 
			 this.closeopendoor()
			},
			changed3(index){
			var v = !this.d3[index]["checked"]
					
				 this.$set(this.d3[index], 'checked', v) 
			 this.closeopendoor()
			},
			changed4(index){
			var v = !this.d4[index]["checked"]
					
				 this.$set(this.d4[index], 'checked', v) 
			 this.closeopendoor()
			},
			deleteAll(){
				this.initData()
				 this.closeopendoor()
			},
			getzhu(){
				if(this.type == 1){ //组三
					var cd1 =this.d1.filter((item)=>{
						return item.checked == true
					})
					var cd2 =this.d2.filter((item)=>{
						return item.checked == true
					})
					var cd3 =this.d3.filter((item)=>{
						return item.checked == true
					})
					return cd1.length * cd2.length* cd3.length
				}else{ //组六
					var cd4 =this.d4.filter((item)=>{
						return item.checked == true
					})
					
					if(this.zutype == 0){
						return cd4.length*(cd4.length-1)
					}else{
					
						
						if(cd4.length>=3){
								var i = 1
								var k = 1
							var arr = []
							for(let z =0;z<3;z++){
								
								i*=cd4.length-z
							}
							return i/6
						}else{
							return 0
						}
						
					
					}
				}
				return 1
			},
			closeopendoor(){
								
								 this.$refs.orderpop_.$refs.orderpop.close('bottom')
								 this.is_order_open =false
			},
			openorderpop(){
			       // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 1属性将失效 ，仅支持 ['top','left','bottom','right','center']
					if(this.is_order_open == false && this.getzhu()>0){
										this.getUserInfo()
					
					}else{
						this.$refs.orderpop_.$refs.orderpop.close('bottom')
						this.is_order_open =false
					}		
			     },
		}
	}
</script>

<style>
	.qq{
		background-color: red;
		color: white;
		width: 40rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
		border-radius: 40rpx;
		margin: 0 10rpx;
	}
	.gg{
		color: red;
		margin: 0 23rpx;
	}
</style>