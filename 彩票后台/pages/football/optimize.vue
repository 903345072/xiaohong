<template >
	<view >
		
		<view style="border-bottom: 1px solid #EEEEEE;"><bar-title bgColor="bg-white" isBack >
			<block slot="content">奖金优化</block>
		</bar-title></view>
		<view style="display: flex;align-items: center;width: 100%;justify-content: center;margin-top: 40rpx;margin-bottom: 40rpx;">
			<view style="border-left:1px solid #004ade; " @click="check(0)" :class="['default',{'checked':cur_index==0}]">奖金平均</view>
			<view @click="check(1)" :class="['default',{'checked':cur_index==1}]">博热优化</view>
			<view @click="check(2)" :class="['default',{'checked':cur_index==2}]">博冷优化</view>
		</view>
	
			<view style="width: 100%;display: flex;justify-content: center;">
				<view style="border: 1px solid grey;display: flex;align-items: center;justify-content: center;width: 680rpx;">
					<view style="width: 110rpx;border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;">过关</view>
					<view style="width: 210rpx;border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;">单注组合</view>
					<view style="width: 210rpx;border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;">注数分布</view>
					<view style="width: 150rpx;text-align: center;height: 60rpx;line-height: 60rpx;">预测奖金</view>
				</view>
			</view>
			
			<view style="width: 100%;text-align: center;display: flex;align-items: center;flex-direction: column;margin-bottom: 180rpx;">
				<view style="width: 680rpx;border: 1px solid grey;border-top: none;border-bottom: none;">
					<view v-for="(item,index) in this.games" :key="index" style="border-bottom: 1px solid grey;" >
						
						<view style="display: flex;">
							<view style="width: 110rpx;height: 120rpx;line-height: 120rpx;">{{item.length!=1?item.length+"串1":"单关"}}</view>
							<view style="width: 210rpx;height: 120rpx;display: flex;flex-direction: column;justify-content: space-around;align-items: center;border-left: 1px solid grey;border-right: 1px solid grey;">
								<view  style="font-size: 22rpx;" v-for="(item1,index1) in item" :key="index1" v-if="index1<2">
									{{item1["h_name"]}}|{{item1["name"]}}({{item1["pl"]}})
									
								</view>
								<view class="cuIcon-unfold" @click="changeDisplay(index)">
									
								</view>
							</view>
							<view style="width: 210rpx;height: 120rpx;line-height: 120rpx;border-right: 1px solid grey;display: flex;align-items: center;">
								<view @click="subZhu(index)" style="background-color: #EEEEEE;height: 50rpx;text-align: center;width: 50rpx;margin-left: 20rpx;line-height: 50rpx;">一</view>
								<input @blur="starBlur_(index)" v-model="arr[index]['zhu']" @input="starBlur($event,index)" type="number" style="background: #EEEEEE;width: 50rpx;margin: 0 5rpx;height: 50rpx;text-align: center;" />
								<view @click="addZhu(index)" class="cuIcon-add" style="color: #000000;background-color: #EEEEEE;height: 50rpx;text-align: center;width: 50rpx;line-height: 50rpx;margin-right: 20rpx;"></view>
							</view>
							<view style="width: 150rpx;height: 120rpx;line-height: 120rpx;" :class="[{'is_red':(arr[index]['zhu'] * arr[index]['one_award'])>money}]">
								{{(arr[index]["zhu"] * arr[index]["one_award"]).toFixed(2)}}
							</view>
						</view>
						
					<view :ref="index" style="display: none;">
						<view style="border: 1px solid grey;display: flex;align-items: center;justify-content: center;background-color: #f4ede4;font-weight: bold;">
							<view style="border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;flex:1">场次</view>
							<view style="border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;flex:1">主队</view>
							<view style="border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;flex:1">客队</view>
							<view style="text-align: center;height: 60rpx;line-height: 60rpx;flex:1">投注内容</view>
						</view>
						
						<view v-for="(item1,index1) in item" :key="index1" style="border: 1px solid grey;display: flex;align-items: center;justify-content: center;background-color: #f4ede4;">
							<view style="border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;flex:1">{{item1["week"]}}</view>
							<view style="border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;flex:1">{{item1["h_name"]}}</view>
							<view style="border-right: 1px solid grey;text-align: center;height: 60rpx;line-height: 60rpx;flex:1">{{item1["a_name"]}}</view>
							<view style="text-align: center;height: 60rpx;line-height: 60rpx;flex:1">{{item1["name"]}}({{item1["pl"]}})</view>
						</view>
					</view>
							
					
					
					</view>
				</view>
				
			</view>
			
	
			<view style="position: fixed;z-index: 999;left: 0;bottom: 0;right: 0;background-color: #ffffff;">
				<view style="border-top: 1px solid #e8e8e8;border-bottom: 1px solid #e8e8e8;text-align: center;padding: 10rpx 10rpx;">单注预测奖金: <text style="color: red;">{{getExpectAward()}}</text></view>
				<view style="display: flex;align-items: center;justify-content: space-between;padding: 20rpx 20rpx;">
					<view >方案共 <text style="color: red;">{{this.getMoney()}}元</text></view>
					<view >
						<view  style="display: inline-block;background-color:#dcf4f2;padding: 10rpx 20rpx;border-radius: 16rpx 0 0 16rpx;">发起合买</view>
						<view @click="openorderpop()" style="display: inline-block;background: linear-gradient(to right,#97e2e2,#ffaaff);padding: 10rpx 50rpx;border-radius: 0 16rpx 16rpx 0;">提交</view>
					</view>
				</view>
			</view>
		
		<payorder  :num_arr="arr" ref="orderpop_" :amount="this.money" :shop_money="this.shop_money" :bei="bei" :check_game="games" :mode="4" :chuan_arr="chuan_arr" :game_type="type" @closeopendoor="closeopendoor()" >
		
		</payorder>
	
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import payorder from '@/components/zaiui-common/basics/payorder'
	export default{
		name:"optimize",
		components:{barTitle,payorder},
		data(){
			return {
				bei:1,
				chuan_arr:[],
				arr:[],
				money:0,
				games:[],
				cur_index:0,
				type:"foot",
				shop_money:0,
				is_order_open:false,
				
			}
		},
		
		onLoad(option) {
			var data = JSON.parse(decodeURIComponent(option.str) ) 
			for(let item in data){
				if(!Array.isArray(data[item])){
					data[item] = [data[item]]
				}
			}
			this.money = option.money
			this.games = data
			this.type = option.type
			console.log(this.type)
			this.setPingJunArr()	
		},
		methods:{
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
					 var res_ =res.data
					 this.shop_money = res_.now_money
			
					 this.$refs.orderpop_.$refs.orderpop.open('bottom')
					 this.is_order_open =true
					 var index = 0
					 var gg = this.clone(this.games)
					
					 for(let item in gg){
						 var len = gg[item].length
						 var str = ""
						 if(len == 1){
							 str = "单关"
						 }else{
							 str = len.toString()
						 }
						
							 this.chuan_arr.push({"value":str,"checked":true})
					
						 
						 
					 }
				 })
			},
			getMoney(){
				var a = 0
				for(let item in this.arr){
					a += this.arr[item]["zhu"]*2
				}
				return a
			},
			subZhu(index){
				if(this.arr[index]["zhu"] > 1){
					this.arr[index]["zhu"]--
				}
			},
			addZhu(index){
					this.arr[index]["zhu"]++
			},
			starBlur_(e){
				if(this.arr[e]["zhu"] < 1){
				
					this.arr[e]["zhu"] =1
					
				}
				
			},
			starBlur(e,index){
				if(e.detail.value < 1){
				
					this.arr[index]["zhu"] = 1
					
				}
				
			},
			getExpectAward(){
				var arr = this.clone(this.arr)
				var min = 0
				var max = 0
				var dd = arr.sort(function(a,b){
					return (a["one_award"]*a["zhu"]).toFixed(2) - (b["one_award"]*b["zhu"]).toFixed(2)
				})
				min = (dd[0]["one_award"]*dd[0]["zhu"]).toFixed(2)
				max = (dd[arr.length-1]["one_award"]*dd[arr.length-1]["zhu"]).toFixed(2)
				return min+"~"+max
			},
			findMinIndex(c_arr){
				var min_index = 0
				var min_num =10000000
				for(let item in c_arr){
					if(c_arr[item]["one_award"]*c_arr[item]["zhu"] < min_num){
						min_num = c_arr[item]["one_award"]*c_arr[item]["zhu"]
						min_index = item
					}
				}
				return min_index
			},
			clone(Obj){
				var buf;
				if(Obj instanceof Array){
					buf=[];
					var i=Obj.length;
					while(i--){
						buf[i]=this.clone(Obj[i]);
					}
					return buf;
				}
				else if(Obj instanceof Object){
					buf={};
					for(var k in Obj){
						buf[k]=this.clone(Obj[k]);
					}
					return buf;
				}else{
					return Obj;
				}
			},
			changeDisplay(str){
			
				this.$refs[str][0].$el.style.display = this.$refs[str][0].$el.style.display != "none"?"none":"block"
				//this.$refs.str.$el.style.display = 'none'
			},
			check(index){
				if(index != this.cur_index){
					this.cur_index = index
					if(index == 0){
						this.setPingJunArr()
					}
					if(index == 1){
						this.setBoReArr()
					}
					if(index == 2){
						this.setBoLengArr()
					}
					
				}
			},
			setPingJunArr(){
				var zhu = this.money/2 - this.games.length
				var arr = []
				for(let item in this.games){
					var award = 2
					
					for(let item1 in this.games[item]){
						award *=parseFloat(this.games[item][item1]["pl"])
					}
					var obj = {}
					obj["zhu"] = 1
					obj["one_award"] = award
					arr[item] =obj
				}
						
				
				
				var c_arr = this.clone(arr)
				
						  
						
				for(let i = 0;i<zhu;i++){
					var index = this.findMinIndex(c_arr)
					arr[index]["zhu"] = arr[index]["zhu"]+1
					c_arr[index]["zhu"] = arr[index]["zhu"]+1
				}
				this.arr = arr
			},
			setBoReArr(){
				this.setPingJunArr()
				//把注数都加到赔率最低的身上，其他注数减少到保本
				var base = 1000000
				var min_index = 0
				for(let item in this.arr){
					if(this.arr[item]["one_award"] <base){
						base = this.arr[item]["one_award"]
						min_index = item
					
					}
				}
				
				var z = 0
				for(let item in this.arr){
					if(item != min_index){
						
						while((this.arr[item]["one_award"]*(this.arr[item]["zhu"]-1))>this.money){
							this.arr[item]["zhu"] = this.arr[item]["zhu"] - 1
							z++
						}
					}
				}
				this.arr[min_index]["zhu"] = this.arr[min_index]["zhu"]+z
				
			},
			setBoLengArr(){
				this.setPingJunArr()
				//把注数都加到赔率最低的身上，其他注数减少到保本
				var base = 0
				var min_index = 0
				for(let item in this.arr){
					if(this.arr[item]["one_award"] >base){
						base = this.arr[item]["one_award"]
						min_index = item
					}
				}
				var z = 0
				for(let item in this.arr){
					if(item != min_index){
						
						while((this.arr[item]["one_award"]*(this.arr[item]["zhu"]-1))>this.money){
							this.arr[item]["zhu"] = this.arr[item]["zhu"] - 1
							z++
						}
					}
				}
				this.arr[min_index]["zhu"] = this.arr[min_index]["zhu"]+z
				
			}
		}
	}
</script>

<style lang="scss" scoped>
	
	page{
		background: #ffffff;
		overflow-y: scroll;
	}
	
	.is_red{
		color:red
	}
	.default{
		color: #004ade;
		
		border-right: 1px solid #004ade;
		border-top: 1px solid #004ade;
		border-bottom: 1px solid #004ade;
		background-color: white;
		padding: 10rpx 60rpx;
	}
	.checked{
		background-color: #004ade;
		color: white;
	}
</style>
