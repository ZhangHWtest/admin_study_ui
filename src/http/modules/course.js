import { reques } from '../axios'
/*
 * ZA学生列表
 */

export const findYesterDayList = data => {
  return reques({
    url: '/za/yesterday_lesson',
    method: 'post',
    data
  })
}

export const findToDayList = data => {
  return reques({
    url: '/za/today_lesson',
    method: 'post',
    data
  })
}
