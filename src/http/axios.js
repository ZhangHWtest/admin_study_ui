import axios from "axios";
import Cookies from "js-cookie";
import router from "@/router";
import config from "./config";
/**
 * axios 拦截器设置
 */
export const reques = options => {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      // 需要对接其他人接口，所以这里不定义url
      //baseURL: config.baseUrl,
      headers: { "Content-Type": "application/json;charset=UTF-8" },
      timeout: config.timeout,
      withCredentials: config.withCredentials
    });
    // request 请求拦截器
    instance.interceptors.request.use(
      config => {
        let token = Cookies.get("token");
        //发送请求时携带token
        if (token) {
          config.headers.token = token;
        } else {
          // 重定向到登录页面
          router.push("/login");
        }
        return config;
      },
      error => {
        // 请求发生错误时
        console.log("request:", error);
        // 判断请求超时
        if (
          error.code === "ECONNABORTED" &&
          error.message.indexOf("timeout") !== -1
        ) {
          console.log("timeout请求超时");
        }
        return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    );

    // response 响应拦截器
    instance.interceptors.response.use(
      response => {
        return response;
      },
      err => {
        console.error(err);
        return Promise.reject(err); // 返回接口返回的错误信息
      }
    );
    // 请求处理
    instance(options)
      .then(res => {
        resolve(res);
        return false;
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const requestTwo = options => {
  return new Promise((resolve, reject) => {
    const instance = axios.create({
      header: {
        "Content-Type": "application/x-www-form-urlencode;charset=UTF-8"
      },
      timeout: config.timeout,
      withCredentials: config.withCredentials
    });
    // request 请求拦截器
    instance.interceptors.request.use(
      config => {
        if (config.method === "post") {
          let ret = "";
          for (let it in config.data) {
            ret +=
              encodeURIComponent(it) +
              "=" +
              encodeURIComponent(config.data[it]) +
              "&";
          }
          config.data = ret;
        }

        let token = Cookies.get("token");
        //发送请求时携带token
        if (token) {
          config.headers.token = token;
        } else {
          // 重定向到登录页面
          router.push("/login");
        }
        return config;
      },
      error => {
        // 请求发生错误时
        console.log("request:", error);
        // 判断请求超时
        if (
          error.code === "ECONNABORTED" &&
          error.message.indexOf("timeout") !== -1
        ) {
          console.log("timeout请求超时");
        }
        return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
      }
    );

    // response 响应拦截器
    instance.interceptors.response.use(
      response => {
        return response;
      },
      err => {
        console.error(err);
        return Promise.reject(err); // 返回接口返回的错误信息
      }
    );
    // 请求处理
    instance(options)
      .then(res => {
        resolve(res);
        return false;
      })
      .catch(error => {
        reject(error);
      });
  });
};
