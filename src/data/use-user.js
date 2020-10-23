import useSWR from "swr";

import { meFetcher } from "../libs/api-user";

export default function useUser() {
  const { data, mutate, error } = useSWR("api_user", meFetcher);

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}
