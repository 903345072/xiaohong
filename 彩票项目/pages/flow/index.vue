<template>
	<view>
		<bar-title bgColor="bg-white" isBack >
			<block slot="content">发起跟单</block>
		</bar-title>
		<view v-if="data" style="background-color: white;margin: 40rpx 30rpx;padding: 20rpx 20rpx;border-radius: 20rpx;line-height: 80rpx;">
			<view style="display: flex;justify-content: space-between;align-items: center;border-bottom: 1px solid #EEEEEE;">
				<text>投注彩种</text>
				<text style="color: red;">{{data.en_type}}</text>
			</view>
			
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<text>订单金额</text>
				<text style="color: red;">{{data.money}}元</text>
			</view>
		</view>
		
		<view style="background-color: white;margin: 0 30rpx;padding: 20rpx 20rpx;border-radius: 20rpx;line-height: 80rpx;margin-top: -20rpx;">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<text>是否公开</text>
				<radio-group class="block" @change="RadioChange" style="display: flex;">
					<view style="margin-right: 30rpx;">
						<radio class="red zaiui-radio" :class="radio=='1'?'checked':''" :checked="radio=='1'?true:false" value="1"/>
						 <text>公开</text>
					</view>
					<view>
						<radio class="red zaiui-radio" :class="radio=='0'?'checked':''" :checked="radio=='0'?true:false" value="0"/>
						 <text>赛后可见</text>
					</view>
				</radio-group>
			</view>
			
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<text>跟单宣言</text>
				<text>他人复制购彩，可获得奖金的7%佣金</text>
			</view>
			
			<view style="width: 100%;">
				<textarea @input="input" v-model="desc" placeholder="没有华丽的宣言,只有最稳的红单" placeholder-style="color:#dadada" style="background-color: #f1f1f1;width: 100%;border-radius: 30rpx;padding: 10rpx 10rpx;"></textarea>
			</view>
			
			
		</view>
		<view @click="openorderpop()" style="position: fixed;bottom: 20rpx;right: 5%;width: 90%;">
			<view style="background: linear-gradient(93deg,#31ceff,#4e86ff 30%,#f72bfe);text-align: center;height:80rpx;line-height: 80rpx;color: white;border-radius: 20rpx;">确认发单</view>
		</view>
		
		<payorder v-if="data" ref="orderpop_" :is_open="radio" :amount="data.money" :shop_money="shop_money" :bei="data.bei" :check_game="data.check_game" :mode="2" :chuan_arr="data.chuan_arr" :game_type="data.type" @closeopendoor="closeopendoor()" :plan_desc="desc" >
		
		</payorder>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import payorder from '@/components/zaiui-common/basics/payorder'
	export default{
		name:"flowindex",
		components:{
			barTitle,payorder
		},
		data(){
			return {
				radio:"0",
				desc:"没有华丽的宣言,只有最稳的红单",
				data:"",
				shop_money:0,
				is_order_open:false,
				
			}
		},
		onLoad(option) {
			
			this.data = JSON.parse(decodeURIComponent(option.data))
	
		},
		onShow() {
			this.$api.getUserInfo().then(res=>{
				var res_ =res.data.data
				this.shop_money = res_.total_money				
			    this.$refs.orderpop_.$refs.orderpop.close('bottom')
				this.is_order_open =false
			})
		},
		methods:{
			input(e){
				this.desc = e.detail.value
			},
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			closeopendoor(){
								
								 this.$refs.orderpop_.$refs.orderpop.close('bottom')
								 this.is_order_open =false
			},
			openorderpop(){
			       // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 1属性将失效 ，仅支持 ['top','left','bottom','right','center']
					if(this.is_order_open == false ){
										this.getUserInfo()
					
					}else{
						this.$refs.orderpop_.$refs.orderpop.close('bottom')
						this.is_order_open =false
					}		
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
		}
	}
</script>

<style>
	@import "../../static/zaiui/style/pay.scss";
</style>
