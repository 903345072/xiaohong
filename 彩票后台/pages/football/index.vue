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
							<game-time :g_type="cur_index.toString()" :p_single="item1['p_single']" :weekno='"周"+item1["week"]+item1["suffix_num"]' :lsname="item1['l_cn']" :stoptime="item1['stop_time'].substring(11,16)" >			   
							</game-time>
						</view>
						<view style="display: flex;flex-direction: column;justify-content: center;align-items: center;flex: 4;border-top: 1px solid #EEEEEE;border-bottom: 1px solid #EEEEEE;">
							<view style="display: flex;justify-content: space-between;width: 500rpx;margin-bottom: 20rpx;">
								 <view style="display: flex;align-items: center;justify-content: space-between;width: 300rpx;">
									 <span><text style="font-weight: bold;">{{item1["h_cn"]}}</text> <text :class="['lf',{'nred':item1['goal']>0==true},{'ngreen':item1['goal']<0==true}]" >{{item1["goal"]}}</text></span>
									 <text style="font-weight: bold;">VS</text>
								 </view>
								<text style="font-weight: bold;">{{item1["a_cn"]}}</text>
							</view>
							<view v-if="cur_index==4" style="border-left: 1px solid #EEEEEE;border-top: 1px solid #EEEEEE;display: flex;border-right: 1px solid #EEEEEE;">
								<view style="width: 420rpx;">
									<spf :ref="item1['id'].toString()+'spfmain'"     :p_single="item1['p_single']" :check_item="checkData[item1['id'].toString()]" :gameId="item1['id'].toString()" :state="item1['p_status']" :pl="item1['had_odds']" :box_height="60" :box_width="140"   @updateCheckItem="updateCheckItem" >
										
									</spf>
									
									<rqspf :ref="item1['id'].toString()+'rqspfmain'" :p_single="item1['p_single']"  :check_item="checkData[item1['id'].toString()]" :gameId="item1['id'].toString()" :state="item1['p_status']" :pl="item1['hhad_odds']" :box_height="60" :box_width="140"    @updateCheckItem="updateCheckItem">
										
									</rqspf>
									
									
								</view>
								<view v-if="getNums(item1['id'])>0" @click="open(item1)" style="text-align: center;border-bottom: 1px solid #EEEEEE;display: flex;flex-direction: column;justify-content: center;padding: 0 10rpx;width: 100rpx;">
									<view style="color: grey;font-size: 25rpx;">已选择</view>
									<view><text style="color: red;font-size: 25rpx;margin-right: 5rpx;">{{ getNums(item1['id'].toString())  }}</text><text style="color: grey;">项</text></view>
								</view>
								<view v-if="getNums(item1['id'])==0" @click="open(item1)" style="text-align: center;border-bottom: 1px solid #EEEEEE;display: flex;flex-direction: column;justify-content: center;padding: 0 10rpx;width: 100rpx;">
									<view style="color: grey;font-size: 25rpx;">混合</view>
									<view><text style="color: grey;font-size: 25rpx;margin-right: 5rpx;">选项</text></view>
								</view>
							</view>
							
							<view v-if="cur_index==0" style="border-left: 1px solid #EEEEEE;border-top: 1px solid #EEEEEE;display: flex;">
								<view>
									<spf  :p_single="item1['p_single']" :check_item="checkData[item1['id'].toString()]" :gameId="item1['id'].toString()" :state="item1['p_status']" :pl="item1['had_odds']" :box_height="60" :box_width="160"   @updateCheckItem="updateCheckItem">
									</spf>
									<rqspf :check_item="checkData[item1['id'].toString()]" :gameId="item1['id'].toString()" :state="item1['p_status']" :pl="item1['hhad_odds']" :box_height="60" :box_width="160"    @updateCheckItem="updateCheckItem">
									</rqspf>
								</view>
							</view>
							
							<view v-if="cur_index==1" style="border-left: 1px solid #EEEEEE;border-top: 1px solid #EEEEEE;display: flex;">
								<view @click="open(item1)" v-if="item1['p_status'].split(',')[2] == 1" style="border: 1px solid #e00611;color: #e00611;width: 500rpx;text-align: center;height: 60rpx;line-height: 60rpx;">
									{{getBfNum(item1['id'])}}
								</view>
								<view v-if="item1['p_status'].split(',')[2] == 0" style="background-color:#cccccc;color: #e00611;width: 500rpx;text-align: center;height: 60rpx;line-height: 60rpx;">
									未开售
								</view>
							</view>
							
							<view v-if="cur_index==2" style="border-left: 1px solid #EEEEEE;display: flex;">
								<view :style="{'width':480+'rpx','overflow':'hidden'}">
									<zjq  :p_single="item1['p_single']" :check_item="checkData[item1['id'].toString()]" :gameId="item1['id'].toString()" :state="item1['p_status']" :pl="item1['ttg_odds']" :box_height="80" :box_width="120"   @updateCheckItem="updateCheckItem">
									</zjq>
									
								</view>
							</view>
							
							<view v-if="cur_index==3" style="border-left: 1px solid #EEEEEE;display: flex;">
								<view :style="{'width':510+'rpx','overflow':'hidden'}">
									<bqc  :p_single="item1['p_single']" :check_item="checkData[item1['id'].toString()]" :gameId="item1['id'].toString()" :state="item1['p_status']" :pl="item1['hafu_odds']" :box_height="50" :box_width="170"   @updateCheckItem="updateCheckItem">
									</bqc>
								</view>
							</view>
							
						</view>
					</view>
			    </uni-collapse-item>
				
				
			 
			  
			</uni-collapse>
		</view>
		
		
		<view style="position: fixed;z-index: 999;left: 0;right: 0;bottom: 0;background-color: white;display: flex;justify-content: space-between;align-items: center;padding: 20rpx 20rpx;border-top: 1px solid #EEEEEE;height: 110rpx;">
			<view @click="deleteAll()" class="cuIcon-delete" style="font-size: 40rpx;"></view>
			<view style="display: flex;justify-content: center;align-items: center;flex-direction: column;">
				<view v-if="getcheckNum() == 0">请选择比赛</view>
				<view v-if="getcheckNum() == 1">已选择<text class="check_color">1</text>场</view>
				<view v-if="getcheckNum() == -1">已选择<text class="check_color">1</text>场 <text style="padding-left: 8rpx;">还需再选</text><text class="check_color">1</text>场</view>
				<view v-if="getcheckNum() >= 2">已选择<text class="check_color">{{getcheckNum()}}</text>场</view>
				<view>预测奖金仅供参考 请以实票为准</view>
			</view>
			<view @click="submit()" style="background: linear-gradient(to right,#97e2e2,#ffaaff);padding: 10rpx 80rpx;border-radius: 16rpx;color: white;">提交</view>
		</view>
			
				<uni-popup ref="popup" :mask-click="false" type="bottom" background-color="#fff" style="z-index: 999999;" >
					<scroll-view scroll-y="true" class="scroll-Y" :style="{'height':emulator_Height+'rpx','width':'100%'}">
					<view style="display: flex;width: 100%;justify-content: space-around;margin: 20rpx 20rpx;">
						<view>{{cur_game["h_cn"]}}</view>
						<view style="font-weight: bold;color: red;">VS</view>
						<view>{{cur_game["a_cn"]}}</view>
					</view>
					
					<view v-if="only_bifen==false">
						<view style="margin-left: 20rpx;">胜平负让球 <text style="margin-left: 10rpx;" :class="[{'nred':cur_game['goal']>0==true},{'ngreen':cur_game['goal']<0==true}]">{{cur_game['goal']}}</text></view>
						
						<view style="padding: 20rpx 40rpx;display: flex;flex-direction: column;justify-content: center;align-items: center;">
							<view style="width: 720rpx;border-left: 1px solid #EEEEEE;border-top: 1px solid #EEEEEE;">
								<spf :dire_sub="false" :ref="cur_game['id'].toString()+'spf'"  :p_single="cur_game['p_single']" :check_item="checkData[cur_game['id'].toString()]" :gameId="cur_game['id'].toString()" :state="cur_game['p_status']" :pl="cur_game['had_odds']" :box_height="80" :box_width="240"   @updateCheckItem="updateCheckItem" @updateCheckItem1="updateCheckItem1">	
								</spf>
								
								<rqspf :dire_sub="false" :ref="cur_game['id'].toString()+'rqspf'" :p_single="cur_game['p_single']" :check_item="checkData[cur_game['id'].toString()]" :gameId="cur_game['id'].toString()" :state="cur_game['p_status']" :pl="cur_game['hhad_odds']" :box_height="80" :box_width="240"    @updateCheckItem="updateCheckItem" @updateCheckItem1="updateCheckItem1">
								</rqspf>
							</view>
						</view>
					</view>
					
					<view style="margin-left: 20rpx; display: flex;align-items: center;">
						<view v-if="checkSingle(2)" style="background-color: red;color: white;padding: 6rpx 4rpx;margin-right: 10rpx;">
							单
						</view>
						<view>比分</view>
					</view>
					
					<view style="padding: 20rpx 40rpx;display: flex;flex-direction: column;justify-content: center;align-items: center;">
						<view  style="width: 720rpx;border-left: 1px solid #EEEEEE;display: flex;">
							<view style="width: 100%;">
								<bf :ref="cur_game['id'].toString()+'bf'" :p_single="cur_game['p_single']" :check_item="checkData[cur_game['id'].toString()]" :gameId="cur_game['id'].toString()" :state="cur_game['p_status']" :pl="cur_game['crs_win']" :pl2="cur_game['crs_draw']" :pl3="cur_game['crs_lose']" :box_height="75" :box_width="170"   @updateCheckItem="updateCheckItem" @updateCheckItem1="updateCheckItem1">
								</bf>
							</view>
						</view>
					</view>
					
					<view v-if="only_bifen==false">
						<view style="margin-left: 20rpx; display: flex;align-items: center;">
							<view v-if="checkSingle(3)" style="background-color: red;color: white;padding: 6rpx 4rpx;margin-right: 10rpx;">
								单
							</view>
							<view>总进球</view>
						</view>
						
						<view style="padding: 20rpx 40rpx;display: flex;flex-direction: column;justify-content: center;align-items: center;">
							<view  style="width: 720rpx;border-left: 1px solid #EEEEEE;display: flex;">
								<view style="width: 100%;">
									<zjq :p_single="cur_game['p_single']" :check_item="checkData[cur_game['id'].toString()]" :gameId="cur_game['id'].toString()" :state="cur_game['p_status']" :pl="cur_game['ttg_odds']"   :box_height="75" :box_width="180"   @updateCheckItem="updateCheckItem" @updateCheckItem1="updateCheckItem1">
									</zjq>
								</view>
							</view>
						</view>
					</view>
					
					<view v-if="only_bifen==false">
						<view style="margin-left: 20rpx; display: flex;align-items: center;">
							<view v-if="checkSingle(4)" style="background-color: red;color: white;padding: 6rpx 4rpx;margin-right: 10rpx;">
								单
							</view>
							<view>半全场</view>
						</view>
						
						<view style="padding: 20rpx 40rpx;display: flex;flex-direction: column;justify-content: center;align-items: center;margin-bottom: 100rpx;">
							<view  style="width: 720rpx;border-left: 1px solid #EEEEEE;display: flex;">
								<view style="width: 100%;">
									<bqc  :p_single="cur_game['p_single']" :check_item="checkData[cur_game['id'].toString()]" :gameId="cur_game['id'].toString()" :state="cur_game['p_status']" :pl="cur_game['hafu_odds']" :box_height="50" :box_width="170"   @updateCheckItem="updateCheckItem" @updateCheckItem1="updateCheckItem1">
									</bqc>
								</view>
							</view>
						</view>
					</view>
					
					
					</scroll-view>
					<view style="display: flex;width:100%;justify-content: center;align-items: center;position: fixed;bottom: 0;left: 0;right: 0;">
						<view @click="cancel(cur_game['id'].toString())" style="width: 50%;background-color: white;text-align: center;height: 100rpx;line-height: 100rpx;">取消</view>
						<view @click="confirm(cur_game['id'].toString())" style="background-color: red;color: red;text-align: center;color: white;width: 50%;height: 100rpx;line-height: 100rpx;">确认</view>
					</view>
				</uni-popup>
			
	
	</view>
