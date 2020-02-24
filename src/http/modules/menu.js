import axios from '../axios'

/*
 * 菜单列表
 */

// 获取所有菜单
export const findNavTree = params => {
  return axios({
    url: '/menu/getmenu',
    method: 'get',
    params
  })
}
