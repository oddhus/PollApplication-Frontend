import useSWR from "swr";
import axios from "axios";

const getPolls = async (url) => {
  const response = await axios.get(url);

  if (response.status === 200) {
    return {
      polls: response.data.json(),
    };
  }

  const error = new Error("Not authorized!");
  error.status = 403;
  throw error;
};

export default function useMyPolls(id) {
  const { data, mutate, error } = useSWR("polls/owner/" + id, getPolls);

  const loading = !data && !error;

  return {
    loading,
    error,
    polls: data,
    mutate,
  };
}
