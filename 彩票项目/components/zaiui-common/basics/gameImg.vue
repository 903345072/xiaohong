<template>
	<view>
		<view>
			<image :style="{'width':width+'rpx','height':height+'rpx'}"   v-if="type == 'foot'" src="../../../static/images/index/jczq.png"></image>
			<image :style="{'width':width+'rpx','height':height+'rpx'}" class="img" v-if="type == 'basket'" src="../../../static/images/index/jclq.png">
			</image>
			<image :style="{'width':width+'rpx','height':height+'rpx'}" class="img" v-if="type == 'bd'" src="../../../static/images/index/bjdc.png">
			</image>
			<image :style="{'width':width+'rpx','height':height+'rpx'}" class="img" v-if="type == 'pl3'" src="../../../static/images/index/pl3.png">
			</image>
			<image :style="{'width':width+'rpx','height':height+'rpx'}" class="img" v-if="type == 'renjiu' || type=='sfc'" src="../../../static/images/index/renjiu.png">
			</image>
			<image :style="{'width':width+'rpx','height':height+'rpx'}" class="img" v-if="type == 'gj' || type=='gyj'" src="../../../static/images/index/pcjcmc.png">
			</image>
		</view>
	</view>
</template>

<script>
	export default{
		name:"gameImg",
		props:{
			width:null,
			height:null,
			type:null
		}
	}
</script>

<style>
	
</style>
