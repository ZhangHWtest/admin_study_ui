import { reques } from '../axios'

/*
 * 菜单列表
 */

// 获取所有菜单
export const monitorList = data => {
  return reques({
    url: 'http://10.20.19.38:10081/monitor/list',
    method: 'post',
    data
  })
}

// 新增单个api
export const saveSingle = data => {
  return reques({
    url: 'http://10.20.19.38:10081/monitor/saveSingle',
    method: 'post',
    data
  })
}

// 获取所有群组
export const getMonitorGroupsApi = () => {
  return reques({
    url: 'http://10.20.19.38:10081/monitor/getgroups',
    method: 'get'
  })
}

// 修改监控状态
export const enableMonitorApi = params => {
  return reques({
    url: 'http://10.20.19.38:10081/monitor/enabled',
    method: 'get',
    params
  })
}
