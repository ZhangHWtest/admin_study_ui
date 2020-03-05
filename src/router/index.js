import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Index from '../components/Index.vue'
import Users from '../components/user/User.vue'
import Role from '../components/role/Role.vue'
import Demo from '../components/demo/demo.vue'
import Limits from '../components/limits/Limits.vue'
import MonitorChart from '../components/monitor/MonitorChart.vue'
import MonitorList from '../components/monitor/MonitorList.vue'
import TodayList from '../components/courseinfo/TodayList.vue'
import YesterdayList from '../components/courseinfo/YesterdayList.vue'
import StudentList from '../components/student/StudentList.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  {
    path: '/home',
    component: Home,
    redirect: '/index',
    children: [
      { path: '/index', component: Index },
      { path: '/user/list', component: Users },
      { path: '/user/role', component: Role },
      { path: '/user/dept', component: Demo },
      { path: '/user/limits', component: Limits },
      { path: '/courseinfo/todaylist', component: TodayList },
      { path: '/courseinfo/yesterdaylist', component: YesterdayList },
      { path: '/monitor/chart', component: MonitorChart },
      { path: '/monitor/list', component: MonitorList },
      { path: '/student/list', component: StudentList }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
// 挂在路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径， from 代表从哪个路径跳转来的， next是一个函数， 表示放行
  // next()  放行， next('/login')强制跳转
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
