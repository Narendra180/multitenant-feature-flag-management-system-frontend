import { axiosInstance } from "../axios";
import { Organization } from "./types";

const getOrganizationsQueryFn = async () => {
  const dataFromApi = await axiosInstance.get("/organizations");
  return dataFromApi.data.data as Organization[];
}

export {
  getOrganizationsQueryFn
}
