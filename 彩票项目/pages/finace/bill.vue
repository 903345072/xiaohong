<template>
	<view>
		<bar-title bgColor='bg-white' >
			<block slot="content">账户明细</block>
		</bar-title>
		<view class="example-body" style="position: fixed;width: 100%;z-index: 99999;">
					<uni-datetime-picker  v-model="range" @change="change($event)" type="datetimerange" @maskClick="maskClick" />
		</view>
		
			<meTabs v-model="TabCur" :tabs="tabList" :fixed="true" :tab-width="130" style="margin-top: 185rpx;"></meTabs>
			
			<swiper :style="{height: height}" :current="TabCur" @change="swiperChange" >
				<swiper-item v-for="(tab,i) in tabList" :key="i">
					<mescrollItem  :range="range" @updateTotal="updateTotal" :uid="uid" ref="mescrollItem" :i="i" :index="TabCur" :tabs="tabList"></mescrollItem>
				</swiper-item>
			</swiper>
	
		
		<!-- <wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
		<swiper :current="TabCur" duration="300" @change="swiperChange" style="height: 100vh;">
		  <swiper-item v-for="(item,index) in tabList" :key="index">
		      <billList :ref="index" v-if="TabCur == index" :range="range" :uid="uid" :type="item.type" :name="item.name"></billList>
		  </swiper-item>
		</swiper> -->
	</view>
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import billList from '@/components/zaiui-common/user/billList';
	import WucTab from '@/components/wuc-tab/wuc-tab.vue';
	import meTabs from '@/components/mescroll/me-tabs/me-tabs'
	import mescrollItem from '@/components/mescroll/mescroll-swiper-item'
	export default{
		name:"bill",
		components:{
			barTitle,billList,meTabs,mescrollItem
		},
		onLoad(option) {
			this.uid = option.uid
			this.height = uni.getSystemInfoSync().windowHeight + 'px'
		},
		
		data(){
			return {
				total:0,
				height: "400px",
				maskClick:false,
				range: [],
				single: "2021-04-3",
				date:"",
				uid:"",
				TabCur: 0,
				tabList: [
				{ name: '投注',type:"buy_lottery" }, 
				{ name: '充值',type:"recharge" },
				{ name: '系统',type:"system" },
				{ name: '奖金',type:"win_prize" },
				{ name: '佣金',type:"order_back_money" },
				{ name: '提现',type:"withdraw" }
				],
				data:[]
			}
		},
		methods:{
		change(e){
	      this.range = e
		
		 this.$refs.mescrollItem[0].getList(e,1)
		 this.$refs.mescrollItem[1].getList(e,1)
		 this.$refs.mescrollItem[2].getList(e,1)
		 this.$refs.mescrollItem[3].getList(e,1)
		 this.$refs.mescrollItem[4].getList(e,1)
		 this.$refs.mescrollItem[5].getList(e,1)
		},
		updateTotal(e){
			this.total = e
		},
			tabChange(index) {
			            this.TabCur = index;
			        },
			swiperChange(e) {
				let { current } = e.target;

				this.TabCur = current;
						
						
			    },
		}
		
	}
</script>

<style>
</style>
