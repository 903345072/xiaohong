<template>
	<view>
		<bar-title bgColor="bg-white" :isBack="isBack">
			<block slot="content">跟单详情</block>
			<!-- <block slot="right">
				<view class="cuIcon-search"></view>
				<view class="cuIcon-people" style="margin-left: 40rpx;"></view>
			</block> -->
		</bar-title>
		<view v-if="order" style="padding: 40rpx 30rpx;">
			<view style="display: flex;justify-content: space-between;align-items: center;">
				<view style="display: flex;align-items: center;">
					<view @click.stop="goHomePage(order.user.uid)">
						<image style="width: 90rpx;height: 90rpx;border-radius: 90rpx;"
							:src="config.config.url+order.user.avatar"></image>
					</view>
					<view style="display: flex;flex-direction: column;margin-left: 20rpx;">
						<view style="margin-bottom: 10rpx;">{{order.user.real_name}}</view>
						<view style="display: flex;align-items: center;font-size: 22rpx;">
							<view
								style="color: #ff5359;border: 1px solid red;border-radius: 15rpx 0 0 15rpx;height: 40rpx;line-height: 40rpx;text-align: center;padding: 0 20rpx;">
								{{order.user.seven_target}}</view>
							<view
								style="height: 40rpx;line-height: 40rpx;padding: 0 20rpx;background-color: #ff5359;text-align: center;border-radius: 0 15rpx 15rpx 0;color: white;">
								盈利率{{order.user.profit_rate}}%</view>
						</view>
					</view>
				</view>
				<view @click="guanzhu(order.uid)"
					:style="{'border':order.is_guanzhu==0?'1px solid #ff5359':'1px solid grey','border-radius': '30rpx','height': '50rpx','line-height': '50rpx','padding': '0 30rpx','text-align': 'center','color': order.is_guanzhu==0?'#ff5359':'grey'}">
					{{order.is_guanzhu==0?"关注":"取消关注"}}
				</view>
			</view>


			<view style="background-color: white;padding: 20rpx 20rpx;border-radius: 20rpx;margin-top: 60rpx;">
				<view
					style="display: flex;align-items: center;justify-content: space-between;border-bottom: 1px solid #EEEEEE;padding-bottom: 10rpx;">
					<view style="display: flex;align-items: center;">
						<gameImg :width="50" :height="50" :type="order.type"></gameImg>
						<view style="margin-left: 10rpx;">{{order.en_type}}</view>
					</view>
					<view>
						<text style="color:grey">佣金</text><text style="color: red;">10%</text>
					</view>
				</view>
				<view>
					<view style="margin: 20rpx 0;">{{order.plan_desc}}</view>
					<view style="display: flex;align-items: center;">
						<view v-if="order.state == 0 && order.can_flow == true" style="display: flex;flex-direction: column;margin-right: 20rpx;">
							<view>截止时间</view>
							<view>{{order.grouptime_h}}:{{order.grouptime_m}}:{{order.grouptime_s}}</view>
						</view>
						<view v-if="order.state==1" style="display: flex;flex-direction: column;margin-right: 20rpx;">
							<view>未中奖</view>
						</view>
						<view v-if="order.state == 0 && order.can_flow == false" style="display: flex;flex-direction: column;margin-right: 20rpx;">
							<view>未开奖</view>
						</view>
						<view v-if="order.state == 2 || order.state == 3" style="display: flex;flex-direction: column;margin-right: 20rpx;color: red;">
							<view>已中奖</view>
							<view>￥{{order.award_money}}</view>
						</view>
						<view
							style="display: flex;align-items: center;background-color: #f9f9f9;padding: 20rpx 20rpx;border-radius: 20rpx;width: 80%;justify-content: space-around;">


							<view style="display: flex;flex-direction: column;align-items: center;">
								<view>自购金额</view>
								<view style="color: red;">{{order.amount}}</view>
							</view>
							<view style="border-right: 1px solid #d6d6d6;height: 50rpx;width: 1px;"></view>
							<view style="display: flex;flex-direction: column;align-items: center;">
								<view>跟单金额</view>
								<view style="color: red;">{{order.flow_amount}}</view>
							</view>
							<view style="border-right: 1px solid #d6d6d6;height: 50rpx;width: 1px;"></view>
							<view style="display: flex;flex-direction: column;align-items: center;">
								<view>起投金额</view>
								<view style="color: red;">{{order.amount/order.bei}}.00</view>
							</view>
						</view>
					</view>

				</view>
			</view>

			<view v-if="order" style="margin-bottom: 120rpx;">
				<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"
					style="background-color: white;"></wuc-tab>
				<swiper :current="TabCur" style="min-height: 1300rpx;" duration="300" @change="swiperChange"
					:style="{'padding': '30rpx 20rpx','background-color': 'white','height': order.order_detail_.length>0? order.order_detail_.length*350+'rpx':'350rpx'}">
					<swiper-item>
						<commonDetail v-if="TabCur == 0" :orderdetail="order"></commonDetail>
					</swiper-item>
					<swiper-item>
						<scroll-view v-if="TabCur == 1" scroll-y class="scroll" :upper-threshold="50"
							 enable-back-to-top>
							<flowRecord :id="order.id"></flowRecord>
					 </scroll-view>

					</swiper-item>
				</swiper>
			</view>
		</view>

		<view v-if="order.can_flow == true" style="position: fixed;left: 0;right: 0;bottom: 0;background-color: white;padding: 20rpx 20rpx;">
			<view style="display: flex;align-items: center;">
				<view style="flex: 8;"></view>
				<view style="display: flex;align-items: center;flex: 2;margin-right: 40rpx;">
					<text>投</text>
					<button @click="sub()" :disabled="can_del" style="height: 60rpx;line-height: 60rpx;padding: 0 25rpx;">-</button>
					<view><input @input="input" type="number" v-model="bei" class="input"/></view>
					<button @click="add()" style="height: 60rpx;line-height: 60rpx;padding: 0 25rpx;">+</button>
					<text>倍</text>
				</view>
			</view>
			<view style="display: flex;align-items: center;justify-content: space-between;">
				<view style="display: flex;align-items: center;margin-left: 60rpx;">
					<text>{{bei}}倍</text>
					<view style="margin-left: 20rpx;">合计<text style="color: red;">{{bei*order.bei_amount}}.00</text>元</view>
				</view>
				<view @click="openorderpop()" style="margin-right: 40rpx;background: linear-gradient(50deg,#54d6ff,#54bbff 11%,#8653ff 67%,#aa3ad9);height: 70rpx;line-height: 70rpx;text-align: center;padding: 0 90rpx;border-radius: 20rpx;color: white;margin-top: 20rpx;">
					立即跟单
				</view>
			</view>
		</view>
		
		<payfloworder v-if="order" ref="orderpop_" :id="order.id" :amount="bei*order.bei_amount" :shop_money="shop_money" :bei="bei"  :game_type="order.type" @closeopendoor="closeopendoor()" :plan_desc="desc" >
		
		</payfloworder>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import config from "@/api/interface.js"
	import commonDetail from "@/components/zaiui-common/basics/commonDetail.vue"
	import flowRecord from "@/components/zaiui-common/flow/flowRecord.vue"
	import payfloworder from '@/components/zaiui-common/basics/payfloworder'
	import gameImg from '@/components/zaiui-common/basics/gameImg.vue'
	export default {
		name: "flowDetail",
		components: {
			barTitle,
			commonDetail,
			flowRecord,
			payfloworder,
			gameImg
		},
		data() {
			return {
				desc:"ads",
				chuan_arr:[],
				check_game:{},
				is_order_open:false,
				shop_money:0,
				can_del:true,
				bei:1,
				order: "",
				isBack: true,
				id: "",
				TabCur: 0,
				tabList: [{
						name: '方案详情',
						type: "buy_lottery"
					},
					{
						name: '跟单次数',
						type: "0"
					},
				],
			}
		},
		created() {
			this.config = config

		},
		onLoad(option) {
			this.id = option.id
			var data = {
				"id": this.id
			}
			this.$dashen.getOrderDetail(data).then(res => {
				this.order = res.data
				this.tabList[1]["name"] = "跟单次数" + "(" + res.data.flow_count + ")"
				this.countdown();
			})


		},
		watch:{
			bei (newName, oldName) {
			      if(newName > 1){
						this.can_del = false
				}else{
					this.can_del = true
				}
			    }
		},
		methods: {
			goHomePage(uid) {
				uni.navigateTo({
					url: "/pages/flow/homePage?uid=" + uid
				})
			},
			closeopendoor(){
								
								 this.$refs.orderpop_.$refs.orderpop.close('bottom')
								 this.is_order_open =false
			},
			getUserInfo(){
					var data = {	
					};
					this.$api.getUserInfo(data).then(res=>{
									
					this.shop_money = res.data.data.total_money
								
					this.$refs.orderpop_.$refs.orderpop.open('bottom')
					 this.is_order_open =true
				})
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
			sub(){
				if(this.bei > 1){
						this.bei--
				}
			},
			add(){
				this.bei++
			},
			input(e){
				var v = e.detail.value
				if(v<=0){
					v=1
				}
				this.bei = v
			},
			guanzhu(uid) {
				var data = {
					"uid": uid
				}
				this.$dashen.guanzhu(data).then(res => {
					uni.showToast({
						title: "操作成功"
					})
					this.order.is_guanzhu = this.order.is_guanzhu == 0 ? 1 : 0
				})
			},
			tabChange(index) {
				this.TabCur = index;
			},
			swiperChange(e) {
				let {
					current
				} = e.target;
				this.TabCur = current;
			},
			countdown() {
				let that = this;
				if (this.order) {
					let timer = setInterval(function() {


						that.order.stime -= 1
						let t = that.order.stime
						if (t > 0) {
							let day = Math.floor(t / 86400)
							let hour = Math.floor((t / 3600) % 24) + day * 24
							let min = Math.floor((t / 60) % 60)
							let sec = Math.floor((t / 1) % 60)
							day = day < 10 ? '0' + day : day
							hour = hour < 10 ? '0' + hour : hour
							min = min < 10 ? '0' + min : min
							sec = sec < 10 ? '0' + sec : sec
							that.order.grouptime_d = day;
							that.order.grouptime_h = hour;
							that.order.grouptime_m = min;
							that.order.grouptime_s = sec;
						} else {
							// 进行判断 如果数据内所有的倒计时已经结束，那么结束定时器， 如果没有那么继续执行定时器
							clearInterval(timer);

							that.order.grouptime_d = 0;
							that.order.grouptime_h = 0;
							that.order.grouptime_m = 0;
							that.order.grouptime_s = 0;
						}

					}, 1000);
				}
			},
		}

	}
</script>


<style>
	.scroll {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
	}
	.input{
		
		  width: 120rpx;
		  margin: 0;
		  font-size: 30rpx;
		   height: 60rpx;
		  text-align: center;
		  vertical-align: top;
		  background: #f2f3f5;
		  border-right: .02rem solid #fff;
		  border-left: .02rem solid #fff;
		
	}
</style>
