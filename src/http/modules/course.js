import axios from '../axios'
/*
 * ZA学生列表
 */

export const findYesterDayList = data => {
  return axios({
    url: '/api/yesterday_lesson',
    method: 'post',
    data
  })
}

export const findToDayList = data => {
  return axios({
    url: '/api/today_lesson',
    method: 'post',
    data
  })
}
