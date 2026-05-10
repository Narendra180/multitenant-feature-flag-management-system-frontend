import { useMutation, useQuery } from "@tanstack/react-query";
import { getMeQueryFn } from "./queries";
import { loginMutationFn } from "./mutations";
import { LoginMutationReqBody } from "./types";

const useGetMeQuery = () => {
  return useQuery({
    queryKey: ["get-me"],
    queryFn: getMeQueryFn
  });
}

const useLoginMutation = () => {
  return useMutation({
    mutationFn: loginMutationFn
  })
}
export {
  useGetMeQuery,
  useLoginMutation
}
