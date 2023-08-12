<template>
	<view>
				
		<view class="bg-white zaiui-title-tab-box">
			
		</view>
		

		<view class="navigate" >
			<view style=" border-bottom: 1rpx solid #EEEEEE;display: flex;justify-content: space-between;align-items: center;height: 100rpx;">
				<view @click="goBack()" class="cuIcon-back" style="margin-left: 20rpx;"></view>
				<view @tap="changeShowState" style="display: flex;align-items: center;justify-content: center;margin-right: 20rpx;">
					<view >{{foot_items[cur_index]["name"]}}</view>
					<view class="cuIcon-unfold" style="margin-left: 10rpx;color: #333333;"></view>
				</view>
				<view></view>
			</view>
			
			<view style="padding: 20rpx 20rpx;height: 200rpx;padding-left: 25rpx;box-shadow: 0 3rpx 3rpx 3rpx #CCCCCC;"  :class="[{'share-show':isshow == true},{'share-item':isshow == false}]">
					<view @tap="changeType(index)"  v-for="(item,index) in foot_items" :key="index"  :class="['check_list',{'checked_':cur_index == index},{'unchecked':cur_index != index}]">
						{{item["name"]}}
					</view>
			</view>
		</view>
		<view class="zhedie">
			<uni-collapse @change="change" v-if="games != ''"  v-for="(item,index) in games" :key="index" >
			   
			    <uni-collapse-item :title="getTitle(index,item)" :open="true"  >
			        <view v-for="(item1,index1) in item" :key="index1" style="display: flex;height: 230rpx;">
						<view style="flex:1;border-top: 1px solid #EEEEEE;border-bottom: 1px solid #EEEEEE;display: flex;justify-content: center;align-items: center;border-right: 1px solid #EEEEEE;">
							<game-time :game_id="item1['id']" :g_type="cur_index.toString()"  :lsname="item1['ls_name']" :stoptime="item1['start_time'].substring(5,12)  " :num="item1['num'].toString()" >			   
							</game-time>
						</view>
						<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;flex: 4;border-top: 1px solid #EEEEEE;border-bottom: 1px solid #EEEEEE;">
							<view style="display: flex;justify-content: space-between;width: 500rpx;margin-bottom: 20rpx;">
								 <view style="display: flex;align-items: center;justify-content: space-between;width: 300rpx;">
									 <span><text style="font-weight: bold;"><text style="color:red">(主)</text>{{item1["h_name"]}}</text> </span>
									 <text style="font-weight: bold;">VS</text>
								 </view>
								<text style="font-weight: bold;"><text style="color:red">(客)</text>{{item1["a_name"]}}</text>
							</view>
							<view  style="border-left: 1px solid #EEEEEE;border-top: 1px solid #EEEEEE;display: flex;border-right: 1px solid #EEEEEE;">
								<view style="width: 420rpx;">
									<spf :ref="item1['id'].toString()+'spfmain'" :gameNum="getcheckNum().toString()" :gameType="cur_index.toString()"     :p_single="item1['p_single']" :check_item="checkData[item1['id'].toString()]" :gameId="item1['id'].toString()" :state="item1['p_status']" :pl="'1'" :box_height="60" :box_width="140"   @updateCheckItem="updateCheckItem" >
										
									</spf>
								
									
									
								</view>
							
							</view>
							
						
							
						
							
						
							
							
							
						</view>
					</view>
			    </uni-collapse-item>
				
				
			 
			  
			</uni-collapse>
		</view>
		
		<view style="width: 100%;height: 250rpx;"></view>
		<view style="position: fixed;z-index: 999;left: 0;right: 0;bottom: 0;background-color: white;display: flex;justify-content: space-between;align-items: center;padding: 20rpx 20rpx;border-top: 1px solid #EEEEEE;height: 110rpx;">
			<view @click="deleteAll()" class="cuIcon-delete" style="font-size: 40rpx;"></view>
			<view style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
				
				<view v-if="this.cur_index ==0">
				
					<view v-if="getcheckNum() < 14">已选择<text class="check_color">{{getcheckNum()}}</text>场 <text style="padding-left: 8rpx;">还需再选</text><text class="check_color">{{14-getcheckNum()}}</text>场</view>
					<view v-if="getcheckNum() == 14">已选择<text class="check_color">{{getcheckNum()}}</text>场</view>
				</view>
				
				<view v-if="this.cur_index ==1">
			
					<view v-if="getcheckNum() < 9">已选择<text class="check_color">{{getcheckNum()}}</text>场 <text style="padding-left: 8rpx;">还需再选</text><text class="check_color">{{9-getcheckNum()}}</text>场</view>
					<view v-if="getcheckNum() == 9">已选择<text class="check_color">{{getcheckNum()}}</text>场</view>
					<view v-if="getcheckNum() > 9"><text style="color: red;">只能选择9场比赛!</text></view>
				</view>
				
				<view>预测奖金仅供参考 请以实票为准</view>
			</view>
			<view @click="submit()" style="background: linear-gradient(to right,#97e2e2,#ffaaff);padding: 10rpx 80rpx;border-radius: 16rpx;color: white;">提交</view>
		</view>
			
				
			

	</view>
