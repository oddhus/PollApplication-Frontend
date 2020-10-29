import useSWR from "swr";
import axios from "axios";

export const getUserDevices = async (url) => {
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

export default function useUserDevices() {
  const { data, mutate, error } = useSWR("/voting-device", getUserDevices);
  console.log(data);

  const loading = !data && !error;

  return {
    loading,
    devices: data,
    mutate,
  };
}
