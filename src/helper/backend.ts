import axios from "axios";

const backendUrl = `${process.env.VERCEL_URL}/api`;

export const backend = axios.create({
  baseURL: backendUrl,
  headers: { "Access-Control-Allow-Origin": backendUrl },
});
