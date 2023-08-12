<template>
	<view class="body" >
		<bar-title bgColor='bg-white'>
			<block slot="content">冠/冠亚军</block>
			
		</bar-title>
	
		<view style="display: flex;justify-content: space-around;background: white;padding: 10rpx 0;position: fixed;width: 100%;z-index: 9999;border-top: 1px solid #eee;">
			<view @tap="change('gj')" :class="type == 'gj'?'checked':'default_'">冠军游戏</view>
			<view @tap="change('gyj')" :class="type == 'gyj'?'checked':'default_'">冠亚军游戏</view>
		</view>
		
		<view v-if="type == 'gj'" style="width: 100%;margin-top: 100rpx;">
			<view class="mid-team" style="width: 100%;">
				<div v-for="item in dataList" class="team-div selling sta-1" >
					<view @tap="item.status==1?check(item):''"   bonus="3.50" num="1">
						<div class="logo">
					      <img :src="item.pic" onerror="javascript:this.src='//static.sporttery.cn/res_1_0/jcw/images/jcRank/ball_none.png'">
					</div>
					 <div :class="checkData[item.id]?'border_checked':'border'" ><div class="name">{{item.h_name}}</div>
					 <div class="bon">{{item.pl}}</div>
					 <div class="state">{{item.status==1?'已开售':"已停售"}}</div>
					</div>
					</view>
				</div>
			</view>
		</view>
		
		<view v-if="type == 'gyj'" style="width: 100%;margin-top: 100rpx;">
			<view class="mid-team " style="width: 100%;">
				<div v-for="item in dataList" class="team-div selling sta-1 team_gy" style="width: 45%;">
					<view @tap="item.status==1?check(item):''"   bonus="3.50" num="1">
						<view style="display: flex;">
							<div class="logo_" >
							     <div><img :src="item.a_pic" onerror="javascript:this.src='//static.sporttery.cn/res_1_0/jcw/images/jcRank/ball_none.png'"></div>
								<div><img :src="item.h_pic" onerror="javascript:this.src='//static.sporttery.cn/res_1_0/jcw/images/jcRank/ball_none.png'"></div>
							</div>
						
						</view>
					 <div :class="checkData[item.id]?'border_checked':'border'" >
						 <view style="display: flex;justify-content: space-around;">
							 <div class="name">{{item.h_name}}</div>
							 -
							 <div class="name">{{item.a_name}}</div>
						 </view>
					 <view >
						 <span class="bon">{{item.pl}}</span>
						 <span class="state" style="margin-left: 10rpx;">{{item.status==1?'已开售':"已停售"}}</span>
					 </view>
					</div>
					</view>
				</div>
			</view>
		</view>
		<view style="width: 100%;height: 300rpx;"></view>
		<div class="bot-bet" id="gj_db" style=""> <div class="bet-top"> <div style="margin: 20rpx;">
		<span id="stop0">{{stop_time}}</span> 截止投注</div> <div style="margin-right: 20rpx" class="empty" @tap="clear()"><img src="//static.sporttery.cn/res_1_0/jcwm/images/empty.png">清空</div> </div> <div class="bet-middle"> <div style="display: flex;align-items: center;margin-left: 20rpx;">投注倍数 : <button type="button" class="less" :class="num<=1?'u-unclick':'click'" @tap="sub()" id="subBtn0"></button><input class="num"  type="text" v-model="num" id="times0" oninput="jcmcCommonClass.onInput(this)" onchange="jcmcCommonClass.EnterPress(this)" onblur="jcmcCommonClass.EnterPress(this)"><button type="button" class="add" @tap="add()" id="addBtn0"></button>&nbsp; </div> <div style="margin-right:20rpx">已选<span class="red" id="select0">{{getChekedNum()}}</span>个选项</div> </div> <div class="bet-bottom"> 
		<div class="amount" style="margin-left: 20rpx;display: flex;white-space: nowrap;justify-content: space-around;font-size: 28rpx;">
			投注金额 : <span class="red" id="bet0">{{getChekedNum()*2*num}}</span> 元<span  class="mar-l" style="white-space: nowrap;">理论最高奖金 : <span class="red" id="total0">{{getMaxAward()}}</span> 元</span>
			<view @click="openorderpop()" style="display: inline-block;background: linear-gradient(to right,#97e2e2,#ffaaff);padding: 4rpx 30rpx;border-radius: 20rpx 20rpx 20rpx 20rpx;">提交</view>
		
		</div> <div style="margin-left:20rpx">页面固定奖金仅供参考，请以投注时固定奖金为准。</div> </div> </div>
		<payorder style="z-index: 99999999;" :expect_min_award="getMaxAward().toString()" :expect_max_award="getMaxAward().toString()" ref="orderpop_" :amount="getChekedNum()*2*num" :shop_money="this.shop_money" :bei="num" :check_game="checkData" :mode="1" :chuan_arr="chuan_arr" :game_type="type.toString()" @closeopendoor="closeopendoor()" >
		
		</payorder>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import payorder from '@/components/zaiui-common/basics/payorder';
	export default{
		name:"guanya",
		components: {
			barTitle,payorder
		},
		onLoad() {
			this.getGuanYaData('gj')
		},
		data() {
			return {
				chuan_arr:[],
				type:'gj',
				dataList:[],
				checkData:{},
				num:1,
				is_order_open:false,
				shop_money:0,
				stop_time:""
			}
		},
		methods:{
			closeopendoor(){
								
								 this.$refs.orderpop_.$refs.orderpop.close('bottom')
								 this.is_order_open =false
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
			openorderpop(){
			       // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 1属性将失效 ，仅支持 ['top','left','bottom','right','center']
					if(this.is_order_open == false && this.getMaxAward()>0 && this.num>0){
										this.getUserInfo()
					
					}else{
						this.$refs.orderpop_.$refs.orderpop.close('bottom')
						this.is_order_open =false
					}		
			     },
			getMaxAward(){
				var aa = []
			
				for(let i in this.checkData){
					if(this.checkData[i]){
						aa.push(this.checkData[i]["pl"])
					}
				}
				
				aa = aa.sort((a,b)=>{
					return b-a
				})
				if(aa.length==0){
					return 0
				}
				return (aa[0]*2*this.num).toFixed(2)
			
			},
			clear(){
				this.checkData = {}
			},
			getChekedNum(){
				var n = 0
				for(let i in this.checkData){
					if(this.checkData[i]){
						n++
					}
				}
				return n
			},
			sub(){
				if(this.num>1){
					this.num--
				}
			},
			add(){
				
					this.num++
				
			},
			check(v){
				if(this.checkData[v.id]){
					this.checkData[v.id] = ""
				}else{
					this.checkData[v.id] = {"pl":v.pl,"h_name":v.h_name,"a_name":v.a_name}
				}
				this.$forceUpdate()
			},
			change(v){
				if(this.type != v){
					this.type = v
					this.getGuanYaData(v)
					this.closeopendoor()
				}	
			},
			getGuanYaData(type){
				this.$api.getGuanYaData({'type':type}).then(res=>{
					this.dataList = res.data.data
					this.stop_time = res.data.stop_time
					this.checkData = {}
					this.num = 1
				})
			}
		}
	}
</script>

<style>
	.bet-bottom .amount .mar-l {
	  margin-left: 20rpx;
	}
	.bot-bet {
	  background: url(//static.sporttery.cn/res_1_0/jcw/upload/202210/bet_bg.png) no-repeat center top;
	    background-size: auto;
	  background-size: 100%;
	  position: fixed;
	  left: 0;
	  right: 0;
	  bottom: 0;
	  width: 100%;
	  z-index: 999999;
	}
	.bot-bet .bet-middle .less.u-unclick, .bot-bet .bet-middle .add.u-unclick {
	  background-color: rgba(0, 0, 0, 0.25);
	}
	.bot-bet .bet-top {
	  color: #FFFFFF;
	  border-bottom: 1px solid #d8d8d8;
	}
	.bet-bottom .amount .red {
	  color: #FFD855;
	}
	.bot-bet .bet-top {
	  height: 80rpx;
	  line-height: 50rpx;
	  margin-top: 10rpx;
	  padding: 0 5rpx;
	  display: flex;
	  justify-content: space-between;
	  font-size: 30rpx;
	  align-items: center;
	}
	.bot-bet .bet-middle {
	  border-bottom: 1px solid #d8d8d8;
	  color: #FFFFFF;
	}
	.bot-bet .bet-middle {
	  height: 100rpx;
	  line-height: 100rpx;
	  padding: 10rpx 5rpx;
	  font-size: 30rpx;
	  display: flex;
	  justify-content: space-between;
	}
	.bot-bet .bet-top .empty img {
	  width: 50rpx;
	  height: 50rpx;
	  vertical-align: middle;
	  margin-bottom: 10rpx;
	  margin-right: 8rpx;
	}
	.bot-bet .bet-middle .less.u-unclick, .bot-bet .bet-middle .add.u-unclick {
	  background-color: rgba(0, 0, 0, 0.25);
	}
	.bot-bet .bet-middle .less.u-unclick, .bot-bet .bet-middle .click {
	   border: 1px solid #D8D8D8;
	   border-top-left-radius: 10rpx;
	    border-bottom-left-radius: 10rpx;
	   background: url(/static/images/index/no_less.png) no-repeat 20rpx 20rpx;
	      background-color: rgba(0, 0, 0, 0);
	      background-size: auto;
	    background-size: 20rpx 20rpx;
	}
	.bot-bet .bet-middle .less.u-unclick {
	  border-top-left-radius: 10rpx;
	  border-bottom-left-radius: 10rpx;
	 background: url(/static/images/index/no_less.png) no-repeat 20rpx 20rpx;
	    background-color: rgba(0, 0, 0, 0);
	    background-size: auto;
	  background-size: 20rpx 20rpx;
	}
	.bot-bet .bet-middle .less, .bot-bet .bet-middle .add {
	  width: 58rpx;
	  height: 58rpx;
	  vertical-align: top;
	  outline: none;
	}
	.bot-bet .bet-middle .less, .bot-bet .bet-middle .add {
	  border: 1px solid #D8D8D8;
	}
	.bot-bet .bet-middle .num {
	  background: none;
	  border-top: 1px solid #D8D8D8;
	  border-bottom: 1px solid #D8D8D8;
	  color: #FFFFFF;
	  -webkit-appearance: none !important;
	  border-radius: 0 !important;
	}
	.bot-bet .bet-middle .num {
	  width: 120rpx;
	  height: 55rpx;
	  border-left: none;
	  border-right: none;
	  vertical-align: top;
	  outline: none;
	  text-align: center;
	  font-size: 30rpx;
	  -webkit-user-select: text !important;
	}
	middle .add {
	  border: 1px solid #D8D8D8;
	}
	.bot-bet .bet-middle .add {
	  border-top-right-radius: 10rpx;
	  border-bottom-right-radius: 10rpx;
	background: url(/static/images/index/add.png) no-repeat 20rpx 20rpx;
	    background-size: auto;
	  background-size: 20rpx 20rpx;
	}
	.bot-bet .bet-middle .tips {
	  color: #ECECEC;
	}
	.bot-bet .bet-middle .tips {
	  font-size: 30rpx;
	}
	.bot-bet .bet-middle .red {
	  color: #FFD855;
	}
	.bet-bottom {
	  color: #ECECEC;
	  font-size: 30rpx;
	}
	.bet-bottom {
	  padding: 15rpx 5rpx;
	  font-size: 32rpx;
	  line-height: 47rpx;
	  flex: 1;
	}
	.bet-bottom .amount {
	  color: #FFFFFF;
	}
	.bet-bottom .amount {
	  font-size: 30rpx;
	}
	.body{
		  width: 100%;
		  min-height: 100vh;
		  background: url(/static/images/index/gj_bg.png) center center no-repeat;
		  background-size: 100% 100%;
	}
	.mid-team {
	  flex: 1;
	  overflow-y: auto;
	  padding: .08rem .3rem .32rem;
	  display: flex;
	  flex-wrap: wrap;
	  align-content: flex-start;
	  margin-left: 20rpx;
	}
	.mid-team .team-div {
	  width: 29.33%;
	  height: 300rpx;
	  position: relative;
	  margin-top: 30rpx;
	  margin-right: 3.005%;
	}
	.mid-team .team-div .logo {
	  width: 60rpx;
	  height:60rpx;;
	  position: absolute;
	  left: 56%;
	  top: -16rpx;
	  margin-left: -1.3rem;
	  z-index: 1;
	}
	.mid-team .team_gy .logo_ {
	  width: 100%;
	  height: 30rpx;
	  position: absolute;
	  left: 0;
	  top: -16rpx;
	  display: flex;
	  justify-content: space-between;
	}
	.mid-team .team_gy .logo_ div {
	  width: 48%;
	  text-align: center;
	  position: relative;
	  z-index: 1;
	}
	.mid-team .team_gy .logo_ div img {
	  width: 60rpx;
	  height: 60rpx;
	}
	.mid-team .team-div .logo img {
	  width: 100%;
	}
	.mid-team .sta-1 .border {
	  background: linear-gradient(180deg, #fcf2f7 0%, #fcf2f2 34%, #e8dedb 69%, #fdf3e5 100%);
	  border: 1px solid #FFFFFF;
	}
	.mid-team .sta-1 .border_checked {
	
	  background: linear-gradient(180deg, #FFF8D8 0%, #FFF6EB 29%, #FFDEB4 64%, #FAF0C5 100%);
	  border: 1px solid #F83D3D;
	}
	.mid-team .team-div .border,.border_checked {
	  margin-top: 15rpx;
	  width: 100%;
	  height: 200rpxrem;
	  border-radius: 15rpx;
	  line-height: 38rpx;
	  padding-top: 60rpx;
	  padding-bottom: 30rpx;
	  text-align: center;
	  font-size: 20rpx;
	}
	.mid-team .sta-1 .border .name {
	  color: #181818;
	   font-size: 25rpx;
	}
	.mid-team .sta-1 .border .bon {
	  color: #666666;
	  font-size: 25rpx;
	  
	}
	.mid-team .sta-1 .border .state {
	  color: #999999;
	  font-size: 25rpx;
	  margin-top: 10rpx;
	}
	.mid-team .team-div .border .state {
	  font-size: 25rpx;
	  line-height: 20rpx;
	}
	.mid-team .team-div .border_checked .state {
	  font-size: 25rpx;
	  line-height: 20rpx;
	}
	.mid-team .sta-1 .border_checked .name {
	  color: red;
	   font-size: 25rpx;
	}
	.mid-team .sta-1 .border_checked .bon {
	  color: red;
	  font-size: 25rpx;
	  
	}
	.mid-team .sta-1 .border_checked .state {
	  color: red;
	  font-size: 25rpx;
	  margin-top: 10rpx;
	}
	
	
	.default_{
		padding: 10rpx 0;
	}
	.checked{
		color: red;
		border-bottom: 1px solid red;
		padding: 10rpx 0;
	}
	.zhedie{
		margin-top: calc(var(--status-bar-height) + 100rpx);
		margin-bottom: 100rpx;
	}
	.zaiui-title-tab-box {
		position: fixed;
		width: 100%;
		top: 0;
		z-index: 999;
	
		padding: calc(var(--status-bar-height) + 0rpx) 0rpx 9.09rpx 9.09rpx;
	
		.flex {
			.basis-l {
				flex-basis: 70%;
			}
			.basis-s {
				flex-basis: 30%;
			}
		}
	}
	
</style>