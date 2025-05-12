import axios from "axios";
import Config from "./config";
import Utils from "../utils/utils";

const axiosInstance = axios.create({
  baseURL: Config.BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use((config) => {
  const token = Utils.getUserToken(Config.USER_TOKEN_KEY);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
