<template>
	<view >
		<footdetail  v-if="orderdetail.type=='foot'"  :orderdetail="orderdetail"></footdetail>
		<basketdetail v-if="orderdetail.type=='basket'"  :orderdetail="orderdetail"></basketdetail>
	</view>
</template>

<script>
	import footdetail from '@/components/zaiui-common/basics/footdetail';
	import basketdetail from '@/components/zaiui-common/basics/basketdetail';
	export default{
		name:"commonDetail",
		components:{
			footdetail,basketdetail
		},
		props:{
		
			orderdetail:{
				type:Object,
				default:""
			}
		}
	}
</script>

<style>
</style>
