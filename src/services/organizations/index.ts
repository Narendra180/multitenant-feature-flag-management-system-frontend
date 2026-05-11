import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrganizationsQueryFn } from "./queries";
import { createOrganizationMutationFn } from "./mutations";

const useGetAllOrganizationsQuery = () => {
  return useQuery({
    queryKey: ["get-all-organizations"],
    queryFn: getOrganizationsQueryFn
  });
}

const useCreateOrganizationMutation = () => {
  return useMutation({
    mutationFn: createOrganizationMutationFn
  })
}

export {
  useGetAllOrganizationsQuery,
  useCreateOrganizationMutation
}
