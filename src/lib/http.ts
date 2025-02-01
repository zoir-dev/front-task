import axios from "axios";
import { redirect } from "react-router-dom";

const http = axios.create({
  baseURL: import.meta.env.VITE_DEFAULT_URL,
});

const redirectWhenNoToken='/'

const getAccessToken = () => localStorage.getItem("token");


http.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      redirect(redirectWhenNoToken);
    }
    return Promise.reject(error);
  }
);

export default http;
