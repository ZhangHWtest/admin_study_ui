import { requestTwo } from "../axios";

/*
 * 学生列表
 */

export const findStudentList = data => {
  return requestTwo({
    url: "/zt/mobile",
    method: "post",
    data
  });
};
