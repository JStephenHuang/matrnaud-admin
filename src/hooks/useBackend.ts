import axios, { AxiosRequestConfig } from "axios";

import Cookies from "js-cookie";

export const useBackend = () => {
  const config: AxiosRequestConfig = {};
  (config.baseURL = `${import.meta.env.VITE_BACKEND}/api`),
    (config.withCredentials = true);

  if (
    Cookies.get("username") !== undefined &&
    Cookies.get("password") !== undefined
  ) {
    const encodedCredentials = btoa(
      `${Cookies.get("username")}:${Cookies.get("password")}`
    );
    config.headers = {
      Authorization: `Basic ${encodedCredentials}`,
    };
  }

  return axios.create(config);
};
