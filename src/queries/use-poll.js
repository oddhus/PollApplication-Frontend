import useSWR from "swr";
import axios from "axios";

const getPollResults = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    const error = new Error("Not authorized!");
    error.status = err.response.status;
    throw error;
  }
};

export default function usePollResults(id) {
  const { data, mutate, error } = useSWR(`polls/${id}/votes`, getPollResults);

  const loading = !data && !error;

  return {
    loading,
    error,
    results: data,
    mutate,
  };
}
