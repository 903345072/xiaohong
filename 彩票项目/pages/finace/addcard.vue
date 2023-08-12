<template>
	<view>
		<bar-title bgColor="bg-white" isBack >
			<block slot="content">添加银行卡</block>
		</bar-title>
		<view class="cu-form-view margin-top-lg">
			<input v-model="name" placeholder="请输入真实姓名"/>
		</view>
		<view class="cu-form-view">
			<input v-model="id_card" placeholder="请输入身份证号"/>
		</view>
		<view class="cu-form-view">
			<input v-model="bank_card" placeholder="请输入银行卡号"/>
		</view>
		<view class="cu-form-view">
			<input v-model="phone" placeholder="请输入手机号"/>
		</view>
		
		<view class="cu-form-view">
			<input v-model="bank_name" placeholder="请输入银行名称(中国银行-某某分行)"/>
		</view>
		
		<view style="text-align: center;">
			<button @click="getSignUrl()" style="color: white;background: orange;width: 90%;height: 70rpx;line-height: 70rpx;font-size: 32rpx;margin-top: 30rpx;">保存银行卡信息</button>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	export default{
		name:"kuaijie",
		components:{barTitle},
		data(){
			return {
				price:"",
				cardList:[],
				name:"",
				id_card:"",
				bank_card:"",
				phone:"",
				bank_name:""
			}
		},
		onLoad(option) {
			
		},
		methods:{
			getSignUrl(){
				var d = {"name":this.name,"id_card":this.id_card,"bank_card":this.bank_card,"phone":this.phone,"bank_name":this.bank_name}
				this.$api.getSignUrl(d).then(res=>{
					window.location.href = res.data
				})
			}
		}
	}
</script>

<style lang="scss">
	/* #ifdef APP-PLUS */
		@import "../../static/colorui/main.css";
		@import "../../static/colorui/icon.css";
		@import "../../static/zaiui/style/app.scss";
	/* #endif */
	page { background: #FFFFFF; }
	.zaiui-title-view {
	    position: relative;
	    padding: 18.18rpx;
	}
	.zaiui-content-view {
		position: relative;
		padding: 0 18.18rpx;
	}
	.cu-form-view {
		position: relative;
		margin: 0 27.27rpx;
		padding: 18.18rpx 0;
		border-bottom: 2rpx solid rgba(0,0,0,0.1);
		input {
			
		}
	}
	.cu-form-view.margin-top-lg {
		margin-top: 40rpx;
	}
	.zaiui-btn-view {
	    position: fixed;
	    width: 100%;
		bottom: 0;
		.flex {
			padding: 18.18rpx;
		}
	}
</style>