</template>

<script>
	import gameTime from "@/components/zaiui-common/football/gameTime"
	import spf from "@/components/zaiui-common/football/spf"
	import rqspf from "@/components/zaiui-common/football/rqspf"
	import zjq from "@/components/zaiui-common/football/zjq"
	import bqc from "@/components/zaiui-common/football/bqc"
	import bf from "@/components/zaiui-common/football/bf"
    
	export default{
		name:"football",
		components:{gameTime,spf,rqspf,zjq,bqc,bf},
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
				cur_index:4,
				reFresh: "",
				foot_items:[
					{"name":"胜平负"},
					{"name":"比分"},
					{"name":"总进球数"},
					{"name":"半全场"},
					{"name":"混合过关"}
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
				if(this.can_order == true){
					var data = {}
					data["type"] = "foot"
					var temp_game = {}
					for(let item in this.games){
						for(let zz in this.games[item]){
							temp_game[this.games[item][zz]["id"]] = this.games[item][zz]
						}
					}
					var k = this.getCheckedGame()
					var order_game = []
					for(let item in k){
						order_game.push({"bet":k[item],"h_name":temp_game[item]["h_cn"],"a_name":temp_game[item]["a_cn"],"week":temp_game[item]["week"],"suffix_num":temp_game[item]["suffix_num"]}) 
					}
				
		           
					data["check_game"] = order_game
					
			
					var str = encodeURIComponent(JSON.stringify(data)) 
				
					uni.navigateTo({
						url: "/pages/football/order?data="+str
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
		//console.log(Object.values(objs))
		
				if(l==0){
					this.can_order = false
					return 0;
				}
				if(l==1){
				
					var flag = true
					
					//选择的是否都是单关
					var j = Object.values(objs)[0]
				
					let c = 0
					for(let item in j){
						if(j[item]["p_single"] != "1"){
							flag = false
						}
					}
				
					if(flag == true){
						this.can_order = true
						return 1
					}else{
						this.can_order = false
						return -1
					}
				}
				
			this.can_order = true
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
				
			        this.$refs.popup.open('bottom')
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
				return index+" "+"周"+item[0]["week"]+" "+item.length+"场比赛"
			},
			getFootGames(){
				var that = this
				var data = {
					
				};
				this.$api.getFootGames(data).then(res => {
					var res_ = res.data
					that.games = res_
					if(res_){
						for(let item in res_){
							var arr = res_[item]
							arr.forEach(v=>{
								var p_single = v["p_single"]
								var p_goal = v["p_goal"]
								p_goal = p_goal.split(",")
								p_single = p_single.split(",")
							
								that.checkData[v["id"]] =  {
	"1-1":{"checked":false,"pl":"1","name":"胜","p_single":p_single[0],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"1-2":{"checked":false,"pl":"1","name":"平","p_single":p_single[0],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"1-3":{"checked":false,"pl":"1","name":"负","p_single":p_single[0],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"2-1":{"checked":false,"pl":"1","name":"让胜","p_single":p_single[1],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"2-2":{"checked":false,"pl":"1","name":"让平","p_single":p_single[1],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"2-3":{"checked":false,"pl":"1","name":"让负","p_single":p_single[1],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-1":{"checked":false,"pl":"1","name":"1:0","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-2":{"checked":false,"pl":"1","name":"2:0","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-3":{"checked":false,"pl":"1","name":"2:1","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-4":{"checked":false,"pl":"1","name":"3:0","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-5":{"checked":false,"pl":"1","name":"3:1","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-6":{"checked":false,"pl":"1","name":"3:2","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-7":{"checked":false,"pl":"1","name":"4:0","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-8":{"checked":false,"pl":"1","name":"4:1","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-9":{"checked":false,"pl":"1","name":"4:2","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-10":{"checked":false,"pl":"1","name":"5:0","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-11":{"checked":false,"pl":"1","name":"5:1","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-12":{"checked":false,"pl":"1","name":"5:2","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-13":{"checked":false,"pl":"1","name":"胜其他","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-14":{"checked":false,"pl":"1","name":"0:0","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-15":{"checked":false,"pl":"1","name":"1:1","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-16":{"checked":false,"pl":"1","name":"2:2","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-17":{"checked":false,"pl":"1","name":"3:3","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-18":{"checked":false,"pl":"1","name":"平其他","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-19":{"checked":false,"pl":"1","name":"0:1","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-20":{"checked":false,"pl":"1","name":"0:2","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-21":{"checked":false,"pl":"1","name":"1:2","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-22":{"checked":false,"pl":"1","name":"0:3","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-23":{"checked":false,"pl":"1","name":"1:3","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-24":{"checked":false,"pl":"1","name":"2:3","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-25":{"checked":false,"pl":"1","name":"0:4","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-26":{"checked":false,"pl":"1","name":"1:4","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-27":{"checked":false,"pl":"1","name":"2:4","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-28":{"checked":false,"pl":"1","name":"0:5","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-29":{"checked":false,"pl":"1","name":"1:5","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-30":{"checked":false,"pl":"1","name":"2:5","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"3-31":{"checked":false,"pl":"1","name":"负其他","p_single":p_single[2],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"4-1":{"checked":false,"pl":"1","name":"0","p_single":p_single[3],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"4-2":{"checked":false,"pl":"1","name":"1","p_single":p_single[3],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"4-3":{"checked":false,"pl":"1","name":"2","p_single":p_single[3],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"4-4":{"checked":false,"pl":"1","name":"3","p_single":p_single[3],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"4-5":{"checked":false,"pl":"1","name":"4","p_single":p_single[3],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"4-6":{"checked":false,"pl":"1","name":"5","p_single":p_single[3],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"4-7":{"checked":false,"pl":"1","name":"6","p_single":p_single[3],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"4-8":{"checked":false,"pl":"1","name":"7+","p_single":p_single[3],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"5-1":{"checked":false,"pl":"1","name":"胜胜","p_single":p_single[4],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"5-2":{"checked":false,"pl":"1","name":"胜平","p_single":p_single[4],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"5-3":{"checked":false,"pl":"1","name":"胜负","p_single":p_single[4],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"5-4":{"checked":false,"pl":"1","name":"平胜","p_single":p_single[4],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"5-5":{"checked":false,"pl":"1","name":"平平","p_single":p_single[4],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"5-6":{"checked":false,"pl":"1","name":"平负","p_single":p_single[4],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"5-7":{"checked":false,"pl":"1","name":"负胜","p_single":p_single[4],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"5-8":{"checked":false,"pl":"1","name":"负平","p_single":p_single[4],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]},
	"5-9":{"checked":false,"pl":"1","name":"负负","p_single":p_single[4],"p_goal":p_goal[1],"game_id":v["id"],"week":"周"+v["week"]+v["suffix_num"]}
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
				this.getFootGames()
				this.cur_index = index
				if(index == 1){
					this.only_bifen = true
				}else{
					this.only_bifen = false
				}
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
