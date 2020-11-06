import useSWR from "swr";
import axios from "axios";

export const getMe = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return {
        id: response.data.id,
        displayName: response.data.displayName,
        email: response.data.username,
        admin: response.data.roles.includes("ADMIN"),
        guest: response.data.roles.includes("GUEST"),
        roles: response.data.roles,
      };
    }
  } catch (err) {
    const error = new Error("Not authorized!");
    error.status = err.response.status;
    throw error;
  }
};

export default function useUser() {
  const { data, mutate, error } = useSWR("/voters/me", getMe, {
    refreshInterval: 0,
    shouldRetryOnError: false,
    revalidateOnFocus: true,
    revalidateOnMount: true,
  });

  const loading = !data && !error;
  const loggedOut = !data || error;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}
