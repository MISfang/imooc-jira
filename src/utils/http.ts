import { useAuth } from "context/auth-context";
import * as auth from "context/auth-provider";
import qs from "qs";
import { message } from "antd";

const baseUrl = "http://localhost:3001";
interface Config extends RequestInit {
  data?: object;
  token?: string;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    method: "GET",
    headers: {
      Authorization: token ? `Bearer ${token}` : ``,
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };

  if (config.method.toUpperCase() === "GET") {
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }

  return fetch(`${baseUrl}/${endpoint}`, config).then(async (res) => {
    if (res.status === 401) {
      message.error("未登录或者登录过期，请重新登录");
      await auth.logout();
      window.location.reload();
    }

    const data = await res.json();

    if (data) {
      return data;
    } else {
      return Promise.reject(data);
    }
  });
};

export const useHttp = () => {
  const { user } = useAuth();

  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
