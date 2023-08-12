import http from './interface'
const apiList = {
	
	getDashenList:(data)=> {
		return http.request({
			url: 'DaShen/getDashenList',
			method: 'GET',
			data
		})
	},
	
	getPageList:(data)=> {
		return http.request({
			url: 'DaShen/getPageList',
			method: 'GET',
			data
		})
	},
	getOrderDetail:(data)=> {
		return http.request({
			url: 'DaShen/getOrderDetail',
			method: 'GET',
			data
		})
	},
	getFlowRecord:(data)=> {
		return http.request({
			url: 'DaShen/getFlowRecord',
			method: 'GET',
			data
		})
	},
	guanzhu:(data)=> {
		return http.request({
			url: 'DaShen/guanzhu',
			method: 'GET',
			data
		})
	},
	getHomePage:(data)=> {
		return http.request({
			url: 'DaShen/getHomePage',
			method: 'GET',
			data
		})
	}
}
export default apiList