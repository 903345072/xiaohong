<template >
	<view  >
		
		<bar-title bgColor="bg-white" isBack >
			<block slot="content">投注单</block>
		</bar-title>
		<view v-if="can_order() ==true" style="display: flex;width: 100%;justify-content: space-around;margin-top: 30rpx;">
			<view style="display: flex;align-items: center;background-color: white;width: 40%;justify-content: center;padding: 10rpx 0;border-radius: 10rpx;">
				<view class="cuIcon-add" style="font-weight: bold;margin-right: 10rpx;"></view>
				<view style="font-weight: bold;" @click="goBack()">添加赛事</view>
			</view>
			<view style="display: flex;align-items: center;background-color: white;width: 40%;justify-content: center;padding: 10rpx 0;border-radius: 10rpx;">
				<view class="cuIcon-people" style="font-weight: bold;margin-right: 10rpx;"></view>
				<view style="font-weight: bold;">发起跟单</view>
			</view>
		</view>
		<view v-if="can_order() == false" style="display: flex;width: 100%;justify-content: space-around;margin-top: 30rpx;">
			<view style="display: flex;align-items: center;background-color: white;width: 90%;justify-content: center;padding: 10rpx 0;border-radius: 10rpx;">
				<view class="cuIcon-add" style="font-weight: bold;margin-right: 10rpx;"></view>
				<view style="font-weight: bold;" @click="goBack()">添加赛事</view>
			</view>
			
		</view>
		
		<view style="width: 100%;display: flex;justify-content: center;margin-top: 20rpx;">
			<image  style="height: 30rpx;width: 680rpx;" src="../../static/img/top-side.png"></image>
		</view>
		<view style="width: 100%;display: flex;justify-content: center;">
			<view style="background-color: white;width: 655rpx;margin-top: -20rpx;box-shadow: 11rpx 2rpx 15rpx 12rpx #DCDCDC;">
				<view  v-for="(item,index) in check_game" :key="index" style="display: flex;flex-direction: column;align-items: center;justify-content: center;border-bottom:1px dashed #acacac;padding: 20rpx 0;">
					<view  style="display: flex;align-items: center;justify-content: space-around;width: 100%;padding: 20rpx 0;">
						<view  style="width: 250rpx;display: flex;align-items: center;justify-content: space-around;font-size: 25rpx;">
							<view>周{{item['week']}}{{item['suffix_num']}}</view>
							<view>{{item['h_name']}}</view>
						</view>
						<view >VS</view>
						<view style="width: 250rpx;display: flex;align-items: center;justify-content: space-around;font-size: 25rpx;">
							<view>{{item['a_name']}}</view>
							<view class="cuIcon-roundclose" @click="deleteItem(index)"></view>
						</view>
					</view>
					<view  style="background-color: #f3f3f3;width: 90%;height: 70rpx;display: flex;justify-content: center;align-items: center;color:#4e90f7;font-size: 26rpx;">
						<view v-for="(item1,index1) in item['bet']" :key="index1" style="display: flex;padding: 0 6rpx;">
							{{item1["name"]}}
						</view>
					</view>
					
				</view>
			</view>
		</view>
		<view style="display: flex;justify-content: center;position: relative;">
			<image  style="height: 100rpx;width: 655rpx;" src="../../static/img/bottom-border.png">
				
			</image>
			<text v-if="check_game.length>0" style="position: absolute;left: 280rpx;top: 15rpx;color: grey;font-size: 25rpx;">您已选择{{check_game.length}}场比赛</text>
			<text v-if="check_game.length==0" style="position: absolute;left: 320rpx;top: 15rpx;color: grey;font-size: 25rpx;">请选择比赛</text>
		</view>
		
		
	<uni-popup ref="popup"  :mask-click="true" type="bottom"  background-color="#fff" style="z-index: 99;height: 600rpx;" >
		<view style="min-height: 300rpx;padding: 15rpx 20rpx;">
			<view style="display: flex;justify-content: space-between;color: grey;padding-bottom: 20rpx;">
				<view >自由过关</view>、
				<view @click="open()">收起</view>
			</view>
			<view v-for="(item,index) in chuan_arr" :key="index" style="display: inline-block;">
				<view @click="checkedChuan(index)" :class="['border-style',{'checked':item['checked']==true},{'unchecked':item['checked']==false}]">
					{{item["value"]!='单关' ?item["value"]+"串1":"单关"}}
				</view>
			</view>
		</view>
	</uni-popup>
	
	<payorder ref="orderpop_" :amount="getPlzh().length*bei*2" :shop_money="this.shop_money" :bei="bei" :check_game="getPlzh()" :mode="1" :chuan_arr="chuan_arr" :game_type="type" @closeopendoor="closeopendoor()" >
	
	</payorder>
	
	
	<view style="position: fixed;left: 0;right: 0;bottom: 0;background-color: white;z-index: 999;display: flex;flex-direction: column;">
		
		<view style="display: flex;justify-content: space-between;align-items: center;border-top: 2px solid #EEEEEE;padding-top: 20rpx;padding-left: 30rpx;">
			<view @click="open()" style="border: 1px solid #d1d1d1;display:flex;align-items: center;justify-content: center;min-width: 200rpx;padding: 0 20rpx;">
				<view style="margin-right: 40rpx;">{{getChuanStr()}}</view>
				<view class="cuIcon-unfold"></view>
			</view>
			<view style="display: flex;align-items: center;">
				<text @click="cancel()">投</text>
				<view @click="subBei()" style="background-color: #EEEEEE;height: 50rpx;text-align: center;width: 50rpx;margin-left: 20rpx;">一</view>
				<input @blur="starBlur_(bei)" v-model="bei" @input="starBlur($event,3)" type="number" style="background: #EEEEEE;width: 50rpx;margin: 0 5rpx;height: 50rpx;text-align: center;" />
				<view @click="addBei()" class="cuIcon-add" style="color: #000000;background-color: #EEEEEE;height: 50rpx;text-align: center;width: 50rpx;line-height: 50rpx;margin-right: 20rpx;"></view>
				<text style="margin-right: 20rpx;">倍</text>
			</view>
		</view>
		<view style="display: flex;justify-content: space-between;align-items: center;padding: 10rpx 20rpx;">
			<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;">
				<view style="font-size: 25rpx;">
					<text>共</text>
					<text>{{getPlzh().length}}注</text>
					<text>{{bei}}倍</text>
					<text>{{getPlzh().length*bei*2}}元</text>
				</view>
				<view style="color: red;font-size: 25rpx;" v-if="getExpectMaxAward() == 0" >预测奖金 0.00元</view>
				<view style="color: red;font-size: 25rpx;" v-if="getExpectMaxAward() == getExpectMinAward() && getExpectMinAward() >0" >预测奖金 {{getExpectMinAward()}}元</view>
				<view style="color: red;font-size: 25rpx;" v-if="getExpectMaxAward() >0 && getExpectMaxAward() != getExpectMinAward()" >预测奖金 {{getExpectMinAward()}} ~ {{getExpectMaxAward()}}</view>
			</view>
			
			<view >
				<view @click="goOptimize()" style="display: inline-block;background-color:#dcf4f2;padding: 10rpx 20rpx;border-radius: 20rpx 0 0 20rpx;">奖金优化</view>
				<view @click="openorderpop()" style="display: inline-block;background: linear-gradient(to right,#97e2e2,#ffaaff);padding: 10rpx 50rpx;border-radius: 0 20rpx 20rpx 0;">提交</view>
			</view>
		</view> 
		
	</view>
	</view>
