<template>
	<view>
		<bar-title bgColor='bg-white' >
			<block slot="content">统计</block>
		</bar-title>
		<view style="display: flex;align-items: center;margin: 30rpx 30rpx;">
			<view v-if="TabCur==0" style="flex: 2;">加款总计: <text style="color: red;font-size: 32rpx;">{{add}}</text></view>
			<view v-if="TabCur==1" style="flex: 2;">扣款总计: <text style="color: red;font-size: 32rpx;">{{sub}}</text></view>
			<view style="flex: 3;" class="example-body">
					<uni-datetime-picker v-model="range" @change="change($event)" type="datetimerange" @maskClick="maskClick" />
			</view>
		</view>
		
		<wuc-tab :textFlex="true" :tab-list="tabList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
		
		<swiper  :current="TabCur" duration="300" @change="swiperChange" style="height: 100vh;margin-top: 10rpx;">
		  <swiper-item >
		      <addList @updateRange = "updateRange"   @updateCount="updateCount" ref=0 v-if="TabCur == 0" :range="range"    ></addList>
		  </swiper-item>
		
		  <swiper-item >
		       <subList @updateRange = "updateRange" @updateBetAmount="updateBetAmount" ref=1 v-if="TabCur == 1" :range="range"  ></subList>
		  </swiper-item>
		</swiper>
	</view>
	
</template>

<script>
	import barTitle from '@/components/zaiui-common/basics/bar-title';
	import addList from '@/components/zaiui-common/user/addList';
	import subList from '@/components/zaiui-common/user/subList';
	export default{
		name:"systemRecord",
		components:{
			barTitle,addList,subList
		},
		onLoad(option) {
			this.TabCur = parseInt(option.id)
		},
		data(){
			return {
				add:0,
				sub:0,
				tabList: [
				{ name: '加款' }, 
				{ name: '扣款'},
				],
				TabCur: 0,
				range:[],
				maskClick:false
			}
		},
		
		methods:{
			
			swiperChange(e) {
					    let { current } = e.target;
					    this.TabCur = current;
			 },
			change(e){
			this.range = e
			this.$refs[this.TabCur].getList(e)
				},
			updateCount(e){
				this.add = e
			},
			updateBetAmount(e){
				this.sub = e
			},
			updateRange(e){
				this.range = e
			}
		},
		
		
	}
</script>

<style>
</style>
