import { useMutation, useQuery } from "@tanstack/react-query";
import { getAllFeatureFlagsFn } from "./queries";
import { createFeatureFlagMutationFn, deleteFeatureFlagMutationFn, editFeatureFlagMutationFn, getFeatureFlagByKeyMutationFn } from "./mutations";

const useGetAllFeatureFlags = () => {
  return useQuery({
    queryKey: ["get-all-feature-flags"],
    queryFn: getAllFeatureFlagsFn
  });
}

const useCreateFeatureFlagMutation = () => {
  return useMutation({
    mutationFn: createFeatureFlagMutationFn
  })
}

const useEditFeatureFlagMutation = () => {
  return useMutation({
    mutationFn: editFeatureFlagMutationFn
  })
}

const useDeleteFeatureFlagMutation = () => {
  return useMutation({
    mutationFn: deleteFeatureFlagMutationFn
  })
}

const useGetFeatureFlagByKeyMutation = () => {
  return useMutation({
    mutationFn: getFeatureFlagByKeyMutationFn
  });
}

export {
  useGetAllFeatureFlags,
  useCreateFeatureFlagMutation,
  useEditFeatureFlagMutation,
  useDeleteFeatureFlagMutation,
  useGetFeatureFlagByKeyMutation
}