</template>

<script>
	import ldSelect from '@/components/ld-select/ld-select.vue'
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import payorder from '@/components/zaiui-common/basics/payorder'
	export default{
		name:"order",
		components: {
			barTitle,ldSelect,payorder
		},
		data(){
			return{
			
				shop_money:0,
				is_order_open:false,
				chuan_arr:[],
				is_open:false,
			    bei:50,
				type:"foot",
				check_game:[],
			}
		},
		methods:{
			doorder(){
				var chuan_arr = this.chuan_arr
				chuan_arr = chuan_arr.filter(item=>{
					return item["checked"] == true
				})
				
				var data = {"type":"foot","num":this.getPlzh().length,"checkGame":JSON.stringify(this.getPlzh()),"bei":this.bei,"mode":1,"chuan":JSON.stringify(chuan_arr)}
				this.$api.doorder_(data).then(res=>{
				
					var str = encodeURIComponent(JSON.stringify(res.data)) 
					uni.navigateTo({
						url:"/pages/order/orderdetail?str="+str
					})
				})
			},
			goOptimize(){
				
				if(this.getPlzh().length>1){
					var str = encodeURIComponent(JSON.stringify(this.getPlzh())) 
					var money =this.getPlzh().length*this.bei*2
					uni.navigateTo({
						url: "/pages/football/optimize?str="+str+"&money="+money+"&type="+this.type
					})
				}
				
			},
			getPlzh(){
				var gg = this.chuan_arr
		        var checked_arr = []
				for(let item in gg){
					if(gg[item]["checked"] == true){
						checked_arr.push(gg[item]["value"])
					}
				}
				var zhu_arr = []
				var pl_arr = []
				
				for(let item0 in checked_arr){
					var da = checked_arr[item0]!="单关"?checked_arr[item0]:1
					pl_arr.push(this.pl(this.check_game,da))
					
				}
					for(let item1 in pl_arr){
						var dd = pl_arr[item1]
					
						for(let item2 in dd){
					
						var zz = this.dikaer(dd[item2])
						for(let item3 in zz){
							zhu_arr.push(zz[item3])
						}
						}	
					}
			
				return zhu_arr
				
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
			getExpectMinAward(){
				//把（胜，比分胜，半全场_/_胜） (平,比分平,总进球0,半全场_/_平) (负,比分负，半全场__/_负) 取出最大
				//取出最大和让球中和,再和总进球中和
				//console.log(this.check_game)
				var data = this.clone(this.check_game) 
				var award_arr = []
				for(let item in data){
					var obj = data[item]["bet"]
				
				
				    var arr = []
					var arr1 = [] //胜
					var arr2 = [] //让胜
					var arr3 = [] //比分
					var arr4 = [] //总进球
					var arr5 = [] //半全场
				
					for(let item1 in obj){
						var o = obj[item1]
						var t= o["met"].split("-")
						if(t[0] == 1){
							arr1.push(o)
							
						}
						if(t[0] == 2){
							arr2.push(o)
						
						}
						if(t[0] == 3){
							arr3.push(o)
						
						}
						if(t[0] == 4){
							arr4.push(o)
						
						}
						if(t[0] == 5){
							arr5.push(o)
							
						}
					}
					if(arr1.length>0)arr.push(arr1)
					if(arr2.length>0)arr.push(arr2)
					if(arr3.length>0)arr.push(arr3)
					if(arr4.length>0)arr.push(arr4)
					if(arr5.length>0)arr.push(arr5)
					var t_arr = this.dikaer(arr)
					var r_arr = []
					
					for(let item2 in t_arr){
						var t_arr2 = t_arr[item2]
						if(!Array.isArray(t_arr2)){
							
							t_arr2 = [t_arr2]
						}
			            r_arr.push(this.filter_game(t_arr2))
					}
					var d_arr =r_arr.sort(function(a,b){
						
						var a_sum = 0
						var b_sum = 0
						for(let a_item in a){
							a_sum +=parseInt(a[a_item]["pl"])
						}
						for(let b_item in b){
							b_sum +=parseInt(b[b_item]["pl"])
						}
						return b_sum - a_sum
					})[0]
					award_arr.push(d_arr)
					
				
				}
				
				var gg = this.chuan_arr
				var checked_arr = []
				for(let item in gg){
					if(gg[item]["checked"] == true){
						checked_arr.push(gg[item]["value"])
					}
				}
				var zhu_arr = []
				var pl_arr = []
				
				var pp_arr = {}
				for(let item0 in checked_arr){
					var da = checked_arr[item0]!='单关'?checked_arr[item0]:1
					var ddd = {}
					ddd["chuan"] = checked_arr[item0]
					ddd["content"] = this.pl(this.check_game,da)
					pl_arr.push(ddd)
					pp_arr[checked_arr[item0]] = 9999999
					
				}
						
						var jj = []
					for(let item1 in pl_arr){
						var dd = pl_arr[item1]["content"]
					    var chuan = pl_arr[item1]["chuan"]
						for(let item2 in dd){
			
						var zz = this.dikaer(dd[item2])
						for(let item3 in zz){
							
							if(chuan != '单关'){
								var m = 2
								for(let b in zz[item3]){
									m*=parseFloat(zz[item3][b]["pl"])
								}
								jj.push(m)
								
								if(m<pp_arr[chuan])	{
									
									pp_arr[chuan] = m
								}
								
							}else{
								var m = parseFloat(zz[item3]["pl"])*2
								jj.push(m)
								if(m<pp_arr[chuan])	{
									pp_arr[chuan] = m
								}
							}
							
							zhu_arr.push(zz[item3])
						}
						}	
					}
				
				jj = jj.sort(function(a,b){
					return a-b
				})
			var max_jj = 0
			var min_jj = 0
					
			
		
					
					
			pp_arr = Object.values(pp_arr).sort(function(a,b){
				return a-b
			})
			if(pp_arr.length == 0){
				return 0
			}else{
				return  parseFloat(pp_arr[0]*this.bei).toFixed(2)
			}
			
			
			
				//console.log(pl_arr)
				//归类胜平负
				
			},
			getExpectMaxAward(){
				//把（胜，比分胜，半全场_/_胜） (平,比分平,总进球0,半全场_/_平) (负,比分负，半全场__/_负) 取出最大
				//取出最大和让球中和,再和总进球中和
				//console.log(this.check_game)
				var data = this.clone(this.check_game) 
				
				var award_arr = []
				for(let item in data){
					var obj = data[item]["bet"]
				
				
				    var arr = []
					var arr1 = [] //胜
					var arr2 = [] //让胜
					var arr3 = [] //比分
					var arr4 = [] //总进球
					var arr5 = [] //半全场
				
					for(let item1 in obj){
						var o = obj[item1]
						var t= o["met"].split("-")
						if(t[0] == 1){
							arr1.push(o)
							
						}
						if(t[0] == 2){
							arr2.push(o)
						
						}
						if(t[0] == 3){
							arr3.push(o)
						
						}
						if(t[0] == 4){
							arr4.push(o)
						
						}
						if(t[0] == 5){
							arr5.push(o)
							
						}
					}
					if(arr1.length>0)arr.push(arr1)
					if(arr2.length>0)arr.push(arr2)
					if(arr3.length>0)arr.push(arr3)
					if(arr4.length>0)arr.push(arr4)
					if(arr5.length>0)arr.push(arr5)
					var t_arr = this.dikaer(arr)
					var r_arr = []
					
					for(let item2 in t_arr){
						var t_arr2 = t_arr[item2]
						if(!Array.isArray(t_arr2)){
							
							t_arr2 = [t_arr2]
						}
			            r_arr.push(this.filter_game(t_arr2))
					}
					var d_arr =r_arr.sort(function(a,b){
						
						var a_sum = 0
						var b_sum = 0
						for(let a_item in a){
							a_sum +=parseInt(a[a_item]["pl"])
						}
						for(let b_item in b){
							b_sum +=parseInt(b[b_item]["pl"])
						}
						return b_sum - a_sum
					})[0]
					award_arr.push(d_arr)
					
				
				}
				
				var gg = this.chuan_arr
				var checked_arr = []
				for(let item in gg){
					if(gg[item]["checked"] == true){
						checked_arr.push(gg[item]["value"])
					}
				}
				var zhu_arr = []
				var pl_arr = []
				
				var pp_arr = {}
				for(let item0 in checked_arr){
					var da = checked_arr[item0]!='单关'?checked_arr[item0]:1
					var ddd = {}
					ddd["chuan"] = checked_arr[item0]
					ddd["content"] = this.pl(award_arr,da)
					pl_arr.push(ddd)
					pp_arr[checked_arr[item0]] = 9999999
					
				}
						
						var jj = []
						
					for(let item1 in pl_arr){
						var dd = pl_arr[item1]["content"]
					    var chuan = pl_arr[item1]["chuan"]
						for(let item2 in dd){
			
						var zz = this.dikaer(dd[item2])
					
						for(let item3 in zz){
							
							if(chuan != '单关'){
								var m = 2
								for(let b in zz[item3]){
									m*=parseFloat(zz[item3][b]["pl"])
								}
								jj.push(m)
								
								if(m<pp_arr[chuan])	{
									
									pp_arr[chuan] = m
								}
								
							}else{
								var m = parseFloat(zz[item3]["pl"])*2
								jj.push(m)
								if(m<pp_arr[chuan])	{
									pp_arr[chuan] = m
								}
							}
							
							zhu_arr.push(zz[item3])
						}
						}	
					}
			
				jj = jj.sort(function(a,b){
					return a-b
				})
				
			var max_jj = 0
			var min_jj = 0
		
			
			for(let item in jj){
				max_jj += jj[item]
			}
		
		
		    
			if(jj.length == 0){
				return 0
			}
			
			if(jj.length  >=1){
				return parseFloat(max_jj*this.bei).toFixed(2)
			}
			
				//console.log(pl_arr)
				//归类胜平负
				
			},
			//平3 让平3 总进球1 胜胜2
			filter_game(arrgg){
				var arr_ = []
				var arr1= [] //假设比赛主胜 让球为负数 , 让球绝对值小于分差左边
				var arr2= [] //假设比赛主胜 让球为负数 , 让球绝对值大于分差左边
				
				var arr3= [] //假设比赛主胜 让球为正数 
			    
				var arr4= [] //假设比赛主负 让球为正数 , 让球绝对值大分差左边
				var arr5= [] //假设比赛主负 让球为正数 , 让球绝对值小于分差左边
				var arr6= [] //假设比赛主负 让球为负数 
				
			

				for(let item in arrgg){
					var obj = arrgg[item]
			
				
					var t= obj["met"].split("-")
					var goal = parseFloat(obj["p_goal"])
			
					//假设比赛主胜 让球为负数 , 让球绝对值小于分差左边  116:110  胜6-10  让-5.5  
					if(goal < 0){
						if(obj["met"] == "1-2"){
							arr1.push(obj)
						}
						if(t[0] == 4){
							if(t[1] >=7){
						
								var left = obj["name"].substr(2,1)
								if(Math.abs(goal) < parseFloat(left)){
									arr1.push(obj)
								}
							}
						}
						if(obj["met"] == "2-2"){
							arr1.push(obj)
						}
						if(t[0] == 3){
							arr1.push(obj)
						}
						
					}
					//假设比赛主胜 让球为负数 , 让球绝对值小于分差左边  116:110  胜6-10  让-6.5  
					if(goal < 0){
						if(obj["met"] == "1-2"){
							arr2.push(obj)
						}
						if(t[0] == 4){
							if(t[1] >=7){
								var left = obj["name"].substr(2,1)
								if(Math.abs(goal) > parseFloat(left)){
									
										arr2.push(obj)
									
								}
								
							}
						}
						if(obj["met"] == "2-1"){
							arr2.push(obj)
						}
						if(t[0] == 3){
							arr2.push(obj)
						}
					}
					
					//假设比赛主胜 让球为正数 , 
					if(goal > 0){
						if(obj["met"] == "1-2"){
							arr3.push(obj)
						}
						if(obj["met"] == "2-2"){
							arr3.push(obj)
						}
						if(t[0] == 4){
							if(t[1] >=7){
								arr3.push(obj)
							}
						}
						if(t[0] == 3){
							arr3.push(obj)
						}
					}
					//假设比赛主负 让球为正数 , 让球绝对值大分差左边   110  116  分差6-10  让球6.5
					if(goal > 0){
						if(obj["met"] == "1-1"){
							arr4.push(obj)
						}
						if(t[0] == 4){
							if(t[1] >=1 && t[1] <= 6){
						
								var left = obj["name"].substr(2,1)
								if(Math.abs(goal) > parseFloat(left)){
									arr4.push(obj)
								}
							}
						}
						if(obj["met"] == "2-2"){
							arr4.push(obj)
						}
						if(t[0] == 3){
							arr4.push(obj)
						}
					}
					
					//假设比赛主负 让球为正数 , 让球绝对值小于差左边   110  116  分差6-10  让球4.5
					if(goal > 0){
						if(obj["met"] == "1-1"){
							arr5.push(obj)
						}
						if(t[0] == 4){
							if(t[1] >=1 && t[1] <= 6){
							
								var left = obj["name"].substr(2,1)
								if(Math.abs(goal) < parseFloat(left)){
									arr5.push(obj)
								}
							}
						}
						if(obj["met"] == "2-1"){
							arr5.push(obj)
						}
						if(t[0] == 3){
							arr5.push(obj)
						}
					}
					
					//假设比赛主负 让球为负数   110  116  分差6-10  让球-4.5
					if(goal < 0){
						if(obj["met"] == "1-1"){
							arr6.push(obj)
						}
						if(t[0] == 4){
							if(t[1] >=1 && t[1] <= 6){
								arr6.push(obj)
							}
						}
						if(obj["met"] == "2-1"){
							arr6.push(obj)
						}
						if(t[0] == 3){
							arr6.push(obj)
						}
					}
					
				}
		
				  if(arr1.length>0){arr_.push(arr1)}
				  if(arr2.length>0){arr_.push(arr2)}
				  if(arr3.length>0){arr_.push(arr3)}  
				  if(arr4.length>0){arr_.push(arr4)}
				  if(arr5.length>0){arr_.push(arr5)}
				  if(arr6.length>0){arr_.push(arr6)}
			
		
					
					var dd = arr_.sort(function(a,b){
						var a_sum = 0
						var b_sum = 0
						for(let item in a){
							a_sum += parseFloat(a[item]["pl"])
						}
						for(let item in b){
							b_sum += parseFloat(b[item]["pl"])
						}
						return b_sum - a_sum
					})[0]
					
				  return dd
				
			
			},
			
			
			pl(arr,size){
				var len = arr.length
				var max = Math.pow(2,len); 
				var min = Math.pow(2,size)-1;
				var r_arr = []
				for(let i = min;i<max;i++){
					var count = 0;
					var t_arr = [];
					for (let j=0; j<len; j++){
					   var a = Math.pow(2, j);
					   var t = i&a;
					   if(t == a){
						   if(arr[j]["bet"]){
							    t_arr.push(arr[j]["bet"]);
						   }else{
							    t_arr.push(arr[j]);
						   }
					   
					    count++;
					   }
					}
					if(count ==size ){
						r_arr.push(t_arr)
					}
				}
				return r_arr;
			},
			
			 dikaer(array) {
			if (array.length < 2) return array[0] || [];
			return [].reduce.call(array, function (col, set) {
				var res = [];
				Object.values(col).forEach(function (c) {
					Object.values(set).forEach(function (s) {
						var t = [].concat(Array.isArray(c) ? c : [c]);
						t.push(s);
						res.push(t);
					})
				});
				return res;
			});
		},

			checkedChuan(index){
				this.chuan_arr[index]["checked"] = !this.chuan_arr[index]["checked"]	
			},
			getChuanStr(){
			
		     	var chuan_arr = this.chuan_arr
				chuan_arr = chuan_arr.filter(item=>{
					return item["checked"] == true
				})
				var str = ""
			
			    if(chuan_arr.length == 0){
			    	str+="请选择"
			    	
			    }
				if(chuan_arr.length == 1){
					str+= chuan_arr[0]["value"]=="单关"?"单关":chuan_arr[0]["value"]+"串1"+" "
				}
				if(chuan_arr.length == 2){
					str+= chuan_arr[0]["value"]=="单关"?"单关":chuan_arr[0]["value"]+"串1"+" "
					str+= chuan_arr[1]["value"]=="单关"?"单关":chuan_arr[1]["value"]+"串1"+" "
				}
				if(chuan_arr.length > 2){
					str+= chuan_arr[0]["value"]=="单关"?"单关":chuan_arr[0]["value"]+"串1"+" "
					str+= "..."
					str+= chuan_arr[chuan_arr.length-1]["value"]=="单关"?"单关":chuan_arr[chuan_arr.length-1]["value"]+"串1"+" "
				}
			
				return str
			},
			getChuanArr(){
				var chuan_arr = []
				var size = this.check_game.length
		
				if(size == 0){
					this.chuan_arr = []
					return []
				}
				if(size == 2){
					chuan_arr = [{"value":2,"checked":true}]
				}
				if(size >2){
					for(var i =2;i<=size;i++){
						var bb = false
						if(i == size){
							bb = true
						}
						chuan_arr.push({"value":i,"checked":bb})
						
					} 
				}
				var is_single = true
				for(let item in this.check_game){
					var obj = this.check_game[item]
				
					for(let z in obj["bet"]){
						if(obj["bet"][z]["p_single"] == false){
							is_single = false
							break
						}
					}
				}
				if(is_single == true ){
				
					if(chuan_arr.length == 0){
						chuan_arr.push({"value":"单关","checked":true})
					}else{
						chuan_arr.push({"value":"单关","checked":false})
					}
				}
			
		this.chuan_arr = chuan_arr
	
				return chuan_arr
			},
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
			cancel(){
				
				
				 this.$refs.popup.close('bottom')
			},
			open(item){
			       // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
					if(this.is_open == false){
						this.$refs.popup.open('bottom')
						this.is_open =true
					}else{
						this.$refs.popup.close('bottom')
						this.is_open =false
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
					 })
				 },
				 closeopendoor(){
					
					 this.$refs.orderpop_.$refs.orderpop.close('bottom')
					 this.is_order_open =false
				 },
				 openorderpop(){
				        // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 1属性将失效 ，仅支持 ['top','left','bottom','right','center']
				 		if(this.is_order_open == false && this.getPlzh().length>0){
							this.getUserInfo()
				 		
				 		}else{
				 			this.$refs.orderpop_.$refs.orderpop.close('bottom')
				 			this.is_order_open =false
				 		}		
				      },
				 
			 selectChange(val){
			                this.value = val
			            },
			            selectChange2(val){
			                this.value2 = val
			            },
			            selectChange4(val){
			                this.value4 = val
			            },
			            selectChange5(val){
			                this.value5 = val
			            },
			goBack(){
				uni.navigateBack()
			},
			deleteItem(index){
				this.check_game.splice(index,1)
				this.getChuanArr()
				
			},
		
			can_order(){
			
				
			
						var l = this.check_game.length
			
				
						if(l==0){
							return false
						}
						if(l==1){
						
							var flag = true
							
							//选择的是否都是单关
							var j = this.check_game[0]
						
						
							for(let item in j['bet']){
								
							
								
										if(j['bet'][item]["p_single"] != "1"){
											flag = false
										}
							
							}
							
							if(flag == true){
							
								return true
							}else{
							
								return false
							}
						}
						
					return true
				
			},
			
			
			
		},
		onLoad(option) {
			var data = JSON.parse(decodeURIComponent(option.data) ) 
			this.type = data["type"]
			this.check_game = data["check_game"]
			for(let item in this.check_game){
				var obj = this.check_game[item]["bet"]
				for(let item1 in obj){
					obj[item1]["met"] = item1
					obj[item1]["h_name"] = this.check_game[item]["h_name"]
					obj[item1]["a_name"] = this.check_game[item]["a_name"]
				}
			}
	        this.getChuanArr()
		}
	}
</script>

<style lang="scss" scoped>
	page{
		background: #f3f3f3;
	}
	.border-style{
		padding: 5rpx 20rpx;
		margin: 0 10rpx;
		border: 1px solid #d1d1d1;
	}
	.checked{
		background-color: #0099ff;
		color: white;
	}
	.unchecked{
		background-color: white;
		color: black;
	}
</style>
