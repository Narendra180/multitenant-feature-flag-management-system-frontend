import { axiosInstance } from "../axios";
import type { CreateFeatureFlagReqBody, DeleteFeatureFlagReqBody, EditFeatureFlagReqBody, GetFeatureFlagByKeyReqBody } from "./types";

const createFeatureFlagMutationFn = async (data: CreateFeatureFlagReqBody) => {
  const dataFromApi = await axiosInstance.post("/featureflags",
    data
  );
  return dataFromApi.data;
}

const editFeatureFlagMutationFn = async (data: EditFeatureFlagReqBody) => {
  const dataFromApi = await axiosInstance.patch(`/featureflags/${data.id}`,
    data
  );
  return dataFromApi.data;
}

const deleteFeatureFlagMutationFn = async (data: DeleteFeatureFlagReqBody) => {
  const dataFromApi = await axiosInstance.delete(`/featureflags/${data.id}`);
  return dataFromApi.data;
}

const getFeatureFlagByKeyMutationFn = async (data: GetFeatureFlagByKeyReqBody) => {
  const dataFromApi = await axiosInstance.get(`/featureflags/?name=${data.name}`);
  return dataFromApi.data;
}


export {
  createFeatureFlagMutationFn,
  editFeatureFlagMutationFn,
  deleteFeatureFlagMutationFn,
  getFeatureFlagByKeyMutationFn
}
