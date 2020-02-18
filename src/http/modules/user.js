import axios from '../axios'

/*
 * 用户管理模块
 */

// 分页查询
export const findPage = (params) => {
  return axios({ url: '/user/find', method: 'get', params })
}
