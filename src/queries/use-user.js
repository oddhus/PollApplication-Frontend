import useSWR from "swr";
import axios from "axios";

const getMe = async () => {
  const response = await axios.get("/users/me");

  if (response.status === 200) {
    return {
      id: response.data.id,
      email: response.data.username,
      admin: response.data.isAdmin,
      roles: response.data.roles,
    };
  }

  const error = new Error("Not authorized!");
  error.status = 403;
  throw error;
};

export default function useUser() {
  const { data, mutate, error } = useSWR("api_user", getMe, {
    refreshInterval: 0,
  });

  const loading = !data && !error;
  const loggedOut = error && error.status === 403;

  return {
    loading,
    loggedOut,
    user: data,
    mutate,
  };
}
