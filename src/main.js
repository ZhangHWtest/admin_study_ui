import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import '@/assets/icon/iconfont.css'
import api from './http'

Vue.use(api)
// Vue.prototype.$http = axios
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.VUE_APP_URL
// // 配置请求拦截器，每次请求添加token,保证用户拥有获取数据权限
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = window.sessionStorage.getItem('token')
//   // 固定写法，必须return config
//   return config
// })

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
