<template>
	<orderdetails :orderdetail="detail"></orderdetails>
</template>

<script>
	import orderdetails from '@/components/zaiui-common/basics/orderdetail';
	
	export default{
		name:"orderdetail",
		components:{
			orderdetails
		},
		data(){
			return {
				detail:{}
			}
		},
		onLoad(option) {
			
			var data = JSON.parse(decodeURIComponent(option.str) ) 
		
			this.detail = data[0]
			this.detail["flag"] = 1
		}
	}
</script>

<style>
</style>
