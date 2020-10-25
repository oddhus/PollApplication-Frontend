import useSWR from "swr";
import axios from "axios";

export const getMe = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return {
        id: response.data.id,
        email: response.data.username,
        admin: response.data.isAdmin,
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
  const { data, mutate, error } = useSWR("/users/me", getMe, {
    refreshInterval: 0,
    revalidateOnFocus: false,
  });

  const loading = !data && !error;
  const loggedOut = !data || error;

  //console.log(error && error.status === 401);

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}
