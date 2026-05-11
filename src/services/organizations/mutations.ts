import { axiosInstance } from "../axios";
import type { CreateOrgReqBody } from "./types";

const createOrganizationMutationFn = async (data: CreateOrgReqBody) => {
  const dataFromApi = await axiosInstance.post("/organizations",
    data
  );
  return dataFromApi.data;
}

export {
  createOrganizationMutationFn
}