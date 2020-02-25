import axios from '../axios'

/*
 * 系统登录模块
 */

// 登录
export const login = data => {
  return axios({
    url: 'http://10.20.19.38:9090/user/login',
    method: 'post',
    data
  })
}

// 登出
export const logout = () => {
  return axios({
    url: 'http://10.20.19.38:9090/user/logout',
    method: 'get'
  })
}
