<template>
	<view>
		<view class="game_time" >
			
			<text style="font-weight: bold;">场次{{num}}</text>
			<text >{{ls_name}}</text>
			<text style="color: grey;">{{stoptime}}</text>
		</view>
	</view>
</template>

<script>
	export default{
		name:"gameTime",
		props:{
			game_id:null,
			num:{
				type:String,
				default:'场次1'
			},
			ls_name:{
				type:String,
				default:'英超'
			},
			stoptime:{
				type:String,
				default:'截止21:50'
			},
			g_type:{
				type:String,
				default:'4'
			},
			p_single:{
				type:String,
				default:'0,0,0,0,0'
			}
		},
		methods:{
		
		
		}
	}
</script>

<style>
	.game_time > text{
		font-size: 25rpx;
		
	}
	.game_time{
	
		display: flex;flex-direction: column;justify-content: center;align-items: center;line-height: 40rpx;
	}
</style>
