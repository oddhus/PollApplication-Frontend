import useSWR from "swr";
import axios from "axios";

export const getMe = async (url) => {
  const response = await axios.get(url);
  if (response.status === 200) {
    return {
      id: response.data.id,
      displayName: response.data.displayName,
      email: response.data.email,
      admin: response.data.roles.includes("ADMIN"),
      roles: response.data.roles,
    };
  }
  throw new Error();
};

export default function useUser() {
  const { data, mutate, error } = useSWR("/users/me", getMe, {
    refreshInterval: 0,
    shouldRetryOnError: false,
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  const loading = !data && !error;
  const loggedOut = !data || error;

  return {
    error,
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}
