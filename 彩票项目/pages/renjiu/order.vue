<template >
	<view  >
		
		<bar-title bgColor="bg-white" isBack >
			<block slot="content">投注单</block>
		</bar-title>
		<view  style="display: flex;width: 100%;justify-content: space-around;margin-top: 30rpx;">
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
			
			<text v-if="this.type =='sfc'">
			
					<text v-if="check_game.length<14" style="position: absolute;left: 280rpx;top: 15rpx;color: grey;font-size: 25rpx;">您还需选{{14-check_game.length}}场比赛</text>			
			</text>
			
			<text v-if="this.type =='renjiu'">
						
					<text v-if="check_game.length<9" style="position: absolute;left: 280rpx;top: 15rpx;color: grey;font-size: 25rpx;">您还需选{{9-check_game.length}}场比赛</text>			
			
			
			</text>
			
		</view>
		
		

	
	<payorder ref="orderpop_" :amount="getPlzh().length*bei*2" :shop_money="this.shop_money" :bei="bei" :check_game="getPlzh()" :mode="1" :chuan_arr="chuan_arr" :game_type="type" @closeopendoor="closeopendoor()" >
	
	</payorder>
	
	<view style="width: 100%;height: 200rpx;"></view>
	<view style="position: fixed;left: 0;right: 0;bottom: 0;background-color: white;z-index: 999;display: flex;flex-direction: column;">
		
		<view style="display: flex;justify-content: space-between;align-items: center;border-top: 2px solid #EEEEEE;padding-top: 20rpx;padding-left: 30rpx;">
			
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
			launchFlow(){
				var chuan_arr = this.chuan_arr
				chuan_arr = chuan_arr.filter(item=>{
					return item["checked"] == true
				})
				var plzh = this.getPlzh()
				var data = {"type":"foot","num":plzh.length,"checkGame":JSON.stringify(plzh),"bei":this.bei,"mode":1,"chuan":JSON.stringify(chuan_arr),"en_type":"竞彩足球","money":plzh.length*this.bei*2,"check_game":plzh,"chuan_arr":chuan_arr}
				uni.navigateTo({
					url:"/pages/flow/index?data="+encodeURIComponent(JSON.stringify(data)) 
				})
			},
			doorder(){
				if(!this.can_order()){
					
					return false
				}
				var chuan_arr = this.chuan_arr
				chuan_arr = chuan_arr.filter(item=>{
					return item["checked"] == true
				})
				// console.log(JSON.stringify(this.getPlzh()))
				// return
				var data = {"type":this,type,"num":this.getPlzh().length,"checkGame":JSON.stringify(this.getPlzh()),"bei":this.bei,"mode":1,"chuan":JSON.stringify(chuan_arr)}
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
						url: "/pages/football/optimize?str="+str+"&money="+money+"&tyep="+this.type
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
				return "0"
				
			},
			getExpectMaxAward(){
				return '500万'
				
				
			},
			//平3 让平3 总进球1  胜胜2  
			
			
			
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
						 var res_ =res.data.data
						 this.shop_money = res_.total_money
				
					     this.$refs.orderpop_.$refs.orderpop.open('bottom')
						 this.is_order_open =true
					 })
				 },
				 closeopendoor(){
					
					 this.$refs.orderpop_.$refs.orderpop.close('bottom')
					 this.is_order_open =false
				 },
				 openorderpop(){
					
					 if(!this.can_order()){
					 	
					 	return false
					 }
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
						let limit = 14
			            if(this.type == "sfc"){
							limit = 14
						}else{
							limit = 9
						}
						if(l<limit){
							return false
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
