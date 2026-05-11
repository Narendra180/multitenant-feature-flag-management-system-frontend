import { axiosInstance } from "../axios";
import { FeatureFlag } from "./types";

const getAllFeatureFlagsFn = async () => {
  const dataFromApi = await axiosInstance.get("/featureflags");
  return dataFromApi.data.data as FeatureFlag[];
}



export {
  getAllFeatureFlagsFn
};

