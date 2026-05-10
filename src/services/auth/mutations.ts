import { axiosInstance } from "../axios"
import type { LoginMutationReqBody } from "./types";

const loginMutationFn = async (data: LoginMutationReqBody) => {
  const dataFromApi = await axiosInstance.post("/auth/login",
    data
  );
  return dataFromApi.data;
}

export {
  loginMutationFn
}
