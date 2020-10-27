import useSWR from "swr";
import axios from "axios";

const getPollInfo = async (url) => {
  try {
    const response = await axios.get(url);
    if (response.status === 200) {
      return response.data;
    }
  } catch (err) {
    throw new Error("Could not get poll result");
  }
};

export default function usePollInfo(pin) {
  const { data, mutate, error } = useSWR(`/polls/${pin}`, getPollInfo);

  const loading = !data && !error;

  return {
    loading,
    error,
    poll: data,
    mutate,
  };
}
