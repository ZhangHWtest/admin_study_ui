import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
import './assets/css/global.css'
import axios from 'axios'
import '@/assets/icon/iconfont.css'
import api from './http'

Vue.use(api)
Vue.config.productionTip = false
axios.defaults.baseURL = process.env.VUE_APP_URL

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
