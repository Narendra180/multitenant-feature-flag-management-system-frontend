import axios from "axios";


const axiosInstance = axios.create({
  baseURL: "/api/v1",
  timeout: 5000,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const subdomain = window.location.hostname.split('.').slice(0, -2).join('.');
      config.headers["x-tenant-slug"] = subdomain;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export {
  axiosInstance
}
