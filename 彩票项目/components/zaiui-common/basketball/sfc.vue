<template>
	<view >
		<view v-if="checkIf()"  class="game_time" style="width: 100%;" >
			<view style="display: flex;">
				<view :style="{'background-color':'#62bdee','text-align':'center','line-height':box_height*2+'rpx','color':'white','font-size':'25rpx','padding':'0 2rpx'}">
					客
				</view>
				<view style="width: 100%;height: 100%;">
					<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('4-1',pl1.split(',')[0])" :class="['item',{'checked':this.check_item['4-1']['checked'] == true}]">
								<view>客胜1~5</view>
								<view>{{pl1.split(',')[0]}}</view>
					</view>
					
					<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('4-2',pl1.split(',')[1])" :class="['item',{'checked':this.check_item['4-2']['checked'] == true}]">
						<view>客胜6~10</view>
						<view>{{pl1.split(',')[1]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('4-3',pl1.split(',')[2])" :class="['item',{'checked':this.check_item['4-3']['checked'] == true}]">
						<view>客胜11~15</view>
						<view>{{pl1.split(',')[2]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('4-4',pl1.split(',')[3])" :class="['item',{'checked':this.check_item['4-4']['checked'] == true}]">
						<view>客胜16~20</view>
						<view>{{pl1.split(',')[3]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('4-5',pl1.split(',')[4])" :class="['item',{'checked':this.check_item['4-5']['checked'] == true}]">
						<view>客胜21~25</view>
						<view>{{pl1.split(',')[4]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('4-6',pl1.split(',')[5])" :class="['item',{'checked':this.check_item['4-6']['checked'] == true}]">
						<view>客胜26+</view>
						<view>{{pl1.split(',')[5]}}</view>
					</view>
			
				</view>
			</view>
			
		<view style="display: flex;">
			<view :style="{'background-color':'red','text-align':'center','line-height':box_height*2+'rpx','color':'white','font-size':'25rpx','padding':'0 2rpx'}">主</view>
			<view style="width: 100%;height: 100%;">
				<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('4-7',pl2.split(',')[0])" :class="['item',{'checked':this.check_item['4-7']['checked'] == true}]">
							<view>主胜1~5</view>
							<view>{{pl2.split(',')[0]}}</view>
				</view>
				
				<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('4-8',pl2.split(',')[1])" :class="['item',{'checked':this.check_item['4-8']['checked'] == true}]">
					<view>主胜6~10</view>
					<view>{{pl2.split(',')[1]}}</view>
				</view>
				<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('4-9',pl2.split(',')[2])" :class="['item',{'checked':this.check_item['4-9']['checked'] == true}]">
					<view>主胜11~15</view>
					<view>{{pl2.split(',')[2]}}</view>
				</view>
				<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('4-10',pl2.split(',')[3])" :class="['item',{'checked':this.check_item['4-10']['checked'] == true}]">
					<view>主胜16~20</view>
					<view>{{pl2.split(',')[3]}}</view>
				</view>
				<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('4-11',pl2.split(',')[4])" :class="['item',{'checked':this.check_item['4-11']['checked'] == true}]">
					<view>主胜21~25</view>
					<view>{{pl2.split(',')[4]}}</view>
				</view>
				<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('4-12',pl2.split(',')[5])" :class="['item',{'checked':this.check_item['4-12']['checked'] == true}]">
					<view>主胜26+</view>
					<view>{{pl2.split(',')[5]}}</view>
				</view>
		
			</view>
		</view>
			
		</view>
		
		<view v-else :style="{'background-color':'#cccccc','border-bottom':'1px solid #EEEEEE','height':box_height*4+'rpx','line-height':box_height*4+'rpx','text-align':'center','width':'100%'}">
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
			pl1:{
				type:String,
				default:'1.7'
			},
			pl2:{
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
			box_width:null,
			box_height:null,
			check_item:null
		},
		mounted() {
			
		},
		methods:{
			checkSingle(){
			return	this.p_single.split(',')[2] == 1;
			},
			checkIf(){
				var arr = this.state.split(',')
				
				if(arr[2] == 1){
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
			 
	
			},
			confirm(){
				var data = {}
				data['game_id'] = this.gameId
				data["checkItem"] = this.check_item
			    data["flag"] = 'sfc'
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
	
	.item{
		position: relative;
		font-weight: bold;
	   width: 33%;
		border-bottom: 1rpx solid #EEEEEE;
		border-right: 1rpx solid #EEEEEE;
		font-size: 25rpx;
		display: inline-block;
		text-align: center;
		    box-sizing: border-box;
	}
	.checked{
		color: white;
		background-color: red;
		
	}
</style>