</template>

<script>
	import gameTime from "@/components/zaiui-common/renjiu/gameTime"
	import spf from "@/components/zaiui-common/renjiu/spf"

    
	export default{
		name:"football",
		components:{gameTime,spf},
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
				checked_games:{},
			    can_order:false,
			    only_bifen:false,
			    emulator_Height: 0,
			    cur_game:{"id":0},
			    open_id:0,
			    games:"",
				checkNums:{},
				checkData:{},
				isshow:false,
				cur_index:0,
				reFresh: "",
				can_checked:true,
				foot_items:[
					{"name":"胜负彩14场"},
					{"name":"任选九"},
					
				]
			}
		},
		onLoad() {
			
			this.getFootGames()
			// 获取屏幕高度
            let self = this;
            uni.getSystemInfo({
                success: function(res) {
             
                    self.emulator_Height = (res.screenHeight * (750 / res.windowWidth)) //将px 转换rpx
               
                }
            });
		},
		 watch: {
		     checkData:{
		          handler(newName, oldName) {
		       console.log(newName)
		          },
		          deep: true
		    },
				reFresh: function() {
			        //调接口刷新数据
					this.getFootGames()
				}
		  }, 
		
		 filters:{
			 
		 },
		
		methods:{
			goBack(){
					uni.navigateBack();
			},
			submit(){
				if(this.cur_index == 1){
					if(this.getcheckNum() >9){
							uni.showToast({
										title:'只能选择9场！'
							})
						
							return
					}
								
				}	
				if(this.can_order == true){
					var data = {}
					data["type"] = this.cur_index==0?'sfc':'renjiu'
					var temp_game = {}
					for(let item in this.games){
						for(let zz in this.games[item]){
							temp_game[this.games[item][zz]["id"]] = this.games[item][zz]
						}
					}
					var k = this.getCheckedGame()
					var order_game = []
					for(let item in k){
						order_game.push({"bet":k[item],"h_name":temp_game[item]["h_name"],"a_name":temp_game[item]["a_name"],"num":temp_game[item]["num"]}) 
					}
				
		           
					data["check_game"] = order_game
					
			
					var str = encodeURIComponent(JSON.stringify(data)) 
				
					uni.navigateTo({
						url: "/pages/renjiu/order?data="+str
					})
				}
			},
			deleteAll(){
				this.getFootGames()
			
			},
			getCheckedGame(){
			
					
		var ddd = this.checkData
				for(let item in ddd){
					var objd = ddd[item]
				
					for(let l in objd){
						if(objd[l]["checked"] == true){
						if(this.checked_games[item]){
							this.checked_games[item][l] = objd[l]
						}else{
							var data = {}
							data[l] = objd[l]
							this.checked_games[item] = data
						}	
						}else{
							if(this.checked_games[item]){
								delete this.checked_games[item][l]
								var kl = Object.keys(this.checked_games[item])
								if(kl.length == 0){
									delete this.checked_games[item]
								}
							    
							}
						
						}
					}
				}
				
		return this.checked_games
			},
			
			getcheckNum(){
			
				var objs = this.getCheckedGame()
		      
				var arr=Object.keys(objs)
				var l = arr.length
				let limit = 14
	             if(this.cur_index == 0){
					 limit = 14
				 }else{
					 limit = 9
				 }
				 if(l<limit){
					 this.can_order = false
				 }else{
					 this.can_order = true
				 }
				
			    
			return l
		
				
			},
			getBfNum(id){
				var z = 0
				var obj = this.checkData[id]
			
				for(let i in obj){
					var arr = i.split("-")
					
					if(arr[0] == 3){
						
						if(obj[i]["checked"] == true){
							
							z++;
						}
					}
				}
				if(z == 0){
					return '点击选择比分'
				}
				return "已选择"+z+'项'
			},
			checkSingle(index){
				if(this.cur_game["id"] != 0){
					return this.cur_game["p_single"].split(",")[index]==1;
				}
				return false;
			},
			cancel(ref){
				 if(this.cur_index != 1){
					 this.$refs[ref+"spf"].cancel()
					 this.$refs[ref+"rqspf"].cancel()
				 }
				
				 this.$refs.popup.close('bottom')
			},
			confirm(ref){
				if(this.cur_index != 1){
					this.$refs[ref+"spf"].confirm()
					this.$refs[ref+"rqspf"].confirm()
					
				}else{
					this.$refs[ref+"bf"].confirm()
				}
			
				this.$refs.popup.close('bottom')
			},
			 open(item){
			        // 通过组件定义的ref调用uni-popup方法 ,如果传入参数 ，type 属性将失效 ，仅支持 ['top','left','bottom','right','center']
					this.cur_game = item
				
			        this.$refs.popup.open('top')
			      },
			getNums(id){
					
			var obj = this.checkData[id]
			
			var i = 0;
							 for(let item in obj){
							 				if(obj[item]["checked"] == true){
							 					i++;
							 				}
							 }
				return i;
			},
			getTitle(index,item){
				return "期号"+item[0]["qh"]+"                                                        " + "截止至 "+item[0]["stop_time"]
				
			},
			getFootGames(){
				var that = this
				var data = {
					
				};
				this.$api.getSfGames(data).then(res => {
					var res_ = res.data
					that.games = res_
					if(res_){
						for(let item in res_){
							var arr = res_[item]
							arr.forEach(v=>{
							
								that.checkData[v["id"]] =  {
	"3":{"checked":false,"pl":"1","name":"胜","game_id":v["id"],"num":v["num"],"qh":v["qh"]},
	"1":{"checked":false,"pl":"1","name":"平","game_id":v["id"],"num":v["num"],"qh":v["qh"]},
	"0":{"checked":false,"pl":"1","name":"负","game_id":v["id"],"num":v["num"],"qh":v["qh"]}

}
							})
						}
					}
					
				});
				
			},
			
			change(){
				
			},
			changeShowState(){
				this.isshow = !this.isshow
			},
			changeType(index){
			
				this.cur_index = index
				this.getFootGames()
				this.isshow = false
			},
			
			updateCheckItem(data){
			
				this.checkData[data["game_id"]] = data["checkItem"]
				
				     
			
				this.$forceUpdate();
						
			},
			updateCheckItem1(data){
				
				if(this.cur_index != 1){
					this.$refs[data["game_id"]+data["flag"]][0].updateCheckItem(data["checkItem"])
					this.$forceUpdate();	
				}else{
					this.$refs[data["game_id"]+data["flag"]].updateCheckItem(data["checkItem"])
					this.$forceUpdate();	
				}
			   		
			},
			
			
		}
	}
</script>

<style lang="scss" scoped>

		.check_color{
			color:red;
			padding:0 8rpx
		}

	

	.nred{
		color:red
	}
	.ngreen{
		color: green;
	}
	.lf{
		margin-left: 10rpx;
		font-weight: bold;
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
	.navigate{
		position: fixed;left: 0;right: 0;top: 0;background-color: white;
		margin-top: calc(var(--status-bar-height) + 0rpx);
		z-index: 999999;
	}
	.check_list{
		width: 200rpx;
		border-radius: 10rpx;
		padding: 10rpx 0;
		margin: 15rpx 10rpx;
		text-align: center;
		display: inline-block;
	}
	.unchecked{
		border: 1px solid #CCCCCC;
		color: grey;
		
	}
	.checked_{
		background-color: red;
		color: white;	
	}
	.share-show {
	    transition: all 0.3s ease;
	    transform: translateY(0%) !important;
		
	}
	// 离开分享动画12
	.share-item {
	    position: fixed;
	    left: 0;
	    top:-1230rpx;
	    width: 100%;
	    height: auto;
	    background-color: #FFFFFF;
	    transition: all 0.3s ease;
	    transform: translateY(100%);
	    z-index: 1999;
	}
</style>
