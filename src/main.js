import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import './assets/css/global.css'
import '@/styles/index.css'
import '@/assets/icon/iconfont.css'
import api from './http'
import moment from 'moment'
// import store from './store'

Vue.use(api)
Vue.prototype.$moment = moment
Vue.config.productionTip = false

new Vue({
  router,
  //store,
  render: h => h(App)
}).$mount('#app')
