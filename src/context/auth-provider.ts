// 操作token
import { Users } from "../pages/List/Search/index";
import { notification } from "antd";

const baseUrl = "http://localhost:3001";
const localStorageKey = "__auth_provider_token__";

export const getToken = () => window.localStorage.getItem(localStorageKey);

export const handleUserresponse = ({ user }: { user: Users }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

// 登录方法
export const onLogin = (data: { username: string; password: string }) => {
  return fetch(`${baseUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.status === 400) {
      notification["error"]({
        message: "用户名或密码错误",
        placement: "topRight",
      });
      notification["warning"]({
        message: "未注册可以去注册新用户",
        placement: "topLeft",
      });
    }
    console.log(
      "%c 🍠 response: ",
      "font-size:20px;background-color: #4b4b4b;color:#fff;",
      response
    );

    if (response.ok) {
      notification["success"]({
        message: "登录成功",
      });
      // 登录成功，做点什么
      return handleUserresponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

// 注册方法
export const Register = (data: { username: string; password: string }) => {
  return fetch(`${baseUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response: Response) => {
    if (response.ok) {
      notification["success"]({
        message: "注册成功",
      });
      // 登录成功，做点什么
      return handleUserresponse(await response.json());
    } else {
      return Promise.reject(data);
    }
  });
};

// 退出方法
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
