import axios from "axios";

export const backend = axios.create({
  baseURL: import.meta.env.BACKEND_URL,
});
