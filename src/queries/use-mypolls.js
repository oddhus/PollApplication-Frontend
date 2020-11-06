import useSWR from "swr";
import axios from "axios";
import { categorizePolls } from "../utils/categorizePolls";

const getPolls = async (url) => {
  const response = await axios.get(url);
  if (response.status === 200) {
    return categorizePolls(response.data);
  }
  new Error();
};

export default function useMyPolls(id) {
  const { data, mutate, error } = useSWR(
    id ? "polls/owner/" + id : null,
    getPolls
  );

  const loading = !data && !error;

  return {
    loading,
    error,
    polls: data,
    mutate,
  };
}
