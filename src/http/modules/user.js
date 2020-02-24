import axios from '../axios'

/*
 * 用户管理模块
 */

// 修改密码
export const updatepassword = data => {
  return axios({
    url: '/user/updatepassword',
    method: 'post',
    data
  })
}

// 分页查询
export const findPage = params => {
  return axios({ url: '/user/find', method: 'get', params })
}

// 新增用户
export const create = data => {
  return axios({
    url: '/user/create',
    method: 'post',
    data
  })
}

// 根据id查询，展示编辑用户的对话框
export const getuserbyid = id => {
  return axios({ url: '/user/getuserbyid/' + id, method: 'get' })
}

// 修改用户
export const update = data => {
  return axios({
    url: '/user/update',
    method: 'post',
    data
  })
}

// 删除用户
export const deleteuser = id => {
  return axios({
    url: '/user/deleteuser/' + id,
    method: 'delete'
  })
}
