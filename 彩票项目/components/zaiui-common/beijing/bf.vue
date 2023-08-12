<template>
	<view >
		<view v-if="checkIf()"  class="game_time" style="width: 100%;" >
			<view style="display: flex;">
				<view :style="{'background-color':'red','text-align':'center','line-height':box_height*2+'rpx','color':'white','font-size':'25rpx','padding':'0 2rpx'}">胜</view>
				<view style="width: 100%;height: 100%;">
					<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('5-1',pl.split(',')[0])" :class="['item',{'checked':this.check_item['5-1']['checked'] == true}]">
								<view>1:0</view>
								<view>{{pl.split(',')[0]}}</view>
					</view>
					
					<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('5-2',pl.split(',')[1])" :class="['item',{'checked':this.check_item['5-2']['checked'] == true}]">
						<view>2:0</view>
						<view>{{pl.split(',')[1]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('5-3',pl.split(',')[2])" :class="['item',{'checked':this.check_item['5-3']['checked'] == true}]">
						<view>2:1</view>
						<view>{{pl.split(',')[2]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx','border-top':'1px solid #EEEEEE'}" @click="checked('5-4',pl.split(',')[3])" :class="['item',{'checked':this.check_item['5-4']['checked'] == true}]">
						<view>3:0</view>
						<view>{{pl.split(',')[3]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-5',pl.split(',')[4])" :class="['item',{'checked':this.check_item['5-5']['checked'] == true}]">
						<view>3:1</view>
						<view>{{pl.split(',')[4]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-6',pl.split(',')[5])" :class="['item',{'checked':this.check_item['5-6']['checked'] == true}]">
						<view>3:2</view>
						<view>{{pl.split(',')[5]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-7',pl.split(',')[6])" :class="['item',{'checked':this.check_item['5-7']['checked'] == true}]">
						<view>4:0</view>
						<view>{{pl.split(',')[6]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-8',pl.split(',')[7])" :class="['item',{'checked':this.check_item['5-8']['checked'] == true}]">
						<view>4:1</view>
						<view>{{pl.split(',')[7]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-9',pl.split(',')[8])" :class="['item',{'checked':this.check_item['5-9']['checked'] == true}]">
						<view>4:2</view>
						<view>{{pl.split(',')[8]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-10',pl.split(',')[9])" :class="['item',{'checked':this.check_item['5-10']['checked'] == true}]">
						<view>胜其他</view>
						<view>{{pl.split(',')[9]}}</view>
					</view>
				
				</view>
			</view>
			
			<view style="display: flex;">
				<view :style="{'background-color':'#4182c3','text-align':'center','line-height':box_height*1+'rpx','color':'white','font-size':'25rpx','padding':'0 2rpx'}">平</view>
				<view style="width: 100%;">
					<view >
						<view :style="{'line-height':box_height/2+'rpx',}" @click="checked('5-11',pl2.split(',')[0])" :class="['item',{'checked':this.check_item['5-11']['checked'] == true}]">
									<view>0:0</view>
									<view>{{pl2.split(',')[0]}}</view>
						</view>
						
						<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-12',pl2.split(',')[1])" :class="['item',{'checked':this.check_item['5-12']['checked'] == true}]">
							<view>1:1</view>
							<view>{{pl2.split(',')[1]}}</view>
						</view>
						<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-13',pl2.split(',')[2])" :class="['item',{'checked':this.check_item['5-13']['checked'] == true}]">
							<view>2:2</view>
							<view>{{pl2.split(',')[2]}}</view>
						</view>
						<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-14',pl2.split(',')[3])" :class="['item',{'checked':this.check_item['5-14']['checked'] == true}]">
							<view>3:3</view>
							<view>{{pl2.split(',')[3]}}</view>
						</view>
						<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-15',pl2.split(',')[4])" :class="['item',{'checked':this.check_item['5-15']['checked'] == true}]">
							<view>平其他</view>
							<view>{{pl2.split(',')[4]}}</view>
						</view>
					</view>
				
				
				</view>
			</view>
			
			
			<view style="display: flex;">
				<view :style="{'background-color':'red','text-align':'center','line-height':box_height*2+3+'rpx','color':'white','font-size':'25rpx','padding':'0 2rpx'}">负</view>
				<view style="width: 100%;">
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-16',pl3.split(',')[0])" :class="['item',{'checked':this.check_item['5-16']['checked'] == true}]">
								<view>0:1</view>
								<view>{{pl3.split(',')[0]}}</view>
					</view>
					
				
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-17',pl3.split(',')[1])" :class="['item',{'checked':this.check_item['5-17']['checked'] == true}]">
						<view>0:2</view>
						<view>{{pl3.split(',')[1]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-18',pl3.split(',')[2])" :class="['item',{'checked':this.check_item['5-18']['checked'] == true}]">
						<view>0:3</view>
						<view>{{pl3.split(',')[2]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-19',pl3.split(',')[3])" :class="['item',{'checked':this.check_item['5-19']['checked'] == true}]">
						<view>0:4</view>
						<view>{{pl3.split(',')[3]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-20',pl3.split(',')[4])" :class="['item',{'checked':this.check_item['5-20']['checked'] == true}]">
						<view>1:2</view>
						<view>{{pl3.split(',')[4]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-21',pl3.split(',')[5])" :class="['item',{'checked':this.check_item['5-21']['checked'] == true}]">
						<view>1:3</view>
						<view>{{pl3.split(',')[5]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-22',pl3.split(',')[6])" :class="['item',{'checked':this.check_item['5-22']['checked'] == true}]">
						<view>1:4</view>
						<view>{{pl3.split(',')[6]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-23',pl3.split(',')[7])" :class="['item',{'checked':this.check_item['5-23']['checked'] == true}]">
						<view>2:3</view>
						<view>{{pl3.split(',')[7]}}</view>
					</view>
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-24',pl3.split(',')[8])" :class="['item',{'checked':this.check_item['5-24']['checked'] == true}]">
						<view>2:4</view>
						<view>{{pl3.split(',')[8]}}</view>
					</view>
				
					<view :style="{'line-height':box_height/2+'rpx'}" @click="checked('5-25',pl.split(',')[9])" :class="['item',{'checked':this.check_item['5-25']['checked'] == true}]">
						<view>负其他</view>
						<view>{{pl3.split(',')[9]}}</view>
					</view>
				</view>
			</view>
			
		</view>
		
		<view v-else :style="{'background-color':'#cccccc','border-bottom':'1px solid #EEEEEE','height':box_height*10+'rpx','line-height':box_height*10+'rpx','text-align':'center','width':'100%'}">
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
			pl2:{
				type:String,
				default:'1.7'
			},
			pl3:{
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
			return	this.p_single.split(',')[3] == 1;
			},
			checkIf(){
				var arr = this.state.split(',')
				
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
				this.$emit("updateCheckItem",data)
				this.$forceUpdate();
			 
	
			},
			confirm(){
				var data = {}
				data['game_id'] = this.gameId
				data["checkItem"] = this.check_item
			    data["flag"] = 'bf'
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
	   width: 20%;
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
