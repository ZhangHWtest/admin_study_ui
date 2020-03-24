import { reques } from '../axios'

/*
 * 菜单列表
 */

// 获取所有群组
export const getMonitorGroupsApi = () => {
  return reques({
    url: 'http://10.20.19.38:10081/monitor/getSystem',
    method: 'get'
  })
}

// 新增单个api
export const saveSingle = data => {
  return reques({
    url: 'http://10.20.19.38:10081/monitor/addSingleMonitor',
    method: 'post',
    data
  })
}

// 获取所有监控
export const monitorList = data => {
  return reques({
    url: 'http://10.20.19.38:10081/monitor/getMonitorList',
    method: 'post',
    data
  })
}

// 修改监控状态
export const enableMonitorApi = params => {
  return reques({
    url: 'http://10.20.19.38:10081/monitor/enabledMonitor',
    method: 'get',
    params
  })
}
