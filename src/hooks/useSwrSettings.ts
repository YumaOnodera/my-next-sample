import { useFormat } from "hooks/useFormat";
import axios from "libs/axios";

export const useSwrSettings = () => {
  const { objectValuesToString } = useFormat();

  const fetcher = async (url: string) => {
    return axios
      .get(url)
      .then((response) => response.data)
      .catch((error) => {
        if (error.response.status !== 422) throw error;

        console.error(objectValuesToString(error.response.data.message));
      });
  };

  const config = () => {
    return {
      revalidateOnFocus: false,
    };
  };

  return {
    fetcher,
    config,
  };
};
