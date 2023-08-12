<template>
	<view>
		<!--标题栏-->
		<bar-title bgColor="bg-white" isBack>
			<block slot="content">实人认证</block>
		</bar-title>
		
		<!--标题-->
		<view class="text-black text-xl zaiui-title-view">为提升交易可靠性，请进行实人认证</view>
		
		
		
		<!--表单-->
		<view class="cu-form-view margin-top-lg">
			<input v-model="name" placeholder="请输入真实姓名"/>
		</view>
		<view class="cu-form-view">
			<input v-model="card" placeholder="请输入18位身份证号"/>
		</view>
		
		<!--按钮-->
		<view class="bg-white zaiui-btn-view zaiui-foot-padding-bottom">
			<view class="flex flex-direction">
				<button v-if="is_sm == false" class="cu-btn bg-red" @click="verify()">开始验证</button>
				<button v-if="is_sm == true" class="cu-btn bg-red" disabled>已通过实名</button>
			</view>
		</view>
		
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import _tool from '@/static/zaiui/util/tools.js';	//工具函数
	export default {
		components: {
			barTitle
		},
		data() {
			return {
				name:"",
				card:"",
				is_sm:false
			}
		},
		onLoad() {
			this.getInfo()
		},
		
		onReady() {
			_tool.setBarColor(true);
			uni.pageScrollTo({
			    scrollTop: 0,
			    duration: 0
			});
		},
		methods: {
			getInfo(){
				var that = this
				this.$api.getRealAuthentication().then(res=>{
					if(res.data != null){
						that.name = res.data.real_name
						that.card = res.data.id_card
						that.is_sm = true
					}else{
						that.is_sm = false
					}
					
					
				})
			},
			verify(){
				var data = {"name":this.name,"card":this.card}
				this.$api.RealNameAuthentication(data).then(res=>{
					this.getInfo()
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
