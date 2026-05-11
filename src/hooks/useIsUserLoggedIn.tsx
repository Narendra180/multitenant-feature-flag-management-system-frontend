import { useGetMeQuery } from "@/services/auth";

const useIsUserLoggedIn = () => {
  const {
    data, isFetching
  } = useGetMeQuery();

  return {
    isLoggedIn: Boolean(data),
    isLoading: isFetching
  }
}

export {
  useIsUserLoggedIn
}
