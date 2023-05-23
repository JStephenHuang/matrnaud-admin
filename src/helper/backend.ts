import axios from "axios";

export const backend = axios.create({
  baseURL: process.env.VITE_BACKEND,
});
