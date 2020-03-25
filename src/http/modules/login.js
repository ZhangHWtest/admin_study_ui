import { reques } from "../axios";

/*
 * 系统登录模块
 */

// 登录
export const login = data => {
  return reques({
    url: "http://10.20.19.38:10080/user/login",
    method: "post",
    data
  });
};

// 登出
export const logout = () => {
  return reques({
    url: "http://10.20.19.38:10080/user/logout",
    method: "get"
  });
};
