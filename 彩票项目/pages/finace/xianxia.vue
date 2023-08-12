<template>
	<view>
		<bar-title bgColor="bg-white" isBack >
			<block slot="content">线下支付</block>
		    
		</bar-title>
		<view style="line-height: 80rpx;margin: 10rpx 30rpx;">
			
			 <view>
				 <text>支付金额</text>
				 <text style="color: red;margin-left: 60rpx;font-size: 40rpx;">{{money}}元</text>
			 </view>
		     <view style="display: flex;align-items: center;">
				 <text>收款二维码</text>
				 <view  style="margin-left: 100rpx;" @tap="previews(getSrc())">
					 <image style="width: 300rpx;height: 300rpx;" :src="getSrc()"></image>
				 </view>
			 </view>
			 
			 <view style="background-color: #e8edee;box-shadow: 10px 0px 5px 0px rgba(0,0,0,0.2);padding: 10rpx 20rpx;border-radius: 30rpx;">
				 <view style="display: flex;align-items: center;">
				 				 <text>开户行</text>
				 				 <view style="margin-left: 100rpx;">
				 					 {{bank_name}}
				 				 </view>
				 </view>
				 <view style="display: flex;align-items: center;">
				 				 <text style="white-space: nowrap;">卡号</text>
				 				 <view style="margin-left: 100rpx;white-space: nowrap;">
				 					 {{bank_card}}
				 				 </view>
				 							 <button @click="copyqq()" style="margin-left: 50rpx;font-size: 25rpx;white-space: nowrap;">复制卡号</button>
				 </view>
				 
				 <view style="display: flex;align-items: center;">
				 				 <text>持卡人</text>
				 				 <view style="margin-left: 100rpx;">
				 					 {{bank_user}}
				 				 </view>
				 </view>
			 </view>
			 <view style="display: flex;">
				 <text style="margin-right: 50rpx;">支付方式</text>
				 <radio-group class="block" @change="RadioChange">
					 <view style="display: flex;">
						 <view class="action">
						 	<radio class="red zaiui-radio" :class="radio=='alixianxia'?'checked':''" :checked="radio=='alixianxia'?true:false" value="alixianxia"/>
						 						支付宝
						 </view>
						 <view class="action" style="margin-left: 20rpx;">
						 	<radio class="red zaiui-radio" :class="radio=='yhk'?'checked':''" :checked="radio=='yhk'?true:false" value="yhk"/>
						 						银行卡
						 </view>
					 </view>
				 </radio-group>	 
			 </view>
			
			 <button @click="goKeFu()" style="width: 100%;text-align: center;color: red;padding: 10rpx 10rpx;margin-top: 20rpx;background: yellow;color: black;">
				 已完成支付
			 </button>
			 <view>
			 	充值提示:扫码支付每天上午11:00-凌晨03:00实时到账	 
			 </view>
			 <view style="display: flex;">
				 <text>操作方法:    </text>
				 <text style="color: red;">点击图片->截图保存到相册->打开支付宝扫一扫</text>
			 </view>
			 <view style="color: blue;">支付成功后返回当前页面提交申请，方可到账。注:务必提交实际支付金额否则不能到账</view>
		</view>
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import config from "@/api/interface.js"
	export default {
		name: "recharge",
		components: {
			barTitle
		},
		data() {
			return {
				cur_index: 6,
				money: 0,
				value: "",
				money_arr: [11, 52, 101, 202, 501, 1001],
				checkAll: true,
				radio: 'alixianxia',
				bank_card:"",
				bank_name:"",
				bank_user:"",
				ewm:"",
				kefuurl:"",
				timer:''
			}
		},
		onLoad(option) {
			this.money = option.price
			this.$api.getxianxia({}).then(res=>{
				this.bank_card = res.data.bank_card
				this.bank_name = res.data.bank_name
				this.bank_user = res.data.bank_user
				this.ewm = res.data.ewm
				this.kefuurl = res.data.kefuurl
			})
		},
		methods: {
			
			previews(data){
				var list = []
				list.push(data)
				
				uni.previewImage({
					current:0,
					urls:list,
					loop:true
				})
			},
			
			touchEnd() {
			      //手指离开
			      clearTimeout(this.timer);
			    },
			    touchStart() {
			      //手指触摸
			      clearTimeout(this.timer); //再次清空定时器，防止重复注册定时器
			      this.timer = setTimeout(() => {
			        this.downloadIamge(this.qrcodeUrl64, "pic");
			      }, 1000);
			    },
			    downloadIamge(imgsrc, name) {
			      //下载图片地址和图片名
			      let image = new Image();
			      // 解决跨域 Canvas 污染问题
			      image.setAttribute("crossOrigin", "anonymous");
			      image.onload = () => {
			        let canvas = document.createElement("canvas");
			        canvas.width = image.width;
			        canvas.height = image.height;
			        let context = canvas.getContext("2d");
			        context.drawImage(image, 0, 0, image.width, image.height);
			        let url = canvas.toDataURL("image/png"); //得到图片的base64编码数据
			        let a = document.createElement("a"); // 生成一个a元素
			        let event = new MouseEvent("click"); // 创建一个单击事件
			        a.download = name || "photo"; // 设置图片名称
			        a.href = url; // 将生成的URL设置为a.href属性
			        a.dispatchEvent(event); // 触发a的单击事件
			      };
			      image.src = imgsrc;
			    },
			
			goKeFu(){
				this.$api.doXianXiaRecharge({"money":this.money,"recharge_type":this.radio}).then(res=>{
					uni.showToast({
						title:'支付成功',
						
						success: (res) => {
							setTimeout(function() {
								uni.navigateBack({
									
								})
							}, 1000);
						}
					})
				})
			},
			copyqq(){
				uni.setClipboardData({
									data: this.bank_card,
									success: function() {
										uni.showToast({
											title:'复制成功'
										})
									}
								})
			},
			getSrc(){
				return config.config.url+this.ewm
			},
			goWithdraw(){
				uni.navigateTo({
					url:"/pages/finace/withdraw"
				})
			},
			goBill(){
				uni.navigateTo({
					url:"/pages/finace/bill?uid="+""
				})
			},
			doRecharge() {
				var data = {
					"type": this.radio,
					"price": this.value
				}
				if (!this.value) {
					uni.showToast({
						title: "请选择充值金额",
						icon: "erro"
					})
					return false
				}
				console.log(this.radio)
				return
				this.$api.doRecharge(data).then(res => {
					window.location.href = res.data;
				})
			},
			input(e) {
				this.value = e.detail.value
			},
			change(index) {
				this.cur_index = index
				this.value = this.money_arr[index]
			},
			RadioChange(e) {
				this.radio = e.detail.value;
			},
			payBtnTap() {
				uni.navigateTo({
					url: "/pages/status/pay_status"
				});
			},
			payTap(type) {
				this.radio = type;
			}
		}
	}
</script>

<style lang="scss">
	.dd {
		display: inline-block;
		color: black;
		padding: 20rpx 0;
		border: 1px solid #EEEEEE;
		border-radius: 20rpx;
		width: 23%;
		text-align: center;
		margin: 20rpx 30rpx;
		font-weight: bold;
	}

	.active {
		color: #007AFF;
		border: 1px solid #007AFF;
	}

	@import "../../static/zaiui/style/pay.scss";
</style>
