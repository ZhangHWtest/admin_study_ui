import axios from '../axios'

/*
 * 菜单列表
 */

// 获取所有菜单
export const findNavTree = params => {
  return axios({
    url: 'http://10.20.19.38:9090/menu/getmenu',
    method: 'get',
    params
  })
}
