import Vue from 'vue'
import App from './App'
import api from '@/api'
import dashen from '@/api/dashen.js'
import tool from '@/tool/tool'

Vue.config.productionTip = false
Vue.prototype.$api = api
Vue.prototype.$dashen = dashen

Vue.prototype.$msg = tool.msg
Vue.prototype.global = global
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()


