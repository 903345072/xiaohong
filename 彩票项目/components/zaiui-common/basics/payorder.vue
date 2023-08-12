<template>
	<uni-popup ref="orderpop"  :mask-click="true" type="bottom"  background-color="#fff" style="z-index: 9999;height: 600rpx;" >
		<view @click="openorderpop()" class="cuIcon-roundclose" style="position: absolute;top: 35rpx; right: 35rpx;font-size: 40rpx;color: grey;"></view>
		<view style="min-height: 300rpx;padding: 40rpx 0;">
			<view style="display: flex;justify-content: center;color: grey;padding-bottom: 20rpx;border-bottom: 1px solid #EEEEEE;">
				<view style="color: #000000;">支付给店主</view>
				
			</view>
			<view style="padding: 20rpx 20rpx;">
				<view style="display: flex;justify-content: space-between;margin-bottom: 20rpx;">
					<view>{{arr[game_type]}}</view>
					<view>{{amount}}.00元</view>
				</view>
				<view style="display: flex;justify-content: space-between;">
					<view>店铺余额</view>
					<view>{{this.shop_money >= amount?amount*-1+".00元":"预存不足"}}</view>
				</view>
				<view @click="goRecharge()" v-if="this.shop_money < amount" style="background-color: #007AFF;color: white;padding: 15rpx 200rpx;text-align: center;border-radius: 40rpx;margin-top: 20rpx;">预存入口</view>
				<view @click="doorder()" v-if="this.shop_money >= amount" style="background-color: red;color: white;padding: 15rpx 200rpx;text-align: center;border-radius: 40rpx;margin-top: 20rpx;">立即支付</view>
				
			</view>
		</view>
	</uni-popup>
</template>

<script>
	export default{
		name:"payorder",
		
		data(){
			return{
				 arr:{"foot":"竞彩足球","bd":"北京单场","basket":"竞彩篮球","pl3":"排列三","pl5":"排列五","sfc":"胜负彩","renjiu":"任选九","gj":"冠军竞猜","gyj":"冠亚军竞猜"}
			}
		},
		props:{
			expect_min_award:{
				type:String,
				default:"0"
			},
			expect_max_award:{
				type:String,
				default:"0"
			},
			is_open:{
				type:String,
				default:"0"
			},
			shop_money:null,
			amount:null,
			check_game:null,
			game_type:{
				type:String,
				default:'foot'
			},
			mode:null,
			bei:null,
			chuan_arr:null,
			num_arr:null,
			plan_desc:{
				type:String,
				default:'没有华丽的宣言,只有最稳的红单'
			},
			pl_type:{
				type:String,
				default:"1"
			},
			num:null
		},
		methods:{
			goRecharge(){
				uni.navigateTo({
					url:"/pages/finace/recharge?money="+this.shop_money
				})
			},
			doorder(){
				var chuan_arr = this.chuan_arr
				chuan_arr = chuan_arr.filter(item=>{
					return item["checked"] == true
				})
				if(this.game_type != 'gj' && this.game_type != 'gyj'){
					if(this.game_type != 'pl3'){
						for(let item in this.check_game){
							if(!Array.isArray(this.check_game[item])){
								this.check_game[item] = [this.check_game[item]]
							}
						}
					}else{
						for(let item in this.check_game){
							var aa = this.check_game[item]
							var ar = []
							for(let ia in aa){
								ar.push(aa[ia]["value"])
							}
							this.check_game[item] = ar
						}
						
					}
				}
				
				
				var num_ = 1
				if(this.game_type == "pl3"){
					num_ = this.num
				}else if(this.game_type == "gj" || this.game_type == 'gyj'){
					num_ = Object.keys(this.check_game).length
				}else{
					this.check_game.length
				}
				
			
			
				var data = {"type":this.game_type,"num":num_,"checkGame":JSON.stringify(this.check_game),"bei":this.bei,"mode":this.mode,"chuan":JSON.stringify(chuan_arr),"num_arr":JSON.stringify(this.num_arr),"plan_desc":this.plan_desc,"is_open":this.is_open,'expect_min_award':this.expect_min_award,'expect_max_award':this.expect_max_award,'pl_type':this.pl_type}
				
				this.$api.doorder_(data).then(res=>{
					var str = encodeURIComponent(JSON.stringify(res.data))
					uni.navigateTo({
						url:"/pages/order/orderdetail?str="+str
					})
				})
			},
			openorderpop(){
				this.$emit("closeopendoor")
			}
		}
	}
</script>

<style>
</style>
