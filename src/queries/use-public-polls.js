import useSWR from "swr";
import axios from "axios";

const getPolls = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      console.log(response.data);
      return response.data;
    }
  } catch (err) {
    const error = new Error("Could not get public polls!");
    error.status = err.response.status;
    throw error;
  }
};

export default function usePublicPolls() {
  const { data, mutate, error } = useSWR("/polls", getPolls);

  const loading = !data && !error;

  return {
    loading,
    error,
    polls: data,
    mutate,
  };
}
