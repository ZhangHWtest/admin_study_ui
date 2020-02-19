export default {
  // method: 'get',
  // baseURL: process.env.VUE_APP_URL,
  headers: {
    'Content-Type': 'application/json;charset=UTF-8'
  },
  data: {},
  timeout: 10000,
  // 携带凭证
  withCredentials: true,
  responseType: 'json'
}
