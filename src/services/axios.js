import axios from "axios";

console.log(import.meta.env.VITE_BASE_URL, import.meta.env.VITE_NODE_ENV);
// const BASE_URL = import.meta.env.VITE_BASEURL;
export default axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: { "Content-Type": "application/json" },
  // withCredentials: true,
});
