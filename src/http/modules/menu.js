import { reques } from '../axios'

/*
 * 菜单列表
 */

// 获取所有菜单
export const findNavTree = params => {
  return reques({
    url: 'http://10.20.19.38:10080/menu/getmenu',
    method: 'post',
    params
  })
}
