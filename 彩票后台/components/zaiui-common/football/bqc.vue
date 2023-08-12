<template>
	<view >
		<view v-if="checkIf()"  class="game_time"  >
			<view :style="{'height':box_height+'rpx','border-top':'1px solid #EEEEEE','line-height':box_height+'rpx'}" @click="checked('5-1',pl.split(',')[0])" :class="['item',{'checked':this.check_item['5-1']['checked'] == true}]">
					  
						{{"胜-胜 "+pl.split(',')[0]}}
			</view>
			<view :style="{'height':box_height+'rpx','border-top':'1px solid #EEEEEE','line-height':box_height+'rpx'}" @click="checked('5-2',pl.split(',')[1])" :class="['item',{'checked':this.check_item['5-2']['checked'] == true}]">
					
						<view>{{"胜-平 "+pl.split(',')[1]}}</view>
			</view>
			<view :style="{'height':box_height+'rpx','border-top':'1px solid #EEEEEE','line-height':box_height+'rpx'}" @click="checked('5-3',pl.split(',')[2])" :class="['item',{'checked':this.check_item['5-3']['checked'] == true}]">
		
				<view>{{"胜-负 "+pl.split(',')[2]}}</view>
			</view>
			<view :style="{'height':box_height+'rpx','line-height':box_height+'rpx'}" @click="checked('5-4',pl.split(',')[3])" :class="['item',{'checked':this.check_item['5-4']['checked'] == true}]">
		
				<view>{{"平-胜 "+pl.split(',')[3]}}</view>
			</view>
			<view :style="{'height':box_height+'rpx','line-height':box_height+'rpx'}" @click="checked('5-5',pl.split(',')[4])" :class="['item',{'checked':this.check_item['5-5']['checked'] == true}]">
			
				<view>{{"平-平 "+pl.split(',')[4]}}</view>
			</view>
			<view :style="{'height':box_height+'rpx','line-height':box_height+'rpx'}" @click="checked('5-6',pl.split(',')[5])" :class="['item',{'checked':this.check_item['5-6']['checked'] == true}]">
			
				<view>{{"平-负 "+pl.split(',')[5]}}</view>
			</view>
			<view :style="{'height':box_height+'rpx','line-height':box_height+'rpx'}" @click="checked('5-7',pl.split(',')[6])" :class="['item',{'checked':this.check_item['5-7']['checked'] == true}]">
			
				<view>{{"负-胜 "+pl.split(',')[6]}}</view>
			</view>
			<view :style="{'height':box_height+'rpx','line-height':box_height+'rpx'}" @click="checked('5-8',pl.split(',')[7])" :class="['item',{'checked':this.check_item['5-8']['checked'] == true}]">
				
				<view>{{"负-平 "+pl.split(',')[7]}}</view>
			</view>
			<view :style="{'height':box_height+'rpx','line-height':box_height+'rpx'}" @click="checked('5-9',pl.split(',')[8])" :class="['item',{'checked':this.check_item['5-9']['checked'] == true}]">
			
				<view>{{"胜-负 "+pl.split(',')[8]}}</view>
			</view>
			
		</view>
		
		<view v-else :style="{'background-color':'#cccccc','border-bottom':'1px solid #EEEEEE','height':box_height*3+'rpx','line-height':box_height*3+'rpx','text-align':'center','width':'100%'}">
			未开售
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
				default:"1,1,1,1,1"
			},
			p_single:{
				type:String,
				default:"0,0,0,0,0"
			},
			box_width:null,
			box_height:null,
			check_item:null
		},
		mounted() {
			
		},
		methods:{
			checkSingle(){
			return	this.p_single.split(',')[4] == 1;
			},
			checkIf(){
				var arr = this.state.split(',')
				
				if(arr[4] == 1){
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
				this.$emit("updateCheckItem",data)
				this.$forceUpdate();
			 
	
			}
		}
		
	}
</script>

<style>
	
	.item{
		position: relative;
		font-weight: bold;
	
		border-bottom: 1rpx solid #EEEEEE;
		border-right: 1rpx solid #EEEEEE;
		font-size: 25rpx;
		display: inline-block;
		text-align: center;
	width: 33%;
		
		
	}
	.checked{
		color: white;
		background-color: red;
		
	}
</style>
