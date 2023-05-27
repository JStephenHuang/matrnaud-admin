import axios, { AxiosRequestConfig } from "axios";

import Cookies from "js-cookie";

export const useBackend = () => {
  const config: AxiosRequestConfig = {};
  (config.baseURL = `${import.meta.env.VITE_BACKEND}/api`),
    (config.withCredentials = true);

  if (Cookies.get("auth") === "true") {
    config.headers = {
      Authorization: `Basic ${import.meta.env.VITE_CREDENTIALS}`,
    };
  }

  return axios.create(config);
};
