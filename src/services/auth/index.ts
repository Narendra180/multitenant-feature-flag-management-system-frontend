import { useMutation, useQuery } from "@tanstack/react-query";
import { loginMutationFn, signupMutationFn } from "./mutations";
import { getMeQueryFn } from "./queries";

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

const useSignupMutation = () => {
  return useMutation({
    mutationFn: signupMutationFn
  })
}

export {
  useGetMeQuery,
  useLoginMutation,
  useSignupMutation
};
