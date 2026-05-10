import { axiosInstance } from "../axios"

const getMeQueryFn = async () => {
  const dataFromApi = await axiosInstance.get("/auth/me");
  return dataFromApi.data;
}

export {
  getMeQueryFn
}
