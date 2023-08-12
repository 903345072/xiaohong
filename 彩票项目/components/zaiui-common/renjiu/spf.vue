<template>
	<view>
		<view   class="game_time"  >
			<text :style="{'width':box_width+'rpx','height':box_height+'rpx'}" @click="checked('3')" :class="['item',{'checked':this.check_item['3']['checked'] == true}]">胜
			 
			  
			</text>
			<text :style="{'width':box_width+'rpx','height':box_height+'rpx'}" @click="checked('1')" :class="['item',{'checked':this.check_item['1']['checked'] == true}]">平</text>
		    <text :style="{'width':box_width+'rpx','height':box_height+'rpx'}" @click="checked('0')" :class="['item',{'checked':this.check_item['0']['checked'] == true}]">负</text>
		</view>
		
		
		
	</view>
</template>

<script>
	
	export default{
		name:"gameTime",
		data(){
			
			return {
		
		
			}
		},
		props:{
			CheckedGame:null,
			gameType:{
				type:String,
				default:'0'
			},
			pl:{
				type:String,
				default:'1.7'
			},
		    gameNum:{
		    	type:String,
		    	default:'0'
		    },
			gameId:{
				type:String,
				default:'1'
			},
			state:{
				type:String,
				default:"1,1,1,1,1"
			},
			p_single:{
				type:String,
				default:"0,0,0,0,0"
			},
			dire_sub:{
				type:Boolean,
				default:true
			},
			box_width:null,
			box_height:null,
			check_item:null
		},
		mounted() {
			
		},
		methods:{
			checkSingle(){
			return	this.p_single.split(",")[0] == 1;
			},
			checkIf(){
				var arr = this.state.split(",")
				
				if(arr[0] == 1){
					return true;
				}
				return false;
				
			},
			checked(v){
			
		 
			
			    this.check_item[v]["checked"] = !this.check_item[v]["checked"]
			
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
			    data["flag"] = 'spfmain'
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
