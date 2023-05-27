import axios, { AxiosRequestConfig } from "axios";

export const backend = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND}/api`,
});
