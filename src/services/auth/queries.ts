import { axiosInstance } from "../axios";
import type { MeQueryResBody } from "./types";

const getMeQueryFn = async () => {
  const dataFromApi = await axiosInstance.get("/auth/me");
  return dataFromApi.data.data as MeQueryResBody;
}

export {
  getMeQueryFn
}
