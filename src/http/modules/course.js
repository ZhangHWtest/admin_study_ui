import axios from '../axios'
/*
 * ZA学生列表
 */

export const findYesterDayList = () => {
  return axios({
    url: '/api/yesterday_lesson',
    method: 'get'
  })
}

export const findToDayList = () => {
  return axios({
    url: '/api/today_lesson',
    method: 'get'
  })
}
