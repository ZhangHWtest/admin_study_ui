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
