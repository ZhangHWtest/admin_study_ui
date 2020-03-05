import { reques } from '../axios'

/*
 * 用户管理模块
 */

// 修改密码
export const updatepassword = data => {
  return reques({
    url: 'http://10.20.19.38:10080/user/updatepassword',
    method: 'post',
    data
  })
}

// 分页查询
export const findPage = data => {
  return reques({
    url: 'http://10.20.19.38:10080/user/find',
    method: 'post',
    data
  })
}

// 新增用户
export const create = data => {
  return reques({
    url: 'http://10.20.19.38:10080/user/create',
    method: 'post',
    data
  })
}

// 根据id查询，展示编辑用户的对话框
export const getuserbyid = id => {
  return reques({
    url: 'http://10.20.19.38:10080/user/getuserbyid/' + id,
    method: 'get'
  })
}

// 修改用户
export const update = data => {
  return reques({
    url: 'http://10.20.19.38:10080/user/update',
    method: 'post',
    data
  })
}

// 删除用户
export const deleteuser = id => {
  return reques({
    url: 'http://10.20.19.38:10080/user/deleteuser/' + id,
    method: 'delete'
  })
}
