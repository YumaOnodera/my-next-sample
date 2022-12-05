import { useFormat } from "hooks/useFormat";
import axios from "libs/axios";

export const useSwrFetcher = async (url: string) => {
  const { objectValuesToString } = useFormat();

  return axios
    .get(url)
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.status !== 422) throw error;

      console.error(objectValuesToString(error.response.data.message));
    });
};
