import axios from '../axios'

/*
 * 用户管理模块
 */

// 修改密码
export const updatepassword = data => {
  return axios({
    url: 'http://10.20.19.38:9090/user/updatepassword',
    method: 'post',
    data
  })
}

// 分页查询
export const findPage = data => {
  return axios({
    url: 'http://10.20.19.38:9090/user/find',
    method: 'post',
    data
  })
}

// 新增用户
export const create = data => {
  return axios({
    url: 'http://10.20.19.38:9090/user/create',
    method: 'post',
    data
  })
}

// 根据id查询，展示编辑用户的对话框
export const getuserbyid = id => {
  return axios({
    url: 'http://10.20.19.38:9090/user/getuserbyid/' + id,
    method: 'get'
  })
}

// 修改用户
export const update = data => {
  return axios({
    url: 'http://10.20.19.38:9090/user/update',
    method: 'post',
    data
  })
}

// 删除用户
export const deleteuser = id => {
  return axios({
    url: 'http://10.20.19.38:9090/user/deleteuser/' + id,
    method: 'delete'
  })
}
