import useSWR from "swr";
import axios from "axios";

const getPolls = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    console.log(err);
    const error = new Error("Not authorized!");
    error.status = err.response.status;
    throw error;
  }
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
