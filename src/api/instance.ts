import axios, { InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE_URL = "http://10.0.2.2:8080/api";

const instance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      const tokenString = await AsyncStorage.getItem("token");
      const token = tokenString;

      if (token && config.headers && typeof config.headers.set === "function") {
        config.headers.set("Authorization", `Bearer ${token}`);
      }
    } catch (error) {
      console.error("Failed to get token from AsyncStorage:", error);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const otpInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
