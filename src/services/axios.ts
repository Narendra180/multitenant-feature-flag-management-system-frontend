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
    console.log(error, "From Axios Interceptor............")
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if (error.response.data?.data === "Invalid Token" && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        await axiosInstance.get("/auth/refreshtoken");
        return axiosInstance(originalRequest);
      } catch (error) {
        
        // window.location.href = '/login?reason=expired';
        return Promise.reject(error);
      }
    }
    return Promise.reject(error);
  }
);

export {
  axiosInstance
}
