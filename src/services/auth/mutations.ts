import { axiosInstance } from "../axios"
import type { LoginMutationReqBody } from "./types";

const loginMutationFn = async (data: LoginMutationReqBody) => {
  const dataFromApi = await axiosInstance.post("/auth/login",
    data
  );
  return dataFromApi.data;
}

const signupMutationFn = async (data: LoginMutationReqBody) => {
  const dataFromApi = await axiosInstance.post("/auth/signup",
    data
  );
  return dataFromApi.data;
}


export {
  loginMutationFn,
  signupMutationFn
}
