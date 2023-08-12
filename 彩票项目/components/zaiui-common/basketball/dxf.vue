<template>
	<view>
		<view v-if="checkIf()"  class="game_time"  >
			<text :style="{'width':box_width+'rpx','height':box_height+'rpx'}" @click="checked('3-1',pl.split(',')[0])" :class="['item',{'checked':this.check_item['3-1']['checked'] == true}]">
				<view style="display: flex;flex-direction: column;align-items: center;">
					<text>大分{{dxf | floatParse}}</text>
					<text>{{pl.split(",")[0]}}</text>
				</view>
			  <view  v-if="checkSingle()" style="position: absolute;left: 0;top: 0;   width: 0;
    height: 0;
    border-top: 50rpx solid red;
    border-right: 50rpx solid transparent;" >
	
	<view style="position: absolute;left: 2rpx;top: -50rpx;color: white;font-size: 23rpx;">
					  单
	</view>
			  </view>
			  
			</text>
		    <text :style="{'width':box_width+'rpx','height':box_height+'rpx'}" @click="checked('3-2',pl.split(',')[1])" :class="['item',{'checked':this.check_item['3-2']['checked'] == true}]"><view style="display: flex;flex-direction: column;align-items: center;">
					<text>小分{{dxf | floatParse}}</text>
					<text>{{pl.split(",")[1]}}</text>
				</view></text>
		</view>
		
		<view v-else :style="{'background-color':'#cccccc','border-bottom':'1px solid #EEEEEE','height':box_height+'rpx','line-height':box_height+'rpx','text-align':'center','width':box_width*2+'rpx'}">
			未开售
		</view>
		
	</view>
</template>

<script>
	
	export default{
		name:"gameTime",
		filters:{
			floatParse(item){
				return parseFloat(item)
			}
		},
		data(){
			
			return {
		
		
			}
		},
		props:{
			pl:{
				type:String,
				default:'1.7'
			},
		
			gameId:{
				type:String,
				default:'1'
			},
			state:{
				type:String,
				default:"1,1,1,1"
			},
			p_single:{
				type:String,
				default:"0,0,0,0"
			},
			dire_sub:{
				type:Boolean,
				default:true
			},
			dxf:null,
			box_width:null,
			box_height:null,
			check_item:null
		},
		mounted() {
			
		},
		methods:{
			checkSingle(){
			return	this.p_single.split(",")[3] == 1;
			},
			checkIf(){
				var arr = this.state.split(",")
				
				if(arr[3] == 1){
					return true;
				}
				return false;
				
			},
			checked(v,pl){
		
			    this.check_item[v]["checked"] = !this.check_item[v]["checked"]
				this.check_item[v]["pl"] = pl
				var data = {}
				data['game_id'] = this.gameId
				data["checkItem"] = this.check_item
				this.$forceUpdate();
				if(this.dire_sub){
					this.$emit("updateCheckItem",data)
					
				}
				
			},
			cancel(){
				// console.log(this.check_item)
				// for(let item in this.check_item){
					
				// 	this.check_item[item]["checked"] = false;
					
				// }
				
			},
			confirm(){
				var data = {}
				data['game_id'] = this.gameId
				data["checkItem"] = this.check_item
			    data["flag"] = 'dxfmain'
				this.$forceUpdate();
		       this.$emit("updateCheckItem",data)
				this.$emit("updateCheckItem1",data)
			},
			updateCheckItem(data){
				this.check_item = data
				this.$forceUpdate();
			}
		}
		
	}
</script>

<style>
	.game_time{
		display: flex;
	}
	.item{
		position: relative;
		font-weight: bold;
	
		border-bottom: 1px solid #EEEEEE;
		border-right: 1px solid #EEEEEE;
		font-size: 25rpx;
		display: flex;justify-content: center;align-items: center;
	}
	.checked{
		color: white;
		background-color: red;
		
	}
</style>
