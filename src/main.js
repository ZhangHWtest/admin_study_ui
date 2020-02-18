import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import '@/assets/icon/iconfont.css'

Vue.prototype.$http = axios
axios.defaults.baseURL = 'http://10.20.19.38:9090'
// 配置请求拦截器，每次请求添加token,保证用户拥有获取数据权限
axios.interceptors.request.use(config => {
  console.log(config)
  config.headers.Authorization = window.sessionStorage.getItem('token')
  // 固定写法，必须return config
  return config
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
